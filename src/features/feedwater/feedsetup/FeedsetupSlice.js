import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
  data: 0,
  title: "Stream 1",
  val: 0.0,
  dataisChanged:false,
  streamData: {
    lstrequestsavefeedwater: [
      {
        streams: [],
      },
    ],
  },
};
export const FeedsetupSlice = createSlice({
  name: "Feedsetupdetailsdatapanel",
  initialState,
  reducers: {
    Feedsetupdetailsdata: (state, action) => {
      state.data = action.payload;
      state.dataisChanged=false;
      // console.log("FeedSetUpSlice -> Feedsetupdetailsdata",state.data);
    },
    updateFeedData: (state,action) =>{
      state.data[0]={...state.data[0],...action.payload};
    },
    updatetitle: (state, action) => {
      state.title = action.payload;
    },
    Addedvalues: (state, action) => {
      state.val = action.payload;
    },
    UpdatedStream: (state, action) => {
      state.streamData = action.payload;
      // console.log("FeedSetUpSlice ->UpdatedStream",state.data);
    },
    detectDataChange:(state,action)=>{
      state.dataisChanged=action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { Feedsetupdetailsdata, updatetitle,detectDataChange, Addedvalues, UpdatedStream,updateFeedData } =
  FeedsetupSlice.actions;

export default FeedsetupSlice.reducer;
