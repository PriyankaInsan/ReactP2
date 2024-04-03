import { Form } from "react-bootstrap";
import styled from "styled-components";
import {
  colors,
  fontStyles,
  formTextStyles,
  inputGroupStyles,
  normalInputBoxStyles,
  selectStyles,
  standardButtonStyles,
} from "../../../common/styles/Theme";

const DesignerAndCustomerDetailsStyled = styled.div`
    .second-section{
        padding-top:12px;
        height: 380px;
    }
    .info-label{
        padding:12px 32px 15px 32px;
    }
    .error-msg{
        color: ${colors.DupontBrandRed};
        ${fontStyles.diodrum12};
    }
    .designer-details{
        margin-bottom: 20px;
    }
    .designer-details, .customer-details{
        padding:0px 32px;
        .customer-name, .country-selection, .state-selection{
            margin-bottom:15px;
        }
        #designer-details-heading, #projectDetailsHeading{
            margin-bottom: 8px;
        }
        .input-group{
            ${inputGroupStyles.normalInputBoxWholeStyle};
            .form-control{
                ${inputGroupStyles.formControlStyles};
            }
            .input-group-text{
                ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles};
                .dropdown-toggle{
                    background-color: transparent;
                    border: none;
                    color: ${colors.Black};
                    padding: 0px 5px 0px 0px;
                    border-radius: 0%;
                    border-right: 1px solid ${colors.GreyE1};
                }
                svg{
                    border: 1px solid ${colors.PrimaryDarkAquaMarine};
                    padding: 2px;
                    border-radius: 50%;
                    path{
                        fill: ${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
        }
        .form-text{
            ${formTextStyles.smallFormTextStyle};
        }
        .form-select{
            ${selectStyles.normalSelect};
        }
        /* #cityInput{
            ${normalInputBoxStyles.defaultInputBoxStyle};
        } */
        .contact-number{
            .country-code-input-box{
            height:31px;
            display: flex;
            align-items: center;
            padding:4px;
            border-radius: 2px;
            border: 1px solid ${colors.GreyE1};
            background-color: ${colors.White};
            outline: none;
            .react-tel-input{
                width: 30%;
                border-right: 1px solid ${colors.GreyE1};
                pointer-events: none;
                .form-control{
                    padding-left:0px;
                    margin-left:27%;
                }
                .flag-dropdown{
                    background-image: none;
                    background-color: transparent;
                    border: none;
                    .selected-flag{
                        padding:0;
                    }
                    .arrow{
                        display: none;
                    }
                }
            }
            :focus{
                outline:none;
            }
            }
            input{
                display: inline-block;
                border:none;
                box-shadow: none;
                height:28px;
                background-image: none;
                color:${colors.Black};
                border-radius: 0;
                width: 70%;
                ::-webkit-outer-spin-button,
                ::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            }
            input:focus{
                outline:${colors.PrimaryDarkAquaMarine};
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

`;

export default DesignerAndCustomerDetailsStyled;
