import { Container, Row } from "react-bootstrap";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import styled from "styled-components";
import { colors } from "../../common/styles/Theme";

const FeedWaterHomeStyled = styled(Container)`
    background:${colors.GreyF8};
    min-height: 100vh;
`;

export default FeedWaterHomeStyled;
