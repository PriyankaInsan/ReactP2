import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap";
import CloseCircleIcon from "../icons/CloseCircleIcon";
import CloseCircleGreenIcon from "../icons/CloseCircleGreenIcon";
import CloseCircleWarningIcon from "../icons/CloseCircleWarningIcon";
import CustomHeading from "../styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../styles/components/buttons/standard/StandardPrimaryButton";
const CustomeMessagePopup = ({ operator, close }) => {
  const getType = (type) => {
    switch (type) {
      case "error":
        return <CloseCircleIcon />;
      case "success":
        return <CloseCircleGreenIcon />;
      case "warning":
        return <WarningIcon/>;

      default:
        break;
    }
  };
  return (
    <>
      <StyledModal
        show={operator.show}
        onHide={close}
        centered
        backdrop="static"
        keyboard={false}
        isWarningPopUp={true}
        maxWidth="416px"
      >
        <Modal.Body>
          <div className="warning-pop-up">
            <div>{getType(operator.type)}</div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                label={operator.message}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <StandardPrimaryButton
            label="Ok"
            className="ok-btn"
            onClick={close}
          />
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default CustomeMessagePopup;

import styled from "styled-components";
import { colors, modalStyles } from "../styles/Theme";
import StyledModal from "../styles/components/modals/CustomModal";
import WarningIcon from "../icons/WarningIcon";

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
