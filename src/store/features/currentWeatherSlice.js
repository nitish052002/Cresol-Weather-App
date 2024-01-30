import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { key } from "../../config/key";

export const fetchCurrenthWeatherData = createAsyncThunk(
  "fetchCurrentWeatherData",
  async (value) => {
    try {
      const api =
        value instanceof Object
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${value.lat}&lon=${value.long}&appid=${key}`
          : `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`;

      const result = await axios.get(api);

      const { sys, main, weather } = result.data;
      const { temp, pressure, humidity } = main;
      const { sunrise, sunset } = sys;
      return {
        pressure: pressure,
        humidity: humidity,
        temp: Math.floor(temp - 273.15),
        weather_type: weather[0].description,
        sunrise: window.moment(sunrise * 1000).format("h:mm a"),
        sunset: window.moment(sunset * 1000).format("h:mm a"),
        iconCode: weather[0].icon,
        url: null,
      };
    } catch (error) {
      console.log(error);
      return {
        pressure: "",
        humidity: "",
        temp: "",
        weather_type: "",
        sunrise: "",
        sunset: "",
        url: null,
      };
    }
  }
);
const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  reducers: {
    updateWeatherData(state, action) {
      let data = action.payload;
      return { ...state.data, data };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrenthWeatherData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCurrenthWeatherData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchCurrenthWeatherData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export const { updateWeatherData } = currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;
