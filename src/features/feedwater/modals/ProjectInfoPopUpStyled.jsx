import { Form} from "react-bootstrap";
import styled from "styled-components";
import { InputBoxStyles, checkBoxStyles, colors, fontStyles, formTextStyles, inputGroupStyles, normalInputBoxStyles, selectStyles, standardButtonStyles,techSmallButtonStyles, techButtonStyles, textAreaStyles } from "../../../common/styles/Theme";


const ProjectInfoPopUp = styled.div`
    
    .first-section{
        padding-top:12px;
        height: 380px;
    }
    .info-label{
        ${fontStyles.diodrum12};
        color:${colors.Black};
        padding:0px 32px 15px 32px;
    }
    .error-msg{
        color: ${colors.DupontBrandRed};
    }
    .project-details-information{
        padding-left: 32px;
        padding-right:26px;
        .project-column{
            margin-bottom: 10px;
        }
        .project-column, .project-column-one{
            .form-label{
                display: flex;
                ${fontStyles.diodrum14};
                color: ${colors.Black};
                margin-bottom: 4px;
                span{
                    color: ${colors.DupontBrandRed};
                }
            }
            .text_area_div{
                height: 80px !important;
                textarea{
                    max-height:58px;
                }
            }
            .label-input-box{
                
            }
            .input-group.disable{
                ${inputGroupStyles.disabledInputGroupInputBoxStyle};
                .form-control{
                    ${normalInputBoxStyles.disabledInputBoxStyle};
                }
            }
            .input-group{
                ${inputGroupStyles.normalInputBoxWholeStyle};
                .form-control{
                    ${inputGroupStyles.formControlStyles};
                }
                .input-group-text{
                    ${inputGroupStyles.defaultInputGroupTextWithoutPaddingStyles};
                    svg{
                        border: 1px solid ${colors.PrimaryDarkAquaMarine};
                        padding: 2px;
                        border-radius: 50%;
                        path{
                            fill: ${colors.PrimaryDarkAquaMarine};
                        }
                    }
                }
            }
            .form-text{
                ${formTextStyles.smallFormTextStyle};
            }
            .form-select{
                ${selectStyles.normalSelect};
            }
        }
    }
    .technology-preference{
        margin-top:12px;
        padding: 0px 32px;
        display: flex;
        .technology-preference-column{
            display: flex;
            align-items: center;
        }
        .default-technology-preference-column{
            display: flex;
            justify-content: start;
            align-items: baseline;
            h6{
                cursor: pointer;
                ${fontStyles.diodrum14}
                color:${colors.Black};
            }
            .right-arrow-icon{
                margin-left: 8px;
            }
        }
    }
    .check-box-row{
        padding-left: 32px;
        padding-right:26px;
        margin-bottom: 5px;
        display: flex;
        gap: 14px;
        .checkbox-wrapper{
            display: flex;
            gap: 13px;
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
        padding-left: 32px;
        .process{
            padding: 0;
            .technology-btn{
                display: flex;
                gap: 5px;
                .tech-buttons{
                    margin-right: 6px;
                }
                .default-btn{
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
                }
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
        gap: 14px;
        padding: 19px 32px 19px 32px;
        justify-content: flex-end;
        align-items: center;
        align-self: stretch;
        border-top: 0.5px solid #E1E1E1;
        background: #FFF;
    }
`;

export default ProjectInfoPopUp;