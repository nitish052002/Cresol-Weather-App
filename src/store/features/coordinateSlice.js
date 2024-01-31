import { createSlice } from "@reduxjs/toolkit";

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
