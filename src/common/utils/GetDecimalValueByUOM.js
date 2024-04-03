import React from "react";


const GetDecimalValueByUOM = (speciesValue,GrpSelectedUnitID) => {

    console.log("function input value",speciesValue);
    console.log("function input from unit",GrpSelectedUnitID);

    var formatedSpeciesValue;
 
    if (isNaN(speciesValue))
    {
        formatedSpeciesValue = "";
    }
    else
    {
        switch (GrpSelectedUnitID)
        {
            case 1:
                {
                    //µg/L
                    formatedSpeciesValue = Math.round(speciesValue);
                    break;
                }
            case 2:
                {
                    //meq/L
                    formatedSpeciesValue =parseFloat(speciesValue).toFixed(3);
                    break;
                }
            case 3:
                {
                    //mg/L
                    formatedSpeciesValue = parseFloat(speciesValue).toFixed(3);
                    break;
                }
            case 4:
                {
                    //ppm CaCO₃
                    formatedSpeciesValue = parseFloat(speciesValue).toFixed(3);
                    break;
                }
            default:
                {
                    //mg/L
                    formatedSpeciesValue = parseFloat(speciesValue).toFixed(3);
                    break;
                }
        }
    }
    return formatedSpeciesValue;

};




export default GetDecimalValueByUOM;


