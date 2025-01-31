import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TourBookingForm from './components/trail2'
import FlightTicket from './components/flightTicket';
import ItineraryPlanner from './itenaryPlanar.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence } from 'framer-motion';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { flightSample} from "./assets/flightSample"
import titleFont from './fonts/titleFont.otf'
import cityData from './assets/city_codes.json';
import { use } from 'react';

const HomePage = ({onComplete}) => {
  const [userIP, setUserIP] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlanning, setIsPlanning] = useState(false);
  const [hotelResults, setHotelResults] = useState(null);
  const [isTourPlanned, setIsTourPlanned] = useState(false);

  const getUserLocation = async () => {
    // Check localStorage first
    const cachedData = localStorage.getItem('userLocationData');
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const cacheTime = new Date(parsedData.timestamp);
        if ((new Date() - cacheTime) < 3600000) {
            setUserIP(parsedData.ip);
            console.log("Using cached IP:", parsedData.ip);
            if (parsedData) {
                setCityCode(parsedData.cityCode);
                setCityName(parsedData.city);
                console.log("Using cached city code:", parsedData.cityCode);
                console.log("Using cached city name:", parsedData.city);
                return;
            }
        }
    }

    console.log("Fetching location...");

    try {
        // First API: Get IP
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const userIP = ipResponse.data.ip;
        setUserIP(userIP);

        // Second API: Get location using ipwhois.app (CORS-friendly)
        const geoResponse = await axios.get(`https://ipwhois.app/json/${userIP}`);
        const cityName = geoResponse.data.city;
        console.log("City Name:", cityName);

        // Find city code
        const cityMatch = cityData.CityList.find(city => 
            city.Name.toLowerCase().includes(cityName.toLowerCase())
        );

        if (cityMatch) {
            setCityCode(cityMatch.Code);
            // Cache the results
            localStorage.setItem('userLocationData', JSON.stringify({
                ip: userIP,
                cityCode: cityMatch.Code,
                city: cityMatch.Name,
                timestamp: new Date()
            }));
        } else {
            setCityCode("100089"); // Fallback to Delhi
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        setUserIP("192.168.1.12");
        setCityCode("100089"); // Delhi
    } finally {
        setIsLoading(false);
    }
};


// Update formData to use use
const Authenticate = async () => {
  // Check localStorage first
  console.log("Authenticating...");
  const cachedToken = localStorage.getItem('authToken');
  if (cachedToken) {
    const tokenData = JSON.parse(cachedToken);
    const tokenTime = new Date(tokenData.timestamp);
    // Use cache if less than 24 hours old
    if ((new Date() - tokenTime) < 3600) {
      setToken(tokenData.token);
      console.log("Authenticated with cached token:", tokenData.token);
      return;
    }
  }
  
  const formData = {
    ClientId: "ApiIntegrationNew", 
    UserName: "Hackathon",
    Password: "Hackathon@1234",
    EndUserIp: userIP || "192.168.1.12"
  };
  console.log("Authenticating with IP:", userIP);
  
  try {
    const response = await axios.post("/SharedServices/SharedData.svc/rest/Authenticate", formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (response.data.TokenId) {
      // Save token to state
      setToken(response.data.TokenId);
      console.log("Authenticated with token:", response.data.TokenId);
      
      // Save to localStorage with timestamp
      localStorage.setItem('authToken', JSON.stringify({
        token: response.data.TokenId,
        timestamp: new Date()
      }));
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    setError("Authentication failed");
  }
};
// Function to make authenticated API request
const hotelSearch = async (cityCode) => {
  // Your credentials
  const Username = 'hackathontest';
  const Password = 'Hac@98910186';
  
  // Create base64 encoded credentials
  const credentials = btoa(`${Username}:${Password}`);
  console.log("hotel search trying with city code: ", cityCode);
  
  try {
    const response = await fetch('/TBOHolidays_HotelAPI/TBOHotelCodeList', {
      method: 'POST', // or 'GET', 'PUT',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        // Your request body data h
        CityCode: cityCode,
        IsDetailedResponse: "false"
        
      })
    });
    
    const data = await response.json();
    console.log('Hotel Search Results before return:', data);
    setHotelResults(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
const [token, setToken] = useState("");
const [flightResults, setFlightResults] = useState(null);
const [error, setError] = useState(null);
const [queryData, setQueryData] = useState(null);

const transformQueryData = (queryData) => {
  if (!queryData) {
    console.log('No query data available');
    return null;
  }

  // Map trip type to JourneyType
  const journeyTypeMap = {
    'return': '2',   // Round trip
    'oneway': '1',   // One-way trip
    'multicity': '3' // Multi-city trip
  };
  
  // Map cabin class
  const cabinClassMap = {
    'economy': '1',
    'premium': '2',
    'business': '3',
    'first': '4'
  };
  
  // Predefined time formats
  const timeFormats = {
    'AnyTime': '00:00:00',
    'Morning': '08:00:00',
    'AfterNoon': '14:00:00',
    'Evening': '19:00:00',
    'Night': '01:00:00'
  };
  
  // Default values for counts
  const adultCount = queryData.passengers || 1; // Add default value
  const childCount = '0';  // Assuming no children unless specified
  const infantCount = '0'; // Assuming no infants unless specified
  
  // Determine segments based on trip type
  const segments = [];
  
  // Always add outbound flight
  segments.push({
    Origin: queryData.from || "DEL", // Default to Delhi if not specified
    Destination: queryData.to,
    FlightCabinClass: cabinClassMap[queryData.class] || '1', // Default to economy
    PreferredDepartureTime: `${queryData.departDate}T${timeFormats.Morning}`,
    PreferredArrivalTime: `${queryData.departDate}T${timeFormats.Evening}`
  });
  
  // Add return flight for round trip
  if (queryData.tripType === 'return') {
    const returnDate = new Date(queryData.departDate);
    returnDate.setDate(returnDate.getDate() + parseInt(queryData.returnDate));
    
    segments.push({
      Origin: queryData.to,
      Destination: queryData.from || "DEL",
      FlightCabinClass: cabinClassMap[queryData.class] || '1',
      PreferredDepartureTime: returnDate.toISOString().split('T')[0] + `T${timeFormats.Morning}`,
      PreferredArrivalTime: returnDate.toISOString().split('T')[0] + `T${timeFormats.Evening}`
    });
  }
  
  return {
    TokenId: token, // Your existing token
    EndUserIp: userIP, // Your existing IP
    AdultCount: adultCount.toString(),
    ChildCount: childCount,
    InfantCount: infantCount,
    DirectFlight: "true",
    OneStopFlight: "false",
    JourneyType: journeyTypeMap[queryData.tripType] || '1', // Default to one-way if 
    PreferredAirlines: null,
    Segments: segments,
    Sources: null
  };
};

const backend = async () => {
  if (!queryData) {
    console.log('No query data available for backend call');
    return;
  }
  
  const flightSearchData = transformQueryData(queryData);
  if (!flightSearchData) {
    console.log('Could not transform query data');
    return;
  }

  console.log('Sending data to backend:', flightSearchData);
  setIsPlanning(true);

  try {
    const response = await fetch('http://localhost:5000/proxy-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flightSearchData)
    });
    
    const data = await response.json();
    console.log('Backend Response:', data);
    console.log('price:', data.Fare.PublishedFare);
    
    if (data.error) {
      setError(data.error);
      console.error('API Error:', data);
    } else {
      setFlightResults(data);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    setError('Failed to fetch flight results');
  }
}

const handleDataTransfer = (data) => {
  console.log('Received data:', data);
  setQueryData(data);
  setIsTourPlanned(true);
};

useEffect(() => {
  if (queryData) {
    console.log('queryData updated:', queryData);
    backend();
    hotelSearch(cityCode);
  }
}, [queryData]);
useEffect(() => {
  if (flightResults && hotelResults) {
  console.log('planning over')
  setIsPlanning(false);
  }
}, [flightResults, hotelResults]);

useEffect(() => {
  getUserLocation().then(() => {
    Authenticate();
  });
}, []);
  return (
    <>
    <div className="relative w-full min-h-screen bg-slate-100 overflow-hidden">
      <AnimatePresence>
      {isLoading && <LoadingScreen isLoading={isPlanning}/>}
      </AnimatePresence>
      <div className="relative w-full h-[600px] bg-[url('./assets/bg2.jpg')] bg-cover bg-center text-white rounded-b-[20px]">
        {/* Navigation */}
        <div className="fixed w-screen flex items-center justify-between p-4 mx-auto backdrop-blur-lg bg-gray-700 z-10 bg-opacity-50">
        {/* Left section */}
        <div className="flex items-center space-x-6">
          {/* Plane icon and text */}
          <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlane} />
            <span className="text-sm font-medium">One place for complete Tour</span>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-4xl font-bold text-[#307fe2]">tbo<span className="text-[#f26b25]">.com</span></span>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#f26b25] hover:bg-red-600 px-4 py-2 rounded-md transition-colors">
            Login
          </button>
          <button className="bg-[#307fe2] hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
            Sign up
          </button>
        </div>
      </div>

        {/* Hero Content */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <h3 className="text-2xl font-bold mb-4">Helping Others</h3>
          <h1 className="text-8xl font-bold style={{ fontFamily: `url(${titleFont})` }} mb-4">LIVE & TRAVEL</h1>
          <p className="text-xl">"Pack Your Bags, We've Got This!"</p>
        </div>

        {/* Search Form Card */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
          <TourBookingForm onComplete={handleDataTransfer}/>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 mx-auto">
        {/* Brief Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Brief</h2>
          <div className="h-40 bg-gray-200 rounded">Brief content here</div> */}
          
          {/* Flight Details */}
          {flightResults? (
            <div className="mt-4 max-w-4xl mx-auto p-4 relative">
            <FlightTicket flightData={flightResults} />
          </div>

): (<></>)}
        {/* </div> */}
        {/* Search Form Card */}

        {/* Timeline Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <div className="space-y-4">
          {[1, 2, 3].map(day => (
            <div key={day} className="bg-gray-200 p-4 rounded">
            Day {day} Timeline Coghf tyfcgh 
            </div>
            ))}
            </div>
            </div> */}
      </div>
            {isTourPlanned ? (
              <div className="col-span-1">
                {console.log("queryData being passed:", queryData)}
                <ItineraryPlanner queryData={queryData} />
              </div>
            ) : (
              <div className="col-span-1">
                <div className="bg-gray-200 w-full h-64 rounded"></div>
              </div>
            )}
    </div>
            </>
  );
};

export default HomePage;