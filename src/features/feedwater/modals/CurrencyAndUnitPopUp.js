/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import CurrencyUnitPopUpStyled from "./CurrencyAndUnitPopUpStyled";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import { useEffect } from "react";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import { useCreateDataMutation } from "../../../services/apiConfig";
import { toast } from "react-toastify";
import CurrencyAndUnitsApplied from "./CurrencyAndUnitsApplied";
import CloseIcon from "../../../common/icons/CloseIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import DefaultCurrencyMessage from "./DefaultCurrencyMessage";
import DefaultUnitsMessage from "./DefaultUnitsMessage";
import ArrowRightBlackIcon from "../../../common/icons/ArrowRightBlackIcon";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useDispatch, useSelector } from "react-redux";
import DynamicLoadder from "../../../common/utils/DynamicLoadder";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import { updateUnitConfig } from "../../../common/ProjectInfoSlice";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import DefaultValueSaved from "./DefaultValueSaved";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import { updateUFStore } from "../uf/UFSlice";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitFlag } from "../../../common/utils/GlobalUnitConversionSlice";
const CurrencyUnitPopUp = ({ show, close, forUser }) => {
  //getStoreData
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const projectID = ProjectInfoStore ? ProjectInfoStore.projectID : 1;
  // const projectID = 6602;
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userID = UserInfoStore.UserId === 0 ? 1 : UserInfoStore.UserId;
  const { projectTitle } = useSelector((state) => state.projectInfo);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const unitType = useSelector((state) => state.GUnitConversion.unitTypeFlux);
  const UFData = useSelector((state) => state.UFStore.data);
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  // const userID = 1984;
  const dispatch = useDispatch();

  //api related
  const [getCurrencylist, responseCurrencylist] = useLazyGetAllDataQuery();
  const [getUnitlist, responseUnitlist] = useLazyGetAllDataQuery();
  const [CurrencyDataPost, { data }] = useCreateDataMutation();
  const [updateData, responseFromUpdateData] = useUpdateDataMutation();
  const [UmoDataPost, { Umoiddata }] = useCreateDataMutation();

  //State
  const [currencylist, setCurrencylist] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [unitData, setUnitData] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selecteUnitType, setSelectedUnitType] = useState(2);
  const [exchangeRate, setExchangeRate] = useState(1);

  //css related
  const [openModal, setOpenModal] = useState(true);
  const [isFocused, setIsFocused] = useState(null);
  const [currencyUnitApplied, setCurrencyUnitApplied] = useState(false);
  const [defaultTech, setDefaultTech] = useState(false);
  const [currencyDefault, setCurrencyDefault] = useState(false);
  const [error, setError] = useState(false);
  const [currencyLoader, setCurrencyLoadder] = useState(true);
  const [unitLoader, setUnitLoadder] = useState(true);
  const [newPop, setNewPop] = useState(false);
  

  //open and close modle
  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);

  let refrenc = [
    "Flow",
    "Pressure",
    "Temperature",
    "Flux",
    "Area",
    "Concentration (gases)",
    "Conductivity",
    "Density",
    "Length",
    "Power",
    "Specific Velocity",
    "Volume (Solution)",
    "Volume (Resin)",
    "Volume (Common)",
    "Regeneration Dose",
    "Linear Velocity",
    "Weight",
    "Gas Flow",
    "Organics",
  ];
  //API Call
  useEffect(() => {
    if (show) {
      getUnitlist(
        `${"masterdata/api/v1/UnitOfMeassure"}?userID=${userID}${
          forUser ? "" : `&projectid=${projectID}`
        }`
      );
      getCurrencylist(
        `${"masterdata/api/v1/DefaultCurrency"}?userID=${userID}${
          forUser ? "" : `&projectid=${projectID}`
        }`
      );
    }
  }, [show]);

  //API responce cheack
  useEffect(() => {
    if (responseUnitlist.isLoading) {
      setCurrencyLoadder(true);
    }
    if (responseUnitlist.isSuccess) {
      let hasData = responseUnitlist.data.filter((item) =>
        item.unitKey.find((a) => a.isSelected)
      );
      if (hasData.length > 0) {
        let refinData = refrenc.map((x) =>
        responseUnitlist.data.find((item) => item.uomTypeName == x)
      );
        setUnitData(refinData);
        setSelectedUnitType(responseUnitlist.data[0].uomSelectType);
        let selectedUnitList = [];
        responseUnitlist.data.map((item) => {
          let selected = item.unitKey.find((a) => a.isSelected);
          selected = !selected
            ? item.unitKey.find((a) => a.uomsystemId === 2).uomId
            : selected.uomId;
          selectedUnitList.push({ uomId: selected });
        });
        setSelectedUnits(selectedUnitList);

      } else {
        let selectedUnitList = [];
        let newData = JSON.parse(JSON.stringify(responseUnitlist.data));
        let manageData = newData.map((item) => {
          let selected = item.unitKey.find((a) => a.isSelected);
          selected = !selected
            ? item.unitKey.find((a) => a.uomsystemId === 2).uomId
            : selected.uomId;
          selectedUnitList.push({ uomId: selected });
          let newUnit = item.unitKey.find((a) => a.uomsystemId === 2);
          newUnit.isSelected = true;

          return { ...item, unitKey: { ...item.unitKey, newUnit } };
        });
        let refinData = refrenc.map((x) =>
          manageData.find((item) => item.uomTypeName == x)
        );

        setUnitData(refinData);
        setSelectedUnitType(2);

        setSelectedUnits(selectedUnitList);
      }

      setCurrencyLoadder(false);
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
    if (responseCurrencylist.isLoading) {
      setUnitLoadder(true);
    } else {
      if (responseCurrencylist.isSuccess === true) {
        setCurrencylist(responseCurrencylist.data);
        let selected = responseCurrencylist.data.find((a) => a.isDefault);
        selected = !selected ? responseCurrencylist.data[0] : selected;
        setSelectedCurrency(selected);
        setExchangeRate(Number(selected.currencyValue));
        setUnitLoadder(false);
      }
    }
    if (responseCurrencylist.isError) {
      throw new MyError(
        "currencylist Api Error",
        responseCurrencylist.error.status,
        "ApiError"
      );
    }
  }, [responseCurrencylist]);

  useEffect(() => {
    const { data, isSuccess } = responseFromUpdateData;
    if (isSuccess && data.responseCode === 200) {
      dispatch(updateUnitConfig(unitData));
    }
  }, [responseFromUpdateData]);

  //css functions-----------------------------------------------
  const handleOpenDefaultTech = () => {
    setDefaultTech(true);
  };
  const handleCloseDefaultTech = () => {
    setDefaultTech(false);
  };
  const handleOpenCurrencyDefault = () => {
    if (exchangeRate && Number(exchangeRate) > 0) {
      setCurrencyDefault(true);
    }
  };
  const handleCloseCurrencyDefault = () => {
    setCurrencyDefault(false);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleCloseCurrencyUnit = () => {
    setCurrencyUnitApplied(false);
  };

  // handle chnage functions--------------------------------------
  const handleCurrencySelect = (e) => {
    const currencyName = e.target.value;
    if (currencyName == "US Dollar($)") {
      setExchangeRate("1");
    }
    let selected = currencylist.find((a) => a.currencyName === currencyName);
    setSelectedCurrency(selected);
  };

  const handleExchangeRate = (e) => {
    const rate = e.target.value;
    setExchangeRate(rate);
  };

  const handleUnitSelect = (id, item) => {
    if (selecteUnitType === 3) {
      let unitDataTemp = unitData;
      let selectedItem = unitData.filter((x) => x.uomTypeID === id);
      let selectedUomItem = selectedItem[0].unitKey.map((u, index) => {
        if (item.uomId === u.uomId) {
          u = { ...u, isSelected: true };
        } else {
          u = { ...u, isSelected: false };
        }

        return u;
      });

      unitDataTemp = unitData.map((ud, index) => {
        if (ud.uomTypeID === id) {
          ud = { ...ud, unitKey: selectedUomItem };
        }
        return ud;
      });

      setUnitData(unitDataTemp);
      handleUnitChange(unitDataTemp);
    }
  };

  const handleUnitChange = (data) => {
    let selectedUnitList = [];
    data.map((item) => {
      let selected = item.unitKey.find((a) => a.isSelected).uomId;
      selectedUnitList.push({ uomId: selected });
    });
    setSelectedUnits(selectedUnitList);
  };

  const currencyUpdateRadio = (index) => {
    if (index == "ManuallyRate") {
      setIsSelectCurrency(true);
    } else {
      setIsSelectCurrency(false);
    }
  };

  //save APIs functions ----------------------------------------------
  const MakeCurrencyNewDefault = () => {
    const CurrencyData = {
      Method: "masterdata/api/v1/MakeDefaultCurrency",
      currencyID: selectedCurrency.currencyID,
      userID: userID,
      exchangeRate: exchangeRate,
    };
    setCurrencyDefault(false);
    setNewPop(true);
    CurrencyDataPost(CurrencyData);
  };

  const getNetUnit=()=>{
    console.log("PK unit.defaultValues[3] unitData",unitData[3].unitKey);
    let newUnit=unitData?.[3]?.unitkey?.map((unit)=>{
      console.log("PK in newUnit");
      if(unit.uomId===selectedUnits[selecteUnitType].uomId){
        return unit.uomName;
      }
    });
    console.log("PK newUnit",newUnit);
    return newUnit;
  };
  const MakeUnitNewDefault = () => {
    const UmoIdData = {
      Method: "masterdata/api/v1/MakeDefaultUOM",
      userID: userID,
      lstMakeDefaultUOM: selectedUnits,
      uomSelectType: selecteUnitType,
    };
    UmoDataPost(UmoIdData);
    setDefaultTech(false);
    setNewPop(true);
  };

  const applyTheChanges = () => {
    if (exchangeRate && Number(exchangeRate) > 0) {
      if (forUser) {
        MakeCurrencyNewDefault();
        MakeUnitNewDefault();
      } else {
        updateData({
          Method: "masterdata/api/v1/CurrencyUOM",
          userID: userID,
          projectID: ProjectInfoStore.projectID,
          currencyID: selectedCurrency.currencyID,
          currencyExchRate: exchangeRate,
          listUOM: selectedUnits,
          uomSelectedType: selecteUnitType,
        });
      }
      setCurrencyUnitApplied(true);
      dispatch(updateUnitFlag(true));
    }
  };

  const defaultUSUnits = [
    null,
    1,
    3,
    5,
    7,
    9,
    11,
    13,
    15,
    17,
    19,
    21,
    25,
    28,
    30,
    32,
    34,
    36,
    38,
    45,
  ];
  const defaultMetricUnits = [
    null,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    40,
    18,
    20,
    24,
    27,
    29,
    31,
    33,
    34,
    37,
    38,
    45,
  ];
  const handleUnitType = (type) => {
    console.log("unit", type);
    setSelectedUnitType(type);
    if (type != 3) {
      let unitDataTemp = unitData.map((u) => {
        let unitKeyTemp = u.unitKey.map((x) => {
          x = {
            ...x,
            isSelected:
              type === 1
                ? defaultUSUnits.includes(x.uomId)
                : defaultMetricUnits.includes(x.uomId),
          };

          return x;
        });
        u = { ...u, unitKey: unitKeyTemp };
        return u;
      });
      setUnitData(unitDataTemp);
      handleUnitChange(unitDataTemp);
    }
  };
  return (
    <>
      <CurrencyUnitPopUpStyled
        centered
        show={show && openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Row className="header-create-project bg-light d-flex">
          <Col lg={10} md={10} sm={10} className="heading">
            <CustomHeading
              label="Currency & Units Settings"
              className="currency-modal-heading"
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
              color={colors.PrimaryDarkAquaMarine}
            />
            <CustomHeading
              fontFamily="DiodrumRegular"
              label={`Here you can update the currency and units used for ${
                forUser ? "user account preference" : projectTitle
              }.`}
              fontSize="12px"
              fontWeight="400"
              color={colors.blackTransparency045}
            />
          </Col>
          <Col lg={2} md={2} sm={2} className="close-icon">
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Col>
        </Row>
        <DynamicLoadder isLoading={currencyLoader || unitLoader}>
          <DefaultValueSaved show={newPop} close={setNewPop} />
          <Row className="currency-row g-0">
            <Col lg={4} md={4} sm={4} className="currency-details-first-column">
              <Col lg={12} md={7} sm={7} xs={7} className="project-setting">
                <CustomHeading
                  label="Currency Settings"
                  className="currency-heading"
                  fontFamily="NotoSansSemiBold"
                  fontSize="14px"
                  fontWeight="700"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <CustomLabel
                  className="select-currency-label"
                  label="Select Currency for Project"
                />
                <CustomSelect
                  label="select"
                  id="floatingSelectGrid"
                  onChange={handleCurrencySelect}
                  value={selectedCurrency.currencyName}
                >
                  {currencylist?.map((data, i) => (
                    <option key={i} value={data.currencyName}>
                      {data.currencyName}
                    </option>
                  ))}
                  ;
                </CustomSelect>
              </Col>
              <Col lg={12} md={5} sm={4} xs={4} className="exchange-rate-radio">
                <div className="exchange-heading">
                  <CustomLabel label="Currency Exchange Rate" />
                </div>
                <div className="wrapper-radio d-flex">
                  <CustomRadio
                    label="Use Default Rate"
                    type="radio"
                    disabled={true}
                    isError={false}
                    name="exampleRadios"
                    id="DupontRate"
                    onChange={() => currencyUpdateRadio("DupontRate")}
                    value="DupontRate"
                  />
                  <CustomRadio
                    label="Enter Manually"
                    type="radio"
                    disabled={false}
                    isError={false}
                    name="exampleRadios"
                    id="ManuallyRate"
                    defaultChecked={true}
                    onChange={() => currencyUpdateRadio("ManuallyRate")}
                    value="ManuallyRate"
                  />
                </div>
                <div>
                  <CustomHeading
                    fontFamily="DiodrumRegular"
                    label="Its measured against USD($)"
                    fontSize="10px"
                    fontWeight="400"
                    color={colors.Grey96}
                  />
                </div>
              </Col>
              <Col
                lg={12}
                md={3}
                sm={3}
                xs={3}
                className="currency-exchange-rate"
              >
                <div className="label-input-box">
                  <CustomLabel label="Currency Exchange Rate" />

                  <InputWithIcon
                    disabled={
                      selectedCurrency.currencyName == "US Dollar($)"
                        ? true
                        : false
                    }
                    isError={!exchangeRate || Number(exchangeRate) <= 0}
                    type="number"
                    unitBgColor="transparent"
                    id="uname"
                    placeholder="0"
                    value={
                      isFocused === "exchangeRate"
                        ? exchangeRate
                        : Number(exchangeRate).toFixed(3)
                    }
                    onChange={handleExchangeRate}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("exchangeRate")}
                    name="exchangeRate"
                    isFocused={isFocused === "exchangeRate"}
                    required
                    inputText={
                      !exchangeRate || Number(exchangeRate) <= 0 ? (
                        <CloseCircleRedIcon />
                      ) : (
                        <CloseCircleGreenIcon />
                      )
                    }
                  />
                  <ErrorMessage
                    errorIcon={true}
                    style={{
                      visibility:
                        !exchangeRate || Number(exchangeRate) <= 0
                          ? "visible"
                          : "hidden",
                    }}
                    texMsg="Please fill the field."
                  />
                </div>
              </Col>
              <Col lg={12} md={5} sm={5} xs={5} className="default-currency">
                <StandardLinkButtonWithIcon
                  label="Make Currency as New Default"
                  padding="10px 24px 10px 0px"
                  plusIcon={false}
                  onClick={handleOpenCurrencyDefault}
                />
                <DefaultCurrencyMessage
                  show={currencyDefault}
                  close={handleCloseCurrencyDefault}
                  yes={MakeCurrencyNewDefault}
                />
              </Col>
            </Col>
            <Col lg={8} className="unit-table-data-row">
              <Row className="g-0">
                <Col lg={12} className="units-metric-row">
                  <Col lg={7} md={7} sm={7} xs={7} className="">
                    <CustomHeading
                      fontFamily="NotoSansSemiBold"
                      label="Select Units for Project"
                      fontSize="14px"
                      fontWeight="700"
                      color={colors.PrimaryDarkAquaMarine}
                    />
                    <div className="metric-us-radio-wrapper">
                      <CustomRadio
                        disabled={false}
                        isError={false}
                        type="radio"
                        className="u.s-radio"
                        name="option1"
                        id="usRadio"
                        label="US"
                        checked={selecteUnitType === 1}
                        onChange={() => handleUnitType(1)}
                      />
                      <CustomRadio
                        disabled={false}
                        isError={false}
                        type="radio"
                        name="option1"
                        id="metricRadio"
                        label="METRIC"
                        checked={selecteUnitType === 2}
                        onChange={() => handleUnitType(2)}
                      />
                      <CustomRadio
                        disabled={false}
                        isError={false}
                        type="radio"
                        name="option1"
                        className="metric-radio"
                        id="userDefinedRadio"
                        label="User Defined"
                        checked={selecteUnitType === 3}
                        onChange={() => handleUnitType(3)}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} xs={5} className="default-units">
                    <StandardLinkButtonWithIcon
                      label="Make Units New Default"
                      padding="10px 0px 10px 24px"
                      onClick={handleOpenDefaultTech}
                      plusIcon={false}
                    />
                    <DefaultUnitsMessage
                      show={defaultTech}
                      close={handleCloseDefaultTech}
                      yes={MakeUnitNewDefault}
                    />
                  </Col>
                </Col>
                <Col lg={6} md={4} sm={4} xs={4} className="table-one">
                  <div className="unit-table">
                    <div className="unit-header-title left-header">
                      <span className="blank"></span>
                      <CustomHeading
                        fontFamily="DiodrumRegular"
                        label="US"
                        fontSize="12px"
                        fontWeight="400"
                        color={colors.GreyDB}
                        className="us-metric"
                      />
                      <CustomHeading
                        fontFamily="DiodrumRegular"
                        label="METRIC"
                        fontSize="12px"
                        fontWeight="400"
                        color={colors.GreyDB}
                        className="us-metric"
                      />
                    </div>
                    {unitData &&
                      unitData.length &&
                      unitData.map((u, index) => {
                        let metric = u.unitKey.filter(
                          (item) => item.uomsystemName === "Metric"
                        );
                        let us = u.unitKey.filter(
                          (item) => item.uomsystemName === "US"
                        );

                        let extraUs =
                          metric.length - us.length === 0
                            ? []
                            : Array(metric.length - us.length).fill(1);
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <div className="unit-child child-one">
                            {index <= 8 ? (
                              <>
                                <div className="unit-name" key={index}>
                                  {" "}
                                  {u.uomTypeName}
                                </div>
                                <div className="left-unit-wrapper">
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    index <=8 &&
                                    u.unitKey
                                      .filter(
                                        (item) => item.uomsystemName === "US"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <>
                                            <>
                                              <span
                                                onClick={() =>
                                                  handleUnitSelect(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="left-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </span>
                                            </>
                                          </>
                                        );
                                      })}
                                  {extraUs.map((item) => (
                                    <>
                                      <>
                                        <span
                                          id="left-pill"
                                          className="blank-unit water-filter-units"
                                        >
                                          -
                                        </span>
                                      </>
                                    </>
                                  ))}
                                </div>
                                <div className="right-unit-wrapper">
                                  {u.unitKey &&
                                    u.unitKey.length &&
                                    index <=8 &&
                                    u.unitKey
                                      .filter(
                                        (item) =>
                                          item.uomsystemName === "Metric"
                                      )
                                      .map((item) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <>
                                            <>
                                              <span
                                                onClick={() =>
                                                  handleUnitSelect(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="right-pill"
                                                className={`${
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                } smallPill`}
                                              >
                                                {item.uomName}
                                              </span>
                                            </>
                                          </>
                                        );
                                      })}
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                  </div>
                </Col>
                <Col lg={6} md={4} sm={4} xs={4} className="table-two">
                  <div className="unit-table">
                    <div className="unit-header-title right-header">
                      <span className="blank"></span>
                      <CustomHeading
                        fontFamily="DiodrumRegular"
                        label="US"
                        fontSize="12px"
                        fontWeight="400"
                        color={colors.GreyDB}
                        className="us-metric"
                      />
                      <CustomHeading
                        fontFamily="DiodrumRegular"
                        label="METRIC"
                        fontSize="12px"
                        fontWeight="400"
                        color={colors.GreyDB}
                      />
                    </div>
                    {unitData &&
                      unitData.length &&
                      unitData.map((u, index) => {
                        let metric = u.unitKey.filter(
                          (item) => item.uomsystemName === "Metric"
                        );
                        let us = u.unitKey.filter(
                          (item) => item.uomsystemName === "US"
                        );

                        let extraUs =
                          metric.length - us.length === 0
                            ? []
                            : Array(metric.length - us.length).fill(1);
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <div className="unit-child child-two">
                            {index > 8 ? (
                              <>
                                <div className="unit-name" key={index}>
                                  {u.uomTypeName}
                                </div>
                                <div className="left-right-wrapper">
                                  <div className="left-unit-wrapper">
                                    {u.unitKey &&
                                      u.unitKey.length &&
                                      index > 8 &&
                                      u.unitKey
                                        .filter(
                                          (item) => item.uomsystemName === "US"
                                        )
                                        .map((item) => {
                                          return (
                                            // eslint-disable-next-line react/jsx-key
                                            <>
                                              <span
                                                onClick={() =>
                                                  handleUnitSelect(
                                                    u.uomTypeID,
                                                    item
                                                  )
                                                }
                                                id="left-pill"
                                                className={
                                                  item.isSelected
                                                    ? "selected"
                                                    : "water-filter-units"
                                                }
                                              >
                                                {item.uomName}
                                              </span>
                                            </>
                                          );
                                        })}
                                    {extraUs.map((item) => (
                                      <>
                                        <>
                                          <span
                                            id="left-pill"
                                            className="blank-unit water-filter-units"
                                          >
                                            -
                                          </span>
                                        </>
                                      </>
                                    ))}
                                  </div>
                                  <div className="right-unit-wrapper">
                                    {u.unitKey &&
                                      u.unitKey.length &&
                                      index > 8 &&
                                      u.unitKey
                                        .filter(
                                          (item) =>
                                            item.uomsystemName === "Metric"
                                        )
                                        .map((item) => {
                                          return (
                                            // eslint-disable-next-line react/jsx-key
                                            <>
                                              <>
                                                <span
                                                  onClick={() =>
                                                    handleUnitSelect(
                                                      u.uomTypeID,
                                                      item
                                                    )
                                                  }
                                                  id="right-pill"
                                                  className={`${
                                                    item.isSelected
                                                      ? "selected"
                                                      : "water-filter-units"
                                                  } ${
                                                    [39, 38].includes(
                                                      item.uomId
                                                    )
                                                      ? "bigPill"
                                                      : "smallPill"
                                                  }`}
                                                >
                                                  {item.uomName}
                                                </span>
                                              </>
                                            </>
                                          );
                                        })}
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="create-page-footer g-0">
            <Col md={12} className="cancel-next-btn">
              <StandardPrimaryButton
                label="Apply"
                className="create-btn"
                onClick={applyTheChanges}
              />
              <CurrencyAndUnitsApplied
                show={currencyUnitApplied}
                close={handleCloseCurrencyUnit}
                childParentModal={setOpenModal}
              />
            </Col>
          </Row>
        </DynamicLoadder>
      </CurrencyUnitPopUpStyled>
    </>
  );
};

export default CurrencyUnitPopUp;
