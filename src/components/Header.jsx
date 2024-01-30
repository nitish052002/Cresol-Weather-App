import Search from "./Search";
import SearchResult from "./SearchResult";
import "./header.css";
import cities from "../db/cities.json";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrenthWeatherData } from "../store/features/currentWeatherSlice";
import { fetchFiveDaysWeatherData } from "../store/features/fiveDaysForeCastSlice";
import { hourlyForecastData } from "../store/features/HourlyForecastSlice";

const Header = () => {
  const [data, setData] = useState([]);
  const [time, setKillTime] = useState();
  const [city, setCity] = useState("");
  const dispatch = useDispatch();


  /**
   * filter cities by user input and update data state 
   * @param {number} value 
   * @returns array of cities
   */

  const callback = (value) => {
    if (value) {
      const filteredCities = cities.cities.filter((item) => {
        return item.city.toLowerCase().includes(value.toLowerCase());
      });

      setData(filteredCities);
      return;
    }
    setData([]);
  };





  /**
   *performing debouncing 
   * @param {object} e  - event object
   */

  const filterDataByCities = (e) => {
    if (time) {
      clearTimeout(time);
    }
    const timer = setTimeout(() => {
      callback(e.target.value);
    }, 800);
    setKillTime(timer);
  };




  /**
   * updating city state when user starts typing 
   * @param {string} city    *  
   */

  const updateApplicationDataByCity = async (city) => {
    setCity(city);
  };

  useEffect(() => {
    try {
      if (city) {
        dispatch(fetchCurrenthWeatherData(city));
        dispatch(fetchFiveDaysWeatherData(city));
        dispatch(hourlyForecastData(city));
      }
    } catch (error) {}
  }, [city, dispatch]);

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

export default Header;
