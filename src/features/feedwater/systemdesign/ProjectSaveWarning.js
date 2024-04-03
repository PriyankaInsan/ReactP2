import React from "react";
import ProjectSaveWarningStyled from "./ProjectSaveWarningStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import StyledModal, { StyledModalFooter } from "../../../common/styles/components/modals/CustomModal";

const ProjectSaveWarning = ({ show, close, yes }) => {
  const [openModal, setOpenModal] = useState(true);

  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      yes();
    }
  };



  return (
    <>
      <StyledModal
        show={show && openModal}
        onHide={handleClose}
        keyboard="false"
        centered maxWidth="416px"
        isWarningPopUp={true}
      >
        <Modal.Body isWarningPopUp={true}>
          <div className="warning-pop-up">
          <div>
            <WarningIcon />
          </div>
          <div>
            <CustomHeading
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.Black}
              label="You have unsaved data, do you want to save the project?"
            />
          </div>
          </div>
        </Modal.Body>
        <StyledModalFooter isWarningPopUp={true}>
          <StandardSecondaryButton className="" id="" onClick={handleClose} label="No"/>
          <StandardPrimaryButton
            className=""
            id=""
            onClick={yes}
            label="Yes"/>
        </StyledModalFooter>
      </StyledModal>
    </>
  );
};

export default ProjectSaveWarning;
