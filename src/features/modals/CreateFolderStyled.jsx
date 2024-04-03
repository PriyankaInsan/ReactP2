import styled from "styled-components";
import { colors, fontStyles, modalStyles, standardButtonStyles } from "../../common/styles/Theme";

const CreateFolderStyled = styled.div`
    position: absolute;
    padding: 16px 24px;
    ${modalStyles.normalModalStyle};
    top: 35%;
    left:30%;
    width: 572px;
    height: auto;
    z-index: 10000;
   
    h1{
        ${fontStyles.diodrum16SemiBold};
        display: flex;
        align-items: center;
        color:${colors.PrimaryDarkAquaMarine};
        margin-bottom: 28px;
    }
    .form-label{
        ${fontStyles.notoSans16}
        color:${colors.Black};
    }
    .close-icon{
        margin-top:-1%;
        cursor: pointer;
        svg{
            path{
                fill: black;
            }
        }
    }
    .input-group{
    }
    .btn-create-folder{
        text-align: right;
        button{
            margin-top: 14px;
            margin-left: 10px;
        }
        #cancelBtn{
            ${fontStyles.diodrum16}
            ${standardButtonStyles.normalSecondaryButton};
        }
        #submitBtn{
            ${fontStyles.diodrum16};
            ${standardButtonStyles.normalPrimaryButton};
        }
    }
`;
export const Overlay = styled.div`
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color:${colors.blackTransparency085};
        z-index: 9999;
    }
`;

export default CreateFolderStyled;