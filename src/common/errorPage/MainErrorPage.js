/* eslint-disable max-len */
import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ErrorPageStyled from "./ErrorPageStyled";
import SecondaryMenu from "../../features/feedwater/secondarymenu/SecondaryMenu";
import commonErrorImg from "../assets/images/bubble-gum-error-404.gif";
import authorizationErrImg from "../assets/images/authError.png";
import CustomHeading from "../styles/components/headings/CustomHeading";
import { colors } from "../styles/Theme";
import StandardSecondaryButton from "../styles/components/buttons/standard/StandardSecondaryButton";

const MainErrorPage = () => {
    const [openContact, setOpenContact]= useState(false);
    const handleOpenContactUs = ()=>{
        setOpenContact(true);
    };
    const errorMsgData =[
        {
            error404:"Error404", 
            imageIcon:commonErrorImg, 
            title:"Sorry, this page isn’t available", 
            messageOne:"The page you are looking for might have been removed, has its name changed or is temporarily unavailable.",
            messageTwo:"Please check the URL and try again. You can also return to our homepage or reach us by clicking on the contact us button below.",
        },
        // {
        //     error404:"authorizationError",  
        //     imageIcon:commonErrorImg, 
        //     title:"Authorization Error", 
        //     messageOne:"Access to your account data is restricted by policies within the organization.",
        //     messageTwo:"Please contact the administrator for more information."
        // },
        // {
        //     error404:"siteDown",  
        //     imageIcon:commonErrorImg, 
        //     title:"Service Temporarily Unavailable", 
        //     messageOne:"The server is temporarily unable to service your request due to maintenance downtime.",
        //     messageTwo:"Please try again later."
        // },
    ];
  return (
    <>
    {/* <Header/>
    <SecondaryMenu/> */}
        <ErrorPageStyled>
        {openContact ? (
            <div className="contact_us_form">
                <div>
                    <CustomHeading fontFamily={"DiodrumRegular"} fontSize={"26px"} fontWeight={"400"}
                    color={colors.Black} label="Contact us"/>
                </div>
                <div>
                    <CustomHeading fontFamily={"DiodrumRegular"} fontSize={"16px"} fontWeight={"400"}
                    color={colors.Black} label="Ask questions, request information, or tell us 
                    about the water challenges we can help you solve by completing our form or 
                    calling one of our contact centers. Or find what you need with our self-help links.
                    Get in touch"/>
                </div>
                <div>
                    <iframe src="https://www.dupont.com/water/contact-us.html" title="Contact Us" width="400" height="400">
                       
                    </iframe>
                </div>
            </div>
        ):

            errorMsgData.map((item, index)=>(
               <>
                <div className="err_img_container">
                    <img id="errImg" src={item.imageIcon} alt="error-page-image" title=""/>
                </div>
                <div className="err_msg_container">
                    <div className="top_heading">
                        <CustomHeading fontFamily={"DiodrumRegular"} fontSize={"32px"} fontWeight={"600"}
                        color={colors.Black} label={item.title}/>
                    </div>
                    <div className="error_definition">
                        <CustomHeading fontFamily={"NotoSansRegular"} lineHeight={"22px"} fontSize={"14px"} fontWeight={"400"}
                        color={colors.Black} label={item.messageOne}/>
                        
                    </div>
                    <div className="error_definition">
                    <CustomHeading fontFamily={"NotoSansRegular"} lineHeight={"22px"} fontSize={"14px"} fontWeight={"400"}
                        color={colors.Black} label={item.messageTwo}/>
                    </div>
                    <div className="contact_us_btn">
                        <StandardSecondaryButton className="contact_btn" label="Contact us" onClick={handleOpenContactUs}/>
                    </div>
                </div>
               </>
            ))}
        
            
        </ErrorPageStyled>
    {/* <Footer/> */}
    </>
  );
};

export default MainErrorPage;