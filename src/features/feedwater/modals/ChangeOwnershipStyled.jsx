import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import { circleStyles, colors, fontStyles, getRandomColor, modalStyles, radioStyles, standardButtonStyles } from "../../../common/styles/Theme";

const ChangeOwnershipStyled = styled(Modal)`
    background-color:${colors.blackTransparency085};
    .modal-dialog{
        max-width: 572px;
    }
    .modal-content {
        ${modalStyles.normalModalStyle};
    }
    .change-owner-header{
        background-color:${colors.GreyF8};
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
                background-color: transparent;
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
    
    .change-ownership-row{
        padding:14px 32px 3px 32px;
        .owner-name{
            color:${colors.Black};
            ${fontStyles.notoSans16}
            margin-left: 11px;
        }
        span{
            ${circleStyles.normalCircleStyles};
            color: ${colors.White};
            ${fontStyles.diodrum16SemiBold};
            background-color: ${getRandomColor};
            padding-top: 3px;
        }
        .ownership-tag{
            p{
                color:${colors.Grey96};
                ${fontStyles.diodrum12};
                margin-bottom:0;
            }
        }
        
    }
    .owner-list-header{
        padding:0px 32px;
        h5{
            ${fontStyles.diodrum14}
            color:${colors.Black};
        }
    }    
    .new-owner-list-row{
        padding: 5px 32px 9px 32px;
        height:130px;
        display: flex;
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
        .owner-list-column{
            align-items: inherit;
            margin-bottom:17px;
            p{
                color:${colors.Grey96};
                ${fontStyles.diodrum12}
                margin-bottom:0;
            }
        }
        .checkbox-group {
            .form-check-input[type="radio"]{
                ${radioStyles.defaultRadio}
                :hover{
                    ${radioStyles.hoverRadio};
                }
            }
            .form-check-input[type="radio"]:checked {
                ${radioStyles.activeRadio}
            }
            label {
                ${fontStyles.notoSans16}
                color:${colors.Black};
                margin-left:16px;
            }
        }
    }
    .description-details{
        padding: 16px 32px 9px 32px;
        .paragraph-column{
            p{
                color:${colors.blackTransparency045};
                ${fontStyles.diodrum12};
            }
        }
    }
    .change-owner-footer-row{
        background-color:${colors.GreyF8};
        padding: 17px 23px;
        .back-btn{
            ${standardButtonStyles.normalSecondaryButton};
            ${fontStyles.diodrum14}
            margin-right: 25px;
        }
        .change-ownership-btn{
            ${standardButtonStyles.normalPrimaryButton};
            ${fontStyles.diodrum14}
        }
    }
`;
export default ChangeOwnershipStyled;