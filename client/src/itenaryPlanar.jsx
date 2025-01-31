import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const mockSightseeingAPI = async (timeline) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const dailyAttractions = {};
      timeline.itinerary.forEach(dayPlan => {
        dailyAttractions[dayPlan.day] = dayPlan.activities.map((activity, index) => ({
          id: `${dayPlan.day}-${index + 1}`,
          name: activity.activity,
          duration: parseInt(activity.duration),
          timeSlot: activity.time,
          notes: activity.notes,
          cost: activity.cost
        }));
      });
      
      return resolve(dailyAttractions);
    }, 1000);
  });
};

const ItineraryPlanner = ({ queryData }) => {
  const [destination, setDestination] = useState("");
  const [numDays, setNumDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [itinerary, setItinerary] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const daysRef = useRef({});

  const handleSearch = async () => {
    if (!queryData) return;
    
    // Extract information from queryData
    setDestination(queryData.destination || "");
    setNumDays(queryData.itinerary ? queryData.itinerary.length : 1);
    
    // Try to get start date from first day's first activity
    if (queryData.itinerary && queryData.itinerary[0].activities[0]) {
      const firstActivity = queryData.itinerary[0].activities[0];
      setStartDate(firstActivity.time ? firstActivity.time.split(' ')[0] : "");
    }
    
    setLoading(true);
    try {
      const data = await mockSightseeingAPI(queryData);
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
    if (!startDate) return "";
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
                                Duration: {attraction.duration} hours
                              </p>
                              {attraction.notes && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {attraction.notes}
                                </p>
                              )}
                              {attraction.cost && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Cost: {attraction.cost}
                                </p>
                              )}
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