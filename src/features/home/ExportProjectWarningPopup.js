import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import WarningIcon from "../icons/WarningIcon";
import CloseIcon from "../icons/CloseIcon";
const ExportProjectWarningPopup = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={6} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <WarningIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Please save your file before exporting project.</h6>
          </Col>
          <Col sm={1} className="close-icon"> <CloseIcon/> </Col>
          <Col sm={12} className="error-msg-btn"> 
            <Button className="cancel-btn">Cancel</Button> 
            <Button className="yes-btn">Save & Export</Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ExportProjectWarningPopup;