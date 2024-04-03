import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import CloseBlackIcon from "../../../common/icons/CloseBlackIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardLinkSButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkSButtonWithIcon";
import EvaluateExistingPlantPopupStyled from "./EvaluateExistingPlantPopupStyled";
import WarningIcon from "../../../common/icons/WarningIcon";
import {
  updateIXStore,
  updateNewDesignExist,
  updateExistingNew,
  updateEvaluateExistFlag,
  updateCaseFlag,
  setIXDUpdate,
} from "./IXDSlice";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import { updateProjectTitle } from "../../../common/ProjectInfoSlice";
import {
  updateCaseConfig,
  updateCaseName,
} from "../../../common/ProjectInfoSlice";
import SystemDesign from "../systemdesign/SystemDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
  useCreateDataMutation,
} from "../../../services/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
const EvaluateExistingPlantPopup = ({ show, close }) => {
  const [caseList, setCaseList] = useState([]);
  const [getData, response] = useLazyGetAllDataQuery();
  const [EvaluateExisting_PostData, { Umoiddata }] = useCreateDataMutation();
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const [updateData, responseUpdate] = useUpdateDataMutation();
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ixStoreObj = useSelector((state) => state.IXStore);
  const ixStore = useSelector((state) => state.IXStore.data);
  const caseTreatmentID = useSelector(
    (state) =>
      state.processDiagramSlice.lstTechnologyLists.find(
        (item) => item?.technologyID == 5 && !item?.isDeleted
      )?.caseTreatmentID
  );
  const ixResinID1 = ixStore?.selectedResinList[0]?.ixResinID1;
  const ixResinID2 = ixStore?.selectedResinList[0]?.ixResinID2;
  const ixResinID3 = ixStore?.selectedResinList[1]?.ixResinID1;
  const ixResinID4 = ixStore?.selectedResinList[1]?.ixResinID2;
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
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
    if (response.isFetching) {
      console.log("PK Manege case is in Loading");
    } else if (response.isLoading) {
      console.log("PK Manege case is in Loading");
    } else if (response.isSuccess) {
      console.log("PK Manege case response.data", response.data);
      let reorderData = [];
      let lastRecord = response.data[response.data.length - 1];
      // autoSaveIXDData(lastRecord.caseID);
      navigate("/FeedWaterHome", {
        state: {
          projectID: ProjectInfoStore.projectID,
          technologyName: ProjectInfoStore.technologyName,
          title: location.state.title,
          caseID: lastRecord.caseID,
        },
      });

      let projectName =
      ProjectInfoStore?.projectName?.length > 30
          ? ProjectInfoStore?.projectName
            ? `${ProjectInfoStore.projectName.substring(0, 30)}... - ${
                lastRecord.caseName
              }`
            : ""
          : ProjectInfoStore?.projectName
          ? `${ProjectInfoStore.projectName} - ${lastRecord.caseName}`
          : "";

      dispatch(updateProjectTitle(projectName));
      dispatch(updateEvaluateExistFlag(true));
    }

    if (response.isError) {
      throw new MyError(
        "PK CaseType Api Error",
        response.error.status,
        "ApiError"
      );
    }
  }, [response]);
  // const autoSaveIXDData = async (caseID) => {
  //   const existingData = {
  //     ...ixStore,
  //     existingPlantDescription: ixStoreObj.existingPlantDescription,
  //   };
  //   dispatch(updateIXStore(existingData));
  //   var dummyListFinal = [];
  //   if (
  //     ixStoreObj.viewReport === "true" &&
  //     ixStore.evaluteExisting_ind == true
  //   ) {
  //     dummyListFinal = ixStoreObj?.existingPlantDescription;
  //   } else {
  //     dummyListFinal = ixStoreObj?.listFinalParamAdj;
  //   }
  //   if (dummyListFinal.length <= 1) {
  //     let vesselCount = 0;
  //     if (ixStoreObj.resinName4 !== null) {
  //       vesselCount = 4;
  //     } else if (ixStoreObj.resinName3 !== null) {
  //       vesselCount = 3;
  //     } else if (ixStoreObj.resinName2 !== null) {
  //       vesselCount = 2;
  //     } else {
  //       vesselCount = 1;
  //     }
  //     var dummyArray = Array.from({ length: vesselCount }, (_, index) => ({
  //       resinType: ixStoreObj.resinData[ixStoreObj[`resinName${index + 1}`]],
  //       resinName: ixStoreObj[`resinName${index + 1}`],
  //       resinId:
  //         ixStoreObj[`resinName${index + 1}`] == "WAC"
  //           ? ixResinID1
  //           : ixStoreObj[`resinName${index + 1}`] == "SAC"
  //           ? ixResinID2
  //           : ixStoreObj[`resinName${index + 1}`] == "WBA"
  //           ? ixResinID3
  //           : ixResinID4,
  //       vesselNo: index + 1,
  //       resinVolumeAsDelivered: 0,
  //       vesselDiameter: 0,
  //       resinBedHeightAsDelivered: 0,
  //       resinBedStandardHeight: 0,
  //       resinBedHeightAsExhausted: 0,
  //       resinBedHeightAsRegenerated: 0,
  //       inertResinVolume: 0,
  //       inertBedHeight: 0,
  //       freeBoard: 0,
  //       vesselCylindricalHeight: 0,
  //       vesselWallThickness: 0,
  //       pressureDropwithRecomQty: 0,
  //       resinPackagingSize: 0,
  //       ixfpaRadioButtonID: 0,
  //     }));
  //     if (vesselCount > 1) {
  //       dummyListFinal = dummyArray;
  //     }
  //   }
  //   let list = [...dummyListFinal];
  //   dummyListFinal = list.map((item, index) => {
  //     let resinVolumeAsDelivered = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.resinVolumeAsDelivered,
  //       "m³",
  //       unit.selectedUnits[12]
  //     );
  //     let inertResinVolume = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.inertResinVolume,
  //       "m³",
  //       unit.selectedUnits[12]
  //     );
  //     let vesselDiameter = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.vesselDiameter,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let resinBedHeightAsDelivered = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.resinBedHeightAsDelivered,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let resinBedStandardHeight = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.resinBedStandardHeight,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let resinBedHeightAsRegenerated = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.resinBedHeightAsRegenerated,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let resinBedHeightAsExhausted = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.resinBedHeightAsExhausted,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let inertBedHeight = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.inertBedHeight,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let vesselCylindricalHeight = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.vesselCylindricalHeight,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     let vesselWallThickness = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       item.vesselWallThickness,
  //       "mm",
  //       unit.selectedUnits[8]
  //     );
  //     return {
  //       ...item,
  //       ["resinVolumeAsDelivered"]: Number.parseFloat(
  //         resinVolumeAsDelivered
  //       ).toFixed(2),
  //       ["inertResinVolume"]: Number.parseFloat(inertResinVolume).toFixed(2),
  //       ["vesselDiameter"]: Number.parseFloat(vesselDiameter).toFixed(2),
  //       ["resinBedHeightAsDelivered"]: Number.parseFloat(
  //         resinBedHeightAsDelivered
  //       ).toFixed(2),
  //       ["resinBedStandardHeight"]: Number.parseFloat(
  //         resinBedStandardHeight
  //       ).toFixed(2),
  //       ["resinBedHeightAsRegenerated"]: Number.parseFloat(
  //         resinBedHeightAsRegenerated
  //       ).toFixed(2),
  //       ["resinBedHeightAsExhausted"]: Number.parseFloat(
  //         resinBedHeightAsExhausted
  //       ).toFixed(2),
  //       ["inertBedHeight"]: Number.parseFloat(inertBedHeight).toFixed(2),
  //       ["vesselCylindricalHeight"]: Number.parseFloat(
  //         vesselCylindricalHeight
  //       ).toFixed(2),
  //       ["vesselWallThickness"]:
  //         Number.parseFloat(vesselWallThickness).toFixed(2),
  //     };
  //   });

  //   /*----Unit conversion for regenenConditionPage start-----*/
  //   let [a, b] = resinVal;
  //   let cationTemp = resinVal[0]?.temperature;
  //   let anionTemp = resinVal[1]?.temperature;
  //   if (a) {
  //     cationTemp = Number(
  //       GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         resinVal[0]?.temperature,
  //         "°C",
  //         unit.selectedUnits[2]
  //       ).toFixed(2)
  //     );
  //   }
  //   if (b) {
  //     anionTemp = Number(
  //       GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         resinVal[1]?.temperature,
  //         "°C",
  //         unit.selectedUnits[2]
  //       ).toFixed(2)
  //     );
  //   }
  //   let [Ra, Rd] = ixRegenreteDose;
  //   // averageConductivityVal
  //    let cationRegenreteDoseVel = ixRegenreteDose[0]?.regenerantDoseVal4;
  //    let anionRegenreteDoseVel = ixRegenreteDose[1]?.regenerantDoseVal4;
  //    let cationAverageConduc = ixRegenreteDose[0]?.averageConductivityVal;
  //    let anionAverageConduc= ixRegenreteDose[1]?.averageConductivityVal;
  //    let cationendpointConduc = ixRegenreteDose[0]?.endpointConductivityVal;
  //    let anionendpointConduc= ixRegenreteDose[1]?.endpointConductivityVal;
  //    if (Ra) {
  //      cationRegenreteDoseVel = 
  //        GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         ixRegenreteDose[0]?.regenerantDoseVal4,
  //         "g/L",
  //         unit.selectedUnits[14]

  //      );
  //      cationAverageConduc = 
  //        GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         ixRegenreteDose[0]?.averageConductivityVal,
  //         "µS/cm",
  //         unit.selectedUnits[17]
  //      );
  //      cationendpointConduc = 
  //        GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         ixRegenreteDose[0]?.endpointConductivityVal,
  //         "µS/cm",
  //         unit.selectedUnits[17]
  //      );
  //    }
  //    if (Rd) {
  //      anionRegenreteDoseVel = 
  //        GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         ixRegenreteDose[1]?.regenerantDoseVal4,
  //         "g/L",
  //         unit.selectedUnits[14]
  //      );
  //      anionAverageConduc =  GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixRegenreteDose[1]?.averageConductivityVal,
  //       "µS/cm",
  //       unit.selectedUnits[17]
  //      );
  //      anionendpointConduc = 
  //      GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixRegenreteDose[1]?.endpointConductivityVal,
  //       "µS/cm",
  //       unit.selectedUnits[17]
  //      );
  //    }
  //   /*----Unit conversion for regenenConditionPage end-----*/
  //   /*----Unit conversion for Advance Regeneration start-----*/
  //   let [c, d] = ixStoreAdvance;
  //   let cationregenVel = ixStoreAdvance[0]?.regenerationVelocity;
  //   let anionregeneVel = ixStoreAdvance[1]?.regenerationVelocity;
  //   let cationDisVol = ixStoreAdvance[0]?.displacementVolume;
  //   let anionDisVol = ixStoreAdvance[1]?.displacementVolume;
  //   let cationFasVol = ixStoreAdvance[0]?.fatRinseVolume;
  //   let anionFasVol = ixStoreAdvance[1]?.fatRinseVolume;
  //   if (c) {
  //     cationregenVel = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[0]?.regenerationVelocity,
  //       "BV/h",
  //       unit.selectedUnits[10]
  //     );
  //     cationDisVol = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[0]?.displacementVolume,
  //       "BV",
  //       unit.selectedUnits[13]
  //     );
  //     cationFasVol = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[0]?.fatRinseVolume,
  //       "BV",
  //       unit.selectedUnits[13]
  //     );
  //   }
  //   if (d) {
  //     anionregeneVel = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[1]?.regenerationVelocity,
  //       "BV/h",
  //       unit.selectedUnits[10]
  //     );
  //     anionDisVol = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[1]?.displacementVolume,
  //       "BV",
  //       unit.selectedUnits[13]
  //     );
  //     anionFasVol = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       ixStoreAdvance[1]?.fatRinseVolume,
  //       "BV",
  //       unit.selectedUnits[13]
  //     );
  //   }
   
  //   const MethodName = { Method: "ix/api/v1/AutoSaveIXData" };
  //   const IXData_Method_Body = {
  //     ...MethodName,
  //     ...ixStore,
  //     ["treatmentObjID"] :caseTreatmentID,
  //     ["caseTreatmentID"]:caseTreatmentID,
  //     ["caseID"]:caseID?caseID:ixStore.caseID,
  //     ["space_velocity_txt"]: Number(
  //       GlobalUnitConversion(
  //         GlobalUnitConversionStore,
  //         ixStore.space_velocity_txt,
  //         "BV/h",
  //         unit.selectedUnits[10]
  //       ).toFixed(2)
  //     ),
  //     // ["effluentValue"]: parseInt(effluentVal),
  //     listRegenConds: [
  //       { ...ixStore.listRegenConds[0], ["temperature"]: cationTemp },
  //       { ...ixStore.listRegenConds[1], ["temperature"]: anionTemp },
  //     ],
  //     listAdvRegen: [
  //       {
  //         ...ixStore.listAdvRegen[0],
  //         ["regenerationVelocity"]: Number(cationregenVel?.toFixed(2)),
  //         ["displacementVolume"]: Number(cationDisVol?.toFixed(2)),
  //         ["fatRinseVolume"]: Number(cationFasVol?.toFixed(2)),
  //       },
  //       {
  //         ...ixStore.listAdvRegen[1],
  //         ["regenerationVelocity"]: Number(anionregeneVel?.toFixed(2)),
  //         ["displacementVolume"]: Number(anionDisVol?.toFixed(2)),
  //         ["fatRinseVolume"]: Number(anionFasVol?.toFixed(2)),
  //       },
  //     ],
  //     listProductQualityandregeneration: [
  //       {
  //         ...ixStore.listProductQualityandregeneration[0],
  //         ["regenerantDoseVal4"]: cationRegenreteDoseVel,
  //         ["averageConductivityVal"]:cationAverageConduc,
  //         ["endpointConductivityVal"]: cationendpointConduc,
  //       },
  //       {
  //         ...ixStore.listProductQualityandregeneration[1],
  //         ["regenerantDoseVal4"]: anionRegenreteDoseVel,
  //         ["averageConductivityVal"]:anionAverageConduc,
  //         ["endpointConductivityVal"]: anionendpointConduc,
  //       },
  //     ],
  //     listFinalParamAdj: dummyListFinal,
  //     // ["treatmentObjID"] :caseTreatmentID,
  //     // ["caseTreatmentID"]:caseTreatmentID,
  //   };
  //   let PostResponseValues = await IXData_PostData(IXData_Method_Body);
  //   dispatch(setIXDUpdate(false));


  //   if (PostResponseValues.data?.responseMessage == "Success") {
  //     // toast.success("IXdata ,Record Updated successfully !", {
  //     //   position: toast.POSITION.TOP_RIGHT
  //     // });
  //     console.log("autoSaveIXResponse success");
  //   } else {
  //     // toast.error(PostResponseValues.data.message,"Record not Update !", {
  //     //   position: toast.POSITION.TOP_RIGHT
  //     // });
  //     console.log("autoSaveIXResponse falied");
  //   }
  // };
  const evaluateExistingPostData = async (flag) => {
    const MethodName = { Method: "ix/api/v1/EvaluateExistingPlant" };
    const EvaluateExistingPlant = {
      ...MethodName,
      userID: userID,
      projectID: ProjectInfoStore.projectID,
      caseID: ProjectInfoStore.caseId,
      copyFlag: flag,
    };
    console.log("PK EvaluateExistingPlant", EvaluateExistingPlant);
    let PostResponseValues = await EvaluateExisting_PostData(
      EvaluateExistingPlant
    );
    console.log("PK responseMessage", PostResponseValues);
    if (PostResponseValues.data == -1) {
      console.log("PK EvaluateExistingPlant success");
      getData(
        `masterdata/api/v1/CaseType?projectID=${ProjectInfoStore.projectID}`
      );
    } else {
      console.log("PK EvaluateExistingPlant falied");
    }
    // localStorage.setItem("feed setup", false);
    // setScrollCheck(!scrollCheck);
    // if (PostResponseValues.data.responseMessage == "Success") {
    //   console.log("PK EvaluateExistingPlant success");
    //   getData(
    //     `masterdata/api/v1/CaseType?projectID=${ProjectInfoStore.projectID}`
    //   );
    // } else {
    //   console.log("PK EvaluateExistingPlant falied");
    // }
  };
  const handleNew = () => {
    evaluateExistingPostData(false);
    dispatch(updateNewDesignExist(true));
    // dispatch(updateEvaluateExistFlag(true));
    dispatch(updateCaseFlag(true));
    dispatch(updateExistingNew("true"));

    close();
  };
  const handleCopy = () => {
    evaluateExistingPostData(true);
    dispatch(updateNewDesignExist(false));
    // dispatch(updateEvaluateExistFlag(true));
    dispatch(updateCaseFlag(true));
    dispatch(updateExistingNew("false"));
    close();
  };
  return (
    <>
      <StyledModal
        show={show}
        onHide={close}
        centered
        keyboard={false}
        backdrop="static"
        maxWidth="416px"
        isWarningPopUp={true}
      >
        {/* <Modal.Header>
            <StandardLinkSButtonWithIcon onClick={close} label={<CloseBlackIcon/>}/>
        </Modal.Header> */}
        <Modal.Body>
          <div className="warning-pop-up">
            <div>
              <WarningIcon />
            </div>
            <div>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="16px"
                fontWeight="400"
                label="Do you want to copy the existing design or start a new design?"
                color={colors.Black}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <StandardPrimaryButton label="Copy" disabled={false} onClick={() => {dispatch(updateIXStore({...ixStore,["flag_Evaluate_Type"]:true}));
            close;}}/> */}
          {/* {ixStore.listFinalParamAdj.length!==0 && <StandardPrimaryButton label="Copy" disabled={false} onClick={handleCopy}/>} */}
          <StandardPrimaryButton
            label="Copy"
            disabled={false}
            onClick={handleCopy}
          />
          {/* <StandardSecondaryButton label="New Design" disabled={false} onClick={() => {dispatch(updateIXStore({...ixStore,["flag_Evaluate_Type"]:false}));
            close;}}/> */}
          <StandardSecondaryButton
            label="New Design"
            disabled={false}
            onClick={handleNew}
          />
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default EvaluateExistingPlantPopup;
