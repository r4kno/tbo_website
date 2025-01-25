import { useState } from 'react'
import HomePage from './homePage'
import ItineraryPlanner from './itenaryPlanar'

function App() {
  const [queryData, setQueryData] = useState(null);

  const handleTourData = (data) => {
    setQueryData(data);
  };

  return (
    <div className='overflow-hidden'>
      <HomePage onComplete={handleTourData} />
      <ItineraryPlanner queryData={queryData} />
    </div>
  )
}

export default App