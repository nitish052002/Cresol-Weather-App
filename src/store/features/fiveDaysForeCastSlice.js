import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { key } from "../../config/key";

export const fetchFiveDaysWeatherData = createAsyncThunk(
  "fetchFiveDaysWeatherData",
  async (value) => {
    try {
      const api =
        value instanceof Object
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${value.lat}&lon=${value.long}&cnt=7&appid=${key}`
          : `https://api.openweathermap.org/data/2.5/forecast?q=${value}&cnt=7&appid=${key}`;

      const result = await axios.get(api);

      const data = result.data.list.map(({ dt, dt_txt, main, weather }) => {
        const { temp, pressure, humidity, temp_min, temp_max } = main;

        return {
          id: dt,
          pressure: pressure,
          humidity: humidity,
          temp: `${Math.floor(temp - 273.15)} °C`,
          min_temp: Math.floor(temp_min - 273.15),
          max_temp: Math.floor(temp_max - 273.15),
          weather_type: weather[0].main,
          date: String(new Date(dt_txt)),
          iconCode: weather[0].icon,
        };
      });

      return data;
    } catch (error) {
      return [];
    }
  }
);
const fiveDaysForeCastSlice = createSlice({
  name: "fiveDaysForeCast",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  reducers: {
    updateFiveDaysForecase(state, action) {
      state.data = [...state.data, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFiveDaysWeatherData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFiveDaysWeatherData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchFiveDaysWeatherData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export const { updateFiveDaysForecase } = fiveDaysForeCastSlice.actions;

export default fiveDaysForeCastSlice.reducer;
