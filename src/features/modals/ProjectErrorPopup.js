import React from "react";
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CloseCircleIcon from "../../common/icons/CloseCircleIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import { Overlay } from "./CreateFolderStyled";
import ProjectErrorPopupStyled from "./ProjectErrorPopupStyled";
import WarningIcon from "../../common/icons/WarningIcon";
import FeedSetup from "../feedwater/feedsetup/FeedSetup";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StyledModal from "../../common/styles/components/modals/CustomModal";
const ProjectErrorPopup = ({ show, close, message }) => {
  return (
    <>
      <StyledModal
        show={show}
        onHide={close}
        centered
        backdrop="static"
        keyboard={false}
        isWarningPopUp={true}
        maxWidth="416px"
      >
        <Modal.Body>
          <div className="warning-pop-up">
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

export default ProjectErrorPopup;
