/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col } from "react-bootstrap";

import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import WarningMessage from "../../../common/styles/components/headings/WarningMessage";
import UFSystemDesignDiagram from "./UFSystemDesignDiagram";
import UFProductGuidelines from "./UFProductGuidelines";
import ChemicalAdjustment from "./ChemicalAdjustment";

import { colors } from "../../../common/styles/Theme";
import ArrowRightBlackIcon from "../../../common/icons/ArrowRightBlackIcon";
import InfoIcon from "../../../common/icons/InfoIcon";
import PlusIcon from "../../../common/icons/PlusIcon";

import {
  updateUFStore,
  updateDesignData,
  setCustomOfflineTimePerUnit,
  updateIsForDrinkingWater,
  updateActiveUFModule,
  updateUFDefaultInputRangeConfig,
  setCustomAvail,
  setUfDataUpdate,
} from "../uf/UFSlice";

import DesignStyled from "./DesignStyled";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const Design = () => {
  const dispatch = useDispatch();
  const UFStore = useSelector((state) => state.UFStore);
  const UFData = useSelector((state) => state.UFStore.data);
  const feedWater_StreamStore = useSelector(
    (state) => state.Feedsetupdetailsdatapanel
  );
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);

  const StreamStoreData = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData.lstrequestsavefeedwater[0]
        ?.streams[0]
  );
  const { feedFlowRate, productFlowRate, feedWaterData, selectedEndNode } =
    useSelector((state) => state.processDiagramSlice);
  const tempDesign = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  // const selectedUFModule = useSelector((state) => state.UFStore.activeUFModule);
  const defaultInputRangeConfig = useSelector(
    (state) => state.UFStore.defaultInputRangeConfig
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const unitType = useSelector((state) => state.GUnitConversion.unitTypeFlux);


  const { tempMin = "" } =
    (feedWater_StreamStore && feedWater_StreamStore?.data[0]) || {};
  const { waterSubTypeID } = StreamStoreData;
  const flowRateSelected = selectedEndNode == "startNode" ? "Feed" : "Product";
  const flowRateValueSelected =
    flowRateSelected == "Feed" ? feedFlowRate : productFlowRate;
  const {
    ufTechnologies,
    ufModules,
    ufInputRangeConfig,
    ufFluxGuideline,
    ufModuleFlowVM,
    ufModulePressureRatingVM,
    ufInputRangeConfigByWaterType,
    data,
  } = UFStore;

  const [checked_box, setChecked] = useState(UFStore.isForDrinkingWater);

  const [customValue, setCustomValue] = useState(UFData.offlinetimepertrain);

  const [filteredUFModules, setFilteredUFModuleList] = useState(ufModules);
  const [isFocused, setIsFocused] = useState(null);
  const [openUFGuideline, setOpenUFGuideline] = useState(false);
  const [openChemicalAdjustment, setOpenChemicalAdjustment] = useState(false);
  const [isFieldValid, setIsFieldValid] = useState(false);
  const [message, setMessage] = useState("");
  

  /* Design Instantaneous (Gross) Flux and Flow Rates */
  const fieldFiltrateFlux = defaultInputRangeConfig["filtrateFlux"];
  const fieldBackwashFlux = defaultInputRangeConfig["backwashFlux"];
  const fieldCEBFlux = defaultInputRangeConfig["cEBFlux"];
  const fieldForwardFlush = defaultInputRangeConfig["forwardFlushFlow"];
  const fieldAirFlow = defaultInputRangeConfig["airFlow"];
  const fieldAerationAirFlow = defaultInputRangeConfig["aerationAirFlow"];
  const fieldRecycleFlow = defaultInputRangeConfig["recycleFlowRate"]; //CIP Recycle
  const fieldMiniCIPRecycle =
    defaultInputRangeConfig["recycleFlowRate_MiniCIP"]; //mCIP Recycle
  /* Design Cycle Intervals */
  const fieldFiltrationDuration = defaultInputRangeConfig["backwash_design"];
  const fieldDisInfectionCEB = defaultInputRangeConfig["disinfectionCEB"];
  const fieldAcidCEB = defaultInputRangeConfig["acidCEB"];
  const fieldMiniCIP = defaultInputRangeConfig["miniCIP"];
  const fieldAlkalineCEB = defaultInputRangeConfig["alkaliOxidantCEB"];
  const fieldCIP = defaultInputRangeConfig["cIP"];
  /* Membrane Integrity Testing */
  const fieldOfflineTimePerTrain = {
    defaultValue: 0,
    minValue: 0,
    maxValue: 60,
    softLowerLimit: 2,
    softUpperLimit: 30,
    uom: "min/d",
  };
  const disabledInputs = [
    "Automatic",
    "Aeration Air Flow",
    "Mini-CIP Recycle Flow Rate",
    "mini-CIP",
    "Disinfection CEB",
  ];
  let errfields = {};
  const getModuleDetails = (moduleID) => {
    const selectedModules = ufModules.filter((m) => m.ufmoduleId == moduleID);
    if (selectedModules.length > 0 && selectedModules[0]) {
      const moduleFlowData = ufModuleFlowVM.filter(
        (vfvm) => vfvm.ufmoduleId == moduleID
      );
      const modulePressureData = ufModulePressureRatingVM.filter(
        (pvm) => pvm.ufmoduleID == moduleID
      );
      const flowVM = moduleFlowData.length > 0 ? moduleFlowData[0] : {};
      const pressureRatingVM =
        modulePressureData.length > 0 ? modulePressureData[0] : {};
      const activeModuleDetails = {
        ...selectedModules[0],
        ...flowVM,
        ...pressureRatingVM,
      };
      return activeModuleDetails;
    }
  };
  const getConfigForFiltrateFlux = (moduleSelected) => {
    console.log("*********** FF Debug : Design :  getConfigForFiltrateFlux : Called : ");
    const filtrateFluxRange = ufFluxGuideline.filter(
      (config) =>
        config.waterSubTypeId == waterSubTypeID &&
        config.moduleType == moduleSelected.moduleType
    );
    if (filtrateFluxRange?.length > 0) {
      const FFMAX =
        filtrateFluxRange[0].maxValue == null
          ? 0
          : filtrateFluxRange[0].maxValue;
      const FFMIN =
        filtrateFluxRange[0].minValue == null
          ? 0
          : filtrateFluxRange[0].minValue;

      let TCF;
      if (tempDesign > 20) {
        TCF = 1;
      } else {
        TCF =
          Math.exp(
            0.023396 * (tempDesign - 25) -
              0.00017260 * Math.pow(tempDesign - 25, 2)
          ) / 0.8858;
      }

      const Default_Corrected = TCF * filtrateFluxRange[0].typicalValue;
      const Filterateflux = Math.max(
        Math.min(Number(Default_Corrected).toFixed(2), FFMAX),
        FFMIN
      );
      console.log("*********** FF Debug :Design: tempDesign : ",tempDesign);
      console.log("*********** FF Debug :Design: moduleType : ",filtrateFluxRange[0].moduleType);
      console.log("*********** FF Debug :Design: waterSubTypeID : ",waterSubTypeID);
      console.log("*********** FF Debug :Design: typicalValue : ", filtrateFluxRange[0].typicalValue);
      console.log("*********** FF Debug :Design: TCF : ", TCF);
      console.log("*********** FF Debug :Design: Default_Corrected computed: ", Default_Corrected);
      console.log(
        "*********** FF Debug : Design :  getConfigForFiltrateFlux : Filterateflux calculated : ",
        Filterateflux
      );

      const filtrateFluxConfig = {
        label: "Filtrate Flux",
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,Filterateflux,unit.selectedUnits[4],"LMH").toFixed(2), //filtrateFluxRange[0]?.typicalValue,
        minValue: filtrateFluxRange[0]?.minValue,
        maxValue: filtrateFluxRange[0]?.maxValue,
        // uom:filtrateFluxRange[0]?.uom==="L/hr/m�"?"L/h/m²":filtrateFluxRange[0]?.uom,
        uom: "L/hr/m²",
        softLowerLimit: "",
        softUpperLimit: "",
        waterSubType: filtrateFluxRange[0]?.waterSubTypeId,
        moduleType: filtrateFluxRange[0]?.moduleType,
      };
      return [{ ...filtrateFluxConfig }];
    } else {
      // console.log(
      //   `No config available for FILTRATE FLUX For waterSubTypeID: ${waterSubTypeID} and moduleType: ${moduleSelected.moduleType}`
      // );
      return [
        {
          label: "Filtrate Flux",
          defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,1,unit.selectedUnits[4],"LMH").toFixed(2),
          minValue: 1,
          maxValue: 100,
          uom: "L/hr/m²",
          softLowerLimit: "",
          softUpperLimit: "",
          waterSubType: "",
        },
      ];
    }
  };
  const getConfigForForwardFlushFlow = (moduleSelected) => {
    const genericRange = ufInputRangeConfig.filter(
      (config) => config.label == "Forward Flush Flow"
    );
    //Calculating ForwardFlowFlow based on the uf module selected and filtrateFlux
    const filtrateFluxRangeConfig = getConfigForFiltrateFlux(moduleSelected);

    const NewFFFlowSL =
      moduleSelected.moduleArea *
      filtrateFluxRangeConfig[0].minValue *
      0.001 *
      0.5;
    const NewFFFlowSU =
      moduleSelected.moduleArea * filtrateFluxRangeConfig[0].maxValue * 0.001;
    const FFFLOWMIN = Math.floor(((NewFFFlowSL * 100) / 25) * 0.25) * 1;
    const FFFLOWMAX = Math.ceil(((NewFFFlowSU * 100) / 25) * 0.25) * 1;
    const FFFlow_min = FFFLOWMIN;
    const FFFlow_max = FFFLOWMAX;
    const FFFlow_default =
      (moduleSelected.moduleArea * filtrateFluxRangeConfig[0].defaultValue) /
      1000;
    const FFFlowRange = [
      {
        ...genericRange[0],
        minValue: FFFlow_min,
        maxValue: FFFlow_max,
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,FFFlow_default,unit.selectedUnits[1],"m³/h").toFixed(2),
      },
    ];
    return FFFlowRange;
  };
  const getConfigForAirFlow = (moduleSelected) => {
    const genericRange_airflow = ufInputRangeConfig.filter(
      (config) => config.label == "Air Flow"
    );
    const airFlow_RangeModuleSelected = [
      {
        ...genericRange_airflow[0],
        minValue: moduleSelected.aS_Flow_min,
        maxValue: moduleSelected.aS_Flow_max,
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,moduleSelected.aS_Flow_std,unit.selectedUnits[18],"Nm³/h").toFixed(2),
      },
    ];
    // console.log("airFlowRange----Design", airFlow_RangeModuleSelected);
    return airFlow_RangeModuleSelected;
  };
  const getConfigForCIP = (moduleSelected) => {
    const genericRange_CIP = ufInputRangeConfig.filter(
      (config) => config.label == "CIP Recycle Flow Rate"
    );
    const CIP_RangeModuleSelected = [
      {
        ...genericRange_CIP[0],
        minValue: moduleSelected.cIP_Flow_min,
        maxValue: moduleSelected.cIP_Flow_max,
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,moduleSelected.cIP_Flow_std,unit.selectedUnits[1],"m³/h").toFixed(2),
      },
    ];
    return CIP_RangeModuleSelected;
  };
  const setModuleBasedInputRangeConfigs = (moduleSelected) => {
    //based on module selection fetching new ranges for FiltrateFlux, AirFlow and CIP Recycle
    const rangeConfigFiltrateFlux = getConfigForFiltrateFlux(moduleSelected);
    const rangeConfigFFFlow = getConfigForForwardFlushFlow(moduleSelected);
    const rangeConfigAirFlow = getConfigForAirFlow(moduleSelected);
    const rangeConfigCIP = getConfigForCIP(moduleSelected);
    //Setting new default ranges based on module selected.

    const defaultConfigs = {
      ...defaultInputRangeConfig,
      filtrateFlux: rangeConfigFiltrateFlux[0],
      forwardFlushFlow: rangeConfigFFFlow[0],
      airFlow: rangeConfigAirFlow[0],
      recycleFlowRate: rangeConfigCIP[0],
    };
    //Setting ModuleBased RangeConfig in STORE and updating Store data with new typicalValue based on the module selected
    dispatch(updateUFDefaultInputRangeConfig(defaultConfigs));
    dispatch(
      updateUFStore({
        ...UFData,
        ["uFModuleID"]: moduleSelected.ufmoduleId,
        ["filtrateFlux"]: rangeConfigFiltrateFlux[0]?.defaultValue,
        ["forwardFlushFlow"]: rangeConfigFFFlow[0]?.defaultValue,
        ["airFlow"]: rangeConfigAirFlow[0]?.defaultValue,
        ["recycleFlowRate"]: rangeConfigCIP[0]?.defaultValue,
      })
    );
  };
//UFModule Selection changed, based on new selection recomputation of UF fields is expected.
  const setActiveUFModuleInStore = (moduleID) => {
    // console.log("********setActiveUFModuleInStore UFSTORE", moduleID);
    const selectedModules = ufModules.filter((m) => m.ufmoduleId == moduleID);
    if (selectedModules.length > 0 && selectedModules[0]) {
      const moduleFlowData = ufModuleFlowVM.filter(
        (vfvm) => vfvm.ufmoduleId == moduleID
      );
      const modulePressureData = ufModulePressureRatingVM.filter(
        (pvm) => pvm.ufmoduleID == moduleID
      );
      const flowVM = moduleFlowData.length > 0 ? moduleFlowData[0] : {};
      const pressureRatingVM =
        modulePressureData.length > 0 ? modulePressureData[0] : {};
      const activeModuleDetails = {
        ...selectedModules[0],
        ...flowVM,
        ...pressureRatingVM,
      };
      // console.log(
      //   "********setActiveUFModuleInStore : newModuleLongName",
      //   activeModuleDetails?.newModuleLongName
      // );
      dispatch(updateActiveUFModule(activeModuleDetails));
      dispatch(setCustomAvail(true));
      dispatch(
        updateUFStore({
          ...UFData,
          ["uFModuleID"]: moduleID,
          ["uFBWProtocolID"]:
            activeModuleDetails?.newModuleLongName?.indexOf("UXA") >= 0
              ? "1"
              : UFData.uFBWProtocolID,
        })
      );

      setModuleBasedInputRangeConfigs(activeModuleDetails);
    }
  };


  useEffect(() => {
    // console.log("**** Design :useEffect on pageload customValue : ",customValue);
    // console.log("**** Design :useEffect on pageload STORE offlinetimePerUnit : ",UFData.offlinetimepertrain);
    if( UFStore.isOfflineTimeChanged && customValue != 12 && customValue != 0){
      // console.log("ENTERED------");
      const sendData = { target: "offlinetimepertrain", value: customValue};
      dispatch(updateDesignData(sendData));
    }
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

  useEffect(() => {
    // console.log("**** Design : Custom input made for OfflineTimePerUnit :",UFStore.isOfflineTimeChanged);
    // console.log("**** Design : isForDrinkingWater checkbox checked :",UFStore.isForDrinkingWater);
    // console.log("**** Design :useEffect UFStore.isForDrinkingWater customValue",customValue);
    // console.log("**** Design :useEffect UFStore.isForDrinkingWater STORE offlinetimepertrain",UFData.offlinetimepertrain);
    if(!UFStore.isOfflineTimeChanged){
      // console.log("Custom input not given, based on checkbox selection setting values in input field");
      if (UFStore.isForDrinkingWater) {
        // console.log("setting 12 as value");
        const filteredModules = ufModules.filter(
          (m) => m.drinkingWaterInd == true
        );
        //Only show modules approved for drinking water applications
        setFilteredUFModuleList(filteredModules);
        setCustomValue(12);
        const sendData = { target: "offlinetimepertrain", value: 12};
        dispatch(updateDesignData(sendData));
      } else {
        // console.log("setting 0 as value");
        setFilteredUFModuleList(ufModules);
        setCustomValue(0);
        const sendData = { target: "offlinetimepertrain", value: 0 };
        dispatch(updateDesignData(sendData));
      }
    }
  }, [UFStore.isForDrinkingWater]);

  /* Handling Chemical Adjustment Popup */
  const handleOpenChemicalAdjustment = () => {
    setOpenChemicalAdjustment(true);
  };
  /* Handling UF Product Guideline Popup */
  const handleOpenUFGuideLine = () => {
    setOpenUFGuideline(true);
  };
  const handleBlur = (e) => {
    let valueIsSafe = false;
    if (e.target.name === "filtrateFlux") {
      if (
        e.target.value < Number(validations("fieldFiltrateFlux")[0]?.toFixed(2)) ||
        e.target.value > Number(validations("fieldFiltrateFlux")[1]?.toFixed(2)) ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage("Please Enter Filtration Flux as per the range mentioned!");
        setIsFocused("filtrateFlux");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "backwash_design") {
      if (
        e.target.value < fieldFiltrationDuration?.minValue ||
        e.target.value > fieldFiltrationDuration?.maxValue ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("backwash_design");
        setMessage(
          "Please Enter Filtration Duration as per the range mentioned!"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "backwashFlux") {
      if (
        e.target.value < Number(validations("fieldBackwashFlux")[0]?.toFixed(2))||
        e.target.value > Number(validations("fieldBackwashFlux")[1]?.toFixed(2))||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("backwashFlux");
        setMessage("Please Enter Backwash Flux as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "cEBFlux") {
      if (
        e.target.value < Number(validations("fieldCEBFlux")[0]?.toFixed(2))||
        e.target.value > Number(validations("fieldCEBFlux")[1]?.toFixed(2))||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("cEBFlux");
        setMessage("Please Enter CEB Flux as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFocused(null);
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "forwardFlushFlow") {
      if (
        e.target.value < Number(validations("fieldForwardFlush")[0]?.toFixed(2)) ||
        e.target.value > Number(validations("fieldForwardFlush")[1]?.toFixed(2)) ||
        (e.target.value == "") | isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("forwardFlushFlow");
        setMessage(
          "Please Enter Forward Flush Flow as per the range mentioned!"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "recycleFlowRate") {
      if (
        e.target.value < Number(validations("fieldRecycleFlow")[0]?.toFixed(2)) ||
        e.target.value > Number(validations("fieldRecycleFlow")[1]?.toFixed(2)) ||
        e.target.value == "" ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("recycleFlowRate");
        setMessage(
          "Please Enter CIP Recycle Flow Rate as per the range mentioned!"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "alkaliOxidantCEB") {
      if (
        e.target.value < fieldAlkalineCEB?.minValue ||
        e.target.value > fieldAlkalineCEB?.maxValue ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("alkaliOxidantCEB");
        setMessage("Please Enter Alkaline CEB as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFocused(null);
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "offlinetimepertrain") {
      //soft Limit - (0 to 30)
      if (
        e.target.value < fieldOfflineTimePerTrain?.minValue ||
        e.target.value > fieldOfflineTimePerTrain?.maxValue ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("offlinetimepertrain");
        setMessage(
          "Please Enter Offline Time per Unit as per the range mentioned!"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFocused(null);
        valueIsSafe = true;
        setIsFieldValid(false);
        setCustomValue(e.target.value);
      }
    }
    if (e.target.name === "acidCEB") {
      if (
        e.target.value < fieldAcidCEB?.minValue ||
        e.target.value > fieldAcidCEB?.maxValue ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("acidCEB");
        setMessage("Please Enter ACID CEB as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "cIP") {
      if (
        e.target.value < fieldCIP?.minValue ||
        e.target.value > fieldCIP?.maxValue ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("cIP");
        setMessage("Please Enter CIP as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "airFlow") {
      if (
        UFData.airFlow < Number(validations("fieldAirFlow")[0]?.toFixed(2)) ||
        UFData.airFlow > Number(validations("fieldAirFlow")[1]?.toFixed(2)) ||
        isNaN(e.target.value)
      ) {
        setIsFieldValid(true);
        setIsFocused("airFlow");
        setMessage("Please Enter Air Flow as per the range mentioned!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        valueIsSafe = true;
        setIsFieldValid(false);
      }
    }
    if (valueIsSafe) {
      setIsFocused(null);
      if (e.target.name !== "offlinetimepertrain") {
        let val;
        const floatValue = parseFloat(e.target.value);
        if(!isNaN(floatValue) && floatValue === Math.floor(floatValue)){
          val = Math.floor(floatValue).toString(); 
        }else{
          val = floatValue.toFixed(2).toString();
        }
        dispatch(
          updateDesignData({
            target: e.target.name,
            value: val,
          })
        );
      }
      if (e.target.name === "offlinetimepertrain") {
        setCustomValue(Number(e.target.value));
        dispatch(
          updateDesignData({
            target: e.target.name,
            value: Number(e.target.value),
          })
        );
      }
      else if (e.target.name == "forwardFlushFlow") {
        const sendData = {
          target: e.target.name,
          value: Number(e.target.value).toFixed(2),
        };
        dispatch(updateDesignData(sendData));
      }
    }
    // setIsFocused(null);
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  /* Saving User Inputs in Component Internal State */
  const handleUFDesignTech = (e) => {
    const { name, value } = e.target;
    const sendData = { target: name, value: Number(value) };
    dispatch(updateDesignData(sendData));
  };

  useEffect(() => {
    if (UFData.uFModuleID == 0) {
      handleUFModule({ target: { name: "uFModuleID", value: "24" } });
    }
  }, [UFStore]);

  const handleUFModule = (e) => {
    setActiveUFModuleInStore(e.target.value);
    dispatch(setUfDataUpdate(true));
  };
  const setPopUPBasedModuleSelection = (item) => {
    if (item?.id) {
      setChecked(false);
      dispatch(updateIsForDrinkingWater(false));
      const activeModuleDetails = getModuleDetails(item.id);
      dispatch(updateActiveUFModule(activeModuleDetails));

      dispatch(
        updateUFStore({
          ...UFData,
          ["uFModuleID"]: item.id,
          ["uFBWProtocolID"]:
            activeModuleDetails?.newModuleLongName?.indexOf("UXA") >= 0
              ? "1"
              : UFData.uFBWProtocolID,
        })
      );
    } else {
      dispatch(updateActiveUFModule({}));
      dispatch(updateUFStore({ ...UFData, ["uFModuleID"]: "0" }));
    }
    dispatch(setUfDataUpdate(true));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value == "" ? "" : value;
    if (!isNaN(value)) {
        if (name == "offlinetimepertrain") {
          setCustomValue(Number(value));
          dispatch(setCustomOfflineTimePerUnit(true));
          // const sendData = { target: name, value: Number.parseInt(value) };
          dispatch(updateDesignData({ target: name, value: Number(value) }));
        } else if(name == "filtrateFlux"){
          // console.log("PK filtrateFlux",value);
          const sendData = { target: name, value: value };
          // console.log("PK sendData",sendData);
          dispatch(updateDesignData(sendData));
        } else {
          const sendData = { target: name, value: value };
          dispatch(updateDesignData(sendData));
        }       
        dispatch(setUfDataUpdate(true));
      //  const finalVal= 
    }
  };
  const validations =(field)=> {
    if(field=="fieldFiltrateFlux"){
      const minRange=unit.selectedUnits[4]==="LMH"?fieldFiltrateFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltrateFlux?.minValue,unit.selectedUnits[4],"LMH");
      const maxRange=unit.selectedUnits[4]==="LMH"?fieldFiltrateFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltrateFlux?.maxValue,unit.selectedUnits[4],"LMH");
      return [minRange,maxRange];
    }
    if(field=="fieldBackwashFlux"){
      const minRange=unit.selectedUnits[4]==="LMH"?fieldBackwashFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashFlux?.minValue,unit.selectedUnits[4],"LMH");
      const maxRange=unit.selectedUnits[4]==="LMH"?fieldBackwashFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashFlux?.maxValue,unit.selectedUnits[4],"LMH");
      return [minRange,maxRange];
    }
    if(field=="fieldCEBFlux"){
      const minRange=unit.selectedUnits[4]==="LMH"?fieldCEBFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCEBFlux?.minValue,unit.selectedUnits[4],"LMH");
      const maxRange=unit.selectedUnits[4]==="LMH"?fieldCEBFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCEBFlux?.maxValue,unit.selectedUnits[4],"LMH");
      return [minRange,maxRange];
    }
    if(field=="fieldForwardFlush"){
      const minRange=unit.selectedUnits[1]==="m³/h"?fieldForwardFlush?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldForwardFlush?.minValue,unit.selectedUnits[1],"m³/h");
      const maxRange=unit.selectedUnits[1]==="m³/h"?fieldForwardFlush?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldForwardFlush?.maxValue,unit.selectedUnits[1],"m³/h");
      return [minRange,maxRange];
    }
    if(field=="fieldAirFlow"){
      const minRange=unit.selectedUnits[18]==="Nm³/h"?fieldAirFlow?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAirFlow?.minValue,unit.selectedUnits[18],"Nm³/h");
      const maxRange=unit.selectedUnits[18]==="Nm³/h"?fieldAirFlow?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAirFlow?.maxValue,unit.selectedUnits[18],"Nm³/h");
      return [minRange,maxRange];
    }
    if(field=="fieldAerationAirFlow"){
      const minRange=unit.selectedUnits[18]==="Nm³/h"?fieldAerationAirFlow?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAerationAirFlow?.minValue,unit.selectedUnits[18],"Nm³/h");
      const maxRange=unit.selectedUnits[18]==="Nm³/h"?fieldAerationAirFlow?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAerationAirFlow?.maxValue,unit.selectedUnits[18],"Nm³/h");
      return [minRange,maxRange];
    }
    if(field=="fieldRecycleFlow"){
      const minRange=unit.selectedUnits[1]==="m³/h"?fieldRecycleFlow?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldRecycleFlow?.minValue,unit.selectedUnits[1],"m³/h");
      const maxRange=unit.selectedUnits[1]==="m³/h"?fieldRecycleFlow?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldRecycleFlow?.maxValue,unit.selectedUnits[1],"m³/h");
      return [minRange,maxRange];
    }
    if(field=="fieldMiniCIPRecycle"){
      const minRange=unit.selectedUnits[1]==="m³/h"?fieldMiniCIPRecycle?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMiniCIPRecycle?.minValue,unit.selectedUnits[1],"m³/h");
      const maxRange=unit.selectedUnits[1]==="m³/h"?fieldMiniCIPRecycle?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldMiniCIPRecycle?.maxValue,unit.selectedUnits[1],"m³/h");
      return [minRange,maxRange];
    }
  };

  const handelOfflineTrain = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      const userInput = value==""? value : Number(value);
      setCustomValue(userInput);
      dispatch(updateDesignData({ target: name, value: value==""?value:Number(value) }));
      dispatch(setCustomOfflineTimePerUnit(true));
      dispatch(setUfDataUpdate(true));
    }
  };

  const handleShowFilteredModules = (e) => {
    dispatch(setCustomOfflineTimePerUnit(false));
    // const { checked, name } = e.target;
    dispatch(updateIsForDrinkingWater(e.target.checked));
    if (e.target.checked) {
      const activeModuleDetails = getModuleDetails("8");
      setActiveUFModuleInStore(8);
      dispatch(updateActiveUFModule(activeModuleDetails));
    } else {
      const activeModuleDetails = getModuleDetails("24");
      dispatch(updateActiveUFModule(activeModuleDetails));
      setActiveUFModuleInStore(24);
    }
    dispatch(setCustomAvail(true));
    dispatch(setUfDataUpdate(true));
    // setChecked(e.target.checked);
  };
  const checkWarning = (name) => {
    const value = data[name];
    const validator = fieldOfflineTimePerTrain;
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
  const checkError = (id) => {
    return !(
      fieldOfflineTimePerTrain?.minValue <= data[id] &&
      fieldOfflineTimePerTrain?.maxValue >= data[id]
    );
  };
  const getError = (name) => {
    const value = data[name];
    const validator = fieldOfflineTimePerTrain;
    if (value < validator?.minValue || value > validator?.maxValue) {
      return <ErrorMessage texMsg={"Values out of range"} />;
    } else if (
      value < validator?.softLowerLimit ||
      value > validator?.softUpperLimit
    ) {
      if (value <= validator?.maxValue) {
        return (
          <InputReferenceText
          refText={`Ranges ${validator?.minValue?.toFixed(2)} - ${validator?.maxValue?.toFixed(2)}`}
        />
        );
      }
    } 
    else {
      return (
        <InputReferenceText
          refText={`Ranges ${validator?.minValue?.toFixed(2)} - ${validator?.maxValue?.toFixed(2)}`}
        />
      );
    }
  };
  return (
    <>
      <DesignStyled className="g-0">
        <UFSystemDesignDiagram />
        <Col lg={12} md={12} sm={12}>
          <div className="uf-design">
            <div className="card-wrapper-one">
              {/* UF Feed Flow Rate */}
              <StyledCard className="uf-feed-flow" borderRadius="4px">
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label={`UF ${flowRateSelected} Flow Rate`}
                  />
                  <IconWithTooltip
                    label="Estimated UF Feed or Product flow, based on user input and estimated recoveries of other icons."
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                <CustomLabel
                  fontFamily="DiodrumRegular"
                  disabled={true}
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Automatic"
                />
                <InputWithText
                  inputText={unit.selectedUnits[1]}
                  disabled={true}
                  isError={false}
                  value={flowRateValueSelected}
                  id="automatic"
                  placeholder="0.00"
                  onFocus={() => handleFocus(1)}
                  isFocused={isFocused === 1}
                  onBlur={handleBlur}
                />
              </StyledCard>
              {/* UF Technology Selection */}
              <StyledCard
                className="uf-technology-selection"
                borderRadius="4px"
              >
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="UF Technology Selection"
                  />
                  <IconWithTooltip
                    label="Select family of DuPont UF products, which determines the default cleaning protocols."
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                <CustomLabel
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="UF Technology"
                />
                <CustomSelect
                  type=""
                  id="ufTechnologies"
                  name="treatmentObjID"
                  placeholder="UF Technologies"
                  onChange={handleUFDesignTech}
                  isError={false}
                  disabled={false}
                >
                  {/* <option>Select</option>
                                {ufTechnologies?.map((technology, ind) => (
                                <option value={technology.pUFTechnologyID} key={`ufTech-${ind}`}>
                                    {technology.pUFTechName}
                                </option>
                                ))} */}
                  <option value="1">PVDF Out-In High Recovery</option>
                </CustomSelect>
              </StyledCard>
              {/* Module Selection */}
              <StyledCard className="module-selection" borderRadius="4px">
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Module Selection"
                  />
                  <IconWithTooltip
                    label="Select a module"
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                {/* Check Box for filtering drinking water based */}
                <CustomRadioCheck
                  className="drink-water"
                  label="Only show modules approved for drinking water applications"
                  disabled={false}
                  isError={false}
                  type="checkbox"
                  id="drinkingWater"
                  name="drinkingWater_Ind"
                  checked={UFStore.isForDrinkingWater}
                  onChange={handleShowFilteredModules}
                />

                <CustomLabel
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="DuPont UF Module"
                  mandatoryIcon={true}
                />
                <CustomSelect
                  type=""
                  id="pesSelect"
                  name="uFModuleID"
                  value={UFData.uFModuleID}
                  placeholder="UF Modules"
                  onChange={handleUFModule}
                  isError={false}
                  disabled={false}
                >
                  {(UFStore.isForDrinkingWater ? filteredUFModules : ufModules)?.map(
                    (module, index) => (
                      <option
                        value={module.ufmoduleId}
                        key={`ufModule-${index}`}
                      >
                        {module.newModuleLongName}
                      </option>
                    )
                  )}
                </CustomSelect>

                <div className="btn-div">
                  <StandardLinkButtonWithIcon
                    label="UF Product Guidelines"
                    isError={false}
                    padding="10px 0px"
                    disabled={false}
                    id="ufProductDefinitions"
                    icon={<ArrowRightBlackIcon />}
                    plusIcon={false}
                    onClick={handleOpenUFGuideLine}
                  />
                  <UFProductGuidelines
                    show={openUFGuideline}
                    onSelection={(item) => setPopUPBasedModuleSelection(item)}
                    close={() => setOpenUFGuideline(false)}
                  />
                </div>
              </StyledCard>
            </div>
            <div className="card-wrapper-two">
              {/* Design Instantaneous (Gross) Flux and Flow Rates */}
              <StyledCard className="flux-and-flow-rate" borderRadius="4px">
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Design Instantaneous (Gross) Flux and Flow Rates"
                  />
                  {/* <div className="spl-icon"><InfoIcon/></div> */}
                  <IconWithTooltip
                    label="Provide fluxes and flow rates for filtration and various steps in the cleaning protocols."
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label={`Filtrate Flux (for ${unit.selectedUnits[2]!=="°C"?GlobalUnitConversion(GlobalUnitConversionStore,tempDesign,unit.selectedUnits[2],"°C"):tempDesign}${unit.selectedUnits[2]})`}
                  />
       
                  <InputWithText
                    // type="text"
                    type="number"
                    // inputText={fieldFiltrateFlux?.uom==="L/hr/m²"?"L/h/m²":fieldFiltrateFlux?.uom}
                    // inputText={fieldFiltrateFlux?.uom}
                    inputText={unit.selectedUnits[4]}
                    id="filtrateInput"
                    name="filtrateFlux"
                    placeholder="0.00"
                    value={
                      isFocused === "filtrateFlux"
                        ? UFData.filtrateFlux
                        : parseFloat(UFData.filtrateFlux).toFixed(2)
                    }
                    disabled={disabledInputs.includes("Filtrate Flux")}
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("filtrateFlux")}
                    isFocused={isFocused === "filtrateFlux"}
                    onBlur={handleBlur}
                    isError={
                      UFData.filtrateFlux < Number(validations("fieldFiltrateFlux")[0]?.toFixed(2)) ||
                      UFData.filtrateFlux > Number(validations("fieldFiltrateFlux")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldFiltrateFlux?.minValue?.toFixed(2)} - ${fieldFiltrateFlux?.maxValue?.toFixed(2)}`}
                  /> */}
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[4]==="LMH"?fieldFiltrateFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltrateFlux?.minValue,unit.selectedUnits[4],"LMH")?.toFixed(2)} - ${unit.selectedUnits[4]==="LMH"?fieldFiltrateFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldFiltrateFlux?.maxValue,unit.selectedUnits[4],"LMH")?.toFixed(2)}`}
                  />
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Backwash Flux"
                  />
                  <InputWithText
                    type="number"
                    // inputText={fieldBackwashFlux?.uom}
                    inputText={unit.selectedUnits[4]}
                    id="backwashFluxInput"
                    name="backwashFlux"
                    disabled={disabledInputs.includes("Backwash Flux")}
                    isError={
                      UFData.backwashFlux < Number(validations("fieldBackwashFlux")[0]?.toFixed(2)) ||
                      UFData.backwashFlux > Number(validations("fieldBackwashFlux")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "backwashFlux"
                        ? UFData.backwashFlux
                        : parseFloat(UFData.backwashFlux).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("backwashFlux")}
                    isFocused={isFocused === "backwashFlux"}
                    onBlur={handleBlur}
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldBackwashFlux?.minValue?.toFixed(2)} - ${fieldBackwashFlux?.maxValue?.toFixed(2)}`}
                  /> */}
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[4]==="LMH"?fieldBackwashFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashFlux?.minValue,unit.selectedUnits[4],"LMH")?.toFixed(2)} - ${unit.selectedUnits[4]==="LMH"?fieldBackwashFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldBackwashFlux?.maxValue,unit.selectedUnits[4],"LMH")?.toFixed(2)}`}
                  />
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="CEB Flux"
                  />

                  <InputWithText
                    type="number"
                    // inputText={fieldCEBFlux?.uom}
                    inputText={unit.selectedUnits[4]}
                    id="cEBFluxInput"
                    name="cEBFlux"
                    disabled={disabledInputs.includes("CEB Flux")}
                    isError={
                      UFData.cEBFlux < Number(validations("fieldCEBFlux")[0]?.toFixed(2)) ||
                      UFData.cEBFlux > Number(validations("fieldCEBFlux")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "cEBFlux"
                        ? UFData.cEBFlux
                        : parseFloat(UFData.cEBFlux).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("cEBFlux")}
                    isFocused={isFocused === "cEBFlux"}
                    onBlur={handleBlur}
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldCEBFlux?.minValue?.toFixed(2)} - ${fieldCEBFlux?.maxValue?.toFixed(2)}`}
                  /> */}
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[4]==="LMH"?fieldCEBFlux?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCEBFlux?.minValue,unit.selectedUnits[4],"LMH")?.toFixed(2)} - ${unit.selectedUnits[4]==="LMH"?fieldCEBFlux?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldCEBFlux?.maxValue,unit.selectedUnits[4],"LMH")?.toFixed(2)}`}
                  />
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Forward Flush Flow"
                  />
                  <InputWithText
                    type="number"
                    // inputText={fieldForwardFlush?.uom}
                    inputText={unit.selectedUnits[1]+"/module"}
                    id="forwardFlushFlowInput"
                    name="forwardFlushFlow"
                    disabled={disabledInputs.includes("Forward Flush Flow")}
                    isError={
                      UFData.forwardFlushFlow < Number(validations("fieldForwardFlush")[0]?.toFixed(2)) ||
                      UFData.forwardFlushFlow > Number(validations("fieldForwardFlush")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "forwardFlushFlow"
                        ? UFData.forwardFlushFlow
                        : parseFloat(UFData.forwardFlushFlow).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("forwardFlushFlow")}
                    isFocused={isFocused === "forwardFlushFlow"}
                    onBlur={handleBlur}
                  />
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[1]==="m³/h"?fieldForwardFlush?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldForwardFlush?.minValue,unit.selectedUnits[1],"m³/h")?.toFixed(2)} - ${unit.selectedUnits[1]==="m³/h"?fieldForwardFlush?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldForwardFlush?.maxValue,unit.selectedUnits[1],"m³/h")?.toFixed(2)}`}
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldForwardFlush?.minValue?.toFixed(2)} - ${fieldForwardFlush?.maxValue?.toFixed(2)}`}
                  /> */}
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    disabled={disabledInputs.includes("Air Flow")}
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Air Flow"
                  />
                  <InputWithText
                    type="number"
                    // inputText={fieldAirFlow?.uom}
                    inputText={unit.selectedUnits[18]+"/module"}
                    id="airFlowInput"
                    name="airFlow"
                    disabled={disabledInputs.includes("Air Flow")}
                    isError={
                      UFData.airFlow < Number(validations("fieldAirFlow")[0]?.toFixed(2)) ||
                      UFData.airFlow > Number(validations("fieldAirFlow")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "airFlow"
                        ? UFData.airFlow
                        : parseFloat(UFData.airFlow).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("airFlow")}
                    isFocused={isFocused === "airFlow"}
                    onBlur={handleBlur}
                  />
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[18]==="Nm³/h"?fieldAirFlow?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAirFlow?.minValue,unit.selectedUnits[18],"Nm³/h")?.toFixed(2)} - ${unit.selectedUnits[18]==="Nm³/h"?fieldAirFlow?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldAirFlow?.maxValue,unit.selectedUnits[18],"Nm³/h")?.toFixed(2)}`}
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldAirFlow?.minValue?.toFixed(2)} - ${fieldAirFlow?.maxValue?.toFixed(2)}`}
                  /> */}
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    disabled={disabledInputs.includes("Aeration Air Flow")}
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Aeration Air Flow"
                  />
                  {/* <CalcEngineInputBox inputText="Nm3/h/module" id="filtrateInput" disabled={true} isError={false}  placeholder="0.00" defaultValue="64.3" onFocus={()=>handleFocus(6)} isFocused={isFocused===6} onBlur={handleBlur}/> */}
                  <InputWithText
                    type="number"
                    // inputText={fieldAerationAirFlow?.uom}
                    inputText={unit.selectedUnits[18]+"/module"}
                    id="aerationAirFlowInput"
                    name="aerationAirFlow"
                    disabled={disabledInputs.includes("Aeration Air Flow")}
                    isError={
                      UFData.aerationAirFlow < Number(validations("fieldAerationAirFlow")[0]?.toFixed(2)) ||
                      UFData.aerationAirFlow > Number(validations("fieldAerationAirFlow")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "aerationAirFlow"
                        ? UFData.airFlow
                        : parseFloat(UFData.aerationAirFlow).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("aerationAirFlow")}
                    isFocused={isFocused === "aerationAirFlow"}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    disabled={disabledInputs.includes("CIP Recycle Flow Rate")}
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="CIP Recycle Flow Rate"
                  />
                  <InputWithText
                    type="number"
                    // inputText={fieldRecycleFlow?.uom}
                    inputText={unit.selectedUnits[1]+"/module"}
                    id="recycleFlowRateInput"
                    name="recycleFlowRate"
                    disabled={disabledInputs.includes("CIP Recycle Flow Rate")}
                    isError={
                      UFData.recycleFlowRate < Number(validations("fieldRecycleFlow")[0]?.toFixed(2)) ||
                      UFData.recycleFlowRate > Number(validations("fieldRecycleFlow")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "recycleFlowRate"
                        ? UFData.recycleFlowRate
                        : parseFloat(UFData.recycleFlowRate).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("recycleFlowRate")}
                    isFocused={isFocused === "recycleFlowRate"}
                    onBlur={handleBlur}
                  />
                  <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[1]==="m³/h"?fieldRecycleFlow?.minValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldRecycleFlow?.minValue,unit.selectedUnits[1],"m³/h")?.toFixed(2)} - ${unit.selectedUnits[1]==="m³/h"?fieldRecycleFlow?.maxValue:GlobalUnitConversion(GlobalUnitConversionStore,fieldRecycleFlow?.maxValue,unit.selectedUnits[1],"m³/h")?.toFixed(2)}`}
                  />
                  {/* <InputReferenceText
                    refText={`Ranges ${fieldRecycleFlow?.minValue?.toFixed(2)} - ${fieldRecycleFlow?.maxValue?.toFixed(2)}`}
                  /> */}
                </div>
                <div className="flux-and-flow-wrapper">
                  <CustomLabel
                    fontFamily="DiodrumRegular"
                    disabled={disabledInputs.includes(
                      "Mini-CIP Recycle Flow Rate"
                    )}
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="mini-CIP Recycle Flow Rate"
                  />
                  <InputWithText
                    type="number"
                    // inputText={fieldMiniCIPRecycle?.uom}
                    inputText={unit.selectedUnits[1]+"/module"}
                    id="recycleFlowRate_MiniCIPInput"
                    name="recycleFlowRate_MiniCIP"
                    disabled={disabledInputs.includes(
                      "Mini-CIP Recycle Flow Rate"
                    )}
                    isError={
                      UFData.recycleFlowRate_MiniCIP < Number(validations("fieldMiniCIPRecycle")[0]?.toFixed(2)) ||
                      UFData.recycleFlowRate_MiniCIP > Number(validations("fieldMiniCIPRecycle")[1]?.toFixed(2))
                        ? true
                        : false
                    }
                    placeholder="0.00"
                    value={
                      isFocused === "recycleFlowRate_MiniCIP"
                        ? UFData.recycleFlowRate_MiniCIP
                        : parseFloat(UFData.recycleFlowRate_MiniCIP).toFixed(2)
                    }
                    // value={UFData.recycleFlowRate_MiniCIP}
                    onChange={handleInputChange}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={() => handleFocus("recycleFlowRate_MiniCIP")}
                    isFocused={isFocused === "recycleFlowRate_MiniCIP"}
                    onBlur={handleBlur}
                  />
                </div>
              </StyledCard>
            </div>
            <div className="card-wrapper-three">
              {/* Pending Special Features-------------- */}
              <StyledCard className="uf-special-feature" borderRadius="4px">
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="UF Special Features"
                  />
                  <IconWithTooltip
                    label="Adjust feed water chemistry, decide if regular CEB or mini-CIP cleaning protocols will be used."
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                <div>
                  <StandardLinkButtonWithIcon
                    label="Add Chemicals/Degas"
                    id="addChemicalBtn"
                    icon={<PlusIcon style={{ cursor: "notAllowed" }} />}
                    plusIcon={true}
                    disabled={true}
                    padding="10px 0px"
                    onClick={handleOpenChemicalAdjustment}
                  />
                  <ChemicalAdjustment
                    show={openChemicalAdjustment}
                    close={() => setOpenChemicalAdjustment(false)}
                  />
                </div>
                <div className="uf_special_feature_radio">
                  <CustomRadio
                    type="radio"
                    name="addChemical"
                    id="cebRadio"
                    label="CEB only"
                    checked={true}
                    disabled={false}
                    isError={false}
                  />
                  <CustomRadio
                    type="radio"
                    name="addChemical"
                    id="cipRadio"
                    label="mini-CIP only"
                    disabled={true}
                    isError={false}
                  />
                  <CustomRadio
                    type="radio"
                    name="addChemical"
                    id="cebCipRadio"
                    label="CEB and mini-CIP"
                    disabled={true}
                    isError={false}
                  />
                </div>
              </StyledCard>
              <StyledCard className="design-cycle-interval" borderRadius="4px">
                <Card.Header>
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Design Cycle Intervals"
                  />
                  <IconWithTooltip
                    label="Provide the nominal interval between each cleaning protocol."
                    icon={<InfoIcon />}
                  />
                </Card.Header>
                
                  <div className="design_cycle_interval">
                  <div className="design-filtration-left">
                    <div className="filtration-duration">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      disabled={disabledInputs.includes("Filtration Duration")}
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Filtration Duration"
                    />
                    <InputWithText
                      type="number"
                      inputText={fieldFiltrationDuration?.uom || "Min"}
                      id="filtrationDurationInput"
                      name="backwash_design"
                      disabled={disabledInputs.includes("Filtration Duration")}
                      isError={
                        UFData.backwash_design <
                          fieldFiltrationDuration?.minValue ||
                        UFData.backwash_design >
                          fieldFiltrationDuration?.maxValue
                          ? true
                          : false
                      }
                      placeholder="0.00"
                      value={UFData.backwash_design}
                      onChange={handleInputChange}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      onFocus={() => handleFocus("backwash_design")}
                      isFocused={isFocused === "backwash_design"}
                      onBlur={handleBlur}
                    />
                    <InputReferenceText
                      refText={`Ranges ${fieldFiltrationDuration?.minValue?.toFixed(2)} - ${fieldFiltrationDuration?.maxValue?.toFixed(2)}`}
                    />
                  </div>
                  <div className="cip">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      disabled={disabledInputs.includes("CIP")}
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="CIP"
                    />
                    <InputWithText
                      type="number"
                      inputText={fieldCIP?.uom}
                      id="cIPInput"
                      name="cIP"
                      disabled={disabledInputs.includes("CIP")}
                      isError={
                        UFData.cIP < fieldCIP?.minValue ||
                        UFData.cIP > fieldCIP?.maxValue
                          ? true
                          : false
                      }
                      placeholder="0.00"
                      value={UFData.cIP}
                      onChange={handleInputChange}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      onFocus={() => handleFocus("cIP")}
                      isFocused={isFocused === "cIP"}
                      onBlur={handleBlur}
                    />
                    <InputReferenceText
                      refText={`Ranges ${fieldCIP?.minValue?.toFixed(2)} - ${fieldCIP?.maxValue?.toFixed(2)}`}
                    />
                  </div>
                  <div className="mini-cip">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      disabled={disabledInputs.includes("mini-CIP")}
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="mini-CIP"
                    />
                    <InputWithText
                      type="number"
                      inputText={fieldMiniCIP?.uom}
                      id="miniCIPInput"
                      name="miniCIP"
                      disabled={disabledInputs.includes("mini-CIP")}
                      isError={
                        UFData.miniCIP < fieldMiniCIP?.minValue ||
                        UFData.miniCIP > fieldMiniCIP?.maxValue
                          ? true
                          : false
                      }
                      placeholder="0.00"
                      value="0" //{UFData.miniCIP}
                      onChange={handleInputChange}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      onFocus={() => handleFocus("miniCIP")}
                      isFocused={isFocused === "miniCIP"}
                      onBlur={handleBlur}
                    />
                  </div>
                  </div>
                  <div className="design-filtration-right">
                    <div className="acid-ceb">
                      <CustomLabel
                        fontFamily="DiodrumRegular"
                        disabled={disabledInputs.includes("Acid CEB")}
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.Black}
                        label="Acid CEB"
                      />
                      <InputWithText
                        type="number"
                        inputText={fieldAcidCEB?.uom}
                        //{fieldAcidCEB?.uom}
                        id="acidCEBInput"
                        name="acidCEB"
                        disabled={disabledInputs.includes("Acid CEB")}
                        isError={
                          UFData.acidCEB < fieldAcidCEB?.minValue ||
                          UFData.acidCEB > fieldAcidCEB?.maxValue
                            ? true
                            : false
                        }
                        placeholder="0.00"
                        value={UFData.acidCEB}
                        onChange={handleInputChange}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        onWheel={(e)=>e.target.blur()}
                        onFocus={() => handleFocus("acidCEB")}
                        isFocused={isFocused === "acidCEB"}
                        onBlur={handleBlur}
                      />
                      <InputReferenceText
                        refText={`Ranges ${fieldAcidCEB?.minValue?.toFixed(2)} - ${fieldAcidCEB?.maxValue?.toFixed(2)}`}
                        // refText="Ranges 0-336"
                      />
                    </div>
                    <div className="alkaline-ceb">
                      <CustomLabel
                        fontFamily="DiodrumRegular"
                        disabled={disabledInputs.includes("Alkaline CEB")}
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.Black}
                        label="Alkaline CEB"
                      />
                      <InputWithText
                        type="number"
                        inputText={fieldAlkalineCEB?.uom}
                        id="alkaliOxidantCEBInput"
                        name="alkaliOxidantCEB"
                        disabled={disabledInputs.includes("Alkaline CEB")}
                        isError={
                          UFData.alkaliOxidantCEB < fieldAlkalineCEB?.minValue ||
                          UFData.alkaliOxidantCEB > fieldAlkalineCEB?.maxValue
                            ? true
                            : false
                        }
                        placeholder="0.00"
                        value={UFData.alkaliOxidantCEB}
                        onChange={handleInputChange}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        onWheel={(e)=>e.target.blur()}
                        onFocus={() => handleFocus("alkaliOxidantCEB")}
                        isFocused={isFocused === "alkaliOxidantCEB"}
                        onBlur={handleBlur}
                      />
                      <InputReferenceText
                        refText={`Ranges ${fieldAlkalineCEB?.minValue?.toFixed(2)} - ${fieldAlkalineCEB?.maxValue?.toFixed(2)}`}
                      />
                    </div>
                    <div className="disinfection-ceb">
                      <CustomLabel
                        fontFamily="DiodrumRegular"
                        disabled={disabledInputs.includes("Disinfection CEB")}
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.Black}
                        label="Disinfection CEB"
                      />
                      <InputWithText
                        type="number"
                        inputText={fieldDisInfectionCEB?.uom}
                        id="disinfectionCEBInput"
                        name="disinfectionCEB"
                        disabled={disabledInputs.includes("Disinfection CEB")}
                        isError={
                          UFData.disinfectionCEB <
                            fieldDisInfectionCEB?.minValue ||
                          UFData.disinfectionCEB > fieldDisInfectionCEB?.maxValue
                            ? true
                            : false
                        }
                        placeholder="0.00"
                        value={UFData.disinfectionCEB}
                        onChange={handleInputChange}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        onWheel={(e)=>e.target.blur()}
                        onFocus={() => handleFocus("disinfectionCEB")}
                        isFocused={isFocused === "disinfectionCEB"}
                        onBlur={handleBlur}
                      />
                      {/* <InputReferenceText
                        refText={`Ranges ${fieldDisInfectionCEB?.minValue?.toFixed(2)} - ${fieldDisInfectionCEB?.maxValue?.toFixed(2)}`}
                      /> */}
                    </div>
                  </div>
                  </div>
                <div>
                  <CustomHeading
                    className="membrane-heading"
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Membrane Integrity Testing"
                  />
                  <div className="cip">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      disabled={disabledInputs.includes(
                        "Membrane Integrity Testing"
                      )}
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Offline Time per Unit"
                    />

                    <InputWithText
                      type="text"
                      inputText={fieldOfflineTimePerTrain?.uom}
                      id="offlinetimepertrain"
                      name="offlinetimepertrain"
                      disabled={disabledInputs.includes(
                        "Membrane Integrity Testing"
                      )}
                      isError={checkError("offlinetimepertrain")}
                      placeholder="0.00"
                      value={
                        // isFocused =="offlinetimepertrain"
                        UFData.offlinetimepertrain
                        // : Number.parseInt(UFData.offlinetimepertrain)
                      }
                      onChange={handelOfflineTrain}
                      onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                      onWheel={(e)=>e.target.blur()}
                      onFocus={() => handleFocus("offlinetimepertrain")}
                      isFocused={isFocused === "offlinetimepertrain"}
                      onBlur={handleBlur}
                      // isWarning={checkWarning("offlinetimepertrain")}
                    />
                    {getError("offlinetimepertrain")}
                  </div>
                </div>
              </StyledCard>
            </div>
          </div>
        </Col>
      </DesignStyled>
      {isFieldValid && (
        <ProjectErrorPopup
          show={isFieldValid}
          close={() => {
            setIsFieldValid(false);
          
          }}
          message={message}
        />
      )}
    </>
  );
};

export default Design;
