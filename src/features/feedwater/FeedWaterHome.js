import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../common/header/Header";
import SecondaryMenu from "./secondarymenu/SecondaryMenu";
import ActivityMonitor from "./activitymonitor/ActivityMonitor";
import QuickNav from "./quicknav/QuickNav";
import FeedWaterHomeStyled from "./FeedWaterHomeStyled";
import Footer from "../../common/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateDataMutation, useLazyGetAllDataQuery } from "../../services/apiConfig";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsDataUpdated, setLoading, setNodeAndEdge } from "./systemdesign/processDiagramSlice";
import "reactflow/dist/style.css";
import { MyError } from "../../common/utils/ErrorCreator";
import DynamicLoadder from "../../common/utils/DynamicLoadder";
import {
  updateCaseConfig,
  updateChemicalConfig,
  updateProjectCurrency,
  updateProjectData,
  updateProjectInfo,
  updateProjectTitle,
  updatePumpList,
  updateUnitConfig,
} from "../../common/ProjectInfoSlice";
import { updateUnitTypeArea, updateUnitTypeCVolume, updateUnitTypeConductivity, updateUnitTypeContentration, updateUnitTypeDensity, updateUnitTypeFlow, updateUnitTypeFlux, updateUnitTypeGasFlow, updateUnitTypeLVelocity, updateUnitTypeLength, updateUnitTypeOrganic, updateUnitTypePower, updateUnitTypePressure, updateUnitTypeRVolume, updateUnitTypeRegeneration, updateUnitTypeSVelocity, updateUnitTypeSVolume, updateUnitTypeTemp, updateUnitTypeWeight } from "../../common/utils/GlobalUnitConversionSlice";
import GlobalUnitConversion from "../../common/utils/GlobalUnitConversion";
import { setIXDUpdate, updateIXStore } from "./ix/IXDSlice";
import { UpdateUFReport } from "../../common/ReportUFSlice";
import { updateIXDJson } from "../../common/ReportIXDSlice";


const FeedWaterHome = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.Auth.customAttributes);
  const caseFlag = useSelector((state) => state.IXStore?.caseFlag);
  const [userData, setUserLoggedInInfo] = useState(userDetails || {});
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const newDesignExist = useSelector((state) => state.IXStore.newDesignExist);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const ixStore = useSelector((state) => state.IXStore.data);
  const TempixStore = useSelector((state) => state.IXStore.temdata);
  //const UserInof=useSelector((state)=>state.userInfo.data);
  const userId = UserInfoStore ? UserInfoStore.UserId : 1;
  const projectid = ProjectInfoStore ? ProjectInfoStore.projectID : 0;
  const caseId = ProjectInfoStore?.caseId ? ProjectInfoStore.caseId : 0;
  const location = useLocation();
  const [getData, response] = useLazyGetAllDataQuery();
  const [getUnitlist, unitDataResponse] = useLazyGetAllDataQuery();
  const [getChemical, chemicalResponse] = useLazyGetAllDataQuery();
  const [getPumps, pumpsResponse] = useLazyGetAllDataQuery();
  const [getCases, CasesResponse] = useLazyGetAllDataQuery();
  const [getProjectinfo, ProjectinfoResponse] = useLazyGetAllDataQuery();
  const [getCurrencylist, CurrencylistResponse] = useLazyGetAllDataQuery();
  const [getUFReportJSON, UFReportJSONResponse] = useLazyGetAllDataQuery();
  const [getIXReportJSON, IXReportJSONResponse] = useLazyGetAllDataQuery();

  const navigate = useNavigate();
  const { state } = useLocation();
  const [currentPanel, setCurrentPanel] = useState(-2);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const ixStoreObj = useSelector((state) => state.IXStore);
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );
  const lstTechnologyLists = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists
  );
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  const resinVal = useSelector((state) => state.IXStore.data?.listRegenConds);
  const ixStoreAdvance = useSelector(
    (state) => state.IXStore?.data?.listAdvRegen
  );
  //const _AdvanceRegenrete = useSelector((state) => state.IXStore.data?.listRegenConds);
  const ixRegenreteDose = useSelector(
    (state) => state.IXStore?.data?.listProductQualityandregeneration
  );
  const [IXData_PostData, { Umoiddata1 }] = useCreateDataMutation();
  useEffect(() => {
    if (UFReportJSONResponse.isSuccess) {
      console.log("UFReportJSONResponse.data",UFReportJSONResponse.data);
      dispatch(UpdateUFReport(UFReportJSONResponse.data));
    }
  }, [UFReportJSONResponse]);

  useEffect(() => {

    if (projectid !== 0) {

      dispatch(setLoading());
      getUnitlist(
        `${"masterdata/api/v1/UnitOfMeassure"}?userID=${userId}&projectID=${projectid}`
      );
      getProjectinfo(
        `masterdata/api/v1/ProjectInfo?userID=${userId}&projectID=${projectid}`
      );
      getPumps(
        `masterdata/api/v1/Pumps?userID=${userId}&projectID=${projectid}
      `
      );
      getChemical(
        `masterdata/api/v${1}/OperatingCostChemical?userid=${userId}&projectid=${projectid}`
      );
      getCases(`masterdata/api/v1/CaseType?projectID=${projectid}`);
      getCurrencylist(
        `${"masterdata/api/v1/DefaultCurrency"}?userID=${userId}&projectid=${projectid}`
        
      );
    }
  }, [state]);

  useEffect(() => {
    if (response.isLoading) {
      // console.log(" system desing category api is Loading");
      dispatch(setLoading());
    }
    if (response.isError) {
      // console.log(" system desing category api got error" ,response.error );
      throw new MyError(
        "SystemDesig Api Error",
        response.error.status,
        "ApiError"
      );
    }

    if (response.isSuccess) {
      // if (newDesignExist != true) {.length>
        // if(unit.selectedUnits.length>0){

        getUFReportJSON(
          `${"uf/api/v1/UFReportJSON"}?userID=${userId}&projectID=${projectid}&caseID=${response?.data?.caseID}`
        );

       
          getIXReportJSON(
            `${"ix/api/v1/IXReportJSON"}?userID=${userId}&projectID=${projectid}&caseID=${response?.data?.caseID}`
          );
       console.log("PK case setted");
        var listTreatmentID=response.data.systemDesignCaseTreatmentVM;
        let newFlowValue=Number(GlobalUnitConversion(GlobalUnitConversionStore,response.data.flow,unit.selectedUnits[1],"m³/h").toFixed(2));
        if(response.data.flow===0 || response.data.flow===1){
          newFlowValue=Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[1],"m³/h").toFixed(2));
        }

        dispatch(setNodeAndEdge({...response.data,["flow"]:newFlowValue}));
        dispatch(setIsDataUpdated());
      // }
      const obj = { ...ProjectInfoStore };
      obj.caseId = response?.data?.caseID;
      let projectName =
        location.state?.title?.length > 30
          ? location.state?.title
            ? `${location.state.title.substring(0, 30)}... - ${
                response.data.projectCaseName
              }`
            : ""
          : location.state?.title
          ? `${location.state.title} - ${response.data.projectCaseName}`
          : "";
    // if (caseFlag !== true) 
    // {
      dispatch(updateProjectTitle(projectName));
      autoSaveIXDData(listTreatmentID);
    // }
      // console.log("PK kdhhfhf", location?.state);

      dispatch(updateProjectInfo(obj));
    }
    // }
  }, [response]);

  const autoSaveIXDData = (listTreatmentID) => {
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
   
    const MethodName = { Method: "ix/api/v1/AutoSaveIXData" };
    const IXData_Method_Body = {
      ...MethodName,
      ...ixStore,
      ["treatmentObjID"] :listTreatmentID&& listTreatmentID[listTreatmentID.length-1]?.caseTreatmentID,
      ["caseTreatmentID"]:listTreatmentID&& listTreatmentID[listTreatmentID.length-1]?.caseTreatmentID,
      ["caseID"]:state.caseID === 0?ixStore.caseID:state.caseID,
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
          ["regenerantDoseVal4"]: cationRegenreteDoseVel,
          ["averageConductivityVal"]:cationAverageConduc,
          ["endpointConductivityVal"]: cationendpointConduc,
        },
        {
          ...ixStore.listProductQualityandregeneration[1],
          ["regenerantDoseVal4"]: anionRegenreteDoseVel,
          ["averageConductivityVal"]:anionAverageConduc,
          ["endpointConductivityVal"]: anionendpointConduc,
        },
      ],
      listFinalParamAdj: dummyListFinal,
      // ["treatmentObjID"] :caseTreatmentID,
      // ["caseTreatmentID"]:caseTreatmentID,
    };
    let PostResponseValues = IXData_PostData(IXData_Method_Body);
    dispatch(setIXDUpdate(false));


   
  };
  useEffect(() => {

    if (unitDataResponse.isError) {
      throw new MyError(
        "SystemDesig Api Error",
        unitDataResponse.error.status,
        "ApiError"
      );
    }

    if (unitDataResponse.isSuccess) {
      let unitFlow=unitDataResponse.data[0].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitTemp=unitDataResponse.data[1].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitPressure=unitDataResponse.data[2].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitFlux=unitDataResponse.data[3].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitArea=unitDataResponse.data[4].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitContentration=unitDataResponse.data[5].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitDensity=unitDataResponse.data[6].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitLength=unitDataResponse.data[7].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitPower=unitDataResponse.data[8].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitSVelocity=unitDataResponse.data[9].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitSVolume=unitDataResponse.data[10].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitRVloume=unitDataResponse.data[11].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitCVolume=unitDataResponse.data[12].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitRegeneration=unitDataResponse.data[13].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitLVelocity=unitDataResponse.data[14].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitWeight=unitDataResponse.data[15].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitConductivity=unitDataResponse.data[16].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitGasFlow=unitDataResponse.data[17].unitKey?.find((unit)=>unit.isSelected==true).uomName;
      let unitOrganic=unitDataResponse.data[18].unitKey?.find((unit)=>unit.isSelected==true).uomName;

      dispatch(updateUnitTypeFlow(unitFlow));
      dispatch(updateUnitTypeTemp(unitTemp));
      dispatch(updateUnitTypePressure(unitPressure));
      dispatch(updateUnitTypeFlux(unitFlux));
      dispatch(updateUnitTypeArea(unitArea));
      dispatch(updateUnitTypeContentration(unitContentration));
      dispatch(updateUnitTypeDensity(unitDensity));
      dispatch(updateUnitTypeLength(unitLength));
      dispatch(updateUnitTypePower(unitPower));
      dispatch(updateUnitTypeSVelocity(unitSVelocity));
      dispatch(updateUnitTypeSVolume(unitSVolume));
      dispatch(updateUnitTypeRVolume(unitRVloume));
      dispatch(updateUnitTypeCVolume(unitCVolume));
      dispatch(updateUnitTypeRegeneration(unitRegeneration));
      dispatch(updateUnitTypeLVelocity(unitLVelocity));
      dispatch(updateUnitTypeWeight(unitWeight));
      dispatch(updateUnitTypeConductivity(unitConductivity));
      dispatch(updateUnitTypeGasFlow(unitGasFlow));
      dispatch(updateUnitTypeOrganic(unitOrganic));
      dispatch(updateUnitConfig(unitDataResponse.data));
      if (projectid !== 0) {
      const url =
      state.caseID === 0.
        ? `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
            state.projectID
          }`
        : `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
            state.projectID
          }&caseID=${state.caseID}`;
    //  const url=`masterdata/api/v${1}/SystemDesign?userID=${1}&projectID=${projectid}`;
    getData(url);
    }
  }
  }, [unitDataResponse]);

  useEffect(() => {
    if (chemicalResponse.isSuccess) {
      dispatch(updateChemicalConfig(chemicalResponse.data));
    }
  }, [chemicalResponse]);

  useEffect(() => {
    if (pumpsResponse.isSuccess) {
      dispatch(updatePumpList(pumpsResponse.data));
    }
  }, [pumpsResponse]);
  useEffect(() => {
    if (ProjectinfoResponse.isSuccess) {
      dispatch(updateProjectData(ProjectinfoResponse.data));
    }
  }, [ProjectinfoResponse]);
  useEffect(() => {
    if (CurrencylistResponse.isSuccess) {
      dispatch(updateProjectCurrency(CurrencylistResponse.data));
    }
  }, [CurrencylistResponse]);
  useEffect(() => {
    if (IXReportJSONResponse.isSuccess) {
      console.log("PK IXReportJSONResponse.data");
      dispatch(updateIXDJson(IXReportJSONResponse.data));
    }
  }, [IXReportJSONResponse]);
  

  useEffect(() => {
    if (CasesResponse.isSuccess) {
      let reorderData = [];
      console.log("PK CasesResponse.data",CasesResponse.data);
      // if (caseFlag === true) {
      //   let lastRecord = CasesResponse.data[CasesResponse.data.length - 1];
      //   reorderData.push({ ...lastRecord, displayOrder: 1 });
      //   CasesResponse.data.map((item, index) => {
      //     reorderData.push({ ...item, displayOrder: index + 2 });
      //   });
      //   reorderData.pop();
      // } else {
      reorderData = CasesResponse.data;
      // }
      dispatch(updateCaseConfig(reorderData));
    }
  }, [CasesResponse]);

  // console.log(scrollDirection);
  const checkFeed = localStorage.getItem("Feed Setup");
  // const scroll = useSelector((state)=>state.scroll.value);

  return (
    <>
      <FeedWaterHomeStyled fluid className="p-0">
        <Header />
        <SecondaryMenu currentPanel={currentPanel} />
        <ActivityMonitor setCurrentPanel={setCurrentPanel} />
        {/* <QuickNav /> Not in December scope */}
      </FeedWaterHomeStyled>
    </>
  );
};

export default FeedWaterHome;
