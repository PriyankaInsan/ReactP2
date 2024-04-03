import { Row } from "react-bootstrap";
import styled from "styled-components";

const CEBStyled= styled(Row)`
    min-height: 100vh;
    padding: 14px 14px 32px 14px;
    display: flex;
    flex-direction: column;
    .alkali-acid-dis{
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .ceb-temp-water{
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    }
    .ceb-temp-water, .alkali-acid-dis{
        display: grid;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 12px;
        .ceb-temp, .water-source, .acid-card, .alkali-card, .disinfection-card{
            flex: 1;
            flex-basis: 310px;
            /* max-width: 320px; */
            padding: 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            .ceb-water-source, .alkali, .oxidant{
                margin-bottom: 24px;
            }
            .ceb-temp-div{
                .ceb-temp-input{
                    width: 47%;
                }
            }
            .ceb-scaling-potential{
                width: 47%;
            }
            .ceb-water-source, .organic-acid, .alkali, .oxidant{
                .label-switch{
                    display: flex;
                    flex-wrap: wrap;
                    /* align-items: baseline; */
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
        }
    }
    .duration{
        .duration-card{
            padding: 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            .same-as-backwash{
                margin-bottom: 12px;
            }
            .duration-input-wrapper{
                display: flex;
                gap:10px;
                .big-text{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    @media(max-width:1300px) {
    .duration-input-wrapper{
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width:1920px){
    .duration-input-wrapper{
      flex-wrap: nowrap;
    }
    .ceb-temp-water, .alkali-acid-dis{
        flex-wrap: nowrap;
    }
  }
`;
export default CEBStyled;