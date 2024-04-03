/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Modal, Row } from "react-bootstrap";
import ArrowRightIcon from "../../../common/icons/ArrowRightIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import ProjectCostAndChemicalLibraryStyled from "./ProjectCostAndChemicalLibraryStyled";
import DefaultChemicalPrices from "./DefaultChemicalPrices";
import DefaultOperatingCost from "./DefaultOperatingCost";
import {  updateUnitFlag,updateUnitTypeSVolume,updateUnitTypeDensity
} from "../../../common/utils/GlobalUnitConversionSlice";
import CloseIconBig from "../../../common/icons/CloseIconBig";
import RightTickMarkIcon from "../../../common/icons/RightTickMarkIcon";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import { colors } from "../../../common/styles/Theme";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import ArrowRightBlackIcon from "../../../common/icons/ArrowRightBlackIcon";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardDashedButton from "../../../common/styles/components/buttons/standard/StandardDashedButton";
import { MyError } from "../../../common/utils/ErrorCreator";
import DeleteIcon from "../../../common/icons/DeleteIcon";
import CustomTooltip from "../../../common/styles/components/tooltip/CustomTooltip";
import LabelWithTooltip from "../../../common/styles/components/headings/LabelWithTooltip";
import DeleteIconBig from "../../../common/icons/DeleteIconBig";
import { useDispatch, useSelector } from "react-redux";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import DynamicLoadder from "../../../common/utils/DynamicLoadder";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import CustomeMessagePopup from "../../../common/utils/CustomeMessagePopup";
import PencilIconBlack from "../../../common/icons/PencilIconBlack";
import ChemInputWithIcon from "../../../common/styles/components/inputs/ChemInputWithIcon";
import { updateChemicalConfig } from "../../../common/ProjectInfoSlice";
import DefaultValueSaved from "./DefaultValueSaved";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";
import RightTickMarkBigIcon from "../../../common/icons/RightTickMarkBigIcon";
import EditSavedMessage from "./EditSavedMessage";

const defaultNewChemicalData = {
  iD: 0,
  isSystem: false,
  chemicalCat: "",
  chemicalName: "",
  symbol: "",
  displayName: "",
  bulkConcentration: 0,
  bulkDensity: 0,
  showDropDown: false,
  bulkPrice: 0,
  costType: "L",
  isDeleted: false,
};

const ProjectCostAndChemicalLibrary = ({ show, close, forUser }) => {
  //get data from store
  const projectName = useSelector(
    (state) => state.projectInfo?.data?.projectName
  );
  const { selectedUnits } = useSelector(
    (state) => state.projectInfo.projectConfig.unitConfig
  );
  const projectid = useSelector((state) => state.projectInfo?.data?.projectID);
  const userID = useSelector((state) => state.userInfo.data.UserId);
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
  const dispatch = useDispatch();
  const { projectTitle } = useSelector((state) => state.projectInfo);

  //css variables
  const [loadder, setLoadder] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  const [openChemicalPrices, setOpenChemicalPrices] = useState(false);
  const [openDefaultOperatingCost, setOpenDefaultOperatingCost] =
    useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openAddChemical, setOpenAddChemical] = useState(false);
  const [isError, setIsError] = useState({
    chemicalName: false,
    symbol: false,
    displayName: false,
    bulkConcentration: false,
    bulkDensity: false,
    bulkPrice: false,
  });
  const [isDisabled, setIsDisabeld] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isInEditMode, setIsInEditMod] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [disableBD, setDisableBD] = useState(false);

  //api variables
  const [getChemicalData, chemicalResponse] = useLazyGetAllDataQuery();
  const [getCurrencylist, currencyResponse] = useLazyGetAllDataQuery();
  const [getUnitlist, unitResponse] = useLazyGetAllDataQuery();
  const [getData, response] = useLazyGetAllDataQuery(); // to Call Api
  const [updateDataDefaultCost, updateDataResponse] = useUpdateDataMutation();
  const [updateChemicalDefu, updateChemicalResponse] = useUpdateDataMutation();
  const [updateData, updateResponse] = useUpdateDataMutation();

  //flags

  //data store
  const [newData, setNewData] = useState(defaultNewChemicalData); // New chemical Data
  const [currencyInfo, setCurrencyInfo] = useState({
    rawWater: 1,
    wasteWaterDisposal: 2,
    electricity: 3,
  });
  const [cAndCData, setCAndCData] = useState(null);
  const [chemicalList, setChemicalList] = useState([]);
  const [chemProperty, setChemProperty] = useState([]);
  const [chemicalData, setChemicalData] = useState([]);
  const [popupOperator, setPopupOperator] = useState({
    type: "",
    message: "",
    show: false,
  });
  const [currencyUnitFactor, setCurrencyUnitFactor] = useState(1);
  const [selectedCurrencyUnit, setSelectedCurrencyUnit] = useState("m³");

  //helper functions
  const getTarget = (cat) => {
    let data = validationFlag.find(
      (item) => item.chemicalCat.toLowerCase() === cat.toLowerCase()
    );
    return !data ? "NOT_FOUND" : data.target;
  };

  //to Save Response Data

  const [selectedChemical, setSelectedChemical] = useState("");
  const [showDropDownController, setShowDropDownController] = useState([]);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1);

  const [currencyUnit, setCurrencyUnit] = useState("$");
  const {
    unitFlag,
    unitTypeDensity,
    unitTypeSVolume,
  } = useSelector((state) => state.GUnitConversion);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  //constants
  const titleData = [
    { title: "Show in drop-down" },
    { title: "Chemical" },
    { title: "Symbol" },
    { title: "Chemical Name" },
    { title: "Chemical Category" },
    { title: "Bulk Concentration (%)" },
    {
      title: `Bulk Density (${selectedUnits[7] ? selectedUnits[7] : "lb/gal"})`,
    },
    { title: `Bulk Price (${currencyUnit})` },
    { title: "Cost Type" },
    { title: "Displayed as" },
    { title: "Actions" },
  ];
  const requiredValidation = ["Acid", "Base", "Oxidant", "Organic Acid","Salt","Coagulant"];
  const validationFlag = [
    { chemicalCat: "Acid", target: "acid" },
    { chemicalCat: "Base", target: "base" },
    { chemicalCat: "Oxidant", target: "oxidant" },
    { chemicalCat: "Organic Acid", target: "organicAcid" },
    { chemicalCat: "Salt", target: "salt" },
  ];
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  // get Data Api call
  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
    }
  }, [openModal]);

  useEffect(() => {
    if (show) {
      try {
        getData(
          `masterdata/api/v${1}/OperatingCostChemical?userid=${userID}${
            forUser ? "" : `&projectid=${projectid}`
          }`
        );
        getCurrencylist(
          `${"masterdata/api/v1/DefaultCurrency"}?userID=${userID}${
            forUser ? "" : `&projectid=${projectid}`
          }`
        );
        getUnitlist(
          `${"masterdata/api/v1/UnitOfMeassure"}?userID=${userID}${
            forUser ? "" : `&projectid=${projectid}`
          }`
        );
        getChemicalData(`masterdata/api/v${1}/ChemicalCategory`);
      } catch (error) {
        console.log(error);
      }
    }
  }, [show]);

  useEffect(() => {
    if (response.isLoading) {
      console.log("loading");
      setLoadder(true);
    }
    if (response.isError) {
      throw new MyError(
        "OperatingCostChemical Api Error",
        response.error.status,
        "ApiError"
      );
    }
    if (response.isSuccess) {
      let data = [];
      setCAndCData(response.data);
      response.data.lstChemicalVMs.map((item) => {
        data.push(item.showDropDown);
      });
      setShowDropDownController(data);
      const { rawWater, wasteWaterDisposal, electricity } = response.data;
      setCurrencyInfo({
        // rawWater:  (Number(GlobalUnitConversion(GlobalUnitConversionStore,rawWater,unit.selectedUnits[11],unitTypeSVolume).toFixed(2))),
        // wasteWaterDisposal: (Number(GlobalUnitConversion(GlobalUnitConversionStore,wasteWaterDisposal,unit.selectedUnits[11],unitTypeSVolume).toFixed(2))),
        // electricity: (Number(GlobalUnitConversion(GlobalUnitConversionStore,electricity,unit.selectedUnits[11],unitTypeSVolume).toFixed(2))),
        rawWater,
        wasteWaterDisposal,
        electricity,
      });

      setChemicalList(response.data.lstChemicalVMs);
      setLoadder(false);
    }
  }, [response]);

  useEffect(() => {
    if (
      response.isSuccess &&
      currencyResponse.isSuccess &&
      unitResponse.isSuccess
    ) {
      const { rawWater, wasteWaterDisposal, electricity } = response.data;
      let selectedData = currencyResponse.data.find((a) => a.isDefault);
      let exchangeRate = selectedData ? selectedData.currencyValue : 1;
      setCurrencyInfo({
        rawWater: Number(
          (rawWater * exchangeRate) / currencyUnitFactor
        ).toFixed(4),
        wasteWaterDisposal: Number(
          (wasteWaterDisposal * exchangeRate) / currencyUnitFactor
        ).toFixed(4),
        electricity: Number(electricity * exchangeRate).toFixed(4),
      });
    }
  }, [response, currencyResponse, unitResponse,currencyUnitFactor]);

  useEffect(() => {
    if (chemicalResponse.isFetching) {
      console.log("Manege case is in Loading");
    } else if (chemicalResponse.isLoading) {
      console.log("Manege case is in Loading");
    } else if (chemicalResponse.isSuccess) {
      console.log("Gopal", chemicalResponse.data);
      let Data = JSON.parse(JSON.stringify(chemicalResponse.data));
      setChemicalData(
        Data.lstChemCategory.sort((a, b) =>
          a.chemicalName.localeCompare(b.chemicalName)
        )
      );
      setChemProperty(Data.lstChemProperty);
    }
    if (chemicalResponse.isError) {
      throw new MyError(
        "OperatingCostChemical Api Error",
        chemicalResponse.error.status,
        "ApiError"
      );
    }
  }, [chemicalResponse]);

  useEffect(() => {
    if (unitResponse) {
      console.log("Loading");
    }
    if (unitResponse.isSuccess) {
      let data = unitResponse.data
        .find((item) => item.uomTypeID == 11)
        .unitKey.find((item) => item.isSelected);

      let unitName = data.uomName === "gal" ? "Kgal" : data.uomName;
      switch (data.uomId) {
        case 21:
          setCurrencyUnitFactor(0.2642);
          break;
        case 22:
          setCurrencyUnitFactor(1000);
          break;
        case 23:
          setCurrencyUnitFactor(1000000);
          break;
        case 24:
          setCurrencyUnitFactor(1);
          break;
        default:
          break;
      }
      setSelectedCurrencyUnit(unitName);
    }
  }, [unitResponse]);
  useEffect(() => {
    if (currencyResponse.isFetching) {
      console.log("Manege case is in Loading");
    } else if (currencyResponse.isLoading) {
      console.log("Manege case is in Loading");
    } else if (currencyResponse.isSuccess) {
      console.log("Gopal", currencyResponse.data);
      let selectedData = currencyResponse.data.find((a) => a.isDefault);

      let currencyName = selectedData
        ? selectedData.currencyName
            .replace("(", " ")
            .replace(")", "")
            .split(" ")
        : ["$"];
      currencyName = currencyName[currencyName.length - 1];
      setCurrencyUnit(currencyName);
      setExchangeRate(selectedData ? selectedData.currencyValue : 1);
    }
    if (currencyResponse.isError) {
      throw new MyError(
        "OperatingCostChemical Api Error",
        currencyResponse.error.status,
        "ApiError"
      );
    }
  }, [currencyResponse]);

  useEffect(() => {
    let data = [];
    if (chemicalList) {
      chemicalList.map((item) => {
        data.push(item.showDropDown);
      });
      setShowDropDownController(data);
    }
  }, [chemicalList]);

  useEffect(() => {
    if (updateResponse.isFetching) {
      console.log("Manege case is in Loading");
    } else if (updateResponse.isLoading) {
      console.log("Manege case is in Loading");
    } else if (updateResponse.isSuccess) {
      setOpenSuccessMessage(true);
      dispatch(
        updateChemicalConfig({
          rawWater: Number(
            (currencyInfo.rawWater * currencyUnitFactor) / exchangeRate
          ),
          wasteWaterDisposal: Number(
            (currencyInfo.wasteWaterDisposal * currencyUnitFactor) /
              exchangeRate
          ),
          electricity: Number(currencyInfo.electricity / exchangeRate),
          lstChemicalVMs: chemicalList,
        })
      );
    }
    if (updateResponse.isError) {
      setPopupOperator({
        type: "error",
        message: "Something went wrong please try again.",
        show: true,
      });
    }
  }, [updateResponse]);
  useEffect(() => {
    // if (unitFlag) {
     
      // GlobalUnitConversion(
      //   GlobalUnitConversionStore,
      //   responseIXDetails.data.space_velocity_txt,
      //   unit.selectedUnits[10],
      //   "BV/h"
      setCurrencyInfo({
        rawWater:  (Number(GlobalUnitConversion(GlobalUnitConversionStore,currencyInfo.rawWater,unit.selectedUnits[11],"m³").toFixed(2))),
        wasteWaterDisposal: (Number(GlobalUnitConversion(GlobalUnitConversionStore,currencyInfo.wasteWaterDisposal,unit.selectedUnits[11],"m³").toFixed(2))),
        electricity: (Number(GlobalUnitConversion(GlobalUnitConversionStore,currencyInfo.electricity,unit.selectedUnits[11],"m³").toFixed(2))),
      });
    //  console.log("PK chemicalList",chemicalList);
    //  let list=[...chemicalList];
    //   const newList = list.map((item, index) => {
    //     console.log("PK item,index",item.bulkDensity,unit.selectedUnits[7],unitTypeDensity);
    //     let bulkDensity=GlobalUnitConversion(GlobalUnitConversionStore,item.bulkDensity,unit.selectedUnits[7],unitTypeDensity);
    //    console.log("PK bulkDensity",bulkDensity);
    //     return { ...item, ["bulkDensity"]: Number.parseFloat(bulkDensity).toFixed(2)};
    //       });
    //       console.log("PK bulkDensity newList ",newList);
    //     setChemicalList(
    //       newList
    //     //   {
    //     //     bulkConcentration:element.bulkConcentration,
    //     //     bulkDensity:(Number(GlobalUnitConversion(GlobalUnitConversionStore,element.bulkDensity,unit.selectedUnits[7],unitTypeDensity).toFixed(2))),
    //     //     bulkPrice:element.bulkPrice,
    //     //     chemicalCat:element.chemicalCat,
    //     //     chemicalName:element.chemicalName,
    //     //     costType:element.costType,
    //     //     displayName:element.displayName,
    //     //     iD:element.iD,
    //     //     isDeleted:element.isDeleted,
    //     //     isSystem:element.isSystem,
    //     //     showDropDown:element.showDropDown,
    //     //     symbol:element.symbol
    //     // }
    //   );
    //  console.log("chemicalList",chemicalList);
    //   chemicalList?.forEach((element) => {
    //     setChemicalList((current) => [
    //       ...current,
    //       {
    //         bulkConcentration:element.bulkConcentration,
    //         bulkDensity:(Number(GlobalUnitConversion(GlobalUnitConversionStore,element.bulkDensity,unit.selectedUnits[7],unitTypeDensity).toFixed(2))),
    //         bulkPrice:element.bulkPrice,
    //         chemicalCat:element.chemicalCat,
    //         chemicalName:element.chemicalName,
    //         costType:element.costType,
    //         displayName:element.displayName,
    //         iD:element.iD,
    //         isDeleted:element.isDeleted,
    //         isSystem:element.isSystem,
    //         showDropDown:element.showDropDown,
    //         symbol:element.symbol
    //     }
    //   ]);
    // });
      dispatch(updateUnitTypeSVolume(unit.selectedUnits[11]));
      dispatch(updateUnitTypeDensity(unit.selectedUnits[7]));
      dispatch(updateUnitFlag(false));
    // }
    },[unit.selectedUnits]);
  //change function for input tags

  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };

  //---------------------------------------------------------
  //css functions
  const handleClose = () => {
    setOpenModal(false);
    setOpenAddChemical(false);
  };
  const handleOpenChemicalPrice = () => {
    setOpenChemicalPrices(true);
  };
  const handleOpenDefaultOperatingCost = () => {
    setOpenDefaultOperatingCost(true);
  };

  //open new chemical tab
  const handleOpenAddChemical = () => {
    setOpenAddChemical(true);
    setNewData(defaultNewChemicalData);
    setIsError({
      chemicalName: false,
      symbol: false,
      displayName: false,
      bulkConcentration: false,
      bulkDensity: false,
      bulkPrice: false,
    });
  };

  //close new chemical tab
  const handleCloseAddChemical = () => {
    setOpenAddChemical(false);
    setNewData(defaultNewChemicalData);
  };

  //handle change value function
  const handleChangeCurrency = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setCurrencyInfo({ ...currencyInfo, [name]: value });
    }
  };

  const handleShowDropDown = (e) => {
    const { checked, name } = e.target;
    const [cat, id, key] = name.split("|");

    console.log("kdfjbdf", cat, id, key);
    if (requiredValidation.includes(cat) && !checked) {
      let canRemove =
        chemicalList.filter(
          (item) => item.chemicalCat == cat && item.showDropDown
        ).length > 1;

      console.log("steps", "2.", canRemove);
      if (canRemove) {
        setChemicalList((prev) =>
          prev.map((chem, index) => {
            if (id == 0) {
              if (key == index) {
                chem = { ...chem, showDropDown: checked };
              }
            } else {
              if (chem.iD == id) {
                chem = { ...chem, showDropDown: checked };
              }
            }

            return chem;
          })
        );
      } else {
        setPopupOperator({
          type: "warning",
          message: `Please, select at least one ${cat} chemical under first column.`,
          show: true,
        });
      }
    } else {
      setChemicalList((prev) =>
        prev.map((chem, index) => {
          if (id == 0) {
            if (key == index) {
              chem = { ...chem, showDropDown: checked };
            }
          } else {
            if (chem.iD == id) {
              chem = { ...chem, showDropDown: checked };
            }
          }

          return chem;
        })
      );
    }
  };

  const handleCLoseOperator = () => {
    setPopupOperator({
      show: false,
      message: "",
      type: "",
    });
  };

  const handleSaveNewChem = () => {
    const getDulkCon = (name, value) => {
      let data = [
        "Hydrochloric Acid",
        "Sodium Chloride",
        "Sodium Hydroxide",
        "Sodium Carbonate",
        "Sodium Hypochlorite"
      ];
      if (!name || !value) {
        return true;
      } else {
        if (data.includes(name)) {
          setPopupOperator({
            type: "error",
            message: `For ${name} the bulk concentration value between 0 - 50%`,
            show: value < 1 || value > 50,
          });
          return value < 1 || value > 50;
        } else {
          setPopupOperator({
            type: "error",
            message: `For ${name} the bulk concentration value between 0 - 100%`,
            show: value < 1 || value > 100,
          });
          return value < 1 || value > 100;
        }
      }
    };
    let whichHasError = {
      chemicalName: !newData.chemicalName,
      symbol: !newData.symbol,
      displayName: !newData.displayName,
      bulkConcentration:
        !newData.bulkConcentration ||
        newData.bulkConcentration < 1 ||
        getDulkCon(newData.chemicalName, newData.bulkConcentration),
      bulkDensity: !newData.bulkDensity || newData.bulkDensity < 0,
      bulkPrice: !newData.bulkPrice || newData.bulkPrice < 0,
    };
    let hasError = Object.values(whichHasError).find((item) => item);
    if (hasError) {
      setIsError(whichHasError);
    } else {
      setIsError({
        chemicalName: false,
        symbol: false,
        displayName: false,
        bulkConcentration: false,
        bulkDensity: false,
        bulkPrice: false,
      });
      const isExist = chemicalList.find(
        (item) =>
          item.chemicalName == newData.chemicalName &&
          item.bulkConcentration == newData.bulkConcentration
      );
      if (isInEditMode) {
        setChemicalList((prev) =>
          prev.map((item, index) => {
            if (index === selectedIndex) {
              return {
                ...newData,
                bulkPrice: newData.bulkPrice / exchangeRate,
              };
            } else {
              return item;
            }
          })
        );
        setOpenAddChemical(false);
        setIsInEditMod(false);
        setSelectedIndex(-1);
      } else {
        if (isExist) {
          setPopupOperator({
            type: "error",
            message: `Bulk Concentration ${newData.bulkConcentration} is already present for ${newData.chemicalName}.`,
            show: true,
          });
        } else {
          setChemicalList([
            ...chemicalList,
            { ...newData, bulkPrice: newData.bulkPrice / exchangeRate },
          ]);
          setOpenAddChemical(false);
        }
      }
    }
  };

  const handleNumberValue = (e) => {
    const { value, name } = e.target;
    if (!isNaN(value)) {
      setIsError({
        chemicalName: false,
        symbol: false,
        displayName: false,
        bulkConcentration: false,
        bulkDensity: false,
        bulkPrice: false,
      });
      if (name == "bulkConcentration" && newData.symbol) {
        let bulkDensity = newData.bulkDensity;
        if (name == "bulkConcentration") {
          bulkDensity = calculateBulkDesityt(value);
        }
        setNewData({
          ...newData,
          [name]: value,
          displayName: `${newData.symbol} (${value}%)`,
          bulkDensity: bulkDensity,
        });
      } else {
        setNewData({ ...newData, [name]: value });
      }
    }
  };
  const handleTextValue = (e) => {
    const { value, name } = e.target;
    setIsError({
      chemicalName: false,
      symbol: false,
      displayName: false,
      bulkConcentration: false,
      bulkDensity: false,
      bulkPrice: false,
    });
    if (name == "symbol") {
      setNewData({
        ...newData,
        [name]: value,
        displayName: `${value} (${newData.bulkConcentration}%)`,
      });
    } else {
      setNewData({ ...newData, [name]: value });
    }
  };
  const handleInputChemical = (e) => {
    const selectedChemicalName = e.target.value;
    const chemicalIncluded = [
      "Dechlorinator",
      "Organic Acid",
      "Oxidant",
      "Coagulant",
      "Antiscalant",
      "Salt",
      "Base",
      "Surfactant",
      "Acid",
    ];
    const isChemicalIncluded = chemicalIncluded.includes(e.target.value);
    setSelectedChemical(selectedChemicalName);
    const selectedChemicalObj = chemicalData.find(
      (chemical) => chemical.chemicalName === selectedChemicalName
    );

    if (selectedChemicalName === "Chemical") {
      setNewData(defaultNewChemicalData);
      setDisableBD(false);
    } else if (isChemicalIncluded) {
      setNewData({
        ...defaultNewChemicalData,
        symbol: "",
        displayName: "",
        costType: "L",
        chemicalCat: selectedChemicalObj?.chemicalCat,
        chemicalName: selectedChemicalObj?.chemicalName,
        bulkConcentration: selectedChemicalObj?.bulkConcentration,
        bulkDensity: selectedChemicalObj?.bulkDensity,
        bulkPrice: selectedChemicalObj?.bulkPrice,
      });
      setIsDisabeld(false);
      setDisableBD(false);
    } else {
      // setSelectedChemicalObject(selectedChemicalObj);
      setDisableBD([7, 8, 9, 10, 4].includes(selectedChemicalObj.iD));
      setNewData({
        ...defaultNewChemicalData,
        chemicalCat: selectedChemicalObj?.chemicalCat,
        chemicalName: selectedChemicalObj?.chemicalName,
        bulkConcentration: selectedChemicalObj?.bulkConcentration,
        bulkDensity: selectedChemicalObj?.bulkDensity,
        bulkPrice: selectedChemicalObj?.bulkPrice,
        costType: "L",
        symbol: selectedChemicalObj?.symbol,
        displayName: selectedChemicalObj?.displayName,
      });
      setIsDisabeld(true);
    }
  };

  const handleNewChemChek = (e) => {
    const { name, checked } = e.target;
    setNewData({ ...newData, [name]: checked });
  };

  const checkIfListIsValid = () => {
    let errorsList = [];
    requiredValidation.map((item) => {
      let hasChem = chemicalList.find(
        (chem) => chem.chemicalCat == item && chem.showDropDown
      );
      if (!hasChem) {
        errorsList.push(
          `Please, select at least one ${item} chemical under first column.`
        );
      }
    });
    return errorsList;
  };

  const handleSaveData = () => {
    let errorList = checkIfListIsValid();
    if (errorList.length > 0) {
      setPopupOperator({ type: "warning", message: errorList[0], show: true });
    } else {
      let sendData = {
        Method: "masterdata/api/v1/OperatingCostData",
        userID: userID,
        projectID: projectid,
        rawWater: Number(
          (currencyInfo.rawWater * currencyUnitFactor) / exchangeRate
        ),
        wasteWaterDisposal: Number(
          (currencyInfo.wasteWaterDisposal * currencyUnitFactor) / exchangeRate
        ),
        electricity: Number(currencyInfo.electricity / exchangeRate),
        lstChemicalVMs: chemicalList,
      };
      if (forUser) {
        updateDefaultCost();
        updateCPD();
        setOpenSuccessMessage(true);
      } else {
        updateData(sendData);
      }
    }
  };

  const updateDefaultCost = () => {
    updateDataDefaultCost({
      Method: "masterdata/api/v1/MakeDefaultOperationRawCosts",
      rawWater: Number(
        (currencyInfo.rawWater * currencyUnitFactor) / exchangeRate
      ),
      wasteWaterDisposal: Number(
        (currencyInfo.wasteWaterDisposal * currencyUnitFactor) / exchangeRate
      ),
      electricity: Number(currencyInfo.electricity / exchangeRate),
      lstChemicalVMs: chemicalList,
      userID: userID,
    });
    setDefaultValueSaved(true);
  };

  const calculateBulkDesityt = (bulkConc) => {
    // const selectedChemicalName = selectedChemical;
    const chemicalIncluded = [
      "Dechlorinator",
      "Organic Acid",
      "Oxidant",
      "Coagulant",
      "Antiscalant",
      "Salt",
      "Base",
      "Acid",
      "Surfactant",
    ];
    const isChemicalIncluded = chemicalIncluded.includes(newData.chemicalName);

    const selectedChemicaliD = chemicalData.find(
      (chemical) => chemical.chemicalName === newData.chemicalName
    ).iD;
    const objChemProperties = chemProperty.find(
      (chem) => chem.chemicalId === selectedChemicaliD
    );

    // const objChemProperties = chemData;

    let specific_Gravity = 0;
    let temprature = 25;
    let bulkConc_per = 0;
    let molecularWeight = 0;

    let CSA = 0;
    let CSB = 0;
    let CSC = 0;
    let CSD = 0;
    let CSE = 0;

    let CSBP = 0;
    let CSCP = 0;
    let CSDP = 0;
    let CSEP = 0;

    if (!isChemicalIncluded && objChemProperties) {
      bulkConc_per = bulkConc;

      //MGPP Item #1401 - Start
      CSA =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_A
          : 0;
      CSB =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_B
          : 0;
      CSC =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_C
          : 0;
      CSD =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_D
          : 0;
      CSE =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_E
          : 0;
      CSBP =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_BPrime
          : 0;
      CSCP =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_CPrime
          : 0;
      CSDP =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_DPrime
          : 0;
      CSEP =
        objChemProperties.coeff_SpecGravity_A != null
          ? objChemProperties.coeff_SpecGravity_EPrime
          : 0;
      //MGPP Item #1401 - End

      molecularWeight = objChemProperties.molecularWeight;

      if (bulkConc_per <= 50) {
        //MGPP Item #1401

        let avPitzer = Math.exp(
          0.411276653 +
            0.008251869 * temprature +
            0.0000162678 * Math.pow(temprature, 2)
        );
        let specific_Gravity = 0;
        let Conc_molal =
          ((bulkConc_per / 100 / (1 - bulkConc_per / 100)) * 1000) /
          molecularWeight;
        let Volume =
          CSA +
          (CSB / 1.2) *
            avPitzer *
            Math.log(1 + 1.2 * Math.sqrt(CSB * Conc_molal)) +
          CSC * Conc_molal +
          CSD * Math.pow(Conc_molal, 2) +
          CSE * Math.pow(Conc_molal, 3);

        const density_water =
          (999.83952 +
            16.945176 * temprature +
            -0.0079870401 * Math.pow(temprature, 2) +
            -0.000046170461 * Math.pow(temprature, 3) +
            0.00000010556302 * Math.pow(temprature, 4) +
            -2.8054253e-10 * Math.pow(temprature, 5)) /
          (1 + 0.01687985 * temprature);

        specific_Gravity =
          (1000 + Conc_molal * molecularWeight) /
          (1000 + ((Conc_molal * density_water) / 1000) * Volume);
        console.log(
          "bulkDensity",
          avPitzer,
          Conc_molal,
          Volume,
          density_water,
          specific_Gravity
        );
        const bulkDensity = specific_Gravity;
        console.log("bulkDensity", bulkDensity);

        return bulkDensity;
      } else {
        if (selectedChemicaliD == 7) {
          specific_Gravity =
            CSBP +
            CSCP * bulkConc_per +
            CSDP * Math.pow(bulkConc_per, 2) +
            CSEP * Math.pow(bulkConc_per, 3);
          const bulkDensity = Number(specific_Gravity).toFixed(4);
          console.log("bulkDensity", bulkDensity);

          return bulkDensity;
        } else {
          specific_Gravity = newData.bulkDensity; //MGPP Item #1401
          const bulkDensity = Number(specific_Gravity).toFixed(4);
          console.log("bulkDensity", bulkDensity);

          return bulkDensity;
        }
      }
    }
    return newData.bulkDensity;
  };

  const updateCPD = () => {
    updateChemicalDefu({
      userID: userID,
      Method: "masterdata/api/v1/MakeDefaultChemicals",
      rawWater: Number(
        (currencyInfo.rawWater * currencyUnitFactor) / exchangeRate
      ),
      wasteWaterDisposal: Number(
        (currencyInfo.wasteWaterDisposal * currencyUnitFactor) / exchangeRate
      ),
      electricity: Number(currencyInfo.electricity / exchangeRate),
      lstChemicalVMs: chemicalList,
    });
    setOpenChemicalPrices(false);
    setDefaultValueSaved(true);
  };

  const handleEditChemical = (data, index) => {
    setNewData(data);
    setOpenAddChemical(true);
    setIsInEditMod(true);
    setSelectedIndex(index);
  };

  const deleteTheChemical = (index) => {
    let existData = chemicalList[index];
    if (
      existData.showDropDown &&
      requiredValidation.includes(existData.chemicalCat)
    ) {
      let canBeDelete =
        chemicalList.filter(
          (item) =>
            item.showDropDown && item.chemicalCat == existData.chemicalCat
        ).length > 1;
      if (canBeDelete) {
        setChemicalList((prev) => prev.filter((item, ind) => ind !== index));
      } else {
        setPopupOperator({
          type: "warning",
          message: `Please, select at least one ${existData.chemicalCat} chemical under first column.`,
          show: true,
        });
      }
    } else {
      setChemicalList((prev) => prev.filter((item, ind) => ind !== index));
    }
  };

  return (
    <>
      <ProjectCostAndChemicalLibraryStyled
        show={show && openModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header>
          <Modal.Title>
            <CustomHeading
              label="Chemical Library and Operating Costs"
              color={colors.SecondaryElfGreen}
              fontFamily="DiodrumSemiBold"
              fontSize="16px"
              fontWeight="600"
            />
             {/* ${forUser ? "user account preference":`project ${projectTitle}`}. Only select chemicals are shown below`} */}
            <CustomHeading
              label={`Add chemicals as per your need and update operating cost for
                   ${forUser ? "user account preference":`project ${projectTitle}`}.`}
              color={colors.blackTransparency045}
              fontFamily="DiodrumRegular"
              fontSize="12px"
              fontWeight="400"
              className="subtitle"
            ></CustomHeading>{" "}
          </Modal.Title>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <DynamicLoadder isLoading={loadder}>
            <StyledCard className="operating-cost-card">
              <div className="operating-cost-title">
                <CustomHeading
                  label="Operation Cost"
                  fontFamily="DiodrumRegular"
                  fontSize="14px"
                  color={colors.PrimaryDarkAquaMarine}
                  fontWeight="400"
                />

                <StandardLinkButtonWithIcon
                  plusIcon={false}
                  id="defaultBtn"
                  label="Make costs as New Default"
                  onClick={handleOpenDefaultOperatingCost}
                ></StandardLinkButtonWithIcon>

                <DefaultOperatingCost
                  show={openDefaultOperatingCost}
                  close={setOpenDefaultOperatingCost}
                  yes={updateDefaultCost}
                />
              </div>
              <div className="water-type-wrapper">
                <div className="raw-water">
                  <CustomHeading
                    label="Raw Water"
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    color={colors.Black}
                    fontWeight="400"
                  />

                  <InputWithIcon
                    disabled={false}
                    placeholder="0"
                    type="text"
                    isError={
                      !currencyInfo.rawWater || currencyInfo.rawWater < 0
                    }
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("rawWater")}
                    name="rawWater"
                    isFocused={isFocused === "rawWater"}
                    inputText={
                      !currencyInfo.rawWater || currencyInfo.rawWater < 0 ? (
                        <CloseCircleRedIcon />
                      ) : (
                        <CloseCircleGreenIcon />
                      )
                    }
                    value={
                      isFocused === "rawWater"
                        ? currencyInfo.rawWater
                        : `${Number(currencyInfo.rawWater).toFixed(
                            4
                          )} ${currencyUnit.toString()}/${selectedCurrencyUnit}`
                    }
                    unitBgColor="transparent"
                    onChange={handleChangeCurrency}
                  />
                  <ErrorMessage
                    errorIcon={true}
                    style={{
                      visibility:
                        !currencyInfo.rawWater || currencyInfo.rawWater < 0
                          ? "visible"
                          : "hidden",
                    }}
                    texMsg="Input Required"
                  />
                </div>
                <div className="waste-water">
                  <CustomHeading
                    label="Waste Water Disposal"
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    color={colors.Black}
                    fontWeight="400"
                  />
                  <InputWithIcon
                    disabled={false}
                    isError={
                      !currencyInfo.wasteWaterDisposal ||
                      currencyInfo.wasteWaterDisposal < 0
                    }
                    inputText={
                      !currencyInfo.wasteWaterDisposal ||
                      currencyInfo.wasteWaterDisposal < 0 ? (
                        <CloseCircleRedIcon />
                      ) : (
                        <CloseCircleGreenIcon />
                      )
                    }
                    type="text"
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("wasteWaterDisposal")}
                    isFocused={isFocused === "wasteWaterDisposal"}
                    name="wasteWaterDisposal"
                    unitBgColor="transparent"
                    value={
                      isFocused === "wasteWaterDisposal"
                        ? currencyInfo.wasteWaterDisposal
                        : `${Number(currencyInfo.wasteWaterDisposal).toFixed(
                            4
                          )} ${currencyUnit.toString()}/${selectedCurrencyUnit}`
                    }
                    onChange={handleChangeCurrency}
                  />
                  <ErrorMessage
                    errorIcon={true}
                    style={{
                      visibility:
                        !currencyInfo.wasteWaterDisposal ||
                        currencyInfo.wasteWaterDisposal == 0
                          ? "visible"
                          : "hidden",
                    }}
                    texMsg="Input Required"
                  />
                </div>
                <div className="electricity">
                  <CustomHeading
                    label="Electricity"
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    color={colors.Black}
                    fontWeight="400"
                  />

                  <InputWithIcon
                    disabled={false}
                    isError={
                      !currencyInfo.electricity || currencyInfo.electricity == 0
                    }
                    type="text"
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("electricity")}
                    isFocused={isFocused === "electricity"}
                    name="electricity"
                    inputText={
                      !currencyInfo.electricity ||
                      currencyInfo.electricity == 0 ? (
                        <CloseCircleRedIcon />
                      ) : (
                        <CloseCircleGreenIcon />
                      )
                    }
                    unitBgColor="transparent"
                    value={
                      isFocused === "electricity"
                        ? currencyInfo.electricity
                        : `${Number(currencyInfo.electricity).toFixed(
                            4
                          )} ${currencyUnit.toString()}/kWh`
                    }
                    onChange={handleChangeCurrency}
                  />
                  <ErrorMessage
                    errorIcon={true}
                    style={{
                      visibility:
                        !currencyInfo.electricity ||
                        currencyInfo.electricity == 0
                          ? "visible"
                          : "hidden",
                    }}
                    texMsg="Input Required"
                  />
                </div>
              </div>
            </StyledCard>
            <div className="g-0 header-row">
              {titleData.map((item, index) => (
                <div className="header-title" key={index}>
                  <CustomHeading
                    label={item.title}
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    color={colors.Black}
                    fontWeight="700"
                  />
                </div>
              ))}
            </div>
            <div className="chem-cost-data-wrapper" tabIndex="0">
              {chemicalList.map(
                (data, index) =>
                  !data.isDeleted && (
                    <div className="chemical-details-row" key={index}>
                      <div className="chemical-label">
                        <CustomRadioCheck
                          type="checkbox"
                          name={`${data.chemicalCat}|${data.iD}|${index}`}
                          id={data.iD}
                          key={index}
                          checked={showDropDownController[index]}
                          onChange={handleShowDropDown}
                        />
                      </div>
                      <div className="chemical-label">
                        <LabelWithTooltip
                          toolTipText={true}
                          label={data.chemicalName}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <LabelWithTooltip
                          toolTipText={true}
                          label={data.symbol}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <LabelWithTooltip
                          toolTipText={true}
                          label={data.chemicalName}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <CustomHeading
                          label={data.chemicalCat}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <CustomHeading
                          label={Number(data.bulkConcentration).toFixed(2)}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <CustomHeading
                          label={(Number(GlobalUnitConversion(GlobalUnitConversionStore,data.bulkDensity,unit.selectedUnits[7],"g/cm³").toFixed(4)))}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <CustomHeading
                          label={Number(data.bulkPrice * exchangeRate).toFixed(
                            2
                          )}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <CustomHeading
                          label={data.costType}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        <LabelWithTooltip
                          toolTipText={true}
                          label={data.displayName}
                          fontFamily="DiodrumRegular"
                          fontSize="14px"
                          color={colors.Black}
                          fontWeight="400"
                        />
                      </div>
                      <div className="chemical-label">
                        {data.isSystem ? (
                          <CustomHeading
                            label="-"
                            fontFamily="DiodrumRegular"
                            fontSize="14px"
                            color={colors.Black}
                            fontWeight="400"
                          />
                        ) : (
                          <>
                            <Button
                              id="closeBtn"
                              onClick={() => deleteTheChemical(index)}
                            >
                              <DeleteIconBig />
                            </Button>
                            <Button
                              id="closeBtn"
                              onClick={() => handleEditChemical(data, index)}
                            >
                              <PencilIconBlack />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="add-btn-div">
              <div className="new-data-wrapper" tabIndex="0">
                {openAddChemical ? (
                  <Row className="input-field-row">
                    <div className="chemical-input-field">
                      <CustomRadioCheck
                        disabled={false}
                        isError={false}
                        type="checkbox"
                        id="checkbox"
                        name="showDropDown"
                        checked={newData.showDropDown}
                        onChange={handleNewChemChek}
                      />
                    </div>
                    <div className="chemical-input-field">
                      <CustomSelect
                        type=""
                        id="inputField"
                        placeholder="Chemical"
                        onChange={handleInputChemical}
                        value={newData.chemicalName}
                      >
                        <option>Chemical</option>
                        {chemicalData
                          .sort((a, b) =>
                            a.chemicalName.localeCompare(b.chemicalName)
                          )
                          .map((item) => (
                            <option value={item.chemicalName}>
                              {item.chemicalName}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={isDisabled}
                        isError={isError.symbol}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(5)}
                        isFocused={isFocused === 5}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Symbol"
                        name="symbol"
                        value={newData.symbol}
                        onChange={(e) =>
                          !selectedChemical ? null : handleTextValue(e)
                        }
                      />
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={isDisabled}
                        isError={isError.chemicalName}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(6)}
                        isFocused={isFocused === 6}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Chemical Name"
                        name="chemicalName"
                        value={newData.chemicalName}
                        onChange={handleTextValue}
                      />
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={true}
                        isError={false}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(4)}
                        isFocused={isFocused === 4}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Chemical Category"
                        name="chemicalCat"
                        value={newData.chemicalCat}
                        onChange={handleTextValue}
                      />
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={false}
                        isError={isError.bulkConcentration}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(8)}
                        isFocused={isFocused === 8}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Concentration"
                        name="bulkConcentration"
                        value={
                          isFocused === 8
                            ? newData.bulkConcentration
                            : Number(newData.bulkConcentration).toFixed(2)
                        }
                        onChange={handleNumberValue}
                      />
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={disableBD}
                        isError={isError.bulkDensity}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(9)}
                        isFocused={isFocused === 9}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Density"
                        name="bulkDensity"
                        onChange={handleNumberValue}
                        value={
                          isFocused === 9
                            ? newData.bulkDensity
                            : (Number(GlobalUnitConversion(GlobalUnitConversionStore,newData.bulkDensity,unit.selectedUnits[7],"g/cm³").toFixed(4)))
                        }
                      />
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={false}
                        isError={isError.bulkPrice}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(10)}
                        isFocused={isFocused === 10}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Price"
                        name="bulkPrice"
                        onChange={handleNumberValue}
                        value={
                          isFocused === 10
                            ? newData.bulkPrice
                            : Number(newData.bulkPrice).toFixed(2)
                        }
                      />
                    </div>
                    <div className="chemical-input-field">
                      <CustomSelect
                        type=""
                        id="inputField"
                        name="costType"
                        onChange={handleTextValue}
                        value={newData.costType}
                      >
                        <option>gal</option>
                        <option>lb</option>
                        <option>Kg</option>
                        <option>L</option>
                      </CustomSelect>
                    </div>
                    <div className="chemical-input-field">
                      <ChemInputWithIcon
                        disabled={isDisabled}
                        isError={isError.displayName}
                        type="text"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(11)}
                        isFocused={isFocused === 11}
                        id="inputField"
                        inputText={<CloseCircleGreenIcon />}
                        unitBgColor="transparent"
                        placeholder="Displayed as"
                        name="displayName"
                        value={newData.displayName}
                        onChange={handleTextValue}
                      />
                    </div>
                    <div className="chemical-input-field cross_tick_icon">
                      <Button
                        onClick={handleCloseAddChemical}
                        onMouseEnter={() => setMouseEnter(true)}
                        onMouseLeave={() => setMouseEnter(false)}
                        id="closeBtn"
                      >
                        {mouseEnter ? <DeleteIconBig /> : <CloseIconBig />}
                      </Button>
                      <Button id="tickBtn" onClick={handleSaveNewChem}>
                        <RightTickMarkBigIcon />
                      </Button>
                    </div>
                  </Row>
                ) : (
                  ""
                )}
              </div>
              <StandardDashedButton
                label="Add Chemical"
                className="add-chemical-button"
                id="addBtn"
                onClick={handleOpenAddChemical}
                disabled={openAddChemical}
              />
            </div>
          </DynamicLoadder>
        </Modal.Body>
        <Modal.Footer>
          <StandardLinkButtonWithIcon
            label="Make Chemical Prices as New Default"
            plusIcon={false}
            id="btnDefault"
            onClick={handleOpenChemicalPrice}
            disabled={false}
          ></StandardLinkButtonWithIcon>

          <DefaultChemicalPrices
            show={openChemicalPrices}
            close={setOpenChemicalPrices}
            yes={updateCPD}
          />
          <StandardPrimaryButton
            label="Save"
            disabled={false}
            id="btnSave"
            onClick={() => handleSaveData()}
          ></StandardPrimaryButton>
          <EditSavedMessage
            show={openSuccessMessage}
            close={setOpenSuccessMessage}
            parentModal={setOpenModal}
          />
        </Modal.Footer>
        <CustomeMessagePopup
          operator={popupOperator}
          close={handleCLoseOperator}
        />
        <DefaultValueSaved
          show={defaultValueSaved}
          close={setDefaultValueSaved}
          parentModal={setDefaultValueSaved}
        />
      </ProjectCostAndChemicalLibraryStyled>
    </>
  );
};

export default ProjectCostAndChemicalLibrary;
