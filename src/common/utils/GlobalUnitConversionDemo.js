import React from "react";

const GlobalUnitConversionDemo=(value,uomTypeName,UomTypeID,unitName)=> {
        let outputValue;
        let conversionFactor;
        switch(UomTypeID)
        {
            case 1:{
                if (unitName === "ft³") {
                    conversionFactor=0.0283168466;
                } else if (unitName === "L") {
                    conversionFactor=0.001;
                } else {
                    conversionFactor=1;
                }
                outputValue=value*conversionFactor;
                break;
            }
            case 8:{
                if (unitName === "mm") {
                    conversionFactor= 0.001;
                  }else if (unitName === "in") {
                    conversionFactor= 0.0254;
                  }else{
                    conversionFactor=1;
                  }
                  outputValue=value*conversionFactor;
                  break;
            }
            case 7:{
                if (unitName === "ft³") {
                     conversionFactor= 0.0283168;
                  } else if (unitName === "L") {
                     conversionFactor= 0.001;
                  } else {
                     value;
                  }
                  outputValue=value*conversionFactor;
                  break;
            }
            case 4:{
                if (unitName === "ft³") {
                     conversionFactor= 0.0283168;
                  } else if (unitName === "L") {
                     conversionFactor= 0.001;
                  } else {
                     value;
                  }
                  outputValue=value*conversionFactor;
                  break;
            } 
        }
    return (
        <div>
            
        </div>
    );
};

export default GlobalUnitConversionDemo;