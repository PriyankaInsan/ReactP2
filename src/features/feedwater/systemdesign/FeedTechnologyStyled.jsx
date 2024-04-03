import styled from "styled-components";
import { Row } from "react-bootstrap";
import { colors, normalCardStyle } from "../../../common/styles/Theme";

const FeedTechnologyStyled = styled(Row)`
    padding: 16px 20px 32px 20px;
    .notification{
        border-radius: 2px;
        border: 1px solid ${colors.LightLightBlue};
        background-color: ${colors.Pale20PaleBlue};
        padding:9px 16px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .wrapper{
            display: flex;
        }
        .notification-details{
            list-style: auto;
            margin-bottom:0;
        }
    }
    .feed-water-process{
        min-height: 65vh;
    }
    .water-technology{
        display: flex;
        flex-wrap:wrap;
        gap:8px;
        .pre-treatment, .bulk-demineralization, .trace-contaminants-removal, .polishing, .split-mix{
            border-left: 3px solid ${colors.PrimaryDarkAquaMarine};
            width: max-content;
            padding:5px 7px 8px 10px;
            .process-name{
                margin-bottom: 6px;
            }
            ${normalCardStyle.defaultCardStyleLeftBorder}
            .tech-btn-group{
                display: flex;
                gap: 7px;
            }
        }
    }
    .react-flow__attribution{
        display:none;
    }
    .reactflow-wrapper{
        // border:2px solid black;
    }
    .canvas{
        border:none;
    }
    
`;
export default FeedTechnologyStyled;