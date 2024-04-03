import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, inputGroupStyles, inputGroupTextStyles, normalCardStyle, normalInputBoxStyles, selectStyles, standardButtonStyles, textAreaStyles } from "../../../common/styles/Theme";

const FormEntryStyled = styled.div`
    padding: 20px 20px 32px 20px;
    .feed-parameter-solid-content-temp-wrapper{
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        .form-entry-column{
            flex: 1;
            flex-basis: 300px;
            padding:0;
            width: 100%;
            .feed-parameters{
                height: 100%;
            }
            .ph{
                height: 55%;
            }
            .solid-content{
                height: 59%;
            }
            .organic-content{
                height: 36%;
            }
            .temperature{
                height: 40%;
            }
            .feed-parameters, .solid-content, .organic-content, .temperature, .ph{
                padding: 16px;
                /* width: 95%; */
                .card-header{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }
                #condensateBtn{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .water-type, .water-sub-type{
                    margin-bottom:17px;
                }
                .wrapper{
                    display: flex;
                    gap: 14px;
                    margin-bottom: 12px;
                    .turbidity, .tss{
                        width: 60%;
                    }
                }
            }
            .solid-content, .temperature{
                margin-bottom: 16px;
            }
        }
    }
    
    .cation-anion-neutral-wrapper{
        margin-top: 21px;
        padding:0;
        display: grid;
        grid-template-columns: 32.49% 32.49% 32.49%;
        flex-wrap: wrap;
        gap: 16px;
        .cations-card, .anions-card, .neutral-card{
            height: auto;
            flex: 1;
            /* flex-grow: 1; */
            flex-basis: 300px;
            .cations-heading, .anions-heading, .neutrals-heading{
                padding: 15px;
                display: flex;
                justify-content: space-between;
            }
            .cations-table{
                background-color: ${colors.Pale20PaleTeal};
                thead, tfoot{
                    background-color: ${colors.cationsHeaderFooterColor};
                }
            }
            .anions-table{
                background-color: ${colors.Pale20PalePink};
                thead, tfoot{
                    background-color: ${colors.anionsHeaderFooterColor};
                }
            }
            .neutral-table{
                background-color: ${colors.neutralHeaderFooterColor};
                thead, tfoot{
                    background-color: ${colors.Pale20PaleYellow};
                }
            }
            .cations-table, .anions-table, .neutral-table{
                height: -webkit-fill-available;
                margin-bottom: 0;
                thead{
                    tr{
                        th{
                            .icon-heading{
                                display: flex;
                                gap: 10px;
                            }
                        }
                    }
                }
                tbody{
                    tr{
                        th{
                            padding:12px 10px;
                            vertical-align: middle;
                        }
                        td{
                            vertical-align: middle;
                        }
                        :nth-last-child(1){
                            border-bottom:0px solid transparent;
                        }
                    }
                    .blank-row{
                        visibility: hidden;
                        border: 1px solid transparent;
                    }
                }
                tfoot{
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    tr{
                        th{
                            padding: 12px 10px;
                        }
                    }
                }
            }
            
        }
    }
    .summarized-feed-setup-column, .additional-feed-water-information-column{
        margin-top:17px;
        padding:0;
        .summarized-feed-setup-card, .additional-feed-water-information-card{
            ${normalCardStyle.defaultCardStyle};
            padding:16px;
            .form-heading{
                display: flex;
                justify-content: space-between;
                h4{
                    color:${colors.PrimaryDarkAquaMarine};
                    ${fontStyles.notoSans14};
                }
            }
            .additional_feed_setup_info{
                /* min-height: 70px; */
                /* height: 70px; */
                max-height: 80px;
            }
            .card-body-wrapper{
                display: flex;
                .card-body{
                    :nth-child(1){
                        padding-left: 0;
                    }
                    .card-text{
                        color: ${colors.Black};
                        ${fontStyles.diodrum14SemiBold};
                    }
                }
                .center-card-body{
                    border-left: 1px solid ${colors.blackTransparency006};
                    border-right: 1px solid ${colors.blackTransparency006};
                    display: flex;
                    align-items: center;
                }
                .right-card-body{
                    display: flex;
                    align-items: center;
                }
            }
            .form-text{
                ${fontStyles.diodrum14}
                color: ${colors.Black};
            }
        }
        .additional-feed-water-information-card{
            height: 130px;
        }
    }

    @media(min-width: 768px) and (max-width:1000px){
        .temp_ph_wrapper{
            display: grid;
            gap: 16px;
            grid-template-columns: 48.8% 48.8%;
            div.temperature, div.ph{
                height: unset !important;
                margin-bottom: 0 !important;
            }
        }
        .cation-anion-neutral-wrapper{
            grid-template-columns: 55% 55% 55%;
            overflow-x: scroll;
            scroll-behavior: smooth;
        }
    }
    @media(min-width: 1600px){
        .cation-anion-neutral-wrapper{
            grid-template-columns: 32.79% 32.79% 32.79%;
        }
    }
    
    
`;
export default FormEntryStyled;