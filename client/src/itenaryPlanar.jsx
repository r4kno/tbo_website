import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const mockSightseeingAPI = async (destination, days) => {
  const dailyAttractions = {
    1: [
      { id: 1, name: "Historical Museum", duration: 120, timeSlot: "09:00" },
      { id: 2, name: "Central Park", duration: 90, timeSlot: "11:30" },
      { id: 3, name: "Local Market", duration: 60, timeSlot: "13:30" }
    ],
    2: [
      { id: 4, name: "Art Gallery", duration: 120, timeSlot: "10:00" },
      { id: 5, name: "Beach Walk", duration: 90, timeSlot: "13:00" },
      { id: 6, name: "Sunset Point", duration: 60, timeSlot: "16:00" }
    ]
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      const result = {};
      for (let i = 1; i <= days; i++) {
        result[i] = dailyAttractions[i] || dailyAttractions[1];
      }
      return resolve(result);
    }, 1000);
  });
};

const ItineraryPlanner = ({ queryData }) => {
  console.log("ItineraryPlanner received queryData:", queryData);
  const [destination, setDestination] = useState("");
  const [numDays, setNumDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [itinerary, setItinerary] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const daysRef = useRef({});

  const handleSearch = async () => {
    if (!queryData) return;
    
    setDestination(queryData.to);
    setNumDays(queryData.returnDate);
    setStartDate(queryData.departDate);
    console.log("Searching for attractions in", queryData.to, "for", queryData.returnDate, "days");
    
    setLoading(true);
    try {
      const data = await mockSightseeingAPI(queryData.to, queryData.returnDate);
      setItinerary(data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (queryData) {
      handleSearch();
    }
  }, [queryData]);

  const getDayDate = (dayNum) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayNum - 1);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let closestDay = 1;
      let minDistance = Infinity;

      Object.entries(daysRef.current).forEach(([day, ref]) => {
        if (ref) {
          const distance = Math.abs(ref.offsetTop - scrollPosition);
          if (distance < minDistance) {
            minDistance = distance;
            closestDay = parseInt(day);
          }
        }
      });

      setActiveDay(closestDay);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
     

      {Object.keys(itinerary).length > 0 && (
        <div className="flex gap-6">
          <div className="flex-grow space-y-6">
            {Object.entries(itinerary).map(([day, attractions]) => (
              <div key={day} ref={el => daysRef.current[day] = el}>
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Day {day} - {getDayDate(parseInt(day))}
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="relative">
                      {attractions.map((attraction) => (
                        <div key={attraction.id} className="flex items-start mb-8">
                          <div className="flex-shrink-0 w-24 text-sm text-gray-500">
                            {attraction.timeSlot}
                          </div>
                          <div className="relative flex-grow pl-8 border-l-2 border-blue-200">
                            <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-blue-500" />
                            <div className="bg-white rounded-lg shadow p-4 mb-4">
                              <h4 className="font-semibold flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {attraction.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Duration: {attraction.duration} minutes
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-56 fixed top-16 right-11 h-fit">
            <div className="bg-white rounded-lg shadow p-4">
              {Object.keys(itinerary).map((day) => (
                <div
                  key={day}
                  className={`py-2 px-4 mb-2 rounded cursor-pointer transition-colors ${
                    parseInt(day) === activeDay
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => {
                    daysRef.current[day]?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {getDayDate(parseInt(day))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPlanner;