import styled from "styled-components";
import { Row } from "react-bootstrap";
import { InputBoxStyles, colors, fontStyles, inputGroupStyles, selectStyles, smallStandardButtonStyles, standardButtonStyles } from "../../../common/styles/Theme";

const ChargeBalanceAdjustmentStyled = styled.div`
    background-color:${colors.Pale20PaleTeal};
    padding: 8px 20px;
    /* margin-top:5px; */
    position: fixed;
    top:${({scrollDirection})=>scrollDirection>100?"0":"11.01rem"};
    /* top: 0; */
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    z-index: 3;
    display: flex;
    left: 0;
    right: 0;
    flex-wrap: wrap;
    .charge-balance-column{
        flex: 9;
        /* flex-basis: 700px; */
        /* max-width:85%; */
        padding:0;
        border-right: 1px solid ${colors.LightLightTeal};
        .charge-balance-header-row{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 16px;
            padding:0px 10px 0px 0px;
        }
        .solutes-row{
            .solutes-row-column{
                display: flex;
                justify-content: space-between;
            }
            .btn-group{
                gap: 5px;
                button{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .adjust-ph-column, .add-solutes-column, .adjust-solutes-column, .quick-entry-column{
                /* border: 1px solid ; */
                padding:5px 6px;
                .btn-heading{
                    margin-bottom: 10px;
                }
            }
            .vertical_line{
                width: 1px;
                height: auto;
                background-color: ${colors.LightLightTeal};
            }
            .add-solutes-column{
                /* width: 35%; */
            }
            .adjust-solutes-column{
                /* width: 33%; */
            }
            .adjust-ph-column{
                /* width: 8.5%; */
            }
            .quick-entry-column{
                /* width: 22%; */
                .wrapper{
                    display: grid;
                    grid-template-columns: 40% 60%;
                    gap: 10px;
                    .select{
                        select{
                            width: 90%;
                        }
                    }
                }
                
            }
        }
    }
    .water-library-column{
        padding-left: 8px !important;
        padding-right:0;
        flex:1;
        /* flex-basis: 200px; */
        /* max-width:15%; */
        justify-content: center ;
        .water-library-header-column{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 20px;
        }
        .water-library-btn-column{
            .btn-group{
                display: flex !important;
                flex-direction: column;
                button{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-bottom: 7px;
                }
            }
        }
    }
    /* @media (min-width: 768px){
        .add-solutes-column, .adjust-solutes-column, .adjust-ph-column, .quick-entry-column{
            padding: 0px !important;
            border-right: none !important;
            margin-bottom: 10px;
        }
        .solutes-row-column{
            flex-direction: column !important;
        }
    }
    @media (min-width: 1024px) { 
        .solutes-row-column{
            flex-direction: row !important;
        }
        .add-solutes-column{
            padding: 0px 10px 0px 0px !important;
            border-right: 1px solid #6DD8CD !important;
        }
        .adjust-solutes-column{
            padding:0px 15px !important;
            border-right: 1px solid #6DD8CD !important;
        }
        .adjust-ph-column{
            padding:0px 10px !important;
            border-right: 1px solid #6DD8CD !important;
        }
        .quick-entry-column{
            padding:0px 10px !important;
        }
        .water-library-column{
            border-left: 1px solid #6DD8CD !important;
        }
    }
    @media (min-width: 1366px) {
        .charge-balance-column{
            width: 86.5%;
        }
        .water-library-column{
            width: 13.5%;
        }
    }
    @media (min-width: 1440px) {
        .charge-balance-column{
            width: 83%;
        }
        .water-library-column{
            width: 17%;
        }
    }
    @media (min-width: 1920px) {
        .charge-balance-column{
            width: 80%;
        }
        .water-library-column{
            width: 20%;
        }
    } */
    @media (min-width:768px) and (max-width: 1000px) {
        .btn-group{
            display: flex;
            flex-wrap: wrap;
        }
        .quick-entry-column{
            .wrapper{
                grid-template-columns:auto !important;
            }
        }
    }
    @media (min-width:1000px) and (max-width:1300px) {
        .charge-balance-column{
            .solutes-row{
                .btn-group{
                    display: flex;
                    flex-wrap: wrap;
                }
                .quick-entry-column{
                    .wrapper{
                        /* grid-template-columns:auto; */
                    }
                }
            }
        }
    }
    @media(min-width:1367px) {
        .add-solutes-column, .adjust-solutes-column, .adjust-ph-column, .quick-entry-column{
            /* padding:8px; */
            /* border: 1px solid black; */
        }
    }
    @media (min-width: 1440px) {
        .charge-balance-column{
            flex-basis:82%;
            .solutes-row-column{
                /* .add-solutes-column{
                    width: 32%;
                }
                .adjust-solutes-column{
                    width: 30%;
                }
                .adjust-ph-column{
                    width: 8%;
                }
                .quick-entry-column{
                    width:27% ;
                } */
            }
        }
        .water-library-column{
            flex-basis:15%;
        }
    } 
    @media (min-width: 1920px) {
        .charge-balance-column{
            flex: 7;
            flex-basis:80%;
        }
        .water-library-column{
            flex: 3;
            flex-basis:12%;
        }
    } 
`;

export default ChargeBalanceAdjustmentStyled;