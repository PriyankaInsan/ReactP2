import React from "react";
import {Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../common/icons/CheckCircleIcon";
import CloseIcon from "../../common/icons/CloseIcon";
const ChangeOwnershipSuccessfulPopup = ({show, onClose}) => {
  return (
    <>
      <CreatedProjectSuccessStyled show={show} onHide={onClose} centered>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Ownership has been changed successfully!</h6>
            <p>Ramesh Lakhinana has now become the owner of WaveIXD-7/19/2022e.dwpx project.</p>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={onClose}><CloseIcon/></Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ChangeOwnershipSuccessfulPopup;