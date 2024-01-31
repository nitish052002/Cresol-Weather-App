import React, { useEffect, useMemo } from "react";
import "./weathercard.css";
import Graph from "./Graph";
import SunGraph from "./SunGraph";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCurrenthWeatherData } from "../store/features/currentWeatherSlice";
import { hourlyForecastData } from "../store/features/HourlyForecastSlice";

/**
 * WeatherCard component to display current weather and forecast information.
 * @returns {JSX.Element} - Returns a JSX element representing the WeatherCard.
 */
const WeatherCard = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Select current weather data from Redux store
  const currentWeatherData = useSelector((state) => state.currentWeather.data);

  // Select user's coordinates from Redux store
  const position = useSelector((state) => state.coordinate);

  // Memoized hourly forecast data from Redux store
  const hourlyForecastMemoised = useSelector(
    (state) => state.hourlyFourCast.data?.data || [],
    shallowEqual
  );

  // Use useMemo to memoize the hourly forecast data
  const hourlyForecast = useMemo(
    () => hourlyForecastMemoised,
    [hourlyForecastMemoised]
  );

  // Select current weather icon URL from Redux store
  const currentWeatherUrl = useSelector(
    (state) => state.hourlyFourCast.data.currentWeatherUrl
  );

  // Select updated hourly forecast data from Redux store
  const updatedHourlyForecast = useSelector(
    (state) => state.hourlyFourCast.newData
  );

  // Function to get hourly forecast data for the graph
  const getHourlyForcast = () => {
    if (hourlyForecast.length === 0) {
      return [];
    }
    if (updatedHourlyForecast.length !== 0) {
      return updatedHourlyForecast;
    }
    const list = hourlyForecast[0].hour;
    const data = list.map((data) => {
      const { time, temp_c } = data;

      var parsedDate = new Date(time);
      var hour = parsedDate.getHours();
      return { x: hour, y: Math.floor(temp_c) };
    });
    return data;
  };

  // Get the hourly forecast data
  const getHourlyForcaseData = getHourlyForcast();

  // Fetch hourly forecast data when user's coordinates change
  useEffect(() => {
    if (position) {
      dispatch(hourlyForecastData(position));
    }
  }, [dispatch, position]);

  // Fetch current weather data when user's coordinates change
  useEffect(() => {
    if (position) {
      dispatch(fetchCurrenthWeatherData(position));
    }
  }, [dispatch, position]);

  // Render the WeatherCard component
  return (
    <div className="weather-card">
      <div className="temperature-container">
        <div className="degree">
          {" "}
          {currentWeatherData === null || !currentWeatherData.temp
            ? ""
            : currentWeatherData.temp}
          °C
        </div>
        <div className="icon">
          <img
            src={
              currentWeatherUrl
                ? currentWeatherUrl
                : currentWeatherData === null || !currentWeatherData.url
                ? ``
                : currentWeatherData.url
            }
            alt=""
          />
        </div>
      </div>
      <div className="grap">
        <Graph getHourlyForcaseData={getHourlyForcaseData} />
      </div>
      <div className="pressure_and_humidity_container">
        <div className="pressure">
          <span>Pressure</span>
          <p>
            {currentWeatherData === null || !currentWeatherData.pressure
              ? ""
              : currentWeatherData.pressure}{" "}
            hpa
          </p>
        </div>
        <div className="humidity">
          <span>Humidity</span>
          <p>
            {currentWeatherData === null || !currentWeatherData.humidity
              ? ""
              : currentWeatherData.humidity}{" "}
            %
          </p>
        </div>
      </div>
      <div className="sun__graph">
        <div className="rectangle">
          <span>5 am</span>
          <span>1 am</span>
          <span>6 pm</span>
        </div>
        <div className="set-container">
          <div className="sunrise">
            <span>Sunrise</span>
            <p>
              {" "}
              {currentWeatherData === null || !currentWeatherData.humidity
                ? ""
                : currentWeatherData.sunrise}
            </p>
          </div>
          <div className="sunset">
            <span>Sunset</span>
            <p>
              {" "}
              {currentWeatherData === null || !currentWeatherData.humidity
                ? ""
                : currentWeatherData.sunset}
            </p>
          </div>
        </div>
        <div className="graph">
          <SunGraph />
        </div>
      </div>
    </div>
  );
};

// Export the WeatherCard component as the default export
export default WeatherCard;
