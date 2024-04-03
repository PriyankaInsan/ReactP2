import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import WarningIcon from "../icons/WarningIcon";
import CloseIcon from "../icons/CloseIcon";
import {Overlay} from "./CreateFolderStyled";
const WarningMessageCurrency = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={4} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Are you sure you want to update the default currency settings?</h6>
          </Col>
          <Col sm={1} className="close-icon"> <CloseIcon/> </Col>
          <Col sm={12} className="error-msg-btn">
            <Button className="no-btn">No</Button> 
            <Button className="yes-btn">Yes</Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
      <Overlay>
        <div className="overlay" />
      </Overlay>
    </>
  );
};

export default WarningMessageCurrency;