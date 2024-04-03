/* eslint-disable max-len */
import React, { Component, useEffect } from "react";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import HeaderStyled from "../header/HeaderStyled";
import { Col, Row } from "react-bootstrap";
import DuPont_logo_Red from "../assets/images/1280px-DuPont_logo_Red.svg";
import Wave_PRO_UF_Logo from "../assets/images/Wave-PRO-UF-Logo-02.svg";
import { useNavigate } from "react-router-dom";
import { LogTheError } from "./ErrorCreator";
import error404Image from "../assets/images/bubble-gum-error-404.gif";
import StyledHeading from "../styles/components/headings/CustomHeading";
import { colors, fontStyles } from "../styles/Theme";
import CustomLabel from "../styles/components/headings/CustomLabel";
import CustomHeading from "../styles/components/headings/CustomHeading";
import {setErrorTab} from "../../features/feedwater/activitymonitor/tabChangeSlice";
import { useDispatch } from "react-redux";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, type: "", status: 420, message: "" };
  }
 
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(
      "ApiError",
      "keys",
      Object.keys(error),
      "VAlues",
      Object.values(error)
    );

    const { status, message, type } = error;
    return {
      hasError: true,
      type: status === "FETCH_ERROR" ? "No Internet" : type,
      status: status,
      message: message,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logMessage: error.message,
        logType: `${error.status}_${error.type}`,
        methodName: errorInfo.componentStack,
      }),
    };
    fetch(
      `${process.env.REACT_APP_API_PATH}/masterdata/api/v1/UILogs`,
      requestOptions
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.state.type === "ApiError") {
        return (
          <ErrorPage
            status={this.state.status}
            message={this.state.message}
          />
        );
      }
      
      if (this.state.type === "AuthenticationError") {
        return (
          <ErrorPage
            status={this.state.status}
            message={this.state.message}
          />
        );
      }
      if (this.state.type === "No Internet") {
        return (
          <ErrorPage
            status={"No Internet"}
            message={
              "You are offline, Please connect to internet and try again later"
            }
          />
        );
      }
      return (
        <ErrorPage
          status={"Oops!"}
          message={"Looks like something went wrong"}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorPage = ({ status, message }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setErrorTab());
  }, []);
  return (
    <>
      <HeaderStyled>
        <div className="global_header">
          <div className="global_header_brand_logo">
            <div className="global_header_logo1">                
              <div className="dupont_logo">
                <a href="https://www.dupont.com/" target="__blank">
                  <img src={DuPont_logo_Red} alt="logo" />
                </a>
              </div>
              <div>
                <CustomHeading fontFamily="DiodrumSemiBold" fontSize={"8px"} fontWeight={"600"} label="Water Solutions"/>
              </div>
            </div>
            <div className="global_header_logo2" style={{cursor:"default"}}>
              <div>
                <img src={Wave_PRO_UF_Logo} alt="logo" />
              </div>
              <div className="application_name">
                <CustomHeading fontFamily="DiodrumSemiBold" fontSize={"16px"} fontWeight={"600"} color={colors.BrandTagLineColor} label={"WAVE PRO"}/>
              </div>
            </div>
          </div>
          <div className="global_header_selected_project_name">
            <h4 className="selected-project-title">
              { location.state?.title.length>30?  (location.state?.title
                ? `${location.state.title.substring(0, 30)}... - ${
                    caseName ? caseName.caseName : ""
                  }`
                : ""):(location.state?.title
                ? `${location.state.title} - ${
                    caseName ? caseName.caseName : ""
                  }`
                : "")}
              {console.log(
                "location.state" + JSON.stringify(location.state)
              )}
            </h4>
          </div>
        </div>
      </HeaderStyled>
      <ErrorPageStyle>
        <section className="page_404">
          <div className="error-display">
            <div className="four_zero_four_bg">
              <StyledHeading fontFamily="DiodrumSemiBold"  fontSize="64px" fontWeight="600" color={colors.Black} className="text-center" label={status}/>
              {/* <img src="./errorPage.gif" alt="loading..." /> */}
            </div>
            <div className="contant_box_404">
              <StyledHeading className="error_common_message" fontFamily="DiodrumRegular" fontSize="64px" fontWeight="400" color={colors.Black} label="Sorry, this page isn’t available"/>

              <CustomLabel className="error_common_message_sub_heading" label={message}/>
              {status != 403 ? (
                <div className="navigate_to_home">
                  <a href="/home" className="link_404">
                    Go to Home
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </ErrorPageStyle>
      {/* <Footer/> */}
    </>
  );
};

const ErrorPageStyle = styled.section`
  min-height: 85vh;
  .page_404 {
    min-height: 75vh;
    padding:0px 0px;
  }
  .page_404 img {
    width: 100%;
  }
  .error-display{
    
  }
  .four_zero_four_bg {
    background: url(${error404Image}) 50% no-repeat;
    height: 400px;
    background-position: center;
    display: flex;
    justify-content: center;
  }

  .four_zero_four_bg h1 {
    font-size: 80px;
  }

  .four_zero_four_bg h3 {
    font-size: 80px;
  }

  .link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #007672;
    border-radius:20px;
    margin: 20px 0;
    display: inline-block;
    ${fontStyles.diodrum14SemiBold}
    text-decoration: none;
  }
  .contant_box_404 {
    margin-top: -100px;
    .error_common_message, .error_common_message_sub_heading{
      display: flex;
      justify-content: center;
    }
    .navigate_to_home{
      display: flex;
      justify-content: center;
    }
  }
  .container {
  }
`;
