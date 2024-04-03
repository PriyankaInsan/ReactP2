import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap";
import CloseCircleIcon from "../icons/CloseCircleIcon";
import CustomHeading from "../styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../styles/components/buttons/standard/StandardPrimaryButton";
const ErrorPopup = ({ show, close, message }) => {
  return (
    <>
      <StyledModal
        show={show}
        onHide={close}
        centered
        backdrop="static"
        keyboard={false}
        maxWidth="416px"
        isWarningPopUp={true}
      >
        <Modal.Body isWarningPopUp={true}>
          <div className="success-pop-up">
            <div>
              <CloseCircleIcon />
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                label={message}
              />
            </div>
          </div>
        </Modal.Body>
        <StyledModalFooter isWarningPopUp={true}>
          <StandardPrimaryButton
            label="Ok"
            className="ok-btn"
            onClick={close}
          />
        </StyledModalFooter>
      </StyledModal>
    </>
  );
};

export default ErrorPopup;

import styled from "styled-components";
import { colors, modalStyles } from "../styles/Theme";
import StyledModal, { StyledModalFooter } from "../styles/components/modals/CustomModal";

const ErrorPopupStyled = styled(Modal)`
  background-color: ${colors.blackTransparency045};
  .modal-content {
    max-width: 416px;
    ${modalStyles.normalModalStyle};
    .modal-body {
      display: flex;
      gap: 16px;
    }
    .modal-footer {
      padding: 0px 16px 10px 16px;
      border: none !important;
    }
  }
`;
