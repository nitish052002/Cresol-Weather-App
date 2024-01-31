import React from 'react'
import "./tile.css"
import weather from "../assests/weather.svg"



/**
 * 
 * @param {object} data 
 * 
 * @type {object} object
 * @property {string}  cityname-  
 * @property {state}   state -  
  
 * @returns array of updated cities 
 * 
 * 
 * 
 * It will call api and dispatch actions and will update application weather data on user select the city
 * @param {function updateApplicationDataByCity(city) {  where city is the value selected   by the user
  
 }} 
 */
const Tile = ({data,updateApplicationDataByCity}) => {
  return (
    <div className="tile-container" onClick={()=> {updateApplicationDataByCity(data.city.toLowerCase())}}>
        <div className="city-name">
          <p><b>{data.city}</b>, {data.state}</p>
        </div>
        <div className="temperature">
            <div className="degree">
              <span className='degree'><b>8°C</b></span>
              <span className='season-type'>Rain</span>
            </div>
            <div className="icon">
            <img src={weather} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Tile