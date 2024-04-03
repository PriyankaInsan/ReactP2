import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data:0,
  title:"",
};
export const FolderProjectSlice = createSlice({
  name: "FolderProjectleftpanel",
  initialState,
  reducers: {
    FolderProjectID: (state,action) => {
      state.data = action.payload;      
    },
    updatetitle: (state,action) => {
      state.title = action.payload;
    },

  },
});
  
// Action creators are generated for each case reducer function
export const {FolderProjectID,updatetitle} = FolderProjectSlice.actions;
  
export default FolderProjectSlice.reducer;
