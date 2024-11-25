import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters, faDroplet, faWind, faArrowUp, faArrowDown, faSun } from '@fortawesome/free-solid-svg-icons';
import { WiDegrees } from "react-icons/wi";

function TempAndDetails({cityData, units}) {

        return (
            <div>
                <div className="flex justify-center">
                    <p className="text-lg">{cityData?.details}</p>
                </div>
                <div className="flex justify-around">
                    <img src={cityData?.imgUrl} alt="sun"/>
                    <div className="flex flex-row">
                    <p className="text-3xl flex items-center">{`${cityData?.temp.toFixed()}`}</p>
                    <WiDegrees size={25}className="rounded mt-8"/>
                    <span className="flex items-center text-2xl">{
                        (units !== 'standard') && (units === 'metric' ? <p>C</p> : <p>F</p> )
                        }</span>
                    </div>

                    <div className="flex flex-col">

                        <div className="flex flex-row mt-3">
                        <FontAwesomeIcon className="mt-1.5" icon={faTemperatureThreeQuarters} />
                        <p className="ml-1.5">Real Felt:</p>
                        <div className="flex flex-row">
                        <span className="ml-1">{`${cityData?.feels_like.toFixed()}`}</span>
                        <WiDegrees size={25}className="rounded"/>
                        <span className="flex items-center text-sm">{
                        (units !== 'standard') && (units === 'metric' ? <p>C</p> : <p>F</p> )
                        }</span>
                        </div>
                        
                        </div>

                        <div className="flex flex-row">
                        <FontAwesomeIcon className="mt-1.5" icon={faDroplet} />
                        <p className="ml-1.5">Humidity:</p>
                        <span className="ml-1">{cityData?.humidity.toFixed()} %</span>
                        </div>

                        <div className="flex flex-row">
                        <FontAwesomeIcon className="mt-1.5" icon={faWind} />
                        <p className="ml-1">Wind:</p>
                        <span className="ml-2">{cityData?.speed} km/h</span>
                        </div>
                    
                    </div>
                </div>
                <div className="flex justify-center flex-row">
                        <span>
                        <FontAwesomeIcon icon={faSun} className="mr-2"/>
                            <span>SunRaise: {cityData?.sunrise}</span>
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                        <FontAwesomeIcon icon={ faSun } className="mr-2"/>
                            <span>SunSet: {cityData?.sunset}</span>
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                        <FontAwesomeIcon icon={faArrowUp} className="mr-2"/>
                            <span>High: {cityData?.temp_max.toFixed()}</span>
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                        <FontAwesomeIcon icon={faArrowDown} className="mx-2"/>
                            <span>Low: {cityData?.temp_min.toFixed()}</span>
                        </span>
                </div>

            </div>
)}

export default TempAndDetails;