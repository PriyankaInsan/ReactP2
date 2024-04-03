import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { modalStyles } from "../../common/styles/Theme";

const ExploreStyledPopUp = styled(Modal)`
    background-color: rgba(0, 0, 0, 0.85);
    .modal-content{
        padding: 16px 24px;
        ${modalStyles.normalModalStyle};
    }
    h1{
        font-family: 'DiodrumRegular';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        display: flex;
        align-items: center;
        color: #007672;
        margin-bottom: 28px;
    }
    .form-label{
        font-family: 'NotoSansRegular';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
    }
    .close-icon{
        margin-top:-1%;
        cursor: pointer;
        svg{
            path{
                fill: black;
            }
        }
    }
    .input-group{
        /* width: 90%; */
    }
    .btn-create-folder{
        text-align: right;
        button{
            margin-top: 14px;
            margin-left: 10px;
            font-family: 'DiodrumRegular';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            letter-spacing: 0.005em;
            border-radius: 25px;
            padding: 4px 15px;
            :nth-of-type(1){
                color: #000000;
                border: 1px solid #000000;
            }
            :nth-of-type(2){
                background: #128370;
                color: #FFFFFF;
            }

        }
    }
`;

export default ExploreStyledPopUp;