import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../../common/icons/CheckCircleIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
const CreatedProjectErrorModal = ({errorMessage, show }) => {
  return (
    <>
      <CreatedProjectSuccessStyled show={show} onHide={close}>
        <Row>
          <Col sm={1}>
            {/* <CheckCircleIcon/> */}
            <CloseCircleRedIcon></CloseCircleRedIcon>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Project not created due to the reason : {errorMessage}</h6>
          </Col>
          <Col sm={1} className="close-icon"> <CloseIcon/> </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default CreatedProjectErrorModal;