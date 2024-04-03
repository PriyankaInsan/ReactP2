import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import {Overlay} from "./CreateFolderStyled";
const DefaultValueUpdated = () => {
  return (
    <>
      <CreatedProjectSuccessStyled lg={4} md={6} sm={4} xs={4}>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={9} xs={10}>
            <h6>Default values updated successfully!</h6>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default DefaultValueUpdated;