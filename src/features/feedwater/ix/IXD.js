import React, { useEffect, useId, useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import IXInitialization from "./IXInitialization";
import IXDStyled from "./IXDStyled";
import { Col, Container, Row } from "react-bootstrap";
import {
  useLazyGetAllDataQuery,
  useCreateDataMutation,
} from "../../../services/apiConfig";
import DuPont_logo_Red from "../../../common/assets/images/1280px-DuPont_logo_Red.svg";
import Wave_PRO_UF_Logo from "../../../common/assets/images/Wave-PRO-UF-Logo-02.svg";
import { useDispatch } from "react-redux";
import {
  updateDemineralization,
  updateIXStore,
  updateTest,
  updatelistFinalParamAdj,
  updateExisting,
  updateResinName1,
  updateResinName2,
  updateResinName3,
  updateResinName4,
  updateResinNameCalc,
  updateResinInertNameCalc,
  updateResinIonicCalc,
  updateVesselNameCalc,
  updateTabletIXMenuIcon,
  updateMenuIconHeader,
  updateIXMenuIconHeader,
  setIXDUpdate,
  updateProductQualityRegenerantDose,
  updateCaseFlag,
  updateResinDropDownData,
  updateResinData,
} from "./IXDSlice";
import VesselRegenerationSystem from "./VesselRegenerationSystem";
import ResinSelection from "./ResinSelection";
import RegenerationConditions from "./RegenerationConditions";
import AdvancedRegeneration from "./AdvancedRegeneration";
import Equipment from "./Equipment";
import { updateLoader } from "../../home/CardListSlice";
import ProductQualityRegenerantDose from "./ProductQualityRegenerantDose";
import ExistingPlantDescription from "./ExistingPlantDescription";
import FinalParameterAdjustment from "./FinalParameterAdjustment";
import Footer from "../../../common/footer/Footer";
import { toast } from "react-toastify";
import { setFeedFlowRate } from "../systemdesign/processDiagramSlice";
import { useSelector } from "react-redux";
import { MyError } from "../../../common/utils/ErrorCreator";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import TabletCloseMenuIcon from "../../../common/icons/TabletCloseMenuIcon";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../common/styles/Theme";
import {updateUnitTypeFlow,
  updateUnitFlag,
  updateUnitTypeConductivity,
  updateUnitTypeLength,
  updateUnitTypeRVolume,
  updateUnitTypeTemp,
  updateUnitTypeCVolume,
  updateUnitTypeSVelocity,
  updateUnitTypeContentration,
  updateUnitTypeRegeneration,
  updateUnitTypeOrganic
} from "../../../common/utils/GlobalUnitConversionSlice";
import { updateTabAvailable } from "../../../common/ReportIXDSlice";

const IXD = () => {
  const dispatch = useDispatch();
  const ixStoreObj = useSelector((state) => state.IXStore);
  const ixStore = useSelector((state) => state.IXStore.data);
  const { hasError, vesselFlags } = useSelector((state) => state.IXStore);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const [ixLeftpanel, setixLeftpanel] = useState("IXInitialization");
  const [ixLefNametpanel, setIxLefNametpanel] = useState(
    "Vessel & Regeneration System"
  );

  const {
    vessel1,
    vessel2,
    vessel3,
    vessel4,
    selectedEffluent,
    effluentValue,
  } = ixStore;
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const [getIXDetails, responseIXDetails] = useLazyGetAllDataQuery();
  const [getIXResin, responseIXResin] = useLazyGetAllDataQuery();
  const projectID = ProjectInfoStore.projectID,
    caseID = ProjectInfoStore.caseId,
    treatmentObjID = 5,
    ixTreatment = "IXD";
  const [Demineralization, setDemineralization] = useState();
  const Modeling = useSelector((state) => state.IXStore.modeling);
  const viewReport = useSelector((state) => state.IXStore.viewReport);
  const ixStore1 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 1)
  );
  const ixStore2 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 2)
  );
  // const { cationResin, anionResin } = useSelector(
  //   (state) => state.IXStore?.data
  // );
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );
  const caseTreatmentID2 = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists
  );
  const [getDemineralization, responseDemineralization] =
    useLazyGetAllDataQuery();
  const [selectedPanel, setSelectedPanel] = useState(1);
  const [isError, setIsError] = useState(false);
  const [defautVessel, setDefaultVtessel] = useState(false);
  const cationAdvRegen = useSelector(
    (state) => state.IXStore?.updateCationDataAdvRegen
  );
  const anionAdvRegen = useSelector(
    (state) => state.IXStore?.updateAnionDataAdvRegen
  );
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  const ixStoreCation = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[0]
  );
  const ixStoreAnion = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[1]
  );
  const {
    unitFlag,
    unitTypeFlow,
    unitTypeSVelocity,
    unitTypeConductivity,
    unitTypeRVolume,
    unitTypeLength,
    unitTypeTemp,
    unitTypeCVolume,
    unitTypeContentration,
    unitTypeRegeneration,
    unitTypeOrganic
  } = useSelector((state) => state.GUnitConversion);
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const [responseSuccessFlag,setResponseSuccessFlag]=useState(false);
  const {
    feedFlowRate,
  } = useSelector((state) => state.processDiagramSlice);
  const resinVal = useSelector((state) => state.IXStore.data?.listRegenConds);
  const caseFlag = useSelector((state) => state.IXStore?.caseFlag);
  const ixStoreAdvance = useSelector(
    (state) => state.IXStore?.data?.listAdvRegen
  );
  //const _AdvanceRegenrete = useSelector((state) => state.IXStore.data?.listRegenConds);
  const ixRegenreteDose = useSelector(
    (state) => state.IXStore?.data?.listProductQualityandregeneration
  );
  const jsonResinData = useSelector((state) => state.IXStore.jsonResinData);
  const resinStore = useSelector((state) => state.IXStore.resinData);
  var wac = resinStore.WAC;
  var wba = resinStore.WBA;
  var inert1 = resinStore.inert1;
  var sac = resinStore.SAC;
  var sba = resinStore.SBA;
  var inert2 = resinStore.inert2;
  
  let tradeID = 2;
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    // if (unitFlag) {
      console.log("feedFlowRate",feedFlowRate);
      console.log("feedFlowRate",unit.selectedUnits[1]);
      console.log("feedFlowRate",unitTypeFlow);
      dispatch(
        setFeedFlowRate({
          value: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedFlowRate,unit.selectedUnits[1],unitTypeFlow).toFixed(2))),
          name: "feedFlowRate",
        })
      );
      /*----Unit conversion for regenenConditionPage start-----*/
      let [a, b] = resinVal;
      let cationTemp = resinVal[0]?.temperature;
      let anionTemp = resinVal[1]?.temperature;
      if (a) {
        cationTemp = GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[0]?.temperature,
          unit.selectedUnits[2],
          unitTypeTemp
        );
      }
      if (b) {
        anionTemp = GlobalUnitConversion(
          GlobalUnitConversionStore,
          resinVal[1]?.temperature,
          unit.selectedUnits[2],
          unitTypeTemp
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
        cationRegenreteDoseVel = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[0]?.regenerantDoseVal4,
          unit.selectedUnits[14],
          unitTypeRegeneration
        );
        cationAverageConduc = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[0]?.averageConductivityVal,
          unit.selectedUnits[17],
          unitTypeConductivity
        );
        cationendpointConduc = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[0]?.endpointConductivityVal,
          unit.selectedUnits[17],
          unitTypeConductivity
        );
      }
      if (Rd) {
        anionRegenreteDoseVel = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[1]?.regenerantDoseVal4,
          unit.selectedUnits[14],
          unitTypeRegeneration
        );
        anionAverageConduc = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[0]?.averageConductivityVal,
          unit.selectedUnits[17],
          unitTypeConductivity
        );
        anionendpointConduc = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixRegenreteDose[0]?.endpointConductivityVal,
          unit.selectedUnits[17],
          unitTypeConductivity
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
          unit.selectedUnits[10],
          unitTypeSVelocity
        );
        cationDisVol = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStoreAdvance[0]?.displacementVolume,
          unit.selectedUnits[13],
          unitTypeCVolume
        );
        cationFasVol = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStoreAdvance[0]?.fatRinseVolume,
          unit.selectedUnits[13],
          unitTypeCVolume
        );
      }
      if (d) {
        anionregeneVel = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStoreAdvance[1]?.regenerationVelocity,
          unit.selectedUnits[10],
          unitTypeSVelocity
        );
        anionDisVol = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStoreAdvance[1]?.displacementVolume,
          unit.selectedUnits[13],
          unitTypeCVolume
        );
        anionFasVol = GlobalUnitConversion(
          GlobalUnitConversionStore,
          ixStoreAdvance[1]?.fatRinseVolume,
          unit.selectedUnits[13],
          unitTypeCVolume
        );
      }
      /*----Unit conversion for Advance Regeneration end-----*/
      /*----Unit conversion for Vessel Regeneration start-----*/
      // let effluentVal = effluentValue;

      // if (selectedEffluent === 2) {
      //   effluentVal = GlobalUnitConversion(
      //     GlobalUnitConversionStore,
      //     effluentValue,
      //     unit.selectedUnits[6],
      //     unitTypeContentration
      //   );
      // } else if (selectedEffluent === 3) {
      //   // if (unit.selectedUnits[19] === "mg/L KMnO₄") {
      //     // effluentVal = GlobalUnitConversion(
      //     //   GlobalUnitConversionStore,
      //     //   effluentValue,
      //     //   "mg/L KMnO₄",
      //     //   unit.selectedUnits[19]
            
      //   //   );
      //   // } else if (unit.selectedUnits[19] === "mg/L TOC") {
      //   //   effluentVal = GlobalUnitConversion(
      //   //     GlobalUnitConversionStore,
      //   //     effluentValue,
      //   //     "mg/L TOC",
      //   //     unit.selectedUnits[19]
      //   //   );
      //   // }
      //   effluentVal = GlobalUnitConversion(
      //     GlobalUnitConversionStore,
      //     effluentValue,
      //     unit.selectedUnits[19],
      //     unitTypeOrganic
      //   );
      // }

      /*----Unit conversion for Vessel Regeneration end-----*/
      dispatch(
        updateIXStore({
          ...ixStore,
          ["space_velocity_txt"]: GlobalUnitConversion(
            GlobalUnitConversionStore,
            ixStore.space_velocity_txt,
            unit.selectedUnits[10],
            unitTypeSVelocity
          ),
          // ["effluentValue"]: Math.round(effluentVal),
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
              // ["regenerationVelocity"]: cationregenVel,
              // ["displacementVolume"]:cationDisVol,
              // ["fatRinseVolume"]: cationFasVol,
              ["regenerantDoseVal4"]:Number(cationRegenreteDoseVel?.toFixed(2)),
              ["averageConductivityVal"]:Number(cationAverageConduc?.toFixed(2)),
              ["endpointConductivityVal"]: Number(cationendpointConduc?.toFixed(2)),
            },
            {
              ...ixStore.listProductQualityandregeneration[1],
              // ["regenerationVelocity"]: anionregeneVel,
              // ["displacementVolume"]:anionDisVol,
              // ["fatRinseVolume"]:anionFasVol,

              ["regenerantDoseVal4"]: Number(anionRegenreteDoseVel?.toFixed(2)),
              ["averageConductivityVal"]:Number(anionAverageConduc?.toFixed(2)),
              ["endpointConductivityVal"]: Number(anionendpointConduc?.toFixed(2)),
            },
          ],
        })
      );
      //console.log("print test??",GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.averageConductivityVal,unit.selectedUnits[17],unitTypeConductivity));
      console.log("unitFlag11",ixStoreCation.regenerantDoseVal4,unit.selectedUnits[14],unitTypeRegeneration);
      console.log("unitFlag",GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.regenerantDoseVal4,unit.selectedUnits[14],unitTypeRegeneration));
     // console.log("unitFlag",GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.regenerantDoseVal4,unit.selectedUnits[14],unitTypeRegeneration));
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            ["averageConductivityVal"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.averageConductivityVal,unit.selectedUnits[17],unitTypeConductivity),
            ["endpointConductivityVal"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.endpointConductivityVal,unit.selectedUnits[17],unitTypeConductivity),

            ["regenerantDoseVal4"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreCation.regenerantDoseVal4,unit.selectedUnits[14],unitTypeRegeneration),
          },
          {
          ...ixStoreAnion,
          ["averageConductivityVal"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreAnion.averageConductivityVal,unit.selectedUnits[17],unitTypeConductivity),
          ["endpointConductivityVal"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreAnion.endpointConductivityVal,unit.selectedUnits[17],unitTypeConductivity),
          ["regenerantDoseVal4"]: GlobalUnitConversion(GlobalUnitConversionStore,ixStoreAnion.regenerantDoseVal4,unit.selectedUnits[14],unitTypeRegeneration),
          }
        ])
      );

      let list = [...ixStoreObj.existingPlantDescription];
      const newList = list.map((item, index) => {
        // Object.keys(item).forEach(key=>item[key]=Number.parseFloat(GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinVolumeAsDelivered,unit.selectedUnits[12],unitTypeRVolume)).toFixed(2));
        let resinVolumeAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinVolumeAsDelivered,unit.selectedUnits[12],unitTypeRVolume);
        let inertResinVolume=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].inertResinVolume,unit.selectedUnits[12],unitTypeRVolume);
        let vesselDiameter=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].vesselDiameter,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinBedHeightAsDelivered,unit.selectedUnits[8],unitTypeLength);
        let resinBedStandardHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinBedStandardHeight,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsRegenerated=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinBedHeightAsRegenerated,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsExhausted=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].resinBedHeightAsExhausted,unit.selectedUnits[8],unitTypeLength);
        let inertBedHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].inertBedHeight,unit.selectedUnits[8],unitTypeLength);
        let vesselCylindricalHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].vesselCylindricalHeight,unit.selectedUnits[8],unitTypeLength);
        let vesselWallThickness=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.existingPlantDescription[index].vesselWallThickness,unit.selectedUnits[8],unitTypeLength);
        return { ...item, ["resinVolumeAsDelivered"]: Number.parseFloat(resinVolumeAsDelivered).toFixed(2),["inertResinVolume"]: Number.parseFloat(inertResinVolume).toFixed(2),["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),["resinBedHeightAsDelivered"]: Number.parseFloat(resinBedHeightAsDelivered).toFixed(2),["resinBedStandardHeight"]: Number.parseFloat(resinBedStandardHeight).toFixed(2),["resinBedHeightAsRegenerated"]: Number.parseFloat(resinBedHeightAsRegenerated).toFixed(2),["resinBedHeightAsExhausted"]: Number.parseFloat(resinBedHeightAsExhausted).toFixed(2),["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),["vesselCylindricalHeight"]: Number.parseFloat(vesselCylindricalHeight).toFixed(2),["vesselWallThickness"]: Number.parseFloat(vesselWallThickness).toFixed(2)};
      // return item;
      });
      dispatch(updateExisting(newList));
      let listFinal = [...ixStoreObj.listFinalParamAdj];
      const newListFinal = listFinal.map((item, index) => {
        let resinVolumeAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].resinVolumeAsDelivered,unit.selectedUnits[12],unitTypeRVolume);
        let inertResinVolume=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].inertResinVolume,unit.selectedUnits[12],unitTypeRVolume);
        let vesselDiameter=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].vesselDiameter,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsDelivered=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].resinBedHeightAsDelivered,unit.selectedUnits[8],unitTypeLength);
        let resinBedStandardHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].resinBedStandardHeight,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsRegenerated=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].resinBedHeightAsRegenerated,unit.selectedUnits[8],unitTypeLength);
        let resinBedHeightAsExhausted=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].resinBedHeightAsExhausted,unit.selectedUnits[8],unitTypeLength);
        let inertBedHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].inertBedHeight,unit.selectedUnits[8],unitTypeLength);
        let vesselCylindricalHeight=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].vesselCylindricalHeight,unit.selectedUnits[8],unitTypeLength);
        let vesselWallThickness=GlobalUnitConversion(GlobalUnitConversionStore,ixStoreObj.listFinalParamAdj[index].vesselWallThickness,unit.selectedUnits[8],unitTypeLength);
        return { ...item, ["resinVolumeAsDelivered"]: Number.parseFloat(resinVolumeAsDelivered).toFixed(2),["inertResinVolume"]: Number.parseFloat(inertResinVolume).toFixed(2),["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),["resinBedHeightAsDelivered"]: Number.parseFloat(resinBedHeightAsDelivered).toFixed(2),["resinBedStandardHeight"]: Number.parseFloat(resinBedStandardHeight).toFixed(2),["resinBedHeightAsRegenerated"]: Number.parseFloat(resinBedHeightAsRegenerated).toFixed(2),["resinBedHeightAsExhausted"]: Number.parseFloat(resinBedHeightAsExhausted).toFixed(2),["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),["vesselCylindricalHeight"]: Number.parseFloat(vesselCylindricalHeight).toFixed(2),["vesselWallThickness"]: Number.parseFloat(vesselWallThickness).toFixed(2)};
      // return item;
      });
      dispatch(updatelistFinalParamAdj(newListFinal));
      dispatch(updateUnitTypeSVelocity(unit.selectedUnits[10]));
      dispatch(updateUnitTypeRVolume(unit.selectedUnits[12]));
      dispatch(updateUnitTypeLength(unit.selectedUnits[8]));
      dispatch(updateUnitTypeConductivity(unit.selectedUnits[17]));
      dispatch(updateUnitTypeTemp(unit.selectedUnits[2]));
      dispatch(updateUnitTypeCVolume(unit.selectedUnits[13]));
      dispatch(updateUnitTypeRegeneration(unit.selectedUnits[14]));
      dispatch(updateUnitTypeContentration(unit.selectedUnits[6]));
      dispatch(updateUnitTypeFlow(unit.selectedUnits[1]));
      dispatch(updateUnitTypeOrganic(unit.selectedUnits[19]));
      dispatch(updateUnitFlag(false));
    // }
  }, [unit.selectedUnits]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsError(false);
      setIsLocationError(false);
    }
  };
  useEffect(() => {
    if (vessel1 === 0 || vessel2 === 0 || vessel3 === 0 || vessel4 === 0) {
      setDefaultVtessel(true);
    } else {
      setDefaultVtessel(false);
    }
  }, [vessel1, vessel2, vessel3, vessel4]);
  const [isLocationError, setIsLocationError] = useState(false);

  const objProductQuality = [
    {
      productQualityDoseID: 0,
      resinRegenerationID: 0,
      speciesLblNameID: 0,
      averageSpeciesVal: defautVessel ? 100 : 20,
      endpoingSpeciesVal: defautVessel ? 200 : 40,
      averageConductivityVal: defautVessel ? 1.07 : 0.22,
      endpointConductivityVal: defautVessel ? 1.07 : 0.22,
      speciesTwoLblNameID: 0,
      regenerantDoseLbl1ID: 0,
      regeneratDoseVal1: 0,
      regenerantDoseLbl2ID: 0,
      regenerantDoseLbl4ID: 0,
      regenerantDoseVal2: 0,
      regenerantDoseVal3: 0,
      regenerantDoseVal4: cationAdvRegen?.typicalValue?.regenerantDoseTypical,
      overAllEfficiency: 0,
      overAllComputation: 0,
      doseOptimization: 0,
      naturalEffect: 0,
      saftyFactorLbl: 0,
      saftyFactorVal: 0,
      speciesUnit: 1, ///
      volume: null,
      flowRate: null,
      time: null,
      regenerationRatio: cationAdvRegen?.typicalValue?.regenerantRatioTypical,
    },
    {
      productQualityDoseID: 0,
      resinRegenerationID: 0,
      speciesLblNameID: 0,
      averageSpeciesVal: defautVessel ? 100 : 20,
      endpoingSpeciesVal: defautVessel ? 200 : 40,
      averageConductivityVal: 0,
      endpointConductivityVal: 70,
      speciesTwoLblNameID: 0,
      regenerantDoseLbl1ID: 0,
      regeneratDoseVal1: 0,
      regenerantDoseLbl2ID: 0,
      regenerantDoseLbl4ID: 0,
      regenerantDoseVal2: 0,
      regenerantDoseVal3: 0,
      regenerantDoseVal4: anionAdvRegen?.typicalValue?.regenerantDoseTypical, ///dose
      overAllEfficiency: 0,
      overAllComputation: 0,
      doseOptimization: 0,
      naturalEffect: 0,
      saftyFactorLbl: 0,
      saftyFactorVal: 0,
      speciesUnit: 1,
      volume: null,
      flowRate: null,
      time: null,
      regenerationRatio: anionAdvRegen?.typicalValue?.regenerantRatioTypical,
    },
  ];

  const IxdLeftMenuFinal =
    ixStore.evaluteExisting_ind == true
      ? [
          {
            Id: 1,
            Name: "IXInitialization",
            Value: "IX Initialization",
          },
          {
            Id: 2,
            Name: "VesselRegeneration",
            Value: "Vessel & Regeneration System",
          },
          {
            Id: 3,
            Name: "ResinSelection",
            Value: "Resin Selection",
          },
          {
            Id: 4,
            Name: "RegenerationConditions",
            Value: "Regeneration Conditions",
          },
          {
            Id: 5,
            Name: "AdvancedRegeneration",
            Value: "Advanced Regeneration",
          },
          // {
          //   Id: 6,
          //   Name: "Equipment",
          //   Value: "Equipment",
          // },
          {
            Id: 7,
            Name: "ProductQuality",
            Value: "Product Quality & Regenerant Dose",
          },
          {
            Id: 8,
            Name: "ExistingPlant",
            Value: "Existing Plant Description",
          },
          // {
          //   Id: 9,
          //   Name: "FinalParameterAdjustments",
          //   Value: "Final Parameter Adjustments",
          // },
        ]
      : [
          {
            Id: 1,
            Name: "IXInitialization",
            Value: "IX Initialization",
          },
          {
            Id: 2,
            Name: "VesselRegeneration",
            Value: "Vessel & Regeneration System",
          },
          {
            Id: 3,
            Name: "ResinSelection",
            Value: "Resin Selection",
          },
          {
            Id: 4,
            Name: "RegenerationConditions",
            Value: "Regeneration Conditions",
          },
          {
            Id: 5,
            Name: "AdvancedRegeneration",
            Value: "Advanced Regeneration",
          },
          // {
          //   Id: 6,
          //   Name: "Equipment",
          //   Value: "Equipment",
          // },
          {
            Id: 7,
            Name: "ProductQuality",
            Value: "Product Quality & Regenerant Dose",
          },
          {
            Id: 9,
            Name: "FinalParameterAdjustments",
            Value: "Final Parameter Adjustments",
          },
        ];
  const IxdLeftMenu =
    ixStore.evaluteExisting_ind == true
      ? [
          {
            Id: 1,
            Name: "IXInitialization",
            Value: "IX Initialization",
          },
          {
            Id: 2,
            Name: "VesselRegeneration",
            Value: "Vessel & Regeneration System",
          },
          {
            Id: 3,
            Name: "ResinSelection",
            Value: "Resin Selection",
          },
          {
            Id: 4,
            Name: "RegenerationConditions",
            Value: "Regeneration Conditions",
          },
          {
            Id: 5,
            Name: "AdvancedRegeneration",
            Value: "Advanced Regeneration",
          },
          // {
          //   Id: 6,
          //   Name: "Equipment",
          //   Value: "Equipment",
          // },
          {
            Id: 7,
            Name: "ProductQuality",
            Value: "Product Quality & Regenerant Dose",
          },
          {
            Id: 8,
            Name: "ExistingPlant",
            Value: "Existing Plant Description",
          },
        ]
      : [
          {
            Id: 1,
            Name: "IXInitialization",
            Value: "IX Initialization",
          },
          {
            Id: 2,
            Name: "VesselRegeneration",
            Value: "Vessel & Regeneration System",
          },
          {
            Id: 3,
            Name: "ResinSelection",
            Value: "Resin Selection",
          },
          {
            Id: 4,
            Name: "RegenerationConditions",
            Value: "Regeneration Conditions",
          },
          {
            Id: 5,
            Name: "AdvancedRegeneration",
            Value: "Advanced Regeneration",
          },
          // {
          //   Id: 6,
          //   Name: "Equipment",
          //   Value: "Equipment",
          // },
          {
            Id: 7,
            Name: "ProductQuality",
            Value: "Product Quality & Regenerant Dose",
          },
        ];
  const [IXData_PostData, { Umoiddata }] = useCreateDataMutation();
  //ix/api/v1/AutoSaveIXData?userID=1&projectID=${ProjectInfoStore.projectID}
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
    // } else if (selectedEffluent === 3) {
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
    const MethodName = { Method: "ix/api/v1/AutoSaveIXData" };
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
    let PostResponseValues = await IXData_PostData(IXData_Method_Body);
    dispatch(setIXDUpdate(false));


    if (PostResponseValues.data?.responseMessage == "Success") {
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
  useEffect(() => {
    console.log("ProjectInfoStore", ProjectInfoStore.projectID);
    console.log("ixStore", ixStore);
    try {
      let flagId = 0;
      if (ProjectInfoStore.projectID != 0 && userID != 0) {
        const Url = `${"ix/api/v1/IXDetails"}?userID=${userID} &projectID=${ProjectInfoStore.projectID}&caseID=${caseID}&treatmentObjID=${caseFlag?caseTreatmentID2[caseTreatmentID2.length-1]?.caseTreatmentID:caseTreatmentID}`;
        console.log("API url ixd", Url);
        flagId = ProjectInfoStore.projectID;
        getIXDetails(Url);
        dispatch(updateCaseFlag(false));
        console.log("Project Id", ProjectInfoStore.projectID);
      }
    } catch {
      console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
    }
  }, [ProjectInfoStore.projectID, userID]);
  //useEffect(() => {
  // try {
  //   SaveUpdatedData();
  //} catch {
  // console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
  //}
  //}, [ProjectInfoStore.projectID, userID]);
  // useEffect(() => {
  //   const cationName = vesselData?.find(
  //     (item) => item.ixResinArrangmentID === cationResin
  //   )?.resinArrangmentName;
  //   const anionName = vesselData?.find(
  //     (item) => item.ixResinArrangmentID === anionResin
  //   )?.resinArrangmentName;
  //   const resultName = {
  //     cationName: cationName,
  //     anionName: anionName,
  //   };
  //   dispatch(updateVesselNameCalc(resultName));
  // }, [cationResin, anionResin]);
  // useEffect(() => {
  //   try {
  //     SaveUpdatedData();
  //     console.log("Sona");
  //   } catch {
  //     console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
  //   }
  // }, [ixLeftpanel]);
  useEffect(()=>{
    // try {
      let apiUrl = `${"ix/api/v1/IXResin"}?userID=${userID
      }&projectID=${ProjectInfoStore.projectID}&validdesignID=${
        ixStore.validDesignID
      }&processID=${7}`;
      if (ixStore.vessel1 !== null) {
        apiUrl += `&vessel1=${ixStore.vessel1}`;
      }
      if (ixStore.vessel2 !== null) {
        apiUrl += `&vessel2=${ixStore.vessel2}`;
      }
      if (ixStore.vessel3 !== null) {
        apiUrl += `&vessel3=${ixStore.vessel3}`;
      }
      if (ixStore.vessel4 !== null) {
        apiUrl += `&vessel4=${ixStore.vessel4}`;
      }
      if (tradeID !== null) {
        apiUrl += `&tradeID=${tradeID}`;
      }
      console.log("PK apiUrl",apiUrl);
      console.log("PK responseSuccessFlag",responseSuccessFlag);
      if(responseSuccessFlag){
        console.log("PK responseSuccessFlag if");
        getIXResin(apiUrl);
      }
    // } catch {
    //   console.log("Error: Fetch IXResin data");
    // }
  },[responseSuccessFlag]);
  useEffect(() => {
    console.log("responseIXDetails in IXD", responseIXDetails);
    if (responseIXDetails.isLoading) {
      console.log("Loading");
    } else {
      if (responseIXDetails.isSuccess === true) {
        setResponseSuccessFlag(true);
        // setdefaultIXDetails(responseIXDetails.data);
        // var newObj ={"Name":"Ramesh",
        // "LastName":"Sharma"
        // };
        // const obj = {...ixStore1};
        // let keys = Object.keys(newObj);
        // keys.map(x=>{
        //   obj[x] =  newObj[x];
        // });
        // dispatch(updateTest(newObj));
        // console.log("update newObj", newObj);
        // console.log("ixstore", ixStore);
        // console.log("responseIXDetails.data", responseIXDetails.data);
        let data1 = null;
        let data2 = null;
        let data3 = null;
        let data4 = null;
        if (responseIXDetails?.data?.cationResin === 3) {
          data1 = "WAC";
          data2 = null;
        } else if (responseIXDetails?.data?.cationResin === 2) {
          data1 = "SAC";
          data2 = null;
        } else if (
          responseIXDetails?.data?.cationResin === 5 ||
          responseIXDetails?.data?.cationResin === 6 ||
          responseIXDetails?.data?.cationResin === 7
        ) {
          data1 = "WAC";
          data2 = "SAC";
        }
        if (responseIXDetails?.data?.anionResin === 4) {
          data3 = "WBA";
          data4 = null;
        } else if (responseIXDetails?.data?.anionResin === 1) {
          data3 = "SBA";
          data4 = null;
        } else if (
          responseIXDetails?.data?.anionResin === 11 ||
          responseIXDetails?.data?.anionResin === 12 ||
          responseIXDetails?.data?.anionResin === 13
        ) {
          data3 = "WBA";
          data4 = "SBA";
        }
        if (
          responseIXDetails?.data?.anionResin ===
            responseIXDetails?.data?.cationResin &&
          responseIXDetails?.data?.anionResin !== null
        ) {
          data1 = "SAC";
          data2 = "SBA";
        }
        if (data1 !== null && data2 === null) {
          data2 = data3;
          data3 = data4;
          data4 = null;
        }
        dispatch(updateResinName1(data1));
        dispatch(updateResinName2(data2));
        dispatch(updateResinName3(data3));
        dispatch(updateResinName4(data4));
        
        const fetchedList = responseIXDetails?.data?.listFinalParamAdj;
        const finalList = fetchedList?.map((obj, index) => ({
          ...obj,
          resinName: eval(`data${index + 1}`),
        }));
        dispatch(updateExisting(finalList));
        dispatch(updatelistFinalParamAdj(finalList));
        const obj = { ...ixStore };
        const newObj = responseIXDetails?.data;
        let keys = Object.keys(newObj);
        keys.map((x) => {
          obj[x] = newObj[x];
        });
        obj.userID = userID;
        obj.projectID = ProjectInfoStore.projectID;
        obj.caseID = caseID;
        obj.treatmentObjID = caseTreatmentID;
        obj.caseTreatmentID =caseTreatmentID;
        obj.selectedProcessID = 7;
        obj.treatmentName = "IXD";
        if (unit.selectedUnits[10] !== "BV/h") {
          /*----Unit conversion for Advance Regeneration start-----*/
          let [c, d] = ixStoreAdvance;
          let cationregenVel = ixStoreAdvance[0]?.regenerationVelocity;
          let anionregeneVel = ixStoreAdvance[1]?.regenerationVelocity;
          if (c) {
            cationregenVel = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[0]?.regenerationVelocity,
              unit.selectedUnits[10],
              "BV/h"
              
            );
          }
          if (d) {
            anionregeneVel = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[1]?.regenerationVelocity,
              unit.selectedUnits[10],
              "BV/h"
            );
          }
          /*----Unit conversion for Advance Regeneration end-----*/

          obj.space_velocity_txt = GlobalUnitConversion(
            GlobalUnitConversionStore,
            responseIXDetails.data.space_velocity_txt,
            unit.selectedUnits[10],
            "BV/h"
          );

          obj.listAdvRegen = [
            {
              ...obj.listAdvRegen[0],
              ["regenerationVelocity"]: Number(cationregenVel?.toFixed(2)),
            },
            {
              ...obj.listAdvRegen[1],
              ["regenerationVelocity"]: Number(anionregeneVel?.toFixed(2)),
            },
          ];
        }
        if (unit.selectedUnits[13] !== "BV") {
          /*----Unit conversion for Advance Regeneration start-----*/
          let [e, f] = ixStoreAdvance;
          let cationDisVol = ixStoreAdvance[0]?.displacementVolume;
          let anionDisVol = ixStoreAdvance[1]?.displacementVolume;
          let cationFasVol = ixStoreAdvance[0]?.fatRinseVolume;
          let anionFasVol = ixStoreAdvance[1]?.fatRinseVolume;
          if (e) {
            cationDisVol = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[0].displacementVolume,
              unit.selectedUnits[13],
              "BV"
           
            );
            cationFasVol = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[0].fatRinseVolume,
              unit.selectedUnits[13],
              "BV",
              
            );
          }
          if (f) {
            anionDisVol = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[1].displacementVolume,
              unit.selectedUnits[13],
              "BV"
           
            );
            anionFasVol = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails.data?.listAdvRegen[1].fatRinseVolume,
              unit.selectedUnits[13],
              "BV"
            );
          }
          /*----Unit conversion for Advance Regeneration end-----*/

          obj.listAdvRegen = [
            {
              ...obj.listAdvRegen[0],
              ["displacementVolume"]: cationDisVol,
              ["fatRinseVolume"]: cationFasVol,
            },
            {
              ...obj.listAdvRegen[1],
              ["displacementVolume"]: anionDisVol,
              ["fatRinseVolume"]: anionFasVol,
            },
          ];
        }
        if (unit.selectedUnits[2] !== "°C") {
          let [a, b] = responseIXDetails.data.listRegenConds;
          let cationTemp =
            responseIXDetails.data?.listRegenConds[0]?.temperature;
          let anionTemp = responseIXDetails.data?.listRegenConds[1]?.temperature;
          if (a) {
            cationTemp = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails?.data?.listRegenConds[0]?.temperature,
              unit.selectedUnits[2],
              "°C"
            );
          }
          if (b) {
            anionTemp = GlobalUnitConversion(
              GlobalUnitConversionStore,
              responseIXDetails?.data?.listRegenConds[1]?.temperature,
              unit.selectedUnits[2],
              "°C"
            );
          }
          obj.listRegenConds = [
            { ...obj.listRegenConds[0], ["temperature"]: cationTemp },
            { ...obj.listRegenConds[1], ["temperature"]: anionTemp },
          ];
        }
        if (
          unit.selectedUnits[6] !== "µatm" ||
          unit.selectedUnits[19] !== "mg/L TOC"
        ) {
          /*----Unit conversion for Vessel Regeneration start-----*/
          // let effluentVal = effluentValue;
          // if (selectedEffluent === 2) {
          //   effluentVal = GlobalUnitConversion(
          //     GlobalUnitConversionStore,
          //     responseIXDetails.data?.effluentValue,
          //     unit.selectedUnits[6],
          //     "µatm"
              
          //   );
          // } else if (selectedEffluent === 3) {
            
          //     effluentVal = GlobalUnitConversion(
          //       GlobalUnitConversionStore,
          //       responseIXDetails.data?.effluentValue,
          //       unit.selectedUnits[19],
          //       "mg/L TOC"
          //     );
            
            
          // }
       
          // obj.effluentValue = Math.round(effluentVal);
          /*----Unit conversion for Vessel Regeneration end-----*/
        }
        if (unit.selectedUnits[12] !== "m³") {
          let list = [...obj.listFinalParamAdj];
          const newList = list.map((item, index) => {
            let resinVolumeAsDelivered = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].resinVolumeAsDelivered,
              unit.selectedUnits[12],
              "m³"
            );
            let inertResinVolume = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].inertResinVolume,
              unit.selectedUnits[12],
              "m³"
            );
            return {
              ...item,
              ["resinVolumeAsDelivered"]: Number.parseFloat(
                resinVolumeAsDelivered
              ).toFixed(2),
              ["inertResinVolume"]:
                Number.parseFloat(inertResinVolume).toFixed(2),
            };
          });
          obj.listFinalParamAdj = newList;
          dispatch(updateExisting(newList));
          dispatch(updatelistFinalParamAdj(newList));
        }
        if (unit.selectedUnits[8] !== "mm") {
          let list = [...obj.listFinalParamAdj];
          const newList = list.map((item, index) => {
            let vesselDiameter = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].vesselDiameter,
              unit.selectedUnits[8],
              "mm"
            );
            let resinBedHeightAsDelivered = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].resinBedHeightAsDelivered,
              unit.selectedUnits[8],
              "mm"
            );
            let resinBedStandardHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].resinBedStandardHeight,
              unit.selectedUnits[8],
              "mm"
            );
            let resinBedHeightAsRegenerated = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].resinBedHeightAsRegenerated,
              unit.selectedUnits[8],
              "mm"
            );
            let resinBedHeightAsExhausted = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].resinBedHeightAsExhausted,
              unit.selectedUnits[8],
              "mm"
            );
            let inertBedHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].inertBedHeight,
              unit.selectedUnits[8],
              "mm"
            );
            let vesselCylindricalHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].vesselCylindricalHeight,
              unit.selectedUnits[8],
              "mm"
            );
            let vesselWallThickness = GlobalUnitConversion(
              GlobalUnitConversionStore,
              obj.listFinalParamAdj[index].vesselWallThickness,
              unit.selectedUnits[8],
              "mm"
            );
            return {
              ...item,
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
          obj.listFinalParamAdj = newList;
          dispatch(updateExisting(newList));
          dispatch(updatelistFinalParamAdj(newList));
        }
        console.log("pawan chouhan???",unit.selectedUnits[14]);
        // obj.ixTreatment = "IXD";
        console.log(
          "listProductQualityandregeneration1",
          obj.listProductQualityandregeneration.length
        );
        if (unit.selectedUnits[17] !== "µS/cm") {
          obj.averageConductivityVal = GlobalUnitConversion(
            GlobalUnitConversionStore,
            responseIXDetails?.data?.averageConductivityVal,
            unit.selectedUnits[17],
            "µS/cm"
          );
          obj.endpointConductivityVal = GlobalUnitConversion(
            GlobalUnitConversionStore,
            responseIXDetails?.data?.endpointConductivityVal,
            unit.selectedUnits[17],
            "µS/cm"
          );
        }
        // if(unit.selectedUnits[17]!=="mS/cm"){
        //   obj.averageConductivityVal=GlobalUnitConversion(GlobalUnitConversionStore,responseIXDetails?.data?.averageConductivityVal,unit.selectedUnits[17],"mS/cm");
        //   obj.endpointConductivityVal=GlobalUnitConversion(GlobalUnitConversionStore,responseIXDetails?.data?.endpointConductivityVal,unit.selectedUnits[17],"mS/cm");
        // }

        obj.ixTreatment = "IXD";
        console.log(
          "listProductQualityandregeneration1",
          obj.listProductQualityandregeneration.length
        );
        if (obj.listProductQualityandregeneration.length <= 0) {
          console.log(
            "listProductQualityandregenerationP",
            obj.listProductQualityandregeneration.length
          );

          obj.listProductQualityandregeneration = objProductQuality;
          if(unit.selectedUnits[14]!=="g/L"){
            let list=[...objProductQuality];
            const newList = list.map((item, index) => {
              let regenerantDoseVal4=GlobalUnitConversion(GlobalUnitConversionStore,list[index].regenerantDoseVal4,unit.selectedUnits[14],"g/L");    
              return { ...item, ["regenerantDoseVal4"]: Number.parseFloat(regenerantDoseVal4).toFixed(2)};
            });
            obj.listProductQualityandregeneration=newList;
          }
        }
        // if(unit.selectedUnits[14]!=="g/L"){
        //   // obj.listProductQualityandregeneration[0].regenerantDoseVal4=GlobalUnitConversion(GlobalUnitConversionStore,responseIXDetails?.data?.listProductQualityandregeneration[0].regenerantDoseVal4,unit.selectedUnits[14],"g/L");
        //   // obj.listProductQualityandregeneration[1].regenerantDoseVal4=GlobalUnitConversion(GlobalUnitConversionStore,responseIXDetails?.data?.listProductQualityandregeneration[1].regenerantDoseVal4,unit.selectedUnits[14],"g/L");
        // }
        if(unit.selectedUnits[14]!=="g/L"){
          let list=[...responseIXDetails.data.listProductQualityandregeneration];
          const newList = list.map((item, index) => {
            let regenerantDoseVal4=GlobalUnitConversion(GlobalUnitConversionStore,list[index].regenerantDoseVal4,unit.selectedUnits[14],"g/L");         
            return { ...item, ["regenerantDoseVal4"]: Number.parseFloat(regenerantDoseVal4).toFixed(2)};
          });
          obj.listProductQualityandregeneration=newList;
        }

        // if (
        //   obj.listFinalParamAdj.length <= 1 ||
        //   (obj.listFinalParamAdj !== ixStore.listFinalParamAdj &&
        //     ixStore.listFinalParamAdj.length > 1)
        // ) {
        //   obj.listFinalParamAdj = ixStore.listFinalParamAdj;
        // }
        dispatch(updateIXStore(obj));
        dispatch(setIXDUpdate(false));
        console.log("Update ixstore", ixStore);
      }
    }
    if (responseIXDetails.isError) {
      throw new MyError(
        "IXDetails Api Error",
        responseIXDetails.error.status,
        "ApiError"
      );
    }
  }, [responseIXDetails]);
  useEffect(() => {
    if (responseIXResin.isLoading) {
      console.log("loading");
      // dispatch(updateLoader(true));
    } else {
      console.log("PK responseIXResin",responseIXResin);
      if (responseIXResin.isSuccess === true) {
        console.log("PK responseIXResin in if",responseIXResin.data);
        setResponseSuccessFlag(false);
        // dispatch(updateLoader(false));
        // setResinData(responseIXResin.data.responseResinSelections);
        dispatch(
          updateResinDropDownData(responseIXResin.data.responseResinSelections)
        );
      }
    }
    if (responseIXResin.isError) {
      throw new MyError(
        "IXResin Api Error",
        responseIXResin.error.status,
        "ApiError"
      );
    }
  }, [responseIXResin]);
  useEffect(()=>{
    wac = jsonResinData
    ?.find((item) => item.resinName === "WAC")
    ?.listIXResins.find(
      (item) => item.ResinId === ixStore1[0]?.ixResinID1
    );
    sac = jsonResinData
        ?.find((item) => item.resinName === "SAC")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore1[0]?.ixResinID2
        );
        wba = jsonResinData
        ?.find((item) => item.resinName === "WBA")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore2[0]?.ixResinID1
        );
        sba = jsonResinData
        ?.find((item) => item.resinName === "SBA")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore2[0]?.ixResinID2
        );

  dispatch(
    updateResinData({
      ...resinStore,
      ["WAC"]: wac?wac.ResinName:null,
      ["SAC"]: sac?sac.ResinName:null,
      ["WBA"]: wba?wba.ResinName:null,
      ["SBA"]: sba?sba.ResinName:null,
      ["resinId1"]: wac?wac.ResinId:null,
      ["resinId2"]: sac?sac.ResinId:null,
      ["resinId3"]: wba?wba.ResinId:null,
      ["resinId4"]: sba?sba.ResinId:null,
    })
  );
  },[jsonResinData]);
  useEffect(() => {
    try {
      getDemineralization(
        `${"ix/api/v1/IXInitializationData"}?userID=${userID} &projectID=${
          ProjectInfoStore.projectID
        }&ixTreatment=${ixTreatment}`
      );
    } catch {
      console.log("Error: Fetch IXInitializationData data");
    }
  }, []);
  useEffect(() => {
    if (responseDemineralization.isLoading) {
      dispatch(updateLoader(true));
    } else {
      if (responseDemineralization.isSuccess === true) {
        dispatch(updateLoader(false));
        dispatch(updateDemineralization(responseDemineralization.data));
      }
    }
    if (responseDemineralization.isError) {
      throw new MyError(
        "Demineralization Api Error",
        responseDemineralization.error.status,
        "ApiError"
      );
    }
  }, [responseDemineralization]);
  const updateIXLeftpanel = (data) => {
    // let panelHasError = hasError.find((item) => item.id === selectedPanel);

    // if (!panelHasError.hasError) {
    //   setixLeftpanel(data.Name);
    //   setSelectedPanel(data.Id);
    //   try {
    //     SaveUpdatedData();
    //   } catch {
    //     console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
    //   }
    // } else {
    //   // alert("Please fill all the fields");
    //   setIsError(true);
    // }
    /////////////////////////////////
    const {
      cationResin,
      anionResin,
      vessel1,
      vessel2,
      vessel3,
      vessel4,
      listRegenConds,
    } = ixStore;
    let dumyVessel1 = vesselFlags["vesselflag1"] ? true : vessel1 !== null;
    let dumyVessel2 = vesselFlags["vesselflag2"] ? true : vessel2 !== null;
    let dumyVessel3 = vesselFlags["vesselflag3"] ? true : vessel3 !== null;
    let dumyVessel4 = vesselFlags["vesselflag4"] ? true : vessel4 !== null;
    let validator = false;
    if (
      ixStoreObj.selectedcationResign === "[WAC]" &&
      ixStoreObj.selectedanionResign === "[WBA] - [SBA]" &&
      ixStore.degasifation_ind === true &&
      ixStore.location === null
    ) {
      let locationFlag = false;
      validator =
        cationResin &&
        anionResin &&
        dumyVessel1 &&
        dumyVessel2 &&
        dumyVessel3 &&
        dumyVessel4 &&
        locationFlag;
    } else {
      validator =
        cationResin &&
        anionResin &&
        dumyVessel1 &&
        dumyVessel2 &&
        dumyVessel3 &&
        dumyVessel4;
    }

    const canMove = {
      IXInitialization: true,
      VesselRegeneration: true,
      ResinSelection: validator,
      RegenerationConditions: validator,
      AdvancedRegeneration:
        validator &&
        listRegenConds.length == 2 &&
        listRegenConds[0]?.regenerantID &&
        listRegenConds[1]?.regenerantID,
      Equipment: validator,
      ProductQuality:
        validator &&
        listRegenConds.length == 2 &&
        listRegenConds[0]?.regenerantID &&
        listRegenConds[1]?.regenerantID,
      ExistingPlant:
        validator &&
        listRegenConds.length == 2 &&
        listRegenConds[0]?.regenerantID &&
        listRegenConds[1]?.regenerantID,
      FinalParameterAdjustments: validator,
    };
    console.log("data.Name", data.Name);
    console.log("canMove[data.Name]", canMove[data.Name]);
    if (canMove[data.Name]) {
      setixLeftpanel(data.Name);
      setSelectedPanel(data.Id);
      setIxLefNametpanel(data.Value);
    } else {
      console.log("data.Name", data.Name);
      if (
        data.Name == "ProductQuality" ||
        data.Name == "AdvancedRegeneration" ||
        data.Name == "ExistingPlant"
      ) {
        if (canMove["RegenerationConditions"]) {
          setIxLefNametpanel("Regeneration Conditions");
        }
      }
      if (
        ixStore.cationResin === 3 &&
        ixStore.anionResin === 11 &&
        ixStore.degasifation_ind === true &&
        ixStore.location === null
      ) {
        setIsLocationError(true);
      } else {
        setIsError(true);
      }
    }
    // setixLeftpanel(data.Name);
    // setSelectedPanel(data.Id);
    try {
      SaveUpdatedData();
    } catch {
      console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
    }
  };

  const getSelectedPanel = (id) => {
    switch (id) {
      case 1:
        return (
          <div>
            <IXInitialization />
          </div>
        );

      case 2:
        return (
          <div>
            <VesselRegenerationSystem />
          </div>
        );

      case 3:
        return (
          <div>
            <ResinSelection />
          </div>
        );

      case 4:
        return (
          <div>
            <RegenerationConditions />
          </div>
        );

      case 5:
        return (
          <div>
            <AdvancedRegeneration />
          </div>
        );

      // case 6:
      //   return (
      //     <div>
      //       <Equipment />
      //     </div>
      //   );

      case 7:
        return (
          <div>
            <ProductQualityRegenerantDose />
          </div>
        );

      case 8:
        return (
          <div>
            <ExistingPlantDescription />
          </div>
        );

      case 9:
        return (
          <div>
            <FinalParameterAdjustment />
          </div>
        );
    }
  };
  const headerIXMenuIconStatus = useSelector(
    (state) => state.IXStore.tabletMenuIcon
  );
  const [tabletView, setTabletView] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setTabletView(true);
      dispatch(updateTabletIXMenuIcon(tabletView));
    } else {
      setTabletView(false);
      dispatch(updateTabletIXMenuIcon(tabletView));
    }
  }; //show side menu for width >=1300

  useEffect(() => {
    handleResize(); // set initial state based on window size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabletView]);
  const handleCloseSideMenu = () => {
    dispatch(updateIXMenuIconHeader(!headerIXMenuIconStatus));
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home");
    dispatch(updateTabAvailable({"FeedSetup":false,"IXD":false}));
  };
  return (
    <>
      <IXDStyled
        tabletView={tabletView}
        headerMenuIconStatus={headerIXMenuIconStatus}
      >
        <Tabs>
          <div className="ixd-steps-column tablist_overlay">
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
                {viewReport === "true"
                  ? IxdLeftMenuFinal?.map((data) => (
                      <div
                        className={`react-tabs__tab ${
                          selectedPanel == data.Id ? "selectedTab" : ""
                        }`}
                        key={data.Id}
                      >
                        <h4 onClick={() => updateIXLeftpanel(data)}>
                          {data.Value}
                        </h4>
                      </div>
                    ))
                  : IxdLeftMenu?.map((data) => (
                      <div
                        className={`react-tabs__tab ${
                          selectedPanel == data.Id ? "selectedTab" : ""
                        }`}
                        key={data.Id}
                      >
                        <h4 onClick={() => updateIXLeftpanel(data)}>
                          {data.Value}
                        </h4>
                      </div>
                    ))}
                {/* {IxdLeftMenu?.map((data) => (
                    <div
                      className={`react-tabs__tab ${
                        selectedPanel == data.Id ? "selectedTab" : ""
                      }`}
                      key={data.Id}
                    >
                      <h4 onClick={() => updateIXLeftpanel(data)}>
                        {data.Value}
                      </h4>
                    </div>
                  ))} */}
              </TabList>
            </div>
          </div>
          <div className="ixd__tabs__details__view">
            {getSelectedPanel(selectedPanel)}
          </div>
        </Tabs>
        {isError && (
          <ProjectErrorPopup
            show={isError}
            close={() => {
              setIsError(false);
            }}
            message={`The ${ixLefNametpanel} is not correctly specified`}
          />
        )}
        {isLocationError && (
          <ProjectErrorPopup
            show={isLocationError}
            close={() => {
              setIsLocationError(false);
            }}
            message="The IX Degasification Location is not correctly specified"
          />
        )}
      </IXDStyled>
    </>
  );
};

export default IXD;
