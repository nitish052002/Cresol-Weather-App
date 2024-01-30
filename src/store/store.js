import { configureStore } from "@reduxjs/toolkit";
import fiveDaysForeCastReducer from "./features/fiveDaysForeCastSlice";
import curretWeatherReducer from "./features/currentWeatherSlice";
import coordinateReducer from "./features/coordinateSlice";
import hourlyForecastReducer from "./features/HourlyForecastSlice";
 
const store = configureStore({
  reducer: {
    fiveDaysForeCast: fiveDaysForeCastReducer,
    currentWeather: curretWeatherReducer,
    coordinate: coordinateReducer,
    hourlyFourCast : hourlyForecastReducer
  },
});

export default store;
