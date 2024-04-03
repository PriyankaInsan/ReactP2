/* eslint-disable max-len */
import React, { useEffect, useRef } from "react";
import {
  Card,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import IXInitializationStyled from "./IXInitializationStyled";
import { useState } from "react";
import InfoIconHovered from "../../../common/icons/InfoIconHovered";
import { useDispatch } from "react-redux";
import {
  updateIXStore,
  updateModeling,
  updateNewDesignExist,
  updateCaseFlag,
  updateExistingNew
} from "./IXDSlice";
import { useSelector } from "react-redux";
import CrossCircleIcon from "../../../common/icons/CrossCircleIcon";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import Loader from "../../../common/utils/Loader";
import InputWithSelect from "../../../common/styles/components/inputs/InputWithSelect";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import MandatoryFieldIcon from "../../../common/icons/MandatoryFieldIcon";
import { colors } from "../../../common/styles/Theme";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import EvaluateExistingPlantPopup from "./EvaluateExistingPlantPopup";
import CloseCircleRedIcon from "../../../common/icons/CloseCircleRedIcon";
import CloseCircleWarningIcon from "../../../common/icons/CloseCircleWarningIcon";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";

function sum() {
  var txtFirstNumberValue = document.getElementById("txtTrainsOnline").value;
  var txtSecondNumberValue = document.getElementById("txtTrainsSubsidy").value;
  if (txtFirstNumberValue == "") {
    txtFirstNumberValue = 0;
  }
  if (txtSecondNumberValue == "") {
    txtSecondNumberValue = 0;
  }
  var result = parseInt(txtFirstNumberValue) + parseInt(txtSecondNumberValue);
  if (!isNaN(result)) {
    return result;
  }
  return 0;
}
// import {useLazyGetAllDataQuery} from "../../services/apiConfig";
const IXInitialization = () => {
  const [isHovered, setIsHovered] = useState();
  const myInput = useRef(null);
  const { feedFlowRate, productFlowRate, selectedEndNode } = useSelector(
    (state) => state.processDiagramSlice
  );
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  // const [Modeling , setModeling ] = useState("NewPlant");
  const [Flowrate, setFlowrate] = useState("no_bufferTank_ind");
  const [RunTime, setRunTime] = useState(
    "evaluateExisiting_ind_RuntimeOptimized"
  );
  const [TrainsTotal, setTrainsTotal] = useState(0);
  //const [trains_Online , settrains_Online ] = useState(0);
  const [Automatic, setAutomatic] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Hours");
  const [isFocused, setIsFocused] = useState(false);
  // const [focused, setFocused] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const ixStore = useSelector((state) => state.IXStore.data);
  const ixStore1 = useSelector((state) => state.IXStore.testdata);
  const Demineralization = useSelector(
    (state) => state.IXStore.Demineralization
  );
  const loader = useSelector((state) => state.cardlist.loader);
  const Modeling = useSelector((state) => state.IXStore.modeling);
  const [isSumValid, setIsSumValid] = useState(false);
  const [autoFocusvalue, setautoFocusvalue] = useState(false);
  const [autoVelocityCheck, setautoVelocityCheck] = useState(false);
  const [message, setMessage] = useState("");
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const {cationResin ,anionResin} =
    useSelector((state) => state.IXStore.data);
  // const handleMouseEnter = (e)=> {
  //   console.log("rrrrrr",e.target.name);
  //   setIsHovered(e.target.name);
  // };
  // console.log("ixStore initialzation",ixStore );
  //  useEffect(()=>{
  // myInput.current.focus();
  //  },[]);
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
     return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsSumValid(false);
    }
  };
  const handleMouseLeave = () => {
    setIsHovered();
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };
  const handleBlur = (e) => {
   var MinValue=unit.selectedUnits[10]==="BV/h"?5:GlobalUnitConversion(GlobalUnitConversionStore,5,unit.selectedUnits[10],"BV/h")?.toFixed(2);

   var MaxValue= unit.selectedUnits[10]==="BV/h"?60:GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[10],"BV/h")?.toFixed(2);
   console.log("MinValue",MinValue,typeof(MinValue));
   console.log("MinValue",MaxValue,typeof(MaxValue));
    let convertedValue=0;
    let valueIsSafe = false;
    if (e.target.name === "space_velocity_txt") {
      if ( e.target.value <parseFloat(MinValue) || e.target.value >parseFloat(MaxValue) || isNaN(e.target.value)) {
        console.log("e.target.value-", parseInt(e.target.value));
        setIsSumValid(true);
        setautoFocusvalue(true);
        setIsFocused(1);
        setMessage("Please Enter Correct Range of the Specific Velocity !");
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      }else{
        valueIsSafe = true;
        let newValue=e.target.value.toString().split(".")[1]?.length>7?parseFloat(e.target.value).toFixed(7):parseFloat(e.target.value).toFixed(e.target.value.toString().split(".")[1]?.length);
        dispatch(
          updateIXStore({ ...ixStore, [e.target.name]: newValue })
        );
      }
    } else if (e.target.name === "operatingCycle_Lenght_txt") {
      if (ixStore?.hrs_Day_ind === true) {
        if (
          e.target.value < 3 ||
          e.target.value > 10000 ||
          isNaN(e.target.value)
        ) {
          console.log("e.target.value-", parseInt(e.target.value));
          setIsSumValid(true);
          setautoFocusvalue(true);
          setIsFocused(1);
          setMessage("Please Enter Correct Range of the operating Cycle !");
          //if(e.target.value < 1 || e.target.value >= 100 )
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }
        else{
          valueIsSafe = true;
          let newValue=e.target.value.toString().split(".")[1]?.length>7?parseFloat(e.target.value).toFixed(7):parseFloat(e.target.value).toFixed(e.target.value.toString().split(".")[1]?.length);
          dispatch(
            updateIXStore({ ...ixStore, [e.target.name]:newValue })
          );
        }
      } else {
        if (
          e.target.value < 1 ||
          e.target.value > 417 ||
          isNaN(e.target.value)
        ) {
          console.log("e.target.value-", parseInt(e.target.value));
          setIsSumValid(true);
          setautoFocusvalue(true);
          setIsFocused(1);
          setMessage("Please Enter Correct Range of the operating Cycle !");
          //if(e.target.value < 1 || e.target.value >= 100 )
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }else{
          valueIsSafe = true;
          let newValue=e.target.value.toString().split(".")[1]?.length>7?parseFloat(e.target.value).toFixed(7):parseFloat(e.target.value).toFixed(e.target.value.toString().split(".")[1]?.length);
          dispatch(
            updateIXStore({ ...ixStore, [e.target.name]:newValue})
          );
        }
      }
    } else if (e.target.name === "Bypassed") {
      if (e.target.value < 0 || e.target.value > 95 || isNaN(e.target.value)) {
        console.log("e.target.value-", parseInt(e.target.value));
        setIsSumValid(true);
        setautoFocusvalue(true);
        setIsFocused(1);
        setMessage("Please Enter Correct Range of the Bypassed!");
        //if(e.target.value < 1 || e.target.value >= 100 )
        setTimeout(() => {
          e.target.focus();
        }, 0);
      }else{
        valueIsSafe = true;
      }
    } else if (e.target.name === "trains_Online") {
      if (e.target.value < 1 || e.target.value > 20 || isNaN(e.target.value)) {
        console.log("e.target.value-", parseInt(e.target.value));
        setIsSumValid(true);
        setautoFocusvalue(true);
        setIsFocused(1);
        setMessage("Please Enter Correct Range of the Trains-Online!");
        if (e.target.value < 1 || e.target.value >= 100)
          setTimeout(() => {
            e.target.focus();
          }, 0);
      } else {
        valueIsSafe=true;
        // console.log("in else 33333333");
        setIsSumValid(false);
      }
    } else if (e.target.name === "trains_StandBy") {
      if (ixStore.trains_Online == "1") {
        //if (e.target.value != 0) {
          if(e.target.value < 0 || e.target.value > 5){
          console.log("e.target.value-", parseInt(e.target.value));
          setIsSumValid(true);
          setautoFocusvalue(true);
          setIsFocused(1);
          setMessage("Please Enter Correct Range of the Trains Standby!");
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }
      } else if (ixStore.trains_Online != "1") {
        if (e.target.value < 1 || e.target.value > 5) {
          console.log("e.target.value-", parseInt(e.target.value));
          setIsSumValid(true);
          setautoFocusvalue(true);
          setIsFocused(1);
          setMessage("Please Enter Correct Range of the Trains-Subsidy!");
          setTimeout(() => {
            e.target.focus();
          }, 0);
        }
      }else{
        valueIsSafe = true;
      }
      if (e.target.value < 1 || e.target.value > 5) {
        valueIsSafe=false;
        setautoFocusvalue(true);
        setIsFocused(2);
        setMessage("Please Enter Correct Range of the Trains Standby!");
      }
    }
    setIsFocused(null);
    if (valueIsSafe) {
      if (e.target.name === "txtautomatic") {
       // convertedValue=GlobalUnitConversion(GlobalUnitConversionStore,e.target.value,"m³/h","gpm");
        setAutomatic(e.target.value);
        dispatch(
          updateIXStore({ ...ixStore, [e.target.name]: parseFloat(e.target.value).toFixed(2) })
        );
      }
    }
  };
  const NewPlantButtonClick = () => {
    dispatch(updateNewDesignExist(false));
    dispatch(updateCaseFlag(false));
    dispatch(updateModeling("NewPlant"));
    dispatch(
      updateIXStore({
        ...ixStore,
        ["newPlant_ind"]: true,
        ["evaluteExisting_ind"]: false,
        ["plant_to_Upcore_ind"]: false,
        ["bufferTank_ind"]: false,
        ["no_Buffer_Tank_ind"]: true,
        ["evaluateExisiting_ind_RuntimeFixed"]: true,
          ["evaluateExisiting_ind_RuntimeOptimized"]: false,
      })
    );
  };
  const EvaluteExistButtonClick = () => {
    dispatch(updateModeling("EvaluateExisting"));
    dispatch(
      updateIXStore({
        ...ixStore,
        ["newPlant_ind"]: false,
        ["evaluteExisting_ind"]: true,
        ["plant_to_Upcore_ind"]: false,
        ["bufferTank_ind"]: false,
        ["no_Buffer_Tank_ind"]: true,
        ["evaluateExisiting_ind_RuntimeFixed"]: false,
          ["evaluateExisiting_ind_RuntimeOptimized"]: true,
      })
    );
  };
  const PlanttoUpcoreButtonClick = () => {
    dispatch(updateModeling("RetrofitPlant"));
    dispatch(updateCaseFlag(false));
    dispatch(
      updateIXStore({
        ...ixStore,
        ["newPlant_ind"]: false,
        ["evaluteExisting_ind"]: false,
        ["plant_to_Upcore_ind"]: true,
      })
    );
    dispatch(updateNewDesignExist(false));
  };
  const changeBufferRadio = (e) => {
    console.log("changeRadio Value: ", e.target.value);
    console.log("changeRadio Name: ", e.target.name);
    if (e.target.name === "bufferTank_ind") {
      console.log("p1");
      // dispatch(updateIXStore({ ...ixStore, ["bufferTank_ind"]: true }));
      // dispatch(updateIXStore({ ...ixStore, ["no_bufferTank_ind"]: false }));
      dispatch(
        updateIXStore({
          ...ixStore,
          ["bufferTank_ind"]: true,
          ["no_Buffer_Tank_ind"]: false,
        })
      );
    } else {
      console.log("p2");
      // dispatch(updateIXStore({ ...ixStore, ["bufferTank_ind"]: false }));
      // dispatch(updateIXStore({ ...ixStore, ["no_bufferTank_ind"]: true }));
      dispatch(
        updateIXStore({
          ...ixStore,
          ["bufferTank_ind"]: false,
          ["no_Buffer_Tank_ind"]: true,
        })
      );
    }
    console.log("ixStore", ixStore);
    setFlowrate(e.target.name);
  };
  const changeRunTimeRadio = (e) => {
    setautoVelocityCheck(false);
    if (e.target.name === "evaluateExisiting_ind_RuntimeFixed") {
      console.log("p1");
      // dispatch(updateIXStore({ ...ixStore, ["evaluateExisiting_ind_RuntimeFixed"]: true }));
      // dispatch(updateIXStore({ ...ixStore, ["evaluateExisiting_ind_RuntimeOptimized"]: false }));
      dispatch(
        updateIXStore({
          ...ixStore,
          ["evaluateExisiting_ind_RuntimeFixed"]: true,
          ["evaluateExisiting_ind_RuntimeOptimized"]: false,
        })
      );
    } else {
      console.log("p2");
      // dispatch(updateIXStore({ ...ixStore, ["evaluateExisiting_ind_RuntimeFixed"]: false }));
      // dispatch(updateIXStore({ ...ixStore, ["evaluateExisiting_ind_RuntimeOptimized"]: true }));
      dispatch(
        updateIXStore({
          ...ixStore,
          ["evaluateExisiting_ind_RuntimeFixed"]: false,
          ["evaluateExisiting_ind_RuntimeOptimized"]: true,
        })
      );
    }
    console.log("ixStore", ixStore);
    setRunTime(e.target.name);
  };
  const txtClear = (txtName) => {
    dispatch(updateIXStore({ ...ixStore, [txtName]: 0 }));
  };
  const RadioChange = (e) => {
    console.log("value", e.target.value);
    //dispatch(updateIXStore({...ixStore.Demineralization,[e.target.name]:e.target.value }));
  };
  const txtChangeEvalute = (e) => {
    console.log("e.target.name" + " " + e.target.name);
    console.log("e.target.name" + " " + e.target.value);
    dispatch(
      updateIXStore({ ...ixStore, [e.target.name]: parseFloat(e.target.value) })
    );
  };
  const txtChange = (e) => {
    console.log("value", e.target.value);
    console.log("Name", e.target.name);
    // if(e.target.name==="trains_Online")
    // {
    //   settrains_Online(e.target.value);
    // }
    if (e.target.name === "trains_total") {
      setTrainsTotal(e.target.value);
    } else if (e.target.name === "txtautomatic") {
      setAutomatic(e.target.value);
    } else {
      var returnSum = sum();
      setTrainsTotal(returnSum);
    }
    if (e.target.name === "trains_Online") {
      const range = e.target.value == "1" ? 0 : 1;
      dispatch(
        updateIXStore({
          ...ixStore,
          [e.target.name]:parseFloat(e.target.value).toFixed(0),
          ["trains_StandBy"]: range,
        })
      );
    } else {
      dispatch(updateIXStore({ ...ixStore, [e.target.name]:parseFloat(e.target.value).toFixed(0) }));
    }
    //setError(false);
    console.log(e.target.name + " " + e.target.value);
    //console.log("ixStore",ixStore );
  };
  console.log("ixStore-iXInitalizagionPage", ixStore);
  console.log("ixStore1-iXInitalizagionPage", ixStore1);

  console.log("abc", Demineralization);
  // Demineralization?.map((data, index)=>{
  //   console.log("abc value",data.ixProcessName);
  //   console.log("abc value",data.ixProcessID);
  // });
  const operatingCycleOptions = ["Hours", "Days"];
  //const operatingCycleOptions =[ {OperationId:true,OperationName: "Hours"}, {OperationId:false,OperationName:"Days"}];
  const handleSelectChange = (e) => {
    if (e.target.value === "Hours") {
      dispatch(updateIXStore({ ...ixStore, ["hrs_Day_ind"]: true }));
    } else {
      let newValue =  ixStore.operatingCycle_Lenght_txt;
      if( ixStore.operatingCycle_Lenght_txt>417){
        newValue =  parseFloat(ixStore.operatingCycle_Lenght_txt/24).toFixed(7);
      }
      dispatch(updateIXStore({ ...ixStore, ["hrs_Day_ind"]: false,["operatingCycle_Lenght_txt"]: newValue}));
    }
    setSelectedOption(e.target.value);
  };

  const handleOpenPopup = () => {
    setautoVelocityCheck(true);
    if(cationResin===null && anionResin===null){
      dispatch(updateNewDesignExist(true));
      dispatch(updateCaseFlag(true));
      dispatch(updateExistingNew("true"));
    }else{
      setOpenPopup(true);
    }
    
  };

  return !loader ? (
    <>
      <IXInitializationStyled className="g-0">
        <div className="modeling-demineralization-column">
          <StyledCard className="modeling-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Modeling Objective"
                mandatoryIcon={<MandatoryFieldIcon />}
              />
              <Card.Title
                onMouseEnter={() => setIsHovered("Modeling")}
                onMouseLeave={handleMouseLeave}
              >
                <IconWithTooltip
                  label="New: WAVE computes system design. Evaluate: User provides system design, WAVE estimates performance."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body className="modeling_objective_radio_group">
                <CustomRadio
                  disabled={false}
                  type="radio"
                  id="radioNewPlant"
                  onClick={NewPlantButtonClick}
                  checked={ixStore.newPlant_ind === true}
                  name="radio1"
                  label="New Plant Design"
                  className="ix_initialization_radio"
                />
                <CustomRadio
                  disabled={false}
                  type="radio"
                  id="evaluateRadio"
                  onClick={EvaluteExistButtonClick}
                  checked={ixStore.evaluteExisting_ind == true}
                  name="radio1"
                  label="Evaluate Existing Plant"
                  onChange={handleOpenPopup}
                  className="ix_initialization_radio"
                />
                <EvaluateExistingPlantPopup
                show={openPopup}
                close={() => setOpenPopup(false)}
              />
                <CustomRadio
                  disabled={false}
                  type="radio"
                  id="retrofitRadio"
                  onClick={PlanttoUpcoreButtonClick}
                  checked={ixStore.plant_to_Upcore_ind == true}
                  name="radio1"
                  label="Retrofit Plant to UPCOREᵀᴹ"
                  className="ix_initialization_radio"
                />
            </Card.Body>
          </StyledCard>
          <StyledCard className="demineralization-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="IX Demineralization"
                mandatoryIcon={<MandatoryFieldIcon />}
              />
              <Card.Title
                onMouseEnter={() => setIsHovered("Demineralization")}
                onMouseLeave={handleMouseLeave}
              >
                <IconWithTooltip
                  label="Choose appropriate sub-process for this icon (if appropriate)."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="demineralization-radio">
                {Demineralization?.map((data, index) => (
                  <CustomRadio
                    disabled={true}
                    type="radio"
                    id="ixDemRadio"
                    checked={true}
                    value={data.ixProcessName}
                    name={data.ixProcessName}
                    onChange={RadioChange}
                    label={data.ixProcessName}
                    className="ix_initialization_radio"
                  />
                ))}
              </div>
            </Card.Body>
          </StyledCard>
        </div>
        <div className="train-configuration-column">
          <StyledCard className="train-configuration-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Train Configuration"
                mandatoryIcon={<MandatoryFieldIcon />}
              />
              <Card.Title
                onMouseEnter={() => setIsHovered("Train")}
                onMouseLeave={handleMouseLeave}
              >
                <IconWithTooltip
                  label="Choose number of trains and system level hydraulic flow parameters."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="trains-wrapper">
                <div className="trains-online">
                  <CustomLabel label="# of Trains-Online" />
                  <InputWithIcon
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    unitBgColor="transparent"
                    disabled={false}
                    isWarning={
                      false
                    }
                    isError={ixStore.trains_Online < 1 || parseInt(ixStore.trains_Online) > 20 ? true : false}
                    onClick
                    inputText={
                      ixStore.trains_Online < 1 ? (
                        <CloseCircleRedIcon />
                      ) : parseInt(ixStore.trains_Online) > 20 ? (
                        <CloseCircleWarningIcon />
                      ) : (
                        <CloseCircleGreenIcon />
                      )
                    }
                    type="number"
                    autoFocus
                    id="txtTrainsOnline"
                    onChange={txtChange}
                    name="trains_Online"
                    value={ixStore.trains_Online}
                    onBlur={(e) => handleBlur(e)}
                    onFocus={() => handleFocus(1)}
                    isFocused={isFocused === 1}
                  />
                  <InputReferenceText refText="Ranges 1-20" autofocus />
                  {/* <InputGroup>
                    <Form.Control type="number" id="txtTrainsOnline" onChange={txtChange} name="trains_Online" value={ixStore.trains_Online}/>
                    <InputGroup.Text name="trains_Online" onClick={()=>txtClear("trains_Online")}><CloseIcon/></InputGroup.Text>
                  </InputGroup> */}
                  {/* <Form.Text>ranges XXX-YYY</Form.Text> */}
                </div>
                <div className="trains-subsidy">
                  <CustomLabel label="# of Trains-Standby" />
                  <InputWithIcon
                    unitBgColor="transparent"
                    disabled={false}
                    isError={ixStore.trains_Online==1?(ixStore.trains_StandBy < 0 || ixStore.trains_StandBy > 5 ? true : false):(ixStore.trains_StandBy < 1 || ixStore.trains_StandBy > 5 ? true : false)}
                    isWarning={false}
                    onClick
                    inputText={<CloseCircleGreenIcon />}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    type="number"
                    id="txtTrainsSubsidy"
                    name="trains_StandBy"
                    onChange={txtChange}
                    value={ixStore.trains_StandBy}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(2)}
                    isFocused={isFocused === 2}
                  />
                  <InputReferenceText
                    refText={
                      ixStore.trains_Online == "1" ? "Ranges 0-5" : "Ranges 1-5"
                    }
                  />
                  {/* <Form.Label># of Trains-Standby</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="txtTrainsSubsidy" name="trains_StandBy" onChange={txtChange} value={ixStore.trains_StandBy}/>
                    <InputGroup.Text onClick={()=>txtClear("trains_StandBy")}><CloseIcon/></InputGroup.Text>
                  </InputGroup>
                  <Form.Text>Lorem ipsum dolor sit amet, ranges XXX-YYY,</Form.Text> */}
                </div>
              </div>
              <div
                className="radio-wrapper"
                hidden={parseInt(ixStore.trains_StandBy) >= 1 ? true : false}
              >
                <CustomRadio
                  type="radio"
                  id="useFlowSystem"
                  name="bufferTank_ind"
                  value={ixStore.bufferTank_ind}
                  onClick={changeBufferRadio}
                  checked={ixStore.bufferTank_ind == true}
                  label="Use Flowrate as system daily avg"
                  className="ix_initialization_radio"
                />
                <CustomRadio
                  type="radio"
                  id="useFlowVessel"
                  name="no_bufferTank_ind"
                  value={ixStore.no_Buffer_Tank_ind}
                  onClick={changeBufferRadio}
                  checked={ixStore.no_Buffer_Tank_ind == true}
                  label="Use Flowrate for vessel design"
                  className="ix_initialization_radio"
                />
              </div>
              <div className="trains-wrapper">
                <div className="trains-total">
                  <CustomLabel
                    label="# of Trains-Total"
                    disabled={Flowrate === "no_bufferTank_ind" ? true : true}
                  />
                  <InputWithIcon
                    unitBgColor="transparent"
                    type="text"
                    disabled={Flowrate === "no_bufferTank_ind" ? true : true}
                    onChange={txtChange}
                    name="trains_total"
                    id="txtTrainsTotal"
                    value={
                      TrainsTotal == 0
                        ? parseInt(ixStore.trains_Online) +
                          parseInt(ixStore.trains_StandBy)
                        : TrainsTotal
                    }
                    inputText={<CrossCircleIcon />}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(3)}
                    isFocused={isFocused === 3}
                    isError={false}
                    isWarning={false}
                  />
                  <InputReferenceText />
                </div>
                <div className="bypassed">
                  <CustomLabel
                    label="% Bypassed"
                    disabled={ixStore.bufferTank_ind == true?false:ixStore.trains_StandBy <= 1}
                  />
                  <InputWithIcon
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    type="number"
                    id="bypassed"
                    disabled={ ixStore.bufferTank_ind == true?false:ixStore.trains_StandBy == 0}
                    name="Bypassed"                    onClick
                    onChange={txtChange}
                    value={ixStore.Bypassed === "" ? 0 : ixStore.Bypassed}
                    inputText={<CrossCircleIcon />}
                    unitBgColor="transparent"
                    onBlur={handleBlur}
                    onFocus={() => handleFocus(4)}
                    isFocused={isFocused === 4}
                    isError={ixStore.Bypassed < 0 || ixStore.Bypassed > 95 ? true : false}
                    isWarning={false}
                  />
                  <InputReferenceText refText="Ranges 0 – 95%" />
                </div>
              </div>
            </Card.Body>
          </StyledCard>
        </div>
        <div className="feed-flow-regeneration-column">
          <StyledCard className="feed-flow-card">
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label={
                  selectedEndNode == "startNode"
                    ? "IX Feed Flow Rate"
                    : "IX Product Flow Rate"
                }
              />
              <Card.Title
                onMouseEnter={() => setIsHovered("IXFeed")}
                onMouseLeave={handleMouseLeave}
              >
                <IconWithTooltip
                  label="Estimated IX Feed or Product flow, based on user input and estimated recoveries of other icons."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="automatic">
                <CustomLabel
                  label="Automatic"
                  disabled={ixStore.newPlant_ind == true ? true : false}
                />
                <InputWithText
                  type="number"
                  isError={false}
                  id="formControl"
                  disabled={true}
                  name="txtautomatic"
                  onChange={txtChange}
                  inputText={unit.selectedUnits[1]}
                  value={
                    Automatic === 0
                      ? selectedEndNode == "startNode"
                        ? feedFlowRate
                        : productFlowRate
                      : Automatic
                  }
                  onBlur={handleBlur}
                  onFocus={() => handleFocus(5)}
                  isFocused={isFocused === 5}
                />
                {/* disabled={ixStore.newPlant_ind == true ? true : false} */}
                <InputReferenceText refText="" />
              </div>
            </Card.Body>
          </StyledCard>
          <StyledCard className="regeneration-card" disabled={true}>
            <Card.Header>
              <CustomHeading
                fontFamily="NotoSansRegular"
                fontSize="14px"
                fontWeight="400"
                color={colors.PrimaryDarkAquaMarine}
                label="Regeneration Frequency"
                mandatoryIcon={<MandatoryFieldIcon />}
              />
              <Card.Title
                onMouseEnter={() => setIsHovered("Regeneration")}
                onMouseLeave={handleMouseLeave}
              >
                <IconWithTooltip
                  label="Choose whether run time is fixed, or if WAVE should solve for maximum run time meeting objectives."
                  icon={<InfoIcon />}
                />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="operating-cycle">
                <CustomRadio
                  type="radio"
                  id="runTimeRadio"
                  value={ixStore.evaluateExisiting_ind_RuntimeFixed}
                  checked={
                    ixStore.evaluateExisiting_ind_RuntimeFixed
                  }
                  name="evaluateExisiting_ind_RuntimeFixed"
                  onChange={changeRunTimeRadio}
                  label="Run time is fixed"
                  disabled={false}
                  className="ix_initialization_radio"
                />
                <CustomLabel
                  label="Length of Operating Cycles"
                  disabled={ixStore.evaluateExisiting_ind_RuntimeFixed?false:true}
                  // disabled={
                  //   (ixStore.newPlant_ind == true) === true
                  //     ? true
                  //     : RunTime === "evaluateExisiting_ind_RuntimeFixed"
                  //     ? false
                  //     : true
                  // }
                />
                {/* <InputGroup> */}
                <InputWithSelect
                  type="number"
                  id="formControl"
                  disabled={ixStore.evaluateExisiting_ind_RuntimeFixed?false:true}
                  // disabled={
                  //   RunTime === "evaluateExisiting_ind_RuntimeFixed"
                  //     ? false
                  //     : true
                  // }
                  onChange={txtChangeEvalute}
                  name="operatingCycle_Lenght_txt"
                  value={
                    ixStore.operatingCycle_Lenght_txt
                  }
                  selectedValue={
                    ixStore?.hrs_Day_ind == false ? "Days" : "Hours"
                  }
                  onValueChange={handleSelectChange}
                  isError={ ixStore?.hrs_Day_ind === true?((10000<ixStore.operatingCycle_Lenght_txt || 3>ixStore.operatingCycle_Lenght_txt || !ixStore.operatingCycle_Lenght_txt))
                    :((417<ixStore.operatingCycle_Lenght_txt || 1>ixStore.operatingCycle_Lenght_txt || !ixStore.operatingCycle_Lenght_txt))}
                  options={operatingCycleOptions}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus(6)}
                  isFocused={isFocused === 6}
                />
                {/* <InputGroup.Text>
                    <Form.Select>
                      <option>Hours</option>
                      <option>Hours</option>
                    </Form.Select>
                  </InputGroup.Text> */}
                {/* </InputGroup> */}
                <InputReferenceText
                  refText={
                    ixStore?.hrs_Day_ind === false
                      ?  "Range 1–417"
                      : "Range 3–10,000"
                  }
                />
              </div>
              <div className="specific-velocity">
                <CustomRadio
                  isError={false}
                  type="radio"
                  id="radio1"
                  name="evaluateExisiting_ind_RuntimeOptimized"
                  value={ixStore.evaluateExisiting_ind_RuntimeOptimized}
                  checked={
                    ixStore.evaluateExisiting_ind_RuntimeOptimized
                  }
                  onChange={changeRunTimeRadio}
                  label="Run time is optimized"
                  disabled={false}
                  className="ix_initialization_radio"
                />
                <CustomLabel
                  label="Specific Velocity"
                  disabled={ixStore.evaluateExisiting_ind_RuntimeOptimized?false:true
                  }
                />
                {/* <InputGroup> */}
                <InputWithText
                  type="number"
                  id="formControl"
                  disabled={ixStore.evaluateExisiting_ind_RuntimeOptimized?false:true
                  }
                  name="space_velocity_txt"
                  onChange={txtChangeEvalute}
                  value={ixStore.space_velocity_txt}
                  inputText={unit.selectedUnits[10]}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus(7)}
                  isFocused={isFocused === 7}
                  isError={ixStore.space_velocity_txt < 5 || ixStore.space_velocity_txt> 60 || !ixStore.space_velocity_txt ? true : false}
                />
                {/* <InputGroup.Text>BV/h</InputGroup.Text>
                </InputGroup> */}
                {/* <InputReferenceText refText="Ranges 5 – 60" /> */}
                <InputReferenceText
                    refText={`Ranges ${unit.selectedUnits[10]==="BV/h"?5:GlobalUnitConversion(GlobalUnitConversionStore,5,unit.selectedUnits[10],"BV/h")?.toFixed(2)} - ${unit.selectedUnits[10]==="BV/h"?60:GlobalUnitConversion(GlobalUnitConversionStore,60,unit.selectedUnits[10],"BV/h")?.toFixed(2)}`}
                  />
              </div>
            </Card.Body>
          </StyledCard>
        </div>
        {isSumValid && (
          <ProjectErrorPopup
            show={isSumValid}
            close={() => {
              setIsSumValid(false);
              setIsFocused(1);
            }}
            message={message}
          />
        )}
      </IXInitializationStyled>
    </>
  ) : (
    <Loader />
  );
};

export default IXInitialization;
