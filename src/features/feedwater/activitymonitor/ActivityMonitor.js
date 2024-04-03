import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import SystemDesign from "../systemdesign/SystemDesign";
import FeedSetup from "../feedsetup/FeedSetup";
import IXD from "../ix/IXD";
import ActivityMonitorStyled from "./ActivityMonitorStyled";
import UF from "../uf/UF";
import FeedTechnology from "../systemdesign/FeedTechnology";
import { useDispatch, useSelector } from "react-redux";
import SystemDesign from "../systemdesign/SystemDesign";
import ActivityMonitorTriangle from "../../../common/icons/ActivityMonitorTriangle";
import UnitConversion from "../../../common/utils/UnitConversion";

import Report from "../report/Report";
import { useEffect } from "react";
import {
  setIXDUpdate,
  updateAfterReportChemDoseData,
  updateAfterReportOverRunDoseData,
  updateEvaluateExistFlag,
} from "../ix/IXDSlice";
import {
  useCreateDataMutation,
  useUpdateDataMutation,
  useLazyGetAllDataQuery,
} from "../../../services/apiConfig";
import ProgressSelectedCircleIcon from "../../../common/icons/ProgressSelectedCircleIcon";
import ProgressBrokenIcon from "../../../common/icons/ProgressBrokenIcon";
import ProgressCompleteIcon from "../../../common/icons/ProgressCompleteIcon";
import ProgressDisableIcon from "../../../common/icons/ProgressDisableIcon";
import ProgressSelectedTriangle from "../../../common/icons/ProgressSelectedTriangle";
import ProgressPendingIcon from "../../../common/icons/ProgressPendingIcon";
import { useFetcher, useLocation } from "react-router-dom";
import { setTabData } from "./tabChangeSlice";

import {
  updateUFStandByOptions,
  updateUFStorageTankOptions,
  updateUFModuleList,
  updateUFTechnologyList,
  updateUFInputRangeConfig,
  updateUFFluxGuideline,
  updatelstUfmoduleFlowVM,
  updatelstUFModulePressureRatingVM,
  updateUFInputRangeConfigByWaterType,
  updateUFStore,
  updateBackWashOptions,
  updateUfDoseGuidline,
  setActiveTab,
  setUfDataUpdate,
} from "../uf/UFSlice";
import { useNavigate } from "react-router-dom";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import { MyError } from "../../../common/utils/ErrorCreator";
import {
  setErrorMessage,
  setErrorReport,
  setReportData,
  setReportLoader,
} from "./activityMonitorSlice";
import {
  setNeedToRetriveData,
  setNodeAndEdge,
} from "../systemdesign/processDiagramSlice";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateTabAvailable } from "../../../common/ReportIXDSlice";

import { updateTabAvailableForUF,UpdateUFReport } from "../../../common/ReportUFSlice";

const ActivityMonitor = ({ setCurrentPanel }) => {
  const dispatch = useDispatch();
  const locationData = useLocation();
  const [IXData_PostData, { Umoiddata }] = useCreateDataMutation();

  const UFData = useSelector((state) => state.UFStore.data);

  //User Info Data from store -------------------------------------------------------------------------------
  const UserInfoStore = useSelector((state) => state.userInfo.data);

  //project configuration data from store---------------------------------------------------------------------
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const { chemicalConfig, pumpCofig, unitConfig, currencyConfig } = useSelector(
    (state) => state.projectInfo.projectConfig
  );
  const { projectInfoVM, appInfoVM } = useSelector(
    (state) => state.projectInfo.projectData
  );
  const { errorMsgCode } = useSelector((state) => state.scrollData);

  //Project Data list ---------------------------------------------------------------------------------------
  const { Temdata } = useSelector((state) => state.cardlist);

  //Feed waterData from store--------------------------------------------------------------------------------
  const FeedStoreData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.data
  );
  const StreamStoreData = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData.lstrequestsavefeedwater[0]
        ?.streams[0]
  );
  const FeedStreamData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.streamData
  );
  const { technologyAdded } = useSelector((state) => state.processDiagramSlice);

  //UF store data -------------------------------------------------------------------------------------------
  const UFStore = useSelector((state) => state.UFStore);
  const ufData = useSelector((state) => state.UFStore.data);
  const {
    activeUFModule,
    ufModules,
    ufInputRangeConfig,
    ufInputRangeConfigByWaterType,
    activeTab,
    ufFluxGuideline,
    ufModuleFlowVM,
    ufModulePressureRatingVM,
  } = UFStore;

  //UF ReportUFslice
  const DefaultUFstroe = useSelector((state) => state.ReportUF.data);
  const tabAvailableForUF = useSelector((state) => state.ReportUF.tabAvailableForUF);

  //Process diagram Data--------------------------------------------------------------------------------------
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
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 1 && !item?.isDeleted
      )?.caseTreatmentID
  );
  const caseTreatmentIDIXD = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );

  //IX store Data ---------------------------------------------------------------------------------------------
  const {
    userID,
    projectID,
    caseID,
    treatmentObjID,
    selectedResinList,
    listRegenConds,
    listAdvRegen,
    flag_Evaluate_Type,
    newPlant_ind,
    plant_to_Upcore_ind,
    evaluteExisting_ind,
    degasifation_ind,
    selectedEffluent,
    effluentValue,
    location,
    anionResin,
    cationResin,
    vessel1,
    vessel2,
    vessel3,
    vessel4,
    trains_Online,
    trains_StandBy,
    no_Buffer_Tank_ind,
    space_velocity_txt,
    evaluateExisiting_ind_RuntimeOptimized,
    operatingCycle_Lenght_txt,
    bypassed,
    listProductQualityandregeneration,
  } = useSelector((state) => state.IXStore.data);
  const resinVal = useSelector((state) => state.IXStore.data?.listRegenConds);
  const uomData = useSelector((state)=>state.GUnitConversion.data);
  const ixStoreAdvance = useSelector(
    (state) => state.IXStore?.data?.listAdvRegen
  );
  const ixRegenreteDose = useSelector(
    (state) => state.IXStore?.data?.listProductQualityandregeneration
  );
  const { unitTypeRegeneration, unitTypeConductivity } = useSelector(
    (state) => state.GUnitConversion
  );
  const ixStoreResin1 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 1)
  );
  const ixStoreResin2 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 2)
  );

  const ixStoreCation = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[0]
  );
  const ixStoreAnion = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[1]
  );
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  const { projectTitle } = useSelector((state) => state.projectInfo);
  const ixStoreObj = useSelector((state) => state.IXStore);

  const {
    existingPlantDescription,
    evaluateExistFlag,
    resinNameCalc,
    resinInertCalc,
    resinIonicCalc,
    vesselCalcName,
    vesselFlags,
  } = useSelector((state) => state.IXStore);
  const validdesignID = useSelector(
    (state) => state.IXStore.data.validDesignID
  );
  const feedDataJson = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
        .streams[0]
  );

  //CSS store Data -------------------------------------------------------------------------------------
  const feedCheck = useSelector((state) => state.tabData.tab);
  const scrollDirection = useSelector((state) => state.scrollData.direction);

  //contore tab change and constants
  const userId = UserInfoStore ? UserInfoStore.UserId : 1;
  const newDesignExist = useSelector((state) => state.IXStore.newDesignExist);
  const loggedInUserID = userId;
  const projectid = ProjectInfoStore ? ProjectInfoStore.projectID : 0;
  const [selectedIndex, setSelectedIndex] = useState("System Design"); //set the selected tab
  const [selectedTab, setSelectedTab] = useState(0);
  const [panelIndex, setPanelIndex] = useState(0); //provide CSS

  // unit conversion
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );

  const tabAvailable= useSelector((state)=>state.ReportIXD.tabAvailable);
  const reportData= useSelector((state)=>state.ReportIXD.data);


  //css variabels
  const [scrollCheck, setScrollCheck] = useState(false);
  const [isFeedError, setIsFeedError] = useState(false);
  const [isReportError, setIsReportError] = useState(false);
  const [isFeedsetupError, setisFeedsetupError] = useState(false);
  const [header, setHeader] = useState(false);

  //Api Variabels
  const [updateData, response] = useUpdateDataMutation();
  const [updateUFData, responseUFSave] = useCreateDataMutation();
  const [updateFeedsetupData, data] = useCreateDataMutation();
  const [POSTIXDJsonData, IXDReportResponse] = useCreateDataMutation();
  const [POSTUFJsonData, UFReportResponse] = useCreateDataMutation();
  const [POSTUFAutoSaveData, responseAutoSave] = useCreateDataMutation();
  const [getDesignData, responseDesignData] = useLazyGetAllDataQuery();
  const [getConfigurationData, responseConfigData] = useLazyGetAllDataQuery();
  const [getBackWashData, responseBWData] = useLazyGetAllDataQuery();
  const [getUFDetails, responseUFDetails] = useLazyGetAllDataQuery();
  const [getSystemData, responseSystemData] = useLazyGetAllDataQuery();

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsFeedError(false);
      setIsReportError(false);
      setisFeedsetupError(false);
    }
  };
  //----------------------------Force fully change------------------------------------------------
  useEffect(() => {
    setSelectedIndex("System Design");
    setPanelIndex(0);
    setCurrentPanel("System Design");
  }, [projectTitle]);
  //----------------------------**Report Response**------------------------------------------------
  useEffect(() => {
    if (UFReportResponse.isLoading) {
      dispatch(setReportLoader());
    }
    if (UFReportResponse.isSuccess) {
      dispatch(setReportData(UFReportResponse.data));
    }
    if (UFReportResponse.isError) {
      dispatch(
        setErrorReport({ error: true, message: "woeukfhdkjhbcaskcnaskjcbdskj" })
      );
    }
  }, [UFReportResponse]);

  useEffect(() => {
    if (IXDReportResponse.isLoading) {
      dispatch(setReportLoader());
    }
    if (IXDReportResponse.isSuccess) {
      dispatch(setReportData(IXDReportResponse.data?.byteArray));
      dispatch(
        updateAfterReportChemDoseData(IXDReportResponse.data?.calcChemDose)
      );
      dispatch(
        updateAfterReportOverRunDoseData(IXDReportResponse.data?.calcOverrun)
      );
    }
    if (IXDReportResponse.isError) {
      dispatch(
        setErrorReport({ error: true, message: "woeukfhdkjhbcaskcnaskjcbdskj" })
      );
    }
  }, [IXDReportResponse]);

  //----------------------------**IXD Report Section Start**----------------------------------------

  // //for sendeing resin name to calc engin
  // const initialObj = {
  //   name1: "",
  //   name2: "",
  //   name3: "",
  //   name4: "",
  // };
  // const initialObj1 = {
  //   Inert1: "",
  //   Inert2: "",
  // };
  // const initialObj2 = {
  //   Ion1: 5,
  //   Ion2: 5,
  //   Ion3: 5,
  //   Ion4: 5,
  // };
  // const [resinName, setResinName] = useState(initialObj);
  // const [resinInertName, setInertResinName] = useState(initialObj1);
  // const [resinIon, setResinIon] = useState(initialObj2);

  // useEffect(() => {
  //   const nonNullValues = Object.values(resinNameCalc).filter(
  //     (value) => value !== null
  //   );
  //   const updatedObj = { ...initialObj };
  //   nonNullValues.forEach((value, index) => {
  //     const propName = `name${index + 1}`;
  //     updatedObj[propName] = value;
  //   });
  //   setResinName(updatedObj);
  // }, [resinNameCalc]);

  // useEffect(() => {
  //   const nonNullValues = Object.values(resinInertCalc).filter(
  //     (value) => value !== null
  //   );
  //   const updatedObj = { ...initialObj1 };
  //   nonNullValues.forEach((value, index) => {
  //     const propName = `Inert${index + 1}`;
  //     updatedObj[propName] = value;
  //   });
  //   setInertResinName(updatedObj);
  // }, [resinInertCalc]);

  // useEffect(() => {
  //   const nonNullValues = Object.values(resinIonicCalc).filter(
  //     (value) => value !== null
  //   );
  //   const updatedObj = { ...initialObj2 };
  //   nonNullValues.forEach((value, index) => {
  //     const propName = `Ion${index + 1}`;
  //     updatedObj[propName] = value;
  //   });
  //   setResinIon(updatedObj);
  // }, [resinIonicCalc]);

  useEffect(() => {
    setSelectedIndex("System Design");
    setPanelIndex(0);
    setCurrentPanel("System Design");
    callDesignDataAPI();
    callConfigurationDataAPI();
    callBackWashDataAPI();
    dispatch(updateEvaluateExistFlag(false));
  }, [evaluateExistFlag]);

  const sio2ConversionMeql = () => {
    if (ixStoreAnion.speciesUnit === 1) {
      let anionMeqlAvg = ixStoreAnion.averageSpeciesVal / 60084.33;
      let anionMeqlEnd = ixStoreAnion.endpoingSpeciesVal / 60084.33;
      return [anionMeqlAvg, anionMeqlEnd];
    } else {
      let anionMeqlAvg = ixStoreAnion.averageSpeciesVal / 60.08433;
      let anionMeqlEnd = ixStoreAnion.endpoingSpeciesVal / 60.08433;
      return [anionMeqlAvg, anionMeqlEnd];
    }
  };

  const createNewData = (port) => {
    if (port == 1) {
      if (
        listRegenConds[0]?.step3_ind &&
        listRegenConds[0]?.step2_ind &&
        listRegenConds[0]?.step1_ind
      ) {
        return {
          RegenProt_1_Steps: 3,
          RegenProt_1_Conc_Percent_n0:
            listRegenConds.length > 0 && listRegenConds[0]?.step3Con,
          RegenProt_1_Conc_Percent_n1:
            listRegenConds.length > 0 && listRegenConds[0]?.step2Con,
          RegenProt_1_Conc_Percent_n2:
            listRegenConds.length > 0 && listRegenConds[0]?.step1Con,
          RegenProt_1_Conc_Percent_n3: 0,
          RegenProt_1_fraction_n1:
            listRegenConds.length > 0 && listRegenConds[0]?.step3DosFrac / 100,
          RegenProt_1_fraction_n2:
            listRegenConds.length > 0 && listRegenConds[0]?.step2DosFrac / 100,
          RegenProt_1_fraction_n3:
            listRegenConds.length > 0 && listRegenConds[0]?.step1DosFrac / 100,
        };
      } else if (listRegenConds[0]?.step2_ind && listRegenConds[0]?.step1_ind) {
        return {
          RegenProt_1_Steps: 2,
          RegenProt_1_Conc_Percent_n0:
            listRegenConds.length > 0 && listRegenConds[0]?.step2Con,
          RegenProt_1_Conc_Percent_n1:
            listRegenConds.length > 0 && listRegenConds[0]?.step1Con,
          RegenProt_1_Conc_Percent_n2: 0,
          RegenProt_1_Conc_Percent_n3: 0,
          RegenProt_1_fraction_n1:
            listRegenConds.length > 0 && listRegenConds[0]?.step2DosFrac / 100,
          RegenProt_1_fraction_n2:
            listRegenConds.length > 0 && listRegenConds[0]?.step1DosFrac / 100,
          RegenProt_1_fraction_n3: 0,
        };
      } else {
        return {
          RegenProt_1_Steps: 1,
          RegenProt_1_Conc_Percent_n0:
            listRegenConds.length > 0 && listRegenConds[0]?.step1Con,
          RegenProt_1_Conc_Percent_n1: 0,
          RegenProt_1_Conc_Percent_n2: 0,
          RegenProt_1_Conc_Percent_n3: 0,
          RegenProt_1_fraction_n1:
            listRegenConds.length > 0 && listRegenConds[0]?.step1DosFrac,
          RegenProt_1_fraction_n2: 0,
          RegenProt_1_fraction_n3: 0,
        };
      }
    } else {
      if (
        listRegenConds[1]?.step3_ind &&
        listRegenConds[1]?.step2_ind &&
        listRegenConds[1]?.step1_ind
      ) {
        return {
          RegenProt_2_Steps: 3,
          RegenProt_2_Conc_Percent_n0:
            listRegenConds.length > 1 && listRegenConds[1]?.step3Con,
          RegenProt_2_Conc_Percent_n1:
            listRegenConds.length > 1 && listRegenConds[1]?.step2Con,
          RegenProt_2_Conc_Percent_n2:
            listRegenConds.length > 1 && listRegenConds[1]?.step1Con,
          RegenProt_2_Conc_Percent_n3: 0,
          RegenProt_2_fraction_n1:
            listRegenConds.length > 1 && listRegenConds[1]?.step3DosFrac / 100,
          RegenProt_2_fraction_n2:
            listRegenConds.length > 1 && listRegenConds[1]?.step2DosFrac / 100,
          RegenProt_2_fraction_n3:
            listRegenConds.length > 1 && listRegenConds[1]?.step1DosFrac / 100,
        };
      } else if (listRegenConds[1]?.step2_ind && listRegenConds[1]?.step1_ind) {
        return {
          RegenProt_2_Steps: 2,
          RegenProt_2_Conc_Percent_n0:
            listRegenConds.length > 1 && listRegenConds[1]?.step2Con,
          RegenProt_2_Conc_Percent_n1:
            listRegenConds.length > 1 && listRegenConds[1]?.step1Con,
          RegenProt_2_Conc_Percent_n2: 0,
          RegenProt_2_Conc_Percent_n3: 0,
          RegenProt_2_fraction_n1:
            listRegenConds.length > 1 && listRegenConds[1]?.step2DosFrac / 100,
          RegenProt_2_fraction_n2:
            listRegenConds.length > 1 && listRegenConds[1]?.step1DosFrac / 100,
          RegenProt_2_fraction_n3: 0,
        };
      } else {
        return {
          RegenProt_2_Steps: 1,
          RegenProt_2_Conc_Percent_n0:
            listRegenConds.length > 1 && listRegenConds[1]?.step1Con,
          RegenProt_2_Conc_Percent_n1: 0,
          RegenProt_2_Conc_Percent_n2: 0,
          RegenProt_2_Conc_Percent_n3: 0,
          RegenProt_2_fraction_n1:
            listRegenConds.length > 1 && listRegenConds[1]?.step1DosFrac,
          RegenProt_2_fraction_n2: 0,
          RegenProt_2_fraction_n3: 0,
        };
      }
    }
  };
  const plantDesign = () => {
    if (newPlant_ind == true) {
      return 2;
    } else if (evaluteExisting_ind == true) {
      return 0;
    } else if (plant_to_Upcore_ind == true) {
      return 1;
    } else {
      return 2;
    }
  };
  const userSelectedMetric = () => {
    if (unit?.selectedUnits[8] === "in") {
      return 1;
    } else {
      return 0;
    }
  };

  const waterBlockFlag = () => {
    if (vessel1 == 5 || vessel2 == 5 || vessel3 == 5 || vessel4 == 5) {
      return true;
    } else {
      return false;
    }
  };
  const fastRinseIXDReport = () => {
    // const vessel1 = 0;
    // const vessel2 = 2;
    // const vessel3 = 4;
    // const vessel4 = null;
    // const cationResin = 0;
    // const anionResin = 11;
    let FRCation = null;
    let FRAnion = null;
    let actionForCation1 = null;
    let actionForAnion1 = null;
    let actionForCation2 = null;
    let actionForAnion2 = null;
    if (
      vessel1 !== null &&
      vessel2 === null &&
      vessel3 === null &&
      vessel4 === null
    ) {
      actionForCation1 = vessel1;
      actionForAnion1 = vessel1;
    } else if (
      vessel1 !== null &&
      vessel2 !== null &&
      vessel3 === null &&
      vessel4 === null
    ) {
      actionForCation1 = vessel1;
      actionForAnion1 = vessel2;
    } else if (
      cationResin === 5 &&
      anionResin !== 11 &&
      vessel1 !== null &&
      vessel2 !== null &&
      vessel3 !== null &&
      vessel4 === null
    ) {
      actionForCation1 = vessel1;
      actionForCation2 = vessel2;
      actionForAnion1 = vessel3;
    } else if (
      anionResin === 11 &&
      cationResin !== 5 &&
      vessel1 !== null &&
      vessel2 !== null &&
      vessel3 !== null &&
      vessel4 === null
    ) {
      actionForCation1 = vessel1;
      actionForCation2 = null;
      actionForAnion1 = vessel2;
      actionForAnion2 = vessel3;
    } else if (
      vessel1 !== null &&
      vessel2 !== null &&
      vessel3 !== null &&
      vessel4 !== null
    ) {
      actionForCation1 = vessel1;
      actionForCation2 = vessel2;
      actionForAnion1 = vessel3;
      actionForAnion2 = vessel4;
    }

    if (
      actionForCation1 == 1 ||
      actionForCation2 == 1 ||
      actionForAnion1 == 1 ||
      actionForAnion2 == 1
    ) {
      FRCation = 2;
      FRAnion = 1;
    } else {
      FRCation = 0;
      FRAnion = 0;
    }
    return [FRCation, FRAnion];
  };
  const SaveIXDJSONData = async (dummyReportListFinal) => {
    let cation = createNewData(1);
    let anion = createNewData(2);
    let plantDesignInd = plantDesign();
    let [sio2MeqlAvg, sio2MeqlEnd] = sio2ConversionMeql();
    let selectedUnitbyUser = userSelectedMetric();
    let water = waterBlockFlag();
    let fastRinseWater = fastRinseIXDReport();
    console.log("fastRinseWater",fastRinseWater);

    console.log("plantDesignInd", plantDesignInd);
    //-------calculation for product quality page starts----//
    const ToUnit = 2;
    const FromUnit = ixStoreCation.speciesUnit;
    const cationMeqlAvg = UnitConversion(
      "IXD",
      ixStoreCation.averageSpeciesVal,
      ToUnit,
      FromUnit
    );
    const cationMeqlEnd = UnitConversion(
      "IXD",
      ixStoreCation.endpoingSpeciesVal,
      ToUnit,
      FromUnit
    );
    // const anionMeqlAvg = UnitConversion(
    //   "IXD",
    //   ixStoreAnion.averageSpeciesVal,
    //   ToUnit,
    //   FromUnit
    // );
    // const anionMeqlEnd = UnitConversion(
    //   "IXD",
    //   ixStoreAnion.endpoingSpeciesVal,
    //   ToUnit,
    //   FromUnit
    // );
    //-------------------------//
    /*----Unit conversion for regenenConditionPage start-----*/
    let [a, b] = resinVal;
    let cationTemp = resinVal[0]?.temperature;
    let anionTemp = resinVal[1]?.temperature;
    if (a) {
      cationTemp = Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[0]?.temperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      );
    }
    if (b) {
      anionTemp = Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[1]?.temperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      );
    }
    /*----Unit conversion for Advance Regeneration start-----*/
    let [c, d] = ixStoreAdvance;
    let cationregenVel = ixStoreAdvance[0]?.regenerationVelocity;
    let anionregeneVel = ixStoreAdvance[1]?.regenerationVelocity;
    if (c) {
      cationregenVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[0]?.regenerationVelocity,
        "BV/h",
        unit.selectedUnits[10]
      );
    }
    if (d) {
      anionregeneVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[1]?.regenerationVelocity,
        "BV/h",
        unit.selectedUnits[10]
      );
    }
    /*----Unit conversion for Advance Regeneration end-----*/
    /*----Unit conversion for Product Quality Regeneration start-----*/
    let [Ra, Rd] = ixRegenreteDose;
    // averageConductivityVal
    let cationRegenreteDoseVel = ixRegenreteDose[0]?.regenerantDoseVal4;
    let anionRegenreteDoseVel = ixRegenreteDose[1]?.regenerantDoseVal4;
    let cationAverageConduc = ixRegenreteDose[0]?.averageConductivityVal;
    let anionAverageConduc = ixRegenreteDose[1]?.averageConductivityVal;
    let cationendpointConduc = ixRegenreteDose[0]?.endpointConductivityVal;
    let anionendpointConduc = ixRegenreteDose[1]?.endpointConductivityVal;
    if (Ra) {
      cationRegenreteDoseVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.regenerantDoseVal4,
        "g/L",
        unit.selectedUnits[14]
      );
      cationAverageConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.averageConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
      cationendpointConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.endpointConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
    }
    if (Rd) {
      anionRegenreteDoseVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.regenerantDoseVal4,
        "g/L",
        unit.selectedUnits[14]
      );
      anionAverageConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.averageConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
      anionendpointConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.endpointConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
    }

    /*----Unit conversion for Product Quality Regeneration end-----*/
    const MAIN_INPUT = tabAvailable.IXD?{
      Export_to_Excel: 0,
      Name_1: "", //It will be updated by middleware before sending to Calc-engine
      Name_2: "", //It will be updated by middleware before sending to Calc-engine
      Name_3: "", //It will be updated by middleware before sending to Calc-engine
      Name_4: "", //It will be updated by middleware before sending to Calc-engine
      Name_Inert1: "", //It will be updated by middleware before sending to Calc-engine
      Name_Inert2: "", //It will be updated by middleware before sending to Calc-engine
      Name_Inert3: "", //It will be updated by middleware before sending to Calc-engine
      Flag_Evaluate_Type: true,
      Flag_Degas: degasifation_ind !== null && degasifation_ind,
      Flag_Custom_Resin_Volume_1: false,
      Flag_Vessel_1_Custom: false,
      Flag_Custom_Inert_Height: false,
      Flag_Overrun_Computation:
        listProductQualityandregeneration[0]?.overAllComputation == 1
          ? true
          : false,
      Flag_neutral_Effluent:
        listProductQualityandregeneration[0]?.naturalEffect === 2 && true,
      Flag_Optimise_Dose:
        listProductQualityandregeneration[0]?.doseOptimization === 2 &&
        true,
      Flag_Overall_Process: 7, //needs to be dynamic when more technology(currently we are using only demineralization)
      Flag_CP_Sub_Process: 0, //IXCPP
      Flag_Layout:
        parseFloat(trains_StandBy) > 0 && trains_StandBy !== null
          ? 2
          : no_Buffer_Tank_ind === true
          ? 0
          : 1,
      Bypass_Fraction: bypassed !== null ? parseFloat(bypassed) : 0,
      N_trains_online:
        trains_Online !== null ? parseFloat(trains_Online) : 0,
      N_trains_Standby:
        trains_StandBy !== null ? parseFloat(trains_StandBy) : 0,
      Flag_Evaluation_Mode: plantDesignInd,
      Flag_Design_Criteria:
        evaluateExisiting_ind_RuntimeOptimized === true ? 1 : 0,
      t_load_target: operatingCycle_Lenght_txt
        ? operatingCycle_Lenght_txt
        : 0,
      SV_Load_target: space_velocity_txt
        ? Number(
            GlobalUnitConversion(
              GlobalUnitConversionStore,
              space_velocity_txt,
              "BV/h",
              unit.selectedUnits[10]
            ).toFixed(2)
          )
        : 0,
      Flag_Design_Scavenger: 0, //IXCPP
      Flag_Design_Cation: cationResin, //It will be updated by middleware before sending to Calc-engine
      Flag_Design_Anion: anionResin, //It will be updated by middleware  before sending to Calc-engine
      Flag_Design_Polish: 0, //IXCPP
      Flag_Design_CPP: 0, //IXCPP
      Flag_Degas_Target_Type:
        selectedEffluent !== null ? selectedEffluent : 0,
      Degas_Target: effluentValue !== null ? effluentValue : 0,
      Flag_Degas_Location: location !== null ? location : 0,
      Flag_Ionic_Form_1: 5, //It will be updated by middleware before sending to Calc-engine
      Flag_Ionic_Form_2: 5, //It will be updated by middleware before sending to Calc-engine
      Flag_Ionic_Form_3: 5, //It will be updated by middleware before sending to Calc-engine
      Flag_Ionic_Form_4: 5, //It will be updated by middleware before sending to Calc-engine
      Resin_Packaging_Size_1: 1,
      Resin_Packaging_Size_2: 1,
      Resin_Packaging_Size_3: 1,
      Resin_Packaging_Size_4: 1,
      Custom_Resin_Volume_1:
        dummyReportListFinal.length > 0 &&
        dummyReportListFinal[0]?.resinVolumeAsDelivered
          ? dummyReportListFinal[0]?.resinVolumeAsDelivered
          : 0,
      Custom_Resin_Volume_2:
        dummyReportListFinal.length > 1 &&
        dummyReportListFinal[1]?.resinVolumeAsDelivered
          ? dummyReportListFinal[1]?.resinVolumeAsDelivered
          : 0,
      Custom_Resin_Volume_3:
        dummyReportListFinal.length > 2 &&
        dummyReportListFinal[2]?.resinVolumeAsDelivered
          ? dummyReportListFinal[2]?.resinVolumeAsDelivered
          : 0,
      Custom_Resin_Volume_4:
        dummyReportListFinal.length > 3 &&
        dummyReportListFinal[3]?.resinVolumeAsDelivered
          ? dummyReportListFinal[3]?.resinVolumeAsDelivered
          : 0,
      Capacity_Safety_Factor_1:
        listProductQualityandregeneration[0]?.saftyFactorVal,
      Capacity_Safety_Factor_2: parseFloat(
        listProductQualityandregeneration[1]?.saftyFactorVal
      ),
      Capacity_Safety_Factor_3:
        listProductQualityandregeneration[0]?.regeneratDoseVal1,
      Capacity_Safety_Factor_4:
        listProductQualityandregeneration[1]?.regeneratDoseVal1,
      Flag_Vessel_1_Regen_Sys: vessel1 !== null ? vessel1 : 0,
      Flag_Vessel_2_Regen_Sys: vessel2 !== null ? vessel2 : 0,
      Flag_Vessel_3_Regen_Sys: vessel3 !== null ? vessel3 : 0,
      Flag_Vessel_4_Regen_Sys: vessel4 !== null ? vessel4 : 0,
      Flag_Vessel_1_Inert: 0, //It will be updated by middleware before sending to Calc-engine
      Flag_Vessel_2_Inert: 0, //It will be updated by middleware before sending to Calc-engine
      Flag_Vessel_3_Inert: 0, //It will be updated by middleware before sending to Calc-engine
      Flag_Vessel_4_Inert: 0, //It will be updated by middleware before sending to Calc-engine
      Vessel_1_Custom_Diameter:
        dummyReportListFinal.length > 0 &&
        dummyReportListFinal[0]?.vesselDiameter
          ? dummyReportListFinal[0]?.vesselDiameter
          : 0,
      Vessel_2_Custom_Diameter:
        dummyReportListFinal.length > 1 &&
        dummyReportListFinal[1]?.vesselDiameter
          ? dummyReportListFinal[1]?.vesselDiameter
          : 0,
      Vessel_3_Custom_Diameter:
        dummyReportListFinal.length > 2 &&
        dummyReportListFinal[2]?.vesselDiameter
          ? dummyReportListFinal[2]?.vesselDiameter
          : 0,
      Vessel_4_Custom_Diameter:
        dummyReportListFinal.length > 3 &&
        dummyReportListFinal[3]?.vesselDiameter
          ? dummyReportListFinal[3]?.vesselDiameter
          : 0,
      Vessel_1_Custom_Wall:
        dummyReportListFinal.length > 0 &&
        dummyReportListFinal[0]?.vesselWallThickness
          ? dummyReportListFinal[0]?.vesselWallThickness
          : 0,
      Vessel_2_Custom_Wall:
        dummyReportListFinal.length > 1 &&
        dummyReportListFinal[1]?.vesselWallThickness
          ? dummyReportListFinal[1]?.vesselWallThickness
          : 0,
      Vessel_3_Custom_Wall:
        dummyReportListFinal.length > 2 &&
        dummyReportListFinal[2]?.vesselWallThickness
          ? dummyReportListFinal[2]?.vesselWallThickness
          : 0,
      Vessel_4_Custom_Wall:
        dummyReportListFinal.length > 3 &&
        dummyReportListFinal[3]?.vesselWallThickness
          ? dummyReportListFinal[3]?.vesselWallThickness
          : 0,
      Vessel_1_Custom_Height:
        dummyReportListFinal.length > 0 &&
        dummyReportListFinal[0]?.vesselCylindricalHeight
          ? dummyReportListFinal[0]?.vesselCylindricalHeight
          : 0,
      Vessel_2_Custom_Height:
        dummyReportListFinal.length > 1 &&
        dummyReportListFinal[1]?.vesselCylindricalHeight
          ? dummyReportListFinal[1]?.vesselCylindricalHeight
          : 0,
      Vessel_3_Custom_Height:
        dummyReportListFinal.length > 2 &&
        dummyReportListFinal[2]?.vesselCylindricalHeight
          ? dummyReportListFinal[2]?.vesselCylindricalHeight
          : 0,
      Vessel_4_Custom_Height:
        dummyReportListFinal.length > 3 &&
        dummyReportListFinal[3]?.vesselCylindricalHeight
          ? dummyReportListFinal[3]?.vesselCylindricalReight
          : 0,
      Vessel_1_Comp_1_Custom_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 0 &&
            dummyReportListFinal[0]?.vesselCylindricalHeight
            ? dummyReportListFinal[0]?.vesselCylindricalHeight
            : 0
          : 0,
      Vessel_2_Comp_1_Custom_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 1 &&
            dummyReportListFinal[1]?.vesselCylindricalHeight
            ? dummyReportListFinal[1]?.vesselCylindricalHeight
            : 0
          : 0,
      Vessel_3_Comp_1_Custom_Height: 0,
      Vessel_4_Comp_1_Custom_Height: 0,
      Vessel_1_Comp_2_Custom_Height: 0,
      Vessel_2_Comp_2_Custom_Height: 0,
      Vessel_3_Comp_2_Custom_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length2 &&
            dummyReportListFinal[2].vesselCylindricalHeight
            ? dummyReportListFinal[2].vesselCylindricalHeight
            : 0
          : 0,
      Vessel_4_Comp_2_Custom_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length3 &&
            dummyReportListFinal[3].vesselCylindricalHeight
            ? dummyReportListFinal[3].vesselCylindricalHeight
            : 0
          : 0,
      Vessel_1_Custom_Inert_Height:
        dummyReportListFinal.length >= 0 &&
        dummyReportListFinal[0]?.inertBedHeight
          ? dummyReportListFinal[0]?.inertBedHeight
          : 0,
      Vessel_2_Custom_Inert_Height:
        dummyReportListFinal.length >= 1 &&
        dummyReportListFinal[1]?.inertBedHeight
          ? dummyReportListFinal[1]?.inertBedHeight
          : 0,
      Vessel_3_Custom_Inert_Height:
        dummyReportListFinal.length >= 2 &&
        dummyReportListFinal[2]?.inertBedHeight
          ? dummyReportListFinal[2]?.inertBedHeight
          : 0,
      Vessel_4_Custom_Inert_Height:
        dummyReportListFinal.length >= 3 &&
        dummyReportListFinal[3]?.inertBedHeight
          ? dummyReportListFinal[3]?.inertBedHeight
          : 0,
      Vessel_1_Comp_1_Custom_Inert_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 0 &&
            dummyReportListFinal[0].inertBedHeight
            ? dummyReportListFinal[0].inertBedHeight
            : 0
          : 0,
      Vessel_2_Comp_1_Custom_Inert_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 1 &&
            dummyReportListFinal[1].inertBedHeight
            ? dummyReportListFinal[1].inertBedHeight
            : 0
          : 0,
      Vessel_3_Comp_1_Custom_Inert_Height: 0,
      Vessel_4_Comp_1_Custom_Inert_Height: 0,
      Vessel_1_Comp_2_Custom_Inert_Height: 0,
      Vessel_2_Comp_2_Custom_Inert_Height: 0,
      Vessel_3_Comp_2_Custom_Inert_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 2 &&
            dummyReportListFinal[2].inertBedHeight
            ? dummyReportListFinal[2].inertBedHeight
            : 0
          : 0,
      Vessel_4_Comp_2_Custom_Inert_Height:
        anionResin === cationResin
          ? dummyReportListFinal.length > 3 &&
            dummyReportListFinal[3].inertBedHeight
            ? dummyReportListFinal[3].inertBedHeight
            : 0
          : 0,
      Flag_Regenerant_1:
        listRegenConds.length > 0 && listRegenConds[0]?.regenerantID,
      Flag_Regenerant_2:
        listRegenConds.length > 1 && listRegenConds[1]?.regenerantID,
      Regenerant_1_Stock_Conc_Percent: 0, //It will be updated by middleware before sending to Calc-engine
      Regenerant_2_Stock_Conc_Percent: 0, //It will be updated by middleware before sending to Calc-engine
      Regenerant_1_Price_Bulk: 0, //It will be updated by middleware before sending to Calc-engine
      Regenerant_2_Price_Bulk: 0, //It will be updated by middleware before sending to Calc-engine
      Temp_bulk_regenerant: 25, //It is form equpiment Page(Not in december scope)
      RegenProt_1_Temperature: listRegenConds.length > 0 && cationTemp,
      RegenProt_2_Temperature: listRegenConds.length > 1 && anionTemp,
      RegenProt_3_Temperature: 0,
      // RegenProt_1_Steps:
      //   listRegenConds.length > 0 && listRegenConds[0]?.step1_ind === true
      //     ? 1
      //     : 0,
      // RegenProt_2_Steps:
      //   listRegenConds.length > 1 && listRegenConds[1]?.step1_ind === true
      //     ? 1
      //     : 0,
      RegenProt_3_Steps: 0,
      ...cation,
      ...anion,
      RegenProt_3_Conc_Percent_n0: 0.0,
      RegenProt_3_Conc_Percent_n1: 0.0,
      RegenProt_3_Conc_Percent_n2: 0.0,
      RegenProt_3_Conc_Percent_n3: 0.0,
      RegenProt_3_fraction_n1: 0.0,
      RegenProt_3_fraction_n2: 0.0,
      RegenProt_3_fraction_n3: 0.0,
      RegenProt_1_Dose_Target: Number(cationRegenreteDoseVel?.toFixed(2)),
      RegenProt_2_Dose_Target: Number(anionRegenreteDoseVel?.toFixed(2)),
      RegenProt_3_Dose_Target: 0,
      RegenProt_1_Ratio_Target: listProductQualityandregeneration[0]
        ?.regeneratDoseVal2
        ? listProductQualityandregeneration[0].regeneratDoseVal2
        : 0,

      RegenProt_2_Ratio_Target: listProductQualityandregeneration[1]
        ?.regeneratDoseVal2
        ? listProductQualityandregeneration[1].regeneratDoseVal2
        : 0,
      // RegenProt_1_Ratio_Target: 0,
      // RegenProt_2_Ratio_Target: 0,
      RegenProt_3_Ratio_Target: 0,
      RegenProt_1_Manual_Overrun_Factor:
        listProductQualityandregeneration[0]?.regenerantDoseVal2,
      RegenProt_2_Manual_Overrun_Factor:
        listProductQualityandregeneration[1]?.regenerantDoseVal2,
      // RegenProt_1_Manual_Overrun_Factor: 0,
      // RegenProt_2_Manual_Overrun_Factor: 0,
      RegenProt_3_Manual_Overrun_Factor: 0,
      Flag_RegenProt_1_BW_Source:
        listRegenConds.length > 0 && listRegenConds[0]?.backwash !== null
          ? listRegenConds[0]?.backwash
          : 0,
      Flag_RegenProt_2_BW_Source:
        listRegenConds.length > 1 && listRegenConds[1]?.backwash !== null
          ? listRegenConds[1]?.backwash
          : 0,
      Flag_RegenProt_3_BW_Source: 0,
      Flag_RegenProt_1_Service_Source:
        listRegenConds.length > 0 &&
        listRegenConds[0]?.serviceWater !== null
          ? listRegenConds[0]?.serviceWater
          : 0,
      Flag_RegenProt_2_Service_Source:
        listRegenConds.length > 1 &&
        listRegenConds[1]?.serviceWater !== null
          ? listRegenConds[1]?.serviceWater
          : 0,
      Flag_RegenProt_3_Service_Source: 0,
      RegenProt_1_BW_interval:
        listAdvRegen.length > 0 && listAdvRegen[0]?.bwFrequency,
      RegenProt_2_BW_interval:
        listAdvRegen.length > 1 && listAdvRegen[1]?.bwFrequency,
      RegenProt_3_BW_interval: 0,
      RegenProt_1_BW_expansion:
        listAdvRegen.length > 0 && listAdvRegen[0]?.bwExpansion,
      RegenProt_2_BW_expansion:
        listAdvRegen.length > 1 && listAdvRegen[1]?.bwExpansion,
      RegenProt_3_BW_expansion: 0,
      RegenProt_1_BW_duration:
        listAdvRegen.length > 0 && listAdvRegen[0]?.bwDuration !== 0
          ? parseFloat(listAdvRegen[0]?.bwDuration / 60)
          : 0,
      RegenProt_2_BW_duration:
        listAdvRegen.length > 1 && listAdvRegen[1]?.bwDuration !== 0
          ? parseFloat(listAdvRegen[1]?.bwDuration / 60)
          : 0,
      RegenProt_3_BW_duration: 0,
      RegenProt_1_Compact_t:
        listAdvRegen.length > 0 && listAdvRegen[0]?.compactionDuration !== 0
          ? parseFloat(listAdvRegen[0]?.compactionDuration / 60)
          : 0,
      RegenProt_2_Compact_t:
        listAdvRegen.length > 1 && listAdvRegen[1]?.compactionDuration !== 0
          ? parseFloat(listAdvRegen[1]?.compactionDuration / 60)
          : 0,
      RegenProt_3_Compact_t: 0,
      RegenProt_1_Regeneration_SV:
        listAdvRegen.length > 0 && cationregenVel,
      RegenProt_2_Regeneration_SV:
        listAdvRegen.length > 1 && anionregeneVel,
      RegenProt_3_Regeneration_SV: 0,
      RegenProt_1_Water_Block_factor:
        listAdvRegen.length > 0 &&
        listAdvRegen[0]?.regenerationFactor / 100,
      RegenProt_2_Water_Block_factor:
        listAdvRegen.length > 1 &&
        listAdvRegen[1]?.regenerationFactor / 100,
      // RegenProt_1_Water_Block_factor: 1,
      // RegenProt_2_Water_Block_factor: 1,
      RegenProt_3_Water_Block_factor: 0,
      Flag_RegenProt_1_Displacement_Rinse:
        listAdvRegen.length > 0 && listAdvRegen[0]?.displacementFlow,
      Flag_RegenProt_2_Displacement_Rinse:
        listAdvRegen.length > 1 && listAdvRegen[1]?.displacementFlow,
      Flag_RegenProt_3_Displacement_Rinse: 0,
      RegenProt_1_Displ_Rinse_BV:
        listAdvRegen.length > 0 && listAdvRegen[0]?.displacementVolume,
      RegenProt_2_Displ_Rinse_BV:
        listAdvRegen.length > 1 && listAdvRegen[1]?.displacementVolume,
      RegenProt_3_Displ_Rinse_BV: 0,
      Flag_RegenProt_1_Rinse_Recycle:
        listAdvRegen.length > 0 && listAdvRegen[0]?.fatRinseRecycle - 1,
      Flag_RegenProt_2_Rinse_Recycle:
        listAdvRegen.length > 1 && listAdvRegen[1]?.fatRinseRecycle - 1,
      // Flag_RegenProt_1_Rinse_Recycle: 0,
      // Flag_RegenProt_2_Rinse_Recycle: 0,
      // Flag_RegenProt_3_Rinse_Recycle: 0,
      RegenProt_1_Fast_Rinse_BV:
        listAdvRegen.length > 0 && listAdvRegen[0]?.fatRinseVolume,
      RegenProt_2_Fast_Rinse_BV:
        listAdvRegen.length > 1 && listAdvRegen[1]?.fatRinseVolume,
      RegenProt_3_Fast_Rinse_BV: 0,
      RegenProt_1_Settling_t:
        listAdvRegen.length > 0 && listAdvRegen[0]?.settingDuration / 60,
      RegenProt_2_Settling_t:
        listAdvRegen.length > 1 && listAdvRegen[1]?.settingDuration / 60,
      RegenProt_3_Settling_t: 0,
      Typical_Org_Ads_Demin:
        parseFloat(
          listProductQualityandregeneration[1]?.endpointConductivityVal
        ) / 100,
      Typical_Org_Ads_Scav: 0.75, //Not in case of IXD
      PD_Distributors: 0.05, //It is form equpiment Page(Not in december scope)
      PD_Piping: 0.1, //It is form equpiment Page(Not in december scope)
      Product_Pressure: 1.0, //It is form equpiment Page(Not in december scope)
      Crud_Input: 0.01, //It applies only to IXCP. On Condensate Polishing additional parameters. Pop up => CRUD
      Price_Electricity: chemicalConfig.operatingCost?.electricity,
      Price_Raw_Water: chemicalConfig.operatingCost.rawWater,
      Price_Waste_Water: chemicalConfig.operatingCost.wasteWaterDisposal,
      Efficiency_Pump_Feed: pumpCofig.pupmList.find((a) => a.pumpID == 62)
        .pumpEfficiency,
      Efficiency_Motor_Feed: pumpCofig.pupmList.find((a) => a.pumpID == 62)
        .motorEfficiency,
      Efficiency_Pump_BW: pumpCofig.pupmList.find((a) => a.pumpID == 63)
        .pumpEfficiency,
      Efficiency_Motor_BW: pumpCofig.pupmList.find((a) => a.pumpID == 63)
        .motorEfficiency,
      Efficiency_Pump_Regen: pumpCofig.pupmList.find((a) => a.pumpID == 64)
        .pumpEfficiency,
      Efficiency_Motor_Regen: pumpCofig.pupmList.find((a) => a.pumpID == 64)
        .motorEfficiency,
      Efficiency_Compressor: pumpCofig.pupmList.find((a) => a.pumpID == 65)
        .pumpEfficiency,
      Efficiency_Compressor_Motor: pumpCofig.pupmList.find(
        (a) => a.pumpID == 65
      ).motorEfficiency,
      Flow_System_Design: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          feedFlowRate,
          "m³/h",
          unit.selectedUnits[1]
        ).toFixed(3)
      ),

      // RegenProt_1_Ion_Conc_Leakage:
      //   listProductQualityandregeneration[0]?.averageSpeciesVal,
      // RegenProt_2_Ion_Conc_Leakage:
      //   listProductQualityandregeneration[1]?.averageSpeciesVal,
      RegenProt_1_Ion_Conc_Leakage: cationMeqlAvg,
      RegenProt_2_Ion_Conc_Leakage: sio2MeqlAvg,
      RegenProt_3_Ion_Conc_Leakage: 0,
      RegenProt_1_Conductivity_Leakage: Number(
        cationAverageConduc?.toFixed(2)
      ),
      RegenProt_2_Conductivity_Leakage: Number(
        anionAverageConduc?.toFixed(2)
      ),
      RegenProt_3_Conductivity_Leakage: 0,
      Organic_Adsorption_Efficiency: 0,
      Organic_Adsorption_Efficiency_2: 0,
      Organic_Adsorption_Efficiency_3: 0,
      // RegenProt_1_Ion_Conc_Endpoint:
      //   listProductQualityandregeneration[0]?.endpoingSpeciesVal,
      // RegenProt_2_Ion_Conc_Endpoint:
      //   listProductQualityandregeneration[1]?.endpoingSpeciesVal,
      RegenProt_1_Ion_Conc_Endpoint: cationMeqlEnd,
      RegenProt_2_Ion_Conc_Endpoint: sio2MeqlEnd,
      RegenProt_3_Ion_Conc_Endpoint: 0,
      RegenProt_1_Conductivity_Endpoint: Number(
        cationendpointConduc?.toFixed(2)
      ),
      RegenProt_2_Conductivity_Endpoint: 0,
      RegenProt_3_Conductivity_Endpoint: 0,
      Diaminoethane_dose: 0, //It applies only to IXCP
      Amino_2_methyl_1_propanol_dose: 0, //It applies only to IXCP
      Methoxypropylamine_dose: 0, //It applies only to IXCP
      Aminopentanol_dose: 0, //It applies only to IXCP
      Cyclohexylamine_dose: 0, //It applies only to IXCP
      Ethanolamine_dose: 0, //It applies only to IXCP
      Morpholine_dose: 0, //It applies only to IXCP
      Hydrazine_dose: 0, //It applies only to IXCP
      Flow_net_product:
        selectedEndNode == "startNode"
          ? 0
          : Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                productFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(3)
            ),
      //if product water than product water input needs to be send
      TSS_IX_Input: feedDataJson?.tss, //feed water TSS iif IX is first unit operation.  If IX follows UF, RO, or another IX process, IX feed TSS = 0
      flag_Vessel_Dimension_Units: selectedUnitbyUser,
      Flag_RegenProt_1_Fast_Rinse_Source: fastRinseWater[0],
      Flag_RegenProt_2_Fast_Rinse_Source: fastRinseWater[1],
      Flag_RegenProt_3_Fast_Rinse_Source: 0,
    }:reportData.ixReport.maiN_INPUT;
    const FEED_WATER= tabAvailable.FeedSetup?{
      designTemp: StreamStoreData?.tempDesign,
      methodname: "normal",
      TOC_System_Feed: parseFloat(feedDataJson?.toc),
      ph: parseFloat(feedDataJson?.pH),
      TotalDissolvedSolutes: parseFloat(
        feedDataJson?.totalDissolvedSolutes
      ),
      ChargeBalance: parseFloat(feedDataJson?.chargeBalance),
      EstimatedConductivity: parseFloat(
        feedDataJson?.estimatedConductivity
      ),
      Degas: 0.0,
      percentage_of_initial_total_CO2_remaining: parseFloat(
        feedDataJson?.percentContribution
      ),
      Equilibrate_with: 0.0,
      Adjustment_Type: 0.0,
      Add_Reagent: 0.0,
      Total_CO2: 0.0,
      cations: feedDataJson?.cations,
      anions: feedDataJson?.anions,
      neutrals: feedDataJson?.neutral,
    }:reportData.ixReport.feeD_WATER;
    const Myobject = {
      userID: (tabAvailable.IXD||tabAvailable.FeedSetup)?userID:reportData.userID,
      projectID: (tabAvailable.IXD||tabAvailable.FeedSetup)?projectID:reportData.projectID,
      caseID: (tabAvailable.IXD||tabAvailable.FeedSetup)?caseID:reportData.caseID,
      treatmentObjID: (tabAvailable.IXD||tabAvailable.FeedSetup)?treatmentObjID:reportData.treatmentObjID,
      validDesignID: tabAvailable.IXD?validdesignID:reportData.validDesignID,
      resinID1: tabAvailable.IXD?ixStoreResin1[0]?.ixResinID1:reportData.resinID1,
      resinID2: tabAvailable.IXD?ixStoreResin1[0]?.ixResinID2:reportData.resinID2,
      resinID3: tabAvailable.IXD?ixStoreResin2[0]?.ixResinID1:reportData.resinID3,
      resinID4: tabAvailable.IXD?ixStoreResin2[0]?.ixResinID2:reportData.resinID4,
      inertID1: tabAvailable.IXD?ixStoreResin1[0]?.inert:reportData.inertID1,
      inertID2: tabAvailable.IXD?ixStoreResin2[0]?.inert:reportData.inertID2,
      inertID3: 0,
      chemID_Regenerant1:
      tabAvailable.IXD?(listRegenConds.length > 0 && listRegenConds[0]?.chemicalID):reportData.chemID_Regenerant1,
      chemID_Regenerant2:
      tabAvailable.IXD?(listRegenConds.length > 1 && listRegenConds[1]?.chemicalID):reportData.chemID_Regenerant2,
      flag_waterblock: tabAvailable.IXD?water:reportData.flag_waterblock,
      ixReport: {
        MAIN_INPUT:MAIN_INPUT,
        FEED_WATER:FEED_WATER,
        //feedwater true- const feedwater : slice feedwater
      },
    };
    console.log("PK before method");
    const MethodName = { Method: "ix/api/v1/DetailedReport" };
    const IxdDetailReport = { ...MethodName, ...Myobject };
    console.log("PK IxdDetailReport",IxdDetailReport);
    let postResponse = await POSTIXDJsonData(IxdDetailReport);
    console.log("PK postResponse",postResponse);
    if (postResponse.data) {
      dispatch(setReportData(postResponse.data));
      dispatch(setErrorReport(false));
      // console.log(postResponse.data, "postResponseSave");
    } else {
      // console.log(postResponse.error, "postResponse");
      dispatch(setErrorReport(true));
      dispatch(
        setErrorMessage({
          ...errorMsgCode,
          code: postResponse?.error?.status,
          message: postResponse?.error?.data?.responseMessage,
        })
      );
    }
  };

  //----------------------------**IXD Report Section END**----------------------------------------

  //----------------------------**UF Report Section Start**----------------------------------------


  const modifiedData = (array) => {
    let tempData = [];
    array.map((item) => {
      let data = [];
      item.unitKey.map((x) => {
        data.push({
          uomId: x.uomId,
          uomTypeID: item.uomTypeID,
          uomTypeName: item.uomTypeName,
          uomName: x.uomName,
          uomsystemId: x.uomsystemId,
          uomsystemName: x.uomsystemName,
          isSelected: x.isSelected,
        });
      });
      tempData = [...tempData, ...data];
    });
    return tempData;
  };

  const validData = (data, label, flag) => {
    const den = flag ? "0" : 0;
    return data ? data[label] : den;
  };
  const calculateData = () => {
    const getCalculateData = () => {
      if (ufData.uFBWProtocolID == 1) {
        return (
          Number(ufData.drain_backWash) / 60 +
          Number(ufData.backWash2_backWash) / 60 +
          Number(ufData.backWash1_backWash) / 60 +
          Number(ufData.forwardFlush_backWash) / 60 +
          (4 * Number(ufData.typicalWaitDuration_Dupont)) / 60 +
          (3 * Number(ufData.valveOpenCloseDuration)) / 60 +
          Number(ufData.typicalPumpRamp_Dupont) / 60
        );
      } else if (ufData.uFBWProtocolID == 2) {
        return (
          Number(ufData.backwash_AirScour) / 60 +
          Number(ufData.drain_backWash) / 60 +
          Number(ufData.backWash2_backWash) / 60 +
          Number(ufData.backWash1_backWash) / 60 +
          Number(ufData.forwardFlush_backWash) / 60 +
          (4 * Number(ufData.typicalWaitDuration_Dupont)) / 60 +
          (6 * Number(ufData.valveOpenCloseDuration)) / 60 +
          Number(ufData.typicalPumpRamp_Dupont) / 60
        );
      } else {
        return 0;
      }
    };

    let t_BW_module_cycle = getCalculateData();

    let tempFlag_cycle_input = 0;
    let t_normal_module_cycle = Number(
      Number(ufData.backwash_design) +
        (tempFlag_cycle_input == 0 ? t_BW_module_cycle : 0)
    );
    //-------------------------------------------------------
    //-------------------------------------------------------

    let tempN_F_per_CIP_raw =
      ufData.cIP > 0
        ? (Number(ufData.cIP) * 60 * 24) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_mCIP_raw = 1000000;
    let tempN_F_per_CEB3_raw =
      ufData.disinfectionCEB > 0
        ? Number(ufData.disinfectionCEB * 60) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_CEB2_raw =
      ufData.alkaliOxidantCEB > 0
        ? Number(ufData.alkaliOxidantCEB * 60) / t_normal_module_cycle
        : 1000000;
    let tempN_F_per_CEB1_raw =
      ufData.acidCEB > 0
        ? Number(ufData.acidCEB * 60) / t_normal_module_cycle
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
      ufData.cIP > 0 ? tempN_F_per_CIP_raw / N_F_per_clean_min : 0;
    let N_F_per_mCIP_ratio = 0;
    let N_F_per_CEB3_ratio =
      ufData.disinfectionCEB > 0 ? tempN_F_per_CEB3_raw / N_F_per_clean_min : 0;
    let N_F_per_CEB2_ratio =
      ufData.alkaliOxidantCEB > 0
        ? tempN_F_per_CEB2_raw / N_F_per_clean_min
        : 0;
    let N_F_per_CEB1_ratio =
      ufData.acidCEB > 0 ? tempN_F_per_CEB1_raw / N_F_per_clean_min : 0;

    return {
      N_BW_per_AS: parseInt(
        ufData.backwash_design / ufData.backwash_design + 0.5
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
      if (ufData.mineralValue_CIP == 0 && ufData.organicValue_CIP == 0) {
        return 0;
      } else if (ufData.mineralValue_CIP > 0 && ufData.organicValue_CIP == 0) {
        return 1;
      } else if (ufData.mineralValue_CIP == 0 && ufData.organicValue_CIP > 0) {
        return 1;
      } else if (ufData.mineralValue_CIP > 0 && ufData.organicValue_CIP > 0) {
        if (ufData.mineralEnabled_Ind_CIP) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    };

    const getSecondData = () => {
      if (ufData.alkaliValue_CIP == 0 && ufData.oxidantValue_CIP == 0) {
        return 0;
      } else if (ufData.alkaliValue_CIP > 0 && ufData.oxidantValue_CIP == 0) {
        return 1;
      } else if (ufData.alkaliValue_CIP == 0 && ufData.oxidantValue_CIP > 0) {
        return 1;
      } else if (ufData.alkaliValue_CIP > 0 && ufData.oxidantValue_CIP > 0) {
        if (ufData.alkaliEnabled_Ind_CIP) {
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
  const SaveUFJSONData = async () => {

    console.log("techNolist1",DefaultUFstroe);
    let activeUFModule = getModuleDetails(ufData.uFModuleID);
    const Myobject = {
      userID: ufData.userID,
      projectID: ufData.projectID,
      caseID: ProjectInfoStore?.caseId,
      treatmentObjID: 1,
      flux_Filter_actual: "0",
      ufReport: {
        method: "default",
        exportReport: 0,
        reportType: 3,
        WaterTypeID: StreamStoreData?.waterTypeID,
        WaterSubTypeID: StreamStoreData?.waterSubTypeID,
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
            )
          : Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                productFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ),
        Flag_Design_Flow: selectedEndNode == "startNode" ? 0 : 2,
        // Flag_Design_Flow:2,
        Guideline_number: StreamStoreData?.waterSubTypeID.toString(),
        Temp_min: StreamStoreData?.tempMin,
        Temp_design: StreamStoreData?.tempDesign,
        Temp_max: StreamStoreData?.tempMax,
        Recovery_Pretreat: ufData.strainerRecovery / 100,
        Strainer_Size: ufData.strainerSize,
        Recovery_RO: "0",
        Feed_acid_name: "0",
        Feed_acid_conc: "0",
        Feed_acid_pH: feedDataJson?.pH.toString(),
        Feed_coag_name: "0",
        Feed_coag_conc: "0",
        Feed_ox_name: "0",
        Feed_ox_conc: "0",
        N_Part_number: activeUFModule.moduleName,
        N_Part_number_long: activeUFModule.newModuleLongName,
        Company: "DuPont",
        Drinking_water_part_names: activeUFModule.drinkingWaterInd
          .toString()
          .toUpperCase(),
        // Drinking_water_part_names: "False",
        IntegraPac: activeUFModule.integraPacInd.toString().toUpperCase(),
        T_Rack: activeUFModule.tRack.toString().toUpperCase(),
        Mem_Rack: activeUFModule.memRack.toString().toUpperCase(),
        IntegraFlo: activeUFModule.integraFlowInd.toString().toUpperCase(),
        Flux_Filter_target: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.filtrateFlux,
            "LMH",
            unit.selectedUnits[4]
          ).toFixed(2)
        ),
        Flux_BW: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.backwashFlux,
            "LMH",
            unit.selectedUnits[4]
          ).toFixed(2)
        ),
        Flux_CEB: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.cEBFlux,
            "LMH",
            unit.selectedUnits[4]
          ).toFixed(2)
        ),
        Flow_FF: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.forwardFlushFlow,
            "m³/h",
            unit.selectedUnits[1]
          ).toFixed(2)
        ),
        Flow_FF2: ufData.flow_FF2,
        Flow_FF3: ufData.flow_FF3,
        Flow_FF4: ufData.flow_FF4,
        Flow_AS: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.airFlow,
            "Nm³/h",
            unit.selectedUnits[18]
          ).toFixed(2)
        ),
        Flow_AS2: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.aerationAirFlow,
            "Nm³/h",
            unit.selectedUnits[18]
          ).toFixed(2)
        ),
        Flow_mCIP_recycle: "0",
        Flow_CIP_recycle: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.recycleFlowRate,
            "m³/h",
            unit.selectedUnits[1]
          ).toFixed(2)
        ),
        Flag_cycle_input: "0",
        t_filtration_cycle: ufData.backwash_design,
        t_interval_AS: ufData.backwash_design,
        t_interval_CEB_acid: ufData.acidCEB,
        t_interval_CEB_caustic: ufData.alkaliOxidantCEB,
        t_interval_CEB_Oxidant: "0",
        t_interval_mCIP: "0",
        t_interval_CIP: ufData.cIP,
        t_MIT_module_day: ufData.offlinetimepertrain,
        TMP_slope_BW: ufData.backwash_Filtration / 1000, //as per excel provided
        TMP_slope_CEB1: ufData.acidCEB_Filtration / 1000, //as per excel provided
        TMP_slope_CEB2: ufData.alkaliCEB_Filtration / 1000, //as per excel provided
        TMP_slope_mCIP: "0", //as per excel provided
        TMP_slope_CIP: ufData.cIP_Filtration / 1000, //as per excel provided
        Standby_Option:
          ufData.uFBWCEBStandbyOptionID == 1
            ? "Constant operating flux, variable system output"
            : "Constant system output, variable operating flux",
        Flag_CIP_standby: ufData.uFBWCEBStandbyOptionID == 1 ? 0 : 2,
        Flag_Storage_Tank: ufData.uFBWCEBStandbyOptionID == 1 ? 1 : 0,
        N_Trains_online: ufData.onlineTrains,
        N_Trains_standby: ufData.redundantStandbyTrains,
        N_Trains_Redundant: ufData.redundantTrains,
        N_Modules_per_Train: ufData.modulesPerTrain,
        // N_Modules_per_Train: 34,
        IP_Skids_train: activeUFModule.integraPacInd ? ufData.skidsPerTrain : 1,
        IP_Mod_skid: activeUFModule.integraPacInd
          ? ufData.modulesPerSkid
          : ufData.modulesPerTrain,
        Flag_BW: ufData.uFBWWaterTypeID - 1,
        Flag_FF: ufData.uFBWFlushWaterTypeID - 1,
        Flag_BW_Protocol: ufData.uFBWProtocolID == 1 ? 2 : 0,
        Temp_BW: StreamStoreData?.tempDesign,
        t_AS: ufData.backwash_AirScour / 60,
        t_Drain: ufData.drain_backWash / 60,
        t_BW1: ufData.backWash1_backWash / 60,
        t_BW2: ufData.backWash2_backWash / 60,
        t_FF: ufData.forwardFlush_backWash / 60,
        t_LF: ufData.lF / 60,
        t_FTL: ufData.t_FTL / 60,
        BW_ox_name: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantID
          ),
          "symbol",
          true
        ), //////-----------------
        BW_ox_conc: ufData.oxidantDosage,
        Temp_CEB: StreamStoreData?.tempDesign,
        Flag_CEB: ufData.uFCEBWaterTypeID,
        t_AS_CEB: ufData.ceb_AirScour / 60,
        t_Drain_CEB: ufData.drain / 60,
        t_BW1_CEB: ufData.backWash1_CEB / 60,
        t_BW2_CEB: ufData.backWash2_CEB / 60,
        t_FF_CEB: ufData.forwardFlush / 60,
        t_CEB_soak: ufData.chemicalSoakingDuration_CEB,
        t_BW1_CEBrinse: ufData.t_CEB_Rinse12 / 60,
        t_BW2_CEBrinse: ufData.t_CEB_Rinse2 / 60,
        N_CEB_RScycles: "1",
        CEB1_acid_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.mineralChemId
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CEB1_acid_conc: ufData.mineralValueInPh_Ind ? 0 : ufData.mineralValue,
        CEB1_acid_pH: ufData.mineralValueInPh_Ind ? ufData.mineralValue : 0,
        CEB1_org_acid_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.organicChemId
            ),
            "chemicalName",
            true
          )
        ), //////-----------------
        CEB1_org_acid_conc: ufData.organicValue,
        Flag_CEB1_Chem: "false",
        CEB2_base_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.alkaliChemId
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CEB2_base_conc: ufData.alkaliValueInPh_Ind ? 0 : ufData.alkaliValue,
        CEB2_base_pH: ufData.alkaliValueInPh_Ind ? ufData.alkaliValue : 0,
        CEB2_ox_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidantChemId
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CEB2_ox_conc: ufData.oxidantValue,
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
        Temp_CIP: ufData.recycleTemperature,
        N_BW_CIP: ufData.bWStepInCIP,
        N_BW_Rinse_CIP: ufData.rinseBWCycle,
        Flag_CIP: ufData.uFCIPWaterTypeID,
        t_CIP_heat: ufData.heatingStepDuration,
        t_CIP_recycle: ufData.recycleDuration,
        t_CIP_soak: ufData.chemicalSoakingDuration_CIP,
        N_CIP_RScycles: ufData.cIPRinseSoakCycle,
        CIP_acid_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.mineralChemId_CIP
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CIP_acid_conc: ufData.mineralValueInPh_Ind_CIP
          ? 0
          : ufData.mineralValue_CIP,
        CIP_acid_pH: ufData.mineralValueInPh_Ind_CIP
          ? ufData.mineralValue_CIP
          : 0,
        CIP_org_acid_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.organicChemId_CIP
            ),
            "chemicalName",
            true
          )
        ), //////-----------------
        CIP_org_acid_conc: ufData.organicValue_CIP,
        CIP_N_Chem1_Flag: "false",
        CIP_base_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.alkaliChemId_CIP
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CIP_base_conc: ufData.alkaliValueInPh_Ind_CIP
          ? 0
          : ufData.alkaliValue_CIP,
        CIP_base_pH: ufData.alkaliValueInPh_Ind_CIP
          ? ufData.alkaliValue_CIP
          : 0,
        CIP_ox_name: changeChemicalFormat(
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidantChemId_CIP
            ),
            "symbol",
            true
          )
        ), //////-----------------
        CIP_ox_conc: ufData.oxidantValue_CIP,
        CIP_SLS_name: "0",
        CIP_SLS_conc: "0",
        CIP_N_Chem2_Flag: "false",
        AdditionalSettingsScreen: "false",
        P_air_max: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.maxAirScourPressure,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        P_ADBW_max: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.maxAirProcPressure,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        P_Filtrate: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.filteratePressure,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        Delta_P_piping_filtration: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.nonIntegraPacTrainPresDrop,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        Delta_P_strainer_filtration: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.integraPacFiltrationPreDrop,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        Delta_P_piping_BW: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.backwashPipingPreDrop,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        Delta_P_piping_mCIP: "0",
        Delta_P_piping_CIP: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.cIPPipingPreDrop,
            "bar",
            unit.selectedUnits[3]
          ).toFixed(2)
        ),
        StorageTankParameters: "0",
        f_Chem_storage_days: ufData.chemicalStorageTime,
        f_BW_tank_feed: ufData.bWTankRefillRate,
        f_Filtrate_tank_safety_margin: ufData.filterateTank / 100,
        f_BW_tank_safety_margin: ufData.bWTank / 100,
        f_mCIP_tank: "0",
        f_CIP_tank: ufData.cIPTank / 100,
        f_ADBW: ufData?.aDBWDisplacement / 100,
        f_FTL: ufData?.fTLDisplacement,
        N_valves_per_skid: ufData.valvesPerTrain,
        t_wait: ufData.typicalWaitDuration_Dupont / 60,
        t_valve: ufData.valveOpenCloseDuration / 60,
        t_ramp: ufData.typicalPumpRamp_Dupont,
        Power_PLC: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.pLCPowerReqPertrain,
            "kW",
            unit.selectedUnits[9]
          ).toFixed(2)
        ),
        Power_valve: Number(
          GlobalUnitConversion(
            GlobalUnitConversionStore,
            ufData.volvePowerReqPerTrain,
            "kW",
            unit.selectedUnits[9]
          ).toFixed(2)
        ),
        ProjectLevelUserEntries: "0",
        Eff_motor_feed: pumpCofig.pupmList.find((a) => a.pumpID == 53)
          .motorEfficiency,
        Eff_motor_BW: pumpCofig.pupmList.find((a) => a.pumpID == 54)
          .motorEfficiency,
        Eff_motor_mCIP: "0",
        Eff_motor_CIP: pumpCofig.pupmList.find((a) => a.pumpID == 55)
          .motorEfficiency,
        Eff_motor_metering: pumpCofig.pupmList.find((a) => a.pumpID == 57)
          .motorEfficiency,
        Eff_motor_compressor: pumpCofig.pupmList.find((a) => a.pumpID == 56)
          .motorEfficiency,
        Eff_pump_feed: pumpCofig.pupmList.find((a) => a.pumpID == 53)
          .pumpEfficiency,
        Eff_pump_BW: pumpCofig.pupmList.find((a) => a.pumpID == 54)
          .pumpEfficiency,
        Eff_pump_mCIP: "0",
        Eff_pump_CIP: pumpCofig.pupmList.find((a) => a.pumpID == 55)
          .pumpEfficiency,
        Eff_pump_metering: pumpCofig.pupmList.find((a) => a.pumpID == 57)
          .pumpEfficiency,
        Eff_compressor: pumpCofig.pupmList.find((a) => a.pumpID == 56)
          .pumpEfficiency,
        OperatingCostPrices: "0",
        Price_Elec: chemicalConfig.operatingCost.electricity,
        Price_Water: chemicalConfig.operatingCost.rawWater,
        Price_Waste: chemicalConfig.operatingCost.wasteWaterDisposal,
        // t_normal_module_cycle: "29.99999967",
        // N_BW_per_AS: Number(
        //   ufData.backwash_design / ufData.backwash_design + 0.5
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
        N_Chem_CIP: calculateCIP(),
        N_Chem_mCIP: "0",
        ModuleProperties: "0",
        Area_Module: activeUFModule.moduleArea,
        Vol_module: activeUFModule.v,
        Length_module: activeUFModule.l,
        Length_fibers: activeUFModule.fiberLength,
        N_capillary: activeUFModule.bores,
        N_Capillary_Ends: activeUFModule.ends,
        D_ID: activeUFModule.dId,
        D_OD: activeUFModule.dOd,
        Av: activeUFModule.av,
        P0: activeUFModule.p0,
        S0: activeUFModule.s0,
        S10: activeUFModule.s10,
        S20: activeUFModule.s20,
        S30: activeUFModule.s30,
        S40: activeUFModule.s40,
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
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidantID
            ),
            "bulkConcentration",
            false
          ) / 100,
        BW_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantID
          ),
          "bulkDensity",
          false
        ),
        BW_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantID
          ),
          "bulkPrice",
          false
        ),
        CEB1_acid_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.mineralChemId
            ),
            "bulkConcentration",
            false
          ) / 100,
        CEB1_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.mineralChemId
          ),
          "bulkDensity",
          false
        ),
        CEB1_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.mineralChemId
          ),
          "bulkPrice",
          false
        ),
        CEB1_org_acid_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.organicChemId
            ),
            "bulkConcentration"
          ) / 100,
        CEB1_org_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.organicChemId
          ),
          "bulkDensity",
          false
        ),
        CEB1_org_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.organicChemId
          ),
          "bulkPrice",
          false
        ),
        CEB2_base_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.alkaliChemId
            ),
            "bulkConcentration",
            false
          ) / 100,
        CEB2_base_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.alkaliChemId
          ),
          "bulkDensity",
          false
        ),
        CEB2_base_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.alkaliChemId
          ),
          "bulkPrice",
          false
        ),
        CEB2_ox_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidantChemId
            ),
            "bulkConcentration",
            false
          ) / 100,
        CEB2_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantChemId
          ),
          "bulkDensity",
          false
        ),
        CEB2_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantChemId
          ),
          "bulkPrice",
          false
        ),
        CEB3_ox_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.disOxidantChemId
            ),
            "bulkConcentration",
            false
          ) / 100,
        CEB3_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.disOxidantChemId
          ),
          "bulkDensity",
          false
        ),
        CEB3_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.disOxidantChemId
          ),
          "bulkPrice",
          false
        ),
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
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.mineralChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100,
        CIP_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.mineralChemId_CIP
          ),
          "bulkDensity",
          false
        ),
        CIP_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.mineralChemId_CIP
          ),
          "bulkPrice",
          false
        ),
        CIP_org_acid_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.organicChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100,
        CIP_org_acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.organicChemId_CIP
          ),
          "bulkDensity",
          false
        ),
        CIP_org_acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.organicChemId_CIP
          ),
          "bulkPrice",
          false
        ),
        CIP_base_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.alkaliChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100,
        CIP_base_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.alkaliChemId_CIP
          ),
          "bulkDensity",
          false
        ),
        CIP_base_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.alkaliChemId_CIP
          ),
          "bulkPrice",
          false
        ),
        CIP_ox_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidantChemId_CIP
            ),
            "bulkConcentration",
            false
          ) / 100,
        CIP_ox_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantChemId_CIP
          ),
          "bulkDensity",
          false
        ),
        CIP_ox_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidantChemId_CIP
          ),
          "bulkPrice",
          false
        ),
        CIP_SLS_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.iD == ufData.oxidant2ChemId
            ),
            "bulkConcentration",
            false
          ) / 100,
        CIP_SLS_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidant2ChemId
          ),
          "bulkDensity",
          false
        ),
        CIP_SLS_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.iD == ufData.oxidant2ChemId
          ),
          "bulkPrice",
          false
        ),
        Citric_Acid_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "Citric Acid(100)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        FeCl3_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "FeCl₃(100)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        H2SO4_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "H₂SO₄(98)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        HCl_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "HCl (32)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        NaOCl_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "NaOCl(12)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        NaOH_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "NaOH (50)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        Oxalic_Acid_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "Oxalic Acid(100)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        PACl_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "PACl(5)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        SLS_bulk_conc:
          validData(
            chemicalConfig.chemicalList.find(
              (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
            ),
            "bulkConcentration",
            false
          ) / 100,
        Citric_Acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Citric Acid(100)"
          ),
          "bulkDensity",
          false
        ),
        FeCl3_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "FeCl₃(100)"
          ),
          "bulkDensity",
          false
        ),
        H2SO4_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "H₂SO₄(98)"
          ),
          "bulkDensity",
          false
        ),
        HCl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "HCl (32)"
          ),
          "bulkDensity",
          false
        ),
        NaOCl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOCl(12)"
          ),
          "bulkDensity",
          false
        ),
        NaOH_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOH (50)"
          ),
          "bulkDensity",
          false
        ),
        Oxalic_Acid_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Oxalic Acid(100)"
          ),
          "bulkDensity",
          false
        ),
        PACl_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "PACl(5)"
          ),
          "bulkDensity",
          false
        ),
        SLS_density: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
          ),
          "bulkDensity",
          false
        ),
        Citric_Acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Citric Acid(100)"
          ),
          "bulkPrice",
          false
        ),
        FeCl3_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "FeCl₃(100)"
          ),
          "bulkPrice",
          false
        ),
        H2SO4_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "H₂SO₄(98)"
          ),
          "bulkPrice",
          false
        ),
        HCl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "HCl (32)"
          ),
          "bulkPrice",
          false
        ),
        NaOCl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOCl(12)"
          ),
          "bulkPrice",
          false
        ),
        NaOH_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "NaOH (50)"
          ),
          "bulkPrice",
          false
        ),
        Oxalic_Acid_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "Oxalic Acid(100)"
          ),
          "bulkPrice",
          false
        ),
        PACl_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "PACl(5)"
          ),
          "bulkPrice",
          false
        ),
        SLS_price: validData(
          chemicalConfig.chemicalList.find(
            (item) => item.displayName == "CH3(CH2)11SO4Na (100)"
          ),
          "bulkPrice",
          false
        ),
        feed_water: {
          designTemp: feedDataJson?.tempDesign,
          methodname: "normal",
          // TOC_System_Feed: parseFloat(feedDataJson?.toc),
          ph: parseFloat(feedDataJson?.pH),
          Degas: 0.0,
          percentage_of_initial_total_CO2_remaining: parseFloat(
            feedDataJson?.percentContribution
          ),
          Equilibrate_with: 0.0,
          Adjustment_Type: 0.0,
          Add_Reagent: 0.0,
          Total_CO2: 0.0,
          turbidity: feedDataJson?.turbidity,
          organicToc: feedDataJson?.toc,
          tss: feedDataJson?.tss,
          tds: feedDataJson?.totalDissolvedSolutes,
          cations: feedDataJson?.cations,
          anions: feedDataJson?.anions,
          neutrals: feedDataJson?.neutral,
          LSI_targ: 0,
          SDI_targ: 0,
          ChemicalAdjustment: [
            {
              CaSO4_per: 0,
              BaSO4_per: 0,
              SrSO4_per: 0,
              CaF2_per: 0,
              SiO2_per: 0,
              MgOH2_per: 0,
              LSI: 0,
              SDI: 0,
            },
          ],
        },
      },
      lstdefaultProjectUnits: modifiedData(unitConfig.defaultValues).filter(
        (item) => item.isSelected
      ),
      reportProjectInfoVM: {
        projectNumber: projectInfoVM.projectNumber,
        projectName: projectInfoVM.projectName,
        createDate: projectInfoVM.createdDate,
        lastModified: projectInfoVM.updatedDate,
        caseName: feedWaterData.projectCaseName,
        preparedBy: projectInfoVM.designer,
        designerCompany: projectInfoVM.designerCompany,
        customer: projectInfoVM.customer,
        countryName: projectInfoVM.customer,
        segmentName: projectInfoVM.marketsegmentName,
        projectNotes: projectInfoVM.projectNotes,
        exchangeRate: currencyConfig.selectedCurrency.currencyValue,
        currencySymbol: currencyConfig.selectedCurrency.currencyUnit,
        appVersion: appInfoVM.appVersion,
      },
      lstAllUOMs: modifiedData(unitConfig.defaultValues),
      lstreportConversionFactors: uomData,
    };
    const MethodName = { Method: "uf/api/v1/UFDetailedReport" };
    const UFDetailReport = { ...MethodName, ...DefaultUFstroe };
    // const UFDetailReport = { ...MethodName, ...Myobject };
    let postResponse = await POSTUFJsonData(UFDetailReport);
    if (postResponse.data) {
      dispatch(setReportData(postResponse.data));
      // console.log(postResponse.data, "postResponseSave");
    }
  };
  //----------------------------**UF Report Section END**----------------------------------------

  //IXD page Validation---------------------------------------------------------------------------
  let cationValues =
    FeedStoreData &&
    FeedStoreData[0]?.cations.filter(
      (item) => item.mgL > 0 || item.mgL > 0 || item.mgL > 0
    );
  let anionValues =
    FeedStoreData &&
    FeedStoreData[0]?.anions.filter(
      (item) => item.mgL > 0 || item.mgL > 0 || item.mgL > 0
    );
  let neutralsValues =
    FeedStoreData &&
    FeedStoreData[0]?.anions.filter(
      (item) => item.mgL > 0 || item.mgL > 0 || item.mgL > 0
    );

  //UF API cals and save----------------------------------------------------------------------------

  useEffect(() => {
    setSelectedIndex("System Design");
    setPanelIndex(0);
    setCurrentPanel("System Design");
    //fetching metadata's for UF Screen.
    callDesignDataAPI();
    callConfigurationDataAPI();
    callBackWashDataAPI();
  }, [projectid]);

  const callDesignDataAPI = () => {
    //Retriving Dropdown data's for UF Technology, UF Module and min and max Range for input fields
    const UFDesignDataURL = `${"uf/api/v1/DesignData"}?userID=${loggedInUserID}&projectID=${projectid}`;
    getDesignData(UFDesignDataURL);
  };
  const callConfigurationDataAPI = () => {
    getConfigurationData(
      `uf/api/v${1}/Configuration?userID=${loggedInUserID}&projectID=${projectid}&languageID=1`
    );
  };
  const callBackWashDataAPI = () => {
    getBackWashData(
      `uf/api/v${1}/UFBackwash?userID=${loggedInUserID}&projectID=${projectid}`
    );
  };
  useEffect(() => {
    if (responseDesignData.isSuccess === true) {
      const {
        listModules,
        lstPUFTechnologyVM,
        listUfField,
        lstUfmoduleFlowVM,
        lstUFModulePressureRatingVM,
        lstUFGuidelineVM,
        lstUFFluxGuideline,
        lstUFTargetDoseGuideline,
      } = responseDesignData.data;
      dispatch(updateUFTechnologyList(lstPUFTechnologyVM));
      dispatch(updateUFModuleList(listModules));
      dispatch(updateUFInputRangeConfig(formatUFFields(listUfField))); //Save Range Values
      dispatch(updatelstUfmoduleFlowVM(lstUfmoduleFlowVM));
      dispatch(updatelstUFModulePressureRatingVM(lstUFModulePressureRatingVM));
      dispatch(
        updateUFInputRangeConfigByWaterType(formatUFFields(lstUFGuidelineVM))
      ); //Save Range Values With WaterType
      dispatch(updateUfDoseGuidline(lstUFTargetDoseGuideline));
      dispatch(updateUFFluxGuideline(lstUFFluxGuideline)); //Save Range Values With WaterType and ModuleType
    }

    if (responseDesignData.isError) {
      throw new MyError(
        "DesignData Api Error",
        responseDesignData.error.status,
        "ApiError"
      );
    }
  }, [responseDesignData]);

  useEffect(() => {
    if (responseConfigData.isSuccess) {
      const { standbyOptions, storageTankOptions } = responseConfigData.data;
      dispatch(updateUFStandByOptions(standbyOptions));
      dispatch(updateUFStorageTankOptions(storageTankOptions));
    }
    if (responseConfigData.isError) {
      throw new MyError(
        responseConfigData.error.message,
        responseConfigData.error.status,
        "ApiError"
      );
    }
  }, [responseConfigData]);

  useEffect(() => {
    if (responseBWData.isSuccess) {
      dispatch(updateBackWashOptions(responseBWData.data));
    }
    if (responseBWData.isError) {
      throw new MyError(
        responseBWData.error.message,
        responseBWData.error.status,
        "ApiError"
      );
    }
  }, [responseBWData]);

  useEffect(() => {
    if (responseUFDetails.isLoading) {
      console.log("Loading");
    } else {
      if (responseUFDetails.isSuccess === true) {
        const obj = { ...UFStore.data };
        let UFInputKeys = Object.keys(responseUFDetails.data);
        UFInputKeys?.map((x) => {
          obj[x] = responseUFDetails.data[x];
          if (obj[x] === null) {
            obj[x] = "0";
          }
        });
        obj.userID = loggedInUserID;
        obj.projectID = projectID;
        obj.caseID = caseID;
        if (responseUFDetails.data.uFBWCEBStandbyOptionID == 0) {
          obj.uFBWCEBStandbyOptionID = 1;
        }
        dispatch(updateUFStore(obj));
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
  const formatUFFields = (ufFieldsArray, field) => {
    const fieldToValueMap = [];
    ufFieldsArray?.map((f) => {
      if (
        f.guideLineAbbr === "Backwash TMP Increase" ||
        f.guideLineAbbr === "Acid CEB TMP Increase" ||
        f.guideLineAbbr === "Alkali CEB TMP increase" ||
        f.guideLineAbbr === "CIP TMP increase" ||
        f.guideLineAbbr === "Mini-CIP"
      ) {
        if (f.uom == "bar/h" || f.uom == "bar/hr") {
          fieldToValueMap.push({
            label: f.guideLineAbbr,
            defaultValue: f.typicalValue * 1000,
            minValue: f.minValue * 1000,
            maxValue: f.maxValue * 1000,
            softLowerLimit: f.softLowerLimit ? f.softLowerLimit : f.minValue,
            softUpperLimit: f.softUpperLimit ? f.softUpperLimit : f.maxValue,
            uom: "mbar/h",
            waterSubType: f.waterSubTypeId != undefined ? f.waterSubTypeId : "",
          });
        } else {
          fieldToValueMap.push({
            label: f.guideLineAbbr,
            defaultValue: f.typicalValue,
            minValue: f.minValue,
            maxValue: f.maxValue,
            softLowerLimit: f.softLowerLimit ? f.softLowerLimit : f.minValue,
            softUpperLimit: f.softUpperLimit ? f.softUpperLimit : f.maxValue,
            uom: f.uom,
            waterSubType: f.waterSubTypeId != undefined ? f.waterSubTypeId : "",
          });
        }
      } else {
        fieldToValueMap.push({
          label: f.guideLineAbbr,
          defaultValue: f.typicalValue,
          minValue: f.minValue,
          maxValue: f.maxValue,
          softLowerLimit: f.softLowerLimit ? f.softLowerLimit : f.minValue,
          softUpperLimit: f.softUpperLimit ? f.softUpperLimit : f.maxValue,
          uom: f.uom,
          waterSubType: f.waterSubTypeId != undefined ? f.waterSubTypeId : "",
        });
      }
    });
    return fieldToValueMap;
  };
  const callUFDetailsAPI = () => {
    //Retriving Values for UF fields
    const UFDetailsURL = `${"uf/api/v1/UFDetails"}?userID=${loggedInUserID}&projectID=${projectID}&caseID=${caseID}&treatmentObjID=${caseTreatmentID}`;
    getUFDetails(UFDetailsURL);
  };

  //CSS functions-----------------------------------------------------------------------------------------
  useEffect(() => {
    const headerChange =
      scrollDirection === "down" && feedCheck === "Feed Setup";
    setHeader(headerChange);
  }, [scrollDirection]);

  // Auto save functionality------------------------------------------------------------------------------
  const updateDataFunction = async () => {
    const response = await updateData({
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
      userID: userId,
      processMap: { nodes: nodes, edges: edges },
      lstTechnologyLists,
    });
  };

  const updateFeedsetDataFunction = (tab, index) => {
    const num =
      FeedStreamData.lstrequestsavefeedwater[0]?.streams[0]?.chargeBalance;
    const decimalStr = num?.toString().split(".");
    var decimalValue = Number(decimalStr[1]?.toString().substring(0, 4));
    let numberValue = Number(decimalStr[0]);
    if (decimalValue == 0 && numberValue == 0) {
      const response = updateFeedsetupData(FeedStreamData);
      if (
        tab.heading === "IXD" &&
        cationValues.length === 0 &&
        anionValues.length === 0 &&
        neutralsValues.length === 0
      ) {
        setIsFeedError(true);
        setSelectedIndex("Feed Setup");
        setPanelIndex(1);
        setCurrentPanel("Feed Setup");
        setScrollCheck(!scrollCheck);
      } else {
        changeTabsControler(tab, index);
      }
    } else {
      setisFeedsetupError(true);
      setSelectedIndex("Feed Setup");
      setPanelIndex(1);
      setCurrentPanel("Feed Setup");
      setScrollCheck(!scrollCheck);
    }
    // const response = updateFeedsetupData(FeedStreamData);
    // changeTabsControler(tab, index);
  };
  const saveUFData = () => {
    const data = {
      userID: ufData.userID,
      projectID: ufData.projectID,
      caseID: ufData.caseID,
      treatmentName: "UF",
      treatmentObjID: caseTreatmentID,
      fromTreatmentObjID: ufData.fromTreatmentObjID,
      treatmentSeqNo: ufData.treatmentSeqNo,
      recoveryTypeID: parseInt(ufData.recoveryTypeID),
      recovery: Number(ufData.recovery),
      feed: Number(ufData.feed),
      automatic: ufData.automatic,
      recoveryRo: Number(ufData.recoveryRo),
      compactionTemperature: Number(ufData.compactionTemperature),
      isCompactionFlux: ufData.isCompactionFlux,
      uFDesignFluxID: parseInt(ufData.uFDesignFluxID),
      caseTreatmentID: parseInt(caseTreatmentID),
      filtrateFlux: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.filtrateFlux,
          "LMH",
          unit.selectedUnits[4]
        ).toFixed(2)
      ),
      backwashFlux: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.backwashFlux,
          "LMH",
          unit.selectedUnits[4]
        ).toFixed(2)
      ),
      cEBFlux: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.cEBFlux,
          "LMH",
          unit.selectedUnits[4]
        ).toFixed(2)
      ),
      forwardFlushFlow: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.forwardFlushFlow,
          "m³/h",
          unit.selectedUnits[1]
        ).toFixed(2)
      ),
      airFlow: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.airFlow,
          "Nm³/h",
          unit.selectedUnits[18]
        ).toFixed(2)
      ),
      aerationAirFlow: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.aerationAirFlow,
          "Nm³/h",
          unit.selectedUnits[18]
        ).toFixed(2)
      ),
      recycleFlowRate: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.recycleFlowRate,
          "m³/h",
          unit.selectedUnits[1]
        ).toFixed(2)
      ),
      recycleFlowRate_MiniCIP: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.recycleFlowRate_MiniCIP,
          "m³/h",
          unit.selectedUnits[1]
        ).toFixed(2)
      ),
      uFModuleID: parseInt(ufData.uFModuleID),
      flow_FF1: Number(ufData.flow_FF1),
      flow_FF2: Number(ufData.flow_FF2),
      flow_FF3: Number(ufData.flow_FF3),
      flow_FF4: Number(ufData.flow_FF4),
      aDBWDisplacement: Number(ufData.aDBWDisplacement),
      fTLDisplacement: Number(ufData.fTLDisplacement),
      typicalWaitDuration_Dupont: Number(ufData.typicalWaitDuration_Dupont),
      typicalPumpRamp_Dupont: Number(ufData.typicalPumpRamp_Dupont),
      typicalWaitDuration_Inge: Number(ufData.typicalWaitDuration_Inge),
      typicalPumpRamp_Inge: Number(ufData.typicalPumpRamp_Inge),
      typicalWaitDuration_Memcor: Number(ufData.typicalWaitDuration_Memcor),
      typicalPumpRamp_Memcor: Number(ufData.typicalPumpRamp_Memcor),
      uFDesignCycleIntervalsID: parseInt(ufData.uFDesignCycleIntervalsID),
      backwash_design: Number(ufData.backwash_design),
      airScour_design: Number(ufData.airScour_design),
      acidCEB: Number(ufData.acidCEB),
      alkaliOxidantCEB: Number(ufData.alkaliOxidantCEB),
      cIP: Number(ufData.cIP),
      miniCIP: Number(ufData.miniCIP),
      disinfectionCEB: Number(ufData.disinfectionCEB),
      t_CEB_Rinse12: Number(ufData.t_CEB_Rinse12),
      t_CEB_Rinse2: Number(ufData.t_CEB_Rinse2),
      uFBWCEBStandbyOptionID: parseInt(ufData.uFBWCEBStandbyOptionID),
      bWPerCEBstandbyTrains: parseInt(ufData.bWPerCEBstandbyTrains),
      uFConfigurationID: parseInt(ufData.uFConfigurationID),
      uFCIPStandbyTrainOptionID: parseInt(ufData.uFCIPStandbyTrainOptionID),
      cIPstandbyTrains: parseInt(ufData.cIPstandbyTrains),
      integraPackDesign_Ind: ufData.integraPackDesign_Ind,
      drinkingWaterInd: ufData.drinkingWaterInd,
      membraneintergrityoption_Ind: ufData.membraneintergrityoption_Ind,
      modulesPerSkid: parseInt(ufData.modulesPerSkid),
      modulesPerTrain: parseInt(ufData.modulesPerTrain),
      offlinetimepertrain: parseInt(ufData.offlinetimepertrain),
      onlineTrains: parseInt(ufData.onlineTrains),
      redundantStandbyTrains: parseInt(ufData.redundantStandbyTrains),
      skids: parseInt(ufData.skids),
      skidsPerTrain: parseInt(ufData.skidsPerTrain),
      uFStorageTankOptionID: parseInt(ufData.uFStorageTankOptionID),
      totalModules: parseInt(ufData.totalModules),
      totalTrains: parseInt(ufData.totalTrains),
      redundantTrains: parseInt(ufData.redundantTrains),
      isBWCEBStandbyTrainsEnabled: ufData.isBWCEBStandbyTrainsEnabled,
      radTR1: ufData.radTR1,
      radTR2: ufData.radTR2,
      radTR3: ufData.radTR3,
      radMR1: ufData.radMR1,
      radMR2: ufData.radMR2,
      radMR3: ufData.radMR3,
      uFFiltrationID: Number(ufData.uFFiltrationID),
      backwash_Filtration: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.backwash_Filtration,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      acidCEB_Filtration: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.acidCEB_Filtration,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      alkaliCEB_Filtration: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.alkaliCEB_Filtration,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      cIP_Filtration: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.cIP_Filtration,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      miniCIP_Filtration: Number(ufData.miniCIP_Filtration),
      strainerRecovery: Number(ufData.strainerRecovery),
      strainerSize: Number(ufData.strainerSize),
      uFTanksID: Number(ufData.uFTanksID),
      chemicalStorageTime: Number(ufData.chemicalStorageTime),
      bWTankRefillRate: Number(ufData.bWTankRefillRate),
      filterateTank: Number(ufData.filterateTank),
      bWTank: Number(ufData.bWTank),
      cIPTank: Number(ufData.cIPTank),
      uFEquipmentPressureID: Number(ufData.uFEquipmentPressureID),
      maxAirScourPressure: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.maxAirScourPressure,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      maxAirProcPressure: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.maxAirProcPressure,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      filteratePressure: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.filteratePressure,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      nonIntegraPacTrainPresDrop: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.nonIntegraPacTrainPresDrop,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      integraPacFiltrationPreDrop: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.integraPacFiltrationPreDrop,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      backwashPipingPreDrop: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.backwashPipingPreDrop,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      cIPPipingPreDrop: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.cIPPipingPreDrop,
          "bar",
          unit.selectedUnits[3]
        ).toFixed(2)
      ),
      uFPowerID: Number(ufData.uFPowerID),
      pLCPowerReqPertrain: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.pLCPowerReqPertrain,
          "kW",
          unit.selectedUnits[9]
        ).toFixed(2)
      ),
      volvePowerReqPerTrain: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.volvePowerReqPerTrain,
          "kW",
          unit.selectedUnits[9]
        ).toFixed(2)
      ),
      uFValvesID: Number(ufData.uFValvesID),
      valvesPerTrain: Number(ufData.valvesPerTrain),
      valveOpenCloseDuration: Number(ufData.valveOpenCloseDuration),
      uFCEBID: Number(ufData.uFCEBID),
      uFCEBWaterTypeID: parseInt(ufData.uFCEBWaterTypeID),
      ceb_AirScour: Number(ufData.ceb_AirScour),
      backWash1_CEB: Number(ufData.backWash1_CEB),
      backWash2_CEB: Number(ufData.backWash2_CEB),
      cEBTemperature: parseInt(ufData.cEBTemperature),
      chemicalSoakingDuration_CEB: parseInt(ufData.chemicalSoakingDuration_CEB),
      drain: Number(ufData.drain),
      forwardFlush: Number(ufData.forwardFlush),
      designTemperature_Ind: ufData.designTemperature_Ind,
      ceb_LSI: Number(ufData.ceb_LSI),
      sameAsBackwash_Ind: ufData.sameAsBackwash_Ind,
      alkaliEnabled_Ind_CEB: ufData.alkaliEnabled_Ind_CEB,
      organicEnabled_Ind_CEB: ufData.organicEnabled_Ind_CEB,
      oxidantEnabled_Ind_CEB: ufData.oxidantEnabled_Ind_CEB,
      mineralEnabled_Ind_CEB: ufData.mineralEnabled_Ind_CEB,
      disOxidantEnabled_Ind_CEB: ufData.disOxidantEnabled_Ind_CEB,
      mineralValue: Number(ufData.mineralValue),
      organicValue: Number(ufData.organicValue),
      oxidantValue: Number(ufData.oxidantValue),
      alkaliValue: Number(ufData.alkaliValue),
      disOxidantValue: Number(ufData.disOxidantValue),
      alkaliChemId: ufData.alkaliChemId.toString(),
      mineralChemId: ufData.mineralChemId.toString(),
      organicChemId: ufData.organicChemId.toString(),
      oxidantChemId: ufData.oxidantChemId.toString(),
      disOxidantChemId: ufData.disOxidantChemId.toString(),
      alkaliValueInPh_Ind: ufData.alkaliValueInPh_Ind,
      mineralValueInPh_Ind: ufData.mineralValueInPh_Ind,
      uFCIPID: Number(ufData.uFCIPID),
      bWStepInCIP: parseInt(ufData.bWStepInCIP),
      chemicalSoakingDuration_CIP: Number(ufData.chemicalSoakingDuration_CIP),
      uFCIPWaterTypeID: parseInt(ufData.uFCIPWaterTypeID),
      heatingStepDuration: Number(ufData.heatingStepDuration),
      cip_LSI: Number(ufData.cip_LSI),
      recycleDuration: Number(ufData.recycleDuration),
      recycleTemperature: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ufData.recycleTemperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      ),
      rinseBWCycle: parseInt(ufData.rinseBWCycle),
      cIPRinseSoakCycle: Number(ufData.cIPRinseSoakCycle),
      alkaliEnabled_Ind_CIP: ufData.alkaliEnabled_Ind_CIP,
      organicEnabled_Ind_CIP: ufData.organicEnabled_Ind_CIP,
      oxidantEnabled_Ind_CIP: ufData.oxidantEnabled_Ind_CIP,
      mineralEnabled_Ind_CIP: ufData.mineralEnabled_Ind_CIP,
      oxidantEnabled2_Ing_CIP: ufData.oxidantEnabled2_Ing_CIP,
      mineralValue_CIP: Number(ufData.mineralValue_CIP),
      organicValue_CIP: Number(ufData.organicValue_CIP),
      oxidantValue_CIP: Number(ufData.oxidantValue_CIP),
      alkaliValue_CIP: Number(ufData.alkaliValue_CIP),
      cIPOxidant2Value: Number(ufData.cIPOxidant2Value),
      alkaliChemId_CIP: ufData.alkaliChemId_CIP.toString(),
      mineralChemId_CIP: ufData.mineralChemId_CIP.toString(),
      organicChemId_CIP: ufData.organicChemId_CIP.toString(),
      oxidantChemId_CIP: ufData.oxidantChemId_CIP.toString(),
      oxidant2ChemId: ufData.oxidant2ChemId.toString(),
      alkaliValueInPh_Ind_CIP: ufData.alkaliValueInPh_Ind_CIP,
      mineralValueInPh_Ind_CIP: ufData.mineralValueInPh_Ind_CIP,
      uFBackWashID: parseInt(ufData.uFBackWashID),
      bWTemperature: Number(ufData.bWTemperature),
      bWDesignTemperature_Ind: ufData.bWDesignTemperature_Ind,
      uFBWWaterTypeID: parseInt(ufData.uFBWWaterTypeID),
      uFBWFlushWaterTypeID: parseInt(ufData.uFBWFlushWaterTypeID),
      uFBWProtocolID: parseInt(ufData.uFBWProtocolID),
      oxidantID: ufData.oxidantID.toString(),
      oxidantDosage: Number(ufData.oxidantDosage),
      backwash_AirScour: Number(ufData.backwash_AirScour),
      backWash1_backWash: Number(ufData.backWash1_backWash),
      backWash2_backWash: Number(ufData.backWash2_backWash),
      drain_backWash: Number(ufData.drain_backWash),
      forwardFlush_backWash: Number(ufData.forwardFlush_backWash),
      lF: Number(ufData.lF),
      t_FTL: Number(ufData.t_FTL),
      t_BWBtnAirScour: parseInt(ufData.t_BWBtnAirScour),
      uFMiniCIPID: Number(ufData.uFMiniCIPID),
      bWStepInMiniCIP: Number(ufData.bWStepInMiniCIP),
      rinseBWCycle_MiniCIP: parseInt(ufData.rinseBWCycle_MiniCIP),
      chemicalSoakingDuration_MiniCIP: Number(
        ufData.chemicalSoakingDuration_MiniCIP
      ),
      uFMiniCIPWaterTypeID: parseInt(ufData.uFMiniCIPWaterTypeID),
      heatingStepDuration_MiniCIP: Number(ufData.heatingStepDuration_MiniCIP),
      lSI_MiniCIP: Number(ufData.lSI_MiniCIP),
      recycleDuration_MiniCIP: Number(ufData.recycleDuration_MiniCIP),
      recycleTemperature_MiniCIP: Number(ufData.recycleTemperature_MiniCIP),
      cIPRinseSoakCycle_MiniCIP: Number(ufData.cIPRinseSoakCycle_MiniCIP),
      alkaliEnabled_Ind_MiniCIP: ufData.alkaliEnabled_Ind_MiniCIP,
      organicEnabled_Ind_MiniCIP: ufData.organicEnabled_Ind_MiniCIP,
      oxidantEnabled_Ind_MiniCIP: ufData.oxidantEnabled_Ind_MiniCIP,
      mineralEnabled_Ind_MiniCIP: ufData.mineralEnabled_Ind_MiniCIP,
      oxidantEnabled2_Ing_MiniCIP: ufData.oxidantEnabled2_Ing_MiniCIP,
      mineralValue_MiniCIP: Number(ufData.mineralValue_MiniCIP),
      organicValue_MiniCIP: Number(ufData.organicValue_MiniCIP),
      oxidantValue_MiniCIP: Number(ufData.oxidantValue_MiniCIP),
      alkaliValue_MiniCIP: Number(ufData.alkaliValue_MiniCIP),
      cIPOxidant2Value_MiniCIP: Number(ufData.cIPOxidant2Value_MiniCIP),
      alkaliChemId_MiniCIP: ufData.alkaliChemId_MiniCIP.toString(),
      mineralChemId_MiniCIP: ufData.mineralChemId_MiniCIP.toString(),
      organicChemId_MiniCIP: ufData.organicChemId_MiniCIP.toString(),
      oxidantChemId_MiniCIP: ufData.oxidantChemId_MiniCIP.toString(),
      oxidant2ChemId_MiniCIP: ufData.oxidant2ChemId_MiniCIP.toString(),
      alkaliValueInPh_Ind_MiniCIP: ufData.alkaliValueInPh_Ind_MiniCIP,
      mineralValueInPh_Ind_MiniCIP: ufData.mineralValueInPh_Ind_MiniCIP,
    };
    if (caseTreatmentID != 0) {
      updateUFData({
        Method:
          caseTreatmentID != 0
            ? "uf/api/v1/SaveUFData"
            : "uf/api/v1/AutoSaveUFData",
        ...data,
        ["drinkingWater_Ind"]: UFStore.isForDrinkingWater,
      });
    } else {
      updateUFData({
        Method: "uf/api/v1/AutoSaveUFData",
        ...data,
        ["drinkingWater_Ind"]: UFStore.isForDrinkingWater,
      });
    }
    dispatch(setUfDataUpdate(false));
  };

  const saveIXDData = async () => {
    var dummyListFinal = [];
    if (
      ixStoreObj.viewReport === "true" &&
      ixStore.evaluteExisting_ind == true
    ) {
      dummyListFinal = ixStoreObj?.listFinalParamAdj;
      // dummyListFinal = ixStoreObj?.existingPlantDescription;
    } else {
      // dummyListFinal = ixStoreObj?.listFinalParamAdj;
      dummyListFinal = ixStoreObj?.existingPlantDescription;
    }
    console.log("PK dummyListFinal", dummyListFinal);
    if (dummyListFinal.length <= 1) {
      let vesselCount = 0;
      if (ixStoreObj.resinName4 !== null) {
        vesselCount = 4;
      } else if (ixStoreObj.resinName3 !== null) {
        vesselCount = 3;
      } else if (ixStoreObj.resinName2 !== null) {
        vesselCount = 2;
      } else {
        vesselCount = 1;
      }
      var dummyArray = Array.from({ length: vesselCount }, (_, index) => ({
        resinType: ixStoreObj.resinData[ixStoreObj[`resinName${index + 1}`]],
        resinName: ixStoreObj[`resinName${index + 1}`],
        resinId:
          ixStoreObj[`resinName${index + 1}`] == "WAC"
            ? ixResinID1
            : ixStoreObj[`resinName${index + 1}`] == "SAC"
            ? ixResinID2
            : ixStoreObj[`resinName${index + 1}`] == "WBA"
            ? ixResinID3
            : ixResinID4,
        vesselNo: index + 1,
        resinVolumeAsDelivered: 0,
        vesselDiameter: 0,
        resinBedHeightAsDelivered: 0,
        resinBedStandardHeight: 0,
        resinBedHeightAsExhausted: 0,
        resinBedHeightAsRegenerated: 0,
        inertResinVolume: 0,
        inertBedHeight: 0,
        freeBoard: 0,
        vesselCylindricalHeight: 0,
        vesselWallThickness: 0,
        pressureDropwithRecomQty: 0,
        resinPackagingSize: 0,
        ixfpaRadioButtonID: 0,
      }));
      if (vesselCount > 1) {
        dummyListFinal = dummyArray;
      }
    }
    let list = [...dummyListFinal];
    dummyListFinal = list.map((item, index) => {
      let resinVolumeAsDelivered = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.resinVolumeAsDelivered,
        "m³",
        unit.selectedUnits[12]
      );
      let inertResinVolume = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.inertResinVolume,
        "m³",
        unit.selectedUnits[12]
      );
      let vesselDiameter = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.vesselDiameter,
        "mm",
        unit.selectedUnits[8]
      );
      let resinBedHeightAsDelivered = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.resinBedHeightAsDelivered,
        "mm",
        unit.selectedUnits[8]
      );
      let resinBedStandardHeight = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.resinBedStandardHeight,
        "mm",
        unit.selectedUnits[8]
      );
      let resinBedHeightAsRegenerated = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.resinBedHeightAsRegenerated,
        "mm",
        unit.selectedUnits[8]
      );
      let resinBedHeightAsExhausted = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.resinBedHeightAsExhausted,
        "mm",
        unit.selectedUnits[8]
      );
      let inertBedHeight = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.inertBedHeight,
        "mm",
        unit.selectedUnits[8]
      );
      let vesselCylindricalHeight = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.vesselCylindricalHeight,
        "mm",
        unit.selectedUnits[8]
      );
      let vesselWallThickness = GlobalUnitConversion(
        GlobalUnitConversionStore,
        item.vesselWallThickness,
        "mm",
        unit.selectedUnits[8]
      );
      return {
        ...item,
        ["resinVolumeAsDelivered"]: Number.parseFloat(
          resinVolumeAsDelivered
        ).toFixed(2),
        ["inertResinVolume"]: Number.parseFloat(inertResinVolume).toFixed(2),
        ["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),
        ["resinBedHeightAsDelivered"]: Number.parseFloat(
          resinBedHeightAsDelivered
        ).toFixed(2),
        ["resinBedStandardHeight"]: Number.parseFloat(
          resinBedStandardHeight
        ).toFixed(2),
        ["resinBedHeightAsRegenerated"]: Number.parseFloat(
          resinBedHeightAsRegenerated
        ).toFixed(2),
        ["resinBedHeightAsExhausted"]: Number.parseFloat(
          resinBedHeightAsExhausted
        ).toFixed(2),
        ["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),
        ["vesselCylindricalHeight"]: Number.parseFloat(
          vesselCylindricalHeight
        ).toFixed(2),
        ["vesselWallThickness"]:
          Number.parseFloat(vesselWallThickness).toFixed(2),
      };
    });
    console.log("PK dummyListFinal after", dummyListFinal);
    /*----Unit conversion for regenenConditionPage start-----*/
    let [a, b] = resinVal;
    let cationTemp = resinVal[0]?.temperature;
    let anionTemp = resinVal[1]?.temperature;
    if (a) {
      cationTemp = Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[0]?.temperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      );
    }
    if (b) {
      anionTemp = Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[1]?.temperature,
          "°C",
          unit.selectedUnits[2]
        ).toFixed(2)
      );
    }
    let [Ra, Rd] = ixRegenreteDose;
    // averageConductivityVal
    let cationRegenreteDoseVel = ixRegenreteDose[0]?.regenerantDoseVal4;
    let anionRegenreteDoseVel = ixRegenreteDose[1]?.regenerantDoseVal4;
    let cationAverageConduc = ixRegenreteDose[0]?.averageConductivityVal;
    let anionAverageConduc = ixRegenreteDose[1]?.averageConductivityVal;
    let cationendpointConduc = ixRegenreteDose[0]?.endpointConductivityVal;
    let anionendpointConduc = ixRegenreteDose[1]?.endpointConductivityVal;
    if (Ra) {
      cationRegenreteDoseVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.regenerantDoseVal4,
        "g/L",
        unit.selectedUnits[14]
      );
      cationAverageConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.averageConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
      cationendpointConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[0]?.endpointConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
    }
    if (Rd) {
      anionRegenreteDoseVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.regenerantDoseVal4,
        "g/L",
        unit.selectedUnits[14]
      );
      anionAverageConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.averageConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
      anionendpointConduc = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixRegenreteDose[1]?.endpointConductivityVal,
        "µS/cm",
        unit.selectedUnits[17]
      );
    }
    /*----Unit conversion for regenenConditionPage end-----*/
    /*----Unit conversion for Advance Regeneration start-----*/
    let [c, d] = ixStoreAdvance;
    let cationregenVel = ixStoreAdvance[0]?.regenerationVelocity;
    let anionregeneVel = ixStoreAdvance[1]?.regenerationVelocity;
    let cationDisVol = ixStoreAdvance[0]?.displacementVolume;
    let anionDisVol = ixStoreAdvance[1]?.displacementVolume;
    let cationFasVol = ixStoreAdvance[0]?.fatRinseVolume;
    let anionFasVol = ixStoreAdvance[1]?.fatRinseVolume;
    if (c) {
      cationregenVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[0]?.regenerationVelocity,
        "BV/h",
        unit.selectedUnits[10]
      );
      cationDisVol = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[0]?.displacementVolume,
        "BV",
        unit.selectedUnits[13]
      );
      cationFasVol = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[0]?.fatRinseVolume,
        "BV",
        unit.selectedUnits[13]
      );
    }
    if (d) {
      anionregeneVel = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[1]?.regenerationVelocity,
        "BV/h",
        unit.selectedUnits[10]
      );
      anionDisVol = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[1]?.displacementVolume,
        "BV",
        unit.selectedUnits[13]
      );
      anionFasVol = GlobalUnitConversion(
        GlobalUnitConversionStore,
        ixStoreAdvance[1]?.fatRinseVolume,
        "BV",
        unit.selectedUnits[13]
      );
    }
    /*----Unit conversion for Advance Regeneration end-----*/
    /*----Unit conversion for Vessel Regeneration start-----*/
    // let effluentVal = effluentValue;
    // if (selectedEffluent === 2) {
    //   effluentVal =
    //     GlobalUnitConversion(
    //       GlobalUnitConversionStore,
    //       effluentValue,
    //       "µatm",
    //       unit.selectedUnits[6]
    //     );
    // }else if (selectedEffluent === 3) {
    // //   if (unit.selectedUnits[19] === "mg/L KMnO₄") {
    // //     effluentVal = GlobalUnitConversion(
    // //       GlobalUnitConversionStore,
    // //       effluentValue,
    // //       "mg/L TOC",
    // //       "mg/L KMnO₄"
    // //     );
    // //   } else if (unit.selectedUnits[19] === "mg/L TOC") {
    // //     effluentVal = GlobalUnitConversion(
    // //       GlobalUnitConversionStore,
    // //       effluentValue,
    // //       "mg/L KMnO₄",
    // //       "mg/L TOC"
    // //     );
    // //   }
    // effluentVal = GlobalUnitConversion(
    //   GlobalUnitConversionStore,
    //   effluentValue,
    //   "mg/L TOC",
    //   unit.selectedUnits[19]
    // );
    // }

    /*----Unit conversion for Vessel Regeneration end-----*/
    const MethodName = { Method: "ix/api/v1/IXData" };
    const IXData_Method_Body = {
      ...MethodName,
      ...ixStore,
      ["treatmentObjID"]: caseTreatmentIDIXD,
      ["caseTreatmentID"]: caseTreatmentIDIXD,
      ["space_velocity_txt"]: Number(
        GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStore.space_velocity_txt,
          "BV/h",
          unit.selectedUnits[10]
        ).toFixed(2)
      ),
      // ["effluentValue"]: parseInt(effluentVal),
      listRegenConds: [
        { ...ixStore.listRegenConds[0], ["temperature"]: cationTemp },
        { ...ixStore.listRegenConds[1], ["temperature"]: anionTemp },
      ],
      listAdvRegen: [
        {
          ...ixStore.listAdvRegen[0],
          ["regenerationVelocity"]: Number(cationregenVel?.toFixed(2)),
          ["displacementVolume"]: Number(cationDisVol?.toFixed(2)),
          ["fatRinseVolume"]: Number(cationFasVol?.toFixed(2)),
        },
        {
          ...ixStore.listAdvRegen[1],
          ["regenerationVelocity"]: Number(anionregeneVel?.toFixed(2)),
          ["displacementVolume"]: Number(anionDisVol?.toFixed(2)),
          ["fatRinseVolume"]: Number(anionFasVol?.toFixed(2)),
        },
      ],
      listProductQualityandregeneration: [
        {
          ...ixStore.listProductQualityandregeneration[0],
          ["regenerantDoseVal4"]: Number(cationRegenreteDoseVel?.toFixed(2)),
          ["averageConductivityVal"]: Number(cationAverageConduc?.toFixed(2)),
          ["endpointConductivityVal"]: Number(cationendpointConduc?.toFixed(2)),
        },
        {
          ...ixStore.listProductQualityandregeneration[1],
          ["regenerantDoseVal4"]: Number(anionRegenreteDoseVel?.toFixed(2)),
          ["averageConductivityVal"]: Number(anionAverageConduc?.toFixed(2)),
          ["endpointConductivityVal"]: Number(anionendpointConduc?.toFixed(2)),
        },
      ],

      listFinalParamAdj: dummyListFinal,
      treatmentName: "IXD",
    };
    let PostResponseValues = await IXData_PostData(IXData_Method_Body);
    dispatch(setIXDUpdate(false));

    if (PostResponseValues?.data?.responseMessage == "Success") {
      // toast.success("IXdata ,Record Updated successfully !", {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      console.log("save autoSaveIXResponse success");
    } else {
      // toast.error(PostResponseValues.data.message,"Record not Update !", {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      console.log("save autoSaveIXResponse falied");
    }
  };

  //tab changing functions
  const changePanel = (tab, index) => {
    if (validateTabChange(tab, index).canChange) {
      if (selectedIndex === "System Design") {
        if (!needToRetriveData) {
          changeTabsControler(tab, index);
          updateDataFunction();
        }
      } else if (selectedIndex === "Feed Setup") {
        if (FeedStreamData.lstrequestsavefeedwater[0].streams.length > 0) {
          updateFeedsetDataFunction(tab, index);
        }
      } else if (selectedIndex === "UF") {
        if (tab.heading !== "UF") {
          saveUFData();
        }

        changeTabsControler(tab, index);
      } else if (selectedIndex === "IXD") {
        dispatch(
          updateUFStore({
            ...UFData,
            ["isWaterSubTypeChanged"]: false,
            ["isDesignTempChanged"]: false,
          })
        );
        if (tab.heading !== "IXD") {
          saveIXDData();
        }
        changeTabsControler(tab, index);
      } else if (selectedIndex === "Report") {
        dispatch(
          updateUFStore({
            ...UFData,
            ["isWaterSubTypeChanged"]: false,
            ["isDesignTempChanged"]: false,
          })
        );
        changeTabsControler(tab, index);
      }
    }

    if (tab.heading === "Report") {
console.log("techNolist",techNolist);

      if (techNolist.includes("UF")) {
        SaveUFJSONData();
      } else if (techNolist.includes("IXD")) {
        let list = [...existingPlantDescription];
        var dummyReportListFinal = list.map((item, index) => {
          let resinVolumeAsDelivered = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.resinVolumeAsDelivered,
            "m³",
            unit.selectedUnits[12]
          );
          let inertResinVolume = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.inertResinVolume,
            "m³",
            unit.selectedUnits[12]
          );
          let vesselDiameter = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.vesselDiameter,
            "mm",
            unit.selectedUnits[8]
          );
          let resinBedHeightAsDelivered = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.resinBedHeightAsDelivered,
            "mm",
            unit.selectedUnits[8]
          );
          let resinBedStandardHeight = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.resinBedStandardHeight,
            "mm",
            unit.selectedUnits[8]
          );
          let resinBedHeightAsRegenerated = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.resinBedHeightAsRegenerated,
            "mm",
            unit.selectedUnits[8]
          );
          let resinBedHeightAsExhausted = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.resinBedHeightAsExhausted,
            "mm",
            unit.selectedUnits[8]
          );
          let inertBedHeight = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.inertBedHeight,
            "mm",
            unit.selectedUnits[8]
          );
          let vesselCylindricalHeight = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.vesselCylindricalHeight,
            "mm",
            unit.selectedUnits[8]
          );
          let vesselWallThickness = GlobalUnitConversion(
            GlobalUnitConversionStore,
            item.vesselWallThickness,
            "mm",
            unit.selectedUnits[8]
          );
          return {
            ...item,
            ["resinVolumeAsDelivered"]: Number.parseFloat(
              resinVolumeAsDelivered
            ).toFixed(2),
            ["inertResinVolume"]:
              Number.parseFloat(inertResinVolume).toFixed(2),
            ["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),
            ["resinBedHeightAsDelivered"]: Number.parseFloat(
              resinBedHeightAsDelivered
            ).toFixed(2),
            ["resinBedStandardHeight"]: Number.parseFloat(
              resinBedStandardHeight
            ).toFixed(2),
            ["resinBedHeightAsRegenerated"]: Number.parseFloat(
              resinBedHeightAsRegenerated
            ).toFixed(2),
            ["resinBedHeightAsExhausted"]: Number.parseFloat(
              resinBedHeightAsExhausted
            ).toFixed(2),
            ["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),
            ["vesselCylindricalHeight"]: Number.parseFloat(
              vesselCylindricalHeight
            ).toFixed(2),
            ["vesselWallThickness"]:
              Number.parseFloat(vesselWallThickness).toFixed(2),
          };
        });
        SaveIXDJSONData(dummyReportListFinal);
      }
      if (technologyAdded !== true) {
        setIsReportError(true);
        setSelectedIndex("System Design");
        setPanelIndex(0);
        setCurrentPanel("System Design");
        setScrollCheck(!scrollCheck);
      } else {
        changeTabsControler(tab, index);
      }
    }
  };



  const validateTabChange = (tab, index) => {
    switch (tab.heading) {
      case "System Design":
        return { canChange: true, tab: tab, index: index };
      case "Feed Setup":
        if (ProjectInfoStore?.projectID == 0 || ProjectInfoStore?.caseId == 0) {
          return { canChange: false, tab: tab, index: index };
        } else {
          return { canChange: true, tab: tab, index: index };
        }

      case "UF":
        if (FeedStoreData == 0) {
          return { canChange: false, tab: tab, index: index };
        } else {
          return { canChange: true, tab: tab, index: index };
        }
      case "IXD":
        if (FeedStoreData == 0) {
          return { canChange: false, tab: tab, index: index };
        } else {
          return { canChange: true, tab: tab, index: index };
        }
      case "Report":
        return { canChange: true, tab: tab, index: index };
    }
  };
  const changeTabsControler = (tab, index) => {
    if(tab.heading ==="Feed Setup"){
      dispatch(updateTabAvailable({...tabAvailable,"FeedSetup":true}));
    }else if(tab.heading ==="IXD"){
      dispatch(updateTabAvailable({...tabAvailable,"IXD":true}));
    }
      setSelectedIndex(tab.heading);
      setPanelIndex(index);
      setCurrentPanel(tab.heading);
      setScrollCheck(!scrollCheck);

  };

  // const changeTabsControler = (tab, index) => {
  //   // if(tab.heading ==="Feed Setup"){
  //   //   // dispatch(updateTabAvailable({...tabAvailable,"FeedSetup":true}));
  //   //   dispatch(updateTabAvailableForUF({...tabAvailableForUF,"FeedSetup":true}));
  //   // }else if(tab.heading ==="IXD"){
  //   //   // dispatch(updateTabAvailable({...tabAvailable,"IXD":true}));
  //   // }
  //   // else if(tab.heading ==="UF"){
  //   //   dispatch(updateTabAvailableForUF({...tabAvailableForUF,"UF":true}));
  //   // }

    
  //     setSelectedIndex(tab.heading);
  //     setPanelIndex(index);
  //     setCurrentPanel(tab.heading);
  //     setScrollCheck(!scrollCheck);
 
  // };




  const handleTabClick = (tabIndex) => {
    if (
      tabIndex === 2 &&
      cationValues.length === 0 &&
      anionValues.length === 0 &&
      neutralsValues.length === 0
    ) {
      setSelectedTab(1);
    } else {
      setSelectedTab(tabIndex);
    }
  };
  const givePanel = (id) => {
    dispatch(setTabData(id)); //send tab data to store for hide header while scrolling down
    switch (id) {
      case "System Design":
        localStorage.setItem("feed setup", false);
        return (
          <div className="panel">
            <SystemDesign />
          </div>
        );
      case "Feed Setup":
        localStorage.setItem("feed setup", true);
        return (
          <div className="panel">
            <FeedSetup />
          </div>
        );
      case "UF":
        localStorage.setItem("feed setup", false);
        return (
          <div className="panel">
            <UF />
          </div>
        );
      case "IXD":
        localStorage.setItem("feed setup", false);
        return (
          <div className="panel">
            <IXD />
          </div>
        );
      case "Report":
        localStorage.setItem("feed setup", false);
        return (
          <div className="panel">
            <Report />
          </div>
        );
    }
  };

  return (
    <>
      <ActivityMonitorStyled
        className="feed-progress-row g-0"
        scrollDirection={scrollDirection}
      >
        <Tabs
          // selectedIndex={selectedTab}
          // onSelect={handleTabClick}
          defaultIndex={panelIndex}
        >
          <TabList className="feed-progress-top-column">
            {addedTechnology.map((tab, index) => (
              <Tab
                className={`feed-progress-column ${
                  panelIndex === index
                    ? "selected_activity_monitor_tab"
                    : "react-tabs"
                }`}
                onClick={() => changePanel(tab, index)}
                key={tab.id}
              >
                <div className="activity_monitor">
                  <div
                    className={`activity_monitor_count ${
                      panelIndex === index ? "selected_circle" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="activity_monitor_name">
                    <div className="activity_monitor_name_heading">
                      <div>
                        <CustomHeading
                          label={tab.heading}
                          lineHeight={"20px"}
                          fontFamily="NotoSansSemiBold"
                          color={
                            panelIndex === index
                              ? colors.PrimaryDarkAquaMarine
                              : colors.Grey96
                          }
                        />
                      </div>
                      <div className="activity_monitor_progress_bar">
                        {tab.heading === "System Design" ? (
                          <ProgressBrokenIcon />
                        ) : (
                          <input type="range" className="dynamic_range" />
                        )}
                      </div>
                    </div>
                    <div className="activity_monitor_name_progress">
                      <CustomHeading
                        label={tab.subHeading}
                        lineHeight={"12px"}
                        fontSize={"10px"}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`activity_monitor_triangle ${
                    panelIndex === index ? "selected" : ""
                  }`}
                >
                  <ActivityMonitorTriangle />
                </div>
              </Tab>
            ))}
            <Tab
              className={`feed-progress-column ${
                panelIndex === addedTechnology.length
                  ? "selected_activity_monitor_tab"
                  : "react-tabs"
              }`}
              onClick={() =>
                changePanel({ heading: "Report" }, addedTechnology.length)
              }
            >
              <div className="activity_monitor">
                <div
                  className={`activity_monitor_count ${
                    panelIndex === addedTechnology.length
                      ? "selected_circle"
                      : ""
                  }`}
                >
                  {addedTechnology.length + 1}
                </div>
                <div className="activity_monitor_name">
                  <div className="activity_monitor_name_heading">
                    <div>
                      <CustomHeading
                        label={"Report"}
                        lineHeight={"20px"}
                        fontFamily="NotoSansSemiBold"
                        color={
                          panelIndex === addedTechnology.length
                            ? colors.PrimaryDarkAquaMarine
                            : colors.Grey96
                        }
                      />
                    </div>
                    <div className="activity_monitor_progress_bar">
                      <input type="range" className="dynamic_range" />
                    </div>
                  </div>
                  <div className="activity_monitor_name_progress">
                    <CustomHeading
                      label={"Finish all steps to generate report."}
                      lineHeight={"12px"}
                      fontSize={"10px"}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`activity_monitor_triangle ${
                  panelIndex === addedTechnology.length ? "selected" : ""
                }`}
              >
                <ActivityMonitorTriangle />
              </div>
            </Tab>
          </TabList>
          {givePanel(selectedIndex)}
        </Tabs>
        {isFeedError && (
          <>
            <ProjectErrorPopup
              show={isFeedError}
              close={() => {
                setIsFeedError(false);
              }}
              message="For IXD System Specifications, at least one ion should have non-zero value."
            />
          </>
        )}
        {isReportError && (
          <>
            <ProjectErrorPopup
              show={isReportError}
              close={() => {
                setIsReportError(false);
              }}
              message="Please select at least one treatment option."
            />
          </>
        )}
        {isFeedsetupError && (
          <>
            <ProjectErrorPopup
              show={isFeedsetupError}
              close={() => {
                setisFeedsetupError(false);
              }}
              message="Please charge-balance the Feedwater using the Add Solutes or Adjust Solutes buttons at the top of the Feed Water Tab."
            />
          </>
        )}
      </ActivityMonitorStyled>
    </>
  );
};

export default ActivityMonitor;
