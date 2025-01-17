import React from 'react';
import TourBookingForm from './components/TourBookingForm'
import FlightTicket from './components/flightTicket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import titleFont from './fonts/titleFont.otf'


const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen bg-slate-100` overflow-hidden">
      <div className="relative w-full h-[600px] bg-[url('./assets/bg.png')] bg-cover bg-center text-white rounded-b-[20px]">
        {/* Navigation */}
        <div className="relative flex items-center justify-between max-w-7xl mx-auto p-4">
        {/* Left section */}
        <div className="flex items-center space-x-6">
          {/* Plane icon and text */}
          <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlane} />
            <span className="text-sm font-medium">Find Flight along with stays</span>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-4xl font-bold text-blue-400">tbo<span className="text-red-400">.com</span></span>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-blue-200 transition-colors">
            Login
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
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
          {/* <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 p-4 rounded">From-To Input</div>
              <div className="bg-gray-100 p-4 rounded">Date Range Input</div>
              <div className="bg-gray-100 p-4 rounded">Passengers Input</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded">Class Selection</div>
              <div className="bg-gray-100 p-4 rounded">Budget Input</div>
              <div className="flex items-center justify-end gap-4">
                <span>+ Add Promo Code</span>
                <button className="px-6 py-2 bg-blue-500 text-white rounded">Plan Tour</button>
              </div>
            </div>
          </div> */}
          <TourBookingForm />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 px-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Brief Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Brief</h2>
          <div className="h-40 bg-gray-200 rounded">Brief content here</div>
          
          {/* Flight Details */}
          <div className="mt-4">
            <FlightTicket />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(day => (
              <div key={day} className="bg-gray-200 p-4 rounded">
                Day {day} Timeline Content
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;