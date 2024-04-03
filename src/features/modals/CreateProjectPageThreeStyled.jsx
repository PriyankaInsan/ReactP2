import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { InputBoxStyles, colors, fontStyles, normalInputBoxStyles, radioStyles, selectStyles, standardButtonStyles, unitPillStyles } from "../../common/styles/Theme";
const CreateProjectPageThreeStyled = styled.div`
    .row {
        --bs-gutter-x: 0 !important;
    }
    .currency-row{
        height:339.8px;
        padding: 5px 32px 7px 32px;
        .project-setting{
            .currency-header{
                margin-bottom: 7px;
            }
        }
        .currency-details-first-column{
            border-right: 1px solid ${colors.GreyE1};
            padding-right:10px; 
        }
        .error-msg{
                color: ${colors.DupontBrandRed};
                margin-bottom: 0;
            }
        .exchange-rate-radio{
            margin-top: 23px;
            .wrapper-radio{
                gap: 16px;
            }
            
            p{
                ${fontStyles.diodrum10}
                color: rgba(0, 0, 0, 0.45);
                margin-bottom:0;
            }
        }
        .currency-exchange-rate{
            margin-top:23px;
            
        }
        .default-currency{
            display: flex;
            margin-top: 17px;
        }
    }
    .units-metric-row{
        display: flex;
        justify-content: space-between;
        padding:0px 0px 0px 12px;
        h5{
            color:${colors.PrimaryDarkAquaMarine};
            ${fontStyles.diodrum14SemiBold};
            display: flex;
            align-items: center;
            margin-right: 15px;
            margin-bottom: 0;
        }
        .default-units{
            display: flex;
        }
        .unit_metric_radio{
            display: flex;
            gap: 22px;
            margin: 7px 0px;
        }
    }
    
    .unit-table-data-row{
        .table-one{
           padding: 0 10px;
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
                margin-right: 16px;
            }
            .right-header{
                margin-right: 16px;
            }
            .unit-child{
                display: grid;
                grid-template-columns: 100px 57px 57px;                
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
                    margin-right: 1px;
                    /* width: 52px !important; */
                    .water-filter-units#left-pill{
                        border-radius: 5PX 0px 0px 5px;
                        height: 18px;
                        width: 55px;
                    }
                    .water-filter-units.blank-unit{
                        background-color: #fff;
                    }
                    .selected#left-pill{
                        cursor: pointer;
                        text-align: center;
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 5px 0px 0px 5px;
                        ${fontStyles.notoSans12}
                        border: none;
                        /* padding:0px 8px; */
                        height: 18px;
                        width: 55px;
                        margin-bottom: 1px;
                    }
                    .water-filter-units{
                        cursor: pointer;
                        ${fontStyles.diodrum12}
                        color:${colors.Black} ;
                        text-align: center;
                        background:${colors.GreyE1};
                        border: none;
                        /* padding:0px 8px; */
                        margin-bottom: 1px;
                    }
                }
                .right-unit-wrapper{
                    /* flex: 1; */
                    display: flex;
                    flex-direction: column;
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
                        cursor: pointer;
                        ${fontStyles.diodrum12}
                        color:${colors.Black} ;
                        text-align: center;
                        background:${colors.GreyE1};
                        border: none;
                        /* padding:0px 8px; */
                        text-align: center;
                        margin-bottom: 1px;
                    }
                    .selected#right-pill{
                        text-align: center;
                        cursor: pointer;
                        background-color:${colors.PrimaryDarkAquaMarine};
                        color:${colors.White};
                        border-radius: 0PX 5px 5px 0px;
                        ${fontStyles.notoSans12}
                        border: none;
                        /* padding:0px 8px; */
                        text-align: center;
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
    .create-page-footer{
        display: flex;
        gap: 14px;
        padding: 19px 32px 19px 32px;
        justify-content: flex-end;
        align-items: center;
        align-self: stretch;
        border-top: 0.5px solid #E1E1E1;
        background: #FFF;
    }
    .toast-center{
        margin-top: 100%;
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

export default CreateProjectPageThreeStyled;