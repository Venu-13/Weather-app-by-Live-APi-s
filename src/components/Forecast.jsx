import React from 'react';
import { WiDegrees } from "react-icons/wi";
function Forecast({hourlyData, hour}) {
  return (
    <div>
        {
          hour && <p className="px-16">3 Hour step Forecast</p>
        }
        {
            !hour && <p className="px-16">Daily Forecast</p>
        }
        <hr className="my-1 mx-16"/>
        <div className="flex flex-row justify-between px-16">

        {hourlyData.map((data, index) => (
            <div className="flex flex-col items-center" key={index}>
            <span>{data?.title}</span>
            <img src={data?.icon} alt="No" className="size-20"/>
            <div className="flex flex-row">
            <span>{data?.temp.toFixed()}</span>
            <WiDegrees size={25}className="rounded"/>
            </div>
           </div>
        ))}

        </div>
    </div>
  )
}

export default Forecast;