import React, { useState, useEffect } from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import DefaultValueSaved from "./DefaultValueSaved";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
const DefaultOperatingCost = ({ show, close, yes }) => {
  const [openModal, setOpenModal] = useState(true);
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);
  const handleOpenDefaultValueSaved = () => {
    close(false);
    yes();
  };
  return (
    <>
      <StyledModal
        show={show && openModal}
        // onHide={handleClose}
        keyboard="false"
        isWarningPopUp={true}
        maxWidth="416px"
        centered
      >
        <Modal.Body>
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
                label="Are you sure you want to update the default preferences for operating costs?"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <StandardSecondaryButton
            className="cancel-btn"
            id="noBtn"
            onClick={handleClose}
            label="No"
          />
          <StandardPrimaryButton
            className="yes-btn"
            id="yesBtn"
            onClick={handleOpenDefaultValueSaved}
            label="Yes"
          />
          {/* <DefaultValueSaved show={defaultValueSaved} close={setDefaultValueSaved} parentModal={setOpenModal}/> */}
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default DefaultOperatingCost;
