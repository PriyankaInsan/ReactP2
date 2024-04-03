/* eslint-disable max-len */
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { colors, fontStyles, formTextStyles, normalCardStyle, normalInputBoxStyles, radioStyles } from "../../../common/styles/Theme";

const AdvancedRegenerationStyled = styled(Row)`
    padding: 14px;
    .advance-regeneration-card{
        .advance-regeneration-card-body{
            display: grid;
            grid-template-columns: 30% 70%;
            @media (min-width: 768px) and (max-width:1200px){
                grid-template-columns: 40% 60% !important;
            }
            .title-wrapper{
                display: grid;
                grid-template-columns:auto;
                .title-table{
                    margin-bottom: 0;
                    tr{
                        padding: 9px 16px;
                        border:0px solid transparent !important;
                        td{
                            display: flex;
                            align-items: center;
                            height: 60px;
                        }
                    }
                }
            }
            .cation-anion-table-wrapper{
                display: grid;
                gap: 2px;
                overflow-x: auto;
                grid-template-columns:50% 50%;
                @media (min-width: 768px) and (max-width:1200px){
                    overflow-x : auto;
                    grid-template-columns: 75% 75% !important;
                }
                .cation-table{
                    background-color: ${colors.Pale20PaleTeal};
                }
                .anion-table{
                    background-color: ${colors.Pale20PalePink};
                }
                .cation-table, .anion-table{
                    margin-bottom: 0;
                    tr{
                        padding: 9px 16px;
                        width: 100%;
                        border-bottom: 1px solid ${colors.White};
                        :nth-child(1){
                            border: 0px solid transparent;
                        }
                        td{
                            display: flex;
                            align-items: center;
                            height: 60px;
                        }
                        .input-ref-text-wrapper{
                            display: grid;
                            gap: 5px;
                            grid-template-columns: 35% 65%;
                        }
                        .radio-option{
                            display: grid;
                            grid-auto-flow: column;
                            gap: 1px;
                        }
                    }
                }
            }
        }
    }
    
`;
export default AdvancedRegenerationStyled;