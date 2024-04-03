import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { circleStyles, colors, fontStyles, modalStyles } from "../../../common/styles/Theme";

const ProjectInformationModalStyled =styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: 900px;
    }
    .modal-content {
        ${modalStyles.normalModalStyle};
        .header-create-project{
            background:${colors.GreyF8};
            width: 100%;
            margin:0;
            padding: 17px 16px 14px 32px;
            .heading{
                display: flex;
                flex-direction: column;
                gap: 4px;
                padding: 0;
            }
            .close-icon{
                text-align: right;
                display: flex;
                justify-content: end;
                align-items: center;
                padding: 0;
                button{
                    cursor: pointer;
                    background-color: transparent;
                    border: none;
                }
            }
        }
        .react-tabs{
            padding-top: 8px;
        }
        .project-information-tab{
            padding-top:8px 0px 0px 32px;
            list-style: none;
            margin-bottom:0;
            cursor: pointer;
            .project-details, .customer-details, .project-settings{
                ${fontStyles.diodrum14SemiBold};
                color: ${colors.Grey96};
                padding-bottom: 7px;
                .circle{
                    ${circleStyles.disableCircleStyle};
                    display: inline-flex;
                    margin-right: 8px;
                }
                svg{
                    margin-left: 7px;
                }
            }
            .customer-details, .project-settings{
                margin-left: 32px;
            }
            .selected{
                border-bottom: 2px solid ${colors.PrimaryDarkAquaMarine};
                ${fontStyles.diodrum14SemiBold};
                color: ${colors.SecondaryElfGreen};
                .circle{
                    ${circleStyles.activeCircleStyle};
                    display: inline-flex;
                    margin-right: 8px;
                }
            }
        }
    }
`;

export default ProjectInformationModalStyled;