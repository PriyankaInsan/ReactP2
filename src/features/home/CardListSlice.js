import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
const initialState = {
  data: [],
  Temdata:0,
  loader:false,
  Clear:0,
  title:"PN",
  order:"A",
  sbTechnology:[],
  flag:"Last Modified",
  pFlag:"Last Modified",
  pTitle:"MD"
};


const sortTheData = (data, order, target) => {
  let flags = [
    "second",
    "seconds",
    "minute",
    "minutes",
    "hour",
    "hours",
    "day",
    "days",
    "month",
    "months",
    "year",
    "years",
  ];
 
  const sortedData = data.sort((a, b) => {
    const aValues = a[target].split(" ");
    const bValues = b[target].split(" ");
 
    const aIndex = flags.indexOf(aValues[2]);
    const bIndex = flags.indexOf(bValues[2]);
 
    if (aIndex !== bIndex) {
      if (order === "A") {
        return aIndex - bIndex;
      } else {
        return bIndex - aIndex;
      }
    } else {
      const aValue = Number(aValues[1]);
      const bValue = Number(bValues[1]);
 
      if (order === "A") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });
 
  return sortedData;
};

export const CardListSlice = createSlice({
  name: "cardlist",
  initialState,
  reducers: {
    btnlist: (state,action) => {
      state.data = action.payload;
    },
    updateLoader: (state,action) => {
      state.loader = action.payload;
    },
    Tempbtnlist: (state,action) => {
      state.Temdata = action.payload;
    },
    updatetitle: (state,action) => {
      state.title = action.payload;
    },
    updateOrder: (state,action) => {
      state.order = action.payload;
    },
    updateSubTechnology: (state,action) => {
      state.sbTechnology = action.payload;
    },
    updateFlag: (state,action) => {
      state.flag = action.payload;
    },
    sortData:(state, action)=>{
      
      if(state.title === action.payload){
        state.order = state.order==="A"? "D":"A";
      }
      else{
        state.title = action.payload;
        state.order = "A";
      }

      switch (action.payload) {
      case "CD":
        state.data = sortTheData(state.data,state.order,"createDateDuration");
        break;
      case "MD":
        state.data = sortTheData(state.data,state.order,"modifiedDuration");
        break;

      case "PN":
        state.data = state.data.slice().sort(function (a, b) {
          const projectNameA = a.projectName.toLowerCase().trim();
          const projectNameB = b.projectName.toLowerCase().trim();
       
          if (projectNameA < projectNameB) {
            return state.order === "A" ? -1 : 1;
          } else if (projectNameA > projectNameB) {
            return state.order === "A" ? 1 : -1;
          } else {
            return 0;
          }
        });
        break;

      
      default:
        break;
      }

      
    },
    sortData2:(state, action)=>{
      
     let {flag,data} = action.payload;
     state.title = flag;
     state.pTitle = flag;
      let newdata = JSON.parse(JSON.stringify(data));

      switch (flag) {
      case "CD":
        state.data = sortTheData(newdata,state.order,"createDateDuration");
        break;
      case "MD":
        state.data = sortTheData(newdata,state.order,"modifiedDuration");
        break;

      case "PN":
        state.data = newdata.slice().sort(function (a, b) {
          const projectNameA = a.projectName.toLowerCase().trim();
          const projectNameB = b.projectName.toLowerCase().trim();
       
          if (projectNameA < projectNameB) {
            return state.order === "A" ? -1 : 1;
          } else if (projectNameA > projectNameB) {
            return state.order === "A" ? 1 : -1;
          } else {
            return 0;
          }
        });
        break;

      
      default:
        break;
      }

      
    }
  },
});
  
// Action creators are generated for each case reducer function
export const { btnlist, updateLoader,Tempbtnlist,updatetitle,updateOrder,sortData,sortData2,updateSubTechnology,updateFlag} = CardListSlice.actions;
  
export default CardListSlice.reducer;
