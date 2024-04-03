/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import DesignerAndCustomerDetailsStyled from "./DesignerAndCustomerDetailsStyled";
import RequiredFieldIcon from "../../../common/icons/RequiredFieldIcon";
import Michigan from "../../../common/icons/usa-flag.svg";
import CloseIcon from "../../../common/icons/CloseIcon";
import ProjectInformationSaveMessage from "./ProjectInformationSaveMessage";
import PhoneInput from "react-phone-input-2";
import { codenumbers } from "../../../common/utils/codenumbers";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import "react-phone-input-2/lib/style.css";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";
import MandatoryFieldIcon from "../../../common/icons/MandatoryFieldIcon";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import { MyError } from "../../../common/utils/ErrorCreator";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";

const DesignerAndCustomerDetails = ({
  postdata,
  changeBack,
  change,
  handleSave,
  appInfoVM,
  nameError
}) => {
  const [selectedLabel, setSelectedLabel] = useState("+1");
  const [selectedImage, setSelectedImage] = useState(Michigan);
  const [openSaveMessage, setOpenSaveMessage] = useState(false);
  const [error, setError] = useState();
  const [Country, setCountry] = useState();
  const [getCountry, responseCountry] = useLazyGetAllDataQuery();
  const [getState, responseState] = useLazyGetAllDataQuery();
  const [selectedCountryId, setSelecetedCountryId] = useState(
    postdata.countryID
  );
  const [selectedStateId, setSelecetedStateId] = useState(postdata.stateID);
  const [State, setState] = useState();
  const [isFocused, setIsFocused] = useState(null);
  const [contact1, setContact1] = useState("");
  const customDropdownStyle = {
    maxHeight: "150px",
    overflowY: "auto",
    maxWidth: "220px",
  };

  useEffect(() => {
    try {
      getCountry(`${"masterdata/api/v1/Country"}`);
      getState(`${"masterdata/api/v1/State"}?countryID=${selectedCountryId}`);
    } catch (error) {
      console.log(error);
    }
  }, [selectedCountryId]);

  useEffect(() => {

      if (responseCountry.isSuccess === true) {
   
        setCountry(responseCountry.data);
      }
    
    if (responseCountry.isError) {
      throw new MyError(
        "Country Api Error",
        responseCountry.error.status,
        "ApiError"
      );
    }
  }, [responseCountry]);

  useEffect(() => {

      if (responseState.isSuccess === true) {
        // 👇️ sort by String property ASCENDING (A - Z)
        const strAscending = [...responseState.data].sort((a, b) =>
          a.stateName > b.stateName ? 1 : -1
        );
        setState(strAscending);
      }
    
    if (responseState.isError) {
      throw new MyError(
        "State Api Error",
        responseState.error.status,
        "ApiError"
      );
    }
  }, [responseState]);

  const handleChange = (path, label) => {
    setSelectedLabel(label);
    setSelectedImage(path);
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };
  const handleOpenSaveMessage = () => {
    setOpenSaveMessage(true);
    handleSave();
  };
  const handleCloseSaveMessage = () => {
    setOpenSaveMessage(false);
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    change(name, value);
  };
  const handleCountyChange = (e) => {
    // const selectedId=e.target.value;
    //const selectedMarketSegment=marketSegment.find((ms)=>ms.segmentName===selectedId).segmentID;
    setSelecetedCountryId(parseInt(e.target.value));
    change(e.target.name, e.target.value);
    setError(false);
  };
  const handleStateChange = (e) => {
    //const selectedId=e.target.value;
    //const selectedMarketSegment=marketSegment.find((ms)=>ms.segmentName===selectedId).segmentID;
    setSelecetedStateId(parseInt(e.target.value));
    change(e.target.name, e.target.value);
    setError(false);
  };
  const handleUserInputChange = (e) => {
    const phone = e.target.value;
    // const isValid = phone.length >= 10;
    if (phone.length >= 10) {
      setError(false);
    } else {
      setError(true);
    }

    const dial = phoneRef.current.state.formattedNumber;
    setDialcode(dial);
    setContact1(phone);
    setpostdata({ ...postdata, contact: dial + phone });
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };

  return (
    <>
      {/* <ProjectInformationSaveMessage
        show={openSaveMessage}
        close={handleCloseSaveMessage}
      /> */}
      <DesignerAndCustomerDetailsStyled onSubmit={handleSubmit}>
        <div className="second-section">
        {/* <CustomHeading
          className="info-label"
          label={`This is an imported project created using: WAVE Version ${appInfoVM.appVersion},
          Database ${appInfoVM.dbVersion} and Calc Engine ${appInfoVM.calcEngineVersion}`}
          color={colors.Black}
          fontFamily="DiodrumRegular"
          fontSize="12px"
          fontWeight="400"
        /> */}
        {/* this it will show noly import poroject case */}
          <Row className="designer-details">
            <CustomHeading
              lineHeight="18px"
              color={colors.PrimaryDarkAquaMarine}
              label="Designer Details"
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              id="designer-details-heading"
            />
            <Col lg={4} md={4} sm={4} xs={4} className="designer-name">
              <CustomLabel label="Designer"/>
              <InputWithIcon
                disabled={false}
                // isError={postdata.designer.length < 1 ? true : false}
                type="text"
                inputText={<CloseCircleGreenIcon />}
                // inputText={
                //   postdata.designer.length < 1 ? (
                //     <CloseCircleRedIcon />
                //   ) : (
                //     <CloseCircleGreenIcon />
                //   )
                // }
                unitBgColor="transparent"
                id="designerName"
                onFocus={() => handleFocus(1)}
                onBlur={handleBlur}
                isFocused={isFocused === 1}
                name="designer"
                placeholder="User Profile Name"
                defaultValue={postdata.designer}
                value={postdata.designer}
                onChange={handleChangeInputs}
              />
              {/* <InputGroup.Text>
                  <CloseIcon />
                </InputGroup.Text>
              </InputGroup> */}
              {/* {postdata.designer.length < 1 && (
                <ErrorMessage texMsg="This field cannot be empty" />
              )} */}
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="designer-company-name">
              <CustomLabel label="Designer's Company"/>
              {/* <InputGroup className="disable"> */}
              <InputWithIcon
                disabled={false}
                // isError={postdata.designerCompany.length < 1 ? true : false}
                type="text"
                inputText={<CloseCircleGreenIcon />}
                // inputText={
                //   postdata.designerCompany.length < 1 ? (
                //     <CloseCircleRedIcon />
                //   ) : (
                //     <CloseCircleGreenIcon />
                //   )
                // }
                unitBgColor="transparent"
                id="designerCompany"
                placeholder="Users profile"
                onFocus={() => handleFocus(2)}
                onBlur={handleBlur}
                isFocused={isFocused === 2}
                defaultValue={postdata.designerCompany}
                value={postdata.designerCompany}
                onChange={handleChangeInputs}
                name="designerCompany"
              />
              {/* <InputGroup.Text>
                  <CloseIcon />
                </InputGroup.Text>
              </InputGroup> */}
              {/* {postdata.designerCompany.length < 1 && (
                <ErrorMessage texMsg="This field cannot be empty" />
              )} */}
            </Col>
          </Row>
          <Row className="customer-details">
            <CustomHeading
            lineHeight="18px"
              label="Project Customer Details"
              id="projectDetailsHeading"
              color={colors.PrimaryDarkAquaMarine}
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
            />
            <Col lg={4} md={4} sm={4} xs={4} className="customer-name">
              <CustomLabel label="Customer"/>
              {/* <InputGroup className="disable"> */}
              <InputWithIcon
                disabled={false}
                type="text"
                inputText={<CloseCircleGreenIcon />}
                unitBgColor="transparent"
                id="customerName"
                onFocus={() => handleFocus(3)}
                onBlur={handleBlur}
                isFocused={isFocused === 3}
                placeholder="xyz Refinery"
                defaultValue={postdata.customer}
                value={postdata.customer}
                onChange={handleChangeInputs}
                name="customer"
              />
              {/* <InputGroup.Text>
                  <CloseIcon />
                </InputGroup.Text>
              </InputGroup> */}
              {/* {postdata.designerCompany.length < 1 && (
                <ErrorMessage texMsg="This field cannot be empty" />
              )} */}
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="country-selection">
              <CustomLabel label="Country" mandatoryIcon={true}/>
              <CustomSelect
                id="countrySelect"
                onChange={handleCountyChange}
                name="countryID"
                value={postdata.countryID}
              >
                <option value={null}>Select Country</option>
                {Country?.map((data, i) => (
                  <option key={i} value={data.countryID}>
                    {data.countryName}
                  </option>
                ))}
              </CustomSelect>
              <ErrorMessage errorIcon={true} style={{visibility:postdata.countryID<1?"visible":"hidden"}} texMsg="Please Select a country"/>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="state-selection">
              <CustomLabel label="State or Province"/>
              <CustomSelect
                id="stateSelect"
                onChange={handleStateChange}
                name="stateID"
                value={postdata.stateID}
              >
                <option value={0}>Select State</option>
                {State?.map((data, i) => (
                  <option key={i} value={data.stateID}>
                    {data.stateName}
                  </option>
                ))}
              </CustomSelect>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="city-selection">
              <CustomLabel label="City"/>
              <InputWithIcon
                disabled={false}
                isError={false}
                type="text"
                inputText={<CloseCircleGreenIcon />}
                unitBgColor="transparent"
                id="cityInput"
                onFocus={() => handleFocus(4)}
                onBlur={handleBlur}
                isFocused={isFocused === 4}
                placeholder="City Name"
                onChange={handleChangeInputs}
                name="city"
                defaultValue={postdata.city}
                value={postdata.city}
              />
            </Col>
            {/* <Col lg={4} md={4} sm={4} xs={4} className="contact-number">
              <CustomHeading label="Contact" color={colors.Black} fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400"/>
              <div className="country-code-input-box">
                <PhoneInput
                  country={
                    codenumbers.find(
                      (code) => code.countryId === selectedCountryId
                    ).code
                  }
                  enableSearch={false}
                  value={postdata.contact}
                  onChange={(phone) => change("contact", phone)}
                  inputProps={{
                    name: "contact",
                  }}
                  dropdownStyle={customDropdownStyle}
                />
                <input
                  type="number"
                  className="userInput"
                  value={contact1}
                  onChange={handleUserInputChange}
                />
              </div>
            </Col> */}
          </Row>
        </div>
        <div className="create-page-footer">
          <StandardSecondaryButton
            label="Back"
            type="submit"
            id="backBtn"
            onClick={() => changeBack(0)}
          />
          <StandardPrimaryButton
            label="Save"
            type="submit"
            id="saveBtn"
            disabled={nameError.caseName||nameError.projectName}
            onClick={handleOpenSaveMessage}
          />
          </div>
      </DesignerAndCustomerDetailsStyled>
    </>
  );
};

export default DesignerAndCustomerDetails;
