import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountPreferenceStyled from "./AccountPreferenceStyled";
import { Row, Col, Form, Dropdown, Card, Button, Modal } from "react-bootstrap";
import CloseIcon from "../../common/icons/CloseIcon";
import { Overlay } from "./CreateFolderStyled";
import PencilIcon from "../../common/icons/PencilIcon";
import RequiredFieldIcon from "../../common/icons/RequiredFieldIcon";
import CameraIcon from "../../common/icons/CameraIcon";
import Michigan from "./usa-flag.svg";
import { useSaveUserDataMutation } from "../../services/apiConfigUserProfile";
import AlertPopUp from "../../common/notifications/AlertPopUp";
import { updateUserInfo } from "../../common/UserInfoSlice";
import { MyError } from "../../common/utils/ErrorCreator";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors } from "../../common/styles/Theme";
import CloseIconWhite from "../../common/icons/CloseIconWhite";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import CustomSelect from "../../common/styles/components/selects/CustomSelect";
import InputReferenceText from "../../common/styles/components/headings/InputReferenceText";
import CustomRadioCheck from "../../common/styles/components/checkboxs/CustomRadioCheck";
import TechButtons from "../../common/styles/components/buttons/techButtons/TechButtons";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
const countries = [
  {
    code: "US",
    label: "+1",
    path: "./images/language-pref/usa-flag.svg",
  },
  {
    code: "GB",
    label: "+91",
    path: "./images/language-pref/chinese-flag.svg",
  },
  {
    code: "GB",
    label: "+44",
    path: "./images/language-pref/chinese-flag.svg",
  },
];

const AccountPreference = (props) => {
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState("+1");
  const [selectedImage, setSelectedImage] = useState(Michigan);
  const [show, setShow] = useState(true);
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    throw new MyError("User Data Api Error", "422", "ApiError");
  }
  /* Handling Alert Popup */
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({ type: "", message: "" });

  /* Save Account Preferences Mutation*/
  const [createNewUser, responseUserData] = useSaveUserDataMutation();
  /* Received Props with user's custom attributes */
  const { First_Name, Last_Name, UserEmail, Phone } = props.data;
  const UserName = First_Name + " " + Last_Name;
  const initials =
  First_Name?.charAt(0).toUpperCase() + Last_Name?.charAt(0).toUpperCase();
  const [userData, setAccountPreference] = useState({
    firstName: "",
    email: "",
    languageID: "1",
    timeZoneID: "1",
    mobileNumber: "1234567",
    userImage: "",
    requestTechnologyVMs: [],
  });
  const userInfoSliceStore = useSelector((state) => state.userInfo.data);

  /* Handling Alert Popup */
  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({ type: "", message: "" });
    setAlertVisibility(false);
  };
  /* Handling Account Preference Popup */
  const handleClose = () => {
    setShow(false);
    props.onClose();
  };
  /* Handling User Inputs */
  const handleLanguage = (lang) => {
    setAccountPreference({ ...userData, ["languageID"]: lang });
  };
  const handleTimezone = (timezone) => {
    setAccountPreference({ ...userData, ["timeZoneID"]: timezone });
  };
  const handlePhoneNumber = (phone) => {
    setAccountPreference({ ...userData, ["mobileNumber"]: phone });
  };
  const handleChange = (path, label) => {
    setSelectedLabel(label);
    setSelectedImage(path);
  };

  /* Making a POST call to save newly logged-in user info and with their preferences.*/
  const handleSaveUser = async () => {
    const payload = {
      ...userData,
      ["email"]: UserEmail,
      ["firstName"]: First_Name,
      ["requestTechnologyVMs"]: [],
    };
    let ResponseValues = await createNewUser(payload);
    if (ResponseValues?.data?.responseCode == "200") {
      const user_id = ResponseValues?.data?.id;
      if (user_id != "0") {
        const userDetails = { ...userInfoSliceStore };
        userDetails.UserId = user_id;
        dispatch(updateUserInfo(userDetails));
        const message = "Account Preferences saved successfully.";
        handleShowAlert("success", message);
        handleClose();
      }
    } else {
      console.log("UserData API - Failed", ResponseValues);
      // const message ="Failed to save account preferences.";
      // handleShowAlert("error", message);
      // handleClose();
      setHasError(true);
    }
  };
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () =>{
      setImageUrl(reader.result);
    };
    if(file){
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <AccountPreferenceStyled
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
        centered
      >
        <div className="account_preference_header">
          <div className="account_preference_wrapper">
            <div className="account_preference_heading">
              <CustomHeading fontSize="32px" label={"Welcome to WavePro"} color={colors.White}/>
              <CustomHeading fontSize="12px" label="Enter below details for account preferences. They can be changed
                later. Note that profile picture can’t be more than xMB." color={"rgba(255, 255, 255, 0.80)"}/>
            </div>
            <div className="account_preference_user_profile">
              <div className="user_profile_img">
                {imageUrl?(
                  <img src={imageUrl} alt={initials}/>
                ):
                <CustomHeading fontSize="18px" label={initials} fontWeight={"600"} color={colors.PrimaryDarkAquaMarine}/>}
                <label className="camera_icon" htmlFor="upload_img">
                  <CameraIcon/>
                </label>
                <input type="file" id="upload_img" onChange={handleImageUpload}/>
              </div>
              <div className="user_name_email">
                <div className="user_name">
                  <CustomHeading fontSize="16px" label={UserName} fontWeight={"700"} color={colors.White}/>
                  <PencilIcon/>
                </div>
                <div>
                  <CustomHeading fontSize="14px" label={UserEmail} color={colors.White}/>
                </div>
              </div>
            </div>
          </div>
          <div className="account_preference_close_icon">
            <CloseIconWhite/>
          </div>
        </div>
        <div className="account_preference_body_section">
          <section className="account_preference_body_section_a">
            <div>
              <CustomLabel mandatoryIcon={true} label={"Select Language"}/>
              <CustomSelect disabled={false} onChange={() => handleLanguage("1")}>
                <option selected disabled value="">English USA</option>
              </CustomSelect>
              <InputReferenceText refText={"Reference text will come here"}/>
            </div>
            <div>
            <CustomLabel mandatoryIcon={true} label={"Default Time Zone"}/>
              <CustomSelect disabled={false} onChange={() => handleTimezone("1")}>
                <option selected value="1">(GMT-08:00) Pacific Time</option>
              </CustomSelect>
            </div>
          </section>
          <section className="account_preference_body_section_b">
            <div className="account_preference_technology">
              <CustomLabel mandatoryIcon={true} label="Which of the technology group do you prefer to use in WAVE Pro?"/>
              <div className="account_preference_technology_checkbox">
                <CustomRadioCheck type="checkbox" label="UF"/>
                <CustomRadioCheck type="checkbox" label="RO"/>
                <CustomRadioCheck type="checkbox" label="IX"/>
              </div>
              <CustomHeading fontFamily="NotoSansRegular" fontSize={"12px"} color={colors.blackTransparency045} 
              label="It can be changed from inside the project. Only the selected technology will appear in the System Design page."/>
            </div>
            <div className="account_preference_technology_selection">
              <CustomLabel label="Selected Technologies"/>
              <div className="account_preference_technology_button_wrapper">
                <div className="account_preference_technology_button">
                  <CustomLabel label="Pre-treatment"/>
                  <div className="account_preference_technology_button_group">
                    <TechButtons label="UF" small={true}/>
                    <TechButtons label="IXS/D" small={true}/>
                    <TechButtons label="IXOS" small={true}/>
                  </div>
                </div>
                <div className="account_preference_technology_button">
                  <CustomLabel label="BulkDemineralization"/>
                  <div className="account_preference_technology_button_group">
                    <TechButtons label="RO" small={true}/>
                    <TechButtons label="CCRO" small={true}/>
                    <TechButtons label="ROSC" small={true}/>
                    <TechButtons label="IXD" small={true}/>
                  </div>
                </div>
                <div className="account_preference_technology_button">
                  <CustomLabel label="Trace Contaminants Removal"/>
                  <div className="account_preference_technology_button_group">
                    <TechButtons label="IXN" small={true}/>
                    <TechButtons label="IXB" small={true}/>
                  </div>
                </div>
                <div className="account_preference_technology_button">
                  <CustomLabel label="Polishing"/>
                  <div className="account_preference_technology_button_group">
                    <TechButtons label="IXMB" small={true}/>
                    <TechButtons label="IXCP" small={true}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Modal.Footer>
          <StandardSecondaryButton label="Skip"/>
          <StandardPrimaryButton
            className="save-btn"
            type="submit"
            onClick={() => handleSaveUser()}
            label={"Save"}/>
        </Modal.Footer>
      </AccountPreferenceStyled>
      {showAlert ? (
        <AlertPopUp
          type={alertData?.type}
          message={alertData?.message}
          close={handleHideAlert}
        />
      ) : null}
      {/* {showErrorPage ? 
       <ErrorPage status={403} message={"Failed to save Account Preferences!"}/> : null } */}
    </>
  );
};

export default AccountPreference;
