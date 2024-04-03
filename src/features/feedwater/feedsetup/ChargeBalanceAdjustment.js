/* eslint-disable max-len */
import React, { useState } from "react";
import { Row, Col, Button, InputGroup, Form, Modal } from "react-bootstrap";
import ChargeBalanceAdjustmentStyled from "./ChargeBalanceAdjustmentStyled";
import InfoIcon from "../../../common/icons/InfoIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import SaveToWaterLibrary from "../modals/SaveToWaterLibrary";
import OpenWaterLibrary from "../modals/OpenWaterLibrary";
import StandardSecondarySButton from "../../../common/styles/components/buttons/standard/StandardSecondarySButton";
import Loader from "../../../common/utils/Loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateLoader } from "../../home/CardListSlice";
import { Feedsetupdetailsdata, updatetitle } from "../feedsetup/FeedsetupSlice";
import { useCreateDataMutation } from "../../../services/apiConfig";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertPopUp from "../../../common/notifications/AlertPopUp";
import { useEffect } from "react";
import { colors } from "../../../common/styles/Theme";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import NormalSelect from "../../../common/styles/components/selects/NormalSelect";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import CreatedProjectSuccessStyled from "../../modals/CreatedProjectSuccessStyled";
import StandardSecondaryButton from "../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import DeleteProjectSuccessfulPopup from "../../home/DeleteProjectSuccessfulPopup";
import WarningIcon from "../../../common/icons/WarningIcon";
import StyledModal from "../../../common/styles/components/modals/CustomModal";
import CustomInputGroup from "../../../common/styles/components/inputs/InputTest";
import "./Test.css";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
// import AlertPopUp from "../../common/notifications/AlertPopUp";
const ChargeBalanceAdjustment = () => {
  const [showSaveToWaterLibrary, setShowSaveToWaterLibrary] = useState(false);
  const [openWaterLibrary, setOpenWaterLibrary] = useState(false);
  const handleOpenSaveToWaterLibrary = () => {
    setShowSaveToWaterLibrary(true);
  };
  const handleOpenWaterLibrary = () => {
    setOpenWaterLibrary(true);
  };
  const dispatch = useDispatch();
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({type:"", message:""});

  const handleShowAlert = (type, message) => {
    setAlert({type, message});
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({type:"", message:""});
    setAlertVisibility(false);
  };
  
  const [Sodium, setSodium] = useState(true);
  const [Chloride, setChloride] = useState(true);
  const [Calcium, setCalcium] = useState(true);
  const [Sulfate, setSulfate] = useState(true);
  const [Ammonia, setAmmonia] = useState(true);
  const [Cations, setCations] = useState(true);
  const [Anions, setAnions] = useState(true);
  const [AllIons, setAllIons] = useState(true);
  const [TotalCO2HCO3CO3, setTotalCO2HCO3CO3] = useState(true);
  const [AdjustpH, setAdjustpH] = useState(true);
  
  const [isFocused, setIsFocused] = useState(null);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const scrollDirection = useSelector((state)=>state.scrollData.direction);
  const feedCheck = useSelector((state)=>state.tabData.tab);
  // console.log("StoreData ProjectInfoStore", ProjectInfoStore);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  // console.log("StoreData UserInfoStore", UserInfoStore); 
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const projectid = ProjectInfoStore.projectID;
  const caseid = ProjectInfoStore.caseId;
 // Sodium ,Chloride ,Calcium,Sulfate ,  Cations,Anions ,AllIons ,TotalCO2HCO3CO3
  const StoreData = useSelector((state) => state.Feedsetupdetailsdatapanel.data);
  console.log("StoreData ChargeBalanceAdjustment", StoreData);
  const streamData = useSelector((state) => state.Feedsetupdetailsdatapanel.streamData);
  // console.log("streamData ChargeBalanceAdjustment", streamData);
  
  const [getCalFeedwaterDetails, { data }] = useCreateDataMutation();
  const [header, setHeader] = useState(false);
  const postobj = [{
    Method: "masterdata/api/v1/CalculateFeedWaterData",
    "userID": userID,
    "projectID": projectid,
    "caseID": caseid,
    "typeFlag": 2,
    "feedStream": {
      "designTemp": 15.0,
      "methodname": "normal",
      "ph": 7.2,
      "ph25": 0,              
      "TotalDissolvedSolutes": 0.0,
      "TotalDissolvedSolids": 0.0,
      "ChargeBalance": 0.0,
      "EstimatedConductivity": 0.0,
      "Degas": 0.0,
      "percentage_of_initial_total_CO2_remaining": 100.0,
      "Equilibrate_with": 0.0,
      "Adjustment_Type": 0,
      "Add_Reagent": 0.0,
      "Total_CO2": 0.0,
      "cations": [{
        "name": "Ba",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 2.0
      }, {
        "name": "Ca",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 2.0
      }, {
        "name": "K",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 1.0
      }, {
        "name": "Mg",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 2.0
      }, {
        "name": "Na",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 1.0
      }, {
        "name": "NH₄",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 1.0
      }, {
        "name": "Sr",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }],
      "anions": [{
        "name": "Cl",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -1.0
      }, {
        "name": "CO₃",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -2.0
      }, {
        "name": "F",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -1.0
      }, {
        "name": "HCO₃",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -1.0
      }, {
        "name": "NO₃",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -1.0
      }, {
        "name": "SO₄",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": -2.0
      }, {
        "name": "Br",
        "mgL": 0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }, {
        "name": "PO₄",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }],
      "neutrals": [{
        "name": "B",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }, {
        "name": "CO₂",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }, {
        "name": "SiO₂",
        "mgL": 0.0,
        "meqL": 0.0,
        "ppm": 0.0,
        "molCharge": 0.0
      }]
    }
  }];

  const [FeedWaterPost, setFeedWaterPost] = ([postobj]);
  const [CBAPost,setCBAPost] = ([postobj]);
  const [getQuickEntryval, setgetQuickEntryval] = useState(0);
  const [demoVal, setdemoVal] = useState(0);

  const [quickFlag,setQuickFlag]=useState(false);
  const [updatedQuickEntryval, setupdatedQuickEntryval] = useState(0);
  const [QuickEntry, setQuickEntry] = useState(1);

  useEffect(()=>{
    if(StoreData==0){
      console.log("Loadding StoreData1", StoreData);
    }
    else {      
      let ChargeBalanceValues = StoreData[0].chargeBalance;
      let cationsmql=StoreData?.map((a)=>a.cations.reduce((total, currentValue) => total = total + currentValue.mgL,0));
      let anionsmql=StoreData?.map((a)=>a.anions.reduce((total, anionsValue) => total = total + anionsValue.mgL,0));
      let neutralsmql=StoreData?.map((a)=>a.neutrals.reduce((total, neutralsValue) => total = total + neutralsValue.mgL,0));     
      
       const anionsdataHCO3 = StoreData[0].anions.filter(item=>item.name==="HCO₃").map((u,index)=>{  
         const anionsmqlHCO3 =u.mgL;
        console.log("Loadding u", u,anionsmqlHCO3);
        u=anionsmqlHCO3;
        return u;
       });

       const anionsdataCO3 = StoreData[0].anions.filter(item=>item.name==="CO₃").map((u,index)=>{  
        const anionsdataCO3 =u.mgL;
       console.log("Loadding u", u,anionsdataCO3);
       u=anionsdataCO3;
       return u;
      });

      const neutralsdataCO2 = StoreData[0].neutrals.filter(item=>item.name==="CO₂").map((u,index)=>{  
        const neutralsdataCO2 =u.mgL;
       console.log("Loadding u", u,neutralsdataCO2);
       u=neutralsdataCO2;
       return u;
      });

      ChargeBalanceValues=Number.parseFloat(
        ChargeBalanceValues
      ).toFixed(6);     

      console.log("anionsdata u",anionsdataHCO3,anionsdataCO3,neutralsdataCO2);
      const num = Number.parseInt(ChargeBalanceValues);
      console.log("Loadding StoreData2", ChargeBalanceValues,cationsmql[0],anionsmql[0],num);

      
      if(ChargeBalanceValues==0 && anionsmql[0]==0 && cationsmql[0]==0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
        setTotalCO2HCO3CO3(true);setAllIons(true);setAnions(true);setCations(true);
        setAmmonia(true);setSulfate(true);setCalcium(true);setChloride(true);setSodium(true);setAdjustpH(true);
        console.log("if Base Condition 1", );
      }
      else if(ChargeBalanceValues==0 ){
        setTotalCO2HCO3CO3(true);setAllIons(true);setAnions(true);setCations(true);
        setAmmonia(true);setSulfate(true);setCalcium(true);setChloride(true);setSodium(true);setAdjustpH(true);
        console.log("if Base Condition 2", );
      }
      else if (ChargeBalanceValues>0  && cationsmql[0]>0 && anionsmql[0]===0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
       setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
       setAllIons(false);setCations(false);setTotalCO2HCO3CO3(true);setAnions(true);setAdjustpH(false);
        console.log("if 1", );
      }   
      else if (ChargeBalanceValues>0 && anionsmql[0]>0 && cationsmql[0]>0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
        setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
        setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(true);setAdjustpH(false);
         console.log("if 2", );
       }  
      else if (ChargeBalanceValues>0 && anionsmql[0]>0 && cationsmql[0]>0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
        setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
        setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);                    
        console.log("if 3", );
       }  
   
       else if (ChargeBalanceValues>0 && anionsmql[0]>0 && cationsmql[0]==0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
        setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
        setAllIons(false);setCations(true);setAnions(false);setTotalCO2HCO3CO3(true);setAdjustpH(false);                   
        console.log("if 4", );
       } 

       else if (ChargeBalanceValues>0 && anionsmql[0]>0 && cationsmql[0]==0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
          setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
          setAllIons(false);setCations(true);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);                 
          console.log("if 5", );
         } 

     else if (ChargeBalanceValues<0 &&  anionsmql[0]>0 && cationsmql[0]===0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
        setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
        setAllIons(false);setCations(true);setAnions(false);setTotalCO2HCO3CO3(true);setAdjustpH(false);
        console.log("if 6", );
       } 

       else if (ChargeBalanceValues<0 &&  anionsmql[0]>0 && cationsmql[0]>0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
        setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
        setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(true);setAdjustpH(false);
        console.log("if 7", );
       } 
      else if (ChargeBalanceValues<0 &&  anionsmql[0]>0 && cationsmql[0]>0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
          setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
          setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);
          console.log("if 8", );
        }
        
       
      else if (ChargeBalanceValues<0 && anionsmql[0]==0 && cationsmql[0]>0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
            setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
            setAllIons(false);setCations(false);setAnions(true);setTotalCO2HCO3CO3(true);setAdjustpH(false);                    
            console.log("if 9", );
           }  

      else if (ChargeBalanceValues<0 && anionsmql[0]==0 && cationsmql[0]>0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
              setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
              setAllIons(false);setCations(false);setAnions(true);setTotalCO2HCO3CO3(false);setAdjustpH(false);                    
              console.log("if 10", );
             } 

      else if (ChargeBalanceValues>0 &&  cationsmql[0]>0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
          setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
          setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);
          console.log("if 11", );
         }  
       
         else if (ChargeBalanceValues<0 &&  cationsmql[0]===0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
          setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
          setAllIons(false);setCations(true);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);
          console.log("if 12", );
         } 
      else if (ChargeBalanceValues<0 &&  cationsmql[0]>0 && (anionsdataHCO3[0]>0 || anionsdataCO3[0]>0 || neutralsdataCO2[0]>0 )){
          setChloride(true);setSulfate(true);setCalcium(false);setSodium(false);setAmmonia(false);
          setAllIons(false);setCations(false);setAnions(false);setTotalCO2HCO3CO3(false);setAdjustpH(false);
          console.log("if 13", );
         } 
      else if (ChargeBalanceValues>0  && cationsmql[0]===0 && anionsmql[0]===0 && (anionsdataHCO3[0]==0 || anionsdataCO3[0]==0 || neutralsdataCO2[0]==0 )){
       setChloride(false);setSulfate(false);setCalcium(true);setSodium(true);setAmmonia(true);
       setAllIons(true);setCations(true);setTotalCO2HCO3CO3(true);setAnions(true);setAdjustpH(false);
        console.log("if 14", );
      }
      else{
        console.log("else", );
      }
  
    }
  },[StoreData]);
//checking page scroll behavior of feedSetup
  useEffect(()=>{
    const headerChange = scrollDirection==="down"&& feedCheck==="Feed Setup";
    console.log("headerChange", headerChange);
    setHeader(headerChange);
  }, [scrollDirection]);

  const inputRef = useRef(null);
  const onCancelClick = (event) => {
    // eslint-disable-next-line no-empty
    console.log("onCancelClick", event);    
    // inputRef.current.value =0.00;
    setgetQuickEntryval(0);
    confirm(QuickEntry);
    
  };

 

  const handleFocus =(id)=>{
    setIsFocused(id);
  };
  const handleBlur =()=>{
    setIsFocused(null);
    let focusField = document.getElementById("QuickEntryval");
    // if(getQuickEntryval.trim()!=="")
    if(QuickEntry==1 && getQuickEntryval >70000){
      const warningMessage =" The value entered outside the allowed range (0-70000 mg/L) Please revise your Input. ";
      handleShowAlert("warning", warningMessage);
      setgetQuickEntryval(0);
      setQuickFlag(true);
      focusField.focus();
    }
    else if(QuickEntry==2 && getQuickEntryval >100000){
      const warningMessage =" The value entered outside the allowed range (0-100000 mg/L) Please revise your Input. ";
      handleShowAlert("warning", warningMessage);
      setgetQuickEntryval(0);
      setQuickFlag(true);
      focusField.focus();
    }else if(getQuickEntryval >= 0){
      setQuickFlag(false);
      confirm(QuickEntry);
    }
    else {  
      setQuickFlag(false);    
      const warningMessage ="Please enter values !!";
      handleShowAlert("warning", warningMessage);   
    }
    
  };



  const handleChange = event => { 
    inputRef.current.value =parseFloat(event.target.value);  
    setgetQuickEntryval(parseFloat(event.target.value));
    setupdatedQuickEntryval(parseFloat(event.target.value));
  };

  const [showAlertcunf, setshowAlertcunf] = useState(false);
  const confirm =(e)=>{
     let cationsmql=StoreData?.map((a)=>a.cations.reduce((total, currentValue) => total = total + currentValue.mgL,0));
    let anionsmql=StoreData?.map((a)=>a.anions.reduce((total, anionsValue) => total = total + anionsValue.mgL,0));
    console.log("confirm", cationsmql[0],anionsmql[0]);
    setQuickEntry(e);
    // getQuickEntryval.trim()!=="" && 
    let focusField = document.getElementById("QuickEntryval");
    if(getQuickEntryval ==0 && quickFlag==true){
      setshowAlertcunf(false);
    }
    else if (getQuickEntryval >= 0) {
    if (cationsmql[0]>0 || anionsmql[0]>0){    
    setQuickEntry(e); 
    setshowAlertcunf(true);
   }
   else{  
    setQuickEntry(e);
    drpQuickEntry(e);
   }
  }
  else {
    // inputRef.current.value =0;
    const warningMessage ="Please enter values !!";
    handleShowAlert("warning", warningMessage);   
  }};

  const cancalconfirm =()=>{ setshowAlertcunf(false);setgetQuickEntryval(updatedQuickEntryval);};
  // setQuickEntry(0);

  const drpQuickEntry = async (e) => {
    setshowAlertcunf(false);
    if (getQuickEntryval >= 0) {
      if (e == 1) {
        if (getQuickEntryval < 70000) {
          const fixedVar1 = 22.9898;
          const fixedVar2 = 35.4527;
          const NaMgL = (fixedVar1 / (fixedVar1 + fixedVar2)) * getQuickEntryval;
          const ClMgL = (fixedVar2 / (fixedVar1 + fixedVar2)) * getQuickEntryval;
  
          let indexget = 0;
          const QuickEntryCl = {
            "name": "Cl",
            "mgL": ClMgL,
            "meqL": 0.0,
            "ppm": 0.0,
            "molCharge": -1.0
          };
          const QuickEntryNa = {
            "name": "Na",
            "mgL": NaMgL,
            "meqL": 0.0,
            "ppm": 0.0,
            "molCharge": 1.0
          };
          indexget = FeedWaterPost[0].feedStream.cations.findIndex(
            (i) => i.name === "Na" || i.mgL === "mgL"
          );
  
          let newArrycations = [...FeedWaterPost[0].feedStream.cations];
          newArrycations[indexget] = QuickEntryNa;
  
          indexget = FeedWaterPost[0].feedStream.anions.findIndex(
            (i) => i.name === "Cl" || i.mgL === "mgL"
          );
  
          let newArryanions = [...FeedWaterPost[0].feedStream.anions];
          newArryanions[indexget] = QuickEntryCl;
          let newArryneutrals = [...FeedWaterPost[0].feedStream.neutrals];
          const QuickentryNaclJson = {
            Method: "masterdata/api/v1/CalculateFeedWaterData",
            "userID": userID,
            "projectID": projectid,
            "caseID": caseid,
            "typeFlag": 0,
            "feedStream": {
              "designTemp":streamData.lstrequestsavefeedwater[0].streams[0].tempDesign,
              "methodname": "normal",
              "ph":streamData.lstrequestsavefeedwater[0].streams[0].pH,
              "ph25": streamData.lstrequestsavefeedwater[0].streams[0].ph25,              
              "TotalDissolvedSolutes": 0.0,
              "TotalDissolvedSolids": 0.0,
              "ChargeBalance": 0.0,
              "EstimatedConductivity": 0.0,
              "Degas": 0.0,
              "percentage_of_initial_total_CO2_remaining": 100.0,
              "Equilibrate_with": 0.0,
              "Adjustment_Type": 0.0,
              "Add_Reagent": 0.0,
              "Total_CO2": 0.0,
              "cations": newArrycations,
              "anions": newArryanions,
              "neutrals": newArryneutrals
            }
          };
          console.log("Demo..", QuickentryNaclJson);
          CalengneAPIcall(QuickentryNaclJson);
        }
        else{
          const warningMessage =" The value entered outside the allowed range (0-70000 mg/L) Please revise your Input. ";
          handleShowAlert("warning", warningMessage);
          console.log("The value entered outside the allowed range (0-70000 mg/L) Please revise your Input.");
        }
     
      }
      else if (e == 2) {
        if (getQuickEntryval < 100000) {    

        const fixedVar1 = 24.305;
        const fixedVar2 = 96.0636;
        const MgMgL = (fixedVar1 / (fixedVar1 + fixedVar2)) * getQuickEntryval;
        const SO4MgL = (fixedVar2 / (fixedVar1 + fixedVar2)) * getQuickEntryval;

        let indexget = 0;
        const QuickEntryMg ={
          "name": "Mg",
          "mgL": MgMgL,
          "meqL": 0.0,
          "ppm": 0.0,
          "molCharge": 2.0
        };
        const QuickEntrySO4 = {
          "name": "SO₄",
          "mgL": SO4MgL,
          "meqL": 0.0,
          "ppm": 0.0,
          "molCharge": -2.0
        };
        indexget = FeedWaterPost[0].feedStream.cations.findIndex(
          (i) => i.name === "Mg" || i.mgL === "mgL"
        );

        let newArrycations = [...FeedWaterPost[0].feedStream.cations];
        newArrycations[indexget] = QuickEntryMg;

        indexget = FeedWaterPost[0].feedStream.anions.findIndex(
          (i) => i.name === "SO₄" || i.mgL === "mgL"
        );

        let newArryanions = [...FeedWaterPost[0].feedStream.anions];
        newArryanions[indexget] = QuickEntrySO4;
        let newArryneutrals = [...FeedWaterPost[0].feedStream.neutrals];
        const QuickentryMgSoJson = {
          Method: "masterdata/api/v1/CalculateFeedWaterData",
          "userID": userID,
          "projectID": projectid,
          "caseID": caseid,
          "typeFlag": 0,
          "feedStream": {
            "designTemp":streamData.lstrequestsavefeedwater[0].streams[0].tempDesign,
            "methodname": "normal",
            "ph":streamData.lstrequestsavefeedwater[0].streams[0].pH,
            "ph25": streamData.lstrequestsavefeedwater[0].streams[0].ph25,              
            "TotalDissolvedSolutes": 0.0,
            "TotalDissolvedSolids": 0.0,
            "ChargeBalance": 0.0,
            "EstimatedConductivity": 0.0,
            "Degas": 0.0,
            "percentage_of_initial_total_CO2_remaining": 100.0,
            "Equilibrate_with": 0.0,
            "Adjustment_Type": 0.0,
            "Add_Reagent": 0.0,
            "Total_CO2": 0.0,
            "cations": newArrycations,
            "anions": newArryanions,
            "neutrals": newArryneutrals
          }
        };
        console.log("Demo..", QuickentryMgSoJson);
        CalengneAPIcall(QuickentryMgSoJson);      

      }
      else{
        const warningMessage =" The value entered outside the allowed range (0-100000 mg/L) Please revise your Input. ";
        handleShowAlert("warning", warningMessage);
        console.log("The value entered outside the allowed range (0-100000 mg/L) Please revise your Input. !!");
      }
      }
      else {
        const warningMessage ="Please select Chemical Name !!";
        handleShowAlert("warning", warningMessage);
        console.log("Please select Chemical Name !!");
      }
    }
    else {
      // inputRef.current.value =0;
      const warningMessage ="Please enter values !!";
      handleShowAlert("warning", warningMessage);
      
    }
    document.body.classList.remove("disable");
    // setgetQuickEntryval(0);
  };
  const handleDemoblur=(e)=>{
    const finalVal= GlobalUnitConversion(2,e,"in","cm");
    console.log("PK finalVal",finalVal);
  };
  const CalengneAPIcall =async (e)=>{
    console.log("Hello Feedwater worng 1" ,e); 
    dispatch(updateLoader(true));
    const newData = e ;    
    let responseCalFeedwaterDetails = await getCalFeedwaterDetails(newData);  
    console.log("Hello Feedwater worng 2",responseCalFeedwaterDetails); 
    // setFeedWaterDetails([responseCalFeedwaterDetails.data]);
    dispatch(Feedsetupdetailsdata([responseCalFeedwaterDetails.data]));
    setTimeout(() => {
      dispatch(updateLoader(false));
    }, 5);   
 };

 const handleKeyPress=(e, text)=>{
  if(e.key==="Enter"){
    let nextRowInput;
    if(text=="quick"){
      nextRowInput = document.getElementById("basicSelect");
    }
    if (nextRowInput) {
      nextRowInput.focus();
    }   
  }
};
  const btnAddsolutes = async (btnname) => {    
   let btnadjustment_Type=0;

    if(btnname=="Sodium")
    {
      btnadjustment_Type=1;   
      console.log("btnname",btnname,1);    
    }    
    else if(btnname=="Chloride")
    {      
      btnadjustment_Type=3;   
      console.log("btnname",btnname,3); 
    }
    else if(btnname=="Calcium"){
     
      btnadjustment_Type=2;
    // {const demo = CBAPost.map((i)=>{      
    //   i.feedStream.Adjustment_Type=3;
    //   return i;
    //  });   
    //  CalengneAPIcall(demo[0]);
    //    console.log("btnname",btnname,3); 
    }
    else if(btnname=="Sulfate")
    {
      btnadjustment_Type=10;
      console.log("btnname",btnname,10); 
    }
    else if(btnname=="Ammonia")
    {
      btnadjustment_Type=11;
       console.log("btnname",btnname,11); 
    }
    else if(btnname=="Cations")
    {      
      btnadjustment_Type=4;   
      console.log("btnname",btnname,4);     
    }    
    else if(btnname=="Anions")
    {
       btnadjustment_Type=5;
      console.log("btnname",btnname,5); 
     
    }
    else if(btnname=="Total CO²/HCO³/CO³")
    {
       btnadjustment_Type=7;
      console.log("btnname",btnname,7);       
    }
    else if(btnname=="All Ions")
    { 
      btnadjustment_Type=6;
      console.log("btnname",btnname,6); 
    }
    else if(btnname=="AdjustpH")
    { 
      btnadjustment_Type=0;
      console.log("btnname",btnname,0); 
    }    
    else{
      console.log("btnname",btnname);
    }

    let newArrycations = [...StoreData[0].cations];
    let newArryanions = [...StoreData[0].anions];  
    let newArryneutrals = [...StoreData[0].neutrals];   

    const CalculateFeedWaterDataJson = {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      "userID": userID,
      "projectID": projectid,
      "caseID": caseid,
      "typeFlag": 2,
      "feedStream": {
        "designTemp":streamData.lstrequestsavefeedwater[0].streams[0].tempDesign,
        "methodname": "normal",
        "ph":streamData.lstrequestsavefeedwater[0].streams[0].pH,
        "ph25": streamData.lstrequestsavefeedwater[0].streams[0].ph25,             
        "TotalDissolvedSolutes": 0.0,
        "TotalDissolvedSolids": 0.0,
        "ChargeBalance": 0.0,
        "EstimatedConductivity": 0.0,
        "Degas": 0.0,
        "percentage_of_initial_total_CO2_remaining": 100.0,
        "Equilibrate_with": 0.0,
        "Adjustment_Type":btnadjustment_Type,
        "Add_Reagent": 0.0,
        "Total_CO2": 0.0,
        "cations": newArrycations,
        "anions": newArryanions,
        "neutrals": newArryneutrals
      }
    };
    console.log("Demo..", CalculateFeedWaterDataJson);
          CalengneAPIcall(CalculateFeedWaterDataJson);
    
  };


  const btnadjustpH =async (btnname)=>{
    let btnadjustment_Type=0;
     if(btnname=="AdjustpH")
    { 
      btnadjustment_Type=0;
      console.log("btnname",btnname,0); 
    }    
    else{
      console.log("btnname",btnname);
    }

    let newArrycations = [...StoreData[0].cations];
    let newArryanions = [...StoreData[0].anions];  
    let newArryneutrals = [...StoreData[0].neutrals];   

    const CalculateFeedWaterDataJson = {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      "userID": userID,
      "projectID": projectid,
      "caseID": caseid,
      "typeFlag": 1,
      "feedStream": {
        "designTemp":streamData.lstrequestsavefeedwater[0].streams[0].tempDesign,
        "methodname": "normal",
        "ph":streamData.lstrequestsavefeedwater[0].streams[0].pH,
        "ph25": streamData.lstrequestsavefeedwater[0].streams[0].ph25,             
        "TotalDissolvedSolutes": 0.0,
        "TotalDissolvedSolids": 0.0,
        "ChargeBalance": 0.0,
        "EstimatedConductivity": 0.0,
        "Degas": 0.0,
        "percentage_of_initial_total_CO2_remaining": 100.0,
        "Equilibrate_with": 0.0,
        "Adjustment_Type":btnadjustment_Type,
        "Add_Reagent": 0.0,
        "Total_CO2": 0.0,
        "cations": newArrycations,
        "anions": newArryanions,
        "neutrals": newArryneutrals
      }
    };
    console.log("Demo..", CalculateFeedWaterDataJson);
          CalengneAPIcall(CalculateFeedWaterDataJson);
  };
  
 
  return (
    <>
      <ChargeBalanceAdjustmentStyled className="charge-balance-adjustment" scrollDirection={scrollDirection}>
        <div className="charge-balance-column">
          <div className="g-0 charge-balance-header-row">
            <div className="charge-balance-heading-column">
            <CustomHeading fontFamily="DiodrumSemiBold"
                    fontSize="14px" fontWeight="600" 
                    color={colors.PrimaryDarkAquaMarine} 
                    label="Charge Balance Adjustment"/>
              {/* <h3></h3> */}
            </div>
            <div className="info-icon-column">
              <span className="info-icon">
              <IconWithTooltip label="After entering Temperature, pH, cations, anions, and neutrals, choose a method to charge balance." icon={<InfoIcon />}/> 
              </span>
            </div>
          </div>
          <div className="solutes-row g-0">
            <div className="solutes-row-column">
              <div className="add-solutes-column">
                <CustomHeading className="btn-heading" fontFamily="DiodrumRegular"
                    fontSize="14px" fontWeight="400" 
                    color={colors.Black} 
                    label="Add Solutes"/>
                <div className="btn-group">
                  <StandardSecondarySButton disabled={Sodium} onClick={(e)=>btnAddsolutes("Sodium")} label="Sodium"/> 
                  <StandardSecondarySButton disabled={Calcium} onClick={(e)=>btnAddsolutes("Calcium")} label="Calcium" />
                  <StandardSecondarySButton disabled={Ammonia} onClick={(e)=>btnAddsolutes("Ammonia")} label="Ammonia" />
                  <StandardSecondarySButton disabled={Chloride} onClick={(e)=>btnAddsolutes("Chloride")} label="Chloride" />
                  <StandardSecondarySButton disabled={Sulfate} onClick={(e)=>btnAddsolutes("Sulfate")} label="Sulfate" />
                </div>
              </div>
              <div className="vertical_line"></div>
              <div className="adjust-solutes-column">
                <CustomHeading className="btn-heading" fontFamily="DiodrumRegular"
                    fontSize="14px" fontWeight="400" 
                    color={colors.Black} 
                    label="Adjust Solutes"/>
                <div className="btn-group">
                {/* {Cations ? "true" : "false"} */}
                  <StandardSecondarySButton disabled={Cations} onClick={(e)=>btnAddsolutes("Cations")}label="Cations" />
                  <StandardSecondarySButton disabled={Anions} onClick={(e)=>btnAddsolutes("Anions")} label="Anions" />
                  <StandardSecondarySButton disabled={AllIons} onClick={(e)=>btnAddsolutes("All Ions")} label="All Ions"/>
                  <StandardSecondarySButton disabled={TotalCO2HCO3CO3} onClick={(e)=>btnAddsolutes("Total CO²/HCO³/CO³")} label="Total CO₂/HCO₃/CO₃" />
                </div>
              </div>
              <div className="vertical_line"></div>
              <div className="adjust-ph-column" >
                  <CustomHeading className="btn-heading" fontFamily="DiodrumRegular"
                    fontSize="14px" fontWeight="400" 
                    color={colors.Black} 
                    label="Adjust pH"/>
                <div className="btn-group">
                  <StandardSecondarySButton disabled={AdjustpH} onClick={(e)=>btnadjustpH("AdjustpH")} label="Adjust pH" />
                </div>
              </div>
              <div className="vertical_line"></div>
              <div className="quick-entry-column">
                  <CustomHeading className="btn-heading" fontFamily="DiodrumRegular"
                    fontSize="14px" fontWeight="400" 
                    color={colors.Black} 
                    label="Quick Entry"/>
                <div className="wrapper">
                  <div className="input-box">
                    {/* <InputWithIcon placeholder="00.00"  
                    // ref={inputRef} 
                    id="QuickEntryval" onBlur={handleBlur }  value={getQuickEntryval}
                    maxLength="4" minlength="1" type="number"  onChange={handleChange} onFocus={()=>handleFocus(1)} isFocused={isFocused===1}
                    onClick={handleBlur}  inputText={<CloseCircleGreenIcon />} unitBgColor="transparent"/>
                  */}
                 <CustomInputGroup isFocused={isFocused===20} disabled={false} isError={false} isWarning={false} onKeyPress={(e)=>handleKeyPress(e,"quick")}>
                          <Form.Control placeholder="00.00"  
                    ref={inputRef} 
                    onWheel={(e)=>e.target.blur()}
                    onKeyDown={(evt) => ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) && evt.preventDefault()}
                    id="QuickEntryval" onBlur={handleBlur }  value={getQuickEntryval} 
                    maxLength="4" minlength="1" type="number"   onChange={handleChange} onFocus={()=>handleFocus(1)}
                    isFocused={isFocused===1}/>
                      <InputGroup.Text onClick={()=>onCancelClick(0)}> <CloseCircleGreenIcon/></InputGroup.Text>
                  </CustomInputGroup>
                 
                 </div>
                 {/* <div className="input-box">
                 <CustomInputGroup >
                          <Form.Control placeholder="00.00"  
                      onChange={(e)=>handleDemoblur(e.target.value)}/>
                      
                  </CustomInputGroup>
                 
                 </div> */}
                <div className="select">
                    <NormalSelect id="basicSelect" name="basicSelect" onChange={(e) => confirm(e.target.value)}>
                    {/* <option value={0}>Select Chemical</option> */}
                      <option value={1}>mg/L NaCl</option>
                      <option value={2}>mg/L MgSO₄</option>
                    </NormalSelect>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="water-library-column">
          <div className="g-0">
            <div className="water-library-header-column">
              <CustomHeading fontFamily="DiodrumSemiBold"
                    fontSize="14px" fontWeight="600" 
                    color={colors.PrimaryDarkAquaMarine} 
                    label="Water Library"/>
              <span className="info-icon">
                <InfoIcon />
              </span>
            </div>
          </div>
          <div>
            <div className="water-library-btn-column">
              <div className="btn-group">
                <StandardSecondarySButton onClick={handleOpenSaveToWaterLibrary} disabled={true} label="Save to Water Library" id="saveWaterLibrary">
                  <SaveToWaterLibrary show={showSaveToWaterLibrary} close={setShowSaveToWaterLibrary} />
                </StandardSecondarySButton>
                <StandardSecondarySButton onClick={handleOpenWaterLibrary} disabled={true} label="Open Water Library" id="openWaterLibrary">
                  <OpenWaterLibrary show={openWaterLibrary} close={setOpenWaterLibrary} />
                </StandardSecondarySButton>
              </div>
            </div>
          </div>
        </div>
      </ChargeBalanceAdjustmentStyled>
      {showAlertcunf?<StyledModal  show={showAlertcunf} maxWidth="416px" isWarningPopUp={true}
        keyboard="false"
        centered
        backdrop="static"> 
        <div className="delete-modal">
        <Modal.Body isWarningPopUp={true}>
            <div className="warning-pop-up">
              <div><WarningIcon /></div>
              <div>
                <CustomHeading
                  fontFamily="DiodrumSemiBold"
                  fontSize="16px"
                  fontWeight="600"
                  color={colors.Black}
                  label="The Quick-Entry method would overwrite the composition you entered. Are you sure you want proceed?"
                />
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer isWarningPopUp={true}>
          <StandardSecondaryButton
            className=""
            id="canBtn"
            onClick={()=>cancalconfirm()} 
            label="Cancel"
          />
          <StandardPrimaryButton
            label="OK"
            className=""
            onClick={() =>
              drpQuickEntry(QuickEntry)
            }
          />
        </Modal.Footer>
        </div>
        </StyledModal>:null}

      {showAlert ? <AlertPopUp type={alertData?.type}  message={alertData?.message} close={handleHideAlert}/> : null }
    </>
  );


};

export default ChargeBalanceAdjustment;