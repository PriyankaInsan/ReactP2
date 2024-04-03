import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
//const SALESFORCE_TOKEN_URL= process.env.REACT_APP_TOKEN_ENDPOINT;
const SALESFORCE_TOKEN_URL= process.env.REACT_APP_TOKEN_SFDCURL+"services/oauth2/token";

const redirectToLogin = () => {
  state.idToken = null;   
  state.accessToken = null;
  state.refreshToken = null;
  state.isLoggedIn = false;
  state.customAttributes = {};
  localStorage.clear();
  // window.location.href = process.env.REACT_APP_LOGOUT_ENDPOINT;
  window.location.href = process.env.REACT_APP_TOKEN_SFDCURL+"auth/idp/oidc/logout";
};

export const refreshAccessToken = createAsyncThunk("auth/refreshToken", async(_,{ getState, rejectWithValue})=> {
  try{
    const state = getState();
    console.log("REFRESHING ACCESS TOKEN....");
    const response = await axios.post(SALESFORCE_TOKEN_URL, null, {
      params:{
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: state.Auth.refreshToken
      },
    });
    
    if(response.status === 200){
      console.log("RECEIVED NEW ACCESS TOKEN!!!");
      return response.data.access_token;
    }else{
      console.log("FAILED TO RECEIVE ACCESS TOKEN.");
      redirectToLogin();
      // return rejectWithValue("Token refresh failed.");
    }
  }catch(error){
    console.log("Catch: Refresh Aceess Token Failed",error?.message);
    redirectToLogin();
    // return rejectWithValue(error.message);
  }
});

const initialState = {
  idToken: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn:false,
  customAttributes: {},
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAccessTokens: (state,action) => {
      state.idToken = action?.payload?.id_token;   
      state.accessToken = action?.payload?.access_token;  
      state.refreshToken = action?.payload?.refresh_token;
      state.isLoggedIn= true;
    },
    setUserAttributes: (state,action) => {
      state.customAttributes = action?.payload;   
    },
    clearAuthData: (state) => {
        state.idToken = null;   
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.customAttributes = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
  }
});
  
// Action creators are generated for each case reducer function
export const {setAccessTokens, setUserAttributes, clearAuthData} = AuthSlice.actions;
export const isLoggedIn = (state) => state.Auth.isLoggedIn;
export const selectIDToken = (state) => state.Auth.idToken;
export const selectAccessToken = (state) => state.Auth.accessToken;
export const selectRefreshToken = (state) => state.Auth.refreshToken;
export const selectUserAttributes = (state) => state.Auth.customAttributes;

export default AuthSlice.reducer;