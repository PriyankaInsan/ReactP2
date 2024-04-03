import styled from "styled-components";
import eyeImage from "../../../common/assets/images/EyeOpen.svg";
import closeEye from "../../../common/assets/images/EyeInvisible.svg";
import { accordionStyles, colors, fontStyles, inputGroupStyles, normalCardStyle, radioStyles, selectStyles } from "../../../common/styles/Theme";
import { Row } from "react-bootstrap";

const VesselRegenerationSystemStyled =styled(Row)`
    padding: 14px;
    .card-container{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
        .resin-arrangement-column, .regeneration-system-column, .degasification-column {
            .card-header{
                display: flex;
                justify-content: space-between;
                padding: 16px;
                background-color: transparent;
                border-radius: 0%;
                border:none;
                .card-title{
                    margin-bottom: 0;
                }
                .switch-info{
                    display: flex;
                    gap: 14px;
                }
            }
            .card-body{
                padding: 0px 16px 16px 16px;
                display: flex;
                flex-direction: column;
                gap: 14px;
                .or-option{
                    margin-bottom: 0;
                    text-align: center;
                    margin-top: 10px;
                }
                .effluent{
                    .vertical-line{
                        width: 76%;
                        height: 2px;
                        background-color: ${colors.GreyE1};
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .co-removal, .co-pressure, .co-concentration{
                        display: grid;
                        grid-template-columns: 54% 46%;
                        margin-bottom:10px;
                    }
                }
                .location, .effluent{
                    .location-heading, .effluent-heading{
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        margin-bottom: 11px;
                        .vertical-line{
                            width: 76%;
                            height: 2px;
                            background-color:${colors.GreyE1};
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                    .location-radio-group{
                        display: flex;
                        flex-direction: column;
                        gap: 14px;
                    }
                }
            }
        }
    }
`;
export default VesselRegenerationSystemStyled;