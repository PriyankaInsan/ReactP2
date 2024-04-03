import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommonSection from "./CommonSection";
import SideMenu from "../menu/SideMenu";
import SearchFilter from "./SearchFilter";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";
import AccountPreference from "../modals/AccountPreference";
import { useLazyIsNewUserQuery, useSaveUserDataMutation } from "../../services/apiConfigUserProfile";
import { updateUserInfo } from "../../common/UserInfoSlice";

import { clearAuthData, setAccessTokens, setUserAttributes } from "../login/AuthSlice";
import { MyError } from "../../common/utils/ErrorCreator";
import { ErrorPage } from "../../common/utils/ErrorBoundary";
import jwt_decode from "jwt-decode";
import { resetUfData } from "../feedwater/uf/UFSlice";

import "./home.css";
import ErrorBoundary from "../../common/utils/ErrorBoundary";

function Home() {
  const { REACT_APP_API_KEY } = process.env;
  const { REACT_APP_API_PATH } = process.env;
  console.log("REACT_APP_API_KEY",REACT_APP_API_KEY);
  console.log("REACT_APP_API_KEY Test",REACT_APP_API_PATH);
  const dispatch = useDispatch();
  const [showErrorPage, setShowErrorPage] = useState(false);
  const userInfoStore = useSelector((state) => state.userInfo.data);
  const [createNewUser, responseUserData] = useSaveUserDataMutation();
  const userCustomAttributes = useSelector(
    (state) => state.Auth.customAttributes
  );
  const [userData, setUserLoggedInInfo] = useState(userCustomAttributes || {});
  const [openAccountPreferences, setOpenAccountPreferences] = useState(false);
  const [checkFirstLogin, responseFirstLogin] = useLazyIsNewUserQuery();
  const userInfoSliceStore = useSelector((state) => state.userInfo.data);

  const stringExistsInArray = ( searchString, array1) => {
    const combinedArrray = array1;
    return combinedArrray.includes(searchString[0]);
  };

  useEffect(()=>{
   dispatch(resetUfData());
  },[]);
  /* Decode ID Token and check Permission*/
  const decodeIDToken = (idToken) => {
      let isPermissionGranted = false;
      const { REACT_APP_PROJECT_ENV } = process.env;
      const decodedInfo = jwt_decode(idToken);
      const userDetails = decodedInfo?.custom_attributes || {};
      const userName = userDetails?.First_Name + userDetails?.Last_Name; 
      const newUserInfo={
          ...userInfoStore, 
          ["UserName"]: userName,
          ["Role"]:userDetails?.Role,
          ["CompanyName"]:userDetails?.CompanyName
      };     
      console.log("------SSO disabled :- updating slice with static user info: ",newUserInfo);
      if(REACT_APP_PROJECT_ENV == "dev" || REACT_APP_PROJECT_ENV == "SIT"){
          isPermissionGranted = stringExistsInArray(["Wave Pro QA"], userDetails["AppDetails"]);       
      }else{
          isPermissionGranted = stringExistsInArray(["WavePro"], userDetails["PermissionSets"]); 
      }
      console.log("userDetails?.UserEmail : ",userDetails?.UserEmail);  
      console.log("localStorage.getItem accessTokens: ",localStorage.getItem("accessTokens"));  
      console.log("isPermissionGranted : ",isPermissionGranted);  

      if(userDetails?.UserEmail && localStorage.getItem("accessTokens") && isPermissionGranted){ 
          //updating authSlice with access tokens.
          dispatch(setUserAttributes(userDetails));
          //updating userInfoSlice with custom attributes from salesforce
          dispatch(updateUserInfo(newUserInfo));
          localStorage.setItem("loggedInData",JSON.stringify(userDetails));
          validateIsFirstLoggedIn();
      }
      else{ 
          console.log("DECODE ID TOKEN FAILED.");
      }
  };

  /* OnMount : Check IsFirstLoggedIn */
  useEffect(() => {
    console.log("HOME : REACT_APP_ENABLE_APP_SCAN",process.env.REACT_APP_ENABLE_APP_SCAN);
    console.log("HOME : condition check login",process.env.REACT_APP_ENABLE_APP_SCAN == "enabled");

    if(process.env.REACT_APP_ENABLE_APP_SCAN == "enabled"){
      console.log("HOME - AppScan is enabled");
      //AppScan is enabled
      const tokenResponse_testData = {
        "access_token": "00D3D00000017Vm!AQMAQGlfgqfWybv9GgKZuqMOEwFgpsWEgkw0wy.k4SrcQqW8NGPd3yJMqNT08Pnfp2xhQ1TGs6aclxwnxkduyNgMu8UphByl",
        "refresh_token": "5Aep861OeIX6GiNvi13sc2QFKhp7ekYqFlYpFzKEK6hG3U9PES3qwfsl68zcHDQ9_AjzAbe5QyonoGbk3zTE6Sy",
        "sfdc_community_url": "https://tools-dupont--dtqa.sandbox.my.site.com/signin",
        "sfdc_community_id": "0DB1B0000004CXeWAM",
        "signature": "sX8tAN1fqPpvtvJrA1vMIm8Yw0uSAz9czwN67y8bpJo=",
        "scope": "refresh_token custom_permissions openid id",
        "id_token": "eyJraWQiOiIyNDYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiYnBVbEZNcTZ6ZWcyTmh1MGhpcUVydyIsInN1YiI6Imh0dHBzOi8vdGVzdC5zYWxlc2ZvcmNlLmNvbS9pZC8wMEQzRDAwMDAwMDE3Vm1VQUkvMDA1N2kwMDAwMEFBOGNJQUFUIiwiYXVkIjoiM01WRzlQRTR4Qjl3dG9ZX2Z5V3h4U1NFM1ZwUWtvMGVxTmdidHlmaTdGZjgyU0ZqWXR0d3ZMNVBmdGFLc3pmV1ZmdUgyMG9QY3VINTdtczZCUEs3SiIsImlzcyI6Imh0dHBzOi8vdG9vbHMtZHVwb250LS1kdHFhLnNhbmRib3gubXkuc2l0ZS5jb20vc2lnbmluIiwiZXhwIjoxNzAzMjEyMzA2LCJpYXQiOjE3MDMxNjkxMDYsImN1c3RvbV9hdHRyaWJ1dGVzIjp7IlNGRENfT3JnTmFtZSI6IkR1UG9udCBUb29scyIsIkFkZHJlc3MiOiJUQ1MgSW5kaWEiLCJVc2VyQ291bnRyeSI6IklOIiwiQXBwRGV0YWlscyI6IltXYXZlIFBybyBRQTtodHRwczovL3dhdmVwcm8tZGV2LmR1cG9udC5jb207V2F2ZVByb10iLCJDaXR5IjoiVGVsYW5nYW5hIiwiWmlwX2NvZGUiOiI1MDAwMzMiLCJVc2VyRW1haWwiOiJzeWVkLXNoYWhpZWQubWVoZGlAZHVwb250LmNvbSIsIlBlcm1pc3Npb25TZXRzIjoiW1dhdmVQcm9dIiwiQnVzaW5lc3NfU2VnbWVudCI6bnVsbCwiUm9sZSI6IkFwcGxpY2F0aW9uIEVuZ2luZWVyIiwiRmlyc3RfTmFtZSI6IlN5ZWQiLCJDb21wYW55TmFtZSI6IlRDUyIsIkJ1c2luZXNzX0luZHVzdHJ5IjoiV2FzdGUgYW5kIHdhdGVyIG1hbmFnZW1lbnQiLCJCdXNpbmVzc19TdWJJbmR1c3RyeSI6bnVsbCwiSm9iX0Z1bmN0aW9uIjoiU3BlY2lhbGlzdCIsIkxhc3RfTmFtZSI6Ik1laGRpIiwiU3RhdGUiOm51bGwsIlBob25lIjoiODc0MzY3ODM2MiIsIlVzZXJJZCI6IjAwNTdpMDAwMDBBQThjSUFBVCIsIkZlZGVyYXRpb25JZGVudGlmaWVyIjoiaWQwMDAwOTgwMSIsIkNvbXBhbnlfU2l6ZSI6Ij4gJDFCIiwiRXh0ZXJuYWxBcHBzIjoiV2FsbCBBbmFseXNpcztXYXZlIFBybyBRQTsifX0.K_hncqt9QH6GU55YlHqyZ5rz6tupGn4I5KAJ7oJStyufLeIPa2fHgX3NxKoaUL3HBnf58SvjIubm-2KMjfa3yWt_IzER1iewRImWeBZEDbrRygxqU9O4sY-qYrLcUudNCI7PJri59Fl3do7TIRTulb8EddiG4_6p9AzQ2_gPFg_jGO3PiS7Q24HO3pnp4P9RqMEjV8rhFwIhZ8IIH_fjRriXaUJCdTTqx7ypp2oOypJhO2Y-4_QKamWuaDfG6JtxL8iwNBjL9LmxMoSUlq344MfR9Yrepe4jsMW4456-c_jeQXxqHrihVJpbwVuXQPMWdG4WPmP0M3zltOMe7xGI-D8pFk5_cShEagYSiMY8ZtXd92Cu_9OOn2HeUN9DBQ55empA24RvIzUeTIz0ES1Xwnjw7mJCv8k7yRaz7TwxZX3QXCuLT1oQIbTlof2Y7JGcmR6geSIRiDR80ZWVPtpN2YhhzQxDlzC69CjQuk5vR4QKO7aLyoJqCiTEn_51Mm8oJ5b0kRH8pE8_Z6VTLggfhQ9ihGYN6LKysdYLQ6EVYU1NM9ju6yKGt-7fq3HAvF6eUISpZu0ktZliuPsck457_lC-VXptwHsbNm9M5tVqIYo6Vx_Eoo0JHvyyBANDYkNTUKLAD2IFLpCyCWxs0lPk88-1dyJL91IxOpAPP-6LLPI",
        "instance_url": "https://tools-dupont--dtqa.sandbox.my.salesforce.com",
        "id": "https://test.salesforce.com/id/00D3D00000017VmUAI/0057i00000AA8cIAAT",
        "token_type": "Bearer",
        "issued_at": "1703169106327"
    };
      dispatch(setAccessTokens(tokenResponse_testData));
      localStorage.setItem("accessTokens",JSON.stringify(tokenResponse_testData));
      decodeIDToken(tokenResponse_testData.id_token);
  }else{
    console.log("HOME - AppScan is disabled");
    validateIsFirstLoggedIn();
  }
  }, []);

  useEffect(() => {
    if (responseFirstLogin.status == "fulfilled") {
      if (responseFirstLogin.data.userID !== undefined) {
        const userDetails = { ...userInfoSliceStore };
        userDetails.UserId = responseFirstLogin.data.userID;
        userDetails.lastLoggedIn = responseFirstLogin.data.lastLoginTime;
        dispatch(updateUserInfo(userDetails));
       console.log("responseFirstLogin?.data?.userID",responseFirstLogin?.data?.userID);
        if (responseFirstLogin?.data?.userID == 0) {
          //isFirstTimeLogin is TRUE
          handleAccountPreferencePopup();
        }
      }
    }
    if (responseFirstLogin.isError) {
      console.log("FIRST LOGIN API FAILED ERROR.", responseFirstLogin);
      throw new MyError("First Login API Error", "403", "ApiError");
    }
  }, [responseFirstLogin]);

  /* Open Account preferences Popup if IsFirstLoggedIn is true*/
  const handleAccountPreferencePopup = () => {
    handleSaveUser();
   // setOpenAccountPreferences(true);
  };
 const handleSaveUser = async () => {
  const userData={
    firstName: "",
    email: "",
    languageID: "1",
    timeZoneID: "1",
    mobileNumber: "1234567",
    userImage: "",
    requestTechnologyVMs: [],
  };
  console.log("userCustomAttributes.First_Name",userCustomAttributes.First_Name);
  console.log("userCustomAttributes.UserEmail",userCustomAttributes.UserEmail);
    const payload = {
      ...userData,
      ["email"]: userCustomAttributes.UserEmail,
      ["firstName"]: userCustomAttributes.First_Name,
      ["requestTechnologyVMs"]: [],
    };

    console.log("payload",payload);
    let ResponseValues = await createNewUser(payload);
    if (ResponseValues?.data?.responseCode == "200") {
      const user_id = ResponseValues?.data?.id;
      if (user_id != "0") {
        const userDetails = { ...userInfoSliceStore };
        userDetails.UserId = user_id;
        dispatch(updateUserInfo(userDetails));
       // const message = "Account Preferences saved successfully.";
       // handleShowAlert("success", message);
        //handleClose();
      }
    } else {
      console.log("UserData API - Failed", ResponseValues);
      // const message ="Failed to save account preferences.";
      // handleShowAlert("error", message);
      // handleClose();
      setHasError(true);
    }
  };
  /* Checking User's Login Status */
  const validateIsFirstLoggedIn = () => {
    if (userCustomAttributes?.UserEmail) {
      const { UserEmail } = userCustomAttributes;
      checkFirstLogin({ email: UserEmail });
    }
  };

  // checking tablet size 
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const handleResize = ()=>{
    setShowSideMenu(window.innerWidth<= 1200); //show side menu for width >=1300
  };
  useEffect(()=>{
    handleResize(); // set initial state based on window size
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize);
  },[showSideMenu]);

  return (
    <>
      <Container fluid className="root-container p-0 g-0">
        <Header showSideMenu ={showSideMenu} setShowMenuIcon={setShowMenuIcon} setShowSideMenu={setShowSideMenu}/>
        <div className="home-section">
            <div style={{
              "--width":`${showSideMenu?"100%":"0%"}`, "--bgColor":`${showSideMenu?"rgba(0,0,0,0.5)":""}`,
            zIndex:showSideMenu && !showMenuIcon ?"3":"5"}} className={`side-menu ${showSideMenu && !showMenuIcon ? " hide":" show"} ${showSideMenu?"":"normal"}`}>
              <SideMenu showSideMenu={showSideMenu} setShowMenuIcon={setShowMenuIcon} setShowSideMenu={setShowSideMenu}/>
            </div>
          <div style={{width:`${showSideMenu?"100%":"81%"}`, marginLeft:`${showSideMenu?"0px":"auto"}`}} className={`main-section ${showSideMenu && !showMenuIcon ? " hide":" show"}`}>
            <div className="comm-search-wrapper">
              <CommonSection />
              <SearchFilter  showSideMenu ={showSideMenu}/>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </Container>

      {openAccountPreferences ? (
        <AccountPreference
          show={openAccountPreferences}
          onClose={() => setOpenAccountPreferences(false)}
          data={userData}
        />
      ) : null}

      {/* {showErrorPage ? 
       <ErrorPage status={403} message={"Failed to save Account Preferences!"}/> : null } */}
    </>
  );
}
export default Home;
