import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";

const GlobalUnitConversion = (GlobalUnitConversionStore,eValue,eToUnit,eFromUnit) => {
  console.log("GlobalUnitConversionStore",GlobalUnitConversionStore);
  console.log("GlobalUnitConversionStore",eValue);
  console.log("GlobalUnitConversionStore",eToUnit);
  console.log("GlobalUnitConversionStore",eFromUnit);
  //UomTypeID
  const conversionFactor = 1.0;
  const ToUnit = eToUnit;
  const FromUnit = eFromUnit;
  // const ToUnit = parseInt(eToUnit);
  // const FromUnit =parseInt(eFromUnit);
  const Inputvalue = parseFloat(eValue);
  let finalUnitValue=0;
  // const convFactor=0;

  // console.log("PK GlobalUnitConversionStore",GlobalUnitConversionStore);
  const findFactor=(ToUnit, FromUnit)=> {
    for (let i = 0; i < GlobalUnitConversionStore.length; i++) {
      if (GlobalUnitConversionStore[i].toUomName === ToUnit && GlobalUnitConversionStore[i].fromUomName === FromUnit) {
        return GlobalUnitConversionStore[i].convfactor;
      }
    }
    return null;
  };

  // console.log("PK in useEffect GlobalUnitConversionStore",eToUnit,ToUnit,eFromUnit,FromUnit,eValue,Inputvalue,finalUnitValue);
  if (ToUnit == FromUnit) {
    finalUnitValue = Inputvalue;
  } else {
    if (ToUnit === "°C") {
      finalUnitValue = ((Inputvalue - 32) * 5) / 9;
      // console.log("PK finalUnitValue c",ToUnit,FromUnit, finalUnitValue);
    } else if (ToUnit === "°F") {
      finalUnitValue = (Inputvalue * 9) / 5 + 32;
      // console.log("PK finalUnitValue f", ToUnit,FromUnit,finalUnitValue);
    } else {
      let convfactor = 0;
      if (ToUnit === "mm" && FromUnit==="m") {
        convfactor = 1000;
      } else if (ToUnit === "cm" && FromUnit==="m") {
        convfactor = 100;
      } else if (ToUnit === "in" && FromUnit==="m") {
        convfactor = 39.37;
      } else if (ToUnit === "kW") {
        convfactor = 0.7457;
      } else if (FromUnit === "kW") {
        convfactor = 1.341;
      } else if (ToUnit === "ppmv") {
        convfactor = 1.257;
      } else if (FromUnit === "ppmv") {
        convfactor = 0.7967;
      } else if (ToUnit === "g/cm³") {
        convfactor = 0.1198;
      } else if (FromUnit === "g/cm³") {
        convfactor = 18428.53;
      } else {
        convfactor = findFactor(ToUnit, FromUnit);
        // console.log("PK in last else",ToUnit,FromUnit, convfactor);

        // console.log("Gopallllllllll",ToUnit,FromUnit, convfactor);
      }
      finalUnitValue = Inputvalue * convfactor;
    }
  }

  // useEffect(()=>{

  // },[]);

  // const userId = UserInfoStore ? UserInfoStore.UserId : 1;
  // switch (UomTypeID)
  // {
  //     case 1: //flow
  //         {
  //             switch (FromUnit)
  //             {
  //                 case UOMTypeEnum.FlowUS:
  //                     fromCnvType = 1;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric:
  //                     fromCnvType = 2;
  //                     break;
  //                 case UOMTypeEnum.FlowUS1:
  //                     fromCnvType = 41;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric1:
  //                     fromCnvType = 42;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric2://MGPP Item #1396
  //                     fromCnvType = 43;
  //                     break;
  //             }

  //             switch (ToUnit)
  //             {
  //                 case UOMTypeEnum.FlowUS:
  //                     toCnvType = 1;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric:
  //                     toCnvType = 2;
  //                     break;
  //                 case UOMTypeEnum.FlowUS1:
  //                     toCnvType = 41;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric1:
  //                     toCnvType = 42;
  //                     break;
  //                 case UOMTypeEnum.FlowMetric2://MGPP Item #1396
  //                     fromCnvType = 43;
  //                     break;
  //             }
  //             break;
  //         }
  //     case 2: //Temperature
  //         {

  //             let  speciesValue=0;

  //             if(FromUnit==4){
  //                 speciesValue = Inputvalue*1;
  //             }
  //             else if(FromUnit==3){
  //                 speciesValue = ((Inputvalue - 32) * 5 / 9); //F to C
  //              }

  //             if(ToUnit==3){
  //                     speciesValue = ((speciesValue * 9) / 5) + 32;// C to F
  //                 }
  //             else if (ToUnit==4){
  //                     speciesValue = Inputvalue*1;
  //                 }

  //         return speciesValue;

  //         }
  //     // case 2: //Temperature
  //     //     {

  //     //         switch (FromUnit){
  //     //         case 1:
  //     //         {
  //     //             let  speciesValue=0;
  //     //             if(FromUnit==1){
  //     //                 speciesValue = Inputvalue*1;
  //     //             }
  //     //             else{
  //     //                 speciesValue = Inputvalue*1;
  //     //             }
  //     //             console.log("function Temperature",Inputvalue);
  //     //             break;
  //     //         }
  //     //     }

  //     //     switch (ToUnit){
  //     //         case 1:
  //     //         {
  //     //             if(FromUnit==1){

  //     //                 speciesValue = ((Inputvalue - 32) * 5 / 9);
  //     //             }
  //     //             else{
  //     //                 speciesValue = ((Inputvalue * 9) / 5) + 32;
  //     //             }
  //     //             console.log("function Temperature",Inputvalue);
  //     //             break;
  //     //         }
  //     //     }

  //     //     break;

  //     //     }
  //     case 3: //Pressure
  //         {

  //             switch (FromUnit)
  //             {
  //                 case UOMTypeEnum.PressureUS:
  //                     fromCnvType = 5;
  //                     break;
  //                 case UOMTypeEnum.PressureMetric:
  //                     fromCnvType = 6;
  //                     break;
  //                 case UOMTypeEnum.PressureMetric1://MGPP Item #1396
  //                     fromCnvType = 44;
  //                     break;
  //             }

  //             switch (ToUnit)
  //             {
  //                 case UOMTypeEnum.PressureUS:
  //                     toCnvType = 5;
  //                     break;
  //                 case UOMTypeEnum.PressureMetric:
  //                     toCnvType = 6;
  //                     break;
  //                 case UOMTypeEnum.PressureMetric1://MGPP Item #1396
  //                     toCnvType = 44;
  //                     break;
  //             }
  //             // Get the conversion multiple

  //             // convFactor = ProjectData.Instance.GetConversionFactor(FromUnit, ToUnit);
  //             console.log("function Pressure",);
  //             break;
  //         }
  //     case 4: //Flux
  //         {
  //             console.log("function Flux",);
  //             break;
  //         }
  //     case 5: //Area
  //         {
  //             console.log("function Area",);
  //             break;
  //         }
  //     case 6: //Concentration (gases)
  //         {
  //             console.log("function Concentration (gases)",);
  //             break;
  //         }
  //     case 7: //Density
  //         {
  //             console.log("function Density",);
  //             break;
  //         }
  //     case 8: //Length
  //         {
  //             console.log("function input to Length",);
  //             break;
  //         }
  //     case 9: //Specific Velocity
  //         {
  //             console.log("function Specific Velocity",);
  //             break;
  //         }
  //     case 10: //Volume (Solution)
  //         {
  //             console.log("function Volume (Solution)",);
  //             break;
  //         }
  //     case 11: //Volume (Resin)
  //         {
  //             console.log("function Volume (Resin)",);
  //             break;
  //         }
  //     case 12: //Volume (Common)
  //         {
  //             console.log("function Volume (Common)",);
  //             break;
  //         }
  //     case 13: //Regeneration Dose
  //         {
  //             console.log("function Regeneration Dose",);
  //             break;
  //         }
  //     case 14: //Linear Velocity
  //         {
  //             console.log("function Linear Velocity",);
  //             break;
  //         }
  //     case 15: //Weight
  //         {
  //             console.log("function Weight",);
  //             break;
  //         }
  //     case 16: //Conductivity
  //         {
  //             console.log("function Conductivity",);
  //             break;
  //         }
  //     case 17: //Power
  //         {
  //             console.log("function Power",);
  //             break;
  //         }
  //     case 18: //Gas Flow
  //         {
  //             console.log("function Gas Flow",);
  //             break;
  //         }
  //     case 19: //Organics
  //         {
  //             console.log("function Organics",);
  //             break;
  //         }
  // }
  // return convFactor;
  return finalUnitValue;
  // return(<></>);
};

export default GlobalUnitConversion;
