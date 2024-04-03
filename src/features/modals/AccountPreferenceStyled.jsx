import styled from "styled-components";
import { Col, Modal } from "react-bootstrap";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { checkBoxStyles, colors, fontStyles, modalStyles, selectStyles, standardButtonStyles, techButtonStyles, techSmallButtonStyles } from "../../common/styles/Theme";

const AccountPreferenceStyled = styled(Modal)`
    background-color: rgba(0, 0 ,0, 0.45);
    .modal-dialog{
        min-width: 900px;
    }
    .modal-content{
        ${modalStyles.normalModalStyle};
    }
    .account_preference_header{
        padding: 22px 32px 22px 32px;
        background-blend-mode: soft-light;
        background-color:${colors.SecondaryElfGreen};
        border-radius:0%;
        display: flex;
        .account_preference_wrapper{
            width: 80%;
            display: flex;
            flex-direction: column;
            gap: 22px;
            .account_preference_user_profile{
                display: flex;
                gap: 26px;
                align-items: center;
                .user_profile_img{
                    width: 56px;
                    height: 56px;
                    background-color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    >input{
                        display: none;
                    }
                    .camera_icon{
                        position: absolute;
                        left: 80%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        top: 60%;
                        width: 19px;
                        height: 19px;
                        flex-shrink: 0;
                        border-radius: 100px;
                        border: 2px solid var(--White, #FFF);
                        background: var(--Primary-Aquamarine-007672, #007672);
                        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
                    }
                }
                .user_name_email{
                    .user_name{
                        display: flex;
                        gap:8px;
                    }
                }
            }
            
        }
        .account_preference_close_icon{
            background-image: url("Wave-PRO-UF-Logo-account-pref.svg");
            background-position: right center;
            background-repeat: no-repeat;
            background-size: contain;
            width:20%;
            display: flex;
            justify-content: end;
            svg{
                cursor:pointer;
            }
        }
        
        .user-picture-column{
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                width:56px;
                height:56px;
                border-radius:50%;
                background-color:${colors.White};
                color:${colors.SecondaryElfGreen};
                text-align: center;
                ${fontStyles.diodrum18SemiBold};
            }
            .camera-icon{
                position: absolute;
                top: 23%;
                margin-left: 40px;
                width: 25px;
                height: 25px;
                background-color:${colors.PrimaryDarkAquaMarine};
                border: 2px solid ${colors.White};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }
        .user-details-column{
            margin-left: 20px;
            padding-top: 10px;
            h6{
                color:${colors.White};
                ${fontStyles.diodrum16SemiBold}
                margin-bottom: 0;
            }
            p{
                color:${colors.White};
                text-align: left;
                ${fontStyles.diodrum14}
                margin-bottom: 0;
            }
        }
        .close-icon-column{
            
        }
    }
    .account_preference_body_section{
        display: flex;
        .account_preference_body_section_a{
            padding:25px;
            width: 30%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-right: 0.5px solid #E1E1E1;
            padding-right: 23px;
        }
        .account_preference_body_section_b{
            visibility: hidden;
            padding: 25px;
            width: 70%;
            padding-left: 23px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            .account_preference_technology{
                .account_preference_technology_checkbox{
                    display: flex;
                    gap: 24px;
                }
            }
            .account_preference_technology_selection{
                display: flex;
                flex-direction: column;
                gap: 16px;
                .account_preference_technology_button_wrapper{
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    .account_preference_technology_button{
                        flex-basis: 45%;
                        .account_preference_technology_button_group{
                            display: flex;
                            gap:6px;
                        }
                    }
                }
            }
        }
    }
    
    .account-preference-footer-row{
        border-top: 0.5px solid ${colors.GreyE1};
        background-color:${colors.White};
        .submit-btn{
            text-align: right;
            padding: 18px 30px;
            .save-btn{
                ${standardButtonStyles.normalPrimaryButton};
                ${fontStyles.diodrum14};
            }
        }
    }
    
`;

export default AccountPreferenceStyled;