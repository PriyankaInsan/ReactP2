import React from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import { Button, Col, Row } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import { useEffect } from "react";

const ProjectInformationSaveMessage = ({show, close}) => {
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
  return (
    <>
      <CreatedProjectSuccessStyled show={show&&openModal} onHide={handleClose} centered>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Your project information successfully saved!</h6>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ProjectInformationSaveMessage;