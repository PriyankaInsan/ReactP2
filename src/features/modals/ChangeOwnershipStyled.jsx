import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";

const ChangeOwnershipStyled = styled(Modal)`
    background-color: rgba(0, 0, 0, 0.85);
    .modal-content {
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 2px;
    }
    .change-owner-header{
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
                background-color: transparent;
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
    
    .change-ownership-row{
        padding:14px 32px 3px 32px;
        .owner-name{
            color: var(--character-title-85, rgba(0, 0, 0, 0.85));
            font-family: "NotoSansRegular";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
        }
        span{
            display:inline-block;
            width: 25px;
            height: 25px;
            text-align: center;
            border-radius:50%;
            color: #FFFFFF;
            margin-right:5px;
            margin-right:15px;
        }
        .ownership-tag{
            p{
                color: var(--neutral-4, #969696);
                font-variant-numeric: lining-nums tabular-nums;
                font-family: "DiodrumRegular";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                margin-bottom:0;
            }
        }
        
    }
    .owner-list-header{
        padding:0px 32px;
        h5{
            font-family: 'DiodrumRegular';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.85);
        }
    }    
    .new-owner-list-row{
        padding: 5px 32px 9px 32px;
        height:130px;
        display: flex;
        /* justify-content: center; */
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
        .owner-list-column{
            align-items: inherit;
            margin-bottom:17px;
            p{
                color: var(--neutral-4, #969696);
                font-variant-numeric: lining-nums tabular-nums;
                font-family: "DiodrumRegular";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                margin-bottom:0;
            }
        }
        .checkbox-group {
          /* width: 235px; */
          .form-check-input:checked[type="radio"] {
                background-color: #007672;
            }
            label {
                font-family: "NotoSansRegular";
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: var(--character-title-85, rgba(0, 0, 0, 0.85));
                margin-left:16px;
                :hover {
                color: #007672;
                }
            }
        }
    }
    .description-details{
        padding: 16px 32px 9px 32px;
        .paragraph-column{
            p{
                color: var(--character-secondary-45, rgba(0, 0, 0, 0.45));
                font-family: "DiodrumRegular";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
            }
        }
    }
    .change-owner-footer-row{
        background-color: #F8F8F8;
        border-radius: 0px 0px 10px 10px;
        padding: 17px 23px;
        text-align: right;
        button{
            border-radius: 25px;
        }
        .back-btn{
            margin-right: 10px;
            padding: 10px 24px;
            box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
            background: #FFFFFF;
            border: 1px solid #000000;
            color: var(--character-title-85, rgba(0, 0, 0, 0.85));
            text-align: center;
            font-family: "DiodrumRegular";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
        }
        .change-ownership-btn{
            padding: 10px 24px;
            background: #128370;
            border: 1px solid #128370;
            color: #FFFFFF;
            color: var(--character-primary-inverse, #FFF);
            text-align: center;
            font-family: "DiodrumRegular";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
        }
    }
`;
export default ChangeOwnershipStyled;