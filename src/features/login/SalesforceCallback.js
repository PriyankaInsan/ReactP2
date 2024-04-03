/* Setting up callback component for receiving Authorization Code from Salesforce.*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { setAccessTokens, setUserAttributes } from "./AuthSlice";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import { useExchangeTokenMutation } from "../../services/apiConfigSSO";
import { ErrorPage } from "../../common/utils/ErrorBoundary";
import { clearAuthData } from "./AuthSlice";
import { updateUserInfo } from "../../common/UserInfoSlice";

const SalesforceCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [getApiVersion, responseGetApiVersion] = useLazyGetAllDataQuery();  
  const [POSTExchangeToken, responseTokenExchange] = useExchangeTokenMutation();
  const userInfoStore = useSelector((state) => state.userInfo.data);

  const handleErrorPage = () => {
    dispatch(clearAuthData());
    localStorage.clear();
    setShowErrorPage(true);
  };

  useEffect(() => {
    let apiUrl1 = "masterdata/api/v1/ApplicationVersion";
    getApiVersion(apiUrl1);
    
  }, []);
  useEffect(() => {
    if (responseGetApiVersion.isLoading) {
      console.log("Loading");
    }
    if (responseGetApiVersion.isSuccess) {
      localStorage.setItem("appVersion",  responseGetApiVersion.data.responseMessage);
      // const userDetails = {
      //   ...userInfoStore,
      //   ["applicationVersion"]: responseGetApiVersion.data.responseMessage,
      // };
      // dispatch(updateUserInfo(userDetails));
    }
    if (responseGetApiVersion.isError) {
      console.log("Error: Fetch User Login data", responseGetApiVersion);
    }
   
  }, [responseGetApiVersion]);
  /* On Page Load : Extracting Authorization Code from the URL Params*/
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("LOGOUTPARAM", urlParams);
    const authorization_code = urlParams.get("code");
    if (authorization_code) {
      localStorage.setItem("authCode", authorization_code);
      tokenExchange(authorization_code);
    } else {
      handleErrorPage();
    }
  }, []);

  const stringExistsInArray = (searchString, array1) => {
    const combinedArrray = array1;
    return combinedArrray.includes(searchString[0]);
  };

  /* Making POST Request to perform Salesforce Exchanging Token. Then, store Access Tokens in application store.Decode IDToken and store user details in application store. */
  const tokenExchange = async (authCode) => {
    try {
      const providerData = {
        code: authCode,
        grant_type: process.env.REACT_APP_GRANT_TYPE,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_CALLBACK_URL,
      };
      const tokenResponse = await POSTExchangeToken(providerData);
      if (tokenResponse?.data?.id_token !== undefined) {
        dispatch(setAccessTokens(tokenResponse?.data));
        localStorage.setItem(
          "accessTokens",
          JSON.stringify(tokenResponse?.data)
        );
        let data = sessionStorage.getItem("userLogedIn");
        console.log("sessionData",data);
        if(data){
          sessionStorage.setItem("userLogedIn", "false");
        }else{
          sessionStorage.setItem("userLogedIn", "true");
        }
        
        decodeIDToken(tokenResponse?.data?.id_token);
      } else {
        // console.log("Token Exchange Error Response: ",tokenResponse);
      }
    } catch (err) {
      console.log("Catch: Token Exchange Failed: ", err);
    }
  };

  /* Decode ID Token and check Permission*/
  const decodeIDToken = (idToken) => {
    let isPermissionGranted = false;
    const { REACT_APP_PROJECT_ENV } = process.env;
    const decodedInfo = jwt_decode(idToken);
    const userDetails = decodedInfo?.custom_attributes || {};
    const userName = userDetails?.First_Name + userDetails?.Last_Name;

    const newUserInfo = {
      ...userInfoStore,
      ["UserName"]: userName,
      ["Role"]: userDetails?.Role,
      ["CompanyName"]: userDetails?.CompanyName,
    };
     if(newUserInfo.applicationVersion==null){
      newUserInfo.applicationVersion=localStorage.getItem("appVersion");
    }
    if (REACT_APP_PROJECT_ENV == "dev" || REACT_APP_PROJECT_ENV == "SIT") {
      isPermissionGranted = stringExistsInArray(
        ["Wave Pro QA"],
        userDetails["AppDetails"]
      );
    } else {
      isPermissionGranted = stringExistsInArray(
        ["WavePro"],
        userDetails["PermissionSets"]
      );
    }

    if (
      userDetails?.UserEmail &&
      localStorage.getItem("accessTokens") &&
      isPermissionGranted
    ) {
      //updating authSlice with access tokens.
      dispatch(setUserAttributes(userDetails));
      //updating userInfoSlice with custom attributes from salesforce
      dispatch(updateUserInfo(newUserInfo));

      localStorage.setItem("loggedInData", JSON.stringify(userDetails));
      navigate("/home");
    } else {
      handleErrorPage();
    }
  };

  return (
    <>
      {showErrorPage ? (
        <ErrorPage
          status={403}
          message={
            "Access Forbidden: You don't have an active subscription to this application."
          }
        />
      ) : null}
    </>
  );
};

export default SalesforceCallback;
