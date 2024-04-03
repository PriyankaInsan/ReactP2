/* eslint-disable max-len */
import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import ShareProjectPageOneStyled from "./ShareProjectPageOneStyled";
import PlusIcon from "../../../common/icons/PlusIcon";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import { useState } from "react";
import ChangeOwnership from "./ChangeOwnership";
import ShareProjectSuccessModal from "./ShareProjectSuccessModal";
import LeaveProjectWarningMessageOwner from "./LeaveProjectWarningMessageOwner";
import { useEffect } from "react";
const ShareProjectPageOne = ({show, close}) => {
  const[openOwnerShipModal, setOpenOwnerShipModal] = useState(false);
  const [openShareProjectSuccess, setOpenShareProjectSuccess] = useState(false);
  const [leaveProjectWarning, setLeaveProjectWarning] = useState(false);
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
  const handleOpenDefaultValueSaved = () => {
    setDefaultValueSaved(true);
  };
  const handleOpenOwnershipModal = () => {
    setOpenOwnerShipModal(true);
  };
 
  
  const handleOpenShareProjectSuccessModal =()=>{
    setOpenShareProjectSuccess(true);
  };
  const handleCloseShareProjectSuccessModal =()=>{
    setOpenShareProjectSuccess(false);
  };

  const handleOpenLeaveProjectWarning =()=>{
    setLeaveProjectWarning(true);
  };

  return (
    <>
      <ShareProjectPageOneStyled size="lg" centered show={show &&openModal} onHide={handleClose} dialogClassName="primary-modal" backdropClassName="dark-backdrop" backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter">
        <Row className="share-project-header d-flex g-0">
          <Col lg={10} md={10} sm={10} xs={10} className="heading">
            <h3>Share WaveIXD-7/19/2022e.dwpx</h3>
            <p>You may add multiple email ids and give access to this project to edit and start collaborating. </p>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="close-icon">
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
        <Row className="email-details">
          <Col lg={12} md={12} sm={12} xs={12}>
            <Form>
              <Form.Label htmlFor="basic-url">Email Address</Form.Label>
              <InputGroup>
                <Form.Control type="email" id="basic-url" aria-describedby="basic-url" placeholder="Email address comma separated"/>
                <InputGroup.Text><CloseIcon/></InputGroup.Text>
              </InputGroup>
              <Form.Text>Reference text will come here</Form.Text>
            </Form>
            <div className="shared-person-name">
              <div className="circle"><span className="random-color">A</span></div> <a>Anish Nair</a>
              <CloseIcon/>
            </div>
          </Col>
        </Row>
        <div className="shared-details-header">
          <h6>Project Shared with</h6>
          <Button onClick={handleOpenOwnershipModal}>Change Ownership 
            <ChangeOwnership show={openOwnerShipModal} close={setOpenOwnerShipModal}/>
            <ArrowRightIcon/> </Button>
        </div>
        <Row className="shared-details-row g-0">
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <div className="circle"><span className="random-color">A</span></div><p className="users-name">Anish Nair</p>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <span className="owner-details">Owner</span>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="delete-icon"></Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <div className="circle"><span className="random-color">S</span></div> <p className="users-name">Swapnil</p>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <span className="owner-details">Shared by Swati</span>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="delete-icon">
            <DeleteIcon/>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <div className="circle"><span className="random-color">K</span></div> <p className="users-name">Kamna Marwah</p>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <span className="owner-details">Shared by Swapnil</span>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="delete-icon">
            <DeleteIcon/>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <div className="circle"><span className="random-color">A</span></div> <p className="users-name">Kamna Marwah</p>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <span className="owner-details">Shared by Swapnil</span>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="delete-icon">
            <DeleteIcon/>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <div className="circle"><span className="random-color">A</span></div> <p className="users-name">Kamna Marwah</p>
          </Col>
          <Col lg={5} md={5} sm={5} xs={5} className="d-flex shared-project-column">
            <span className="owner-details">Shared by Swapnil</span>
          </Col>
          <Col lg={2} md={2} sm={2} xs={2} className="delete-icon">
            <DeleteIcon/>
          </Col>
        </Row>
        <Row className="share-project-footer g-0">
          <Col md={{span:6, offset:6}} className="text-right">
            <Button className="leave-project-btn" id="leaveProject" onClick={handleOpenLeaveProjectWarning}>Leave Project
              <LeaveProjectWarningMessageOwner show={leaveProjectWarning} close={setLeaveProjectWarning}/>
            </Button>
            <Button className="share-project-btn" id="shareProject" onClick={handleOpenShareProjectSuccessModal}>Share Project
              <ShareProjectSuccessModal show={openShareProjectSuccess} close={handleCloseShareProjectSuccessModal}/>
            </Button>
          </Col>
        </Row>
      </ShareProjectPageOneStyled>
    </>
  );
};

export default ShareProjectPageOne;