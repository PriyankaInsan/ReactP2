import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, inputGroupStyles, modalStyles, normalCardStyle, selectStyles, standardButtonStyles } from "../../../common/styles/Theme";

const SaveToWaterLibraryStyled =styled(Modal)`
    background-color: rgba(0, 0, 0, 0.85);
    .modal-content{
        ${modalStyles.normalModalStyle};
        background-color: ${colors.White};
        .modal-header{
            padding: 17px 30px 9px 30px;
            background-color: ${colors.GreyF8};
            .modal-title{
                color: ${colors.PrimaryDarkAquaMarine};
                ${fontStyles.diodrum16SemiBold};
            }
            #btnClose{
                padding: 0;
                background-color: transparent;
                color: transparent;
                border: none;
                svg{
                    path{
                        fill:${colors.Black};
                        fill-opacity: 0.45;
                    }
                }
            }
        }
        .modal-body{
            overflow-y: auto;
            height: 530px;
            padding: 12px 30px;
            form{
                .input-group.large-input-group{
                    ${inputGroupStyles.normalMediumInputBoxWholeStyle1440};
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
                .form-label{
                    ${fontStyles.diodrum14};
                    color: ${colors.Black};
                    span{
                        color: ${colors.DupontBrandRed};
                    }
                }
            }
            .water-type-form{
                margin-top: 12px;
                display: grid;
                grid-auto-flow:column;
                grid-auto-columns: 19%;
                grid-column-gap: 10px;
                .form-label{
                    ${fontStyles.diodrum14};
                    color: ${colors.Black};
                    margin-bottom: 4px;
                }
                .form-select{
                    ${selectStyles.normalSelect};
                }
                .input-group{
                    ${inputGroupStyles.normalInputBoxWholeStyle}
                    .form-control{
                        ${inputGroupStyles.formControlStyles}
                    }
                    .input-group-text{
                        ${inputGroupStyles.defaultInputGroupTextStyles}
                    }
                    .input-group-text-icon{
                        ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles}
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
                    color: ${colors.Grey96};
                    ${fontStyles.diodrum10};
                }
            }
            .ph-form{
                margin-top:12px;
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 19% 79.70%;
                gap:10px;
                .temperature-card{
                    ${normalCardStyle.defaultCardStyle};
                    padding: 7px 7px 10px 40px;
                    form{
                        display: grid;
                        grid-auto-flow: column;
                        gap:16px;
                        h4{
                            color: ${colors.PrimaryDarkAquaMarine};
                            ${fontStyles.notoSans14};
                            display: flex;
                            align-items: center;
                            margin-bottom: 0;
                        }
                    }
                }
                .form-label{
                    ${fontStyles.diodrum14};
                    color: ${colors.Black};
                    margin-bottom: 4px;
                }
                .input-group{
                    ${inputGroupStyles.normalInputBoxWholeStyle}
                    .form-control{
                        ${inputGroupStyles.formControlStyles}
                    }
                    .input-group-text{
                        ${inputGroupStyles.defaultInputGroupTextStyles}
                    }
                }
            }
            .cations-anions-neutral-row{
                .cations-column,.anions-column, .neutrals-column{
                    padding:0;
                    margin-top: 20px;
                    .cations-card, .anions-card, .neutrals-card{
                        width: 95%;
                        ${normalCardStyle.defaultCardStyle};
                        .cations-heading,.anions-heading, .neutrals-heading{
                            padding:16px 16px 10px 16px;
                            display: flex;
                            justify-content: space-between;
                            h4{
                                color:${colors.PrimaryDarkAquaMarine};
                                ${fontStyles.notoSans14};
                                margin-bottom: 0;
                                .important-icon{
                                    color: ${colors.DupontBrandRed};
                                }
                            }
                            
                        }
                        .cations-title-header, .cations-title-footer, .anions-title-header, .anions-title-footer{
                            display: flex;
                            background-color: ${colors.cationsHeaderFooterColor};
                            .cations-title, .anions-title{
                                border-top: 1px solid rgba(0, 0, 0, 0.06);
                                border-right: 1px solid rgba(0, 0, 0, 0.06);
                                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                                padding: 10px 10px;
                                display: flex;
                                width:123.50px;
                                h4{
                                    ${fontStyles.notoSans14SemiBold};
                                    margin-bottom: 0;
                                    span{
                                        color: ${colors.DupontBrandRed};
                                    }
                                }
                                svg{
                                    margin-left: 10px;
                                }
                            }
                        }
                        .cations-data, .anions-data{
                            display: flex;
                            align-items: center;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                            background-color:${colors.Pale20PaleTeal};
                            .cations-form-label, .anions-form-label{
                                width:123px;
                                padding: 12px 10px;
                                .form-label{
                                    display: flex;
                                    align-items: center;
                                    ${fontStyles.diodrum14};
                                    height:32px;
                                    margin-bottom: 0;
                                }
                            }
                            .cations-form-data, .anions-form-data{
                                padding: 12px 10px;
                                .input-group{
                                    width: 123.50px;
                                    ${inputGroupStyles.extraSmallInputBoxWholeStyle};
                                    .form-control{
                                        ${inputGroupStyles.formControlStyles};
                                        ${fontStyles.diodrum14};
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
                            }
                            
                        }
                        .anions-title-header, .anions-title-footer{
                            background-color: ${colors.anionsHeaderFooterColor};
                        }
                        .anions-data{
                            background-color: ${colors.Pale20PalePink};
                        }
                    }
                }
                .neutrals-column{
                    .neutrals-card{
                        height: 100%;
                        .neutrals-title-footer{
                            margin-top: auto;
                        }
                        .neutrals-title-header, .neutrals-title-footer{
                            display: flex;
                            background-color: ${colors.Pale20PaleYellow};
                            .neutrals-title{
                                border-top: 1px solid rgba(0, 0, 0, 0.06);
                                border-right: 1px solid rgba(0, 0, 0, 0.06);
                                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                                padding: 10px 10px;
                                display: flex;
                                width: 275.6px;
                                :nth-child(1){
                                    width: 172px;
                                }
                                h4{
                                    ${fontStyles.notoSans14SemiBold};
                                    margin-bottom: 0;
                                }
                            }
                        }
                        .neutrals-data{
                            display: flex;
                            align-items: center;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                            background-color:#fffde6;
                            padding: 12px 10px;
                            .neutrals-form-label, .neutrals-form-data{
                                
                            }
                            .neutrals-form-label{
                                width: 172px;
                            }
                            .neutrals-form-data{
                                ${inputGroupStyles.normalInputBoxWholeStyle};
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
                        }
                    }
                }
            }
            
        }
        .modal-footer{
            border-top: 0cap.5px solid ${colors.GreyE1};
            background-color: ${colors.White};
            #btnSave{
                ${standardButtonStyles.normalPrimaryButton};
            }
        }
    }
`;
export default SaveToWaterLibraryStyled;