import Search from "./Search";
import SearchResult from "./SearchResult";
import "./header.css";
import cities from "../db/cities.json";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrenthWeatherData } from "../store/features/currentWeatherSlice";
import { fetchFiveDaysWeatherData } from "../store/features/fiveDaysForeCastSlice";
import { hourlyForecastData } from "../store/features/HourlyForecastSlice";

/**
 * Header component for the application.
 * @returns {JSX.Element} - Returns a JSX element representing the header.
 */
const Header = () => {
  // State to store the filtered city data
  const [data, setData] = useState([]);
  // State to manage the debounce timer
  const [time, setKillTime] = useState();
  // State to store the currently selected city
  const [city, setCity] = useState("");
  // Redux dispatch function
  const dispatch = useDispatch();

  /**
   * Filter cities by user input and update the data state.
   * @param {number} value - User input value.
   * @returns {array} - Array of filtered cities.
   */
  const callback = (value) => {
    if (value) {
      // Filter cities based on user input
      const filteredCities = cities.cities.filter((item) => {
        return item.city.toLowerCase().includes(value.toLowerCase());
      });

      // Update the data state with filtered cities
      setData(filteredCities);
      return;
    }
    // If input is empty, reset the data state
    setData([]);
  };

  /**
   * Perform debouncing to delay the execution of the filtering function.
   * @param {object} e - Event object containing the input value.
   */
  const filterDataByCities = (e) => {
    // Clear previous timeout to avoid unnecessary calls
    if (time) {
      clearTimeout(time);
    }

    // Set a new timeout for debouncing
    const timer = setTimeout(() => {
      callback(e.target.value);
    }, 800);

    // Update the debounce timer state
    setKillTime(timer);
  };

  /**
   * Update the city state when the user starts typing.
   * @param {string} city - The selected city.
   */
  const updateApplicationDataByCity = async (city) => {
    setCity(city);
  };

  // Use useEffect to dispatch weather data fetching actions when the city state changes
  useEffect(() => {
    try {
      if (city) {
        // Dispatch actions to fetch current weather, five days forecast, and hourly forecast data
        dispatch(fetchCurrenthWeatherData(city));
        dispatch(fetchFiveDaysWeatherData(city));
        dispatch(hourlyForecastData(city));
      }
    } catch (error) {
      // Handle errors if any
    }
  }, [city, dispatch]);

  // Render the header component with Search and SearchResult components
  return (
    <header className="header">
      <Search filterDataByCities={filterDataByCities} />
      <SearchResult
        listOfCities={data}
        updateApplicationDataByCity={updateApplicationDataByCity}
      />
    </header>
  );
};

// Export the Header component as the default export
export default Header;
