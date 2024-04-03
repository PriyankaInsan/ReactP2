import React, { useEffect, useState } from "react";
import { Card, Form, Row } from "react-bootstrap";
import UFSystemDesignDiagram from "./UFSystemDesignDiagram";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InfoIcon from "../../../common/icons/InfoIcon";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import CEBStyled from "./CEBStyled";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { MyError } from "../../../common/utils/ErrorCreator";
import ToggleSwitch from "../../../common/styles/components/switches/CustomSwitch";
import {
  handleSameAsBackwash,
  setUfDataUpdate,
  updateCebData,
  updateCipData,
} from "./UFSlice";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

const giveErrorMessage = (label, value) => {
  return `The ${label} value entered is outside the allowed range (${value.minValue.toFixed(
    2
  )} to ${value.maxValue.toFixed(2)}). Please revise your input.`;
};
const CEB = () => {
  // get data from store
  const cebData = useSelector((state) => state.UFStore.data);
  const [errorOperator, setErrorOperator] = useState({
    show: false,
    message: "",
  });
  const { ufInputRangeConfig, ufInputRangeConfigByWaterType } = useSelector(
    (state) => state.UFStore
  );
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  const { waterType, chemicalType } = useSelector(
    (state) => state.UFStore.cebDropdownData
  ); // watertype list and chemical list
  let designTemp = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel?.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.tempDesign
  );
  const ufDoseGuidline = useSelector((state) => state.UFStore.ufDoseGuidline);

  // ); // get design temperature from feedsetup
  const totalDissolvedSolutes = Number(
    useSelector(
      (state) =>
        state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
          ?.streams[0]?.totalDissolvedSolutes
    )
  ).toFixed(2);

  const showInDropDown = useSelector(
    (state) => state.projectInfo.projectConfig.chemicalConfig.showInDropDownChem
  );

  const waterSubTypeID = useSelector(
    (state) =>
      state.Feedsetupdetailsdatapanel.streamData?.lstrequestsavefeedwater[0]
        ?.streams[0]?.waterSubTypeID
  );
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
    chemicalSoakingDuration_CEB: provideRange("CEB Soak Time", {
      minValue: 5,
      maxValue: 60,
    }),
    mineralValue: cebData.alkaliValueInPh_Ind
      ? provideRange("CEB Mineral Acid", {
          minValue: 1,
          maxValue: 7,
          defaultValue: 2,
        })
      : provideRange("CEB Mineral Acid Concentration", {
          minValue: 0,
          maxValue: 3000,
          defaultValue: 360,
        }),
    organicValue: provideRange("CEB Organic Acid Concentration", {
      minValue: 0,
      maxValue: 30000,
      defaultValue: 100,
    }),
    alkaliValue: cebData.alkaliValueInPh_Ind
      ? provideRange("CEB Alkali", { minValue: 7, maxValue: 14 })
      : provideRange("CEB Alkali Concentration", {
          minValue: 0,
          maxValue: 1500,
          defaultValue: 600,
        }),
    oxidantValue: provideRange("CEB Oxidant Concentration", {
      minValue: 0,
      maxValue: 2000,
      defaultValue: 1000,
    }),
    disOxidantValue: { minValue: 0, maxValue: 60 },
    ceb_AirScour: provideRange("t_AS", { minValue: 10, maxValue: 60 }),
    drain: provideRange("t_drain", { minValue: 0, maxValue: 60 }),
    backWash1_CEB: provideRange("t_CEB1&2", { minValue: 15, maxValue: 60 }),
    backWash2_CEB: provideRange("t_CEB1&2", { minValue: 15, maxValue: 60 }),
    forwardFlush: provideRange("t_FF", { minValue: 15, maxValue: 120 }),
  };

  const [isFocused, setIsFocused] = useState(null);

  const [sameAsBW, setSameAsBW] = useState(cebData.sameAsBackwash_Ind);
  const closeErrorMessag = () => {
    setErrorOperator({
      show: false,
      message: "",
    });
    // setIsFocused(2);
  };
  // css functions
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e, label) => {
    const { name, value } = e.target;
    if (
      value < validations[name].minValue ||
      value > validations[name].maxValue
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

  //updated ceb temp based on feed setup design temperature
  const setDesignTemp = () => {
    const sendData = {
      target: "cEBTemperature",
      value: designTemp ? designTemp : 0,
    };
    dispatch(updateCebData(sendData));
  };
  const setPHValue = () => {
    const sendData = {
      target: "alkaliValueInPh_Ind",
      value: totalDissolvedSolutes ? totalDissolvedSolutes > 0 : false,
    };
    dispatch(updateCebData(sendData));
    const sendData2 = {
      target: "mineralValueInPh_Ind",
      value: totalDissolvedSolutes ? totalDissolvedSolutes > 0 : false,
    };
    dispatch(updateCebData(sendData2));
  };

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

  useEffect(() => {
    if (cebData.mineralValueInPh_Ind) {
      let mineralValue =
        cebData.mineralValue < 1 || cebData.mineralValue > 7
          ? 2
          : cebData.mineralValue;
      const sendData1 = {
        target: "mineralValue",
        value: mineralValue,
      };
      dispatch(updateCebData(sendData1));
      let alkaliValue =
        cebData.alkaliValue < 7 || cebData.alkaliValue > 12
          ? 12
          : cebData.alkaliValue;
      const sendData2 = {
        target: "alkaliValue",
        value: alkaliValue,
      };
      dispatch(updateCebData(sendData2));
    }
  }, [cebData.mineralValueInPh_Ind]);
  useEffect(() => {
    setDesignTemp();
    setPHValue();
  }, [designTemp]);

  // set ceb duration same as backwash

  //control all switch
  const handleEnableandDisable = (e) => {
    const { name, checked, id } = e.target;
    const sendData = { target: name, value: checked };
    if (name == "sameAsBackwash_Ind" && checked) {
      setSameAsBW(true);
      dispatch(handleSameAsBackwash(true));
    } else {
      const transferData = {
        target: {
          name: `${id}ChemId`,
          value: checked ? chemicalType[id][0]?.id : 0,
          id: id,
        },
      };
      if (name != "sameAsBackwash_Ind") {
        handleSelect(transferData);
      }
    }
    dispatch(updateCebData(sendData));
    dispatch(setUfDataUpdate(true));
  };

  //control all dropdowns
  const handleSelect = (e) => {
    const { value, name, id } = e.target;

    // var sendData={};
    // if(name==="alkaliChemId"){
    //   console.log("value if",value);oxidantID
    //   sendData = { target: name, value: value.toString()};
    // }else{
    //   console.log("value else",value);
    //   sendData = { target: name, value: Number(value)};
    // }
    // console.log("name, value, ceb", name, value);
    const sendData = { target: name, value: value.toString() };
    //  const sendData = { target: name, value: Number(value)};
    if (value == 0) {
      const transferData = {
        target: {
          name: `${id}Value`,
          value: 0,
          id: id,
        },
      };
      handleInputChange(transferData);
    } else if (id !== "waterType") {
      let chemData = [...chemicalType.mineral,...chemicalType.alkali,...chemicalType.organic,...chemicalType.oxidant].find((chem) => chem.id == value);
       chemData = showInDropDown.find((chem) => chem.displayName == chemData.displayName);
      if (id == "mineral") {
        let mineralTemp = ufDoseGuidline.find(
          (item) =>
            item.waterSubTypeId == waterSubTypeID &&
            item.symbol == chemData.symbol &&
            item.guidelineName.includes("CEB")
        );
        let mineralTempValue = mineralTemp ? mineralTemp.targetDose : 550;

        let concentration =
          value == 0
            ? 0
            : cebData.mineralValueInPh_Ind
            ? cebData.mineralValue <= 7 && cebData.mineralValue >= 1
              ? cebData.mineralValue
              : 2
            : mineralTempValue;
        const transferData = {
          target: {
            name: `${id}Value`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else if (id == "alkali") {
        let mineralTemp = ufDoseGuidline.find(
          (item) =>
            item.waterSubTypeId == waterSubTypeID &&
            item.symbol == chemData.symbol &&
            item.guidelineName.includes("CEB")
        );
        let mineralTempValue = mineralTemp ? mineralTemp.targetDose : 650;

        let concentration =
          value == 0
            ? 0
            : cebData.mineralValueInPh_Ind
            ? cebData.alkaliValue <= 14 && cebData.alkaliValue >= 7
              ? cebData.alkaliValue
              : 12
            : mineralTempValue;
        const transferData = {
          target: {
            name: `${id}Value`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else if (id == "organic") {
        let organicTemp = ufDoseGuidline.find(
          (item) =>
            item.waterSubTypeId == waterSubTypeID &&
            item.symbol == chemData.symbol &&
            item.guidelineName.includes("CEB")
        );
        let organicTempValue = organicTemp ? organicTemp.targetDose : 20000;
        let concentration = value == 0 ? 0 : organicTempValue;
        const transferData = {
          target: {
            name: `${id}Value`,
            value: concentration,
            id: id,
          },
        };
        handleInputChange(transferData);
      } else {
        {
          let oxidantTemp = ufDoseGuidline.find(
            (item) =>
              item.waterSubTypeId == waterSubTypeID &&
              item?.symbol == chemData?.symbol &&
              item.guidelineName.includes("CEB")
          );
          let oxidantTempValue = oxidantTemp ? oxidantTemp.targetDose : 1000;
          let concentration = value == 0 ? 0 : oxidantTempValue;
          const transferData = {
            target: {
              name: `${id}Value`,
              value: concentration,
              id: id,
            },
          };
          handleInputChange(transferData);
        }
      }
    }
    dispatch(updateCebData(sendData));
    dispatch(setUfDataUpdate(true));
  };

  //control all input field
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    value = value === "" ? "" : value;
    if (!isNaN(value)) {
      const sendData = { target: name, value: value };
      dispatch(updateCebData(sendData));
      dispatch(setUfDataUpdate(true));
    }
  };

  const chekError = (id) => {
    return !(
      validations[id]?.minValue <= cebData[id] &&
      validations[id]?.maxValue >= cebData[id]
    );
  };

  return (
    <>
      <CEBStyled className="g-0">
        <UFSystemDesignDiagram />
        <div className="ceb-temp-water">
          <StyledCard className="ceb-temp">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="CEB Temperature"
              />
              <IconWithTooltip
                label="Informational, it is assumed CEB will use water at the design temperature."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div className="ceb-temp-div">
              <CustomLabel label="Use design temperature from feed water" />
              <InputWithText
                className="ceb-temp-input"
                // type="text"
                type="number"
                disabled={true}
                isError={false}
                // inputText="⁰C"
                inputText={unit.selectedUnits[2]}
                placeholder="0.00"
                value={
                  unit.selectedUnits[2] !== "°C"
                    ? GlobalUnitConversion(
                        GlobalUnitConversionStore,
                        designTemp,
                        unit.selectedUnits[2],
                        "°C"
                      )
                    : designTemp
                }
                isFocused={isFocused === 0}
                onBlur={(e) => handleBlur(e, "")}
                onFocus={() => handleFocus(2)}
              />
            </div>
          </StyledCard>
          <StyledCard className="water-source">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Water Source"
              />
              <IconWithTooltip
                label="Select source of water for cleaning protocols, RO permeate available if RO in design."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <div>
              <CustomLabel label="CEB Water Source" />
              <CustomSelect
                onChange={handleSelect}
                name="uFCEBWaterTypeID"
                value={cebData.uFCEBWaterTypeID}
                id="waterType"
              >
                {waterType.map((item) => (
                  <option
                    key={item.uFCEBWaterTypeID}
                    value={item.uFCEBWaterTypeID}
                  >
                    {item.cEBWaterTypeName}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </StyledCard>
        </div>
        <div className="alkali-acid-dis">
          <StyledCard className="acid-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Acid CEB 1.2, CEB 2"
              />
              <IconWithTooltip
                label="Select mineral acid and organic acid chemical reagents and target doses or pH"
                icon={<InfoIcon />}
              />
            </Card.Header>
            {/* miniral section */}
            <div className="ceb-water-source">
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
                  name="mineralEnabled_Ind_CEB"
                  disabled={!chemicalType.mineral.length > 0}
                  checked={cebData.mineralEnabled_Ind_CEB}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="mineral"
                    disabled={!cebData.mineralEnabled_Ind_CEB}
                    value={cebData.mineralChemId}
                    name="mineralChemId"
                    onChange={handleSelect}
                  >
                    {!cebData.mineralEnabled_Ind_CEB && (
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
                    name="mineralValue"
                    disabled={!cebData.mineralEnabled_Ind_CEB}
                    value={
                      isFocused === "mineralValue"
                        ? cebData.mineralValue
                        : Number.parseFloat(cebData.mineralValue).toFixed(2)
                    }
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    isError={chekError("mineralValue")}
                    onWheel={(e) => e.target.blur()}
                    inputText={cebData.mineralValueInPh_Ind ? "pH" : "mg/L"}
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "mineralValue"}
                    onBlur={(e) => handleBlur(e, "Mineral Acid")}
                    onFocus={() => handleFocus("mineralValue")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.mineralValue?.minValue.toFixed(
                      2
                    )} - ${validations.mineralValue?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
            {/* organic acid section */}
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
                  name="organicEnabled_Ind_CEB"
                  disabled={!chemicalType.organic.length > 0}
                  checked={cebData.organicEnabled_Ind_CEB}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="organic"
                    disabled={!cebData.organicEnabled_Ind_CEB}
                    value={cebData.organicChemId}
                    name="organicChemId"
                    onChange={handleSelect}
                  >
                    {!cebData.organicEnabled_Ind_CEB && (
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
                    disabled={!cebData.organicEnabled_Ind_CEB}
                    value={
                      isFocused === "organicValue"
                        ? cebData.organicValue
                        : Number.parseFloat(cebData.organicValue).toFixed(2)
                    }
                    name="organicValue"
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    isError={chekError("organicValue")}
                    onWheel={(e) => e.target.blur()}
                    inputText="mg/L"
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "organicValue"}
                    onBlur={(e) => handleBlur(e, "Organic Acid")}
                    onFocus={() => handleFocus("organicValue")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.organicValue?.minValue.toFixed(
                      2
                    )} - ${validations.organicValue?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          </StyledCard>
          <StyledCard className="alkali-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Alkaline CEB 1.1"
              />
              <IconWithTooltip
                label="Select alkali and oxidant chemical reagents and target doses or pH."
                icon={<InfoIcon />}
              />
            </Card.Header>
            {/* alkali section */}
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
                  name="alkaliEnabled_Ind_CEB"
                  disabled={!chemicalType.alkali.length > 0}
                  checked={cebData.alkaliEnabled_Ind_CEB}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    disabled={!cebData.alkaliEnabled_Ind_CEB}
                    value={cebData.alkaliChemId}
                    name="alkaliChemId"
                    id="alkali"
                    onChange={handleSelect}
                  >
                    {!cebData.alkaliEnabled_Ind_CEB && (
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
                    disabled={!cebData.alkaliEnabled_Ind_CEB}
                    id="alkali"
                    name="alkaliValue"
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    value={
                      isFocused === "alkaliValue"
                        ? cebData.alkaliValue
                        : Number.parseFloat(cebData.alkaliValue).toFixed(2)
                    }
                    isError={chekError("alkaliValue")}
                    onWheel={(e) => e.target.blur()}
                    inputText={cebData.alkaliValueInPh_Ind ? "pH" : "mg/L"}
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "alkaliValue"}
                    onBlur={(e) => handleBlur(e, "Alkali")}
                    onFocus={() => handleFocus("alkaliValue")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.alkaliValue?.minValue.toFixed(
                      2
                    )} - ${validations.alkaliValue?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
            {/* oxidant section */}
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
                  name="oxidantEnabled_Ind_CEB"
                  disabled={!chemicalType.oxidant.length > 0}
                  checked={cebData.oxidantEnabled_Ind_CEB}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    disabled={!cebData.oxidantEnabled_Ind_CEB}
                    value={cebData.oxidantChemId}
                    id="oxidant"
                    name="oxidantChemId"
                    onChange={handleSelect}
                  >
                    {!cebData.oxidantEnabled_Ind_CEB && (
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
                    disabled={!cebData.oxidantEnabled_Ind_CEB}
                    value={
                      isFocused === "oxidantValue"
                        ? cebData.oxidantValue
                        : Number.parseFloat(cebData.oxidantValue).toFixed(2)
                    }
                    id="oxidant"
                    name="oxidantValue"
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    isError={chekError("oxidantValue")}
                    onWheel={(e) => e.target.blur()}
                    inputText="mg/L"
                    placeholder="0.00"
                    defaultValue="2.00"
                    isFocused={isFocused === "oxidantValue"}
                    onBlur={(e) => handleBlur(e, "Oxidant")}
                    onFocus={() => handleFocus("oxidantValue")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.oxidantValue?.minValue.toFixed(
                      2
                    )} - ${validations.oxidantValue?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
            {/* Ceb scaling section */}
            <div className="ceb-scaling-potential">
              <CustomLabel label="CEB Scaling Potential" />
              <InputWithText
                // type="text"
                type="number"
                disabled={true}
                isError={false}
                inputText="LSI"
                name="ceb_LSI"
                placeholder="0.00"
                onChange={handleInputChange}
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                    evt.key
                  ) && evt.preventDefault()
                }
                value={cebData.ceb_LSI}
                onWheel={(e) => e.target.blur()}
                defaultValue="2.00"
                isFocused={isFocused === "ceb_LSI"}
                onBlur={(e) => handleBlur(e, "")}
                onFocus={() => handleFocus("ceb_LSI")}
              />
            </div>
          </StyledCard>
          <StyledCard className="disinfection-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Disinfection CEB 3"
              />
              <IconWithTooltip
                label="Select oxidant chemical reagent and target doses or pH."
                icon={<InfoIcon />}
              />
            </Card.Header>
            {/* disoxidant section */}
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
                  id="disOxidant"
                  name="disOxidantEnabled_Ind_CEB"
                  disabled={!chemicalType.disOxidant.length > 0}
                  checked={cebData.disOxidantEnabled_Ind_CEB}
                  onChange={handleEnableandDisable}
                />
              </div>
              <div className="input-select">
                <div className="select">
                  <CustomSelect
                    id="disOxidant"
                    disabled={!cebData.disOxidantEnabled_Ind_CEB}
                    value={cebData.disOxidantChemId}
                    name="disOxidantChemId"
                    onChange={handleSelect}
                  >
                    {!cebData.disOxidantEnabled_Ind_CEB && (
                      <option value={0}></option>
                    )}
                    {chemicalType.disOxidant.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.displayName}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div className="input">
                  <InputWithText
                    id="disOxidant"
                    // type="text"
                    type="number"
                    disabled={!cebData.disOxidantEnabled_Ind_CEB}
                    isError={false}
                    inputText="mg/L"
                    placeholder="0.00"
                    defaultValue="2.00"
                    name="disOxidantValue"
                    value={cebData.disOxidantValue}
                    onChange={handleInputChange}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    isFocused={isFocused === "disOxidantValue"}
                    onWheel={(e) => e.target.blur()}
                    onBlur={(e) => handleBlur(e, "")}
                    onFocus={() => handleFocus("disOxidantValue")}
                  />
                  <InputReferenceText
                    refText={`Ranges ${validations.disOxidantValue?.minValue.toFixed(
                      2
                    )} - ${validations.disOxidantValue?.maxValue.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
        {/* duration section */}
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
                label="Provide duration of each step in the CEB protocol."
                icon={<InfoIcon />}
              />
            </Card.Header>
            <CustomRadioCheck
              className="same-as-backwash"
              disabled={false}
              id="sameAsBackwash_Ind"
              label="Same as Backwash"
              name="sameAsBackwash_Ind"
              checked={cebData.sameAsBackwash_Ind}
              onChange={handleEnableandDisable}
            />
            <div className="duration-input-wrapper">
              <div className="big-text">
                {/* CEB ceb_AirScour Bottom */}
                <CustomLabel label="Air Scour" />
                <InputWithText
                  type="number"
                  disabled={cebData.sameAsBackwash_Ind}
                  name="ceb_AirScour"
                  inputText="Sec"
                  placeholder="0.00"
                  value={
                    isFocused === "ceb_AirScour"
                      ? cebData.ceb_AirScour
                      : Number.parseFloat(cebData.ceb_AirScour).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "ceb_AirScour"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "Air Scour")}
                  onFocus={() => handleFocus("ceb_AirScour")}
                  isError={chekError("ceb_AirScour")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.ceb_AirScour?.minValue.toFixed(
                    2
                  )} - ${validations.ceb_AirScour?.maxValue.toFixed(2)}`}
                />
              </div>
              <div className="big-text">
                {/* CEB Drain */}
                <CustomLabel label="Drain" />
                <InputWithText
                  type="number"
                  disabled={cebData.sameAsBackwash_Ind}
                  name="drain"
                  inputText="Sec"
                  placeholder="0.00"
                  value={
                    isFocused === "drain"
                      ? cebData.drain
                      : Number.parseFloat(cebData.drain).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "drain"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "Drain")}
                  onFocus={() => handleFocus("drain")}
                  isError={chekError("drain")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.drain?.minValue.toFixed(
                    2
                  )} - ${validations.drain?.maxValue.toFixed(2)}`}
                />
              </div>
              {/* CEB Drain Bottom */}
              <div className="big-text">
                <CustomLabel label="CEB Drain Bottom" />
                <InputWithText
                  type="number"
                  disabled={cebData.sameAsBackwash_Ind}
                  name={"backWash2_CEB"}
                  inputText="Sec"
                  placeholder="45"
                  value={
                    isFocused === "backWash2_CEB"
                      ? cebData.backWash2_CEB
                      : Number.parseFloat(cebData.backWash2_CEB).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "backWash2_CEB"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "CEB Drain Bottom")}
                  onFocus={() => handleFocus("backWash2_CEB")}
                  isError={chekError("backWash2_CEB")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.backWash2_CEB?.minValue.toFixed(
                    2
                  )} - ${validations.backWash2_CEB?.maxValue.toFixed(2)}`}
                />
              </div>
              {/* CEB Drain Top */}
              <div className="big-text">
                <CustomLabel label="CEB Drain Top" />
                <InputWithText
                  type="number"
                  disabled={cebData.sameAsBackwash_Ind}
                  name={"backWash1_CEB"}
                  inputText="Sec"
                  placeholder="45"
                  value={
                    isFocused === "backWash1_CEB"
                      ? cebData.backWash1_CEB
                      : Number.parseFloat(cebData.backWash1_CEB).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "backWash1_CEB"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "CEB Drain Top")}
                  onFocus={() => handleFocus("backWash1_CEB")}
                  isError={chekError("backWash1_CEB")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.backWash1_CEB?.minValue.toFixed(
                    2
                  )} - ${validations.backWash1_CEB?.maxValue.toFixed(2)}`}
                />
              </div>
              {/* Forward Flush */}
              <div className="big-text">
                <CustomLabel label="Forward Flush" />
                <InputWithText
                  type="number"
                  disabled={false}
                  name={"forwardFlush"}
                  inputText="Sec"
                  placeholder="0.00"
                  value={
                    isFocused === "forwardFlush"
                      ? cebData.forwardFlush
                      : Number.parseFloat(cebData.forwardFlush).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "forwardFlush"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "Forward Flush")}
                  onFocus={() => handleFocus("forwardFlush")}
                  isError={chekError("forwardFlush")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.forwardFlush?.minValue.toFixed(
                    2
                  )} - ${validations.forwardFlush?.maxValue.toFixed(2)}`}
                />
              </div>
              {/*  Chemical Soaking Duration */}
              <div className="big-text">
                <CustomLabel label="Chemical Soaking Duration" />
                <InputWithText
                  type="number"
                  disabled={false}
                  name={"chemicalSoakingDuration_CEB"}
                  inputText="min"
                  placeholder="0.00"
                  value={
                    isFocused === "chemicalSoakingDuration_CEB"
                      ? cebData.chemicalSoakingDuration_CEB
                      : Number.parseFloat(
                          cebData.chemicalSoakingDuration_CEB
                        ).toFixed(2)
                  }
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={isFocused === "chemicalSoakingDuration_CEB"}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "Chemical Soaking Duration")}
                  onFocus={() => handleFocus("chemicalSoakingDuration_CEB")}
                  isError={chekError("chemicalSoakingDuration_CEB")}
                />
                <InputReferenceText
                  refText={`Ranges ${validations.chemicalSoakingDuration_CEB?.minValue.toFixed(
                    2
                  )} - ${validations.chemicalSoakingDuration_CEB?.maxValue.toFixed(
                    2
                  )}`}
                />
              </div>
              {/* BW Rinse Drain Bottom */}
              <div className="big-text">
                <CustomLabel label="BW Rinse Drain Bottom" />
                <InputWithText
                  type="number"
                  disabled={true}
                  name={"backWash1_CEB"}
                  inputText="Sec"
                  placeholder=""
                  value={0}
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={false}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "BW Rinse Drain Bottom")}
                  onFocus={() => handleFocus("backWash1_CEB")}
                  isError={false}
                />
              </div>
              {/* BW Rinse Drain Top */}
              <div className="big-text">
                <CustomLabel label="BW Rinse Drain Top" />
                <InputWithText
                  type="number"
                  disabled={true}
                  name={"backWash2_CEB"}
                  inputText="Sec"
                  placeholder=""
                  value={0}
                  onChange={handleInputChange}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                      evt.key
                    ) && evt.preventDefault()
                  }
                  isFocused={false}
                  onWheel={(e) => e.target.blur()}
                  onBlur={(e) => handleBlur(e, "BW Rinse Drain Top")}
                  onFocus={() => handleFocus("backWash2_CEB")}
                  isError={false}
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
      </CEBStyled>
    </>
  );
};

export default CEB;
