import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { cardStyles1366GridView, cardStyles1600GridView, cardStylesGridView, colors, dropdownStyles, fontStyles } from "../../common/styles/Theme";
export const ViewAllFolderStyled = styled.div`
    padding: 20px  0px 32px 0px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 265px), 1fr));
     .folder_card{
        height: 218px;
        :hover{
            ${cardStylesGridView.hoverCardStyle};
        }
        .card-body{
            padding: 15px;
            .card-title{
                margin-bottom: 0;
                h6{
                    display: flex;
                    align-items: center;
                    ${fontStyles.diodrum16SemiBold}
                    color:${colors.Black};
                    text-align: left;
                    margin-bottom: 0;
                    cursor: pointer;
                }
                .project-option-dropdown{
                    button{
                        outline: none;
                        border: none;
                        padding: 1px;
                        margin-right: 4px;
                    }
                    .dropdown-toggle::after {
                        display: none !important; 
                    }
                    .dropdown-toggle{
                        svg{
                            width: 4px;
                            height: 24px;
                        }
                    }
                    .dropdown-menu{
                        ${dropdownStyles.dropdownMenuStyles};
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
            .card-text{
                margin-bottom: 0;
                p{
                    ${fontStyles.notoSans14};
                    color: rgba(0, 0, 0, 0.45);
                    margin-bottom: 0;
                }
            }
        }
        .folder-card-body{
            display: flex;
            justify-content:center;
            cursor: pointer;
            padding:15px 15px 40px 15px;
        }
    }
`;