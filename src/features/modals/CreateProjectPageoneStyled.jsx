import styled from "styled-components";
import { Col, Form } from "react-bootstrap";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { InputBoxStyles, checkBoxStyles, colors, fontStyles, normalInputBoxStyles, selectStyles, standardButtonStyles, techSmallButtonStyles, textAreaStyles } from "../../common/styles/Theme";
const CreateProjectPageOneStyled= styled.div`
    .first-section{
        height: 339.8px;
    }
    .project-details-information{
        padding-left: 32px;
        padding-right:26px;
        .project-column{
            padding-right: 12px;
            .text_area_div{
                height: 90px;
                .create_project_notes{
                    max-height: 70px;
                }
            }
            .second-row{
                margin-top:20px;
            }
            .form-select:valid{
                background-image: reset;
                ${selectStyles.normalSelect}
            }
            textarea{
                background-image: none;
                ${textAreaStyles.normalTextArea};
                :valid{
                    box-shadow: none;
                    border-color:${colors.GreyE1};
                }
                ::placeholder{
                    ${fontStyles.diodrum14}
                    color:${colors.Grey96};
                }
                :focus{
                    border-color:${colors.PrimaryDarkAquaMarine};
                    box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.20);
                }
            }
            .market-segment-selector{
                ${selectStyles.normalSelect};
                width:100%;
                :focus{
                    outline: none;
                }
            }
        }
        .label-input-box{
            .project-no, .date-created{
                ${normalInputBoxStyles.disabledInputBoxStyle};
            }
            input, select, textarea{
                border-radius: 2px;
            }
            input:valid{
                border-color:${colors.GreyE1};
                background-image: none;
                box-shadow: none;
            }
            input:invalid{
                box-shadow: none;
            }
        }
        
        label{
            span{
               color:${colors.DupontBrandRed};
            }
        }
    }
    .technology-preference{
        margin-top:15px;
        padding-left: 32px;
        padding-right:26px;
        display: flex;
        justify-content: space-between;
        .technology-preference-column{
            display: flex;
            align-items: end;
            h6{
                ${fontStyles.diodrum14}
                color:${colors.Black};
                /* margin-bottom:0; */
                span{
                    color:${colors.DupontBrandRed};
                }
            }
        }
        .default-technology-preference-column{
            display: flex;
            /* justify-content: end; */
            /* align-items: end; */
            h6{
                cursor: pointer;
                ${fontStyles.diodrum14}
                text-align: center;
                letter-spacing: 0.005em;
                color:${colors.Black};
                margin-bottom: 0;
            }
            .right-arrow-icon{
                margin-left: 8px;
                margin-right: 15px;
            }
        }
    }
    .error-msg{
        color: ${colors.DupontBrandRed};
        margin-bottom: 0;
    }
    .check-box-row{
        padding-left: 32px;
        padding-right:26px;
        .check-box-column{
            display: flex;
            flex-direction: column;
            .error-msg{
                color: ${colors.DupontBrandRed};
            }
            .technology-suggestion-info{
                margin-top: 5px;
                line-height: 15px;
            }
            .checkbox-wrapper{
                display: flex;
                gap: 13px;
                .tech-checkbox{
                    margin-right: 5px;
                    label{
                        ${fontStyles.notoSans16};
                        color:${colors.Black};
                    }
                    .form-check-input[type="checkbox"]{
                        ${checkBoxStyles.errorCheckBox};
                    }
                }
                .normal-tech-checkbox{
                    margin-right: 5px;
                    label{
                        ${fontStyles.notoSans16};
                        color:${colors.Black};
                    }
                    .form-check-input[type="checkbox"]{
                        ${checkBoxStyles.defaultCheckBox}
                        :hover{
                            ${checkBoxStyles.hoverCheckBox};
                        }
                    }
                    .form-check-input[type="checkbox"]:checked{
                        ${checkBoxStyles.activeCheckBox};
                    }
                }
            }
            
            /* .form-check{
                
            } */
        }
        .checkbox-description-column{
            p{
                ${fontStyles.notoSans12};
                font-feature-settings: 'tnum' on, 'lnum' on;
                color: rgba(0, 0, 0, 0.45);
            }
        }
    }
    .technology-used-row{
        margin-top:12px;
        padding-left: 32px;
        /* padding-right:26px; */
        .process{
            h6{
                color:${colors.Black};
                ${fontStyles.diodrum14};
            }
            .technology-btn{
                display: flex;
                gap: 5px;
                /* .default-btn{
                    margin-right: 6px;
                    ${techSmallButtonStyles.normalTechButton};
                    :nth-last-child(1){
                        margin-right:0;
                    }
                }
                .selected-btn{
                    margin-right: 6px;
                    ${techSmallButtonStyles.activeTechButton};
                    :nth-last-child(1){
                        margin-right:0;
                    }
                } */
            }
        }
        .pre-treatment{
            width:22.5%;
        }
        .bulk-demineralization{
            width:29.5%;
        }
        .polishing{
            width: 20.9%;
        }
        .trace-removal{
            width:23%;
        }
    }
    .create-page-footer{
        display: flex;
        padding: 19px 32px 19px 32px;
        justify-content: flex-end;
        align-items: center;
        align-self: stretch;
        border-top: 0.5px solid #E1E1E1;
        background: #FFF;
    }
`;

export default CreateProjectPageOneStyled;