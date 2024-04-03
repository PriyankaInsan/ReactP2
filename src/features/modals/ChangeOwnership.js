import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import ChangeOwnershipStyled from "./ChangeOwnershipStyled";
import {Overlay} from "./CreateFolderStyled";
import CloseIcon from "../../common/icons/CloseIcon";
import { useState } from "react";
import ChangeOwnershipSuccessfulPopup from "./ChangeOwnershipSuccessfulPopup";
import ChangeOwnershipWarningPopup from "./ChangeOwnershipWarningPopup";
const ChangeOwnership = ({show, closeModal}) => {
  const[openSucessModal, setOpenSuccessModal] = useState(false);

  const handleOpen = () =>{
    setOpenSuccessModal(true);
  };
  const handleClose = () =>{
    setOpenSuccessModal(false);
  };
  const getRandomColor =() =>{
    const letters="0123456789ABCDEF";
    let color = "#";
    for(let i=0; i<6; i++) {
      color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
  };
  return (
    <>
      <ChangeOwnershipStyled size="lg" centered show={show} onHide={closeModal} dialogClassName="primary-modal" backdropClassName="dark-backdrop" backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
        <Row className="change-owner-header d-flex g-0">
          <Col lg={10} md={10} sm={10} xs={10} className="heading">
            <h3>Change Ownership for WaveIXD-7/19/2022e.dwpx</h3>
            <p>You may select a new owner from the list below. Kindly, go back to add a new collaborator.</p>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="close-icon">
            <Button onClick={closeModal}><CloseIcon/></Button>
          </Col>
        </Row>
        <Row className="change-ownership-row g-0">
          <Col lg={5} md={4} sm={4} xs={4} className="d-flex">
            <span style={{backgroundColor:getRandomColor()}}>S</span>
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
        <Row className="change-owner-footer-row g-0">
          <Col md={{span:6, offset:6}} className="text-right">
            <Button className="back-btn">Back</Button>
            <Button className="change-ownership-btn" onClick={handleOpen}>Change Ownership
              <ChangeOwnershipWarningPopup open={openSucessModal} close={handleClose}/>
            </Button>
          </Col>
        </Row>
      </ChangeOwnershipStyled>
    </>
  );
};

export default ChangeOwnership;