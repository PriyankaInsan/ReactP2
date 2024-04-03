import { Row } from "react-bootstrap";
import styled from "styled-components";

const DesignStyled = styled(Row)`
    min-height: 100vh;
    padding: 14px 14px 32px 14px;
    display: flex;
    flex-direction: column;
    .uf-design{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        .card-wrapper-one, .card-wrapper-two, .card-wrapper-three{
            flex:1;
            flex-basis: 300px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            .uf-feed-flow, .uf-technology-selection, .module-selection,.flux-and-flow-rate, .uf-special-feature, .design-cycle-interval{
                padding: 16px;
                .card-header{
                    display: flex;
                    justify-content: space-between;
                    gap: 30px;
                    margin-bottom: 12px;
                    .spl-icon{
                        display: flex;
                    }
                }
                .uf_special_feature_radio{
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 10px;
                }
                .drink-water{
                    margin-bottom: 17px;
                }
                #pesSelect{
                    margin-bottom:15px;
                }
                .flux-and-flow-wrapper{
                    margin-top: 10px;
                }
                .design_cycle_interval{
                    display: flex;
                    gap: 14px;
                    margin-bottom: 9px;
                    .design-filtration-left, .design-filtration-right{
                        display: flex;
                        flex-direction: column;
                        gap: 14px;
                    }
                }
                .membrane-heading{
                    margin:21px 0px 9px 0px;
                }
            }
        }
    }
    @media screen and (max-width:1920px){
        .uf-design{
            flex-wrap: nowrap;
        }
        .card-wrapper-one, .card-wrapper-two, .card-wrapper-three{
            flex: 1;
            flex-basis: 300px;
        }
    }
`;
export default DesignStyled;