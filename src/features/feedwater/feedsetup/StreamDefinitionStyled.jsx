import styled from "styled-components";
import { Row } from "react-bootstrap";
import { colors, fontStyles, inputGroupStyles, radioStyles } from "../../../common/styles/Theme";

const StreamDefinitionStyled = styled.div`
    /* margin-top:${({scrollDirection})=>scrollDirection>100?"2%":"8.5%"}; */
    padding: 24px 20px 0px 20px;
    .stream-heading{
        display:inline-flex;
        gap:5px;
        margin-bottom: 10px;
        .stream-definition-title{
            margin-right: 12px;
        }
    }
    .stream-definition-heading{
        color:${colors.PrimaryDarkAquaMarine};
        ${fontStyles.notoSans14SemiBold};
        svg{
            margin-left: 12px;
        }
    }
    .stream-definition-column{
        padding:0;
    }
    .stream-group{
        grid-auto-flow: column;
        /* grid-auto-columns: 12%; */
        .radio-group.radio-group-active{
            border-bottom: 2px solid ${colors.PrimaryDarkAquaMarine};
            background-color:${colors.GreyF0};
            box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
            :after{
                content: ' ';
                border: 10px solid transparent;
                border-bottom: 0;
                border-top-color:${colors.PrimaryDarkAquaMarine};
                position: absolute;
                left:50%;
                bottom: 0;
                top: 100%;
                transform: translateX(-50%);
            }
        }
        .radio-group{
            display: flex;
            flex-direction: column;
            gap: 10px;
            .percentage-wrapper{
                display: flex;
                align-items: center;
                .radio-group-active{
                    border-bottom: 2px solid ${colors.PrimaryDarkAquaMarine};
                    background-color:${colors.GreyF0};
                    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
                }
                .blended-composite{
                    background-color:${colors.PrimaryDarkAquaMarine};
                }
            }
        }
    }
    @media (min-width: 768px) {
        .stream-group{
            display: flex;
            flex-wrap: wrap;
            .radio-group{
                padding:10px;
                margin-right: 8px;
                width:145px;
                position: relative;
                .percentage-wrapper{
                    .input-group{
                        width:55%;
                    }
                    .delete-icon{
                        margin-left: 3px;
                        height:32px;
                        width:32px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
                .form-check-input[type=radio]{
                    ${radioStyles.defaultRadio}
                    :hover{
                        ${radioStyles.hoverRadio};
                    }
                }
                .form-check-input[type=radio]:checked {
                    ${radioStyles.activeRadio}
                }
            }
            /* .radio-group.radio-group-active{
                border-bottom: 2px solid ${colors.PrimaryDarkAquaMarine};
                background-color: ${colors.GreyF0};
                box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
                
                :after{
                    content: '';
                    position: absolute;
                    left: 40%;
                    top: 100%;
                    width: 0;
                    height: 0;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-top: 15px solid ${colors.PrimaryDarkAquaMarine};
                    clear: both;
                }
            } */
            .blended-composite{
                width:220px;
                .form-check{
                    display: inline-block;
                }
                .info-icon{
                    margin-left: 5px;
                }
            }
        }
    }
    @media (min-width:670px) and (max-width:1000px) {
        margin-top:${({scrollDirection})=>scrollDirection>100?"7.3rem":"10.1rem"};
        transition: all 0.5s ease-in-out;
        scroll-behavior: smooth;
    }
    @media (min-width:1001px) and (max-width:1280px) {
        margin-top:${({scrollDirection})=>scrollDirection>100?"5rem":"8.4rem"};
        transition: all 0.5s ease-in-out;
        scroll-behavior: smooth;
    }
    @media (min-width:1281px) and (max-width:1349px) {
        margin-top:${({scrollDirection})=>scrollDirection>100?"6rem":"7.7rem"};
        transition: all 0.5s ease-in-out;
        scroll-behavior: smooth;
    }
    @media (min-width: 1350px) {
        margin-top:${({scrollDirection})=>scrollDirection>100?"6rem":"7.4rem"};
        .stream-group{
            display: grid;
            grid-auto-columns: 13%;
            grid-auto-flow: column;
            .radio-group{
                padding:10px;
                margin-right: 8px;
                width:145px;
                .percentage-wrapper{
                    .input-group{
                        ${inputGroupStyles.extraSmallInputBoxWholeStyle}
                        .form-control{
                            ${inputGroupStyles.formControlStyles};
                        }
                        .input-group-text{
                            ${inputGroupStyles.defaultInputGroupTextStyles}
                        }
                    }
                    .delete-icon{
                        margin-left: 3px;
                        height:32px;
                        width:32px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
                .form-check-input[type=radio]{
                    ${radioStyles.defaultRadio}
                }
                .form-check-input[type=radio]:checked {
                    ${radioStyles.activeRadio}
                }
            }
            .blended-composite{
                width:300px;
                .form-check{
                    display: inline-block;
                }
                .info-icon{
                    margin-left: 5px;
                }
            }
        }
    }
    @media (min-width: 1440px) {
        .stream-group{
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: 12%;
            .radio-group{
                display: flex;
                flex-direction: column;
                align-items: baseline;
                padding:10px;
                margin-right: 8px;
                width: auto;
                .form-check-label{
                    color:${colors.Black};
                    ${fontStyles.diodrum14}
                }
                .form-check-input[type=radio]{
                    ${radioStyles.defaultRadio}
                }
                .form-check-input[type=radio]:checked {
                    ${radioStyles.activeRadio}
                }
                .percentage-wrapper{
                    .input-group{
                        ${inputGroupStyles.extraSmallInputBoxWholeStyle}
                        .form-control{
                            ${inputGroupStyles.formControlStyles}
                        }
                        .input-group-text{
                            ${inputGroupStyles.defaultInputGroupTextStyles}
                        }
                    }
                    .delete-icon{
                        margin-left: 3px;
                        height:32px;
                        width:32px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
            }
            
            .blended-composite{
                width:220px;
                .form-check{
                    display: inline-block;
                }
                .info-icon{
                    margin-left: 5px;
                }
            }
        }
    }
    .stream-indicator{
        padding: 0;
        margin-top: 18px;
        display: flex;
        align-items: baseline;
        .edit-stream{
            input{
                margin-left: 3px;
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: 1px solid black;
                ${fontStyles.notoSans14SemiBold}
                color: ${colors.PrimaryDarkAquaMarine};
                background-color: transparent;
                padding:0;
                :focus{
                    outline: none;
                }
            }
        }
        .normal-stream, .edit-stream{
            display: flex;
            margin-left: 10px;
            .icon{
                height: 22px !important;
                margin-top: -4px;
                display: inline-block;
                cursor: pointer;
            }
        }
    }
`;

export default StreamDefinitionStyled;