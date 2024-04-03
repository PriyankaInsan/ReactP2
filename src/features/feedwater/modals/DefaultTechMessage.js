import React from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import DefaultValueSaved from "./DefaultValueSaved";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import { useState } from "react";
import { useEffect } from "react";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";

const DefaultTechMessage = ({show, close,yes}) => {
  const[defaultValueSaved, setDefaultValueSaved] =useState(false);
  const[openModal, setOpenModal] =useState(true);

  const handleClose = ()=>{
    setOpenModal(false);
  };
  useEffect(()=>{
    if(show===true){
      setOpenModal(true);
      close(false);
    }
  },[openModal]);
  const handleOpenDefaultValueSaved = () => {
    yes();
    close(false);
  };

  return (
    <>
      <StyledModal show={show&&openModal}  keyboard="false" centered isWarningPopUp={true} maxWidth="416px">
        <Modal.Body>
          <div className="warning-pop-up">
            <div>
              <WarningIcon/>
            </div>
            <div>
            <CustomHeading
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.Black}
              label="Are you sure you want to change the default technology preferences selection?"
            />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer> 
        <StandardSecondaryButton
              variant="light"
              onClick={handleClose}
              id="canBtn"
              label="No"
            />
            <StandardPrimaryButton
              type="submit"
              id=""
              variant="light"
              disabled={false}
              onClick={handleOpenDefaultValueSaved}
              label="Yes"
            />
            
          {/* <Button className="cancel-btn" id="noBtn" onClick={handleClose}>No</Button> 
          <Button className="yes-btn" id="yesBtn" onClick={handleOpenDefaultValueSaved}>Yes
            <DefaultValueSaved show={defaultValueSaved} close={setDefaultValueSaved} parentModal={setOpenModal}/>
          </Button> */}
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default DefaultTechMessage;