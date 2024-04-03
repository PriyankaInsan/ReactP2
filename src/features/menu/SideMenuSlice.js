import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: "masterdata/api/v1/ProjectRecent",
};
export const SideMenuSlice = createSlice({
  name: "leftpanel",
  initialState,
  reducers: {
    updateLeftpanel: (state,action) => {
      state.data = action.payload;
    },
  },
});
  
// Action creators are generated for each case reducer function
export const {updateLeftpanel} = SideMenuSlice.actions;
  
export default SideMenuSlice.reducer;
