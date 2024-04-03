import { createSlice } from "@reduxjs/toolkit";

const errMsgCode = {
  code: 0,
  message: "",
};

export const activityMonitorSlice = createSlice({
  name: "scrollDirection",
  initialState: {
    direction: null,
    reportData: "",
    error: false,
    errorMsgCode: errMsgCode,
    loader: true,
  },
  reducers: {
    setScrollDirection: (state, action) => {
      state.direction = action.payload;
      console.log("scroll data", action.payload);
    },
    setReportData: (state, action) => {
      state.reportData = action.payload;
      state.loader = false;
      state.error = false;
    },
    setErrorReport: (state, action) => {
      const { error, message } = action.payload;
      state.loader = false;
      state.error = error;
      state.errorMsgCode = { code: 400, message: message };
    },
    setErrorMessage: (state, action) => {
      state.errorMsgCode = action.payload;
    },
    setReportLoader: (state, action) => {
      state.loader = true;
      state.error = false;
    },
    resetReport:(state,action)=>{
      console.log("PK state.reportData",state.reportData.length);
      state.loader = false;
      state.error = false;
      state.reportData = "";
    }
  },
});
export const {
  setScrollDirection,
  setReportData,
  setErrorReport,
  setErrorMessage,
  setReportLoader,
  resetReport,
} = activityMonitorSlice.actions;
export default activityMonitorSlice.reducer;
