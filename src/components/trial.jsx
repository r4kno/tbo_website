import React, { useState } from 'react';
import { ArrowRight, Plane, ChevronDown, Send } from 'lucide-react';
import axios from 'axios';

const TourBookingForm = () => {
  const TOKEN_ID = "9e236a2e-5ebc-4c12-8073-fc16f3040db5";

  const theme = {
    fieldBg: 'bg-gray-50',
    containerBg: 'bg-white',
    containerText: 'text-black',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryText: 'text-blue-600',
  };

  const [formData, setFormData] = useState({
    from: 'Delhi',
    to: 'Goa',
    tripType: 'return',
    departDate: '2025-01-02',
    returnDate: '2025-01-04',
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    class: 'economy',
    budget: 60000,
    promoCode: '',
    showPromoInput: false,
    directFlight: false,
    oneStopFlight: false,
    preferredAirlines: '',
  });

  const classOptions = [
    { value: 'economy', label: 'Economy', apiValue: '1' },
    { value: 'premium', label: 'Premium Economy', apiValue: '2' },
    { value: 'business', label: 'Business', apiValue: '3' },
    { value: 'first', label: 'First Class', apiValue: '4' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateForApi = (date) => {
    return `${date}T00:00:00`;
  };

  
  const hotelSearch = async (e) => {
    const searchData ={
      "CheckIn": "2021-07-16",
      "CheckOut": "2021-07-17",
      "HotelCodes": "1247101",
      "GuestNationality": "AE",
      "PaxRooms": [
      {
      "Adults": 1,
      "Children": 1,
      "ChildrenAges": [ 1 ]
      }
      ],
      "ResponseTime": 23.0,
      "IsDetailedResponse": false,
      "Filters": {"Refundable": false,
                  "NoOfRooms": 0,
                  "MealType": "All",
      },
    };
    try {
      const response = await axios.post("/BookingEngineService_Air/hotelapi.svc/rest/Search", searchData, Headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      );
      console.log("Response:", response);
    } catch (error) {
        console.log("Error:", error);
    }
    };
  const handleSubmit = async () => {
    const apiPayload = {
      EndUserIp: "192.168.1.12",
      TokenId: TOKEN_ID,
      AdultCount: formData.adultCount.toString(),
      ChildCount: formData.childCount.toString(),
      InfantCount: formData.infantCount.toString(),
      DirectFlight: formData.directFlight.toString(),
      OneStopFlight: formData.oneStopFlight.toString(),
      JourneyType: formData.tripType === 'return' ? "2" : "1",
      PreferredAirlines: formData.preferredAirlines || null,
      Segments: [
        {
          Origin: formData.from,
          Destination: formData.to,
          FlightCabinClass: classOptions.find(opt => opt.value === formData.class).apiValue,
          PreferredDepartureTime: formatDateForApi(formData.departDate),
          PreferredArrivalTime: formatDateForApi(formData.departDate)
        }
      ],
      Sources: null
    };

    // Add return segment if it's a return flight
    if (formData.tripType === 'return') {
      apiPayload.Segments.push({
        Origin: formData.to,
        Destination: formData.from,
        FlightCabinClass: classOptions.find(opt => opt.value === formData.class).apiValue,
        PreferredDepartureTime: formatDateForApi(formData.returnDate),
        PreferredArrivalTime: formatDateForApi(formData.returnDate)
      });
    }
    console.log("API Payload:", apiPayload);

    try {
      const response = await axios.post("/api/BookingEngineService_Air/AirService.svc/rest/Search", 
        apiPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false
        }
      );
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error details:', error);
    }
  };

  return (
    <div className={`w-full max-w-5xl p-6 ${theme.containerBg} rounded-lg shadow-sm`}>
      {/* ... Previous header section ... */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From - To Field */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">From - To</label>
          <div className={`flex items-center justify-between ${theme.containerText}`}>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-24 bg-transparent border-none p-0 focus:ring-0"
            />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-24 bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
        </div>

        {/* Trip Type Dropdown */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Trip</label>
          <select 
            name="tripType"
            value={formData.tripType}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          >
            <option value="return">Return</option>
            <option value="oneway">One Way</option>
          </select>
        </div>

        {/* Date Fields */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Departure Date</label>
          <input
            type="date"
            name="departDate"
            value={formData.departDate}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          />
        </div>

        {formData.tripType === 'return' && (
          <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
            <label className="text-sm text-gray-500 block mb-1">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              min={formData.departDate}
              className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
            />
          </div>
        )}

        {/* Passenger Counts */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Passengers</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              name="adultCount"
              min="1"
              placeholder="Adults"
              value={formData.adultCount}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
            />
            <input
              type="number"
              name="childCount"
              min="0"
              placeholder="Children"
              value={formData.childCount}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
            />
            <input
              type="number"
              name="infantCount"
              min="0"
              placeholder="Infants"
              value={formData.infantCount}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
            />
          </div>
        </div>

        {/* Class Dropdown */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          >
            {classOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Fields */}
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Flight Preferences</label>
          <div className={`space-y-2 ${theme.containerText}`}>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="directFlight"
                checked={formData.directFlight}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  directFlight: e.target.checked
                }))}
                className="mr-2"
              />
              Direct Flight
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="oneStopFlight"
                checked={formData.oneStopFlight}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  oneStopFlight: e.target.checked
                }))}
                className="mr-2"
              />
              One Stop Flight
            </label>
          </div>
        </div>
        
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Preferred Airlines</label>
          <input
            type="text"
            name="preferredAirlines"
            value={formData.preferredAirlines}
            onChange={handleInputChange}
            placeholder="Optional"
            className="w-full bg-transparent border-none p-0 focus:ring-0"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-6">
        <div className="relative">
          {formData.showPromoInput ? (
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              placeholder="Enter promo code"
              className={`border rounded p-2 text-sm ${theme.containerText}`}
            />
          ) : (
            <button 
              onClick={() => setFormData(prev => ({ ...prev, showPromoInput: true }))}
              className={`${theme.primaryText} ${theme.primaryHover} text-sm font-medium`}
            >
              + Add Promo Code
            </button>
          )}
        </div>
        <button 
          onClick={handleSubmit}
          className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
        >
          Plan Tour
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TourBookingForm;