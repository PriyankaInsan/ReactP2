import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import PumpsStyled from "./PumpsStyled";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import DefaultPumpsMessage from "./DefaultPumpsMessage";
import { useState, useRef } from "react";
import EditSavedMessage from "./EditSavedMessage";
import CalcEngineInputBoxTriangle from "../../../common/icons/CalcEngineInputBoxTriangle";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import ArrowRightBlackIcon from "../../../common/icons/ArrowRightBlackIcon";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CalcEngInputWithIcon from "../../../common/styles/components/inputs/CalcEngInputWithIcon";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useDispatch, useSelector } from "react-redux";
import ErrorPopup from "../../../common/utils/ErrorPopup";
import DynamicLoadder from "../../../common/utils/DynamicLoadder";
import { updatePumpList } from "../../../common/ProjectInfoSlice";
import DefaultValueSaved from "./DefaultValueSaved";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";

const Pumps = ({ show, close, forUser }) => {
  const [defaultPumps, setDefaultPumps] = useState(false);
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
  const [editSaved, setEditSaved] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const [getAllData, responseData] = useLazyGetAllDataQuery();
  const [pumps, setPumps] = useState([]);
  const userID = UserInfoStore.UserId === 0 ? 1 : UserInfoStore.UserId;
  // const projectID =
  //   ProjectInfoStore.projectID === 0 ? 1 : ProjectInfoStore.projectID;
  const [updateData, responseUpdate] = useUpdateDataMutation();
  const [updateDataDefault, responseUpdateDefault] = useUpdateDataMutation();
  const [isFocused, setIsFocused] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleOpenEditSaved = () => {
    let error = false;
    pumps.map((item) => {
      if (!Number(item.pumpEfficiency) || !Number(item.motorEfficiency)) {
        error = true;
      }
    });
    setHasError(error);
    console.log("has|Error", error);
    if (!error) {
      updateData({
        Method: "masterdata/api/v1/PumpsData",
        userID: userID,
        projectID: ProjectInfoStore.projectID,
        responsePumps: [...pumps],
      });
      setEditSaved(true);
      // setOpenModal(false);
    }
  };

  const handleDefault = () => {
    setDefaultPumps(false);
    let error = false;
    pumps.map((item) => {
      if (!Number(item.pumpEfficiency) || !Number(item.motorEfficiency)) {
        error = true;
      }
    });
    const datatosent = {
      Method: "masterdata/api/v1/MakeDefaultPumps",
      userID: userID,
      responsePumps: [...pumps],
    };
    setHasError(error);
    if (!error) {
      if (forUser) {
        updateDataDefault(datatosent);
        setOpenModal(false);
      } else {
        updateDataDefault({
          ...datatosent,
          projectID: ProjectInfoStore.projectID,
        });
      }
      setDefaultValueSaved(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);

  const handleOpenDefaultValueSaved = () => {
    setDefaultValueSaved(true);
  };
  const handleCloseDefaultValueSaved = () => {
    setDefaultValueSaved(false);
  };

  //Important
  const handleOpenDefaultPumps = () => {
    setDefaultPumps(true);
  };

  const handleChange = (e, pumpID) => {
    let { value, name } = e.target;

    value = value === "" ? 0 : value;
    console.log(
      "pumpconsole",
      value,
      name,
      !isNaN(value),
      value <= 1,
      value >= 0
    );
    if (!isNaN(value) && value <= 1 && value >= 0) {
      let data = pumps.map((item) => {
        if (item.pumpID === pumpID) {
          if (value == "0.") {
            item = { ...item, [name]: value };
          }
          item = { ...item, [name]: Number(value) };
        }
        return item;
      });
      setPumps(data);
    }
  };

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      try {
        getAllData(
          `masterdata/api/v1/Pumps?userID=${userID}${
            forUser ? "" : `&projectID=${ProjectInfoStore.projectID}`
          }`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [show]);

  useEffect(() => {
    console.log(responseData);

    if (responseData.isLoading) {
      console.log("Loading");
      setIsLoading(true);
    } else {
      console.log("Loading1");

      if (responseData.isSuccess === true) {
        console.log("Success");
        setIsLoading(false);
        setPumps(responseData.data);
      }
    }
    if (responseData.isError) {
      throw new MyError(
        "Pumps Api Error",
        responseData.error.status,
        "ApiError"
      );
    }
  }, [responseData]);

  useEffect(() => {
    if (responseUpdate.isSuccess) {
      dispatch(updatePumpList(pumps));
    }
  }, [responseUpdate]);

  return (
    <>
      <PumpsStyled
        centered
        onHide={handleClose}
        show={show && openModal}
        backdrop="static"
        keyboard="false"
      >
        <ErrorPopup
          show={hasError}
          close={() => setHasError(false)}
          message={"Please fill the correct values!"}
        />
        <Modal.Header>
          <div className="pump-heading">
            <CustomHeading
              label="Pumps"
              color={colors.PrimaryDarkAquaMarine}
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
            />
            <CustomHeading
              label="You can modify pump efficiencies below for your preferred technology."
              color={colors.blackTransparency045}
              fontFamily="DiodrumRegular"
              fontSize="12px"
              fontWeight="400"
              className="sub-heading"
            />
          </div>
          <div className="btnDiv">
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DynamicLoadder isLoading={isLoading}>
            <div className="title-heading">
              <div className="title technology">
                <CustomHeading
                  label="Technology"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="title pump">
                <CustomHeading
                  label="Pump"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                  className="title pump"
                />
              </div>
              <div className="title pump-efficiency">
                <CustomHeading
                  label="Pump Efficiency"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="title motor-efficiency">
                <CustomHeading
                  label="Motor Efficiency"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
              </div>
              <div className="title total-efficiency">
                <CustomHeading
                  label="Total Efficiency"
                  color={colors.Black}
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                />
                <InfoIcon />
              </div>
            </div>
            <Container fluid className="pump-settings-container">
              {pumps.map((pump, index) => (
                <Row className="pump-settings" key={pump.pumpID}>
                  <div className="technology-name">
                    <CustomHeading
                      label={pump.technologyName}
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                    />
                  </div>
                  <div className="technology-pump">
                    <CustomHeading
                      label={pump.type}
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                    />
                  </div>
                  <div className="pump-efficiency">
                    <InputWithIcon
                      isError={!Number(pump.pumpEfficiency)}
                      disabled={false}
                      onBlur={handleBlur}
                      onFocus={() =>
                        handleFocus(`txtPumpEfficiency${pump.pumpID}`)
                      }
                      type="number"
                      isFocused={
                        isFocused === `txtPumpEfficiency${pump.pumpID}`
                      }
                      unitBgColor="transparent"
                      placeholder="0.00"
                      name="pumpEfficiency"
                      id={`txtPumpEfficiency${pump.pumpID}`}
                      inputText={!Number(pump.pumpEfficiency)?(<CloseCircleRedIcon/>):(<CloseCircleGreenIcon />)}
                      onChange={(e) => handleChange(e, pump.pumpID)}
                      value={
                        isFocused === `txtPumpEfficiency${pump.pumpID}`
                          ? pump.pumpEfficiency
                          : Number(pump.pumpEfficiency).toFixed(2)
                      }
                      defaultValue={0}
                    />
                    {/* <InputReferenceText className="error" refText="Range 0-1" /> */}
                  </div>
                  <div className="motor-efficiency">
                    <InputWithIcon
                      disabled={false}
                      isError={!Number(pump.motorEfficiency)}
                      unitBgColor="transparent"
                      inputText={!Number(pump.motorEfficiency)?(<CloseCircleRedIcon/>):(<CloseCircleGreenIcon />)}
                      type="number"
                      onBlur={handleBlur}
                      name="motorEfficiency"
                      id={`txtMotorEfficiency${pump.pumpID}`}
                      onFocus={() =>
                        handleFocus(`txtMotorEfficiency${pump.pumpID}`)
                      }
                      placeholder="0.00"
                      isFocused={
                        isFocused === `txtMotorEfficiency${pump.pumpID}`
                      }
                      onChange={(e) => handleChange(e, pump.pumpID)}
                      value={
                        isFocused === `txtMotorEfficiency${pump.pumpID}`
                          ? pump.motorEfficiency
                          : Number(pump.motorEfficiency).toFixed(2)
                      }
                      defaultValue={0}

                      // value={motorEfficiencyValue}
                    />
                    {/* <InputReferenceText className="error" refText="Range 0-1" /> */}
                  </div>
                  <div className="total-efficiency">
                    <CalcEngInputWithIcon
                      disabled={true}
                      isError={false}
                      type="text"
                      inputText=""
                      placeholder="0.00"
                      name={`txtTotalEfficiency${pump.pumpID}`}
                      id={`txtTotalEfficiency${pump.pumpID}`}
                      defaultValue="0.80"
                      value={(
                        Number(pump.pumpEfficiency) *
                        Number(pump.motorEfficiency)
                      ).toFixed(3)}
                    />
                  </div>
                </Row>
              ))}
            </Container>
          </DynamicLoadder>
        </Modal.Body>
        <Modal.Footer>
          {!forUser && (
            <StandardLinkButtonWithIcon
              label="Make as New Default"
              padding="10px 24px 10px 0px"
              icon={<ArrowRightBlackIcon />}
              plusIcon={false}
              onClick={handleOpenDefaultPumps}
            ></StandardLinkButtonWithIcon>
          )}
          <DefaultPumpsMessage
            show={defaultPumps}
            close={setDefaultPumps}
            yes={handleDefault}
          />
          {/* <Button id="saveBtn" onClick={handleOpenDefaultValueSaved}>
            Save
           
          </Button> */}
          <DefaultValueSaved
          show={defaultValueSaved}
          close={setDefaultValueSaved}
          parentModal={setDefaultValueSaved}
        />

            {/* <EditSavedMessage show={defaultValueSaved} close={setDefaultValueSaved} parentModal={setDefaultValueSaved}/> */}

          <StandardPrimaryButton
            label="Save"
            id="btnSave"
            onClick={() => (forUser ? handleDefault() : handleOpenEditSaved())}
          ></StandardPrimaryButton>
          
          <EditSavedMessage
            show={editSaved}
            close={setEditSaved}
            parentModal={setOpenModal}
          />
        </Modal.Footer>
      </PumpsStyled>
    </>
  );
};

export default Pumps;
