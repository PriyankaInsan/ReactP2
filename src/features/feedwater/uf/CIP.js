import React, { useState, useEffect } from "react";
import CIPStyled from "./CIPStyled";
import UFSystemDesignDiagram from "./UFSystemDesignDiagram";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import { Card, Form } from "react-bootstrap";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InfoIcon from "../../../common/icons/InfoIcon";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import ToggleSwitch from "../../../common/styles/components/switches/CustomSwitch";
import { setUfDataUpdate, updateCipData } from "./UFSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import WarningMessage from "../../../common/styles/components/headings/WarningMessage";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitTypeTemp } from "../../../common/utils/GlobalUnitConversionSlice";

const giveErrorMessage = (label, value) => {
  return `The ${label} value entered is outside the allowed range (${value?.minValue.toFixed(
    2
  )} to ${value.maxValue.toFixed(2)}). Please revise your input.`;
};
const CIP = () => {
  //get data from store
  const cipData = useSelector((state) => state.UFStore.data);
  const { ufInputRangeConfig, ufInputRangeConfigByWaterType } = useSelector(
    (state) => state.UFStore
  );
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const [errorOperator, setErrorOperator] = useState({
    show: false,
    message: "",
  });
  const { waterType, chemicalType } = useSelector(
    (state) => state.UFStore.cipDropdownData
  );
  const tempDesign = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  const showInDropDown = useSelector(
    (state) => state.projectInfo.projectConfig.chemicalConfig.showInDropDownChem
  );

  const totalDissolvedSolutes = Number(
    useSelector(
      (state) =>
        state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
          ?.streams[0]?.totalDissolvedSolutes
    )
  ).toFixed(2);
  const ufDoseGuidline = useSelector((state) => state.UFStore.ufDoseGuidline);

  const waterSubTypeID = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.waterSubTypeID
  );
  const [isFocused, setIsFocused] = useState(null);
  const dispatch = useDispatch();
  const provideRange = (label, hardCoded) => {
    waterSubTypeID;
    let foundRange = ufInputRangeConfigByWaterType.find(
      (item) => item.label == label && item.waterSubType
    );
    if (!foundRange) {
      foundRange = ufInputRangeConfig.find((item) => item.label == label);
      if (!foundRange) {
        return hardCoded;
      } else {
        return foundRange;
      }
    } else {
      return foundRange;
    }
  };
  const validations = {
    chemicalSoakingDuration_CIP: provideRange("CIP Soak", {
      minValue: 5,
      maxValue: 720,
    }),
    mineralValue_CIP: cipData.alkaliValueInPh_Ind_CIP
      ? { minValue: 1, maxValue: 7, defaultValue: 2 }
      : provideRange("CIP Mineral Acid Concentration", {
          minValue: 0,
          maxValue: 2500,
          defaultValue: 360,
        }),
    organicValue_CIP: provideRange("CIP Organic Acid Concentration", {
      minValue: 0,
      maxValue: 30000,
      defaultValue: 100,
    }),
    alkaliValue_CIP: cipData.alkaliValueInPh_Ind_CIP
      ? { minValue: 8, maxValue: 14, defaultValue: 12 }
      : provideRange("CIP Alkali Concentration", {
          minValue: 0,
          maxValue: 2000,
          defaultValue: 600,
        }),
    oxidantValue_CIP: provideRange("CIP Oxidant Concentration", {
      minValue: 0,
      maxValue: 2500,
      defaultValue: 1000,
    }),
    bWStepInCIP: { minValue: 1, maxValue: 10 },
    recycleTemperature: {
      minValue:
        unit.selectedUnits[2] === "°C"
          ? tempDesign
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              tempDesign,
              unit.selectedUnits[2],
              "°C"
            ),
      maxValue:
        unit.selectedUnits[2] === "°C"
          ? 100
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              100,
              unit.selectedUnits[2],
              "°C"
            ),
    },
    cIPRinseSoakCycle: { minValue: 1, maxValue: 10 },
    rinseBWCycle: { minValue: 1, maxValue: 10 },
    recycleDuration: provideRange("CIP Recycle", {
      minValue: 7.5,
      maxValue: 240,
    }),
    heatingStepDuration: provideRange("CIP Heating Step", {
      minValue: 1,
      maxValue: 360,
      defaultValue: 60,
    }),
  };
  const closeErrorMessag = () => {
    setErrorOperator({
      show: false,
      message: "",
    });
    // setIsFocused(2);
  };
  const unitType = useSelector((state) => state.GUnitConversion.unitTypeTemp);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      closeErrorMessag();
    }
  };
  // useEffect(() => {
  //   let defaultData = {
  //     chemicalSoakingDuration_CIP: 90,
  //     recycleTemperature: tempDesign > 35 ? tempDesign : 35,
  //     bWStepInCIP: 2,
  //     cIPRinseSoakCycle: 1,
  //     rinseBWCycle: 1,
  //     recycleDuration: 30,
  //     heatingStepDuration: 60,
  //   };
  //   Object.keys(defaultData).map((item) => {
  //     if (cipData[item] == 0) {
  //       const sendData = { target: item, value: defaultData[item] };
  //       dispatch(updateCipData(sendData));
  //     }
  //   });
  // }, []);

  const checkError = (id) => {
    return !(
      validations[id]?.minValue <= cipData[id] &&
      validations[id]?.maxValue >= cipData[id]
    );
  };

  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e, label) => {
    const { name, value } = e.target;
    if (
      value < validations[name]?.minValue ||
      value > validations[name]?.maxValue
    ) {
      setErrorOperator({
        show: true,
        message: giveErrorMessage(label, validations[name]),
      });
      // setIsFocused(name);
      setTimeout(() => {
        e.target.focus();
      }, 0);
    } else {
      dispatch(
        updateCipData({ target: name, value: Number(value).toFixed(2) })
      );
      setIsFocused(null);
      setErrorOperator({
        show: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    if (cipData.recycleTemperature == tempDesign) {
      const sendData = {
        target: "heatingStepDuration",
        value: 0,
      };
      dispatch(updateCipData(sendData));
    } else if (cipData.heatingStepDuration == 0) {
      const sendData = {
        target: "heatingStepDuration",
        value: validations["heatingStepDuration"].defaultValue,
      };
      dispatch(updateCipData(sendData));
    }
  }, [cipData.recycleTemperature]);
  const setPHValue = () => {
    const sendData = {
      target: "alkaliValueInPh_Ind_CIP",
      value: totalDissolvedSolutes ? totalDissolvedSolutes > 0 : false,
    };
    dispatch(updateCipData(sendData));
    const sendData2 = {
      target: "mineralValueInPh_Ind_CIP",
      value: totalDissolvedSolutes ? totalDissolvedSolutes > 0 : false,
    };
    dispatch(updateCipData(sendData2));
  };

  useEffect(() => {
    if (cipData.mineralValueInPh_Ind) {
      let mineralValue =
        cipData.mineralValue_CIP < 1 || cipData.mineralValue_CIP > 7
          ? 2
          : cipData.mineralValue_CIP;
      const sendData1 = {
        target: "mineralValue_CIP",
        value: mineralValue,
      };
      dispatch(updateCipData(sendData1));
      let alkaliValue =
        cipData.alkaliValue_CIP < 7 || cipData.alkaliValue_CIP > 12
          ? 12
          : cipData.alkaliValue_CIP;
      const sendData2 = {
        target: "alkaliValue_CIP",
        value: alkaliValue,
      };
      dispatch(updateCipData(sendData2));
    }
  }, [cipData.mineralValueInPh_Ind]);
  useEffect(() => {
    setPHValue();
  }, [totalDissolvedSolutes]);

  const handleSelect = (e) => {
    const { value, name, id } = e.target;

    const sendData = { target: name, value: value.toString() };
    if (value == 0) {
      const transferData = {
        target: {
          name: `${id}Value_CIP`,
          value: 0,
          id: id,
        },
      };
      handleInputChange(transferData);
    } else if (id !== "waterType") {
      let chemData = [...chemicalType.mineral,...chemicalType.alkali,...chemicalType.organic,...chemicalType.oxidant].find((chem) => chem.id == value);
       chemData = showInDropDown.find((chem) => chem.displayName == chemData.displayName);
      let chemicalValue = ufDoseGuidline.find(
        (item) =>
          item.waterSubTypeId == waterSubTypeID &&
          item?.symbol == chemData?.symbol &&
          item.guidelineName.includes("CIP")
      );
      

      if (id == "mineral") {
        let mineralTempValue = chemicalValue ? chemicalValue.targetDose : 550;

        let concentration =
          value == 0
            ? 0
            : cipData.mineralValueInPh_Ind_CIP
            ? cipData.mineralValue_CIP <= 7 && cipData.mineralValue_CIP >= 1
              ? cipData.mineralValue_CIP
              : 2
            : mineralTempValue;
        const transferData = {
          target: {
            name: `${id}Value_CIP`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else if (id == "alkali") {
        let alkaliTempValue = chemicalValue ? chemicalValue.targetDose : 650;

        let concentration =
          value == 0
            ? 0
            : cipData.alkaliValueInPh_Ind_CIP
            ? cipData.alkaliValue_CIP <= 14 && cipData.alkaliValue_CIP >= 7
              ? cipData.alkaliValue_CIP
              : 12
            : alkaliTempValue;
        const transferData = {
          target: {
            name: `${id}Value_CIP`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else if (id == "organic") {
        let organicTempValue = chemicalValue ? chemicalValue.targetDose : 20000;

        let concentration = value == 0 ? 0 : organicTempValue;
        const transferData = {
          target: {
            name: `${id}Value_CIP`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else {
        let oxidantTempValue = chemicalValue ? chemicalValue.targetDose : 1000;

        let concentration = value == 0 ? 0 : oxidantTempValue;
        const transferData = {
          target: {
            name: `${id}Value_CIP`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      }
      // let chemData = chemicalType[id].find((chem) => chem.id == value);
      // let concentration = value == 0 ? 0 : validations[`${id}Value_CIP`].defaultValue;
      // const transferData = {
      //   target: {
      //     name: `${id}Value_CIP`,
      //     value: concentration,
      //     id: id,
      //   },
      // };
      // handleInputChange(transferData);
    }
    dispatch(updateCipData(sendData));
    dispatch(setUfDataUpdate(true));
  };
  const handleEnableandDisable = (e) => {
    const { name, checked, id } = e.target;
    const sendData = { target: name, value: checked };

    const transferData = {
      target: {
        name: `${id}ChemId_CIP`,
        value: checked ? chemicalType[id][0].id.toString() : 0,
        id: id,
      },
    };
    handleSelect(transferData);
    dispatch(updateCipData(sendData));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value === "" ? "" : value;
    if (!isNaN(value)) {
      const sendData = { target: name, value: value };
      dispatch(updateCipData(sendData));
      dispatch(setUfDataUpdate(true));
    }
  };

  return (
    <>
      <CIPStyled>
        <UFSystemDesignDiagram />
        <div className="cip-temp-water-cycle">
          <StyledCard className="cip-temp-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="CIP Temperature"
              />
              <IconWithTooltip
                label="CIPs can be done with heated water to improve cleaning efficiency"
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="temp-cip">
              <CustomLabel label="Recycle Temperature" />
              <InputWithText
                // type="text"
                type="number"
                disabled={false}
                isError={checkError("recycleTemperature")}
                isWarning={
                  cipData.recycleTemperature >
                    (unit.selectedUnits[2] === "°C" ? 40 : 104) &&
                  cipData.recycleTemperature <=
                    validations.recycleTemperature?.maxValue
                }
                // inputText="⁰C"
                inputText={unit.selectedUnits[2]}
                placeholder="0.00"
                name="recycleTemperature"
                // defaultValue="35"
                onChange={handleInputChange}
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                    evt.key
                  ) && evt.preventDefault()
                }
                onWheel={(e) => e.target.blur()}
                value={
                  isFocused === "recycleTemperature"
                    ? cipData.recycleTemperature
                    : Number.parseFloat(cipData.recycleTemperature).toFixed(2)
                }
                isFocused={isFocused === "recycleTemperature"}
                onBlur={handleBlur}
                onFocus={() => handleFocus("recycleTemperature")}
              />

              {cipData.recycleTemperature >
                (unit.selectedUnits[2] === "°C" ? 40 : 104) &&
              cipData.recycleTemperature <=
                validations.recycleTemperature?.maxValue ? (
                <WarningMessage
                  txtMsg={`Warning Ranges (${
                    validations.recycleTemperature?.minValue
                  } - ${unit.selectedUnits[2] === "°C" ? 40.0 : 104.0}) `}
                />
              ) : cipData.recycleTemperature <
                  validations.recycleTemperature?.minValue ||
                cipData.recycleTemperature >
                  validations.recycleTemperature?.maxValue ? (
                <ErrorMessage texMsg={"Values out of range"} />
              ) : (
                <InputReferenceText
                  refText={`Ranges ${
                    validations.recycleTemperature?.minValue
                  } - ${unit.selectedUnits[2] === "°C" ? 40.0 : 104.0}`}
                />
              )}
            </div>
          </StyledCard>
          <StyledCard className="cycles-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Cycles"
              />
              <IconWithTooltip
                label="Provide number of initial BW cycles, chemical rinse/soak cycles, and final rinse BW cycles."
                icon={<InfoIcon />}
              />
            </Card.Header>

            <div className="cycle-input-wrapper">
              <div className="initial-bw-cycle">
                <CustomLabel label="Initial BW Cycles" />
                <CustomInput
                  type="number"
                  name="bWStepInCIP"
                  disabled={false}
                  isError={checkError("bWStepInCIP")}
                  placeholder="0"
                  // defaultValue="2"
                  value={
                    isFocused === "bWStepInCIP"
                      ? cipData.bWStepInCIP
                      : Number.parseFloat(cipData.bWStepInCIP).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isFocused={isFocused === "bWStepInCIP"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("bWStepInCIP")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.bWStepInCIP?.minValue.toFixed(
                    2
                  )} - ${validations.bWStepInCIP?.maxValue.toFixed(2)}`}
                />
              </div>
              <div className="rinse-soak-cycle">
                <CustomLabel label="Rinse/Soak Cycles" />
                <CustomInput
                  type="number"
                  name="cIPRinseSoakCycle"
                  disabled={false}
                  value={
                    isFocused === "cIPRinseSoakCycle"
                      ? cipData.cIPRinseSoakCycle
                      : Number.parseFloat(cipData.cIPRinseSoakCycle).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isError={checkError("cIPRinseSoakCycle")}
                  placeholder="0"
                  defaultValue="1"
                  isFocused={isFocused === "cIPRinseSoakCycle"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("cIPRinseSoakCycle")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.cIPRinseSoakCycle?.minValue.toFixed(
                    2
                  )} - ${validations.cIPRinseSoakCycle?.maxValue.toFixed(2)}`}
                />
              </div>
              <div className="rinse-bw-cycle">
                <CustomLabel label="Rinse BW Cycles" />
                <CustomInput
                  type="number"
                  name="rinseBWCycle"
                  disabled={false}
                  value={
                    isFocused === "rinseBWCycle"
                      ? cipData.rinseBWCycle
                      : Number.parseFloat(cipData.rinseBWCycle).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isError={checkError("rinseBWCycle")}
                  placeholder="0"
                  // defaultValue="1"
                  isFocused={isFocused === "rinseBWCycle"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("rinseBWCycle")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.rinseBWCycle?.minValue.toFixed(
                    2
                  )} - ${validations.rinseBWCycle?.maxValue.toFixed(2)}`}
                />
              </div>
            </div>
          </StyledCard>
          <StyledCard className="cip-water-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="CIP Water Source"
              />
              <IconWithTooltip
                label="Select source of water for cleaning protocols, RO permeate available if RO in design."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div>
              <CustomLabel label="CIP Water Source" />
              <CustomSelect
                // disabled={false}
                onChange={handleSelect}
                name="uFCIPWaterTypeID"
                value={cipData.uFCIPWaterTypeID}
                id="waterType"
              >
                {waterType.map((item) => (
                  <option
                    key={item.uFCIPWaterTypeID}
                    value={item.uFCIPWaterTypeID}
                  >
                    {item.cIPWaterTypeName}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </StyledCard>
        </div>
        <div className="acid-alkaline-surfactant">
          <StyledCard className="acid-cip-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Acid CIP"
              />
              <IconWithTooltip
                label="Select mineral acid and organic acid chemical reagents and target doses or pH"
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="mineral-acid">
              <div className="label-switch">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Mineral Acid"
                />
                <ToggleSwitch
                  small
                  id="mineral"
                  name="mineralEnabled_Ind_CIP"
                  disabled={!chemicalType.mineral.length > 0}
                  checked={cipData.mineralEnabled_Ind_CIP}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="mineral"
                    disabled={!cipData.mineralEnabled_Ind_CIP}
                    value={cipData.mineralChemId_CIP}
                    name="mineralChemId_CIP"
                    onChange={handleSelect}
                  >
                    {!cipData.mineralEnabled_Ind_CIP && (
                      <option value={0}></option>
                    )}
                    {chemicalType.mineral.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.displayName}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    // type="text"
                    type="number"
                    id="mineral"
                    name="mineralValue_CIP"
                    disabled={!cipData.mineralEnabled_Ind_CIP}
                    value={
                      isFocused === "mineralValue_CIP"
                        ? cipData.mineralValue_CIP
                        : Number.parseFloat(cipData.mineralValue_CIP).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    isError={checkError("mineralValue_CIP")}
                    inputText={cipData.mineralValueInPh_Ind_CIP ? "pH" : "mg/L"}
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "mineralValue_CIP"}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("mineralValue_CIP")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.mineralValue_CIP?.minValue.toFixed(
                      2
                    )} - ${validations.mineralValue_CIP?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>

            <div className="organic-acid">
              <div className="label-switch">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Organic Acid"
                />
                <ToggleSwitch
                  small
                  id="organic"
                  name="organicEnabled_Ind_CIP"
                  disabled={!chemicalType.organic.length > 0}
                  checked={cipData.organicEnabled_Ind_CIP}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="organic"
                    disabled={!cipData.organicEnabled_Ind_CIP}
                    value={cipData.organicChemId_CIP}
                    name="organicChemId_CIP"
                    onChange={handleSelect}
                  >
                    {!cipData.organicEnabled_Ind_CIP && (
                      <option value={0}></option>
                    )}
                    {chemicalType.organic.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.displayName}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    // type="text"
                    type="number"
                    id="organic"
                    disabled={!cipData.organicEnabled_Ind_CIP}
                    value={
                      isFocused === "organicValue_CIP"
                        ? cipData.organicValue_CIP
                        : Number.parseFloat(cipData.organicValue_CIP).toFixed(2)
                    }
                    name="organicValue_CIP"
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    isError={checkError("organicValue_CIP")}
                    inputText="mg/L"
                    placeholder="0.00"
                    defaultValue="20000"
                    isFocused={isFocused === "organicValue_CIP"}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("organicValue_CIP")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.organicValue_CIP?.minValue.toFixed(
                      2
                    )} - ${validations.organicValue_CIP?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          </StyledCard>
          <StyledCard className="alkaline-cip-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Alkaline CIP"
              />
              <IconWithTooltip
                label="Select alkali and oxidant chemical reagents and target doses or pH."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="alkali">
              <div className="label-switch">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Alkali"
                />
                <ToggleSwitch
                  small
                  id="alkali"
                  name="alkaliEnabled_Ind_CIP"
                  disabled={!chemicalType.alkali.length > 0}
                  checked={cipData.alkaliEnabled_Ind_CIP}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="alkali"
                    disabled={!cipData.alkaliEnabled_Ind_CIP}
                    value={cipData.alkaliChemId_CIP}
                    name="alkaliChemId_CIP"
                    onChange={handleSelect}
                  >
                    {!cipData.alkaliEnabled_Ind_CIP && (
                      <option value={0}></option>
                    )}
                    {chemicalType.alkali.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.displayName}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    // type="text"
                    type="number"
                    id="alkali"
                    disabled={!cipData.alkaliEnabled_Ind_CIP}
                    name="alkaliValue_CIP"
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    value={
                      isFocused === "alkaliValue_CIP"
                        ? cipData.alkaliValue_CIP
                        : Number.parseFloat(cipData.alkaliValue_CIP).toFixed(2)
                    }
                    isError={checkError("alkaliValue_CIP")}
                    inputText={cipData.alkaliValueInPh_Ind_CIP ? "pH" : "mg/L"}
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "alkaliValue_CIP"}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("alkaliValue_CIP")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.alkaliValue_CIP?.minValue.toFixed(
                      2
                    )} - ${validations.alkaliValue_CIP?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
            <div className="oxidant">
              <div className="label-switch">
                <CustomHeading
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  fontWeight="400"
                  color={colors.Black}
                  label="Oxidant"
                />
                <ToggleSwitch
                  small
                  id="oxidant"
                  name="oxidantEnabled_Ind_CIP"
                  disabled={!chemicalType.oxidant.length > 0}
                  checked={cipData.oxidantEnabled_Ind_CIP}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="oxidant"
                    disabled={!cipData.oxidantEnabled_Ind_CIP}
                    value={cipData.oxidantChemId_CIP}
                    name="oxidantChemId_CIP"
                    onChange={handleSelect}
                  >
                    {!cipData.oxidantEnabled_Ind_CIP && (
                      <option value={0}></option>
                    )}
                    {chemicalType.oxidant.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.displayName}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    // type="text"
                    type="number"
                    id="oxidant"
                    disabled={!cipData.oxidantEnabled_Ind_CIP}
                    value={
                      isFocused === "oxidantValue_CIP"
                        ? cipData.oxidantValue_CIP
                        : Number.parseFloat(cipData.oxidantValue_CIP).toFixed(2)
                    }
                    name="oxidantValue_CIP"
                    isError={checkError("oxidantValue_CIP")}
                    inputText="mg/L"
                    placeholder="0.00"
                    defaultValue="200"
                    isFocused={isFocused === "oxidantValue_CIP"}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("oxidantValue_CIP")}
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.oxidantValue_CIP?.minValue.toFixed(
                      2
                    )} - ${validations.oxidantValue_CIP?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
            <div className="CIP-scaling">
              <CustomLabel label="CIP Scaling Potential" />
              <InputWithText
                // type="text"
                type="number"
                disabled={true}
                isError={false}
                name="cip_LSI"
                inputText="LSI"
                placeholder="0.00"
                defaultValue="2.00"
                isFocused={isFocused === 9}
                onBlur={handleBlur}
                onFocus={() => handleFocus(9)}
                onChange={handleInputChange}
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                    evt.key
                  ) && evt.preventDefault()
                }
                onWheel={(e) => e.target.blur()}
                value={Number.parseFloat(cipData.cip_LSI).toFixed(2)}
              />
            </div>
          </StyledCard>
          <StyledCard className="surfactant-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Surfactant"
              />
              <div className="info-switch">
                <ToggleSwitch small id="1" name="1" disabled={true} />
                <IconWithTooltip
                  label="Select surfactant chemical reagent and target doses or pH."
                  icon={<InfoIcon />}
                />
              </div>
            </Card.Header>
            <div className="surfactant-select-wrapper">
              <div className="input-select">
                <div className="select">
                  <CustomSelect disabled={true}>
                    {!cipData.oxidantEnabled2_Ing_CIP && (
                      <option value={0}></option>
                    )}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    // type="text"
                    type="number"
                    disabled={true}
                    isError={false}
                    inputText="mg/L"
                    // placeholder="0.00"
                    // defaultValue="200"
                    isFocused={isFocused === 8}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(8)}
                  />
                </div>
              </div>
            </div>
          </StyledCard>
        </div>

        <div className="duration">
          <StyledCard className="duration-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Duration"
              />
              <IconWithTooltip
                label="Duration of chemical treatment steps. Initial and rinse BW steps follow normal BW cycle durations."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="duration-input-wrapper">
              <div>
                <CustomLabel label="Heating Step" />
                <InputWithText
                  // type="text"
                  type="number"
                  disabled={cipData.recycleTemperature == tempDesign}
                  name="heatingStepDuration"
                  isError={checkError("heatingStepDuration")}
                  inputText="min"
                  placeholder="0.00"
                  // defaultValue={
                  //   cipData.recycleTemperature === tempDesign ? "0" : "30"
                  // }
                  value={
                    isFocused === "heatingStepDuration"
                      ? cipData.heatingStepDuration
                      : Number.parseFloat(cipData.heatingStepDuration).toFixed(
                          2
                        )
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isFocused={isFocused === "heatingStepDuration"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("heatingStepDuration")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.heatingStepDuration?.minValue.toFixed(
                    2
                  )} - ${validations.heatingStepDuration?.maxValue.toFixed(2)}`}
                />
              </div>
              <div>
                <CustomLabel label="Recycle" />
                <InputWithText
                  // type="text"
                  type="number"
                  disabled={false}
                  name="recycleDuration"
                  isError={checkError("recycleDuration")}
                  inputText="min"
                  placeholder="0.00"
                  defaultValue="30"
                  isFocused={isFocused === "recycleDuration"}
                  value={
                    isFocused === "recycleDuration"
                      ? cipData.recycleDuration
                      : Number.parseFloat(cipData.recycleDuration).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("recycleDuration")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.recycleDuration?.minValue.toFixed(
                    2
                  )} - ${validations.recycleDuration?.maxValue.toFixed(2)}`}
                />
              </div>
              <div>
                <CustomLabel label="Chemical Soaking" />
                <InputWithText
                  // type="text"
                  type="number"
                  disabled={false}
                  name="chemicalSoakingDuration_CIP"
                  isError={checkError("chemicalSoakingDuration_CIP")}
                  inputText="min"
                  placeholder="0.00"
                  defaultValue="90"
                  value={
                    isFocused === "chemicalSoakingDuration_CIP"
                      ? cipData.chemicalSoakingDuration_CIP
                      : Number.parseFloat(
                          cipData.chemicalSoakingDuration_CIP
                        ).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  onWheel={(e) => e.target.blur()}
                  isFocused={isFocused === "chemicalSoakingDuration_CIP"}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus("chemicalSoakingDuration_CIP")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.chemicalSoakingDuration_CIP?.minValue.toFixed(
                    2
                  )} - ${validations.chemicalSoakingDuration_CIP?.maxValue.toFixed(
                    2
                  )}`}
                />
              </div>
            </div>
          </StyledCard>
        </div>
        {errorOperator.show && (
          <ProjectErrorPopup
            show={errorOperator.show}
            close={closeErrorMessag}
            message={errorOperator.message}
          />
        )}
      </CIPStyled>
    </>
  );
};

export default CIP;
