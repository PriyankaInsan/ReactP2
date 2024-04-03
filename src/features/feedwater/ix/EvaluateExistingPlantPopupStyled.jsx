import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors, modalStyles } from "../../../common/styles/Theme";

const EvaluateExistingPlantPopupStyled = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: 402px;
    }
    .modal-content{
        ${modalStyles.normalModalStyle}
        .modal-header{
            display: flex;
            justify-content: end;
        }
        .modal-body{
            display: flex;
            gap: 16px;
        }
    }
`;
export default EvaluateExistingPlantPopupStyled;