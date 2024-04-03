import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, normalCardStyle } from "../../../common/styles/Theme";

const ExistingPlantDescriptionStyled = styled(Row)`
    padding: 14px;
    .error{
        color:red;
    }
    /* .existing-plant{
        ${normalCardStyle.defaultCardStyle};
        .resin-volume, .vessel-outer, .as-exhausted, .free-board,.inert-resin, .inert-bed, .free-board, .cylindrical-height, 
        .vessel-thickness{
            margin-bottom: 2px;
        }
        .error{
            color:red;
        }
        .existing-plant-heading, .sub-heading, .resin-volume, .vessel-outer, .resin-bed, .as-exhausted, .free-board,
        .inert-resin, .inert-bed, .free-board, .cylindrical-height, .vessel-thickness, .pressure-drop{
            display: flex;
            gap: 2px;
            .adjustment-parameter, .blank-div, .resin-volume-label, .vessel-outer-label, .resin-bed-label,.as-exhausted-label, 
            .inert-resin-label, .inert-bed-label,.free-board-label, .cylindrical-height-label, .vessel-thickness-label, .pressure-drop-label{
                flex: 10%;
                padding: 13px 0px 13px 16px;
            }
            .vessel1, .vessel2, .vessel3, .vessel4, .wac-heading,.sac-heading, .wba-heading, .as-exhausted-input, .inert-resin-input,
            .sba-heading,.features-heading, .resin-volume-input, .vessel-outer-input, .resin-bed-input, .inert-bed-input, .free-board-input,
            .cylindrical-height-input, .vessel-thickness-input, .pressure-drop-input{
                flex: 1;
                background-color: ${colors.GreyF8};
                padding: 13px 17px;
            }
            .sac-heading{
                border-top: 3px solid ${colors.d98680d};
                padding-bottom:0 !important;
            }
            .wba-heading{
                border-top: 3px solid ${colors.SecondaryPictonBlue};
                padding-bottom:0 !important;
            }
            .sba-heading{
                border-top: 3px solid ${colors.WaveproBlueCyanBlue};
                padding-bottom:0 !important;
            }
            .wac-heading {
                border-top: 3px solid ${colors.f8b57e};
                padding-bottom:0 !important;
            }
            .features-heading{
                border-top: 3px solid ${colors.GreyE1};
                padding-bottom:0 !important;
            }
        }
    }*/
    .radio-wrapper{
        display: flex;
        margin-top:18px;
        .ignore-vessel{
            margin-right: 0 !important;
        }
        .vessel-resin, .ignore-vessel, .ignore-resin{
            padding: 22px 16px;
            ${normalCardStyle.defaultCardStyle};
            margin-right: 12px;
        }
    } 
    .main-div-container{
        ${normalCardStyle.defaultCardStyle};
        /* padding-bottom: 15px; */
        display: flex;
        gap: 2px;
        .vessel-wrapper{
            width: 190px;
            background-color: ${colors.GreyF8};
            tbody{
                tr{
                    :nth-child(n+5):nth-child(-n+7){
                        border-bottom: 2px solid ${colors.GreyF8};
                    }
                    td{
                        small{
                            margin-top: 4px;
                        }
                    }
                }
                #borderColor0{
                    border-bottom: 3px solid ${colors.f8b57e};
                }
                #borderColor1{
                    border-bottom: 3px solid ${colors.d98680d};
                }
                #borderColor2{
                    border-bottom: 3px solid ${colors.SecondaryPictonBlue};
                }
                #borderColor3{
                    border-bottom: 3px solid ${colors.WaveproBlueCyanBlue};
                }
            }
        }
        .new-existing-plant-design{
            width: 290px;
            tbody{
                tr{
                    td{
                        display: flex;
                        align-items: center;
                    }
                    .blank{
                        visibility: hidden;
                    }
                }
            }
        }
        .new-existing-plant-design, .vessel-wrapper{
            tbody{
                tr{ 
                    border-bottom: 2px solid ${colors.White};
                    td{
                        height: 60px;
                        padding:10px 17px 4px 17px;
                    }
                }
            }
        }
        /* .vessel-wrapper{
            display: flex;
            gap: 2px;
            .vessel-section{
                flex-basis: 190px;
                .vessel-count{
                    padding: 13px 18px;
                }
                .vessel-count#borderColor0{
                    border-bottom: 3px solid ${colors.d98680d};
                }
                .vessel-count#borderColor1{
                    border-bottom: 3px solid ${colors.f8b57e};
                }
                .vessel-count#borderColor2{
                    border-bottom: 3px solid ${colors.SecondaryPictonBlue};
                }
                .vessel-count#borderColor3{
                    border-bottom: 3px solid ${colors.WaveproBlueCyanBlue};
                }
            }
        } */
        /* .new-existing-plant-design, .vessel-section{
            display:flex;
            flex-direction: column;
            .main-title, .wac-heading{
                padding: 13px 18px;
            }
            .main-title, .vessel-header{
                height: 100px;
            }
            .header-title, .vessel-outer-input{
                height: 60px;
                padding:10px 17px;
            }
            .vessel-outer-input, .vessel-header{
                background-color: ${colors.GreyF8};
                margin-bottom: 2px;
                :nth-child(n+4):nth-child(-n+6){
                    margin-bottom: 0;
                }
            }
            .vessel-outer-input#calcEngine{
            }
            .header-title{
                display:flex;
                align-items: center;
            }
        } */
    }
    
`;

export default ExistingPlantDescriptionStyled;