import styled from "styled-components";
import waveLogo from "../assets/images/Wave-PRO-UF-Logo-02.svg";
const ErrorPageStyled = styled.div`
    min-height: 100vh;
    background-image: url(${waveLogo});
    background-repeat: no-repeat;
    background-position: 50% 90%;
    background-size: 20%;
    background-blend-mode: soft-light;
    background-color: #f8f8f8;
    .err_img_container{
        display: flex;
        justify-content: center;
        #errImg{
            width: 400px;
            height: 400px;
        }
    }
    .err_msg_container{
        .top_heading, .error_definition,.contact_us_btn{
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        .contact_us_btn{
            margin-top: 16px;
            .contact_btn{
                width: 11.5%;
            }
        }
    }
    .contact_us_form{
        margin-top: 35px;
        padding:35px 40px;
    }
`;
export default ErrorPageStyled;