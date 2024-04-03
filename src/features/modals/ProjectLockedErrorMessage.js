import React from "react";
import {Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CloseCircleIcon from "../icons/CloseCircleIcon";
import CloseIcon from "../icons/CloseIcon";
import {Overlay} from "./CreateFolderStyled";
const ProjectLockedErrorMessage = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={4} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <CloseCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Please wait while User XYZ is already  working on this project.</h6>
          </Col>
          <Col sm={11} className="error-msg-btn">
            <Button className="ok-btn">Ok</Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default ProjectLockedErrorMessage;