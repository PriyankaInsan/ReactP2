import styled from "styled-components";
import { colors, dropdownStyles, fontStyles } from "../../../common/styles/Theme";
import downArrow from "../../../common/icons/DownArrowOutlined.svg";
const SecondaryMenuStyled = styled.div`
    margin-top: 0px;
    .feed-water-header-row{
        position: fixed;
        top:${({scrollDirection})=>scrollDirection>100?"-6rem":"3.58rem"};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 500ms;
        /* top:0; */
        /* z-index: 5 !important; */
        width: 100%;
        height:60px;
        background:${colors.PrimaryDarkAquaMarine};
        .select-menu-column{
            align-items: center;
            .dropdown{
                .dropdown-toggle{
                    --bs-btn-bg:none;
                    --bs-btn-border-color: none;
                    --bs-btn-hover-bg:none;
                    --bs-btn-hover-border-color:none;
                    --bs-btn-active-bg: none;
                    --bs-btn-active-border-color: none;
                    padding:0px;
                    color: ${colors.White};
                    ${fontStyles.diodrum14};
                    display: flex;
                    align-items: center;
                    ::after{
                        content: "";
                        width: 10px;
                        height: 10px;
                        border: none;
                        background-image: url(${downArrow});
                    }
                }
                .dropdown-menu{
                    --bs-dropdown-link-active-bg:none;
                    --bs-dropdown-link-hover-bg:none;
                    --bs-dropdown-link-active-color:${colors.PrimaryDarkAquaMarine};
                    ${dropdownStyles.dropdownMenuStyles}
                    .recent-project{
                        svg{
                            margin-left: 20px;
                        }
                        .recent-project-submenu{
                            position:absolute;
                            left: 100%;
                            top: 47%;
                            background: ${colors.White};
                            box-shadow: 0px 4px 4px 0px ${colors.blackTransparency025};
                            border-radius:2px;
                            padding: 10px 25px;
                            display: none;
                            li{
                                color: ${colors.blackTransparency085};
                                ${fontStyles.diodrum14};
                                margin-bottom: 10px;
                                :hover{
                                    color: ${colors.PrimaryDarkAquaMarine};
                                }
                            }
                        }
                        :hover{
                            svg{
                                path{
                                    fill:${colors.PrimaryDarkAquaMarine};
                                }
                            }
                            .recent-project-submenu{
                                display: block;
                            }
                        }
                    }
                    .dropdown-item{
                        color: ${colors.blackTransparency085};
                        ${fontStyles.diodrum14};
                        :hover{
                            color:${colors.PrimaryDarkAquaMarine};
                        }
                    }
                }
            }
            .run-batch-btn, .stacked-report-btn{
                background-color: transparent;
                border-radius: 25px;
                border: 1px solid ${colors.White};
                box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
                border-radius: 25px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                ${fontStyles.diodrum14}
                color:${colors.White};
                height:32px;
            }
        }
        .icons-column{
            padding-right: 0;
            align-items: center;
            justify-content: end;
            .icon{
                cursor:pointer;
            }
        }
    }
    @media (min-width: 670px){
        .select-menu-column{
            padding:0;
        }
        .feed-water-header-row{
            padding: 14px 20px;
            z-index: 4 !important;
        }
        .run-batch-btn{
            font-size: 14px;
            margin-left: 0 !important;
            padding: 4px 10px;
        }
         .stacked-report-btn{
            font-size: 14px;
            margin-left:10px;
            padding: 4px 10px;
        }
        .dropdown{
            margin-right: 10px;
        }        
        .icon{
            margin-left: 15px;
        }
    }
    @media (min-width: 992px){
        .select-menu-column{
            padding:0;
        }
        .feed-water-header-row{
            padding:14px 28px;
            z-index: 4 !important;
        }
        .run-batch-btn{
            margin-left:38px;
            font-size: 16px;
            padding: 4px 15px;
        }
        .stacked-report-btn{
            margin-left: 22px;
            font-size: 16px;
            padding: 4px 15px;
        }
        .dropdown{
            margin-right: 31px;
        }  
        .icon{
            margin-left: 28px;
        }      
    }
`;
export default SecondaryMenuStyled;