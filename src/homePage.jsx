import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TourBookingForm from './components/trail2'
import FlightTicket from './components/flightTicket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import titleFont from './fonts/titleFont.otf'


const HomePage = () => {

    
  const [token, setToken] = useState("");
    const [flightResults, setFlightResults] = useState(null);
    const [error, setError] = useState(null);

    const Authenticate2 = async () => {
        const formData = {
            ClientId: "ApiIntegrationNew",
            UserName: "Hackathon",
            Password: "Hackathon@1234",
            EndUserIp: "192.168.1.12"
        };
        
        try {
            const response = await axios.post("/SharedServices/SharedData.svc/rest/Authenticate", formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log("Authentication Response:", response);
            setToken(response.data.TokenId);
        } catch (error) {
            console.error("Authentication Error:", error);
            setError("Authentication failed");
        }
    };

    const backend = async () => {
        const formData = {
            "TokenId": "22998134-4d4f-4b8d-9f79-18fb75b1",
            "AdultCount": "1",
            "ChildCount": "1",
            "InfantCount": "1",
            "DirectFlight": "false",
            "OneStopFlight": "false",
            "JourneyType": "1",
            "PreferredAirlines": null,
            "Segments": [
                {
                    "Origin": "RPR",
                    "Destination": "BOM",
                    "FlightCabinClass": "1",
                    "PreferredDepartureTime": "2025-01-30T00:00:00",
                    "PreferredArrivalTime": "2025-01-30T00:00:00"
                }
            ],
            "Sources": null
        }

        console.log('Sending data to backend:', formData);
        
        try {
            const response = await fetch('http://localhost:5000/proxy-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Backend Response:', data);
            
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

    useEffect(() => {
        Authenticate2();
        backend();
    }, []);
  return (
    <div className="relative w-full min-h-screen bg-slate-100` overflow-hidden">
      <div className="relative w-full h-[600px] bg-[url('./assets/bg2.jpg')] bg-cover bg-center text-white rounded-b-[20px]">
        {/* Navigation */}
        <div className="relative flex items-center justify-between max-w-7xl p-4 mx-auto">
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
          <TourBookingForm />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 px-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Brief Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Brief</h2>
          <div className="h-40 bg-gray-200 rounded">Brief content here</div> */}
          
          {/* Flight Details */}
          <div className="mt-4">
          </div>
        {/* </div> */}

        {/* Timeline Section */}
        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(day => (
              <div key={day} className="bg-gray-200 p-4 rounded">
                Day {day} Timeline Content
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;