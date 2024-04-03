/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import AdditionalSettingStyled from "./AdditionalSettingStyled";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import { Card } from "react-bootstrap";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InfoIcon from "../../../common/icons/InfoIcon";
import { colors } from "../../../common/styles/Theme";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { MyError } from "../../../common/utils/ErrorCreator";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";

import {
  updateUFInputRangeConfig,
  updateAdditionalData,
  updateUFStore,
  setUfDataUpdate,
} from "../uf/UFSlice";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const AdditionalSetting = () => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(null);
  const [UFDesignData, setUFDesignData] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [getUFDesignData, responseUFDesignData] = useLazyGetAllDataQuery();
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const caseID = ProjectInfoStore.caseId;
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const ufStoreData = useSelector((state) => state.UFStore);
  const ufStore = useSelector((state) => state.UFStore.data);
  const designTemp = useSelector(
    (state) =>
      state?.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const { ufInputRangeConfig, defaultInputRangeConfig } = ufStoreData;

  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const unitFlow = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig.selectedUnits[4]
  );
  const UFData = useSelector((state) => state.UFStore.data);
  const {unitFlag,unitTypeFlux} = useSelector((state) => state.GUnitConversion);
  const [errorOperator, setErrorOperator] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
     return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      closeErrorMessag();
    }
  };

  const closeErrorMessag = () => {
    setErrorOperator({
      show: false,
      message: "",
    });
    // setIsFocused(1);
  };
  /* Pressure */
  const fieldMaximumAirScourPressure = ufInputRangeConfig.filter(
    (config) => config.label == "Maximum Air Scour Pressure"
  );
  const fieldMaximumProcessAirPressure = ufInputRangeConfig.filter(
    (config) => config.label == "Maximum ADBW Air Pressure"
  );
  const fieldFiltratePressure = ufInputRangeConfig.filter(
    (config) => config.label == "Filtrate Pressure"
  );
  const fieldFiltratePipingPressure = ufInputRangeConfig.filter(
    (config) => config.label == "Non-IntegraPac Filtration Pressure Drop"
  );
  const fieldStrainerPressure = ufInputRangeConfig.filter(
    (config) => config.label == "IntegraPac Filtration Pressure Drop"
  );
  const fieldBackwashPipingPressureDrop = ufInputRangeConfig.filter(
    (config) => config.label == "Backwash Piping Pressure Drop"
  );
  const fieldCIPPipingPressureDrop = ufInputRangeConfig.filter(
    (config) => config.label == "CIP Piping Pressure Drop"
  );
  /* Values */
  const fieldValvesPerUnit = ufInputRangeConfig.filter(
    (config) => config.label == "Valves per train"
  );
  // const fieldValveOpenCloseActionDuration = defaultInputRangeConfig.filter(
  //   (config) => config.label == "Valve Open/Close Action Duration"
  // );
  const fieldValveOpenCloseActionDuration =
    defaultInputRangeConfig["valveOpenCloseDuration"];
  const fieldTypicalWaitDurationDupont = ufInputRangeConfig.filter(
    (config) => config.label == "Typical Wait Duration_Dupont"
  );
  const fieldTypicalPumpRampDupont = ufInputRangeConfig.filter(
    (config) => config.label == "Typical Pump Ramp_Dupont"
  );

  /* Tank Size */
  const fieldTankSizeFactorBF = ufInputRangeConfig.filter(
    (config) => config.label == "Tank Size Factor (BW+Filtrate Tank)"
  );
  const fieldTankSizeFactorB = ufInputRangeConfig.filter(
    (config) => config.label == "Tank Size Factor (BW only Tank)"
  );
  const fieldTankSizeFactorCIP = ufInputRangeConfig.filter(
    (config) => config.label == "Tank Size Factor (CIP Tank)"
  );
  /* Tank */
  const fieldChemicalStorageTime = ufInputRangeConfig.filter(
    (config) => config.label == "Chemical Storage Time (days)"
  );

  const fieldBackwashOnlyTankRefillRate = ufInputRangeConfig.filter(
    (config) => config.label == "Backwash Only Tank Refill Rate"
  );
  /* Power */
  const fieldPLCPowerRequirementperTrain = ufInputRangeConfig.filter(
    (config) => config.label == "PLC Power Requirement per Train"
  );
  const fieldValvePowerRequirementsperValve = ufInputRangeConfig.filter(
    (config) => config.label == "Valve Power Requirements per Valve"
  );
  /* Strainer */
  const fieldStrainerRecovery = ufInputRangeConfig.filter(
    (config) => config.label == "Strainer Recovery"
  );
  const fieldStrainerSize = ufInputRangeConfig.filter(
    (config) => config.label == "Strainer Size"
  );
  /* Filteration */
  const fieldBackwashTMPIncrease = ufInputRangeConfig.filter(
    (config) => config.label == "Backwash TMP Increase"
  );
  const fieldAcidCEBTMPIncrease = ufInputRangeConfig.filter(
    (config) => config.label == "Acid CEB TMP Increase"
  );
  const fieldMiniCIP = ufInputRangeConfig.filter(
    (config) => config.label == "Mini-CIP"
  );
  const fieldAlkaliCEBTMPincrease = ufInputRangeConfig.filter(
    (config) => config.label == "Alkali CEB TMP increase"
  );
  const fieldCIPTMPincrease = ufInputRangeConfig.filter(
    (config) => config.label == "CIP TMP increase"
  );
  /* Displacement */
  const fieldADBWDisplacement = ufInputRangeConfig.filter(
    (config) => config.label == "ADBW Displacement_by 8_Memcor"
  );
  const fieldFTLDisplacement = ufInputRangeConfig.filter(
    (config) => config.label == "FTL Displacement"
  );

  const handleFocus = (id) => {
    setIsFocused(id);
  };

  const giveErrorMessage = (label, value) => {
    return `The ${label} value entered is outside the allowed range (${value.minValue.toFixed(2)} to ${value.maxValue.toFixed(2)}). Please revise your input.`;
  };

  const handleBlur = (e, validations, label) => {
    const { name, value } = e.target; 
    if(name==="maxAirScourPressure" || name==="maxAirProcPressure" || name==="filteratePressure" || name==="nonIntegraPacTrainPresDrop" || name==="integraPacFiltrationPreDrop" || name==="backwashPipingPreDrop" || name==="cIPPipingPreDrop" || name==="backwash_Filtration" || name==="acidCEB_Filtration" || name==="alkaliCEB_Filtration" || name==="cIP_Filtration" ){
      if(unit.selectedUnits[3]!=="bar"){
        const unitValidation={minValue:unitValidations(name)[0],maxValue:unitValidations(name)[1]};
        if((value < unitValidation?.minValue || value > unitValidation?.maxValue)){
          setErrorOperator({
            show: true,
            message: giveErrorMessage(label, unitValidation),
          });
          setIsFocused(name);
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }else {
          setIsFocused(null);
          dispatch(
            updateAdditionalData({ target: name, value: Number(value).toFixed(2) })
          );
          setErrorOperator({
            show: false,
            message: "",
          });
        }  
      }else if (value < validations?.minValue || value > validations?.maxValue) {
        setErrorOperator({
          show: true,
          message: giveErrorMessage(label, validations),
        });
        setIsFocused(name);
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFocused(null);
        dispatch(
          updateAdditionalData({ target: name, value: Number(value).toFixed(2) })
        );
        setErrorOperator({
          show: false,
          message: "",
        });
      }
    }else if(name==="volvePowerReqPerTrain" || name==="pLCPowerReqPertrain"){
      if(unit.selectedUnits[9]!=="kW"){
        const unitValidation={minValue:unitValidations(name)[0],maxValue:unitValidations(name)[1]};
        if((value < unitValidation?.minValue || value > unitValidation?.maxValue)){
          setErrorOperator({
            show: true,
            message: giveErrorMessage(label, unitValidation),
          });
          setIsFocused(name);
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }else {
          setIsFocused(null);
          dispatch(
            updateAdditionalData({ target: name, value: Number(value).toFixed(2) })
          );
          setErrorOperator({
            show: false,
            message: "",
          });
        }  
      }else if (value < validations?.minValue || value > validations?.maxValue) {
        setErrorOperator({
          show: true,
          message: giveErrorMessage(label, validations),
        });
        setIsFocused(name);
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFocused(null);
        dispatch(
          updateAdditionalData({ target: name, value: Number(value).toFixed(2) })
        );
        setErrorOperator({
          show: false,
          message: "",
        });
      }
    }
    else if (value < validations?.minValue || value > validations?.maxValue) {
      setErrorOperator({
        show: true,
        message: giveErrorMessage(label, validations),
      });
      setIsFocused(name);
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      setIsFocused(null);

        dispatch(
          updateAdditionalData({ target: name, value: Number(value).toFixed(2) })
        );
      

      setErrorOperator({
        show: false,
        message: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      const sendData = { target: name, value: (value) };
      dispatch(updateAdditionalData(sendData));
      dispatch(setUfDataUpdate(true));
    }
  };

  const handelIntChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      // const sendData = { target: name, value: Number(value) };
      dispatch(updateAdditionalData({ target: name, value: parseInt(value) }));
    }
  };

  const pressureData = [
    {
      id: 1,
      label: "Maximum Air Scour Pressure",
      className: "maximum-air",
      inputText: "Bar",
      defaultValue: 0.0,
      calcInput: false,
      disabled: false,
      name: fieldMaximumAirScourPressure,
      value: "maxAirScourPressure",
    },
    {
      id: 2,
      label: "Maximum Process Air Pressure",
      className: "maximum-pressure",
      inputText: "Bar",
      defaultValue: 0.0,
      calcInput: true,
      disabled: true,
      name: fieldMaximumProcessAirPressure,
      value: "maxAirProcPressure",
    },
    {
      id: 3,
      label: "Filtrate Pressure",
      inputText: "Bar",
      className: "filtrate-pressure",
      defaultValue: 0.5,
      calcInput: false,
      disabled: false,
      name: fieldFiltratePressure,
      value: "filteratePressure",
    },
    {
      id: 4,
      label: `Filtration Piping Pressure Drop: ${unit.selectedUnits[2]!=="°C"?Number(GlobalUnitConversion(GlobalUnitConversionStore,designTemp,unit.selectedUnits[2],"°C").toFixed(2)):designTemp}${unit.selectedUnits[2]}`,
      inputText: "Bar",
      className: "filtration-piping",
      defaultValue: 0.4,
      calcInput: false,
      disabled: false,
      name: fieldFiltratePipingPressure,
      value: "nonIntegraPacTrainPresDrop",
    },
    {
      id: 5,
      label: `Strainer Pressure Drop: ${unit.selectedUnits[2]!=="°C"?Number(GlobalUnitConversion(GlobalUnitConversionStore,designTemp,unit.selectedUnits[2],"°C").toFixed(2)):designTemp}${unit.selectedUnits[2]}`,
      className: "strainer-pressure",
      inputText: "Bar",
      defaultValue: 0.1,
      calcInput: false,
      disabled: false,
      name: fieldStrainerPressure,
      value: "integraPacFiltrationPreDrop",
    },
    {
      id: 6,
      label: `Backwash Piping Pressure Drop: ${unit.selectedUnits[2]!=="°C"?Number(GlobalUnitConversion(GlobalUnitConversionStore,designTemp,unit.selectedUnits[2],"°C").toFixed(2)):designTemp}${unit.selectedUnits[2]}`,
      className: "backwash-piping",
      inputText: "Bar",
      defaultValue: 0.1,
      calcInput: false,
      disabled: false,
      name: fieldBackwashPipingPressureDrop,
      value: "backwashPipingPreDrop",
    },
    {
      id: 7,
      label: `CIP Piping Pressure Drop: ${parseFloat(ufStore.recycleTemperature).toFixed(2)}${unit.selectedUnits[2]}`,
      className: "cip-piping",
      inputText: "Bar",
      // defaultValue: 2.5,
      calcInput: false,
      disabled: false,
      name: fieldCIPPipingPressureDrop,
      value: "cIPPipingPreDrop",
    },
  ];
  const valveData = [
    {
      id: 9,
      label: "Typical Wait Duration",
      className: "typical-wait",
      inputText: "Sec",
      defaultValue: 7,
      placeholder: 0.0,
      name: fieldTypicalWaitDurationDupont,
      value: "typicalWaitDuration_Dupont",
    },
    {
      id: 10,
      label: "Typical Pump Ramp",
      className: "typical-pump",
      inputText: "Sec",
      defaultValue: 5,
      placeholder: 0.0,
      name: fieldTypicalPumpRampDupont,
      value: "typicalPumpRamp_Dupont",
    },
  ];
  const memCorData = [
    {
      id: 11,
      label: "BW, Aeration, Sweep Flow",
      className: "bw-sweep-flow",
      inputText: `m${"\u00B3"}/h/module`,
      defaultValue: 0.0,
      placeholder: 0.0,
      disabled: true,
    },
    {
      id: 12,
      label: "Aeration with Sweep Flow",
      className: "aeration-sweep-flow",
      inputText: `m${"\u00B3"}/h/module`,
      defaultValue: 0.0,
      placeholder: 0.0,
      disabled: true,
    },
    {
      id: 13,
      label: "Sweep Flow",
      className: "sweep-flow",
      inputText: `m${"\u00B3"}/h/module`,
      defaultValue: 0.0,
      placeholder: 0.0,
      disabled: true,
    },
    {
      id: 14,
      label: "Lumen Fill Flow",
      className: "lumen-flow",
      inputText: `m${"\u00B3"}/h/module`,
      defaultValue: 0.0,
      placeholder: 0.0,
      disabled: true,
    },
  ];
  const unitValidations =(field)=> {
    if(field=="maxAirScourPressure"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldMaximumAirScourPressure[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMaximumAirScourPressure[0]?.minValue,unit.selectedUnits[3],"bar").toFixed(2);
      const maxRange=unit.selectedUnits[3]==="bar"?fieldMaximumAirScourPressure[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMaximumAirScourPressure[0]?.maxValue,unit.selectedUnits[3],"bar").toFixed(2);
      return [minRange,maxRange];
    }
    if(field=="maxAirProcPressure"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldMaximumProcessAirPressure[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMaximumProcessAirPressure[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldMaximumProcessAirPressure[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMaximumProcessAirPressure[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="filteratePressure"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldFiltratePressure[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltratePressure[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldFiltratePressure[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltratePressure[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="nonIntegraPacTrainPresDrop"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldFiltratePipingPressure[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltratePipingPressure[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldFiltratePipingPressure[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltratePipingPressure[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="integraPacFiltrationPreDrop"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldStrainerPressure[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldStrainerPressure[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldStrainerPressure[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldStrainerPressure[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="backwashPipingPreDrop"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldBackwashPipingPressureDrop[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashPipingPressureDrop[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldBackwashPipingPressureDrop[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashPipingPressureDrop[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="cIPPipingPreDrop"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldCIPPipingPressureDrop[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPPipingPressureDrop[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldCIPPipingPressureDrop[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPPipingPressureDrop[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="backwash_Filtration"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldBackwashTMPIncrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashTMPIncrease[0]?.minValue,unit.selectedUnits[3],"bar").toFixed(2);
      const maxRange=unit.selectedUnits[3]==="bar"?fieldBackwashTMPIncrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashTMPIncrease[0]?.maxValue,unit.selectedUnits[3],"bar").toFixed(2);
      return [minRange,maxRange];
    }
    if(field=="acidCEB_Filtration"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldAcidCEBTMPIncrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAcidCEBTMPIncrease[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldAcidCEBTMPIncrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAcidCEBTMPIncrease[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="alkaliCEB_Filtration"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldAlkaliCEBTMPincrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAlkaliCEBTMPincrease[0]?.minValue,unit.selectedUnits[3],"bar");
      const maxRange=unit.selectedUnits[3]==="bar"?fieldAlkaliCEBTMPincrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAlkaliCEBTMPincrease[0]?.maxValue,unit.selectedUnits[3],"bar");
      return [minRange,maxRange];
    }
    if(field=="cIP_Filtration"){
      const minRange=unit.selectedUnits[3]==="bar"?fieldCIPTMPincrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPTMPincrease[0]?.minValue,unit.selectedUnits[3],"bar").toFixed(2);
      const maxRange=unit.selectedUnits[3]==="bar"?fieldCIPTMPincrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPTMPincrease[0]?.maxValue,unit.selectedUnits[3],"bar").toFixed(2);
      return [minRange,maxRange];
    }
    if(field=="pLCPowerReqPertrain"){
      const minRange=unit.selectedUnits[9]==="kW"?fieldPLCPowerRequirementperTrain[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldPLCPowerRequirementperTrain[0]?.minValue,unit.selectedUnits[9],"kW");
      const maxRange=unit.selectedUnits[9]==="kW"?fieldPLCPowerRequirementperTrain[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldPLCPowerRequirementperTrain[0]?.maxValue,unit.selectedUnits[9],"kW");
      return [minRange,maxRange];
    }
    if(field=="volvePowerReqPerTrain"){
      const minRange=unit.selectedUnits[9]==="kW"?fieldValvePowerRequirementsperValve[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldValvePowerRequirementsperValve[0]?.minValue,unit.selectedUnits[9],"kW");
      const maxRange=unit.selectedUnits[9]==="kW"?fieldValvePowerRequirementsperValve[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldValvePowerRequirementsperValve[0]?.maxValue,unit.selectedUnits[9],"kW");
      return [minRange,maxRange];
    }
  };
  return (
    <>
      <AdditionalSettingStyled className="g-0">
        <div className="first-card-wrapper">
          <StyledCard className="pressure-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Pressure"
              />
              <IconWithTooltip
                label="Provide typical values for filtrate pressure, air pressure, and piping pressure drops"
                icon={<InfoIcon />}
              />
            </Card.Header>
            {pressureData.map((item, index) => (
              <div key={index} className={item.className}>
                {item.calcInput ? (
                  <>
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      className=""
                      label={item.label}
                    />
                    <CalcEngineInputBox
                      className="pressureCalc"
                      name={item.value}
                      type="number"
                      disabled={item.disabled}
                      inputText={unit.selectedUnits[3]== "bar" ? "Bar" :unit.selectedUnits[3]}
                      // inputText={
                      //   item.name[0].uom == "bar" ? "Bar" : item.name[0].uom
                      // }
                      id={item.id}
                      placeholder="0.0"
                      // defaultValue={item.name[0].defaultValue}
                      value={
                        isFocused === item.id
                          ? ufStore[item.value]
                          : Number(ufStore[item.value]).toFixed(2)
                      }
                      onChange={handleInputChange}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      isFocused={isFocused === item.id}
                      onBlur={(e) => handleBlur(e, item.name[0], item.label)}
                      onFocus={() => handleFocus(item.id)}
                      // isError={
                      //   ufStore[item.value] < item.name[0]?.minValue ||
                      //   ufStore[item.value] > item.name[0]?.maxValue
                      //     ? true
                      //     : false
                      // }
                      
                      isError={
                        ufStore[item.value] < unitValidations(item.value)[0] ||
                        ufStore[item.value] > unitValidations(item.value)[1]
                          ? true
                          : false
                      }
                      isAutoPopulated={item.isAutoPopulated}
                    />
                  </>
                ) : (
                  <>
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label={item.label}
                    />
                    <InputWithText
                      className="pressure"
                      name={item.value}
                      type="number"
                      disabled={item.disabled}
                      inputText={unit.selectedUnits[3]== "bar" ? "Bar" :unit.selectedUnits[3]}
                      id={item.id}
                      placeholder="0.0"
                      // defaultValue={item.name[0].defaultValue}
                      value={
                        isFocused === item.id
                          ? ufStore[item.value]
                          : Number(ufStore[item.value]).toFixed(2)
                      }
                      onChange={handleInputChange}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      isFocused={isFocused === item.id}
                      onBlur={(e) => handleBlur(e, item.name[0], item.label)}
                      onFocus={() => handleFocus(item.id)}
                      isError={
                        ufStore[item.value] < unitValidations(item.value)[0] ||
                        ufStore[item.value] > unitValidations(item.value)[1]
                          ? true
                          : false
                      }
                      // isError={
                      //   ufStore[item.value] < (unit.selectedUnits[3]==="bar"?item.name[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,item.name[0]?.minValue,unit.selectedUnits[3],"bar")).toFixed(2) ||
                      //   ufStore[item.value] > (unit.selectedUnits[3]==="bar"?item.name[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,item.name[0]?.maxValue,unit.selectedUnits[3],"bar")).toFixed(2)
                      //     ? true
                      //     : false
                      // }
                      // isError={
                      //   ufStore[item.value] < item.name[0]?.minValue ||
                      //   ufStore[item.value] > item.name[0]?.maxValue
                      //     ? true
                      //     : false
                      // }
                    />
                  </>
                )}
                {/* {item.name[0].label!=="Maximum ADBW Air Pressure"?<InputReferenceText
                  refText={`Ranges ${item.name[0]?.minValue} - ${item.name[0]?.maxValue}`}
                />:<></>} */}
                {item.name[0].label!=="Maximum ADBW Air Pressure"?<InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[3]==="bar"?item.name[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,item.name[0]?.minValue,unit.selectedUnits[3],"bar")?.toFixed(2)} - ${unit.selectedUnits[3]==="bar"?item.name[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,item.name[0]?.maxValue,unit.selectedUnits[3],"bar")?.toFixed(2)}`}
                  />:<></>}
              </div>
            ))}
            <div>
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Pressure drops are based on user inputs. Default values should not be used for pump sizing"
              />
            </div>
          </StyledCard>
          <StyledCard className="filtration-tmp-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Filtration TMP Increase Between Processes"
              />
              <IconWithTooltip
                label="If rate of TMP increase between cleanings is known, will be used to estimate TMP of fouled membranes."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="two-input-wrapper">
              <div className="backwash">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Backwash"
                />
                <InputWithText
                  name="backwash_Filtration"
                  type="number"
                  disabled={false}
                  inputText={unit.selectedUnits[3]== "bar" ? "mbar/h" :unit.selectedUnits[3]== "psi" ?"psi/1000h":unit.selectedUnits[3]}
                  // inputText={
                  //   fieldBackwashTMPIncrease[0].uom == "bar/hr"
                  //     ? "mbar/h"
                  //     : fieldBackwashTMPIncrease[0].uom
                  // }
                  id="backwashInput"
                  placeholder="0.0"
                  // defaultValue={Number(fieldBackwashTMPIncrease[0].defaultValue).toFixed(1)}
                  value={isFocused === "back"?ufStore["backwash_Filtration"]:Number(ufStore["backwash_Filtration"]).toFixed(1)} 
                  // value={ufStore["backwash_Filtration"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "back"}
                  onBlur={(e) =>
                    handleBlur(e, fieldBackwashTMPIncrease[0], "Backwash")
                  }
                  onFocus={() => handleFocus("back")}
                  isError={
                    ufStore.backwash_Filtration <
                    unitValidations("backwash_Filtration")[0] ||
                    ufStore.backwash_Filtration >
                    unitValidations("backwash_Filtration")[1]
                      ? true
                      : false
                  }
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldBackwashTMPIncrease[0]?.minValue} - ${fieldBackwashTMPIncrease[0]?.maxValue}`}
                /> */}
                <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[3]==="bar"?fieldBackwashTMPIncrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashTMPIncrease[0]?.minValue,unit.selectedUnits[3],"bar")?.toFixed(2)} - ${unit.selectedUnits[3]==="bar"?fieldBackwashTMPIncrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashTMPIncrease[0]?.maxValue,unit.selectedUnits[3],"bar")?.toFixed(2)}`}
                  />
              </div>
              <div className="acid-ceb">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Acid CEB"
                />
                <InputWithText
                  name="acidCEB_Filtration"
                  type="number"
                  disabled={false}
                  inputText={unit.selectedUnits[3]== "bar" ? "mbar/h" :unit.selectedUnits[3]== "psi" ?"psi/1000h":unit.selectedUnits[3]}
                  // inputText={
                  //   fieldAcidCEBTMPIncrease[0].uom == "bar/hr"
                  //     ? "mbar/h"
                  //     : fieldAcidCEBTMPIncrease[0].uom
                  // }
                  id="acidInput"
                  placeholder="0.0"
                  // defaultValue={fieldAcidCEBTMPIncrease[0].defaultValue}
                  value={isFocused === "acid"?ufStore["acidCEB_Filtration"]:Number(ufStore["acidCEB_Filtration"]).toFixed(1)} 
                  // value={ufStore["acidCEB_Filtration"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "acid"}
                  onBlur={(e) =>
                    handleBlur(e, fieldAcidCEBTMPIncrease[0], "Acid CEB")
                  }
                  onFocus={() => handleFocus("acid")}
                  isError={
                    ufStore.acidCEB_Filtration <
                    unitValidations("acidCEB_Filtration")[0] ||
                    ufStore.acidCEB_Filtration >
                    unitValidations("acidCEB_Filtration")[1]
                      ? true
                      : false
                  }
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldAcidCEBTMPIncrease[0]?.minValue} - ${fieldAcidCEBTMPIncrease[0]?.maxValue}`}
                /> */}
                <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[3]==="bar"?fieldAcidCEBTMPIncrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAcidCEBTMPIncrease[0]?.minValue,unit.selectedUnits[3],"bar")?.toFixed(2)} - ${unit.selectedUnits[3]==="bar"?fieldAcidCEBTMPIncrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAcidCEBTMPIncrease[0]?.maxValue,unit.selectedUnits[3],"bar")?.toFixed(2)}`}
                  />
              </div>
            </div>
            <div className="two-input-wrapper">
              <div>
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Mini-CIP"
                />
                <CalcEngineInputBox
                  name="miniCIP_Filtration"
                  type="number"
                  disabled={true}
                  inputText={unit.selectedUnits[3]== "bar" ? "mbar/h" :unit.selectedUnits[3]== "psi" ?"psi/1000h":unit.selectedUnits[3]}
                  // inputText={
                  //   fieldCIPTMPincrease[0].uom == "bar/hr"
                  //     ? "mbar/h"
                  //     : fieldCIPTMPincrease[0].uom
                  // }
                  id="miniCipInput"
                  placeholder="0.0"
                  // defaultValue={fieldMiniCIP[0].defaultValue}
                  // value={ufStore["miniCIP_Filtration"]}
                  defaultValue={Number(ufStore["miniCIP_Filtration"]).toFixed(
                    2
                  )}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "miniCip"}
                  onBlur={(e) =>
                    handleBlur(e, fieldCIPTMPincrease[0], "Mini-CIP")
                  }
                  onFocus={() => handleFocus("miniCip")}
                  // isError={(ufStore.miniCIP_Filtration < fieldMiniCIP[0]?.minValue || ufStore.miniCIP_Filtration > fieldMiniCIP[0]?.maxValue ? true : false)}
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldCIPTMPincrease[0]?.minValue} - ${fieldCIPTMPincrease[0]?.maxValue}`}
                /> */}
              </div>
              <div>
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Alkali CEB"
                />
                <InputWithText
                  name="alkaliCEB_Filtration"
                  type="number"
                  disabled={false}
                  // inputText={
                  //   fieldAlkaliCEBTMPincrease[0].uom == "bar/hr"
                  //     ? "mbar/h"
                  //     : fieldAlkaliCEBTMPincrease[0].uom
                  // }
                  inputText={unit.selectedUnits[3]== "bar" ? "mbar/h" :unit.selectedUnits[3]== "psi" ?"psi/1000h":unit.selectedUnits[3]}
                  id="alkaliCebInput"
                  placeholder="0.0"
                  // defaultValue={fieldAlkaliCEBTMPincrease[0].defaultValue}
                  // value={ufStore["alkaliCEB_Filtration"]}
                  value={isFocused === "alkali"?ufStore["alkaliCEB_Filtration"]:Number(ufStore["alkaliCEB_Filtration"]).toFixed(1)} 
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "alkali"}
                  onBlur={(e) =>
                    handleBlur(e, fieldAlkaliCEBTMPincrease[0], "Alkali CEB")
                  }
                  onFocus={() => handleFocus("alkali")}
                  isError={
                    ufStore.alkaliCEB_Filtration <
                    unitValidations("alkaliCEB_Filtration")[0] ||
                    ufStore.alkaliCEB_Filtration >
                    unitValidations("alkaliCEB_Filtration")[1]
                      ? true
                      : false
                  }
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldAlkaliCEBTMPincrease[0]?.minValue} - ${fieldAlkaliCEBTMPincrease[0]?.maxValue}`}
                /> */}
                <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[3]==="bar"?fieldAlkaliCEBTMPincrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAlkaliCEBTMPincrease[0]?.minValue,unit.selectedUnits[3],"bar")?.toFixed(2)} - ${unit.selectedUnits[3]==="bar"?fieldAlkaliCEBTMPincrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAlkaliCEBTMPincrease[0]?.maxValue,unit.selectedUnits[3],"bar")?.toFixed(2)}`}
                />
              </div>
            </div>
            <div>
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="CIP"
              />
              <InputWithText
                className="widthCIP"
                name="cIP_Filtration"
                type="number"
                disabled={false}
                // inputText={
                //   fieldCIPTMPincrease[0].uom == "bar/hr"
                //     ? "mbar/h"
                //     : fieldCIPTMPincrease[0].uom
                // }
                inputText={unit.selectedUnits[3]== "bar" ? "mbar/h" :unit.selectedUnits[3]== "psi" ?"psi/1000h":unit.selectedUnits[3]}
                id="cipInput"
                placeholder="0.0"
                // defaultValue={fieldCIPTMPincrease[0].defaultValue}
                // value={ufStore["cIP_Filtration"]}
                value={isFocused === "cip"?ufStore["cIP_Filtration"]:Number(ufStore["cIP_Filtration"]).toFixed(1)} 
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "cip"}
                onBlur={(e) => handleBlur(e, fieldCIPTMPincrease[0], "CIP")}
                onFocus={() => handleFocus("cip")}
                isError={
                  ufStore.cIP_Filtration <
                  unitValidations("cIP_Filtration")[0] ||
                  ufStore.cIP_Filtration >
                  unitValidations("cIP_Filtration")[1]
                    ? true
                    : false
                }
              />
              {/* <InputReferenceText
                refText={`Ranges ${fieldCIPTMPincrease[0]?.minValue} - ${fieldCIPTMPincrease[0]?.maxValue}`}
              /> */}
              <InputReferenceText
                refText={`Ranges ${unit.selectedUnits[3]==="bar"?fieldCIPTMPincrease[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPTMPincrease[0]?.minValue,unit.selectedUnits[3],"bar")?.toFixed(2)} - ${unit.selectedUnits[3]==="bar"?fieldCIPTMPincrease[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCIPTMPincrease[0]?.maxValue,unit.selectedUnits[3],"bar")?.toFixed(2)}`}
              />
            </div>
          </StyledCard>
        </div>
        <div className="second-card-wrapper">
          <StyledCard className="tank-storage-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Tank Storage Parameters"
              />
              <IconWithTooltip
                label="To estimate size of chemical storage tanks required, provide number of days of storage required."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="chemical-storage-time">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Chemical Storage Time"
              />
              <InputWithText
                className="widthChanges"
                name="chemicalStorageTime"
                type="number"
                disabled={false}
                inputText="Days"
                id="chemStTime"
                placeholder="0.0"
                // defaultValue={fieldChemicalStorageTime[0].defaultValue}
                value={ufStore["chemicalStorageTime"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "chem"}
                onBlur={(e) =>
                  handleBlur(
                    e,
                    fieldChemicalStorageTime[0],
                    "Chemical Storage Time"
                  )
                }
                onFocus={() => handleFocus("chem")}
                isError={
                  ufStore.chemicalStorageTime <
                    fieldChemicalStorageTime[0]?.minValue ||
                  ufStore.chemicalStorageTime >
                    fieldChemicalStorageTime[0]?.maxValue
                    ? true
                    : false
                }
              />
              <InputReferenceText
                refText={`Ranges ${fieldChemicalStorageTime[0]?.minValue.toFixed(2)} - ${fieldChemicalStorageTime[0]?.maxValue.toFixed(2)}`}
              />
            </div>
            <div className="refill-rate">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Backwash Only Tank Refill Rate"
              />
              <CalcEngineInputBox
                className="widthChanges"
                name="bWTankRefillRate"
                type="number"
                disabled={false}
                inputText={
                  fieldBackwashOnlyTankRefillRate[0].uom == "%"
                    ? "% of filtrate flow"
                    : fieldBackwashOnlyTankRefillRate[0].uom
                }
                id="refillRate"
                placeholder="0.0"
                value={ufStore["bWTankRefillRate"]}
                // defaultValue={Number(fieldBackwashOnlyTankRefillRate[0].defaultValue).toFixed(1)}
                // value={Number(ufStore["bWTankRefillRate"]).toFixed(1)}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "refill"}
                onBlur={(e) =>
                  handleBlur(
                    e,
                    fieldBackwashOnlyTankRefillRate[0],
                    "Backwash Only Tank Refill Rate"
                  )
                }
                onFocus={() => handleFocus("refill")}
                isError={
                  ufStore.bWTankRefillRate <
                    fieldBackwashOnlyTankRefillRate[0]?.minValue ||
                  ufStore.bWTankRefillRate >
                    fieldBackwashOnlyTankRefillRate[0]?.maxValue
                    ? true
                    : false
                }
              />
              <InputReferenceText
                refText={`Ranges ${fieldBackwashOnlyTankRefillRate[0]?.minValue.toFixed(2)} - ${fieldBackwashOnlyTankRefillRate[0]?.maxValue.toFixed(2)}`}
              />
            </div>
          </StyledCard>
          <StyledCard className="tank-size-factor-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Tank Size Factor"
              />
              <IconWithTooltip
                label="To estimate size of filtrate, BW, and CIP tanks, provide safety factor to be applied to tank volume."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="bw-plus">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="BW + Filtrate Tank"
              />
              <CalcEngineInputBox
                className="widthChanges"
                name="filterateTank"
                type="number"
                disabled={false}
                inputText="% of computed minimum"
                id="bw"
                placeholder="0.0"
                defaultValue={fieldTankSizeFactorBF[0].defaultValue}
                value={ufStore["filterateTank"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "bw"}
                onBlur={(e) =>
                  handleBlur(e, fieldTankSizeFactorBF[0], "BW + Filtrate Tank")
                }
                onFocus={() => handleFocus("bw")}
                //isError={(ufStore.filterateTank < fieldTankSizeFactorBF[0]?.minValue || ufStore.filterateTank > fieldTankSizeFactorBF[0]?.maxValue ? true : false)}
              />
              <InputReferenceText
                refText={`Ranges ${fieldTankSizeFactorBF[0]?.minValue.toFixed(2)} - ${fieldTankSizeFactorBF[0]?.maxValue.toFixed(2)}`}
              />
            </div>
            <div className="bw-only">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="BW Only Tank"
              />
              <CalcEngineInputBox
                className="widthChanges"
                name="bWTank"
                type="number"
                disabled={false}
                inputText="% of computed minimum"
                id="bwOnly"
                placeholder="0.0"
                defaultValue={fieldTankSizeFactorB[0].defaultValue}
                value={ufStore["bWTank"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "bwOnly"}
                onBlur={(e) =>
                  handleBlur(e, fieldTankSizeFactorB[0], "BW Only Tank")
                }
                onFocus={() => handleFocus("bwOnly")}
                isError={
                  ufStore.bWTank < fieldTankSizeFactorB[0]?.minValue ||
                  ufStore.bWTank > fieldTankSizeFactorB[0]?.maxValue
                    ? true
                    : false
                }
              />
              <InputReferenceText
                refText={`Ranges ${fieldTankSizeFactorB[0]?.minValue.toFixed(2)} - ${fieldTankSizeFactorB[0]?.maxValue.toFixed(2)}`}
              />
            </div>
            <div className="cip-tank">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="CIP Tank"
              />
              <InputWithText
                className="widthChanges"
                name="cIPTank"
                type="number"
                disabled={false}
                inputText="% of module volume"
                id="cipTank"
                placeholder="0.0"
                defaultValue={fieldTankSizeFactorCIP[0].defaultValue}
                value={ufStore["cIPTank"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "cipTank"}
                onBlur={(e) =>
                  handleBlur(e, fieldTankSizeFactorCIP[0], "CIP Tank")
                }
                onFocus={() => handleFocus("cipTank")}
                isError={
                  ufStore.cIPTank < fieldTankSizeFactorCIP[0]?.minValue ||
                  ufStore.cIPTank > fieldTankSizeFactorCIP[0]?.maxValue
                    ? true
                    : false
                }
              />
              <InputReferenceText
                refText={`Ranges ${fieldTankSizeFactorCIP[0]?.minValue.toFixed(2)} - ${fieldTankSizeFactorCIP[0]?.maxValue.toFixed(2)}`}
              />
            </div>
          </StyledCard>
          <StyledCard className="displacement-volume-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Displacement Volumes"
              />
              <IconWithTooltip
                label="Provide volumes associated with the Memcor air driven backwash protocol"
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="two-input-wrapper">
              <div>
                <CustomLabel
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="ADBW Displacement"
                  disabled={true}
                />
                <InputWithText
                  name="aDBWDisplacement"
                  type="number"
                  disabled={true}
                  inputText={fieldADBWDisplacement[0].uom}
                  id="adbw"
                  placeholder="0.0"
                  defaultValue={fieldADBWDisplacement[0].defaultValue}
                  value={ufStore["aDBWDisplacement"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "adbw"}
                  onBlur={(e) =>
                    handleBlur(e, fieldADBWDisplacement[0], "ADBW Displacement")
                  }
                  onFocus={() => handleFocus("adbw")}
                  // isError={(ufStore.aDBWDisplacement < fieldADBWDisplacement[0]?.minValue || ufStore.aDBWDisplacement > fieldADBWDisplacement[0]?.maxValue ? true : false)}
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldADBWDisplacement[0]?.minValue} - ${fieldADBWDisplacement[0]?.maxValue}`}
                /> */}
              </div>
              <div>
                <CustomLabel
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="FTL Displacement"
                  disabled={true}
                />
                <InputWithText
                  name="fTLDisplacement"
                  type="number"
                  disabled={true}
                  inputText={fieldFTLDisplacement[0].uom}
                  id="ftl"
                  placeholder="0.0"
                  defaultValue={fieldFTLDisplacement[0].defaultValue}
                  value={ufStore["fTLDisplacement"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "ftl"}
                  onBlur={(e) =>
                    handleBlur(e, fieldFTLDisplacement[0], "FTL Displacement")
                  }
                  onFocus={() => handleFocus("ftl")}
                  // isError={(ufStore.fTLDisplacement < fieldFTLDisplacement[0]?.minValue || ufStore.fTLDisplacement > fieldFTLDisplacement[0]?.maxValue ? true : false)}
                />
                {/* <InputReferenceText
                  refText={`Ranges ${fieldFTLDisplacement[0]?.minValue} - ${fieldFTLDisplacement[0]?.maxValue}`}
                /> */}
              </div>
            </div>
          </StyledCard>
          <StyledCard className="strainer-specification-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Strainer Specification"
              />
              <IconWithTooltip
                label="Provide size specification and recovery of strainer installed on feed to UF system."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="two-input-wrapper">
              <div>
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Strainer Recovery"
                />
                <InputWithText
                  name="strainerRecovery"
                  type="number"
                  disabled={false}
                  inputText={fieldStrainerRecovery[0].uom}
                  id="strainerR"
                  placeholder="0.0"
                  defaultValue={fieldStrainerRecovery[0].defaultValue}
                  value={ufStore["strainerRecovery"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "strainerR"}
                  onBlur={(e) =>
                    handleBlur(e, fieldStrainerRecovery[0], "Strainer Recovery")
                  }
                  onFocus={() => handleFocus("strainerR")}
                  isError={
                    ufStore.strainerRecovery <
                      fieldStrainerRecovery[0]?.minValue ||
                    ufStore.strainerRecovery >
                      fieldStrainerRecovery[0]?.maxValue
                      ? true
                      : false
                  }
                />
                {/* <InputReferenceText refText="Lorem ipsum dolor sit amet," /> */}
                <InputReferenceText
                  refText={`Ranges ${fieldStrainerRecovery[0]?.minValue.toFixed(2)} - ${fieldStrainerRecovery[0]?.maxValue.toFixed(2)}`}
                />
              </div>
              <div>
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Strainer Size"
                />
                <InputWithText
                  name="strainerSize"
                  type="number"
                  disabled={false}
                  inputText={fieldStrainerSize[0].uom}
                  id="strainerS"
                  placeholder="0.0"
                  defaultValue={fieldStrainerSize[0].defaultValue}
                  value={ufStore["strainerSize"]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === "strainerS"}
                  onBlur={(e) =>
                    handleBlur(e, fieldStrainerSize[0], "Strainer Size")
                  }
                  onFocus={() => handleFocus("strainerS")}
                  isError={
                    ufStore.strainerSize < fieldStrainerSize[0]?.minValue ||
                    ufStore.strainerSize > fieldStrainerSize[0]?.maxValue
                      ? true
                      : false
                  }
                />
                {/* <InputReferenceText refText="Greater than 0 disappears flowrate selections below" /> */}
                <InputReferenceText
                  refText={`Ranges ${fieldStrainerSize[0]?.minValue.toFixed(2)} - ${fieldStrainerSize[0]?.maxValue.toFixed(2)}`}
                />
              </div>
            </div>
          </StyledCard>
        </div>
        <div className="third-card-wrapper">
          <StyledCard className="power-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Power"
              />
              <IconWithTooltip
                label="Provide power consumption by PLC and instrumentation, as well as used in by each valve."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="plc-power">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="PLC Power Requirement per Train"
              />
              <InputWithText
                className="widthChanges"
                name="pLCPowerReqPertrain"
                type="number"
                disabled={false}
                inputText={unit.selectedUnits[9]}
                // inputText={fieldPLCPowerRequirementperTrain[0].uom}
                id="plcPower"
                placeholder="0.0"
                // defaultValue={fieldPLCPowerRequirementperTrain[0].defaultValue}
                value={isFocused === "plcPower"?ufStore["pLCPowerReqPertrain"]:Number(ufStore["pLCPowerReqPertrain"]).toFixed(2)} 
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "plcPower"}
                onBlur={(e) =>
                  handleBlur(
                    e,
                    fieldPLCPowerRequirementperTrain[0],
                    "PLC Power Requirement per Train"
                  )
                }
                onFocus={() => handleFocus("plcPower")}
                isError={
                  ufStore.pLCPowerReqPertrain <
                  unitValidations("pLCPowerReqPertrain")[0] ||
                  ufStore.pLCPowerReqPertrain >
                  unitValidations("pLCPowerReqPertrain")[1]
                    ? true
                    : false
                }
              />
              {/* <InputReferenceText
                refText={`Ranges ${fieldPLCPowerRequirementperTrain[0]?.minValue} - ${fieldPLCPowerRequirementperTrain[0]?.maxValue}`}
              /> */}
              <InputReferenceText
                refText={`Ranges ${unit.selectedUnits[9]==="kW"?fieldPLCPowerRequirementperTrain[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldPLCPowerRequirementperTrain[0]?.minValue,unit.selectedUnits[9],"kW")?.toFixed(2)} - ${unit.selectedUnits[9]==="kW"?fieldPLCPowerRequirementperTrain[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldPLCPowerRequirementperTrain[0]?.maxValue,unit.selectedUnits[9],"kW")?.toFixed(2)}`}
              />
            </div>
            <div className="valve-power">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Valve Power Requirement per Valve"
              />
              <InputWithText
                className="widthChanges"
                name="volvePowerReqPerTrain"
                type="number"
                disabled={false}
                inputText={unit.selectedUnits[9]}
                // inputText={fieldValvePowerRequirementsperValve[0].uom}
                id="valvePower"
                placeholder="0.0"
                // defaultValue={
                //   fieldValvePowerRequirementsperValve[0].defaultValue
                // }
                value={isFocused === "valvePower"?ufStore["volvePowerReqPerTrain"]:Number(ufStore["volvePowerReqPerTrain"]).toFixed(2)}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "valvePower"}
                onBlur={(e) =>
                  handleBlur(
                    e,
                    fieldValvePowerRequirementsperValve[0],
                    "Valve Power Requirement per Valve"
                  )
                }
                onFocus={() => handleFocus("valvePower")}
                isError={
                  ufStore.volvePowerReqPerTrain <
                  unitValidations("volvePowerReqPerTrain")[0] ||
                  ufStore.volvePowerReqPerTrain >
                  unitValidations("volvePowerReqPerTrain")[1]
                    ? true
                    : false
                }
              />
              {/* <InputReferenceText
                refText={`Ranges ${fieldValvePowerRequirementsperValve[0]?.minValue} - ${fieldValvePowerRequirementsperValve[0]?.maxValue}`}
              /> */}
              <InputReferenceText
                refText={`Ranges ${unit.selectedUnits[9]==="kW"?fieldValvePowerRequirementsperValve[0]?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldValvePowerRequirementsperValve[0]?.minValue,unit.selectedUnits[9],"kW")?.toFixed(2)} - ${unit.selectedUnits[9]==="kW"?fieldValvePowerRequirementsperValve[0]?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldValvePowerRequirementsperValve[0]?.maxValue,unit.selectedUnits[9],"kW")?.toFixed(2)}`}
              />
            </div>
          </StyledCard>
          <StyledCard className="valves-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Valves"
              />
              <IconWithTooltip
                label="Provide timings associated with rotating valves, turning pumps on and off, and hold times."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="valves-per-unit">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Valves per Unit"
              />
              <CustomInput
                className="pressureCalc"
                name="valvesPerTrain"
                type="number"
                defaultValue={fieldValvesPerUnit[0].defaultValue}
                value={ufStore["valvesPerTrain"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "valvesPerTrain"}
                onBlur={(e) =>
                  handleBlur(e, fieldValvesPerUnit[0], "Valves per Unit")
                }
                onFocus={() => handleFocus("valvesPerTrain")}
                isError={
                  ufStore.valvesPerTrain < fieldValvesPerUnit[0]?.minValue ||
                  ufStore.valvesPerTrain > fieldValvesPerUnit[0]?.maxValue
                    ? true
                    : false
                }
                placeholder="0.00"
                id="valvesPerUnit"
              />
              <InputReferenceText
                refText={`Ranges ${fieldValvesPerUnit[0]?.minValue.toFixed(2)} - ${fieldValvesPerUnit[0]?.maxValue.toFixed(2)}`}
              />
            </div>
            <div className="valve-open">
              <CustomHeading
                fontFamily="DiodrumRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.Black}
                label="Valve Open/Close Action Duration"
              />
              <InputWithText
                className="pressureCalc"
                name="valveOpenCloseDuration"
                type="number"
                inputText={
                  fieldValveOpenCloseActionDuration?.uom == "s"
                    ? "Sec"
                    : fieldValveOpenCloseActionDuration?.uom
                }
                value={ufStore["valveOpenCloseDuration"]}
                // value={ufStore["valveOpenCloseDuration"]}
                onChange={handleInputChange}
                onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                onWheel={(e)=>e.target.blur()}
                isFocused={isFocused === "valveOpenCloseDuration"}
                onBlur={(e) =>
                  handleBlur(
                    e,
                    fieldValveOpenCloseActionDuration,
                    "Valve Open/Close Action Duration"
                  )
                }
                onFocus={() => handleFocus("valveOpenCloseDuration")}
                isError={
                  ufStore.valveOpenCloseDuration <
                    fieldValveOpenCloseActionDuration?.minValue ||
                  ufStore.valveOpenCloseDuration >
                    fieldValveOpenCloseActionDuration?.maxValue
                    ? true
                    : false
                }
                placeholder="0.00"
                id="valve-open"
              />
              <InputReferenceText
                refText={`Ranges ${fieldValveOpenCloseActionDuration?.minValue.toFixed(2)} - ${fieldValveOpenCloseActionDuration?.maxValue.toFixed(2)}`}
              />
            </div>
            {valveData.map((item, index) => (
              <div key={index} className={item.className}>
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label={item.label}
                />
                <InputWithText
                  className="pressureCalc"
                  name={item.value}
                  type="number"
                  disabled={false}
                  inputText={item.name[0].uom == "s" ? "Sec" : item.name[0].uom}
                  id={item.className}
                  placeholder="0.0"
                  // defaultValue={item.name[0].defaultValue}
                  value={ufStore[item.value]}
                  onChange={handleInputChange}
                  onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                  onWheel={(e)=>e.target.blur()}
                  isFocused={isFocused === item.className}
                  onBlur={(e) => handleBlur(e, item.name[0], item.label)}
                  onFocus={() => handleFocus(item.className)}
                  isError={
                    ufStore[item.value] < item.name[0]?.minValue ||
                    ufStore[item.value] > item.name[0]?.maxValue
                      ? true
                      : false
                  }
                />
                <InputReferenceText
                  refText={`Ranges ${item.name[0]?.minValue.toFixed(2)} - ${item.name[0]?.maxValue.toFixed(2)}`}
                />
              </div>
            ))}
          </StyledCard>
          <StyledCard className="mem-flow-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Memcor Flows"
              />
              <IconWithTooltip
                label="Provide flow rates associated with the Memcor air driven backwash protocol"
                icon={<InfoIcon />}
              />
            </Card.Header>
            {memCorData.map((item, index) => (
              <div key={index} className={item.className}>
                <CustomLabel
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label={item.label}
                  disabled={item.disabled}
                />
                <InputWithText
                  className="memcorWidth"
                  type="number"
                  disabled={item.disabled}
                  inputText={item.inputText}
                  id="plcPower"
                  placeholder={item.placeholder}
                  value={item.defaultValue.toFixed(2)}
                  // value={ufStore[item.value]}
                  isFocused={isFocused === item.id}
                  onBlur={(e) => handleBlur(e, item.name[0], item.label)}
                  onFocus={() => handleFocus(item.id)}
                  isError={false}
                />
              </div>
            ))}
          </StyledCard>
        </div>
        {errorOperator.show && (
          <ProjectErrorPopup
            show={errorOperator.show}
            close={closeErrorMessag}
            message={errorOperator.message}
          />
        )}
      </AdditionalSettingStyled>
    </>
  );
};

export default AdditionalSetting;
