import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import { TabList, TabPanel, Tab, Tabs } from "react-tabs";
import ProjectInfoPopUp from "./ProjectInfoPopUp";
import ProjectInformationModalStyled from "./ProjectInformatioModalStyled";
import DesignerAndCustomerDetails from "./DesignerAndCustomerDetails";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import Loader from "../../../common/utils/Loader";
import { color } from "d3-color";
import { colors } from "../../../common/styles/Theme";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectInformationSaveMessage from "./ProjectInformationSaveMessage";
import { setUpdateCategory } from "../systemdesign/processDiagramSlice";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const ProjectInformationModal = ({ show, close }) => {
  const [openModal, setOpenModal] = useState(true);
  const [getAllData, response] = useLazyGetAllDataQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDataChange, setIsDataChange] = useState(false);
  const [updateData, responseUpdate] = useUpdateDataMutation();
  const [updateProcessMapData, responseUpdateProcessMapData] =
    useUpdateDataMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { projectID } = useSelector((state) => state.projectInfo.data);
  const caseList = useSelector(
    (state) => state.projectInfo.projectConfig.caseConfig.caseNameList
  );
  const {
    addedTechnology,
    isDataUpdated,
    feedWaterData,
    needToRetriveData,
    nodes,
    edges,
    techNolist,
    feedFlowRate,
    productFlowRate,
    selectedEndNode,
    lstTechnologyLists,
  } = useSelector((state) => state.processDiagramSlice);
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const projectList = useSelector((state) => state.cardlist.data);
  const [nameError, setNameError] = useState({
    caseName: false,
    projectName: false,
  });
  const { UserId } = useSelector((state) => state.userInfo.data);
  const [techList, setTechList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [previousData, setPreviousData] = useState();
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveData, setSaveData] = useState(false);

  // Default Data
  const [postdata, setpostdata] = useState();

  const [appInfoVM, setAppInfoVM] = useState({
    appVersion: "1.81.814",
    calcEngineVersion: "01.11.19.00",
    dbVersion: "23",
  });

  //call to get data Api
  useEffect(() => {
    if (show) {
      try {
        getAllData(
          `masterdata/api/v1/ProjectInfo?userID=${UserId}&projectID=${projectID}`
        );
        setSaveData(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [show]);

  //check the get Api responses
  useEffect(() => {
    if (response.isLoading) {
      setIsLoading(false);
    } else if (response.isSuccess) {
      setIsLoading(true);
      const date = new Date(response.data.projectInfoVM.createdDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDateString = `${day}/${month}/${year}`;
      var formattedDateString2 = null;
      if (response.data.projectInfoVM.updatedDate !== null) {
        const date2 = new Date(response.data.projectInfoVM.updatedDate);
        const year2 = date2.getFullYear();
        const month2 = String(date2.getMonth() + 1).padStart(2, "0");
        const day2 = String(date2.getDate()).padStart(2, "0");
        formattedDateString2 = `${day2}/${month2}/${year2}`;
      }
      setpostdata({
        ...response.data.projectInfoVM,
        ...response.data.projectInfoCaseVM,
        lstTechnologyListVMs: [...response.data.mdProjectDefTechVM],
        ["createdDate"]: formattedDateString,
        ["updatedDate"]: formattedDateString2,
        ["countryID"]: response.data.projectInfoVM.countryID,
        ["stateID"]: response.data.projectInfoVM.stateID,
      });
      setPreviousData({
        ...response.data.projectInfoVM,
        ...response.data.projectInfoCaseVM,
        lstTechnologyListVMs: [...response.data.mdProjectDefTechVM],
        ["createdDate"]: formattedDateString,
        ["updatedDate"]: formattedDateString2,
        ["countryID"]: response.data.projectInfoVM.countryID,
        ["stateID"]: response.data.projectInfoVM.stateID,
      });
      setNameError({
        caseName: false,
        projectName: false,
      });
      let tempTechList = [];
      response.data.mdProjectDefTechVM.map((tech) => {
        tempTechList.push(tech.technologyID);
      });
      setTechList(tempTechList);

      setAppInfoVM(response.data.appInfoVM);
    }
    if (response.isError) {
      throw new MyError(
        "ProjectInfo Api Error",
        response.error.status,
        "ApiError"
      );
    }
  }, [response]);

  //change post data handel
  const handleChange = (tag, value) => {
    setpostdata({ ...postdata, [tag]: value });
    if (tag == "projectName") {
      setNameError({ ...nameError, projectName: false });
    }
    if (tag == "caseName") {
      setNameError({ ...nameError, caseName: false });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSaveClose = () => {
    setOpenModal(false);
    navigate("/FeedWaterHome", {
      state: { ...postdata, title: postdata.projectName },
    });
    navigate(0);
  };
  //open and close the modal
  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);

  //handle save data and calling put Api
  const handleSave = () => {
    let matchWithPreviousCaseName =
      postdata.caseName.toLowerCase().trim() ==
      previousData.caseName.toLowerCase().trim();
    let includeInCaseList = caseList.find(
      (item) =>
        item.toLowerCase().trim() == postdata.caseName.toLowerCase().trim()
    );
    let duplicateCase = matchWithPreviousCaseName
      ? false
      : includeInCaseList
      ? true
      : false;
    let matchWithPreviousProjectName =
      postdata.projectName.toLowerCase().trim() ==
      previousData.projectName.toLowerCase().trim();
    let includeInProjectList = projectList.find(
      (item) =>
        item.projectName.toLowerCase().trim() ==
        postdata.projectName.toLowerCase().trim()
    );
    let duplicateProject = matchWithPreviousProjectName
      ? false
      : includeInProjectList
      ? true
      : false;

    if (duplicateProject || duplicateCase) {
      setCurrentIndex(0);
    }
    setNameError({
      caseName: duplicateCase,
      projectName: duplicateProject,
    });
    if (
      !duplicateProject &&
      !duplicateCase &&
      postdata.projectName !== "" &&
      postdata.caseName !== "" &&
      postdata.lstTechnologyListVMs.length > 0
    ) {
      updateDataFunction();
      setSaveData(true);

      // setOpenModal(false);
    }
  };

  //cheking response from update api
  useEffect(() => {
    if (responseUpdate.isSuccess) {
      setShowPopup(true);
      dispatch(setUpdateCategory(true));
      // handleSaveClose();
    }
    if (responseUpdate.isError) {
      throw new MyError(
        "responseUpdate Api Error",
        responseUpdate.error.status,
        "ApiError"
      );
    }
  }, [responseUpdate]);

  const handleClosePopup = () => {
    setOpenModal(false);
    navigate("/FeedWaterHome", {
      state: { ...postdata, title: postdata.projectName },
    });
    // navigate(0);
    // setOpenModal(false);
    setShowPopup(false);
  };

  //check if data changed
  useEffect(() => {
    if (JSON.stringify(response.data) !== JSON.stringify(postdata)) {
      setIsDataChange(true);
    } else {
      setIsDataChange(false);
    }
  }, [postdata]);

  const changeNext = () => {
    setCurrentIndex(1);
  };

  const handleChangeTab = () => {
    setCurrentIndex(1);
  };

  const updateDataFunction = async () => {
    const response = await updateProcessMapData({
      Method: "masterdata/api/v1/SystemDesign",
      feedFlow: selectedEndNode != "startNode",
      flowValue:
        selectedEndNode == "startNode"
          ? Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                feedFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            )
          : Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                productFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ),
      caseID: feedWaterData.caseID,
      projectID: feedWaterData.projectID,
      waterTypeID: feedWaterData.waterTypeID,
      userID: userID,
      processMap: { nodes: nodes, edges: edges },
      lstTechnologyLists,
    });

    if (response.data.responseCode == 200) {
      updateData({
        ...postdata,
        Method: "masterdata/api/v1/ProjectInfo",
        userID: userID,
      });
    }
  };
  return (
    <>
      <ProjectInformationModalStyled
        centered
        show={show && openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Row className="header-create-project bg-light d-flex">
          <Col lg={10} md={10} sm={10} className="heading">
            <CustomHeading
              label="Project Information"
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.PrimaryDarkAquaMarine}
            />
            <CustomHeading
              label="You can check and update your project information below."
              fontFamily="DiodrumRegular"
              fontSize="12px"
              fontWeight="400"
              color={colors.blackTransparency045}
            />
          </Col>
          <Col lg={2} md={2} sm={2} className="close-icon">
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Col>
        </Row>
        {isLoading ? (
          <Tabs
            index={currentIndex}
            // onSelect={(index) => {
            //   setCurrentIndex(index);
            //   console.log(index);
            // }}
          >
            <TabList className="project-information-tab d-flex">
              <Tab
                className={`project-details ${
                  currentIndex === 0 && "selected"
                }`}
                onClick={() => setCurrentIndex(0)}
              >
                Project Details
              </Tab>
              <Tab
                className={`customer-details ${
                  currentIndex === 1 && "selected"
                }`}
                onClick={() => setCurrentIndex(1)}
              >
                Designer & Customer Details
              </Tab>
            </TabList>

            {currentIndex === 0 ? (
              <ProjectInfoPopUp
                postdata={postdata}
                change={handleChange}
                handleSave={handleSave}
                appInfoVM={appInfoVM}
                changeNext={setCurrentIndex}
                techList={techList}
                nameError={nameError}
                setNameError={setNameError}
              />
            ) : (
              <DesignerAndCustomerDetails
                postdata={postdata}
                change={handleChange}
                handleSave={handleSave}
                appInfoVM={appInfoVM}
                changeBack={setCurrentIndex}
                nameError={nameError}
                setCurrentIndex={setCurrentIndex}
              />
            )}
          </Tabs>
        ) : (
          <Loader />
        )}
        <ProjectInformationSaveMessage
          show={showPopup}
          close={() => handleClosePopup()}
        />
      </ProjectInformationModalStyled>
    </>
  );
};

export default ProjectInformationModal;
