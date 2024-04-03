import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import ChangeOwnershipSuccessfulPopup from "./ChangeOwnershipSuccessfulPopup";
import { useEffect } from "react";
const ChangeOwnershipWarningPopup = ({show, close, parentModal}) => {
  const[showSuccessMessage, setShowSuccessMessage] = useState(false);
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
  const handleOpenSuccessMessage =()=>{
    setShowSuccessMessage(true);
  };

  return (
    <>
      <CreatedProjectSuccessStyled show={show && openModal} onHide={handleClose}  keyboard="false" centered>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Are you sure you want to change the ownership for this project?</h6>
            <p>Note that you can’t undo this action.</p>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn" onClick={handleClose}>Cancel</Button> 
            <Button className="yes-btn" onClick={handleOpenSuccessMessage}>Yes, Change Ownership
              <ChangeOwnershipSuccessfulPopup show={showSuccessMessage} close={setShowSuccessMessage} parentModal={parentModal}/>
            </Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ChangeOwnershipWarningPopup;