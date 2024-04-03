import React, {useState, useEffect} from "react";
import { Button, Col, Row } from "react-bootstrap";
import WarningIcon from "../../../common/icons/WarningIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";

const WarningDeleteStreamMessage = ({show, close}) => {
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
      <CreatedProjectSuccessStyled show={show&&openModal} onHide={handleClose}  keyboard="false" centered>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Are you sure you want to change the default technology preferences selection?</h6>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn" id="noBtn" onClick={handleClose}>No</Button> 
            <Button className="yes-btn" id="yesBtn">Yes</Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default WarningDeleteStreamMessage;