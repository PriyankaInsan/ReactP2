import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { colors, fontStyles } from "../styles/Theme";
const FooterStyled = styled.footer`
    padding:20px 30px;
    background-color:${colors.PrimaryDarkAquaMarine};
    display: flex;
    margin-left: ${({locationCheck, tabCheck})=>locationCheck==="/home"?tabCheck==="error"?"0%":"19%":tabCheck==="IXD"|| tabCheck==="UF" ?"24%":"0%"};
    .footer-list{
        width: 55%;
        .footer_list_items{
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 10px;
            .vertical_line{
                width: 1px;
                height: 12px;
                background-color: #FFF;
            }
            a{
                font-family: 'DiodrumRegular';
                font-style: normal;
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                text-align: center;
                color: #6DD8CD;
                text-decoration: none;
            }
        }
        .footer_list_items a{
            :first-child{
                padding-left: 0px;
            }
            :last-child{
                border-right: none;
            }
        }
        .copyright{
            max-height: 46px;
            p{
                color: #FFF;
                font-family: "NotoSansRegular", "sans-serif";
                font-size: 11px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px;
                margin-bottom:0;
            }
        }
    }

    .footer-logo{
        width: 45%;
        display: flex;
        gap: 12px;
        justify-content: end;
        align-items: center;
        .logo-text{
            h6{
                font-family: 'DiodrumSemiBold';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                display: flex;
                align-items: center;
                text-align: right;
                justify-content: end;
                color: #FFFFFF;
            }
            .text-right{
                font-family: 'DiodrumRegular';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 0px;
                display: flex;
                justify-content: end;
                color: #FFFFFF;
                margin-bottom: 8px;
            }
           
        }      
        .color2{
            ${fontStyles.diodrum11Light}
            color:${colors.LightLightTeal};
            display: flex;
            justify-content: end;
            margin-bottom: 0;
        }       
        img{
            width:67px;
            height:72px;
        }
    }
    @media(min-width:768px) and (max-width:992px){
        padding: 15px 15px;
    } 
    @media (max-width:1200px){
        margin-left: ${({locationCheck, tabCheck})=>locationCheck==="/home"?"0%":tabCheck==="IXD"|| tabCheck==="UF" ?"0%":"0%"};
    }
`;

export default FooterStyled;
