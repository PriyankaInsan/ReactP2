import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors, modalStyles } from "../../../common/styles/Theme";
 const UFProductGuidelinesStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: 1188px;
    }
    .modal-content {
        ${modalStyles.normalModalStyle};
        width: 1188px !important;
        .uf-guideline-header{
            background-color: ${colors.GreyF8};
            .main-header{
                margin-bottom: 4px;
            }
            .close-icon{
                background-color: transparent;
                border:none;
            }
        }
        .modal-body{
            display: flex;
            justify-content: center;
            background-color: ${colors.White};
            padding-bottom: 0;
            .table-responsive{
                margin: 0;
                padding: 0;
                /* height: 300px !important;
                overflow-y: auto; */
                width: 100%;
            }
            .wrapper{
            }
            .header-title{
                display: block;
                /* position: sticky; */
                z-index: 4;
                top:0;
                background-color: ${colors.GreyE1};
                .title{
                    background-color: ${colors.GreyE1};
                    th{
                        background-color: ${colors.GreyE1};
                        width: 108px;
                        :nth-child(1), :nth-child(2){
                            width: 196px;
                        }
                    }
                }
            }
            .internal-data-container{
                display: block;
                height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
                :focus{
                    outline: none;
                }
                ::-webkit-scrollbar{
                    width: 6px;
                }
                ::-webkit-scrollbar-thumb{
                    /* width: 6px; */
                    background-color:${colors.GreyD9};
                    border-radius: 5px;
                }
                .internal-data{
                    display: table;
                    /* border-bottom: 1px solid ${colors.GreyE1}; */
                    :nth-last-child(1){
                        border-bottom: 1px solid ${colors.GreyE1};
                    }
                }
                .data{
                    /* border-bottom: 1px solid ${colors.GreyE1}; */
                    width: 110px;
                    :nth-child(1), :nth-child(2){
                        width: 200px;
                    }
                }
                .selected-row{
                    background-color: rgb(226, 247, 245);
                }
            }
        }
        .modal-footer{
            padding: 16px 50px 14px 50px;
            border-top:0.5px solid ${colors.GreyE1};
            background-color: ${colors.White};
            button{
                padding: 10px 24px 7px 24px;
            }
        }
    }
    @media(min-width:1024px) and (max-width:1300px){
        .internal-data-container{
            width:100%;
            overflow-x: scroll;
        }
    }
 `;
 export default UFProductGuidelinesStyled;