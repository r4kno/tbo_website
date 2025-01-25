import React from 'react';

const defaultFlightData = {
  Segments: [[{
    Airline: {
      AirlineName: "Indigo",
      FlightNumber: "N/A"
    },
    Craft: "N/A",
    Duration: 0,
    Origin: {
      DepTime: new Date().toISOString(),
      Airport: {
        CityName: "N/A",
        AirportCode: "N/A"
      }
    },
    Destination: {
      ArrTime: new Date().toISOString(),
      Airport: {
        CityName: "N/A", 
        AirportCode: "N/A"
      }
    }
  }]],
  Fare: {
    PublishedFare: 0,
    Currency: "INR"
  }
};

const FlightTicket = ({ flightData = defaultFlightData }) => {
  // Safely extract flight details
  const segment = flightData.Segments?.[0]?.[0] || {};
  
  const flightDetails = {
    airline: segment.Airline?.AirlineName || "Unknown Airline",
    flightNumber: segment.Airline?.FlightNumber || "N/A",
    aircraftType: segment.Craft || "N/A",
  };

  const schedule = {
    date: segment.Origin?.DepTime 
      ? new Date(segment.Origin.DepTime).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          weekday: 'short'
        }) 
      : "N/A",
    duration: segment.Duration 
      ? `${Math.floor(segment.Duration / 60)}h ${segment.Duration % 60}m` 
      : "N/A",
    departure: {
      time: segment.Origin?.DepTime 
        ? new Date(segment.Origin.DepTime).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        : "N/A",
      city: segment.Origin?.Airport?.CityName || "N/A",
      code: segment.Origin?.Airport?.AirportCode || "N/A"
    },
    arrival: {
      time: segment.Destination?.ArrTime 
        ? new Date(segment.Destination.ArrTime).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        : "N/A",
      city: segment.Destination?.Airport?.CityName || "N/A",
      code: segment.Destination?.Airport?.AirportCode || "N/A"
    }
  };

  const pricing = {
    amount: `₹${(flightData.Fare?.PublishedFare || 0).toLocaleString()}`,
    currency: flightData.Fare?.Currency || "INR"
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {flightDetails.airline} {flightDetails.aircraftType}
        </h2>
        <span className="text-xl text-red-500 font-semibold">
          {pricing.amount}
        </span>
      </div>
      
      <div className="text-gray-600 mb-6">
        {schedule.date}
        <span className="float-right">{schedule.duration}</span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex-1">
          <div className="text-2xl font-bold">{schedule.departure.time}</div>
          <div className="text-gray-600">
            {schedule.departure.city}({schedule.departure.code})
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center px-4">
          <div className="w-full flex items-center">
            <div className="h-[2px] flex-1 bg-gray-300"></div>
            <div className="mx-2">
              <svg className="w-6 h-6 text-gray-600 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <div className="h-[2px] flex-1 bg-gray-300"></div>
          </div>
        </div>

        <div className="flex-1 text-right">
          <div className="text-2xl font-bold">{schedule.arrival.time}</div>
          <div className="text-gray-600">
            {schedule.arrival.city}({schedule.arrival.code})
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div className="text-gray-600">
          Flight Number: {flightDetails.flightNumber}
        </div>
      </div>
    </div>
  );
};

export default FlightTicket;