import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, formTextStyles, inputGroupStyles, normalCardStyle, radioStyles } from "../../common/styles/Theme";

const IXInitializationStyled = styled(Row)`
    padding: 16px 13px;
    .modeling-demineralization-column, .train-configuration-column, .feed-flow-regeneration-column{
        .demineralization-card{
            height:170px;
        }
        .modeling-card, .demineralization-card, .train-configuration-card,.feed-flow-card,.regeneration-card{
            width:95%;
            ${normalCardStyle.defaultCardStyle};
            margin-bottom:16px;
            padding: 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                background-color: transparent;
                border: none !important;
                padding: 0 !important;
                .card-title{
                    ${fontStyles.notoSans14}
                    color: ${colors.PrimaryDarkAquaMarine};
                    margin-bottom: 0;
                    .important-icon{
                        color: ${colors.DupontBrandRed};
                    }
                }
            }
            .card-body{
                padding: 0px;
                margin-top: 12px;
                .radio-wrapper{
                    margin-top:20px;
                    margin-bottom:24px;
                }
                .form-check{
                    margin-bottom: 24px;
                    :nth-last-child(1){
                        margin-bottom: 0;
                    }
                    .form-check-input[type=radio]{
                        ${radioStyles.defaultRadio}
                        :hover{
                            ${radioStyles.hoverRadio};
                        }
                    }
                    .form-check-input[type=radio]:checked{
                        ${radioStyles.activeRadio};
                    }
                    .form-label{
                        ${fontStyles.diodrum14};
                        color: ${colors.Black};
                    }
                }
                .operating-cycle{
                    margin-bottom: 23px;
                    .input-group{
                        ${inputGroupStyles.normalInputBoxWholeStyle};
                        .form-control{
                            ${inputGroupStyles.formControlStyles};
                        }
                        .input-group-text{
                            ${inputGroupStyles.inputGroupTextStyleFromSelect};
                            .form-select{
                                ${inputGroupStyles.normalFormSelectInputGroupTextStyle};
                            }
                        }
                    }
                    .form-text{
                        ${formTextStyles.smallFormTextStyle};
                    }
                }
                .automatic, .specific-velocity{
                    .form-label{
                        ${fontStyles.diodrum14};
                        color: ${colors.Black};
                    }
                    .input-group{
                        ${inputGroupStyles.normalInputBoxWholeStyle};
                        .form-control{
                            ${inputGroupStyles.formControlStyles};
                        }
                        .input-group-text{
                            ${inputGroupStyles.defaultInputGroupTextStyles};
                            svg{
                                border: 1.8px solid ${colors.PrimaryDarkAquaMarine};
                                border-radius: 50%;
                                padding:2px;
                                path{
                                    fill: ${colors.PrimaryDarkAquaMarine};
                                }
                            }
                        }
                    }
                    .form-text{
                        ${formTextStyles.smallFormTextStyle};
                    }
                }
                .trains-wrapper{
                    display: flex;
                    .trains-online, .trains-total{
                        margin-right: 11px;
                    }
                    .trains-online, .trains-subsidy, .trains-total, .bypassed{
                        .form-label{
                            ${fontStyles.diodrum14};
                            color: ${colors.Black};
                        }
                        .input-group{
                            ${inputGroupStyles.normalInputBoxWholStyle};
                            .form-control{
                                ${inputGroupStyles.formControlStyles};
                            }
                            .input-group-text{
                                ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles};
                                svg{
                                    border: 1.8px solid ${colors.PrimaryDarkAquaMarine};
                                    border-radius: 50%;
                                    padding:2px;
                                    path{
                                        fill: ${colors.PrimaryDarkAquaMarine};
                                    }
                                }
                            }
                        }
                        .form-text{
                            ${formTextStyles.smallFormTextStyle};
                        }
                    }
                }
                
            }
        }
    }
`;
export default IXInitializationStyled;