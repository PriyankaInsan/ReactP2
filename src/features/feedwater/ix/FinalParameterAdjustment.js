/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import SystemDiagram from "./SystemDiagram";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import FinalParameterAdjustmentStyled from "./FinalParameterAdjustmentStyled";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import { updateIXStore, updatelistFinalParamAdj, updateCalcEngData } from "./IXDSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { Table } from "react-bootstrap";
import { MyError } from "../../../common/utils/ErrorCreator";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";

const FinalParameterAdjustment = () => {
  const [isFocused, setIsFocused] = useState(null);
  const [errorOperator, setErrorOperator] = useState({
    show: false,
    message: "",
  });
  const dispatch = useDispatch();
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixStoreObj = useSelector((state) => state.IXStore);
  const unit = useSelector((state) => state.projectInfo?.projectConfig?.unitConfig);
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const [finalInput, setFinalInput] = useState(false);
  // const [data, setData] = useState(ixStoreObj.listFinalParamAdj);
  const [lengthUnitData, setLengthUnitData] = useState();
  const [volumeUnitData, setVolumeUnitData] = useState();
  const [swellingValueData, setSwellingValueData] = useState([]);
  const [swellingValueData2, setSwellingValueData2] = useState([]);
  const [swellingValueData3, setSwellingValueData3] = useState([]);
  const [swellingValueData4, setSwellingValueData4] = useState([]);
  const [resinBedHeightAsDeliveredFeatured, setResinBedHeightAsDeliveredFeatured] = useState();
  const [resinBedHeightAsExhaustedFeatured, setResinBedHeightAsExhaustedFeatured] = useState();
  const [resinBedHeightAsRegeneratedFeatured, setResinBedHeightAsRegeneratedFeatured] = useState();
  const [resinBedStandardHeightFeatured, setResinBedStandardHeightFeatured] = useState();
  const [resinBedHeightAsDeliveredFeatured1, setResinBedHeightAsDeliveredFeatured1] = useState();
  const [resinBedHeightAsExhaustedFeatured1, setResinBedHeightAsExhaustedFeatured1] = useState();
  const [resinBedHeightAsRegeneratedFeatured1, setResinBedHeightAsRegeneratedFeatured1] = useState();
  const [resinBedStandardHeightFeatured1, setResinBedStandardHeightFeatured1] = useState();
  const [getSwellingValues, responseSwellingValues] = useLazyGetAllDataQuery();
  const [getSwellingValues2, responseSwellingValues2] = useLazyGetAllDataQuery();
  const [getSwellingValues3, responseSwellingValues3] = useLazyGetAllDataQuery();
  const [getSwellingValues4, responseSwellingValues4] = useLazyGetAllDataQuery();
  const [getIXDetails, responseIXDetailsFPA] = useLazyGetAllDataQuery();
  const [getUnitlist, responseUnitlist] = useLazyGetAllDataQuery();
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const caseID = ProjectInfoStore.caseId;
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const ixResinID1 = ixStore.selectedResinList[0].ixResinID1;
  const ixResinID2 = ixStore.selectedResinList[0].ixResinID2;
  const ionicFormSelected_ind = ixStore.selectedResinList[0].ionicFormSelected_ind;
  const ixResinID3 = ixStore.selectedResinList[1].ixResinID1;
  const ixResinID4 = ixStore.selectedResinList[1].ixResinID2;
  const ionicFormSelected_ind2 = ixStore.selectedResinList[1].ionicFormSelected_ind;

  const calculateVesselWallThickness = (value) => {
    var defaultWallThickness = 0;
    if (value < 1.2) {
      defaultWallThickness = 0.016;
    } else if (value < 2.0) {
      defaultWallThickness = 0.020;
    } else {
      defaultWallThickness = 0.026;
    }
    return defaultWallThickness;
  };
  // const convertAccurateUnits = (value, unit) => {
  //   if (unit === "volume") {
  //     if (lengthUnitData === "ft³") {
  //       return value * 0.0283168;
  //     } else if (lengthUnitData === "L") {
  //       return value * 0.001;
  //     } else {
  //       return value;
  //     }
  //   } else {
  //     if (lengthUnitData === "mm") {
  //       return value * 0.001;
  //     } else if (lengthUnitData === "cm") {
  //       return value * 0.01;
  //     } else if (lengthUnitData === "in") {
  //       return value * 0.0254;
  //     }
  //   }
  // };
  // const convertBackAccurateUnits = (value, unit) => {
  //   if (unit === "volume") {
  //     if (lengthUnitData === "ft³") {
  //       return value * 35.3147;
  //     } else if (lengthUnitData === "L") {
  //       return value * 1000;
  //     } else {
  //       return value;
  //     }
  //   } else {
  //     if (lengthUnitData === "mm") {
  //       return value * 1000;
  //     } else if (lengthUnitData === "cm") {
  //       return value * 100;
  //     } else if (lengthUnitData === "in") {
  //       return value * 39.3701;
  //     }
  //   }
  // };
  const inertBedHeightCalculation = (innerDiameter,vessel) => {
    console.log("inertBedHeight innerDiameter,vessel",innerDiameter,vessel);
    console.log("inertBedHeight ixStore[vessel]",ixStore[vessel]);
    // console.log("ixStore.data.vessel1" + ixStore.vessel1);
    // console.log("ixStore.data.vessel2" + ixStore.vessel2);
    // console.log("ixStore.data.vessel3" + ixStore.vessel3);
    // console.log("ixStore.data.vessel4" + ixStore.vessel4);
    let indexValue=parseInt(vessel[vessel.length-1]);
    let Height_Reference_SAC=ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedStandardHeight;
    let inertBedHeight=ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].inertBedHeight;
    // console.log("inertBedHeight Height_Reference_SAC",Height_Reference_SAC);
    if (ixStore[vessel] == 1 && ixStore[vessel] != null) {
      let var1 = Math.max(0.15, 0.1 + 0.1 * innerDiameter);
      let var2 = 0.0125 * Math.pow(innerDiameter, 2);
      inertBedHeight = var1 - var2;
    } else if ((ixStore[vessel] == 4 || ixStore[vessel] == 5) && ixStore[vessel] != null) {
      inertBedHeight = 0.25;
    } else if (ixStore[vessel] == 2 && ixStore[vessel] != null) {
      inertBedHeight = Math.max(0.15, 0.05 + 0.05 * innerDiameter);
    } else if (((ixStore[vessel] == 8 || ixStore[vessel] == 9) && ixStore[vessel] != null)|| (ixStore[vessel] == 2 && ixStore[vessel] != null && vessel==="vessel1")) {
      inertBedHeight = Math.max(0.15, 0.05 + 0.05 * innerDiameter);
      if (Height_Reference_SAC < 0.5) {
        inertBedHeight = 0.2;
      } else if (Height_Reference_SAC < 1.0) {
        inertBedHeight = 0.15 + 0.1 * Height_Reference_SAC;
      } else {
        inertBedHeight = 0.25;
      }
    }
    console.log("inertBedHeight final",inertBedHeight);
    return inertBedHeight;
  };

  const inertResinVolumeCalculation = (inertBedHeight, vesselArea) => {
    console.log("inertBedHeight * vesselArea",inertBedHeight, vesselArea);
    let inertResinVolume = inertBedHeight * vesselArea;
    return inertResinVolume;
  };

  const freeboardCalculation = (inertBedHeight,vessel) => {
    console.log("inertBedHeight",inertBedHeight);
    let Target_Freeboard_PB = 0.025;
    let Target_Freeboard_BW = 1.0;
    let Height_BW;
    let indexValue=parseInt(vessel[vessel.length-1]);
    let resinName=ixStoreObj[`resinName${indexValue}`];

    if (
      (ixStoreObj.Demineralization[0].ixProcessName !== "Demineralization" &&(resinName==="SAC" || resinName==="SBA")) ||(ixStoreObj.Demineralization[0].ixProcessName !== "Condensate Polishing" &&(resinName==="SAC" || resinName==="SBA"))||(ixStoreObj.Demineralization[0].ixProcessName !== "Brackish Softening WAC(H/Na)" && resinName==="WAC")) {
      Height_BW = ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedHeightAsRegenerated;
    } else {
      Height_BW = ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedStandardHeight;
    }
  
    let Freeboard_minimum;
    let Resin_Height_Max=Math.max(ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedStandardHeight+ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedHeightAsRegenerated+ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedHeightAsExhausted+ixStoreObj.existingPlantDescription[indexValue]&&ixStoreObj.existingPlantDescription[indexValue].resinBedHeightAsDelivered);

    if (ixStore[vessel]===0 && ixStore[vessel] != null) {
      Freeboard_minimum = Height_BW * (1 + Target_Freeboard_BW);
    } else if (ixStore[vessel]===1 && ixStore[vessel] != null) {
      Freeboard_minimum = Math.max(
        (Resin_Height_Max * Target_Freeboard_PB) / (1 - Target_Freeboard_PB),
        0.05
      );
    } else if (ixStore[vessel]===2 && ixStore[vessel] != null) {
      Freeboard_minimum = Math.max(
        (Resin_Height_Max * Target_Freeboard_PB) / (1 - Target_Freeboard_PB),
        0.05
      );
    } else if ((ixStore[vessel] == 4 || ixStore[vessel] == 5) && ixStore[vessel] != null) {
      Freeboard_minimum = Height_BW * (1 + Target_Freeboard_BW);
    } else if (ixStore[vessel] == 8 && ixStore[vessel] != null) {
      Freeboard_minimum = Height_BW * (1 + Target_Freeboard_BW);
    } else if (ixStore[vessel] == 9 && ixStore[vessel] != null) {
      Freeboard_minimum = 0.05;
    }
    console.log("Resin_Height_Max + inertBedHeight + Freeboard_minimum",Resin_Height_Max,inertBedHeight,Freeboard_minimum);
    let vesselCylindricalHeight=Resin_Height_Max + inertBedHeight + Freeboard_minimum;
    let freeboard = vesselCylindricalHeight - Resin_Height_Max - inertBedHeight;
    console.log("freeboard" + freeboard);
    return [vesselCylindricalHeight,freeboard];
  };
  const handleChange = (e, vesselNo, subIndex,featured,featuredIndex) => {
    dispatch(updateCalcEngData("false"));
    console.log("e, vesselNo, subIndex,featured,featuredIndex",e, vesselNo, subIndex,featured,featuredIndex);
    var swellingData = [];
    var swellingSold = 0;
    var swellingRegen = 0;
    var swellingExhaust = 0;
    var vessel=`vessel${vesselNo}`;
    if (subIndex === 0) {
      swellingData = swellingValueData;
    } else if (subIndex === 1) {
      swellingData = swellingValueData2;
    } else if (subIndex === 2) {
      swellingData = swellingValueData3;
    } else {
      swellingData = swellingValueData4;
    }
    if (ixStoreObj.Demineralization[0].ixProcessName !== "Demineralization") {
      swellingSold = swellingData ? swellingData.srNaClCycleSold : 1;
      swellingRegen = swellingData ? swellingData.srNaClCycleRegen : 1;
      swellingExhaust = swellingData ? swellingData.srNaClCycleExhaust : 1;
    } else {
      swellingSold = swellingData ? swellingData.srHOhCycleSold : 1;
      swellingRegen = swellingData ? swellingData.srHOhCycleRegen : 1;
      swellingExhaust = swellingData ? swellingData.srHOhCycleExhaust : 1;
    }
    let { value, name } = e.target;
    if (value !== "") {
      value = parseFloat(value.trim(), 10);
    }
    // var valueAfter;
    // if (name === "resinVolumeAsDelivered" || name === "inertResinVolume") {
    //   valueAfter = convertAccurateUnits(value, "volume");
    // } else {
    //   valueAfter = convertAccurateUnits(value, "length");
    // }
    const updatedSubData = ixStoreObj.listFinalParamAdj.map(
      (finalobj, index) => {
        console.log("index",index," and subIndex",subIndex,"finalobj",finalobj,"featuredIndex",featuredIndex,"vesselNo",vesselNo);
        var resinVolumeAsDeliveredValue = data[index].resinVolumeAsDelivered;
        var updatedWallThickness = finalobj.vesselWallThickness;
        var innerDiameter = value - 2 * updatedWallThickness;
        var vesselArea = Math.PI * Math.pow(innerDiameter / 2, 2);
        if (name === "resinVolumeAsDelivered") {
          var newResinVolumeValue = value;
        } else {
          newResinVolumeValue = resinVolumeAsDeliveredValue;
        }
        var heightDelivered = finalobj.resinBedHeightAsDelivered;
        var heightReference = finalobj.resinBedStandardHeight;
        var heightRegen = finalobj.resinBedHeightAsRegenerated;
        var heightExhaust = finalobj.resinBedHeightAsExhausted;
        if (subIndex===featuredIndex && index===vesselNo && featured===true && (name === "vesselDiameter"||name === "vesselWallThickness")){
          console.log("finalobj.resinVolumeAsDelivered new featured",finalobj.resinVolumeAsDelivered);
          if (name === "vesselDiameter") {
            updatedWallThickness = calculateVesselWallThickness(value);
            innerDiameter = value - 2 * updatedWallThickness;
            vesselArea = Math.PI * Math.pow(innerDiameter / 2, 2);
            //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function call start
            let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
            let inertResinVolume = inertResinVolumeCalculation(inertBedHeight,vesselArea);
            let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
            //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function end

            heightDelivered = resinVolumeAsDeliveredValue / vesselArea;
            heightReference = heightDelivered / swellingSold;
            heightRegen = heightReference * swellingRegen;
            heightExhaust = heightReference * swellingExhaust;
            // heightDelivered = convertBackAccurateUnits(heightDelivered, "length");
            //  heightReference = convertBackAccurateUnits(heightReference, "length");
            //   heightExhaust = convertBackAccurateUnits(heightExhaust, "length");
            //   heightRegen = convertBackAccurateUnits(heightRegen, "length");
              setResinBedHeightAsDeliveredFeatured(data[featuredIndex].resinBedHeightAsDelivered + heightDelivered);
              setResinBedStandardHeightFeatured(data[featuredIndex].resinBedStandardHeight + heightReference);
              setResinBedHeightAsRegeneratedFeatured(data[featuredIndex].resinBedHeightAsRegenerated + heightRegen);
              setResinBedHeightAsExhaustedFeatured(data[featuredIndex].resinBedHeightAsExhausted + heightExhaust);
              return {
                ...finalobj,
                [name]: value,
                ["vesselWallThickness"]: 
                  updatedWallThickness,
                ["resinBedHeightAsDelivered"]: heightDelivered,
                ["resinBedStandardHeight"]:heightReference,
                ["resinBedHeightAsExhausted"]: heightExhaust,
                ["resinBedHeightAsRegenerated"]:heightRegen,
                ["inertBedHeight"]: 
                  inertBedHeight,
                ["inertResinVolume"]: 
                  inertResinVolume,
                ["freeBoard"]: freeBoard,
                ["vesselCylindricalHeight"]: 
                  vesselCylindricalHeight,
                ["pressureDropwithRecomQty"]: null,
              };
          } else if (name === "vesselWallThickness") {
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function call start
             let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
             let inertResinVolume = inertResinVolumeCalculation(inertBedHeight,vesselArea);
             let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function end
            heightDelivered = newResinVolumeValue / vesselArea;
            heightReference = heightDelivered / swellingSold;
            heightRegen = heightReference * swellingRegen;
            heightExhaust = heightReference * swellingExhaust;
            if(featured){
            // heightDelivered = convertBackAccurateUnits(heightDelivered, "length");
            // heightReference = convertBackAccurateUnits(heightReference, "length");
            // heightExhaust = convertBackAccurateUnits(heightExhaust, "length");
            // heightRegen = convertBackAccurateUnits(heightRegen, "length");
            setResinBedHeightAsDeliveredFeatured(data[featuredIndex].resinBedHeightAsDelivered + heightDelivered);
            setResinBedStandardHeightFeatured(data[featuredIndex].resinBedStandardHeight + heightReference);
            setResinBedHeightAsRegeneratedFeatured(data[featuredIndex].resinBedHeightAsRegenerated + heightRegen);
            setResinBedHeightAsExhaustedFeatured(data[featuredIndex].resinBedHeightAsExhausted + heightExhaust);
            }
            return {
              ...finalobj,
              [name]: value,
              ["resinBedHeightAsDelivered"]: heightDelivered,
              ["resinBedStandardHeight"]:heightReference,
              ["resinBedHeightAsExhausted"]: heightExhaust,
              ["resinBedHeightAsRegenerated"]:heightRegen,
              ["inertBedHeight"]: 
                inertBedHeight,
              ["inertResinVolume"]: 
                inertResinVolume,
              ["freeBoard"]: freeBoard,
              ["vesselCylindricalHeight"]: 
                vesselCylindricalHeight,
              ["pressureDropwithRecomQty"]: null,
            };
          } else {
            return { ...finalobj, [name]: value };
          }
        }
        if (index === subIndex) {
          console.log("finalobj.resinVolumeAsDelivered",finalobj.resinVolumeAsDelivered);
          if (name === "vesselDiameter") {
            updatedWallThickness = calculateVesselWallThickness(value);

            innerDiameter = value - 2 * updatedWallThickness;
            vesselArea = Math.PI * Math.pow(innerDiameter / 2, 2);
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function call start
             let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
             let inertResinVolume = inertResinVolumeCalculation(inertBedHeight,vesselArea);
             let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function end

            // var heightDelivered = resinVolumeAsDeliveredValue / vesselArea;
            // var heightReference = heightDelivered / swellingSold;
            // var heightRegen = heightReference * swellingRegen;
            // var heightExhaust = heightReference * swellingExhaust;
            heightDelivered = resinVolumeAsDeliveredValue / vesselArea;
            heightReference = heightDelivered / swellingSold;
            heightRegen = heightReference * swellingRegen;
            heightExhaust = heightReference * swellingExhaust;
            if(featured){
              // heightDelivered = convertBackAccurateUnits(heightDelivered, "length");
              // heightReference = convertBackAccurateUnits(heightReference, "length");
              // heightExhaust = convertBackAccurateUnits(heightExhaust, "length");
              // heightRegen = convertBackAccurateUnits(heightRegen, "length");
              setResinBedHeightAsDeliveredFeatured(data[featuredIndex].resinBedHeightAsDelivered + heightDelivered);
              setResinBedStandardHeightFeatured(data[featuredIndex].resinBedStandardHeight + heightReference);
              setResinBedHeightAsRegeneratedFeatured(data[featuredIndex].resinBedHeightAsRegenerated + heightRegen);
              setResinBedHeightAsExhaustedFeatured(data[featuredIndex].resinBedHeightAsExhausted + heightExhaust);
              }
              return {
                ...finalobj,
                [name]: value,
                ["vesselWallThickness"]: 
                  updatedWallThickness,
                ["resinBedHeightAsDelivered"]: heightDelivered,
                ["resinBedStandardHeight"]:heightReference,
                ["resinBedHeightAsExhausted"]: heightExhaust,
                ["resinBedHeightAsRegenerated"]:heightRegen,
                ["inertBedHeight"]: 
                  inertBedHeight,
                ["inertResinVolume"]: 
                  inertResinVolume,
                ["freeBoard"]: freeBoard,
                ["vesselCylindricalHeight"]: 
                  vesselCylindricalHeight,
                ["pressureDropwithRecomQty"]: null,
              };
          } else if (
            name === "resinVolumeAsDelivered" ||
            name === "vesselWallThickness"
          ) {
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function call start
             let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
             let inertResinVolume = inertResinVolumeCalculation(inertBedHeight,vesselArea);
             let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
             //inertbedheight,Inert Resin Volume,FreeBoard ,vesselCylindricalHeight function end

            heightDelivered = newResinVolumeValue / vesselArea;
            heightReference = heightDelivered / swellingSold;
            heightRegen = heightReference * swellingRegen;
            heightExhaust = heightReference * swellingExhaust;
            if(featured){
            // heightDelivered = convertBackAccurateUnits(heightDelivered, "length");
            // heightReference = convertBackAccurateUnits(heightReference, "length");
            // heightExhaust = convertBackAccurateUnits(heightExhaust, "length");
            // heightRegen = convertBackAccurateUnits(heightRegen, "length");
            setResinBedHeightAsDeliveredFeatured(data[featuredIndex].resinBedHeightAsDelivered + heightDelivered);
            setResinBedStandardHeightFeatured(data[featuredIndex].resinBedStandardHeight + heightReference);
            setResinBedHeightAsRegeneratedFeatured(data[featuredIndex].resinBedHeightAsRegenerated + heightRegen);
            setResinBedHeightAsExhaustedFeatured(data[featuredIndex].resinBedHeightAsExhausted + heightExhaust);
            }
            return {
              ...finalobj,
              [name]: value,
              ["resinBedHeightAsDelivered"]: heightDelivered,
              ["resinBedStandardHeight"]:heightReference,
              ["resinBedHeightAsExhausted"]: heightExhaust,
              ["resinBedHeightAsRegenerated"]:heightRegen,
              ["inertBedHeight"]: 
                inertBedHeight,
              ["inertResinVolume"]: 
                inertResinVolume,
              ["freeBoard"]: freeBoard,
              ["vesselCylindricalHeight"]: 
                vesselCylindricalHeight,
              ["pressureDropwithRecomQty"]: null,
            };
          } else {
            return { ...finalobj, [name]: value };
          }
        }
        return finalobj;
      }
    );
    console.log("updatedSubData", updatedSubData);
    dispatch(updatelistFinalParamAdj(updatedSubData));
  };
  const validations =(field)=> {
    if(field=="vesselWallThickness"){
      const minRange=unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2));
      const maxRange=unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2));
      return [minRange,maxRange];
    }
    if(field=="vesselDiameter"){
      const minRange=unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2));
      const maxRange=unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2));
      return [minRange,maxRange];
    }
    if(field=="resinVolumeAsDelivered"){
      const minRange=unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2));
      const maxRange=unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2));
      return [minRange,maxRange];
    }
  };
  const giveErrorMessage = (label, value) => {
    return `The ${label} value entered is outside the allowed range (${value[0]} to ${value[1]}). Please revise your input.`;
  };
  const closeErrorMessag = () => {
    setErrorOperator({
      show: false,
      message: "",
    });
    // setIsFocused(2);
  };
  const handleBlur = (e,subIndex,field) => {
    const { name, value } = e.target;
    if (
      value < validations(name)[0] ||
      value > validations(name)[1]
    ) {
      var parts=name.split(/(?=[A-Z)])/);
      parts[0]=parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      var label=parts.join(" ");
      setErrorOperator({
        show: true,
        message: giveErrorMessage(label, validations(name)),
      });
      // setIsFocused(name);
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      let list=[...ixStoreObj.listFinalParamAdj];
      const newList = list.map((item, index) => {
      if (index === subIndex) {
          return { ...item, [e.target.name]: Number.parseFloat(e.target.value).toFixed(2) };
      }
      return item;
  });
    console.log("PK list[subIndex].field",list, newList);
    dispatch(updatelistFinalParamAdj(newList));
      setIsFocused(null);
      setErrorOperator({
        show: false,
        message: "",
      });
    }
    // setIsFocused(null);
  };
  // const handleBlur = (e,subIndex,field) => {
  //   let list=[...ixStoreObj.listFinalParamAdj];
  //   const newList = list.map((item, index) => {
  //     if (index === subIndex) {
  //         return { ...item, [field]: Number.parseFloat(e.target.value).toFixed(2) };
  //     }
  //     return item;
  // });
  //   console.log("PK list[subIndex].field",list, newList);
  //   dispatch(updatelistFinalParamAdj(newList));
  //   setIsFocused(null);
  // };
  // const handleChange = (e, vesselNo, subIndex) => {
  //   dispatch(updateCalcEngData("false"));
  //   var swellingData = [];
  //   var swellingSold = 0;
  //   var swellingRegen = 0;
  //   var swellingExhaust = 0;
  //   var vessel=`vessel${subIndex + 1}`;
  //   if (subIndex === 0) {
  //     swellingData = swellingValueData;
  //   } else if (subIndex === 1) {
  //     swellingData = swellingValueData2;
  //   } else if (subIndex === 2) {
  //     swellingData = swellingValueData3;
  //   } else {
  //     swellingData = swellingValueData4;
  //   }
  //   console.log("swellingData", swellingData);
  //   if (ixStoreObj.Demineralization[0].ixProcessName !== "Demineralization") {
  //     swellingSold = swellingData ? swellingData.srNaClCycleSold : 1;
  //     swellingRegen = swellingData ? swellingData.srNaClCycleRegen : 1;
  //     swellingExhaust = swellingData ? swellingData.srNaClCycleExhaust : 1;
  //   } else {
  //     swellingSold = swellingData ? swellingData.srHOhCycleSold : 1;
  //     swellingRegen = swellingData ? swellingData.srHOhCycleRegen : 1;
  //     swellingExhaust = swellingData ? swellingData.srHOhCycleExhaust : 1;
  //   }
  //   let { value, name } = e.target;
  //   if (value !== "") {
  //     value = parseFloat(value.trim(), 10);
  //   }
  //   var valueAfter;
  //   if (name === "resinVolumeAsDelivered" || name === "inertResinVolume") {
  //     valueAfter = convertAccurateUnits(value, "volume");
  //   } else {
  //     valueAfter = convertAccurateUnits(value, "length");
  //   }
  //   const updatedSubData = ixStoreObj.listFinalParamAdj.map((finalobj, index) => {
  //     if (index === subIndex) {
  //       var resinVolumeAsDeliveredValue = convertAccurateUnits(finalobj.resinVolumeAsDelivered, "volume");
  //       var updatedWallThickness = convertAccurateUnits(finalobj.vesselWallThickness, "length");
  //       var innerDiameter = valueAfter - 2 * updatedWallThickness;
  //       var vesselArea = Math.PI * Math.pow((innerDiameter / 2), 2);
  //       if (name === "vesselDiameter") {
  //         updatedWallThickness = calculateVesselWallThickness(valueAfter);
  //         innerDiameter = valueAfter - 2 * updatedWallThickness;
  //         vesselArea = Math.PI * Math.pow((innerDiameter / 2), 2);

  //         //inertbedheight function call start
  //         let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
  //         //inertbedheight function call end
  //         //Inert Resin Volume function start
  //         let inertResinVolume = inertResinVolumeCalculation(
  //           inertBedHeight,
  //           vesselArea
  //         );
  //         //Inert Resin Volume function end
  //         //FreeBoard function start
  //         let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
  //         //FreeBoard function end
  //         //Vessel Cylindrical Height function start
  //         // let Resin_Height_Max;
  //         // let vesselCylindricalHeightData = cylindricalVesselHeight(
  //         //   Resin_Height_Max,
  //         //   inertBedHeight,
  //         //   freeBoard
  //         // );
  //         //Vessel Cylindrical Height function end
  //         var heightDelivered = resinVolumeAsDeliveredValue / vesselArea;
  //         var heightReference = heightDelivered / swellingSold;
  //         var heightRegen = heightReference * swellingRegen;
  //         var heightExhaust = heightReference * swellingExhaust;
  //         console.log("in oD D,REF,REG,EX", heightDelivered, heightReference, heightRegen, heightExhaust);
  //         return {
  //           ...finalobj, [name]: value, ["vesselWallThickness"]: convertBackAccurateUnits(updatedWallThickness, "length"), ["resinBedHeightAsDelivered"]: convertBackAccurateUnits(heightDelivered, "length"), ["resinBedStandardHeight"]: convertBackAccurateUnits(heightReference, "length"), ["resinBedHeightAsExhausted"]: convertBackAccurateUnits(heightExhaust, "length"), ["resinBedHeightAsRegenerated"]: convertBackAccurateUnits(heightRegen, "length"), ["inertBedHeight"]: convertBackAccurateUnits(inertBedHeight, "length"), ["inertResinVolume"]: convertBackAccurateUnits(inertResinVolume, "volume"), ["freeBoard"]: convertBackAccurateUnits(freeBoard, "length"),
  //           ["vesselCylindricalHeight"]: convertBackAccurateUnits(vesselCylindricalHeight, "length"),
  //           ["pressureDropwithRecomQty"]: ""
  //         };
  //       } else if (name === "resinVolumeAsDelivered" || name === "vesselWallThickness") {
  //         if (name === "resinVolumeAsDelivered") {
  //           var newResinVolumeValue = valueAfter;
  //         } else {
  //           newResinVolumeValue = resinVolumeAsDeliveredValue;
  //         }
  //         //inertbedheight function call start
  //         let inertBedHeight = inertBedHeightCalculation(innerDiameter,vessel);
  //         //inertbedheight function call end
  //         //Inert Resin Volume function start
  //         let inertResinVolume = inertResinVolumeCalculation(
  //           inertBedHeight,
  //           vesselArea
  //         );
  //         //Inert Resin Volume function end
  //         //FreeBoard function start
  //         let [vesselCylindricalHeight,freeBoard] = freeboardCalculation(inertBedHeight,vessel);
  //         //FreeBoard function end
  //         //Vessel Cylindrical Height function start
  //         // let Resin_Height_Max;
  //         // let vesselCylindricalHeightData = cylindricalVesselHeight(
  //         //   Resin_Height_Max,
  //         //   inertBedHeight,
  //         //   freeBoard
  //         // );
  //         //Vessel Cylindrical Height function end
  //         heightDelivered = newResinVolumeValue / vesselArea;
  //         heightReference = heightDelivered / swellingSold;
  //         heightRegen = heightReference * swellingRegen;
  //         heightExhaust = heightReference * swellingExhaust;
  //         console.log("in volume D,REF,REG,EX", heightDelivered, heightReference, heightRegen, heightExhaust);
  //         return {
  //           ...finalobj, [name]: value, ["resinBedHeightAsDelivered"]: convertBackAccurateUnits(heightDelivered, "length"), ["resinBedStandardHeight"]: convertBackAccurateUnits(heightReference, "length"), ["resinBedHeightAsExhausted"]: convertBackAccurateUnits(heightExhaust, "length"), ["resinBedHeightAsRegenerated"]: convertBackAccurateUnits(heightRegen, "length"), ["inertBedHeight"]: convertBackAccurateUnits(
  //             inertBedHeight,
  //             "length"
  //           ),
  //           ["inertResinVolume"]: convertBackAccurateUnits(
  //             inertResinVolume,
  //             "volume"
  //           ),
  //           ["freeBoard"]: convertBackAccurateUnits(freeBoard, "length"),
  //           ["vesselCylindricalHeight"]: convertBackAccurateUnits(
  //             vesselCylindricalHeight,
  //             "length"
  //           ),
  //           ["pressureDropwithRecomQty"]: ""
  //         };
  //       } else {
  //         return { ...finalobj, [name]: value };
  //       }
  //     }
  //     return finalobj;
  //   });
  //   console.log("updatedSubData", updatedSubData);
  //   dispatch(updatelistFinalParamAdj(updatedSubData));
  // };

  const finalParameterRadio = (e) => {
    console.log("changeRadio Value: ", e.target.value);
  };
  useEffect(() => {
    console.log("ProjectInfoStore", ProjectInfoStore.projectID);
    console.log("ixStore", ixStore);
    if (ixStore.cationResin === ixStore.anionResin) {
      setFinalInput(true);
      console.log("final value true");
    } else {
      setFinalInput(false);
      console.log("final value false");
    }
    try {
      getIXDetails(
        `${"ix/api/v1/FinalParameter"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }&caseID=${caseID}`
      );
      // getIXDetails(
      //   `${"ix/api/v1/FinalParameter"}?userID=${1}&projectID=${1
      //   }&caseID=${1}`
      // );
      console.log("resin1", ixResinID1, "resin2", ixResinID2, "resin3", ixResinID3, "resin4", ixResinID4, "ionicFormSelected_ind", ionicFormSelected_ind, "ionicFormSelected_ind2", ionicFormSelected_ind2);
      getSwellingValues(
        `${"ix/api/v1/Resin"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }&ixResinID=${ixResinID1}`
      );
      getSwellingValues2(
        `${"ix/api/v1/Resin"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }&ixResinID=${ixResinID2}`
      );
      getSwellingValues3(
        `${"ix/api/v1/Resin"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }&ixResinID=${ixResinID3}`
      );
      getSwellingValues4(
        `${"ix/api/v1/Resin"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }&ixResinID=${ixResinID4}`
      );
      getUnitlist(
        `${"masterdata/api/v1/UnitOfMeassure"}?userID=${userID}&projectID=${ProjectInfoStore.projectID
        }`
      );
    } catch {
      console.log("Error: Fetch IXDetails data base on ixLeftpanel selectin");
    }
  }, []);
  useEffect(() => {
    if (responseSwellingValues.isLoading) {
      console.log("Loading ....swelling List");
    } else {
      if (responseSwellingValues.isSuccess === true) {
        console.log("sucess ....swelling List", responseSwellingValues);
        console.log(
          "sucess ....swelling List data",
          responseSwellingValues.data
        );
        setSwellingValueData(responseSwellingValues.data);
      }
    }
    if (responseSwellingValues.isError) {
      throw new MyError(
        "swelling Api Error",
        responseSwellingValues.error.status,
        "ApiError"
      );
    }
  }, [responseSwellingValues]);
  useEffect(() => {
    if (responseSwellingValues2.isLoading) {
      console.log("Loading ....swelling2 List");
    } else {
      if (responseSwellingValues2.isSuccess === true) {
        console.log("sucess ....swelling2 List", responseSwellingValues2);
        console.log(
          "sucess ....swelling2 List data",
          responseSwellingValues2.data
        );
        setSwellingValueData2(responseSwellingValues2.data);
      }
    }
    if (responseSwellingValues2.isError) {
      throw new MyError(
        "swelling2 Api Error",
        responseSwellingValues2.error.status,
        "ApiError"
      );
    }
  }, [responseSwellingValues2]);
  useEffect(() => {
    if (responseSwellingValues3.isLoading) {
      console.log("Loading ....swelling3 List");
    } else {
      if (responseSwellingValues3.isSuccess === true) {
        console.log("sucess ....swelling3 List", responseSwellingValues3);
        console.log(
          "sucess ....swelling3 List data",
          responseSwellingValues3.data
        );
        setSwellingValueData3(responseSwellingValues3.data);
      }
    }
    if (responseSwellingValues3.isError) {
      throw new MyError(
        "swelling3 Api Error",
        responseSwellingValues3.error.status,
        "ApiError"
      );
    }
  }, [responseSwellingValues3]);
  useEffect(() => {
    if (responseSwellingValues4.isLoading) {
      console.log("Loading ....swelling4 List");
    } else {
      if (responseSwellingValues4.isSuccess === true) {
        console.log("sucess ....swelling4 List", responseSwellingValues4);
        console.log(
          "sucess ....swelling4 List data",
          responseSwellingValues4.data
        );
        setSwellingValueData4(responseSwellingValues4.data);
      }
    }
    if (responseSwellingValues4.isError) {
      throw new MyError(
        "swelling4 Api Error",
        responseSwellingValues4.error.status,
        "ApiError"
      );
    }
  }, [responseSwellingValues4]);
  useEffect(() => {
    if (responseUnitlist.isLoading) {
      console.log("Loading ....unit List");
    } else {
      if (responseUnitlist.isSuccess === true) {
        console.log("sucess ....unit List", responseUnitlist);
        console.log(
          "sucess ....unit List data",
          responseUnitlist.data[7].unitKey
        );
        var lengthObj = responseUnitlist.data[7].unitKey.find(obj => obj.isSelected === true);
        var VolumeObj = responseUnitlist.data[11].unitKey.find(obj => obj.isSelected === true);
        setLengthUnitData(lengthObj.uomName);
        setVolumeUnitData(VolumeObj.uomName);
      }
    }
    if (responseUnitlist.isError) {
      throw new MyError(
        "Unitlist Api Error",
        responseUnitlist.error.status,
        "ApiError"
      );
    }
  }, [responseUnitlist]);
  useEffect(() => {
    console.log("responseIXDetailsFPA", responseIXDetailsFPA);
    if (responseIXDetailsFPA.isLoading) {
      console.log("Loading");
    } else {
      console.log("Loading1");
      if (responseIXDetailsFPA.status == "fulfilled") {
        if (ixStoreObj.viewReport === "true") {
          if (responseIXDetailsFPA?.data?.length > 0) {
            const filteredList = responseIXDetailsFPA.data.filter(item =>{
              const values= Object.values(item);
              const nonNullCount= values.filter(value=>value!== null).length;
              return nonNullCount!==1;
            }
            );

            // const filteredList = responseIXDetailsFPA.data.filter(item => !Object.values(item).every(value => value === null));
            const finalList= filteredList.map((obj,index)=>({...obj,resinName: ixStoreObj[`resinName${index+1}`],resinType:ixStoreObj.resinData[ixStoreObj[`resinName${index+1}`]],}));
            let list = [...finalList];
            const newList = list.map((item, index) => {
            let vesselDiameter = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].vesselDiameter,
              unit.selectedUnits[8],
              "m"
            );
            let resinBedHeightAsDelivered = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].resinBedHeightAsDelivered,
              unit.selectedUnits[8],
              "m"
            );
            let resinBedStandardHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].resinBedStandardHeight,
              unit.selectedUnits[8],
              "m"
            );
            let resinBedHeightAsRegenerated = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].resinBedHeightAsRegenerated,
              unit.selectedUnits[8],
              "m"
            );
            let resinBedHeightAsExhausted = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].resinBedHeightAsExhausted,
              unit.selectedUnits[8],
              "m"
            );
            let inertBedHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].inertBedHeight,
              unit.selectedUnits[8],
              "m"
            );
            let vesselCylindricalHeight = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].vesselCylindricalHeight,
              unit.selectedUnits[8],
              "m"
            );
            let vesselWallThickness = GlobalUnitConversion(
              GlobalUnitConversionStore,
              finalList[index].vesselWallThickness,
              unit.selectedUnits[8],
              "m"
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
          console.log("PK newList",newList);
            dispatch(updatelistFinalParamAdj(newList));
            // setData(responseIXDetailsFPA.data);
          }
        } else {
          console.log("PK second stage Case 2 data");
        }

      }
    }
    if (responseIXDetailsFPA.isError) {
      throw new MyError(
        "IXDetails Api Error",
        responseIXDetailsFPA.error.status,
        "ApiError"
      );
    }
  }, [responseIXDetailsFPA]);

  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const data=ixStoreObj?.listFinalParamAdj;
  // console.log("PK data",data);
  const dataIndex=0;

  return (
    <>
      <FinalParameterAdjustmentStyled className="g-0">
        <SystemDiagram />
        {(finalInput === true) ? (<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 1 &&
              <>
              <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 1"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[0].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[0].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[0].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[0].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+101)}
                          onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")} 
                          isFocused={isFocused === dataIndex+101} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex}`}
                          value={data && data[0].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[0].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex}`}
                          value={data && data[0].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[0].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                        />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex}`}
                          value={data && data[0].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[0].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                         />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex}`}
                          value={data && data[0].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[0].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex}`}
                          value={data && data[0].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[0].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />                       
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex}`}
                          value={data && data[0].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[0].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          />                       
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          value={data && data[0].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[0].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+201)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+201} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          value={data && data[0].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 1}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[1].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[1].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[1].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[1].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+105)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+105} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[1].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+1}`}
                          value={data && data[1].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[1].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[1].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[1].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+1}`}
                          value={data && data[1].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[1].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight2${dataIndex+1}`}
                          value={data && data[1].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[1].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard2${dataIndex+1}`}
                          value={data && data[1].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[1].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[1].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+301)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+301} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty2${dataIndex+1}`}
                          value={data && data[1].pressureDropwithRecomQty}
                          name="inertResinVolume"
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                        />                      
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[0].vesselDiameter) ||
                            data && data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[0].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[0].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[0].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+113)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+113} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                           type="number"
                           id={`freeBoard${dataIndex}`}
                           name="freeBoard"
                          value={data && data[0].freeBoard + data && data[1].freeBoard}
                          placeholder={data && data[0].freeBoard+ data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+213)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+213} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselWallThickness${dataIndex}`}
                          name="vesselWallThickness"
                          isError={data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]||data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1]}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data &&data[0].vesselWallThickness}
                          placeholder={data &&data[0].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+404)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+404} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          name="pressureDropwithRecomQty"
                          value={data && data[0].pressureDropwithRecomQty}
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
              </>
}    
        </div>):((ixStore.cationResin===6||ixStore.cationResin===7)&&(ixStore.anionResin===12||ixStore.anionResin===13))?(<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 1 &&
              <>
              <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 1"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[0].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[0].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[0].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[0].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+105)}
                          onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+105} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex}`}
                          value={data && data[0].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[0].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex}`}
                          value={data && data[0].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[0].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex}`}
                          value={data && data[0].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[0].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex}`}
                          value={data && data[0].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[0].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex}`}
                          value={data && data[0].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[0].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex}`}
                          value={data && data[0].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[0].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          value={data && data[0].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[0].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+223)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+223} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          value={data && data[0].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 1}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[1].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[1].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[1].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[1].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+166)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+166} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[1].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+1}`}
                          value={data && data[1].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[1].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                         />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[1].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                        />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[1].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+1}`}
                          value={data && data[1].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[1].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight2${dataIndex+1}`}
                          value={data && data[1].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[1].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard2${dataIndex+1}`}
                          value={data && data[1].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[1].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[1].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+707)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+707} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty2${dataIndex+1}`}
                          value={data && data[1].pressureDropwithRecomQty}
                          name="inertResinVolume"
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[0].vesselDiameter) ||
                            data && data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[0].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[0].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[0].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+808)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+808} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                           type="number"
                           id={`freeBoard${dataIndex}`}
                           name="freeBoard"
                          value={data && data[0].freeBoard + data && data[1].freeBoard}
                          placeholder={data && data[0].freeBoard+ data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+45)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+45} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselWallThickness${dataIndex}`}
                          name="vesselWallThickness"
                          isError={data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]||data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1]}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data &&data[0].vesselWallThickness}
                          placeholder={data &&data[0].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+909)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+909} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          name="pressureDropwithRecomQty"
                          value={data && data[0].pressureDropwithRecomQty}
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
              <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 2"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[2].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[2].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex+2}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,3)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[2].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[2].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[2].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[2].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+2110)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+2110} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[2].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex+2}`}
                          value={data && data[2].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[2].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[2].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[2].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex+2}`}
                          value={data && data[2].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[2].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex+2}`}
                          value={data && data[2].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[2].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex+2}`}
                          value={data && data[2].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex+2}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,3)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[2].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+795)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+795} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex+2}`}
                          value={data && data[2].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[2].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[3].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[3].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+3}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+3,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[3].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[3].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[3].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[3].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+111)}
                          onBlur={(e) => handleBlur(e, dataIndex+3,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+111} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[3].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+3}`}
                          value={data && data[3].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[3].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[3].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[3].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+3}`}
                          value={data && data[3].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[3].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                           id={`inertBedHeight${dataIndex+3}`}
                           value={data && data[3].inertBedHeight}
                           name="inertBedHeight"
                          placeholder={data && data[3].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex+3}`}
                          value={data && data[3].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[3].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"  
                          id={`vesselCylindricalHeight${dataIndex+3}`}                  
                          name="vesselCylindricalHeight"
                          onChange={(e) => handleChange(e, 2, dataIndex+3,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[3].vesselCylindricalHeight}
                          placeholder={data && data[3].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+334)}
                          onBlur={(e) => handleBlur(e, dataIndex+3,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+334} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex+3}`}
                          value={data && data[3].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[3].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[2].vesselDiameter) ||
                            data && data[2].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[2].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[2].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[2].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+541)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+541} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured1${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured1}
                          name={"resinBedHeightAsDeliveredFeatured1"}
                          placeholder={resinBedHeightAsDeliveredFeatured1}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured1${dataIndex}`}
                          value={resinBedStandardHeightFeatured1}
                          name="resinBedStandardHeightFeatured1"
                          placeholder={resinBedStandardHeightFeatured1}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured1${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured1}
                          name="resinBedHeightAsRegeneratedFeatured1"
                          placeholder={resinBedHeightAsRegeneratedFeatured1}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured1${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured1}
                          name="resinBedHeightAsExhaustedFeatured1"
                          placeholder={resinBedHeightAsExhaustedFeatured1}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          name="freeBoard"
                          value={data && data[3].freeBoard + data && data[2].freeBoard}
                          placeholder={data && data[3].freeBoard+ data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          name="vesselCylindricalHeight"
                          value={data && data[3].vesselCylindricalHeight + data && data[2].vesselCylindricalHeight}
                          placeholder={data && data[3].vesselCylindricalHeight+ data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+746)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                          isFocused={isFocused === 746} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                         type="number"    
                         id={`vesselWallThickness${dataIndex}`}                  
                         name="vesselWallThickness"
                         onChange={(e) => handleChange(e, 2, dataIndex+2,true,2)}
                         onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                         value={data && data[2].vesselWallThickness}
                         isError={data&&data[2].vesselWallThickness < validations("vesselWallThickness")[0] || data&&data[2].vesselWallThickness > validations("vesselWallThickness")[1]}
                         placeholder={data && data[2].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+198)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+198} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"    
                          id={`pressureDropwithRecomQty${dataIndex}`}                  
                          name="pressureDropwithRecomQty"
                          value={data && data[2].pressureDropwithRecomQty}
                          placeholder={data && data[2].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>  
              </>
}    
        </div>):((ixStore.cationResin===6||ixStore.cationResin===7)&&(ixStore.anionResin===4 || ixStore.anionResin===1))?(<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 1 &&
              <>
              <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 1"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[0].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[0].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[0].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[0].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+121)}
                          onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}
                          isFocused={isFocused === dataIndex+121} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex}`}
                          value={data && data[0].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[0].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex}`}
                          value={data && data[0].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[0].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex}`}
                          value={data && data[0].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[0].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex}`}
                          value={data && data[0].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[0].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex}`}
                          value={data && data[0].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[0].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex}`}
                          value={data && data[0].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[0].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          value={data && data[0].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[0].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+237)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+237} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          value={data && data[0].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 1}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[1].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[1].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[1].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[1].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus( dataIndex+341)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+341} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[1].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+1}`}
                          value={data && data[1].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[1].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[1].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[1].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+1}`}
                          value={data && data[1].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[1].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight2${dataIndex+1}`}
                          value={data && data[1].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[1].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard2${dataIndex+1}`}
                          value={data && data[1].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[1].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[1].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+156)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+156} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty2${dataIndex+1}`}
                          value={data && data[1].pressureDropwithRecomQty}
                          name="inertResinVolume"
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[0].vesselDiameter) ||
                            data && data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[0].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[0].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[0].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+867)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+867} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                           type="number"
                           id={`freeBoard${dataIndex}`}
                           name="freeBoard"
                          value={data && data[0].freeBoard + data && data[1].freeBoard}
                          placeholder={data && data[0].freeBoard+ data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+678)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+678} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselWallThickness${dataIndex}`}
                          name="vesselWallThickness"
                          isError={(data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1])}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data &&data[0].vesselWallThickness}
                          placeholder={data &&data[0].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+461)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+461} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          name="pressureDropwithRecomQty"
                          value={data && data[0].pressureDropwithRecomQty}
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 2"} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[2].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[2].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[2].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[2].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[2].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[2].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+801)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"resinVolumeAsDelivered")}                        isFocused={isFocused === dataIndex+801} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[2].vesselDiameter) ||
                          data[2].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[2].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[2].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[2].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+991)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+991} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex+2}`}
                        value={data[2].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[2].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex+2}`}
                        value={data[2].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[2].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex+2}`}
                        value={data[2].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[2].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex+2}`}
                        value={data[2].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[2].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex+2}`}
                        value={data[2]&&data[2].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[2].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex+2}`}
                        value={data[2].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[2].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex+2}`}
                        value={data[2].freeBoard}
                        name="freeBoard"
                        placeholder={data[2].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[2].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[2].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+391)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+391} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[2].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[2].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[2].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[2].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+771)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+771} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex+2}`}
                        value={data[2].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[2].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
              </>
}
            
        </div>):((ixStore.cationResin===6||ixStore.cationResin===7)&&ixStore.anionResin===11)?(<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 2 &&
              <>
              <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 1"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[0].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[0].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[0].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[0].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+11)}
                          onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}                          
                          isFocused={isFocused === dataIndex+11} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex}`}
                          value={data && data[0].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[0].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex}`}
                          value={data && data[0].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[0].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex}`}
                          value={data && data[0].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[0].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex}`}
                          value={data && data[0].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[0].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex}`}
                          value={data && data[0].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[0].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex}`}
                          value={data && data[0].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[0].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          value={data && data[0].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[0].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[0].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+29)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+29} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          value={data && data[0].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 1}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[1].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[1].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 1, dataIndex+1,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[1].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[1].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+561)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                          
                          isFocused={isFocused === dataIndex+561} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[1].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+1}`}
                          value={data && data[1].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[1].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[1].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+1}`}
                          value={data && data[1].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[1].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+1}`}
                          value={data && data[1].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[1].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight2${dataIndex+1}`}
                          value={data && data[1].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[1].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard2${dataIndex+1}`}
                          value={data && data[1].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight2${dataIndex+1}`}
                          value={data && data[1].vesselCylindricalHeight}
                          onChange={(e) => handleChange(e, 1, dataIndex+1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[1].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+661)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+661} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty2${dataIndex+1}`}
                          value={data && data[1].pressureDropwithRecomQty}
                          onChange={(e) => handleChange(e, 1, dataIndex+1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex}`}
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[0].vesselDiameter) ||
                            data && data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[0].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[0].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[0].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+341)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+341} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          name="freeBoard"
                          value={data && data[0].freeBoard + data && data[1].freeBoard}
                          placeholder={data && data[0].freeBoard+ data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          name="vesselCylindricalHeight"
                          onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          placeholder={data && data[0].vesselCylindricalHeight}
                          value={data && data[0].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+910)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+910} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                           type="number"
                           id={`vesselWallThickness${dataIndex}`}
                           name="vesselWallThickness"
                           onChange={(e) => handleChange(e, 1, dataIndex,true,0)}
                           onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                           isError={(data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1])}
                          value={data &&data[0].vesselWallThickness}
                          placeholder={data &&data[0].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+471)}
                          onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+471} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="text"
                          id=""
                          value={data && data[0].pressureDropwithRecomQty}
                          placeholder={data && data[0].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 2"} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[2].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[2].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[2].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[2].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[2].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[2].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+551)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"resinVolumeAsDelivered")}                        
                        isFocused={isFocused === dataIndex+551} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[2].vesselDiameter) ||
                          data[2].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[2].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[2].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[2].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+851)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+851} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex+2}`}
                        value={data[2].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[2].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex+2}`}
                        value={data[2].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[2].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex+2}`}
                        value={data[2].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[2].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex+2}`}
                        value={data[2].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[2].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex+2}`}
                        value={data[2]&&data[2].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[2].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex+2}`}
                        value={data[2].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[2].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex+2}`}
                        value={data[2].freeBoard}
                        name="freeBoard"
                        placeholder={data[2].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[2].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[2].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+777)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+777} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex+2}`}
                        onChange={(e) => handleChange(e, dataIndex + 2, dataIndex+2)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[2].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[2].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[2].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[2].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+567)}
                        onBlur={(e) => handleBlur(e, dataIndex+2,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+567} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex+2}`}
                        value={data[2].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[2].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 3"} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[3].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[3].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex+3}`}
                        onChange={(e) => handleChange(e, dataIndex+3, dataIndex+3)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[3].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[3].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[3].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[3].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+901)}
                        onBlur={(e) => handleBlur(e, dataIndex+3,"resinVolumeAsDelivered")}                        
                        isFocused={isFocused === dataIndex+901} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex+3}`}
                        onChange={(e) => handleChange(e, dataIndex+3, dataIndex+3)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[3].vesselDiameter) ||
                          data[3].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[3].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[3].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[3].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+823)}
                        onBlur={(e) => handleBlur(e, dataIndex+3,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+823} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex+3}`}
                        value={data[3].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[3].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex+3}`}
                        value={data[3].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[3].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex+3}`}
                        value={data[3].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[3].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex+3}`}
                        value={data[3].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[3].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex+3}`}
                        value={data[3]&&data[3].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[3].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex+3}`}
                        value={data[3].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[3].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex+3}`}
                        value={data[3].freeBoard}
                        name="freeBoard"
                        placeholder={data[3].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex+3}`}
                        onChange={(e) => handleChange(e, dataIndex+3, dataIndex+3)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[3].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[3].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+721)}
                        onBlur={(e) => handleBlur(e, dataIndex+3,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+721} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex+3}`}
                        onChange={(e) => handleChange(e, dataIndex+3, dataIndex+3)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[3].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[3].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[3].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[3].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+654)}
                        onBlur={(e) => handleBlur(e, dataIndex+3,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+654} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex+3}`}
                        value={data[3].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[3].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
              </>
}          
        </div>):((ixStore.anionResin===12||ixStore.anionResin===13)&&(ixStore.cationResin===3 || ixStore.cationResin===2))?(<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 1 &&
              <>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 1"} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[0].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[0].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[0].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[0].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+101)}
                        onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}                        
                        isFocused={isFocused === dataIndex+101} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[0].vesselDiameter) ||
                          data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[0].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[0].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[0].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+201)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+201} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex}`}
                        value={data[0].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[0].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex}`}
                        value={data[0].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[0].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex}`}
                        value={data[0].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[0].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex}`}
                        value={data[0].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[0].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex}`}
                        value={data[0].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[0].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex}`}
                        value={data[0].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[0].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex}`}
                        value={data[0].freeBoard}
                        name="freeBoard"
                        placeholder={data[0].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[0].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[0].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+301)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+301} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[0].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[0].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+401)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+401} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex}`}
                        value={data[0].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[0].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        
                         />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
            <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 2"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[1].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[1].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+1,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[1].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[1].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+501)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                          
                          isFocused={isFocused === dataIndex+501} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex}`}
                          value={data && data[1].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[1].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex}`}
                          value={data && data[1].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[1].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex}`}
                          value={data && data[1].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[1].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex}`}
                          value={data && data[1].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[1].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex}`}
                          value={data && data[1].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[1].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex}`}
                          value={data && data[1].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[1].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          value={data && data[1].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[1].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+1,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[1].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[1].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+11)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+11} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex}`}
                          value={data && data[1].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 1}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[2].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[2].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[2].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[2].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[2].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[2].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(601)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"resinVolumeAsDelivered")}                          
                          isFocused={isFocused === 601} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+1}`}
                          value={data && data[2].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[2].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+1}`}
                          value={data && data[2].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[2].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+1}`}
                          value={data && data[2].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[2].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+1}`}
                          value={data && data[2].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[2].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+1}`}
                          value={data && data[2].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[2].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight2${dataIndex+1}`}
                          value={data && data[2].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[2].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex+1}`}
                          value={data && data[2].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"   
                          id={`vesselCylindricalHeight${dataIndex+1}`}                   
                          name="vesselCylindricalHeight"
                          onChange={(e) => handleChange(e, 2, dataIndex+2,true,0)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[2].vesselCylindricalHeight}
                          placeholder={data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+701)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+701} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex+1}`}                      
                          name="pressureDropwithRecomQty"
                          value={data && data[2].pressureDropwithRecomQty}
                          placeholder={data && data[2].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex}`}
                          onChange={(e) => handleChange(e, 2, dataIndex+1,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[1].vesselDiameter) ||
                            data && data[1].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[1].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[1].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[1].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(801)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselDiameter")}
                          isFocused={isFocused === 801} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          name="freeBoard"
                          value={data && data[1].freeBoard + data && data[2].freeBoard}
                          placeholder={data && data[1].freeBoard+ data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          name="vesselCylindricalHeight"
                          onChange={(e) => handleChange(e, 2, dataIndex+1,true,1)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[1].vesselCylindricalHeight + data && data[2].vesselCylindricalHeight}
                          placeholder={data && data[1].vesselCylindricalHeight+ data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(129)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                          isFocused={isFocused === 129} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                         type="number"       
                         id={`vesselWallThickness${dataIndex}`}               
                         name="vesselWallThickness"
                         isError={(data&&data[1].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[1].vesselWallThickness > validations("vesselWallThickness")[1])}
                         onChange={(e) => handleChange(e, 2, dataIndex+1,true,1)}
                         onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                         value={data && data[1].vesselWallThickness}
                         placeholder={data && data[1].vesselWallThickness}
                        defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(901)}
                          onBlur={(e) => handleBlur(e, dataIndex+1,"vesselWallThickness")}
                          isFocused={isFocused === 901} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"       
                          id={`pressureDropwithRecomQty${dataIndex}`}               
                          name="pressureDropwithRecomQty"
                          value={data && data[1].pressureDropwithRecomQty}
                          placeholder={data && data[1].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>           
              </>
        }
        </div>):((ixStore.anionResin===12||ixStore.anionResin===13)&&ixStore.cationResin===5)?(<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {data &&
            data?.length > 3 &&
              <>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 1"} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[0].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[0].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[0].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[0].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[0].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[0].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+201)}
                        onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}
                        isFocused={isFocused === dataIndex+201} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[0].vesselDiameter) ||
                          data[0].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[0].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[0].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[0].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+301)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+301} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex}`}
                        value={data[0].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[0].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex}`}
                        value={data[0].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[0].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex}`}
                        value={data[0].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[0].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex}`}
                        value={data[0].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[0].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex}`}
                        value={data[0].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[0].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex}`}
                        value={data[0].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[0].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex}`}
                        value={data[0].freeBoard}
                        name="freeBoard"
                        placeholder={data[0].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[0].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[0].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+401)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+401} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex}`}
                        onChange={(e) => handleChange(e, 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[0].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[0].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[0].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[0].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+501)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+501} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex}`}
                        value={data[0].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[0].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={"Vessel 2"} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data[1].resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data[1].resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex+1}`}
                        onChange={(e) => handleChange(e, 2, dataIndex+1)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data && data[1].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[1].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                        value={data[1].resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data[1].resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+601)}
                        onBlur={(e) => handleBlur(e, dataIndex+1,"resinVolumeAsDelivered")}                        isFocused={isFocused === dataIndex+601} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex+1}`}
                        onChange={(e) => handleChange(e, 2, dataIndex+1)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data[1].vesselDiameter) ||
                          data[1].vesselDiameter < validations("vesselDiameter")[0] ||
                          data[1].vesselDiameter > validations("vesselDiameter")[1]}
                        value={data[1].vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data[1].vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+701)}
                        onBlur={(e) => handleBlur(e, dataIndex+1,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+701} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex+1}`}
                        value={data[1].resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data[1].resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex+1}`}
                        value={data[1].resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data[1].resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex+1}`}
                        value={data[1].resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data[1].resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex+1}`}
                        value={data[1].resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data[1].resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${dataIndex+1}`}
                        value={data[1].inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data[1].inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${dataIndex+1}`}
                        value={data[1].inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data[1].inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${dataIndex+1}`}
                        value={data[1].freeBoard}
                        name="freeBoard"
                        placeholder={data[1].freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        
                        
                        />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex+1}`}
                        onChange={(e) => handleChange(e, 2, dataIndex+1)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data[1].vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data[1].vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+801)}
                        onBlur={(e) => handleBlur(e, dataIndex+1,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+801} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex+1}`}
                        onChange={(e) => handleChange(e, 2, dataIndex+1)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={(data&&data[1].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[1].vesselWallThickness > validations("vesselWallThickness")[1])}
                        value={data[1].vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data[1].vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+901)}
                        onBlur={(e) => handleBlur(e, dataIndex+1,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+901} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`pressureDropwithRecomQty${dataIndex+1}`}
                        value={data[1].pressureDropwithRecomQty}
                        name="pressureDropwithRecomQty"
                        placeholder={data[1].pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        
                        
                        />
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
            <>
                <Table className="vessel-wrapper" key={`key1${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={"Vessel 3"} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[2].resinName}
                           />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRe.gular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[2].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered${dataIndex+2}`}
                          onChange={(e) => handleChange(e, 3, dataIndex+2,true,3)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[2].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[2].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[2].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[2].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+101)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+101} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[2].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight${dataIndex+2}`}
                          value={data && data[2].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[2].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[2].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted${dataIndex+2}`}
                          value={data && data[2].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[2].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume${dataIndex+2}`}
                          value={data && data[2].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[2].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertBedHeight${dataIndex+2}`}
                          value={data && data[2].inertBedHeight}
                          name="inertBedHeight"
                          placeholder={data && data[2].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex+2}`}
                          value={data && data[2].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex+2}`}
                          onChange={(e) => handleChange(e, 3, dataIndex+2,true,3)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[2].vesselCylindricalHeight}
                          name="vesselCylindricalHeight"
                          placeholder={data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+13)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+13} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex+2}`}
                          value={data && data[2].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[2].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key2${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count">
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="NotoSansRegular"
                          color={colors.Black}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label={data[3].resinName} />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={data[3].resinType} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`resinVolumeAsDelivered2${dataIndex+3}`}
                          onChange={(e) => handleChange(e, 3, dataIndex+3,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={(data && data[3].resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0])||(data && data[3].resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1])}
                          value={data && data[3].resinVolumeAsDelivered}
                          name="resinVolumeAsDelivered"
                          placeholder={data && data[3].resinVolumeAsDelivered}
                          disabled={false}
                          inputText={unit.selectedUnits[12]}
                          onFocus={() => handleFocus(dataIndex+221)}
                          onBlur={(e) => handleBlur(e, dataIndex+3,"resinVolumeAsDelivered")}                          isFocused={isFocused === dataIndex+221} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDelivered2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsDelivered}
                          name="resinBedHeightAsDelivered"
                          placeholder={data && data[3].resinBedHeightAsDelivered}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeight2${dataIndex+3}`}
                          value={data && data[3].resinBedStandardHeight}
                          name="resinBedStandardHeight"
                          placeholder={data && data[3].resinBedStandardHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegenerated2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsRegenerated}
                          name="resinBedHeightAsRegenerated"
                          placeholder={data && data[3].resinBedHeightAsRegenerated}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhausted2${dataIndex+3}`}
                          value={data && data[3].resinBedHeightAsExhausted}
                          name="resinBedHeightAsExhausted"
                          placeholder={data && data[3].resinBedHeightAsExhausted}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`inertResinVolume2${dataIndex+3}`}
                          value={data && data[3].inertResinVolume}
                          name="inertResinVolume"
                          placeholder={data && data[3].inertResinVolume}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[12]}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                           id={`inertBedHeight${dataIndex+3}`}
                           value={data && data[3].inertBedHeight}
                           name="inertBedHeight"
                          placeholder={data && data[3].inertBedHeight}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex+3}`}
                          value={data && data[3].freeBoard}
                          name="freeBoard"
                          placeholder={data && data[3].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"  
                          id={`vesselCylindricalHeight${dataIndex+3}`}                  
                          name="vesselCylindricalHeight"
                          onChange={(e) => handleChange(e, 3, dataIndex+3,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          value={data && data[3].vesselCylindricalHeight}
                          placeholder={data && data[3].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+3)}
                          onBlur={(e) => handleBlur(e, dataIndex+3,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+3} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`pressureDropwithRecomQty${dataIndex+3}`}
                          value={data && data[3].pressureDropwithRecomQty}
                          name="pressureDropwithRecomQty"
                          placeholder={data && data[3].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                           />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table className="vessel-wrapper" key={`key3${dataIndex}`}>
                  <tbody>
                    <tr className="vessel-header" id={`borderColor${dataIndex + 2}`}>
                      <td className="vessel-count"></td>
                    </tr>
                    <tr>
                      <td>
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumSemiBold"
                          color={colors.blackTransparency085}
                          fontWeight="700"
                          label="Vessel Features" />
                        <CustomHeading
                          fontSize="14px"
                          fontFamily="DiodrumRegular"
                          color={colors.blackTransparency085}
                          fontWeight="400"
                          label={""} />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input"></td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselDiameter${dataIndex+1}`}
                          onChange={(e) => handleChange(e, 3, dataIndex+2,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          isError={!Number(data && data[2].vesselDiameter) ||
                            data && data[2].vesselDiameter < validations("vesselDiameter")[0] ||
                            data && data[2].vesselDiameter > validations("vesselDiameter")[1]}
                          value={data && data[2].vesselDiameter}
                          name="vesselDiameter"
                          placeholder={data && data[2].vesselDiameter}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+331)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselDiameter")}
                          isFocused={isFocused === dataIndex+331} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsDeliveredFeatured${dataIndex}`}
                          value={resinBedHeightAsDeliveredFeatured}
                          name={"resinBedHeightAsDeliveredFeatured"}
                          placeholder={resinBedHeightAsDeliveredFeatured}
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isAutoPopulated={false} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedStandardHeightFeatured${dataIndex}`}
                          value={resinBedStandardHeightFeatured}
                          name="resinBedStandardHeightFeatured"
                          placeholder={resinBedStandardHeightFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsRegeneratedFeatured${dataIndex}`}
                          value={resinBedHeightAsRegeneratedFeatured}
                          name="resinBedHeightAsRegeneratedFeatured"
                          placeholder={resinBedHeightAsRegeneratedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <CalcEngineInputBox
                          type="number"
                          id={`resinBedHeightAsExhaustedFeatured${dataIndex}`}
                          value={resinBedHeightAsExhaustedFeatured}
                          name="resinBedHeightAsExhaustedFeatured"
                          placeholder={resinBedHeightAsExhaustedFeatured}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`freeBoard${dataIndex}`}
                          name="freeBoard"
                          value={data && data[3].freeBoard + data && data[2].freeBoard}
                          placeholder={data && data[3].freeBoard+ data && data[2].freeBoard}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"
                          id={`vesselCylindricalHeight${dataIndex}`}
                          onChange={(e) => handleChange(e, 3, dataIndex+2,true,2)}
                          onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                          name="vesselCylindricalHeight"
                          value={data && data[3].vesselCylindricalHeight + data && data[2].vesselCylindricalHeight}
                          placeholder={data && data[3].vesselCylindricalHeight+ data && data[2].vesselCylindricalHeight}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          isError={false}
                          onFocus={() => handleFocus(dataIndex+14)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselCylindricalHeight")}
                          isFocused={isFocused === dataIndex+14} />
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                         type="number"    
                         id={`vesselWallThickness${dataIndex}`}                  
                         name="vesselWallThickness"
                         onChange={(e) => handleChange(e, 3, dataIndex+2,true,2)}
                         onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                         value={data && data[2].vesselWallThickness}
                         isError={(data&&data[2].vesselWallThickness < validations("vesselWallThickness")[0]) || (data&&data[2].vesselWallThickness > validations("vesselWallThickness")[1])}
                         placeholder={data && data[2].vesselWallThickness}
                          defaultValue=""
                          disabled={false}
                          inputText={unit.selectedUnits[8]}
                          onFocus={() => handleFocus(dataIndex+441)}
                          onBlur={(e) => handleBlur(e, dataIndex+2,"vesselWallThickness")}
                          isFocused={isFocused === dataIndex+441} />
                          <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="vessel-outer-input">
                        <InputWithText
                          type="number"    
                          id={`pressureDropwithRecomQty${dataIndex}`}                  
                          name="pressureDropwithRecomQty"
                          value={data && data[2].pressureDropwithRecomQty}
                          placeholder={data && data[2].pressureDropwithRecomQty}
                          defaultValue=""
                          disabled={true}
                          inputText={unit.selectedUnits[3]}
                          isError={false}
                          
                          
                          />
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>           
              </>
        }
        </div>): (<div className="main-div-container1">
          <Table className="new-existing-plant-design">
            <tbody>
              <tr>
                <td className="main-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="NotoSansRegular"
                    color={colors.PrimaryDarkAquaMarine}
                    fontWeight="400"
                    label="Adjustment Parameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="blank">-blank</td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin volume, as delivered"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Outer Diameter"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Resin Bed Height as delivered (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Reference Height (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as regenerated (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="as exhausted (calc.)"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Resin Volume"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Inert Bed Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Free Board"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Cylindrical Height"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Vessel Wall Thickness"
                  />
                </td>
              </tr>
              <tr>
                <td className="header-title">
                  <CustomHeading
                    fontSize="14px"
                    fontFamily="DiodrumRegular"
                    color={colors.blackTransparency085}
                    fontWeight="400"
                    label="Pressure Drop with recommended quantity"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {ixStoreObj?.listFinalParamAdj &&
            ixStoreObj?.listFinalParamAdj?.length > 0 &&
            ixStoreObj?.listFinalParamAdj.map((data, dataIndex) => (
              <Table className="vessel-wrapper" key={dataIndex}>
                <tbody>
                  <tr className="vessel-header" id={`borderColor${dataIndex}`}>
                    <td className="vessel-count">
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="NotoSansRegular"
                        color={colors.Black}
                        fontWeight="400"
                        label={`Vessel ${dataIndex + 1}`} />

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumSemiBold"
                        color={colors.blackTransparency085}
                        fontWeight="700"
                        label={data.resinName} />
                      <CustomHeading
                        fontSize="14px"
                        fontFamily="DiodrumRegular"
                        color={colors.blackTransparency085}
                        fontWeight="400"
                        label={data.resinType} />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`resinVolumeAsDelivered${dataIndex+1}`}
                        onChange={(e) => handleChange(e, dataIndex + 1, dataIndex)}
                        isError={data.resinVolumeAsDelivered < validations("resinVolumeAsDelivered")[0]||data.resinVolumeAsDelivered > validations("resinVolumeAsDelivered")[1]}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data.resinVolumeAsDelivered}
                        name="resinVolumeAsDelivered"
                        placeholder={data.resinVolumeAsDelivered}
                        disabled={false}
                        inputText={unit.selectedUnits[12]}
                        onFocus={() => handleFocus(dataIndex+401)}
                        onBlur={(e) => handleBlur(e, dataIndex,"resinVolumeAsDelivered")}
                        isFocused={isFocused === dataIndex+401} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[12]==="m³"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[12],"m³")?.toFixed(2))} - ${unit.selectedUnits[12]==="m³"?60:Number(GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[12],"m³")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselDiameter${dataIndex+1}`}
                        onChange={(e) => handleChange(e, dataIndex + 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={!Number(data.vesselDiameter) ||
                          data.vesselDiameter < validations("vesselDiameter")[0] ||
                          data.vesselDiameter > validations("vesselDiameter")[1]}
                        value={data.vesselDiameter}
                        name="vesselDiameter"
                        placeholder={data.vesselDiameter}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+435)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselDiameter")}
                        isFocused={isFocused === dataIndex+435} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?5000:Number(GlobalUnitConversion(GlobalUnitConversionStore,5000,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsDelivered${dataIndex+1}`}
                        value={data.resinBedHeightAsDelivered}
                        name="resinBedHeightAsDelivered"
                        placeholder={data.resinBedHeightAsDelivered}
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isAutoPopulated={false} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedStandardHeight${dataIndex+1}`}
                        value={data.resinBedStandardHeight}
                        name="resinBedStandardHeight"
                        placeholder={data.resinBedStandardHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                         />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsRegenerated${dataIndex+1}`}
                        value={data.resinBedHeightAsRegenerated}
                        name="resinBedHeightAsRegenerated"
                        placeholder={data.resinBedHeightAsRegenerated}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                      />                    
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <CalcEngineInputBox
                        type="number"
                        id={`resinBedHeightAsExhausted${dataIndex+1}`}
                        value={data.resinBedHeightAsExhausted}
                        name="resinBedHeightAsExhausted"
                        placeholder={data.resinBedHeightAsExhausted}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}                  
                        />   
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertResinVolume${data.dataIndex}`}
                        value={data.inertResinVolume}
                        name="inertResinVolume"
                        placeholder={data.inertResinVolume}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[12]}
                        />           
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`inertBedHeight${data.dataIndex}`}
                        value={data.inertBedHeight}
                        name="inertBedHeight"
                        placeholder={data.inertBedHeight}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`freeBoard${data.dataIndex}`}
                        value={data.freeBoard}
                        name="freeBoard"
                        placeholder={data.freeBoard}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                      />       
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselCylindricalHeight${dataIndex}`}
                        onChange={(e) => handleChange(e, dataIndex + 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        value={data.vesselCylindricalHeight}
                        name="vesselCylindricalHeight"
                        placeholder={data.vesselCylindricalHeight}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        isError={false}
                        onFocus={() => handleFocus(dataIndex+473)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselCylindricalHeight")}
                        isFocused={isFocused === dataIndex+473} />
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="number"
                        id={`vesselWallThickness${dataIndex}`}
                        onChange={(e) => handleChange(e, dataIndex + 1, dataIndex)}
                        onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                        isError={data.vesselWallThickness < validations("vesselWallThickness")[0]||data.vesselWallThickness > validations("vesselWallThickness")[1]}
                        value={data.vesselWallThickness}
                        name="vesselWallThickness"
                        placeholder={data.vesselWallThickness}
                        defaultValue=""
                        disabled={false}
                        inputText={unit.selectedUnits[8]}
                        onFocus={() => handleFocus(dataIndex+424)}
                        onBlur={(e) => handleBlur(e, dataIndex,"vesselWallThickness")}
                        isFocused={isFocused === dataIndex+424} />
                        <InputReferenceText
                          className="error"
                          refText={`Ranges ${unit.selectedUnits[8]==="mm"?0:Number(GlobalUnitConversion(GlobalUnitConversionStore,0,unit.selectedUnits[8],"mm")?.toFixed(2))} - ${unit.selectedUnits[8]==="mm"?100:Number(GlobalUnitConversion(GlobalUnitConversionStore,100,unit.selectedUnits[8],"mm")?.toFixed(2))}`}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className="vessel-outer-input">
                      <InputWithText
                        type="text"
                        id=""
                        placeholder={data.pressureDropwithRecomQty}
                        defaultValue=""
                        disabled={true}
                        inputText={unit.selectedUnits[3]}
                        isError={false}
                        />                     
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))}
        </div>)}

        <div className="radio-wrapper">
          <div className="vessel-resin">
            <CustomRadio
              type="radio"
              label="Use Vessel Geometry and Resin Volume values"
              isError={false}
              name="vesselGeometry"
              id="useVesselGeometry"
              disabled={false}
              onClick={finalParameterRadio}
              value="vesselGeometry"
            />
          </div>
          <div className="ignore-resin">
            <CustomRadio
              type="radio"
              label="Use Vessel Geometry values, Ignore Resin Volume values"
              isError={false}
              name="vesselGeometry"
              id="ignoreResin"
              disabled={true}
              onClick={finalParameterRadio}
              value="ignoreResin"
            />
          </div>
          <div className="ignore-vessel">
            <CustomRadio
              type="radio"
              label="Ignore Vessel Geometry and Resin Volume values"
              isError={false}
              name="vesselGeometry"
              id="ignoreVessel"
              disabled={false}
              onClick={finalParameterRadio}
              value="ignoreVessel"
            />
          </div>
        </div>
        {errorOperator.show && (
          <ProjectErrorPopup
            show={errorOperator.show}
            close={closeErrorMessag}
            message={errorOperator.message}
          />
        )}
      </FinalParameterAdjustmentStyled>
    </>
  );
};

export default FinalParameterAdjustment;
