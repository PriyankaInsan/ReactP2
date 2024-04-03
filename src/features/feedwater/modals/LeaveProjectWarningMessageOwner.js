import React, { useEffect, useState } from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Row } from "react-bootstrap";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import ChangeOwnership from "./ChangeOwnership";

const LeaveProjectWarningMessageOwner = ({show, close}) => {
  const[openOwnerShipModal, setOpenOwnerShipModal] = useState(false);
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
  const handleOpenOwnerShipModal =()=>{
    setOpenOwnerShipModal(true);
  };
  
  return (
    <>
      <CreatedProjectSuccessStyled show={show && openModal} onHide={handleClose}  keyboard="false" centered backdrop="static">
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Are you sure you want to leave this project?</h6>
            <p>As a owner you can’t leave the project without transferring ownership.</p>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn" id="noBtn" onClick={handleClose}>No</Button> 
            <Button className="yes-btn" onClick={handleOpenOwnerShipModal}>Yes, Change Ownership
              <ChangeOwnership show={openOwnerShipModal} close={setOpenOwnerShipModal}/>
            </Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default LeaveProjectWarningMessageOwner;