import React from "react";
import {Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import {Overlay} from "./CreateFolderStyled";
const ShareProjectSuccessModal = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={4} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Project has been shared successfully!</h6>
            <p>WaveIXD-7/19/2022e.dwpx has been successfully shared with Swapnil Bagade.</p>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
      <Overlay>
        <div className="overlay" />
      </Overlay>
    </>
  );
};

export default ShareProjectSuccessModal;