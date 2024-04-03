import React from "react";
import GetDecimalValueByUOM from "./GetDecimalValueByUOM";

const CalculateNACondValue = (key, number, Grp1SelectedUnitID, condUnit) => {
  var speciesValue;
  var convFact = 1;
  // if (ProjectData.UOMCurrentStatusObj[(int)UOMTypeEnum.Conductivity2Metric].isChecked)// If conductivity in S/cm
  // {
  //     convFact = ProjectData.Instance.UOMConversion(convFact, 35, 34);
  // }

  if (key.slice(0, 2) == "Na") {
    if (Grp1SelectedUnitID == 2) {
      //the value is inn meq/L
      // MGPP v1.59 1882 new conductivity curve added -no old exists
      number = number * 22.989769;
    } else if (Grp1SelectedUnitID == 1) {
      //value is in Ug/L
      // MGPP v1.59 1882 new conductivity curve added old commeneted
      //number = number / 22989.769;
      number = (number / 22989.769) * 22.989769;
    } else if (Grp1SelectedUnitID == 3) {
      // value is in mg/L
      // MGPP v1.59 1882 new conductivity curve added old commeneted
      // number = number / 22.989769;
    } else if (Grp1SelectedUnitID == 4) {
      // value is in ppm/CaCo3
      // MGPP v1.59 1882 new conductivity curve added old commeneted
      //number = number / 50.0436;
      number = (number / 50.0436) * 22.989769;
    }

    if (key == "Na-Avg") {
      //MGPP Item #1055 - Set Minimum Conductivity to 0.054 µS/cm - START

      // MGPP v1.59 1882 new conductivity curve added old commeneted -start

      //double prodAvgConductivity1 = ((Math.sqrt(Math.pow(number, 2) * 61061.09171 + 0.002860166) / convFact).GetCorrectDecimalValue());

      let prodAvgConductivity1 =
        (0.054787566 +
          -0.44971008 * Math.sqrt(number) +
          13.240584 * number +
          -94.397836 * number * Math.sqrt(number) +
          2488.8242 * Math.pow(number, 2)) /
        (1 +
          -8.2832027 * Math.sqrt(number) +
          230.4558 * number +
          0.79029024 * number * Math.sqrt(number) +
          -0.0078615247 * Math.pow(number, 2));

      //             if (ProductQualitySecies1 == "NH4+/NH3") ///commnet by pawan
      //             {
      //                 prodAvgConductivity1 = ((0.0500886 + (2.3027623 * Math.sqrt(number)) + ((-38.382642) * number) + (828.86451 * number * Math.sqrt(number)))
      //   / (1 + (27.370092 * Math.sqrt(number)) + (95.144016 * number) + (0.13559505 * number * Math.sqrt(number))));

      //             }

      // MGPP v1.59 1882 new conductivity curve added old commeneted -end

      //if (ProjectData.UOMCurrentStatusObj[(int)UOMTypeEnum.Conductivity2Metric].isChecked)
      if (condUnit === 35) {
        if (prodAvgConductivity1 < 0.000054 || prodAvgConductivity1 > 10749) {
          // if (avgConductivityMsgCounter % 2 == 0)
          // {
          //     if (ProjectData.Instance.IsPageDirty && ProductQualityEnable)
          //     {
          //         //MGPP Item #1230
          //         //CommonErrorMessages.ShowValidationErrorMessage(WAVE.Properties.Resources._Resource292, "0.000054", "10749", "mS/cm");
          //     }
          // }
          prodAvgConductivity1 = 0.000055;
        }
      } else {
        if (prodAvgConductivity1 < 0.054 || prodAvgConductivity1 > 10749000) {
          // if (avgConductivityMsgCounter % 2 == 0)
          // {
          //     // if (ProjectData.Instance.IsPageDirty && ProductQualityEnable)
          //     // {
          //     //     //MGPP Item #1230
          //     //     //CommonErrorMessages.ShowValidationErrorMessage(WAVE.Properties.Resources._Resource292, "0.054", "10749000", "µS/cm");
          //     // }
          // }
          prodAvgConductivity1 = 0.055;
        }
      }
      //  avgConductivityMsgCounter++;
      //ProductAverageConductivity1 = prodAvgConductivity1;
      speciesValue = prodAvgConductivity1;
      //MGPP Item #1055 - Set Minimum Conductivity to 0.054 µS/cm - END
      //ProductAverageConductivity1 = ((Math.sqrt(Math.pow(number, 2) * 61061.09171 + 0.002860166) / convFact).GetCorrectDecimalValue());
    }
    if (key == "Na-End") {
      //MGPP Item #1055 - Set Minimum Conductivity to 0.054 µS/cm - START

      // MGPP v1.59 1882-- new conductivity curve added old commeneted -start

      //double prodEndConductivity1 = ((Math.sqrt(Math.pow(number, 2) * 61061.09171 + 0.002860166) / convFact).GetCorrectDecimalValue());

      let prodEndConductivity1 =
        (0.054787566 +
          -0.44971008 * Math.sqrt(number) +
          13.240584 * number +
          -94.397836 * number * Math.sqrt(number) +
          2488.8242 * Math.pow(number, 2)) /
        (1 +
          -8.2832027 * Math.sqrt(number) +
          230.4558 * number +
          0.79029024 * number * Math.sqrt(number) +
          -0.0078615247 * Math.pow(number, 2));

      //             if (ProductQualitySecies1 == "NH4+/NH3")
      //             {
      //                 prodEndConductivity1 = ((0.0500886 + (2.3027623 * Math.sqrt(number)) + ((-38.382642) * number) + (828.86451 * number * Math.sqrt(number)))
      //   / (1 + (27.370092 * Math.sqrt(number)) + (95.144016 * number) + (0.13559505 * number * Math.sqrt(number))));

      //             }

      // MGPP v1.59 1882 --new conductivity curve added old commeneted -end

      if (condUnit === 35) {
        if (prodEndConductivity1 < 0.000054 || prodEndConductivity1 > 10749) {
          // if (EndConductivityMsgCounter % 2 == 0)
          // {
          //     if (ProjectData.Instance.IsPageDirty && ProductQualityEnable)
          //     {
          //         //MGPP Item #1230
          //         //CommonErrorMessages.ShowValidationErrorMessage(WAVE.Properties.Resources._Resource292, "0.000054", "10749", "mS/cm");
          //     }
          // }
          prodEndConductivity1 = 0.000055;
        }
      } else {
        if (prodEndConductivity1 < 0.054 || prodEndConductivity1 > 10749000) {
          // if (EndConductivityMsgCounter % 2 == 0)
          // {
          //     // if (ProjectData.Instance.IsPageDirty && ProductQualityEnable)
          //     // {
          //     //     //MGPP Item #1230
          //     //     //CommonErrorMessages.ShowValidationErrorMessage(WAVE.Properties.Resources._Resource292, "0.054", "10749000", "µS/cm");
          //     // }
          // }
          prodEndConductivity1 = 0.055;
        }
      }
      //EndConductivityMsgCounter++;
      //ProductEndpointConductivity1 = prodEndConductivity1;
      speciesValue = prodEndConductivity1;
      //MGPP Item #1055 - Set Minimum Conductivity to 0.054 µS/cm - END
      //ProductEndpointConductivity1 = ((Math.sqrt(Math.pow(number, 2) * 61061.09171 + 0.002860166) / convFact).GetCorrectDecimalValue());
    }
  } else {
    ///pawan chohan
    //number = number * convFact; //to convert the conductivity in µS/cm//MGPP Item #1981 (v1.65)-commented

    number = (number - 0.0548) * convFact; //to convert the conductivity in µS/cm //MGPP Item #1981 (v1.65) -added
    console.log(number);
    let NaValue = 1;
    if (Grp1SelectedUnitID == 2) {
      //factor to convert to meq/L
      console.log("test");
    } else if (Grp1SelectedUnitID == 1) {
      //factor to convert to Ug/L
      NaValue = NaValue * 22989.769;
    } else if (Grp1SelectedUnitID == 3) {
      // factor to convert to mg/L
      NaValue = NaValue * 22.989769;
    } else if (Grp1SelectedUnitID == 4) {
      // factor to convert to ppm/CaCo3
      NaValue = NaValue * 50.0436;
    }

    if (key == "Cond-Avg") {
      //MGPP Item #1055 - Avg. Conductivity Value > 0.054 µS/cm - START
      if (condUnit == 35) {
        if (number < 0.000054) {
          //if (avgSpeciesMsgCounter % 2 == 0)
          //{
          //    MessageBox.Show("Conductivity value should be greater than  0.000054 mS/cm");
          //}
          number = 0.000055;
        }
      } else {
        if (number < 0.054) {
          //if (avgSpeciesMsgCounter % 2 == 0)
          //{
          //    MessageBox.Show("Conductivity value should be greater than 0.054 µS/cm");
          //}
          number = 0.055;
        }
      }

      //MGPP Item #1055 - Avg. Conductivity Value > 0.054 µS/cm - END

      //MGPP Item #1057 & #1230 - Updated Hard/ Soft Limits - START

      // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted

      // double avgspeciesValue = (Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) * NaValue);

      let speciesValue1 =
        ((0.00063018407 +
          0.027671733 * Math.sqrt(number) +
          0.076775288 * number +
          0.26150246 * number * Math.sqrt(number)) /
          (1 +
            2.7485018 * Math.sqrt(number) +
            0.0070708968 * number +
            -0.00048236804 * number * Math.sqrt(number) +
            0.000007780025 * Math.pow(number, 2)) /
          22.989769) *
        NaValue;
      

      // if (ProductQualitySecies1 == "NH4+/NH3")
      // {

      //     avgspeciesValue = (((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
      //   + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
      //   / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
      //    + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2))))) / 22.989769) * NaValue;

      // }

      // end ---- MGPP v1.59 1882-- new conductivity curve added old commeneted

      // IXSpeciesLimits stSpeciesLimits = GetSpeciesLimits(Grp1SelectedUnitID, 0, RegenerationDoseUnits1);
      // if (avgspeciesValue < stSpeciesLimits.lowerLimit || avgspeciesValue > stSpeciesLimits.upperLimit)
      // {
      //     if (avgSpeciesMsgCounter % 2 == 0)
      //     {
      //         MessageBox.Show(WAVE.Properties.Resources.IXConductivityNaErrorMsgPart1
      //             + stSpeciesLimits.lowerLimit + " " + WAVE.Properties.Resources.Manual_83 + " "
      //             + stSpeciesLimits.upperLimit
      //             + " " + stSpeciesLimits.speciesUnit + WAVE.Properties.Resources.IXConductivityNaErrorMsgPart2, Commands.CommonConstant.Instance.ResourcePending291, MessageBoxButton.OK, MessageBoxImage.Error);

      //     }
      //     avgSpeciesMsgCounter++;
      // }
      // else
      // {
      //MGPP Item #1057 & #1230 - Updated Hard/ Soft Limits - END

      if (Grp1SelectedUnitID == 2) {
        // For Defect 1056
        // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted
        //ProductAverageSpecies1 = (Math.round((Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) * NaValue), 3).ToString("#,##0.000"));

        speciesValue =
          parseFloat(((0.00063018407 +
            0.027671733 * Math.sqrt(number) +
            0.076775288 * number +
            0.26150246 * number * Math.sqrt(number)) /
            (1 +
              2.7485018 * Math.sqrt(number) +
              0.0070708968 * number +
              -0.00048236804 * number * Math.sqrt(number) +
              0.000007780025 * Math.pow(number, 2)) /
            22.989769) *
          NaValue).toFixed(3);
       

        // if (ProductQualitySecies1 == "NH4+/NH3")
        // {
        //     ProductAverageSpecies1 = (Math.round(((((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
        //                + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
        //                  / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
        //                  + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2)))))
        //                   / 22.989769) * NaValue), 3).ToString("#,##0.000"));
        // }

        // end ---- MGPP v1.59 1882-- new conductivity curve added old commeneted
      } else {
        // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted
        // ProductAverageSpecies1 = GetDecimalValueByUOM(
        //   Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) *
        //     NaValue,
        //   Grp1SelectedUnitID
        // ); //MGPP Item #1127

        speciesValue = parseFloat(GetDecimalValueByUOM(
          ((0.00063018407 +
            0.027671733 * Math.sqrt(number) +
            0.076775288 * number +
            0.26150246 * number * Math.sqrt(number)) /
            (1 +
              2.7485018 * Math.sqrt(number) +
              0.0070708968 * number +
              -0.00048236804 * number * Math.sqrt(number) +
              0.000007780025 * Math.pow(number, 2)) /
            22.989769) *
            NaValue,
          Grp1SelectedUnitID
        ));
        

        // if (ProductQualitySecies1 == "NH4+/NH3")
        // {
        //     ProductAverageSpecies1 = (GetDecimalValueByUOM(((((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
        //                                 + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
        //                                    / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
        //                                    + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2))))) / 22.989769) * NaValue), Grp1SelectedUnitID));

        // }

        // end ---- MGPP v1.59 1882-- new conductivity curve added old commeneted
      }
      //}
    }
    if (key == "Cond-End") {
      //MGPP Item #278 - START
      //if (ProductAverageConductivity1ValueChanged)
      // if (EndConductivityLostFocusStatus) //MGPP Item #1127
      // {
      //MGPP Item #1055 - Avg. Conductivity Value > 0.054 µS/cm - START
      //if (ProjectData.UOMCurrentStatusObj[(int)UOMTypeEnum.Conductivity2Metric].isChecked)
      if (condUnit === 35) {
        if (number < 0.000054) {
          //if (EndSpeciesMsgCounter % 2 == 0)
          //{
          //    MessageBox.Show("Conductivity value should be greater than  0.000054 mS/cm");
          //}
          number = 0.000055;
        }
      } else {
        if (number < 0.054) {
          //if (EndSpeciesMsgCounter % 2 == 0)
          //{
          //    MessageBox.Show("Conductivity value should be greater than 0.054 µS/cm");
          //}
          number = 0.055;
        }
      }
      //  EndSpeciesMsgCounter++;
      //MGPP Item #1055 - Avg. Conductivity Value > 0.054 µS/cm - END
      //MGPP Item #1057 & #1230 - Updated Hard/ Soft Limits - START

      // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted

      //double endspeciesValue = (Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) * NaValue);

      speciesValue =
        ((0.00063018407 +
          0.027671733 * Math.sqrt(number) +
          0.076775288 * number +
          0.26150246 * number * Math.sqrt(number)) /
          (1 +
            2.7485018 * Math.sqrt(number) +
            0.0070708968 * number +
            -0.00048236804 * number * Math.sqrt(number) +
            0.000007780025 * Math.pow(number, 2)) /
          22.989769) *
        NaValue;

      // if (ProductQualitySecies1 == "NH4+/NH3")
      // {

      //     endspeciesValue = (((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
      //   + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
      //   / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
      //    + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2))))) / 22.989769) * NaValue;

      // }

      // end--- MGPP v1.59 1882-- new conductivity curve added old commeneted

      //IXSpeciesLimits stSpeciesLimits = GetSpeciesLimits(Grp1SelectedUnitID, 0, RegenerationDoseUnits1);
      // if (endspeciesValue < stSpeciesLimits.lowerLimit || endspeciesValue > stSpeciesLimits.upperLimit)
      // {
      //     // MessageBox.Show(WAVE.Properties.Resources.IXConductivityNaErrorMsgPart1
      //     //     + stSpeciesLimits.lowerLimit + " " + WAVE.Properties.Resources.Manual_83 + " "
      //     //     + stSpeciesLimits.upperLimit
      //     //     + " " + stSpeciesLimits.speciesUnit + WAVE.Properties.Resources.IXConductivityNaErrorMsgPart2, Commands.CommonConstant.Instance.ResourcePending291, MessageBoxButton.OK, MessageBoxImage.Error);

      // }
      // else
      // {
      //MGPP Item #1057 & #1230 - Updated Hard/ Soft Limits - END
      if (Grp1SelectedUnitID == 2) {
        // For Defect 1056
        // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted

        //ProductEndpointSpecies1 = (Math.round((Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) * NaValue), 3).ToString("#,##0.000"));

        speciesValue =
          ((0.00063018407 +
            0.027671733 * Math.sqrt(number) +
            0.076775288 * number +
            0.26150246 * number * Math.sqrt(number)) /
            (1 +
              2.7485018 * Math.sqrt(number) +
              0.0070708968 * number +
              -0.00048236804 * number * Math.sqrt(number) +
              0.000007780025 * Math.pow(number, 2)) /
            22.989769) *
          NaValue;

        // if (ProductQualitySecies1 == "NH4+/NH3")
        // {
        //     ProductEndpointSpecies1 = (Math.round(((((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
        //                + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
        //                  / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
        //                  + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2)))))
        //                   / 22.989769) * NaValue), 3).ToString("#,##0.000"));
        // }

        // end--- MGPP v1.59 1882-- new conductivity curve added old commeneted
      } else {
        // start--- MGPP v1.59 1882-- new conductivity curve added old commeneted

        // ProductEndpointSpecies1 = (GetDecimalValueByUOM((Math.sqrt((Math.pow(number, 2) - 0.0028601661) / 61061.09171) * NaValue), Grp1SelectedUnitID));

        speciesValue = GetDecimalValueByUOM(
          ((0.00063018407 +
            0.027671733 * Math.sqrt(number) +
            0.076775288 * number +
            0.26150246 * number * Math.sqrt(number)) /
            (1 +
              2.7485018 * Math.sqrt(number) +
              0.0070708968 * number +
              -0.00048236804 * number * Math.sqrt(number) +
              0.000007780025 * Math.pow(number, 2)) /
            22.989769) *
            NaValue,
          Grp1SelectedUnitID
        );

        // if (ProductQualitySecies1 == "NH4+/NH3")
        // {
        //     ProductEndpointSpecies1 = (GetDecimalValueByUOM(((((0.000049380586 + (0.021910531 * Math.sqrt(number)) + (0.037883679 * number) + (0.16110913 * number * Math.sqrt(number))
        //                                 + ((0.0011596962) * (Math.pow(number, 2))) + ((0.032190339) * (Math.sqrt(number)) * (Math.pow(number, 2))))
        //                                    / (1 + (1.8828182 * Math.sqrt(number)) + (0.10294462 * number) + ((-0.011695792) * number * Math.sqrt(number))
        //                                    + ((0.00074006611) * (Math.pow(number, 2))) + ((-0.000019186445) * (Math.sqrt(number)) * (Math.pow(number, 2))))) / 22.989769) * NaValue), Grp1SelectedUnitID));

        // }

        // end--- MGPP v1.59 1882-- new conductivity curve added old commeneted
      }

      // }
      //MGPP Item #278 - END
    }
  }
  return speciesValue;
};

export default CalculateNACondValue;
