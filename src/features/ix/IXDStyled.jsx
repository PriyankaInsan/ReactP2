import styled from "styled-components";
import { colors, fontStyles } from "../../common/styles/Theme";

const IXDStyled = styled.div`
    .ix-container{
        background-color: ${colors.White};
    }
    .ixd-steps-column{
        height: 100vh;
        border-right: 0.5px solid ${colors.GreyE1};
        width: 24%;
    }
    .ixd-steps-details-column{
        width: 76%;
    }
    .react-tabs__tab-list{
        display: flex;
        flex-direction: column;
        border-bottom: none;
        .react-tabs__tab--selected{
            border-right: 3px solid ${colors.PrimaryDarkAquaMarine};
            background-color: ${colors.Pale20PaleTeal};
            border-radius: 0%;
            border-bottom: none;
            border-top:none;
            border-left: none;
        }
        .react-tabs__tab{
            padding: 9px 10px 9px 32px;
            h4{
                ${fontStyles.notoSans16};
                color: ${colors.Black};
                margin-bottom: 0;
            }
        }
    }
`;
export default IXDStyled;