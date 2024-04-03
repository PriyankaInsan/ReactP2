import React, { useState } from "react";
import { Accordion, Card, Col } from "react-bootstrap";
import Vessel1 from "../../../common/assets/images/DummyThumbnail-ix.svg";
import SystemDiagramStyled from "./SystemDiagramStyled";
const SystemDiagram = () => {
  const[accordionOpen, setAccordionOpen] = useState(false);
  const handleAccordionOpen = ()=>{
    setAccordionOpen(!accordionOpen);
  };
  return (
    <>
      <SystemDiagramStyled lg={12} md={12} sm={12} className="system-diagram-column">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleAccordionOpen} as={Card.Header}>IX System Diagram
              {accordionOpen?<span>Hide</span>:<span>Show</span>}
            </Accordion.Header>
            <Accordion.Body className="image-container">
              <img src={Vessel1} alt="ix-temp-image" title="Dummy IXD image"/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </SystemDiagramStyled>
    </>
  );
};

export default SystemDiagram;