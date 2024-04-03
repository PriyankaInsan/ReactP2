import { Row } from "react-bootstrap";
import styled from "styled-components";

const CIPStyled = styled(Row)`
    min-height: 100vh;
    padding: 14px 14px 32px 14px;
    display: flex;
    flex-direction: column;
    .cip-temp-water-cycle, .acid-alkaline-surfactant{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap:16px;
        margin-bottom: 16px;
        .cip-temp-card, .cycles-card, .cip-water-card, .acid-cip-card, .alkaline-cip-card, .surfactant-card, .surfactant-card{
            flex: 1;
            flex-basis: 310px;
            /* max-width: 320px; */
            padding: 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
                .info-switch{
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
            }
            .temp-cip{
                width: 47%;
            }
            .cycle-input-wrapper{
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                .initial-bw-cycle, .rinse-soak-cycle,.rinse-bw-cycle{
                    width: 48%;
                }
            }
            .mineral-acid, .oxidant, .alkali{
                margin-bottom:24px;
            }
            .mineral-acid, .organic-acid, .alkali, .oxidant, .surfactant-select-wrapper{
                .label-switch{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    justify-content: space-between;
                    margin-bottom:12px;
                }
                .input-select{
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    .input, .select{
                        width: 48%;
                    }
                }
            }
            .ceb-scaling{
                width: 48%;
            }
        }
        .CIP-scaling{
            width: 47%;
        }
    }
    .duration{
        display: flex;
        .duration-card{
            padding: 16px;
            flex:1;
            flex-basis: 500px;
            max-width:66.4%;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            .duration-input-wrapper{
                display: grid;
                grid-template-columns: 150px 150px 150px;
                gap:10px;
            }
        }
    }
    @media screen and (max-width:1920px){
        .cip-temp-water-cycle, .acid-alkaline-surfactant{
            flex-wrap: nowrap;
        } 
    }
`;
export default CIPStyled;