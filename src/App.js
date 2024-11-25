  import React, { useState, useEffect } from 'react';
import Forecast from './components/Forecast';
import TempAndDetails from './components/TempAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import { FaSearchLocation } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { city } from './constants';
import { getWeatherInfo, getCurrent } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState({});
  const [units, setUnits] = useState("");

  useEffect(()  => {
    searchCity('vijayawada');
  }, []);


const handleCityName = (e) => {
  setCityName(e.target.value);
}; 

 const searchCity = async (value, unit?) => {
  if(value) {
    if(unit === undefined || unit === null) {
      unit = 'standard'
    };
    setUnits(unit);
    const totalWeatherInfo = await getWeatherInfo(value, unit);
    if(totalWeatherInfo.cod === "404") {
      toast.error(`City Name ${cityName} is Not found`);
    } else {
      setCityData(totalWeatherInfo);
      if(unit === 'standard') {
        toast.success(`Fetched weather data successfully for ${totalWeatherInfo?.cityDetails?.name}`);
      }
    }
    setCityName('');
  }
};

const backGroundChange = () => {
  if(!cityData || ( (units === 'standard' && cityData?.cityDetails?.temp <= 300) ||
    (units === 'metric' && cityData?.cityDetails?.temp <= 25) ||
    (units === 'imperial' && cityData?.cityDetails?.temp <= 78)
   )) {
    return 'from-cyan-700 to-blue-500';
  } else {
    return 'from-orange-700 to-yellow-500';
  }
};

const handleLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getCurrentLocation(latitude, longitude);
    })
  }
};

const getCurrentLocation = async (lat, lon) => {
const data = await getCurrent(lat, lon);
searchCity(data.name);
}

const getTempSign = (unit) => {
  searchCity(cityData?.cityDetails?.name, unit);    
};

  return (
    <div className={`h-fit bg-gradient-to-br shadow-xl shadow-gray-400 my-1 mx-auto w-3/4
    rounded-md p-6 text-yellow-50 ${backGroundChange()}`}>

        <div className="flex justify-around">
            {city.map((city) => (
                <button key={city.id} className="rounded-md hover:scale-150" onClick={() => { searchCity(city.name) }}>{city.name}</button>
            ))}
        </div>

      <div className="px-16 pt-6 pb-2 flex flex-row">
          <input placeholder="Enter the city name..." type="text" onChange = {handleCityName} value={cityName}
           className="w-3/4 rounded-md p-2 min-w-20 focus:outline-none text-black"/>
          <div className="flex flex-row items-center cursor-pointer">
          <FaSearchLocation className="mx-6 hover:scale-150" size={25} onClick = {() => { searchCity(cityName) }}/>
          <MdMyLocation className="hover:scale-150" size={25} onClick={() => { handleLocation() }}/>
          <button name="imperial" className="text-2xl ml-6 font-bold hover:scale-150"
          onClick={() => { getTempSign('metric') }}>C</button>
          <p className="text-2xl mx-1 font-bold">|</p>
          <button className="text-2xl font-bold hover:scale-150"
          onClick={() => { getTempSign('imperial') }}>F</button>
          </div>
      </div>

      {
        cityData?.cityDetails && (
          <>
          <TimeAndLocation cityData={ cityData?.cityDetails }/>
          <TempAndDetails cityData={ cityData?.cityDetails } units={units}/>
          </>
        )
        
      }
      {
        cityData?.foreCastData && (
          <>
           <Forecast hourlyData={cityData?.foreCastData?.hourly} hour={true}/>
           <Forecast hourlyData={cityData?.foreCastData?.daily} hour={false}/>
          </>
        )
      }
      <ToastContainer autoClose={1000} theme="colored" position="top-center"/>
    </div>
  )
}

export default App;
