import React, { useEffect, useState } from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import StyledModal from "../../../common/styles/components/modals/CustomModal";

const SuccessMessageChemicalLibraryAndOperatingCost = ({show,close, parentModal}) => {
  const[openModal, setOpenModal] =useState(true);

  const handleClose = ()=>{
    setOpenModal(false);
    parentModal(false);
  };
  useEffect(()=>{
    if(show===true){
      setOpenModal(true);
      close(false);
    }
  },[openModal]);
  return (
    <>
      <StyledModal show={show&&openModal} onHide={handleClose} centered maxWidth="416px" isWarningPopUp={true}>
        <Modal.Body>
         <div className="success-pop-up">
          <div>
            <CheckCircleIcon/>
          </div>
           <div> <h6>Your edits are successfully saved!</h6></div>
         </div>
          </Modal.Body>
      </StyledModal>
    </>
  );
};

export default SuccessMessageChemicalLibraryAndOperatingCost;