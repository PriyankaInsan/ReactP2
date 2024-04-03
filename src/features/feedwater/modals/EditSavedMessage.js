import React, { useEffect, useState } from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Row } from "react-bootstrap";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
const EditSavedMessage = ({show, close, parentModal}) => {
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
            <h6>Your edits are successfully saved!</h6>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default EditSavedMessage;