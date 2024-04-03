import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { cardStylesListView, colors, dropdownStyles, fontStyles } from "../../common/styles/Theme";
import { Card } from "react-bootstrap";
const ListViewStyled = styled.div`
    padding: 20px  0px 32px 0px;
    .list-view-header{
        margin-bottom: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
        .project_name_header_title{
            display: flex;
            width: 29%;
            padding-left: 10px;
            .list_header_sort_title{
                cursor: pointer;
            }
        }
        .project_hidden{
            visibility: hidden;
            width: 5%;
            min-width: 61px;
            max-width: 61px;
        }
        .created_date_header_title, .last_modified_header_title{
            display: flex;
            width: 18%;
            .list_header_sort_title{
                cursor: pointer;
            }
        }
        .projects_tags_header{
            width: 24%;
        }
        .arrow-updown-icon{
            display: flex;
            align-items: center;
            margin-left:8px;
            padding-top: 2px;
        }
    }
    .list-view{
        height: 60px;
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 10px;
        gap: 10px;
        flex-direction: row;
        align-items: center;
        :hover{
            ${cardStylesListView.hoverCardStyle}
        }
        .project_favorite{
            width:5%;
            min-width: 61px;
            max-width: 61px;
            height: -webkit-fill-available;
            border-radius: 4px 0px 0px 4px;
            .star-icon{
                width:5%;
                min-width: 61px;
                max-width: 61px;
                border-radius: 4px 0px 0px 4px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:${colors.PrimaryDarkAquaMarine};
            }
            svg{
                width:24px;
                height:24px;
                cursor:pointer;
                :hover{
                    transform: scale(1.1);
                }
            }
        }
        .project_name{
            width: 29%;
            cursor: pointer;
            padding-left: 10px;
        }
        .project_modified_date,.project_created_date{
            width: 18%;
            cursor: pointer;
        }
        .project-tags{
            width: 24%;
            display: flex;
            justify-content: space-between;
            .tag-name, .folder-tag-name{
                ${fontStyles.diodrum12};
                color: ${colors.blackTransparency085};
                text-decoration: none;
                background-color: ${colors.Pale20PaleTeal};
                border: 1px solid ${colors.PrimaryDarkAquaMarine};
                border-radius: 2px;
                align-items: center;
                padding: 1px 8px;
                gap: 3px;
            }
        }
        .project-option{
            width: 5%;
            display: flex;
            justify-content: center;
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
                            ${fontStyles.notoSans14};
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
    }
    @media(max-width:1024px){
        .card .card-img{
            width: 150px;
            height: 58px;
        }   
        .card .card-body .card-title h6, .list-view .project-Name h6{
            font-weight: 500;
            font-size: 14px;
        } 
        .card .card-body .card-text p, .list-view .project-info h6{
            font-size: 12px;
        }
    }
`;

export const NewStyledCard = styled(Card)`
    border-radius: 4px;
    background: #FFF;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.20);
    border: none;
    cursor: pointer;
    :hover{
    box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.20);
    }
    .create-project{
        padding: 0;
        display: flex;
        align-items: center;
        gap:20px;
        .create-project-icon{
            display: flex;
            justify-content: center;
            min-width: 61px;
            max-width: 61px;
            border-radius: 4px 0px 0px 4px;
            padding: 18px 13px;
            background-color:${colors.PrimaryDarkAquaMarine};
            svg{
                height: 24px;
                width: 24px;
                line{
                    stroke: #fff;
                }
            }
        }
    }
`;

export const ErrorMessageStyled = styled.h3`
    font-family: "DiodrumSemiBold";
    font-size: 16px;
    color: rgb(0, 0, 0);
    padding: 10px 0px;
`;

export default ListViewStyled;