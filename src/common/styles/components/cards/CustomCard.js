import styled from "styled-components";
import { colors } from "../../Theme";
import { Card } from "react-bootstrap";

const StyledCard = styled(Card)`
    background-color:${(props)=>props.backgroundColor || colors.White};
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.20);
    border-radius:${(props)=>props.borderRadius || "4px"};
    border:${(props)=>props.cardBorder || "none"};
    .card-header{
        padding:${(props)=>props.paddingHeader || "0px"};
        background-color:${(props)=>props.backgroundColor || colors.White};
        border-bottom: none;
    }

`;

export default StyledCard;