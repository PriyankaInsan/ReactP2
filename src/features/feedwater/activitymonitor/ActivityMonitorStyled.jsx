import styled from "styled-components";
import { Row } from "react-bootstrap";
import { circleStyles, colors, fontStyles } from "../../../common/styles/Theme";
import "../../../common/styles/diodrumFont.css";
import "../../../common/styles/notoSansFont.css";

const ActivityMonitorStyled = styled(Row)`
    padding: 60px 0px 0px 0px;
    display: flex;
    justify-content:center;
    .react-tabs{
        padding:0;
        .panel{
            margin: 50px 0px 0px 0px;
            background-color:${colors.GreyF8};
            overflow-x: hidden;                 
        }       
    }
    .feed-progress-top-column{
        position: fixed;
        background: ${colors.White};
        box-shadow: 0px 1px 4px 0px ${colors.blackTransparency020};
        display: flex;
        top:${({scrollDirection})=>scrollDirection>100?"-6rem":"7.3rem"};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 550ms;
        flex-wrap: nowrap;
        width: 100%;//1440px
        padding: 5px 6px 5px 20px;
        align-items: flex-start;
        gap: 5px;
        z-index: 3;//

        @media (max-width:768px){
            /* flex-direction: column; */
            padding:5px 0px 5px 5px;
        }
    }          
    .feed-progress-column{
        border-radius: 7px;
        padding: 5px 10px 8px 10px;
        cursor: pointer;
        outline: none !important;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        :hover{
            background-color: ${colors.Pale20PaleTeal};           
        }
        :disabled{
            background-color:green;
        }  
        .activity_monitor{
            display: flex;
            margin-bottom: 4px;
            .activity_monitor_count{
                padding-top: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                border-radius: 32px;
                border: 1px solid ${colors.GreyE1};
                background: ${colors.GreyF8};
                font-family: "DiodrumRegular", "Sans-Serif";
                color: ${colors.Grey96};
                text-align: center;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 18px;
            }
            .activity_monitor_count.selected_circle{
                background-color: #007672;
                color: #FFF;
            }
            .activity_monitor_name{
                margin:0px 0px 0px 6px;
                .activity_monitor_name_heading{
                    display: flex;
                    gap: 20px;
                }
                .activity_monitor_name_progress{
                    visibility: hidden;
                }
            }
            .activity_monitor_progress_bar{
                display: flex;
                padding-top: 8px;
                .dynamic_range{
                    height: 5px;
                    width: 36px;
                    background-color: transparent;
                    /* -webkit-appearance: none; */
                    ::-webkit-slider-thumb{
                        display: none;
                    }
                    :focus {
                        outline: none; 
                    }
                    ::-ms-track {
                        width: 100%;
                        cursor: pointer;
                        background-color: transparent;
                        width: 100%;
                    }
                    ::-webkit-slider-runnable-track{
                        background-color: red;
                        width: 100%;
                    }
                }
            }
        } 
        .activity_monitor_triangle{
            display: flex;
            position:absolute;
            height: 10px;
            bottom:0;
            visibility: hidden;
        }
        .activity_monitor_triangle.selected{
            visibility: visible;
        }      
    } 
    .feed-progress-column.selected_activity_monitor_tab{
        background-color: ${colors.Pale20PaleTeal};
    }
    @media(max-width:1190px){
        .feed-progress-column{
            
        }     
    }  
`;
export default ActivityMonitorStyled;