import styled from "styled-components";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import {Modal } from "react-bootstrap";
import { colors, fontStyles, modalStyles, normalInputBoxStyles, radioStyles, selectStyles, standardButtonStyles } from "../../../common/styles/Theme";
const CurrencyUnitPopUpStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
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
    .header-create-project{
        background:${colors.GreyF8};
        width: 100%;
        margin:0;
        padding: 17px 16px 14px 32px;
        .heading{
            .currency-modal-heading{
                margin-bottom:5px;
            }
        }
        .close-icon{
            text-align: right;
            display: flex;
            justify-content: end;
            align-items: center;
            button{
                background-color: transparent;
                border: none;
            }
        }
    }
    .currency-row{
        padding: 8px 32px 7px 32px;
        .currency-details-first-column{
            border-right: 1px solid ${colors.GreyE1};
            padding-right:10px; 
        }
        .project-setting{
            .currency-heading{
                margin-bottom:5px;
            }
            .select-currency-label{
                margin-bottom:4px;
            }
        }
        .exchange-rate-radio{
            margin-top: 23px;
            .exchange-heading{
               
            }
            .wrapper-radio{
                gap: 10px;
                margin-bottom:14px;
            }
            /* .form-check{
                margin-bottom: 10px;
                label{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
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
            } */
            /* p{
                ${fontStyles.notoSans12}
                color:${colors.blackTransparency045};
                margin-bottom:0;
            } */
        }
        .currency-exchange-rate{
            margin-top:23px;
            /* label{
                color:${colors.Black};
                ${fontStyles.diodrum14}
            }
            input{
                ${normalInputBoxStyles.disabledInputBoxStyle}
            } */
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
        .metric-us-radio-wrapper{
            display: flex;
            gap: 15px;
            margin:7px 0px;
        }
        .default-units{
            text-align: end;
        }
        
        /* .form-check{
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
        } */
    }
    
    .unit-table-data-row{
        .table-one{
            padding-left: 10px;
        }
        .table-two{
            padding-left: 10px;
        }
        .unit-table{
            .unit-header-title{
                display: grid;
                grid-template-columns: 140px 57px 57px;
                .us-metric{
                    display: flex;
                    justify-content: center;
                    ${fontStyles.diodrum12}
                    color: ${colors.GreyDB};
                    padding: 0 7px;
                    text-align: center;
                }
            }
            .left-header{
                margin-right: 27px;
            }
            .right-header{
                margin-right: 16px;
            }
            .unit-child{
                .unit-name{
                    flex: 2;
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
                    text-align: left;
                    border-bottom: none !important;
                    /* padding-right: 13px; */
                    height: 18px;
                }
                .left-unit-wrapper{
                    /* flex: 1; */
                    display: flex;
                    flex-direction: column;
                    /* width: 52px !important; */
                    margin-right: 1px;
                    cursor:pointer;
                    .water-filter-units#left-pill{
                        border-radius: 5PX 0px 0px 5px;
                        height: 18px;
                        width: 55px;
                    }
                    .water-filter-units.blank-unit{
                        background-color: #fff;
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
                        width: 55px;
                        margin-bottom: 1px;
                    }
                    .water-filter-units{
                        ${fontStyles.diodrum12}
                        color:${colors.Black} ;
                        text-align: center;
                        background:${colors.GreyE1};
                        border: none;
                        padding:0px 8px;
                        margin-bottom: 1px;
                    }
                }
                .right-unit-wrapper{
                    /* flex: 1; */
                    display: flex;
                    flex-direction: column;
                    cursor:pointer;
                    .water-filter-units#right-pill{
                        border-radius: 0PX 5px 5px 0px;
                        height: 18px;
                        
                    }
                    .bigPill{
                        width: 87px;
                    }
                    .smallPill{
                        width: 57px;
                    }
                    .water-filter-units{
                        ${fontStyles.diodrum12}
                        color:${colors.Black} ;
                        text-align: center;
                        background:${colors.GreyE1};
                        border: none;
                        /* padding:0px 8px; */
                        margin-bottom: 1px;
                    }
                    .selected#right-pill{
                        text-align: center;
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 0PX 5px 5px 0px;
                        ${fontStyles.notoSans12}
                        border: none;
                        /* padding:0px 8px; */
                        height: 18px;
                        margin-bottom: 1px;
                        
                    }
                }
                .left-right-wrapper{
                    display: grid;
                    grid-template-columns: 57px 87px;
                }
            }
            .child-one{
                display: grid;
                grid-template-columns: 140px 57px 57px;
            }
            .child-two{
                display: grid;
                grid-template-columns: 134px 57px 57px;

            }
        }
    }
    /* .unit-table-data-row{
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
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 5px 0px 0px 5px;
                        ${fontStyles.notoSans12}
                        border: none;
                        padding:0px 8px;
                        height: 18px;
                    }
                    .selected#right-pill{
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
    } */
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

export default CurrencyUnitPopUpStyled;