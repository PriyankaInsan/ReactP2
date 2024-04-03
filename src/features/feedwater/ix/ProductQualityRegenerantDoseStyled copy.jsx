import { Row } from "react-bootstrap";
import styled from "styled-components";
import { InputBoxStyles, colors, fontStyles, formTextStyles, inputGroupStyles, normalCardStyle, normalInputBoxStyles, radioStyles, selectStyles } from "../../../common/styles/Theme";

const ProductQualityRegenerantDoseStyled = styled(Row)`
    padding: 14px;
    .resin-regeneration{
        display: flex;
        flex-wrap: wrap;
        gap:10px;
        .cation-resin-regeneration-card{
            background-color: ${colors.Pale20PaleTeal};
        }
        .anion-resin-regeneration-card{
            background-color: ${colors.Pale20PalePink};
        }
        .cation-resin-regeneration-card, .anion-resin-regeneration-card{
            ${normalCardStyle.defaultCardStyleWithoutBackground};
            flex-grow: 1;
            flex-basis: 340px;
            max-width: 347px;
            /* flex: 1; */
            .card-header{
                display: flex;
                justify-content: space-between;
                background-color: transparent;
                border: none !important;
                padding: 16px 16px 0px 16px;
                .card-title{
                    ${fontStyles.notoSans14}
                    color: ${colors.PrimaryDarkAquaMarine};
                    margin-bottom: 0;
                }
            }
            .cation-resin-regeneration-card-body, .anion-resin-regeneration-card-body{
                padding: 0;
                .effluent-quality{
                    padding: 0px 5px;
                    margin-top: 22px;
                    h4{
                        ${fontStyles.notoSans14SemiBold};
                        color: ${colors.Black};
                        display: inline-block !important;
                    }
                    .vertical-line.effluent{
                        margin-left: 10px;  
                        width: 60%;
                        height: 2px;
                        background-color:${colors.GreyE1};
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .average-end-point{
                        display: flex;
                        justify-content: center;
                        gap: 17px;
                        margin-left: 45px;
                        label{
                            ${fontStyles.diodrum14};
                        }
                    }
                    .na>.top-wrapper{
                        display: flex;
                        gap: 10px;
                    }
                    .conductivity >.top-wrapper{
                        display: flex;
                        gap: 10px;
                        flex-basis: 20% 80%;
                    }
                    .organic{
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 32% 68%;
                        #organicRadio{
                            ${radioStyles.defaultRadio};
                            :hover{
                                ${radioStyles.hoverRadio};
                            }
                            :checked{
                                ${radioStyles.activeRadio};
                            }
                        }
                        .top-wrapper{
                            display: flex;
                            flex-direction: column;
                            justify-content: end;
                            margin-left: 66%;
                            .organic-input-group{
                                ${inputGroupStyles.normalInputBoxWholeStyle};
                                .form-control{
                                    ${inputGroupStyles.formControlStyles};
                                    ${fontStyles.diodrum14};
                                    color: ${colors.Black};
                                }
                                .input-group-text{
                                    ${inputGroupStyles.defaultInputGroupTextStyles};
                                    ${fontStyles.diodrum14};
                                    color: ${colors.Black};
                                }
                            }
                            .form-check-label{
                                ${fontStyles.diodrum14};
                                color: ${colors.Black};
                            }
                            .form-text{
                                ${formTextStyles.smallFormTextStyle};
                            }
                        }
                        
                    }
                    .na, .conductivity{
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 32% 68%;
                        /* gap: 10px; */
                        #radioNA, #radioConductivity{
                            ${radioStyles.defaultRadio};
                            :hover{
                                ${radioStyles.hoverRadio};
                            }
                            :checked{
                                ${radioStyles.activeRadio};
                            }
                        }
                        .form-check-label{
                            ${fontStyles.diodrum14};
                            color: ${colors.Black};
                        }
                        .top-wrapper{
                            /* display: grid;
                            grid-auto-flow: column;
                            gap: 10px; */
                            .group-input-wrapper{
                                flex: 72%;
                            }
                            .input-box-wrapper{
                                flex: 28%;
                                #inputField{
                                    ${normalInputBoxStyles.defaultInputBoxStyle};
                                    ${fontStyles.diodrum14};
                                    color: ${colors.Black};
                                }
                            }
                            .form-text{
                                ${formTextStyles.smallFormTextStyle};
                            }
                            #selectNA{
                                ${selectStyles.normalSelect};
                            }
                            .input-group{
                                ${inputGroupStyles.normalInputBoxWholeStyle};
                                .form-control{
                                    ${inputGroupStyles.formControlStyles};
                                    ${fontStyles.diodrum14};
                                    color: ${colors.Black};
                                }
                                .input-group-text{
                                    ${inputGroupStyles.defaultInputGroupTextStyles};
                                    ${fontStyles.diodrum14};
                                    color: ${colors.Black};
                                }
                            }
                        }
                    }
                }
                .regenerant-dose, .select-options{
                    margin-top: 22px;
                    padding:0px 16px 16px 16px; 
                    h4{
                        ${fontStyles.notoSans14SemiBold};
                        color: ${colors.blackTransparency085};
                        margin-bottom: 16px;
                        display: inline-block !important;
                    }
                    .vertical-line{
                        margin-left: 10px;
                        width: 58%;
                        height: 2px;
                        background-color:${colors.GreyE1};
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .vertical-line.option{
                        width: 40%;
                        height: 2px;
                        background-color:${colors.GreyE1};
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .sac-safety-factor, .wac-safety-factor, .wac-overrun,.doseh2so4, .volume, .flow-rate, .time, .regeneration-ratio{
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 46% 27% 25%;
                        /* gap: 10px; */
                        margin-bottom: 10px;
                        label{
                            ${fontStyles.diodrum14};
                            color: ${colors.blackTransparency085};
                        }
                        #sacInput, #wacInput, #flowRateInput, #timeInput, #regenerationInput{
                            ${normalInputBoxStyles.defaultInputBoxStyle};
                        }
                        .form-text{
                            ${formTextStyles.smallFormTextStyle};
                            padding-left: 5px;
                        }
                        .wac-input-group, .dose-input-group, .volume-input-group{
                            ${inputGroupStyles.normalInputBoxWholeStyle};
                            input{
                                ${inputGroupStyles.formControlStyles};
                            }
                            .input-group-text{
                                ${inputGroupStyles.defaultInputGroupTextStyles}
                            }
                        }
                        #doseH2SO4Radio, #volumeRadio, #flowRateRadio, #timeRadio, #regenerationRadio{
                            ${radioStyles.defaultRadio}
                            :hover{
                                ${radioStyles.hoverRadio}
                            }
                            :checked{
                                ${radioStyles.activeRadio};
                            }
                        }
                        .form-check-label{
                            ${fontStyles.diodrum14}
                            color: ${colors.Black};
                        }
                    }
                }
                .select-options.disabled_div{
                    
                }
            }
        }
        .neutral-overrun-dose-card-wrapper{
            /* flex-grow: 1; */
            flex-basis: 345px;
            max-width: 345px;
            flex: 1;
            display: flex;
            flex-direction: column;
            .neutral-waste-effluent-card, .overrun-card, .dose-optimization-card{
                margin-bottom: 10px;
                ${normalCardStyle.defaultCardStyle};
                .card-header{
                    display: flex;
                    justify-content: space-between;
                    background-color: transparent;
                    border: none !important;
                    padding: 16px 16px 0px 16px;
                    .card-title{
                        ${fontStyles.notoSans14}
                        color: ${colors.PrimaryDarkAquaMarine};
                        margin-bottom: 0;
                    }
                }
                .neutral-waste-effluent-card-body, .overrun-card-body, .dose-optimization-card-body{
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    .form-check{
                        flex: 1;
                    }
                    #notRequiredRadio, #requiredRadio, #manualRadio, #automaticRadio, #noRadio, #yesRadio{
                        
                        ${radioStyles.defaultRadio}
                        :hover{
                            ${radioStyles.hoverRadio}
                        }
                        :checked{
                            ${radioStyles.activeRadio}
                        }
                    }
                    .form-check-label{
                        ${fontStyles.diodrum14}
                        color: ${colors.Black};
                    }
                }
            }
        }
    }
`;
export default ProductQualityRegenerantDoseStyled;