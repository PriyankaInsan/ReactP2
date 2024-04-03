import { Row } from "react-bootstrap";
import styled from "styled-components";
import { checkBoxStyles, colors, fontStyles, formTextStyles, inputGroupStyles, normalCardStyle, radioStyles, selectStyles } from "../../../common/styles/Theme";

const RegenerationConditionsStyled = styled(Row)`
    padding:14px;
    .card-container{
        display: grid;
        grid-template-columns: 35% 35%;
        gap:10px;
        .anion-resin-condition{
            background-color: ${colors.Pale20PalePink};
        }
        .cation-resin-card{
            background-color:${colors.Pale20PaleTeal};
        }
        .cation-resin-card, .anion-resin-condition{
            flex-grow: 1;
            flex-basis: 370px;
            /* max-width:347px; */
            .card-header{
                display: flex;
                justify-content: space-between;
                padding: 16px 16px 8px 16px;
                background-color: transparent;
                border-radius: 0%;
                border:none;
            }
            .cation-card-body, .anion-card-body{
                padding: 0px 16px;
                .temperature{
                    margin-top: 19px;
                }
                .temperature, .input-top-label{
                    .temp-wrapper{
                        display: flex;
                        justify-content: space-between;
                        border-bottom:1px solid ${colors.GreyE1};
                        padding-bottom: 17px;
                        margin-top: 8px;
                        margin-bottom:13px;
                        .temp-radio-group, .input-field{
                           flex: 1;
                        }
                        .temp-radio-group{
                            display: flex;
                            flex-direction: column;
                            gap: 7px;
                        }
                    }
                }
                .step1-wrapper, .step2-wrapper, .step3-wrapper{
                    display: flex;
                    gap: 10px;
                    margin-bottom: 13px;
                    align-items: center;
                    .input-field, .checkbox1{
                        flex: 1;
                    }
                }
                .service-water{
                    margin-top: 34px;
                    padding: 14px 0px;
                    .serviceDisplay{
                        display: flex;
                        align-items: center;
                        margin-bottom: 13px;
                        .lineDisplay{
                            width: -webkit-fill-available;
                            height: 1px;
                            background: linear-gradient(0deg, #E1E1E1 0%, #E1E1E1 100%), #E1E1E1;
                        }
                    }
                    .service-water-header{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .service-water-wrapper{
                        display: flex;
                        gap:20%;
                        .backwash, .regen{
                            display: flex;
                            flex-direction: column;
                            gap:7px;
                        }
                    }
                    p{
                        margin-bottom: 0;
                        ${formTextStyles.smallFormTextStyle};
                    }
                }
            }
        }
    }
`;
export default RegenerationConditionsStyled;