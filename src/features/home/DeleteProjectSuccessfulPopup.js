import React, { useEffect, useState } from "react";
import {Button, Col, Modal, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "../modals/CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../common/icons/CheckCircleIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import StyledModal from "../../common/styles/components/modals/CustomModal";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors } from "../../common/styles/Theme";
const DeleteProjectSuccessfulPopup = ({show,close,childParentModal}) => {
  const[openModal, setOpenModal] =useState(true);

  const handleClose = ()=>{
    setOpenModal(false);
    childParentModal(false);
  };
  useEffect(()=>{
    if(show===true){
      setOpenModal(true);
      close(false);
    }
  },[openModal]);
  
  return (
    <>
      <StyledModal show={show&&openModal} onHide={handleClose} keyboard="false" centered backdrop="static" isSuccessPopUp={true} maxWidth="416px">
        <Modal.Body>
          <div className="success-pop-up">
            <div>
              <CheckCircleIcon/>
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumSemiBold"
                fontSize="16px"
                fontWeight="600"
                color={colors.Black}
                label="Project deleted successfully !"/>
            </div>
          </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

export default DeleteProjectSuccessfulPopup;