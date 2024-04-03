import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  Temdata:0,
  loader:false,
  Clear:0,
  title:"PN",
  order:"A",
  flag:"Date Created",
  pFlag:"Date Created",
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
 
    const aIndex = flags.indexOf(aValues[1]);
    const bIndex = flags.indexOf(bValues[1]);
 
    if (aIndex !== bIndex) {
      if (order === "A") {
        return aIndex - bIndex;
      } else {
        return bIndex - aIndex;
      }
    } else {
      const aValue = Number(aValues[0]);
      const bValue = Number(bValues[0]);
 
      if (order === "A") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });
 
  return sortedData;
};
export const ViewAllFolderSlice = createSlice({
  name: "Folderview",
  initialState,
  reducers: {
    Folderbtnlist: (state,action) => {
      state.data = action.payload;
    },
    FolderupdateLoader: (state,action) => {
      state.loader = action.payload;
    },
    FolderTempbtnlist: (state,action) => {
      state.Temdata = action.payload;
    },
    Folderupdatetitle: (state,action) => {
      state.title = action.payload;
    },
    FolderupdateOrder: (state,action) => {
      state.order = action.payload;
    },
    sortData:(state, action)=>{
      if(state.title === action.payload){
        state.order = state.order==="A"? "D":"A";
      }else{
        state.title = action.payload;
        state.order = "A";
      }

      switch (action.payload) {
      case "CD":
        state.data = sortTheData(state.data,state.order,"createdDateDuration");                 
        break;
      case "MD":
        state.data = sortTheData(state.data,state.order,"modifiedDuration");
        break;

      case "PN":
        state.data = state.data.slice().sort(function (a, b) {
          const projectNameA = a.folderName.toLowerCase().trim();
          const projectNameB = b.folderName.toLowerCase().trim();
       
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
    sortFolderData:(state, action)=>{
      let {flag,data} = action.payload;
      state.pTitle = flag;
      let newdata = JSON.parse(JSON.stringify(data));
     

      switch (flag) {
      case "CD":
        state.data = sortTheData(newdata,state.order,"createdDateDuration");                 
        break;
      case "MD":
        state.data = sortTheData(newdata,state.order,"modifiedDuration");
        break;

      case "PN":
        state.data = newdata.slice().sort(function (a, b) {
          const projectNameA = a.folderName.toLowerCase().trim();
          const projectNameB = b.folderName.toLowerCase().trim();
       
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
 
  },
});
  
// Action creators are generated for each case reducer function
export const { Folderbtnlist, FolderupdateLoader,FolderTempbtnlist,Folderupdatetitle,FolderupdateOrder,sortData,sendFlag,sortFolderData} = ViewAllFolderSlice.actions;
  
export default ViewAllFolderSlice.reducer;
