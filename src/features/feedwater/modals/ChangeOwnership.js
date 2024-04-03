/* eslint-disable max-len */
import React from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import ChangeOwnershipStyled from "./ChangeOwnershipStyled";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import ChangeOwnershipSuccessfulPopup from "./ChangeOwnershipSuccessfulPopup";
import ChangeOwnershipWarningPopup from "./ChangeOwnershipWarningPopup";
import { useEffect } from "react";
const ChangeOwnership = ({show, close}) => {
  const[openWarningModal, setOpenWarningModal] = useState(false);
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
  const handleOpen = () =>{
    setOpenWarningModal(true);  };
  return (
    <>
      <ChangeOwnershipStyled centered show={show&&openModal} onHide={handleClose} dialogClassName="primary-modal" backdropClassName="dark-backdrop" backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
        <Row className="change-owner-header d-flex g-0">
          <Col lg={10} md={10} sm={10} xs={10} className="heading">
            <h3> Ownership for WaveIXD-7/19/2022e.dwpx</h3>
            <p>You may select a new owner from the list below. Kindly, go back to add a new collaborator.</p>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="close-icon">
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
        <Row className="change-ownership-row g-0">
          <Col lg={5} md={4} sm={4} xs={4} className="d-flex">
            <span>S</span>
            <p className="owner-name">Swati Kanojia</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="ownership-tag">
            <p>Owner</p>
          </Col>
        </Row>
        <div className="owner-list-header"><h5>Select a New Owner</h5></div>
        <Row className="new-owner-list-row g-0">
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <div className='checkbox-group'>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" name="radiosort" label="Ramesh" value="CreatedDateFirst"/>
              </Form.Group>
            </div>
          </Col>
          <Col lg={5} md={4} sm={4} xs={4} className="owner-list-column">
            <p>shared by you</p>
          </Col>
        </Row>
        <Row className="description-details g-0">
          <Col lg={12} className="paragraph-column">
            <p>If you can’t find the desired name, please click on the back button to add a new collaborator.</p>
          </Col>
        </Row>
        <Modal.Footer className="change-owner-footer-row">
          <Button className="back-btn" onClick={handleClose}>Back</Button>
          <Button className="change-ownership-btn" onClick={handleOpen}>Change Ownership
            <ChangeOwnershipWarningPopup show={openWarningModal} close={setOpenWarningModal} parentModal={setOpenModal}/>
          </Button>
        </Modal.Footer>
      </ChangeOwnershipStyled>
    </>
  );
};

export default ChangeOwnership;