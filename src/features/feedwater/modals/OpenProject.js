/* eslint-disable max-len */
import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import CloseIcon from "../../../common/icons/CloseIcon";
import OpenProjectStyled from "./OpenProjectStyled";
import FilterIconOpenProject from "../../../common/icons/FilterIconOpenProject";
import SortUpandDownArrowIcon from "../../../common/icons/SortUpandDownArrowIcon";
import { useEffect } from "react";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { useNavigate } from "react-router-dom";
import ShortUpArrow from "../../../common/icons/ShortUpArrow";
import ShortDownArrow from "../../../common/icons/SortDownArrow";
import AccordionUpArrowIcon from "../../../common/icons/AccordionUpArrowIcon";
import AccordionDownArrowIcon from "../../../common/icons/AccordionDownArrowIcon";
import { MyError } from "../../../common/utils/ErrorCreator";
import { useSelector, useDispatch } from "react-redux";
import { updateProjectInfo } from "../../../common/ProjectInfoSlice";
import {
  btnlist,
  updatetitle,
  updateOrder,
  sortData,
  updateLoader,
} from "../../home/CardListSlice";
import { useRef } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import DateInput from "../../../common/styles/components/inputs/DateInput";
import Moment from "react-moment";
import { updateOpenProject } from "./OpenProjectSlice";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import InfoIcon from "../../../common/icons/InfoIcon";

const OpenProject = ({ show, close }) => {
  //get Data from Store
  const openProjectInitialDataValue = useSelector(
    (state) => state.OpenProjectStore.openProjectInitialData
  );
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  const userId = UserInfoStore ? UserInfoStore.UserId : 1;

  // css variabels
  const [openModal, setOpenModal] = useState(true);
  const [collapse, setCollapse] = useState(false);

  //constants
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateVariabel = new Date();
  const dropDown = [
    {
      label: "Equal",
      value: "equal",
    },

    {
      label: "Does not equal",
      value: "doesnotequal",
    },
    {
      label: "Begins with",
      value: "beginswith",
    },
    {
      label: "Ends with",
      value: "endswith",
    },
    {
      label: "Contains",
      value: "contains",
    },
    {
      label: "Does not contain",
      value: "doesnotcontains",
    },
  ];

  const filters = [
    {
      applied: false,
      comparator: "sort",
      column: "projectName",
      value: "",
    },
    {
      applied: false,
      comparator: "equal",
      column: "projectName",
      value: "",
    },
    {
      applied: false,
      comparator: "equal",
      column: "customer",
      value: "",
    },
    {
      applied: false,
      comparator: "equal",
      column: "segmentName",
      value: "",
    },
    {
      applied: false,
      comparator: "equal",
      column: "countryName",
      value: "",
    },
    {
      applied: false,
      comparator: "doesnotcontains",
      column: "waveVersion",
      value: "",
    },
    {
      applied: false,
      comparator: "inbetween",
      column: "lastModified",
      minValue: dateVariabel,
      maxValue: dateVariabel,
    },
    {
      applied: false,
      comparator: "inbetween",
      column: "createdDate",
      minValue: dateVariabel,
      maxValue: dateVariabel,
    },
    {
      applied: false,
      comparator: "tecnology",
      andSelected: true,
      column: "technologyName",
      uf: false,
      ix: false,
      ro: false,
    },
  ];

  //functional variabels
  const [lstProjectData, setLstProjectData] = useState([]);
  const [lstCaseData, setLstCaseData] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState(filters);
  const [marketSegment, setmarketSegment] = useState([]);
  const [value1, setValue1] = useState("And");

  //api variavels
  const [getAllData, response] = useLazyGetAllDataQuery();
  const [getCountry, responseCountry] = useLazyGetAllDataQuery();
  const [getMarketSegment, responseMarketSegment] = useLazyGetAllDataQuery();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPanel, setSelectedPanel] = useState(0);

  const [ascending, setAscending] = useState("asc");
  const [currentRow, setCurrentRow] = useState(null);
  const [isKeyboardScrolling, setIsKeyboardScrolling] = useState(false);
  const [calendarValue, onChange] = useState(new Date());
  const calendarDate = useRef(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [Country, setCountry] = useState();
  const TempStoreData = useSelector((state) => state.cardlist.Temdata);
  const [filterProjectValue, setFilterProjectValue] = useState("");
  const [filterCustomerValue, setFilterCustomerValue] = useState("");
  const [filterWaveVersionValue, setFilterWaveVersionValue] = useState("");
  const [selectedSegmentValue, setSelectedSegmentValue] = useState("");
  const ref = useRef([]);
  const [Technology, setTechnology] = useState({
    technologes: [],
    response: [],
  });

  const options = [
    {
      valuedata: "",
      id: "option1",
    },
    {
      valuedata: "beginswith",
      id: "option2",
    },
    {
      valuedata: "contains",
      id: "option3",
    },
    {
      valuedata: "doesnotcontain",
      id: "option4",
    },
    {
      valuedata: "equal",
      id: "option5",
    },
    {
      valuedata: "endswith",
      id: "option6",
    },
    {
      valuedata: "doesnotequal",
      id: "option7",
    },
  ];

  const optionsMarketSegment = [
    {
      valuedata: "Bioprocessing",
      id: "option1",
    },
    {
      valuedata: "Catalysis",
      id: "option2",
    },
    {
      valuedata: "Chemical Processing",
      id: "option3",
    },
    {
      valuedata: "Commercial",
      id: "option4",
    },
    {
      valuedata: "Energy",
      id: "option5",
    },
    {
      valuedata: "Food & Beverage",
      id: "option6",
    },
    {
      valuedata: "Medical Water",
      id: "option7",
    },
    {
      valuedata: "Microelectronics",
      id: "option8",
    },
    {
      valuedata: "Mining",
      id: "option9",
    },
    {
      valuedata: "Muncipal Drinking Water",
      id: "option10",
    },
    {
      valuedata: "Muncipal Wastewater",
      id: "option11",
    },
    {
      valuedata: "Oil & Gas",
      id: "option12",
    },
    {
      valuedata: "Pharmaceutical",
      id: "option13",
    },
    {
      valuedata: "Residential",
      id: "option14",
    },
    {
      valuedata: "Seawater Desalination",
      id: "option15",
    },
  ];

  const [selected, setSelected] = useState(options[0]);

  // const handleChange = (value) => {
  //   if (value == "blank") {
  //     console.log("blank===============>" + value);
  //   } else if (value == "beginswith") {
  //     console.log("beginswith===============>" + value);
  //   } else if (value == "contains") {
  //     console.log("contains===============>" + value);
  //   } else if (value == "doesnotcontain") {
  //     console.log("doesnotcontain===============>" + value);
  //   } else if (value == "equal") {
  //     console.log("equal===============>" + value);
  //   } else if (value == "endswith") {
  //     console.log("endswith===============>" + value);
  //   } else if (value == "doesnotequal") {
  //     console.log("doesnotequal===============>" + value);
  //   }
  // };

  const handleChange = (name) => {
    if (selectedCheckbox.includes(name)) {
      setSelectedCheckbox((prev) =>
        prev.filter((checkbox) => checkbox !== name)
      );
    } else {
      setSelectedCheckbox((prev) => [...prev, name]);
    }
    console.log(
      "selectedCheckbox",
      selectedCheckbox,
      "openProjectInitialDataValue",
      openProjectInitialDataValue
    );
    let _RecentProject = openProjectInitialDataValue.filter(function (item) {
      for (var i = 0; i < selectedCheckbox.length; i++) {
        if (item.technologyName.includes(selectedCheckbox[i])) return true;
      }
      return false;
    });
    setLstProjectData(_RecentProject);
    console.log("_RecentProject", _RecentProject);
  };

  const radioHandleChange = (e) => {
    setValue1(e);
    console.log("eValue", e);
  };
  const onChangeInputProject = (e) => {
    console.log("e.target.value" + e.target.value);
    setFilterProjectValue(e.target.value);
    let filteredProjectdata = lstProjectData.filter((item) => {
      if (!filterProjectValue) return true;
      if (item.projectName.includes(filterProjectValue)) {
        return true;
      }
    });

    console.log("filteredProjectdataSN" + JSON.stringify(filteredProjectdata));
    setLstProjectData(filteredProjectdata);
  };

  const onChangeInputCustomer = (e) => {
    console.log("e.target.value" + e.target.value);
    setFilterCustomerValue(e.target.value);
    let filteredProjectdata = lstProjectData.filter((item) => {
      if (!filterCustomerValue) return true;
      if (item.customer.includes(filterCustomerValue)) {
        return true;
      }
    });
    console.log("filteredProjectdata", filteredProjectdata);
    console.log("filteredProjectdataSN" + JSON.stringify(filteredProjectdata));
    setLstProjectData(filteredProjectdata);
  };

  const onChangeInputWaveVersion = (e) => {
    console.log("e.target.value" + e.target.value);
    setFilterWaveVersionValue(e.target.value);
    let filteredProjectdata = lstProjectData.filter((item) => {
      if (!filterWaveVersionValue) return true;
      if (item.waveVersion.includes(filterWaveVersionValue)) {
        return true;
      }
    });

    console.log("filteredProjectdataSN" + JSON.stringify(filteredProjectdata));
    setLstProjectData(filteredProjectdata);
  };

  const sortData = (sortBy) => {
    const [target, order] = sortBy.split(" ");
    let newData = JSON.parse(JSON.stringify(lstProjectData));
    console.log("newDatasn" + JSON.stringify(newData));
    let newState = [];
    newState = newData.sort((a, b) => {
      const nameA = a[target].toUpperCase();
      const nameB = b[target].toUpperCase();
      if (nameA < nameB) {
        setAscending("asc");
        return order === "A" ? -1 : 1;
      }
      if (nameA > nameB) {
        setAscending("desc");
        return order === "A" ? 1 : -1;
      }
      return 0;
    });
    console.log("newStatesn" + JSON.stringify(newState));
    setLstProjectData(newState);
  };

  const clearFilter = () => {
    sortData("projectName A");
    setSelected(options[0]);
    setFilterProjectValue("");
    setFilterCustomerValue("");
    setFilterWaveVersionValue("");
    console.log("selected" + selected);
    console.log(
      "openProjectInitialDataValueNewFromStore" +
        JSON.stringify(openProjectInitialDataValue)
    );
    console.log(
      "openProjectInitialDataValueLocal" + JSON.stringify(lstProjectData)
    );
    setLstProjectData(openProjectInitialDataValue);
    // document.getElementById("option2beginswithprojectname") = 0;
  };

  useEffect(() => {
    if (show) {
      getCountry(`${"masterdata/api/v1/Country"}`);
      getAllData(`masterdata/api/v1/OpenProject?userID=${userId}`);
      getMarketSegment(`${"masterdata/api/v1/MarketSegment"}?userID=${1}`);
    }
  }, [show]);

  useEffect(() => {
    console.log(responseMarketSegment);
    if (responseMarketSegment.isLoading) {
      console.log("Loading");
    } else {
      console.log("Loading1");
      if (responseMarketSegment.isSuccess === true) {
        console.log("Success");
        setmarketSegment(responseMarketSegment.data);
      }
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
    console.log(responseCountry);
    if (responseCountry.isLoading) {
      console.log("Loading");
    } else {
      console.log("Loading1");
      if (responseCountry.isSuccess === true) {
        console.log("Success");
        setCountry(responseCountry.data);
      }
    }
    if (responseCountry.isError) {
      throw new MyError(
        "Country Api Error",
        responseCountry.error.status,
        "ApiError"
      );
    }
  }, [responseCountry]);

  useEffect(() => {
    if (response.isLoading) {
      // Loading
    }
    if (response.isError) {
      throw new MyError(
        "OpenProject Api Error",
        response.error.status,
        "ApiError"
      );
    }
    if (response.isSuccess) {
      console.log("openprojecyresponse.data" + JSON.stringify(response.data));
      dispatch(updateOpenProject(response.data.lstProjectData));
      setLstProjectData(response.data.lstProjectData);
      setLstCaseData(response.data.lstCaseData);
    }
  }, [response]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (show === true) {
      setOpenModal(true);
      close(false);
      setAppliedFilter(filters);
    }
  }, [openModal]);

  const drpChange = (e) => {
    var targetValue = e.target.value;
    setSelectedSegmentValue(targetValue);
    if (e.target.value === "bio") {
      targetValue = "Bioprocessing";
    }
    console.log("lstProjectData", lstProjectData, targetValue);
    let newList = openProjectInitialDataValue.filter(
      (item) => item.segmentName == targetValue
    );
    setLstProjectData(newList);
  };

  const changeData = (index) => {
    if (selectedIndex === index) {
      setCollapse(!collapse);
      setCurrentRow(index);
    } else {
      setSelectedIndex(index);
      setCollapse(true);
      setCurrentRow(index);
    }
  };
  const handleOnclick = (projectId, CaseId) => {
    const obj = { ...ProjectInfoStore };
    obj.projectID = projectId ? projectId : 1;
    obj.caseId = CaseId;
    dispatch(updateProjectInfo(obj));
  };
  const handleKeyDown = (e) => {
    if (e.key.startsWith("Arrow")) {
      setIsKeyboardScrolling(true);
    }
  };
  const handleKeyUp = () => {
    setIsKeyboardScrolling(false);
  };

  //-----------------------------------------------------------
  //handle change function
  const handleChangeDropdown = (e) => {
    const { value, name } = e.target;
    console.log(
      "openProject_bugFix",
      "values",
      value,
      "|",
      name,
      appliedFilter
    );
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.column == name) {
          return { ...item, comparator: value };
        } else {
          return item;
        }
      })
    );
  };

  const handleChangeFilterInput = (e) => {
    const { value, name } = e.target;
    console.log(
      "openProject_bugFix",
      "values",
      value,
      "|",
      name,
      appliedFilter
    );
    let applied = value ? true : false;
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.column == name && item.comparator != "sort") {
          return { ...item, value: value, applied: applied };
        } else {
          return item;
        }
      })
    );
    // applyFilter();
  };

  useEffect(() => {
    applyFilter();
  }, [appliedFilter]);

  const handleClearFilter = () => {
    setAppliedFilter(filters);
    setLstProjectData(openProjectInitialDataValue);
  };
  const sortTheData = (flag) => {
    const [column, value] = flag.split("_");
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.comparator == "sort") {
          return { ...item, value: value, column: column, applied: true };
        } else {
          return item;
        }
      })
    );
  };

  const handleDateChange = (e, flag) => {
    const [name, value] = flag.split("_");
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.column == name) {
          return { ...item, [value]: new Date(e), applied: true };
        } else {
          return item;
        }
      })
    );
  };

  const handleTechnologyChange = (e) => {
    const { name, checked } = e.target;
    console.log("meraError", name, checked);
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.comparator == "tecnology") {
          let uf = name == "uf" ? checked : item.uf;
          let ix = name == "ix" ? checked : item.ix;
          let ro = name == "ro" ? checked : item.ro;
          return {
            ...item,
            [name]: checked,
            applied: uf || ix || ro,
          };
        } else {
          return item;
        }
      })
    );
  };
  const handleRadioChange = (value) => {
    setAppliedFilter((prev) =>
      prev.map((item) => {
        if (item.comparator == "tecnology") {
          return {
            ...item,
            andSelected: value,
            applied: item.uf || item.ix || item.ro,
          };
        } else {
          return item;
        }
      })
    );
  };

  const applyFilter = () => {
    let filteredList = openProjectInitialDataValue;
    console.log("comparator", appliedFilter, filteredList);
    appliedFilter.map((filter) => {
      if (filter.applied) {
        if (filter.comparator == "sort") {
          let newData = JSON.parse(JSON.stringify(filteredList));
          filteredList = newData.sort((a, b) => {
            const nameA = a[filter.column] ? a[filter.column] : "-";
            const nameB = b[filter.column] ? b[filter.column] : "-";
            return filter.value == "A"
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA);
          });
        }
        if (filter.comparator == "equal") {
          filteredList = filteredList.filter(
            (item) =>
              item[filter.column].toLowerCase() == filter.value.toLowerCase()
          );
          console.log("comparator", "=");
        }

        if (filter.comparator == "doesnotequal") {
          filteredList = filteredList.filter(
            (item) =>
              item[filter.column].toLowerCase() != filter.value.toLowerCase()
          );
          console.log("comparator", "!=");
        }

        if (filter.comparator == "beginswith") {
          let beginPattern = new RegExp("^" + filter.value.toLowerCase());
          filteredList = filteredList.filter((item) =>
            beginPattern.test(item[filter.column].toLowerCase())
          );
          console.log("comparator", "^");
        }
        if (filter.comparator == "endswith") {
          let endPattern = new RegExp(filter.value.toLowerCase() + "$");
          filteredList = filteredList.filter((item) =>
            endPattern.test(item[filter.column].toLowerCase())
          );
          console.log("comparator", "$");
        }
        if (filter.comparator == "contains") {
          filteredList = filteredList.filter((item) =>
            item[filter.column]
              .toLowerCase()
              .includes(filter.value.toLocaleLowerCase())
          );
          console.log("comparator", "has");
        }
        if (filter.comparator == "doesnotcontains") {
          filteredList = filteredList.filter(
            (item) =>
              !item[filter.column]
                .toLowerCase()
                .includes(filter.value.toLocaleLowerCase())
          );
          console.log("comparator", "nhas");
        }
        if (filter.comparator == "tecnology") {
          let ufPattern = new RegExp("UF");
          let ixPattern = new RegExp("IX");
          let roPattern = new RegExp("RO");

          filteredList = filteredList.filter((item) => {
            let ufValue = filter.uf
              ? ufPattern.test(item.technologyName)
              : filter.andSelected;
            let ixValue = filter.ix
              ? ixPattern.test(item.technologyName)
              : filter.andSelected;
            let roValue = filter.ro
              ? roPattern.test(item.technologyName)
              : filter.andSelected;

            return filter.andSelected
              ? ufValue && ixValue && roValue
              : ufValue || ixValue || roValue;
          });
        }
        if (filter.comparator == "inbetween") {
          let from = new Date(filter.minValue);
          let to = new Date(filter.maxValue);

          filteredList = filteredList.filter(
            (item) =>
              new Date(item[filter.column]) >= from &&
              new Date(item[filter.column]) <= to
          );
        }
      }
    });
    console.log("comparator", filteredList, openProjectInitialDataValue);
    setLstProjectData(filteredList);
  };

  return (
    <>
      <OpenProjectStyled
        size="lg"
        show={show && openModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="primary-modal"
        backdropClassName="dark-backdrop"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Row className="header-create-project bg-light d-flex">
          <Col lg={10} md={10} sm={10} className="heading">
            <h3>Open Project</h3>
            <p>
              Please click on the Project Name from the list below to open
              desired project. You can filter based on your preferences.
            </p>
          </Col>
          <Col lg={2} md={2} sm={2} className="close-icon">
            <button onClick={handleCloseModal}>
              <CloseIcon />
            </button>
          </Col>
        </Row>
        <Row className="project-details-row g-0">
          <div
            className={
              isKeyboardScrolling
                ? "project-details-scroll keyboard-scroll"
                : "project-details-scroll"
            }
            tabIndex="0"
            id="scrollBar"
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          >
            <div className="projects-container">
              <div className="project-name title card">
                <h3 className="heading">
                  Project Name
                  <span className="project-filter-icon">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          {/* <span> */}
                          <span
                            className="cursor"
                            onClick={() => sortTheData("projectName_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "projectName" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("projectName_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "projectName" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="filter-group">
                          <h6 className="filter-heading">Text Filters</h6>
                          <select
                            name="projectName"
                            onChange={handleChangeDropdown}
                            className="filter-sub-dropdown form-select"
                            id="colours"
                          >
                            {dropDown.map((option, index) => (
                              <option value={option.value} id={index}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* <input
                          onChange={handleChangeFilterInput}
                          type="text"
                          name="projectName"
                          value={
                            appliedFilter.find(
                              (item) => item.column == "projectName"
                            ).value
                          }
                          id="filter-inside-input"
                          className="form-control"
                        /> */}
                        <div className="filter-text-wrapper">
                          <InputWithIcon
                            onChange={handleChangeFilterInput}
                            value={
                              appliedFilter.find(
                                (item) =>
                                  item.column == "projectName" &&
                                  item.comparator != "sort"
                              ).value
                            }
                            id="f"
                            name="projectName"
                            type="text"
                            inputText={<CloseCircleGreenIcon />}
                            unitBgColor="transparent"
                          />
                          <Button id="btnClear" onClick={handleClearFilter}>
                            Clear Filter <CloseIcon />
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="technology title card">
                <h3 className="heading">
                  Technologies
                  <span className="project-filter-icon">
                    <Dropdown className="filter-dropdown">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("technologyName_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "technologyName" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("technologyName_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "technologyName" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>

                        <div className="check-group-wrapper">
                          <h6 className="filter-heading">By Technologies</h6>
                          <div className="checkbox-group d-flex">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <CustomRadioCheck
                                type="checkbox"
                                name="uf"
                                checked={
                                  appliedFilter.find(
                                    (item) =>
                                      item.column == "technologyName" &&
                                      item.comparator != "sort"
                                  ).uf
                                }
                                value="UF"
                                label="UF"
                                onChange={handleTechnologyChange}
                              />
                            </Form.Group>
                            {/* Ro Not in December scope */}
                            {/* <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <CustomRadioCheck
                                type="checkbox"
                                name="ro"
                                checked={
                                  appliedFilter.find(
                                    (item) =>
                                      item.column == "technologyName" &&
                                      item.comparator != "sort"
                                  ).ro
                                }
                                value="RO"
                                label="RO"
                                onChange={handleTechnologyChange}
                              />
                            </Form.Group> */}
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <CustomRadioCheck
                                type="checkbox"
                                name="ix"
                                checked={
                                  appliedFilter.find(
                                    (item) =>
                                      item.column == "technologyName" &&
                                      item.comparator != "sort"
                                  ).ix
                                }
                                value="IX"
                                label="IX"
                                onChange={handleTechnologyChange}
                              />
                            </Form.Group>
                          </div>
                          {/* <div className="check-group">
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                type="checkbox"
                                name="radiosort"
                                label="UF"
                                value=""
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                type="checkbox"
                                name="radiosort"
                                label="RO"
                                value=""
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-1"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                type="checkbox"
                                name="radiosort"
                                label="IX"
                                value=""
                              />
                            </Form.Group>
                          </div> */}
                        </div>
                        {/* <div className="wrapper-radio d-flex">
                          <CustomRadioCheck
                            label="And"
                            type="radio"
                            disabled={false}
                            isError={false}
                            name="andSelected"
                            id="and"
                            checked={
                              appliedFilter.find(
                                (item) =>
                                  item.column == "technologyName" &&
                                  item.comparator != "sort"
                              ).andSelected
                            }
                            onChange={(e) => handleRadioChange(true)}
                          />
                          <CustomRadioCheck
                            label="Or"
                            type="radio"
                            disabled={false}
                            isError={false}
                            name="andSelected"
                            id="or"
                            checked={
                              !appliedFilter.find(
                                (item) =>
                                  item.column == "technologyName" &&
                                  item.comparator != "sort"
                              ).andSelected
                            }
                            onChange={(e) => handleRadioChange(false)}
                          />
                        </div> */}
                        <div className="clear-filter">
                          <Button id="btnClear" onClick={handleClearFilter}>
                            Clear Filter
                            <CloseIcon />
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="market-segment title card">
                <h3 className="heading">
                  Market Segment
                  <span className="project-filter-icon">
                    <Dropdown className="filter-dropdown">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("segmentName_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "segmentName" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("segmentName_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "segmentName" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="filter-group">
                          <h6 className="filter-heading">
                            By Project Market Segment
                          </h6>
                          <CustomSelect
                            name="segmentName"
                            onChange={handleChangeFilterInput}
                            value={
                              appliedFilter.find(
                                (item) =>
                                  item.column == "segmentName" &&
                                  item.comparator != "sort"
                              ).value
                            }
                            required
                          >
                            <option value="">Select Market Segment</option>
                            {marketSegment?.map((data, i) => (
                              <option key={i} value={data.segmentName}>
                                {data.segmentName}
                              </option>
                            ))}
                          </CustomSelect>
                        </div>
                        <div className="clear-filter">
                          <Button id="btnClear" onClick={handleClearFilter}>
                            Clear Filter
                            <CloseIcon />
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="customer title card">
                <h3 className="heading">
                  Customer
                  <span className="project-filter-icon">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("customer_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "customer" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("customer_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "customer" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="filter-group">
                          <h6 className="filter-heading">Text Filters</h6>
                          <select
                            name="customer"
                            onChange={handleChangeDropdown}
                            className="filter-sub-dropdown form-select"
                            id="colours"
                          >
                            {dropDown.map((option, index) => (
                              <option value={option.value} id={index}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="filter-text-wrapper">
                          <InputWithIcon
                            onChange={handleChangeFilterInput}
                            value={
                              appliedFilter.find(
                                (item) =>
                                  item.column == "customer" &&
                                  item.comparator != "sort"
                              ).value
                            }
                            // id="filter-inside-input"
                            name="customer"
                            type="text"
                            inputText={<CloseCircleGreenIcon />}
                            unitBgColor="transparent"
                          />
                          <Button id="btnClear" onClick={handleClearFilter}>
                            Clear Filter <CloseIcon />
                          </Button>
                        </div>
                        {/* <input
                          type="text"
                          name=""
                          id="filter-inside-input"
                          className="form-control"
                        /> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="country title card">
                <h3 className="heading">
                  Country
                  <span className="project-filter-icon">
                    <Dropdown className="filter-dropdown">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("countryName_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "countryName" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("countryName_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "countryName" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="filter-group">
                          <h6 className="filter-heading">By Country</h6>
                          <select
                            className="filter-sub-dropdown form-select"
                            id="colours"
                            name="countryName"
                            value={
                              appliedFilter.find(
                                (item) =>
                                  item.column == "countryName" &&
                                  item.comparator != "sort"
                              ).value
                            }
                            onChange={handleChangeFilterInput}
                          >
                            <option value={""}>Select Country</option>
                            {Country?.map((data, i) => (
                              <option key={i} value={data.countryName}>
                                {data.countryName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="clear-filter">
                          <Button id="btnClear" onClick={handleClearFilter}>
                            Clear Filter
                            <CloseIcon />
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="last-modified title card">
                <h3 className="heading">
                  Last Modified
                  <span className="project-filter-icon">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("lastModified_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "lastModified" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("lastModified_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "lastModified" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="date-wrapper">
                          <div>
                            <CustomLabel label="From" />
                            <DateInput
                              onChange={(e) =>
                                handleDateChange(e, "lastModified_minValue")
                              }
                              value={
                                appliedFilter.find(
                                  (item) =>
                                    item.column == "lastModified" &&
                                    item.comparator != "sort"
                                ).minValue
                              }
                              name="lastModified_minValue"
                            />
                          </div>
                          <div>
                            <CustomLabel label="To" />
                            <DateInput
                              onChange={(e) =>
                                handleDateChange(e, "lastModified_maxValue")
                              }
                              value={
                                appliedFilter.find(
                                  (item) =>
                                    item.column == "lastModified" &&
                                    item.comparator != "sort"
                                ).maxValue
                              }
                              name="lastModified_maxValue"
                            />
                          </div>
                        </div>
                        <Button id="btnClear" onClick={handleClearFilter}>
                          Clear Filter
                          <CloseIcon />
                        </Button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="date-created title card">
                <h3 className="heading">
                  Date Created
                  <span className="project-filter-icon">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("createdDate_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "createdDate" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("createdDate_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "createdDate" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="date-wrapper">
                          <div>
                            <CustomLabel label="From" />
                            <DateInput
                              onChange={(e) =>
                                handleDateChange(e, "createdDate_minValue")
                              }
                              value={
                                appliedFilter.find(
                                  (item) =>
                                    item.column == "createdDate" &&
                                    item.comparator != "sort"
                                ).minValue
                              }
                              name="createdDate_minValue"
                            />
                          </div>
                          <div>
                            <CustomLabel label="To" />
                            <DateInput
                              onChange={(e) =>
                                handleDateChange(e, "createdDate_maxValue")
                              }
                              value={
                                appliedFilter.find(
                                  (item) =>
                                    item.column == "createdDate" &&
                                    item.comparator != "sort"
                                ).maxValue
                              }
                              name="createdDate_maxValue"
                            />
                          </div>
                        </div>
                        <Button id="btnClear" onClick={handleClearFilter}>
                          Clear Filter
                          <CloseIcon />
                        </Button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
              <div className="wave-version title card">
                <h3 className="heading">
                  WAVE Version
                  <span className="project-filter-icon">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FilterIconOpenProject />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="ascending-wrapper">
                          <h6 className="filter-heading">Sort By</h6>
                          <span
                            className="cursor"
                            onClick={() => sortTheData("waveVersion_A")}
                          >
                            {appliedFilter.find(
                              (item) =>
                                item.comparator == "sort" &&
                                item.column == "waveVersion" &&
                                item.applied &&
                                item.value == "A"
                            ) ? (
                              <ShortUpArrow />
                            ) : (
                              <SortUpandDownArrowIcon />
                            )}
                            Ascending
                          </span>
                          {/* </span> */}
                          <span>
                            <div
                              className="cursor"
                              onClick={() => sortTheData("waveVersion_D")}
                            >
                              {appliedFilter.find(
                                (item) =>
                                  item.comparator == "sort" &&
                                  item.column == "waveVersion" &&
                                  item.applied &&
                                  item.value == "D"
                              ) ? (
                                <ShortDownArrow />
                              ) : (
                                <SortUpandDownArrowIcon />
                              )}
                              Descending
                            </div>
                          </span>
                        </div>
                        <div className="filter-group">
                          <h6 className="filter-heading">Text Filters</h6>
                          <select
                            name="waveVersion"
                            onChange={handleChangeDropdown}
                            className="filter-sub-dropdown form-select"
                            id="colours"
                          >
                            {dropDown.map((option, index) => (
                              <option value={option.value} id={index}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          onChange={handleChangeFilterInput}
                          type="text"
                          name="waveVersion"
                          value={
                            appliedFilter.find(
                              (item) =>
                                item.column == "waveVersion" &&
                                item.comparator != "sort"
                            ).value
                          }
                          id="filter-inside-input"
                          className="form-control"
                        />
                        <Button id="btnClear" onClick={handleClearFilter}>
                          Clear Filter <CloseIcon />
                        </Button>
                        {/* <input
                          type="text"
                          name=""
                          id="filter-inside-input"
                          className="form-control"
                        />
                        <Button id="btnClear" onClick={clearFilter}>
                          Clear Filter <CloseIcon />
                        </Button> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </h3>
              </div>
            </div>
            <div className="projects-records-data">
              {lstProjectData.map((project, index) => (
                <>
                  <div className="open-project-data">
                    <div className="project-name-details title card">
                      <span>
                        <span
                          onClick={() => changeData(index)}
                          className="accordion-icon"
                        >
                          {collapse && currentRow === index ? (
                            <AccordionUpArrowIcon />
                          ) : (
                            <AccordionDownArrowIcon />
                          )}
                        </span>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">
                              {project.projectName}
                            </Tooltip>
                          }
                        >
                          <h3
                            className="project-title-name"
                            onClick={() => {
                              handleOnclick(project.projectID, 0);
                              navigate("/FeedWaterHome", {
                                state: {
                                  title: project.projectName,
                                  projectID: project.projectID,
                                  technologyName: project.technologyName,
                                  caseID: 0,
                                },
                              });

                              handleCloseModal();
                            }}
                          >
                            {project.projectName.length > 15
                              ? `${project.projectName.substring(0, 15)}...`
                              : project.projectName}
                          </h3>
                        </OverlayTrigger>
                      </span>
                    </div>
                    <div className="technology-details title card">
                      <span>{project.technologyName}</span>
                    </div>
                    <div className="market-segment-details title card">
                      <span>{project.segmentName}</span>
                    </div>
                    <div className="customer-details title card">
                      <span>{project.customer}</span>
                    </div>
                    <div className="country-details title card">
                      <span>{project.countryName}</span>
                    </div>
                    <div className="last-modified title card">
                      <span>
                        <Moment format="DD/MM/YYYY">
                          {project.lastModified ? project.lastModified : "-"}
                        </Moment>
                      </span>
                    </div>
                    <div className="date-created title card">
                      <span>
                        <Moment format="DD/MM/YYYY">
                          {project.createdDate
                            ? project.createdDate.substring(0, 10)
                            : "-"}
                        </Moment>
                      </span>
                    </div>
                    <div className="wave-Version title card">
                      <span>
                        {project.waveVersion ? project.waveVersion : "-"}
                      </span>
                    </div>
                  </div>
                  {selectedIndex === index &&
                    collapse &&
                    lstCaseData.map((data) => (
                      <>
                        {data.projectID === project.projectID && (
                          <div className="open-project-data">
                            <div className="project-child-name-details title card">
                              <span>
                                <h3
                                  className="project-title-name case-name"
                                  onClick={() => {
                                    handleOnclick(
                                      project.projectID,
                                      data.caseID
                                    );
                                    navigate("/FeedWaterHome", {
                                      state: {
                                        title: project.projectName,
                                        projectID: project.projectID,
                                        technologyName: project.technologyName,
                                        caseID: data.caseID,
                                      },
                                    });

                                    handleCloseModal();
                                  }}
                                >
                                  {data.caseName ? ` - ${data.caseName}` : "-"}
                                </h3>
                              </span>
                            </div>
                            <div className="technology-details title card">
                              <span>
                                {data.technologyName
                                  ? data.technologyName
                                  : "-"}
                              </span>
                            </div>
                            <div className="market-segment-details title card">
                              <span>
                                {data.segmentName ? data.segmentName : "-"}
                              </span>
                            </div>
                            <div className="customer-details title card">
                              <span>{data.customer ? data.customer : "-"}</span>
                            </div>
                            <div className="country-details title card">
                              <span>
                                {data.countryName ? data.countryName : "-"}
                              </span>
                            </div>
                            <div className="last-modified title card">
                              <span>
                                <Moment format="DD/MM/YYYY">
                                  {data.lastModified ? data.lastModified : "-"}
                                </Moment>
                              </span>
                            </div>
                            <div className="date-created title card">
                              <span>
                                {/* <Moment format="DD/MM/YYYY"> */}
                                {data.dateCreated ? data.dateCreated : "-"}
                                {/* </Moment> */}
                              </span>
                            </div>
                            <div className="wave-Version title card">
                              <span>
                                {data.waveVersion ? data.waveVersion : "-"}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </>
              ))}
            </div>
          </div>
        </Row>
      </OpenProjectStyled>
    </>
  );
};

export default OpenProject;
