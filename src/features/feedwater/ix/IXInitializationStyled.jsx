import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, formTextStyles, inputGroupStyles, normalCardStyle, radioStyles } from "../../../common/styles/Theme";

const IXInitializationStyled = styled(Row)`
    padding: 14px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;
    .modeling-demineralization-column, .train-configuration-column, .feed-flow-regeneration-column{
        flex: 1;
        /* max-width: 320px; */
        flex-basis: 350px;
        .demineralization-card{
            /* height:170px; */
        }
        /* .train-configuration-card{
            height: 100%;
        }
        .modeling-card,.regeneration-card{
            height: 70%;
        }
        .demineralization-card,.feed-flow-card{
            height: 25.6%;
        } */
        .demineralization-card{
            .card-body{
                margin-bottom:0 !important;
            }
        }
        .modeling-card, .demineralization-card, .train-configuration-card,.feed-flow-card,.regeneration-card{
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
            .modeling_objective_radio_group{
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .card-body{
                padding: 0px;
                margin-top: 12px;
                .radio-wrapper{
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-bottom:24px;
                    margin-top: 12px;
                }
                /* .demineralization-radio{
                    margin-bottom:38px;
                } */
                .ix_initialization_radio{
                    /* margin-bottom:20px; */
                }
                .form-check{
                    margin-bottom:10px;
                    :nth-last-child(1){
                        margin-bottom: 0;
                    }
                }
                .operating-cycle{
                    margin-bottom:14px;
                }
                .trains-wrapper{
                    display: flex;
                    gap: 11px;
                    .trains-online, .trains-total{
                       margin-bottom:10px;
                    }
                    .trains-online, .trains-subsidy, .trains-total, .bypassed{
                        width: 48%;
                    }
                }
                
            }
        }
    }
    @media screen and (max-width:1920px){
       flex-wrap :nowrap ;
       .modeling-demineralization-column, .train-configuration-column, .feed-flow-regeneration-column{
        flex-basis: 300px;
       }
    }
`;
export default IXInitializationStyled;
