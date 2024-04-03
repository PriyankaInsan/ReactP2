/* eslint-disable max-len */
import React, { useEffect } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import RequiredFieldIcon from "../../../common/icons/RequiredFieldIcon";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import ProjectInfoPopUpStyled from "./ProjectInfoPopUpStyled";
import ProjectInformationSaveMessage from "./ProjectInformationSaveMessage";
import DefaultTechMessage from "./DefaultTechMessage";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import Loader from "../../../common/utils/Loader";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import StyledSelect from "../../../common/styles/components/selects/CustomSelect";
import CustomTextArea from "../../../common/styles/components/inputs/CustomTextArea";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import ArrowRightBlackIcon from "../../../common/icons/ArrowRightBlackIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import MandatoryFieldIcon from "../../../common/icons/MandatoryFieldIcon";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import TechButtons from "../../../common/styles/components/buttons/techButtons/TechButtons";
import NormalTechButtons from "../../../common/styles/components/buttons/techButtons/NormalTechButtons";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useSelector } from "react-redux";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import DefaultValueSaved from "./DefaultValueSaved";
import CustomeMessagePopup from "../../../common/utils/CustomeMessagePopup";
const ProjectInfoPopUp = ({
  postdata,
  change,
  handleSave,
  appInfoVM,
  changeNext,
  techList,
  nameError,
}) => {
  const [activeCell, setActiveCell] = useState([]);
  const techNolist = useSelector(
    (state) => state.processDiagramSlice.techNolist
  );
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const [openSaveMessage, setOpenSaveMessage] = useState(false);
  const [defaultTech, setDefaultTech] = useState(false);
  const [getMarketSegment, responseMarketSegment] = useLazyGetAllDataQuery();
  const [marketSegment, setmarketSegment] = useState();
  const [selectedMarketSegment, setSelectedMarketSegment] = useState(
    postdata.marketSegmentID
  );
  const [getTechnologyData, responseTechnology] = useLazyGetAllDataQuery();
  const [getSubTechnology, responseSubTechnology] = useLazyGetAllDataQuery();
  const [SubTechnology, setSubTechnology] = useState();
  const [SelectedSubTechnology, setSelectedSubTechnology] = useState();
  const [Dtechnology, setDtechnology] = useState([]);
  const [defaulttechnology, setdefaulttechnology] = useState();
  const [isFocused, setIsFocused] = useState(null);
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
  const [popupOperator, setPopupOperator] = useState({
    type: "",
    message: "",
    show: false,
  });

  //Api Calling
  useEffect(() => {
    try {
      getMarketSegment(`${"masterdata/api/v1/MarketSegment"}?userID=${userID}`);
      getTechnologyData(
        `${"masterdata/api/v1/DefaultTechnology"}?userID=${userID}`
      );
      getSubTechnology(`${"masterdata/api/v1/SubTechnology"}?userID=${userID}`);
    } catch {
      console.log("Error Create Project");
    }
  }, []);

  // Cheaking Props Update
  useEffect(() => {}, [postdata]);

  //cheacking responseTechnology
  useEffect(() => {

      if (responseTechnology.isSuccess && techList.length > 0) {
        let temResponse;
        temResponse = responseTechnology?.data.map((rt) => {
          techList.includes(rt.technologyID)
            ? (rt = { ...rt, isDefault: true })
            : (rt = { ...rt, isDefault: false });
          return rt;
        });
        setdefaulttechnology(temResponse);
      }
    
    if (responseTechnology.isError) {
      throw new MyError(
        "CaseType Api Error",
        responseTechnology.error.status,
        "ApiError"
      );
    }
  }, [responseTechnology, techList]);

  //cheacking responseMarketSegment
  useEffect(() => {

      if (responseMarketSegment.isSuccess === true) {
        setmarketSegment(responseMarketSegment.data);
      }
    
    if (responseMarketSegment.isError) {
      throw new MyError(
        "MarketSegment Api Error",
        responseMarketSegment.error.status,
        "ApiError"
      );
    }
  }, [responseMarketSegment]);

  //cheacking responseSubTechnology
  useEffect(() => {

      if (responseSubTechnology.isSuccess === true) {
        setSubTechnology(responseSubTechnology.data);
      }
    
    if (responseSubTechnology.isError) {
      throw new MyError(
        "SubTechnology Api Error",
        responseSubTechnology.error.status,
        "ApiError"
      );
    }
  }, [responseSubTechnology]);

  //cheacking defaulttechnology
  useEffect(() => {
    tchnologyChecUpdate();
    const dtfilter = defaulttechnology?.filter((dt) => dt.isDefault === true);
    const dtmap = dtfilter?.map((dt) => {
      dt = { technologyID: dt.technologyID };
      return dt;
    });
    change("lstTechnologyListVMs", dtmap);
    setDtechnology(dtmap);
  }, [defaulttechnology]);

  useEffect(() => {

      if (responseMarketSegment.isSuccess === true) {
        setmarketSegment(responseMarketSegment.data);
      }
    
    if (responseMarketSegment.isError) {
      throw new MyError(
        "MarketSegment Api Error",
        responseMarketSegment.error.status,
        "ApiError"
      );
    }
  }, [responseMarketSegment]);

  const toggleCellSelection = (cellIndex) => {
    if (activeCell.includes(cellIndex)) {
      setActiveCell(activeCell.filter((index) => index !== cellIndex));
    } else {
      setActiveCell([...activeCell, cellIndex]);
    }
  };

  // useEffect(() => {
  //   tchnologyChecUpdate();
  //   const dtfilter = defaulttechnology?.filter((dt) => dt.isDefault === true);
  //   const dtmap = dtfilter?.map((dt) => {
  //     dt = { technologyID: dt.technologyID };
  //     return dt;
  //   });
  //   change("lstTechnologyListVMs", dtmap);
  //   setDtechnology(dtmap);
  // }, [defaulttechnology]);

  //Selecting check Box Tecknology
  const tchnologyCheckChange = (e, techId) => {
    // Destructuring
   
    const { value, checked } = e.target;
    let flag = value=="IX"?"IXD":value;
    if (techNolist.includes(flag) && !checked) {
      setPopupOperator({
        type: "error",
        message: `${flag} is currently used in process map you can not deselect the technology.`,
        show: true,
      });
    } else {
      let tempTechnology;
      tempTechnology = defaulttechnology.map((dt) => {
        dt.technologyID === techId ? (dt = { ...dt, isDefault: checked }) : dt;
        return dt;
      });
      setdefaulttechnology(tempTechnology);
      setError(false);
    }

  };

  const tchnologyChecUpdate = () => {
    let unitDataTemp = SubTechnology;
    unitDataTemp = SubTechnology?.map((st) => {
      st = { ...st, isSelected: false };
      return st;
    });
    let unitDataTempNew = unitDataTemp;
    let selectedItem = defaulttechnology?.filter((x) => x.isDefault === true);

    unitDataTempNew = unitDataTemp?.map((st) => {
      selectedItem.forEach((dt) => {
        if (st.technologyID === dt.technologyID) {
          st = { ...st, isSelected: true };
        }
      });
      return st;
    });
    setSelectedSubTechnology(unitDataTempNew);
  };
  const handleSaveDefault = () => {
    setDefaultValueSaved(true);
  };

  const isCellSelected = (cellIndex) => activeCell.includes(cellIndex);
  const [error, setError] = useState(false);

  const [validated, setValidated] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  const handleSubmit = (e) => {
    // const form = e.currentTarget;
    // if(form.checkValidity() === false){
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // setValidated(true);
  };

  const handleChange = (e) => {
    change(e.target.name, e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedMarketSegment(parseInt(e.target.value));
    change(e.target.name, e.target.value);
  };

  const handleOpenSaveMessage = () => {
    setOpenSaveMessage(true);
    handleSave();
  };
  const handleCloseSaveMessage = () => {
    setOpenSaveMessage(false);
  };

  const handleOpenDefaultTech = () => {
    setDefaultTech(true);
  };
  const handleCloseDefaultTech = () => {
    setDefaultTech(false);
  };

  // checking focus or not
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e) => {
    setIsFocused(null);
    if(e.target.name=="projectName"){
      change("projectName", e.target.value.trim());
    }
    if(e.target.name=="caseName"){
      change("caseName", e.target.value.trim());
    }
  };
  const handleCLoseOperator = () => {
    setPopupOperator({
      show: false,
      message: "",
      type: "",
    });
  };

  return (
    <>
      <ProjectInfoPopUpStyled
        noValidate
        validated={validated}
        action="action"
        className=""
        onSubmit={handleSubmit}
      >
        <CustomeMessagePopup
          operator={popupOperator}
          close={handleCLoseOperator}
        />
        <div className="first-section">
          {/* <CustomHeading
            className="info-label"
            label={`This is an imported project created using: WAVE Version ${appInfoVM.appVersion},
          Database ${appInfoVM.dbVersion} and Calc Engine ${appInfoVM.calcEngineVersion}`}
            color={colors.Black}
            fontFamily="DiodrumRegular"
            fontSize="12px"
            fontWeight="400"
          />  */}
          {/* this it will show noly import poroject case */}
          <Row className="project-details-information">
            <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
              <CustomLabel label="Project No." />
              <InputWithIcon
                type="text"
                value={postdata.projectNumber}
                id="projectNumber"
                controlId="projectNumber"
                onChange={handleChange}
                disabled={true}
                isError={false}
                onBlur={(e)=>handleBlur(e)}
                onFocus={() => handleFocus(1)}
                isFocused={isFocused === 1}
                inputText={<CloseCircleGreenIcon />}
                unitBgColor="transparent"
              />
            </Col>
            <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
              <CustomLabel label="Date Created" />
              <InputWithIcon
                type="text"
                value={postdata.createdDate}
                id="createdDate"
                controlId="createdDate"
                placeholder="13/05/2023"
                onChange={handleChange}
                disabled={true}
                isError={false}
                onBlur={(e)=>handleBlur(e)}
                onFocus={() => handleFocus(2)}
                isFocused={isFocused === 2}
                inputText={<CloseCircleGreenIcon />}
                unitBgColor="transparent"
              />
            </Col>
            <Col className="project-column" lg={6} md={6} sm={6} xs={6}>
              <div className="label-input-box">
                <CustomLabel label="Project Name" mandatoryIcon={true} />
                <InputWithIcon
                  type="text"
                  value={postdata.projectName}
                  onChange={handleChange}
                  name="projectName"
                  unitBgColor="transparent"
                  placeholder="Enter Project Name"
                  minLength="3"
                  maxLength="200"
                  required
                  onBlur={(e)=>handleBlur(e)}
                  onFocus={() => handleFocus(3)}
                  isFocused={isFocused === 3}
                  inputText={
                    postdata.projectName == "" ? (
                      <CloseCircleRedIcon />
                    ) : (
                      <CloseCircleGreenIcon />
                    )
                  }
                  disabled={false}
                  isError={postdata.projectName == "" ? true : nameError.projectName}
                />
                <ErrorMessage
                  errorIcon={true}
                  style={{
                    visibility:
                      postdata.projectName == "" ? "visible" : nameError.projectName?"visible" :"hidden",
                  }}
                  texMsg={ postdata.projectName == "" ? "This field cannot be empty" : nameError.projectName?"Project Name Already Exists" :""}
                />
    
              </div>
            </Col>
            <Col className="project-column-one" lg={3} md={2} sm={2} xs={2}>
              <div className="label-input-box">
                <CustomLabel label="Project Market Segment" />
                <StyledSelect
                  className="market-segment-selector"
                  name="marketSegmentID"
                  value={selectedMarketSegment}
                  onChange={handleSelectChange}
                  isError={postdata.marketSegmentID < 1 ? true : false}
                >
                  {marketSegment?.map((data, i) => (
                    <option key={i} value={data.segmentID}>
                      {data.segmentName}
                    </option>
                  ))}
                  ;
                </StyledSelect>
                <ErrorMessage
                  errorIcon={true}
                  style={{
                    visibility:
                      postdata.marketSegmentID < 1 ? "visible" : "hidden",
                  }}
                  texMsg="This field cannot be empty"
                />
              </div>
            </Col>
            <Col className="project-column-one" lg={3} md={3} sm={5} xs={5}>
              <CustomLabel label="Last Modified" />
              <InputWithIcon
                type="text"
                id="updatedDate"
                controlId="updatedDate"
                placeholder=""
                value={postdata.updatedDate}
                disabled={true}
                isError={false}
              />
            </Col>
            <Col className="project-column" lg={6} md={6} sm={6} xs={6}>
              <div className="label-input-box">
                <CustomLabel label="First Case Name" mandatoryIcon={true} />
                <InputWithIcon
                  type="text"
                  value={postdata.caseName}
                  onChange={handleChange}
                  name="caseName"
                  unitBgColor="transparent"
                  placeholder="Case 1"
                  defaultValue="Case 1"
                  minLength="0"
                  maxLength="50"
                  required
                  onBlur={(e)=>handleBlur(e)}
                  onFocus={() => handleFocus(4)}
                  isFocused={isFocused === 4}
                  inputText={
                    postdata.caseName == "" ? (
                      <CloseCircleRedIcon />
                    ) : (
                      <CloseCircleGreenIcon />
                    )
                  }
                  disabled={false}
                  isError={postdata.caseName == "" ? true : nameError.caseName}
                />
                <ErrorMessage
                  errorIcon={true}
                  style={{
                    visibility: postdata.caseName == "" ? "visible" : nameError.caseName?"visible":"hidden",
                  }}
                  texMsg={postdata.caseName == "" ? "This field cannot be empty" : nameError.caseName?"Case Name Already Exists":""}
                />
              </div>
            </Col>
            <Col className="project-column-one" lg={12} md={12} sm={12} xs={12}>
              <div className="label-input-box text_area_div">
                <CustomLabel label="Project Notes" />
                <CustomTextArea
                  className="project_notes"
                  rows="2"
                  cols={"54"}
                  placeholder="Project Related Notes will come here"
                  id="comment"
                  name="projectNotes"
                  value={postdata.projectNotes}
                  onChange={handleChange}
                ></CustomTextArea>
              </div>
            </Col>
          </Row>
          <div className="technology-preference">
            <div className="technology-preference-column">
              <CustomLabel
                label="Change Technology Preferences"
                mandatoryIcon={true}
              />
            </div>
            <div className="default-technology-preference-column">
              <StandardLinkButtonWithIcon
                plusIcon={false}
                padding="10px 24px 10px 24px"
                id="defaultBtn"
                label="Make as New Default"
                disabled={false}
                onClick={handleOpenDefaultTech}
              />

              <DefaultTechMessage
                show={defaultTech}
                close={handleCloseDefaultTech}
                yes={handleSaveDefault}
              />
              <DefaultValueSaved
                show={defaultValueSaved}
                close={setDefaultValueSaved}
                parentModal={setDefaultValueSaved}
              />
            </div>
          </div>
          <div className="check-box-row">
            <div className="checkbox-wrapper">
              {defaulttechnology?.map((SortData, index) => (
                <>
                  <CustomRadioCheck
                    disabled={false}
                    isError={
                      defaulttechnology?.filter((x) => x.isDefault === true)
                        .length > 0
                        ? false
                        : true
                    }
                    type="checkbox"
                    name="lstTechnologyListVMs"
                    placeholder="{tchnologyPlaceholder}"
                    value={SortData.technologyName}
                    checked={SortData.isDefault}
                    id={`defaultCheck${index}`}
                    onChange={(e) =>
                      tchnologyCheckChange(e, SortData.technologyID)
                    }
                    label={SortData.technologyName}
                    className="technology-checkbox"
                  />
                </>
              ))}
            </div>
            {defaulttechnology?.filter((x) => x.isDefault === true).length >
            0 ? (
              ""
            ) : (
              <ErrorMessage
                errorIcon={true}
                texMsg="Please Select at least one technology"
              />
            )}
          </div>
          <Row className="technology-used-row g-0">
            <Col lg={3} md={3} sm={3} xs={3} className="pre-treatment process">
              <CustomHeading
                label="Pre-treatment"
                color={colors.blackTransparency085}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <div className="technology-btn">
                {SelectedSubTechnology
                  ? SelectedSubTechnology?.filter((tech) =>
                      tech.technologyCategory.includes("Pre-treatment")
                    ).map((data) => (
                      <TechButtons
                        small={true}
                        // className={
                        //   data.isSelected ? "selected-btn" : "default-btn"
                        // }
                        disabled={data.isSelected ? false : true}
                        value={data.subTechnologyName}
                        onClick={(e) => toggleCellSelection(e)}
                        label={data.subTechnologyName}
                      ></TechButtons>
                    ))
                  : ""}
              </div>
            </Col>
            <Col
              lg={4}
              md={3}
              sm={3}
              xs={3}
              className="bulk-demineralization process"
            >
              <CustomHeading
                label="Bulk Demineralization"
                color={colors.blackTransparency085}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <div className="technology-btn">
                {SelectedSubTechnology
                  ? SelectedSubTechnology?.filter((tech) =>
                      tech.technologyCategory.includes("Bulk Demineralization")
                    ).map((data) => (
                      <TechButtons
                        // className={
                        //   data.isSelected ? "selected-btn" : "default-btn"
                        // }
                        disabled={data.isSelected ? false : true}
                        small={true}
                        value={data.subTechnologyName}
                        onClick={(e) => toggleCellSelection(e)}
                        label={data.subTechnologyName}
                      ></TechButtons>
                    ))
                  : ""}
              </div>
            </Col>
            {/* <Col lg={3} md={3} sm={3} xs={3} className="polishing process">
              <CustomHeading
                label="Polishing"
                color={colors.blackTransparency085}
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
              />
              <div className="technology-btn">
                {SubTechnology?.filter((tech) =>
                  tech.technologyCategory.includes("Polishing")
                ).map((data) => (
                  <TechButtons small={true}
                    // className="tech-buttons"
                    label={data.subTechnologyName}
                    value={data.subTechnologyName}
                    onClick={(e) => toggleCellSelection(e)}
                  />
                ))}
              </div>
            </Col> */}
          </Row>
        </div>
        <div className="create-page-footer">
          <StandardSecondaryButton
            label="Next"
            type="submit"
            id="nextBtn"
            onClick={() => changeNext(1)}
          />
          <StandardPrimaryButton
            label="Save"
            type="submit"
            id="saveBtn"
            disabled={nameError.caseName||nameError.projectName}
            onClick={handleOpenSaveMessage}
          >
            <ProjectInformationSaveMessage
              show={openSaveMessage}
              close={handleCloseSaveMessage}
            />
          </StandardPrimaryButton>
        </div>
      </ProjectInfoPopUpStyled>
    </>
  );
};

export default ProjectInfoPopUp;
