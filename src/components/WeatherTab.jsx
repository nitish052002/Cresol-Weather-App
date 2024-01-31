import React, { useEffect, useState } from "react";
import "./weathertab.css";
import Tab from "./Tab";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiveDaysWeatherData } from "../store/features/fiveDaysForeCastSlice";

const WeatherTab = () => {
  const position = useSelector((state) => state.coordinate);
  const [active, setActive] = useState();

  const fiveDaysForecastData = useSelector(
    (state) => state.fiveDaysForeCast.data
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (position) {
      dispatch(fetchFiveDaysWeatherData(position));
    }
  }, [dispatch, position]);

  return (
    <div className="waeather__tab">
      {fiveDaysForecastData.length === 0 || fiveDaysForecastData == undefined
        ? ""
        : fiveDaysForecastData.map((item, index) => (
            <Tab
              data={item}
              key={item.id}
              makeTabActive={(index) => {
                setActive(index);
              }}
              index={index}
              active={active === index ? true : false}
            />
          ))}
    </div>
  );
};

export default WeatherTab;
