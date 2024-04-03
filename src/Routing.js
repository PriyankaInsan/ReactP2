import React, { Fragment, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import ErrorBoundary from "./common/utils/ErrorBoundary";

import Home from "./features/home/Home";
import Test from "./features/modals/Test";
import FeedWaterHome from "./features/feedwater/FeedWaterHome";
import SalesforceLogin from "./features/login/SalesforceLogin";
import SalesforceCallback from "./features/login/SalesforceCallback";
import {
  setUserAttributes,
  setAccessTokens,
  clearAuthData,
} from "./features/login/AuthSlice";
import { updateProjectInfo } from "./common/ProjectInfoSlice";
import { updateUserInfo } from "./common/UserInfoSlice";

function Routing() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState();

  if (JSON.parse(localStorage.getItem("accessTokens")) !== null) {
    dispatch(setAccessTokens(JSON.parse(localStorage.getItem("accessTokens"))));
    dispatch(
      setUserAttributes(JSON.parse(localStorage.getItem("loggedInData")))
    );
  }

  //function to check for inactivity and log out
  const checkForInactivity = () => {
    // console.log("checkForInactivity called----");
    const expireTime = localStorage.getItem("expireTime");
    // console.log("current expireTime : ",expireTime);
    // console.log("Date.now() : ",Date.now());
    // console.log("Comparing---", expireTime < Date.now());

    //If Expire Time is earlier than now, log out
    if (expireTime < Date.now()) {
      console.log("expireTime < Date.now - LOGOUT");
      setLoggedIn(false);
      dispatch(clearAuthData());
      localStorage.clear();
      sessionStorage.clear();
      //window.location.href = process.env.REACT_APP_LOGOUT_ENDPOINT;
      window.location.href =
        process.env.REACT_APP_TOKEN_SFDCURL + "auth/idp/oidc/logout";
    }
  };
  //function to update expire time
  const updateExpireTime = () => {
    // console.log("updateExpireTime called----");
    //set expire time to 1 hour from now
    const expireTime = Date.now() + 30 * 60 * 1000;
    // console.log("setting initial expire time as : ",expireTime);
    localStorage.setItem("expireTime", expireTime);
    // console.log(" expireTime set in localStorage ");
  };
  //Use Effect to set interval to check for inactivity every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("calling checkForInactivity");
      checkForInactivity();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ProjectInfo = JSON.parse(localStorage.getItem("ProjectInfo"));
    const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

    if (ProjectInfo) {
      dispatch(updateProjectInfo(ProjectInfo));
    }
    if (UserInfo) {
      dispatch(updateUserInfo(UserInfo));
    }
  }, []);
  useEffect(() => {
    //set initial expire time
    // console.log("setting initial expire time- updateExpireTime");
    updateExpireTime();
    //set event listeners
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("scroll", updateExpireTime);
      window.addEventListener("mousemove", updateExpireTime);
    };
  }, []);
  const clearUserData = () => {
    dispatch(clearAuthData());
    window.localStorage.clear();
  };
  useEffect(() => {
    return clearUserData();
  }, []);
  /* Ensures that only authenticated users can access private routes. */
  return (
    <Fragment>
      <div style={{minHeight:"100vh"}}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SalesforceLogin />}></Route>
          <Route
            exact
            path="/oauth2/callback/"
            element={<SalesforceCallback />}
          />

          <Route exact path="/Home" element={<PrivateRoute />}>
            <Route exact path="/Home" element={<Home />} />
          </Route>

          <Route exact path="/FeedWaterHome" element={<PrivateRoute />}>
            <Route exact path="/FeedWaterHome" element={<FeedWaterHome />} />
          </Route>

          <Route exact path="/test" element={<PrivateRoute />}>
            <Route exact path="/test" element={<Test />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      </div>
    </Fragment>
  );
}

export default Routing;
