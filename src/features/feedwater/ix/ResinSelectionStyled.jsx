import { Row } from "react-bootstrap";
import styled from "styled-components";
import eyeImage from "../../../common/assets/images/EyeOpen.svg";
import closeEye from "../../../common/assets/images/EyeInvisible.svg";
import { accordionStyles, colors, fontStyles, normalCardStyle, radioStyles, selectStyles } from "../../../common/styles/Theme";

const ResinSelectionStyled = styled.div`
    padding:14px;
    .blankdiv{
        height:4.92rem;
    }
    .resin-card{
        max-width: 684px;
        .card-header{
            display: flex;
            justify-content: space-between;
            padding: 16px 16px 0px 16px;
            background-color: transparent;
            border-radius: 0%;
            border:none;
            .card-title{
                margin-bottom: 0;
            }
        }
        .resin-card-body{
            display: flex;
            flex-wrap: wrap;
            gap: 3px;
            padding: 10px 11px;
            .resin-first-option{
                flex-grow: 1;
                flex-basis: 300px;
                .inert{
                    border-top: 3px solid ${colors.Grey96}; 
                }
                .wac{
                    border-top: 3px solid ${colors.f8b57e};
                }
                .sac{
                    border-top: 3px solid ${colors.d98680d};
                }
                .wba{
                    border-top: 3px solid ${colors.c71bfd2};
                }
                .sba{
                    border-top: 3px solid ${colors.c287082};
                }
                .wac, .inert, .sac, .wba, .sba{
                    display: flex;
                    flex-direction: column;
                    background-color: ${colors.GreyF8};
                    padding: 8px;
                    margin-bottom: 8px;
                    
                    .wac-select, .inert-select, .sac-select, .wba-select, .sba-select{
                        
                    }
                    .sac-radio, .sba-radio{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom:4px;
                        .radio-wrapper{
                            display: flex;
                            gap: 10px;
                        }
                    }
                }
            }
        }
    }
    @media (min-width: 768px) and (max-width:1200px){
        .resin-card{
            max-width: unset;
        }
    }
`;
export default ResinSelectionStyled;