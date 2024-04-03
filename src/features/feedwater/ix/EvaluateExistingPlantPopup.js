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
