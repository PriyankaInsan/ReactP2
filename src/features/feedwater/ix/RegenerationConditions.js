import React, { useState, useEffect, useRef } from "react";
import { Card, Form, InputGroup, Row } from "react-bootstrap";
import SystemDiagram from "./SystemDiagram";
import InfoIcon from "../../../common/icons/InfoIcon";
import RegenerationConditionsStyled from "./RegenerationConditionsStyled";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/utils/Loader";
import { updateLoader } from "../../home/CardListSlice";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import {
  updateAdvRegenAniondata,
  updateAdvRegenCationdata,
  updateAnionInitialization,
  updateAnionRegen,
  updateAnionResin,
  updateAnionService,
  updateCationInitialization,
  updateCationRegen,
  updateCationResin,
  updateCationService,
  updateError,
  updateProductQualityRegenerantDose,
  updateRegenerantList,
} from "./IXDSlice";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitTypeTemp } from "../../../common/utils/GlobalUnitConversionSlice";
const RegenerationConditions = () => {
  const [getRegenerationCondValues, responseRegenerationCondValues] =
    useLazyGetAllDataQuery();
  const [getRangesValues, responseRangesValues] = useLazyGetAllDataQuery();
  const [regenerationCondValuesList1, setRegenerationCondValuesList1] =
    useState();
  const [regenerationCondValuesList2, setRegenerationCondValuesList2] =
    useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAnionOption, setSelectedAnionOption] = useState("");
  const [isSumValid, setIsSumValid] = useState(false);
  const [isSumAnionValid, setIsSumAnionValid] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [autoFocusValue, setAutoFocusValue] = useState(false);
  const [message, setMessage] = useState("");
  const designTemp = useSelector(
    (state) =>
      state?.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  // const [designTemp, setDesignTemp] = useState(designTemp1);
  // console.log("Temperdesign", designTemp);
  const dispatch = useDispatch();
  const regen = useSelector((state) => state.IXStore?.data);
  // const validdesignID = useSelector(
  //   (state) => state.IXStore.vesselData.validDesignID
  // );
  const ixStoreCation = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[0]
  );
  const ixStoreAnion = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[1]
  );
  const {
    validDesignID,
    vessel1,
    vessel2,
    vessel3,
    vessel4,
    anionResin,
    cationResin,
    selectedProcessID,
  } = useSelector((state) => state.IXStore.data);

  const { unitFlag, unitTypeTemp } = useSelector(
    (state) => state.GUnitConversion
  );
  const feedDataJson = useSelector((state) =>
    state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0].streams[0]?.cations?.find(
      (ion) => ion.name == "Ca"
    )
  );
  const StoreData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.data
  );
  console.log("feedDataJsonIONNNN", feedDataJson);

  const cationRegenData = useSelector(
    (state) => state.IXStore?.updateCationRegenData
  );
  const AnionRegenData = useSelector(
    (state) => state.IXStore?.updateAnionRegenData
  );
  const loader = useSelector((state) => state.cardlist.loader);

  const cationResinCondition = useSelector(
    (state) => state.IXStore?.cationResinConditions
  );
  const resinVal = useSelector((state) => state.IXStore.data?.listRegenConds);
  const anionResinCondition = useSelector(
    (state) => state.IXStore?.anionResinConditions
  );
  const cationServiceWater = useSelector(
    (state) => state.IXStore?.updateCationObject
  );
  const anionServiceWater = useSelector(
    (state) => state.IXStore?.updateAnionObject
  );
  // const { vessel1, vessel2, vessel3, vessel4, anionResin, cationResin } =
  //   useSelector((state) => state.IXStore.data);
  const cationAdvRegen = useSelector(
    (state) => state.IXStore?.updateCationDataAdvRegen
  );
  const anionAdvRegen = useSelector(
    (state) => state.IXStore?.updateAnionDataAdvRegen
  );
  //Unit conversion
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );

  //New project first time error validation
  // useEffect(() => {
  //   if (
  //     resinVal.length === 0 ||
  //     resinVal.length === 1 ||
  //     resinVal[0]?.regenerantID === -1 ||
  //     resinVal[1]?.regenerantID === -1
  //   ) {
  //     dispatch(updateError(4));
  //   }
  // }, []);
  const showInDropDown = useSelector(
    (state) =>
      state?.projectInfo?.projectConfig?.chemicalConfig?.showInDropDownChem
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // useEffect(() => {
  //   console.log("Temperunit", unitFlag);
  //   if (unitFlag) {
  //     const temper = GlobalUnitConversion(
  //       GlobalUnitConversionStore,
  //       designTemp1,
  //       unit.selectedUnits[2],
  //       unitTypeTemp
  //     );
  //     setDesignTemp(temper);

  //     console.log("Temper", temper);

  //     dispatch(updateUnitTypeTemp(unit.selectedUnits[2]));
  //   }
  // }, [unit.selectedUnits, designTemp1, designTemp]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsSumValid(false);
      setIsSumAnionValid(false);
      setAutoFocusValue(false);
    }
  };
  //----------------For Ixd regeneration concentration exception case code starts---------------------

  useEffect(() => {
    const totalcat = StoreData?.map((a) =>
      a.cations.reduce(
        (total, currentValue) => (total = total + currentValue.meqL),
        0
      )
    );
    const variable = {
      selectedProcessID: 7, //processID
      col1Regenerant: resinVal[0]?.regenerantID, //RegenerantID cation
      ResinSelectionID: cationResin, //cationResin from cation & 7also
      col1ResinProcess: cationAdvRegen?.extraParams?.col1ResinProcess, //will get from api
      resultCO2: feedDataJson?.meqL, // cation calcium meql
      resultTotalCations: totalcat[0], // total cations meql
      col1RegenSystem: cationAdvRegen?.extraParams?.col1RegenSystem, //will get from api
      // col1RegenSystem: 0,

      resincount1: cationAdvRegen?.extraParams?.resincount1, //will get from api
      // VesselSelectionID1: cationAdvRegen?.extraParams?.vesselSelectionID1, //will get from api
      // VesselSelectionID2: cationAdvRegen?.extraParams?.vesselSelectionID2, //will get from api
      // VesselSelectionID3: cationAdvRegen?.extraParams?.vesselSelectionID3, //will get from api
      // VesselSelectionID4: cationAdvRegen?.extraParams?.vesselSelectionID4, //will get from api
      VesselSelectionID1: vessel1,
      VesselSelectionID2: vessel2,
      VesselSelectionID3: vessel3,
      VesselSelectionID4: vessel4,
      regenprotcount: cationAdvRegen?.extraParams?.regenprotcount, //will get from api
      RegenerantDoseTypical1:
        cationAdvRegen?.typicalValue?.regenerantDoseTypical, //getting value in frontend---concentraion.

      resultvesseltype: cationAdvRegen?.extraParams?.resultvesseltype, //will get from api
      RegenerantConcTypical1:
        cationAdvRegen?.typicalValue?.regenerantConcTypical,
    };
    const treatmentObjID = 5;
    let IsWACSACH2SO4 = false;
    let IsMultiStepRegen = false;
    let caCationRatio = 1;
    let acidConcPrelim = 0;
    let col1StepSuggested = 0;
    let acidConcAdj = 0;
    let step1Conc = 0;
    let step2Conc = 0;
    let step3Conc = 0;
    let step1Dose = 0;
    let step2Dose = 0;
    let step3Dose = 0;
    let step1_ind = true;
    let step2_ind = false;
    let step3_ind = false;

    const FlagOverallProcess = variable.selectedProcessID;

    if (
      (FlagOverallProcess == 7 &&
        variable.col1Regenerant == 2 &&
        variable.ResinSelectionID == 5) ||
      variable.ResinSelectionID == 7
    ) {
      IsWACSACH2SO4 = true;
    } else {
      IsWACSACH2SO4 = false;
    }

    if (variable.col1ResinProcess == 2 && variable.col1Regenerant == 2) {
      IsMultiStepRegen = true;
    } else {
      IsMultiStepRegen = false;
    }
    if (IsMultiStepRegen && variable.resultTotalCations != 0) {
      caCationRatio = variable.resultCO2 / variable.resultTotalCations;
      let tmp = 0;
      if (variable.col1RegenSystem == 8 || variable.col1RegenSystem == 9) {
        acidConcPrelim = 5 / (4 * caCationRatio + 1);
      } else {
        if (variable.resincount1 == 1) {
          tmp = variable.VesselSelectionID1;
        } else if (variable.resincount1 == 2) {
          tmp = variable.VesselSelectionID2;
        } else if (variable.resincount1 == 3) {
          tmp = variable.VesselSelectionID3;
        } else if (variable.resincount1 == 4) {
          tmp = variable.VesselSelectionID4;
        }
        if (tmp == 0) {
          acidConcPrelim = 5 / (5 * caCationRatio + 1);
        } else {
          acidConcPrelim = 6 / (5 * caCationRatio + 1);
        }
      }
      if (variable.regenprotcount >= 1) {
        if (variable.col1Regenerant == 2 && variable.col1ResinProcess == 2) {
          if (
            caCationRatio * 100 > 60 &&
            variable.RegenerantDoseTypical1 > 90 &&
            IsWACSACH2SO4 === false
          ) {
            col1StepSuggested = 3;
          } else {
            if (
              caCationRatio * 100 > 10 &&
              variable.RegenerantDoseTypical1 > 60 &&
              IsWACSACH2SO4 == false
            ) {
              col1StepSuggested = 2;
            } else {
              col1StepSuggested = 1;
            }
          }
        } else if (
          (variable.col1Regenerant == 2 && variable.col1ResinProcess == 10) ||
          (variable.col1Regenerant == 2 && variable.col1ResinProcess == 12)
        ) {
          if (
            caCationRatio * 100 > 60 &&
            variable.RegenerantDoseTypical1 > 90 &&
            IsWACSACH2SO4 == false
          ) {
            col1StepSuggested = 3;
          } else {
            if (
              caCationRatio * 100 > 10 &&
              variable.RegenerantDoseTypical1 > 60 &&
              IsWACSACH2SO4 == false
            ) {
              col1StepSuggested = 2;
            } else {
              col1StepSuggested = 1;
            }
          }
        } else {
          col1StepSuggested = 1;
        }
      } else {
        col1StepSuggested = 1;
      }
      if (col1StepSuggested >= 2 && acidConcPrelim > 2.5) {
        acidConcAdj = 2.5;
      } else {
        if (col1StepSuggested >= 3 && acidConcPrelim > 2) {
          acidConcAdj = 2;
        } else {
          if (
            col1StepSuggested >= 2 &&
            (variable.col1RegenSystem == 1 || variable.col1RegenSystem == 6)
          ) {
            acidConcAdj = 2;
          } else {
            if (IsWACSACH2SO4 == true && acidConcPrelim > 2) {
              acidConcAdj = 2;
            } else {
              if (variable.resultvesseltype != null) {
                if (variable.resultvesseltype === "Layered") {
                  acidConcAdj = 0.7;
                } else {
                  acidConcAdj = acidConcPrelim;
                }
              }
            }
          }
        }
      }
    } else {
      col1StepSuggested = 1;
    }
    if (col1StepSuggested == 1) {
      if (IsMultiStepRegen) {
        step1Conc = parseFloat(acidConcAdj * col1StepSuggested).toFixed(2);
        step1Dose = parseInt(100 / col1StepSuggested);
        step1_ind = true;
      } else {
        step1Conc = parseFloat(variable.RegenerantConcTypical1).toFixed(2);
        step1Dose = parseInt(100 / col1StepSuggested);
        step1_ind = true;
      }
    } else if (col1StepSuggested == 2) {
      step1_ind = true;
      step2_ind = true;
      step1Dose = parseInt(100 / col1StepSuggested);
      step2Dose = parseInt(100 / col1StepSuggested);
      if (variable.regenprotcount >= 0) {
        step1Conc = parseFloat(acidConcAdj * (col1StepSuggested - 1)).toFixed(
          2
        );
        step2Conc = parseFloat(acidConcAdj * col1StepSuggested).toFixed(2);
      } else {
        step2Conc = 0;
      }
    } else if (col1StepSuggested == 3) {
      step1_ind = true;
      step2_ind = true;
      step3_ind = true;
      step1Dose = parseInt(100 / col1StepSuggested);
      step2Dose = parseInt(100 / col1StepSuggested);
      step3Dose = Math.ceil(100 - (2 * 100) / col1StepSuggested);
      if (variable.regenprotcount >= 1) {
        step1Conc = parseFloat(acidConcAdj * (col1StepSuggested - 2)).toFixed(
          2
        );
        step2Conc = parseFloat(acidConcAdj * (col1StepSuggested - 1)).toFixed(
          2
        );
        step3Conc = parseFloat(acidConcAdj * col1StepSuggested).toFixed(2);
      } else {
        step2Conc = 0;
        step3Conc = 0;
      }
    }

    const selectedResin = {
      ...cationResinCondition,
      ["step1Con"]: step1Conc,
      ["step2Con"]: step2Conc,
      ["step3Con"]: step3Conc,
      ["step1DosFrac"]: step1Dose,
      ["step2DosFrac"]: step2Dose,
      ["step3DosFrac"]: step3Dose,
      ["step1_ind"]: step1_ind,
      ["step2_ind"]: step2_ind,
      ["step3_ind"]: step3_ind,
    };
    dispatch(updateCationInitialization(selectedResin));
    dispatch(updateCationResin(selectedResin));

    console.log("IsWACSACH2SO4", IsWACSACH2SO4);
    console.log("IsMultiStepRegen", IsMultiStepRegen);
    console.log("caCationRatio", caCationRatio);
    console.log("acidConcAdj", acidConcAdj);
    console.log("acidConcPrelim", acidConcPrelim);
    console.log("col1StepSuggested", col1StepSuggested);
    console.log("step1Conc", step1Conc);
    console.log("step2Conc", step2Conc);
    console.log("step3Conc", step3Conc);
    console.log("step1Dose", step1Dose);
    console.log("step2Dose", step2Dose);
    console.log("step3Dose", step3Dose);
  }, [resinVal[0]?.regenerantID]);

  //----------------For Ixd regeneration concentration exception case code end---------------------

  useEffect(() => {
    try {
      let apiUrl = `${"ix/api/v1/RegenerationCondValues"}?validdesignID=${validDesignID}&userID=${
        regen.userID
      }&projectID=${regen.projectID}`;
      getRegenerationCondValues(apiUrl);
    } catch {
      console.log("Error: Fetch IXResin data");
    }
  }, [showInDropDown]);
  useEffect(() => {
    if (responseRegenerationCondValues.isLoading) {
      dispatch(updateLoader(true));
    } else {
      if (responseRegenerationCondValues.isSuccess === true) {
        dispatch(updateLoader(false));
        dispatch(updateRegenerantList(responseRegenerationCondValues.data));
        setRegenerationCondValuesList1(
          responseRegenerationCondValues.data.regenerantList1
        );
        setRegenerationCondValuesList2(
          responseRegenerationCondValues.data.regenerantList2
        );
      }
    }
  }, [responseRegenerationCondValues]);
  useEffect(() => {
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
      (actionForCation1 === 1 && actionForCation2 === null) ||
      (anionResin !== 10 &&
        cationResin !== 10 &&
        actionForCation1 === 2 &&
        actionForCation2 === null) ||
      (anionResin !== 10 &&
        cationResin !== 10 &&
        actionForCation1 === 2 &&
        actionForCation2 === 1) ||
      (anionResin !== 10 &&
        cationResin !== 10 &&
        actionForCation1 === 2 &&
        actionForCation2 === 2)
    ) {
      const updateObject = {
        ...cationServiceWater,
        ["FW"]: true,
        ["BFW"]: true,
        ["DW"]: false,
        ["BDW"]: true,
      };
      dispatch(updateCationService(updateObject));
      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: null,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
      // }
    } else if (
      (actionForCation1 === 4 && actionForCation2 !== 0) ||
      (actionForCation1 === 5 && actionForCation2 !== 0)
    ) {
      const updateObject = {
        ...cationServiceWater,
        ["BFW"]: false,
        ["BDW"]: false,
        ["FW"]: true,
        ["DW"]: false,
      };
      dispatch(updateCationService(updateObject));
      dispatch(updateCationService(updateObject));
      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: resinVal[0].backwash !== null ? resinVal[0].backwash : 2,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    } else if (actionForCation1 === 0 || actionForCation2 === 0) {
      const updateObject = {
        ...cationServiceWater,
        ["BFW"]: false,
        ["BDW"]: false,
        ["FW"]: false,
        ["DW"]: false,
      };
      dispatch(updateCationService(updateObject));

      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: resinVal[0].backwash !== null ? resinVal[0].backwash : 2,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    } else if (
      (actionForCation1 === 1 && actionForCation2 === 1) ||
      (actionForCation1 === 1 && actionForCation2 === 2)
    ) {
      const updateObject = {
        ...cationServiceWater,
        ["BFW"]: true,
        ["BDW"]: true,
        ["FW"]: false,
        ["DW"]: false,
      };
      dispatch(updateCationService(updateObject));

      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: null,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    } else if (
      (actionForCation1 === 2 && actionForCation2 === 4) ||
      (actionForCation1 === 2 && actionForCation2 === 5)
    ) {
      const updateObject = {
        ...cationServiceWater,
        ["BFW"]: false,
        ["BDW"]: false,
        ["FW"]: true,
        ["DW"]: false,
      };
      dispatch(updateCationService(updateObject));

      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: resinVal[0].backwash !== null ? resinVal[0].backwash : 2,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    } else if (
      (anionResin === 10 && cationResin === 10 && actionForCation1 === 2) ||
      (anionResin === 9 && cationResin === 9 && actionForCation1 === 8) ||
      (anionResin === 9 && cationResin === 9 && actionForCation1 === 9)
    ) {
      const updateObject = {
        ...cationServiceWater,
        ["BFW"]: true,
        ["BDW"]: false,
        ["FW"]: true,
        ["DW"]: false,
      };
      dispatch(updateCationService(updateObject));

      const selectedResin = {
        ...resinVal[0],
        ["serviceWater"]:
          resinVal[0].serviceWater !== null ? resinVal[0].serviceWater : 2,
        ["backwash"]: resinVal[0].backwash !== null ? resinVal[0].backwash : 2,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    }
    if (
      actionForAnion1 === 1 ||
      (anionResin !== 10 && cationResin !== 10 && actionForAnion1 === 2)
    ) {
      const updateObject = {
        ...anionServiceWater,
        ["BDW"]: true,
        ["DW"]: false,
      };
      dispatch(updateAnionService(updateObject));

      const selectedResin = {
        ...resinVal[1],
        ["serviceWater"]:
          resinVal[1]?.serviceWater !== null ? resinVal[1]?.serviceWater : 1,
        ["backwash"]: null,
      };
      dispatch(updateAnionInitialization(selectedResin));
      dispatch(updateAnionResin(selectedResin));
    } else {
      const updateObject = {
        ...anionServiceWater,
        ["BDW"]: false,
        ["DW"]: false,
      };
      dispatch(updateAnionService(updateObject));

      const selectedResin = {
        ...resinVal[1],
        ["serviceWater"]:
          resinVal[1]?.serviceWater !== null ? resinVal[1]?.serviceWater : 1,
        ["backwash"]:
          resinVal[1]?.backwash !== null ? resinVal[1]?.backwash : 1,
      };
      dispatch(updateAnionInitialization(selectedResin));
      dispatch(updateAnionResin(selectedResin));
    }
  }, []);
  // const validateSum = () => {
  //   let sumVal = true;
  //   const val1 =
  //     cationResinCondition?.step1DosFrac.toString() === "NaN"
  //       ? 0
  //       : cationResinCondition?.step1DosFrac;
  //   const val2 =
  //     cationResinCondition?.step2DosFrac.toString() === "NaN"
  //       ? 0
  //       : cationResinCondition?.step2DosFrac;

  //   const val3 =
  //     cationResinCondition?.step3DosFrac.toString() === "NaN"
  //       ? 0
  //       : cationResinCondition?.step3DosFrac;

  //   const sum1 = val1 + val2;
  //   const sum2 = val1 + val2 + val3;

  //   if (
  //     cationResinCondition?.step1DosFrac !== 0 &&
  //     cationResinCondition?.step2DosFrac !== 0 &&
  //     cationResinCondition?.step3DosFrac === 0
  //   ) {
  //     // setIsSumValid(sum1 === 100);
  //     sumVal = Boolean(sum1 === 100);
  //   } else if (
  //     cationResinCondition?.step1DosFrac !== 0 * 1 &&
  //     cationResinCondition?.step2DosFrac !== 0 * 1 &&
  //     cationResinCondition?.step3DosFrac !== 0 * 1
  //   ) {
  //     sumVal = Boolean(sum2 === 100);
  //   } else {
  //     // setIsSumValid(true);
  //     sumVal = true;
  //   }
  //   if (!sumVal) {
  //     window.alert(
  //       "The sum of dose fractions in the 1st column should add up to 100 %."
  //     );

  //     setIsSumValid(true);
  //     // const selectedResin = {
  //     //   ...cationResinCondition,
  //     //   // ["step2DosFrac"]: parseFloat("0", 10),
  //     //   ["step3DosFrac"]: parseFloat("0", 10),
  //     //   ["step3Con"]: parseFloat("0", 10),
  //     // };
  //     // dispatch(updateCationInitialization(selectedResin));

  //     // dispatch(updateCationResin(selectedResin));
  //   }
  //   setIsFocused(null);
  // };
  // const validateAnionSum = () => {
  //   let sumVal = true;
  //   const val1 =
  //     anionResinCondition?.step1DosFrac.toString() === "NaN"
  //       ? 0
  //       : anionResinCondition?.step1DosFrac;
  //   const val2 =
  //     anionResinCondition?.step2DosFrac.toString() === "NaN"
  //       ? 0
  //       : anionResinCondition?.step2DosFrac;

  //   const val3 =
  //     anionResinCondition?.step3DosFrac.toString() === "NaN"
  //       ? 0
  //       : anionResinCondition?.step3DosFrac;
  //   const sum1 = val1 + val2;
  //   const sum2 = val1 + val2 + val3;
  //   if (
  //     anionResinCondition?.step1DosFrac !== 0 &&
  //     anionResinCondition?.step2DosFrac !== 0 &&
  //     anionResinCondition?.step3DosFrac === 0
  //   ) {
  //     // setIsSumValid(sum1 === 100);
  //     sumVal = Boolean(sum1 === 100);
  //   } else if (
  //     anionResinCondition?.step1DosFrac !== 0 * 1 &&
  //     anionResinCondition?.step2DosFrac !== 0 * 1 &&
  //     anionResinCondition?.step3DosFrac !== 0 * 1
  //   ) {
  //     sumVal = Boolean(sum2 === 100);
  //   } else {
  //     // setIsSumValid(true);
  //     sumVal = true;
  //   }
  //   if (!sumVal) {
  //     // window.alert(
  //     //   "The sum of dose fractions in the 1st column should add up to 100 %."
  //     // );
  //     setIsSumAnionValid(true);

  //     const selectedResin = {
  //       ...anionResinCondition,
  //       // ["step2DosFrac"]: parseFloat("0", 10),
  //       ["step3DosFrac"]: parseFloat("0", 10),
  //       ["step3Con"]: parseFloat("0", 10),
  //     };
  //     dispatch(updateAnionInitialization(selectedResin));
  //     dispatch(updateAnionResin(selectedResin));
  //   }
  //   setIsFocused(null);
  // };
  useEffect(() => {
    let apiUrl1 = `${"ix/api/v1/AdvancedRegen"}?userID=${
      regen.userID
    }&projectID=${
      regen.projectID
    }&validdesignID=${validDesignID}&regenerantID=${
      resinVal[0]?.regenerantID
    }&columnNum=${1}`;
    if (vessel1 !== null) {
      apiUrl1 += `&vessel1=${vessel1}`;
    }
    if (vessel2 !== null) {
      apiUrl1 += `&vessel2=${vessel2}`;
    }
    if (vessel3 !== null) {
      apiUrl1 += `&vessel3=${vessel3}`;
    }
    if (vessel4 !== null) {
      apiUrl1 += `&vessel4=${vessel4}`;
    }
    try {
      getRangesValues(apiUrl1).then((responseRangesValues) => {
        if (responseRangesValues.isLoading) {
          console.log("Loading");
        } else {
          if (responseRangesValues.isSuccess === true) {
            console.log(responseRangesValues.data, "Ranges");
            dispatch(updateAdvRegenCationdata(responseRangesValues.data));
          }
        }
      });
    } catch {
      console.log("Error: Fetch Range data");
    }
  }, []);
  useEffect(() => {
    let apiUrl1 = `${"ix/api/v1/AdvancedRegen"}?userID=${
      regen.userID
    }&projectID=${
      regen.projectID
    }&validdesignID=${validDesignID}&regenerantID=${
      resinVal[1]?.regenerantID
    }&columnNum=${2}`;
    if (vessel1 !== null) {
      apiUrl1 += `&vessel1=${vessel1}`;
    }
    if (vessel2 !== null) {
      apiUrl1 += `&vessel2=${vessel2}`;
    }
    if (vessel3 !== null) {
      apiUrl1 += `&vessel3=${vessel3}`;
    }
    if (vessel4 !== null) {
      apiUrl1 += `&vessel4=${vessel4}`;
    }
    try {
      getRangesValues(apiUrl1).then((responseRangesValues) => {
        if (responseRangesValues.isLoading) {
          console.log("Loading");
        } else {
          if (responseRangesValues.isSuccess === true) {
            console.log(responseRangesValues.data, "Ranges");
            dispatch(updateAdvRegenAniondata(responseRangesValues.data));
            // setRangeAnion(responseRangesValues.data);
          }
        }
      });
    } catch {
      console.log("Error: Fetch Range data");
    }
  }, []);
  const handleCationRadioChange = (e) => {
    const val = parseInt(e.target.value);
    if (val === 0) {
      const selectedResin = {
        ...cationResinCondition,
        ["temperatureID"]: val,
        ["temperature"]:
          unit.selectedUnits[2] === "°C"
            ? designTemp
            : parseFloat(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  designTemp,
                  unit.selectedUnits[2],
                  "°C"
                )
              ).toFixed(1),
      };
      dispatch(updateCationInitialization(selectedResin));

      dispatch(updateCationResin(selectedResin));
    }
    if (val === 1) {
      const selectedResin = {
        ...cationResinCondition,
        ["temperatureID"]: val,
        ["temperature"]:
        unit.selectedUnits[2] === "°C"
          ? designTemp
          : parseFloat(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                designTemp,
                unit.selectedUnits[2],
                "°C"
              )
            ).toFixed(1),
      };
      dispatch(updateCationInitialization(selectedResin));

      dispatch(updateCationResin(selectedResin));
    }
  };
  const handleCationInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      const selectedResin = {
        ...cationResinCondition,
        ["temperature"]: e.target.value,
      };
      dispatch(updateCationInitialization(selectedResin));
      dispatch(updateCationResin(selectedResin));
    }

    // setInputValue(e.target.value);
  };
  const handleCationDdChange = (e) => {
    const selectedValue = e.target.value;
    const [chemicalId, ixregenerantId] = selectedValue.split("|");
    let apiUrl1 = `${"ix/api/v1/AdvancedRegen"}?userID=${
      regen.userID
    }&projectID=${
      regen.projectID
    }&validdesignID=${validDesignID}&regenerantID=${parseInt(
      ixregenerantId
    )}&columnNum=${1}`;
    if (vessel1 !== null) {
      apiUrl1 += `&vessel1=${vessel1}`;
    }
    if (vessel2 !== null) {
      apiUrl1 += `&vessel2=${vessel2}`;
    }
    if (vessel3 !== null) {
      apiUrl1 += `&vessel3=${vessel3}`;
    }
    if (vessel4 !== null) {
      apiUrl1 += `&vessel4=${vessel4}`;
    }
    try {
      getRangesValues(apiUrl1).then((responseRangesValues) => {
        if (responseRangesValues.isLoading) {
          console.log("Loading");
        } else {
          if (responseRangesValues.isSuccess === true) {
            dispatch(updateAdvRegenCationdata(responseRangesValues.data));

            const selectedResin = {
              ...cationResinCondition,
              ["chemicalID"]: chemicalId,
              ["regenerantID"]: parseInt(ixregenerantId),
              // ["step1Con"]:
              //   responseRangesValues.data.typicalValue.regenerantConcTypical,
              // ["step1DosFrac"]: resinVal[0].step1DosFrac
              //   ? resinVal[0].step1DosFrac
              //   : 100,
            };
            dispatch(updateCationInitialization(selectedResin));

            dispatch(updateCationResin(selectedResin));
            const mBChecker1 =
              (regen.cationResin === 9 &&
                regen.anionResin === 9 &&
                regen.vessel1 === 8) ||
              (regen.cationResin === 10 &&
                regen.anionResin === 10 &&
                regen.vessel1 === 2);

            const selectedRegen = {
              ...cationRegenData,
              ["vesselID"]: 1,
              ["bwFrequency"]: parseFloat(1).toFixed(2),
              ["bwExpansion"]: parseFloat(
                responseRangesValues.data?.typicalValue?.bWExpansion
              ).toFixed(2),
              ["bwDuration"]: parseFloat(
                responseRangesValues.data?.typicalValue?.bWDuration
              ).toFixed(2),
              ["compactionDuration"]: parseFloat(
                responseRangesValues.data?.typicalValue?.compactionDuration
              ).toFixed(2),
              ["regenerationVelocity"]:
                unit.selectedUnits[10] === "BV/h"
                  ? responseRangesValues.data?.typicalValue?.regSpaceVelocity
                  : parseFloat(
                      GlobalUnitConversion(
                        GlobalUnitConversionStore,
                        responseRangesValues.data?.typicalValue
                          ?.regSpaceVelocity,
                        unit.selectedUnits[10],
                        "BV/h"
                      )
                    ).toFixed(2),

              ["regenerationFactor"]: mBChecker1
                ? parseFloat(110).toFixed(2)
                : parseFloat(100).toFixed(2),
              ["displacementFlow"]: 1,
              ["displacementVolume"]: parseFloat(
                responseRangesValues.data?.typicalValue?.displacementRinseVolume
              ).toFixed(2),
              ["fatRinseRecycle"]: 3,
              ["fatRinseVolume"]: parseFloat(
                responseRangesValues.data?.typicalValue?.fastRisneValue
              ).toFixed(2),
              ["settingDuration"]: parseFloat(10).toFixed(2),
            };
            dispatch(updateCationRegen(selectedRegen));

            dispatch(
              updateProductQualityRegenerantDose([
                {
                  ...ixStoreCation,
                  ["regenerantDoseVal4"]:    GlobalUnitConversion(
                    GlobalUnitConversionStore,
                    responseRangesValues.data?.typicalValue
                    ?.regenerantDoseTypical,
                    unit.selectedUnits[14],
                    "g/L"
                 ),

                },
                ixStoreAnion,
              ])
            );
          }
        }
      });
    } catch {
      console.log("Error: Fetch Range data");
    }
  };
  const handleCationCheck = (e) => {
    const selectedResin = {
      ...cationResinCondition,
      [e.target.name]: e.target.checked,
    };
    dispatch(updateCationInitialization(selectedResin));
    dispatch(updateCationResin(selectedResin));
  };
  const handleCationCheckInput = (e) => {
    const selectedResin = {
      ...cationResinCondition,
      [e.target.name]: parseFloat(e.target.value),
    };
    dispatch(updateCationInitialization(selectedResin));

    dispatch(updateCationResin(selectedResin));
  };
  const handleCationBWRadio = (val) => {
    const selectedResin = {
      ...cationResinCondition,
      ["backwash"]: val,
    };
    dispatch(updateCationInitialization(selectedResin));

    dispatch(updateCationResin(selectedResin));
  };
  const handleCationSWRadio = (val) => {
    const selectedResin = {
      ...cationResinCondition,
      ["serviceWater"]: val,
    };
    dispatch(updateCationInitialization(selectedResin));

    dispatch(updateCationResin(selectedResin));
  };
  const handleAnionDdChange = (e) => {
    const selectedValue = e.target.value;
    const [chemicalId, ixregenerantId] = selectedValue.split("|");
    let apiUrl1 = `${"ix/api/v1/AdvancedRegen"}?userID=${
      regen.userID
    }&projectID=${
      regen.projectID
    }&validdesignID=${validDesignID}&regenerantID=${parseInt(
      ixregenerantId
    )}&columnNum=${2}`;
    if (vessel1 !== null) {
      apiUrl1 += `&vessel1=${vessel1}`;
    }
    if (vessel2 !== null) {
      apiUrl1 += `&vessel2=${vessel2}`;
    }
    if (vessel3 !== null) {
      apiUrl1 += `&vessel3=${vessel3}`;
    }
    if (vessel4 !== null) {
      apiUrl1 += `&vessel4=${vessel4}`;
    }
    try {
      getRangesValues(apiUrl1).then((responseRangesValues) => {
        if (responseRangesValues.isLoading) {
          console.log("Loading");
        } else {
          if (responseRangesValues.isSuccess === true) {
            dispatch(updateAdvRegenAniondata(responseRangesValues.data));
            const selectedResin = {
              ...anionResinCondition,
              ["chemicalID"]: chemicalId,
              ["regenerantID"]: parseInt(ixregenerantId),
              ["step1Con"]: parseFloat(
                responseRangesValues.data.typicalValue.regenerantConcTypical
              ).toFixed(2),
              ["step1DosFrac"]: resinVal[1]?.step1DosFrac
                ? parseFloat(resinVal[1]?.step1DosFrac).toFixed(2)
                : parseFloat(100).toFixed(2),
            };
            dispatch(updateAnionInitialization(selectedResin));
            dispatch(updateAnionResin(selectedResin));

            const mBChecker1 =
              (regen.cationResin === 9 &&
                regen.anionResin === 9 &&
                regen.vessel1 === 8) ||
              (regen.cationResin === 10 &&
                regen.anionResin === 10 &&
                regen.vessel1 === 2);
            const selectedRegen = {
              ...AnionRegenData,
              ["vesselID"]: 2,
              ["bwFrequency"]: parseFloat(1).toFixed(2),
              ["bwExpansion"]: parseFloat(
                responseRangesValues.data?.typicalValue?.bWExpansion
              ).toFixed(2),
              ["bwDuration"]: parseFloat(
                responseRangesValues.data?.typicalValue?.bWDuration
              ).toFixed(2),
              ["compactionDuration"]: parseFloat(
                responseRangesValues.data?.typicalValue?.compactionDuration
              ).toFixed(2),
              ["regenerationVelocity"]:
                unit.selectedUnits[10] === "BV/h"
                  ? responseRangesValues.data?.typicalValue?.regSpaceVelocity
                  : parseFloat(
                      GlobalUnitConversion(
                        GlobalUnitConversionStore,
                        responseRangesValues.data?.typicalValue
                          ?.regSpaceVelocity,
                        unit.selectedUnits[10],
                        "BV/h"
                      )
                    ).toFixed(2),

              ["regenerationFactor"]: mBChecker1
                ? parseFloat(110).toFixed(2)
                : parseFloat(100).toFixed(2),
              ["displacementFlow"]: 1,
              ["displacementVolume"]: parseFloat(
                responseRangesValues.data?.typicalValue?.displacementRinseVolume
              ).toFixed(2),
              ["fatRinseRecycle"]: 3,
              ["fatRinseVolume"]: parseFloat(
                responseRangesValues.data?.typicalValue?.fastRisneValue
              ).toFixed(2),
              ["settingDuration"]: parseFloat(10).toFixed(2),
            };

            dispatch(updateAnionRegen(selectedRegen));
            dispatch(
              updateProductQualityRegenerantDose([
                ixStoreCation,
                {
                  ...ixStoreAnion,
                  ["regenerantDoseVal4"]:
                  GlobalUnitConversion(
                    GlobalUnitConversionStore,
                    responseRangesValues.data?.typicalValue
                    ?.regenerantDoseTypical,
                    unit.selectedUnits[14],
                    "g/L"
                 ),
  
                },
              ])
            );
          }
        }
      });
    } catch {
      console.log("Error: Fetch Range data");
    }
  };
  const handleAnionRadioChange = (e) => {
    const val = parseInt(e.target.value);
    if (val === 0) {
      const selectedResin = {
        ...anionResinCondition,
        ["temperatureID"]: val,
        ["temperature"]:
          unit.selectedUnits[2] === "°C"
            ? designTemp
            : parseFloat(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  designTemp,
                  unit.selectedUnits[2],
                  "°C"
                )
              ).toFixed(1),
      };
      dispatch(updateAnionInitialization(selectedResin));

      dispatch(updateAnionResin(selectedResin));
    }
    if (val === 1) {
      const selectedResin = {
        ...anionResinCondition,
        ["temperatureID"]: val,
        ["temperature"]:
        unit.selectedUnits[2] === "°C"
          ? designTemp
          : parseFloat(
              GlobalUnitConversion(
                GlobalUnitConversionStore,
                designTemp,
                unit.selectedUnits[2],
                "°C"
              )
            ).toFixed(1),
      };
      dispatch(updateAnionInitialization(selectedResin));

      dispatch(updateAnionResin(selectedResin));
    }
  };
  const handleAnionInputChange = (e) => {
    const inputValue = e.target.value;

    if (!isNaN(inputValue)) {
      const selectedResin = {
        ...anionResinCondition,
        ["temperature"]: e.target.value,
      };
      dispatch(updateAnionInitialization(selectedResin));
      dispatch(updateAnionResin(selectedResin));
    }
  };
  const handleAnionCheck = (e) => {
    const selectedResin = {
      ...anionResinCondition,
      [e.target.name]: e.target.checked,
    };
    dispatch(updateAnionInitialization(selectedResin));

    dispatch(updateAnionResin(selectedResin));
  };
  const handleAnionCheckInput = (e) => {
    const selectedResin = {
      ...anionResinCondition,
      [e.target.name]: parseFloat(e.target.value),
    };
    dispatch(updateAnionInitialization(selectedResin));

    dispatch(updateAnionResin(selectedResin));
  };
  const handleFocus = (e) => {
    setIsFocused(e);
  };

  const CationRangeValidatior = {
    step1Con: {
      minValue: cationAdvRegen?.minMaxRange?.regenerantConcMIN
        ? cationAdvRegen?.minMaxRange?.regenerantConcMIN
        : 1,
      maxValue: cationAdvRegen?.minMaxRange?.regenerantConcMAX
        ? cationAdvRegen?.minMaxRange?.regenerantConcMAX
        : 100,
    },
    step2Con: {
      minValue: 0,
      maxValue: 100,
    },
    step3Con: {
      minValue: 0,
      maxValue: 100,
    },
    step1DosFrac: {
      minValue: 0,
      maxValue: 100,
    },
    step2DosFrac: {
      minValue: 0,
      maxValue: parseFloat(
        `${
          100 - resinVal[0]?.step1DosFrac >= 0
            ? 100 - resinVal[0]?.step1DosFrac
            : 0
        }`
      ),
    },
    step3DosFrac: {
      minValue: 0,
      maxValue: parseFloat(
        `${
          100 - resinVal[0]?.step1DosFrac - resinVal[0]?.step2DosFrac >= 0
            ? 100 - resinVal[0]?.step1DosFrac - resinVal[0]?.step2DosFrac
            : 0
        }`
      ),
    },
    tempCation: {
      minValue:
        unit.selectedUnits[2] === "°C"
          ? 0
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              0,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
      maxValue:
        unit.selectedUnits[2] === "°C"
          ? 100
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              100,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
    },
    tempAnion: {
      minValue:
        unit.selectedUnits[2] === "°C"
          ? 0
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              0,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
      maxValue:
        unit.selectedUnits[2] === "°C"
          ? 100
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              100,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
    },
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "tempCation") {
      if (
        value < parseFloat(CationRangeValidatior[name]?.minValue) ||
        value > parseFloat(CationRangeValidatior[name]?.maxValue) ||
        isNaN(value) ||
        resinVal[0]?.temperature == ""
      ) {
        setAutoFocusValue(true);
        setMessage(
          `The value entered is outside the allowed range(${
            unit.selectedUnits[2] === "°C" ? 0 : 32
          } to ${unit.selectedUnits[2] === "°C" ? 100 : 212}${
            unit.selectedUnits[2]
          }).`
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        const inputValue = e.target.value;
        if (!isNaN(inputValue)) {
          // const selectedResin = {
          //   ...cationResinCondition,
          //   ["temperature"]: parseFloat(e.target.value).toFixed(1),
          // };
          dispatch(
            updateCationInitialization({
              ...cationResinCondition,
              ["temperature"]: parseFloat(e.target.value).toFixed(1),
            })
          );
          dispatch(
            updateCationResin({
              ...cationResinCondition,
              ["temperature"]: parseFloat(e.target.value).toFixed(1),
            })
          );
        }
      }
    } else if (
      e.target.name == "step1DosFrac" ||
      e.target.name == "step2DosFrac" ||
      e.target.name == "step3DosFrac"
    ) {
      if (
        value < CationRangeValidatior[name]?.minValue ||
        value > CationRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage(
          "The sum of dose fractions in the 1st column should add up to 100 %"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateCationInitialization({
            ...cationResinCondition,
            [e.target.name]: parseInt(e.target.value),
          })
        );
        dispatch(
          updateCationResin({
            ...cationResinCondition,
            [e.target.name]: parseInt(e.target.value),
          })
        );
      }
    } else {
      // const selectedResin = {
      //   ...cationResinCondition,
      //   [e.target.name]: parseFloat(e.target.value).toFixed(2),
      // };

      if (
        value < CationRangeValidatior[name]?.minValue ||
        value > CationRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a value within the valid range!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateCationInitialization({
            ...cationResinCondition,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
        dispatch(
          updateCationResin({
            ...cationResinCondition,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
      }
    }
    setIsFocused(null);
  };
  const AnionRangeValidatior = {
    step1Con: {
      minValue: anionAdvRegen?.minMaxRange?.regenerantConcMIN
        ? anionAdvRegen?.minMaxRange?.regenerantConcMIN
        : 1,
      maxValue: anionAdvRegen?.minMaxRange?.regenerantConcMAX
        ? anionAdvRegen?.minMaxRange?.regenerantConcMAX
        : 100,
    },
    step2Con: {
      minValue: 0,
      maxValue: 100,
    },
    step3Con: {
      minValue: 0,
      maxValue: 100,
    },
    step1DosFrac: {
      minValue: 0,
      maxValue: 100,
    },
    step2DosFrac: {
      minValue: 0,
      maxValue: parseFloat(
        `${
          100 - resinVal[1]?.step1DosFrac >= 0
            ? 100 - resinVal[1]?.step1DosFrac
            : 0
        }`
      ),
    },
    step3DosFrac: {
      minValue: 0,
      maxValue: parseFloat(
        `${
          100 - resinVal[1]?.step1DosFrac - resinVal[1]?.step2DosFrac >= 0
            ? 100 - resinVal[1]?.step1DosFrac - resinVal[1]?.step2DosFrac
            : 0
        }`
      ),
    },
    tempAnion: {
      minValue:
        unit.selectedUnits[2] === "°C"
          ? 0
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              0,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
      maxValue:
        unit.selectedUnits[2] === "°C"
          ? 100
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              100,
              unit.selectedUnits[2],
              "°C"
            )?.toFixed(2),
    },
  };
  const handleAnionBlur = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "tempAnion") {
      if (
        value < parseFloat(AnionRangeValidatior[name]?.minValue) ||
        value > parseFloat(AnionRangeValidatior[name]?.maxValue) ||
        isNaN(value) ||
        resinVal[1]?.temperature == ""
      ) {
        setAutoFocusValue(true);
        setMessage(
          `The value entered is outside the allowed range(${
            unit.selectedUnits[2] === "°C" ? 0 : 32
          } to ${unit.selectedUnits[2] === "°C" ? 100 : 212}${
            unit.selectedUnits[2]
          }).`
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        const inputValue = e.target.value;

        if (!isNaN(inputValue)) {
          // const selectedResin = {
          //   ...anionResinCondition,
          //   ["temperature"]: parseFloat(e.target.value).toFixed(1),
          // };
          dispatch(
            updateAnionInitialization({
              ...anionResinCondition,
              ["temperature"]: parseFloat(e.target.value).toFixed(1),
            })
          );
          dispatch(
            updateAnionResin({
              ...anionResinCondition,
              ["temperature"]: parseFloat(e.target.value).toFixed(1),
            })
          );
        }
      }
    } else if (
      e.target.name == "step1DosFrac" ||
      e.target.name == "step2DosFrac" ||
      e.target.name == "step3DosFrac"
    ) {
      if (
        value < AnionRangeValidatior[name]?.minValue ||
        value > AnionRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage(
          "The sum of dose fractions in the 2nd column should add up to 100 %"
        );
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        // const selectedResin = {
        //   ...anionResinCondition,
        //   [e.target.name]: parseFloat(e.target.value).toFixed(2),
        // };
        dispatch(
          updateAnionInitialization({
            ...anionResinCondition,
            [e.target.name]: parseInt(e.target.value),
          })
        );

        dispatch(
          updateAnionResin({
            ...anionResinCondition,
            [e.target.name]: parseInt(e.target.value),
          })
        );
      }
    } else {
      if (
        value < AnionRangeValidatior[name]?.minValue ||
        value > AnionRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a value within the valid range!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateAnionInitialization({
            ...anionResinCondition,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );

        dispatch(
          updateAnionResin({
            ...anionResinCondition,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
      }
    }
    setIsFocused(null);
  };
  return (
    <>
      <RegenerationConditionsStyled>
        <SystemDiagram />
        <div className="card-container">
          <StyledCard className="cation-resin-card">
            <Card.Header>
              <CustomHeading
                label="Cation Resin Conditions"
                fontFamily="DiodrumRegular"
                color={colors.PrimaryDarkAquaMarine}
                fontSize="14px"
                fontWeight="400"
              />
              <Card.Title>
                <IconWithTooltip
                  label="For each regeneration, choose chemical and concentration, temperature, steps, service water."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body className="cation-card-body">
              <CustomLabel label="Regenerant" />
              <CustomSelect
                className=""
                id="select1"
                onChange={handleCationDdChange}
                value={`${resinVal[0]?.chemicalID}|${resinVal[0]?.regenerantID}`}
              >
                <option value={0}>Select a Regenerant</option>
                {regenerationCondValuesList1 &&
                  regenerationCondValuesList1.map((val) => (
                    <option
                      key={val.ixregenerantId}
                      value={`${val.chemicalId}|${val.ixregenerantId}`}
                    >
                      {val.displayName}
                    </option>
                  ))}
              </CustomSelect>
              <div className="temperature">
                <CustomHeading
                  label="Temperature"
                  fontFamily="DiodrumRegular"
                  color={colors.Black}
                  fontSize="14px"
                  fontWeight="400"
                />
                <div className="temp-wrapper">
                  <div className="temp-radio-group">
                    <CustomRadio
                      type="radio"
                      id="radioDesign"
                      // name="radioT"
                      label="Design"
                      onChange={handleCationRadioChange}
                      value={0}
                      checked={resinVal[0]?.temperatureID === 0}
                    />
                    <CustomRadio
                      type="radio"
                      id="radioUser"
                      // name="radioT"
                      label="User Specified"
                      onChange={handleCationRadioChange}
                      value={1}
                      checked={resinVal[0]?.temperatureID === 1}
                    />
                  </div>
                  <div className="input-field">
                    <InputWithText
                      type="number"
                      name="tempCation"
                      isError={
                        resinVal[0]?.temperature <
                          (unit.selectedUnits[2] === "°C" ? 0 : 32) ||
                        resinVal[0]?.temperature >
                          (unit.selectedUnits[2] === "°C" ? 100 : 212) ||
                        resinVal[0]?.temperature == ""
                      }
                      isWarning={false}
                      id="inputBox"
                      placeholder="0.0"
                      disabled={resinVal[0]?.temperatureID === 0}
                      onChange={handleCationInputChange}
                      value={
                        resinVal[0]?.temperatureID === 0
                          ? unit.selectedUnits[2] === "°C"
                            ? designTemp
                            : parseFloat(
                                GlobalUnitConversion(
                                  GlobalUnitConversionStore,
                                  designTemp,
                                  unit.selectedUnits[2],
                                  "°C"
                                )
                              ).toFixed(1)
                          : resinVal[0]?.temperature
                      }
                      // inputText="&deg;C"
                      inputText={unit.selectedUnits[2]}
                      onBlur={(e) => handleBlur(e)}
                      onFocus={() => handleFocus(1)}
                      isFocused={isFocused === 1}
                    />
                  </div>
                </div>
              </div>
              <div className="step1-wrapper">
                <CustomRadioCheck
                  disabled={false}
                  className="checkbox1"
                  type="checkbox"
                  isError={false}
                  id="checkboxT"
                  name="step1_ind"
                  label="Step1"
                  checked={resinVal[0]?.step1_ind}
                  onChange={(e) =>
                    resinVal[0]?.step2_ind ? null : handleCationCheck(e)
                  }
                />
                <div className="input-field">
                  <CustomLabel label="Concentration" />
                  <InputWithText
                    type="number"
                    isError={
                      cationResinCondition?.step1Con <
                        cationAdvRegen?.minMaxRange?.regenerantConcMIN ||
                      cationResinCondition?.step1Con >
                        cationAdvRegen?.minMaxRange?.regenerantConcMAX
                    }
                    isWarning={false}
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step1Con"
                    value={resinVal[0]?.step1Con}
                    disabled={!resinVal[0]?.step1_ind}
                    onChange={handleCationCheckInput}
                    inputText="%"
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(2)}
                    isFocused={isFocused === 2}
                  />
                  <InputReferenceText
                    refText={`Ranges ${
                      cationAdvRegen?.minMaxRange?.regenerantConcMIN
                        ? cationAdvRegen?.minMaxRange?.regenerantConcMIN
                        : 0
                    }-
                    ${
                      cationAdvRegen?.minMaxRange?.regenerantConcMAX
                        ? cationAdvRegen?.minMaxRange?.regenerantConcMAX
                        : 100
                    }`}
                  />
                </div>
                <div className="input-field">
                  <CustomLabel label="Dose Fraction" />
                  <InputWithText
                    type="number"
                    isError={
                      resinVal[0]?.step1DosFrac < 0 ||
                      resinVal[0]?.step1DosFrac > 100
                        ? true
                        : false
                    }
                    isWarning={false}
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step1DosFrac"
                    value={resinVal[0]?.step1DosFrac}
                    onChange={handleCationCheckInput}
                    disabled={!resinVal[0]?.step1_ind}
                    inputText="%"
                    // onBlur={validateSum}
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(3)}
                    isFocused={isFocused === 3}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
              </div>
              <div className="step2-wrapper">
                <CustomRadioCheck
                  className="checkbox1"
                  type="checkbox"
                  isError={false}
                  id="checkboxTA"
                  name="step2_ind"
                  label="Step2"
                  checked={resinVal[0]?.step2_ind}
                  onChange={(e) =>
                    resinVal[0]?.step3_ind ? null : handleCationCheck(e)
                  }
                  disabled={
                    resinVal[0]?.step1_ind === false
                    // resinVal[0]?.step1Con === 0 ||
                    // resinVal[0]?.step1DosFrac === 0
                  }
                />
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isError={
                      resinVal[0]?.step2Con < 0 || resinVal[0]?.step2Con > 100
                        ? true
                        : false
                    }
                    isWarning={false}
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step2Con"
                    value={resinVal[0]?.step2Con}
                    onChange={handleCationCheckInput}
                    disabled={!resinVal[0]?.step2_ind}
                    inputText="%"
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(4)}
                    isFocused={isFocused === 4}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isError={
                      resinVal[0]?.step2DosFrac < 0 ||
                      resinVal[0]?.step2DosFrac >
                        parseFloat(
                          `${
                            100 - resinVal[0]?.step1DosFrac >= 0
                              ? 100 - resinVal[0]?.step1DosFrac
                              : 0
                          }`
                        )
                        ? true
                        : false
                    }
                    isWarning={false}
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step2DosFrac"
                    value={resinVal[0]?.step2DosFrac}
                    onChange={handleCationCheckInput}
                    disabled={!resinVal[0]?.step2_ind}
                    inputText="%"
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(5)}
                    isFocused={isFocused === 5}
                  />
                  <InputReferenceText
                    refText={`Ranges 0-${
                      100 - resinVal[0]?.step1DosFrac >= 0
                        ? 100 - resinVal[0]?.step1DosFrac
                        : 0
                    }`}
                  />
                </div>
              </div>
              <div className="step3-wrapper">
                <CustomRadioCheck
                  isError={false}
                  type="checkbox"
                  className="checkbox1"
                  id="checkboxTB"
                  name="step3_ind"
                  label="Step3"
                  checked={resinVal[0]?.step3_ind}
                  onChange={handleCationCheck}
                  disabled={
                    resinVal[0]?.step2_ind === false
                    // resinVal[0]?.step2Con === 0 ||
                    // resinVal[0]?.step2DosFrac === 0
                    // ||
                    // resinVal[0]?.step2Con.toString() === "NaN" ||
                    // resinVal[0]?.step2DosFrac.toString() === "NaN"
                  }
                />
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isError={
                      resinVal[0]?.step3Con < 0 || resinVal[0]?.step3Con > 100
                        ? true
                        : false
                    }
                    isWarning={false}
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step3Con"
                    value={resinVal[0]?.step3Con}
                    onChange={handleCationCheckInput}
                    disabled={!resinVal[0]?.step3_ind}
                    inputText="%"
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(6)}
                    isFocused={isFocused === 6}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isError={
                      resinVal[0]?.step3DosFrac < 0 ||
                      resinVal[0]?.step3DosFrac >
                        parseFloat(
                          `${
                            100 -
                              resinVal[0]?.step1DosFrac -
                              resinVal[0]?.step2DosFrac >=
                            0
                              ? 100 -
                                resinVal[0]?.step1DosFrac -
                                resinVal[0]?.step2DosFrac
                              : 0
                          }`
                        )
                        ? true
                        : false
                    }
                    isWarning={false}
                    placeholder="0.0"
                    name="step3DosFrac"
                    // defaultValue="0"
                    value={resinVal[0]?.step3DosFrac}
                    onChange={handleCationCheckInput}
                    disabled={!resinVal[0]?.step3_ind}
                    inputText="%"
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(7)}
                    isFocused={isFocused === 7}
                  />
                  <InputReferenceText
                    refText={`Ranges 0-${
                      100 -
                        resinVal[0]?.step1DosFrac -
                        resinVal[0]?.step2DosFrac >=
                      0
                        ? 100 -
                          resinVal[0]?.step1DosFrac -
                          resinVal[0]?.step2DosFrac
                        : 0
                    }`}
                  />
                </div>
              </div>
              <div className="service-water">
                <div className="serviceDisplay">
                  <CustomHeading
                    label="Service Water"
                    fontFamily="NotoSansSemiBold"
                    className="service-water-header"
                    color={colors.Black}
                    fontSize="14px"
                    fontWeight="500"
                  />
                  <div className="lineDisplay"></div>
                </div>
                <div className="service-water-wrapper">
                  <div className="backwash">
                    <CustomHeading
                      label="Backwash"
                      fontFamily="DiodrumRegular"
                      color={colors.Black}
                      fontSize="14px"
                      fontWeight="400"
                    />
                    <CustomRadio
                      type="radio"
                      name="backwash"
                      id="backwashRadioAnionA"
                      value={0}
                      onChange={() => handleCationBWRadio(0)}
                      checked={
                        cationServiceWater?.BFW === false &&
                        resinVal[0]?.backwash === 0
                      }
                      disabled={cationServiceWater?.BFW}
                    />
                    <CustomRadio
                      type="radio"
                      name="backwash"
                      id="backwashRadioAnionB"
                      value={2}
                      checked={
                        cationServiceWater?.BDW === false &&
                        resinVal[0]?.backwash === 2
                      }
                      onChange={() => handleCationBWRadio(2)}
                      disabled={cationServiceWater?.BDW}
                    />
                  </div>
                  <div className="regen">
                    <CustomHeading
                      label="Regen"
                      fontFamily="DiodrumRegular"
                      color={colors.Black}
                      fontSize="14px"
                      fontWeight="400"
                    />
                    <CustomRadio
                      type="radio"
                      name="serviceWater"
                      id="regen"
                      label="Feed Water"
                      value={0}
                      onChange={() => handleCationSWRadio(0)}
                      checked={
                        cationServiceWater?.FW === false &&
                        resinVal[0]?.serviceWater === 0
                      }
                      disabled={cationServiceWater?.FW}
                    />
                    <CustomRadio
                      type="radio"
                      name="serviceWater"
                      id="regenA"
                      label="Demineralized Water"
                      value={2}
                      checked={
                        cationServiceWater?.DW === false &&
                        resinVal[0]?.serviceWater === 2
                      }
                      onChange={() => handleCationSWRadio(2)}
                      disabled={cationServiceWater?.DW}
                    />
                  </div>
                </div>
                {/* <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY" /> */}
              </div>
            </Card.Body>
          </StyledCard>
          <StyledCard className="anion-resin-condition">
            <Card.Header>
              <CustomHeading
                label="Anion Resin Conditions"
                fontFamily="DiodrumRegular"
                color={colors.PrimaryDarkAquaMarine}
                fontSize="14px"
                fontWeight="400"
              />
              <Card.Title>
                <IconWithTooltip
                  label="For each regeneration, choose chemical and concentration, temperature, steps, service water."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body className="anion-card-body">
              <CustomLabel label="Regenerant" />
              <CustomSelect
                className=""
                id="select1"
                onChange={handleAnionDdChange}
                value={`${resinVal[1]?.chemicalID}|${resinVal[1]?.regenerantID}`}
              >
                <option value={0}>Select a Regenerant</option>
                {regenerationCondValuesList2 &&
                  regenerationCondValuesList2.map((val) => (
                    <option
                      key={val.ixregenerantId}
                      value={`${val.chemicalId}|${val.ixregenerantId}`}
                    >
                      {val.displayName}
                    </option>
                  ))}
              </CustomSelect>
              <div className="temperature">
                <CustomHeading
                  label="Temperature"
                  fontFamily="DiodrumRegular"
                  color={colors.Black}
                  fontSize="14px"
                  fontWeight="400"
                />
                <div className="temp-wrapper">
                  <div className="temp-radio-group">
                    <CustomRadio
                      isError={false}
                      type="radio"
                      id="radioT"
                      label="Design"
                      onChange={handleAnionRadioChange}
                      value={0}
                      checked={resinVal[1]?.temperatureID === 0}
                    />
                    <CustomRadio
                      isError={false}
                      type="radio"
                      id="radioTA"
                      label="User Specified"
                      onChange={handleAnionRadioChange}
                      value={1}
                      checked={resinVal[1]?.temperatureID === 1}
                    />
                  </div>
                  <div className="input-field">
                    <InputWithText
                      isWarning={false}
                      name="tempAnion"
                      isError={
                        resinVal[1]?.temperature <
                          (unit.selectedUnits[2] === "°C" ? 0 : 32) ||
                        resinVal[1]?.temperature >
                          (unit.selectedUnits[2] === "°C" ? 100 : 212) ||
                        resinVal[1]?.temperature == ""
                      }
                      type="number"
                      id="inputBox"
                      placeholder="0.0"
                      disabled={resinVal[1]?.temperatureID === 0}
                      onChange={handleAnionInputChange}
                      value={
                        resinVal[1]?.temperatureID === 0
                          ? unit.selectedUnits[2] === "°C"
                            ? designTemp
                            : parseFloat(
                                GlobalUnitConversion(
                                  GlobalUnitConversionStore,
                                  designTemp,
                                  unit.selectedUnits[2],
                                  "°C"
                                )
                              ).toFixed(1)
                          : resinVal[1]?.temperature
                      }
                      // inputText="&deg;C"
                      inputText={unit.selectedUnits[2]}
                      onBlur={handleAnionBlur}
                      onFocus={() => handleFocus(8)}
                      isFocused={isFocused === 8}
                    />
                  </div>
                </div>
              </div>
              <div className="step1-wrapper">
                <CustomRadioCheck
                  isError={false}
                  className="checkbox1"
                  type="checkbox"
                  id="checkboxC"
                  name="step1_ind"
                  label="Step1"
                  checked={resinVal[1]?.step1_ind}
                  onChange={(e) =>
                    resinVal[1]?.step2_ind ? null : handleAnionCheck(e)
                  }
                />
                <div className="input-field">
                  <CustomLabel label="Concentration" />
                  <InputWithText
                    type="number"
                    isWarning={false}
                    isError={
                      anionResinCondition?.step1Con <
                        anionAdvRegen?.minMaxRange?.regenerantConcMIN ||
                      anionResinCondition?.step1Con >
                        anionAdvRegen?.minMaxRange?.regenerantConcMAX
                    }
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step1Con"
                    value={resinVal[1]?.step1Con}
                    disabled={!resinVal[1]?.step1_ind}
                    onChange={handleAnionCheckInput}
                    inputText="%"
                    onBlur={handleAnionBlur}
                    onFocus={() => handleFocus(9)}
                    isFocused={isFocused === 9}
                  />
                  <InputReferenceText
                    refText={`Ranges ${
                      anionAdvRegen?.minMaxRange?.regenerantConcMIN
                        ? anionAdvRegen?.minMaxRange?.regenerantConcMIN
                        : 0
                    }-
                    ${
                      anionAdvRegen?.minMaxRange?.regenerantConcMAX
                        ? anionAdvRegen?.minMaxRange?.regenerantConcMAX
                        : 100
                    }`}
                  />
                </div>
                <div className="input-field">
                  <CustomLabel label="Dose Fraction" />
                  <InputWithText
                    type="number"
                    isWarning={false}
                    isError={
                      resinVal[1]?.step1DosFrac < 0 ||
                      resinVal[1]?.step1DosFrac > 100
                        ? true
                        : false
                    }
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step1DosFrac"
                    value={resinVal[1]?.step1DosFrac}
                    onChange={handleAnionCheckInput}
                    disabled={!resinVal[1]?.step1_ind}
                    // onBlur={validateAnionSum}
                    onBlur={handleAnionBlur}
                    inputText="%"
                    onFocus={() => handleFocus(10)}
                    isFocused={isFocused === 10}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
              </div>
              <div className="step1-wrapper">
                <CustomRadioCheck
                  className="checkbox1"
                  isError={false}
                  type="checkbox"
                  id="checkboxCA"
                  name="step2_ind"
                  label="Step2"
                  checked={resinVal[1]?.step2_ind}
                  onChange={(e) =>
                    resinVal[1]?.step3_ind ? null : handleAnionCheck(e)
                  }
                  disabled={
                    resinVal[1]?.step1_ind === false

                    // resinVal[1]?.step1Con === 0 ||
                    // resinVal[1]?.step1DosFrac === 0
                    // ||
                    // resinVal[1]?.step1Con.toString() === "NaN" ||
                    // resinVal[1]?.step1DosFrac.toString() === "NaN"
                  }
                />
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isWarning={false}
                    isError={
                      resinVal[1]?.step2Con < 0 || resinVal[1]?.step2Con > 100
                        ? true
                        : false
                    }
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step2Con"
                    value={resinVal[1]?.step2Con}
                    onChange={handleAnionCheckInput}
                    disabled={!resinVal[1]?.step2_ind}
                    inputText="%"
                    onBlur={handleAnionBlur}
                    onFocus={() => handleFocus(11)}
                    isFocused={isFocused === 11}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
                <div className="input-field">
                  <InputWithText
                    type="number"
                    isWarning={false}
                    isError={
                      resinVal[1]?.step2DosFrac < 0 ||
                      resinVal[1]?.step2DosFrac >
                        parseFloat(
                          `${
                            100 - resinVal[1]?.step1DosFrac >= 0
                              ? 100 - resinVal[1]?.step1DosFrac
                              : 0
                          }`
                        )
                        ? true
                        : false
                    }
                    placeholder="0.0"
                    // defaultValue="0"
                    name="step2DosFrac"
                    value={resinVal[1]?.step2DosFrac}
                    onChange={handleAnionCheckInput}
                    disabled={!resinVal[1]?.step2_ind}
                    onBlur={handleAnionBlur}
                    inputText="%"
                    onFocus={() => handleFocus(12)}
                    isFocused={isFocused === 12}
                  />
                  <InputReferenceText
                    refText={`Ranges 0-${
                      100 - resinVal[1]?.step1DosFrac >= 0
                        ? 100 - resinVal[1]?.step1DosFrac
                        : 0
                    }`}
                  />
                </div>
              </div>
              <div className="step1-wrapper">
                <CustomRadioCheck
                  className="checkbox1"
                  type="checkbox"
                  id="checkboxCB"
                  name="step3_ind"
                  label="Step3"
                  checked={resinVal[1]?.step3_ind}
                  onChange={handleAnionCheck}
                  disabled={
                    resinVal[1]?.step2_ind === false

                    // resinVal[1]?.step2Con === 0 ||
                    // resinVal[1]?.step2DosFrac === 0
                    // ||
                    // resinVal[1]?.step2Con.toString() === "NaN" ||
                    // resinVal[1]?.step2DosFrac.toString() === "NaN"
                  }
                />
                <div className="input-field">
                  <InputWithText
                    type="number"
                    placeholder="0.0"
                    isError={
                      resinVal[1]?.step3Con < 0 || resinVal[1]?.step3Con > 100
                        ? true
                        : false
                    }
                    // defaultValue="0"
                    name="step3Con"
                    value={resinVal[1]?.step3Con}
                    onChange={handleAnionCheckInput}
                    disabled={!resinVal[1]?.step3_ind}
                    inputText="%"
                    onBlur={handleAnionBlur}
                    onFocus={() => handleFocus(13)}
                    isFocused={isFocused === 13}
                  />
                  <InputReferenceText refText="Ranges 0-100" />
                </div>
                <div className="input-field">
                  <InputWithText
                    type="number"
                    placeholder="0.0"
                    isError={
                      resinVal[1]?.step3DosFrac < 0 ||
                      resinVal[1]?.step3DosFrac >
                        parseFloat(
                          `${
                            100 -
                              resinVal[1]?.step1DosFrac -
                              resinVal[1]?.step2DosFrac >=
                            0
                              ? 100 -
                                resinVal[1]?.step1DosFrac -
                                resinVal[1]?.step2DosFrac
                              : 0
                          }`
                        )
                        ? true
                        : false
                    }
                    // defaultValue="0"
                    name="step3DosFrac"
                    value={resinVal[1]?.step3DosFrac}
                    onChange={handleAnionCheckInput}
                    disabled={!resinVal[1]?.step3_ind}
                    onBlur={handleAnionBlur}
                    inputText="%"
                    onFocus={() => handleFocus(14)}
                    isFocused={isFocused === 14}
                  />
                  <InputReferenceText
                    refText={`Ranges 0-${
                      100 -
                        resinVal[1]?.step1DosFrac -
                        resinVal[1]?.step2DosFrac >=
                      0
                        ? 100 -
                          resinVal[1]?.step1DosFrac -
                          resinVal[1]?.step2DosFrac
                        : 0
                    }`}
                  />
                </div>
              </div>
              <div className="service-water">
                <div className="serviceDisplay">
                  <CustomHeading
                    label="Service Water"
                    fontFamily="NotoSansSemiBold"
                    className="service-water-header"
                    color={colors.blackTransparency085}
                    fontSize="14px"
                    fontWeight="500"
                  />
                  <div className="lineDisplay"></div>
                </div>
                <div className="service-water-wrapper">
                  <div className="backwash">
                    <CustomHeading
                      label="Backwash"
                      fontFamily="DiodrumRegular"
                      color={colors.Black}
                      fontSize="14px"
                      fontWeight="400"
                    />
                    <CustomRadio
                      type="radio"
                      name="backwashnew"
                      id="backwashCationA"
                      value={1}
                      checked={
                        anionServiceWater?.BDW === false &&
                        resinVal[1]?.backwash === 1
                      }
                      disabled={anionServiceWater?.BDW}
                    />
                  </div>
                  <div className="regen">
                    <CustomHeading
                      label="Regen"
                      fontFamily="DiodrumRegular"
                      color={colors.Black}
                      fontSize="14px"
                      fontWeight="400"
                    />
                    <CustomRadio
                      isError={false}
                      type="radio"
                      name="regen"
                      id="regenA"
                      label="Demineralized Water"
                      value={1}
                      checked={
                        anionServiceWater?.DW === false &&
                        resinVal[1]?.serviceWater === 1
                      }
                      disabled={anionServiceWater?.DW}
                    />
                  </div>
                </div>
                {/* <InputReferenceText refText="Lorem ipsum dolor sit amet, ranges XXX-YYY" /> */}
              </div>
            </Card.Body>
          </StyledCard>
        </div>
        {isSumValid && (
          <ProjectErrorPopup
            show={isSumValid}
            close={() => {
              setIsSumValid(false);
            }}
            message={
              "The sum of dose fractions in the 1st column should add up to 100%"
            }
          />
        )}
        {isSumAnionValid && (
          <ProjectErrorPopup
            show={isSumAnionValid}
            close={() => {
              setIsSumAnionValid(false);
            }}
            message={
              "The sum of dose fractions in the 1st column should add up to 100%"
            }
          />
        )}
        {autoFocusValue && (
          <ProjectErrorPopup
            show={autoFocusValue}
            close={() => {
              setAutoFocusValue(false);
            }}
            message={message}
          />
        )}
      </RegenerationConditionsStyled>
    </>
  );
};

export default RegenerationConditions;
