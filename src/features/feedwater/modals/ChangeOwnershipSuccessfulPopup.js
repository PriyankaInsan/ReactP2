import React from "react";
import {Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useEffect } from "react";
import { useState } from "react";
const ChangeOwnershipSuccessfulPopup = ({show, close, parentModal}) => {
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
      <CreatedProjectSuccessStyled show={show&&openModal} onHide={handleClose} centered>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Ownership has been changed successfully!</h6>
            <p>Ramesh Lakhinana has now become the owner of WaveIXD-7/19/2022e.dwpx project.</p>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ChangeOwnershipSuccessfulPopup;