import { Modal } from "react-bootstrap";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import styled from "styled-components";


const ManageCaseStyled = styled(Modal)`
    background-color: rgba(0, 0, 0, 0.45);
    .modal-dialog{
        max-width: 900px;
    }
    .modal-content{
        border-radius: 2px;
        .modal-header{
            padding: 0;
            .header-create-project{
                display: flex;
                justify-content: space-between;
                background: #F8F8F8;
                width: 100%;
                margin:0;
                border-radius: 4px 4px 0px 0px;
                padding: 17px 32px 14px 32px;
                .heading{
                    .manage-case-sub-heading{
                        margin-top:6px;
                    }
                }
                .close-icon{
                    #btnClose{
                        background-color: transparent;
                        border: none;
                        outline:none;
                    }
                }
                
            }
            
        }
        .modal-body{
            padding: 24px 32px;
            .case-container{
                .case-title-column{
                    border-top: 1px solid rgba(0, 0, 0, 0.06);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                    background: var(--Grey-E1, linear-gradient(0deg, #E1E1E1 0%, #E1E1E1 100%), #E1E1E1);
                    display: grid;
                    grid-template-columns: 100px 266px 296px 91px 83px;
                    .title{
                        padding: 8px 10px;
                        align-items: left;
                    }
                }
                .cases-list{
                    height:230px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -ms-overflow-style: none;
                    ::-webkit-scrollbar{
                        width: 6px;
                        background-color:transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: #969696;
                        border-radius: 5px;
                    }
                }
                .case-details-data{
                    display: grid;
                    grid-template-columns: 100px 266px 296px 91px 83px;
                    .delete, .case-no,.case-notes, .reorder{
                        padding:12px 10px;
                        display: flex;
                        align-items: center;
                        #btnDelete{
                            display: flex;
                            background-color: transparent;
                            border-color:transparent ;
                        }
                        .cases_notes{
                            /* min-height: 36px; */
                            max-height: 40px;
                        }
                    }
                    /* .case-notes{
                        margin-top:-4px;
                    } */
                }
                .add-button-column{
                    margin-top:10px;
                    #btnAdd{
                        width: 100%;
                    }
                }
            }
        }
        .modal-save-footer {
            border-top: 0.5px solid #E1E1E1;
            background: #FFF;
            padding: 10px 32px;
        }
    }
    .draggabel{
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    .draggabel:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
    }
    .case-name{
        padding:12px 10px;
        display: flex;
        
        #btnDelete{
            background-color: transparent;
            border-color:transparent ;
        }
        flex-direction:column;
    }
`;
export const WarningMessageStyled= styled(Modal)`
    background-color: rgba(0, 0, 0, 0.45);
    .modal-content{
        padding: 32px;
        border-radius: 2px;
        background: var(--conditional-pop-over, #FFF);
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
    }
    .warning-header {
        display: flex;
        gap: 16px;
        align-items: center;
        svg{
            margin-right: 10px;
        }
    }
    .warning-body{
        padding-left: 11%;
    }
    .modal-footer {
        padding:0;
        border-top: none !important;
    }
`;

export default ManageCaseStyled;