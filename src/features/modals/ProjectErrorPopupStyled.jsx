import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors, modalStyles } from "../../common/styles/Theme";

const ProjectErrorPopupStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-content{
        max-width: 416px;
        ${modalStyles.normalModalStyle};
        .modal-body{
            display: flex;
            gap: 16px;
        }
        .modal-footer{
            padding:0px 16px 10px 16px;
            border:none !important;
        }
    }
`;
export default ProjectErrorPopupStyled;