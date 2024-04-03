import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Dropdown } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TabletViewMenuIcon from "../icons/TabletViewMenuIcon";
import HeaderStyled from "./HeaderStyled";
import NotificationTealIcon from "../icons/NotificationTealIcon";

import Wave_PRO_UF_Logo from "../assets/images/Wave-PRO-UF-Logo-02.svg";
import NotificationIcon from "../icons/NotificationIcon";
import DuPont_logo_Red from "../assets/images/1280px-DuPont_logo_Red.svg";
import NotificationReadUnreadIcon from "../icons/NotificationReadUnreadIcon";
import { MyError } from "../utils/ErrorCreator";
import { selectUserInfo, clearAuthData } from "../../features/login/AuthSlice";
import { useLogoutMutation } from "../../services/apiConfigSSO";
import { updateProjectInfo } from "../../common/ProjectInfoSlice";
import { updateLoader } from "../../features/home/CardListSlice";
import CurrencyAndUnitPopUp from "../../features/feedwater/modals/CurrencyAndUnitPopUp";
import Pumps from "../../features/feedwater/modals/Pumps";
import ProjectCostAndChemicalLibrary from "../../features/feedwater/modals/ProjectCostAndChemicalLibrary";
import { useLazyUserprofileGetAllDataQuery } from "../../services/apiConfigUserProfile";

import {
  useCreateDataMutation,
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../services/apiConfig";
import ProjectSaveWarning from "../../features/feedwater/systemdesign/ProjectSaveWarning";
import CustomHeading from "../styles/components/headings/CustomHeading";
import { colors } from "../styles/Theme";
import { updateMenuIconHeader } from "../../features/feedwater/uf/UFSlice";
import { updateIXMenuIconHeader, updateIXStore } from "../../features/feedwater/ix/IXDSlice";
import { setLoading } from "../../features/feedwater/systemdesign/processDiagramSlice";
import GlobalUnitConversion from "../utils/GlobalUnitConversion";
import { updateTabAvailable } from "../ReportIXDSlice";

const Header = ({ showSideMenu, setShowMenuIcon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dataisChanged = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.dataisChanged
  );
  const [userLogout, responseLogout] = useLogoutMutation();
  const [updateData, response] = useUpdateDataMutation();
  const [IXData_PostData, { Umoiddata }] = useCreateDataMutation();

  // const { caseID } = useSelector(
  //   (state) => state.processDiagramSlice.feedWaterData
  // );
  const accessToken = useSelector((state) => state.Auth.accessToken);
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const newDesignExist = useSelector((state) => state.IXStore.newDesignExist);
  const userAttributes = useSelector((state) => state.Auth.customAttributes);
  const [openCandU, setOpenCandU] = useState(false);
  const [openPumps, setOpenPumps] = useState(false);
  const [openCostandChemicle, setOpenCandC] = useState(false);
  const {
    addedTechnology,
    isDataUpdated,
    feedWaterData,
    nodes,
    edges,
    techNolist,
  } = useSelector((state) => state.processDiagramSlice);

  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const { projectTitle } = useSelector((state) => state.projectInfo);

  const caseName = useSelector(
    (state) => state.projectInfo.projectConfig.caseConfig.caseList
  );
  useEffect(() => {
    if (!isLoggedIn) {
      return clearUserData();
    }
  }, [isLoggedIn]);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const scrollDirection = useSelector((state) => state.scrollData.direction);
  const feedCheck = useSelector((state) => state.tabData.tab);
  const UFData = useSelector((state) => state.UFStore.data);
  const { isForDrinkingWater } = useSelector((state) => state.UFStore);
  const { isUfDataUpdated } = useSelector((state) => state.UFStore);
  const user_id = UserInfoStore ? UserInfoStore.UserId : 1;
  const projectID = ProjectInfoStore ? ProjectInfoStore.projectID : 1;
  const caseID = ProjectInfoStore ? ProjectInfoStore.caseId : 1;
  const { First_Name, Last_Name } = userAttributes || {};
  const { lastLoggedIn, applicationVersion } = UserInfoStore || {};
  const initials =
    First_Name?.charAt(0).toUpperCase() + Last_Name?.charAt(0).toUpperCase();
  const ixStoreObj = useSelector((state) => state.IXStore);
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  let formattedDate = "";
  /* Formatting LastLoggedIn */
  if (lastLoggedIn) {
    const originalDate = new Date(lastLoggedIn);
    const isDate = new Date(originalDate.getTime() + 5.5 * 60 * 60 * 1000);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Europe/Paris",
    };

    formattedDate = isDate.toLocaleString("en-US", options);
  }
  const [activeMenu, setActiveMenu] = useState(null);
  const [changeNotificationIcon, setChangeNotificationIcon] = useState(null);
  const [currency, setCurrency] = useState(false);
  const [PostRead, { data }] = useCreateDataMutation();
  const [getData, responsedata] = useLazyGetAllDataQuery();
  const [callLogoutGETCall, responseLogoutReceived] = useLazyGetAllDataQuery();
  const [notificationList, setNotificationList] = useState([]);
  const [saveWarning, setSaveWarning] = useState(false);
  const [header, setHeader] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [updateFeedsetupData, responsefeedsetup] = useCreateDataMutation();
  const [updateUFData, responseUfData] = useCreateDataMutation();

  // setInterval(() => {
  //   if (user_id > 0) {
  //     getData(`masterdata/api/v1/UnreadNotification?userID=${user_id}`);
  //   }
  // }, 60000);
  // unit conversion
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const unit = useSelector((state) => state.projectInfo?.projectConfig?.unitConfig);

  const tab = useSelector((state) => state.tabData.tab);
  const FeedStreamData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.streamData
  );
  const caseTreatmentId = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );

  const handleNavigate = () => {
    if (location.pathname === "/FeedWaterHome") {
      if (tab == "System Design" && isDataUpdated) {
        setSaveWarning(true);
      } else if (tab == "Feed Setup" && dataisChanged) {
        setSaveWarning(true);
      } else if (tab == "UF" && isUfDataUpdated) {
        setSaveWarning(true);
      }else if (tab == "IXD" && ixStoreObj.isIXDDataUpdated) {
        setSaveWarning(true);
      } else {
        navigate("/home");
        dispatch(updateTabAvailable({"FeedSetup":false,"IXD":false}));
      }
    }
  };

  const dataUf = {
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
    filtrateFlux: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.filtrateFlux,"LMH",unit.selectedUnits[4]).toFixed(2)),
    backwashFlux: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.backwashFlux,"LMH",unit.selectedUnits[4]).toFixed(2)),
    cEBFlux: Number(GlobalUnitConversion(GlobalUnitConversionStore,UFData.cEBFlux,"LMH",unit.selectedUnits[4])),
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
  const handleYes = () => {
    if (tab == "System Design") {
      let lstTechnologyLists = [];
      addedTechnology.map((item) => {
        item.id > 0 ? lstTechnologyLists.push({ technologyID: item.id }) : null;
      });
      console.log("PK feedWaterData",feedWaterData);
      updateData({
        Method: "masterdata/api/v1/SystemDesign",
        ...feedWaterData,
        flowValue: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedWaterData.flowValue,"m³/h",unit.selectedUnits[1]).toFixed(2))),
        flow: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedWaterData.flow,"m³/h",unit.selectedUnits[1]).toFixed(2))),
        userID: user_id,
        processMap: { nodes: nodes, edges: edges },
        lstTechnologyLists,
      });
      dispatch(setLoading());
      navigate("/home");
    } else if (tab == "Feed Setup") {
      const response = updateFeedsetupData(FeedStreamData);
      navigate("/home");
    } else if (tab == "UF") {
      const MethodName = { Method: "uf/api/v1/SaveUFData" };
      const UFRequestDetails = {
        ...MethodName,
        ...dataUf,
        ["drinkingWater_Ind"]: isForDrinkingWater,
        ["userID"]: user_id,
        ["projectID"]: projectID,
        ["caseID"]: caseID,
        ["treatmentName"]: "UF",
      };
      updateUFData(UFRequestDetails);
      navigate("/home");
    } else if (tab == "IXD") {
      SaveUpdatedData();
      navigate("/home");
    } else {
      navigate("/home");
    }
    setSaveWarning(false);
  };

  //IXD save
  const SaveUpdatedData = async () => {
    // const finalData = {
    //   ...ixStore,
    //   listFinalParamAdj: ixStoreObj.listFinalParamAdj,
    //   listFinalParamAdjFeature: ixStoreObj.listFinalParamAdjFeature,
    // };
    // dispatch(updateIXStore(finalData));

    const existingData = {
      ...ixStore,
      existingPlantDescription: ixStoreObj.existingPlantDescription,
    };
    dispatch(updateIXStore(existingData));
    var dummyListFinal = [];
    if (
      ixStoreObj.viewReport === "true" &&
      ixStore.evaluteExisting_ind == true
    ) {
      dummyListFinal = ixStoreObj?.existingPlantDescription;
    } else {
      dummyListFinal = ixStoreObj?.listFinalParamAdj;
    }
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
    let list=[...dummyListFinal];
    dummyListFinal = list.map((item, index) => {
      let resinVolumeAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,item.resinVolumeAsDelivered,"m³",unit.selectedUnits[12]);
      let inertResinVolume=GlobalUnitConversion(GlobalUnitConversionStore,item.inertResinVolume,"m³",unit.selectedUnits[12]);
      let vesselDiameter=GlobalUnitConversion(GlobalUnitConversionStore,item.vesselDiameter,"mm",unit.selectedUnits[8]);
      let resinBedHeightAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,item.resinBedHeightAsDelivered,"mm",unit.selectedUnits[8]);
      let resinBedStandardHeight=GlobalUnitConversion(GlobalUnitConversionStore,item.resinBedStandardHeight,"mm",unit.selectedUnits[8]);
      let resinBedHeightAsRegenerated=GlobalUnitConversion(GlobalUnitConversionStore,item.resinBedHeightAsRegenerated,"mm",unit.selectedUnits[8]);
      let resinBedHeightAsExhausted=GlobalUnitConversion(GlobalUnitConversionStore,item.resinBedHeightAsExhausted,"mm",unit.selectedUnits[8]);
      let inertBedHeight=GlobalUnitConversion(GlobalUnitConversionStore,item.inertBedHeight,"mm",unit.selectedUnits[8]);
      let vesselCylindricalHeight=GlobalUnitConversion(GlobalUnitConversionStore,item.vesselCylindricalHeight,"mm",unit.selectedUnits[8]);
      let vesselWallThickness=GlobalUnitConversion(GlobalUnitConversionStore,item.vesselWallThickness,"mm",unit.selectedUnits[8]);
      return { ...item, ["resinVolumeAsDelivered"]: Number.parseFloat(resinVolumeAsDelivered).toFixed(2),["inertResinVolume"]: Number.parseFloat(inertResinVolume).toFixed(2),["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),["resinBedHeightAsDelivered"]: Number.parseFloat(resinBedHeightAsDelivered).toFixed(2),["resinBedStandardHeight"]: Number.parseFloat(resinBedStandardHeight).toFixed(2),["resinBedHeightAsRegenerated"]: Number.parseFloat(resinBedHeightAsRegenerated).toFixed(2),["resinBedHeightAsExhausted"]: Number.parseFloat(resinBedHeightAsExhausted).toFixed(2),["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),["vesselCylindricalHeight"]: Number.parseFloat(vesselCylindricalHeight).toFixed(2),["vesselWallThickness"]: Number.parseFloat(vesselWallThickness).toFixed(2)};
      });
    const MethodName = { Method: "ix/api/v1/AutoSaveIXData" };
    const IXData_Method_Body = {
      ...MethodName,
      ...ixStore,
      ["treatmentObjID"] :caseTreatmentId,
      ["caseTreatmentID"]:caseTreatmentId,
     [ "treatmentName"]: "IXD",
      ["listFinalParamAdj"]: dummyListFinal,
    };
    let PostResponseValues = await IXData_PostData(IXData_Method_Body);
    console.log("responseMessage", PostResponseValues.data.responseMessage);
    if (PostResponseValues.data.responseMessage == "Success") {
      // toast.success("IXdata ,Record Updated successfully !", {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      console.log("autoSaveIXResponse success");
    } else {
      // toast.error(PostResponseValues.data.message,"Record not Update !", {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      console.log("autoSaveIXResponse falied");
    }
  };
  //-----------------------
  useEffect(() => {
    if (responseLogout.isLoading) {
      console.log("Loading");
    } else {
      if (responseLogout.isSuccess === true) {
        clearUserData();
        navigate("/");
      }
    }
  }, [responseLogout]);

  const revokeUser = async () => {
    // console.log("REVOKE USER ACCESS....");
    const responseRevoke = await axios.post(
      // process.env.REACT_APP_REVOKE_ENDPOINT,
      process.env.REACT_APP_TOKEN_SFDCURL + "oauth2/revoke",
      null,
      {
        params: {
          token: accessToken,
          includeBasicAuth: true,
          sendClientId: true,
        },
      }
    );
    if (responseRevoke.status === 200) {
      clearUserData();
      navigate("/");
    } else {
      console.log("FAILED TO REVOKE ACCESS TOKEN.");
    }
  };
  useEffect(() => {
    if (user_id > 0) {
      getData(`masterdata/api/v1/UnreadNotification?userID=${user_id}`);
    }
  }, [user_id]);
  useEffect(() => {
    if (responsedata.status == "fulfilled") {
      setNotificationList(responsedata.data);
    }
  }, [responsedata]);
  //checking page scroll behavior of feedSetup
  // useEffect(() => {
  //   const headerChange =
  //     scrollDirection === "down" && feedCheck === "Feed Setup";
  //   setHeader(headerChange);
  // }, [scrollDirection]);

  const notificationread = async (list) => {
    const newData = {
      Method: "masterdata/api/v1/MarkAsReadNotification",
      userID: user_id,
      lstNotificationIDs: list,
    };

    let ResponseValues = await PostRead(newData);
    if (user_id > 0) {
      getData(`masterdata/api/v1/UnreadNotification?userID=${user_id}`);
    }
  };
  const handleReadNotification = (id) => {
    const tempData = notificationList.map((item) => {
      if (id === item.id) {
        item = {
          ...item,
          isRead: true,
        };
      }
      return item;
    });
    setNotificationList(tempData);
    notificationread([
      {
        notificationID: id,
      },
    ]);
  };

  const markAllAsRead = () => {
    let newList = [];
    const tempData = notificationList.map((item) => {
      item = {
        ...item,
        isRead: true,
      };
      newList.push({
        notificationID: item.id,
      });
      return item;
    });
    setNotificationList(tempData);
    notificationread(newList);
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenu(menuItem);
    // if (menuItem == "notification") {
    //   getData(`masterdata/api/v1/UnreadNotification?userID=${user_id}`);
    //   LoadRecord();
    // }
  };

  const LoadRecord = () => {
    setCard([]);
    if (responsedata.data === 0) {
      <div>Loading....</div>;
    } else {
      setCard([]);
      responsedata.data.forEach((element) => {
        const createDate = new Date(element.notificationDate);
        var _createDate = "";
        const _Minutes = createDate.getMinutes();
        const _hours = createDate.getHours();
        const _days = createDate.getDay();
        const _Munths = createDate.getMonth();
        if (_Munths > 0) {
          _createDate = _Munths + " months ago";
        } else if (_days > 0) {
          _createDate = _days + " days ago";
        } else if (_hours > 0) {
          _createDate = _hours + " hours ago";
        } else if (_Minutes > 0) {
          _createDate = _Minutes + " minutes ago";
        } else {
          _createDate = " just now";
        }
        const lastModified = new Date(element.notificationDate);
        var ModifiedDate = "";
        const Minutes = lastModified.getMinutes();
        const hours = lastModified.getHours();
        const days = lastModified.getDay();
        const Munths = lastModified.getMonth();
        if (Munths > 0) {
          ModifiedDate = Munths + " months ago";
        } else if (days > 0) {
          ModifiedDate = days + " days ago";
        } else if (hours > 0) {
          ModifiedDate = hours + " hours ago";
        } else if (Minutes > 0) {
          ModifiedDate = Minutes + " minutes ago";
        } else {
          ModifiedDate = " just now";
        }

        setCard((current) => [
          ...current,
          {
            id: element.id,
            description: element.description,
            header: element.header,
            notificationDate: ModifiedDate,
            notificationType: element.notificationType,
            isRead: element.isRead,
          },
        ]);
      });
    }
  };

  const clearUserData = () => {
    dispatch(clearAuthData());
    window.localStorage.clear();
  };

  /* Clear user loggedin informations from store, and redirect to salesforce logout */
  const handleLogout = async () => {
    // clearUserData();
    window.location.href =
      process.env.REACT_APP_TOKEN_SFDCURL + "auth/idp/oidc/logout";
    //  callLogoutGETCall(`${process.env.REACT_APP_TOKEN_SFDCURL}auth/idp/oidc/logout`);
  };

  // const scrollCheck  = localStorage.getItem("scroll check");
  const unreadNotification = notificationList.filter((item) => !item.isRead);
  const unreadCount = unreadNotification.length;
  const handleOpenSideMenu = () => {
    setShowMenuIcon(true);
  };
  const headerMenuIconStatus = useSelector(
    (state) => state.UFStore.headerMenuIcon
  );
  const headerIXMenuIconStatus = useSelector(
    (state) => state.IXStore.tabletMenuIcon
  );
  const handleOpenUfSideMenu = () => {
    dispatch(updateMenuIconHeader(!headerMenuIconStatus));
  };
  const handleOpenIXSideMenu = () => {
    dispatch(updateIXMenuIconHeader(!headerIXMenuIconStatus));
  };
  console.log("check header menu icon clicked", headerIXMenuIconStatus);
  const tabletView = useSelector((state) => state.UFStore.tabletMenuIcon);
  const ixTabletView = useSelector((state) => state.IXStore.ixTabletView);
  return (
    <>
      <HeaderStyled scrollDirection={scrollDirection}>
        <ProjectSaveWarning
          show={saveWarning}
          close={(a) => {
            setSaveWarning(false);
            navigate("/home");
          }}
          yes={handleYes}
        />
        <div className="global_header">
          <div className="global_header_brand_logo">
            {showSideMenu ? (
              <div onClick={handleOpenSideMenu} className="hamburger_menu">
                <TabletViewMenuIcon />
              </div>
            ) : tabletView && feedCheck === "UF" ? (
              <div onClick={handleOpenUfSideMenu} className="hamburger_menu">
                <TabletViewMenuIcon />
              </div>
            ) : ixTabletView && feedCheck === "IXD" ? (
              <div onClick={handleOpenIXSideMenu} className="hamburger_menu">
                <TabletViewMenuIcon />
              </div>
            ) : (
              ""
            )}
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
          <div className="global_header_selected_project_name">
            <h4 className="selected-project-title">
              {location.pathname === "/FeedWaterHome" && projectTitle}
              {/* {projectTitle} */}
              {/* {console.log("location.state" + JSON.stringify(location.state))} */}
            </h4>
          </div>
          <div className="global_header_header_menu">
            <Dropdown
              className="notification"
              onClick={() => handleMenuItemClick("notification")}
              onMouseEnter={() => setChangeNotificationIcon("notification")}
              onMouseLeave={() => setChangeNotificationIcon(null)}
            >
              <Dropdown.Toggle
                onMouseEnter={() => setActiveDropdown("notification")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* {activeMenu === "notification" && changeNotificationIcon ==="notification" ?(
                    <NotificationTealIcon />
                  ) : (
                    <NotificationIcon />
                  )} */}
                {setActiveDropdown === "notification" ||
                changeNotificationIcon === "notification" ? (
                  <NotificationTealIcon />
                ) : (
                  <NotificationIcon />
                )}
                {notificationList.length > 0 && (
                  <span className="notification-count">{unreadCount}</span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="notification-header d-flex justify-content-between">
                  {unreadCount > 0 ? (
                    <>
                      <span>Latest</span>
                      <a onClick={markAllAsRead}>Mark all as read</a>
                    </>
                  ) : (
                    <span>No new Notification to show</span>
                  )}
                </div>
                {notificationList.map((item, index) => (
                  <div>
                    {!item.isRead && (
                      <Card key={item.index}>
                        <Card.Body>
                          <Row>
                            <Card.Title as={Col} className="col-sm-7">
                              {item.header}
                            </Card.Title>
                            <Card.Title as={Col} className="col-sm-4">
                              {/* <a className="notification-tag">lorem ipsum</a> */}
                            </Card.Title>
                            <Card.Title as={Col} className="col-sm-1">
                              <span
                                onClick={() => handleReadNotification(item.id)}
                              >
                                <NotificationReadUnreadIcon />
                              </span>
                            </Card.Title>
                          </Row>
                          <Card.Text>{item.description}</Card.Text>
                          <p className="text-muted">{item.notificationDate}</p>
                          <div className="markasread"></div>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="user-profile">
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                className={
                  activeMenu === "userprofile"
                    ? "active-notification-button"
                    : ""
                }
              >
                <span className="profile-icon">{initials}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Col sm={12}>
                  <Row>
                    <Col lg={7} className="user-setting">
                      <Card.Body>
                        <p className="logged-username">
                          {`Hi ${First_Name ? First_Name : ""} ${
                            Last_Name ? Last_Name : ""
                          }`}
                        </p>
                        <p className="login-text">
                          {formattedDate
                            ? `Last Login: ${formattedDate} UTC`
                            : ""}
                        </p>
                        <h1 className="wavepro-version">
                          {`  WAVE PRO | Version : ${applicationVersion}`}
                        </h1>
                        <Card.Title className="">Profile Settings</Card.Title>
                        <ul className="list-unstyled temp-disable">
                          <li>
                            <a href="#">My Profile</a>
                          </li>
                          <li>
                            <a>My Projects & Cases</a>
                          </li>
                        </ul>
                        <Card.Title className="">Account Settings</Card.Title>
                        <ul className="list-unstyled">
                          <li>
                            <a onClick={() => setOpenCandU(true)}>
                              Currency & Units
                            </a>
                          </li>
                          <li>
                            <a onClick={() => setOpenCandC(true)}>
                              Operating Costs
                            </a>
                          </li>
                          <li>
                            <a onClick={() => setOpenPumps(true)}>Pumps</a>
                          </li>
                        </ul>
                        <CurrencyAndUnitPopUp
                          show={currency}
                          close={setCurrency}
                        />
                      </Card.Body>
                    </Col>
                    <Col sm={5}>
                      <Card.Body>
                        <Card.Title className="">WAVE Help</Card.Title>
                        <ul className="list-unstyled temp-disable">
                          <li>
                            <a href="#">About WAVE</a>
                          </li>
                          <li>
                            <a href="#">WAVE Academy</a>
                          </li>
                          <li>
                            <a href="#">Resource Center</a>
                          </li>
                          <li>
                            <a href="#">Quick Help(FAQ)</a>
                          </li>
                          <li>
                            <a href="#">Start a Tour</a>
                          </li>
                        </ul>
                        <Card.Title className="">Other Settings</Card.Title>
                        <ul className="list-unstyled">
                          <li>
                            <a
                              href="https://www.dupont.com/legal-notices-and-terms-of-use.html"
                              target="__blank"
                            >
                              Terms & Conditions
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.dupont.com/privacy.html"
                              target="__blank"
                            >
                              Privacy Policy
                            </a>
                          </li>
                          <li>
                            <a
                              href={`${process.env.REACT_APP_TOKEN_SFDCURL}auth/idp/oidc/logout`}
                              className={isLoggedIn ? "" : "not-loggedin"}
                              // onClick={handleLogout}
                            >
                              Sign Out
                            </a>
                          </li>
                        </ul>
                      </Card.Body>
                    </Col>
                  </Row>
                </Col>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <CurrencyAndUnitPopUp
          show={openCandU}
          close={setOpenCandU}
          forUser={true}
        />
        <Pumps show={openPumps} close={setOpenPumps} forUser={true} />
        <ProjectCostAndChemicalLibrary
          show={openCostandChemicle}
          close={setOpenCandC}
          forUser={true}
        />
      </HeaderStyled>
    </>
  );
};

export default Header;
