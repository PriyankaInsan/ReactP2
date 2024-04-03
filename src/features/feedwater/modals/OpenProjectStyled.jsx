import styled from "styled-components";
import { Col, Modal } from "react-bootstrap";
import "../../../common/styles/notoSansFont.css";
import "../../../common/styles/diodrumFont.css";
import { colors, fontStyles } from "../../../common/styles/Theme";
const OpenProjectStyled = styled(Modal)`
    background-color: rgba(0, 0, 0, 0.45);
    .modal-dialog{
        max-width: 900px;
    }
    .modal-content{
        background-color: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }
    .header-create-project{
        background: #F8F8F8;
        width: 100%;
        margin:0;
        border-radius: 4px 4px 0px 0px;
        padding: 17px 32px 14px 32px;
        .heading{
            border-radius: 4px;
            h3{
                font-family: 'DiodrumSemiBold';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 18px;
                display: flex;
                align-items: center;
                color: #128370;
            }
            p{
                font-family: 'DiodrumRegular';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                margin-bottom:0;
            }
        }
        .close-icon{
            text-align: right;
            display: flex;
            justify-content: end;
            align-items: center;
            button{
                border: none;
                background-color: transparent;
            }
            svg{
                cursor: pointer;
                width:12px;
                height:12px;
                path{
                    stroke:rgba(0, 0, 0, 0.45);
                    fill:rgba(0, 0, 0, 0.45);
                }
            }
        }
        
    }
    .filter-text-wrapper{
                display:flex;
                flex-direction:column;        
                }
           
    .project-details-row{
        padding: 18px 31px;
        .project-details-scroll.keyboard-scroll{
            border: none;
        }
        .project-details-scroll{
            overflow: scroll;
            height: 350px;
            /* width: 500px; */
            
            ::-webkit-scrollbar{
                width: 6px;
                height: 6px;
                background-color:transparent !important;
            }
            ::-webkit-scrollbar-thumb {
                background-color: #969696;
                border-radius: 15px;
            }
            ::-webkit-scrollbar-track{
                background-color: transparent !important;
            }
            .projects-container{
                /* width:40%; */
                /* position: fixed; */
                display: grid;
                grid-template-columns:186px 153px 157px 111px 98px 131px 131px 135px;
                /* grid-auto-flow: column;
                grid-auto-columns: 26%; */
                .title{
                    border-radius: 0;
                    border-top: 1px solid rgba(0, 0, 0, 0.06);
                    border-right: 1px solid rgba(0, 0, 0, 0.06);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                    border-left: none;
                    background: var(--gray-f-0, #F0F0F0);
                    color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                    .heading{
                        font-family: "DiodrumSemiBold";
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 22px;
                        padding: 8px 10px;
                        margin-bottom:0;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .project-filter-icon{
                            display: inline-block;
                            margin-left: 10px;
                            .dropdown{
                                .dropdown-toggle{
                                    background-color: transparent;
                                    border-color: transparent;
                                    padding:0px 5px;
                                    ::after{
                                        display: none !important;
                                    }
                                }
                                .dropdown-menu{
                                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                                    border-radius: 2px;
                                    width: 229px;
                                    border: none;
                                    padding: 11px 15px;
                                    .ascending-wrapper{
                                        display: flex !important;
                                        flex-direction:column !important;
                                        margin-bottom: 15px;
                                        span{
                                            color: rgba(0, 0, 0, 0.85);
                                            font-family: "DiodrumRegular";
                                            font-size: 14px;
                                            font-style: normal;
                                            font-weight: 400;
                                            line-height: 18px;
                                            svg{
                                                cursor: pointer;
                                                margin-right: 13px;
                                            }
                                        }
                                    }
                                    .filter-heading{
                                        color: #128370;
                                        font-family: "DiodrumRegular";
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 600;
                                        line-height: 22px;
                                    }
                                    .filter-group{
                                        margin-bottom: 15px;
                                        .filter-sub-dropdown{
                                            color: var(--character-mark, #000);
                                            font-family: "DiodrumRegular";
                                            font-size: 14px;
                                            font-style: normal;
                                            font-weight: 400;
                                            line-height: 18px;
                                            border-radius: 2px;
                                            border: 1px solid var(--neutral-3, #E1E1E1);
                                            background-color: var(--neutral-1, #FFF);
                                        }
                                    }
                                    .radio-group{
                                        display: flex;
                                        .form-check-label {
                                            color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                                            font-family: "DiodrumRegular";
                                            font-size: 14px;
                                            font-style: normal;
                                            font-weight: 400;
                                            line-height: 18px;
                                            margin-right: 5px;
                                           
                                        }
                                        .form-check-input:checked {
                                            background-color: #007672;
                                            border-color: #007672;
                                        }
                                    }
                                    #filter-inside-input{
                                        border-radius: 2px;
                                        border: 1px solid var(--neutral-3, #E1E1E1);
                                        background: var(--neutral-1, #FFF);
                                        height: 32px;
                                        box-shadow: none;
                                        margin-bottom: 15px;
                                        color: var(--character-disabled-placeholder-25, #969696);
                                        font-family: "DiodrumRegular";
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: 18px;
                                    }
                                    /* .form-control{
                                        border-radius: 2px;
                                        border: 1px solid var(--neutral-3, #E1E1E1);
                                        background: var(--neutral-1, #FFF);
                                        height: 32px;
                                    } */
                                    #btnClear{
                                        color: var(--character-mark, #000);
                                        text-align: left;
                                        font-family: "NotoSansRegular";
                                        font-size: 12px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: 22px; /* 183.333% */
                                        letter-spacing: 0.06px;
                                        background-color: transparent;
                                        border-color: transparent;
                                        padding-left: 0;
                                        svg{
                                            width:12px;
                                            height:12px;
                                            path{
                                                stroke:rgba(0, 0, 0, 0.45);
                                                fill:rgba(0, 0, 0, 0.45);
                                            }
                                        }
                                    }
                                    .check-group{
                                        display: flex;
                                        .form-check-label {
                                            color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                                            font-family: "DiodrumRegular";
                                            font-size: 14px;
                                            font-style: normal;
                                            font-weight: 400;
                                            line-height: 18px; /* 128.571% */
                                            margin-right: 5px;
                                        }
                                        .form-check-input:checked {
                                            background-color: #007672;
                                            border-color: #007672;
                                            box-shadow: none;
                                           
                                        }
                                    }
                                    .date-wrapper{
                                        display: flex;
                                        gap: 2px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .form-check-label{
                margin-top: 3px;
                margin-left: -3px;
                margin-right: 10px;
            }
            .projects-records-data{
                /* margin-top: 50px; */
            }
            .open-project-data{
                display: grid;
                grid-template-columns:186px 153px 157px 111px 98px 131px 131px 135px;
                /* grid-auto-flow: column;
                grid-auto-columns: 26%; */
                .project-child-name-details{
                    span{
                        padding-left: 45px;
                    }
                    
                }
                .title{
                    border-radius: 0;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                    border-top: none !important;
                    span{
                        color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                        font-family: "DiodrumRegular";
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px; /* 128.571% */
                        padding: 12px 10px;
                        .project-title-name{
                            color: var(--secondary-128370, #128370);
                            font-family: "DiodrumRegular";
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 18px; /* 128.571% */
                            display: inline-block;
                            margin-bottom:0;
                            cursor: pointer;
                            margin-left: 10px;
                        }
                        .case-name{
                            margin-left: 24px;
                                }
                        .accordion-icon{
                            padding: 0;
                            cursor: pointer;
                        }
                    }
                }
            }
            .cursor{
                cursor: pointer;
            }
    
        }
        

        /* .projects-title-column{
            border-top: 1px solid var(--black-6, rgba(0, 0, 0, 0.06));
            border-right: 1px solid var(--black-6, rgba(0, 0, 0, 0.06));
            border-bottom: 1px solid var(--black-6, rgba(0, 0, 0, 0.06));
            background: var(--gray-f-0, #F0F0F0);
            display: flex;
            justify-content: space-between;
            .title{
                padding:8px 10px;
                width:max-content;
                display:flex ;
                flex-direction:row;
                border-right: 1px solid var(--black-6, rgba(0, 0, 0, 0.06));
            }
            
            .technology{
                width:190px;
            }
            .market-segment{

            }
            .customer{

            }
            .country{

            }
            .last-modified{

            }
            .date-created{
                
            }
            .heading{
                color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                
                font-family: "DiodrumSemiBold";
                font-size: 14px;
                font-style: normal;
                margin-bottom: 0;
                span{
                    padding: 0px 10px;
                }
            }
        } */
    }
`;

export default OpenProjectStyled;