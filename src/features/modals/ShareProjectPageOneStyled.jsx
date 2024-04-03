import {Modal } from "react-bootstrap";
import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
const ShareProjectPageOneStyled = styled(Modal)`
background-color: rgba(0, 0, 0, 0.85);
    .modal-content{
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 2px;
    }
    .share-project-header{
        background: #F8F8F8;
        width: 100%;
        margin:0;
        padding: 17px 32px 14px 32px;
        .heading{
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
                background-color:transparent;
                border-color: transparent;
                
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
    }
    .email-details{
        padding: 5px 32px;
        .form-label{
            font-family: 'NotoSansRegular';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 10px;
        }
        .form-control{
            width: 100%;
        }
        .shared-person-name{
            text-align: center;
            background: #F8F8F8;
            border-radius: 25px;
            width:max-content;
            display:flex;
            justify-content: center;
            align-items: center;
            padding:4px;
            .circle{
                width:32px;
                height:32px;
                display:flex;
                justify-content: center;
                align-items: center;
                span{
                    display:inline-block;
                    width: 24px;
                    height: 24px;
                    text-align: center;
                    border-radius:50%;
                    color: #FFFFFF;
                    margin-right:5px;
                    background-color: green;
                }
            }
            svg{
                margin:0 14px;
                path{
                    fill: #000000;
                }
            }
        }
    }
    .shared-details-header{
        padding:5px 12px 5px 32px;
        display: flex !important;
        align-items: center;
        justify-content: space-between;
        margin-top:2%;
        button{
            background: #FFFFFF;
            border: none;
            /* box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016); */
            border-radius: 25px;
            font-family: 'DiodrumRegular';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            display: inline-flex;
            padding: 10px 24px;
            justify-content: center;
            align-items: center;
            gap: 5px;
            --bs-btn-active-bg:none;
            --bs-btn-active-border-color: none;
            --bs-btn-active-color:none;
            --bs-btn-active-shadow:none;
            --bs-btn-focus-shadow-rgb:none;
            svg{
                path{
                    fill: #000000;
                }
            }
        }
        h6{
            color: var(--character-title-85, rgba(0, 0, 0, 0.85));
            font-size: 14px;
            font-family: "DiodrumRegular";
            line-height: 22px;
            margin-bottom: 0;
        }
    }
    .shared-details-row{
        padding: 5px 32px;
        height:180px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        ::-webkit-scrollbar {
            width: 10px;          
        }

        ::-webkit-scrollbar-thumb {   
            border-radius: 30px;
            background: -webkit-gradient(linear,left top,left bottom,from(#128370),to(#007672));
            box-shadow: inset 2px 2px 2px rgba(255,255,255,.25), inset -2px -2px 2px rgba(0,0,0,.25);
        }

        ::-webkit-scrollbar-track {     
            background-color: #fff;
            border-radius:10px;
            /* background: linear-gradient(to right,#201c29,#201c29 1px,#100e17 1px,#100e17); */
        }
        .shared-project-column{
            align-items: inherit;
            margin-bottom:15px;
            .circle{
                width:32px;
                height:32px;
                display:flex;
                justify-content: center;
                align-items: center;
                span{
                    font-family: 'NotoSansRegular';
                    font-style: normal;
                    display:inline-block;
                    width: 24px;
                    height: 24px;
                    text-align: center;
                    border-radius:50%;
                    color: #FFFFFF;
                    margin-right:5px;
                    background-color: green;
                }
            }
            .owner-details{
                color: var(--neutral-4, #969696);
                font-variant-numeric: lining-nums tabular-nums;
                font-family: "DiodrumRegular";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
            }
            .users-name{
                margin-left: 16px;
                font-family: 'NotoSansRegular';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: rgba(0, 0, 0, 0.85);
                margin-bottom: 0;
            }
        }
        .delete-icon{
            display:flex;
            justify-content: end;
        }
        
    }
    .share-project-footer{
        background-color: #FFFFFF;
        border-top: 0.5px solid #E1E1E1;
        border-radius: 0px 0px 10px 10px;
        margin-top:16px;
        padding: 17px 28px;
        text-align: right;
        button{
            border-radius: 25px;
        }
        .leave-project-btn{
            border-radius: 25px;
            border: 1px solid var(--black, rgba(0, 0, 0, 0.85));
            background: var(--white, #FFF);
            box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
            padding: 10px 24px;
            color: var(--black, rgba(0, 0, 0, 0.85));
            text-align: center;
            font-family: "DiodrumRegular";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            margin-right: 18px;
        }
        .share-project-btn{
            padding: 10px 24px;
            font-family: "DiodrumRegular";
            box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
            border: 1px solid var(--primary-6, #128370);
            background: var(--primary-6, #128370);
            color: var(--character-primary-inverse, #FFF);
            font-size: 14px;
            font-weight: 400;
            line-height:22px;
        }
    }
    //change ownership style
    
`;

export default ShareProjectPageOneStyled;