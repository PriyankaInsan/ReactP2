import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../common/icons/CheckCircleIcon";
import CloseIcon from "../../common/icons/CloseIcon";
const CreatedProjectSuccessfullModal = ({show, close}) => {
  return (
    <>
      <CreatedProjectSuccessStyled show={show} onHide={close}>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Project has been Created successfully!</h6>
          </Col>
          <Col sm={1} className="close-icon"> <CloseIcon/> </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default CreatedProjectSuccessfullModal;