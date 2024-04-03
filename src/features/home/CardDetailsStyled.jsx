import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { standardButtonStyles, 
  smallStandardButtonStyles,
  largeStandardButtonStyles, 
  dangerLargeButtonStyles, 
  dangerStandardButtonStyles, 
  fontStyles, radioStyles, 
  checkBoxStyles, InputBoxStyles,
  colors, headingStyles,tagsStyle, 
  unitPillStyles, selectStyles, textAreaStyles, cardStylesGridView, cardStyles1366GridView, dropdownStyles, cardStyles1600GridView} from "../../common/styles/Theme";
const CardTilesStyled = styled.div`
    padding: 20px  0px 32px 0px;
    display: grid;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* justify-content: space-between; */
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 265px), 1fr));
    .spc_card{
        height: 218px;
        .card{
            height: 218px;
            display: flex;
            justify-content: space-between;
        }
    }
       
        .create-project{
            display:flex;
            gap: 24px;
            flex-direction: column;
            justify-content: center;
            min-height: 218px;
            max-height: 218px;
            cursor: pointer;
            .create-project-icon, .create-project-text{
                display:flex;
                justify-content: center;
            }
        }
        /* locked project style add/remove class on functionality*/
        .main-card{
            min-height: 218px;
            max-height: 218px;
            border:none;
            .locked-project{
                /* display: none; */
                width: 100%;
                height: 100%;
                position: absolute;                
                background: rgba(225, 225, 225, 0.4);
                backdrop-filter: blur(1px);
                pointer-events: none;
                align-items: center;
                justify-content: center;
                z-index:100;
                .lock-icon{
                    width: 64px;
                    height: 64px;
                    border-radius:50%;
                    border:1px solid ${colors.PrimaryDarkAquaMarine};
                    display: flex;
                    justify-content:center;
                    align-items:center;
                    svg{
                        path,rect, line{
                            stroke:${colors.PrimaryDarkAquaMarine};
                        }
                        mask{
                            fill:${colors.PrimaryDarkAquaMarine};
                            stroke:${colors.PrimaryDarkAquaMarine};
                            path{
                                stroke:${colors.PrimaryDarkAquaMarine};
                                fill:${colors.PrimaryDarkAquaMarine};
                            }
                        }
                    }
                }
            }
            pointer-events: none;
        }
        
        .create-project{
            display:flex;
            gap: 24px;
            flex-direction: column;
            justify-content: center;
            min-height: 218px;
            max-height: 218px;
            :hover{
                h3{
                    color:${colors.PrimaryDarkAquaMarine};
                }
                svg{
                    circle{
                        fill:${colors.PrimaryDarkAquaMarine};
                    }
                }
            }
            .create-project-icon, .create-project-text{
                display:flex;
                justify-content: center;
            }
        }
        .spc_card{
            /* display: flex; */
            flex-direction: column;
            justify-content: space-between;
            min-height: 218px;
            max-height: 218px;
            /* max-width:max-content; */
            :hover{
                box-shadow:1px 2px 4px 2px rgba(0, 0, 0, 0.20);
            }
            .project-header-part{
                padding: 16px 16px 8px 16px;
                display:flex;
                gap: 8px;
                justify-content: space-between;
                .title-wrapper{
                    cursor: pointer;
                    .project-title-name{
                        
                    }
                    .project-inside-tags{
                        display: flex;
                        gap: 5px;
                        margin-top: 5px;
                        a{
                            ${fontStyles.diodrum12}
                            color: rgba(0, 0, 0, 0.85);
                            text-decoration: none;
                            padding:2px 6px 0px 6px;
                            background: #E2F7F5;
                            border: 1px solid ${colors.SecondaryElfGreen};
                            border-radius: 2px;
                        }
                    }
                }
                .project-option-dropdown{
                    .dropdown-toggle{
                        padding: 0;
                        outline: none;
                        border: none !important;
                        ::after{
                            display: none;
                        }
                    }
                    .dropdown-menu{
                        ${dropdownStyles.dropdownMenuStyles}
                        border:none;
                        .dropdown-item{
                            :link{
                                :hover{
                                    background: unset;
                                }
                            }
                            a{
                                ${fontStyles.notoSans16}
                                display: flex;
                                align-items: center;
                                color:${colors.Black};
                                text-decoration: none;
                                :hover{
                                    color:${colors.PrimaryDarkAquaMarine};
                                }
                            }
                        }
                    }
                }
            }
            .project-snippet{
                padding: 6px 26px 14px 25px;
                /* display: flex; */
                justify-content: center;
                .card-img{
                    width: 213px;
                    height: 74px;
                    cursor: pointer;
                }
                .favorite-icon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width:32px;
                    height:32px;
                    background-color:${colors.PrimaryDarkAquaMarine};
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-radius: 0px 4px 0px 4px;
                    text-align: center;
                    svg{
                        width: 16px;
                        height: 16px;
                        color:${colors.White};
                        cursor: pointer;
                        :hover{
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
        
    
    .toast-center{
        /* top: 50% !important; */
        /* transform: translateY(-50%) !important; */
        margin-top: 100%;
    }
    @media(min-width:1367px){
        .card-tiles{
            .card-column{
                min-width:247.7px;
                max-width: 247.7px;
            }
        }
    }
    @media(min-width:1440px){
        .card-tiles{
            .card-column{
                min-width:266px;
                max-width: 266px;
            }
        }
    }
    @media(min-width:1920px){
        .card-tiles{
            .card-column{
                min-width:260px;
                max-width: 260px;
            }
        }
    }
`;


export default CardTilesStyled;