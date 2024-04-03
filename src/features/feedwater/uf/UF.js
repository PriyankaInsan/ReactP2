import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Col, Container, Row } from "react-bootstrap";
import DuPont_logo_Red from "../../../common/assets/images/1280px-DuPont_logo_Red.svg";
import Wave_PRO_UF_Logo from "../../../common/assets/images/Wave-PRO-UF-Logo-02.svg";
import CEB from "./CEB";
import CIP from "./CIP";
import Design from "./Design";
import Backwash from "./Backwash";
import UFStyled from "./UFStyled";
import Configuration from "./Configuration";
import AdditionalSetting from "./AdditionalSetting";
import Footer from "../../../common/footer/Footer";
import { MyError } from "../../../common/utils/ErrorCreator";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";

import { useCalcEngineDataMutation } from "../../../services/apiConfig";

import {
  useLazyGetAllDataQuery,
  useCreateDataMutation,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import {
  updateUFStore,
  updateActiveUFModule,
  handleCebDropdownData,
  handleCipDropdownData,
  updateIsForDrinkingWater,
  updateCebData,
  updateRecommendedConfiguration,
  updateDefaultUFConfiguration,
  handleCalcEngineResponse,
  updateUFDefaultInputRangeConfig,
  generateConfigsWithoutStandBy,
  generateConfigsWithStandBy,
  calculateUFFields,
  updateTabletMenuIcon,
  updateTabletIconStatus,
  setCustomAvail,
  setCustomOfflineTimePerUnit,
  updateMenuIconHeader,
  setActiveTab,
  setUfDataUpdate,
  updateWaterSubtypeFlag,
  handleOperatingFlux,
  updateCipData,
} from "../uf/UFSlice";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import TabletCloseMenuIcon from "../../../common/icons/TabletCloseMenuIcon";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../common/styles/Theme";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitFlag, updateUnitTypeFlow, updateUnitTypeFlux, updateUnitTypeGasFlow, updateUnitTypePower, updateUnitTypePressure, updateUnitTypeTemp } from "../../../common/utils/GlobalUnitConversionSlice";
import { setFeedFlowRate } from "../systemdesign/processDiagramSlice";
import { updateTabAvailable } from "../../../common/ReportIXDSlice";

const UF = () => {
  const dispatch = useDispatch();
  const [getCebLSIValue, responseCebLSIValue] = useCreateDataMutation();
  const [getCipLSIValue, responseCipLSIValue] = useCreateDataMutation();
  const [activeUFSubMenu, setActiveUFSubMenu] = useState("Design");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const showInDropDown = useSelector(
    (state) => state.projectInfo.projectConfig.chemicalConfig.showInDropDownChem
  );
  const {
    waterSubTypeFlag,
    isForDrinkingWater,
    activeUFModule,
    activeTab,
    blankData,
    calcEngineData,
  } = useSelector((state) => state.UFStore);
  const ufInputRangeConfigByWaterType = useSelector(
    (state) => state.UFStore.ufInputRangeConfigByWaterType
  );

  const UFData = useSelector((state) => state.UFStore.data);

  const ufModules = useSelector((state) => state.UFStore.ufModules);
  const ufInputRangeConfig = useSelector(
    (state) => state.UFStore.ufInputRangeConfig
  );
  const StreamStoreData = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData.lstrequestsavefeedwater[0]
        ?.streams[0]
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const {unitTypeFlow,unitTypeGasFlow,unitTypeFlux,unitFlag,unitTypePressure,unitTypePower,unitTypeTemp} = useSelector((state) => state.GUnitConversion);
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const ufModuleFlowVM = useSelector((state) => state.UFStore.ufModuleFlowVM);
  const ufModulePressureRatingVM = useSelector(
    (state) => state.UFStore.ufModulePressureRatingVM
  );

  const selectedUFModule = useSelector((state) => state.UFStore.activeUFModule);
  const ufFluxGuideline = useSelector((state) => state.UFStore.ufFluxGuideline);
  const ufDoseGuidline = useSelector((state) => state.UFStore.ufDoseGuidline);

  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item.technologyID == 1 && !item.isDeleted
      )?.caseTreatmentID
  );

  const systemDesignData = useSelector((state) => state.processDiagramSlice);
  const {
    selectedEndNode,
    feedFlowRate,
    productFlowRate,
    edges,
    feedWaterData,
  } = systemDesignData;

  const ProjectConfig = useSelector((state) => state.projectInfo.projectConfig);
  const { pumpCofig, chemicalConfig } = ProjectConfig;
  const { operatingCost } = chemicalConfig;

  const [getUFDetails, responseUFDetails] = useLazyGetAllDataQuery();
  const [POSTUFAutoSaveData, responseAutoSave] = useCreateDataMutation();
  const [getCEBData, responseCeb] = useLazyGetAllDataQuery();
  const [getCIPData, responseCip] = useLazyGetAllDataQuery();

  const [getData, responseReceived] = useCalcEngineDataMutation();

  const tempDesign = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );

  const streamData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.data[0]
  );
  const { waterSubTypeID = "1", waterTypeID } = StreamStoreData;
  const waterSubTypeBasedInputConfigs = ufInputRangeConfigByWaterType.filter(
    (w, indx) => w.waterSubType == waterSubTypeID
  );

  // console.log("*#*#*# Normal Range :",ufInputRangeConfig);
  // console.log("*#*#*# For Selected Water Type :",waterSubTypeBasedInputConfigs);

  const totalDissolvedSolutes = Number(
    useSelector(
      (state) =>
        state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
          ?.streams[0]?.totalDissolvedSolutes
    )
  ).toFixed(2);

  const projectID = ProjectInfoStore.projectID;
  const caseID = ProjectInfoStore.caseId;
  const loggedInUserID = UserInfoStore.UserId;

  // const treatmentObjID = "1"; //DEC Scope only "PVDF Out-In High Recovery"

  const fieldMapping = {
    filtrateFlux: "Filtrate Flux",
    backwashFlux: "Backwash Flux",
    cEBFlux: "CEB Flux",
    forwardFlushFlow: "Forward Flush Flow",
    airFlow: "Air Flow",
    recycleFlowRate: "CIP Recycle Flow Rate",
    aerationAirFlow: "Aeration Air Flow",
    recycleFlowRate_MiniCIP: "Mini-CIP Recycle Flow Rate",
    miniCIP: "Mini-CIP",
    disinfectionCEB: "DisInfection CEB ",
    onlineTrains: "Online Trains",
    redundantStandbyTrains: "Standby Trains",
    modulesPerTrain: "Modules/Train",
    acidCEB_Filtration: "Acid CEB TMP Increase",
    cIP_Filtration: "CIP TMP increase",
    alkaliCEB_Filtration: "Alkali CEB TMP increase",
    strainerRecovery: "Strainer Recovery",
    strainerSize: "Strainer Size",
    cEBTemperature: "CEB Temperature",
    // mineralValue: "CEB Mineral Acid Concentration",
    // organicValue: "CEB Organic Acid Concentration",
    filteratePressure: "Filtrate Pressure",
    maxAirScourPressure: "Maximum Air Scour Pressure",
    nonIntegraPacTrainPresDrop: "Non-IntegraPac Filtration Pressure Drop",
    integraPacFiltrationPreDrop: "IntegraPac Filtration Pressure Drop",
    backwashPipingPreDrop: "Backwash Piping Pressure Drop",
    cIPPipingPreDrop: "CIP Piping Pressure Drop",
    pLCPowerReqPertrain: "PLC Power Requirement per Train",
    volvePowerReqPerTrain: "Valve Power Requirements per Valve",
    valvesPerTrain: "Valves per train",
    typicalWaitDuration_Dupont: "Typical Wait Duration_Dupont",
    typicalPumpRamp_Dupont: "Typical Pump Ramp_Dupont",
    chemicalStorageTime: "Chemical Storage Time (days)",
    bWTankRefillRate: "Backwash Only Tank Refill Rate",
    filterateTank: "Tank Size Factor (BW+Filtrate Tank)",
    bWTank: "Tank Size Factor (BW only Tank)",
    cIPTank: "Tank Size Factor (CIP Tank)",
    ceb_AirScour: "t_AS",
    backWash1_backWash: "t_BW1&2",
    backWash2_backWash: "t_BW1&2",
    forwardFlush_backWash: "t_FF",
    drain_backWash: "t_drain",
    backwash_AirScour: "t_AS",
    backWash1_CEB: "t_CEB1&2",
    backWash2_CEB: "t_CEB1&2",
    chemicalSoakingDuration_CEB: "CEB Soak Time",
    drain: "t_drain",
    forwardFlush: "t_FF",
    skidsPerTrain: "IntegraPac Skids/Train",
    modulesPerSkid: "IntegraPac Modules/Skid",
    chemicalSoakingDuration_CIP: "CIP Soak",
    // mineralValue_CIP: "CIP Mineral Acid Concentration",
    // organicValue_CIP: "CIP Organic Acid Concentration",
    // alkaliValue_CIP: "CIP Alkali Concentration",
    // oxidantValue_CIP: "CIP Oxidant Concentration",
    recycleDuration: "CIP Recycle",
    heatingStepDuration: "CIP Heating Step",
    cIPRinseSoakCycle: "CIP Rinse Soak Cycle",
  };

  useEffect(()=>{
      dispatch(
        setFeedFlowRate({
          value: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedFlowRate,unit.selectedUnits[1],unitTypeFlow).toFixed(2))),
          name: "feedFlowRate",
        })
      );
      dispatch(
        updateUFStore({
          ...UFData,
          ["filtrateFlux"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.filtrateFlux,unit.selectedUnits[4],unitTypeFlux).toFixed(2),
          ["backwashFlux"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashFlux,unit.selectedUnits[4],unitTypeFlux).toFixed(2),
          ["cEBFlux"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.cEBFlux,unit.selectedUnits[4],unitTypeFlux).toFixed(2),
          ["forwardFlushFlow"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.forwardFlushFlow,unit.selectedUnits[1],unitTypeFlow).toFixed(2),
          ["airFlow"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.airFlow,unit.selectedUnits[18],unitTypeGasFlow).toFixed(2),
          ["aerationAirFlow"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.aerationAirFlow,unit.selectedUnits[18],unitTypeGasFlow).toFixed(2),
          ["recycleFlowRate"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleFlowRate,unit.selectedUnits[1],unitTypeFlow).toFixed(2),
          ["recycleFlowRate_MiniCIP"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleFlowRate_MiniCIP,unit.selectedUnits[18],unitTypeFlow).toFixed(2),
          ["maxAirScourPressure"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirScourPressure,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["maxAirProcPressure"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirProcPressure,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["filteratePressure"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.filteratePressure,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["nonIntegraPacTrainPresDrop"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.nonIntegraPacTrainPresDrop,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["integraPacFiltrationPreDrop"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.integraPacFiltrationPreDrop,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["backwashPipingPreDrop"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashPipingPreDrop,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["cIPPipingPreDrop"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.cIPPipingPreDrop,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["backwash_Filtration"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwash_Filtration,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["acidCEB_Filtration"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.acidCEB_Filtration,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["alkaliCEB_Filtration"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.alkaliCEB_Filtration,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["cIP_Filtration"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.cIP_Filtration,unit.selectedUnits[3],unitTypePressure).toFixed(2),
          ["pLCPowerReqPertrain"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.pLCPowerReqPertrain,unit.selectedUnits[9],unitTypePower).toFixed(2),
          ["volvePowerReqPerTrain"]: GlobalUnitConversion(GlobalUnitConversionStore,UFData.volvePowerReqPerTrain,unit.selectedUnits[9],unitTypePower).toFixed(2),
        })
      );
      const sendData = { target: "recycleTemperature", value: GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleTemperature,unit.selectedUnits[2],unitTypeTemp).toFixed(2) };
      dispatch(updateCipData(sendData));
      const fluxData=GlobalUnitConversion(GlobalUnitConversionStore,calcEngineData.flux_Filter_actual,unit.selectedUnits[4],unitTypeFlux).toFixed(2);
      dispatch(
        handleCalcEngineResponse({...calcEngineData,["flux_Filter_actual"]:fluxData})
      );
    dispatch(updateUnitTypeFlux(unit.selectedUnits[4]));
    dispatch(updateUnitTypeFlow(unit.selectedUnits[1]));
    dispatch(updateUnitTypeGasFlow(unit.selectedUnits[18]));
    dispatch(updateUnitTypePressure(unit.selectedUnits[3]));
    dispatch(updateUnitTypePower(unit.selectedUnits[9]));
    dispatch(updateUnitTypeTemp(unit.selectedUnits[2]));
    dispatch(updateUnitFlag(false));
  },[unit.selectedUnits]);
  useEffect(() => {
    callUFDetailsAPI();
  }, []);
  useEffect(() => {
    callCEBAPI();
    callCIPAPI();
  }, [showInDropDown]);

  const getConfigForFiltrateFlux = () => {
    console.log("*********** FF Debug : UF :  getConfigForFiltrateFlux : Called : ");
    const filtrateFluxRange = ufFluxGuideline.filter(
      (config) =>
        config.waterSubTypeId == waterSubTypeID &&
        config.moduleType == selectedUFModule.moduleType
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

      console.log("*********** FF Debug :UF: tempDesign : ",tempDesign);
      console.log("*********** FF Debug :UF: moduleType : ",filtrateFluxRange[0].moduleType);
      console.log("*********** FF Debug :UF: waterSubTypeID : ",waterSubTypeID);
      console.log("*********** FF Debug :UF: typicalValue : ", filtrateFluxRange[0].typicalValue);
      console.log("*********** FF Debug :UF: TCF : ", TCF);
      console.log("*********** FF Debug :UF: Default_Corrected computed: ", Default_Corrected);
      console.log("*********** FF Debug : UF :  getConfigForFiltrateFlux : Filterateflux calculated : ",Filterateflux);

      const filtrateFluxConfig = {
        label: "Filtrate Flux",
        defaultValue: Filterateflux, //filtrateFluxRange[0]?.typicalValue,
        minValue: filtrateFluxRange[0]?.minValue,
        maxValue: filtrateFluxRange[0]?.maxValue,
        uom: "L/hr/m²",
        softLowerLimit: "",
        softUpperLimit: "",
        waterSubType: filtrateFluxRange[0]?.waterSubTypeId,
        moduleType: filtrateFluxRange[0]?.moduleType,
      };
      return [{ ...filtrateFluxConfig }];
    } else {
      console.log(
        `No config available for FILTRATE FLUX For waterSubTypeID: ${waterSubTypeID} and moduleType: ${selectedUFModule.moduleType}`
      );
      return [
        {
          label: "Filtrate Flux",
          defaultValue: "1",
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
  const getConfigForForwardFlushFlow = () => {
    const genericRange = ufInputRangeConfig.filter(
      (config) => config.label == "Forward Flush Flow"
    );
    //Calculating ForwardFlowFlow based on the uf module selected and filtrateFlux
    const filtrateFluxRangeConfig = getConfigForFiltrateFlux();

    const NewFFFlowSL =
      selectedUFModule.moduleArea *
      filtrateFluxRangeConfig[0].minValue *
      0.001 *
      0.5;
    const NewFFFlowSU =
      selectedUFModule.moduleArea * filtrateFluxRangeConfig[0].maxValue * 0.001;
    const FFFLOWMIN = Math.floor(((NewFFFlowSL * 100) / 25) * 0.25) * 1;
    const FFFLOWMAX = Math.ceil(((NewFFFlowSU * 100) / 25) * 0.25) * 1;
    const FFFlow_min = FFFLOWMIN;
    const FFFlow_max = FFFLOWMAX;
    const FFFlow_default =
      (selectedUFModule.moduleArea * filtrateFluxRangeConfig[0].defaultValue) /
      1000;

    const FFFlowRange = [
      {
        ...genericRange[0],
        minValue: FFFlow_min,
        maxValue: FFFlow_max,
        defaultValue: FFFlow_default,
      },
    ];
    return FFFlowRange;
  };
  const getConfigForAirFlow = () => {
    //based on module id
    const genericRange = ufInputRangeConfig.filter(
      (config) => config.label == "Air Flow"
    );
    const airFlowRange = [
      {
        ...genericRange[0],
        minValue: selectedUFModule.aS_Flow_min,
        maxValue: selectedUFModule.aS_Flow_max,
        defaultValue: selectedUFModule.aS_Flow_std,
      },
    ];
    return airFlowRange;
  };
  let normalRange=[];
  let rangeOnWaterSubType=[];

  const getConfigForUFFields = (label) => {
    let normalRange=[];
    let rangeOnWaterSubType=[];
    if (label == "recycleFlowRate") {
      //based on module id
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "CIP Recycle Flow Rate"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "CIP Recycle Flow Rate"
      );
      normalRange = [
        {
          ...normalRange[0],
          minValue: selectedUFModule.cIP_Flow_min,
          maxValue: selectedUFModule.cIP_Flow_max,
          defaultValue: selectedUFModule.cIP_Flow_std,
        },
      ];
    } else if (label == "miniCIP") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Mini-CIP"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "mCIP Interval"
      );
    } else if (label == "valveOpenCloseDuration") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Valve Open/Close Action Duration"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "t_valves"
      );
    } else if (label == "oxidantDosage") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Backwash Oxidant Concentration"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "Backwash NaOCl Dose"
      );
    } else if (label == "backwash_design") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Filtration Duration"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "Backwash Interval"
      );
    } else if (label == "alkaliOxidantCEB") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Alkaline CEB"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "Alkali CEB Interval"
      );
    } else if (label == "acidCEB") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "Acid CEB"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "Acid CEB Interval"
      );
    } else if (label == "cIP") {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == "CIP"
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == "CIP Interval"
      );
    } else {
      normalRange = ufInputRangeConfig.filter(
        (config) => config.label == fieldMapping[label]
      );
      rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
        (config) => config.label == fieldMapping[label]
      );
    }
    const rangeConfig =
      rangeOnWaterSubType?.length > 0 ? rangeOnWaterSubType : normalRange;
    return rangeConfig;
  };
  const getFieldRangeConfig = (label) => {
    if (fieldMapping[label] == "Filtrate Flux") {
      return getConfigForFiltrateFlux();
    } else if (fieldMapping[label] == "Forward Flush Flow") {
      //based on module and filtrateFlux
      return getConfigForForwardFlushFlow();
    } else if (fieldMapping[label] == "Air Flow") {
      //based on module
      return getConfigForAirFlow();
    } else {
      //based on waterSubTypeID
      return getConfigForUFFields(label);
    }
  };
  const getModuleDetails = (moduleID) => {
    const selectedModules = ufModules.filter((m) => m.ufmoduleId == moduleID);
    if (selectedModules.length > 0 && selectedModules[0]) {
      if (selectedModules[0]?.newModuleLongName?.indexOf("UXA") >= 0) {
        dispatch(updateUFStore({ ...UFData, ["uFBWProtocolID"]: "1" }));
      }
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
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsError(false);
    }
  };

  useEffect(() => {
    let newData = false;
    if (responseUFDetails.isLoading) {
      console.log("Loading");
      newData = true;
    } else {
      if (responseUFDetails.status === "fulfilled") {
        const obj = { ...responseUFDetails.data };
        const UFDefaultConfigs = { ...UFData };
        const storeObj = { ...UFData };

        let UFInputKeys = Object.keys(responseUFDetails.data);
        if (
          obj["uFModuleID"] == 0 ||
          waterSubTypeFlag ||
          caseTreatmentID == 0
        ) {
          let obj = { ...blankData };
          let UFInputKeys = Object.keys(blankData);
          let UFDefaultConfigs = { ...UFData };
          let storeObj = { ...UFData };
          dispatch(setCustomAvail(true));

          UFInputKeys?.map((x) => {
            if (x == "uFModuleID") {
              let moduleID =
                responseUFDetails.data.uFModuleID == 0
                  ? "24"
                  : responseUFDetails.data.uFModuleID;
              storeObj["uFModuleID"] = moduleID;
              const activeModuleDetails = getModuleDetails(moduleID);
              dispatch(updateActiveUFModule(activeModuleDetails));
              storeObj["uFBWProtocolID"] =
                activeModuleDetails?.newModuleLongName?.indexOf("UXA") >= 0
                  ? "1"
                  : UFData.uFBWProtocolID;
            }

            storeObj["disOxidantEnabled_Ind_CEB"] = false;
            const config = getFieldRangeConfig(x);
            if (config?.length > 0) {
              UFDefaultConfigs[x] = config[0];
            } else {
              UFDefaultConfigs[x] = {};
            }

            if (obj[x] === null) {
              storeObj[x] = "0";
            }
            if (obj[x] == 0) {
              const fieldConfiguration = getFieldRangeConfig(x);
              if (fieldConfiguration?.length > 0) {
                storeObj[x] =
                  fieldConfiguration[0]?.defaultValue == 0
                    ? fieldConfiguration[0]?.minValue
                    : fieldConfiguration[0]?.defaultValue;
                if(x==="filtrateFlux" || x==="backwashFlux" || x==="cEBFlux"){
                  if(unit.selectedUnits[4]!=="LMH"){
                    let defaultValue= fieldConfiguration[0]?.defaultValue == 0?(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.minValue,unit.selectedUnits[4],"LMH").toFixed(2)):(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.defaultValue,unit.selectedUnits[4],"LMH").toFixed(2));
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="maxAirScourPressure" || x==="maxAirProcPressure" || x==="filteratePressure" || x==="nonIntegraPacTrainPresDrop" || x==="integraPacFiltrationPreDrop" || x==="backwashPipingPreDrop" || x==="cIPPipingPreDrop" || x==="backwash_Filtration" || x==="acidCEB_Filtration" || x==="alkaliCEB_Filtration" || x==="cIP_Filtration"){
                  if(unit.selectedUnits[3]!=="bar"){
                    let defaultValue= fieldConfiguration[0]?.defaultValue == 0?(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.minValue,unit.selectedUnits[3],"bar").toFixed(2)):(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.defaultValue,unit.selectedUnits[3],"bar").toFixed(2));
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="forwardFlushFlow" || x==="recycleFlowRate" || x==="recycleFlowRate_MiniCIP"){
                  if(unit.selectedUnits[1]!=="m³/h"){
                    let defaultValue= fieldConfiguration[0]?.defaultValue == 0?(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.minValue,unit.selectedUnits[1],"m³/h").toFixed(2)):(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.defaultValue,unit.selectedUnits[1],"m³/h").toFixed(2));
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="airFlow" || x==="aerationAirFlow"){
                  if(unit.selectedUnits[18]!=="Nm³/h"){
                    let defaultValue= fieldConfiguration[0]?.defaultValue == 0?(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.minValue,unit.selectedUnits[18],"Nm³/h").toFixed(2)):(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.defaultValue,unit.selectedUnits[18],"Nm³/h").toFixed(2));
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="pLCPowerReqPertrain" || x==="volvePowerReqPerTrain"){
                  if(unit.selectedUnits[9]!=="kW"){
                    let defaultValue= fieldConfiguration[0]?.defaultValue == 0?(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.minValue,unit.selectedUnits[9],"kW").toFixed(2)):(GlobalUnitConversion(GlobalUnitConversionStore,fieldConfiguration[0]?.defaultValue,unit.selectedUnits[9],"kW").toFixed(2));
                    storeObj[x]=defaultValue;
                  }
                }
              }
              //non dupont fields are set as zero
              if (
                x == "backwash_Filtration" ||
                x == "lF" ||
                x == "disinfectionCEB" ||
                x == "aerationAirFlow" ||
                x == "recycleFlowRate_MiniCIP" ||
                x == "miniCIP"
              ) {
                storeObj[x] = 0;
              }

              if (x == "t_BWBtnAirScour") {
                storeObj[x] = 1;
              }
            }

            if(UFData.isWaterSubTypeChanged == true || UFData.isDesignTempChanged == true){
              console.log("FeedSetup Config Changed - YES");
              const fieldConfig = getFieldRangeConfig(x);
              if (fieldConfig?.length > 0) {
                storeObj[x] = fieldConfig[0]?.defaultValue;
                if(x==="filtrateFlux" || x==="backwashFlux" || x==="cEBFlux"){
                  if(unit.selectedUnits[4]!=="LMH"){
                    let defaultValue= GlobalUnitConversion(GlobalUnitConversionStore,fieldConfig[0]?.defaultValue,unit.selectedUnits[4],"LMH").toFixed(2);
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="maxAirScourPressure" || x==="maxAirProcPressure" || x==="filteratePressure" || x==="nonIntegraPacTrainPresDrop" || x==="integraPacFiltrationPreDrop" || x==="backwashPipingPreDrop" || x==="cIPPipingPreDrop" || x==="backwash_Filtration" || x==="acidCEB_Filtration" || x==="alkaliCEB_Filtration" || x==="cIP_Filtration"){
                  if(unit.selectedUnits[3]!=="bar"){
                    let defaultValue= GlobalUnitConversion(GlobalUnitConversionStore,fieldConfig[0]?.defaultValue,unit.selectedUnits[3],"bar").toFixed(2);
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="forwardFlushFlow" || x==="recycleFlowRate" || x==="recycleFlowRate_MiniCIP"){
                  if(unit.selectedUnits[1]!=="m³/h"){
                    let defaultValue= GlobalUnitConversion(GlobalUnitConversionStore,fieldConfig[0]?.defaultValue,unit.selectedUnits[1],"m³/h").toFixed(2);
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="airFlow" || x==="aerationAirFlow"){
                  if(unit.selectedUnits[18]!=="Nm³/h"){
                    let defaultValue= GlobalUnitConversion(GlobalUnitConversionStore,fieldConfig[0]?.defaultValue,unit.selectedUnits[18],"Nm³/h").toFixed(2);
                    storeObj[x]=defaultValue;
                  }
                }else if(x==="pLCPowerReqPertrain" || x==="volvePowerReqPerTrain"){
                  if(unit.selectedUnits[9]!=="kW"){
                    let defaultValue= GlobalUnitConversion(GlobalUnitConversionStore,fieldConfig[0]?.defaultValue,unit.selectedUnits[9],"kW").toFixed(2);
                    storeObj[x]=defaultValue;
                  }
                }
              } 
            }else{
              console.log("FeedSetup Config Changed - NO");
            }
            // storeObj[x] = obj[x];
          });
          storeObj.userID = loggedInUserID;
          storeObj.projectID = projectID;
          storeObj.fromTreatmentObjID = obj.fromTreatmentObjID;
          storeObj.caseTreatmentID = responseUFDetails.data.caseTreatmentID;
          storeObj.treatmentObjID = responseUFDetails.data.treatmentObjID;
          storeObj.caseID = caseID;
          storeObj.bWStepInCIP = obj.bWStepInCIP == 0 ? 2 : obj.bWStepInCIP;
          storeObj.rinseBWCycle = obj.rinseBWCycle == 0 ? 1 : obj.rinseBWCycle;

          if(unit.selectedUnits[2]!=="°C"){
            storeObj.recycleTemperature =
            obj.recycleTemperature == 0
              ? tempDesign > 95
                ? tempDesign
                : 95
              : obj.recycleTemperature;
          }else{
            storeObj.recycleTemperature =
            obj.recycleTemperature == 0
              ? tempDesign > 35
                ? tempDesign
                : 35
              : obj.recycleTemperature;
          }

          if (obj["uFBWCEBStandbyOptionID"] == 0) {
            storeObj.uFBWCEBStandbyOptionID = 1;
          }
          if (obj["uFBWFlushWaterTypeID"] == 0) {
            storeObj.uFBWFlushWaterTypeID = 1;
          }
          if (obj["uFBWWaterTypeID"] == 0) {
            storeObj.uFBWWaterTypeID = 2;
          }
          if (obj["uFBWProtocolID"] == 0) {
            storeObj.uFBWProtocolID = 2;
          }
          if (obj["uFCIPWaterTypeID"] == 0) {
            storeObj.uFCIPWaterTypeID = 1;
          }
          if (obj["uFCEBWaterTypeID"] == 0) {
            storeObj.uFCEBWaterTypeID = 1;
          }
          if (obj["uFMiniCIPWaterTypeID"] == 0) {
            storeObj.uFMiniCIPWaterTypeID = 1;
          }
          //chemical default CEB---------------------------------
          storeObj.offlinetimepertrain = 0;
          if (obj["alkaliEnabled_Ind_CEB"]) {
            if (obj["alkaliChemId"] == 0) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              storeObj.alkaliChemId = chem.iD.toString();
              storeObj.alkaliValueInPh_Ind = totalDissolvedSolutes > 0;
              storeObj.alkaliEnabled_Ind_CEB = obj["alkaliEnabled_Ind_CEB"];
              if (totalDissolvedSolutes > 0) {
                storeObj.alkaliValue = 12;
              } else {
                let alkaliTemp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CEB")
                );
                storeObj.alkaliValue = alkaliTemp ? alkaliTemp.targetDose : 650;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              if (obj["alkaliValueInPh_Ind"] != totalDissolvedSolutes > 0) {
                storeObj.alkaliValueInPh_Ind = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.alkaliValue = 12;
                } else {
                  let alkaliTemp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CEB")
                  );
                  storeObj.alkaliValue = alkaliTemp
                    ? alkaliTemp.targetDose
                    : 650;
                }
              }
            }
          }
          if (obj["mineralEnabled_Ind_CEB"]) {
            if (obj["mineralChemId"] == 0) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              storeObj.mineralChemId = chem.iD.toString();
              storeObj.mineralValueInPh_Ind = totalDissolvedSolutes > 0;
              storeObj.mineralEnabled_Ind_CEB = obj["mineralEnabled_Ind_CEB"];
              if (totalDissolvedSolutes > 0) {
                storeObj.mineralValue = 2;
              } else {
                let mineralTemp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CEB")
                );
                storeObj.mineralValue = mineralTemp
                  ? mineralTemp.targetDose
                  : 650;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              if (obj["mineralValueInPh_Ind"] != totalDissolvedSolutes > 0) {
                storeObj.mineralValueInPh_Ind = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.mineralValue = 2;
                } else {
                  let mineralTemp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CEB")
                  );
                  storeObj.mineralValue = mineralTemp
                    ? mineralTemp.targetDose
                    : 650;
                }
              }
            }
          }
          if (obj["organicEnabled_Ind_CEB"]) {
            if (obj["organicChemId"] == 0) {
              storeObj.organicEnabled_Ind_CEB = false;
            }
          }
          if (obj["oxidantEnabled_Ind_CEB"]) {
            if (obj["oxidantChemId"] == 0) {
              storeObj.oxidantEnabled_Ind_CEB = obj["oxidantEnabled_Ind_CEB"];
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Oxidant"
              );
              storeObj.oxidantChemId = chem.iD.toString();
              let oxidantChemId_Temp = ufDoseGuidline.find(
                (item) =>
                  item.waterSubTypeId == waterSubTypeID &&
                  item.symbol == chem.symbol &&
                  item.guidelineName.includes("CEB")
              );
              storeObj.oxidantValue = oxidantChemId_Temp
                ? oxidantChemId_Temp.targetDose
                : 1000;
            }
          }

          //chemical default CIP---------------------------------

          if (obj["alkaliEnabled_Ind_CIP"]) {
            if (
              obj["alkaliChemId_CIP"] == 0 ||
              obj["alkaliChemId_CIP"] == null
            ) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              storeObj.alkaliChemId_CIP = chem.iD.toString();
              storeObj.alkaliValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
              storeObj.alkaliEnabled_Ind_CIP = obj["alkaliEnabled_Ind_CIP"];
              if (totalDissolvedSolutes > 0) {
                storeObj.alkaliValue_CIP = 12;
              } else {
                let alkaliValue_CIP_Temp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CIP")
                );
                storeObj.alkaliValue_CIP = alkaliValue_CIP_Temp
                  ? alkaliValue_CIP_Temp.targetDose
                  : 1000;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              if (obj["alkaliValueInPh_Ind_CIP"] != totalDissolvedSolutes > 0) {
                storeObj.alkaliValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.alkaliValue_CIP = 12;
                } else {
                  let alkaliValue_CIP_Temp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CIP")
                  );
                  storeObj.alkaliValue_CIP = alkaliValue_CIP_Temp
                    ? alkaliValue_CIP_Temp.targetDose
                    : 1000;
                }
              }
            }
          }
          if (obj["mineralEnabled_Ind_CIP"]) {
            if (
              obj["mineralChemId_CIP"] == 0 ||
              obj["mineralChemId_CIP"] == null
            ) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              storeObj.mineralChemId_CIP = chem.iD.toString();
              storeObj.mineralValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
              storeObj.mineralEnabled_Ind_CIP = obj["mineralEnabled_Ind_CIP"];
              if (totalDissolvedSolutes > 0) {
                storeObj.mineralValue_CIP = 2;
              } else {
                let mineralValue_CIP_Temp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CIP")
                );
                storeObj.mineralValue_CIP = mineralValue_CIP_Temp
                  ? mineralValue_CIP_Temp.targetDose
                  : 2000;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              if (
                obj["mineralValueInPh_Ind_CIP"] !=
                totalDissolvedSolutes > 0
              ) {
                storeObj.mineralValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.mineralValue_CIP = 2;
                } else {
                  let mineralValue_CIP_Temp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CIP")
                  );
                  storeObj.mineralValue_CIP = mineralValue_CIP_Temp
                    ? mineralValue_CIP_Temp.targetDose
                    : 2000;
                }
              }
            }
          }
          if (obj["organicEnabled_Ind_CIP"]) {
            if (
              obj["organicChemId_CIP"] == 0 ||
              obj["organicChemId_CIP"] == null
            ) {
              storeObj.organicEnabled_Ind_CIP = false;
              storeObj.organicChemId_CIP = 0;
              storeObj.organicValue_CIP = 0;
            }
          }
          if (obj["oxidantEnabled_Ind_CIP"]) {
            if (
              obj["oxidantChemId_CIP"] == 0 ||
              obj["oxidantChemId_CIP"] == null
            ) {
              storeObj.oxidantEnabled_Ind_CIP = obj["oxidantEnabled_Ind_CIP"];
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Oxidant"
              );
              storeObj.oxidantChemId_CIP = chem.iD.toString();
              let oxidantValue_CIP_Temp = ufDoseGuidline.find(
                (item) =>
                  item.waterSubTypeId == waterSubTypeID &&
                  item.symbol == chem.symbol &&
                  item.guidelineName.includes("CIP")
              );
              storeObj.oxidantValue_CIP = oxidantValue_CIP_Temp
                ? oxidantValue_CIP_Temp.targetDose
                : 1000;
            }
          }
          if (obj["bWDesignTemperature_Ind"]) {
            if (obj["oxidantID"] == 0 || obj["oxidantID"] == null) {
              if (waterSubTypeFlag == true && waterTypeID == 7) {
                let chem = showInDropDown.find(
                  (item) => item.chemicalCat == "Oxidant"
                );
                storeObj.oxidantID = chem.iD.toString();
                // obj.oxidantDosage = 0;
                if (chem.symbol.includes("NaOCl")) {
                  rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
                    (config) => config.label == "Backwash NaOCl Dose"
                  );
                  storeObj.oxidantDosage = 10;
                } else {
                  normalRange = ufInputRangeConfig.filter(
                    (config) => config.label == "Backwash Oxidant Concentration"
                  );
                  storeObj.oxidantDosage = 10;
                }
              } else {
                storeObj.bWDesignTemperature_Ind = false;
              }
            }
          } else {
            if (waterTypeID == 7) {
              storeObj.bWDesignTemperature_Ind = true;
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Oxidant"
              );

              storeObj.oxidantID = chem.iD.toString();
              // obj.oxidantDosage = 0;
              if (chem.symbol.includes("NaOCl")) {
                rangeOnWaterSubType = waterSubTypeBasedInputConfigs.filter(
                  (config) => config.label == "Backwash NaOCl Dose"
                );
                storeObj.oxidantDosage = rangeOnWaterSubType.defaultValue;
              } else {
                normalRange = ufInputRangeConfig.filter(
                  (config) => config.label == "Backwash Oxidant Concentration"
                );
                storeObj.oxidantDosage = normalRange.defaultValue;
              }
            }
          }
          dispatch(updateWaterSubtypeFlag(false));
          dispatch(updateUFStore(storeObj));
          dispatch(updateUFDefaultInputRangeConfig(UFDefaultConfigs));
        } else {
          dispatch(setCustomAvail(false));
          const storeObj = { ...responseUFDetails.data };
          if (obj["alkaliEnabled_Ind_CEB"]) {
            let chem = showInDropDown.find(
              (item) => item.chemicalCat == "Base"
            );
            if (obj["alkaliValueInPh_Ind"] != totalDissolvedSolutes > 0) {
              storeObj.alkaliValueInPh_Ind = totalDissolvedSolutes > 0;
              if (totalDissolvedSolutes > 0) {
                storeObj.alkaliValue = 12;
              } else {
                let alkaliTemp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CEB")
                );
                storeObj.alkaliValue = alkaliTemp ? alkaliTemp.targetDose : 650;
              }
            }
          } else {
            storeObj.alkaliChemId = 0;
            storeObj.alkaliValue = 0;
          }
          if (obj["mineralEnabled_Ind_CEB"]) {
            if (obj["mineralChemId"] == 0) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              storeObj.mineralChemId = chem.iD.toString();
              storeObj.mineralValueInPh_Ind = totalDissolvedSolutes > 0;
              storeObj.mineralEnabled_Ind_CEB = obj["mineralEnabled_Ind_CEB"];
              if (totalDissolvedSolutes > 0) {
                storeObj.mineralValue = 2;
              } else {
                let mineralTemp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CEB")
                );
                storeObj.mineralValue = mineralTemp
                  ? mineralTemp.targetDose
                  : 650;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              if (obj["mineralValueInPh_Ind"] != totalDissolvedSolutes > 0) {
                storeObj.mineralValueInPh_Ind = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.mineralValue = 2;
                } else {
                  let mineralTemp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CEB")
                  );
                  storeObj.mineralValue = mineralTemp
                    ? mineralTemp.targetDose
                    : 650;
                }
              }
            }
          } else {
            storeObj.mineralChemId = 0;
            storeObj.mineralValue = 0;
          }
          if (obj["organicEnabled_Ind_CEB"]) {
            if (obj["organicChemId"] == 0) {
              storeObj.organicEnabled_Ind_CEB = false;
              storeObj.organicChemId = 0;
              storeObj.organicValue = 0;
            }
          } else {
            storeObj.organicChemId = 0;
            storeObj.organicValue = 0;
          }
          if (obj["oxidantEnabled_Ind_CEB"]) {
            if (obj["oxidantChemId"] == 0) {
              storeObj.oxidantEnabled_Ind_CEB = obj["oxidantEnabled_Ind_CEB"];
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Oxidant"
              );
              storeObj.oxidantChemId = chem.iD.toString();
              let oxidantChemId_Temp = ufDoseGuidline.find(
                (item) =>
                  item.waterSubTypeId == waterSubTypeID &&
                  item.symbol == chem.symbol &&
                  item.guidelineName.includes("CEB")
              );
              storeObj.oxidantValue = oxidantChemId_Temp
                ? oxidantChemId_Temp.targetDose
                : 1000;
            }
          } else {
            storeObj.oxidantChemId = 0;
            storeObj.oxidantValue = 0;
          }

          //chemical default CIP---------------------------------

          if (obj["alkaliEnabled_Ind_CIP"]) {
            if (
              obj["alkaliChemId_CIP"] == 0 ||
              obj["alkaliChemId_CIP"] == null
            ) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              storeObj.alkaliChemId_CIP = chem.iD.toString();
              storeObj.alkaliValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
              storeObj.alkaliEnabled_Ind_CIP = obj["alkaliEnabled_Ind_CIP"];
              if (totalDissolvedSolutes > 0) {
                storeObj.alkaliValue_CIP = 12;
              } else {
                let alkaliValue_CIP_Temp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CIP")
                );
                storeObj.alkaliValue_CIP = alkaliValue_CIP_Temp
                  ? alkaliValue_CIP_Temp.targetDose
                  : 1000;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Base"
              );
              if (obj["alkaliValueInPh_Ind_CIP"] != totalDissolvedSolutes > 0) {
                storeObj.alkaliValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.alkaliValue_CIP = 12;
                } else {
                  let alkaliValue_CIP_Temp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CIP")
                  );
                  storeObj.alkaliValue_CIP = alkaliValue_CIP_Temp
                    ? alkaliValue_CIP_Temp.targetDose
                    : 1000;
                }
              }
            }
          } else {
            storeObj.alkaliChemId_CIP = 0;
            storeObj.alkaliValue_CIP = 0;
          }
          if (obj["mineralEnabled_Ind_CIP"]) {
            if (
              obj["mineralChemId_CIP"] == 0 ||
              obj["mineralChemId_CIP"] == null
            ) {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              storeObj.mineralChemId_CIP = chem.iD.toString();
              storeObj.mineralValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
              storeObj.mineralEnabled_Ind_CIP = obj["mineralEnabled_Ind_CIP"];
              if (totalDissolvedSolutes > 0) {
                storeObj.mineralValue_CIP = 2;
              } else {
                let mineralValue_CIP_Temp = ufDoseGuidline.find(
                  (item) =>
                    item.waterSubTypeId == waterSubTypeID &&
                    item.symbol == chem.symbol &&
                    item.guidelineName.includes("CIP")
                );
                storeObj.mineralValue_CIP = mineralValue_CIP_Temp
                  ? mineralValue_CIP_Temp.targetDose
                  : 2000;
              }
            } else {
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Acid"
              );
              if (
                obj["mineralValueInPh_Ind_CIP"] !=
                totalDissolvedSolutes > 0
              ) {
                storeObj.mineralValueInPh_Ind_CIP = totalDissolvedSolutes > 0;
                if (totalDissolvedSolutes > 0) {
                  storeObj.mineralValue_CIP = 2;
                } else {
                  let mineralValue_CIP_Temp = ufDoseGuidline.find(
                    (item) =>
                      item.waterSubTypeId == waterSubTypeID &&
                      item.symbol == chem.symbol &&
                      item.guidelineName.includes("CIP")
                  );
                  storeObj.mineralValue_CIP = mineralValue_CIP_Temp
                    ? mineralValue_CIP_Temp.targetDose
                    : 2000;
                }
              }
            }
          } else {
            storeObj.mineralChemId_CIP = 0;
            storeObj.mineralValue_CIP = 0;
          }
          if (obj["organicEnabled_Ind_CIP"]) {
            if (
              obj["organicChemId_CIP"] == 0 ||
              obj["organicChemId_CIP"] == null
            ) {
              storeObj.organicEnabled_Ind_CIP = false;
              storeObj.organicChemId_CIP = 0;
              storeObj.organicValue_CIP = 0;
            }
          } else {
            storeObj.organicChemId_CIP = 0;
            storeObj.organicValue_CIP = 0;
          }
          if (obj["oxidantEnabled_Ind_CIP"]) {
            if (
              obj["oxidantChemId_CIP"] == 0 ||
              obj["oxidantChemId_CIP"] == null
            ) {
              storeObj.oxidantEnabled_Ind_CIP = obj["oxidantEnabled_Ind_CIP"];
              let chem = showInDropDown.find(
                (item) => item.chemicalCat == "Oxidant"
              );
              storeObj.oxidantChemId_CIP = chem.iD.toString();
              let oxidantValue_CIP_Temp = ufDoseGuidline.find(
                (item) =>
                  item.waterSubTypeId == waterSubTypeID &&
                  item.symbol == chem.symbol &&
                  item.guidelineName.includes("CIP")
              );
              storeObj.oxidantValue_CIP = oxidantValue_CIP_Temp
                ? oxidantValue_CIP_Temp.targetDose
                : 1000;
            }
          } else {
            storeObj.oxidantChemId_CIP = 0;
            storeObj.oxidantValue_CIP = 0;
          }

          UFInputKeys?.map((x) => {
            const config = getFieldRangeConfig(x);
            if (config?.length > 0) {
              UFDefaultConfigs[x] = config[0];
            } else {
              UFDefaultConfigs[x] = {};
            }
            //Recompute UF Field values if WaterSubType or DesignTemp is changed.
            if(UFData.isWaterSubTypeChanged == true || UFData.isDesignTempChanged == true){
              console.log("FeedSetup Config Changed - YES");
              const fieldConfig = getFieldRangeConfig(x);
              if (fieldConfig?.length > 0) {
                storeObj[x] = fieldConfig[0]?.defaultValue;
              } 
            }else{
              console.log("FeedSetup Config Changed - NO");
            }
          });
          if(unit.selectedUnits[2]!=="°C"){
            storeObj.recycleTemperature=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.recycleTemperature,unit.selectedUnits[2],"°C").toFixed(2);
          }
          if(unit.selectedUnits[3]!=="bar"){
            storeObj.maxAirScourPressure=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.maxAirScourPressure,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.maxAirProcPressure=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.maxAirProcPressure,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.filteratePressure=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.filteratePressure,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.nonIntegraPacTrainPresDrop=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.nonIntegraPacTrainPresDrop,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.integraPacFiltrationPreDrop=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.integraPacFiltrationPreDrop,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.backwashPipingPreDrop=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.backwashPipingPreDrop,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.cIPPipingPreDrop=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.cIPPipingPreDrop,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.backwash_Filtration=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.backwash_Filtration,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.acidCEB_Filtration=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.acidCEB_Filtration,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.alkaliCEB_Filtration=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.alkaliCEB_Filtration,unit.selectedUnits[3],"bar").toFixed(2);
            storeObj.cIP_Filtration=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.cIP_Filtration,unit.selectedUnits[3],"bar").toFixed(2);
          }
          if(unit.selectedUnits[4]!=="LMH"){
            storeObj.filtrateFlux=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.filtrateFlux,unit.selectedUnits[4],"LMH").toFixed(2);
            storeObj.backwashFlux=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.backwashFlux,unit.selectedUnits[4],"LMH").toFixed(2);
            storeObj.cEBFlux=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.cEBFlux,unit.selectedUnits[4],"LMH").toFixed(2);
            // handleOperatingFlux(GlobalUnitConversion(GlobalUnitConversionStore,calcEngineData.flux_Filter_actual,unit.selectedUnits[4],unitTypeFlux));
          }
          if(unit.selectedUnits[1]!=="m³/h"){
            storeObj.forwardFlushFlow=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.forwardFlushFlow,unit.selectedUnits[1],"m³/h").toFixed(2);
            storeObj.recycleFlowRate=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.recycleFlowRate,unit.selectedUnits[1],"m³/h").toFixed(2);
            storeObj.recycleFlowRate_MiniCIP=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.recycleFlowRate_MiniCIP,unit.selectedUnits[1],"m³/h").toFixed(2);
          }
          if(unit.selectedUnits[18]!=="Nm³/h"){
            storeObj.airFlow=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.airFlow,unit.selectedUnits[18],"Nm³/h").toFixed(2);
            storeObj.aerationAirFlow=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.aerationAirFlow,unit.selectedUnits[18],"Nm³/h").toFixed(2);
          }
          if(unit.selectedUnits[9]!=="kW"){
            storeObj.pLCPowerReqPertrain=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.pLCPowerReqPertrain,unit.selectedUnits[9],"kW").toFixed(2);
            storeObj.volvePowerReqPerTrain=GlobalUnitConversion(GlobalUnitConversionStore,responseUFDetails.data.volvePowerReqPerTrain,unit.selectedUnits[9],"kW").toFixed(2);
          }
          // dispatch(updateUFStore(obj));

          dispatch(updateUFStore(storeObj));
          dispatch(updateUFDefaultInputRangeConfig(UFDefaultConfigs));
        }

        if (
          obj["offlinetimepertrain"] != 12 &&
          obj["offlinetimepertrain"] != 0
        ) {
          dispatch(setCustomOfflineTimePerUnit(true));
        }
        dispatch(updateIsForDrinkingWater(obj["drinkingWater_Ind"]));
        dispatch(setUfDataUpdate(false));

        // dispatch(updateUFStore(obj));
      }
    }
    if (responseUFDetails.isError) {
      throw new MyError(
        "UFDetails Api Error",
        responseUFDetails.error.status,
        "ApiError"
      );
    }
  }, [responseUFDetails]);

  useEffect(() => {
    if (responseCeb.isLoading) {
      console.log("Loading");
    } else {
      if (responseCeb.isSuccess === true) {
        dispatch(handleCebDropdownData(responseCeb.data));
      }
    }
    if (responseCeb.isError) {
      throw new MyError(
        "UFDetails Api Error",
        responseCeb.error.status,
        "ApiError"
      );
    }
  }, [responseCeb]);

  useEffect(() => {
    if (responseCip.isLoading) {
      console.log("CIP UF loading........");
    }
    if (responseCip.isError) {
      throw new MyError(
        response.error.message,
        response.error.status,
        "ApiError"
      );
    }
    if (responseCip.isSuccess) {
      dispatch(handleCipDropdownData(responseCip.data));
    }
  }, [responseCip]);

  const updateUFSubMenus = (name) => {
    if (UFData.uFModuleID == "" || UFData.uFModuleID == "0") {
      setIsError(true);
      setErrorMessage("No Modules Selected");
    } else {
      setIsError(false);
      setErrorMessage("");
    }
    setActiveUFSubMenu(name);
    dispatch(setActiveTab(name));
    AutoSaveUFData();
  };

  const AutoSaveUFData = async () => {
    const data = {
      userID: UFData.userID,
      projectID: UFData.projectID,
      caseID: UFData.caseID,
      treatmentName: "UF",
      treatmentObjID: UFData.treatmentObjID,
      fromTreatmentObjID: UFData.fromTreatmentObjID,
      treatmentSeqNo: UFData.treatmentSeqNo,
      recoveryTypeID: parseInt(UFData.recoveryTypeID),
      recovery: Number(UFData.recovery),
      feed: Number(UFData.feed),
      automatic: UFData.automatic,
      recoveryRo: Number(UFData.recoveryRo),
      compactionTemperature: Number(UFData.compactionTemperature),
      isCompactionFlux: UFData.isCompactionFlux,
      uFDesignFluxID: parseInt(UFData.uFDesignFluxID),
      caseTreatmentID: parseInt(UFData.caseTreatmentID),
      filtrateFlux:Number (GlobalUnitConversion(GlobalUnitConversionStore,UFData.filtrateFlux,"LMH",unit.selectedUnits[4]).toFixed(2)),
      backwashFlux: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashFlux,"LMH",unit.selectedUnits[4]).toFixed(2)),
      cEBFlux: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cEBFlux,"LMH",unit.selectedUnits[4]).toFixed(2)),
      forwardFlushFlow: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.forwardFlushFlow,"m³/h",unit.selectedUnits[1]).toFixed(2)),
      airFlow: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.airFlow,"Nm³/h",unit.selectedUnits[18]).toFixed(2)),
      aerationAirFlow: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.aerationAirFlow,"Nm³/h",unit.selectedUnits[18]).toFixed(2)),
      recycleFlowRate: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleFlowRate,"m³/h",unit.selectedUnits[1]).toFixed(2)),
      recycleFlowRate_MiniCIP: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleFlowRate_MiniCIP,"m³/h",unit.selectedUnits[1]).toFixed(2)),
      uFModuleID: parseInt(UFData.uFModuleID),
      flow_FF1: Number(UFData.flow_FF1),
      flow_FF2: Number(UFData.flow_FF2),
      flow_FF3: Number(UFData.flow_FF3),
      flow_FF4: Number(UFData.flow_FF4),
      aDBWDisplacement: Number(UFData.aDBWDisplacement),
      fTLDisplacement: Number(UFData.fTLDisplacement),
      typicalWaitDuration_Dupont: Number(UFData.typicalWaitDuration_Dupont),
      typicalPumpRamp_Dupont: Number(UFData.typicalPumpRamp_Dupont),
      typicalWaitDuration_Inge: Number(UFData.typicalWaitDuration_Inge),
      typicalPumpRamp_Inge: Number(UFData.typicalPumpRamp_Inge),
      typicalWaitDuration_Memcor: Number(UFData.typicalWaitDuration_Memcor),
      typicalPumpRamp_Memcor: Number(UFData.typicalPumpRamp_Memcor),
      uFDesignCycleIntervalsID: parseInt(UFData.uFDesignCycleIntervalsID),
      backwash_design: Number(UFData.backwash_design),
      airScour_design: Number(UFData.airScour_design),
      acidCEB: Number(UFData.acidCEB),
      alkaliOxidantCEB: Number(UFData.alkaliOxidantCEB),
      cIP: Number(UFData.cIP),
      miniCIP: Number(UFData.miniCIP),
      disinfectionCEB: Number(UFData.disinfectionCEB),
      t_CEB_Rinse12: Number(UFData.t_CEB_Rinse12),
      t_CEB_Rinse2: Number(UFData.t_CEB_Rinse2),
      uFBWCEBStandbyOptionID: parseInt(UFData.uFBWCEBStandbyOptionID),
      bWPerCEBstandbyTrains: parseInt(UFData.bWPerCEBstandbyTrains),
      uFConfigurationID: parseInt(UFData.uFConfigurationID),
      uFCIPStandbyTrainOptionID: parseInt(UFData.uFCIPStandbyTrainOptionID),
      cIPstandbyTrains: parseInt(UFData.cIPstandbyTrains),
      integraPackDesign_Ind: UFData.integraPackDesign_Ind,
      drinkingWaterInd: UFData.drinkingWaterInd,
      membraneintergrityoption_Ind: UFData.membraneintergrityoption_Ind,
      modulesPerSkid: parseInt(UFData.modulesPerSkid),
      modulesPerTrain: parseInt(UFData.modulesPerTrain),
      offlinetimepertrain: parseInt(UFData.offlinetimepertrain),
      onlineTrains: parseInt(UFData.onlineTrains),
      redundantStandbyTrains: parseInt(UFData.redundantStandbyTrains),
      skids: parseInt(UFData.skids),
      skidsPerTrain: parseInt(UFData.skidsPerTrain),
      uFStorageTankOptionID: parseInt(UFData.uFStorageTankOptionID),
      totalModules: parseInt(UFData.totalModules),
      totalTrains: parseInt(UFData.totalTrains),
      redundantTrains: parseInt(UFData.redundantTrains),
      isBWCEBStandbyTrainsEnabled: UFData.isBWCEBStandbyTrainsEnabled,
      radTR1: UFData.radTR1,
      radTR2: UFData.radTR2,
      radTR3: UFData.radTR3,
      radMR1: UFData.radMR1,
      radMR2: UFData.radMR2,
      radMR3: UFData.radMR3,
      uFFiltrationID: Number(UFData.uFFiltrationID),
      backwash_Filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwash_Filtration,"bar",unit.selectedUnits[3]).toFixed(2)),
      acidCEB_Filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.acidCEB_Filtration,"bar",unit.selectedUnits[3]).toFixed(2)),
      alkaliCEB_Filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.alkaliCEB_Filtration,"bar",unit.selectedUnits[3]).toFixed(2)),
      cIP_Filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cIP_Filtration,"bar",unit.selectedUnits[3]).toFixed(2)),
      miniCIP_Filtration: Number(UFData.miniCIP_Filtration),
      strainerRecovery: Number(UFData.strainerRecovery),
      strainerSize: Number(UFData.strainerSize),
      uFTanksID: Number(UFData.uFTanksID),
      chemicalStorageTime: Number(UFData.chemicalStorageTime),
      bWTankRefillRate: Number(UFData.bWTankRefillRate),
      filterateTank: Number(UFData.filterateTank),
      bWTank: Number(UFData.bWTank),
      cIPTank: Number(UFData.cIPTank),
      uFEquipmentPressureID: Number(UFData.uFEquipmentPressureID),
      maxAirScourPressure: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirScourPressure,"bar",unit.selectedUnits[3]).toFixed(2)),
      maxAirProcPressure: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirProcPressure,"bar",unit.selectedUnits[3]).toFixed(2)),
      filteratePressure: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.filteratePressure,"bar",unit.selectedUnits[3]).toFixed(2)),
      nonIntegraPacTrainPresDrop: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.nonIntegraPacTrainPresDrop,"bar",unit.selectedUnits[3]).toFixed(2)),
      integraPacFiltrationPreDrop: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.integraPacFiltrationPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)),
      backwashPipingPreDrop: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashPipingPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)),
      cIPPipingPreDrop: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cIPPipingPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)),
      uFPowerID: Number(UFData.uFPowerID),
      pLCPowerReqPertrain: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.pLCPowerReqPertrain,"kW",unit.selectedUnits[9]).toFixed(2)),
      volvePowerReqPerTrain: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.volvePowerReqPerTrain,"kW",unit.selectedUnits[9]).toFixed(2)),
      uFValvesID: Number(UFData.uFValvesID),
      valvesPerTrain: Number(UFData.valvesPerTrain),
      valveOpenCloseDuration: Number(UFData.valveOpenCloseDuration),
      uFCEBID: Number(UFData.uFCEBID),
      uFCEBWaterTypeID: parseInt(UFData.uFCEBWaterTypeID),
      ceb_AirScour: Number(UFData.ceb_AirScour),
      backWash1_CEB: Number(UFData.backWash1_CEB),
      backWash2_CEB: Number(UFData.backWash2_CEB),
      cEBTemperature: parseInt(UFData.cEBTemperature),
      chemicalSoakingDuration_CEB: parseInt(UFData.chemicalSoakingDuration_CEB),
      drain: Number(UFData.drain),
      forwardFlush: Number(UFData.forwardFlush),
      designTemperature_Ind: UFData.designTemperature_Ind,
      ceb_LSI: Number(UFData.ceb_LSI),
      sameAsBackwash_Ind: UFData.sameAsBackwash_Ind,
      alkaliEnabled_Ind_CEB: UFData.alkaliEnabled_Ind_CEB,
      organicEnabled_Ind_CEB: UFData.organicEnabled_Ind_CEB,
      oxidantEnabled_Ind_CEB: UFData.oxidantEnabled_Ind_CEB,
      mineralEnabled_Ind_CEB: UFData.mineralEnabled_Ind_CEB,
      disOxidantEnabled_Ind_CEB: UFData.disOxidantEnabled_Ind_CEB,
      mineralValue: Number(UFData.mineralValue),
      organicValue: Number(UFData.organicValue),
      oxidantValue: Number(UFData.oxidantValue),
      alkaliValue: Number(UFData.alkaliValue),
      disOxidantValue: Number(UFData.disOxidantValue),
      alkaliChemId: UFData.alkaliChemId.toString(),
      mineralChemId: UFData.mineralChemId.toString(),
      organicChemId: UFData.organicChemId.toString(),
      oxidantChemId: UFData.oxidantChemId.toString(),
      disOxidantChemId: UFData.disOxidantChemId.toString(),
      alkaliValueInPh_Ind: UFData.alkaliValueInPh_Ind,
      mineralValueInPh_Ind: UFData.mineralValueInPh_Ind,
      uFCIPID: Number(UFData.uFCIPID),
      bWStepInCIP: parseInt(UFData.bWStepInCIP),
      chemicalSoakingDuration_CIP: Number(UFData.chemicalSoakingDuration_CIP),
      uFCIPWaterTypeID: parseInt(UFData.uFCIPWaterTypeID),
      heatingStepDuration: Number(UFData.heatingStepDuration),
      cip_LSI: Number(UFData.cip_LSI),
      recycleDuration: Number(UFData.recycleDuration),
      recycleTemperature:Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          UFData.recycleTemperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      ),
      rinseBWCycle: parseInt(UFData.rinseBWCycle),
      cIPRinseSoakCycle: Number(UFData.cIPRinseSoakCycle),
      alkaliEnabled_Ind_CIP: UFData.alkaliEnabled_Ind_CIP,
      organicEnabled_Ind_CIP: UFData.organicEnabled_Ind_CIP,
      oxidantEnabled_Ind_CIP: UFData.oxidantEnabled_Ind_CIP,
      mineralEnabled_Ind_CIP: UFData.mineralEnabled_Ind_CIP,
      oxidantEnabled2_Ing_CIP: UFData.oxidantEnabled2_Ing_CIP,
      mineralValue_CIP: Number(UFData.mineralValue_CIP),
      organicValue_CIP: Number(UFData.organicValue_CIP),
      oxidantValue_CIP: Number(UFData.oxidantValue_CIP),
      alkaliValue_CIP: Number(UFData.alkaliValue_CIP),
      cIPOxidant2Value: Number(UFData.cIPOxidant2Value),
      alkaliChemId_CIP: UFData.alkaliChemId_CIP.toString(),
      mineralChemId_CIP: UFData.mineralChemId_CIP.toString(),
      organicChemId_CIP: UFData.organicChemId_CIP.toString(),
      oxidantChemId_CIP: UFData.oxidantChemId_CIP.toString(),
      oxidant2ChemId: UFData.oxidant2ChemId.toString(),
      alkaliValueInPh_Ind_CIP: UFData.alkaliValueInPh_Ind_CIP,
      mineralValueInPh_Ind_CIP: UFData.mineralValueInPh_Ind_CIP,
      uFBackWashID: parseInt(UFData.uFBackWashID),
      bWTemperature: Number(UFData.bWTemperature),
      bWDesignTemperature_Ind: UFData.bWDesignTemperature_Ind,
      uFBWWaterTypeID: parseInt(UFData.uFBWWaterTypeID),
      uFBWFlushWaterTypeID: parseInt(UFData.uFBWFlushWaterTypeID),
      uFBWProtocolID: parseInt(UFData.uFBWProtocolID),
      oxidantID: UFData.oxidantID.toString(),
      oxidantDosage: Number(UFData.oxidantDosage),
      backwash_AirScour: Number(UFData.backwash_AirScour),
      backWash1_backWash: Number(UFData.backWash1_backWash),
      backWash2_backWash: Number(UFData.backWash2_backWash),
      drain_backWash: Number(UFData.drain_backWash),
      forwardFlush_backWash: Number(UFData.forwardFlush_backWash),
      lF: Number(UFData.lF),
      t_FTL: Number(UFData.t_FTL),
      t_BWBtnAirScour: parseInt(UFData.t_BWBtnAirScour),
      uFMiniCIPID: Number(UFData.uFMiniCIPID),
      bWStepInMiniCIP: Number(UFData.bWStepInMiniCIP),
      rinseBWCycle_MiniCIP: parseInt(UFData.rinseBWCycle_MiniCIP),
      chemicalSoakingDuration_MiniCIP: Number(
        UFData.chemicalSoakingDuration_MiniCIP
      ),
      uFMiniCIPWaterTypeID: parseInt(UFData.uFMiniCIPWaterTypeID),
      heatingStepDuration_MiniCIP: Number(UFData.heatingStepDuration_MiniCIP),
      lSI_MiniCIP: Number(UFData.lSI_MiniCIP),
      recycleDuration_MiniCIP: Number(UFData.recycleDuration_MiniCIP),
      recycleTemperature_MiniCIP: Number(UFData.recycleTemperature_MiniCIP),
      cIPRinseSoakCycle_MiniCIP: Number(UFData.cIPRinseSoakCycle_MiniCIP),
      alkaliEnabled_Ind_MiniCIP: UFData.alkaliEnabled_Ind_MiniCIP,
      organicEnabled_Ind_MiniCIP: UFData.organicEnabled_Ind_MiniCIP,
      oxidantEnabled_Ind_MiniCIP: UFData.oxidantEnabled_Ind_MiniCIP,
      mineralEnabled_Ind_MiniCIP: UFData.mineralEnabled_Ind_MiniCIP,
      oxidantEnabled2_Ing_MiniCIP: UFData.oxidantEnabled2_Ing_MiniCIP,
      mineralValue_MiniCIP: Number(UFData.mineralValue_MiniCIP),
      organicValue_MiniCIP: Number(UFData.organicValue_MiniCIP),
      oxidantValue_MiniCIP: Number(UFData.oxidantValue_MiniCIP),
      alkaliValue_MiniCIP: Number(UFData.alkaliValue_MiniCIP),
      cIPOxidant2Value_MiniCIP: Number(UFData.cIPOxidant2Value_MiniCIP),
      alkaliChemId_MiniCIP: UFData.alkaliChemId_MiniCIP.toString(),
      mineralChemId_MiniCIP: UFData.mineralChemId_MiniCIP.toString(),
      organicChemId_MiniCIP: UFData.organicChemId_MiniCIP.toString(),
      oxidantChemId_MiniCIP: UFData.oxidantChemId_MiniCIP.toString(),
      oxidant2ChemId_MiniCIP: UFData.oxidant2ChemId_MiniCIP.toString(),
      alkaliValueInPh_Ind_MiniCIP: UFData.alkaliValueInPh_Ind_MiniCIP,
      mineralValueInPh_Ind_MiniCIP: UFData.mineralValueInPh_Ind_MiniCIP,
    };
    const MethodName = { Method: "uf/api/v1/AutoSaveUFData" };
    const UFRequestDetails = {
      ...MethodName,
      ...data,
      ["drinkingWater_Ind"]: isForDrinkingWater,
      ["userID"]: loggedInUserID,
      ["projectID"]: projectID,
      ["caseID"]: caseID,
    };
    let autoSaveUFResponse = await POSTUFAutoSaveData(UFRequestDetails);
    dispatch(setUfDataUpdate(false));
    if (autoSaveUFResponse?.data?.responseMessage == "Success") {
      // console.log("***********  UF AUTOSAVE ON UF SubMenu Change- success");
      // callUFDetailsAPI();
    } else {
      //SHOW POPUP or show API ERROR PAGE ---
      throw new MyError("UF Auto Save Functionality Failed", 403, "ApiError");
    }
  };
  const callUFDetailsAPI = () => {
    //Retriving Values for UF fields
    const UFDetailsURL = `${"uf/api/v1/UFDetails"}?userID=${loggedInUserID}&projectID=${projectID}&caseID=${caseID}&treatmentObjID=${caseTreatmentID}`;
    getUFDetails(UFDetailsURL);
  };
  const callCEBAPI = () => {
    //Retriving Default Values for UF fields
    const UFCEBURL = `uf/api/v${1}/UFCEB?userID=${loggedInUserID}&projectID=${projectID}`;
    getCEBData(UFCEBURL);
  };
  const callCIPAPI = () => {
    //Retriving Default Values for UF fields
    const UFCIPURL = `uf/api/v${1}/UFCIP?userID=${loggedInUserID}&projectID=${projectID}`;
    getCIPData(UFCIPURL);
  };
  const createJsonForTheLSI = (ph, chemicalName) => {
    let chemical = showInDropDown.find(
      (chem) => chem.iD == UFData.mineralChemId
    );
    return {
      userID: loggedInUserID,
      projectID: projectID,
      caseID: caseID,
      caseTreatmentID: caseTreatmentID,
      chemicalName: chemicalName,
      typeFlag: 1,
      chemicalDegasRequest: {
        designTemp: tempDesign,
        methodName: "normal",
        ph: ph,
        chargeBalance: 0,
        totalDissolvedSolutes: 0,
        estimatedConductivity: 0,
        degas: 0,
        percentage_Of_Initial_Total_CO2_Remaining: 0,
        equilibrate_With: 0,
        total_CO2: 0,
        lsi_Targ: "1",
        sdi_Targ: "",
        adjustment_Type: 0,
        add_Reagent: 0,
        cations: StreamStoreData.cations,
        anions: StreamStoreData.anions,
        neutrals: StreamStoreData.neutral,
        chemicalAdjustment: [
          {
            ph: "0",
            lsi: "0",
            sdi: "0",
            tds: "0",
            ionic_Strength: "0",
            hCO3: "0",
            cO2: "0",
            cO3_2: "0",
            caSO4_per: "0",
            baSO4_per: "0",
            srSO4_per: "0",
            caF2_per: "0",
            siO2_per: "0",
            mgOH2_per: "0",
          },
        ],
      },
    };
  };

  useEffect(() => {
    let chemical = showInDropDown.find(
      (chem) => chem.iD == UFData.alkaliChemId
    );

    if (totalDissolvedSolutes>0 && chemical) {
      getCebLSIValue({
        Method: "masterdata/api/v1/CalculateChemicalAdjustment",
        ...createJsonForTheLSI(UFData.alkaliValue, chemical.symbol),
      });
    } else {
      dispatch(
        updateCebData({
          target: "ceb_LSI",
          value: 0,
        })
      );
    }
  }, [UFData.alkaliValue, UFData.alkaliChemId, UFData.alkaliEnabled_Ind_CEB]);

  useEffect(() => {
    let chemical = showInDropDown.find(
      (chem) => chem.iD == UFData.alkaliChemId_CIP
    );
    if (totalDissolvedSolutes>0 && chemical) {
      getCipLSIValue({
        Method: "masterdata/api/v1/CalculateChemicalAdjustment",
        ...createJsonForTheLSI(UFData.alkaliValue_CIP, chemical.symbol),
      });
    } else {
      dispatch(
        updateCebData({
          target: "cip_LSI",
          value: 0,
        })
      );
    }
  }, [
    UFData.alkaliValue_CIP,
    UFData.alkaliChemId_CIP,
    UFData.alkaliEnabled_Ind_CIP,
  ]);

  useEffect(() => {
    if (responseCebLSIValue.isSuccess) {
      // dispatch(updateCebData())
      let cebLsi = responseCebLSIValue.data.chemicalAdjustment[0].lsi;

      dispatch(
        updateCebData({
          target: "ceb_LSI",
          value: cebLsi == "NaN" ? 0 : Number(cebLsi).toFixed(2),
        })
      );
    }
  }, [responseCebLSIValue]);
  useEffect(() => {
    if (responseCipLSIValue.isSuccess) {
      // dispatch(updateCebData())
      let cebLsi = responseCipLSIValue.data.chemicalAdjustment[0].lsi;

      dispatch(
        updateCebData({
          target: "cip_LSI",
          value: cebLsi == "NaN" ? 0 : Number(cebLsi).toFixed(2),
        })
      );
    }
  }, [responseCipLSIValue]);
  const headerMenuIconStatus = useSelector(
    (state) => state.UFStore.headerMenuIcon
  );
  const [tabletView, setTabletView] = useState(false);
  const handleCloseSideMenu = () => {
    // setShowSideMenu(!showSideMenu);
    dispatch(updateMenuIconHeader(!headerMenuIconStatus));
  };

  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setTabletView(true);
      dispatch(updateTabletMenuIcon(tabletView));
    } else {
      setTabletView(false);
      dispatch(updateTabletMenuIcon(tabletView));
    }
  }; //show side menu for width >=1300

  useEffect(() => {
    handleResize(); // set initial state based on window size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabletView]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home");
    dispatch(updateTabAvailable({"FeedSetup":false,"IXD":false}));
  };
  const selectPanel = (activeTab) => {
    switch (activeTab) {
      case "Design":
        return (
          <TabPanel>
            <Design />
          </TabPanel>
        );
      case "Configuration":
        return (
          <TabPanel>
            <Configuration />
          </TabPanel>
        );
      case "Backwash":
        return (
          <TabPanel>
            <Backwash />
          </TabPanel>
        );
      case "CEB":
        return (
          <TabPanel>
            <CEB />
          </TabPanel>
        );
      case "CIP":
        return (
          <TabPanel>
            <CIP />
          </TabPanel>
        );
      case "Additional Settings":
        return (
          <TabPanel>
            <AdditionalSetting />
          </TabPanel>
        );

      default:
        break;
    }
  };

  return (
    <>
      <UFStyled
        tabletView={tabletView}
        headerMenuIconStatus={headerMenuIconStatus}
      >
        <Tabs>
          <div className="uf-tablist-column tablist_overlay">
            <div className="wrapper">
              {tabletView && (
                <div className="tablet_menu_view">
                  <div>
                    <button
                      className="close_icon_btn"
                      onClick={handleCloseSideMenu}
                    >
                      <TabletCloseMenuIcon />
                    </button>
                  </div>
                  <div className="global_header_logo1">
                    <div className="dupont_logo">
                      <a href="https://www.dupont.com/" target="__blank">
                        <img src={DuPont_logo_Red} alt="logo" />
                      </a>
                    </div>
                    <div>
                      <CustomHeading
                        fontFamily="DiodrumSemiBold"
                        fontSize={"8px"}
                        fontWeight={"600"}
                        label="Water Solutions"
                      />
                    </div>
                  </div>
                  <div className="global_header_logo2" onClick={handleNavigate}>
                    <div>
                      <img src={Wave_PRO_UF_Logo} alt="logo" />
                    </div>
                    <div className="application_name">
                      <CustomHeading
                        fontFamily="DiodrumSemiBold"
                        fontSize={"16px"}
                        fontWeight={"600"}
                        color={colors.BrandTagLineColor}
                        label={"WAVE PRO"}
                      />
                    </div>
                  </div>
                </div>
              )}
              <TabList>
                <div
                  onClick={() => updateUFSubMenus("Design")}
                  className={`tab ${activeTab == "Design" ? "selected" : ""}`}
                >
                  Design
                </div>
                <div
                  onClick={() => updateUFSubMenus("Configuration")}
                  className={`tab ${
                    activeTab == "Configuration" ? "selected" : ""
                  }`}
                >
                  Configuration
                </div>
                <div
                  onClick={() => updateUFSubMenus("Backwash")}
                  className={`tab ${activeTab == "Backwash" ? "selected" : ""}`}
                >
                  Backwash
                </div>
                <div
                  onClick={() => updateUFSubMenus("CEB")}
                  className={`tab ${activeTab == "CEB" ? "selected" : ""}`}
                >
                  CEB
                </div>
                <div
                  onClick={() => updateUFSubMenus("CIP")}
                  className={`tab ${activeTab == "CIP" ? "selected" : ""}`}
                >
                  CIP
                </div>
                <div
                  onClick={() => updateUFSubMenus("Additional Settings")}
                  className={`tab ${
                    activeTab == "Additional Settings" ? "selected" : ""
                  }`}
                >
                  Additional Settings
                </div>
              </TabList>
            </div>
          </div>
          <div className="uf-tabPanel-column">
            {selectPanel(activeTab)}
            {/* <Footer /> */}
          </div>
        </Tabs>
      </UFStyled>
      {isError && (
        <ProjectErrorPopup
          show={isError}
          close={() => {
            setIsError(false);
          }}
          message={errorMessage}
        />
      )}
    </>
  );
};

export default UF;
