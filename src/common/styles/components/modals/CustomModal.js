import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { colors } from "../../Theme";

const StyledModal = styled(Modal)`
    background-color: ${colors.blackTransparency045};
    .modal-dialog{
        max-width: ${(props)=>props.maxWidth || "572px"};    
    }
    .modal-content {
        border: none;
        border-radius: 2px;
        background-color:${(props)=>props.modalBgColor || colors.White};
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
        .modal-header{
            padding:${(props)=>props.padding || "17px 24px 15px 24px"};
            background-color:${(props)=>props.backgroundColor || colors.White};
            border-bottom: none;
            .close-icon{
                cursor: pointer;
            }
        }
        .modal-body{
            padding:${(props)=>props.isWarningPopUp?"32px 32px 24px 32px":"24px"};
            .warning-pop-up, .success-pop-up{
                display: flex;
                gap: 16px;
                align-items: baseline;
            }
        }
        .modal-footer{
            border-top:${(props)=>props.isWarningPopUp || props.isSuccessPopUp?"0px solid":`0.5px solid ${colors.GreyE1}`} !important;
            background-color: ${colors.White};
            padding:${({isWarningPopUp})=>isWarningPopUp?"0px 32px 24px 32px":"16px 24px"} !important;
        }
    }
`;
export default StyledModal;

export const StyledModalFooter = styled(Modal.Footer)`
    border-top:${(props)=>props.isWarningPopUp || props.isSuccessPopUp?"0px solid":`0.5px solid ${colors.GreyE1}`} !important;
    background-color: ${colors.White};
    padding:${(props)=>props.isWarningPopUp?"0px 32px 24px 32px":"0px 30px"} !important;
`;