import React, { useEffect, useMemo } from "react";
import "./tab.css";
import { useDispatch, useSelector } from "react-redux";
import { updateHourlyData } from "../store/features/HourlyForecastSlice";
import { updateWeatherData } from "../store/features/currentWeatherSlice";

/**
 * Tab component representing a daily weather forecast.
 * @param {object} data - Object containing weather data for a specific day.
 * @param {number} index - Index of the tab.
 * @param {boolean} active - Indicates if the tab is active.
 * @param {function} makeTabActive - Function to set the active tab.
 * @returns {JSX.Element} - Returns a JSX element representing the Tab.
 */
const Tab = ({ data, index = 0, active, makeTabActive }) => {
  // Destructure properties from the data object
  const { id, min_temp, max_temp, weather_type, iconCode } = data;

  // Function to get the day name based on the index
  const getDayName = (index) => {
    switch (index) {
      case 0:
        return "Sun";
      case 1:
        return "Mon  ";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Fetching...";
    }
  };

  // Get the current date and calculate the index of the day
  const d = new Date();
  let indexOfDay = null;

  if (index + d.getDay() > 6) {
    indexOfDay = index + d.getDay() - 7;
  } else {
    indexOfDay = index + d.getDay();
  }

  // Get the day name based on the calculated index
  const dayName = getDayName(indexOfDay);

  // Select hourly forecast data from Redux store
  const hourlyForecastData = useSelector((state) => state.hourlyFourCast);

  // Use useMemo to memoize the hourly forecast data
  const hourlyForecast = useMemo(
    () => hourlyForecastData,
    [hourlyForecastData]
  );

  // Redux dispatch function
  const dispatch = useDispatch();

  /**
   * Function to update the hourly forecast data when the tab is clicked.
   * @param {number} index - Index of the active tab.
   */
  const updateHourlyForcast = (index) => {
    if (hourlyForecast.length === 0) {
      return [];
    }
    if (hourlyForecast.data.data) {
      const list = hourlyForecast.data.data[index].hour;
      const data = list.map((data) => {
        const { time, temp_c } = data;

        var parsedDate = new Date(time);
        var hour = parsedDate.getHours();
        return { x: hour, y: Math.floor(temp_c) };
      });
      dispatch(updateHourlyData(data));
    }
  };

  /**
   * Function to update the weather card component data.
   * @param {number} index - Index of the hourly forecast data.
   */
  const updateWeatherCardData = (index) => {
    if (hourlyForecast.length === 0) {
      return [];
    }

    const list = hourlyForecast.data.data[index];
    if (list.astro && list.day) {
      let data = {
        pressure: list.hour[0].pressure_mb,
        humidity: list.day.avghumidity,
        temp: Math.floor(min_temp),
        sunrise: list.astro.sunrise,
        sunset: list.astro.sunset,
        url: list.day.condition.icon,
      };

      dispatch(updateWeatherData(data));
    }
  };

  /**
   * Callback function to update data when the tab is clicked.
   * @param {number} index - Index of the clicked tab.
   */
  const callBack = (index) => {
    const idx = index > 2 ? 0 : index;

    updateHourlyForcast(idx);
    updateWeatherCardData(idx);
    makeTabActive(index);
  };

  // useEffect to make the first tab active on the initial render
  useEffect(() => {
    makeTabActive(0);
  }, []);

  // Render the Tab component
  return (
    <div
      onClick={() => {
        callBack(index);
      }}
      className={active ? "tab active" : "tab"}
      id={id}
    >
      <p className="day">{dayName}</p>
      <p className="degree">
        <b>{min_temp}°C</b> {max_temp}°C
      </p>
      <div className="icon-container">
        <div className="icon">
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt=""
          />
        </div>
        <div className="icon-name">{weather_type}</div>
      </div>
    </div>
  );
};

// Export the Tab component as the default export
export default Tab;
