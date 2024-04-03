import React, { useState, useEffect } from "react";
import {Button, Col, Modal, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "../../features/modals/CreatedProjectSuccessStyled";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import CloseIcon from "../icons/CloseIcon";
import WarningIcon from "../icons/WarningIcon";
import CloseCircleRedIcon from "../icons/CloseCircleRedIcon";
import StyledModal from "../styles/components/modals/CustomModal";
import CustomHeading from "../styles/components/headings/CustomHeading";
import { colors } from "../styles/Theme";

const AlertPopUp = (props) => {
  const[openModal, setOpenModal] =useState(true);
  
  useEffect(()=>{
    if(openModal){
      const timer = setTimeout(()=>{
        handleClose();
      },3000);

      return () => clearTimeout(timer);
    }
  }, [openModal]);

  const handleClose = ()=>{
    setOpenModal(false);
    props.close(false);
  };
  const alertType =props.type;
 console.log("props?>>>>>", alertType);
  return (
    <>
      <StyledModal show={openModal} onHide={handleClose} backdropClassName="light-backdrop" backdrop="static"
      className={`wavepro__alert alert-type__${props?.type}`} centered isWarningPopUp={true} maxWidth="416px">
        <Modal.Body isWarningPopUp={alertType=="warning"?true:false} isSuccessPopUp={console.log("isSuccessMessage", alertType=="success"?true:false)}>
        <div className="success-pop-up">
          <div>
            {alertType=="success"?             
            <CheckCircleIcon/>:alertType=="warning"?<WarningIcon />:<CloseCircleRedIcon></CloseCircleRedIcon>
            }
          </div>
          <div>
            <CustomHeading
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.Black}
              label={props?.message }
            />
          </div>
        </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

 

export default AlertPopUp;