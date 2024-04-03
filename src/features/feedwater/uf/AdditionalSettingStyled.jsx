import { Row } from "react-bootstrap";
import styled from "styled-components";

const AdditionalSettingStyled = styled(Row)`
    min-height: 100vh;
    padding: 14px 14px 32px 14px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    .first-card-wrapper, .second-card-wrapper, .third-card-wrapper{
        flex: 1;
        flex-basis: 310px;
        /* max-width: 320px; */
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        .widthCIP{
            width:47%;
        }
        .pressure-card, .filtration-tmp-card, .tank-storage-card, .tank-size-factor-card, .displacement-volume-card, .strainer-specification-card,
        .power-card, .valves-card, .mem-flow-card{
            padding:14px 16px;
            .card-header{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            .maximum-air,.maximum-pressure, .filtrate-pressure, .filtration-piping, .strainer-pressure, .backwash-piping, .cip-piping,
            .chemical-storage-time,.refill-rate, .bw-plus, .bw-only, .cip-tank, .plc-power, .valve-power,.valves-per-unit, .valve-open,
            .typical-wait, .typical-pump, .bw-sweep-flow, .aeration-sweep-flow, .sweep-flow, .lumen-flow{
                margin-bottom: 10px;
                width:85%;
                .pressure,.pressureCalc{
                    width:60%;
                }
                .widthChanges{
                    width:92%;
                }
                .memcorWidth{
                    width:65%;
                }
            }
            .two-input-wrapper{
                display: flex;
                gap: 15px;
                margin-bottom: 17px;
            }
        }
    }
    @media screen and (max-width:1920px){
        flex-wrap: nowrap;
    }
`;
export default AdditionalSettingStyled;