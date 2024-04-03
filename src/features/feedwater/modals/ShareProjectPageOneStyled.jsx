/* eslint-disable max-len */
import {Modal } from "react-bootstrap";
import styled from "styled-components";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import { circleStyles, colors, fontStyles, getRandomColor, inputGroupStyles, modalStyles, standardButtonStyles } from "../../../common/styles/Theme";
const ShareProjectPageOneStyled = styled(Modal)`
background-color:${colors.blackTransparency085};
    .modal-content{
        ${modalStyles.normalModalStyle}
    }
    .share-project-header{
        background:${colors.GreyF8};
        width: 100%;
        margin:0;
        padding: 17px 32px 14px 32px;
        .heading{
            h3{
                ${fontStyles.diodrum16SemiBold}
                color:${colors.SecondaryElfGreen};
            }
            p{
                ${fontStyles.diodrum12}
                color:${colors.blackTransparency045};
                margin-bottom:0;
            }
        }
        .close-icon{
            text-align: right;
            display: flex;
            justify-content: end;
            align-items: center;
            button{
                background-color:transparent;
                border-color: transparent;
                svg{
                    cursor: pointer;
                    width:12px;
                    height:12px;
                    path{
                        stroke:${colors.blackTransparency045};
                        fill:${colors.blackTransparency045};
                    }
                }
            }
        }
    }
    .email-details{
        padding: 5px 32px;
        form{
            .input-group{
                ${inputGroupStyles.normalMediumInputBoxWholeStyle1440};
                .form-control{
                    ${inputGroupStyles.formControlStyles};
                    ${fontStyles.diodrum14};
                    ${colors.Grey96};
                }
                .input-group-text{
                    ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles};
                    svg{
                        border: 1.8px solid ${colors.PrimaryDarkAquaMarine};
                        border-radius: 50%;
                        padding:2px;
                        path{
                            fill: ${colors.PrimaryDarkAquaMarine};
                        }
                    }
                }
            }
            .form-label{
                ${fontStyles.notoSans12}
                color:${colors.Black};
                margin-bottom: 10px;
            }
            .form-text{
                ${fontStyles.diodrum10};
                color: ${colors.Grey96};
            }
        }
        .shared-person-name{
            text-align: center;
            background:${colors.GreyF8};
            border-radius: 25px;
            width:max-content;
            display:flex;
            justify-content: center;
            align-items: center;
            padding:4px;
            .circle{
                width:32px;
                height:32px;
                display:flex;
                justify-content: center;
                align-items: center;
                .random-color{
                    ${circleStyles.normalCircleStyles}
                    border: 1px solid ${getRandomColor};
                    color:${colors.White};
                    margin-right:5px;
                    background-color: ${getRandomColor};
                }
            }
            svg{
                margin:0 14px;
                path{
                    fill:${colors.Black};
                }
            }
        }
    }
    .shared-details-header{
        padding:5px 12px 5px 32px;
        display: flex !important;
        align-items: center;
        justify-content: space-between;
        margin-top:2%;
        button{
            ${fontStyles.diodrum14}
            ${standardButtonStyles.linkWithIconPrimaryButton}
            --bs-btn-active-bg:none;
            --bs-btn-active-border-color: none;
            --bs-btn-active-color:none;
            --bs-btn-active-shadow:none;
            --bs-btn-focus-shadow-rgb:none;
            svg{
                path{
                    fill:${colors.Black};
                }
            }
        }
        h6{
            color:${colors.Black};
            ${fontStyles.diodrum14}
            margin-bottom: 0;
        }
    }
    .shared-details-row{
        padding: 5px 32px;
        height:180px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        ::-webkit-scrollbar {
            width: 10px;          
        }

        ::-webkit-scrollbar-thumb {   
            border-radius: 30px;
            background: -webkit-gradient(linear,left top,left bottom,from(${colors.SecondaryElfGreen}),to(${colors.PrimaryDarkAquaMarine}));
            box-shadow: inset 2px 2px 2px ${colors.blackTransparency025}, inset -2px -2px 2px ${colors.blackTransparency025};
        }

        ::-webkit-scrollbar-track {     
            background-color:${colors.White};
            border-radius:10px;
        }
        .shared-project-column{
            align-items: inherit;
            margin-bottom:15px;
            .circle{
                width:32px;
                height:32px;
                display:flex;
                justify-content: center;
                align-items: center;
                span{
                    ${fontStyles.diodrum16SemiBold};
                    ${circleStyles.normalCircleStyles}
                    color:${colors.White};
                    padding-top: 3px;
                    margin-right:5px;
                    background-color:${getRandomColor};
                }
            }
            .owner-details{
                color:${colors.Grey96};
                ${fontStyles.diodrum12};
            }
            .users-name{
                margin-left: 16px;
                ${fontStyles.notoSans16}
                color:${colors.Black};
                margin-bottom: 0;
            }
        }
        .delete-icon{
            display:flex;
            justify-content: end;
        }
        
    }
    .share-project-footer{
        background-color:${colors.White};
        border-top: 0.5px solid ${colors.GreyE1};
        margin-top:16px;
        padding: 17px 28px;
        text-align: right;
        .leave-project-btn{
            ${standardButtonStyles.normalSecondaryButton};
            ${fontStyles.diodrum14};
            margin-right: 18px;
        }
        .share-project-btn{
            ${standardButtonStyles.normalPrimaryButton};
            ${fontStyles.diodrum14};
        }
    }
`;

export default ShareProjectPageOneStyled;