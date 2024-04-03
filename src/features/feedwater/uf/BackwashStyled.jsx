import { Row } from "react-bootstrap";
import styled from "styled-components";

const BackwashStyled = styled(Row)`
    min-height: 100vh;
    padding: 14px 14px 32px 14px;
    display: flex;
    flex-direction: column;
    .backwash-wrapper{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        .backwash-temperature,.water-source, .backwash-protocol{
            flex: 1;
            flex-basis: 300px;
            padding: 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
                .switch-div{
                    display: flex;
                    align-items: baseline;
                    gap:5px;
                }
            }
            .forward-flush-water{
                margin-top: 14px;
            }
            .temp-water{
                .temp-water-input{
                    width: 45%;
                }
            }
        }
    }
    .oxidant{
        margin: 14px 0;
        .oxidant-card{
            max-width: 32%;
            padding:16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
                .switch-div{
                    display: flex;
                    gap:5px;
                }
            }
            .oxidant-input-wrapper{
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                .oxidant-input, .oxidant-select{
                    width: 48%;
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
    .backwash-wrapper{
        flex-wrap: nowrap;
    }
    .duration-input-wrapper{
      flex-wrap: nowrap;
    }
  }
`;
export default BackwashStyled;