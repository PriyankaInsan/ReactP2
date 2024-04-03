import styled from "styled-components";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import {Modal } from "react-bootstrap";
import { colors, fontStyles, modalStyles, standardButtonStyles } from "../../../common/styles/Theme";
const ProjectSaveWarningStyled =styled(Modal)`
    background-color:${colors.blackTransparency045};
    .modal-content{
        ${modalStyles.normalModalStyle} 
        padding: 25px;
    }
    h6{
        ${fontStyles.diodrum16SemiBold}
        color:${colors.Black};
        margin-bottom: 8px;
    }
    p{
        ${fontStyles.notoSans16}
        color:${colors.Black};
        margin-bottom: 0;
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
        justify-content: end;
        text-align: right;
        margin-top: 24px;
        display: flex;
        gap: 15px;
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
`;
export default ProjectSaveWarningStyled;