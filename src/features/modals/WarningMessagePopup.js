import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import WarningIcon from "../icons/WarningIcon";
import CloseIcon from "../icons/CloseIcon";
import {Overlay} from "./CreateFolderStyled";
const WarningMessagePopup = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={6} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Would you like to save the project?</h6>
            <p>Please save project for exporting.</p>
          </Col>
          <Col sm={1} className="close-icon"> <CloseIcon/> </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn">Cancel</Button> 
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

export default WarningMessagePopup;