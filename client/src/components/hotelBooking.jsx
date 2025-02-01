import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const defaultHotelData = [
  {
    HotelName: "Hotel A",
    HotelRating: "ThreeStar",
    Address: "123 Main St",
    CityName: "New York",
    CountryName: "USA",
    HotelCode: "H123",
  },
  {
    HotelName: "Hotel B",
    HotelRating: "FourStar",
    Address: "456 Elm St",
    CityName: "Los Angeles",
    CountryName: "USA",
    HotelCode: "H456",
  },
  {
    HotelName: "Hotel C",
    HotelRating: "FiveStar",
    Address: "789 Oak St",
    CityName: "Chicago",
    CountryName: "USA",
    HotelCode: "H789",
  },
  {
    HotelName: "Hotel D",
    HotelRating: "ThreeStar",
    Address: "101 Pine St",
    CityName: "San Francisco",
    CountryName: "USA",
    HotelCode: "H101",
  },
  {
    HotelName: "Hotel E",
    HotelRating: "FourStar",
    Address: "202 Maple St",
    CityName: "Seattle",
    CountryName: "USA",
    HotelCode: "H202",
  },
  {
    HotelName: "Hotel F",
    HotelRating: "FiveStar",
    Address: "303 Cedar St",
    CityName: "Boston",
    CountryName: "USA",
    HotelCode: "H303",
  },
  {
    HotelName: "Hotel G",
    HotelRating: "ThreeStar",
    Address: "404 Birch St",
    CityName: "Miami",
    CountryName: "USA",
    HotelCode: "H404",
  },
  {
    HotelName: "Hotel H",
    HotelRating: "FourStar",
    Address: "505 Walnut St",
    CityName: "Dallas",
    CountryName: "USA",
    HotelCode: "H505",
  },
  {
    HotelName: "Hotel I",
    HotelRating: "FiveStar",
    Address: "606 Cherry St",
    CityName: "Houston",
    CountryName: "USA",
    HotelCode: "H606",
  },
  {
    HotelName: "Hotel J",
    HotelRating: "ThreeStar",
    Address: "707 Spruce St",
    CityName: "Atlanta",
    CountryName: "USA",
    HotelCode: "H707",
  },
];

const HotelBooking = ({ hotelData = defaultHotelData }) => {
  // Function to handle the booking action
  const handleBookNow = (hotelName) => {
    alert(`Booking ${hotelName}`);
    // You can replace the alert with actual booking logic
  };

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

  // Limit the hotels to the top 10
  const top10Hotels = hotelData.slice(0, 10);

  return (
    <div className="container mx-auto p-4">
      <Slider {...settings}>
        {top10Hotels.map((hotel, index) => {
          const hotelDetails = {
            name: hotel.HotelName || "Unknown Hotel",
            rating: hotel.HotelRating || "N/A",
            address: hotel.Address || "N/A",
            city: hotel.CityName || "N/A",
            country: hotel.CountryName || "N/A",
            code: hotel.HotelCode || "N/A",
          };

          return (
            <div key={index} className="p-4">
              <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {hotelDetails.name}
                  </h2>
                  <span className="text-xl text-red-500 font-semibold">
                    {hotelDetails.rating}
                  </span>
                </div>

                <div className="text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">
                      {hotelDetails.rating === "ThreeStar" ? "★★★" : "N/A"}
                    </span>
                    <span>({hotelDetails.rating})</span>
                  </div>
                  <div className="mt-2">
                    {hotelDetails.address}
                  </div>
                  <div className="mt-1">
                    {hotelDetails.city}, {hotelDetails.country}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-gray-600">
                    Hotel Code: {hotelDetails.code}
                  </div>
                  <button
                    onClick={() => handleBookNow(hotelDetails.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Book Now
                  </button>
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