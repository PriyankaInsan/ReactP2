/* eslint-disable max-len */
import React, { useEffect } from "react";
import { Button, Card, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import SaveToWaterLibraryStyled from "./SaveToWaterLibraryStyled";
import { useState } from "react";

const SaveToWaterLibrary = ({show, close}) => {
  const[openModal, setOpenModal] =useState(true);

  const handleClose = ()=>{
    setOpenModal(false);
  };
  useEffect(()=>{
    if(show===true){
      setOpenModal(true);
      close(false);
    }
  },[openModal]);

  return (
    <>
      <SaveToWaterLibraryStyled size="lg" centered show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title>Save To Water Library</Modal.Title>
          <Button id="btnClose" onClick={handleClose}><CloseIcon/></Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label><span>*</span>Name</Form.Label>
            <InputGroup className="large-input-group">
              <Form.Control type="text" defaultValue="Feed Setup- Stream 1"/>
              <InputGroup.Text><CloseIcon/></InputGroup.Text>
            </InputGroup>
          </Form>
          <Form className="water-type-form">
            <div className="wrapper">
              <Form.Label>Water Type</Form.Label>
              <select className="form-select">
                <option value="" selected>River Water</option>
                <option value="" selected>River Water</option>
                <option value="" selected>River Water</option>
              </select>
            </div>
            <div className="wrapper">
              <Form.Label>Turbidity</Form.Label>
              <InputGroup>
                <Form.Control type="text" defaultValue="0.00"/>
                <InputGroup.Text>NTU</InputGroup.Text>
              </InputGroup>
            </div>
            <div className="wrapper">
              <Form.Label>TSS</Form.Label>
              <InputGroup>
                <Form.Control type="text" defaultValue="0.00"/>
                <InputGroup.Text>mg/L</InputGroup.Text>
              </InputGroup>
              <Form.Text>Total Suspended Solids</Form.Text>
            </div>
            <div className="wrapper">
              <Form.Label>Organics (TOC)</Form.Label>
              <InputGroup>
                <Form.Control type="text" defaultValue="0.00"/>
                <InputGroup.Text className="input-group-text-icon"><CloseIcon/></InputGroup.Text>
              </InputGroup>
            </div>
            <div className="wrapper">
              <Form.Label>SDI₁₅</Form.Label>
              <InputGroup>
                <Form.Control type="text" defaultValue="0.00"/>
                <InputGroup.Text>mg/L</InputGroup.Text>
              </InputGroup>
            </div>
          </Form>
          <Form className="ph-form">
            <div className="wrapper">
              <Form.Label>pH</Form.Label>
              <InputGroup>
                <Form.Control type="text" defaultValue="0.00"/>
                <InputGroup.Text><CloseIcon/></InputGroup.Text>
              </InputGroup>
            </div>
            <Card className="temperature-card">
              <Form>
                <h4>Temperature</h4>
                <div className="wrapper">
                  <Form.Label>Minimum</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" defaultValue="0.00"/>
                    <InputGroup.Text>&deg;C</InputGroup.Text>
                  </InputGroup>
                </div>
                <div className="wrapper">
                  <Form.Label>Design</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" defaultValue="0.00"/>
                    <InputGroup.Text>&deg;C</InputGroup.Text>
                  </InputGroup>
                </div>
                <div className="wrapper">
                  <Form.Label>Maximum</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" defaultValue="0.00"/>
                    <InputGroup.Text>&deg;C</InputGroup.Text>
                  </InputGroup>
                </div>
              </Form>
            </Card>
          </Form>
          <Row className="cations-anions-neutral-row">
            <Col lg={4} md={12} sm={12} className="cations-column">
              <Form as={Card} className="cations-card">
                <div className="cations-heading">
                  <h4><span className="important-icon">*</span>Cations</h4>
                </div>
                <div className="cations-title-header">
                  <div className="cations-title">
                    <h4>Symbol</h4>
                  </div>
                  <div className="cations-title">
                    <h4>mg/L</h4>
                  </div>
                </div>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>NH₄</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>K</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>Na</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>NH₄</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>K</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="cations-data">
                  <div className="cations-form-label">
                    <Form.Label>Na</Form.Label>
                  </div>
                  <div className="cations-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <div className="cations-title-footer">
                  <div className="cations-title">
                    <h4>Total:</h4>
                  </div>
                  <div className="cations-title">
                    <h4>0.00</h4>
                  </div>
                </div>
              </Form>
            </Col>
            <Col lg={4} md={12} sm={12} className="anions-column">
              <Form as={Card} className="anions-card">
                <div className="anions-heading">
                  <h4><span className="important-icon">*</span>Anions</h4>
                </div>
                <div className="anions-title-header">
                  <div className="anions-title">
                    <h4>Symbol</h4>
                  </div>
                  <div className="anions-title">
                    <h4>mg/L</h4>
                  </div>
                </div>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>NH₄</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>K</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>Na</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>NH₄</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>K</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="anions-data">
                  <div className="anions-form-label">
                    <Form.Label>Na</Form.Label>
                  </div>
                  <div className="anions-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <div className="anions-title-footer">
                  <div className="anions-title">
                    <h4>Total:</h4>
                  </div>
                  <div className="anions-title">
                    <h4>0.00</h4>
                  </div>
                </div>
              </Form>
            </Col>
            <Col lg={4} md={12} sm={12} className="neutrals-column">
              <Form as={Card} className="neutrals-card">
                <div className="neutrals-heading">
                  <h4><span className="important-icon">*</span>Neutrals</h4>
                </div>
                <div className="neutrals-title-header">
                  <div className="neutrals-title">
                    <h4>Symbol</h4>
                  </div>
                  <div className="neutrals-title">
                    <h4>mg/L</h4>
                  </div>
                </div>
                <Form.Group className="neutrals-data">
                  <div className="neutrals-form-label">
                    <Form.Label>NH₄</Form.Label>
                  </div>
                  <div className="neutrals-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="neutrals-data">
                  <div className="neutrals-form-label">
                    <Form.Label>K</Form.Label>
                  </div>
                  <div className="neutrals-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="neutrals-data">
                  <div className="neutrals-form-label">
                    <Form.Label>Na</Form.Label>
                  </div>
                  <div className="neutrals-form-data">
                    <InputGroup>
                      <Form.Control placeholder="10,000.00" />
                      <InputGroup.Text id="basic-addon2"><CloseIcon/></InputGroup.Text>
                    </InputGroup>
                  </div>
                </Form.Group>
                <div className="neutrals-title-footer">
                  <div className="neutrals-title">
                    <h4>Total:</h4>
                  </div>
                  <div className="neutrals-title">
                    <h4>0.00</h4>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button id="btnSave">Save</Button>
        </Modal.Footer>
      </SaveToWaterLibraryStyled> 
    </>
  );
};

export default SaveToWaterLibrary;