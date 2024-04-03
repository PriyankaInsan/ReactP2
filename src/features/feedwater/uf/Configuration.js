import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UFSystemDesignDiagram from "./UFSystemDesignDiagram";
import ConfigurationStyled from "./ConfigurationStyled.jsx";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors, fontStyles } from "../../../common/styles/Theme";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import InfoIcon from "../../../common/icons/InfoIcon";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import TableComponent from "./table/TableComponent";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel.js";
import {
  updateUFStore,
  updateIsForDrinkingWater,
  updateActiveUFModule,
  updateRecommendedConfiguration,
  updateDefaultUFConfiguration,
  handleCalcEngineResponse,
  updateUFDefaultInputRangeConfig,
  // generateConfigsWithoutStandBy,
  configNoRackNoStandBy,
  configNoRackWithStandBy,
  configWithRackNoStandBy,
  configWithRackWithStandBy,
  generateConfigsWithStandBy,
  calculateUFFields,
  handleOperatingFlux,
  updateCallCalcEngineUFConfig,
  updateSliderValue,
  setCustomAvail,
  setCustomOfflineTimePerUnit,
  updateDesignData,
  setUfDataUpdate,
  // generateConfigTabel,
} from "../uf/UFSlice";

import { MyError } from "../../../common/utils/ErrorCreator.js";
import { useCalcEngineDataMutation } from "../../../services/apiConfig";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage.js";
import WarningMessage from "../../../common/styles/components/headings/WarningMessage.js";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio.js";
import InputWithText from "../../../common/styles/components/inputs/InputWithText.js";
import CalcEngineInputBoxTriangle from "../../../common/icons/CalcEngineInputBoxTriangle.js";
import MultiRangeSlider from "./table/MultiRangeSlider.js";
import MultiRangeSliderStyled from "./table/MultiRangeSliderStyled.jsx";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion.js";

const Configuration = () => {
  const dispatch = useDispatch();
  const UFStore = useSelector((state) => state.UFStore);
  const UFData = useSelector((state) => state.UFStore.data);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const ProjectConfig = useSelector((state) => state.projectInfo.projectConfig);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const feedWater_StreamStore = useSelector(
    (state) => state.Feedsetupdetailsdatapanel
  );
  const systemDesignData = useSelector((state) => state.processDiagramSlice);
  const StreamStoreData = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData.lstrequestsavefeedwater[0]
        ?.streams[0]
  );
  const selectedUFModule = useSelector((state) => state.UFStore.activeUFModule);
  const defaultInputRangeConfig = useSelector(
    (state) => state.UFStore.defaultInputRangeConfig
  );

  const feedDataJson = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
        .streams[0]
  );

  const projectID = ProjectInfoStore.projectID;
  const caseID = ProjectInfoStore.caseId;
  const loggedInUserID = UserInfoStore.UserId;
  const treatmentObjID = "1"; //DEC Scope only "PVDF Out-In High Recovery"
  const { pumpCofig, chemicalConfig } = ProjectConfig;
  const { operatingCost } = chemicalConfig;
  const {
    ufModules,
    ufInputRangeConfig,
    ufStorageTankOptions,
    ufModuleFlowVM,
    ufModulePressureRatingVM,
    activeUFModule,
    calcEngineData,
    ufFluxGuideline,
    callCalcEngineUFConfig,
    sliderValue,
  } = UFStore;
  const { waterSubTypeID } = StreamStoreData;

  const {
    uFBWCEBStandbyOptionID,
    uFStorageTankOptionID,
    uFModuleID,
    skidsPerTrain,
    modulesPerSkid,
    skids,
    redundantStandbyTrains,
    modulesPerTrain,
  } = UFData;

  /* Fetching Minimum Temperature from feedsetup slice */
  const feedSetUpData =
    (feedWater_StreamStore && feedWater_StreamStore?.data[0]) || {};
  const {
    selectedEndNode,
    feedFlowRate,
    productFlowRate,
    edges,
    feedWaterData,
  } = systemDesignData;
  const { displayOrder, feedOrProductFlow, flow, projectCaseName } =
    feedWaterData;
  var timer = null;
  const [progressValue, setProgressValue] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [standByOptions, setStandByOptions] = useState(
    UFStore.ufStandByOptions
  );
  //Setting flag for enabling StandBy Units
  const [isStandByFlag, setStandByFlag] = useState();
  //Enabling Filter
  const [checked, setChecked] = useState(UFStore.isForDrinkingWater);
  const [filteredUFModules, setFilteredUFModuleList] = useState(ufModules);
  const [isFieldValid, setIsFieldValid] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [message, setMessage] = useState("");
  const [isFormValid, setFormValid] = useState(false);

  const [getData, responseReceived] = useCalcEngineDataMutation();

  /* Design Instantaneous (Gross) Flux and Flow Rates */
  const fieldOnlineTrains = defaultInputRangeConfig["onlineTrains"];
  const redundantStandbyTrains1 =
    defaultInputRangeConfig["redundantStandbyTrains"];

  const [userSelModuleID, setUserSelModuleID] = useState(UFData.uFModuleID);

  const designTemp = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const {unitTypeFlux,unitFlag} = useSelector((state) => state.GUnitConversion);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* getOperatingFluxFromCalcEngine called on input change */
  useEffect(()=>{
    console.log("getOperatingFluxFromCalcEngine called on input change");
    setTimeout(() => {
      getOperatingFluxFromCalcEngine();
    },3000);
  },[UFData.totalModules]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsFieldValid(false);
    }
  };

  /* Generate Table called on page load */
  useEffect(() => {
    if (uFBWCEBStandbyOptionID == "0") {
      dispatch(updateUFStore({ ...UFData, ["uFBWCEBStandbyOptionID"]: "1" }));
      setStandByFlag(true);
    }
    if (uFBWCEBStandbyOptionID == "2") {
      setStandByFlag(true);
    }
    if (uFBWCEBStandbyOptionID == "1") {
      setStandByFlag(false);
    }

    const activeModuleDetails = getModuleDetails(UFData.uFModuleID);
    dispatch(updateActiveUFModule(activeModuleDetails));
    //calls calcengine api and generate table, sets first configuration as default config
    handleUFConfigAPICall(uFBWCEBStandbyOptionID, activeModuleDetails);
    dispatch(calculateUFFields());
  }, []);

  useEffect(() => {
    // console.log("**** Design : Custom input made for OfflineTimePerUnit :",UFStore.isOfflineTimeChanged);
    // console.log("**** Design : isForDrinkingWater checkbox checked :",UFStore.isForDrinkingWater);
    // console.log("**** Design :useEffect UFStore.isForDrinkingWater customValue",customValue);
    // console.log("**** Design :useEffect UFStore.isForDrinkingWater STORE offlinetimepertrain",UFData.offlinetimepertrain);
    if(!UFStore.isOfflineTimeChanged){
      if (UFStore.isForDrinkingWater) {
        const filteredModules = ufModules.filter(
          (m) => m.drinkingWaterInd == true
        );
        //Only show modules approved for drinking water applications
        setFilteredUFModuleList(filteredModules);
   
        const sendData = { target: "offlinetimepertrain", value: 12};
        dispatch(updateDesignData(sendData));
      } else {
        setFilteredUFModuleList(ufModules);
   
        const sendData = { target: "offlinetimepertrain", value: 0 };
        dispatch(updateDesignData(sendData));
      }
    }
  }, [UFStore.isForDrinkingWater]);

  /* getOperatingFluxFromCalcEngine called on config change or selection */
  useEffect(() => {
    if (callCalcEngineUFConfig) {
      //CALL UFCONFIG API FOR GETTING LATEST VALUE FOR - "OperatingFlux(flux_Filter_actual)"
      getOperatingFluxFromCalcEngine();
    }
  }, [callCalcEngineUFConfig]);

  useEffect(() => {
    if (UFData.uFModuleID == 0) {
      handleUFModule({ target: { name: "uFModuleID", value: "21" } });
    }
  }, [UFStore]);

  const handleFocus = (id) => {
    setIsFocused(id);
  };

  const getConfigForFiltrateFlux = (moduleSelected) => {
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
      if (designTemp > 20) {
        TCF = 1;
      } else {
        TCF =
          Math.exp(
            0.023396 * (designTemp - 25) -
              0.0001726 * Math.pow(designTemp - 25, 2)
          ) / 0.8858;
      }

      const Default_Corrected =
        Math.ceil(TCF) * parseInt(filtrateFluxRange[0].typicalValue);
      const Filterateflux = Math.max(
        Math.min(parseInt(Default_Corrected), FFMAX),
        FFMIN
      );
      const filtrateFluxConfig = {
        label: "Filtrate Flux",
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,Filterateflux,unit.selectedUnits[4],"LMH").toFixed(2),  
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
        defaultValue: GlobalUnitConversion(GlobalUnitConversionStore,moduleSelected.cIP_Flow_std,unit.selectedUnits[1],"m³/h").toFixed(2)
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

  /* Generate Table based on Module Selection */
  const setActiveUFModuleInStore = (moduleID) => {
    const activeModuleDetails = getModuleDetails(moduleID);
    dispatch(updateActiveUFModule(activeModuleDetails));

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
   
    handleUFConfigAPICall(UFData.uFBWCEBStandbyOptionID, activeModuleDetails);
    dispatch(calculateUFFields());

  };

  const changeChemicalFormat = (chemicalSymbol) => {
    let data = [
      {
        from: "₁",
        to: "1",
      },
      {
        from: "₆",
        to: "6",
      },
      {
        from: "₈",
        to: "8",
      },
      {
        from: "₂",
        to: "2",
      },
      {
        from: "₄",
        to: "4",
      },
      {
        from: "₃",
        to: "3",
      },
      {
        from: "₀",
        to: "0",
      },
      {
        from: "₅",
        to: "5",
      },
      {
        from: "₇",
        to: "7",
      },
      {
        from: "₉",
        to: "9",
      },
    ];
    let camelCase = chemicalSymbol;
    data.map((item) => {
      camelCase = camelCase.replaceAll(item.from, item.to);
    });
    return camelCase;
  };

  const validData = (data, label, flag) => {
    const den = flag ? "0" : 0;
    return data ? data[label] : den;
  };

  const calculateData = () => {
    const getCalculateData = () => {
      if (UFData.uFBWProtocolID == 1) {
        return (
          Number(UFData.drain_backWash)/60 +
          Number(UFData.backWash2_backWash)/60 +
          Number(UFData.backWash1_backWash)/60 +
          Number(UFData.forwardFlush_backWash)/60 +
          4 * Number(UFData.typicalWaitDuration_Dupont)/60 +
          3* Number(UFData.valveOpenCloseDuration)/60+
          Number(UFData.typicalPumpRamp_Dupont)/60
        );
      } else if (UFData.uFBWProtocolID == 2) {
        return (
          Number(UFData.backwash_AirScour)/60 +
          Number(UFData.drain_backWash)/60 +
          Number(UFData.backWash2_backWash)/60 +
          Number(UFData.backWash1_backWash)/60 +
          Number(UFData.forwardFlush_backWash)/60 +
          4 * Number(UFData.typicalWaitDuration_Dupont)/60 +
          6* Number(UFData.valveOpenCloseDuration)/60 +
          Number(UFData.typicalPumpRamp_Dupont)/60
        );
      } else {
        return 0;
      }
    };

    let t_BW_module_cycle = getCalculateData();

    let tempFlag_cycle_input = 0;
    let t_normal_module_cycle = Number(
      Number(UFData.backwash_design) +
        (tempFlag_cycle_input == 0 ? t_BW_module_cycle : 0)
    );
    //-------------------------------------------------------
    //-------------------------------------------------------

    let tempN_F_per_CIP_raw =
      UFData.cIP > 0
        ? (Number(UFData.cIP) * 60 * 24) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_mCIP_raw = 1000000;
    let tempN_F_per_CEB3_raw =
      UFData.disinfectionCEB > 0
        ? Number(UFData.disinfectionCEB * 60) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_CEB2_raw =
      UFData.alkaliOxidantCEB > 0
        ? Number(UFData.alkaliOxidantCEB * 60) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_CEB1_raw =
      UFData.acidCEB > 0
        ? Number(UFData.acidCEB * 60) / t_normal_module_cycle
        : 1000000;

    //----------------------------------------------------

    //------------------------------------------------------

    let N_F_per_clean_min = Math.min(
      tempN_F_per_CEB1_raw,
      tempN_F_per_CEB2_raw,
      tempN_F_per_CEB3_raw,
      tempN_F_per_CIP_raw,
      tempN_F_per_mCIP_raw
    );
    let N_F_per_CIP_ratio =
      UFData.cIP > 0 ? tempN_F_per_CIP_raw / N_F_per_clean_min : 0;
    let N_F_per_mCIP_ratio = 0;
    let N_F_per_CEB3_ratio =
      UFData.disinfectionCEB > 0 ? tempN_F_per_CEB3_raw / N_F_per_clean_min : 0;
    let N_F_per_CEB2_ratio =
      UFData.alkaliOxidantCEB > 0
        ? tempN_F_per_CEB2_raw / N_F_per_clean_min
        : 0;
    let N_F_per_CEB1_ratio =
      UFData.acidCEB > 0 ? tempN_F_per_CEB1_raw / N_F_per_clean_min : 0;

    return {
      N_BW_per_AS: parseInt(
        UFData.backwash_design / UFData.backwash_design + 0.5
      ).toString(),
      N_F_per_CEB1: parseInt(
        N_F_per_CEB1_ratio * parseInt(N_F_per_clean_min + 0.5) + 0.5
      ).toString(),
      N_F_per_CEB2: parseInt(
        N_F_per_CEB2_ratio * parseInt(N_F_per_clean_min + 0.5) + 0.5
      ).toString(),
      N_F_per_CEB3: parseInt(
        N_F_per_CEB3_ratio * parseInt(N_F_per_clean_min + 0.5) + 0.5
      ).toString(),
      N_F_per_mCIP: parseInt(
        N_F_per_mCIP_ratio * parseInt(N_F_per_clean_min + 0.5) + 0.5
      ).toString(),
      N_F_per_CIP: parseInt(
        parseInt(N_F_per_CIP_ratio * parseInt(N_F_per_clean_min + 0.5) + 0.5)
      ).toString(),
      t_normal_module_cycle: t_normal_module_cycle.toString(),
    };
  };

  const calculateCIP = () => {
    const getFirstData = () => {
      if (UFData.mineralValue_CIP == 0 && UFData.organicValue_CIP == 0) {
        return 0;
      } else if (UFData.mineralValue_CIP > 0 && UFData.organicValue_CIP == 0) {
        return 1;
      } else if (UFData.mineralValue_CIP == 0 && UFData.organicValue_CIP > 0) {
        return 1;
      } else if (UFData.mineralValue_CIP > 0 && UFData.organicValue_CIP > 0) {
        if (UFData.mineralEnabled_Ind_CIP) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    };

    const getSecondData = () => {
      if (UFData.alkaliValue_CIP == 0 && UFData.oxidantValue_CIP == 0) {
        return 0;
      } else if (UFData.alkaliValue_CIP > 0 && UFData.oxidantValue_CIP == 0) {
        return 1;
      } else if (UFData.alkaliValue_CIP == 0 && UFData.oxidantValue_CIP > 0) {
        return 1;
      } else if (UFData.alkaliValue_CIP > 0 && UFData.oxidantValue_CIP > 0) {
        if (UFData.alkaliEnabled_Ind_CIP) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    };
    return Math.max(1, getFirstData(), getSecondData());
  };

  const getUFConfigPayload = (activeModuleDetails) => {
    // console.log("On Page load : activeModuleDetails",activeModuleDetails);
    // console.log("On Page load :activeUFModule from store",activeUFModule);
    // console.log("$$$$$$$$$$ 4 getUFConfigPayload : Payload setting with below after calculatingUFFields");
    // console.log("Rack/Unit",UFData.skidsPerTrain);
    // console.log("Modules/Rack",UFData.modulesPerSkid);
    // console.log("Online Trains",UFData.onlineTrains);
    // console.log("StandBy Trains",UFData.redundantStandbyTrains);
    // console.log("Redudant Trains",UFData.redundantTrains);
    // console.log("Module/Unit",UFData.modulesPerTrain);
    // console.log("Total Modules",UFData.totalModules);
    // console.log("******************************************************* ");
    let ufReport = {
      method: "default",
      exportReport: 0,
      reportType: 3,
      WaterTypeID: StreamStoreData?.waterTypeID.toString(),
      WaterSubTypeID: StreamStoreData?.waterSubTypeID.toString(),
      TechnologyId: 1,
      Flow_Design:
          // selectedEndNode == "startNode" ? feedFlowRate : productFlowRate,
          selectedEndNode == "startNode"
          ? Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                feedFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ).toString()
          : Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                productFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ).toString(),
      Flag_Design_Flow: selectedEndNode == "startNode" ? "0" : "2",
      // Flag_Design_Flow:2,
      Guideline_number: StreamStoreData?.waterSubTypeID.toString(),
      Temp_min: StreamStoreData?.tempMin.toString(),
      Temp_design: StreamStoreData?.tempDesign.toString(),
      Temp_max: StreamStoreData?.tempMax.toString(),
      Recovery_Pretreat: (UFData.strainerRecovery / 100).toString(),
      Strainer_Size: UFData.strainerSize.toString(),
      Recovery_RO: "0",
      Feed_acid_name: "0",
      Feed_acid_conc: "0",
      Feed_acid_pH: feedDataJson?.pH.toString(),
      Feed_coag_name: "0",
      Feed_coag_conc: "0",
      Feed_ox_name: "0",
      Feed_ox_conc: "0",
      N_Part_number: activeModuleDetails?.moduleName.toString(),
      N_Part_number_long: activeModuleDetails?.newModuleLongName.toString(),
      Company: "DuPont",
      Drinking_water_part_names: activeModuleDetails?.drinkingWaterInd
        .toString()
        .toUpperCase(),
      // Drinking_water_part_names: "False",
      IntegraPac: activeModuleDetails?.integraPacInd.toString().toUpperCase(),
      T_Rack: activeModuleDetails?.tRack.toString().toUpperCase(),
      Mem_Rack: activeModuleDetails?.memRack.toString().toUpperCase(),
      IntegraFlo: activeModuleDetails?.integraFlowInd.toString().toUpperCase(),
      Flux_Filter_target: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.filtrateFlux,"LMH",unit.selectedUnits[4]).toFixed(2)).toString(), 
      Flux_BW: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashFlux,"LMH",unit.selectedUnits[4]).toFixed(2)).toString(),
      Flux_CEB: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cEBFlux,"LMH",unit.selectedUnits[4]).toFixed(2)).toString(),
      Flow_FF:  Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.forwardFlushFlow,"m³/h",unit.selectedUnits[1]).toFixed(2)).toString(),
      Flow_FF2: UFData.flow_FF2.toString(),
      Flow_FF3: UFData.flow_FF3.toString(),
      Flow_FF4: UFData.flow_FF4.toString(),
      Flow_AS:  Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.airFlow,"Nm³/h",unit.selectedUnits[18]).toFixed(2)).toString(),
      Flow_AS2: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.aerationAirFlow,"Nm³/h",unit.selectedUnits[18]).toFixed(2)).toString(),
      Flow_mCIP_recycle: "0",
      Flow_CIP_recycle: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.recycleFlowRate,"m³/h",unit.selectedUnits[1]).toFixed(2)).toString(),
      Flag_cycle_input: UFData.uFBWCEBStandbyOptionID == 1 ? "0" : "1",
      t_filtration_cycle: UFData.backwash_design.toString(),
      t_interval_AS: UFData.backwash_design.toString(),
      t_interval_CEB_acid: UFData.acidCEB.toString().toString(),
      t_interval_CEB_caustic: UFData.alkaliOxidantCEB.toString(),
      t_interval_CEB_Oxidant: "0",
      t_interval_mCIP: "0",
      t_interval_CIP: UFData.cIP.toString(),
      t_MIT_module_day: UFData.offlinetimepertrain.toString(),
      TMP_slope_BW: (UFData.backwash_Filtration/1000).toString(), //as per excel provided
      TMP_slope_CEB1: (UFData.acidCEB_Filtration/1000).toString(), //as per excel provided
      TMP_slope_CEB2: (UFData.alkaliCEB_Filtration/1000).toString(), //as per excel provided
      TMP_slope_mCIP: "0", //as per excel provided
      TMP_slope_CIP: (UFData.cIP_Filtration/1000).toString(), //as per excel provided
      Standby_Option:
        UFData.uFBWCEBStandbyOptionID == 1
          ? "Constant operating flux, variable system output"
          : "Constant system output, variable operating flux",
      Flag_CIP_standby: UFData.uFBWCEBStandbyOptionID == 1 ? "0" : "2",
      Flag_Storage_Tank: UFData.uFBWCEBStandbyOptionID == 1 ? "1" : "0",
      N_Trains_online: UFData.onlineTrains.toString(),
      N_Trains_standby: UFData.redundantStandbyTrains.toString(),
      N_Trains_Redundant: UFData.redundantTrains.toString(),
      N_Modules_per_Train: UFData.modulesPerTrain.toString(),
      // N_Modules_per_Train: 34,
      IP_Skids_train: activeUFModule.integraPacInd ? UFData.skidsPerTrain.toString() : "1",
      IP_Mod_skid: activeModuleDetails.integraPacInd
      ? UFData.modulesPerSkid.toString()
      : UFData.modulesPerTrain.toString(),
      Flag_BW: (UFData.uFBWWaterTypeID - 1).toString(),
      Flag_FF: (UFData.uFBWFlushWaterTypeID - 1).toString(),
      Flag_BW_Protocol: UFData.uFBWProtocolID == 1 ? "2" : "0",
      Temp_BW: StreamStoreData?.tempDesign.toString(),
      t_AS: (UFData.backwash_AirScour / 60).toString(),
      t_Drain: (UFData.drain_backWash / 60).toString(),
      t_BW1: (UFData.backWash1_backWash / 60).toString(),
      t_BW2: (UFData.backWash2_backWash / 60).toString(),
      t_FF: (UFData.forwardFlush_backWash / 60).toString(),
      t_LF: (UFData.lF / 60).toString(),
      t_FTL: (UFData.t_FTL / 60).toString(),
      BW_ox_name: validData(
        chemicalConfig.chemicalList.find((item) => item.iD == UFData.oxidantID),
        "symbol",
        true
      ).toString(), //////-----------------
      BW_ox_conc: UFData.oxidantDosage.toString(),
      Temp_CEB: StreamStoreData?.tempDesign.toString(),
      Flag_CEB: UFData.uFCEBWaterTypeID.toString(),
      t_AS_CEB: (UFData.ceb_AirScour / 60).toString(),
      t_Drain_CEB: (UFData.drain / 60).toString(),
      t_BW1_CEB: (UFData.backWash1_CEB / 60).toString(),
      t_BW2_CEB: (UFData.backWash2_CEB / 60).toString(),
      t_FF_CEB: (UFData.forwardFlush / 60).toString(),
      t_CEB_soak: UFData.chemicalSoakingDuration_CEB.toString(),
      t_BW1_CEBrinse: (UFData.t_CEB_Rinse12 / 60).toString(),
      t_BW2_CEBrinse: (UFData.t_CEB_Rinse2 / 60).toString(),
      N_CEB_RScycles: "1",
      CEB1_acid_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CEB1_acid_conc: UFData.mineralValueInPh_Ind ? "0" : UFData.mineralValue.toString(),
      CEB1_acid_pH: UFData.mineralValueInPh_Ind ? UFData.mineralValue.toString() : "0",
      CEB1_org_acid_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId
          ),
          "chemicalName",
          true
        )
      ).toString(), //////-----------------
      CEB1_org_acid_conc: UFData.organicValue.toString(),
      Flag_CEB1_Chem: "false",
      CEB2_base_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CEB2_base_conc: UFData.alkaliValueInPh_Ind ? "0" : UFData.alkaliValue.toString(),
      CEB2_base_pH: UFData.alkaliValueInPh_Ind ? UFData.alkaliValue.toString() : "0",
      CEB2_ox_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CEB2_ox_conc: UFData.oxidantValue.toString(),
      Flag_CEB2_Chem: "false",
      CEB3_ox_name: "0", //////-----------------
      CEB3_ox_conc: "0",
      Temp_mCIP: "0",
      N_BW_mCIP: "0",
      N_BW_Rinse_mCIP: "0",
      Flag_mCIP: "0",
      t_mCIP_heat: "0",
      t_mCIP_recycle: "0",
      t_mCIP_soak: "0",
      N_mCIP_RScycles: "0",
      mCIP_acid_name: "0",
      mCIP_acid_conc: "0",
      mCIP_acid_pH: "0",
      mCIP_org_acid_name: "0",
      mCIP_org_acid_conc: "0",
      Flag_mCIP1_Chem: "false",
      mCIP_base_name: "0",
      mCIP_base_conc: "0",
      mCIP_base_pH: "0",
      mCIP_ox_name: "0",
      mCIP_ox_conc: "0",
      mCIP_SLS_name: "0",
      mCIP_SLS_conc: "0",
      Flag_mCIP2_Chem: "0",
      Temp_CIP: UFData.recycleTemperature.toString().toString(),
      N_BW_CIP: UFData.bWStepInCIP.toString().toString(),
      N_BW_Rinse_CIP: UFData.rinseBWCycle.toString().toString(),
      Flag_CIP: UFData.uFCIPWaterTypeID.toString().toString(),
      t_CIP_heat: UFData.heatingStepDuration.toString().toString(),
      t_CIP_recycle: UFData.recycleDuration.toString().toString(),
      t_CIP_soak: UFData.chemicalSoakingDuration_CIP.toString().toString(),
      N_CIP_RScycles: UFData.cIPRinseSoakCycle.toString().toString(),
      CIP_acid_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId_CIP
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CIP_acid_conc: UFData.mineralValueInPh_Ind_CIP
        ? "0"
        : UFData.mineralValue_CIP.toString(),
      CIP_acid_pH: UFData.mineralValueInPh_Ind_CIP
        ? UFData.mineralValue_CIP.toString()
        : "0",
      CIP_org_acid_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId_CIP
          ),
          "chemicalName",
          true
        )
      ).toString(), //////-----------------
      CIP_org_acid_conc: UFData.organicValue_CIP.toString(),
      CIP_N_Chem1_Flag: "false",
      CIP_base_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId_CIP
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CIP_base_conc: UFData.alkaliValueInPh_Ind_CIP
        ? "0"
        : UFData.alkaliValue_CIP.toString(),
      CIP_base_pH: UFData.alkaliValueInPh_Ind_CIP
        ? UFData.alkaliValue_CIP.toString()
        : "0",
      CIP_ox_name: changeChemicalFormat(
        validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId_CIP
          ),
          "symbol",
          true
        )
      ).toString(), //////-----------------
      CIP_ox_conc: UFData.oxidantValue_CIP.toString(),
      CIP_SLS_name: "0",
      CIP_SLS_conc: "0",
      CIP_N_Chem2_Flag: "false",
      Additional_Settings_Screen: "false",
      P_air_max:Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirScourPressure,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      P_ADBW_max: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.maxAirProcPressure,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      P_Filtrate:  Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.filteratePressure,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      Delta_P_piping_filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.nonIntegraPacTrainPresDrop,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      Delta_P_strainer_filtration: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.integraPacFiltrationPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      Delta_P_piping_BW: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashPipingPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      Delta_P_piping_mCIP: "0",
      Delta_P_piping_CIP: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cIPPipingPreDrop,"bar",unit.selectedUnits[3]).toFixed(2)).toString(),
      Storage_Tank_Parameters: "0",
        f_Chem_storage_days: UFData.chemicalStorageTime.toString(),
        f_BW_tank_feed: UFData.bWTankRefillRate.toString(),
        f_Filtrate_tank_safety_margin: (UFData.filterateTank / 100).toString(),
        f_BW_tank_safety_margin: (UFData.bWTank / 100).toString(),
        f_mCIP_tank: (UFData.cIPTank / 100).toString(),
        f_CIP_tank: (UFData.cIPTank / 100).toString(),
        f_ADBW: (UFData?.aDBWDisplacement / 100).toString(),
        f_FTL: UFData?.fTLDisplacement.toString(),
        N_valves_per_skid: UFData.valvesPerTrain.toString(),
        t_wait: (UFData.typicalWaitDuration_Dupont/ 60).toString(),
        t_valve: (UFData.valveOpenCloseDuration / 60).toString(),
        t_ramp: (UFData.typicalPumpRamp_Dupont/ 60).toString(),
      Power_PLC: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.pLCPowerReqPertrain,"kW",unit.selectedUnits[9]).toFixed(2)).toString(),
        Power_valve: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.volvePowerReqPerTrain,"kW",unit.selectedUnits[9]).toFixed(2)).toString(),
        Project_Level_User_Entries: "0",
      Eff_motor_feed: pumpCofig.pupmList.find((a) => a.pumpID == 53)
          .motorEfficiency.toString(),
        Eff_motor_BW: pumpCofig.pupmList.find((a) => a.pumpID == 54)
          .motorEfficiency.toString(),
        Eff_motor_mCIP: "0",
        Eff_motor_CIP: pumpCofig.pupmList.find((a) => a.pumpID == 55)
          .motorEfficiency.toString(),
        Eff_motor_metering: pumpCofig.pupmList.find((a) => a.pumpID == 57)
          .motorEfficiency.toString(),
        Eff_motor_compressor: pumpCofig.pupmList.find((a) => a.pumpID == 56)
          .motorEfficiency.toString(),
        Eff_pump_feed: pumpCofig.pupmList.find((a) => a.pumpID == 53)
          .pumpEfficiency.toString(),
        Eff_pump_BW: pumpCofig.pupmList.find((a) => a.pumpID == 54)
          .pumpEfficiency.toString(),
        Eff_pump_mCIP: "0",
        Eff_pump_CIP: pumpCofig.pupmList.find((a) => a.pumpID == 55)
          .pumpEfficiency.toString(),
        Eff_pump_metering: pumpCofig.pupmList.find((a) => a.pumpID == 57)
          .pumpEfficiency.toString(),
        Eff_compressor: pumpCofig.pupmList.find((a) => a.pumpID == 56)
          .pumpEfficiency.toString(),
      Operating_Cost_Prices: "0",
      Price_Elec: chemicalConfig.operatingCost.electricity.toString(),
      Price_Water: chemicalConfig.operatingCost.rawWater.toString(),
      Price_Waste: chemicalConfig.operatingCost.wasteWaterDisposal.toString(),
      // t_normal_module_cycle: "29.99999967",
      // N_BW_per_AS: Number(
      //   UFData.backwash_design / UFData.backwash_design + 0.5
      // ),
      // N_F_per_CEB1: "0",
      // N_F_per_CEB2: "0",
      // N_F_per_CEB3: "0",
      // N_F_per_mCIP: "0",
      // N_F_per_CIP: "0",
      ...calculateData(),
      N_Chem_CEB1: "1",
      N_Chem_CEB2: "1",
      N_Chem_CEB3: "1",
      N_Chem_CIP: calculateCIP().toString(),
      N_Chem_mCIP: "0",
      Module_Properties: "0",
      Area_Module: activeModuleDetails?.moduleArea.toString(),
      Vol_module: activeModuleDetails?.v.toString(),
      Length_module: activeModuleDetails?.l.toString(),
      Length_fibers: activeModuleDetails?.fiberLength.toString(),
      N_capillary: activeModuleDetails?.bores.toString(),
      N_Capillary_Ends: activeModuleDetails?.ends.toString(),
      D_ID: activeModuleDetails?.dId.toString(),
      D_OD: activeModuleDetails?.dOd.toString(),
      Av: activeModuleDetails?.av.toString(),
      P0: activeModuleDetails?.p0.toString(),
      S0: activeModuleDetails?.s0.toString(),
      S10: activeModuleDetails?.s10.toString(),
      S20: activeModuleDetails?.s20.toString(),
      S30: activeModuleDetails?.s30.toString(),
      S40: activeModuleDetails?.s40.toString(),
      Feed_acid_bulk_conc: "0",
      Feed_acid_density: "0",
      Feed_acid_price: "0",
      Feed_coag_bulk_conc: "0",
      Feed_coag_density: "0",
      Feed_coag_price: "0",
      Feed_ox_bulk_conc: "0",
      Feed_ox_density: "0",
      Feed_ox_price: "0",
      BW_ox_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.oxidantID
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        BW_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantID
          ),
          "bulkDensity",
          false
        ).toString(),
        BW_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        CEB1_acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.mineralChemId
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CEB1_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CEB1_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        CEB1_org_acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.organicChemId
            ),
            "bulkConcentration"
          ) / 100).toString(),
        CEB1_org_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CEB1_org_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        CEB2_base_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.alkaliChemId
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CEB2_base_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CEB2_base_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        CEB2_ox_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.oxidantChemId
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CEB2_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CEB2_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        CEB3_ox_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.disOxidantChemId
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CEB3_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.disOxidantChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CEB3_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.disOxidantChemId
          ),
          "bulkPrice",
          false
        ).toString(),
        mCIP_acid_bulk_conc: "0",
        mCIP_acid_density: "0",
        mCIP_acid_price: "0",
        mCIP_org_acid_bulk_conc: "0",
        mCIP_org_acid_density: "0",
        mCIP_org_acid_price: "0",
        mCIP_base_bulk_conc: "0",
        mCIP_base_density: "0",
        mCIP_base_price: "0",
        mCIP_ox_bulk_conc: "0",
        mCIP_ox_density: "0",
        mCIP_ox_price: "0",
        mCIP_SLS_bulk_conc: "0",
        mCIP_SLS_density: "0",
        mCIP_SLS_price: "0",
        CIP_acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.mineralChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CIP_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId_CIP
          ),
          "bulkDensity",
          false
        ).toString(),
        CIP_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.mineralChemId_CIP
          ),
          "bulkPrice",
          false
        ).toString(),
        CIP_org_acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.organicChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CIP_org_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId_CIP
          ),
          "bulkDensity",
          false
        ).toString(),
        CIP_org_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.organicChemId_CIP
          ),
          "bulkPrice",
          false
        ).toString(),
        CIP_base_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.alkaliChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CIP_base_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId_CIP
          ),
          "bulkDensity",
          false
        ).toString(),
        CIP_base_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.alkaliChemId_CIP
          ),
          "bulkPrice",
          false
        ).toString(),
        CIP_ox_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.oxidantChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CIP_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId_CIP
          ),
          "bulkDensity",
          false
        ).toString(),
        CIP_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidantChemId_CIP
          ),
          "bulkPrice",
          false
        ).toString(),
        CIP_SLS_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == UFData.oxidant2ChemId
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        CIP_SLS_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidant2ChemId
          ),
          "bulkDensity",
          false
        ).toString(),
        CIP_SLS_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == UFData.oxidant2ChemId
          ),
          "bulkPrice",
          false
        ).toString(),
      Citric_Acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "Citric Acid(100)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        FeCl3_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "FeCl₃(100)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        H2SO4_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "H₂SO₄(98)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        HCl_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "HCl (32)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        NaOCl_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "NaOCl(12)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        NaOH_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "NaOH (50)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        Oxalic_Acid_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "Oxalic Acid(100)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        PACl_bulk_conc: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "PACl(5)"
          ),
          "bulkConcentration",
          false
        ).toString(),
        SLS_bulk_conc:
          (validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
            ),
            "bulkConcentration",
            false
          ) / 100).toString(),
        Citric_Acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Citric Acid(100)"
          ),
          "bulkDensity",
          false
        ).toString(),
        FeCl3_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "FeCl₃(100)"
          ),
          "bulkDensity",
          false
        ).toString(),
        H2SO4_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "H₂SO₄(98)"
          ),
          "bulkDensity",
          false
        ).toString(),
        HCl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "HCl (32)"
          ),
          "bulkDensity",
          false
        ).toString(),
        NaOCl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOCl(12)"
          ),
          "bulkDensity",
          false
        ).toString(),
        NaOH_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOH (50)"
          ),
          "bulkDensity",
          false
        ).toString(),
        Oxalic_Acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Oxalic Acid(100)"
          ),
          "bulkDensity",
          false
        ).toString(),
        PACl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "PACl(5)"
          ),
          "bulkDensity",
          false
        ).toString(),
        SLS_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
          ),
          "bulkDensity",
          false
        ).toString(),
        Citric_Acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Citric Acid(100)"
          ),
          "bulkPrice",
          false
        ).toString(),
        FeCl3_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "FeCl₃(100)"
          ),
          "bulkPrice",
          false
        ).toString(),
        H2SO4_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "H₂SO₄(98)"
          ),
          "bulkPrice",
          false
        ).toString(),
        HCl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "HCl (32)"
          ),
          "bulkPrice",
          false
        ).toString(),
        NaOCl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOCl(12)"
          ),
          "bulkPrice",
          false
        ).toString(),
        NaOH_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOH (50)"
          ),
          "bulkPrice",
          false
        ).toString(),
        Oxalic_Acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Oxalic Acid(100)"
          ),
          "bulkPrice",
          false
        ).toString(),
        PACl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "PACl(5)"
          ),
          "bulkPrice",
          false
        ).toString(),
        SLS_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
          ),
          "bulkPrice",
          false
        ).toString(),
    };
    const payload = {
      userID: loggedInUserID,
      projectID: projectID,
      caseID: caseID,
      treatmentObjID: 1,
      requestConfig: {
        ...ufReport,
      },
    };
    return payload;
  };

  /* Called inside handleUFConfigAPICall */
  const handleCalcEngineAPICall = (a, activeModuleDetails) => {
    // console.log("activeUFModule -- STORE",activeUFModule);
    // console.log("activeModuleDetails as param",activeModuleDetails);
      const ufConfigPayload = getUFConfigPayload(activeModuleDetails);
      callUFConfigAPI({
        ...ufConfigPayload,
        standBy: a,
        integraPac: activeModuleDetails?.integraPacInd,
        activeModuleName: activeModuleDetails?.newModuleLongName,
      });
  };
  /* Called inside getOperatingFluxFromCalcEngine */
  const callUFConfigAndUpdateOperatingFlux = async (ufConfigPayload) => {
    const MethodName = {
      Method: "uf/api/v1/UFConfig",
    };
    const UFRequestDetails = { ...MethodName, ...ufConfigPayload };
      let calcEngineResponse = await getData(UFRequestDetails);
      if (calcEngineResponse?.data?.statusCode == "OK") {
        if (calcEngineResponse?.data?.responseConfigVM !== undefined) {
          const response=calcEngineResponse?.data?.responseConfigVM;
          if(unit.selectedUnits[4]!=="LMH"){
            const fluxData=GlobalUnitConversion(GlobalUnitConversionStore,calcEngineData.flux_Filter_actual,unit.selectedUnits[4],unitTypeFlux);
            dispatch(handleCalcEngineResponse({...response,["flux_Filter_actual"]:fluxData}));
          }
          dispatch(
            handleOperatingFlux(calcEngineResponse?.data?.responseConfigVM)
          );
          dispatch(updateCallCalcEngineUFConfig(false));
        }
      }
  };

  /* Called inside handleCalcEngineAPICall */
  const callUFConfigAPI = async (ufConfigPayload) => {
    const MethodName = {
      Method: "uf/api/v1/UFConfig",
    };
    const UFRequestDetails = { ...MethodName, ...ufConfigPayload };
    let calcEngineResponse = await getData(UFRequestDetails);
    if (calcEngineResponse?.data?.statusCode == "OK") {
      if (calcEngineResponse?.data?.responseConfigVM !== undefined) {
        const response=calcEngineResponse?.data?.responseConfigVM;
        if(unit.selectedUnits[4]!=="LMH"){
          const fluxData=GlobalUnitConversion(GlobalUnitConversionStore,calcEngineData.flux_Filter_actual,unit.selectedUnits[4],unitTypeFlux);
          dispatch(handleCalcEngineResponse({...response,["flux_Filter_actual"]:fluxData}));
        }else{
          dispatch(
            handleCalcEngineResponse(calcEngineResponse?.data?.responseConfigVM)
          );
        }
        //GENERATE CONFIGURATION TABLE
        generateRecommendedConfigs({
          ...calcEngineResponse?.data?.responseConfigVM,
          standBy: ufConfigPayload.standBy,
          integraPac: ufConfigPayload.integraPac,
          activeModuleName: ufConfigPayload.activeModuleName,
        });
      } else {
        // console.log("5 NO RESPONSE FROM CALC ENGINE");
        dispatch(handleCalcEngineResponse({})); //resetting calc engine variable
        dispatch(updateRecommendedConfiguration([])); //setting table empty
        dispatch(updateDefaultUFConfiguration({})); //setting default configuration selection in table empty
      }
    } else {
      // console.log("5 Status Code not OK");
      // console.log("CALC ENGINE CALL Failed- resetting variables in store");
      dispatch(handleCalcEngineResponse({})); //resetting calc engine variable
      dispatch(updateRecommendedConfiguration([])); //setting table empty
      dispatch(updateDefaultUFConfiguration({})); //setting default configuration selection in table empty
    }

    if (calcEngineResponse.error) {
      // console.log("5 CALC ENGINE API ERROR");
      dispatch(handleCalcEngineResponse({})); //resetting calc engine variable
      dispatch(updateRecommendedConfiguration([])); //setting table empty
      dispatch(updateDefaultUFConfiguration({})); //setting default configuration selection in table empty
      throw new MyError("UF Config API Functionality Failed", 403, "ApiError");
    }
  };

  const handleUFModule = (e) => {
    setActiveUFModuleInStore(e.target.value);
    dispatch(setCustomAvail(true));
    dispatch(setUfDataUpdate(true));
  };

  const handleBlur = (e) => {
    if (e.target.name === "modulesPerSkid") {
      if (
        modulesPerSkid < defaultInputRangeConfig["modulesPerSkid"].minValue ||
        modulesPerSkid > defaultInputRangeConfig["modulesPerSkid"].maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          `The Modules/Rack value entered is outside the allowed range (${defaultInputRangeConfig["modulesPerSkid"].minValue} to ${defaultInputRangeConfig["modulesPerSkid"].maxValue}). Please revise your input.`
        );
        setIsFocused("modulesPerSkid");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "onlineTrains") {
      if (
        e.target.value < fieldOnlineTrains?.minValue ||
        e.target.value > fieldOnlineTrains?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          `The Online Units value entered is outside the allowed range (${fieldOnlineTrains?.minValue} to ${fieldOnlineTrains?.maxValue}). Please revise your input.`
        );
        setIsFocused("onlineTrains");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "redundantStandbyTrains") {
      if (
        (uFBWCEBStandbyOptionID == 2 &&
          redundantStandbyTrains < redundantStandbyTrains1?.minValue) ||
        redundantStandbyTrains > redundantStandbyTrains1?.maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          `The Standby Units value entered is outside the allowed range (${redundantStandbyTrains1?.minValue} to ${redundantStandbyTrains1?.maxValue}). Please revise your input.`
        );
        setIsFocused("redundantStandbyTrains");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "redundantTrains") {
      if (e.target.value > 200 || isNaN(e.target.value)) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          "The Redundant Units value entered is outside the allowed range (0 to 200). Please revise your input."
        );
        setIsFocused("redundantTrains");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "modulesPerTrain") {
      if (
        modulesPerTrain < defaultInputRangeConfig["modulesPerTrain"].minValue ||
        modulesPerTrain > defaultInputRangeConfig["modulesPerTrain"].maxValue ||
        isNaN(e.target.value)
      ) {
        //Show Error PopUp
        setIsFieldValid(true);
        setMessage(
          "The Modules/Unit value entered is outside the recommended range 1 to 1000 but would be accepted. Please consider revising your input."
        );
        setIsFocused("modulesPerTrain");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        setIsFieldValid(false);
      }
    }
    if (e.target.name === "skidsPerTrain") {
      {
        if (
          skidsPerTrain < defaultInputRangeConfig["skidsPerTrain"].minValue ||
          skidsPerTrain > defaultInputRangeConfig["skidsPerTrain"].maxValue ||
          isNaN(e.target.value)
        ) {
          //Show Error PopUp
          setIsFieldValid(true);
          setMessage(
            `The Racks/Units value entered is outside the allowed range (${defaultInputRangeConfig["skidsPerTrain"].minValue} to ${defaultInputRangeConfig["skidsPerTrain"].maxValue}). Please revise your input.`
          );
          setIsFocused("skidsPerTrain");
          setTimeout(() => {
            e.target.focus();
          }, 0);
        } else {
          setIsFieldValid(false);
        }
      }
    }
    // dispatch(setCustomAvail(true));
  };

  /* Initiating API call for getting Full Object From CalcEngine */
  const handleUFConfigAPICall = (a, activeModuleDetails) => {
    handleCalcEngineAPICall(a, activeModuleDetails);
  };

  /* Initiating API call for getting Operating Flux From CalcEngine */
  const getOperatingFluxFromCalcEngine = () =>{
    console.log("getOperatingFluxFromCalcEngine : START");
    const activeModuleDetails = getModuleDetails(UFData.uFModuleID);
    const ufConfigPayload = getUFConfigPayload(activeModuleDetails);
    callUFConfigAndUpdateOperatingFlux({
      ...ufConfigPayload,
      standBy: UFData.uFBWCEBStandbyOptionID,
    });
  };

  /* Compute and Update Operating Flux based on the input changes */
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value == "" ? "" : value;

    if (!isNaN(value)) {
      dispatch(
        updateUFStore({
          ...UFData,
          [e.target.name]: value == "" ? value : Number(value),
        })
      );
      dispatch(calculateUFFields());
      dispatch(setUfDataUpdate(true));
    }
    dispatch(setCustomAvail(false));
  };

  /* Generate Table based on Radio Button Selection */
  const handleStandByOptionSelection = (option) => {
    /* StandBy Option is enabled, then show 1 s the default value, otherwise zero */
    dispatch(setCustomAvail(true));
    dispatch(
      updateUFStore({
        ...UFData,
        ["uFBWCEBStandbyOptionID"]: option,
        ["redundantStandbyTrains"]: option == 1 ? 0 : 1,
      })
    );
    dispatch(setUfDataUpdate(true));

    /*Enabling Standby Units when "Constant operating flux, variable system output" is selected */
    if (option == 1) {
      setStandByFlag(false); //disable field
    } else {
      setStandByFlag(true);
    }

    /* Recalculate the "Selected Configuration" Fields, as StandBy Option is enabled. */
    dispatch(calculateUFFields());

    /* Triggering calcEngine API UFConfig to generate Recommended Configurations Table */
    const activeModuleDetails = getModuleDetails(UFData.uFModuleID);

    handleUFConfigAPICall(option, activeModuleDetails);
  };

  /* Reset Table based on Filter Applied on modules */
  const handleShowFilteredModules = (e) => {
    const { checked, name } = e.target;
    dispatch(setCustomOfflineTimePerUnit(false));
    // const { checked, name } = e.target;
    dispatch(updateIsForDrinkingWater(e.target.checked));
    if (e.target.checked) {
      const activeModuleDetails = getModuleDetails("8");
      dispatch(updateActiveUFModule(activeModuleDetails));
      setActiveUFModuleInStore(8);
      handleUFConfigAPICall(UFData.uFBWCEBStandbyOptionID, activeModuleDetails);
    } else {
      const activeModuleDetails = getModuleDetails("24");
      dispatch(updateActiveUFModule(activeModuleDetails));
      setActiveUFModuleInStore(24);
      handleUFConfigAPICall(UFData.uFBWCEBStandbyOptionID, activeModuleDetails);
    }
    dispatch(setUfDataUpdate(true));
  };

  /* Filter Table based on Slider Range */
  const handleSliderChange = (value) => {
    setProgressValue(value);
    dispatch(updateSliderValue(value));
  };

  const generateRecommendedConfigs = (calcEngineResponse) => {
    // console.log(
    //   "generateRecommendedConfigs standBy",
    //   calcEngineResponse.standBy
    // );
    // console.log(
    //   "generateRecommendedConfigs activeModuleName",
    //   calcEngineResponse?.activeModuleName
    // );
    // console.log(
    //   "generateRecommendedConfigs integraPac",
    //   calcEngineResponse?.integraPac
    // );

    if (
      calcEngineResponse?.integraPac == false &&
      calcEngineResponse.standBy == "1"
    ) {
      // console.log("generateRecommendedConfigs called - configNoRackNoStandBy");
      dispatch(configNoRackNoStandBy({ calcEngineResponse }));
    } else if (
      calcEngineResponse?.integraPac == false &&
      calcEngineResponse.standBy != "1"
    ) {
      // console.log(
      //   "generateRecommendedConfigs called - configNoRackWithStandBy"
      // );
      dispatch(configNoRackWithStandBy({ calcEngineResponse }));
    } else if (
      calcEngineResponse?.integraPac == true &&
      calcEngineResponse.standBy == "1"
    ) {
      // console.log(
      //   "generateRecommendedConfigs called - configWithRackNoStandBy"
      // );
      dispatch(configWithRackNoStandBy({ calcEngineResponse }));
    } else if (
      calcEngineResponse?.integraPac == true &&
      calcEngineResponse.standBy != "1"
    ) {
      // console.log(
      //   "generateRecommendedConfigs called - configWithRackWithStandBy"
      // );
      dispatch(configWithRackWithStandBy({ calcEngineResponse }));
    }
  };

  const validations = {
    modulesPerSkid: defaultInputRangeConfig["modulesPerSkid"],
    onlineTrains: defaultInputRangeConfig["onlineTrains"],
    redundantStandbyTrains: defaultInputRangeConfig["redundantStandbyTrains"],
    redundantTrains: { minValue: 0, maxValue: 200 },
    modulesPerTrain: defaultInputRangeConfig["modulesPerTrain"],
    skidsPerTrain: defaultInputRangeConfig["skidsPerTrain"],
  };

  const checkError = (id) => {
    return !(
      validations[id]?.minValue <= UFData[id] &&
      validations[id]?.maxValue >= UFData[id]
    );
  };

  const getError = (name) => {
    const value = UFData[name];
    const validator = validations[name];
    if (value < validator.minValue) {
      return <ErrorMessage texMsg={"Values out of range"} />;
    } else if (
      value < validator.softLowerLimit ||
      value > validator.softUpperLimit
    ) {
      if (value < validator.maxValue) {
        return (
          <WarningMessage
            txtMsg={`Warning Ranges (${validator.softLowerLimit} - ${validator.softUpperLimit}) `}
          />
        );
      } else {
        return <ErrorMessage texMsg={"Values out of range"} />;
      }
    } else {
      return "";
    }
  };

  const checkWarning = (name) => {
    const value = UFData[name];
    const validator = validations[name];
    if (value < validator.minValue) {
      return false;
    } else if (
      value < validator.softLowerLimit ||
      value > validator.softUpperLimit
    ) {
      if (value < validator.maxValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <>
      <ConfigurationStyled className="g-0">
        <UFSystemDesignDiagram />
        <Col lg={12} md={12} sm={12} className="configuration">
          <div className="system-module-wrapper">
            <StyledCard className="system-configuration-card">
              <Card.Header>
                <CustomHeading
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                  label="System Configuration"
                />
                <IconWithTooltip
                  label="Select normal operating protocol, either constant operating flux or constant output flow."
                  icon={<InfoIcon />}
                />{" "}
              </Card.Header>
              <CustomLabel label="Standby Option" />
              <div className="standby_radios">
                {standByOptions?.map((standOptns, idx) => {
                  const isSelected =
                    standOptns.standByOptionID == uFBWCEBStandbyOptionID; //should replace with uFBWCEBStandbyOptionID??
                  return (
                    <CustomRadio
                      key={`standby-option-${idx}`}
                      type="radio"
                      name="uFBWCEBStandbyOptionID"
                      value={standOptns.standByOptionID}
                      checked={isSelected ? true : false}
                      onClick={() => {
                        handleStandByOptionSelection(
                          standOptns.standByOptionID
                        );
                      }}
                      label={standOptns.standByOptionName}
                      disabled={false}
                      isError={false}
                    />
                  );
                })}
              </div>
              <div className="storage-tank">
                <CustomLabel label="Storage Tank Option" />
                <CustomInput
                  disabled={true}
                  isError={false}
                  value={
                    ufStorageTankOptions.filter(
                      (tankOptn) =>
                        tankOptn.storageTankOptionID == uFStorageTankOptionID
                    )[0]?.storageTankOptionName || ""
                  }
                  id="storageTankOption"
                  placeholder="Storage Tank Options"
                />
              </div>
            </StyledCard>
            <StyledCard className="module-selection-card">
              <Card.Header>
                <CustomHeading
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                  label="Module Selection"
                />
                <IconWithTooltip label="Select a module." icon={<InfoIcon />} />{" "}
              </Card.Header>
              {/* Check Box for filtering drinking water based */}
              <CustomRadioCheck
                id="waterApplications"
                className="drink-water"
                label="Only show modules approved for drinking water applications"
                disabled={false}
                isError={false}
                type="checkbox"
                name="drinkingWater_Ind"
                checked={UFStore.isForDrinkingWater}
                onChange={handleShowFilteredModules}
              />
              <div className="module-select">
                <CustomHeading
                  mandatoryIcon={true}
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="DuPont UF Module"
                />
                <CustomSelect
                  type=""
                  id="pesSelect"
                  name="uFModuleID"
                  value={uFModuleID}
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
              </div>
            </StyledCard>
          </div>
          <div className="selected-configuration">
            <StyledCard className="selected-configuration-card">
              <Card.Header>
                <CustomHeading
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                  label="Selected Configuration"
                />
                <IconWithTooltip
                  label="Provide the arrangement and number of units and modules.Redundant units ignored in calculation."
                  icon={<InfoIcon />}
                />{" "}
              </Card.Header>

              <div
                className={`rack-wrapper ${
                  activeUFModule?.integraPacInd == true ? "" : "hideRack"
                }`}
              >
                <CustomHeading
                  className="track-design"
                  fontFamily="DiodrumRegular"
                  fontSize="10px"
                  fontWeight="400"
                  color={colors.Black}
                  label="TRack Design"
                />
                <div className="rack-module">
                  <div className="racks">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Racks/Units"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      isError={checkError("skidsPerTrain")}
                      name="skidsPerTrain"
                      id="skidsPerTrain"
                      defaultValue={skidsPerTrain}
                      value={skidsPerTrain}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      isWarning={checkWarning("skidsPerTrain")}
                      onFocus={() => handleFocus("skidsPerTrain")}
                    />
                  </div>
                  <div className="racks">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Modules/Rack"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      isError={checkError("modulesPerSkid")}
                      name="modulesPerSkid"
                      id="modulesPerSkid"
                      defaultValue={modulesPerSkid}
                      value={modulesPerSkid}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      isWarning={checkWarning("modulesPerSkid")}
                      onFocus={() => handleFocus("modulesPerSkid")}
                    />
                  </div>
                  <div className="racks">
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Total No. of Racks"
                      lineHeight="18px"
                    />
                    <CalcEngineInputBox
                      isAutoPopulated={true}
                      isError={false}
                      name="skids"
                      id="skids"
                      defaultValue={skids}
                      value={skids}
                      disabled={true}
                    />
                  </div>
                  <div className="radio">
                    <CustomRadio
                      type="radio"
                      name="TrRadio"
                      id="tr1"
                      label="TR1 (4  -30) * 1"
                      disabled={true}
                      isError={false}
                    />
                  </div>
                  <div className="radio">
                    <CustomRadio
                      type="radio"
                      name="TrRadio"
                      id="tr2"
                      label="TR1 (4  -30) * 2"
                      disabled={true}
                      isError={false}
                    />
                  </div>
                  <div className="radio">
                    <CustomRadio
                      type="radio"
                      name="TrRadio"
                      id="tr4"
                      label="TR1 (4  -30) * 4"
                      disabled={true}
                      isError={false}
                    />
                  </div>
                </div>
              </div>
              <div className="unit-wrapper">
                <CustomHeading
                  className="unit-header"
                  fontFamily="DiodrumRegular"
                  fontSize="10px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Number of Units"
                />
                <div className="unit-group">
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Online Units"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="onlineTrains"
                      disabled={false}
                      id="onlineTrains"
                      placeholder="0"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={UFData.onlineTrains}
                      isError={checkError("onlineTrains")}
                      isWarning={checkWarning("onlineTrains")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus("onlineTrains")}
                    />
                  </div>
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Standby Units"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="redundantStandbyTrains"
                      disabled={UFData.uFBWCEBStandbyOptionID == 1}
                      id="redundantStandbyTrains"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={Number(UFData.redundantStandbyTrains)}
                      isError={checkError("redundantStandbyTrains")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      isWarning={checkWarning("redundantStandbyTrains")}
                      onFocus={() => handleFocus("redundantStandbyTrains")}
                    />
                  </div>
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Redundant Unit"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="redundantTrains"
                      disabled={false}
                      id="redundantTrains"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={UFData.redundantTrains}
                      isError={checkError("redundantTrains")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      isWarning={checkWarning("redundantTrains")}
                      onFocus={() => handleFocus("redundantTrains")}
                    />
                  </div>
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Total Units"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="totalTrains"
                      disabled={true}
                      id="totalTrains"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={UFData.totalTrains}
                      isError={false}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus("totalTrains")}
                    />
                  </div>

                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Modules/Unit"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="modulesPerTrain"
                      disabled={activeUFModule?.integraPacInd == true}
                      id="modulesPerTrain"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={UFData.modulesPerTrain}
                      isError={checkError("modulesPerTrain")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      isWarning={checkWarning("modulesPerTrain")}
                      onFocus={() => handleFocus("modulesPerTrain")}
                    />
                  </div>
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Total Modules"
                      lineHeight="18px"
                    />
                    <CustomInput
                      type="text"
                      // type="number"
                      name="totalModules"
                      disabled={true}
                      id="totalModules"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={
                        isNaN(UFData.totalModules) ? 0 : UFData.totalModules
                      }
                      isError={false}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus("totalModules")}
                    />
                  </div>
                  <div>
                    <CustomLabel
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.Black}
                      label="Operating Flux"
                      lineHeight="18px"
                    />
                    <CalcEngineInputBox
                      //type="text"
                      type="number"
                      name="flux_Filter_actual"
                      // inputText="LMH"
                      inputText={unit.selectedUnits[4]}
                      disabled={true}
                      id="flux_Filter_actual"
                      // defaultValue={ index == 1 ? redundantStandbyTrains : item.defaultValue }
                      value={
                        calcEngineData.flux_Filter_actual !== undefined
                          ? Number(
                              Math.round(calcEngineData?.flux_Filter_actual)
                            ).toFixed(2)
                          : 0
                      }
                      isError={false}
                      onBlur={handleBlur}
                      // onChange={handleInputChange}
                    />
                  </div>
                  {/* {unitsData.map((item, index)=>(
                    (item.calcInput?(
                      <div key={index}>
                      <CustomLabel
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.Black}
                          label={item.label}
                          lineHeight="18px"
                        />
                        <CalcEngineInputBox defaultValue={item.defaultValue} value={item.value} disabled={item.disabled} name={item.name}
                        isError={false} placeholder={item.placeholder} inputText={item.inputText} isAutoPopulated={item.isAutoPopulated}/>
                      </div>
                    
                    ):(
                    <div key={index}>
                    <CustomLabel
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.Black}
                          label={item.label}
                          lineHeight="18px"
                        />
                        <CustomInput
                        type="number"
                        name={item.name} 
                        disabled={item.disabled} 
                        id={item.label}
                        defaultValue={ item.defaultValue } 
                        value={ item.value}
                        isError={item.isError || false}
                        onChange={handleInputChange} 
                        placeholder={item.placeholder}
                        onBlur={handleBlur}
                        />
                    </div>
                    ))
                  ))} */}
                </div>
              </div>
            </StyledCard>
          </div>
          <div className="card-wrapper-four">
            <StyledCard className="recomm-config">
              <Card.Header>
                <CustomHeading
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="16px"
                  width="500px"
                  color={colors.PrimaryDarkAquaMarine}
                  label="Recommended Configurations"
                />
                <IconWithTooltip
                  label="List of potential configurations which will meet the desired target operating flux."
                  icon={<InfoIcon />}
                />{" "}
              </Card.Header>
              <div
                className={`tracks-wrapper ${
                  activeUFModule?.integraPacInd == true ? "" : "hideRack"
                }`}
              >
                {" "}
                <div className="limit">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Min TRack Size Limit:"
                  lineHeight="18px"
                />
                </div>
                {/* <div className="slider-bar">
                  <ProgressBar
                    now={sliderValue}
                    max={22}
                    label={`${sliderValue}`}
                  />
                  <div className="slider-label-wrapper">
                    <CustomLabel label="6" />
                    <Slider
                      min={6}
                      max={22}
                      step={1}
                      value={sliderValue}
                      onChange={handleSliderChange}
                    />
                    
                    <CustomLabel label="22" />
                  </div>
                </div> */}
                <MultiRangeSliderStyled>
                <MultiRangeSlider min={6} max={22} />
                </MultiRangeSliderStyled>
                <div className="limit">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Max TRack Size Limit:"
                  lineHeight="18px"
                />
                </div>
              </div>
              <TableComponent />
            </StyledCard>
          </div>
        </Col>
      </ConfigurationStyled>
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
export default Configuration;
