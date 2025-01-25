export const mockSightseeingAPI = async (destination, days) => {
    const dailyAttractions = {
      1: [
        { id: 1, name: `${destination} Museum`, duration: 120, timeSlot: '09:00' },
        { id: 2, name: `${destination} Park`, duration: 90, timeSlot: '11:30' },
      ],
      2: [
        { id: 3, name: `${destination} Art Gallery`, duration: 120, timeSlot: '10:00' },
        { id: 4, name: `${destination} Beach`, duration: 90, timeSlot: '13:00' },
      ],
    };
  
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {};
        for (let i = 1; i <= days; i++) {
          result[i] = dailyAttractions[i] || dailyAttractions[1];
        }
        resolve(result);
      }, 1000);
    });
  };
  