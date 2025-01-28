import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TourBookingForm from './components/trail2'
import FlightTicket from './components/flightTicket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { flightSample} from "./assets/flightSample"
import titleFont from './fonts/titleFont.otf'
import cityData from './assets/city_codes.json';

const HomePage = ({onComplete}) => {
  const [userIP, setUserIP] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getUserLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserIP(data.ip);
      console.log('User IP:', userIP);
      
      // Search for city code
      const cityMatch = cityData.CityList.find(city => 
        city.Name.toLowerCase().includes(data.city.toLowerCase())
      );
      
      if (cityMatch) {
        setCityCode(cityMatch.Code);
        console.log('City Code:', cityCode);                          
      }
    } catch (error) {
      console.error("Error fetching IP:", error);
      setUserIP("192.168.1.12"); // Fallback IP
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation().then(() => {
      Authenticate2();
    });
  }, []);

  // Update formData to use userIP
  const Authenticate2 = async () => {
    const formData = {
      ClientId: "ApiIntegrationNew", 
      UserName: "Hackathon",
      Password: "Hackathon@1234",
      EndUserIp: userIP || "192.168.1.12" // Use fetched IP or fallback
    };
    
    try {
      const response = await axios.post("/SharedServices/SharedData.svc/rest/Authenticate", formData, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      console.log("Authentication Response:", response);
      if (response.data.TokenId) {
        console.log('Token got:', response.data.TokenId);
        setToken(response.data.TokenId);  
        console.log('Toket set: ', token);
    }
    } catch (error) {
      console.error("Authentication Error:", error);
      setError("Authentication failed");
    }
  };

  const [token, setToken] = useState("");
  const [flightResults, setFlightResults] = useState(null);
  const [error, setError] = useState(null);
  const [queryData, setQueryData] = useState(null);

    const transformQueryData = (queryData) => {
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
      const adultCount = queryData.passengers;
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
        EndUserIp: "192.168.1.9", // Your existing IP
        AdultCount: adultCount.toString(),
        ChildCount: childCount,
        InfantCount: infantCount,
        DirectFlight: "false",
        OneStopFlight: "false",
        JourneyType: journeyTypeMap[queryData.tripType] || '1', // Default to one-way if noted
        PreferredAirlines: null,
        Segments: segments,
        Sources: null
      };
    };

    const backend = async () => {

        const flightSearchData = transformQueryData(queryData);

        console.log('Sending data to backend:', flightSearchData);
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
      setQueryData(data);
      console.log('query data:', queryData);
      backend();
    }
  return (
    <div className="relative w-full min-h-screen bg-slate-100 overflow-hidden">
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
          <button className="bg-[#f26b25] hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
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
      <div className="mt-32 px-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Brief Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Brief</h2>
          <div className="h-40 bg-gray-200 rounded">Brief content here</div> */}
          
          {/* Flight Details */}
          {flightResults? (
          <div className="mt-4">
            <FlightTicket flightData={flightResults} />
          </div>

          ): (<></>)}
        {/* </div> */}

        {/* Timeline Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(day => (
              <div key={day} className="bg-gray-200 p-4 rounded">
                Day {day} Timeline Conte
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;