import React from "react";
import {Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
const ShareProjectSuccessModal = ({show, close}) => {
  return (
    <>
      <CreatedProjectSuccessStyled className="fade" show={show} onHide={close} centered aria-hidden="true">
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
    </>
  );
};

export default ShareProjectSuccessModal;