/* eslint-disable max-len */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row } from "react-bootstrap";
import UFSystemDesignDiagram from "./UFSystemDesignDiagram";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InfoIcon from "../../../common/icons/InfoIcon";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import { useState } from "react";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import BackwashStyled from "./BackwashStyled";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import ToggleSwitch from "../../../common/styles/components/switches/CustomSwitch";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import { string } from "zod";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import {
  handleSameAsBackwash,
  updateUFStore,
  updateCipData,
  setUfDataUpdate,
} from "../uf/UFSlice";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const Backwash = () => {
  const [isFocused, setIsFocused] = useState(null);

  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const UFStore = useSelector((state) => state.UFStore);
  const UFData = useSelector((state) => state.UFStore.data);

  const {
    bwWaterSource,
    forwardFlushWaterSource,
    bwProtocol,
    oxidantChemicals,
    ufInputRangeConfig,
  } = UFStore;

  /* Fetching Minimum Temperature from feedsetup slice */
  const feedWater_StreamStore = useSelector(
    (state) => state.Feedsetupdetailsdatapanel
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const tempDesign =
    (feedWater_StreamStore &&
      feedWater_StreamStore?.streamData?.lstrequestsavefeedwater[0]?.streams[0]
        ?.tempDesign) ||
    25;
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const {
    uFBWWaterTypeID,
    uFBWFlushWaterTypeID,
    uFBWProtocolID,
    oxidantID,
    oxidantDosage,
    backwash_Filtration,
    backwash_AirScour,
    drain_backWash,
    backWash1_backWash,
    backWash2_backWash,
    forwardFlush_backWash,
    lF,
    t_BWBtnAirScour,
  } = UFData;

  const [isFieldValid, setIsFieldValid] = useState(false);
  const [message, setMessage] = useState("");
  const selectedUFModule = useSelector((state) => state.UFStore.activeUFModule);
  const defaultInputRangeConfig = useSelector(
    (state) => state.UFStore.defaultInputRangeConfig
  );


  const fieldOxidantDosage = defaultInputRangeConfig["oxidantDosage"];
  // const sendData = {
  //   target: "oxidantDosage",
  //   value: fieldOxidantDosage.defaultValue,
  // };
  // dispatch(updateCipData(sendData));
  const fieldFFBackWash = defaultInputRangeConfig["forwardFlush_backWash"];
  const fieldBackwashTop = defaultInputRangeConfig["backWash1_backWash"];
  const fieldBackwashBottom = defaultInputRangeConfig["backWash2_backWash"];
  const fieldBackwashAirScour = defaultInputRangeConfig["backwash_AirScour"];
  const fieldBackwashDrain = defaultInputRangeConfig["drain_backWash"];

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsFieldValid(false);
    }
  };

  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e) => {
    setIsFocused(null);
    let valueIsSafe = false;
    if (e.target.name === "oxidantDosage") {
      if (e.target.value < 0 || e.target.value > 20 || isNaN(e.target.value)) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The Oxidant value entered is outside the allowed range (${0} to ${20}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("oxidantDosage");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "forwardFlush_backWash") {
      if (
        e.target.value < fieldFFBackWash?.minValue ||
        e.target.value > fieldFFBackWash?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The Forward Flush value entered is outside the allowed range (${fieldFFBackWash?.minValue} to ${fieldFFBackWash?.maxValue}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("forwardFlush_backWash");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (e.target.name === "backWash1_backWash") {
      if (
        e.target.value < fieldBackwashTop?.minValue ||
        e.target.value > fieldBackwashTop?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The BW Drain Top value entered is outside the allowed range (${fieldBackwashTop?.minValue} to ${fieldBackwashTop?.maxValue}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("backWash1_backWash");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (e.target.name === "backWash2_backWash") {
      if (
        e.target.value < fieldBackwashBottom?.minValue ||
        e.target.value > fieldBackwashBottom?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The BW Drain Bottom value entered is outside the allowed range (${fieldBackwashBottom?.minValue} to ${fieldBackwashBottom?.maxValue}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("backWash2_backWash");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (e.target.name === "backwash_AirScour") {
      if (
        e.target.value < fieldBackwashAirScour?.minValue ||
        e.target.value > fieldBackwashAirScour?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The Air Scour value entered is outside the allowed range (${fieldBackwashAirScour?.minValue} to ${fieldBackwashAirScour?.maxValue}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("backwash_AirScour");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (e.target.name === "drain_backWash") {
      if (
        e.target.value < fieldBackwashDrain?.minValue ||
        e.target.value > fieldBackwashDrain?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        const msg = `The Air Scour value entered is outside the allowed range (${fieldBackwashDrain?.minValue} to ${fieldBackwashDrain?.maxValue}). Please revise your input.`;
        setMessage(msg);
        setIsFocused("drain_backWash");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (e.target.name === "t_BWBtnAirScour") {
      if (e.target.value == "" || e.target.value < 1 || isNaN(e.target.value)) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          "The Backwashes between Air Scour minimum value should be 1. Please revise your input."
        );
        setIsFocused("t_BWBtnAirScour");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;

        setIsFieldValid(false);
      }
    }
    if (valueIsSafe) {
      dispatch(
        updateUFStore({
          ...UFData,
          [e.target.name]: Number(e.target.value).toFixed(2),
        })
      );
    }
  };
  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(
        updateUFStore({
          ...UFData,
          ["bWDesignTemperature_Ind"]: checked,
          oxidantID: oxidantChemicals[0].id.toString(),
          oxidantDosage: fieldOxidantDosage.defaultValue,
        })
      );
    } else {
      dispatch(
        updateUFStore({
          ...UFData,
          ["bWDesignTemperature_Ind"]: false,
          oxidantID: "0",
          oxidantDosage: 0,
        })
      );
    }
    dispatch(setUfDataUpdate(true));
  };
  const durationData = [
    {
      id: 1,
      label: "Filtrate to Level",
      name: "backwash_Filtration",
      defaultValue: backwash_Filtration || "0",
      value: backwash_Filtration,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: true,
      calcInput: true,
      className: "big-text",
      isError: false,
      validator: { minValue: 0, maxValue: 0 },
    },
    {
      id: 2,
      label: "Air Scour",
      name: "backwash_AirScour",
      defaultValue: "10", //backwash_AirScour
      value: backwash_AirScour,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: false,
      calcInput: false,
      className: "big-text",
      isError:
        backwash_AirScour < fieldBackwashAirScour?.minValue ||
        backwash_AirScour > fieldBackwashAirScour?.maxValue
          ? true
          : false,
      validator: fieldBackwashAirScour,
    },
    {
      id: 3,
      label: "Drain",
      name: "drain_backWash",
      defaultValue: drain_backWash,
      value: drain_backWash,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: false,
      calcInput: false,
      className: "big-text",
      isError:
        drain_backWash < fieldBackwashDrain?.minValue ||
        drain_backWash > fieldBackwashDrain?.maxValue
          ? true
          : false,
      validator: fieldBackwashDrain,
    },
    {
      id: 4,
      label: "BW Drain Bottom",
      name: "backWash2_backWash",
      defaultValue: backWash2_backWash,
      value: backWash2_backWash,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: false,
      calcInput: false,
      className: "big-text",
      validator: fieldBackwashBottom,
      isError:
        backWash2_backWash < fieldBackwashBottom?.minValue ||
        backWash2_backWash > fieldBackwashBottom?.maxValue
          ? true
          : false,
    },
    {
      id: 5,
      label: "BW Drain Top",
      name: "backWash1_backWash",
      defaultValue: backWash1_backWash,
      value: backWash1_backWash,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: false,
      calcInput: false,
      className: "big-text",
      validator: fieldBackwashTop,
      isError:
        backWash1_backWash < fieldBackwashTop?.minValue ||
        backWash1_backWash > fieldBackwashTop?.maxValue
          ? true
          : false,
    },
    {
      id: 6,
      label: "Forward Flush",
      name: "forwardFlush_backWash",
      defaultValue: forwardFlush_backWash,
      value: forwardFlush_backWash,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: false,
      calcInput: false,
      className: "big-text",
      validator: fieldFFBackWash,
      isError:
        forwardFlush_backWash < fieldFFBackWash?.minValue ||
        forwardFlush_backWash > fieldFFBackWash?.maxValue
          ? true
          : false,
    },
    {
      id: 7,
      label: "Lumen Fill",
      name: "lF",
      defaultValue: lF,
      value: lF,
      inputText: "Sec",
      placeholder: "0.00",
      disabled: true,
      calcInput: true,
      className: "big-text",
      validator: { minValue: 0, maxValue: 0 },
    },
    {
      id: 8,
      label: "Backwashes between Air Scour",
      name: "t_BWBtnAirScour",
      defaultValue: t_BWBtnAirScour,
      value: t_BWBtnAirScour,
      inputText: "Sec",
      disabled: false,
      placeholder: "0.00",
      calcInput: false,
      className: "big-text",
      isAutoPopulated: true,
      validator: { minValue: 0, maxValue: 1 },
      isError: t_BWBtnAirScour < 1 ? true : false,
    },
  ];
  const checkWarning = (name) => {
    const value = UFData[name];
    const validator = fieldOxidantDosage;
    if (value < validator?.minValue) {
      return false;
    } else if (
      value < validator?.softLowerLimit ||
      value > validator?.softUpperLimit
    ) {
      if (value <= validator?.maxValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const handleOxidantSelection = (e) => {
    {
      /*  bulkConcentration: 12, displayName: "NaOCl(12)", id: 12, name: "Oxidant" */
    }
    const { value, name, id } = e.target;
    let chemData = oxidantChemicals.find((chem) => chem.id == value);
    let concentration = value == 0 ? 0 : chemData.bulkConcentration;
    let displayName = value == 0 ? 0 : chemData.displayName;
    dispatch(updateUFStore({ ...UFData, ["oxidantID"]: value.toString() }));
    dispatch(setUfDataUpdate(true));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value === "" ? "" : value;
    if (!isNaN(value)) {
      dispatch(updateUFStore({ ...UFData, [name]: value }));
      dispatch(setUfDataUpdate(true));
    }
  };

  useEffect(() => {
    if (UFData.sameAsBackwash_Ind) {
      dispatch(handleSameAsBackwash(false));
    }
  }, [
    UFData.drain_backWash,
    UFData.backwash_AirScour,
    UFData.backWash1_backWash,
    UFData.backWash2_backWash,
    UFData.forwardFlush_backWash,
  ]);

  return (
    <>
      <BackwashStyled className="g-0">
        <UFSystemDesignDiagram />
        <div className="backwash-wrapper">
          <StyledCard className="backwash-temperature">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Backwash Temperature"
              />
              <IconWithTooltip
                label="Informational, it is assumed BW will use water at the design temperature."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="temp-water">
              <CustomLabel
                disabled={true}
                label="Use design temperature from feed water"
              />
              <InputWithText
                className="temp-water-input"
                type="text"
                disabled={true}
                isError={false}
                inputText={unit.selectedUnits[2]}
                placeholder="0.00"
                value={unit.selectedUnits[2]!=="°C"?GlobalUnitConversion(GlobalUnitConversionStore,tempDesign,unit.selectedUnits[2],"°C"):tempDesign}
                isFocused={isFocused === 1}
                onBlur={handleBlur}
                onFocus={() => handleFocus(1)}
              />
            </div>
          </StyledCard>
          <StyledCard className="water-source">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Water Source"
              />
              <IconWithTooltip
                label="Select source of water for cleaning protocols, RO permeate available if RO in design."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div>
              <CustomLabel label="Backwash Water Source" disabled={false} />
              <CustomSelect
                type=""
                id="uFBWWaterTypeID"
                name="uFBWWaterTypeID"
                value={UFData.uFBWWaterTypeID}
                placeholder="Backwash Water Source"
                onChange={handleInputChange}
                isError={false}
                disabled={false}
              >
                {bwWaterSource?.map((w, index) => (
                  <option
                    value={w.ufbwWaterTypeID}
                    key={`water-source-${index}`}
                  >
                    {w.waterTypeName}
                  </option>
                ))}
              </CustomSelect>
            </div>
            <div className="forward-flush-water">
              <CustomLabel label="Forward Flush Water Source" />
              <CustomSelect
                type=""
                id="uFBWFlushWaterTypeID"
                name="uFBWFlushWaterTypeID"
                value={UFData.uFBWFlushWaterTypeID}
                placeholder="Forward Flush Water Source"
                onChange={handleInputChange}
                isError={false}
                disabled={false}
              >
                {forwardFlushWaterSource?.map((flushItem, index) => (
                  <option
                    value={flushItem.ufbwFlushWaterTypeID}
                    key={`flush-backwash-${index}`}
                  >
                    {flushItem.fwFlushWaterTypeName}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </StyledCard>
          <StyledCard className="backwash-protocol">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Backwash Protocol"
              />
              <IconWithTooltip
                label="Select BW protocol if specified module is suitable for more than one."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div>
              <CustomLabel label="Backwash Protocol" />
              <CustomSelect
                type=""
                id="uFBWProtocolID"
                name="uFBWProtocolID"
                value={
                  selectedUFModule?.newModuleLongName?.indexOf("UXA") >= 0
                    ? "1"
                    : UFData.uFBWProtocolID
                }
                placeholder="Backwash Protocol"
                onChange={handleInputChange}
                isError={false}
                disabled={false}
              >
                {
                    (selectedUFModule?.newModuleLongName?.indexOf("UXA")>=0)?
                      (bwProtocol?.map((bwP, index) => (
                        <option
                          value={bwP.ufbwProtocolID}
                          key={`bw-protocol-${index}`}
                        >
                          {bwP.protocolName}
                        </option>
                      ))) 
                      :
                      ( <option
                        value={bwProtocol[1].ufbwProtocolID}
                        key={`bw-protocol-${2}`}
                      >
                        {bwProtocol[1].protocolName}
                      </option>)
                }
                
                {/* {bwProtocol?.map((bwP, index) => (
                  <option
                    value={bwP.ufbwProtocolID}
                    key={`bw-protocol-${index}`}
                  >
                    {bwP.protocolName}
                  </option>
                ))} */}

                {/* {selectedUFModule?.newModuleLongName?.indexOf("UXA") >= 0 ? 
                ( <option
                  value={bwProtocol[0].ufbwProtocolID}
                  key={`bw-protocol-${1}`}
                >
                  {bwProtocol[0].protocolName}
                </option>):(
                   <option
                   value={bwProtocol[1].ufbwProtocolID}
                   key={`bw-protocol-${2}`}
                 >
                   {bwProtocol[1].protocolName}
                 </option>
                )
                } */}
              </CustomSelect>
            </div>
          </StyledCard>
        </div>
        <div className="oxidant">
          <StyledCard className="oxidant-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Oxidant"
              />
              <div className="switch-div">
                <ToggleSwitch
                  small
                  id="oxidant"
                  name="bWDesignTemperature_Ind"
                  checked={UFData.bWDesignTemperature_Ind}
                  onChange={handleChange}
                />
                <IconWithTooltip
                  label="If recommended, select chemical and dose of oxidant added to BW water ."
                  icon={<InfoIcon />}
                />
              </div>
            </Card.Header>
            <div className="oxidant-input-wrapper">
              <div className="oxidant-select">
                <CustomSelect
                  type=""
                  disabled={!UFData.bWDesignTemperature_Ind}
                  value={UFData.oxidantID}
                  id="oxidant"
                  name="oxidantID"
                  placeholder="Oxidant"
                  onChange={handleOxidantSelection}
                  isError={false}
                >
                  {!UFData.bWDesignTemperature_Ind && (
                    <option value={0}></option>
                  )}
                  {oxidantChemicals?.map((oxdt, index) => (
                    <option value={oxdt.id} key={`oxidant-${index}`}>
                      {oxdt.displayName}
                    </option>
                  ))}
                </CustomSelect>
              </div>
              <div className="oxidant-input">
                <InputWithText
                  type="number"
                  disabled={!UFData.bWDesignTemperature_Ind}
                  value={UFData.oxidantDosage}
                  id="oxidant"
                  name="oxidantDosage"
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isError={
                    Number(UFData.oxidantDosage) > 20 ||
                    Number(UFData.oxidantDosage) < 0
                      ? true
                      : false
                  }
                  isWarning={
                    Number(UFData.oxidantDosage) > 15 &&
                    Number(UFData.oxidantDosage) < 20
                  }
                  inputText="mg/L"
                  placeholder="0.00"
                  // defaultValue="25.00"
                  isFocused={isFocused === "oxidantDosage"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("oxidantDosage")}
                  // isWarning={checkWarning("oxidantDosage")}
                />
                <InputReferenceText
                  refText={`Ranges ${fieldOxidantDosage?.minValue.toFixed(2)} - ${fieldOxidantDosage?.maxValue.toFixed(2)}`}
                />
              </div>
            </div>
          </StyledCard>
        </div>
        <div className="duration">
          <StyledCard className="duration-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Durations"
              />
              <IconWithTooltip
                label="Provide duration of each step in the BW protocol."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="duration-input-wrapper">
              {durationData.map((item, index) => (
                <div key={index} className={item.className}>
                  {item.calcInput ? (
                    <>
                      <CustomLabel
                        disabled={item.disabled}
                        label={item.label}
                      />
                      <CalcEngineInputBox
                        disabled={item.disabled}
                        inputText={item.inputText}
                        placeholder={item.placeholder}
                        defaultValue={item.defaultValue}
                        isFocused={isFocused === item.id}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(item.id)}
                        isError={false}
                        isAutoPopulated={item.isAutoPopulated}
                      />
                    </>
                  ) : (
                    <>
                      <CustomLabel
                        disabled={item.disabled}
                        label={item.label}
                      />

                      <InputWithText
                        type="number"
                        id={item.id}
                        name={item.name}
                        disabled={item.disabled}
                        inputText={item.inputText}
                        placeholder={item.placeholder}
                        isError={item.isError}
                        value={isFocused == item.label?item.value:Number(item.value).toFixed(2)}
                        onChange={handleInputChange}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isFocused={isFocused === item.label}
                        onWheel={(e) => e.target.blur()}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(item.label)}
                      />
                      <InputReferenceText
                        refText={`Ranges ${item.validator?.minValue.toFixed(
                          2
                        )} - ${item.validator?.maxValue.toFixed(
                          2
                        )}`}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </StyledCard>
        </div>
      </BackwashStyled>
      {isFieldValid && (
        <ProjectErrorPopup
          show={isFieldValid}
          close={() => {
            setIsFieldValid(false);
            setIsFocused(1);
          }}
          message={message}
        />
      )}
    </>
  );
};

export default Backwash;
