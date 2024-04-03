import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import FeedsetupSlice from "../../feedwater/feedsetup/FeedsetupSlice";
import UndoIcon from "../../../common/icons/UndoIcon";
import RedoIcon from "../../../common/icons/RedoIcon";
import FeedWaterFileIcon from "../../../common/icons/FeedWaterFileIcon";
import SaveIcon from "../../../common/icons/SaveIcon";
import RefreshIcon from "../../../common/icons/RefreshIcon";
import FeedWaterHeaderStyled from "./SecondaryMenuStyled";
import OpenProject from "../modals/OpenProject";
import ManageCase from "../modals/ManageCase";
import CurrencyAndUnitPopUp from "../modals/CurrencyAndUnitPopUp";
import ProjectInformationModal from "../modals/ProjectInformationModal";
import ShareProjectPageOne from "../modals/ShareProjectPageOne";
import Pumps from "../modals/Pumps";
import NewProjectModal from "../modals/NewProjectModal";
import ProjectCostAndChemicalLibrary from "../modals/ProjectCostAndChemicalLibrary";
import DropRightIcon from "../../../common/icons/DropRightIcon";
import SecondaryMenuStyled from "./SecondaryMenuStyled";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateNewProjectModal from "../../modals/CreateNewProjectModal";
import { updateProjectInfo } from "../../../common/ProjectInfoSlice";
import {
  useCreateDataMutation,
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import { useSelector, useDispatch } from "react-redux";
import { MyError } from "../../../common/utils/ErrorCreator";
import AlertPopUp from "../../../common/notifications/AlertPopUp";
import ProjectSavePopup from "./ProjectSavePopup";
import { setNodeAndEdge } from "../systemdesign/processDiagramSlice";
import { setUfDataUpdate } from "../uf/UFSlice";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { setIXDUpdate } from "../ix/IXDSlice";
import ProjectSaveWarning from "../systemdesign/ProjectSaveWarning";
import { updateTabAvailable } from "../../../common/ReportIXDSlice";

const FeedWaterHeader = ({ currentPanel }) => {
  const dispatch = useDispatch();
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const scrollDirection = useSelector((state) => state.scrollData.direction);
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixStoreObj = useSelector((state) => state.IXStore);
  const { waterSubTypeFlag } = useSelector((state) => state.UFStore);
  const { isForDrinkingWater } = useSelector((state) => state.UFStore);
  const UFData = useSelector((state) => state.UFStore.data);
  const feedCheck = useSelector((state) => state.tabData.tab);
  const userId = UserInfoStore ? UserInfoStore.UserId : 0;
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );
  const [openProject, setOpenProject] = useState(false);
  const [manageCase, setManageCase] = useState(false);
  const [currency, setCurrency] = useState(false);
  const [projectInfo, setProjectInfo] = useState(false);
  const [openShareProject, setOpenShareProject] = useState(false);
  const [openPump, setOpenPump] = useState(false);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [openNewProjectPopup, setOpenNewProjectPopup] = useState(false);
  const [openChemicalLibrary, setOpenChemicalLibrary] = useState(false);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const [header, setHeader] = useState(false);
  const [saveWarning, setSaveWarning] = useState(false);
  const {
    addedTechnology,
    isDataUpdated,
    feedWaterData,
    nodes,
    edges,
    lstTechnologyLists,
  } = useSelector((state) => state.processDiagramSlice);
  const dataisChanged = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.dataisChanged
  );

  const tab = useSelector((state) => state.tabData.tab);
  const { isUfDataUpdated } = useSelector((state) => state.UFStore);
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  const resinVal = useSelector((state) => state.IXStore.data?.listRegenConds);

  const ixStoreAdvance = useSelector(
    (state) => state.IXStore?.data?.listAdvRegen
  );
  const ixRegenreteDose = useSelector(
    (state) => state.IXStore?.data?.listProductQualityandregeneration
  );
  const{selectedEffluent,effluentValue}=useSelector(
    (state) => state.IXStore?.data
  );
  const [updateData, response] = useUpdateDataMutation();
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({ type: "", message: "" });
  const projectID = ProjectInfoStore ? ProjectInfoStore.projectID : 1;
  const caseID = ProjectInfoStore ? ProjectInfoStore.caseId : 1;
  const loggedInUserID = UserInfoStore.UserId;
  const treatmentObjID = "1";
  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({ type: "", message: "" });
    setAlertVisibility(false);
  };

  let homeURL = ""; //add your homeURL here
  const navigate = useNavigate();

  const handleOpenCurrencyUnits = () => {
    setCurrency(true);
  };
  const handleShowOpenProject = () => {
    setOpenProject(true);
  };

  const handleOpenManageCase = () => setManageCase(true);

  const handleOpenProjectInformation = () => {
    setProjectInfo(true);
  };

  const handleOpenShareProject = () => {
    setOpenShareProject(true);
  };
  const handleOpenPump = () => {
    setOpenPump(true);
  };
  const handleOpenNewProject = () => {
    setOpenNewProject(true);
  };
  const handleOpenChemicalLibrary = () => {
    setOpenChemicalLibrary(true);
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    if (saveWarning) {
      setSaveWarning(false);
      navigate("/home");
    } else {
      setOpenNewProjectPopup(true);
    }
  };

  const updateCreateprojc = (e) => {
    e.preventDefault();
    setOpenNewProject(false);
  };

  const updateDataFunction = async () => {
    let lstTechnologyLists = [];

    addedTechnology.map((item) => {
      item.id > 0 ? lstTechnologyLists.push({ technologyID: item.id }) : null;
    });

    const response = await updateData({
      Method: "masterdata/api/v1/SystemDesign",

      ...feedWaterData,

      userID: userId,

      processMap: { nodes: nodes, edges: edges },

      lstTechnologyLists,
    });
  };

  const StoreDataFeed = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.streamData
  );

  const TechnologyStoreData = useSelector(
    (state) => state.processDiagramSlice.addedTechnology
  );
  console.log("TechnologyStoreData Entry page", TechnologyStoreData);
  let Technologynames = TechnologyStoreData.filter((item) => item.id > 0);
  let Technology = [];
  let lengthcount = Technologynames.length;

  if (lengthcount == 1) {
    Technology = Technologynames[0].heading;
    console.log("Technology Entry if", Technology);
  } else if (lengthcount > 1) {
    Technology = "Multiple";
    console.log("Technology Entry else if", Technology);
  } else {
    Technology = "null";
    console.log("Technology Entry else", Technology);
  }

  const [IXData_PostData, { Umoiddata }] = useCreateDataMutation();
  const [updateFeedsetupData, data] = useCreateDataMutation();
  const [POSTUFAutoSaveData, responseAutoSave] = useCreateDataMutation();

  const saveData = async (selectedTab) => {
    console.log("selectedTab==========>" + selectedTab);
    console.log("save icon save success");
    switch (selectedTab) {
      case "Feed Setup":
        {
          let savewatertypeid =
            StoreDataFeed.lstrequestsavefeedwater[0].streams[0].waterTypeID;
          let savewatersubtypeid =
            StoreDataFeed.lstrequestsavefeedwater[0].streams[0].waterSubTypeID;

          if (Technology == "UF") {
            if (savewatertypeid > 0 || savewatersubtypeid > 0) {
              const response = await updateFeedsetupData(StoreDataFeed);
              console.log(" updateFeedsetupData response", response);
              if (response.data.responseMessage == "Success") {
                // const message = "Update preferences applied successfully!  ";
                // handleShowAlert("success", message);
                navigateHome();
              }
            } else {
              console.log(
                "Water type and sub type is required for feed setup data save,Please select water type and water subtype !!"
              );
              const warningMessage =
                "Water type and sub type is required for feed setup data save,Please select water type and water subtype !! ";
              handleShowAlert("warning", warningMessage);
            }
          } else {
            const response = await updateFeedsetupData(StoreDataFeed);
            console.log(" updateFeedsetupData response", response);
            if (response.data.responseMessage == "Success") {
              // const message = "Update preferences applied successfully!  ";
              // handleShowAlert("success", message);
              navigateHome();
            }
          }
        }
        break;
      case "System Design":
        {
          // let lstTechnologyLists = [];
          // addedTechnology.map((item) => {
          //   item.id > 0
          //     ? lstTechnologyLists.push({ technologyID: item.id })
          //     : null;
          // });
          // const StoreData = {
          //   Method: "masterdata/api/v1/SystemDesign",
          //   ...feedWaterData,
          //   userID: userId,
          //   processMap: { nodes: nodes, edges: edges },
          //   lstTechnologyLists,
          // };
          // await updateData(StoreData);
          // console.log("addedTechnology",addedTechnology);
          // console.log("lstTechnologyLists",lstTechnologyLists);
          // console.log(
          //   "save project case -2===========> syatem design." + JSON.stringify(StoreData)
          // );
          console.log("lstTechnologyLists");
          const flowvalue=feedWaterData.flowValue;
          console.log("PK flowva;ue", flowvalue);
          const response = await updateData({
            Method: "masterdata/api/v1/SystemDesign",
            flowValue: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedWaterData.flowValue===undefined?100:feedWaterData.flowValue,"m³/h",unit.selectedUnits[1]).toFixed(2))),
            feedFlow: feedWaterData?.feedFlow,
            // flowValue: feedWaterData?.flowValue,
            caseID: feedWaterData.caseID,
            projectID: feedWaterData.projectID,
            waterTypeID: feedWaterData.waterTypeID,
            userID: userId,
            processMap: { nodes: nodes, edges: edges },
            lstTechnologyLists,
          });
          if (response.data.responseMessage == "Success") {
            // const message = "Update preferences applied successfully!  ";
            // handleShowAlert("success", message);
            navigateHome();
          }
        }

        break;
      case "UF":
        {
          console.log("save project case UF");
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
            filtrateFlux: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.filtrateFlux,
                "LMH",
                unit.selectedUnits[4]
              ).toFixed(2)
            ),
            backwashFlux: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.backwashFlux,
                "LMH",
                unit.selectedUnits[4]
              ).toFixed(2)
            ),
            cEBFlux: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.cEBFlux,
                "LMH",
                unit.selectedUnits[4]
              ).toFixed(2)
            ),
            forwardFlushFlow: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.forwardFlushFlow,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ),
            airFlow: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.airFlow,
                "Nm³/h",
                unit.selectedUnits[18]
              ).toFixed(2)
            ),
            aerationAirFlow: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.aerationAirFlow,
                "Nm³/h",
                unit.selectedUnits[18]
              ).toFixed(2)
            ),
            recycleFlowRate: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.recycleFlowRate,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ),
            recycleFlowRate_MiniCIP: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.recycleFlowRate_MiniCIP,
                "m³/h",
                unit.selectedUnits[1]
              ).toFixed(2)
            ),
            uFModuleID: parseInt(UFData.uFModuleID),
            flow_FF1: Number(UFData.flow_FF1),
            flow_FF2: Number(UFData.flow_FF2),
            flow_FF3: Number(UFData.flow_FF3),
            flow_FF4: Number(UFData.flow_FF4),
            aDBWDisplacement: Number(UFData.aDBWDisplacement),
            fTLDisplacement: Number(UFData.fTLDisplacement),
            typicalWaitDuration_Dupont: Number(
              UFData.typicalWaitDuration_Dupont
            ),
            typicalPumpRamp_Dupont: Number(UFData.typicalPumpRamp_Dupont),
            typicalWaitDuration_Inge: Number(UFData.typicalWaitDuration_Inge),
            typicalPumpRamp_Inge: Number(UFData.typicalPumpRamp_Inge),
            typicalWaitDuration_Memcor: Number(
              UFData.typicalWaitDuration_Memcor
            ),
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
            uFCIPStandbyTrainOptionID: parseInt(
              UFData.uFCIPStandbyTrainOptionID
            ),
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
            backwash_Filtration: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.backwash_Filtration,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            acidCEB_Filtration: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.acidCEB_Filtration,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            alkaliCEB_Filtration: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.alkaliCEB_Filtration,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            cIP_Filtration: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.cIP_Filtration,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
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
            maxAirScourPressure: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.maxAirScourPressure,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            maxAirProcPressure: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.maxAirProcPressure,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            filteratePressure: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.filteratePressure,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            nonIntegraPacTrainPresDrop: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.nonIntegraPacTrainPresDrop,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            integraPacFiltrationPreDrop: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.integraPacFiltrationPreDrop,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            backwashPipingPreDrop: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.backwashPipingPreDrop,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            cIPPipingPreDrop: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.cIPPipingPreDrop,
                "bar",
                unit.selectedUnits[3]
              ).toFixed(2)
            ),
            uFPowerID: Number(UFData.uFPowerID),
            pLCPowerReqPertrain: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.pLCPowerReqPertrain,
                "kW",
                unit.selectedUnits[9]
              ).toFixed(2)
            ),
            volvePowerReqPerTrain: Number(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                UFData.volvePowerReqPerTrain,
                "kW",
                unit.selectedUnits[9]
              ).toFixed(2)
            ),
            uFValvesID: Number(UFData.uFValvesID),
            valvesPerTrain: Number(UFData.valvesPerTrain),
            valveOpenCloseDuration: Number(UFData.valveOpenCloseDuration),
            uFCEBID: Number(UFData.uFCEBID),
            uFCEBWaterTypeID: parseInt(UFData.uFCEBWaterTypeID),
            ceb_AirScour: Number(UFData.ceb_AirScour),
            backWash1_CEB: Number(UFData.backWash1_CEB),
            backWash2_CEB: Number(UFData.backWash2_CEB),
            cEBTemperature: parseInt(UFData.cEBTemperature),
            chemicalSoakingDuration_CEB: parseInt(
              UFData.chemicalSoakingDuration_CEB
            ),
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
            chemicalSoakingDuration_CIP: Number(
              UFData.chemicalSoakingDuration_CIP
            ),
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
            heatingStepDuration_MiniCIP: Number(
              UFData.heatingStepDuration_MiniCIP
            ),
            lSI_MiniCIP: Number(UFData.lSI_MiniCIP),
            recycleDuration_MiniCIP: Number(UFData.recycleDuration_MiniCIP),
            recycleTemperature_MiniCIP: Number(
              UFData.recycleTemperature_MiniCIP
            ),
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
          const MethodName = { Method: "uf/api/v1/SaveUFData" };
          const UFRequestDetails = {
            ...MethodName,
            ...data,
            ["drinkingWater_Ind"]: isForDrinkingWater,
            ["userID"]: loggedInUserID,
            ["projectID"]: projectID,
            ["caseID"]: caseID,
            ["treatmentName"]: "UF",
            ["treatmentObjID"]: treatmentObjID,
          };
          dispatch(setUfDataUpdate(false));
          navigateHome();
          let autoSaveUFResponse = await POSTUFAutoSaveData(UFRequestDetails);
          if (autoSaveUFResponse?.data?.responseMessage == "Success") {
            console.log(
              "***********  UF AUTOSAVE ON UF SubMenu Change- success",
              autoSaveUFResponse?.data
            );
            // callUFDetailsAPI();
          } else {
            //SHOW POPUP or show API ERROR PAGE ---
            console.log(
              "***********  UF AUTOSAVE ON UF SubMenu Change- failed"
            );
            throw new MyError(
              "UF Auto Save Functionality Failed",
              403,
              "ApiError"
            );
          }
        }
        break;
      case "IXOS":
        {
          console.log("save project case IXOS");
        }
        break;
      case "IXB":
        {
          console.log("save project case1 IXB");
        }

        break;
      case "IXN":
        {
          console.log("save project case1 IXN");
        }
        break;
      case "IXD":
        {
          console.log("save project case1 IXD");
          var dummyListFinal = [];
          if (
            ixStoreObj.viewReport === "true" &&
            ixStore.evaluteExisting_ind == true
          ) {
            dummyListFinal = ixStoreObj?.listFinalParamAdj;
          } else {
            dummyListFinal = ixStoreObj?.existingPlantDescription;
          }
          console.log(
            "PK dummyListFinal s",
            ixStoreObj?.existingPlantDescription,
            ixStoreObj?.listFinalParamAdj
          );
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
            var dummyArray = Array.from(
              { length: vesselCount },
              (_, index) => ({
                resinType:
                  ixStoreObj.resinData[ixStoreObj[`resinName${index + 1}`]],
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
              })
            );
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
          console.log("PK dummyListFinal after s", dummyListFinal);
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
           let anionAverageConduc= ixRegenreteDose[1]?.averageConductivityVal;
           let cationendpointConduc = ixRegenreteDose[0]?.endpointConductivityVal;
           let anionendpointConduc= ixRegenreteDose[1]?.endpointConductivityVal;
           if (Ra) {
             cationRegenreteDoseVel = 
               GlobalUnitConversion(
                GlobalUnitConversionStore,
                ixRegenreteDose[0]?.regenerantDoseVal4,
                "g/L",
                unit.selectedUnits[14]

             );
             cationAverageConduc = 
               GlobalUnitConversion(
                GlobalUnitConversionStore,
                ixRegenreteDose[0]?.averageConductivityVal,
                "µS/cm",
                unit.selectedUnits[17]
             );
             cationendpointConduc = 
               GlobalUnitConversion(
                GlobalUnitConversionStore,
                ixRegenreteDose[0]?.endpointConductivityVal,
                "µS/cm",
                unit.selectedUnits[17]
             );
           }
           if (Rd) {
             anionRegenreteDoseVel = 
               GlobalUnitConversion(
                GlobalUnitConversionStore,
                ixRegenreteDose[1]?.regenerantDoseVal4,
                "g/L",
                unit.selectedUnits[14]
             );
             anionAverageConduc =  GlobalUnitConversion(
              GlobalUnitConversionStore,
              ixRegenreteDose[1]?.averageConductivityVal,
              "µS/cm",
              unit.selectedUnits[17]
             );
             anionendpointConduc = 
             GlobalUnitConversion(
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
          //   effluentVal = GlobalUnitConversion(
          //     GlobalUnitConversionStore,
          //     effluentValue,
          //     "µatm",
          //     unit.selectedUnits[6]
          //   );
          // }else if (selectedEffluent === 3) {
          //   // if (unit.selectedUnits[19] === "mg/L KMnO₄") {
          //   //   effluentVal = GlobalUnitConversion(
          //   //     GlobalUnitConversionStore,
          //   //     effluentValue,
          //   //     "mg/L TOC",
          //   //     "mg/L KMnO₄"
          //   //   );
          //   // } else if (unit.selectedUnits[19] === "mg/L TOC") {
          //   //   effluentVal = GlobalUnitConversion(
          //   //     GlobalUnitConversionStore,
          //   //     effluentValue,
          //   //     "mg/L KMnO₄",
          //   //     "mg/L TOC"
          //   //   );
          //   // }
          //   effluentVal = GlobalUnitConversion(
          //     GlobalUnitConversionStore,
          //     effluentValue,
          //     "mg/L TOC",
          //     unit.selectedUnits[19] 
          //   );
          // }
          /*----Unit conversion for Vessel Regeneration end-----*/
          const MethodName = { Method: "ix/api/v1/IXData" };
          const IXData_Method_Body = {
            ...MethodName,
            ...ixStore,
            ["treatmentObjID"] :caseTreatmentID,
            ["caseTreatmentID"]:caseTreatmentID,
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
                ["averageConductivityVal"]:Number(cationAverageConduc?.toFixed(2)),
                ["endpointConductivityVal"]:Number(cationendpointConduc?.toFixed(2)),
              },
              {
                ...ixStore.listProductQualityandregeneration[1],
                ["regenerantDoseVal4"]:Number(anionRegenreteDoseVel?.toFixed(2)),
                ["averageConductivityVal"]:Number(anionAverageConduc?.toFixed(2)),
                ["endpointConductivityVal"]: Number(anionendpointConduc?.toFixed(2)),
              },
            ],
            listFinalParamAdj: dummyListFinal,
            treatmentName: "IXD",
          };
          let PostResponseValues = await IXData_PostData(IXData_Method_Body);
          navigateHome();
          dispatch(setIXDUpdate(false));

          console.log(
            "save responseMessage",
            PostResponseValues.data.responseMessage
          );
          if (PostResponseValues.data.responseMessage == "Success") {
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
        }

        break;
      case "IXMB":
        {
          console.log("save project case1 IXMB");
        }
        break;
      case "IXCP":
        {
          console.log("save project case IXCP");
        }
        break;
      case "EDI":
        {
          console.log("save project case EDI");
        }
        break;
      case "IXSD":
        {
          console.log("save project case IXSD");
        }
        break;
      case "Report":
        {
          console.log("save project case REPORT");
        }
        break;
      default: {
        console.log("save project default===========>");
      }
    }
    console.log("save icon save success last");
  };

  const [getAllData, responseData] = useLazyGetAllDataQuery();
  const [getSystemData, responseSystemData] = useLazyGetAllDataQuery();
  let [recentProject, setRecentProject] = useState([]);

  const userID = userId;

  useEffect(() => {
    if (response.isSuccess) {
      const url =
        feedWaterData.caseID === 0
          ? `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
              feedWaterData.projectID
            }`
          : `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
              feedWaterData.projectID
            }&caseID=${feedWaterData.caseID}`;
      //  const url=`masterdata/api/v${1}/SystemDesign?userID=${1}&projectID=${projectid}`;
      console.log("url value", url);
      getSystemData(url);
    }
  }, [response]);
  useEffect(() => {
    if (responseSystemData.isSuccess) {
      console.log("PK kdufhdskjfhd secon", responseSystemData.data);
      dispatch(setNodeAndEdge({...responseSystemData.data,["flow"]:(Number(GlobalUnitConversion(GlobalUnitConversionStore,responseSystemData.data.flow,unit.selectedUnits[1],"m³/h").toFixed(2)))}));
      // dispatch(setNodeAndEdge(responseSystemData.data));
    }
  }, [responseSystemData]);
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setOpenNewProjectPopup(false);
    }
  };
  useEffect(() => {
    try {
      getAllData(`masterdata/api/v1/ProjectRecent?userID=${userID}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(responseData);

    if (responseData.isLoading) {
      console.log("Loading");
    } else {
      console.log("Loading1");

      if (responseData.isSuccess === true) {
        console.log("Success");

        setRecentProject(responseData.data);
      }
    }
    if (responseData.isError) {
      throw new MyError(
        "ProjectRecent Api Error",
        responseData.error.status,
        "ApiError"
      );
    }
  }, [responseData]);
  const handleNavigate = () => {
    if (location.pathname === "/FeedWaterHome") {
      if (tab == "System Design" && isDataUpdated) {
        setSaveWarning(true);
      } else if (tab == "Feed Setup" && dataisChanged) {
        setSaveWarning(true);
      } else if (tab == "UF" && isUfDataUpdated) {
        setSaveWarning(true);
      } else if (tab == "IXD" && ixStoreObj.isIXDDataUpdated) {
        setSaveWarning(true);
      } else {
        navigate("/home");
        dispatch(updateTabAvailable({"FeedSetup":false,"IXD":false}));
      }
    }
  };
  //checking page scroll behavior of feedSetup
  useEffect(() => {
    const headerChange =
      scrollDirection === "down" && feedCheck === "Feed Setup";
    console.log("headerChange", headerChange);
    setHeader(headerChange);
  }, [scrollDirection]);

  const handleOnclick = (project) => {
    const obj = { ...ProjectInfoStore };
    obj.projectID = project.projectID;
    obj.caseId = 0;
    obj.projectName = project.projectName;
    obj.Tchnology = project.technologyName;
    obj.case = project.technologyName;
    dispatch(updateProjectInfo(obj));
  };
  return (
    <>
      {openNewProject && (
        <CreateNewProjectModal
          CPmodal={updateCreateprojc}
          show={openNewProject}
          close={setOpenNewProject}
        />
      )}
      <ProjectSaveWarning
        show={saveWarning}
        close={(a) => {
          setSaveWarning(false);
          navigate("/home");
        }}
        yes={() => saveData(currentPanel)}
      />

      <SecondaryMenuStyled scrollDirection={scrollDirection}>
        <Row className="feed-water-header-row g-0">
          <Col
            lg={8}
            md={8}
            sm={8}
            xs={8}
            className="d-flex select-menu-column"
          >
            <Dropdown>
              <Dropdown.Toggle>File Access</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpenNewProject}>
                  New Project
                  {/* <NewProjectModal show={openNewProject} close={setOpenNewProject}/> */}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShowOpenProject}>
                  Open Project
                  <OpenProject show={openProject} close={setOpenProject} />
                </Dropdown.Item>
                <Dropdown.Item className="recent-project">
                  Recent Projects
                  <DropRightIcon />
                  <ul className="recent-project-submenu list-unstyled">
                    {[...recentProject].reverse().map((project) => (
                      <li
                        onClick={() => {
                          handleOnclick(project);
                          console.log("ProjectData", project);
                          navigate("/FeedWaterHome", {
                            state: {
                              title: project.projectName,
                              projectID: project.projectID,
                              technologyName: project.technologyName,
                              caseID: 0,
                            },
                          });
                        }}
                        key={project.projectID}
                      >
                        {project.projectName}
                      </li>
                    ))}
                  </ul>
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={handleOpenShareProject}>Share Project
                  <ShareProjectPageOne show={openShareProject} close={setOpenShareProject}/>
                </Dropdown.Item>
                <Dropdown.Item>Export Project</Dropdown.Item> */}
                <Dropdown.Item onClick={handleNavigate}>
                  Back to Home
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>Project Settings</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpenProjectInformation}>
                  Project Info & Details
                </Dropdown.Item>
                <ProjectInformationModal
                  show={projectInfo}
                  close={setProjectInfo}
                />
                <Dropdown.Item onClick={handleOpenManageCase}>
                  Manage Cases
                </Dropdown.Item>
                <ManageCase show={manageCase} close={setManageCase} />
                <Dropdown.Item onClick={handleOpenCurrencyUnits}>
                  Currency & Units
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOpenChemicalLibrary}>
                  Chemical Library & Operating Costs
                  <ProjectCostAndChemicalLibrary
                    show={openChemicalLibrary}
                    close={setOpenChemicalLibrary}
                    forUser={false}
                  />
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOpenPump}>
                  Pumps
                  <Pumps show={openPump} close={setOpenPump} forUser={false} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Button className="run-batch-btn">Run Batch</Button>
            <Button className="stacked-report-btn">Export Stacked Report</Button> */}
          </Col>

          {/* <CurrencyAndUnitPopUp show={currency} onHide={() => {e.stopPropagation();setShow(false);}} /> */}
          <CurrencyAndUnitPopUp
            show={currency}
            close={setCurrency}
            forUser={false}
          />

          <Col lg={4} md={4} sm={4} xs={4} className="d-flex icons-column">
            {/* <div className="save icon"> */}
            <div className="save icon" onClick={() => saveData(currentPanel)}>
              <SaveIcon />
            </div>

            {/* {openNewProjectPopup && (
              <ProjectSavePopup show="true" close="false" />
            )} */}

            {/* </div> */}
            {/* <div className="refresh icon">
              <RefreshIcon/>
            </div>
            <div className="file icon">
              <FeedWaterFileIcon/>
            </div>
            <div className="undo icon">
              <UndoIcon/>
            </div>
            <div className="redo icon">
              <RedoIcon/>
            </div> */}
          </Col>
        </Row>
      </SecondaryMenuStyled>
      {showAlert ? (
        <AlertPopUp
          type={alertData?.type}
          message={alertData?.message}
          close={handleHideAlert}
        />
      ) : null}
      {openNewProjectPopup && (
        <ProjectSavePopup
          show={openNewProjectPopup}
          close={() => {
            setOpenNewProjectPopup(false);
          }}
          message="Project saved successfully!!!!"
        />
      )}
    </>
  );
};

export default FeedWaterHeader;
