import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hotelImage from '../assets/hotel.jpeg'; // Add your hotel image

const defaultHotelData = [
  {
    HotelName: "Hotel A",
    HotelRating: "ThreeStar",
    Address: "123 Main St",
    CityName: "New York",
    HotelFacilities: [
      "Free WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurant",
      "24-Hour Front Desk",
    ],
    PhoneNumber: "+1 123-456-7890",
    HotelWebsiteUrl: "http://hotel-a.com",
  },
  {
    HotelName: "Hotel B",
    HotelRating: "FourStar",
    Address: "456 Elm St",
    CityName: "Los Angeles",
    HotelFacilities: [
      "Free Breakfast",
      "Spa",
      "Business Center",
      "Bar",
      "Room Service",
    ],
    PhoneNumber: "+1 234-567-8901",
    HotelWebsiteUrl: "http://hotel-b.com",
  },
  // Add more hotels as needed
];

const HotelBooking = ({ hotelData = defaultHotelData }) => {
  // Function to handle the booking action
  const handleBookNow = (hotelName) => {
    alert(`Booking ${hotelName}`);
  };

  const top10Hotels = hotelData.slice(0, 10);
  // Slider settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only 1 card at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true, // Center the current slide
    centerPadding: '0', // Remove extra padding
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    switch (rating) {
      case "OneStar":
        return "★";
      case "TwoStar":
        return "★★";
      case "ThreeStar":
        return "★★★";
      case "FourStar":
        return "★★★★";
      case "FiveStar":
        return "★★★★★";
      default:
        return "N/A";
    }
  };

  // Function to get 3 random features
  const getRandomFeatures = (facilities) => {
    if (!facilities || facilities.length === 0) return [];
    const shuffled = [...facilities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <div className="container mx-auto p-4">
      <Slider {...settings}>
        {top10Hotels.map((hotel, index) => {
          const {
            HotelName = "Unknown Hotel",
            HotelRating = "N/A",
            Address = "N/A",
            CityName = "N/A",
            HotelFacilities = [],
            PhoneNumber = "N/A",
            HotelWebsiteUrl = "#",
          } = hotel;

          // Get 3 random features
          const randomFeatures = getRandomFeatures(HotelFacilities);

          return (
            <div key={index} className="p-4">
              <div className="flex gap-6 items-stretch max-w-5xl mx-auto">

                {/* Hotel Card */}
                <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
                  {/* Hotel Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{HotelName}</h2>
                    <span className="text-xl text-red-500 font-semibold">
                      {renderStars(HotelRating)}
                      {/* <h6>{HotelRating}</h6>  */}
                    </span>
                  </div>

                  {/* Address Section */}
                  <div className="text-gray-600 mb-4">
                    <p>{Address}</p>
                    <p>{CityName}</p>
                  </div>

                  {/* Random Features */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Hotel Facilities:</h3>
                    <ul className="list-disc list-inside pl-4">
                      {randomFeatures.map((feature, idx) => (
                        <li key={idx} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact & Booking */}
                  <div className="flex justify-between items-center mt-6 border-t pt-4">
                    <div className="text-gray-600">
                      <p>Phone: {PhoneNumber}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(HotelName)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                {/* Image Container */}
                <div className="relative aspect-square w-72 shadow-md rounded-lg overflow-hidden">
                  <img 
                    src={hotelImage} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HotelBooking;