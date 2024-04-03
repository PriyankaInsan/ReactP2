import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import {Modal } from "react-bootstrap";
import { colors, fontStyles, modalStyles, standardButtonStyles } from "../../common/styles/Theme";
const CreatedProjectSuccessStyled =styled(Modal)`
    background-color:${colors.blackTransparency045};
    .modal-content{
        ${modalStyles.normalModalStyle} 
        /* padding: 25px; */
    }
    .header{
        background-color:${colors.GreyF8};
        padding: 16px;
        h6{
            margin-bottom: 0;
        }
    }
    .delete-modal{
        padding: 25px;
        .modal-body{
            padding: 0;
            .delete-project{
                display: flex;
                gap:10px;
                align-items: center;
                /* justify-content: center; */
            }
            .delete-warning-des{
                margin-left: 30px;
               display: flex;
               /* justify-content: center; */
            }
        }
    }
    
    .modal-body{
        background-color: ${colors.White};
    }
    .create-new-folder-modal, .rename-project{
        h1{
            ${fontStyles.diodrum16SemiBold};
            display: flex;
            align-items: center;
            color:${colors.PrimaryDarkAquaMarine};
            margin-bottom: 28px;
        }
        .form-label{
            ${fontStyles.notoSans16}
            color:${colors.Black};
        }
        .close-icon{
            margin-top:-1%;
            cursor: pointer;
            svg{
                path{
                    fill: black;
                }
            }
        }
        .input-group{
        }
        .btn-create-folder{
            text-align: right;
            border-top: 1px solid ${colors.GreyE1};
            padding:16px;
            margin-top: 30px;
            #canBtn{
                margin-right: 25px;
            }
            /* button{
                margin-top: 14px;
                margin-left: 10px;
            } */
            #cancelBtn{
                ${fontStyles.diodrum16}
                ${standardButtonStyles.normalSecondaryButton};
            }
            #submitBtn{
                ${fontStyles.diodrum16};
                ${standardButtonStyles.normalPrimaryButton};
            }
        }
    }
    h6{
        ${fontStyles.diodrum16SemiBold}
        color:${colors.Black};
        margin-bottom: 8px;
    }
    .close-icon{
        padding: 0;
        button{
            background-color: transparent;
            border-color: transparent;
            --bs-btn-active-bg:none;
            --bs-btn-active-border-color: none;
            --bs-btn-active-color:none;
            --bs-btn-active-shadow:none;
            --bs-btn-focus-shadow-rgb:none;
            :active{
                border-color:transparent;
            }
            svg{
                cursor: pointer;
                margin-top: -15px;
                path{
                    fill:${colors.Black};
                }
            }
        }
    }
    .error-msg-btn{
        align-items: end;
        text-align: right;
        margin-top: 24px;
        gap:10px;
        #canBtn{
            margin-right: 25px;
        }
        .ok-btn{
            ${fontStyles.diodrum14}
            ${standardButtonStyles.normalPrimaryButton}
        }
        .cancel-btn{
            ${fontStyles.diodrum14};
            ${standardButtonStyles.normalSecondaryButton};
            margin-right: 25px;
        }
        .yes-btn{
            ${fontStyles.diodrum14}
            ${standardButtonStyles.normalPrimaryButton}
        }
        .save-btn{
            ${fontStyles.diodrum14}
            ${standardButtonStyles.normalPrimaryButton}
        }
        .no-btn{
            ${fontStyles.diodrum14}
            ${standardButtonStyles.normalSecondaryButton}
            margin-right: 5px;
        }
    }
    .alert-message-wrapper{
        display: flex;
        align-items: center;
        .alert-message{
            display: flex;
            h6{
                margin-bottom:-5px;
            }
        }
    }
    
`;
export default CreatedProjectSuccessStyled;