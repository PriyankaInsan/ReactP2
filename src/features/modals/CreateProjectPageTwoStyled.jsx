import styled from "styled-components";
import { Col, Form } from "react-bootstrap";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { InputBoxStyles, colors, fontStyles, inputGroupStyles, normalInputBoxStyles, selectStyles, standardButtonStyles } from "../../common/styles/Theme";
const CreateProjectPageTwoStyled= styled.div`
    .designer-and-project-customer-details{
        height: 339.8px;
        /* width: 898px; */
        .designer-details, .customer-details{
            margin-bottom: 32px;
            padding: 0px 32px;
            .city-mobile-wrapper{
                margin-top: 16px;
            }
            .designer-wrapper, .customer-country-wrapper, .city-mobile-wrapper{
                display: flex;
                gap: 14px;
                padding-top: 8px;
                .customer-name, .country-selection, .state-selection, .city-selection, .contact-number{
                    width: 216px;
                }
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
                        width: 32%;
                        border-right: 1px solid ${colors.GreyE1};
                        pointer-events: none;
                        .form-control{
                            padding:0px;
                            margin-left:27%;
                        }
                        .flag-dropdown{
                            .selected-flag{
                                padding:0;
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
                        width: 71%;
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

export default CreateProjectPageTwoStyled;