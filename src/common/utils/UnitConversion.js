import React from "react";
import GetDecimalValueByUOM from "./GetDecimalValueByUOM";


const UnitConversion = (eCurrentObjectName,eSpeciesValue,eToUnit,eFromUnit) => {

    console.log("function input value",eSpeciesValue);
    console.log("function input from unit",eFromUnit);
    console.log("function input to unit",eToUnit);
    // console.log(e,"eeeee");
    const CurrentObjectName = eCurrentObjectName;
    var speciesValue = parseFloat(eSpeciesValue);
    //let conversionFactor = 1.0;
    const toUnit = parseInt(eToUnit);
    const fromUnit =parseInt(eFromUnit);
var conversionFactor = 1.0;
switch (fromUnit)
{
    case 1:
        {
            //conversionFactor = 22989.8d;
            if (CurrentObjectName == "IXN")
            {
                conversionFactor = 62004.9;
            }
            else if (CurrentObjectName == "IXB")
            {
                conversionFactor = 10811.0;
            }
            else
            {
                conversionFactor = 22989.8;
            }
            //"µg/L";
            break;
        }
    case 2:
        {
            conversionFactor = 1.0;
            // "meq/L";
            break;
        }
    case 3:
        {
            //MGPP Item #1142 - different conversion factors for B and N
            if (CurrentObjectName == "IXN")
            {
                conversionFactor = 62.0049;
            }
            else if (CurrentObjectName == "IXB")
            {
                conversionFactor = 10.8110;
            }
            else
            {
                conversionFactor = 22.9898;
            }
            //"mg/L";
            break;
        }
    case 4:
        {
            conversionFactor = 50.0;
            //"ppm CaCO₃";
            break;
        }
    default:
        {
            conversionFactor = 1.0;
            // "meq/L";
            break;
        }
}
//Convert to meq/L
speciesValue = speciesValue / conversionFactor;

//Convert from meq/L to selected units
switch (toUnit)
{
    case 1:
        {
            if (CurrentObjectName == "IXN")
            {
                conversionFactor = 62004.9;
            }
            else if (CurrentObjectName == "IXB")
            {
                conversionFactor = 10811.0;
            }
            else
            {
                conversionFactor = 22989.8;
            }
            //"µg/L";
            break;
        }
    case 2:
        {
            conversionFactor = 1.0;
            // "meq/L";
            break;
        }
    case 3:
        {
            //MGPP Item #1142 - different conversion factors for B and N
            if (CurrentObjectName == "IXN")
            {
                conversionFactor = 62.0049;
            }
            else if (CurrentObjectName == "IXB")
            {
                conversionFactor = 10.8110;
            }
            else
            {
                conversionFactor = 22.9898;
            }
            //"mg/L";
            break;
        }
    case 4:
        {
            conversionFactor = 50.0;
            //"ppm CaCO₃";
            break;
        }
    default:
        {
            conversionFactor = 1.0;
            // "meq/L";
            break;
        }
}
speciesValue = speciesValue * conversionFactor;

//Adjust Decimal places according to UOM
//speciesValue = Convert.ToDouble(GetDecimalValueByUOM(speciesValue, toUnit));
return speciesValue;
};




export default UnitConversion;


