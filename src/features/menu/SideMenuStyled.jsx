import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { colors, fontStyles, standardButtonStyles } from "../../common/styles/Theme";
const SideMenuUL = styled.div`
    border-width: 0px 0.5px 0.5px 0.5px;
    border-style: solid;
    border-color:${colors.GreyE1};
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    height: 100vh;
    margin-top:${({showSideMenu})=>showSideMenu?"0px":"58px"};
    padding-top: ${({showSideMenu})=>showSideMenu?"0px":"15px"};
    padding-left: 0px;
    padding-right: 0;
    background-color: #fff;
    width: ${({showSideMenu})=>showSideMenu?"35.5%":"19%"};
    .tablet_menu_view{
        display: flex;
        padding: 8.5px 10px 15px 15px;
        gap: 15px;
        .close_icon_btn{
            border: none;
            outline: none;
            background-color: transparent;
        }
        .global_header_logo1{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .dupont_logo{
            width: fit-content;
            height: 18px;
            display: flex;
            a{
                display: flex;
            }
        }
        }
        .global_header_logo2{
            display: flex;
            gap: 8px;
            align-items: center;
            cursor: pointer;
        }
    }
    hr{
        margin:0;
        border: 1px solid ${colors.Grey96};
    }
    .import-div{
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        .import-project-btn{
            width:80%;
        }
    }
    .project_navigation_menu{
        border-bottom: 1px solid ${colors.GreyE1};
        .project_navigation_menu_list{
            padding-left:0px;
            list-style: none;
            li{
                padding: 11px 0;
                cursor: pointer;
                >label{
                    padding-left:32px;
                    display: flex;
                    gap: 10px;
                    margin-bottom: 0;
                    cursor: pointer;
                }
                :hover{
                    >label{
                        color:${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
            .li-active{
                background: #E2F7F5;
                border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
                >label{
                    color:${colors.PrimaryDarkAquaMarine};
                } 
            }
        }
    }
    .information{
        margin-left: 55px;
        margin-top:8px;
        flex-direction: column;
        width: 80%;
        p{
            ${fontStyles.diodrum10}
            color:${colors.Black};
            padding:0;
            margin-bottom:10px;
        }
        .view-all-folder{
            ${fontStyles.notoSans12}
            text-align: center;
            letter-spacing: 0.005em;
            color:${colors.Black};
            text-decoration: none;
            margin-bottom:10px;
            :hover{
                color: ${colors.PrimaryDarkAquaMarine};
                svg{
                    path{
                        fill:${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
            svg{
                path{
                    fill:${colors.Black};
                }
            }
        }
    }
    .import-div{
        display: flex;
        justify-content: center;
        .import-project-btn{
            width:80%;
        }
    }
    
    .accordion{
        /* border: 1px solid black; */
        /* border: 0; */
        border-radius: 0;
        padding-left: 0px;
        width: 80%;
        --bs-accordion-body-padding-x: 0;
        --bs-accordion-body-padding-y: 0;
        --bs-accordion-btn-padding-x: 00.9rem;
        --bs-accordion-btn-padding-y: 0.9rem;
        --bs-accordion-btn-icon-width: 0.8rem;
        .accordion-header{
            margin-top:17px;
            button{
                width: max-content;
                padding:5px 16px;
                background-color: transparent;
                box-shadow: none;
                ${fontStyles.notoSans16};
                color:${colors.Black};
                margin-left: 38px;
            }
            .accordion-button{
                ::after{
                    margin-left: -75px;
                }
            }
            /* img{
                padding-right: 15px;
            } */
        }
        .accordion-body {
            /* border: 1px solid black; */
            width:125%;
            /* padding-left: 16px; */
            padding: unset;
            overflow-y: auto;
            scrollbar-width: none;
            scrollbar-color: ${colors.DupontBrandRed};
            ::-webkit-scrollbar{
                width: 6px;
                height: 80px;
                color:${colors.DupontBrandRed};
            }
            ::-webkit-scrollbar-thumb{
                background-color: ${colors.PrimaryDarkAquaMarine};
                border-radius: 5px;
                border: none;
            }
            .folder-list{
                .folder-list-active{
                    background: #E2F7F5;
                    border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
                }
                li{
                    cursor: pointer;
                    height:40px;
                    text-decoration: none;
                    ${fontStyles.diodrum14}
                    display: flex;
                    align-items: center;
                    color: ${colors.Black};
                    padding-left: 54px;
                    :hover{
                        color:${colors.PrimaryDarkAquaMarine};
                    }
                }
                .li-active{
                    background: #E2F7F5;
                    border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
                }
            }
            @media (min-width:1300px){
                max-height: 12rem;
            }
            @media (min-width:1440px){
                max-height: 16rem;
            }
            @media (min-width:1900px){
                max-height: 31rem;
            }
        }
    }
    .create-folder{
        position: absolute;
        right: 10px;
        margin-top: 17px;
        .create-folder-icon{
            width: 28px;
            height: 28px;
            margin-right: 10px;
            margin-top: 2px;
            cursor: pointer;
            :hover{
                path, line{
                    stroke:${colors.PrimaryDarkAquaMarine};
                }
            }
        }
    }
    @media(max-width:575px){
        position: unset;
        display: block;
        height: 100%;
        .side-menu{
            height: 100%;
        }
    } 
    @media(max-width:767px){
        display: block;
        height: 100%;
        .side-menu{
            height: 100%;
        }
        .import-project{
            margin-left: 20%;
        }
    }
    @media (max-width:992px){
        .project-list{
            padding-left: 0;
        }
        .import-project,.create-folder{
            font-size: 12px;
            padding: 4px 10px;
            margin-left: 10%;
        } 
        .project-list{
            li{
                a{
                    font-weight: 400;
                    font-size: 11px;
                } 
            }
        }
        .folder-list{
            li{
                a{
                    font-size: 11px; 
                }
            }
        } 
        .information{
            p{
                font-size: 9px;
                font-weight: 400;
            }
        }
    }
    @media(min-width:1920px){
        .import-project,.create-folder{
            /* margin-left: 60px; */
        } 
    }
   
`;

export default SideMenuUL;