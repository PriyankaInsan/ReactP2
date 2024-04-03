import { Col, Modal } from "react-bootstrap";
import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { colors, fontStyles } from "../../common/styles/Theme";
const SendProjectModalStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: ${(props)=>props.maxWidth || "572px"};    
    }
    .modal-content{
        border: none;
        border-radius: 2px;
        background-color:${(props)=>props.modalBgColor || colors.White};
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
    }
    .share-project-header{
        display: flex;
        justify-content: space-between;
        background: #F8F8F8;
        margin:0;
        padding: 17px 32px;
        .heading{
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .close-icon{
            .close_btn_icon{
                border: none;
                outline: none;
                background-color: transparent;
                padding-right:0;
            }
        }
    }
    .email-details{
        padding: 5px 32px;
        .selected_email_id_wrapper{
            margin-top: 15px;
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            max-height: 70px;
            overflow-x: hidden;
            overflow-y: auto;
            ::-webkit-scrollbar {
                width: 8px;          
            }
            ::-webkit-scrollbar-thumb {   
                border-radius: 30px;
                background: -webkit-gradient(linear,left top,left bottom,from(#128370),to(#007672));
                box-shadow: inset 2px 2px 2px rgba(255,255,255,.25), inset -2px -2px 2px rgba(0,0,0,.25);
            }
        }
        .selected_email_id{
            height: 32px;
            background: #F8F8F8;
            border-radius: 25px;
            width:max-content;
            display:flex;
            align-items: center;
            gap: 4px;
            padding:4px;
            .first_letter{
                width: 24px;
                height: 24px;
                border-radius:50%;
                background-color: green;
                display:flex;
                justify-content: center;
                align-items: center;
                ${fontStyles.diodrum16}
                font-weight: 600;
                line-height: 22px;
                color: #FFFFFF;
            }
            label{
                margin-bottom: 0;
            }
            .cross_icon{
                padding: 0;
                border: none;
                outline: none;
                background-color: transparent;
                display: flex;
                margin-left: 15px;
                svg{
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
    .previous_project_sent_header{
        padding: 12px 32px 0px 32px;
    }
    .previously_send_details{
        padding: 5px 32px;
        height:140px;
        display: flex;
        flex-direction: column;
        gap: 9px;
        overflow-x: hidden;
        overflow-y: auto;
        ::-webkit-scrollbar {
            width: 8px;          
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
        .user_details_wrapper{
            width:100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            /* gap: ; */
            .previously_sent_user_name{
                display: flex;
                gap: 15px;
                .user_first_letter{
                    display: flex;
                    justify-content: center;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: pink;
                }
            }
        }
        .user_email_block{
            color: #969696;
            font-size: 12px;
        }
    }
    .send-project-footer{
        
        
    }
`;

export default SendProjectModalStyled;