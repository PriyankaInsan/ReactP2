import { Modal } from "bootstrap";
import styled from "styled-components";
import { colors, fontStyles } from "../../common/styles/Theme";

const ExploreStyled = styled(Modal)`
background-color:${colors.blackTransparency085} ;
    .modal-content{
        background:${colors.White};
        box-shadow: 0px 3px 6px -4px ${colors.blackTransparency012}, 0px 6px 16px ${colors.blackTransparency008}, 0px 9px 28px 8px ${colors.blackTransparency005};
        border-radius: 2px;
    }
    h1{
        ${fontStyles.diodrum14SemiBold};
        display: flex;
        align-items: center;
        color:${colors.PrimaryDarkAquaMarine};
        margin-bottom: 28px;
    }
    .close-icon{
        margin-top:-5%;
        cursor: pointer;
    }
    .input-group{
    }
    .btn-create-folder{
        margin-left: 60%;
        button{
            margin-top: 14px;
            margin-left: 10px;
            ${fontStyles.diodrum14}
            text-align: center;
            :nth-of-type(1){
                color:${colors.PrimaryDarkAquaMarine};
            }
            :nth-of-type(2){
                background-color:${colors.PrimaryDarkAquaMarine};
                color: ${colors.White};
            }
        }
    }
`;

export default ExploreStyled;