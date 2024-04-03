import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import WarningIcon from "../../common/icons/WarningIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import { useState } from "react";
import ChangeOwnershipSuccessfulPopup from "./ChangeOwnershipSuccessfulPopup";
const ChangeOwnershipWarningPopup = ({open, close}) => {
  const[show, setShow] = useState(false);
  const handleOpen =()=>{
    setShow(true);
  };
  const handleClose =()=>{
    setShow(false);
  };
  return (
    <>
      <CreatedProjectSuccessStyled show={open} onHide={close}  keyboard="false" centered>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Are you sure you want to change the ownership for this project?</h6>
            <p>Note that you can’t undo this action.</p>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={close}><CloseIcon/></Button>
          </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn">Cancel</Button> 
            <Button className="yes-btn" onClick={handleOpen}>Yes, Change Ownership
              <ChangeOwnershipSuccessfulPopup show={show} onClose={handleClose}/>
            </Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ChangeOwnershipWarningPopup;