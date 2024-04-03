import styled from "styled-components";
import { Col } from "react-bootstrap";
import { colors, fontStyles } from "../../../common/styles/Theme";

const QuickNavStyled = styled(Col)`
    .quick-nav-menu{
        position: fixed !important;
        z-index: 5;
        left: 0px;
        top:83%;
        transform: translateY(-50%);
    }
    .quick-nav-menu.expanded{
        /* width:223px; */
    }
    .quick-button{
        background: ${colors.Pale20PaleTeal};
        width:120px;
        height:40px;
        position: absolute;
        display: flex;
        flex-direction: row;
        transform: rotate(90deg);
        margin-left:-40px;
        box-shadow: 0px 4px 4px ${colors.blackTransparency025};
        border-radius: 4px 4px 0px 0px;
        .arrow-icon{
            position: absolute;
            width:32px;
            height:42px;
            background: transparent;
            transform: rotate(-90deg);
            display:flex;
            align-items: inherit;
            justify-content: center;
            bottom:17px;
            span{
                width:31px;
                height:31px;
                border-radius:50%;
                display:flex;
                align-items: center;
                justify-content: center;
                border:3px solid ${colors.Pale20PaleTeal};
                margin-top:4px;
            }
        }
        .menu-toggle{
            ${fontStyles.diodrum16SemiBold}
            display: flex;
            align-items: center;
            color: ${colors.PrimaryDarkAquaMarine};
            width: max-content;
            background-color:${colors.Pale20PaleTeal};
            border:none;
            margin-left:20px;
        }
    }
    
    .menu-items{
        margin-top:10px;
        padding-left: 10px;
        width:230px;
        list-style-type: none;
        display: none;
        height:150px;
        overflow-y: scroll;
        background:${colors.White};
        box-shadow: 0px 4px 4px ${colors.blackTransparency025};
        border-radius: 0px 0px 4px 0px;
        transition: width 0.3s;
        padding:10px;
        .wrapper{
            display: flex;
            justify-content: space-between;
            h4{
                ${fontStyles.notoSans14SemiBold}
                color: ${colors.PrimaryDarkAquaMarine};
                margin-bottom: 0;
            }
            button{
                background-color: transparent;
                border:none;
                padding: 0;
                --bs-btn-active-bg:none;
                --bs-btn-active-border-color:none;
            }
        }
        
        li{
            ${fontStyles.diodrum14}
            color:${colors.Black};
            margin-bottom:10px;
            display: flex;
            justify-content: space-between;
            button{
                background-color:transparent;
                color:transparent;
                border:none;
                padding:0;
                --bs-btn-active-bg:none;
                --bs-btn-active-border-color:none;
                :hover{
                    /* svg{
                        path{
                            fill: ${colors.PrimaryDarkAquaMarine};
                            stroke: ${colors.PrimaryDarkAquaMarine};
                        }
                        line{
                            stroke: ${colors.PrimaryDarkAquaMarine};
                        }
                    } */
                }
            }
        }
    }
    .quick-nav-menu.expanded{
        .menu-items{
            display: block;
        }
        .quick-button{
            margin-left:190px;
            margin-top:48px;
        }
    }
`;
export default QuickNavStyled;