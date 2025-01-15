import React from 'react';

const Navbar = () => {
  return (
    <nav className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      {/* Background image overlay with dark clouds effect */}
      <div className="bg-gray-800" />
      
      {/* Main navbar content */}
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section */}
        <div className="flex items-center space-x-6">
          {/* Plane icon and text */}
          <div className="flex items-center space-x-2">
            <svg 
              className="w-6 h-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="text-sm font-medium">Find Flight along with stays</span>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-3xl font-bold text-blue-400">tbo<span className="text-white">.com</span></span>
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
    </nav>
  );
};

export default Navbar;