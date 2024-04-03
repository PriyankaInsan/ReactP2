import React, { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import VesselRegenerationSystemStyled from "./VesselRegenerationSystemStyled";
import SystemDiagram from "./SystemDiagram";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";

import {
  updateError,
  updateIXStore,
  updateSelectedAnionResin,
  updateSelectedCationResin,
  updateVessel,
  updateViewReport,
  updateExistingNew,
  updateVesselforRange,
  updateResinName1,
  updateResinName2,
  updateResinName3,
  updateResinName4,
  updateVesselFlags,
  updateResinNameCalc,
  updateResinInertNameCalc,
  updateResinIonicCalc,
} from "./IXDSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SmallLoader from "../../../common/utils/SmallLoader";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import ToggleSwitch from "../../../common/styles/components/switches/CustomSwitch";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import ConformationPopup from "../../../common/ConformationPopup";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const VesselRegenerationSystem = () => {
  const dispatch = useDispatch();
  const [getIXVessel, responseIXVessel] = useLazyGetAllDataQuery();
  const [getRegeneration, responseRegeneration] = useLazyGetAllDataQuery();
  const [loader, setloader] = useState(false);
  const [vesselData, setvesselData] = useState();
  const [vesselDataSelection, setvesselDataSelection] = useState();
  const [AnionAndCation, setAnionAndCation] = useState([]);
  const [anionCationFlag, setAnionCationFlag] = useState(false);
  const [cation, setcation] = useState("");
  const [anion, setanion] = useState("");
  const [vesselflag1, setvesselflag1] = useState(true);
  const [vesselflag2, setvesselflag2] = useState(true);
  const [vesselflag3, setvesselflag3] = useState(true);
  const [vesselflag4, setvesselflag4] = useState(true);
  const [isError, setIsError] = useState(false);
  const [defaultAfterCation, setdefaultAfterCation] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isSumValid, setIsSumValid] = useState(false);
  const [message, setMessage] = useState("");
  const [baricon, setbaricon] = useState(true);
  const [effluent, seteffluent] = useState(null);
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixStoreObj = useSelector((state) => state.IXStore);
  const VesselStore = useSelector((state) => state.IXStore.vesselData);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const [CancelPopup, setCancelPopup] = useState(false);
  const [popuConformModal, setpopuConformModal] = useState(false);
  const [lblMessage, setlabelMesg] = useState(null);
  const [idDel, setIdDel] = useState(null);
  const [MethodName, setMethodName] = useState(null);
  const [IsDeleted, setIsDeleted] = useState(null);
  const [cationTargetName, setcationTargetName] = useState(null);
  const [cationTargetValue, setcationTargetValue] = useState(null);
  const [AnionTargetName, setAnionTargetName] = useState(null);
  const [AnionTargetValue, setAnionTargetValue] = useState(null);
  const [CationAnionTargetName, setCationAnionTargetName] = useState(null);
  const [CationAnionTargetValue, setCationAnionTargetValue] = useState(null);

  const [VesselTargetName1, setVesselTargetName1] = useState(null);
  const [VesselTargetName2, setVesselTargetName2] = useState(null);
  const [VesselTargetName3, setVesselTargetName3] = useState(null);
  const [VesselTargetName4, setVesselTargetName4] = useState(null);

  const [VesselTargetValue1, setVesselTargetValue1] = useState(null);
  const [VesselTargetValue2, setVesselTargetValue2] = useState(null);
  const [VesselTargetValue3, setVesselTargetValue3] = useState(null);
  const [VesselTargetValue4, setVesselTargetValue4] = useState(null);
  const [flagvessel, setflagvessel] = useState(null);

  const [defautVesselCo_Current, setdefautVesselCo_Current] = useState(false);
  const [Res_AndRegenerantDose, setRes_AndRegenerantDose] = useState([]);

  const [activeflag, setactiveflag] = useState();
  const selectedProcessId = useSelector(
    (state) => state.IXStore.data.selectedProcessID
  );
  const resinStore = useSelector((state) => state.resinData);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const designTemp = useSelector(
    (state) =>
      state?.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );

  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const cationAdvRegen = useSelector(
    (state) => state.IXStore?.updateCationDataAdvRegen
  );
  const [getAndRegenerantDose, responseAndRegenerantDose] =
    useLazyGetAllDataQuery();
  const anionAdvRegen = useSelector(
    (state) => state.IXStore?.updateAnionDataAdvRegen
  );
  const projectID = ProjectInfoStore.projectID,
    caseID = ProjectInfoStore.caseId;
  const [Location, setLocation] = useState(null);
  let vesselIds = {
    userID: userID,
    projectID: projectID,
    selectedprocessid: selectedProcessId ? selectedProcessId : 7,
    processID: selectedProcessId ? selectedProcessId : 7,
  };

  useEffect(() => {
    dispatch(
      updateVesselFlags({
        vesselflag1,
        vesselflag2,
        vesselflag3,
        vesselflag4,
      })
    );
  }, [vesselflag1, vesselflag2, vesselflag3, vesselflag4]);
  useEffect(() => {
    try {
      ixStore?.vessel1 !== null ? setvesselflag1(false) : setvesselflag1(true);
      ixStore?.vessel2 !== null ? setvesselflag2(false) : setvesselflag2(true);
      ixStore?.vessel3 !== null ? setvesselflag3(false) : setvesselflag3(true);
      ixStore?.vessel4 !== null ? setvesselflag4(false) : setvesselflag4(true);
      let apiUrl = `${"ix/api/v1/VesselRegenerationSystem"}?userID=${
        vesselIds.userID
      }&projectID=${vesselIds.projectID}&ixTreatment=IXD&selectedprocessid=${
        vesselIds.selectedprocessid
      }`;
      console.log("apiUrlCheck", apiUrl);
      getIXVessel(apiUrl);
    } catch {
      console.log("Error: Fetch VesselRegenertion data");
    }
    let apiVesselUrl = `${"ix/api/v1/ResinSelectionChanged"}?userID=${
      vesselIds.userID
    }&projectID=${vesselIds.projectID}&ixTreatment=IXD&processID=${
      vesselIds.processID
    }&resinarrangmentID1=${ixStore?.cationResin}&resinarrangmentID2=${
      ixStore?.anionResin
    }`;
    console.log("apiVesselUrl", apiVesselUrl);
    if (ixStore?.cationResin != null || ixStore?.anionResin != null) {
      getRegeneration(apiVesselUrl);
    }
  }, []);
  useEffect(() => {
    console.log("dataChecking", responseIXVessel.data);
    console.log("vesselData", vesselData);
    if (responseIXVessel.isSuccess === true) {
      console.log("responseIXVessel11", responseIXVessel.data);
      setvesselData(responseIXVessel.data);
    }
  }, [responseIXVessel]);
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsSumValid(false);
    }
  };
  const ConformationPopupCancel = (RetunValue) => {
    setpopuConformModal(false);
    if (RetunValue === "OK") {
      if (activeflag === "Cation") {
        CationFunc(null, null);
      } else if (activeflag === "Anion") {
        AnionFunc(null, null);
      } else if (activeflag === "CationAnion") {
        CationAnionFunc();
      } else {
        // let vessel_name,vessel_value;
        // vessel_name= VesselTargetName1===null?ename:VesselTargetName1;
        // vessel_name= VesselTargetName2===null?ename:VesselTargetName2;
        // vessel_name= VesselTargetName3===null?ename:VesselTargetName3;
        // vessel_name= VesselTargetName4===null?ename:VesselTargetName4;

        // vessel_value= VesselTargetValue1===null?evalue:VesselTargetValue1;
        // vessel_value= VesselTargetValue2===null?evalue:VesselTargetValue2;
        // vessel_value= VesselTargetValue3===null?evalue:VesselTargetValue3;
        // vessel_value= VesselTargetValue4===null?evalue:VesselTargetValue4;
        if (flagvessel === 1) {
          VesselFunc(VesselTargetName1, VesselTargetValue1);
        } else if (flagvessel === 2) {
          VesselFunc(VesselTargetName2, VesselTargetValue2);
        } else if (flagvessel === 3) {
          VesselFunc(VesselTargetName3, VesselTargetValue3);
        } else if (flagvessel === 4) {
          VesselFunc(VesselTargetName4, VesselTargetValue4);
        }
      }
    }
  };
  const CationAnionFunc = () => {
    //setloader(true);
    setAnionCationFlag(true);
    console.log(CationAnionTargetValue);
    dispatch(updateViewReport("false"));
    dispatch(updateExistingNew("true"));
    var selectionValue = vesselData.resinCollectionVM3.filter(
      (data) => data.ixResinArrangmentID == CationAnionTargetValue
    );
    selectionValue = selectionValue[0].resinArrangmentName;
    let parts = selectionValue.replace(/[\s[\]]/g, "").split(/[-|]/);
    let data1 = parts[0].trim();
    let data2 = parts.length > 1 ? parts[1].trim() : null;
    if (data1.length > 3) {
      data2 = data1.slice(-3);
      data1 = data1.slice(0, 3);
    }
    dispatch(updateResinName1(data1));
    dispatch(updateResinName2(data2));
    dispatch(updateResinName3(null));
    dispatch(updateResinName4(null));
    dispatch(updateSelectedCationResin(selectionValue));
    dispatch(updateSelectedAnionResin(null));
    dispatch(
      updateIXStore({
        ...ixStore,
        ["cationResin"]: parseInt(CationAnionTargetValue),
        ["anionResin"]: parseInt(CationAnionTargetValue),
        ["vessel1"]: null,
        ["vessel2"]: null,
        ["vessel3"]: null,
        ["vessel4"]: null,
        ["degasifation_ind"]: false,
        ["selectedEffluent"]: null,
          ["effluentValue"]: null,
          ["location"]: null,
        selectedResinList: [
          {
            ixResinID1: 139,
            inert: 0,
            ixResinID2: 165,
            ionicFormSelected_ind: false,
            columnNo: 1,
            defaultPackagingSize: 0,
          },
          {
            ixResinID1: 189,
            inert: 0,
            ixResinID2: 176,
            ionicFormSelected_ind: true,
            columnNo: 2,
            defaultPackagingSize: 0,
          },
        ],
        listRegenConds: [
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
          {
            regenerantID: 0,
            temperature:designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
        ],
      })
    );
    dispatch(
      updateResinNameCalc({
        WAC: null,
        WBA: null,
        SAC: null,
        SBA: null,
      })
    );
    dispatch(
      updateResinInertNameCalc({
        Inert1: null,
        Inert2: null,
      })
    );
    dispatch(
      updateResinIonicCalc({
        WACIon: 0,
        WBAIon: 0,
        SACIon: 0,
        SBAIon: 0,
      })
    );

    let apiVesselUrl = `${"ix/api/v1/ResinSelectionChanged"}?userID=${
      vesselIds.userID
    }&projectID=${vesselIds.projectID}&ixTreatment=IXD&processID=${
      vesselIds.processID
    }&resinarrangmentID1=${CationAnionTargetValue}&resinarrangmentID2=${CationAnionTargetValue}`;
    if (cationTargetValue != 0 && AnionTargetValue != 0) {
      getRegeneration(apiVesselUrl);
      console.log("apiVesselUrl", apiVesselUrl);
    }
  };
  const handleAnionCation = (e) => {
    console.log("Cation Anion-", e.target.value);
    setCationAnionTargetName(e.target.name);
    setcationTargetValue(e.target.value);
    setAnionTargetValue(e.target.value);
    setCationAnionTargetValue(e.target.value);
    if (ixStore?.cationResin != null && ixStore?.anionResin != null) {
      setactiveflag("CationAnion");
      setpopuConformModal(true);
      setlabelMesg(
        "Changes to resin arrangement or regeneration systems will clear any inputs on later screens. Consider adding another case if you want to make a comparison, Do you want to proceed?"
      );
    } else {
      CationAnionFunc();
    }
  };
  const CationFunc = (ename, evalue) => {
    var cation_name, cation_value;
    if (cationTargetName == null) {
      cation_name = ename;
    } else {
      cation_name = cationTargetName;
    }
    if (cationTargetValue == null) {
      cation_value = evalue;
    } else {
      cation_value = cationTargetValue;
    }
    console.log("cationTargetValue", cation_value);

    if (anionCationFlag === true) {
      dispatch(updateResinName1(null));
      dispatch(updateResinName2(null));
      dispatch(updateResinName3(null));
      dispatch(updateResinName4(null));
      setAnionCationFlag(false);
    }
    setloader(true);
    setcation(cation_value);
    dispatch(updateViewReport("false"));
    dispatch(updateExistingNew("true"));
    var selectionValue = vesselData.resinCollectionVM1.filter(
      (data) => data.ixResinArrangmentID == cation_value
    );
    if (selectionValue.length <= 0) {
      return;
    }
    selectionValue = selectionValue[0].resinArrangmentName;
    let parts = selectionValue.replace(/[\s[\]]/g, "").split(/[-|]/);
    let data1 = parts[0].trim();
    let data2 = parts.length > 1 ? parts[1].trim() : null;
    if (data1.length > 3) {
      data2 = data1.slice(-3);
      data1 = data1.slice(0, 3);
    }
    if (data2 === null && ixStoreObj.resinName2 === null) {
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(ixStoreObj.resinName3));
      dispatch(updateResinName3(ixStoreObj.resinName4));
      dispatch(updateResinName4(null));
    } else if (
      data2 === null &&
      ixStoreObj.resinName4 === null &&
      ixStoreObj.resinName3 !== null &&
      (ixStore.anionResin === 4 || ixStore.anionResin === 1)
    ) {
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(ixStoreObj.resinName3));
      dispatch(updateResinName3(ixStoreObj.resinName4));
    } else if (data2 === null && ixStoreObj.resinName4 === null) {
      dispatch(updateResinName1(data1));
    } else if (data2 === null && ixStoreObj.resinName4 !== null) {
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(ixStoreObj.resinName3));
      dispatch(updateResinName3(ixStoreObj.resinName4));
      dispatch(updateResinName4(null));
    } else if (
      data2 !== null &&
      ixStoreObj.resinName4 === null &&
      ixStoreObj.resinName3 !== null &&
      ixStoreObj.resinName2 !== null &&
      ixStore.anionResin != 4 &&
      ixStore.anionResin != 1
    ) {
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(data2));
      dispatch(updateResinName3(ixStoreObj.resinName2));
      dispatch(updateResinName4(ixStoreObj.resinName3));
    } else if (
      (ixStore.anionResin === 4 || ixStore.anionResin === 1) &&
      ixStoreObj.resinName4 === null &&
      ixStoreObj.resinName3 === null
    ) {
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(data2));
      dispatch(updateResinName3(ixStoreObj.resinName2));
      dispatch(updateResinName4(ixStoreObj.resinName3));
    } else {
      console.log("666");
      dispatch(updateResinName1(data1));
      dispatch(updateResinName2(data2));
    }
    dispatch(updateSelectedCationResin(selectionValue));
    dispatch(
      updateIXStore({
        ...ixStore,
        [cation_name]: parseInt(cation_value),
        ["vessel1"]: null,
        ["vessel2"]: null,
        ["vessel3"]: null,
        ["vessel4"]: null,
        ["degasifation_ind"]: false,
        ["selectedEffluent"]: null,
          ["effluentValue"]: null,
          ["location"]: null,
        selectedResinList: [
          {
            ixResinID1: 139,
            inert: 0,
            ixResinID2: 165,
            ionicFormSelected_ind: false,
            columnNo: 1,
            defaultPackagingSize: 0,
          },
          {
            ixResinID1: 189,
            inert: 0,
            ixResinID2: 176,
            ionicFormSelected_ind: true,
            columnNo: 2,
            defaultPackagingSize: 0,
          },
        ],
        listRegenConds: [
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
        ],
        // listProductQualityandregeneration: [
        //   {
        //     productQualityDoseID: 0,
        //     resinRegenerationID: 0,
        //     speciesLblNameID: 0,
        //     averageSpeciesVal: 20,
        //     endpoingSpeciesVal:  40,
        //     averageConductivityVal:  0.22 ,
        //     endpointConductivityVal:  0.22 ,
        //     speciesTwoLblNameID: 0,
        //     regenerantDoseLbl1ID: 0,
        //     regeneratDoseVal1: 0,
        //     regenerantDoseLbl2ID: 0,
        //     regenerantDoseLbl4ID: 0,
        //     regenerantDoseVal2: 0,
        //     regenerantDoseVal3: 0,
        //     regenerantDoseVal4: cationAdvRegen?.typicalValue?.regenerantDoseTypical,
        //     overAllEfficiency: 0,
        //     overAllComputation: 0,
        //     doseOptimization: 0,
        //     naturalEffect: 0,
        //     saftyFactorLbl: 0,
        //     saftyFactorVal: "0.95",
        //     speciesUnit: 1,///
        //     volume: null,
        //     flowRate: null,
        //     time: null,
        //     regenerationRatio: cationAdvRegen?.typicalValue?.regenerantRatioTypical,
        //   },
        //   {
        //     productQualityDoseID: 0,
        //     resinRegenerationID: 0,
        //     speciesLblNameID: 0,
        //     averageSpeciesVal: defautVessel ? 100 : 20,
        //     endpoingSpeciesVal: defautVessel ? 200 : 40,
        //     averageConductivityVal: 0,
        //     endpointConductivityVal: 70,
        //     speciesTwoLblNameID: 0,
        //     regenerantDoseLbl1ID: 0,
        //     regeneratDoseVal1: 0,
        //     regenerantDoseLbl2ID: 0,
        //     regenerantDoseLbl4ID: 0,
        //     regenerantDoseVal2: 0,
        //     regenerantDoseVal3: 0,
        //     regenerantDoseVal4: anionAdvRegen?.typicalValue?.regenerantDoseTypical, ///dose
        //     overAllEfficiency: 0,
        //     overAllComputation: 0,
        //     doseOptimization: 0,
        //     naturalEffect: 0,
        //     saftyFactorLbl: 0,
        //     saftyFactorVal: "0.95",
        //     speciesUnit: 1,
        //     volume: null,
        //     flowRate: null,
        //     time: null,
        //     regenerationRatio: anionAdvRegen?.typicalValue?.regenerantRatioTypical,
        //   },
        // ],
      })
    );
    dispatch(
      updateResinNameCalc({
        WAC: null,
        WBA: null,
        SAC: null,
        SBA: null,
      })
    );
    dispatch(
      updateResinInertNameCalc({
        Inert1: null,
        Inert2: null,
      })
    );
    dispatch(
      updateResinIonicCalc({
        WACIon: 0,
        WBAIon: 0,
        SACIon: 0,
        SBAIon: 0,
      })
    );

    if (anion != "0" || ixStore?.anionResin != 0) {
      console.log("ixStore?.anionResin", ixStore?.anionResin);
      let apiVesselUrl = `${"ix/api/v1/ResinSelectionChanged"}?userID=${
        vesselIds.userID
      }&projectID=${vesselIds.projectID}&ixTreatment=IXD&processID=${
        vesselIds.processID
      }&resinarrangmentID1=${cation_value}&resinarrangmentID2=${
        anion != "" ? anion : ixStore?.anionResin
      }`;
      console.log("Cation apiVesselUrl", apiVesselUrl);
      getRegeneration(apiVesselUrl);
    }
  };
  const AnionFunc = (ename, evalue) => {
    var anion_name, anion_value;
    if (AnionTargetName === null) {
      anion_name = ename;
    } else {
      anion_name = AnionTargetName;
    }
    if (AnionTargetValue === null) {
      anion_value = evalue;
    } else {
      anion_value = AnionTargetValue;
    }
    console.log("AnionTargetValue", anion_value);
    setloader(true);
    console.log("ixStore.vessel1", ixStore.vessel1);
    if (
      ixStore.vessel1 !== null ||
      ixStore.vessel2 !== null ||
      ixStore.vessel3 !== null ||
      ixStore.vessel4 !== null
    ) {
      // console.log("in if anion");
      // setIsError(true);
      // setactiveflag("vessel");
      // setpopuConformModal(true);
      // setlabelMesg("Are you sure you want to Proceed with Vessel change?");
    } else {
      // console.log("in else anion");
    }
    if (anionCationFlag === true) {
      dispatch(updateResinName1(null));
      dispatch(updateResinName2(null));
      dispatch(updateResinName3(null));
      dispatch(updateResinName4(null));
      setAnionCationFlag(false);
    }
    dispatch(updateViewReport("false"));
    dispatch(updateExistingNew("true"));
    setanion(anion_value);
    var selectionValue = vesselData.resinCollectionVM2.filter(
      (data) => data.ixResinArrangmentID == anion_value
    );
    if (selectionValue.length <= 0) {
      return;
    }
    selectionValue = selectionValue[0].resinArrangmentName;
    let parts = selectionValue.replace(/[\s[\]]/g, "").split(/[-|]/);
    let data1 = parts[0].trim();
    let data2 = parts.length > 1 ? parts[1].trim() : null;
    if (data1.length > 3) {
      data2 = data1.slice(-3);
      data1 = data1.slice(0, 3);
    }
    if (
      ixStore.resinName2 === null ||
      ixStore.cationResin === 2 ||
      ixStore.cationResin === 3
    ) {
      dispatch(updateResinName2(data1));
      dispatch(updateResinName3(data2));
    } else {
      dispatch(updateResinName3(data1));
      dispatch(updateResinName4(data2));
    }
    dispatch(updateSelectedAnionResin(selectionValue));
    dispatch(
      updateIXStore({
        ...ixStore,
        [anion_name]: parseInt(anion_value),
        ["vessel1"]: null,
        ["vessel2"]: null,
        ["vessel3"]: null,
        ["vessel4"]: null,
        ["degasifation_ind"]: false,
        ["selectedEffluent"]: null,
          ["effluentValue"]: null,
          ["location"]: null,
        selectedResinList: [
          {
            ixResinID1: 139,
            inert: 0,
            ixResinID2: 165,
            ionicFormSelected_ind: false,
            columnNo: 1,
            defaultPackagingSize: 0,
          },
          {
            ixResinID1: 189,
            inert: 0,
            ixResinID2: 176,
            ionicFormSelected_ind: true,
            columnNo: 2,
            defaultPackagingSize: 0,
          },
        ],
        listRegenConds: [
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
        ],
        // listProductQualityandregeneration: [
        //   {
        //     productQualityDoseID: 0,
        //     resinRegenerationID: 0,
        //     speciesLblNameID: 0,
        //     averageSpeciesVal: defautVessel ? 100 : 20,
        //     endpoingSpeciesVal: defautVessel ? 200 : 40,
        //     averageConductivityVal: defautVessel ? 1.07  : 0.22 ,
        //     endpointConductivityVal: defautVessel ? 1.07  : 0.22 ,
        //     speciesTwoLblNameID: 0,
        //     regenerantDoseLbl1ID: 0,
        //     regeneratDoseVal1: 0,
        //     regenerantDoseLbl2ID: 0,
        //     regenerantDoseLbl4ID: 0,
        //     regenerantDoseVal2: 0,
        //     regenerantDoseVal3: 0,
        //     regenerantDoseVal4: cationAdvRegen?.typicalValue?.regenerantDoseTypical,
        //     overAllEfficiency: 0,
        //     overAllComputation: 0,
        //     doseOptimization: 0,
        //     naturalEffect: 0,
        //     saftyFactorLbl: 0,
        //     saftyFactorVal: "0.95",
        //     speciesUnit: 1,///
        //     volume: null,
        //     flowRate: null,
        //     time: null,
        //     regenerationRatio: cationAdvRegen?.typicalValue?.regenerantRatioTypical,
        //   },
        //   {
        //     productQualityDoseID: 0,
        //     resinRegenerationID: 0,
        //     speciesLblNameID: 0,
        //     averageSpeciesVal: defautVessel ? 100 : 20,
        //     endpoingSpeciesVal: defautVessel ? 200 : 40,
        //     averageConductivityVal: 0,
        //     endpointConductivityVal: 70,
        //     speciesTwoLblNameID: 0,
        //     regenerantDoseLbl1ID: 0,
        //     regeneratDoseVal1: 0,
        //     regenerantDoseLbl2ID: 0,
        //     regenerantDoseLbl4ID: 0,
        //     regenerantDoseVal2: 0,
        //     regenerantDoseVal3: 0,
        //     regenerantDoseVal4: anionAdvRegen?.typicalValue?.regenerantDoseTypical, ///dose
        //     overAllEfficiency: 0,
        //     overAllComputation: 0,
        //     doseOptimization: 0,
        //     naturalEffect: 0,
        //     saftyFactorLbl: 0,
        //     saftyFactorVal: "0.95",
        //     speciesUnit: 1,
        //     volume: null,
        //     flowRate: null,
        //     time: null,
        //     regenerationRatio: anionAdvRegen?.typicalValue?.regenerantRatioTypical,
        //   },
        // ],
      })
    );
    dispatch(
      updateResinNameCalc({
        WAC: null,
        WBA: null,
        SAC: null,
        SBA: null,
      })
    );
    dispatch(
      updateResinInertNameCalc({
        Inert1: null,
        Inert2: null,
      })
    );
    dispatch(
      updateResinIonicCalc({
        WACIon: 0,
        WBAIon: 0,
        SACIon: 0,
        SBAIon: 0,
      })
    );
    if (cation != "0" || ixStore?.cationResin != 0) {
      let apiVesselUrl = `${"ix/api/v1/ResinSelectionChanged"}?userID=${
        vesselIds.userID
      }&projectID=${vesselIds.projectID}&ixTreatment=IXD&processID=${
        vesselIds.processID
      }&resinarrangmentID1=${
        cation != "" ? cation : ixStore?.cationResin
      }&resinarrangmentID2=${anion_value}`;
      console.log("Anion apiVesselUrl", apiVesselUrl);
      getRegeneration(apiVesselUrl);
    }
  };
  const handleCationData = (e) => {
    setvesselflag1(true);
    console.log("AnionTargetValue-test", e.target.value);
    setcationTargetName(e.target.name);
    setcationTargetValue(e.target.value);
    console.log("ixStore?.cationResin", ixStore?.cationResin);
    if (ixStore?.cationResin != null) {
      setactiveflag("Cation");
      setpopuConformModal(true);
      setlabelMesg(
        "Changes to resin arrangement or regeneration systems will clear any inputs on later screens. Consider adding another case if you want to make a comparison, Do you want to proceed?"
      );
      //setIsDeleted("I");
    } else {
      CationFunc(e.target.name, e.target.value);
    }
  };

  const handleAnionData = (e) => {
    setAnionTargetName(e.target.name);
    console.log("AnionTargetValue-test", e.target.value);
    setAnionTargetValue(e.target.value);
    if (ixStore?.anionResin != null) {
      setactiveflag("Anion");
      setpopuConformModal(true);
      setlabelMesg(
        "Changes to resin arrangement or regeneration systems will clear any inputs on later screens. Consider adding another case if you want to make a comparison, Do you want to proceed?"
      );
      // setIsDeleted("I");
    } else {
      AnionFunc(e.target.name, e.target.value);
    }
  };
  const VesselFunc = (ename, evalue) => {
    console.log("VesselTargetName", ename, "-", ename);
    console.log("VesselTargetName", evalue, "-", evalue);
    let vessel_name, vessel_value;
    vessel_name = ename;
    vessel_value = evalue;
    var vesselCoCurrent = false;
    var hardnes = false;
    if (
      ixStore.vessel1 == 0 ||
      ixStore.vessel2 == 0 ||
      ixStore.vessel3 == 0 ||
      ixStore.vessel4 == 0
    ) {
      vesselCoCurrent = true;
    }
    if (
      (ixStore?.cationResin == 3 && ixStore?.anionResin == 4) ||
      (ixStore?.cationResin == 3 && ixStore?.anionResin == 1) ||
      (ixStore?.cationResin == 3 && ixStore?.anionResin == 11) ||
      (ixStore?.cationResin == 3 && ixStore?.anionResin == 12) ||
      (ixStore?.cationResin == 3 && ixStore?.anionResin == 13)
    ) {
      hardnes = true;
    }

    console.log("vessel_value", vessel_name);
    // const Value_array = e.target.value.split("|");
    console.log("vessel_value", vessel_value);
    ///cation
    var Cation_saftyFactorVal = 0,
      Cation_regeneratDoseVal1 = 0,
      Cation_regenerantDoseVal2 = 0,
      Cation_regenerantDoseVal3 = 0;
    if (Res_AndRegenerantDose?.ixRegenerationDoseName_column1?.length > 0) {
      Res_AndRegenerantDose?.ixRegenerationDoseName_column1?.forEach(
        (element) => {
          switch (element.langText) {
            case "SAC Safety Factor":
              Cation_saftyFactorVal = 0.95;
              break;
            case "WAC Safety Factor":
              Cation_regeneratDoseVal1 = 0.95;
              break;
            case "WAC Overrun":
              Cation_regenerantDoseVal2 = 0.0;
              break;
            default:
              Cation_regenerantDoseVal3 = 100;
          }
        }
      );
    }
    ///anion
    var Anion_saftyFactorVal = 0,
      Anion_regeneratDoseVal1 = 0,
      Anion_regenerantDoseVal2 = 0,
      Anion_regenerantDoseVal3 = 0;
    if (Res_AndRegenerantDose?.ixRegenerationDoseName_column2?.length > 0) {
      Res_AndRegenerantDose?.ixRegenerationDoseName_column2?.forEach(
        (element) => {
          switch (element.langText) {
            case "SBA Safety Factor":
              Anion_saftyFactorVal = 0.95;
              break;
            case "WBA Safety Factor":
              Anion_regeneratDoseVal1 = 0.95;
              break;
            case "WBA Overrun":
              Anion_regenerantDoseVal2 = 0.0;
              break;
            default:
              Anion_regenerantDoseVal3 = 100;
          }
        }
      );
    }
    setanion(vessel_value);
    dispatch(
      updateIXStore({
        ...ixStore,
        [vessel_name]: parseInt(vessel_value),
        listRegenConds: [
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
          {
            regenerantID: 0,
            temperature: designTemp ? designTemp : 25,
            temperatureID: 0,
            step1_ind: true,
            step2_ind: false,
            step3_ind: false,
            step1Con: 0,
            step2Con: 0,
            step3Con: 0,
            step1DosFrac: 0,
            step2DosFrac: 0,
            step3DosFrac: 0,
            serviceWater: null,
            backwash: null,
            chemicalID: "",
          },
        ],
        listProductQualityandregeneration: [
          {
            productQualityDoseID: 0,
            resinRegenerationID: 0,
            speciesLblNameID: 1,
            averageSpeciesVal:
              hardnes && vesselCoCurrent ? 1 : vesselCoCurrent ? 100 : 20,
            endpoingSpeciesVal:
              hardnes && vesselCoCurrent ? 2 : vesselCoCurrent ? 200 : 40,
            averageConductivityVal: vesselCoCurrent ? 1.078 : 0.221,
            endpointConductivityVal: vesselCoCurrent ? 2.154 : 0.434,
            speciesTwoLblNameID: 0,
            regenerantDoseLbl1ID: 0,
            regeneratDoseVal1: Cation_regeneratDoseVal1,
            regenerantDoseLbl2ID: 0,
            regenerantDoseLbl4ID:
              ixStore?.newPlant_ind &&
              ixStore?.cationResin === 3 &&
              ixStore?.anionResin === 4
                ? 4
                : 1,
            regenerantDoseVal2: Cation_regenerantDoseVal2,
            regenerantDoseVal3: Cation_regenerantDoseVal3,
            regenerantDoseVal4:
            GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.typicalValue?.regenerantDoseTypical,
              unit.selectedUnits[14],
              "g/L"
           ),
             
            overAllEfficiency: 0,
            overAllComputation: 0,
            doseOptimization: 0,
            naturalEffect: 0,
            saftyFactorLbl: 0,
            saftyFactorVal: Cation_saftyFactorVal,
            speciesUnit: hardnes ? 4 : 1, ///
            volume: null,
            flowRate: null,
            time: null,
            regenerationRatio:
              cationAdvRegen?.typicalValue?.regenerantRatioTypical,
          },
          {
            productQualityDoseID: 0,
            resinRegenerationID: 0,
            speciesLblNameID: 0,
            averageSpeciesVal: vesselCoCurrent ? 100 : 20,
            endpoingSpeciesVal: vesselCoCurrent ? 200 : 40,
            averageConductivityVal: 0,
            endpointConductivityVal: 70,
            speciesTwoLblNameID: 0,
            regenerantDoseLbl1ID: 0,
            regeneratDoseVal1: Anion_regeneratDoseVal1,
            regenerantDoseLbl2ID: 0,
            regenerantDoseLbl4ID:
              ixStore?.newPlant_ind &&
              ixStore?.cationResin === 3 &&
              ixStore?.anionResin === 4
                ? 4
                : 1,
            regenerantDoseVal2: Anion_regenerantDoseVal2,
            regenerantDoseVal3: Anion_regenerantDoseVal3,
            regenerantDoseVal4:
            GlobalUnitConversion(
              GlobalUnitConversionStore,
              anionAdvRegen?.typicalValue?.regenerantDoseTypical, ///dose
              unit.selectedUnits[14],
              "g/L"
           ),
            overAllEfficiency: 0,
            overAllComputation: 0,
            doseOptimization: 0,
            naturalEffect: 0,
            saftyFactorLbl: 0,
            saftyFactorVal: Anion_saftyFactorVal,
            speciesUnit: 1,
            volume: null,
            flowRate: null,
            time: null,
            regenerationRatio:
              anionAdvRegen?.typicalValue?.regenerantRatioTypical,
          },
        ],
      })
    );
  };
  const handleVessel = (e) => {
    //setVesselTargetName(e.target.name);
    console.log("setVesselTargetValue", e.target.value);
    if (e.target.name === "vessel1") {
      setflagvessel(1);
      setVesselTargetName1(e.target.name);
      setVesselTargetValue1(e.target.value);
    } else if (e.target.name === "vessel2") {
      setflagvessel(2);
      setVesselTargetName2(e.target.name);
      setVesselTargetValue2(e.target.value);
    } else if (e.target.name === "vessel3") {
      setflagvessel(3);
      setVesselTargetName3(e.target.name);
      setVesselTargetValue3(e.target.value);
    } else {
      setflagvessel(4);
      setVesselTargetName4(e.target.name);
      setVesselTargetValue4(e.target.value);
    }
    if (ixStore[e.target.name] !== null) {
      //setIsError(true);
      setactiveflag("vessel");
      setpopuConformModal(true);
      // setlabelMesg(
      //   `Are you sure you want to Proceed with ${e.target.name} change?`
      // );
      setlabelMesg(
        "Changes to resin arrangement or regeneration systems will clear any inputs on later screens. Consider adding another case if you want to make a comparison, Do you want to proceed?"
      );
    } else {
      VesselFunc(e.target.name, e.target.value);
    }
  };
  useEffect(() => {
    if (responseRegeneration.isSuccess === true) {
      console.log("vesselDataSelection", responseRegeneration.data);
      setvesselDataSelection(responseRegeneration.data);
      dispatch(updateVessel(responseRegeneration.data));
      dispatch(
        updateIXStore({
          ...ixStore,
          ["validDesignID"]: responseRegeneration.data.validDesignID,
        })
      );

      // console.log(" responseRegeneration.data?.vesselResinDetails1-", responseRegeneration.data?.vesselResinDetails1?.length);
      // console.log(" responseRegeneration.data?.vesselResinDetails2-", responseRegeneration.data?.vesselResinDetails2?.length);
      // console.log(" responseRegeneration.data?.vesselResinDetails3-", responseRegeneration.data?.vesselResinDetails3?.length);
      // console.log(" responseRegeneration.data?.vesselResinDetails4-", responseRegeneration.data?.vesselResinDetails4?.length);
      responseRegeneration.data?.vesselResinDetails1?.length > 0 &&
      responseRegeneration.data?.vesselResinDetails1 !== null
        ? setvesselflag1(false)
        : setvesselflag1(true);
      responseRegeneration.data?.vesselResinDetails2?.length > 0 &&
      responseRegeneration.data?.vesselResinDetails2 !== null
        ? setvesselflag2(false)
        : setvesselflag2(true);
      responseRegeneration.data?.vesselResinDetails3?.length > 0 &&
      responseRegeneration.data?.vesselResinDetails3 !== null
        ? setvesselflag3(false)
        : setvesselflag3(true);
      responseRegeneration.data?.vesselResinDetails4?.length > 0 &&
      responseRegeneration.data?.vesselResinDetails4 !== null
        ? setvesselflag4(false)
        : setvesselflag4(true);
      setloader(false);
      //////////new changes
      try {
        let apiUrl = `${"ix/api/v1/ProductQualityAndRegenerantDose"}?userID=${
          vesselIds.userID
        }&projectID=${vesselIds.projectID}&validdesignID=${
          responseRegeneration.data.validDesignID
        }&regenerantID= 1
          &columnNum= 1`;
        console.log("apiUrlCheck", apiUrl);
        getAndRegenerantDose(apiUrl);
      } catch {
        console.log("Error: Fetch VesselRegenertion data");
      }
    }
  }, [responseRegeneration]);
  useEffect(() => {
    console.log(
      "data-responseAndRegenerantDose",
      responseAndRegenerantDose.data
    );
    if (responseAndRegenerantDose.isSuccess === true) {
      console.log("responseAndRegenerantDose", responseAndRegenerantDose.data);
      setRes_AndRegenerantDose(responseAndRegenerantDose.data);
    }
  }, [responseAndRegenerantDose]);
  const handleDegasification = (e) => {
    // e.target.value=="true"?setbaricon(false):setbaricon(true);
    // setdefault_CO2(true);
    // defaultAfterCation
    //   ? setdefaultAfterCation(false)
    //   : setdefaultAfterCation(true);
    const { name, checked } = e.target;
    console.log("e.target.name", e.target.name);
    // dispatch(updateIXStore({ ...ixStore, [name]: checked, ["selectedEffluent"]: 3, }));
    if (
      checked &&
      ixStoreObj.selectedcationResign === "[WAC]" &&
      ixStoreObj.selectedanionResign === "[WBA] - [SBA]"
    ) {
      // dispatch(updateIXStore({ ...ixStore, [name]: true }));
      dispatch(
        updateIXStore({
          ...ixStore,
          [name]: checked,
          ["selectedEffluent"]: 3,
          ["effluentValue"]: 10,
          ["location"]: null,
        })
      );
    } else if (checked) {
      // dispatch(updateIXStore({ ...ixStore, [name]: true }));
      dispatch(
        updateIXStore({
          ...ixStore,
          [name]: checked,
          ["selectedEffluent"]: 3,
          ["effluentValue"]: 10,
          ["location"]: 1,
        })
      );
    } else {
      // dispatch(updateIXStore({ ...ixStore, [name]: false }));
      dispatch(
        updateIXStore({
          ...ixStore,
          [name]: checked,
          ["selectedEffluent"]: null,
          ["effluentValue"]: null,
          ["location"]: null,
        })
      );
    }
  };
  const EffluentClick = (e) => {
    // if (parseInt(e.target.value) === 1) {
    //   setdefault_CO2(false);
    // } else if (parseInt(e.target.value) === 2) {
    //   setdefault_CO2(false);
    // } else {
    //   setdefault_CO2(false);
    // }
    let value=0;
    if(e.target.value==3){
      value=10;
    }
    console.log("PK e.target.value", e.target.value,value);
    dispatch(
      updateIXStore({
        ...ixStore,
        ["selectedEffluent"]: parseInt(e.target.value),
        ["effluentValue"]:value,
      })
    );
    seteffluent(0);
  };
  const txtChange = (e) => {
    console.log("e.target.value", e.target.value);
    dispatch(
      updateIXStore({
        ...ixStore,
        ["effluentValue"]: parseFloat(e.target.value),
      })
    );
  };
  const LocationClick = (e) => {
    if (parseInt(e.target.value) === 0) {
      setdefaultAfterCation(false);
    } else if (parseInt(e.target.value) === 1) {
      setdefaultAfterCation(true);
    } else {
      setdefaultAfterCation(false);
    }
    //setLocation(e.target.value);
    dispatch(
      updateIXStore({ ...ixStore, ["location"]: parseInt(e.target.value) })
    );
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e) => {
    if (e.target.name == "Percent_Removal") {
      if (
        e.target.value <= 0 ||
        e.target.value > 100 ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        //setautoFocusvalue(true);
        setMessage(
          "The IX Degasification Effluent % Removal is not correctly specified. It should be between 1 and 100 %"
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      }
    } else if (e.target.name == "CO2_Partial_Pressure") {
      // let match = unit.selectedUnits[6] === "µatm" ? 1000000 : 1257000;
     
      console.log("e.target.value-", unit.selectedUnits[6] === "µatm");
      if (
        e.target.value <= 0 ||
        e.target.value > 1000000 ||
        isNaN(e.target.value)
      ) {
        console.log("e.target.value-", parseInt(e.target.value));
        setIsSumValid(true);
        //setautoFocusvalue(true);
        setMessage(
          "The IX Degasification Effluent Partial Pressure is not correctly specified."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      }
    } else if (e.target.name == "CO2_Concentration") {
      // let match = unit.selectedUnits[6] === "mg/L TOC" ? 1000000 : 200000;
      if (
        e.target.value <= 0 ||
        e.target.value > 1000000 ||
        isNaN(e.target.value)
      ) {
        console.log("e.target.value-", parseInt(e.target.value));
        setIsSumValid(true);
        //setautoFocusvalue(true);
        setMessage(
          "The IX Degasification Effluent Concentration is not correctly specified."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      }
    }
    setIsFocused(null);
  };
  return (
    <>
      {
        <ConformationPopup
          show={popuConformModal}
          onHide={(e) => ConformationPopupCancel(e)}
          lblMessage={lblMessage}
        />
      }
      <VesselRegenerationSystemStyled className="vessel-regeneration-row">
        <SystemDiagram />
        <div className="card-container">
          <StyledCard className="resin-arrangement-column">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Resin Arrangement"
              />
              <Card.Title>
                <IconWithTooltip
                  label="Choose which types of resin will be used and how they are arranged."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="label-select-group">
                <CustomLabel label="Cation" />
                <CustomSelect
                  id="formSelect"
                  name="cationResin"
                  value={ixStore?.cationResin}
                  onChange={handleCationData}
                >
                  {/* <option value="">Choose Cation</option> */}
                  {vesselData &&
                    vesselData?.resinCollectionVM1?.map((vesselCation) => (
                      <option
                        key={vesselCation.ixResinArrangmentID}
                        value={vesselCation.ixResinArrangmentID}
                      >
                        {vesselCation.resinArrangmentName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <div className="label-select-group">
                <CustomLabel label="Anion" />
                <CustomSelect
                  id="formSelect1"
                  name="anionResin"
                  value={ixStore?.anionResin}
                  onChange={handleAnionData}
                >
                  {/* <option value="">Choose Anion</option> */}
                  {vesselData &&
                    vesselData?.resinCollectionVM2?.map((vesselAnion) => (
                      <option
                        key={vesselAnion.ixResinArrangmentID}
                        value={vesselAnion.ixResinArrangmentID}
                      >
                        {vesselAnion.resinArrangmentName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <p className="or-option">OR</p>
              <div className="label-select-group">
                <CustomLabel label="Cation & Anion Combined" />
                <CustomSelect
                  name="anionCatainAndResin"
                  value={
                    ixStore?.anionResin === ixStore?.cationResin
                      ? ixStore?.anionResin
                      : ""
                  }
                  onChange={handleAnionCation}
                >
                  {/* <option value="">Choose Cation & Anion Combined</option> */}
                  {vesselData &&
                    vesselData?.resinCollectionVM3?.map((vesselAnion) => (
                      <option
                        key={vesselAnion.ixResinArrangmentID}
                        name="cationandanionResin"
                        value={vesselAnion.ixResinArrangmentID}
                      >
                        {vesselAnion.resinArrangmentName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
            </Card.Body>
          </StyledCard>
          <StyledCard
            className="regeneration-system-column"
            hidden={
              vesselflag1 || cationTargetValue == 0 || AnionTargetName == 0
            }
          >
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Regeneration System"
              />
              <Card.Title>
                <IconWithTooltip
                  label="For each vessel, choose the regeneration scheme that will be used."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            {loader ? (
              <SmallLoader />
            ) : (
              <Card.Body>
                <div>
                  <CustomLabel label="Vessel 1" hidden={vesselflag1} />
                  <CustomSelect
                    name="vessel1"
                    value={ixStore?.vessel1}
                    onChange={handleVessel}
                    hidden={vesselflag1}
                  >
                    <option value="">Choose Vessel 1</option>
                    {VesselStore &&
                      VesselStore?.vesselResinDetails1?.map((vesselAnion) => (
                        <option
                          key={vesselAnion.regenSystemID}
                          name="vessel1"
                          value={vesselAnion.regenSystemID}
                        >
                          {vesselAnion.regenSystemName}
                        </option>
                      ))}
                  </CustomSelect>
                </div>
                <div>
                  <CustomLabel label="Vessel 2" hidden={vesselflag2} />
                  <CustomSelect
                    name="vessel2"
                    value={ixStore?.vessel2}
                    onChange={handleVessel}
                    hidden={vesselflag2}
                  >
                    <option value="">Choose Vessel 2</option>
                    {VesselStore &&
                      VesselStore?.vesselResinDetails2?.map((vesselAnion) => (
                        <option
                          key={vesselAnion.regenSystemID}
                          name="vessel2"
                          value={vesselAnion.regenSystemID}
                        >
                          {vesselAnion.regenSystemName}
                        </option>
                      ))}
                  </CustomSelect>
                </div>
                <div>
                  <CustomLabel label="Vessel 3" hidden={vesselflag3} />
                  <CustomSelect
                    name="vessel3"
                    value={ixStore?.vessel3}
                    onChange={handleVessel}
                    hidden={vesselflag3}
                  >
                    <option value="">Choose Vessel 3</option>
                    {VesselStore &&
                      VesselStore?.vesselResinDetails3?.map((vesselAnion) => (
                        <option
                          key={vesselAnion.regenSystemID}
                          name="vessel3"
                          value={vesselAnion.regenSystemID}
                        >
                          {vesselAnion.regenSystemName}
                        </option>
                      ))}
                  </CustomSelect>
                </div>
                <div>
                  <CustomLabel label="Vessel 4" hidden={vesselflag4} />
                  <CustomSelect
                    name="vessel4"
                    value={ixStore?.vessel4}
                    onChange={handleVessel}
                    hidden={vesselflag4}
                  >
                    <option value="">Choose Vessel 4</option>
                    {VesselStore &&
                      VesselStore?.vesselResinDetails4?.map((vesselAnion) => (
                        <option
                          key={vesselAnion.regenSystemID}
                          name="vessel4"
                          value={vesselAnion.regenSystemID}
                        >
                          {vesselAnion.regenSystemName}
                        </option>
                      ))}
                  </CustomSelect>
                </div>
              </Card.Body>
            )}
          </StyledCard>
          <StyledCard
            className="degasification-column"
            hidden={
              vesselflag1 || cationTargetValue == 0 || AnionTargetName == 0 ||ixStore?.cationResin == 9 && ixStore?.anionResin == 9||ixStore?.cationResin == 10 && ixStore?.anionResin == 10
            }
          >
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Degasification"
              />
              <Card.Title className="switch-info">
                <ToggleSwitch
                  small
                  id="degasificationSwitch"
                  checked={ixStore.degasifation_ind}
                  name="degasifation_ind"
                  value={ixStore.degasifation_ind}
                  onChange={handleDegasification}
                />
                <IconWithTooltip
                  label="If degasification included, choose location of degasifier and determine outlet CO2 concentration."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="effluent">
                <div className="effluent-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Effluent"
                  />
                  <div className="vertical-line"></div>
                </div>
                <div className="co-removal">
                  <CustomRadio
                    checked={ixStore.selectedEffluent === 1 ? true : false}
                    disabled={ixStore.degasifation_ind ? false : true}
                    type="radio"
                    id="radio1"
                    value={1}
                    name="selectedEffluent"
                    onClick={EffluentClick}
                    label="CO₂ % Removal"
                  />
                  <InputWithText
                    isError={false}
                    isWarning={false}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(1)}
                    isFocused={isFocused === 1}
                    disabled={ixStore.selectedEffluent === 1 ? false : true}
                    type="number"
                    name="Percent_Removal"
                    value={
                      ixStore.selectedEffluent === 1 ? ixStore.effluentValue : 0
                    }
                    onChange={txtChange}
                    id="co"
                    inputText="%"
                  />
                </div>
                <div className="co-pressure">
                  <CustomRadio
                    disabled={ixStore.degasifation_ind ? false : true}
                    checked={ixStore.selectedEffluent === 2 ? true : false}
                    type="radio"
                    id="radio2"
                    value={2}
                    name="selectedEffluent"
                    onClick={EffluentClick}
                    label="CO₂ Partial Pressure"
                  />
                  <InputWithText
                    isError={ixStore?.effluentValue < 0 ||
                      ixStore?.effluentValue >1000000
                       }
                    isWarning={false}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(1)}
                    isFocused={isFocused === 2}
                    disabled={ixStore.selectedEffluent === 2 ? false : true}
                    type="number"
                    name="CO2_Partial_Pressure"
                    value={
                      ixStore.selectedEffluent === 2 ? ixStore.effluentValue : 0
                    }
                    onChange={txtChange}
                    id="co"
                    inputText={unit.selectedUnits[6]}
                  />
                </div>
                <div className="co-concentration">
                  <CustomRadio
                    disabled={ixStore.degasifation_ind ? false : true}
                    checked={ixStore.selectedEffluent === 3 ? true : false}
                    type="radio"
                    id="radio3"
                    value={3}
                    name="selectedEffluent"
                    onClick={EffluentClick}
                    label="CO₂ Concentration"
                  />
                  <InputWithText
                    isError={
                      ixStore?.effluentValue < 0 ||
                      ixStore?.effluentValue >1000000
                    }
                    isWarning={false}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(3)}
                    isFocused={isFocused === 3}
                    disabled={ixStore.selectedEffluent === 3 ? false : true}
                    type="number"
                    name="CO2_Concentration"
                    value={
                      ixStore.selectedEffluent === 3 ? ixStore.effluentValue : 0
                    } 
                    onChange={txtChange}
                    id="co"
                    inputText="mg/L"
                  />
                </div>
              </div>
              <div className="location">
                <div className="location-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Location"
                  />
                  <div className="vertical-line"></div>
                </div>
                <div className="location-radio-group">
                  <CustomRadio
                    disabled={ixStore.degasifation_ind ? false : true}
                    type="radio"
                    id="radio4"
                    value={0}
                    name="location"
                    onClick={LocationClick}
                    checked={ixStore.location == 0 ? true : false}
                    label="After WAC, Before SAC"
                  />
                  <CustomRadio
                    disabled={ixStore.degasifation_ind ? false : true}
                    type="radio"
                    id="radio5"
                    value={1}
                    name="location"
                    onClick={LocationClick}
                    checked={
                      defaultAfterCation == true || ixStore.location == 1
                        ? true
                        : false
                    }
                    label="After cation resin, Before anion resin"
                  />
                  <CustomRadio
                    disabled={ixStore.degasifation_ind ? false : true}
                    type="radio"
                    id="radio6"
                    value={2}
                    name="location"
                    onClick={LocationClick}
                    checked={ixStore.location == 2 ? true : false}
                    label="After WBA, Before SBA"
                  />
                </div>
              </div>
            </Card.Body>
          </StyledCard>
        </div>
        {isSumValid && (
          <ProjectErrorPopup
            show={isSumValid}
            close={() => {
              setIsSumValid(false);
              setIsFocused(1);
            }}
            message={message}
          />
        )}
      </VesselRegenerationSystemStyled>
    </>
  );
};

export default VesselRegenerationSystem;
