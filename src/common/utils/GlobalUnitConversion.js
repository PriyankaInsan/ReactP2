import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";

const GlobalUnitConversion = (GlobalUnitConversionStore,eValue,eToUnit,eFromUnit) => {
  // console.log("GlobalUnitConversionStore",GlobalUnitConversionStore);
  // console.log("GlobalUnitConversionStore",eValue);
  // console.log("GlobalUnitConversionStore",eToUnit);
  // console.log("GlobalUnitConversionStore",eFromUnit);
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

  return finalUnitValue;
};

export default GlobalUnitConversion;
