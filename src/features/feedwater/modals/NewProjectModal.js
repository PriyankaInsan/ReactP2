import React from "react";
import { Button, Col, Row} from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import { TabList, TabPanel, Tab, Tabs} from "react-tabs";
import ProjectInformationModalStyled from "./ProjectInformatioModalStyled";
import ProjectInfoPopUp from "./ProjectInfoPopUp";
import CurrencyAndUnitPopUp from "./CurrencyAndUnitPopUp";
import DesignerAndCustomerDetails from "./DesignerAndCustomerDetails";
import ProjectSettings from "./ProjectSettings";
import CreateProjectRightArrowIcon from "../../../common/icons/CreateProjectRightArrowIcon";
import { useState } from "react";
import { useEffect } from "react";
const NewProjectModal = ({show, close}) => {
  const[openModal, setOpenModal]= useState(true);
  const handleCloseModal =() => {
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
      <ProjectInformationModalStyled centered show={show&&openModal} onHide={handleCloseModal} backdrop="static" keyboard="false">
        <Row className="header-create-project bg-light d-flex">
          <Col lg={10} md={10} sm={10} className='heading'>
            <h3>Project Information</h3>
            <p>
            You can check and update your project information below.
            </p>
          </Col>
          <Col lg={2} md={2} sm={2}  className="close-icon">
            <Button onClick={handleCloseModal}><CloseIcon/></Button>
          </Col>
        </Row>
        <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
          <TabList className="project-information-tab d-flex">
            <Tab className="project-details">
              <span className="circle">1</span>Project Details<CreateProjectRightArrowIcon/>
            </Tab>
            <Tab className="customer-details">
              <span className="circle">2</span>Designer & Customer Details<CreateProjectRightArrowIcon/>
            </Tab>
            <Tab className="project-settings">
              <span className="circle">3</span>Project Settings
            </Tab>
          </TabList>
          <TabPanel>
            <ProjectInfoPopUp/>
          </TabPanel>
          <TabPanel>
            <DesignerAndCustomerDetails/>
          </TabPanel>
          <TabPanel>
            <ProjectSettings parentModal={setOpenModal}/>
          </TabPanel>
        </Tabs>
      </ProjectInformationModalStyled>
    </>
  );
};

export default NewProjectModal;