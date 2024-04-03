import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data:null,
};
export const SearchFilterSlice = createSlice({
  name: "Searchtxt",
  initialState,
  reducers: {
    searchstoreT: (state,action) => {
      state.data = action.payload;
    },
  },
});
  
// Action creators are generated for each case reducer function
export const { searchstoreT} = SearchFilterSlice.actions;
  
export default SearchFilterSlice.reducer;