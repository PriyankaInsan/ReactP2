import styled from "styled-components";
import "../../common/styles/notoSansFont.css";
import "../../common/styles/diodrumFont.css";
import { colors, fontStyles } from "../../common/styles/Theme";
const DismissStyled = styled.div`
    a{
        position: absolute;
        margin-top: -30px;
        z-index: 2;
        right: 18px;
        padding: 5px 0px;
        text-decoration: none;
        ${fontStyles.notoSans14}
        letter-spacing: 0.005em;
        color:${colors.White};
    }
    svg{
        margin-left: 2px;
        width:20px;
        margin-top:-2px;
    }
`;

export default DismissStyled;