import React from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import DefaultValueSaved from "./DefaultValueSaved";
import { useState } from "react";
import { useEffect } from "react";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";

const DefaultCurrencyMessage = ({ show, close, yes }) => {
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
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
  
  const handleOpenDefaultValueSaved = () => {
    // setDefaultValueSaved(true);
    yes();
  };

  return (
    <>
      <StyledModal
        show={show && openModal}
        // onHide={handleClose}
        keyboard="false"
        centered
        isWarningPopUp={true}
        maxWidth="416px"
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
              label="Are you sure you want to update the default currency settings?"
            />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <StandardSecondaryButton className="cancel-btn" id="noBtn" label="No" onClick={handleClose}/>
            <StandardPrimaryButton
              className="yes-btn"
              id="yesBtn"
              onClick={handleOpenDefaultValueSaved}
              label="Yes"
            />
              {/* <DefaultValueSaved
                show={defaultValueSaved}
                close={setDefaultValueSaved}
                // parentModal={setOpenModal}
              /> */}
          </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default DefaultCurrencyMessage;
