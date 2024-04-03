import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {
    UserId: 0,
    UserName: null,
    EmailId: null,
    Role: null,
    lastLoggedIn: null,
    applicationVersion: null,
    CompanyName: null,
  },
};

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.data = action.payload;
      // console.log("------------- UserInfoSlice action.payload : ", action.payload);
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserInfo } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
