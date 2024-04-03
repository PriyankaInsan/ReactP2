/* eslint-disable max-len */
import React from "react";
import { Card, Form, InputGroup, Row } from "react-bootstrap";
import SystemDiagram from "./SystemDiagram";
import InfoIcon from "../../../common/icons/InfoIcon";
import { useState } from "react";
import ProductQualityRegenerantDoseStyled from "./ProductQualityRegenerantDoseStyled";
import {
  updateIXStore,
  updateProductQualityRegenerantDose,
  updateProductQualityRegenerantDoseCation,
  updateProductQualityRegenerantDoseAnion,
} from "./IXDSlice";
import { useSelector, useDispatch } from "react-redux";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import { useEffect } from "react";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import UnitConversion from "../../../common/utils/UnitConversion";
import CalculateNACondValue from "../../../common/utils/CalculateNACondValue";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const regenrantChemicals = [
  {
    ixregenerantId: 1,
    chemicalId: "28246",
    displayName: "HCl",
  },
  {
    ixregenerantId: 2,
    chemicalId: "28249",
    displayName: "H₂SO₄",
  },
  {
    ixregenerantId: 4,
    chemicalId: "28251",
    displayName: "NaOH",
  },
];
const ProductQualityRegenerantDose = () => {
  const [isFocused, setIsFocused] = useState(null);
  const ixStore = useSelector((state) => state.IXStore.data);
  const reageantCation = ixStore.listRegenConds[0];
  const reageantAnion = ixStore.listRegenConds[1];
  console.log("ixStore?.cationResin", ixStore?.cationResin);
  const [radioOptionEnabled, setRadioOptionEnabled] = useState(true);
  const [RadionCheckEnable, setRadionCheckEnable] = useState(0);
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const dispatch = useDispatch();

  const ixStoreCation = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[0]
  );
  const ixStoreAnion = useSelector(
    (state) => state.IXStore.data.listProductQualityandregeneration[1]
  );
  const VesselValue = useSelector((state) => state.IXStore.data.VesselValue);
  const Cation_regenerantID = useSelector(
    (state) => state.IXStore.data.listRegenConds[0]?.chemicalID
  );
  const Anion_regenerantID = useSelector(
    (state) => state.IXStore.data.listRegenConds[1]?.chemicalID
  );
  const [isSumValid, setIsSumValid] = useState(false);
  const regenerantListCation = useSelector((state) =>
    state.IXStore.regenerantListValue?.regenerantList1?.find(
      (val) => val.chemicalId == Cation_regenerantID
    )
  );
  const regenerantListAnion = useSelector((state) =>
    state.IXStore.regenerantListValue?.regenerantList2?.find(
      (val) => val.chemicalId == Anion_regenerantID
    )
  );
  // const regenerantListCationValue = `Dose ${regenerantListCation?.displayName}`;
  // const regenerantListAnionValue = `Dose  ${regenerantListAnion?.displayName}`;
  const regenerantListCationValue = `Dose ${
    regenerantListCation
      ? regenerantListCation.displayName
      : regenrantChemicals.find(
          (item) => item.ixregenerantId == reageantCation.regenerantID
        )?.displayName
  }`;
  const regenerantListCationValueArry = regenerantListCationValue.split("(");
  var regenerantListCationValueNew =
    regenerantListCationValueArry.length > 0
      ? regenerantListCationValueArry[0]
      : null;
  const regenerantListAnionValue = `Dose  ${
    regenerantListAnion
      ? regenerantListAnion.displayName
      : regenrantChemicals.find(
          (item) => item.ixregenerantId == reageantAnion.regenerantID
        )?.displayName
  }`;
  const regenerantListAnionValueArry = regenerantListAnionValue.split("(");
  var regenerantListAnionValueNew =
    regenerantListAnionValueArry.length > 0
      ? regenerantListAnionValueArry[0]
      : null;
  const [message, setMessage] = useState("");
  // console.log("regenerantListCation", regenerantListCationValue);
  // console.log("regenerantListAnion", regenerantListAnionValue);
  // console.log("ixStoreCation", ixStoreCation);
  const [getAndRegenerantDose, responseAndRegenerantDose] =
    useLazyGetAllDataQuery();
  const [Res_AndRegenerantDose, setRes_AndRegenerantDose] = useState([]);
  const [TRes_AndRegenerantDose, tsetRes_AndRegenerantDose] = useState([]);
  const [TTRes_AndRegenerantDose, ttsetRes_AndRegenerantDose] = useState([]);
  const Modeling = useSelector((state) => state.IXStore.modeling);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const [Na_Average, setNa_Average] = useState(false);
  const [Na_End, setNa_End] = useState(false);

  const [Cond_Average, setCond_Average] = useState(false);
  const [Cond_End, setCond_End] = useState(false);

  const validdesignID = useSelector(
    (state) => state.IXStore.data.validDesignID
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const projectID = ProjectInfoStore.projectID;

  let Req_AndRegenerantDose = {
    userID: userID,
    projectID: projectID,
    validdesignID: validdesignID,
    regenerantID: 1,
    columnNum: 1,
  };
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
  //---------After report getting IXD data starts---------------//
  const { calcChemDose, calcOverrun } = useSelector((state) => state.IXStore);
  useEffect(() => {
    if (ixStoreCation?.overAllComputation === 1) {
      if (calcChemDose.length > 0 && calcOverrun.length > 0) {
        var calcChemDose0 = 
        GlobalUnitConversion(
         GlobalUnitConversionStore,
         Math.round(calcChemDose[0]),
         "g/L",
         unit.selectedUnits[14] );

         var calcChemDose1 = 
         GlobalUnitConversion(
          GlobalUnitConversionStore,
          Math.round(calcChemDose[1]),
          "g/L",
          unit.selectedUnits[14] );
          
          var calcChemDose3 = 
          GlobalUnitConversion(
           GlobalUnitConversionStore,
           Math.round(calcChemDose[3]),
           "g/L",
           unit.selectedUnits[14] );
          
        if( calcChemDose[0]=="" && calcChemDose[2]=="")
        {  dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["regenerantDoseVal4"]: calcChemDose1,
              ["regenerantDoseVal2"]: calcOverrun[0],
            },
            {
              ...ixStoreAnion,
              ["regenerantDoseVal4"]:calcChemDose3,
              ["regenerantDoseVal2"]: calcOverrun[1],
            },
          ])
        );}
        else{
        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["regenerantDoseVal4"]:calcChemDose0,
              ["regenerantDoseVal2"]: calcOverrun[0],
            },
            {
              ...ixStoreAnion,
              ["regenerantDoseVal4"]: calcChemDose1,
              ["regenerantDoseVal2"]: calcOverrun[1],
            },
          ])
        );
        }
      }
    }
  }, [calcChemDose, calcOverrun]);

  //---------After report getting IXD data ends---------------//

  useEffect(() => {
    try {
      let apiUrl = `${"ix/api/v1/ProductQualityAndRegenerantDose"}?userID=${
        Req_AndRegenerantDose.userID
      }&projectID=${Req_AndRegenerantDose.projectID}&validdesignID=${
        Req_AndRegenerantDose.validdesignID
      }&regenerantID= ${Req_AndRegenerantDose.regenerantID}
          &columnNum= ${Req_AndRegenerantDose.columnNum}`;
      console.log("apiUrlCheck", apiUrl);
      getAndRegenerantDose(apiUrl);
    } catch {
      console.log("Error: Fetch VesselRegenertion data");
    }
  }, []);
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
  // useEffect(() => {
  //   const FromUnit = ixStoreCation.speciesUnit;
  //   const naAvg = ixStoreCation?.speciesLblNameID===1?ixStoreCation.averageSpeciesVal:ixStoreCation?.averageConductivityVal;
  //   const naEnd = ixStoreCation?.speciesLblNameID===1?ixStoreCation.endpoingSpeciesVal:ixStoreCation?.endpointConductivityVal;
  //   console.log("Gopallll1", naAvg,naEnd);
  //   const Avg_Conductivity = CalculateNACondValue(
  //     "Na-Avg",
  //     naAvg,
  //     FromUnit,
  //     35
  //   );
  //   const naEnd_Conductivity = CalculateNACondValue(
  //     "Na-Avg",
  //     naEnd,
  //     FromUnit,
  //     35
  //   );
  //   dispatch(
  //     updateProductQualityRegenerantDose([
  //       {
  //         ...ixStoreCation,
  //         ["averageConductivityVal"]: Avg_Conductivity,
  //         ["endpointConductivityVal"]: naEnd_Conductivity,
  //       },
  //       ixStoreAnion,
  //     ])
  //   );
  // }, []);
  useEffect(() => {
    if (Res_AndRegenerantDose?.ixRegenerationDoseName_column1?.length > 0) {
      console.log(
        "TRes_AndRegenerantDose-pawan",
        Res_AndRegenerantDose?.ixRegenerationDoseName_column1
      );
      tsetRes_AndRegenerantDose([]);
      let Flag1 = 0,
        Flag2 = 0,
        Flag3 = 0,
        Flag4 = 0;
      var Fs1 = 0;
      Res_AndRegenerantDose?.ixRegenerationDoseName_column1?.forEach(
        (element) => {
          Fs1 = Fs1 + 1;
          // console.log("element.ixregenerantDoseId",element.langText);
          console.log("element.ixregenerantDoseId", ixStoreCation);
          console.log("main", element.ixregenerantDoseId);
          console.log("main", element.langText);
          if (
            parseInt(ixStoreCation.saftyFactorLbl) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag1 == 0
          ) {
            Flag1 = 1;
            tsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreCation.saftyFactorVal,
              },
            ]);
          } else if (
            parseInt(ixStoreCation.regenerantDoseLbl1ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag2 == 0
          ) {
            Flag2 = 1;
            tsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreCation.regeneratDoseVal1,
              },
            ]);
          } else if (
            parseInt(ixStoreCation.regenerantDoseLbl2ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag3 == 0
          ) {
            Flag3 = 1;
            tsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreCation.regenerantDoseVal2,
              },
            ]);
          } else if (
            parseInt(ixStoreCation.regenerantDoseLbl3ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag4 == 0
          ) {
            Flag4 = 1;
            tsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreCation.regenerantDoseVal3,
              },
            ]);
          } else {
            if (element.langText == "WAC Overrun") {
              tsetRes_AndRegenerantDose((current) => [
                ...current,
                {
                  ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                  langText: element.langText,
                  txtValue: 0.0,
                },
              ]);
            } else {
              tsetRes_AndRegenerantDose((current) => [
                ...current,
                {
                  ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                  langText: element.langText,
                  txtValue: element.defaultValue,
                },
              ]);
            }
          }
        }
      );
    }
  }, [Res_AndRegenerantDose]);

  useEffect(() => {
    if (Res_AndRegenerantDose?.ixRegenerationDoseName_column2?.length > 0) {
      console.log("saftyFactorVal", ixStoreCation.saftyFactorVal);
      ttsetRes_AndRegenerantDose([]);
      let Flag1 = 0,
        Flag2 = 0,
        Flag3 = 0,
        Flag4 = 0;
      var Fs2 = 0;
      Res_AndRegenerantDose?.ixRegenerationDoseName_column2?.forEach(
        (element) => {
          Fs2 = Fs2 + 1;
          // console.log("element.ixregenerantDoseId",element.langText);
          // console.log("element.ixregenerantDoseId",ixStoreAnion);
          if (
            parseInt(ixStoreAnion.saftyFactorLbl) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag1 == 0
          ) {
            Flag1 = 1;
            ttsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreAnion.saftyFactorVal,
              },
            ]);
          } else if (
            parseInt(ixStoreAnion.regenerantDoseLbl1ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag2 == 0
          ) {
            Flag2 = 1;
            ttsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreAnion.regeneratDoseVal1,
              },
            ]);
          } else if (
            parseInt(ixStoreAnion.regenerantDoseLbl2ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag3 == 0
          ) {
            Flag3 = 1;
            ttsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreAnion.regenerantDoseVal2,
              },
            ]);
          } else if (
            parseInt(ixStoreAnion.regenerantDoseLbl3ID) ==
              parseInt(element.ixregenerantDoseId) &&
            Flag4 == 0
          ) {
            Flag4 = 1;
            ttsetRes_AndRegenerantDose((current) => [
              ...current,
              {
                ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                langText: element.langText,
                txtValue: ixStoreAnion.regenerantDoseVal3,
              },
            ]);
          } else {
            if (element.langText == "WBA Overrun") {
              ttsetRes_AndRegenerantDose((current) => [
                ...current,
                {
                  ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                  langText: element.langText,
                  txtValue: 0.0,
                },
              ]);
            } else {
              ttsetRes_AndRegenerantDose((current) => [
                ...current,
                {
                  ixregenerantDoseId: parseInt(element.ixregenerantDoseId),
                  langText: element.langText,
                  txtValue: element.defaultValue,
                },
              ]);
            }
          }
        }
      );
    }
  }, [Res_AndRegenerantDose]);

  const CationRegenerantDoseCheck = (e, labelvalue, labeltext) => {
    // console.log("e.target.value 1234", e.target.name);
    // console.log("e.target.value 1234", e.target.value);
    // console.log("e.target.value 1234", labelvalue);
    let temTRes_AndRegenerantDose;
    if (e.target.name === "CatRegenerantDose-0") {
      temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
        if (
          st.ixregenerantDoseId === parseInt(labelvalue) &&
          st.langText == labeltext
        ) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      console.log(
        "temTRes_AndRegenerantDose-0",
        labelvalue,
        temTRes_AndRegenerantDose
      );
      tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal1(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            ["saftyFactorLbl"]: parseInt(labelvalue),
            ["saftyFactorVal"]: parseFloat(e.target.value),
          },
          ixStoreAnion,
        ])
      );
    } else if (e.target.name === "CatRegenerantDose-1") {
      temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
        if (
          st.ixregenerantDoseId === parseInt(labelvalue) &&
          st.langText == labeltext
        ) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      console.log(
        "temTRes_AndRegenerantDose-1",
        labelvalue,
        temTRes_AndRegenerantDose
      );
      tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal2(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            ["regenerantDoseLbl1ID"]: parseInt(labelvalue),
            ["regeneratDoseVal1"]: parseFloat(e.target.value),
          },
          ixStoreAnion,
        ])
      );
    } else if (e.target.name === "CatRegenerantDose-2") {
      temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
        if (
          st.ixregenerantDoseId === parseInt(labelvalue) &&
          st.langText == labeltext
        ) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      console.log(
        "temTRes_AndRegenerantDose-2",
        labelvalue,
        temTRes_AndRegenerantDose
      );
      tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal3(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            ["regenerantDoseLbl2ID"]: parseInt(labelvalue),
            ["regenerantDoseVal2"]: parseFloat(e.target.value),
          },
          ixStoreAnion,
        ])
      );
    } else {
      //set_regeneratDoseVal4(e.target.value);
      temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
        if (
          st.ixregenerantDoseId === parseInt(labelvalue) &&
          st.langText == labeltext
        ) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      console.log(
        "temTRes_AndRegenerantDose-3",
        labelvalue,
        temTRes_AndRegenerantDose
      );
      tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            ["regenerantDoseLbl3ID"]: parseInt(labelvalue),
            ["regenerantDoseVal3"]: parseFloat(e.target.value),
            // ["regenerantDoseLbl4ID"]: parseInt(labelvalue),
            // ["regenerantDoseVal4"]:parseFloat(e.target.value),
          },
          ixStoreAnion,
        ])
      );
    }
  };
  //---------anion
  const AnionRegenerantDoseCheck = (e, labelvalue) => {
    console.log("e.target.value 1234", e.target.name);
    console.log("e.target.value 1234", e.target.value);
    console.log("e.target.value 1234", labelvalue);
    let temTRes_AndRegenerantDose;
    if (e.target.name === "ANRegenerantDose-0") {
      temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
        if (st.ixregenerantDoseId === parseInt(labelvalue)) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal1(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["saftyFactorLbl"]: parseInt(labelvalue),
            ["saftyFactorVal"]: e.target.value,
          },
        ])
      );
    } else if (e.target.name === "ANRegenerantDose-1") {
      temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
        if (st.ixregenerantDoseId === parseInt(labelvalue)) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal2(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["regenerantDoseLbl1ID"]: parseInt(labelvalue),
            ["regeneratDoseVal1"]: e.target.value,
            // ["regenerantDoseLbl2ID"]: parseInt(labelvalue),
            // ["regenerantDoseVal2"]: e.target.value,
          },
        ])
      );
    } else if (e.target.name === "ANRegenerantDose-2") {
      temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
        if (st.ixregenerantDoseId === parseInt(labelvalue)) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      //set_regeneratDoseVal3(e.target.value);
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["regenerantDoseLbl2ID"]: parseInt(labelvalue),
            ["regenerantDoseVal2"]: e.target.value,
            // ["regenerantDoseLbl3ID"]: parseInt(labelvalue),
            // ["regenerantDoseVal3"]: e.target.value,
          },
        ])
      );
    } else {
      //set_regeneratDoseVal4(e.target.value);
      temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
        if (st.ixregenerantDoseId === parseInt(labelvalue)) {
          st = {
            ...st,
            txtValue: parseFloat(e.target.value),
            ixregenerantDoseId: parseInt(labelvalue),
          };
        }
        return st;
      });
      ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["regenerantDoseLbl3ID"]: parseInt(labelvalue),
            ["regenerantDoseVal3"]: e.target.value,
            // ["regenerantDoseLbl4ID"]: parseInt(labelvalue),
            // ["regenerantDoseVal4"]: e.target.value,
          },
        ])
      );
    }
  };
  const CationCheck = (e) => {
    console.log("e.target.value 1234", e.target.value);
    dispatch(
      updateProductQualityRegenerantDose([
        {
          ...ixStoreCation,
          [e.target.name]: parseInt(e.target.value),
        },
        ixStoreAnion,
      ])
    );
  };
  const AnionCheck = (e) => {
    console.log("e.target.value", e.target.value);
    if (e.target.name === "Anion_regenerantDoseLbl4ID") {
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["regenerantDoseLbl4ID"]: parseInt(e.target.value),
          },
        ])
      );
    } else {
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            ["speciesLblNameID"]: parseInt(e.target.value),
          },
        ])
      );
    }
    // seteffluent(e.target.value);
  };
  // changing color of input field while on focus
  const handleFocus = (e) => {
    setIsFocused(e);
  };
  const handleBlur = (e) => {
    if (ixStoreCation.speciesUnit == 1) {
      if (
        e.target.value > 4600000 ||
        e.target.value < 0.46 ||
        parseInt(e.target.value) > parseInt(ixStoreCation.endpoingSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        // Conductivity(µS/cm) = SQRT( 60766.255 * Na(meq/L)^2 + 0.0029224901)
        //let Conductivity=Math. sqrt(60766.255* (e.target.value*e.target.value)+0.0029224901);
        if (Na_Average == true) {
          setNa_Average(false);
          const FromUnit = ixStoreCation.speciesUnit;
          const Conductivity = CalculateNACondValue(
            "Na-Avg",
            e.target.value,
            FromUnit,
            35
          );
          console.log("Conductivity", Conductivity.toFixed(2));
          dispatch(
            updateProductQualityRegenerantDose([
              {
                ...ixStoreCation,
                // [e.target.name]: e.target.value,
                ["averageSpeciesVal"]: parseFloat(e.target.value).toFixed(2),
                ["averageConductivityVal"]: Conductivity,
              },
              ixStoreAnion,
            ])
          );
        }
      }
    } else {
      if (
        e.target.value > 200 ||
        e.target.value < 0.00002 ||
        parseInt(e.target.value) > parseInt(ixStoreCation.endpoingSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        // Conductivity(µS/cm) = SQRT( 60766.255 * Na(meq/L)^2 + 0.0029224901)
        //let Conductivity=Math. sqrt(60766.255* (e.target.value*e.target.value)+0.0029224901);
        if (Na_Average == true) {
          setNa_Average(false);
          const FromUnit = ixStoreCation.speciesUnit;
          const Conductivity = CalculateNACondValue(
            "Na-Avg",
            e.target.value,
            FromUnit,
            35
          );
          console.log("Conductivity", Conductivity.toFixed(2));
          dispatch(
            updateProductQualityRegenerantDose([
              {
                ...ixStoreCation,
                // [e.target.name]: e.target.value,
                ["averageSpeciesVal"]: parseFloat(e.target.value).toFixed(2),
                ["averageConductivityVal"]: Conductivity,
              },
              ixStoreAnion,
            ])
          );
        }
      }
    }
    setIsFocused(null);
  };
  const handleBlurConduct = (e) => {
    var MinValue =
      unit.selectedUnits[17] === "µS/cm"
        ? 0.055
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            0.055,
            unit.selectedUnits[17],
            "µS/cm"
          )?.toFixed(2);

    var MaxValue =
      unit.selectedUnits[17] === "µS/cm"
        ? 49301.62
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            49301.62,
            unit.selectedUnits[17],
            "µS/cm"
          )?.toFixed(2);
    console.log("MinValue", MinValue);
    console.log("MinValue", MaxValue);
    if (
      parseFloat(e.target.value) > parseFloat(MaxValue) ||
      parseFloat(e.target.value) < parseFloat(MinValue) ||
      parseFloat(e.target.value) >
        parseFloat(ixStoreCation.endpointConductivityVal) ||
      isNaN(e.target.value)
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage(
        "The Conductivity Average Leakage value is larger than the Endpont value, Please revise your input."
      );
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      //Na(meq/L) = SQRT( (Conductivity(µS/cm)^2 – 0.0029224901) / 60766.255)
      //  let NaValue=Math. sqrt(((e.target.value*e.target.value) - 0.0029224901)/60766.255);
      //  console.log("NaValue", NaValue.toFixed(2));
      if (Cond_Average == true) {
        setCond_Average(false);
        const FromUnit = ixStoreCation.speciesUnit;
        const NaValue = CalculateNACondValue(
          "Cond-Avg",
          e.target.value,
          FromUnit,
          34
        );
        // console.log("Conductivity", NaValue.toFixed(2));
        // dispatch(
        //   updateProductQualityRegenerantDose([{
        //     ...ixStoreCation,
        //    // [e.target.name]: e.target.value,
        //      ["averageConductivityVal"]: Conductivity.toFixed(2)
        //   },ixStoreAnion]),
        // );averageConductivityVal
        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["averageSpeciesVal"]: NaValue,
              ["averageConductivityVal"]: parseFloat(e.target.value).toFixed(2),
            },
            ixStoreAnion,
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const handleBlurAnion = (e) => {
    if (ixStoreAnion.speciesUnit == 1) {
      if (
        e.target.value < 0.46 ||
        e.target.value > 4600000 ||
        parseInt(e.target.value) > parseInt(ixStoreAnion.endpoingSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The SiO₂, Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["averageSpeciesVal"]: parseFloat(e.target.value).toFixed(2),
            },
          ])
        );
      }
    } else {
      if (
        e.target.value > 200 ||
        e.target.value < 0.00002 ||
        parseInt(e.target.value) > parseInt(ixStoreAnion.endpoingSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The SiO₂, Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["averageSpeciesVal"]: parseFloat(e.target.value).toFixed(2),
            },
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const handleBlurEnd = (e) => {
    if (ixStoreCation.speciesUnit == 1) {
      if (
        e.target.value > 4600000 ||
        e.target.value < 0.46 ||
        parseInt(e.target.value) < parseInt(ixStoreCation.averageSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        if (Na_End == true) {
          setNa_End(false);
          //let Conductivity=Math. sqrt(60766.255*(e.target.value*e.target.value)+0.0029224901); //Right
          //let Conductivity=Math. sqrt(60766.255*Math.pow(parseFloat(e.target.value))+0.0029224901);
          const FromUnit = ixStoreCation.speciesUnit;
          const Conductivity = CalculateNACondValue(
            "Na-End",
            e.target.value,
            FromUnit,
            35
          );
          console.log("Conductivity", Conductivity.toFixed(2));
          dispatch(
            updateProductQualityRegenerantDose([
              {
                ...ixStoreCation,
                [e.target.name]: parseFloat(e.target.value).toFixed(2),
                ["endpointConductivityVal"]: Conductivity,
              },
              ixStoreAnion,
            ])
          );
        }
      }
    } else {
      if (
        e.target.value > 200 ||
        e.target.value < 0.00002 ||
        parseInt(e.target.value) < parseInt(ixStoreCation.averageSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        if (Na_End == true) {
          setNa_End(false);
          //let Conductivity=Math. sqrt(60766.255*(e.target.value*e.target.value)+0.0029224901); //Right
          //let Conductivity=Math. sqrt(60766.255*Math.pow(parseFloat(e.target.value))+0.0029224901);
          const FromUnit = ixStoreCation.speciesUnit;
          const Conductivity = CalculateNACondValue(
            "Na-End",
            e.target.value,
            FromUnit,
            35
          );
          console.log("Conductivity", Conductivity.toFixed(2));
          dispatch(
            updateProductQualityRegenerantDose([
              {
                ...ixStoreCation,
                [e.target.name]: parseFloat(e.target.value).toFixed(2),
                ["endpointConductivityVal"]: Conductivity,
              },
              ixStoreAnion,
            ])
          );
        }
      }
    }
    setIsFocused(null);
  };
  const handleBlurEndConduct = (e) => {
    var MinValue =
      unit.selectedUnits[17] === "µS/cm"
        ? 0.055
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            0.055,
            unit.selectedUnits[17],
            "µS/cm"
          )?.toFixed(2);

    var MaxValue =
      unit.selectedUnits[17] === "µS/cm"
        ? 49301.62
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            49301.62,
            unit.selectedUnits[17],
            "µS/cm"
          )?.toFixed(2);
    console.log("MinValue", typeof MinValue);
    console.log("MinValue", typeof MaxValue);
    console.log("MinValue", typeof e.target.value);
    if (
      parseFloat(e.target.value) < parseFloat(MinValue) ||
      parseFloat(e.target.value) > parseFloat(MaxValue) ||
      parseFloat(e.target.value) <
        parseFloat(ixStoreCation.averageConductivityVal) ||
      isNaN(e.target.value)
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage(
        "The Conductivity Average Leakage value is larger than the Endpont value, Please revise your input."
      );
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      if (Cond_End == true) {
        setCond_End(false);
        //Na(meq/L) = SQRT( (Conductivity(µS/cm)^2 – 0.0029224901) / 60766.255)
        // let NaValue=Math. sqrt(((e.target.value*e.target.value) - 0.0029224901)/60766.255);
        //  console.log("NaValue", NaValue.toFixed(2));
        const FromUnit = ixStoreCation.speciesUnit;
        const NaValue = CalculateNACondValue(
          "Cond-Avg",
          e.target.value,
          FromUnit,
          34
        );
        console.log("Conductivity1231", NaValue);
        //  const FromUnit=ixStoreCation.speciesUnit;
        //   const NaValue= CalculateNACondValue("Conduct-End", e.target.value,FromUnit,35);
        // console.log("Conductivity", NaValue.toFixed(2));

        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              [e.target.name]: parseFloat(e.target.value).toFixed(2),
              ["endpoingSpeciesVal"]: NaValue,
            },
            ixStoreAnion,
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const handleBlurOrganic = (e) => {
    if (e.target.value < 0 || e.target.value > 100 || isNaN(e.target.value)) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage(
        "The value entered is outside the allowed range(0 to 100%), Pleas revise your input."
      );
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          },
        ])
      );
    }
    setIsFocused(null);
  };
  const handleBlurSelectDoseCation = (e) => {
    var MinValue =
      unit.selectedUnits[14] === "g/L"
        ? 54.94
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            54.94,
            unit.selectedUnits[14],
            "g/L"
          )?.toFixed(2);

    var MaxValue =
      unit.selectedUnits[14] === "g/L"
        ? 250.05
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            250.05,
            unit.selectedUnits[14],
            "g/L"
          )?.toFixed(2);
    console.log("MinValue", typeof MinValue);
    console.log("MinValue", typeof MaxValue);
    console.log("MinValue", typeof e.target.value);
    if (
      parseFloat(e.target.value) < parseFloat(MinValue) ||
      parseFloat(e.target.value) > parseFloat(MaxValue) ||
      isNaN(e.target.value)
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      if (unit.selectedUnits[14] == "g/L") {
        setMessage(
          "The value entered is outside the allowed range(" +
            MinValue +
            " to " +
            MaxValue +
            " g/l), Please revise your input.."
        );
      } else {
        setMessage(
          "The value entered is outside the allowed range(" +
            MinValue +
            " to " +
            MaxValue +
            " lb/ft³), Please revise your input.."
        );
      }
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
            ["regenerationRatio"]:parseFloat(0)
          },
          ixStoreAnion,
        ])
      );
    }
  };

  const OnBlureCationRegeneratCation = (e) => {
    // if (e.target.value <= 100 || e.target.value >= 1000 || isNaN(e.target.value)) {
    //   setIsSumValid(true);
    //   setIsFocused(1);
    //   setMessage(
    //     "The value entered is outside the allowed range(100 to 1000%), Pleas revise your input."
    //   );
    //   //if(e.target.value < 1 || e.target.value >= 100 )
    //   setTimeout(() => {
    //     e.target.focus();
    //   }, 0);
    // }
    // else
    // {
    dispatch(
      updateProductQualityRegenerantDose([
        {
          ...ixStoreCation,
          [e.target.name]: parseFloat(e.target.value).toFixed(0),
          ["regenerantDoseVal4"]:parseFloat(0)
        },
        ixStoreAnion,
      ])
    );
    //}
  };
  const OnBlureCationRegeneratAnion = (e) => {
    // if (e.target.value <= 100 || e.target.value >= 1000 || isNaN(e.target.value)) {
    //   setIsSumValid(true);
    //   setIsFocused(1);
    //   setMessage(
    //     "The value entered is outside the allowed range(100 to 1000%), Pleas revise your input."
    //   );
    //   //if(e.target.value < 1 || e.target.value >= 100 )
    //   setTimeout(() => {
    //     e.target.focus();
    //   }, 0);
    // }
    // else
    // {
    dispatch(
      updateProductQualityRegenerantDose([
        ixStoreCation,
        {
          ...ixStoreAnion,
          [e.target.name]: parseFloat(e.target.value).toFixed(0),
          ["regenerantDoseVal4"]:parseFloat(0)
        },
      ])
    );
    //}
  };
  const handleBlurSelectDoseAnion = (e) => {
    var MinValue =
      unit.selectedUnits[14] === "g/L"
        ? 54.94
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            54.94,
            unit.selectedUnits[14],
            "g/L"
          )?.toFixed(2);

    var MaxValue =
      unit.selectedUnits[14] === "g/L"
        ? 250.05
        : GlobalUnitConversion(
            GlobalUnitConversionStore,
            250.05,
            unit.selectedUnits[14],
            "g/L"
          )?.toFixed(2);
    console.log("MinValue", typeof MinValue);
    console.log("MinValue", typeof MaxValue);
    console.log("MinValue", typeof e.target.value);
    if (
      parseFloat(e.target.value) < parseFloat(MinValue) ||
      parseFloat(e.target.value) > parseFloat(MaxValue) ||
      isNaN(e.target.value)
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      if (unit.selectedUnits[14] == "g/L") {
        setMessage(
          "The value entered is outside the allowed range(" +
            MinValue +
            " to " +
            MaxValue +
            " g/l), Please revise your input.."
        );
      } else {
        setMessage(
          "The value entered is outside the allowed range(" +
            MinValue +
            " to " +
            MaxValue +
            " lb/ft³), Please revise your input.."
        );
      }
      dispatch(
        updateProductQualityRegenerantDose([
          ixStoreCation,
          {
            ...ixStoreAnion,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
            ["regenerationRatio"]:parseFloat(0)
          },
        ])
      );
    }
  };
  const handleBlurDoseCation = (e, labelValue, labelID) => {
    var flag = false;
    if (labelValue != "WBA Overrun" && labelValue != "Regeneration Ratio") {
      flag = true;
    } else if (labelValue != "WBA Overrun") {
      flag = true;
    } else if (labelValue != "Regeneration Ratio") {
      flag = true;
    }
    if (
      (e.target.value < 0 || e.target.value > 100 || isNaN(e.target.value)) &&
      labelValue == "WAC Overrun"
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter WAC Overrun between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else if (
      (e.target.value < 100 ||
        e.target.value > 1000 ||
        isNaN(e.target.value)) &&
      labelValue == "Regeneration Ratio"
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter Regeneration Ratio between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    }
    //   setIsFocused(null);
    // }
    else if (
      (e.target.value < 0.001 ||
        e.target.value > 2.0 ||
        isNaN(e.target.value)) &&
      flag == false
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter Regenerant Dose between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      let temTRes_AndRegenerantDose;
      if (e.target.name === "CatRegenerantDose-0") {
        temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        console.log(
          "temTRes_AndRegenerantDose-0",
          labelID,
          temTRes_AndRegenerantDose
        );
        tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal1(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["saftyFactorLbl"]: parseInt(labelID),
              ["saftyFactorVal"]: parseFloat(e.target.value),
            },
            ixStoreAnion,
          ])
        );
      } else if (e.target.name === "CatRegenerantDose-1") {
        temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        console.log(
          "temTRes_AndRegenerantDose-1",
          labelID,
          temTRes_AndRegenerantDose
        );
        tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal2(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["regenerantDoseLbl1ID"]: parseInt(labelID),
              ["regeneratDoseVal1"]: parseFloat(e.target.value),
            },
            ixStoreAnion,
          ])
        );
      } else if (e.target.name === "CatRegenerantDose-2") {
        temTRes_AndRegenerantDose = TRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        console.log(
          "temTRes_AndRegenerantDose-2",
          labelID,
          temTRes_AndRegenerantDose
        );
        tsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal3(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            {
              ...ixStoreCation,
              ["regenerantDoseLbl2ID"]: parseInt(labelID),
              ["regenerantDoseVal2"]: parseFloat(e.target.value),
            },
            ixStoreAnion,
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const handleBlurDoseAnion = (e, labelValue, labelID) => {
    var flag = false;
    if (labelValue != "WBA Overrun" && labelValue != "Regeneration Ratio") {
      flag = true;
    } else if (labelValue != "WBA Overrun") {
      flag = true;
    } else if (labelValue != "Regeneration Ratio") {
      flag = true;
    }
    if (
      (e.target.value < 0 || e.target.value > 100 || isNaN(e.target.value)) &&
      labelValue == "WBA Overrun"
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter WBA Overrun between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else if (
      (e.target.value < 100 ||
        e.target.value > 1000 ||
        isNaN(e.target.value)) &&
      labelValue == "Regeneration Ratio"
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter Regeneration Ratio between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    }
    //   setIsFocused(null);
    // }
    else if (
      (e.target.value < 0.001 ||
        e.target.value > 2.0 ||
        isNaN(e.target.value)) &&
      flag == false
    ) {
      setIsSumValid(true);
      setIsFocused(1);
      setMessage("Please Enter Regenerant Dose between of the Range.");
      //if(e.target.value < 1 || e.target.value >= 100 )
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      let temTRes_AndRegenerantDose;
      if (e.target.name === "ANRegenerantDose-0") {
        temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value).toFixed(2),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal1(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["saftyFactorLbl"]: parseInt(labelID),
              ["saftyFactorVal"]: parseFloat(e.target.value).toFixed(2),
            },
          ])
        );
      } else if (e.target.name === "ANRegenerantDose-1") {
        temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value).toFixed(2),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal2(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["regenerantDoseLbl1ID"]: parseInt(labelID),
              ["regeneratDoseVal1"]: parseFloat(e.target.value).toFixed(2),
              // ["regenerantDoseLbl2ID"]: parseInt(labelvalue),
              // ["regenerantDoseVal2"]: e.target.value,
            },
          ])
        );
      } else if (e.target.name === "ANRegenerantDose-2") {
        temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value).toFixed(2),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        //set_regeneratDoseVal3(e.target.value);
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["regenerantDoseLbl2ID"]: parseInt(labelID),
              ["regenerantDoseVal2"]: parseFloat(e.target.value).toFixed(2),
              // ["regenerantDoseLbl3ID"]: parseInt(labelvalue),
              // ["regenerantDoseVal3"]: e.target.value,
            },
          ])
        );
      } else {
        //set_regeneratDoseVal4(e.target.value);
        temTRes_AndRegenerantDose = TTRes_AndRegenerantDose?.map((st) => {
          if (st.ixregenerantDoseId === parseInt(labelID)) {
            st = {
              ...st,
              txtValue: parseFloat(e.target.value).toFixed(2),
              ixregenerantDoseId: parseInt(labelID),
            };
          }
          return st;
        });
        ttsetRes_AndRegenerantDose(temTRes_AndRegenerantDose);
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              ["regenerantDoseLbl3ID"]: parseInt(labelID),
              ["regenerantDoseVal3"]: parseFloat(e.target.value).toFixed(2),
              // ["regenerantDoseLbl4ID"]: parseInt(labelvalue),
              // ["regenerantDoseVal4"]: e.target.value,
            },
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const handleBlurEndAnion = (e) => {
    if (ixStoreAnion.speciesUnit == 1) {
      if (
        e.target.value > 4600000 ||
        e.target.value < 0.46 ||
        parseInt(e.target.value) < parseInt(ixStoreAnion.averageSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              [e.target.name]: parseFloat(e.target.value).toFixed(2),
            },
          ])
        );
      }
    } else {
      if (
        e.target.value > 200 ||
        e.target.value < 0.00002 ||
        parseInt(e.target.value) < parseInt(ixStoreAnion.averageSpeciesVal) ||
        isNaN(e.target.value)
      ) {
        setIsSumValid(true);
        setIsFocused(1);
        setMessage(
          "The Na Average Leakage value is larger than the Endpont value, Please revise your input."
        );
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateProductQualityRegenerantDose([
            ixStoreCation,
            {
              ...ixStoreAnion,
              [e.target.name]: parseFloat(e.target.value).toFixed(2),
            },
          ])
        );
      }
    }
    setIsFocused(null);
  };
  const txtChangeCation = (e) => {
    console.log("e.target.value ", e.target.name);
    console.log("e.target.value ", e.target.value);
    if (e.target.name == "averageSpeciesVal") {
      setNa_Average(true);
      //Conductivity(µS/cm) = SQRT( 60766.255 * Na(meq/L)^2 + 0.0029224901)
      // let Conductivity=Math. sqrt(60766.255*(e.target.value*e.target.value)+0.0029224901);
      //console.log("Conductivity", Conductivity.toFixed(2));
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: e.target.value,
            // ["averageConductivityVal"]: Conductivity.toFixed(2)
          },
          ixStoreAnion,
        ])
      );
    } else if (e.target.name == "endpoingSpeciesVal") {
      setNa_End(true);
      //Conductivity(µS/cm) = SQRT( 60766.255 * Na(meq/L)^2 + 0.0029224901)
      // let Conductivity=Math. sqrt(60766.255*(e.target.value*e.target.value)+0.0029224901);
      //console.log("Conductivity", Conductivity.toFixed(2));
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: e.target.value,
            // ["endpointConductivityVal"]: Conductivity.toFixed(2)
          },
          ixStoreAnion,
        ])
      );
    }
    ///
    else if (e.target.name == "averageConductivityVal") {
      setCond_Average(true);
      // //Na(meq/L) = SQRT( (Conductivity(µS/cm)^2 – 0.0029224901) / 60766.255)
      // let NaValue=Math. sqrt(((e.target.value*e.target.value) - 0.0029224901)/60766.255);
      // console.log("NaValue", NaValue.toFixed(2));
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: e.target.value,
            // ["averageSpeciesVal"]: NaValue.toFixed(2)
          },
          ixStoreAnion,
        ])
      );
    } else if (e.target.name == "endpointConductivityVal") {
      setCond_End(true);
      //Na(meq/L) = SQRT( (Conductivity(µS/cm)^2 – 0.0029224901) / 60766.255)
      // let NaValue=Math. sqrt(((e.target.value*e.target.value) - 0.0029224901)/60766.255);
      // console.log("NaValue", NaValue.toFixed(2));
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: e.target.value,
            //  ["endpoingSpeciesVal"]: NaValue.toFixed(2)
          },
          ixStoreAnion,
        ])
      );
    } else {
      dispatch(
        updateProductQualityRegenerantDose([
          {
            ...ixStoreCation,
            [e.target.name]: e.target.value,
          },
          ixStoreAnion,
        ])
      );
    }
  };
  const handlechangeCationUnit = (e) => {
    console.log("Result unit", e.target.value);
    /////////// Average value
    const ToUnit = e.target.value,
      FromUnit = ixStoreCation.speciesUnit;
    const ResultAv = UnitConversion(
      "IXD",
      ixStoreCation.averageSpeciesVal,
      ToUnit,
      FromUnit
    );

    console.log("Result", ResultAv);
    let ConductivityAv = Math.sqrt(60766.255 * ResultAv + 0.0029224901);

    const ResultEnd = UnitConversion(
      "IXD",
      ixStoreCation.endpoingSpeciesVal,
      ToUnit,
      FromUnit
    );
    console.log("Result", ResultEnd);
    let ConductivityEnd = Math.sqrt(60766.255 * ResultEnd + 0.0029224901);
    console.log("Conductivity", ConductivityAv.toFixed(2));
    dispatch(
      updateProductQualityRegenerantDose([
        {
          ...ixStoreCation,
          ["averageSpeciesVal"]: ResultAv,
          // ["averageConductivityVal"]: ConductivityAv.toFixed(2),
          ["endpoingSpeciesVal"]: ResultEnd,
          //  ["endpointConductivityVal"]: ConductivityEnd.toFixed(2),
          [e.target.name]: parseInt(e.target.value),
        },
        ixStoreAnion,
      ])
    );
    ////
    // dispatch(
    //   updateProductQualityRegenerantDose([{
    //     ...ixStoreCation,
    //     [e.target.name]: parseInt(e.target.value),
    //   },ixStoreAnion])
    // );
  };
  const handlechangeAnionUnit = (e) => {
    console.log("e.target.value", e.target.value);
    const ToUnit = e.target.value,
      FromUnit = ixStoreAnion.speciesUnit;
    const ResultAv = UnitConversion(
      "IXD",
      ixStoreAnion.averageSpeciesVal,
      ToUnit,
      FromUnit
    );
    console.log("Result", ResultAv);
    const ResultEnd = UnitConversion(
      "IXD",
      ixStoreAnion.endpoingSpeciesVal,
      ToUnit,
      FromUnit
    );
    console.log("Result", ResultEnd);
    dispatch(
      updateProductQualityRegenerantDose([
        ixStoreCation,
        {
          ...ixStoreAnion,
          ["speciesUnit"]: parseInt(e.target.value),
          ["averageSpeciesVal"]: ResultAv,
          ["endpoingSpeciesVal"]: ResultEnd,
        },
      ])
    );

    // dispatch(
    //   updateProductQualityRegenerantDose([ixStoreCation,{
    //     ...ixStoreAnion,
    //     ["speciesUnit"]: parseInt(e.target.value),
    //   }])
    // );
  };
  const txtChangeAnion = (e) => {
    console.log("e.target.value ", e.target.value);
    dispatch(
      updateProductQualityRegenerantDose([
        ixStoreCation,
        {
          ...ixStoreAnion,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };
  const radioCheck = (e) => {
    setRadionCheckEnable(e.target.value);
  };
  console.log("TRes_AndRegenerantDose", TRes_AndRegenerantDose);
  return (
    <>
      <ProductQualityRegenerantDoseStyled>
        <SystemDiagram />
        <div className="resin-regeneration">
          <StyledCard className="cation-resin-regeneration-card">
            <Card.Header>
              <CustomHeading
                label="Cation Resin Regeneration"
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
              />
              <Card.Title>
                <IconWithTooltip
                  label="For each regeneration, provide target leakages, resin safety factors, and chemical dose (100%)."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body className="cation-resin-regeneration-card-body">
              <div className="effluent-quality">
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="effluent-heading"
                    label="Effluent Quality"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                  />
                  <span className="vertical-line effluent"></span>
                </div>
                <div
                  className="na"
                  hidden={
                    (ixStore.anionResin === 1 ||
                      ixStore.anionResin === 4 ||
                      ixStore.anionResin === 11 ||
                      ixStore.anionResin === 12 ||
                      ixStore.anionResin === 13) &&
                    ixStore.cationResin == 3 &&
                    (ixStore.vessel1 == 0 ||
                      ixStore.vessel2 == 0 ||
                      ixStore.vessel3 == 0)
                      ? true
                      : false
                  }
                >
                  <div className="radio-box">
                    <CustomRadio
                      type="radio"
                      disabled={false}
                      name="speciesLblNameID"
                      checked={
                        ixStoreCation.speciesLblNameID == 1 ? true : false
                      }
                      value={1}
                      onChange={CationCheck}
                      id="radioNA"
                      label="Na"
                    />
                  </div>
                  <div className="top-wrapper">
                    <div className="input-box-wrapper">
                      <CustomHeading
                        label="Average"
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.PrimaryDarkAquaMarine}
                      />
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isError={false}
                        isWarning={false}
                        min={
                          ixStoreCation.speciesUnit == 1 ? "0.46" : "0.00002"
                        }
                        max={
                          ixStoreCation.speciesUnit == 1 ? "4,600,000" : "200"
                        }
                        type="number"
                        disabled={ixStoreCation?.speciesLblNameID == 2}
                        id="inputField"
                        className=""
                        name="averageSpeciesVal"
                        onChange={txtChangeCation}
                        value={ixStoreCation.averageSpeciesVal}
                        onBlur={(e) => handleBlur(e)}
                        onFocus={() => handleFocus(1)}
                      />
                      <InputReferenceText
                        refText={
                          ixStoreCation.speciesUnit == 1
                            ? "0.46–4,600,000"
                            : "0.00002-200.00"
                        }
                      />
                    </div>
                    <div className="end-point-wrapper">
                      <div className="input-box-wrapper">
                        <CustomHeading
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomInput
                          onKeyDown={(evt) =>
                            [
                              "e",
                              "E",
                              "+",
                              "-",
                              "ArrowUp",
                              "ArrowDown",
                            ].includes(evt.key) && evt.preventDefault()
                          }
                          isError={false}
                          isWarning={false}
                          min={
                            ixStoreCation.speciesUnit == 1 ? "0.46" : "0.00002"
                          }
                          max={
                            ixStoreCation.speciesUnit == 1 ? "4,600,000" : "200"
                          }
                          type="number"
                          disabled={ixStoreCation?.speciesLblNameID == 2}
                          id="inputField"
                          className=""
                          name="endpoingSpeciesVal"
                          onChange={txtChangeCation}
                          value={ixStoreCation.endpoingSpeciesVal}
                          onBlur={(e) => handleBlurEnd(e)}
                          onFocus={() => handleFocus(1)}
                        />
                        <InputReferenceText
                          refText={
                            ixStoreCation.speciesUnit == 1
                              ? "0.46–4,600,000"
                              : "0.00002-200.00"
                          }
                        />
                      </div>
                      <div className="select-options-div">
                        <CustomHeading
                          className="hidden"
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomSelect
                          id="selectNA"
                          onChange={handlechangeCationUnit}
                          value={ixStoreCation.speciesUnit}
                          name="speciesUnit"
                          disabled={ixStoreCation?.speciesLblNameID == 2}
                        >
                          {Res_AndRegenerantDose &&
                            Res_AndRegenerantDose?.iXunitname_column1?.map(
                              (Unit) => (
                                <option
                                  key={Unit.ixregenDoseSpecies1Id}
                                  value={Unit.ixregenDoseSpecies1Id}
                                >
                                  {Unit.unitName}
                                </option>
                              )
                            )}
                          ;
                          {/* <option>mg/L</option>
                            <option>mg/L</option> */}
                        </CustomSelect>
                        <InputReferenceText
                          refText="xx-yy"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <CustomHeading
                  hidden={
                    (ixStore.anionResin === 1 ||
                      ixStore.anionResin === 4 ||
                      ixStore.anionResin === 11 ||
                      ixStore.anionResin === 12 ||
                      ixStore.anionResin === 13) &&
                    ixStore.cationResin == 3 &&
                    (ixStore.vessel1 == 0 ||
                      ixStore.vessel2 == 0 ||
                      ixStore.vessel3 == 0)
                      ? true
                      : false
                  }
                  label="OR"
                  fontFamily="DiodrumSemiBold"
                  fontSize="14px"
                  fontWeight="600"
                  color={colors.Black}
                />
                <div
                  className="conductivity"
                  hidden={
                    (ixStore.anionResin === 1 ||
                      ixStore.anionResin === 4 ||
                      ixStore.anionResin === 11 ||
                      ixStore.anionResin === 12 ||
                      ixStore.anionResin === 13) &&
                    ixStore.cationResin == 3 &&
                    (ixStore.vessel1 == 0 ||
                      ixStore.vessel2 == 0 ||
                      ixStore.vessel3 == 0)
                      ? true
                      : false
                  }
                >
                  <div className="radio-box">
                    <CustomRadio
                      disabled={false}
                      type="radio"
                      name="speciesLblNameID"
                      checked={
                        ixStoreCation.speciesLblNameID == 2 ? true : false
                      }
                      value={2}
                      onChange={CationCheck}
                      id="radioConductivity"
                      label="Conductivity"
                    />
                  </div>
                  <div className="top-wrapper">
                    <div className="input-box-wrapper">
                      <CustomHeading
                        className="hidden"
                        label="End Point"
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.PrimaryDarkAquaMarine}
                      />
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isError={false}
                        isWarning={false}
                        type="number"
                        // min="0.055"
                        // max="49301.62"
                        disabled={ixStoreCation?.speciesLblNameID == 1}
                        id="inputField"
                        className=""
                        name="averageConductivityVal"
                        onChange={txtChangeCation}
                        value={ixStoreCation.averageConductivityVal}
                        onBlur={(e) => handleBlurConduct(e)}
                        onFocus={() => handleFocus(1)}
                      />
                      <InputReferenceText
                        // refText="0.055-49301.62"
                        refText={`${
                          unit.selectedUnits[17] === "µS/cm"
                            ? 0.055
                            : GlobalUnitConversion(
                                GlobalUnitConversionStore,
                                0.055,
                                unit.selectedUnits[17],
                                "µS/cm"
                              )?.toFixed(2)
                        }-${
                          unit.selectedUnits[17] === "µS/cm"
                            ? 49301.62
                            : GlobalUnitConversion(
                                GlobalUnitConversionStore,
                                49301.62,
                                unit.selectedUnits[17],
                                "µS/cm"
                              )?.toFixed(2)
                        }`}
                      />
                    </div>
                    <div className="input-box-wrapper long-input">
                      <CustomHeading
                        className="hidden"
                        label="End Point"
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.PrimaryDarkAquaMarine}
                      />
                      <InputWithText
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isError={false}
                        isWarning={false}
                        // min="0.055"
                        // max="49301.62"
                        inputText={unit.selectedUnits[17]}
                        type="number"
                        disabled={ixStoreCation?.speciesLblNameID == 1}
                        id="inputField"
                        className=""
                        name="endpointConductivityVal"
                        onChange={txtChangeCation}
                        value={ixStoreCation.endpointConductivityVal}
                        onBlur={(e) => handleBlurEndConduct(e)}
                        onFocus={() => handleFocus(1)}
                      />
                      <InputReferenceText
                        //  refText="0.055-49301.62"
                        refText={`${
                          unit.selectedUnits[17] === "µS/cm"
                            ? 0.055
                            : GlobalUnitConversion(
                                GlobalUnitConversionStore,
                                0.055,
                                unit.selectedUnits[17],
                                "µS/cm"
                              )?.toFixed(2)
                        }-${
                          unit.selectedUnits[17] === "µS/cm"
                            ? 49301.62
                            : GlobalUnitConversion(
                                GlobalUnitConversionStore,
                                49301.62,
                                unit.selectedUnits[17],
                                "µS/cm"
                              )?.toFixed(2)
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {/* // */}
                <div
                  className="na"
                  hidden={
                    (ixStore.anionResin === 1 ||
                      ixStore.anionResin === 4 ||
                      ixStore.anionResin === 11 ||
                      ixStore.anionResin === 12 ||
                      ixStore.anionResin === 13) &&
                    ixStore.cationResin == 3 &&
                    (ixStore.vessel1 == 0 ||
                      ixStore.vessel2 == 0 ||
                      ixStore.vessel3 == 0)
                      ? false
                      : true
                  }
                >
                  <div className="radio-box">
                    <CustomLabel hidden={false} id="radioNA" label="Hardness" />
                  </div>
                  <div className="top-wrapper">
                    <div className="input-box-wrapper">
                      <CustomHeading
                        label="Average"
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.PrimaryDarkAquaMarine}
                      />
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isError={false}
                        isWarning={false}
                        min="0.46"
                        max="4,600,000"
                        type="number"
                        disabled={ixStoreCation?.speciesLblNameID == 2}
                        id="inputField"
                        className=""
                        name="averageSpeciesVal"
                        onChange={txtChangeCation}
                        value={ixStoreCation.averageSpeciesVal}
                        onBlur={(e) => handleBlur(e)}
                        onFocus={() => handleFocus(1)}
                      />
                      <InputReferenceText refText="0.46–4,600,000" />
                    </div>
                    <div className="end-point-wrapper">
                      <div className="input-box-wrapper">
                        <CustomHeading
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomInput
                          onKeyDown={(evt) =>
                            [
                              "e",
                              "E",
                              "+",
                              "-",
                              "ArrowUp",
                              "ArrowDown",
                            ].includes(evt.key) && evt.preventDefault()
                          }
                          isError={false}
                          isWarning={false}
                          min="0.46"
                          max="4,600,000"
                          type="number"
                          disabled={ixStoreCation?.speciesLblNameID == 2}
                          id="inputField"
                          className=""
                          name="endpoingSpeciesVal"
                          onChange={txtChangeCation}
                          value={ixStoreCation.endpoingSpeciesVal}
                          onBlur={(e) => handleBlurEnd(e)}
                          onFocus={() => handleFocus(1)}
                        />
                        <InputReferenceText refText="0.46–4,600,000" />
                      </div>
                      <div className="select-options-div">
                        <CustomHeading
                          className="hidden"
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomSelect
                          id="selectNA"
                          onChange={handlechangeCationUnit}
                          value={ixStoreCation.speciesUnit}
                          name="speciesUnit"
                          disabled={ixStoreCation?.speciesLblNameID == 2}
                        >
                          {Res_AndRegenerantDose &&
                            Res_AndRegenerantDose?.iXunitname_column1?.map(
                              (Unit) => (
                                <option
                                  key={Unit.ixregenDoseSpecies1Id}
                                  value={Unit.ixregenDoseSpecies1Id}
                                >
                                  {Unit.unitName}
                                </option>
                              )
                            )}
                          ;
                          {/* <option>mg/L</option>
                            <option>mg/L</option> */}
                        </CustomSelect>
                        <InputReferenceText
                          refText="xx-yy"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* //// */}
              </div>
              <div className="regenerant-dose">
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="regenerant-heading"
                    label="Regenerant Dose"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                  />
                  <span className="vertical-line"></span>
                </div>
                <div className="regenerant-dose-wrapper">
                  <div className="sac-safety-factor">
                    {TRes_AndRegenerantDose &&
                      TRes_AndRegenerantDose?.map((Dosevalue, i) => (
                        <>
                          <CustomLabel label={Dosevalue.langText} />
                          <div className="input-reference">
                            <CustomInput
                              onKeyDown={(evt) =>
                                [
                                  "e",
                                  "E",
                                  "+",
                                  "-",
                                  "ArrowUp",
                                  "ArrowDown",
                                ].includes(evt.key) && evt.preventDefault()
                              }
                              isError={false}
                              isWarning={false}
                              min="0.001"
                              max="2.00"
                              type="number"
                              id="sacInput"
                              name={"CatRegenerantDose-" + i}
                              onChange={(e) =>
                                CationRegenerantDoseCheck(
                                  e,
                                  Dosevalue.ixregenerantDoseId,
                                  Dosevalue.langText
                                )
                              }
                              className=""
                              value={Dosevalue.txtValue}
                              onBlur={(e) =>
                                handleBlurDoseCation(
                                  e,
                                  Dosevalue.langText,
                                  Dosevalue.ixregenerantDoseId
                                )
                              }
                              onFocus={() => handleFocus(1)}
                            />
                            {Dosevalue.langText === "WAC Overrun" ? (
                              ixStore.newPlant_ind ? (
                                <InputReferenceText refText="0%–100%" />
                              ) : (
                                <InputReferenceText refText="0%–200%" />
                              )
                            ) : Dosevalue.langText === "Regeneration Ratio" ? (
                              <InputReferenceText refText="100–1000%" />
                            ) : (
                              <InputReferenceText refText="0.001–2.00" />
                            )}
                          </div>
                        </>
                      ))}
                    {/* <CustomLabel label="SAC Safety Factor"/>
                    <div className="input-reference">
                      <CustomInput isError={false} isWarning={false} type="text" id="sacInput" className="" defaultValue="0.02"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div> */}
                  </div>
                  {/* <div className="wac-safety-factor">
                    <CustomLabel label="WAC Safety Factor"/>
                    <div className="input-reference">
                      <CustomInput isError={false} type="text" id="wacInput" className="" defaultValue="0.02"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div>
                  </div>
                  <div className="wac-overrun"> 
                    <CustomLabel label="WAC Overrun"/>
                    <div className="input-reference">
                      <InputWithText isError={false} isWarning={false} inputText="%" type="text" id="wacOverrunInput" className="" defaultValue="0.01"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div>
                  </div> */}
                </div>
              </div>
              <div
                className={
                  radioOptionEnabled
                    ? "select-options disabled_div"
                    : "select-options"
                }
              >
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="radio-option-heading"
                    label="Select one of the options"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="400"
                    color={radioOptionEnabled ? colors.Grey96 : colors.Black}
                  />
                  <span className="vertical-line option"></span>
                </div>
                <div className="radio-options-wrapper">
                  <div
                    className="doseh2so4"
                    disabled={
                      Modeling == "NewPlant" &&
                      ixStore?.cationResin === 3 &&
                      ixStore?.anionResin === 4
                        ? true
                        : false
                    }
                  >
                    {/* disabled={radioOptionEnabled} */}
                    <CustomRadio
                      type="radio"
                      name="regenerantDoseLbl4ID"
                      disabled={
                        Modeling == "NewPlant" &&
                        ixStore?.cationResin === 3 &&
                        ixStore?.anionResin === 4
                          ? true
                          : false
                      }
                      id="doseH2SO4Radio"
                      value={1}
                      checked={
                        ixStoreCation.regenerantDoseLbl4ID == 1 ? true : false
                      }
                      onChange={CationCheck}
                      label={regenerantListCationValueNew}
                    />
                    <div className="input-reference">
                      <InputWithText
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isWarning={false}
                        isError={false}
                        disabled={
                          Modeling == "NewPlant" &&
                          ixStore?.cationResin === 3 &&
                          ixStore?.anionResin === 4
                            ? true
                            : false || ixStoreCation.regenerantDoseLbl4ID != 1
                        }
                        type="number"
                        id="inputField"
                        inputText={unit.selectedUnits[14]}
                        className=""
                        name="regenerantDoseVal4"
                        onChange={txtChangeCation}
                        onBlur={(e) => handleBlurSelectDoseCation(e)}
                        value={ixStoreCation.regenerantDoseVal4}
                      />
                    </div>
                  </div>
                  <div className="volume">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={1}
                      onChange={radioCheck}
                      name="Cation_options"
                      id="volumeRadio"
                      label="Volume"
                    />
                    <div className="input-reference">
                      <InputWithText
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          RadionCheckEnable != 1 ? radioOptionEnabled : ""
                        }
                        isWarning={false}
                        isError={false}
                        type="number"
                        id="inputField"
                        inputText={unit.selectedUnits[13]}
                        className=""
                        name="volume"
                        onChange={txtChangeCation}
                        value={ixStoreCation.volume}
                      />
                    </div>
                  </div>
                  <div className="flow-rate">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={2}
                      onChange={radioCheck}
                      name="Cation_options"
                      id="flowRateRadio"
                      label="Flow Rate"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          RadionCheckEnable != 2 ? radioOptionEnabled : ""
                        }
                        type="number"
                        id="flowRateInput"
                        className=""
                        name="flowRate"
                        onChange={txtChangeCation}
                        value={ixStoreCation.flowRate}
                      />
                      <InputReferenceText refText=">0" />
                    </div>
                  </div>
                  <CustomHeading
                    label="&"
                    fontFamily="DiodrumSemiBold"
                    fontSize="14px"
                    fontWeight="600"
                    color={radioOptionEnabled ? colors.Grey96 : colors.Black}
                  />
                  <div className="time">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={3}
                      onChange={radioCheck}
                      name="Cation_options"
                      id="timeRadio"
                      label="Time"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        min="0.1"
                        max="2"
                        disabled={
                          RadionCheckEnable != 3 ? radioOptionEnabled : ""
                        }
                        isError={false}
                        isWarning={false}
                        type="number"
                        id="timeInput"
                        className=""
                        name="time"
                        onChange={txtChangeCation}
                        value={ixStoreCation.time}
                      />
                      <InputReferenceText refText="0.1–2 hr" />
                    </div>
                  </div>
                  <div className="regeneration-ratio">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling === "NewPlant" &&
                        ixStore?.cationResin === 2 &&
                        ixStore?.anionResin === 1
                          ? true
                          : false
                      }
                      value={4}
                      checked={
                        ixStoreCation.regenerantDoseLbl4ID == 4 ? true : false
                      }
                      onChange={CationCheck}
                      name="regenerantDoseLbl4ID"
                      id="regenerationRadio"
                      label="Regeneration Ratio"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          Modeling === "NewPlant" &&
                          ixStore?.cationResin === 2 &&
                          ixStore?.anionResin === 1
                            ? true
                            : false || ixStoreCation.regenerantDoseLbl4ID != 4
                        }
                        isError={false}
                        isWarning={false}
                        type="number"
                        id="regenerationInput"
                        name="regenerationRatio"
                        onChange={txtChangeCation}
                        onBlur={(e) => OnBlureCationRegeneratCation(e)}
                        className=""
                        value={ixStoreCation.regenerationRatio}
                      />
                      <InputReferenceText refText="" />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </StyledCard>
          <StyledCard className="anion-resin-regeneration-card">
            <Card.Header>
              <CustomHeading
                label="Anion Resin Regeneration"
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
              />
              <Card.Title>
                <IconWithTooltip
                  label="For each regeneration, provide target leakages, resin safety factors, and chemical dose (100%)."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body className="anion-resin-regeneration-card-body">
              <div className="effluent-quality">
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="effluent-heading effluent-heading-anion"
                    label="Effluent Quality"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="500"
                    color={colors.Black}
                  />
                  <span className="vertical-line effluent"></span>
                </div>
                <div className="na">
                  <div className="radio-box">
                    <CustomLabel className="anion-label-na" label="SiO₂" />
                  </div>
                  <div className="top-wrapper">
                    <div className="input-box-wrapper">
                      <CustomHeading
                        label="Average"
                        fontFamily="NotoSansRegular"
                        fontSize="14px"
                        fontWeight="400"
                        color={colors.PrimaryDarkAquaMarine}
                      />
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isError={false}
                        isWarning={false}
                        min={
                          ixStoreCation.speciesUnit == 1 ? "0.46" : "0.00002"
                        }
                        max={
                          ixStoreCation.speciesUnit == 1 ? "4,600,000" : "200"
                        }
                        id="inputField"
                        className=""
                        type="number"
                        disabled={ixStoreAnion?.speciesLblNameID == 4}
                        name="averageSpeciesVal"
                        onChange={txtChangeAnion}
                        value={ixStoreAnion.averageSpeciesVal}
                        onBlur={(e) => handleBlurAnion(e)}
                        onFocus={() => handleFocus(1)}
                      />
                      <InputReferenceText
                        refText={
                          ixStoreAnion.speciesUnit == 1
                            ? "0.46–4,600,000"
                            : "0.00002-200.00"
                        }
                      />
                    </div>
                    <div className="end-point-wrapper">
                      <div className="input-box-wrapper">
                        <CustomHeading
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomInput
                          onKeyDown={(evt) =>
                            [
                              "e",
                              "E",
                              "+",
                              "-",
                              "ArrowUp",
                              "ArrowDown",
                            ].includes(evt.key) && evt.preventDefault()
                          }
                          id="inputField"
                          className=""
                          min={
                            ixStoreCation.speciesUnit == 1 ? "0.46" : "0.00002"
                          }
                          max={
                            ixStoreCation.speciesUnit == 1 ? "4,600,000" : "200"
                          }
                          type="number"
                          disabled={ixStoreAnion?.speciesLblNameID == 4}
                          name="endpoingSpeciesVal"
                          onChange={txtChangeAnion}
                          value={ixStoreAnion.endpoingSpeciesVal}
                          onBlur={(e) => handleBlurEndAnion(e)}
                          onFocus={() => handleFocus(1)}
                        />
                        <InputReferenceText
                          refText={
                            ixStoreAnion.speciesUnit == 1
                              ? "0.46–4,600,000"
                              : "0.00002-200.00"
                          }
                        />
                      </div>
                      <div className="select-options-div">
                        <CustomHeading
                          className="hidden"
                          label="End Point"
                          fontFamily="NotoSansRegular"
                          fontSize="14px"
                          fontWeight="400"
                          color={colors.PrimaryDarkAquaMarine}
                        />
                        <CustomSelect
                          id="selectNA"
                          onChange={handlechangeAnionUnit}
                          value={ixStoreAnion.speciesUnit}
                          name="Anion_speciesUnit"
                          disabled={ixStoreAnion?.speciesLblNameID == 4}
                        >
                          {/* <option value="">Select</option> */}
                          {Res_AndRegenerantDose &&
                            Res_AndRegenerantDose?.iXunitname_column2?.map(
                              (Unit) => (
                                <option
                                  key={Unit.ixregenDoseSpecies1Id}
                                  value={Unit.ixregenDoseSpecies1Id}
                                >
                                  {Unit.unitName}
                                </option>
                              )
                            )}
                          ;
                        </CustomSelect>
                        <InputReferenceText
                          refText="xx-yy"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <CustomHeading
                  label="AND"
                  fontFamily="DiodrumSemiBold"
                  fontSize="14px"
                  fontWeight="600"
                  color={colors.Black}
                  className={"andLable"}
                />
                <div className="organic">
                  <div className="radio-box">
                    <CustomLabel
                      className="anion-label-na"
                      label="Organics Removal Efficiency"
                    />
                  </div>
                  <div className="top-wrapper">
                    <InputWithText
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                          evt.key
                        ) && evt.preventDefault()
                      }
                      isError={false}
                      isWarning={false}
                      id="organicInputField"
                      inputText="%"
                      className=""
                      type="number"
                      disabled={ixStoreAnion?.speciesLblNameID == 3}
                      name="endpointConductivityVal"
                      onChange={txtChangeAnion}
                      value={ixStoreAnion.endpointConductivityVal}
                      onBlur={(e) => handleBlurOrganic(e)}
                      onFocus={() => handleFocus(1)}
                    />
                    <InputReferenceText refText="0-100" />
                  </div>
                </div>
              </div>
              <div className="regenerant-dose">
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="regenerant-heading"
                    label="Regenerant Dose"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                  />
                  <span className="vertical-line"></span>
                </div>
                <div className="regenerant-dose-wrapper">
                  <div className="sac-safety-factor">
                    {TTRes_AndRegenerantDose &&
                      TTRes_AndRegenerantDose?.map((Dosevalue, i) => (
                        <>
                          <CustomLabel label={Dosevalue.langText} />
                          <div className="input-reference">
                            <CustomInput
                              min="0.001"
                              max="2.00"
                              isError={false}
                              isWarning={false}
                              type="number"
                              id="sacInput"
                              name={"ANRegenerantDose-" + i}
                              onChange={(e) =>
                                AnionRegenerantDoseCheck(
                                  e,
                                  Dosevalue.ixregenerantDoseId
                                )
                              }
                              className="form-control"
                              value={Dosevalue.txtValue}
                              onBlur={(e) =>
                                handleBlurDoseAnion(
                                  e,
                                  Dosevalue.langText,
                                  Dosevalue.ixregenerantDoseId
                                )
                              }
                              onFocus={() => handleFocus(1)}
                            />
                            {Dosevalue.langText === "WBA Overrun" ? (
                              ixStore.newPlant_ind ? (
                                <InputReferenceText refText="0%–100%" />
                              ) : (
                                <InputReferenceText refText="0%–200%" />
                              )
                            ) : Dosevalue.langText === "Regeneration Ratio" ? (
                              <InputReferenceText refText="100–1000%" />
                            ) : (
                              <InputReferenceText refText="0.001–2.00" />
                            )}
                          </div>
                        </>
                      ))}
                    {/* {Res_AndRegenerantDose &&
                    Res_AndRegenerantDose?.ixRegenerationDoseName_column2?.map((Dosevalue)=>(
                      <> <CustomLabel label={Dosevalue.langText}/>
                    <div className="input-reference">
                      <CustomInput isError={false} isWarning={false} type="text" id="sacInput" className="" defaultValue="0.02"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div></>
                    ))} */}
                    {/* </div>
                  <div className="wac-safety-factor">
                    <CustomLabel label="WAC Safety Factor"/>
                    <div className="input-reference">
                      <CustomInput isError={false} type="text" id="wacInput" className="" defaultValue="0.02"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div>
                  </div>
                  <div className="wac-overrun"> 
                    <CustomLabel label="WAC Overrun"/>
                    <div className="input-reference">
                      <InputWithText isError={false} isWarning={false} inputText="%" type="text" id="wacOverrunInput" className="" defaultValue="0.01"/>
                      <InputReferenceText refText="Ranges XXX-YYY"/>
                    </div> */}
                  </div>
                </div>
              </div>
              <div
                className={
                  radioOptionEnabled
                    ? "select-options disabled_div"
                    : "select-options"
                }
              >
                <div className="vertical-line-heading">
                  <CustomHeading
                    className="radio-option-heading"
                    label="Select one of the options"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="400"
                    color={radioOptionEnabled ? colors.Grey96 : colors.Black}
                  />
                  <span className="vertical-line option"></span>
                </div>
                <div className="radio-options-wrapper">
                  <div
                    className="doseh2so4"
                    disabled={
                      Modeling == "NewPlant" &&
                      ixStore?.cationResin === 3 &&
                      ixStore?.anionResin === 4
                        ? true
                        : false
                    }
                  >
                    <CustomRadio
                      type="radio"
                      name="Anion_regenerantDoseLbl4ID"
                      disabled={
                        Modeling == "NewPlant" &&
                        ixStore?.cationResin === 3 &&
                        ixStore?.anionResin === 4
                          ? true
                          : false
                      }
                      id="doseH2SO4Radio"
                      value={1}
                      checked={
                        ixStoreAnion.regenerantDoseLbl4ID == 1 ? true : false
                      }
                      onChange={AnionCheck}
                      label={regenerantListAnionValueNew}
                    />
                    <div className="input-reference">
                      <InputWithText
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        isWarning={false}
                        isError={false}
                        disabled={
                          Modeling == "NewPlant" &&
                          ixStore?.cationResin === 3 &&
                          ixStore?.anionResin === 4
                            ? true
                            : false || ixStoreAnion.regenerantDoseLbl4ID != 1
                        }
                        type="number"
                        id="inputField"
                        inputText={unit.selectedUnits[14]}
                        className=""
                        name="regenerantDoseVal4"
                        onChange={txtChangeAnion}
                        onBlur={(e) => handleBlurSelectDoseAnion(e)}
                        value={ixStoreAnion.regenerantDoseVal4}
                      />
                    </div>
                  </div>
                  <div className="volume">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={5}
                      onChange={radioCheck}
                      name="Anion_options"
                      id="volumeRadio"
                      label="Volume"
                    />
                    <div className="input-reference">
                      <InputWithText
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          RadionCheckEnable != 5 ? radioOptionEnabled : ""
                        }
                        isError={false}
                        isWarning={false}
                        inputText={unit.selectedUnits[13]}
                        type="text"
                        id="inputField"
                        className=""
                        name="volume"
                        onChange={txtChangeAnion}
                        value={ixStoreAnion.volume}
                      />
                    </div>
                  </div>
                  <div className="flow-rate">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={6}
                      onChange={radioCheck}
                      name="Anion_options"
                      id="flowRateRadio"
                      label="Flow Rate"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        min="0"
                        disabled={
                          RadionCheckEnable != 6 ? radioOptionEnabled : ""
                        }
                        type="number"
                        id="flowRateInput"
                        className=""
                        name="flowRate"
                        onChange={txtChangeAnion}
                        value={ixStoreAnion.flowRate}
                      />
                      <InputReferenceText refText=">0" />
                    </div>
                  </div>
                  <CustomHeading
                    label="&"
                    fontFamily="DiodrumSemiBold"
                    fontSize="14px"
                    fontWeight="600"
                    color={radioOptionEnabled ? colors.Grey96 : colors.Black}
                  />
                  <div className="time">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling != "EvaluateExisting" ? radioOptionEnabled : ""
                      }
                      value={7}
                      onChange={radioCheck}
                      name="Anion_options"
                      id="timeRadio"
                      label="Time"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          RadionCheckEnable != 7 ? radioOptionEnabled : ""
                        }
                        isError={false}
                        isWarning={false}
                        type="number"
                        id="timeInput"
                        className=""
                        name="time"
                        onChange={txtChangeAnion}
                        value={ixStoreAnion.time}
                      />
                      <InputReferenceText refText="0.1–2 hr" />
                    </div>
                  </div>
                  <div className="regeneration-ratio">
                    <CustomRadio
                      type="radio"
                      disabled={
                        Modeling === "NewPlant" &&
                        ixStore?.cationResin === 2 &&
                        ixStore?.anionResin === 1
                          ? true
                          : false
                      }
                      value={4}
                      checked={
                        ixStoreAnion.regenerantDoseLbl4ID == 4 ? true : false
                      }
                      onChange={AnionCheck}
                      name="Anion_regenerantDoseLbl4ID"
                      id="regenerationRadio"
                      label="Regeneration Ratio"
                    />
                    <div className="input-reference">
                      <CustomInput
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                            evt.key
                          ) && evt.preventDefault()
                        }
                        disabled={
                          Modeling === "NewPlant" &&
                          ixStore?.cationResin === 2 &&
                          ixStore?.anionResin === 1
                            ? true
                            : false || ixStoreAnion.regenerantDoseLbl4ID != 4
                        }
                        isError={false}
                        isWarning={false}
                        type="number"
                        id="regenerationInput"
                        className=""
                        name="regenerationRatio"
                        onChange={txtChangeAnion}
                        onBlur={(e) => OnBlureCationRegeneratAnion(e)}
                        value={ixStoreAnion.regenerationRatio}
                      />
                      <InputReferenceText refText="" />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </StyledCard>
          <div className="neutral-overrun-dose-card-wrapper">
            <StyledCard className="neutral-waste-effluent-card">
              <Card.Header>
                <CustomHeading
                  label="Neutral Waste Effluent"
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <Card.Title>
                  <IconWithTooltip
                    label="If appropriate, increase acid or caustic dose so that waste stream pH = 7."
                    icon={<InfoIcon />}
                  />
                </Card.Title>
              </Card.Header>
              <Card.Body className="neutral-waste-effluent-card-body">
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="notRequiredRadio"
                    name="naturalEffect"
                    checked={ixStoreCation.naturalEffect === 0 ? true : false}
                    onChange={CationCheck}
                    value={0}
                    label="Not Required"
                  />
                </div>
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="requiredRadio"
                    name="naturalEffect"
                    checked={ixStoreCation.naturalEffect == 1 ? true : false}
                    onChange={CationCheck}
                    value={1}
                    label="Required(will override dose inputs)"
                  />
                </div>
              </Card.Body>
            </StyledCard>
            <StyledCard className="overrun-card">
              <Card.Header>
                <CustomHeading
                  label="Overrun Computation"
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <Card.Title>
                  <IconWithTooltip
                    label="If appropriate, overrun WAC or WBA rest past its normal endpoint, affects weak/strong resin ratio."
                    icon={<InfoIcon />}
                  />
                </Card.Title>
              </Card.Header>
              <Card.Body className="overrun-card-body">
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="manualRadio"
                    name="overAllComputation"
                    checked={
                      ixStoreCation.overAllComputation == 0 ? true : false
                    }
                    value={0}
                    onChange={CationCheck}
                    label="Manual"
                  />
                </div>
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="automaticRadio"
                    name="overAllComputation"
                    checked={
                      ixStoreCation.overAllComputation == 1 ? true : false
                    }
                    value={1}
                    onChange={CationCheck}
                    label="Automatic"
                  />
                </div>
              </Card.Body>
            </StyledCard>
            <StyledCard className="dose-optimization-card">
              <Card.Header>
                <CustomHeading
                  label="Dose Optimization"
                  fontFamily="NotoSansRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <Card.Title>
                  <IconWithTooltip
                    label="Adjust dose to minimum level required to meet all capacity and leakage targets."
                    icon={<InfoIcon />}
                  />
                </Card.Title>
              </Card.Header>
              <Card.Body className="dose-optimization-card-body">
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="noRadio"
                    name="doseOptimization"
                    checked={ixStoreCation.doseOptimization == 0 ? true : false}
                    value={0}
                    onChange={CationCheck}
                    label="No"
                  />
                </div>
                <div className="common-radio">
                  <CustomRadio
                    type="radio"
                    id="yesRadio"
                    name="doseOptimization"
                    checked={ixStoreCation.doseOptimization == 1 ? true : false}
                    value={1}
                    onChange={CationCheck}
                    label="Yes(will override dose inputs)"
                  />
                </div>
              </Card.Body>
            </StyledCard>
          </div>
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
      </ProductQualityRegenerantDoseStyled>
    </>
  );
};

export default ProductQualityRegenerantDose;
