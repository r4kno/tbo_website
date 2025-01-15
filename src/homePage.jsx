import React from 'react';
import TourBookingForm from './components/TourBookingForm'


const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen bg-slate-100">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[600px] bg-teal-800 text-white">
        {/* Navigation */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center">
          <div>Logo Here</div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-orange-500 rounded">Login</button>
            <button className="px-4 py-2 bg-blue-500 rounded">Sign up</button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <h3 className="text-2xl font-bold mb-4">Helping Others</h3>
          <h1 className="text-8xl font-bold mb-4">LIVE & TRAVEL</h1>
          <p className="text-xl">"Pack Your Bags, We've Got This!"</p>
        </div>

        {/* Search Form Card */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[80%] max-w-4xl">
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
          <div className="mt-8 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>Flight details placeholder</div>
              <div className="text-xl font-bold">₹6,400</div>
            </div>
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