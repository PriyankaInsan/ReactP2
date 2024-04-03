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
            }
            .cation-resin-regeneration-card-body, .anion-resin-regeneration-card-body{
                padding: 0;
                .effluent-quality{
                    padding:22px 5px;
                    .hidden{
                        visibility:hidden !important;
                    }
                    .endSaprater{
                        padding-left: 10px;
                    }
                    .vertical-line-heading{
                        margin-bottom:16px;
                        display: flex;
                        gap:5px;
                        align-items: center;
                        .vertical-line{
                            background: #E1E1E1;
                            height: 2px;
                            width:60%;
                        }
                    }
                    .effluent-heading-anion{
                        padding-left: 10px;
                    }
                    .na, .conductivity{
                        display: grid;
                        grid-template-columns: 31% auto;
                        gap: 4px;
                        align-items: center;
                        .radio-box{
                            .anion-label-na{
                                padding-left:10px;
                            }
                            .subScript{
                                margin-top: 6px;
                            }
                        }   
                       
                        .top-wrapper{
                            display: grid;
                            grid-template-columns: 30% auto;
                            align-items: center;
                            gap: 6px;
                            .end-point-wrapper{
                                display: flex;
                                /* align-items: center; */
                                gap: 6px;
                                .input-box-wrapper{
                                    flex: 1;
                                }
                                .select-options-div{
                                    width: 83px;
                                }
                            }
                            .hidden{
                                visibility: hidden;
                            }
                            .long-input{
                                /* padding-top: 4px; */
                            }
                        }
                    }
                    .organic{
                        margin-top: 10px;
                        display: grid;
                        grid-template-columns: 30% 23%;
                        gap: 160px;
                        align-items: center;
                        .radio-box{
                            .anion-label-na{
                                padding-left:10px;
                            }
                        }
                    }
                    .andLable{
                        margin-left: 11px;
                    }
                }
                /* .disabled_div{
                    display: none;
                } */
                .regenerant-dose, .select-options{
                    padding: 0px 15px 25px 15px;
                    .vertical-line-heading{
                        margin-bottom:16px;
                        display: flex;
                        gap:5px;
                        align-items: center;
                        .vertical-line.option{
                            width:43% !important; 
                        }
                        .vertical-line{
                            background: #E1E1E1;
                            height: 2px;
                            width:60%;
                        }
                    }
                    .regenerant-dose-wrapper, .radio-options-wrapper{
                        display: flex;
                        flex-direction: column;
                        gap: 7px;
                        .sac-safety-factor, .wac-safety-factor, .wac-overrun, .doseh2so4, .volume, .flow-rate, .time, 
                        .regeneration-ratio{
                            display: grid;
                            grid-template-columns: 46% auto;
                            align-items: center;
                            gap: 20px;
                            .input-reference{
                                display: grid;
                                grid-template-columns: 65% 30%;
                                gap: 4px;
                            }
                        }
                    }
                }
            }
        }
        .neutral-overrun-dose-card-wrapper{
            /* flex-grow: 1; */
            /* flex-basis: 345px; */
            /* max-width: 345px; */
            flex: 1;
            display: flex;
            flex-direction: column;
            .neutral-waste-effluent-card, .overrun-card, .dose-optimization-card{
                margin-bottom: 10px;
                .card-header{
                    display: flex;
                    justify-content: space-between;
                    background-color: transparent;
                    border: none !important;
                    padding: 16px 16px 0px 16px;
                }
                .neutral-waste-effluent-card-body, .overrun-card-body, .dose-optimization-card-body{
                    /* padding: 16px; */
                    display: grid;
                    grid-template-columns: 35% 65%;
                    gap: 5px;
                    .common-radio{
                    }
                }
            }
        }
    }
    @media (min-width:768px) and (max-width:1200px){
        .resin-regeneration{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            .cation-resin-regeneration-card, .anion-resin-regeneration-card{
                max-width:unset;
            }
        }
    }
    @media (min-width:1201px) and (max-width:1699px){
        .resin-regeneration{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            .cation-resin-regeneration-card, .anion-resin-regeneration-card{
                max-width:unset;
            }
        }
    }
    @media (min-width:1700px){
        .resin-regeneration{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            .cation-resin-regeneration-card, .anion-resin-regeneration-card{
                max-width:unset;
            }
        }
    }
`;
export default ProductQualityRegenerantDoseStyled;