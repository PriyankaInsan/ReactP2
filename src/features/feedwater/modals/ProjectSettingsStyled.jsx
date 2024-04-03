import styled from "styled-components";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import {Modal } from "react-bootstrap";
import { colors, fontStyles, modalStyles, normalInputBoxStyles, radioStyles, selectStyles, standardButtonStyles } from "../../../common/styles/Theme";
const ProjectSettingsStyled = styled.div`
    .modal-dialog{
        max-width: 900px;
    }
    .modal-content {
        ${modalStyles.normalModalStyle};
        width: 900px !important;
    }
    .row {
        --bs-gutter-x: 0 !important;
    }
    .currency-row{
        height: 418px;
        padding: 10px 32px 7px 32px;
        .currency-details-first-column{
            border-right: 1px solid ${colors.GreyE1};
            padding-right:10px; 
        }
        .project-setting{
            h6{
                ${fontStyles.diodrum14SemiBold}
                color:${colors.PrimaryDarkAquaMarine};
                margin-bottom: 0;
            }
            select{
                ${selectStyles.normalSelect}
            }
            label{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
            }
        }
        .exchange-rate-radio{
            margin-top: 23px;
            .exchange-heading{
                label{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
                }
            }
            .form-check{
                margin-bottom: 10px;
                .form-check-label{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
                    margin-right: 10px;
                }
                .form-check-input[type=radio]{
                    ${radioStyles.defaultRadio};
                    :hover{
                        ${radioStyles.hoverRadio}
                    }
                }
                .form-check-input[type=radio]:checked{
                    ${radioStyles.activeRadio}
                }
            }
            p{
                ${fontStyles.notoSans12}
                color:${colors.blackTransparency045};
                margin-bottom:0;
            }
        }
        .currency-exchange-rate{
            margin-top:23px;
            label{
                color:${colors.Black};
                ${fontStyles.diodrum14}
            }
            input{
                ${normalInputBoxStyles.disabledInputBoxStyle}
            }
        }
        .default-currency{
            display: flex;
            margin-top: 17px;
            cursor: pointer;
            h6{
                color:${colors.Black};
                ${fontStyles.notoSans12}
                margin-bottom: 0;
            }
            svg{
                margin-left: 8px;
                display: flex;
                align-self: center;
                path{
                    fill:${colors.Black};
                }
            }
            :hover{
                h6{
                    color:${colors.PrimaryDarkAquaMarine};
                    cursor: pointer;
                }
                svg{
                    path{
                        fill: ${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
        }
    }
    .units-metric-row{
        display: flex;
        justify-content: space-between;
        padding:0px 0px 0px 12px;
        h5{
            color:${colors.PrimaryDarkAquaMarine};
            ${fontStyles.notoSans14SemiBold}
            margin-right: 15px;
        }
        .default-units{
            display: flex;
            justify-content:end;
            cursor: pointer;
            h6{
                color:${colors.Black};
                ${fontStyles.notoSans12}
            }
            svg{
                margin: 2px 0px 0px 5px;
                path{
                    fill: ${colors.Black};
                }
            }
            :hover{
                h6{
                    color: ${colors.PrimaryDarkAquaMarine};
                }
                svg{
                    path{
                        fill: ${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
        }
        
        .form-check{
            label{
                ${fontStyles.notoSans14}
                color:${colors.Black};
            }
            .form-check-input[type=radio]{
                ${radioStyles.defaultRadio};
                :hover{
                    ${radioStyles.hoverRadio}
                }
            }
            .form-check-input[type=radio]:checked{
                ${radioStyles.activeRadio}
            }
        }
    }
    
    .unit-table-data-row{
        .table-one{
           padding: 0 10px;
        }
        .table-two{
            padding-left: 10px;
        }
        .table>:not(caption)>*>*{
            padding:0;
        }
        table{
            border-collapse: unset;
            width: 100%;
            margin-bottom: 0;
            border-spacing:0px 2px 0px 0px;
            tbody{
                border-collapse: unset;
                th{                                     
                    ${fontStyles.notoSans14};
                    text-transform: uppercase;
                    color: #DBDBDB;
                    text-align: center;
                }
                tr{ 
                    .unit-name{
                        color:${colors.Black};
                        ${fontStyles.diodrum14}
                        text-align: left;
                        border-bottom: none !important;
                        padding-right: 13px;
                    }
                    .water-filter-units{
                        ${fontStyles.notoSans12}
                        color:${colors.Black} ;
                        text-align: center;
                        background:${colors.GreyE1};
                        border: none;
                        padding:0px 8px;
                    }
                    .water-filter-units#left-pill{
                        border-radius: 5PX 0px 0px 5px;
                    }
                    .water-filter-units#right-pill{
                        border-radius: 0PX 5px 5px 0px;
                    }
                    .blank-unit{
                        visibility: hidden;
                    }
                    .selected#left-pill{
                        text-align: center;
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 5px 0px 0px 5px;
                        ${fontStyles.notoSans12}
                        border: none;
                        padding:0px 8px;
                        height: 18px;
                    }
                    .selected#right-pill{
                        text-align: center;
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 0PX 5px 5px 0px;
                        ${fontStyles.notoSans12}
                        border: none;
                        padding:0px 8px;
                        height: 18px;
                    }
                }
            }
        }
    }
    .create-page-footer{
        border-top: 0.5px solid ${colors.GreyE1};
        padding-left: 32px;
        padding-right:26px;
        padding-top: 17px;
        padding-bottom:14px;
        text-align: right;
        .cancel-next-btn{
            text-align: right;
            .create-btn{
                ${standardButtonStyles.normalPrimaryButton};
                ${fontStyles.diodrum14}
            }
            .back-btn{
                ${standardButtonStyles.normalSecondaryButton};
                ${fontStyles.diodrum14}
                margin-right: 5px;
            }
        }
    }
    @media (min-width: 992px){
        .currency-details-first-column{
            width:34.333333%;
        }
        .unit-table-data-row{
            width: 65.66667%;
        }
    }

`;

export default ProjectSettingsStyled;