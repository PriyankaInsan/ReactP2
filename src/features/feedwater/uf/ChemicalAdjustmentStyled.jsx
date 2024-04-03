import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors, modalStyles } from "../../../common/styles/Theme";

const ChemicalAdjustmentStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: 1188px;
    }
    .modal-content {
        ${modalStyles.normalModalStyle};
        width: 1188px !important;
        .modal-header{
            border:none;
            background: ${colors.GreyF8};
            .main-title-wrapper{
                display: flex;
                flex-direction: column;
            }
        }
        .modal-body{
            display: flex;
            gap:3px;
            .product, .uf{
                display: flex;
                .product-icon, .uf-btn{
                    display: flex;
                    margin-top: 29px;
                    svg{
                        margin-top: 12px;
                    }
                }
                .uf-btn{
                    padding-left: 10px;
                }
            }
            .card-wrapper{
                display: flex;
                gap: 10px;
                .ph-card, .oxidant-card, .coagulant-card, .temp-card{
                    flex-basis: 243px;
                    max-width:243px;
                    padding:10px;
                    .card-header{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom:15px;
                    }
                    .input-select{
                        >div{
                            margin-bottom:8px;
                        }
                        .arrow-down{
                            margin-top: 15px;
                            display: flex;
                            align-items: center;
                            justify-content:center;
                        }
                    }
                }
            }
            .measurement{
                display: flex;
                flex-direction: column;
                margin-top: 12px;
                width: 49.5%;
                .heading{
                    background-color: ${colors.GreyE1};
                    border: 1px solid ${colors.GreyE1};
                }
                .measurement-data{
                    border-bottom: 1px solid ${colors.GreyE1};
                }
                .heading, .measurement-data{
                    display: flex;
                    >div{
                        padding: 8px 10px;
                        width: 186px;
                    }
                }
            }
        }
        .modal-footer{
            border-top: 0.5px solid ${colors.GreyE1};
            border-bottom: none;
            border-left: none;
            border-right: none;
            background: ${colors.White};
        }
    }
`;
export default ChemicalAdjustmentStyled;