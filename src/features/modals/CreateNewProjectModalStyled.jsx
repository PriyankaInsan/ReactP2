import styled from "styled-components";
import { Col, Modal } from "react-bootstrap";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { circleStyles, colors, fontStyles, modalStyles } from "../../common/styles/Theme";
const CreateNewProjectModalStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    display: flex !important;
    justify-content: center;
    align-items: center;
    .modal-dialog{
        max-width:900px;
        min-width: 900px;
        margin: 0;
    }
    .modal-content{
        ${modalStyles.normalModalStyle};
    }
    .row{
        --bs-gutter-x:.3rem;
    }
    hr{
        margin:0;
    }
    .header-create-project{
        background:${colors.GreyF8};
        width: 100%;
        margin:0;
        padding: 17px 32px 14px 32px;
        .heading{
            h3{
                ${fontStyles.diodrum16SemiBold}
                display: flex;
                align-items: center;
                color:${colors.SecondaryElfGreen};
                margin-bottom:0;
            }
            p{
                ${fontStyles.diodrum12}
                color: rgba(0, 0, 0, 0.45);
                margin-bottom:0;
            }
        }
        .close-icon{
            text-align: right;
            display: flex;
            justify-content: end;
            align-items: center;
            cursor: pointer;
        }
    }
    .progress-bar{
        flex-direction:row ;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 10px;
        .project-details-progress{
            display: flex;
            /* justify-content: space-between !important; */
            align-items: center;
            padding-left: 25px;
            .designer-details, .project-setting-details, .project-details{
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: center;
                margin-left: 11px;
                padding: 0;
                span.active-circle{
                    ${circleStyles.disableCircleStyle};
                }
                .normal-tab{
                    ${fontStyles.diodrum14SemiBold};
                    color:${colors.Grey96};
                    display: flex;
                    align-items: center;
                    padding-left: 5px;
                    margin-top: 3px;
                    margin-bottom: 0;
                }
                .arrow-icon{
                    margin-left: 7px;
                    margin-top: -5px;
                    svg{
                        width:8px;
                        height:15px;
                        path{
                            stroke-width: 1px;
                            stroke:${colors.Black};
                        }
                    }
                }
            }
            .active-tab-panel, .completed-tab-panel, .designer-details{
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: center;
                margin-left: 11px;
                padding: 0;
                .active-circle{
                    ${fontStyles.diodrum14}
                    display: flex;
                    height: 24px;
                    width: 24px;
                    padding: 2px 0px 0px 0px;
                    align-items: center;
                    justify-content: center;
                    border-radius:50%;
                    border: 1px solid #007672;
                    background-color: ${colors.PrimaryDarkAquaMarine};
                    color: ${colors.White};
                }
                .completed-circle{
                    ${fontStyles.diodrum14}
                    display: flex;
                    height: 24px;
                    width: 24px;
                    padding: 6px;
                    border-radius:50%;
                    border: 1px solid #007672;
                    background-color: ${colors.White};
                    color: ${colors.PrimaryDarkAquaMarine};
                }
                .normal-circle{
                    ${fontStyles.diodrum14}
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 24px;
                    width: 24px;
                    padding: 2px 0px 0px 0px;
                    border-radius:50%;
                    border: 1px solid ${colors.Grey96};
                    background-color: ${colors.White};
                    color: ${colors.Grey96};
                }
                .active-tab{
                    color:${colors.PrimaryDarkAquaMarine};
                    ${fontStyles.diodrum14SemiBold}
                    display: flex;
                    align-items: center;
                    padding-left: 5px;
                    margin-top: 3px;
                    margin-bottom: 0;
                }
                .completed-tab{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
                    display: flex;
                    align-items: center;
                    padding-left: 5px;
                    margin-top: 3px;
                    margin-bottom: 0;
                }
                .normal-tab{
                    color:${colors.Grey96};
                    ${fontStyles.diodrum14}
                    display: flex;
                    align-items: center;
                    padding-left: 5px;
                    margin-top: 3px;
                    margin-bottom: 0;
                }
                .arrow-icon{
                    margin-left: 7px;
                    margin-top: -5px;
                    svg{
                        width:8px;
                        height:15px;
                        path{
                            stroke-width: 1px;
                            stroke:${colors.Black};
                        }
                    }
                }
            }
        }
        .designer-progress{
            display: flex;
            /* justify-content: space-between; */
            align-items: center;
            .arrow-icon{
                margin-left: 10px;
            }
            
        }
        .project-setting-progress{
            display: flex;
            justify-content: space-between;
            
        }
    }
`;

export default CreateNewProjectModalStyled;