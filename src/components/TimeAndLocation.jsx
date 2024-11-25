import React from 'react'

function TimeAndLocation({cityData}) {
  return (
    <div>
        <div className="flex justify-center">
         { cityData?.localTime }
        </div>
        <div className="flex justify-center my-2 text-3xl">
            {`${ cityData?.name }, ${ cityData?.country }`}
        </div>
    </div>
  )
}

export default TimeAndLocation;