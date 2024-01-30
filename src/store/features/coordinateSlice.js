import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const coordinateSlice = createSlice({
  name: "coordinate",
  initialState: null,
  reducers: {
    getCoords(state, action) {
      return action.payload;
    },
  },
});

export const { getCoords } = coordinateSlice.actions;

export default coordinateSlice.reducer;
