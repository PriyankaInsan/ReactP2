import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  openProjectInitialData: [],
};
export const OpenProjectSlice = createSlice({
  name: "OpenProjectStore",
  initialState,
  reducers: {
    updateOpenProject: (state, action) => {
      console.log("openProject slice", action.payload);
      state.openProjectInitialData = action.payload;
    },
  },
});

export const { updateOpenProject } = OpenProjectSlice.actions;
export default OpenProjectSlice.reducer;
