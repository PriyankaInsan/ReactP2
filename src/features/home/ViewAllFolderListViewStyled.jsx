import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { cardStylesListView, colors, dropdownStyles, fontStyles } from "../../common/styles/Theme";
export const ViewAllFolderListViewStyled = styled.div`
    padding: 20px  0px 32px 0px;
    .folder_header_section{
        display: flex;
        margin-bottom: 10px;
        padding: 0px 10px 0px 24px;
        .folder_name_title{
            width: 50%;
        }
        .folder_created_title{
            width: 25%;
        }
        .folder_name_title, .folder_created_title{
            display: flex;
            gap: 5px;
            h3{
                cursor: pointer;
            }
            .arrow-updown-icon{
                display: flex;
                padding-top: 4PX;
            }
        }
    }
    .folder_cards_wrapper{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .folder_list_view_card{
            height: 60px;
            padding: 0px 10px 0px 24px;
            flex-direction: row;
            align-items: center;
            :hover{
               ${cardStylesListView.hoverCardStyle}
            }
            .folder_name{
                width: 50%;
                display: flex;
                gap: 20px;
                align-items: center;
                cursor: pointer;
                height: max-content;
                svg{
                    width: 25px;
                    height: 20px;
                }
            }
            .folder_created{
                width: 25%;
            }
            .folder_option{
                text-align: right;
                width: 25%;
                display: flex;
                justify-content: end;
                .project-option-dropdown{
                    button{
                        outline: none;
                        border: none;
                        padding: 4px;
                    }
                    .dropdown-toggle::after {
                        display: none !important; 
                    }
                    .dropdown-toggle{
                        width: 32px;
                        height: 32px;
                        svg{
                            width: 4px;
                            height: 24px;
                        }
                    }
                    .dropdown-menu{
                        ${dropdownStyles.dropdownMenuStyles};
                        .dropdown-item{
                            :link{
                                :hover{
                                    background: unset;
                                }
                            }
                            a{
                                ${fontStyles.notoSans14}
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
                svg{
                    margin-left: 11%;
                    width: 25px;
                    height: 19px;
                }
            }
        }
        
    }
`;