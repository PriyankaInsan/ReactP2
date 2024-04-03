import styled from "styled-components";
import { standardButtonStyles, 
  smallStandardButtonStyles,
  largeStandardButtonStyles, 
  dangerLargeButtonStyles, 
  dangerStandardButtonStyles, 
  fontStyles, radioStyles, 
  checkBoxStyles, InputBoxStyles,
  colors, headingStyles,tagsStyle, 
  unitPillStyles, selectStyles, textAreaStyles} from "../styles/Theme";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { Row } from "react-bootstrap";

const dropdownStyles={
  dropdownMenu:{
    "--bs-dropdown-border-color":"none",
    "--bs-dropdown-link-hover-bg":"none",
    "--bs-dropdown-link-active-bg":"none",
    backgroundColor:colors.White,
    boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
    borderRadius: "2px",
  },
  dropdownToggle:{
    outline: "none",
    border: "none",
    padding: "0",
    width: "32px",
    height: "32px",
    backgroundColor:"transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
// console.log("props",scrollDirection);
const HeaderStyled = styled.header`
   width: 100%;
   position:${({showSideMenu})=>showSideMenu?"fixed":"sticky"};
   top:${({scrollDirection})=>scrollDirection>100?"-7rem":"0"};
   /* top: 0; */
   transition-property: all;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   transition-duration: 500ms;
   z-index: 5;
   background-color:${colors.White};
   border-bottom: 0.5px solid;
   border-bottom-color: ${colors.GreyE1};
   padding: 8px 32px;
   .global_header{
      display: flex;
      justify-content: space-between;
      .global_header_brand_logo{
         display: flex;
         gap: 31px;
         .hamburger_menu{
            cursor: pointer;
         }
         .global_header_logo1{
            display: flex;
            flex-direction: column;
            gap: 10px;
            .dupont_logo{
               width: fit-content;
               height: 18px;
               display: flex;
               a{
                  display: flex;
               }
            }
         }
         .global_header_logo2{
            display: flex;
            gap: 8px;
            align-items: center;
            cursor: pointer;
            .application_name{
               h3{
                  margin-bottom: 0;
               }
            }
         }
      }
   }
   
   .global_header_selected_project_name{
      display: flex;
      justify-content: center;
      align-items: center;
      .selected-project-title{
         ${fontStyles.notoSans14SemiBold};
         color: ${colors.Black};
         margin-bottom: 0;
      }
   }
   
   .global_header_header_menu{
      display: flex;
      align-self: center;
      text-align:right;
      justify-content: end;
      .chat-bot{
         margin-right: 20px;
         .dropdown-toggle::after {
            display: none !important; 
         }
         button{
            ${dropdownStyles.dropdownToggle};
            ::after {
               display: none !important; 
            }
            svg{
               width:24px;
               height:24px;
               :hover{
                  path, line, circle{
                     stroke:${colors.PrimaryDarkAquaMarine};
                  }
                  ellipse{
                     fill:${colors.PrimaryDarkAquaMarine};
                  }
               }
            }
         }
         .active-chatbot-button{
            svg{
               path, line, circle{
                  stroke:${colors.PrimaryDarkAquaMarine};
               }
               ellipse{
                  fill:${colors.PrimaryDarkAquaMarine};
               }
            }
         }
         .dropdown-menu{
            ${dropdownStyles.dropdownMenu};
            .dropdown-item{
               ${fontStyles.notoSans16}
               display: flex;
               align-items: center;
               color:${colors.blackTransparency085};
               :hover{
                  color:${colors.PrimaryDarkAquaMarine};
               }
            }
         }
      }
      .notification{
         margin-right: 20px;
         .dropdown-toggle::after {
            display: none !important; 
         }
         button{
            ${dropdownStyles.dropdownToggle};
            ::after {
               display: none !important; 
            }
            .notification-count{
               position: absolute;
               top: -3px;
               left: 20px;
               background-color: #007672;
               color: #fff;
               border-radius: 50%;
               width: 18px;
               height: 18px;
               ${fontStyles.diodrum10};
               display: flex;
               justify-content: center;
               align-items: center;
               align-content: center;
               padding: 2px 0px 0px 0px;
            }
            /* svg{
               width:24px;
               height:24px;
               margin-right: -3px;
               :hover{
                  path{
                     stroke:${colors.PrimaryDarkAquaMarine};
                  }
                  rect{
                     fill:${colors.PrimaryDarkAquaMarine};
                  }
                  .lower-ring{
                     fill:${colors.PrimaryDarkAquaMarine};
                  }
               }
            } */
         }
         /* .active-notification-button{
            svg{
               path{
                  stroke:${colors.PrimaryDarkAquaMarine};
               }
               rect{
                  fill:${colors.PrimaryDarkAquaMarine};
               }
               .lower-ring{
                  fill:${colors.PrimaryDarkAquaMarine};
               }
            }
         } */
         .dropdown-menu.show{
            width: 414px;
            overflow-y: scroll;
         }
         .dropdown-menu{
            ${dropdownStyles.dropdownMenu};
            max-height: 525px;
            .notification-header{
               padding: 12px 24px;
               span{
                  ${fontStyles.notoSans14};
                  color:${colors.Grey96};
               }
                a{
                  cursor: pointer;
                  ${fontStyles.notoSans12};
                  color:${colors.Grey96};
                  :hover{
                     color:${colors.PrimaryDarkAquaMarine};
                  }
               }
            }
            hr{
               margin: 0;
            }
            .card{
               cursor: pointer;
               border-top:none;
               border-right: none;
               border-bottom: 1px solid;
               border-color:${colors.Grey96} ;
               border-radius:0;
               background-color:${colors.White};
               padding: 12px 24px;
               :nth-last-child(1){
                  border-bottom: none;
               }
               :hover{
                  border-top:none;
                  border-right: none;
                  /* border: 1px solid; */
                  border-color: ${colors.Grey96};
                  background-color:${colors.White};
                  box-shadow: 0px 1px 4px 1px ${colors.blackTransparency025};
                  padding: 12px 24px;
               }
               .card-body{
                  padding:0;
                  .notification-tag{
                     height: 22px;
                     color:${colors.PrimaryDarkAquaMarine};
                     ${fontStyles.diodrum12};
                     padding: 1px 6px 0px 6px;   
                     border-radius: 2px;
                     border: 1px solid;
                     border-color: ${colors.Grey96};
                     background-color: ${colors.Pale20PaleTeal};
                     text-decoration: none; 
                  }
                  .card-title{
                     ${fontStyles.diodrum16SemiBold}
                     color:${colors.SecondaryElfGreen};
                     display: flex;
                     justify-content: space-between;
                     margin-bottom: 6px;
                     .read-unread-icon{
                        width: 16px;
                        height: 16px;
                     }
                  }
                  .card-text{
                     ${fontStyles.notoSans14}
                     color:${colors.Black};
                     margin-bottom:6px;
                     :hover{
                        color:${colors.PrimaryDarkAquaMarine};
                     }
                  }
                  p{
                     ${fontStyles.notoSans12}
                     color:${colors.Grey96};
                     margin-bottom: 10px;
                  }
                  .markasread {
                     a{
                        ${fontStyles.notoSans12};
                        color:${colors.Black};
                        padding: 0 7px;
                        background-color: ${colors.White};
                        border: 1px solid;
                        border-color: ${colors.Black};
                        box-shadow: 0px 2px 0px ${colors.blackTransparency016};
                        border-radius: 25px;
                        text-decoration: none; 
                        :hover{
                           color:${colors.PrimaryDarkAquaMarine};
                        }                       
                     }
                  } 
                  
               }
            }
            
         }
      }
      .notification{
         margin-right: 20px;
         .dropdown-toggle::after {
            display: none !important; 
         }
         button{
            ${dropdownStyles.dropdownToggle};
            ::after {
               display: none !important; 
            }
            .notification-count{
               position: absolute;
               top: -3px;
               left: 20px;
               background-color: #007672;
               color: #fff;
               border-radius: 50%;
               width: 18px;
               height: 18px;
               ${fontStyles.diodrum10};
               display: flex;
               justify-content: center;
               align-items: center;
               align-content: center;
               padding: 2px 0px 0px 0px;
            }
         }
         .dropdown-menu.show{
            width: 414px;
            overflow-y: scroll;
            ::-webkit-scrollbar {
               width: 4px;
               background-color: transparent;
            }
            ::-webkit-scrollbar-thumb {
               background-color: #969696;
               border-radius: 5px;
            }
         }
         .dropdown-menu{
            ${dropdownStyles.dropdownMenu};
            max-height: 525px;
            .notification-header{
               padding: 12px 24px;
               span{
                  ${fontStyles.notoSans14};
                  color:${colors.Grey96};
               }
                a{
                  cursor: pointer;
                  ${fontStyles.notoSans12};
                  color:${colors.Grey96};
                  :hover{
                     color:${colors.PrimaryDarkAquaMarine};
                  }
               }
            }
            hr{
               margin: 0;
            }
            .card{
               cursor: pointer;
               border-top:none;
               border-right: none;
               border-bottom: 1px solid;
               border-color:${colors.Grey96} ;
               border-radius:0;
               background-color:${colors.White};
               padding: 12px 24px;
               :nth-last-child(1){
                  border-bottom: none;
               }
               :hover{
                  border-top:none;
                  border-right: none;
                  /* border: 1px solid; */
                  border-color: ${colors.Grey96};
                  background-color:${colors.White};
                  box-shadow: 0px 1px 4px 1px ${colors.blackTransparency025};
                  padding: 12px 24px;
               }
               .card-body{
                  padding:0;
                  .notification-tag{
                     height: 22px;
                     color:${colors.PrimaryDarkAquaMarine};
                     ${fontStyles.diodrum12};
                     padding: 1px 6px 0px 6px;   
                     border-radius: 2px;
                     border: 1px solid;
                     border-color: ${colors.Grey96};
                     background-color: ${colors.Pale20PaleTeal};
                     text-decoration: none; 
                  }
                  .card-title{
                     ${fontStyles.diodrum16SemiBold}
                     color:${colors.SecondaryElfGreen};
                     display: flex;
                     justify-content: space-between;
                     margin-bottom: 6px;
                     .read-unread-icon{
                        width: 16px;
                        height: 16px;
                     }
                  }
                  .card-text{
                     ${fontStyles.notoSans14}
                     color:${colors.Black};
                     margin-bottom:6px;
                     :hover{
                        color:${colors.PrimaryDarkAquaMarine};
                     }
                  }
                  p{
                     ${fontStyles.notoSans12}
                     color:${colors.Grey96};
                     margin-bottom: 10px;
                  }
                  .markasread {
                     a{
                        ${fontStyles.notoSans12};
                        color:${colors.Black};
                        padding: 0 7px;
                        background-color: ${colors.White};
                        border: 1px solid;
                        border-color: ${colors.Black};
                        box-shadow: 0px 2px 0px ${colors.blackTransparency016};
                        border-radius: 25px;
                        text-decoration: none; 
                        :hover{
                           color:${colors.PrimaryDarkAquaMarine};
                        }                       
                     }
                  } 
                  
               }
            }
            
         }
      }
      .user-profile{
         .dropdown-toggle::after {
            display: none !important; 
         }
         .user-setting{
            .login-text{
               color:${colors.Grey96};
               ${fontStyles.diodrum10Light}
               margin-bottom:7px;
            }
            .wavepro-version{
               color:${colors.PrimaryDarkAquaMarine};
               ${fontStyles.diodrum16SemiBold};
            }
         }
         button{
            ${dropdownStyles.dropdownToggle};
            .profile-icon{
               color:${colors.White};
               ${fontStyles.diodrum16SemiBold};
               padding-top: 2px;
               width: 24px;
               height: 24px;
               border-radius:50%;
               background-color:${colors.SecondaryElfGreen};
               display: flex;
               justify-content: center;
               align-items: center;
            }
            ::after {
               display: none !important; 
            }
         }
         .dropdown-menu.show{
            width: 512px;
            padding: 18px 30px;
         }
         .dropdown-menu{
            ${dropdownStyles.dropdownMenu};
            .card-body{
               .logged-username{
                  color:${colors.Black};
                  ${fontStyles.notoSans16};
                  margin-bottom: 0;
               }
               .card-title{
                  ${fontStyles.diodrum14SemiBold}
                  display: flex;
                  align-items: center;
                  color:${colors.PrimaryDarkAquaMarine};
               }
               .card-text{
                  ${fontStyles.notoSans14};
                  color:${colors.blackTransparency085};
                  
               }
               .temp-disable{
                  li{
                     a{
                        color:${colors.Grey96};
                        pointer-events:none;
                        
                     }
                  }
               }
               .not-loggedin{
                  color:${colors.Grey96};
                  pointer-events:none;
               }
               ul{
                  li{
                     margin-bottom: 4px;
                     a{
                        text-decoration: none;
                        ${fontStyles.notoSans16};
                        display: flex;
                        cursor:pointer;
                        align-items: center;
                        color:${colors.Black};
                        :hover{
                           color:${colors.PrimaryDarkAquaMarine};
                        }
                     }
                  }
               }
            }
         }
      }
   }
   @media (min-width:600px) and (max-width:1200px){
      padding: 8px 20px;
   }
`;
export default HeaderStyled;
