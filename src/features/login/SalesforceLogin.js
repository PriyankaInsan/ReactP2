import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SalesforceLogin = () =>{ 
  const navigate = useNavigate();
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const redirectURL = process.env.REACT_APP_CALLBACK_URL;

  useEffect(()=>{
    console.log("LOGIN : REACT_APP_ENABLE_APP_SCAN",process.env.REACT_APP_ENABLE_APP_SCAN);
    console.log("LOGIN : condition check login",process.env.REACT_APP_ENABLE_APP_SCAN == "disabled");
    if(process.env.REACT_APP_ENABLE_APP_SCAN == "disabled"){
      console.log("AppScan Disabled");
      //AppScan Disabled
      redirectToSalesforce();
    }else{
      console.log("AppScan Enabled");
      //AppScan Enabled
      navigate("/home");
    }
  },[]);

  /* Redirecting to salesforce login using ClientID and secrets */
  const redirectToSalesforce = () => {
    //const salesforceLoginUrl = `${process.env.REACT_APP_AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}`;
    const salesforceLoginUrl = `${process.env.REACT_APP_TOKEN_SFDCURL+"oauth2/authorize"}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}`;
    window.location.href = salesforceLoginUrl;
  };

  return(
      <></>
  );
};
export default SalesforceLogin;

