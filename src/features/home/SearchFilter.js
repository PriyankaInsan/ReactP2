/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Dropdown } from "react-bootstrap";
import SearchFilterStyled from "./SearchFilterStyled";
import CardDetails from "./CardDetails";
import CardList from "./CardList";
import ListViewIcon from "../../common/icons/ListViewIcon";
import GridViewIcon from "../../common/icons/GridViewIcon";
import SearchIcon from "../../common/icons/SearchIcon";
import { useDispatch } from "react-redux";
// import CustomSelect from "../../common/styles/components/selects/CustomSelect";
import {
  btnlist,
  updatetitle,
  updateOrder,
  sortData2,
  updateLoader,
  Tempbtnlist,
  updateFlag,
} from "../home/CardListSlice";
import {
  Folderbtnlist,
  Folderupdatetitle,
  FolderupdateOrder,
  sortFolderData,
} from "../home/ViewAllFolderSlice";
import { useSelector } from "react-redux";
import CloseIcon from "../../common/icons/CloseIcon";
import { useRef } from "react";
import ViewAllFolder from "../home/ViewAllFolder";
import ViewAllFolderListView from "../home/ViewAllFolderListView";
import GridViewActiveIcon from "../../common/icons/GridViewActiveIcon";
import ListViewActiveIcon from "../../common/icons/ListViewActiveIcon";
import GridViewHoveredIcon from "../../common/icons/GridViewHoveredIcon";
import ListViewHoverIcon from "../../common/icons/ListViewHoverIcon";
import SearchInputBox from "../../common/styles/components/inputs/SearchInputBox";
import CloseCircleGreenIcon from "../../common/icons/CloseCircleGreenIcon";
import CustomSelect from "../../common/styles/components/selects/CustomSelect";
import { useLazyGetAllDataQuery } from "../../services/apiConfig";
import ErrorSearchIcon from "../../common/icons/ErrorSearchIcon";
import CloseCircleRedIcon from "../../common/icons/CloseCircleRedIcon";
import ErrorMessage from "../../common/styles/components/headings/ErrorMessage";
import CustomRadio from "../../common/styles/components/radios/CustomRadio";
//import cardData from "./cardListSlice.json" ;
const SearchFilter = ({showSideMenu}) => {
  const[ixCheck,setixCheck]=useState(false);
  const[ufCheck,setufCheck]=useState(false);
  const [viewfolder, setviewfolder] = useState(true);
  const [getMarketSegment, responseMarketSegment] = useLazyGetAllDataQuery();
  const StoreSidLeftpanel = useSelector((state) => state.leftpanel.data);
  const {flag,pFlag,pTitle} = useSelector((state) => state.cardlist);  const ref = useRef([]);
  const refClearText = useRef("");
  const selectInputRef = useRef();
  const [cardDetail, setCardDetail] = useState(true);
  const [txtvalue, setTxtvalue] = useState("");
  const [sortlable, setsortlable] = useState(flag);
  const [isFocused, setIsFocused] = useState(null);
  const [isError,setIsError] = useState(false);
  const getInitialState = () => {
    const value = null;
    return value;
  };
  useEffect(()=>{
    setsortlable(flag);
  },[flag]);
 
 
  const filterSort = [
    { label: "Date Created", value: "Date Created" },
    { label: "Last Modified", value: "Last Modified" },
    { label: "Project Name (ascending)", value: "Project Name (ascending)" },
    { label: "Project Name (descending)", value: "Project Name (descending)" },
  ];
  
  const filterSortFolderList = [
    // { label: "Last Modified", value: "Last Modified" },
    { label: "Date Created", value: "Date Created" },
    { label: "Folder Name (ascending)", value: "Folder Name (ascending)" },
    { label: "Folder Name (descending)", value: "Folder Name (descending)" },
  ];
  
  const [mouseEnter, setMouseEnter] = useState(null);
  const [txtbrand, setTextbrand] = useState(getInitialState);
  // const [getMarketSegment, responseMarketSegment] = useLazyGetAllDataQuery();
  // const [marketSegment, setMarketSegment] = useState();
  const StoreData = useSelector((state) => state.cardlist.data);
  const TempStoreData = useSelector((state) => state.cardlist.Temdata);
  const FolderTempStoreData = useSelector((state) => state.Folderview.Temdata);
  const FolderStoreData = useSelector((state) => state.Folderview.data);
  const [marketSegment, setmarketSegment] = useState();
  const [selectedSegmentValue, setSelectedSegmentValue] =
    useState("All");
  const dispatch = useDispatch([]);
  const [Technology, setTechnology] = useState({
    technologes: [],
    response: [],
  });
  useEffect(() => {
    dispatch(updateLoader(true));
    // getMarketSegment(`${"masterdata/api/v1/MarketSegment"}?userID=${1}`);
  }, [dispatch]);

  useEffect(()=>{
    btnclear();
  },[StoreSidLeftpanel]);
  useEffect(()=>{
    if(StoreSidLeftpanel == "masterdata/api/v1/FolderList"){
      if(sortlable.includes("Project")){
        let temp = sortlable.replace("Project","Folder");
        setsortlable(temp);
        RadioChange({target:{value:temp}});
      }
      if(sortlable == "Last Modified"){
       setsortlable("Date Created");
       RadioChange({target:{value:"Date Created"}});
      }
    }
    else{
      if(sortlable.includes("Folder")){
        let temp = sortlable.replace("Folder","Project");
        setsortlable(temp);
        RadioChange({target:{value:temp}});
      }
    }
   
  },[StoreSidLeftpanel]);
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
  // const defaultSort = () => {
  //   if(StoreData.length>0){
  //     dispatch(updateFlag("Last Modified"));
  //     dispatch(updateOrder("A"));
  //     dispatch(sortData2("MD"));
  //   }

  // };
  // useEffect(() => {
  //   defaultSort();
  //   // dispatch(btnlist(TempStoreData));
  // }, [StoreData]);
  // useEffect(() => {
  //   console.log("value, checked,Technology",Technology);
  //   if (StoreData.length > 0) {
  //     searchFunction(null);
  //   }
  // }, [Technology]);
  // useEffect(() => {
  //   console.log("value, checked,Technology",Technology);
  //   if (StoreData.length > 0) {
  //     searchFunction();
  //   }
  // }, [selectedSegmentValue]);
  useEffect(() => {
    getMarketSegment(`${"masterdata/api/v1/MarketSegment"}?userID=${1}`);
  }, []);

  const searchFunction = (branName) => {
    if(branName==null)
    {
      branName=txtbrand;
    }
    if (parseInt(Technology.technologes.length) > 0 && branName !== null) {
      console.log("test Value ",Technology.technologes.length+"-"+branName+"-",TempStoreData);
      const array = Technology.response;
      const stringvalue = array.toString();
      let _RecentProject1 = TempStoreData?.filter(function (item) {
        for (var i = 0; i < array.length; i++) {
          if (item.technologyName.includes(array[i])) return true;
        }
        return false;
      });
     // const array = Technology.response;
      //const stringvalue = array.toString();
      if(branName!=="All"){
        let _RecentProject = _RecentProject1.filter((item) =>
        item.segmentName.includes(branName)
      );
      dispatch(btnlist(_RecentProject));
      }else{
        dispatch(btnlist(_RecentProject1));
      }

      
    } else if (parseInt(Technology.technologes.length) > 0) {
      const array = Technology.technologes;
      const stringvalue = array.toString();
      let _RecentProject = TempStoreData.filter(function (item) {
        for (var i = 0; i < array.length; i++) {
          if (item.technologyName.includes(array[i])) return true;
        }
        return false;
      });
      dispatch(btnlist(_RecentProject));
    } else if (branName !==null) {
      const array = Technology.technologes;
      const stringvalue = array.toString();
      if(branName!=="All"){
        let _RecentProject = TempStoreData.filter((item) =>
        item.segmentName.includes(branName)
      );
      dispatch(btnlist(_RecentProject));
      }else{
        dispatch(btnlist(TempStoreData));
      }
    } else {
      console.log("pawan?????",Technology.technologes.length);
      dispatch(btnlist(TempStoreData));
    }
    console.log("test Value ",Technology.technologes.length+"-"+branName+"-",StoreData);
  };

  const CallData = () => {
    // setsortlable("Last Modified");
    setCardDetail(true);
    setviewfolder(true);
    // if (TempStoreData.length > 0) {
    //   dispatch(updatetitle("MD"));
    //   dispatch(updateOrder("D"));
    //   let Result = TempStoreData.slice().sort(function (a, b) {
    //     return new Date(b.lastModified) - new Date(a.lastModified);
    //   });
    //   dispatch(btnlist(Result));
    // }y
    RadioChange({target:{value:sortlable}});
    // if(sortlable==="Last Modified"){
    //   dispatch(updateOrder("A"));     
    //   dispatch(updateFlag("Last Modified"));
    //   dispatch(sortData2({flag:"MD",data:StoreData}));
    
    // }
    // if(sortlable==="Date Created"){
    //   dispatch(updateOrder("A"));
    //   dispatch(updateFlag("Date Created"));
    //   dispatch(FolderupdateOrder("A"));
    //   dispatch(sortFolderData({flag:"CD",data:FolderStoreData}));     
    //   dispatch(sortData2({flag:"CD",data:StoreData}));
    // }
    // if(sortlable==="Project Name (ascending)"){
    //   dispatch(updateOrder("A"));
    //   dispatch(updateFlag("Project Name (ascending)"));
    //   dispatch(sortData2({flag:"PN",data:StoreData}));
      
    // }
    // if(sortlable==="Project Name (descending)"){
    //   dispatch(updateOrder("D"));
    //   dispatch(updateFlag("Project Name (descending)"));
    //   dispatch(sortData2({flag:"PN",data:StoreData}));     
    // }

    // if(sortlable==="Folder Name (ascending)"){
    //   dispatch(updateFlag("Folder Name (descending)"));
    //   dispatch(FolderupdateOrder("A"));
    //   dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));     
    // }
    // if(sortlable==="Folder Name (descending)"){
    //   dispatch(FolderupdateOrder("D"));
    //   dispatch(updateFlag("Folder Name (descending)"));
    //   dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));     
    // }
  };
  const CallDetail = () => {
    // setsortlable("Last Modified");
    setCardDetail(false);
    setviewfolder(false);
    // dispatch(updatetitle("MD"));
    // dispatch(updateOrder("D"));
RadioChange({target:{value:sortlable}});
    // if(sortlable==="Last Modified"){
    //   dispatch(updateOrder("A"));
    //   dispatch(updateFlag("Last Modified"));
    //   dispatch(sortData2({flag:"MD",data:StoreData}));    
    // }
    // if(sortlable==="Date Created"){
    //   dispatch(updateOrder("A"));
    //   dispatch(updateFlag("Date Created"));
    //   dispatch(FolderupdateOrder("A"));
    //   dispatch(sortFolderData({flag:"CD",data:FolderStoreData}));    
    //   dispatch(sortData2({flag:"CD",data:StoreData}));
    // }
    // if(sortlable==="Project Name (ascending)"){
    //   dispatch(updateOrder("A"));
    //   dispatch(updateFlag("Project Name (ascending)"));
    //   dispatch(sortData2({flag:"PN",data:StoreData}));
     
    // }
    // if(sortlable==="Project Name (descending)"){
    //   dispatch(updateOrder("D"));
    //   dispatch(updateFlag("Project Name (descending)"));
    //   dispatch(sortData2({flag:"PN",data:StoreData}));
    // }

    // if(sortlable==="Folder Name (ascending)"){
    //   dispatch(updateFlag("Folder Name (descending)"));
    //   dispatch(FolderupdateOrder("A"));
    //   dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));     
    // }
    // if(sortlable==="Folder Name (descending)"){
    //   dispatch(FolderupdateOrder("D"));
    //   dispatch(updateFlag("Folder Name (descending)"));
    //   dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));     
    // }
    // let Result = TempStoreData.slice().sort(function (a, b) {
    //   return new Date(b.lastModified) - new Date(a.lastModified);
    // });
    // dispatch(btnlist(Result));
  };
  const txtchange = (e) => {
    const inputValue = e.target.value;

    const regex = /^[a-zA-Z0-9-_\s]+$/;

    if (inputValue === "") {
      btnCleartext();
      setTxtvalue("");
      setIsError(false);
    }
    else if(regex.test(inputValue)){
      setTxtvalue(inputValue);
      setIsError(false);
    }
    else{
      setIsError(true);
      setTxtvalue(inputValue);
    }
  };
  const btnCleartext = () => {
    if (StoreSidLeftpanel == "masterdata/api/v1/FolderList") {
      dispatch(Folderbtnlist(FolderTempStoreData));
    } else {
      dispatch(btnlist(TempStoreData));
    }
  };
  const SearchTxt = () => {
    if (txtvalue === "") {
      setTxtvalue("");
    }
    var _RecentProject;
    if (StoreSidLeftpanel == "masterdata/api/v1/FolderList") {
      if (txtvalue !== "") {
        _RecentProject = FolderTempStoreData.filter((data) =>
          data.folderName.toUpperCase().includes(txtvalue.toUpperCase())
        );
        dispatch(Folderbtnlist(_RecentProject));
      } else {
        dispatch(Folderbtnlist(FolderTempStoreData));
      }
    } else {
      if (txtvalue !== "") {
        _RecentProject = TempStoreData.filter(
          (data) =>
            data.projectName.toUpperCase().includes(txtvalue.toUpperCase()) ||
            data.tagName.toUpperCase().includes(txtvalue.toUpperCase())
        );
        dispatch(btnlist(_RecentProject));
      } else {
        dispatch(btnlist(TempStoreData));
      }
    }
  };
  const handleDropdownSelect = (e) => {
    setsortlable(e);
  };
  const RadioChange = (e) => {
    if (StoreSidLeftpanel == "masterdata/api/v1/FolderList") {
      if (FolderTempStoreData.length > 0) {
        if (e.target.value !== null || e.target.value !== undefined) {
          setsortlable(e.target.value);
          if (e.target.value === "Date Created") {
            dispatch(FolderupdateOrder("A"));
            dispatch(updateFlag("Date Created"));
            dispatch(sortFolderData({flag:"CD",data:FolderStoreData}));
          } else if (e.target.value === "Last Modified") {
            dispatch(FolderupdateOrder("A"));
            dispatch(updateFlag("Last Modified"));
            dispatch(sortFolderData({flag:"MD",data:FolderStoreData}));
          } else if (e.target.value === "Folder Name (ascending)") {
            dispatch(FolderupdateOrder("A"));
            dispatch(updateFlag("Folder Name (ascending)"));
            dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));
          } else {
            dispatch(FolderupdateOrder("D"));
            dispatch(updateFlag("Folder Name (descending)"));
            dispatch(sortFolderData({flag:"PN",data:FolderStoreData}));
          }
        }
      }
    } 
    
    
    
    else {
      // if(TempStoreData.length>0){
      //   const {value} = e.target;
      //   const [title,order] = value.split(" ");
      //   dispatch(updateOrder(order));
      //   dispatch(sortData2(title));
      // }}
      if (TempStoreData.length > 0) {
        if (e.target.value !== null || e.target.value !== undefined) {
          setsortlable(e.target.value);
          if(e.target.value==="Last Modified"){
            dispatch(updateOrder("A"));           
            dispatch(updateFlag("Last Modified"));
            dispatch(sortData2({flag:"MD",data:StoreData}));
          
          }
          if(e.target.value==="Date Created"){
            dispatch(updateOrder("A"));
            dispatch(updateFlag("Date Created"));
            dispatch(sortData2({flag:"CD",data:StoreData}));
          }
          if(e.target.value==="Project Name (ascending)"){
            dispatch(updateOrder("A"));
            dispatch(updateFlag("Project Name (ascending)"));
            dispatch(sortData2({flag:"PN",data:StoreData}));
            
          }
          if(e.target.value==="Project Name (descending)"){
            dispatch(updateOrder("D"));
            dispatch(updateFlag("Project Name (descending)"));
            dispatch(sortData2({flag:"PN",data:StoreData}));
            
      
          }
      }
    }}
  };
  const drpChange = (e) => {
     var targetValue = e.target.value;
     setSelectedSegmentValue(targetValue);
    // if (e.target.value === "bio") {
    //   targetValue = "Bioprocessing";
    // }
    // let _RecentProject = TempStoreData.filter(
    //   (item) => item.segmentName === targetValue
    // );
    // dispatch(btnlist(_RecentProject));
    // //dispatch(Tempbtnlist(_RecentProject));
     setTextbrand(e.target.value);
     setTimeout(()=>{
      searchFunction(e.target.value);
    },1);
    
  };
  const btnclear = () => {
    
    // for (let i = 0; i < ref.current.length; i++) {
    //   ref.current[i].checked = false;
    // }

    setTechnology({
      technologes: [],
      response: [],
    });
    setTextbrand(null);
    setixCheck(false);
    setufCheck(false);
   setSelectedSegmentValue( "All");    
    dispatch(btnlist(TempStoreData));
    dispatch(updatetitle("PN"));
    dispatch(updateOrder("A"));
    console.log("TempStoreData",TempStoreData);
    searchFunction(null);
  };
  useEffect(()=>{
    searchFunction(null);
  },[Technology]);
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { technologes } = Technology;
    if(value=="IX")
    {
      setixCheck(checked);
    }
    else
    {
      setufCheck(checked);
    }
    // Case 1 : The user checks the box
    if (checked) {
      setTechnology({
        technologes: [...technologes, value],
        response: [...technologes, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTechnology({
        technologes: technologes.filter((e) => e !== value),
        response: technologes.filter((e) => e !== value),
      });
    }
 
     // searchFunction(null);
    //console.log("value, checked,Technology",value, checked,Technology);
  };
  const handleHover = (id) => {
    setMouseEnter(id);
  };
  const handleUnHover = () => {
    setMouseEnter(null);
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleKeyDown=(e)=>{
    switch (e.key) {
      case "Enter":
        console.log("sjdhs",e);
        if (txtvalue === "") {
          setTxtvalue("");
        }
        var _RecentProject;
        if (StoreSidLeftpanel == "masterdata/api/v1/FolderList") {
          if (txtvalue !== "") {
            _RecentProject = FolderTempStoreData.filter((data) =>
              data.folderName.toUpperCase().includes(txtvalue.toUpperCase())
            );
            dispatch(Folderbtnlist(_RecentProject));
          } else {
            dispatch(Folderbtnlist(FolderTempStoreData));
          }
        } else {
          if (txtvalue !== "") {
            _RecentProject = TempStoreData.filter(
              (data) =>
                data.projectName.toUpperCase().includes(txtvalue.toUpperCase()) ||
                data.tagName.toUpperCase().includes(txtvalue.toUpperCase())
            );
            dispatch(btnlist(_RecentProject));
          } else {
            dispatch(btnlist(TempStoreData));
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SearchFilterStyled showSideMenu={showSideMenu}>
        <Row className="search-filter">
          <Col lg={6} md={6} sm={6} xs={6}>
            <div className="search-box">
              {/* <Form.Group className='d-flex align-items-center'>
                <div className="input-field d-flex"> */}
              {StoreSidLeftpanel == "masterdata/api/v1/FolderList" ? (
                <>
                  <SearchInputBox
                    type="text"
                    placeholder={!isError?"Search Folders":"wrong text"}
                    onChange={(e) => txtchange(e)}
                    icon={!isError?<SearchIcon />:<ErrorSearchIcon/>}
                    unitBgColor="transparent"
                    onSearch={() => SearchTxt()}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(1)}
                    isFocused={isFocused === 1}
                    inputText={isError?<CloseCircleRedIcon/>:(txtvalue != ""? <CloseCircleGreenIcon />: "") }
                    isError={isError}
                    disabled={false}
                    value={txtvalue}
                    onKeyDown={handleKeyDown}                                      
                  />
                  <ErrorMessage errorIcon={true} style={{visibility:isError?"visible":"hidden"}} texMsg={"Please check your input or clear this field."}/>

                  {/* {!StoreData.length ? (
                    <h6 className="error-msg">Records not found</h6>
                  ) : (
                    ""
                  )}  */}
                </>
              ) : (
                <>
                  <SearchInputBox
                    type="text"
                    placeholder={!isError?"Search Projects":"wrong text"}
                    onChange={(e) => txtchange(e)}
                    icon={!isError?<SearchIcon />:<ErrorSearchIcon/>}
                    unitBgColor="transparent"
                    onSearch={() => SearchTxt()}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(1)}
                    isFocused={isFocused === 1}
                    inputText={isError?<CloseCircleRedIcon/>:(txtvalue != ""? <CloseCircleGreenIcon />: "") }
                    isError={isError}
                    disabled={false}
                    value={txtvalue}
                    onKeyDown={handleKeyDown}                                      

                  />
                <ErrorMessage style={{visibility:isError?"visible":"hidden"}} texMsg={"Please check your input or clear this field."}/>
                  {/* {!StoreData.length ? (
                    <h6 className="error-msg">Records not found</h6>
                  ) : (
                    ""
                  )} */}
                </>
              )}
              {/* {txtvalue !=""?<div className="close-icon" onClick={btnCleartext}> <CloseIcon/> </div>: ""}
                <div className="search-icon" onClick={() => SearchTxt()}><SearchIcon /></div>
                </div>
              </Form.Group> */}
            </div>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="d-flex filter">
            {StoreSidLeftpanel == "masterdata/api/v1/FolderList" ? (
              ""
            ) : (
              <Dropdown className="filter-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h6>By Technology</h6>
                  <div className="checkbox-group d-flex">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        name="Technology"
                        checked={ufCheck}
                        ref={(element) => {
                          ref.current[0] = element;
                        }}
                        value="UF"
                        label="UF"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* RO Not in December scope */}
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        name="Technology"
                        ref={(element) => {
                          ref.current[1] = element;
                        }}
                        value="RO"
                        label="RO"
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        name="Technology"
                        ref={(element) => {
                          ref.current[2] = element;
                        }}
                        checked={ixCheck}
                        value="IX"
                        label="IX"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <h6 className="market-segment-filter">
                    By Project Market Segment
                  </h6>
                  {/* <select
                    className="filter-sub-dropdown form-select"
                    onChange={drpChange}
                    ref={selectInputRef}
                    id="colours"
                  >
                    <option value="bio">Bio-processing</option>
                    <option value="Catalysis">Catalysis</option>
                    <option value="Commercial">Commercial</option>
                    <option value="industrial">Industrial Utility Water</option>
                  </select> */}
                  <CustomSelect
                    name="marketSegmentID"
                    onChange={drpChange}
                    value={selectedSegmentValue}
                    required
                  >
                    <option >
                        All
                      </option>
                    {/* <option value="select-market segment">Select Market Segment</option> */}
                    {marketSegment?.map((data, i) => (
                      <option key={i} value={data.marketSegmentID}>
                        {data.segmentName}
                      </option>
                    ))}
                    ;
                  </CustomSelect>
                  <div className="clear-filter">
                    <button onClick={btnclear}>
                      Clear Filter <CloseIcon />
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {/* {cardDetail? */}
            <Dropdown className="sort-dropdown" onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort:<p className="selected-option">{sortlable}</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {StoreSidLeftpanel == "masterdata/api/v1/FolderList" ? 
               <div className="checkbox-group">
               {filterSortFolderList?.map((SortData, ind) => (
                   <CustomRadio
                     type="radio"
                     fontFamily="NotoSansRegular"
                     lineHeight="22px"
                     className="sort-radios"
                     name="radiosort"
                     label={SortData.label}
                     key={SortData.label}
                     value={SortData.value}
                     checked={SortData.value === sortlable}
                     onClick={RadioChange}
                   />
               ))}
               </div>:
                <div className="checkbox-group">
                  {filterSort?.map((SortData, ind) => (
                      <CustomRadio
                        fontFamily="NotoSansRegular"
                        lineHeight="22px"
                        type="radio"
                        className="sort-radios"
                        name="radiosort"
                        label={SortData.label}
                        key={SortData.label}
                        value={SortData.value}
                        checked={SortData.value === sortlable}
                        onClick={RadioChange}
                      /> 
                  ))}
                </div>}

              </Dropdown.Menu>
            </Dropdown>
            {StoreSidLeftpanel == "masterdata/api/v1/FolderList" ? (
              <>
                <div
                  className="grid-icon"
                  onClick={CallData}
                  onMouseMove={() => handleHover("g")}
                  onMouseLeave={handleUnHover}
                >
                  {viewfolder === true ? (
                    <GridViewActiveIcon />
                  ) : mouseEnter === "g" ? (
                    <GridViewHoveredIcon />
                  ) : (
                    <GridViewIcon />
                  )}
                </div>
                <div
                  className="list-icon"
                  onClick={CallDetail}
                  onMouseMove={() => handleHover("l")}
                  onMouseLeave={handleUnHover}
                >
                  {viewfolder === false ? (
                    <ListViewActiveIcon />
                  ) : mouseEnter === "l" ? (
                    <ListViewHoverIcon />
                  ) : (
                    <ListViewIcon />
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  className="grid-icon"
                  onClick={CallData}
                  onMouseMove={() => handleHover("g")}
                  onMouseLeave={handleUnHover}
                >
                  {viewfolder === true ? (
                    <GridViewActiveIcon />
                  ) : mouseEnter === "g" ? (
                    <GridViewHoveredIcon />
                  ) : (
                    <GridViewIcon />
                  )}
                </div>
                <div
                  className="list-icon"
                  onClick={CallDetail}
                  onMouseMove={() => handleHover("l")}
                  onMouseLeave={handleUnHover}
                >
                  {viewfolder === false ? (
                    <ListViewActiveIcon />
                  ) : mouseEnter === "l" ? (
                    <ListViewHoverIcon />
                  ) : (
                    <ListViewIcon />
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </SearchFilterStyled>
      {StoreSidLeftpanel == "masterdata/api/v1/FolderList" ? (
        viewfolder ? (
          <ViewAllFolder />
        ) : (
          <ViewAllFolderListView />
        )
      ) : cardDetail ? (
        <CardDetails />
      ) : (
        <CardList />
      )}
    </>
  );
};

export default SearchFilter;
