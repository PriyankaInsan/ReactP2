// export default CreateNewProjectModal;
/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Col, Row, Dropdown, Table, InputGroup } from "react-bootstrap";
import CreateProjectRightArrowIcon from "../../common/icons/CreateProjectRightArrowIcon";
import RequiredFieldIcon from "../../common/icons/RequiredFieldIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Overlay } from "./CreateFolderStyled";
import CreateNewProjectModalStyled from "./CreateNewProjectModalStyled";
import CreateProjectPageThreeStyled from "./CreateProjectPageThreeStyled";
import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ArrowRightIcon from "../../common/icons/ArrowRightIcon";
import CreateProjectPageOneStyled from "./CreateProjectPageoneStyled";
import CreateProjectPageTwoStyled from "./CreateProjectPageTwoStyled";
import { useCreateDataMutation } from "../../services/apiConfig";
import { useDispatch } from "react-redux";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import Michigan from "../modals/usa-flag.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FeedWaterHome from "../../features/feedwater/FeedWaterHome";
import * as z from "zod";
import SmallLoader from "../../common/utils/SmallLoader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { codenumbers } from "../../common/utils/codenumbers";
import InputWithIcon from "../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../common/icons/CloseCircleGreenIcon";
import CustomSelect from "../../common/styles/components/selects/CustomSelect";
import DefaultTechMessage from "../feedwater/modals/DefaultTechMessage";
import AlertPopUp from "../../common/notifications/AlertPopUp";
import CreatedProjectErrorModal from "../modals/CreatedProjectErrorModal";
import { MyError } from "../../common/utils/ErrorCreator";
import RightTickMarkIcon from "../../common/icons/RightTickMarkIcon";
import StandardPrimaryButton from "../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardSecondaryButton from "../../common/styles/components/buttons/standard/StandardSecondaryButton";
import {
  updateProjectInfo,
  updateCaseName,
} from "../../common/ProjectInfoSlice";

import DefaultCurrencyMessage from "../feedwater/modals/DefaultCurrencyMessage";
import DefaultUnitsMessage from "../feedwater/modals/DefaultUnitsMessage";
import CustomHeading from "../../common/styles/components/headings/CustomHeading";
import { colors } from "../../common/styles/Theme";
import ErrorMessage from "../../common/styles/components/headings/ErrorMessage";
import CustomLabel from "../../common/styles/components/headings/CustomLabel";
import CustomRadioCheck from "../../common/styles/components/checkboxs/CustomRadioCheck";
import StandardLinkButtonWithIcon from "../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";
import ArrowRightBlackIcon from "../../common/icons/ArrowRightBlackIcon";
import CustomInput from "../../common/styles/components/inputs/CustomInput";
import InputReferenceText from "../../common/styles/components/headings/InputReferenceText";
import DefaultValueSaved from "../feedwater/modals/DefaultValueSaved";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
import TechButtons from "../../common/styles/components/buttons/techButtons/TechButtons";
import CustomRadio from "../../common/styles/components/radios/CustomRadio";
import CustomTextArea from "../../common/styles/components/inputs/CustomTextArea";
const schema = z.object({
  projectName: z.string().min(1, { message: "Required" }),
});

const CreateNewProjectModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get data from store
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const SSubTechnology = useSelector((state) => state.cardlist.sbTechnology);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const StoreData = useSelector((state) => state.cardlist.data);

  const userID = UserInfoStore ? UserInfoStore.UserId : 0;
  const [tchName, settchName] = useState();
  const invalid = "Please fill out this field.";
  const valid = "valid";
  const {
    register,
    handleSubmitdata,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //api calls variables
  const [getCurrencylist, responseCurrencylist] = useLazyGetAllDataQuery();
  const [getData, responseInfo] = useLazyGetAllDataQuery();
  const [getTechnologyData, responseTechnology] = useLazyGetAllDataQuery();
  const [getMarketSegment, responseMarketSegment] = useLazyGetAllDataQuery();
  const [getCountry, responseCountry] = useLazyGetAllDataQuery();
  const [getState, responseState] = useLazyGetAllDataQuery();
  const [getSubTechnology, responseSubTechnology] = useLazyGetAllDataQuery();
  const [getUnitlist, responseUnitlist] = useLazyGetAllDataQuery();
  const [CurrencyDataPost, { data }] = useCreateDataMutation();
  const [UmoDataPost, { Umoiddata }] = useCreateDataMutation();
  const [CreateProjectPost, { Projectdata }] = useCreateDataMutation();
  const [DefaultDataPost, { DefaultData }] = useCreateDataMutation();
  const [getAllProject, responseAllProject] = useLazyGetAllDataQuery();

  //project info tab
  const [defaulttechnology, setdefaulttechnology] = useState();
  const [marketSegment, setmarketSegment] = useState();
  const [project_No, setproject_No] = useState("");
  const [createdate, setcreatedate] = useState();
  const [SubTechnology, setSubTechnology] = useState();
  const [SelectedSubTechnology, setSelectedSubTechnology] = useState([]);
  const [defaultValueSaved, setDefaultValueSaved] = useState(false);
  const [selectedUnitType, setSelectedUnitType] = useState(2);

  //designer tab
  const [selectedCountryId, setSelecetedCountryId] = useState(233);
  const [Country, setCountry] = useState();
  const [State, setState] = useState();
  const [dialcode, setDialcode] = useState("");
  const [contact1, setContact1] = useState("");
  const phoneRef = useRef();
  const [phoneValue, setPhoneValue] = useState("");
  const [hasDefaultCurrency, setHasDefaultCurrency] = useState(false);
  const [hasDefaultUnit, setHasDefaultUnit] = useState(false);
  const [closeNewProject, setCloseNewProject] = useState(true);
  //unit and currency tab
  const [Currencylist, setCurrencylist] = useState();
  const [IsSelectCurrency, setIsSelectCurrency] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [unitData, setunitData] = useState([]);
  const [IsSelectUnits, setIsSelectUnits] = useState("User Defined");

  const [tabhighlight, setTabhighlight] = useState("F");
  const [Dtechnology, setDtechnology] = useState([]);
  const [validPhone, setValidPhone] = useState(false);
  const [activeCell, setActiveCell] = useState([]);
  //const [validated, setValidated] = useState(false);
  var validated = false;
  const [error, setError] = useState(false);
  const [projectError, setProjectError] = useState(false);
  const [isFocused, setIsFocused] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState("+1");
  const [selectedImage, setSelectedImage] = useState(Michigan);
  const [settchnologyPlaceholder] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [showloader, setshowloader] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [projectMsg, setProjectMsg] = useState("");
  /* Popup for getting confirmation from user*/
  const [defaultTech, setDefaultTech] = useState(false);
  const [currencyDefault, setCurrencyDefault] = useState(false);

  const handleOpenDefaultTech = () => {
    setDefaultTech(true);
  };
  const handleCloseDefaultTech = () => {
    setDefaultTech(false);
  };
  const handleOpenCurrencyDefault = () => {
    if (postdata.currencyExchRate && Number(postdata.currencyExchRate) > 0) {
      setCurrencyDefault(true);
    }
  };
  const handleCloseCurrencyDefault = () => {
    setCurrencyDefault(false);
  };
  /* Popup for displaying alert/warning/error messages to user*/
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({ type: "", message: "" });
  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({ type: "", message: "" });
    setAlertVisibility(false);
    props.close(false);
  };
  const [selectedSegmentValue, setSelectedSegmentValue] = useState("");

  const [selectCountry, setSelectCountry] = useState("Select-Country");
  const [loading, setLoading] = useState(false);
  const [technology, setTechnology] = useState({
    selectedTechnology: [],
  });
  const [newPop, setNewPop] = useState(false);

  //data to post
  const [postdata, setpostdata] = useState({
    Method: "masterdata/api/v1/CreateProject",
    userID: userID,
    projectNo: "",
    projectName:
      // "Wave-IXD-" +
      // (new Date().getMonth() + 1) +
      // "/" +
      // new Date().getDate() +
      // "/" +
      // new Date().getFullYear(),
      "Untitled-Project",
    marketSegmentID: 0,
    caseName: "Case 1",
    projectNotes: "",
    lstTechnologyListVMs: [],
    designer: UserInfoStore.UserName,
    designerCompany: UserInfoStore.CompanyName,
    customer: "",
    countryID: 233,
    stateID: 0,
    city: "",
    contact: "",
    createdDate: "",
    currencyID: 0,
    currencyExchRate: 0,
    listUOM: [],
  });
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

  useEffect(() => {
    try {
      if (props.show === true) {
 
        getData(`${"masterdata/api/v1/ProjectNumber"}?userID=${userID}`);
        getTechnologyData(
          `${"masterdata/api/v1/DefaultTechnology"}?userID=${userID}`
        );
        getAllProject(`masterdata/api/v1/ProjectAll?userID=${userID}`);

        getMarketSegment(
          `${"masterdata/api/v1/MarketSegment"}?userID=${userID}`
        );
        getCountry(`${"masterdata/api/v1/Country"}`);
        getState(`${"masterdata/api/v1/State"}?countryID=${selectedCountryId}`);
        getSubTechnology(
          `${"masterdata/api/v1/SubTechnology"}?userID=${userID}`
        );
        getUnitlist(`${"masterdata/api/v1/UnitOfMeassure"}?userID=${userID}`);
        getCurrencylist(
          `${"masterdata/api/v1/DefaultCurrency"}?userID=${userID}`
        );
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-GB");
        setcreatedate(formattedDate);
      }
    } catch {
      throw new MyError("Create New Project Api Error", 400, "ApiError");
    }
  }, [props.show]);

  useEffect(() => {
    if (props.show === true) {
      getState(`${"masterdata/api/v1/State"}?countryID=${selectedCountryId}`);
    }
  }, [selectedCountryId]);

  useEffect(() => {}, [error]);

  useEffect(() => {
    if (responseAllProject.isSuccess) {
      setProjectList(responseAllProject.data);
    }
  }, [responseAllProject]);

  useEffect(() => {
    if (responseCurrencylist.isSuccess === true) {
      setCurrencylist(responseCurrencylist.data);
      let selected = responseCurrencylist.data.find((a) => a.isDefault);
      selected = !selected ? responseCurrencylist.data[0] : selected;
      setSelectedCurrency(selected);
      setpostdata({ ...postdata, currencyExchRate: selected.currencyValue });
      // let notHasCurrencyDefault = true;
      // responseCurrencylist.data.map((currency) => {
      //   if (currency.isDefault) {
      //     setSelectedCurrency(currency);
      //     notHasCurrencyDefault = false;
      //     setHasDefaultCurrency(true);
      //   }
      // });
      // if (notHasCurrencyDefault) {
      //   setSelectedCurrency(responseCurrencylist.data[0]);
      // }
    }
    if (responseCurrencylist.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseCurrencylist.error.status,
        "ApiError"
      );
    }
  }, [responseCurrencylist]);
  useEffect(() => {
    if (responseUnitlist.isSuccess === true) {
      let notHasDefaultUnit = true;
      let refinData = refrenc.map((x) =>
      responseUnitlist.data.find((item) => item.uomTypeName == x)
    );
      responseUnitlist.data[0].unitKey.map((unit) => {
        if (unit.isSelected) {
          notHasDefaultUnit = false;
          setHasDefaultUnit(true);
        }
      });
      setSelectedUnitType(responseUnitlist.data[0].uomSelectType);
      setunitData(refinData);
    }

    if (responseUnitlist.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseUnitlist.error.status,
        "ApiError"
      );
    }
  }, [responseUnitlist]);

  useEffect(() => {
    if (responseInfo.isSuccess === true) {
      setproject_No("TP-" + responseInfo.data);
    }
    if (responseInfo.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseInfo.error.status,
        "ApiError"
      );
    }
  }, [responseInfo]);
  useEffect(() => {
    if (responseTechnology.isSuccess === true) {
      // let temResponse;
      // temResponse = responseTechnology?.data.map((rt) => {
      //   rt.isDefault == 1
      //     ? (rt = { ...rt, isDefault: true })
      //     : (rt = { ...rt, isDefault: false });
      //   return rt;
      // });

      setdefaulttechnology(responseTechnology.data);
    }
    if (responseTechnology.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseTechnology.error.status,
        "ApiError"
      );
    }
  }, [responseTechnology]);
  useEffect(() => {
    if (responseMarketSegment.isSuccess === true) {
      setmarketSegment(responseMarketSegment.data);
    }
    if (responseMarketSegment.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseMarketSegment.error.status,
        "ApiError"
      );
    }
  }, [responseMarketSegment]);
  useEffect(() => {
    if (responseCountry.isSuccess === true) {
      setCountry(responseCountry.data);
    }
    if (responseCountry.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseCountry.error.status,
        "ApiError"
      );
    }
  }, [responseCountry]);

  useEffect(() => {
    if (responseState.isSuccess === true) {
      // 👇️ sort by String property ASCENDING (A - Z)
      const strAscending = [...responseState.data].sort((a, b) =>
        a.stateName > b.stateName ? 1 : -1
      );
      setState(strAscending);
    }
    if (responseState.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseState.error.status,
        "ApiError"
      );
    }
  }, [responseState]);
  useEffect(() => {
    if (responseSubTechnology.isLoading) {
      // dispatch(updateLoader(true));
      // setLoading(true);
    } else {
      if (responseSubTechnology.isSuccess === true) {
        setSubTechnology(responseSubTechnology.data);
      }
    }
    if (responseSubTechnology.isError) {
      throw new MyError(
        "Create New Project Api Error",
        responseSubTechnology.error.status,
        "ApiError"
      );
    }
  }, [responseSubTechnology]);

  useEffect(() => {
    tchnologyChecUpdate();
  }, [SubTechnology]);
  useEffect(() => {
    tchnologyChecUpdate();
    const dtfilter = defaulttechnology?.filter((dt) => dt.isDefault === true);
    const dtmap = dtfilter?.map((dt) => {
      dt = { technologyID: dt.technologyID };
      return dt;
    });
    setpostdata({ ...postdata, ["lstTechnologyListVMs"]: dtmap });
    setDtechnology(dtmap);
  }, [defaulttechnology]);
  useEffect(() => {
    setpostdata({ ...postdata, ["projectNo"]: project_No });
  }, [project_No]);
  useEffect(() => {
    setpostdata({ ...postdata, ["createdDate"]: createdate });
  }, [createdate]);
  useEffect(() => {
    if (tabhighlight == "T") {
      const dtfilter = Currencylist?.filter((dt) => dt.isDefault === true);
      setpostdata({ ...postdata, ["currencyID"]: dtfilter[0].currencyID });
    }
  }, [Currencylist]);
  const drpChange = (e) => {
    const currencyName = e.target.value;
    let Currencyvar = Currencylist.filter(
      (data) => data.currencyName == e.target.value
    );

    if (currencyName == "US Dollar($)") {
    setpostdata({ ...postdata, [e.target.name]: "1" ,currencyExchRate:"1"});
    }
    else{
      setpostdata({ ...postdata, [e.target.name]: Currencyvar[0].currencyID });

    }

    setSelectedCurrency(Currencyvar[0]);
    setError(false);
  };
  const CurrencyUpdateRadio = (index) => {
    if (index == "ManuallyRate") {
      setIsSelectCurrency(true);
    } else {
      setIsSelectCurrency(false);
    }
  };
  const UnitsUpdateRadio = (e) => {
    setSelectedUnitType(3);
    if (e == "US") {
      setIsSelectUnits(e);
    } else if (e == "METRIC") {
      setIsSelectUnits(e);
    } else {
      setIsSelectUnits(e);
    }
  };
  const handleToggelById = (id, item) => {
    if (IsSelectUnits == "User Defined") {
      if (item.isSelected === false) {
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

        setunitData(unitDataTemp);
        SetUOMData();
      } else {
        let unitDataTemp = unitData;
        let selectedItem = unitData.filter((x) => x.uomTypeID === id);
        let selectedUomItem = selectedItem[0].unitKey.map((u, index) => {
          if (item.uomId === u.uomId) {
            // u.isSelected = true;
            u = { ...u, isSelected: true };
          }

          return u;
        });

        unitDataTemp = unitData.map((ud, index) => {
          if (ud.uomTypeID === id) {
            ud = { ...ud, unitKey: selectedUomItem };
          }
          return ud;
        });

        setunitData(unitDataTemp);
      }
    }
    setError(false);
  };

  const toggleCellSelection = (cellIndex) => {
    if (activeCell.includes(cellIndex.target.value)) {
      setActiveCell(
        activeCell.filter((index) => index !== cellIndex.target.value)
      );
    } else {
      setActiveCell([...activeCell, cellIndex.target.value]);
    }
  };
  const isCellSelected = (cellIndex) => activeCell.includes(cellIndex);
  const handleChange = (path, label) => {
    setSelectedLabel(label);
    setSelectedImage(path);
  };
  const MakeCurrencyNewDefault = () => {
    const CurrencyData = {
      Method: "masterdata/api/v1/MakeDefaultCurrency",
      currencyID: selectedCurrency.currencyID,
      userID: userID,
      exchangeRate: postdata.currencyExchRate,
    };
    setCurrencyDefault(false);
    setNewPop(true);
    CurrencyDataPost(CurrencyData);
  };
  // const MakeCurrencyNewDefault = async () => {
  //   if (SelectedCurrency && SelectedCurrency[0]?.currencyID > 0) {
  //     const CurrencyData = {
  //       Method: "masterdata/api/v1/MakeDefaultCurrency",
  //       currencyID: SelectedCurrency[0].currencyID,
  //       userID: userID,
  //     };
  //     let PostResponseValues = await CurrencyDataPost(CurrencyData);

  //     if (PostResponseValues?.data?.responseMessage == "Success") {
  //       handleOpenCurrencyDefault();
  //     } else {
  //       const errorMessage = `${PostResponseValues?.data?.message}, Failed to update record.`;
  //       handleShowAlert("error", errorMessage);
  //     }
  //   }
  // };
  const SetUOMData = () => {
    let uomTypeID = unitData.length;
    let UpdateUmoidload = [];
    while (uomTypeID > 0) {
      let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
      let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
        let unitKey = u.isSelected == true;
        if (unitKey == true) {
          let uomId = u.uomId;
          UpdateUmoidload = [
            ...UpdateUmoidload,
            {
              uomId: uomId,
            },
          ];
        }
      });
      uomTypeID--;
    }
    setpostdata({ ...postdata, ["listUOM"]: UpdateUmoidload });
  };
  const handleUnitType = (e) => {
    setIsSelectUnits(e);
    let type = e == "Metric" ? 2 : e == "US" ? 1 : 3;
    setSelectedUnitType(type);
    if (type != 3) {
      let unitDataTemp = unitData.map((u) => {
        let unitTypeUnSlected = e;
        let firstNotFound = true;
        let unitFound = u.unitKey.find(
          (item) => item.uomsystemName === unitTypeUnSlected
        );
        unitTypeUnSlected = !unitFound
          ? e == "Metric"
            ? "US"
            : "Metric"
          : unitTypeUnSlected;
        let unitKeyTemp = u.unitKey.map((x) => {
          if (x.uomsystemName === unitTypeUnSlected && firstNotFound) {
            // x.isSelected == false;
            x = { ...x, isSelected: true };
            firstNotFound = false;
          } else {
            x = { ...x, isSelected: false };
          }
          return x;
        });
        u = { ...u, unitKey: unitKeyTemp };
        return u;
      });
      setunitData(unitDataTemp);
      SetUOMData();
      setError(false);
    }
  };

  const MakeUnitNewDefault = () => {
    let uomTypeID = unitData.length;
    let UpdateUmoidload = [];
    while (uomTypeID > 0) {
      let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
      let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
        let unitKey = u.isSelected == true;
        if (unitKey == true) {
          let uomId = u.uomId;
          UpdateUmoidload = [
            ...UpdateUmoidload,
            {
              uomId: uomId,
            },
          ];
        }
      });
      uomTypeID--;
    }
    // make new defualt Unit data
    if (UpdateUmoidload[0].uomId > 0) {
      const UmoIdData = {
        Method: "masterdata/api/v1/MakeDefaultUOM",
        userID: userID,
        lstMakeDefaultUOM: UpdateUmoidload,
        uomSelectType: selectedUnitType,
      };
      // let PostResponseValues = await UmoDataPost(UmoIdData);
      UmoDataPost(UmoIdData);
      // .then((response) => {
      //   let PostResponseValues = response;
      //   if (PostResponseValues.data.responseMessage == "Success") {
      //     handleOpenDefaultTech();
      //   } else {
      //     const errorMessage = `${PostResponseValues?.data?.message}, Failed to update record.`;
      //     handleShowAlert("error", errorMessage);
      //   }
      // })
      // .catch((error) => {
      // });
      setDefaultTech(false);
      setNewPop(true);
    }
  };

  const MakeNewDefault = async () => {
    if (Dtechnology[0].technologyID > 0) {
      const DefaultTech = {
        Method: "masterdata/api/v1/DefautTechnology",
        userID: userID,
        technologyListVMs: Dtechnology,
      };
      let PostResponseValues = await DefaultDataPost(DefaultTech);
      if (PostResponseValues.data.responseMessage == "Success") {
        handleCloseDefaultTech();
        setDefaultValueSaved(true);
      } else {
        const errorMessage = `${PostResponseValues?.data?.message}, Failed to update record.`;
        handleShowAlert("error", errorMessage);
        handleCloseDefaultTech();
      }
    }
  };

  // sagar
  const handleSubmit = (e) => {
    const Techselection =
      defaulttechnology?.filter((x) => x.isDefault === true);
    const alreadyExistProject = projectList.find(
      (project) => project.projectName.toLowerCase() === postdata.projectName.toLowerCase()
    );
    // setpostdata({ ...postdata, ["contact"]: dialcode+contact1});
    if (
      // postdata.marketSegmentID < 1 ||
      Techselection.length < 1 ||
      postdata.caseName == "" ||
      postdata.projectNo == "" ||
      postdata.projectName == "" ||
      selectedSegmentValue == ""
    ) {
      setError(true);
      return;
    } else if (alreadyExistProject) {
      e.preventDefault();
      setProjectError(true);
      setProjectMsg("Project Name Already Exists");
    } else {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        setTabhighlight("S");
        setpostdata({...postdata,["lstTechnologyListVMs"]:Techselection});
      }
      // setValidated(true);
      validated = true;
      validated ? setTabhighlight("S") : setTabhighlight("F");
      // setError(false);
    }
  };
  const BackSubmitFirst = () => {
    setError(false);
    setTabhighlight("F");
  };

  // sagar1
  const handleSubmitSecond = (e) => {
    if (
      // postdata.customer == "" ||
      // postdata.city == "" ||
      // postdata.contact == "" ||
      postdata.countryID < 1
      // postdata.stateID < 1
    ) {
      setError(true);
      return;
    } else {
      setTabhighlight("T");
      setError(false);
      const dtfilter = Currencylist?.filter((dt) => dt.isDefault === true);
      setIsSelectUnits(e);

      if (!hasDefaultUnit) {
        let unitDataTemp = unitData.map((u) => {
          let unitTypeUnSlected = "Metric";
          let firstNotFound = true;
          let unitFound = u.unitKey.find(
            (item) => item.uomsystemName === unitTypeUnSlected
          );
          unitTypeUnSlected = !unitFound
            ? e == "Metric"
              ? "US"
              : "Metric"
            : unitTypeUnSlected;
          let unitKeyTemp = u.unitKey.map((x) => {
            if (x.uomsystemName === unitTypeUnSlected && firstNotFound) {
              // x.isSelected == false;
              x = { ...x, isSelected: true };
              firstNotFound = false;
            } else {
              x = { ...x, isSelected: false };
            }
            return x;
          });
          u = { ...u, unitKey: unitKeyTemp };
          return u;
        });
        setunitData(unitDataTemp);
        let uomTypeID = unitData.length;
        let UpdateUmoidload = [];
        while (uomTypeID > 0) {
          let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
          let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
            let unitKey = u.isSelected == true;
            if (unitKey == true) {
              let uomId = u.uomId;
              UpdateUmoidload = [
                ...UpdateUmoidload,
                {
                  uomId: uomId,
                },
              ];
            }
          });
          uomTypeID--;
        }
        setError(false);
        setpostdata({
          ...postdata,
          ["currencyID"]: Currencylist[0].currencyID,
          ["listUOM"]: UpdateUmoidload,
        });
      } else {
        let uomTypeID = unitData.length;
        let UpdateUmoidload = [];
        while (uomTypeID > 0) {
          let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
          let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
            let unitKey = u.isSelected == true;
            if (unitKey == true) {
              let uomId = u.uomId;
              UpdateUmoidload = [
                ...UpdateUmoidload,
                {
                  uomId: uomId,
                },
              ];
            }
          });
          uomTypeID--;
        }
        setpostdata({
          ...postdata,
          ["currencyID"]: selectedCurrency.currencyID,
          ["listUOM"]: UpdateUmoidload,
        });
      }
    }
  };
  const BackSubmitSecond = () => {
    setError(false);
    setTabhighlight("S");
  };

  const CreateNewProject = async () => {
    let uomTypeID = unitData.length;
    let UpdateUmoidload = [];
    while (uomTypeID > 0) {
      let selectedItem = unitData.filter((x) => x.uomTypeID == uomTypeID);
      let selecteUomItem = selectedItem[0].unitKey.map((u, index) => {
        let unitKey = u.isSelected == true;
        if (unitKey == true) {
          let uomId = u.uomId;
          UpdateUmoidload = [
            ...UpdateUmoidload,
            {
              uomId: uomId,
            },
          ];
        }
      });
      uomTypeID--;
    }

    const Projectdata1_ = { ...postdata, ["listUOM"]: UpdateUmoidload, };
    console.log("Projectdata1_",Projectdata1_);
   


    if (postdata.stateID === "") {
      setpostdata({ ...postdata, ["stateID"]: 0 });
    }
    const Projectdata_ = postdata;

    if (
      postdata.currencyID == 0 ||
      postdata.listUOM.length < 1 ||
      !postdata.currencyExchRate ||
      postdata.currencyExchRate == 0
    ) {
      setError(true);
      setTabhighlight("T");
      return;
    } else {
      const Projectdata_ = { ...Projectdata1_, selectUOMType: selectedUnitType };
      let PostResponseValues = await CreateProjectPost(Projectdata_);

      if (PostResponseValues.data.responseMessage == "Success") {
        const obj = { ...ProjectInfoStore };
        obj.projectID = PostResponseValues.data.id;

        obj.caseId = 0;
        dispatch(updateProjectInfo(obj));
        dispatch(updateCaseName(Projectdata_.caseName));

        const message = "New Project Created.";
        handleShowAlert("success", message);
        setError(true);
        props.close(false);
        navigate("/FeedWaterHome", {
          state: {
            title: Projectdata_.projectName,
            projectID: PostResponseValues.data.id,
            caseID: 0,
          },
        });
        // navigate("/FeedWaterHome");
      } else if (PostResponseValues.data.responseMessage == "Project Already Exists") {
        console.log("responseMessage1",PostResponseValues.data.responseMessage);
        const errorMessage = "Project name already exists, failed to create project.";
        handleShowAlert("error", errorMessage);
        setErrorModal(true);  
      }
      // else (PostResponseValues.error.data.responseMessage == "Failure") {
      else {
        const errorMessage = "Project name already exists, failed to create project.";
        handleShowAlert("error", errorMessage);
        setErrorModal(true);
      }
    }
    setCloseNewProject(false);
  };
  const tchnologyChecUpdate = () => {
    let unitDataTemp;
    if (SubTechnology?.length > 0) {
      unitDataTemp = SubTechnology;
    } else {
      unitDataTemp = SSubTechnology;
    }
    unitDataTemp = SubTechnology?.map((st) => {
      st = { ...st, isSelected: false };
      return st;
    });

    let unitDataTempNew = unitDataTemp;
    let selectedItem = defaulttechnology?.filter((x) => x.isDefault === true);
    unitDataTempNew = unitDataTemp?.map((st) => {
      selectedItem?.forEach((dt) => {
        if (st.technologyID === dt.technologyID) {
          st = { ...st, isSelected: true };
        }
      });
      return st;
    });
    setSelectedSubTechnology(unitDataTempNew);
  };

  const txtChange = (e) => {
    if (e.target.name == "projectName") {
      if (e.target.value == "") {
        setProjectMsg("This field cannot be empty");
      }
    }
    // if(e.target.name==="caseName"){
    //   dispatch(updateCaseName(e.target.value));
    // }
    setpostdata({ ...postdata, [e.target.name]: e.target.value });
    setError(false);
    setProjectError(false);
  };
  const handleUserInputChange = (e) => {
    const phone = e.target.value;
    // const isValid = phone.length >= 10;
    if (phone.length >= 10) {
      setError(false);
    } else {
      setError(true);
    }

    const dial = phoneRef.current.state.formattedNumber;
    setDialcode(dial);
    setContact1(phone);
    setpostdata({ ...postdata, contact: dial + phone });
  };
  const handleOptionChange = (e) => {
    const selectedId = e.target.value;
    const selectedMarketSegment = marketSegment.find(
      (ms) => ms.segmentName === selectedId
    );
    const valuemarks = selectedMarketSegment
      ? selectedMarketSegment.segmentID
      : "";

    if (selectedId === "select-market segment") {
      setpostdata({ ...postdata, ["marketSegmentID"]: 0 });
      setSelectedSegmentValue("select-market segment");
      setError(true);
    } else {
      valuemarks
        ? setpostdata({ ...postdata, [e.target.name]: valuemarks })
        : "";
    }
    setSelectedSegmentValue(selectedId);
    setError(false);
  };
  const handleCountyChange = (e) => {
    setSelecetedCountryId(parseInt(e.target.value));
    setpostdata({
      ...postdata,
      [e.target.name]: e.target.value,
      contact: "",
      stateID: "",
    });
    setContact1("");
    setError(false);
  };
  const handleStateChange = (e) => {
    setpostdata({ ...postdata, [e.target.name]: parseInt(e.target.value, 10) });
    setpostdata({ ...postdata, [e.target.name]: parseInt(e.target.value, 10) });
    setError(false);
  };
  const customDropdownStyle = {
    maxHeight: "150px",
    overflowY: "auto",
    maxWidth: "220px",
  };
  const sty = {
    "background-color": "transparent",
    border: "none",
  };

  const tchnologyCheckChange = (e, techId) => {
    // settchName(...e.target.value]});
    // Destructuring
    const { value, checked } = e.target;
    // const { selectedTechnology } = technology;
    let tempTechnology;
    tempTechnology = defaulttechnology.map((dt) => {
      dt.technologyID === techId ? (dt = { ...dt, isDefault: checked }) : dt;
      return dt;
    });
    setdefaulttechnology(tempTechnology);
    setError(false);
  };

  // chnaging color of input outer border while typing and error
  const handleFocus = (e) => {
    setIsFocused(e);
  };
  const handleBlur = (e) => {
    const {value,name}=e.target;
    if(name=="projectName" )
    {
      setpostdata({...postdata,projectName:value.trim()});
    }
    setIsFocused(null);
  };

  return (
    <>
      <CreateNewProjectModalStyled
        show={props.show && closeNewProject}
        centered
        backdrop="static"
        keyboard="false"
      >
        <DefaultValueSaved show={newPop} close={setNewPop} />

        <Row className="header-create-project bg-light d-flex">
          <Col lg={10} md={10} sm={10} className="heading">
            <h3>Create New Project</h3>
            {tabhighlight == "F" ? (
              <p>
                Please enter below details to start with a New Project. Note
                that every projects starts with Case 1 by default.
              </p>
            ) : (
              ""
            )}
            {tabhighlight == "S" ? (
              <p>Please enter below details to start with a New Project.</p>
            ) : (
              ""
            )}
            {tabhighlight == "T" ? (
              <p>
                Please edit below details as per your preference. One can edit
                project settings later from Miscellaneous Settings Tab.
              </p>
            ) : (
              ""
            )}
          </Col>
          <Col
            lg={2}
            md={2}
            sm={2}
            onClick={props.CPmodal}
            className="close-icon"
          >
            <CloseIcon />
          </Col>
        </Row>
        <Row className="progress-bar">
          <Col lg={8} md={4} sm={4} xs={4} className="project-details-progress">
            <div
              className={
                tabhighlight == "F"
                  ? "active-tab-panel"
                  : tabhighlight == "S"
                  ? "completed-tab-panel"
                  : "designer-details"
              }
            >
              <span
                className={
                  tabhighlight == "F"
                    ? "active-circle"
                    : tabhighlight == "S"
                    ? "completed-circle"
                    : tabhighlight == "T"
                    ? "completed-circle"
                    : "normal-circle"
                }
              >
                {tabhighlight == "S" ? (
                  <RightTickMarkIcon />
                ) : tabhighlight == "T" ? (
                  <RightTickMarkIcon />
                ) : (
                  "1"
                )}
              </span>
              <h5
                className={
                  tabhighlight == "F"
                    ? "active-tab"
                    : tabhighlight == "S"
                    ? "completed-tab"
                    : tabhighlight == "T"
                    ? "completed-tab"
                    : "normal-tab"
                }
              >
                Project Details
              </h5>
              <div className="arrow-icon">
                <CreateProjectRightArrowIcon />{" "}
              </div>
            </div>
            <div
              className={
                tabhighlight == "S"
                  ? "active-tab-panel"
                  : tabhighlight == "T"
                  ? "completed-tab-panel"
                  : "designer-details"
              }
            >
              <span
                className={
                  tabhighlight == "S"
                    ? "active-circle"
                    : tabhighlight == "T"
                    ? "completed-circle"
                    : "normal-circle"
                }
              >
                {tabhighlight == "T" ? <RightTickMarkIcon /> : "2"}
              </span>
              <h5
                className={
                  tabhighlight == "S"
                    ? "active-tab"
                    : tabhighlight == "T"
                    ? "completed-tab"
                    : "normal-tab"
                }
              >
                Designer & Customer Details
              </h5>
              <div className="arrow-icon">
                <CreateProjectRightArrowIcon />{" "}
              </div>
            </div>
            <div
              className={
                tabhighlight == "T" ? "active-tab-panel" : "designer-details"
              }
            >
              <span
                className={
                  tabhighlight == "T" ? "active-circle" : "normal-circle"
                }
              >
                3
              </span>
              <h5 className={tabhighlight == "T" ? "active-tab" : "normal-tab"}>
                Project Settings
              </h5>
            </div>
          </Col>
        </Row>
        {/* Project Info */}
        {tabhighlight == "F" ? (
          <CreateProjectPageOneStyled validated={validated} className="">
            <div onSubmit={handleSubmitdata} className="first-section">
              <Row className="project-details-information">
                <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
                  <div className="label-input-box">
                    <CustomLabel label="Project No." />
                    <InputWithIcon
                      type="text"
                      disabled={true}
                      isError={false}
                      id="projectNo"
                      value={project_No}
                      placeholder="xyz default"
                      name="projectNo"
                    />
                  </div>
                </Col>
                <Col className="project-column" lg={3} md={3} sm={3} xs={3}>
                  <div className="label-input-box">
                    <CustomLabel label="Date Created" />
                    <InputWithIcon
                      type="text"
                      value={createdate}
                      id="createDate"
                      placeholder="Enter username"
                      name="uname"
                      disabled={true}
                      isError={false}
                    />
                  </div>
                </Col>
                <Col className="project-column" lg={6} md={6} sm={6} xs={6}>
                  {/* <div className="label-input-box">
                    <label htmlFor="uname" className="form-label"><RequiredFieldIcon/>Project Name</label>
                    <Form.Control type="text" placeholder="Enter Project Name" className="form-control-sm" {...register("projectName")} value={postdata.projectName} name="projectName"  onChange={txtChange}/>
                    {postdata.projectName==""?"Please fill out this field":"Valid"}
                  </div> */}
                  <div className="label-input-box">
                    <CustomLabel label="Project Name" mandatoryIcon={true} />
                    <InputWithIcon
                      type="text"
                      id="projectNameId"
                      value={postdata.projectName}
                      onChange={txtChange}
                      name="projectName"
                      placeholder="Enter Project Name"
                      unitBgColor="transparent"
                      disabled={false}
                      minLength="3"
                      maxLength="200"
                      isError={postdata.projectName == "" || projectError}
                      inputText={
                        postdata.projectName == "" ? (
                          <CloseCircleRedIcon />
                        ) : (
                          <CloseCircleGreenIcon />
                        )
                      }
                      required
                      onFocus={() => handleFocus(3)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 3}
                    />
                    <ErrorMessage
                      errorIcon={true}
                      style={{
                        visibility:
                          projectError || postdata.projectName == ""
                            ? "visible"
                            : "hidden",
                      }}
                      texMsg={projectMsg}
                    />

                    {/* <ErrorMessage errorIcon={true} style={{visibility:postdata.projectName == "" ?"visible":"hidden"}} texMsg="This field cannot be empty" /> */}
                  </div>
                </Col>
                <Col className="project-column" lg={3} md={3} sm={5} xs={5}>
                  <div className="second-row label-input-box">
                    <CustomLabel
                      label="Project Market Segment"
                      mandatoryIcon={true}
                    />
                    <CustomSelect
                      name="marketSegmentID"
                      onChange={handleOptionChange}
                      value={selectedSegmentValue}
                      required
                    >
                      {" "}
                      <option hidden value={0}></option>
                      {marketSegment?.map((data, i) => (
                        <option key={i} value={data.marketSegmentID}>
                          {data.segmentName}
                        </option>
                      ))}
                      ;
                    </CustomSelect>
                    <ErrorMessage
                      errorIcon={true}
                      style={{
                        visibility:
                          error && postdata.marketSegmentID < 1
                            ? "visible"
                            : "hidden",
                      }}
                      texMsg={"This field cannot be empty"}
                    />
                    {/* {error ? (
                      postdata.marketSegmentID < 1 ||
                      selectedSegmentValue === "" ? (
                        <p className="error-msg">This field cannot be empty</p>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )} */}
                    {/* <div className="invalid-feedback">Please fill out this field.</div> */}
                  </div>
                </Col>
                <Col className="project-column" lg={3} md={2} sm={2} xs={2}>
                  {/* <div className="mb-3 mt-2 label-input-box">
                    <label htmlFor="uname" className="form-label"><RequiredFieldIcon/>Case No</label>
                    <input type="text" className="form-control form-control-sm" id="uname" placeholder="Enter Case no" name="caseName" value={postdata.caseName} onChange={txtChange} required/>
                    {postdata.caseName==""?"Please fill out this field":"Valid"}
                  </div> */}
                  <div className="second-row label-input-box">
                    <CustomLabel label="First Case Name" mandatoryIcon={true} />
                    <InputWithIcon
                      type="text"
                      id="caseNameId"
                      value={postdata.caseName}
                      onChange={txtChange}
                      name="caseName"
                      placeholder="Case 1"
                      disabled={false}
                      isError={postdata.caseName == ""}
                      unitBgColor="transparent"
                      minLength="0"
                      maxLength="50"
                      inputText={
                        postdata.caseName == "" ? (
                          <CloseCircleRedIcon />
                        ) : (
                          <CloseCircleGreenIcon />
                        )
                      }
                      required
                      onFocus={() => handleFocus(4)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 4}
                    />

                    <ErrorMessage
                      errorIcon={true}
                      style={{
                        visibility:
                          postdata.caseName == "" ? "Visible" : "hidden",
                      }}
                      texMsg="This field cannot be empty"
                    />
                  </div>
                </Col>
                <Col className="project-column" lg={6} md={5} sm={5} xs={5}>
                  <div className="second-row label-input-box text_area_div">
                    <CustomLabel label="Project Notes" />
                    <CustomTextArea
                      className="create_project_notes"
                      placeholder="Project related notes will come here."
                      rows="1"
                      cols={"55"}
                      id="comment"
                      name="projectNotes"
                      value={postdata.projectNotes}
                      onChange={txtChange}
                    ></CustomTextArea>
                  </div>
                </Col>
              </Row>
              <Row className="technology-preference">
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className="technology-preference-column"
                >
                  <h6>
                    <CustomLabel
                      label="Technology Preferences"
                      mandatoryIcon={true}
                    />
                  </h6>
                </Col>
              </Row>
              <Row className="check-box-row">
                <Col lg={3} md={3} sm={3} xs={3} className="check-box-column">
                  <div className="checkbox-wrapper">
                    {defaulttechnology?.map((SortData) => (
                      <>
                        <CustomRadioCheck
                          type="checkbox"
                          name="lstTechnologyListVMs"
                          placeholder="{tchnologyPlaceholder}"
                          value={SortData.technologyName}
                          checked={SortData.isDefault}
                          id="defaultCheck1"
                          onChange={(e) =>
                            tchnologyCheckChange(e, SortData.technologyID)
                          }
                          label={SortData.technologyName}
                          // className={"normal-tech-checkbox"}
                        />
                      </>
                    ))}
                  </div>
                  {defaulttechnology?.filter((x) => x.isDefault === true)
                    .length > 0 ? (
                    <InputReferenceText refText="It can be changed from inside the project" />
                  ) : (
                    <ErrorMessage
                      errorIcon={true}
                      texMsg="Please select at least one technology group"
                    />
                  )}
                  {/* <div className='checkbox-group'>
                  {defaulttechnology?.map((SortData) =>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" name="radiosort" label={SortData.technologyName} value={SortData.technologyName}  />
                    </Form.Group>
                  )}
                </div> */}
                  {/* <div className="invalid-feedback">Please fill out this field.</div> */}
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className="default-technology-preference-column"
                >
                  <StandardLinkButtonWithIcon
                    onClick={handleOpenDefaultTech}
                    label="Make as New Default"
                    icon={<ArrowRightBlackIcon />}
                    plusIcon={false}
                    padding="10px 24px 10px 0px"
                  />
                  <DefaultTechMessage
                    show={defaultTech}
                    close={handleCloseDefaultTech}
                    yes={MakeNewDefault}
                  />
                  <DefaultValueSaved
                    show={defaultValueSaved}
                    close={setDefaultValueSaved}
                    parentModal={setDefaultValueSaved}
                  />
                </Col>
              </Row>
              <Row className="technology-used-row">
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  xs={3}
                  className="pre-treatment process"
                >
                  <h6>Pre-treatment</h6>
                  <div className="technology-btn">
                    {SelectedSubTechnology?.length > 0 ? (
                      SelectedSubTechnology?.filter((tech) =>
                        tech.technologyCategory.includes("Pre-treatment")
                      ).map((data) => (
                        <TechButtons
                          isDraggable={false}
                          key={""}
                          isArrow={false}
                          // className={
                          //   data.isSelected ? "selected-btn" : "default-btn"
                          // }
                          disabled={data.isSelected ? false : true}
                          small={true}
                          value={data.subTechnologyName}
                          onClick={(e) => toggleCellSelection(e)}
                          label={data.subTechnologyName}
                        ></TechButtons>
                      ))
                    ) : (
                      <SmallLoader />
                    )}
                  </div>
                </Col>
                <Col
                  lg={4}
                  md={3}
                  sm={3}
                  xs={3}
                  className="bulk-demineralization process"
                >
                  <h6>Bulk Demineralization</h6>
                  <div className="technology-btn">
                    {SelectedSubTechnology?.length > 0 ? (
                      SelectedSubTechnology?.filter((tech) =>
                        tech.technologyCategory.includes(
                          "Bulk Demineralization"
                        )
                      ).map((data) => (
                        <TechButtons
                          isDraggable={false}
                          key={""}
                          small={true}
                          isArrow={false}
                          // className={
                          //   data.isSelected ? "selected-btn" : "default-btn"
                          // }
                          disabled={data.isSelected ? false : true}
                          id={`btn${data.subTechnologyName}`}
                          value={data.subTechnologyName}
                          onClick={(e) => toggleCellSelection(e)}
                          label={data.subTechnologyName}
                        ></TechButtons>
                      ))
                    ) : (
                      <SmallLoader />
                    )}
                  </div>
                </Col>
                {/* <Col lg={3} md={3} sm={3} xs={3} className="polishing process">
                  <h6>Polishing</h6>
                  <div className="technology-btn">
                    {SubTechnology?.filter((tech) =>
                      tech.technologyCategory.includes("Polishing")
                    ).map((data) => (
                      <Button
                        className={
                          activeCell.includes(data.subTechnologyName)
                            ? "selected-btn"
                            : "default-btn"
                        }
                        value={data.subTechnologyName}
                        onClick={(e) => toggleCellSelection(e)}
                      >
                        {data.subTechnologyName}
                      </Button>
                    ))}
                     </div>
                </Col> */}
                {/*<Button className={isCellSelected(11) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(11)}>IXD</Button>
              <Button className={isCellSelected(12) ? "selected-btn" : "default-btn"} onClick={() => toggleCellSelection(12)}>IXOS</Button>*/}
              </Row>
            </div>
            <div className="create-page-footer">
              <StandardPrimaryButton
                type="submit"
                disabled={error ? "true" : ""}
                onClick={handleSubmit}
                label="Next"
              />
            </div>
          </CreateProjectPageOneStyled>
        ) : (
          ""
        )}
        {/*  Project Info end */}

        {/* Designer & Customer Details  */}
        {tabhighlight == "S" ? (
          <CreateProjectPageTwoStyled
            validated={validated}
            action="action"
            className=""
          >
            <div className="designer-and-project-customer-details">
              <div className="designer-details">
                <CustomHeading
                  fontFamily="DiodrumSemiBold"
                  fontSize="16px"
                  fontWeight="600"
                  label="Designer Details"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <div className="designer-wrapper">
                  <div className="designer-name">
                    <CustomLabel label="Designer" />
                    <InputWithIcon
                      type="text"
                      id="designerName"
                      disabled={false}
                      isError={false}
                      inputText={<CloseCircleGreenIcon />}
                      placeholder="Designer Name"
                      unitBgColor="transparent"
                      value={postdata.designer}
                      onChange={txtChange}
                      name="designer"
                      onFocus={() => handleFocus(7)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 7}
                    />
                  </div>
                  <div className="designer-company-name">
                    <CustomLabel label="Designer's Company" />
                    <InputWithIcon
                      type="text"
                      disabled={false}
                      isError={false}
                      id="designerCompany"
                      unitBgColor="transparent"
                      inputText={<CloseCircleGreenIcon />}
                      placeholder="Designer's Company"
                      value={postdata.designerCompany}
                      onChange={txtChange}
                      name="designerCompany"
                      onFocus={() => handleFocus(8)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 8}
                    />
                  </div>
                </div>
              </div>
              <div className="customer-details">
                <CustomHeading
                  fontFamily="DiodrumSemiBold"
                  fontSize="16px"
                  fontWeight="600"
                  label="Project Customer Details"
                  color={colors.PrimaryDarkAquaMarine}
                />
                <div className="customer-country-wrapper">
                  <div className="customer-name">
                    <CustomLabel label="Customer" />
                    <InputWithIcon
                      type="text"
                      disabled={false}
                      isError={false}
                      id="uname"
                      unitBgColor="transparent"
                      placeholder="Customer Name"
                      inputText={<CloseCircleGreenIcon />}
                      value={postdata.customer}
                      onChange={txtChange}
                      name="customer"
                      onFocus={() => handleFocus(9)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 9}
                    />
                  </div>
                  <div className="country-selection">
                    <CustomLabel label="Country" mandatoryIcon={true} />
                    <CustomSelect
                      className=""
                      id="floatingSelectGrid"
                      onChange={handleCountyChange}
                      value={postdata.countryID}
                      name="countryID"
                      isError={postdata.countryID < 1}
                      required
                    >
                      <option value={0}>Select Country</option>
                      {Country?.map((data, i) => (
                        <option key={i} value={data.countryID}>
                          {data.countryName}
                        </option>
                      ))}
                      ;
                    </CustomSelect>
                    <ErrorMessage
                      errorIcon={true}
                      style={{
                        visibility:
                          postdata.countryID < 1 ? "visible" : "hidden",
                      }}
                      texMsg="This field cannot be empty"
                    />
                  </div>
                  <div className="state-selection">
                    <CustomLabel label="State or Province" />
                    <CustomSelect
                      id="floatingSelectGrid"
                      onChange={handleStateChange}
                      value={postdata.stateID}
                      name="stateID"
                    >
                      <option value={0}>Select State</option>
                      {State?.map((data, i) => (
                        <option key={i} value={data.stateID}>
                          {data.stateName}
                        </option>
                      ))}
                      ;
                    </CustomSelect>
                  </div>
                </div>
                <div className="city-mobile-wrapper">
                  <div className="city-selection">
                    <CustomLabel label="City" />
                    <InputWithIcon
                      type="text"
                      value={postdata.city}
                      onChange={txtChange}
                      unitBgColor="transparent"
                      name="city"
                      disabled={false}
                      isError={false}
                      inputText={<CloseCircleGreenIcon />}
                      placeholder="City Name"
                      onFocus={() => handleFocus(10)}
                      onBlur={handleBlur}
                      isFocused={isFocused === 10}
                    />
                  </div>

                  {/* currently removed */}
                  {/* <div className="contact-number"> */}
                  {/* <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      label="Mobile Number"
                      color={colors.Black}
                      className=""
                    /> */}
                  {/* <div className="country-code-input-box">
                      <PhoneInput
                        country={
                          selectedCountryId === 0
                            ? "us"
                            : codenumbers.find(
                                (code) => code.countryId === selectedCountryId
                              ).code
                        }
                        ref={phoneRef}
                        disableDropdown={true}
                        value={phoneValue}
                        inputProps={{ name: "contact", readOnly: true }}
                        dropdownStyle={customDropdownStyle}
                        buttonStyle={sty}
                      />
                      <input
                        type="number"
                        className="userInput"
                        value={contact1}
                        onChange={handleUserInputChange}
                      />
                    </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="create-page-footer">
              <StandardSecondaryButton
                className="back-btn"
                onClick={BackSubmitFirst}
                label="Back"
              />
              <StandardPrimaryButton
                type="submit"
                disabled={error ? "true" : ""}
                onClick={handleSubmitSecond}
                label="Next"
              />
            </div>
          </CreateProjectPageTwoStyled>
        ) : (
          ""
        )}
        {/* Designer & Customer Details end */}

        {/* Project Settings start */}
        {tabhighlight == "T" ? (
          <CreateProjectPageThreeStyled>
            <Row className="currency-row g-0">
              <Col
                lg={4}
                md={4}
                sm={4}
                className="currency-details-first-column"
              >
                <Col lg={12} md={7} sm={7} xs={7} className="project-setting">
                  <CustomHeading
                    className="currency-header"
                    fontFamily="NotoSansSemiBold"
                    fontSize="14px"
                    fontWeight="700"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Currency Settings"
                  />
                  <CustomLabel label="Select Currency for Project" />
                  <CustomSelect
                    className=""
                    label="select"
                    value={selectedCurrency.currencyName}
                    id="floatingSelectGrid"
                    name="currencyID"
                    onChange={drpChange}
                  >
                    {Currencylist?.map((data, i) => (
                      <option key={i} value={data.currencyName}>
                        {data.currencyName}
                      </option>
                    ))}
                    ;
                  </CustomSelect>
                  {error && postdata.currencyID == 0 && (
                    <ErrorMessage
                      errorIcon={true}
                      texMsg="Please Select the Currency."
                    />
                  )}
                </Col>
                <Col
                  lg={12}
                  md={5}
                  sm={4}
                  xs={4}
                  className="exchange-rate-radio"
                >
                  <div className="exchange-heading">
                    <CustomLabel label="Currency Exchange Rate" />
                  </div>
                  <div className="wrapper-radio d-flex">
                    <CustomRadio
                      label="Use Default Rate"
                      className=""
                      type="radio"
                      // defaultChecked={false}
                      name="exampleRadios"
                      id="DupontRate"
                      disabled={true}
                      onChange={() => CurrencyUpdateRadio("DupontRate")}
                      value="DupontRate"
                    />
                    <CustomRadio
                      label="Enter Manually"
                      className=""
                      type="radio"
                      name="exampleRadios"
                      id="ManuallyRate"
                      onChange={() => CurrencyUpdateRadio("ManuallyRate")}
                      value="ManuallyRate"
                      defaultChecked={true}
                    />
                  </div>
                  <div>
                    <p>Its measured against USD($)</p>
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
                    {IsSelectCurrency ? (
                      <InputWithIcon
                        disabled={selectedCurrency.currencyName == "US Dollar($)"}
                        type="number"
                        className="enable-input"
                        id="uname"
                        placeholder="1"
                        value={postdata.currencyExchRate}
                        onChange={txtChange}
                        name="currencyExchRate"
                        onBlur={handleBlur}
                        onFocus={() => handleFocus("currency")}
                        isFocused={isFocused === "currency"}
                        unitBgColor="transparent"
                        required
                        isError={
                          !postdata.currencyExchRate ||
                          postdata.currencyExchRate == 0
                        }
                        inputText={
                          postdata.currencyExchRate == "" ? (
                            <CloseCircleRedIcon />
                          ) : (
                            <CloseCircleGreenIcon />
                          )
                        }
                      />
                    ) : (
                      <input
                        type="number"
                        className="disable-input"
                        id="uname"
                        placeholder="00"
                        min="1"
                        value={postdata.currencyExchRate}
                        onChange={txtChange}
                        name="currencyExchRate"
                        required
                      />
                    )}
                    <ErrorMessage
                      errorIcon={true}
                      style={{
                        visibility:
                          !postdata.currencyExchRate ||
                          postdata.currencyExchRate == 0
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
                    icon={<ArrowRightBlackIcon />}
                    plusIcon={false}
                    onClick={handleOpenCurrencyDefault}
                  />
                  <DefaultCurrencyMessage
                    show={currencyDefault}
                    close={handleCloseCurrencyDefault}
                    yes={MakeCurrencyNewDefault}
                  />
                </Col>
                {/* <Col lg={12} md={5} sm={5} xs={5} className="default-currency">
                  <StandardLinkButtonWithIcon
                    label="Make Currency as New Default"
                    padding="10px 24px 10px 0px"
                    icon={<ArrowRightBlackIcon />}
                    onClick={MakeCurrencyNewDefault}
                  />
                  <DefaultCurrencyMessage
                    show={currencyDefault}
                    close={handleCloseCurrencyDefault}
                  />
                </Col> */}
              </Col>
              <Col lg={8} className="unit-table-data-row">
                <Row className="g-0">
                  <Col lg={12} className="units-metric-row">
                    <Col lg={7} md={7} sm={7} xs={7} className="">
                      <h5>Select Units for Project</h5>
                      <div className="unit_metric_radio">
                        <CustomRadio
                          type="radio"
                          name="option1"
                          id="default-radio"
                          disabled={false}
                          label="US"
                          checked={selectedUnitType == 1}
                          onChange={()=>handleUnitType("US")}
                          onClick={() => handleUnitType("US")}
                        />
                        <CustomRadio
                          type="radio"
                          name="option1"
                          id="default-radio-metric"
                          label="METRIC"
                          checked={selectedUnitType == 2}
                          onChange={()=>handleUnitType("Metric")}
                          onClick={() => handleUnitType("Metric")}
                        />
                        <CustomRadio
                          type="radio"
                          name="option1"
                          id="default-radio"
                          label="User Defined"
                          disabled={false}
                          checked={selectedUnitType == 3}
                          onChange={() => UnitsUpdateRadio("User Defined")}
                          onClick={() => handleUnitType("User Defined")}
                        />
                      </div>
                      {/* <ErrorMessage errorIcon={true} style={{visibility:postdata.listUOM.length < 1 ?"visible":"hidden"}} texMsg="Please choose option US/Metric or User Define." /> */}
                    </Col>
                    <Col lg={5} md={5} sm={5} xs={5} className="default-units">
                      <StandardLinkButtonWithIcon
                        padding={"10px 15px"}
                        onClick={() => setDefaultTech(true)}
                        icon={<ArrowRightBlackIcon />}
                        label="Make Unit as New Default"
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
                        <span className="us-metric">US</span>
                        <span className="us-metric">METRIC</span>
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
                                      index <= 8 &&
                                      us
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
                                                    handleToggelById(
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
                                      metric
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
                                                    handleToggelById(
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
                        <span className="us-metric">US</span>
                        <span className="us-metric">METRIC</span>
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
                                    {" "}
                                    {u.uomTypeName}
                                  </div>
                                  <div className="left-right-wrapper">
                                    <div className="left-unit-wrapper">
                                      {u.unitKey &&
                                        u.unitKey.length &&
                                       index > 8 &&
                                        us
                                          .filter(
                                            (item) =>
                                              item.uomsystemName === "US"
                                          )
                                          .map((item) => {
                                            return (
                                              // eslint-disable-next-line react/jsx-key
                                              <>
                                                <span
                                                  onClick={() =>
                                                    handleToggelById(
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
                                        metric
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
                                                      handleToggelById(
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
            <div className="create-page-footer">
              <StandardSecondaryButton
                className="back-btn"
                onClick={BackSubmitSecond}
                label="Back"
              />
              <StandardPrimaryButton
                type="submit"
                disabled={error ? "true" : ""}
                onClick={CreateNewProject}
                label="Create Project"
              />
            </div>
          </CreateProjectPageThreeStyled>
        ) : (
          ""
        )}
        {/* Project Settings end */}
      </CreateNewProjectModalStyled>
      {showAlert ? (
        <AlertPopUp
          type={alertData?.type}
          message={alertData?.message}
          close={handleHideAlert}
        />
      ) : null}
    </>
  );
};

export default CreateNewProjectModal;
