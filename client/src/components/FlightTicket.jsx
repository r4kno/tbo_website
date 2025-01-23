import React from 'react';

const defaultFlightData = {
  flightDetails: {
    airline: "Indigo",
    aircraftType: "Airbus A320",
    flightNumber: "6E-123",
  },
  schedule: {
    date: "2 Jan, Friday",
    duration: "2h 28m",
    departure: {
      time: "12:00 pm",
      city: "Delhi",
      code: "DEL"
    },
    arrival: {
      time: "2:28 pm",
      city: "Goa",
      code: "GOI"
    }
  },
  pricing: {
    amount: "₹6,400",
    currency: "INR"
  },
  amenities: {
    hasWifi: true,
    hasMeal: true,
    hasEntertainment: true,
    hasCharger: true
  }
};

const FlightTicket = ({ flightData = defaultFlightData }) => {
  const {
    flightDetails,
    schedule,
    pricing,
    amenities
  } = flightData;

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
        <div className="flex space-x-4">
          {amenities.hasWifi && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
          )}
          {amenities.hasMeal && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          )}
          {amenities.hasEntertainment && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          {amenities.hasCharger && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightTicket;