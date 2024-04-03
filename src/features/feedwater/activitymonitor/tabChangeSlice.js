import { createSlice } from "@reduxjs/toolkit";

    export const tabChangeSlice = createSlice({
    name:"tabChange",
    initialState:{
        tab:null,
    },
    reducers:{
        setTabData:(state, action) =>{
            state.tab=action.payload;
        },
        setErrorTab:(state, action) =>{
            state.tab="error";
        },
    }
});
export const { setTabData, setErrorTab} = tabChangeSlice.actions;
export default tabChangeSlice.reducer;
