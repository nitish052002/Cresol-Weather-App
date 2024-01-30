import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const hourlyForecastData = createAsyncThunk(
  "hourlyForecastData",
  async (value) => {
    try {
      const api =
        value instanceof Object
          ? `https://api.weatherapi.com/v1/forecast.json?key=e11d7a2ade1f4ff6929180018242201&q=${value.lat},${value.long}&days=7&aqi=no&alerts=no`
          : `https://api.weatherapi.com/v1/forecast.json?key=e11d7a2ade1f4ff6929180018242201&q=${value}&days=7&aqi=no&alerts=no`;

      const result = await axios.get(api);

      const listOfHourlyData = result.data.forecast.forecastday;
      const url = result.data.current.condition.icon;

      return {
        data: listOfHourlyData,
        currentWeatherUrl: url,
      };
    } catch (error) {
      return [];
    }
  }
);
const hourlyForecastDataSlice = createSlice({
  name: "hourlyForecastData",
  initialState: {
    isLoading: false,
    data: [],
    newData: [],
    error: false,
  },
  reducers: {
    updateHourlyData(state, action) {
      state.newData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hourlyForecastData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(hourlyForecastData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(hourlyForecastData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export const { updateHourlyData } = hourlyForecastDataSlice.actions;
export default hourlyForecastDataSlice.reducer;
