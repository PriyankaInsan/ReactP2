/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Overlay,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import FooterStyled from "./FooterStyled";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from "../../features/home/CardListSlice";
import { applicationVersion, updateUserInfo } from "../UserInfoSlice";
import { MyError } from "../utils/ErrorCreator";
import WaveProImage from "../../common/assets/images/Wave-PRO-UF-Logo-02.svg";
let currentDate = new Date();
var currentYear = currentDate.getFullYear();
console.log("currentYear",currentYear);
const Footer = ({locationCheck, tabCheck}) => {
  const [getApiVersion, responseGetApiVersion] = useLazyGetAllDataQuery();
  const [appVersion, setAppVersion] = useState();
  const dispatch = useDispatch();
  const userProfileDetails = useSelector((state) => state.userInfo.data);
  // const userInfoSliceStore = useSelector((state)=>state.userInfo.data);
  const { lastLoggedIn, UserId } = userProfileDetails || {};

  useEffect(() => {
    let apiUrl1 = "masterdata/api/v1/ApplicationVersion";
    getApiVersion(apiUrl1);
    
  }, []);
  // useEffect(() => {
  //   // Load or execute your script here
  //   const script = document.createElement("script");
  //   script.src = "https://consent.trustarc.com/notice?domain=dupont.com&c=teconsent&noticeType=bb&text=true&gtm=0";
  //   script.async = true;
  //   document.body.appendChild(script);
 
  //   // Cleanup the script when the component is unmounted
  //   // return () => {
  //   //   document.body.removeChild(script);
  //   // };
  // }, []);
  useEffect(() => {
    if (responseGetApiVersion.isLoading) {
      console.log("Loading");
      dispatch(updateLoader(true));
    }
    if (responseGetApiVersion.isSuccess) {
      dispatch(updateLoader(false));
      setAppVersion(responseGetApiVersion.data.responseMessage);
      const userDetails = {
        ...userProfileDetails,
        ["applicationVersion"]: responseGetApiVersion.data.responseMessage,
      };
      dispatch(updateUserInfo(userDetails));
    }
    if (responseGetApiVersion.isError) {
      console.log("Error: Fetch User Login data", responseGetApiVersion);
      // throw new MyError("Get Application Version API Error", "403", "ApiError");
    }
   
  }, [responseGetApiVersion]);


  return (
    <>
      <FooterStyled locationCheck={locationCheck} tabCheck={tabCheck}>
          <div className="footer-list">
            <div className="footer_list_items">
                <a href="https://www.dupont.com/" target="__blank" rel="noopener">
                  DuPont.com
                </a>
                <a className="vertical_line"></a>
                <a href="https://www.dupont.com/privacy.html" target="__blank" rel="noopener">
                  Privacy
                </a>
                <a className="vertical_line"></a>
                <a
                  href="https://www.dupont.com/legal-notices-and-terms-of-use.html"
                  target="__blank" rel="noopener">
                  Legal Notice & Terms of use
                </a>
                <a className="vertical_line"></a>
                <a href="https://www.dupont.com/accessibility.html"
                  target="__blank" rel="noopener">
                  Accessibility
                </a>
                {/* <a className="vertical_line"></a>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">Coming Soon</Tooltip>}>
                  <a href="https://www.dupont.com/site-map.html/">Site Map</a>
              </OverlayTrigger> */}
              <a className="vertical_line"></a>
              <a id="teconsent"></a>
            </div>
            <div className="copyright">
              <p>
                © {currentYear} DuPont. All rights reserved. DuPont™, the DuPont Oval
                Logo, and all trademarks and service marks denoted with ™, ℠ or
                ® are owned by affiliates of DuPont de Nemours, Inc. unless
                otherwise noted.
              </p>
            </div>
          </div>
          <div className="footer-logo">
            <div className="logo-text">
              <h6>Water Application Value Engine</h6>
              <p className="text-right color1">DuPont Water Solutions</p>
              <p className="color2">
                {` Version:${appVersion}`}
              </p>
            </div>
            <div>
            <img
              src={WaveProImage}
              alt="WaveProLogo"
            />
            </div>
          </div>
      </FooterStyled>
    </>
  );
};

export default Footer;
