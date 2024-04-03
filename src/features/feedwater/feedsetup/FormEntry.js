/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import FormEntryStyled from "./FormEntryStyled";
import {
  useCreateDataMutation,
  useLazyGetAllDataQuery,
} from "../../../services/apiConfig";
import Loader from "../../../common/utils/Loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateLoader } from "../../home/CardListSlice";
import { updateUFStore, updateWaterSubtypeFlag } from "../uf/UFSlice";
import {
  Addedvalues,
  Feedsetupdetailsdata,
  UpdatedStream,
  updateFeedData,
  detectDataChange,
  updatetitle,
} from "../feedsetup/FeedsetupSlice";
import InfoIconHovered from "../../../common/icons/InfoIconHovered";
import { useRef } from "react";
import { array, object, set } from "zod";
import { MyError } from "../../../common/utils/ErrorCreator";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import InputWithText from "../../../common/styles/components/inputs/InputWithText";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import InputWithIcon from "../../../common/styles/components/inputs/InputWithIcon";
import CustomInputGroup from "../../../common/styles/components/inputs/InputTest";
import CloseCircleGreenIcon from "../../../common/icons/CloseCircleGreenIcon";
import CalcEngineInputBox from "../../../common/styles/components/inputs/CalcEngineInputBox";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import AlertPopUp from "../../../common/notifications/AlertPopUp";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import ErrorMessage from "../../../common/styles/components/headings/ErrorMessage";
import WarningMessage from "../../../common/styles/components/headings/WarningMessage";
import CustomTextArea from "../../../common/styles/components/inputs/CustomTextArea";
import { logDOM } from "@testing-library/react";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitFlag, updateUnitTypeConductivity, updateUnitTypeOrganic, updateUnitTypeTemp } from "../../../common/utils/GlobalUnitConversionSlice";
import CalcEngInputWithIcon from "../../../common/styles/components/inputs/CalcEngInputWithIcon";
// import LabelWithTooltip from "../../../common/styles/components/headings/LabelWithTooltip";
const FormEntry = () => {
  const dispatch = useDispatch();
  const [cancelFlag , setCancelFlag]=useState(false);
  const UFStore = useSelector((state) => state.UFStore);
  const { activeUFModule, ufInputRangeConfig, ufInputRangeConfigByWaterType } =
    UFStore;

  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  console.log("StoreData ProjectInfoStore", ProjectInfoStore);
  const UserInfoStore = useSelector((state) => state.userInfo.data);
  console.log("StoreData UserInfoStore", UserInfoStore);
  const userID = UserInfoStore ? UserInfoStore.UserId : 1;
  const projectid = ProjectInfoStore.projectID;
  const langid = 1;
  const technologyid = 1;
  const caseid = ProjectInfoStore.caseId;
  const methodname = "normal";
  const postobj = [
    {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      userID: userID,
      projectID: projectid,
      typeFlag: 1,
      feedStream: {
        designTemp: 15.0,
        methodname: "normal",
        ph: 7.2,
        TotalDissolvedSolutes: 0.0,
        ChargeBalance: 0.0,
        EstimatedConductivity: 0.0,
        Degas: 0.0,
        percentage_of_initial_total_CO2_remaining: 100.0,
        Equilibrate_with: 0.0,
        Adjustment_Type: 0,
        Add_Reagent: 0.0,
        Total_CO2: 0.0,
        cations: [
          {
            name: "Ba",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 2.0,
          },
          {
            name: "Ca",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 2.0,
          },
          {
            name: "K",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 1.0,
          },
          {
            name: "Mg",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 2.0,
          },
          {
            name: "Na",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 1.0,
          },
          {
            name: "NH₄",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 1.0,
          },
          {
            name: "Sr",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
        ],
        anions: [
          {
            name: "Cl",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -1.0,
          },
          {
            name: "CO₃",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -2.0,
          },
          {
            name: "F",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -1.0,
          },
          {
            name: "HCO₃",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -1.0,
          },
          {
            name: "NO₃",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -1.0,
          },
          {
            name: "SO₄",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: -2.0,
          },
          {
            name: "Br",
            mgL: 0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
          {
            name: "PO₄",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
        ],
        neutrals: [
          {
            name: "B",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
          {
            name: "CO₂",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
          {
            name: "SiO₂",
            mgL: 0.0,
            meqL: 0.0,
            ppm: 0.0,
            molCharge: 0.0,
          },
        ],
      },
    },
  ];
  const [FeedWaterPost, setFeedWaterPost] = [postobj];

  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );


  console.log("unit",unit);
  const [Co2flag, setCo2flag] = useState(false);
  const [Co3flag, setCo3flag] = useState(false);
  const [HCo3flag, setHCo3flag] = useState(false);

  const [waterType, setwaterType] = useState([]);
  const [waterTypeid, setwaterTypeid] = useState(1);
  const [subwaterTypeid, setsubwaterTypeid] = useState(0);
  const [waterTypeName, setwaterTypeName] = useState(1);
  const [subwaterType, setsubwaterType] = useState([]);
  const [disabeldWaterType, setDisabeldWaterType] = useState(false);
  const [Stremdata, setStremdata] = useState();
  const [FeedWaterDetails, setFeedWaterDetails] = useState();
  const [getWaterType, responseWaterType] = useLazyGetAllDataQuery();
  const [getSubWaterType, responseSubWaterType] = useLazyGetAllDataQuery();
  const [getFeedWaterDetails, responseFeedWaterDetails] =
    useLazyGetAllDataQuery();
  const [getCalFeedwaterDetails, { data }] = useCreateDataMutation();
  const [inputValue, setInputValue] = useState(0);

  const loader = useSelector((state) => state.cardlist.loader);
  const StoreData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.data
  );
  console.log("StoreData Entry page", StoreData);
  const StreamStoreData = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.streamData
  );
  const TechnologyStoreData = useSelector(
    (state) => state.processDiagramSlice.addedTechnology
  );
  const { techNolist } = useSelector((state) => state.processDiagramSlice);
  
  let Technologynames = TechnologyStoreData.filter((item) => item.id > 0);
  const StreamStoreDatasave = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.streamData
  );
  //console.log("StreamStoreDatasave Entry page", StreamStoreDatasave);
  const StreamName = useSelector(
    (state) => state.Feedsetupdetailsdatapanel.title
  );
  // let Technology="UF";
  let Technology = [];
  let lengthcount = Technologynames.length;

  if (lengthcount == 1) {
    Technology = Technologynames[0].heading;
    //console.log("Technology Entry if", Technology);
  } else if (lengthcount > 1) {
    Technology = "Multiple";
    //console.log("Technology Entry else if", Technology);
  } else {
    Technology = "null";
    //console.log("Technology Entry else", Technology);
    // Technology="UF";
  }

  
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertData, setAlert] = useState({ type: "", message: "" });
  const [TotalppmCaCO3, setTotalppmCaCO3] = useState();
  const [isFocused, setIsFocused] = useState(null);
  const [updateFeedsetupData, { data1 }] = useCreateDataMutation();

  const UFData = useSelector((state) => state.UFStore.data);
  const selectedUFModule = useSelector((state) => state.UFStore.activeUFModule);
  const ufFluxGuideline = useSelector((state) => state.UFStore.ufFluxGuideline);
  const ufDoseGuidline = useSelector((state) => state.UFStore.ufDoseGuidline);
  const [ subWaterIDForUF, setSubWaterIDForUF] = useState(UFData.waterSubTypeID);
  const [ designTemperatureForUF, setDesignTemperatureForUF] = useState(UFData.designTemp);
  const [ isWaterSubTypeChanged, setIsWaterSubTypeChanged] = useState(false);
  const [ isDesignTempChanged,setIsDesignTempChanged] = useState(false);
 

  const unitType = useSelector((state) => state.GUnitConversion.unitTypeTemp);
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const {unitTypeOrganic,unitFlag,unitTypeTemp,unitTypeConductivity} = useSelector((state) => state.GUnitConversion);

  useEffect(() => {  //commented becouse function is shift to UF page
    console.log("*** FormEntry : Change Detected - Temperature or WaterTypeChanged");
    console.log("*** FormEntry : subWaterIDForUF: ",subWaterIDForUF);
    console.log("*** FormEntry : DesignTemp: ",designTemperatureForUF);
    const obj = { ...UFData };
    obj["waterSubTypeID"] = subWaterIDForUF;
    obj["designTemp"]     = designTemperatureForUF;
    obj["isWaterSubTypeChanged"] = isWaterSubTypeChanged;
    obj["isDesignTempChanged"] = isDesignTempChanged;
    dispatch(updateUFStore(obj));    
  }, [subWaterIDForUF, designTemperatureForUF]);

  //Unitconvesion 
  useEffect(()=>{
    // if(unitFlag){
   
      const convertedData = Stremdata && Stremdata.map((data)=>{
        console.log("sd data",data);
        console.log("sd data1",GlobalUnitConversion(GlobalUnitConversionStore,data.estimatedConductivity,unit.selectedUnits[17],unitTypeConductivity),data.estimatedConductivity,unit.selectedUnits[17],unitTypeConductivity);
        data = {
          ...data,
          toc: GlobalUnitConversion(GlobalUnitConversionStore,data.toc,unitTypeOrganic,unit.selectedUnits[19]),
          tempDesign: GlobalUnitConversion(GlobalUnitConversionStore,data.tempDesign,unit.selectedUnits[2],unitTypeTemp),
          tempMax: GlobalUnitConversion(GlobalUnitConversionStore,data.tempMax,unit.selectedUnits[2],unitTypeTemp),
          tempMin: GlobalUnitConversion(GlobalUnitConversionStore,data.tempMin,unit.selectedUnits[2],unitTypeTemp),  
          
        };
        return data;
      });
      const feeddata= FeedWaterDetails && FeedWaterDetails.map((data)=>{
        data={
          ...data,estimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,data.estimatedConductivity,unit.selectedUnits[17],unitTypeConductivity),
        };
        return data;
      });     
      dispatch(updateLoader(true));  
      setStremdata(convertedData);
      setFeedWaterDetails(feeddata);
      setTimeout(() => {
        dispatch(updateLoader(false));
      }, 5);
    dispatch(updateUnitTypeOrganic(unit.selectedUnits[19]));
    dispatch(updateUnitTypeTemp(unit.selectedUnits[2]));
    dispatch(updateUnitTypeConductivity(unit.selectedUnits[17]));
    dispatch(updateUnitFlag(false));
    // } 
  },[unit.selectedUnits]);

  useEffect(() => {  //commented becouse function is shift to UF page
    console.log("*** FormEntry : Change Detected - Temperature or WaterTypeChanged");
    console.log("*** FormEntry : subWaterIDForUF: ",subWaterIDForUF);
    console.log("*** FormEntry : DesignTemp: ",designTemperatureForUF);
    const obj = { ...UFData };
    obj["waterSubTypeID"] = subWaterIDForUF;
    obj["designTemp"]     = designTemperatureForUF;
    obj["isWaterSubTypeChanged"] = isWaterSubTypeChanged;
    obj["isDesignTempChanged"] = isDesignTempChanged;
    dispatch(updateUFStore(obj));    
  }, [subWaterIDForUF, designTemperatureForUF]);

  useEffect(() => {
    try {
      getFeedWaterDetails(
        `${"masterdata/api/v1/FeedWaterDetails"}?userID=${userID}&projectID=${projectid}&caseID=${caseid}&methodName=${methodname}`
      );

      if (Technology === "IXD") {
        getWaterType(
          `${"masterdata/api/v1/WaterType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}`
        );
        // getSubWaterType(
        //   `${"masterdata/api/v1/WaterSubType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}&waterTypeid=${1}`
        // );
      } else {
        getWaterType(
          `${"masterdata/api/v1/WaterType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}`
        );
        // getSubWaterType(
        //   `${"masterdata/api/v1/WaterSubType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}&waterTypeid=${1}`
        // );
      }
    } catch {
      console.log("Error Feed Water");
    }
  }, []);

  useEffect(() => {
    if (responseWaterType.isLoading) {
      console.log("Loading");
    } else {
      if (responseWaterType.isSuccess === true) {
        setwaterType(responseWaterType.data);
      }
    }
    if (responseWaterType.isError) {
      throw new MyError(
        "WaterType Api Error",
        responseWaterType.error.status,
        "ApiError"
      );
    }
  }, [responseWaterType]);

  useEffect(() => {
    if (responseSubWaterType.isLoading) {
      console.log("Loading");
    } else {
      if (responseSubWaterType.isSuccess === true) {
        setsubwaterType(responseSubWaterType.data);
        //console.log("SubWater : ",responseSubWaterType.data);
        if (subwaterTypeid == 0) {
          const getID = (id) => {
            switch (id) {
              case "2":
                return 1;
              case "3":
                return 2;
              case "4":
                return 49;
              case "5":
                return 51;
              case "6":
                return 52;
              case "7":
                return 53;
              default:
                return 51;
            }
          };
          setsubwaterTypeid(getID(waterTypeid));
          const StreamDetails = Stremdata?.map((i) => {
            i = {
              ...i,
              waterSubTypeID: getID(waterTypeid),
            };
            return i;
          });
          setStremdata(StreamDetails);
        }
      }
    }
    if (responseSubWaterType.isError) {
      throw new MyError(
        "WaterSubType Api Error",
        responseSubWaterType.error.status,
        "ApiError"
      );
    }
  }, [responseSubWaterType]);

  useEffect(() => {
    if (responseFeedWaterDetails.isLoading) {
      console.log("Loading");
    } else {
      if (responseFeedWaterDetails.isSuccess === true) {
        dispatch(updateLoader(true));
        dispatch(Feedsetupdetailsdata(responseFeedWaterDetails.data));

        let dataStream = responseFeedWaterDetails.data[0];  
       if(unit.selectedUnits[17]!=="µS/cm"){
        // const tempData1 ={
        //   TempestimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
        //          }; 
                //  dispatch(updateLoader(true));                
                //  setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
                //  console.log("tempData1",tempData1);
                //  dispatch(Feedsetupdetailsdata(tempData1));
                //  setTimeout(() => {
                //    dispatch(updateLoader(false));
                //  }, 5);

                 const feeddata= responseFeedWaterDetails.data && responseFeedWaterDetails.data.map((data)=>{
                  data={
                    ...data,estimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,data.estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
                  };
                  return data;
                });  

                dispatch(updateLoader(true));                
                // setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
                console.log("feeddata",feeddata);
                dispatch(Feedsetupdetailsdata(feeddata));
                setTimeout(() => {
                  dispatch(updateLoader(false));
                }, 5);
             }

            


        if(unit.selectedUnits[2]!=="°C"){
          const tempData={
            tempDesign:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempDesign,unit.selectedUnits[2],"°C"),
            tempMax:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMax,unit.selectedUnits[2],"°C"),
            tempMin:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMin,unit.selectedUnits[2],"°C"),
          }; 
          
         
          
          dispatch(updateLoader(true));
          setStremdata([{ ...dataStream, tempDesign: tempData.tempDesign, tempMax: tempData.tempMax,tempMin: tempData.tempMin }]); 
         
          dispatch(updateFeedData(tempData));
          console.log("PK updated F value",tempData);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }else{
          dispatch(Feedsetupdetailsdata(responseFeedWaterDetails.data));

        }
        if (techNolist.includes("UF")) {
          console.log("PK in uf");
          let id1 =
            responseFeedWaterDetails.data[0].waterTypeId == 0
              ? 5
              : responseFeedWaterDetails.data[0].waterTypeId;
          let id2 =
            responseFeedWaterDetails.data[0].waterSubTypeID == 0
              ? 51
              : responseFeedWaterDetails.data[0].waterSubTypeID;
          getSubWaterType(
            `${"masterdata/api/v1/WaterSubType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}&waterTypeid=${id1}`
          );
          setwaterTypeid(id1);
          setsubwaterTypeid(id2);

          setDisabeldWaterType(false);
          let data = responseFeedWaterDetails.data[0];
          let tempData={
            tempDesign:responseFeedWaterDetails.data[0].tempDesign,
            tempMax:responseFeedWaterDetails.data[0].tempMax,
            tempMin:responseFeedWaterDetails.data[0].tempMin
          };
          if(unit.selectedUnits[2]!=="°C"){
            tempData={
              tempDesign:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempDesign,unit.selectedUnits[2],"°C"),
              tempMax:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMax,unit.selectedUnits[2],"°C"),
              tempMin:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMin,unit.selectedUnits[2],"°C"),
            }; 
          }
          setStremdata([{ ...data, waterSubTypeID: id2, waterTypeId: id1 ,tempDesign: tempData.tempDesign, tempMax: tempData.tempMax,tempMin: tempData.tempMin}]);
          let dataStream = responseFeedWaterDetails.data[0]; 
          if(unit.selectedUnits[17]!=="µS/cm"){
            // const tempData1 ={
            //   TempestimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
            //          }; 
    
            //         console.log("tempData1",tempData1);
            //          dispatch(updateLoader(true));                
            //          setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
            //          dispatch(Feedsetupdetailsdata(tempData1));
            //          setTimeout(() => {
            //            dispatch(updateLoader(false));
            //          }, 5);
            const feeddata= responseFeedWaterDetails.data && responseFeedWaterDetails.data.map((data)=>{
              data={
                ...data,estimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,data.estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
              };
              return data;
            });  

            dispatch(updateLoader(true));                
            // setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
            console.log("feeddata",feeddata);
            dispatch(Feedsetupdetailsdata(feeddata));
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
                 }
     

        } else if (techNolist.includes("IXD")) {
          console.log("PK in ixd");
          setwaterTypeid(0);
          setsubwaterTypeid(0);

          let data = responseFeedWaterDetails.data[0];
          let tempData={
            tempDesign:responseFeedWaterDetails.data[0].tempDesign,
            tempMax:responseFeedWaterDetails.data[0].tempMax,
            tempMin:responseFeedWaterDetails.data[0].tempMin
          };
          if(unit.selectedUnits[2]!=="°C"){
            tempData={
              tempDesign:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempDesign,unit.selectedUnits[2],"°C"),
              tempMax:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMax,unit.selectedUnits[2],"°C"),
              tempMin:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMin,unit.selectedUnits[2],"°C"),
            }; 
          }
          setStremdata([{ ...data,tempDesign: tempData.tempDesign, tempMax: tempData.tempMax,tempMin: tempData.tempMin}]);
          let dataStream = responseFeedWaterDetails.data[0]; 
          if(unit.selectedUnits[17]!=="µS/cm"){
            // const tempData1 ={
            //   TempestimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
            //          }; 
    
            //         console.log("tempData1",tempData1);
            //          dispatch(updateLoader(true));                
            //          setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
            //         //  dispatch(Feedsetupdetailsdata(tempData1));
            //          setTimeout(() => {
            //            dispatch(updateLoader(false));
            //          }, 5);
            const feeddata= responseFeedWaterDetails.data && responseFeedWaterDetails.data.map((data)=>{
              data={
                ...data,estimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,data.estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
              };
              return data;
            });  

            dispatch(updateLoader(true));                
            // setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData1.TempestimatedConductivity}]); 
            console.log("feeddata",feeddata);
            dispatch(Feedsetupdetailsdata(feeddata));
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
                 }   
          setDisabeldWaterType(true);
        } else {
          console.log("PK in else");
          let id1 =
            responseFeedWaterDetails.data[0].waterTypeId == 0
              ? 5
              : responseFeedWaterDetails.data[0].waterTypeId;
          let id2 =
            responseFeedWaterDetails.data[0].waterSubTypeID == 0
              ? 51
              : responseFeedWaterDetails.data[0].waterSubTypeID;
          setwaterTypeid(id1);
          setsubwaterTypeid(id2);
          let data = responseFeedWaterDetails.data[0];
     
          let tempData={
            tempDesign:responseFeedWaterDetails.data[0].tempDesign,
            tempMax:responseFeedWaterDetails.data[0].tempMax,
            tempMin:responseFeedWaterDetails.data[0].tempMin
          };
          if(unit.selectedUnits[2]!=="°C"){
            tempData={
              tempDesign:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempDesign,unit.selectedUnits[2],"°C"),
              tempMax:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMax,unit.selectedUnits[2],"°C"),
              tempMin:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].tempMin,unit.selectedUnits[2],"°C"),
            }; 
          }
          setStremdata([{ ...data, waterSubTypeID: id2, waterTypeId: id1 ,tempDesign: tempData.tempDesign, tempMax: tempData.tempMax,tempMin: tempData.tempMin}]);
          
          // if(unit.selectedUnits[17]!=="µS/cm"){
          //   const tempData ={
          //     TempestimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,responseFeedWaterDetails.data[0].estimatedConductivity,unit.selectedUnits[17],"µS/cm"),
          //            }; 
          //        }

          // let dataStream = responseFeedWaterDetails.data[0];  
          // setFeedWaterDetails([{ ...dataStream,estimatedConductivity:tempData.TempestimatedConductivity}]); 
        
          getSubWaterType(
            `${"masterdata/api/v1/WaterSubType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}&waterTypeid=${id1}`
          );
          setDisabeldWaterType(false);
        }

        setTimeout(() => {
          dispatch(updateLoader(false));
        }, 5);
      }
    }
    if (responseFeedWaterDetails.isError) {
      throw new MyError(
        "FeedWaterDetails Api Error",
        responseFeedWaterDetails.error.status,
        "ApiError"
      );
    }
  }, [responseFeedWaterDetails]);

  useEffect(() => {
    if (StoreData === 0) {
      <div>Loading....</div>;
    } else {
      dispatch(updateLoader(true));
      setFeedWaterDetails(StoreData);
      setTimeout(() => {
        dispatch(updateLoader(false));
      }, 5);
    }
  }, [StoreData]);

  useEffect(() => {
    dispatch(updateLoader(true));
    if (StoreData === 0) {
      <div>Loading....</div>;
    } else {
      const neutralsmql = FeedWaterDetails?.map((a) =>
        a.neutrals.reduce(
          (total, neutralsValue) => (total = total + neutralsValue.mgL),
          0
        )
      );
      const cationsmql = FeedWaterDetails?.map((a) =>
        a.cations.reduce(
          (total, currentValue) => (total = total + currentValue.mgL),
          0
        )
      );
      const cationsmeql = FeedWaterDetails?.map((a) =>
        a.cations.reduce(
          (total, currentValue) => (total = total + currentValue.meqL),
          0
        )
      );
      const cationsppm = FeedWaterDetails?.map((a) =>
        a.cations.reduce(
          (total, currentValue) => (total = total + currentValue.ppm),
          0
        )
      );
      const anionsmql = FeedWaterDetails?.map((a) =>
        a.anions.reduce(
          (total, anionsValue) => (total = total + anionsValue.mgL),
          0
        )
      );
      const anionsmeql = FeedWaterDetails?.map((a) =>
        a.anions.reduce(
          (total, anionsValue) => (total = total + anionsValue.meqL),
          0
        )
      );
      const anionsppm = FeedWaterDetails?.map((a) =>
        a.anions.reduce(
          (total, anionsValue) => (total = total + anionsValue.ppm),
          0
        )
      );

      setGridTotal([
        {
          CationsMql: cationsmql,
          CationsMeql: cationsmeql,
          Cationsppm: cationsppm,
          AnionsMql: anionsmql,
          AnionsMeql: anionsmeql,
          Anionsppm: anionsppm,
          neutralsMql: neutralsmql,
        },
      ]);

      if (cationsppm > anionsppm) {
        setTotalppmCaCO3(cationsppm);
      } else {
        setTotalppmCaCO3(anionsppm);
      }

      setTimeout(() => {
        dispatch(updateLoader(false));
      }, 1);
    }
  }, [FeedWaterDetails]);

  // FeedWaterDatasave json
  useEffect(() => {
    const validFeedData = FeedWaterDetails?.map((u, index) => {
      let newArrycations = FeedWaterDetails[0].cations; // copying the old datas array
      let newArryanions = FeedWaterDetails[0].anions;
      let newArryneutrals = FeedWaterDetails[0].neutrals;
      let ph = FeedWaterDetails[0].ph;
      let ph25 = FeedWaterDetails[0].ph25;
      const vaildStremdata = Stremdata?.map((u, index) => {
        let newwatertypeid = u.waterTypeId;
        let newwatersubtypeid = u.waterSubTypeID;
            
        setSubWaterIDForUF(u.waterSubTypeID);
        setDesignTemperatureForUF(u.tempDesign);
       

        const FeedWaterDatasave = [
          {
            Method: "masterdata/api/v1/FeedWaterData",
            userID: userID,
            projectID: projectid,
            lstrequestsavefeedwater: [
              {
                streams: [
                  {
                    caseID: u.caseid,
                    waterTypeID: newwatertypeid,
                    waterSubTypeID: newwatersubtypeid,
                    feedStreamID: u.feedStreamId,
                    streamName: StreamName,
                    feedTitle: "Feed Water stream 1",
                    turbidity: u.turbidity,
                    tss: u.tss,
                    toc: u.toc,
                    sdi: u.sdi,
                    pH: ph,
                    ph25: ph25,
                    tempDesign: GlobalUnitConversion(GlobalUnitConversionStore,u.tempDesign,"°C",unit.selectedUnits[2]),
                    tempMax: GlobalUnitConversion(GlobalUnitConversionStore,u.tempMax,"°C",unit.selectedUnits[2]),
                    tempMin: GlobalUnitConversion(GlobalUnitConversionStore,u.tempMin,"°C",unit.selectedUnits[2]),                    
                    tds: u.tds,
                    tcb: u.tcb,
                    percentContribution: 100,
                    balacedInd: true,
                    blendedStreamInd: true,
                    additionalFeedWaterInfo: u.additionalFeedWaterInfo,
                    totalDissolvedSolutes:
                      FeedWaterDetails[0].totalDissolvedSolutes,
                    chargeBalance: Number.parseFloat(
                      FeedWaterDetails[0].chargeBalance
                    ).toFixed(6),
                    estimatedConductivity:GlobalUnitConversion(GlobalUnitConversionStore,FeedWaterDetails[0].estimatedConductivity,"µS/cm",unit.selectedUnits[17]), 
                      
                    pHDesign: FeedWaterDetails[0].pHDesign,
                    cations: newArrycations,
                    anions: newArryanions,
                    neutral: newArryneutrals,
                  },
                ],
              },
            ],
          },
        ];
        //console.log("FeedWaterDatasave....//", FeedWaterDatasave[0]);
        dispatch(UpdatedStream(FeedWaterDatasave[0]));
        return FeedWaterDatasave;
      });

      // dispatch(UpdatedStream(vaildStremdata[0]));
      return vaildStremdata;
    });
  }, [StoreData, Stremdata, FeedWaterDetails, StreamName]);

  const updateFeedsetDataFunction = async (e) => {
    dispatch(updateLoader(true));
    const response = await updateFeedsetupData(e);
    setTimeout(() => {
      dispatch(updateLoader(false));
    }, 5);
  };

  // select water type
  const ddwatertypeId = (e) => {
    const watertypeId = e.target.value;
    dispatch(detectDataChange(true));
    let waterTypename = waterType.filter(
      (data) => data.waterTypeId == e.target.value
    );
    // console.log(" waterTypename response", waterTypename[0].waterSource);
    getSubWaterType(
      `${"masterdata/api/v1/WaterSubType"}?userID=${userID}&projectid=${projectid}&langid=${langid}&technologyid=${technologyid}&waterTypeid=${watertypeId}`
    );
    setwaterTypeid(watertypeId);
    dispatch(detectDataChange(true));
    dispatch(updateWaterSubtypeFlag(true));
    // setwaterTypeName();
    const StreamDetails = Stremdata?.map((i) => {
      i = {
        ...i,
        waterTypeId: watertypeId,
        waterSource: waterTypename[0].waterSource,
        waterSubTypeID: 0,
      };
      return i;
    });
    // console.log(" waterTypename response FeedWaterDetails", FeedWaterDetails);
    const FeedWaterDetailsdata = FeedWaterDetails?.map((i) => {
      i = {
        ...i,
        waterTypeId: watertypeId,
        waterSource: waterTypename[0].waterSource,
        waterSubTypeID: 0,
      };
      return i;
    });

    // console.log(
    //   " waterTypename response FeedWaterDetails1",
    //   FeedWaterDetailsdata
    // );
    setStremdata(StreamDetails);
    setsubwaterTypeid(0);
    dispatch(Feedsetupdetailsdata([FeedWaterDetailsdata[0]]));
    // setWatertypeerror(false);
  };

  const ddSubwatertypeId = (e) => {
    dispatch(detectDataChange(true));
    const SubwatertypeId = e.target.value;
    let SubwatertypeData = waterType.filter(
      (data) => data.SubwatertypeId == e.target.value
    );
    const StreamDetails = Stremdata?.map((i) => {
      i = { ...i, waterSubTypeID: SubwatertypeId };
      return i;
    });
    setsubwaterTypeid(SubwatertypeId);
    setSubWaterIDForUF(SubwatertypeId);
    setIsWaterSubTypeChanged(true);
    setStremdata(StreamDetails);
    dispatch(updateWaterSubtypeFlag(true));
  };

  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisibility(true);
  };
  const handleHideAlert = () => {
    setAlert({ type: "", message: "" });
    setAlertVisibility(false);
  };

  const [GridTotal, setGridTotal] = useState([
    {
      CationsMql: 0.0,
      CationsMeql: 0.0,
      Cationsppm: 0.0,
      AnionsMql: 0.0,
      AnionsMeql: 0.0,
      Anionsppm: 0.0,
      neutralsMql: 0.0,
    },
  ]);

  // API Call values calculation
  const CalengneAPIcall = async (e) => {
    dispatch(detectDataChange(true));
    dispatch(updateLoader(true));
    const newData = e;
    let responseCalFeedwaterDetails = await getCalFeedwaterDetails(newData);
    // setFeedWaterDetails([responseCalFeedwaterDetails.data]);
    if (responseCalFeedwaterDetails.data != null) {
      dispatch(Feedsetupdetailsdata([responseCalFeedwaterDetails.data]));
    } else {
      console.log(
        "Hello Feedwater API Error",
        responseCalFeedwaterDetails.data
      );
    }
    setTimeout(() => {
      dispatch(updateLoader(false));
    }, 1);
  };

  //  On textchange event
  const onchangevalus = (title, subtitle, name, e) => {  
    if(e=="" && e!==0 && cancelFlag==false && title!=="inputPH"){
      dispatch(updateLoader(true));
      let inputString = name.replace(/₂/g, "2").replace(/₄/g, "4").replace(/₃/g, "3");
      if(!inputString.includes("Cl")){
        inputString=inputString.toUpperCase();
      }
      let modifiedString= "inputRef"+inputString+subtitle;
       eval(modifiedString).current.value = 0.0;
       e=0.0;
       setTimeout(() => {
        dispatch(updateLoader(false));
      }, 5);
    }   
    let TDScount = FeedWaterDetails[0].totalDissolvedSolutes;
    let Userinput = e;
    let TotalTDScount = parseInt(Userinput) + parseInt(TDScount);
    if (TotalTDScount >= 1000000) {
      dispatch(updateLoader(true));
      const warningMessage =        "The most recent entry caused the TDS to exceed 1000000,Please revise your input";
      handleShowAlert("warning", warningMessage);
      setTimeout(() => {
        dispatch(updateLoader(false));
      }, 1);
    } else {
      setIsFocused(null);
      if (e != null || e.trim() !== "" || e >= 0) {
        if (title === "cations") {
          let indexget = 0;
          // const Inputvalues=0;
          let Cationinput =[...FeedWaterDetails[0].cations];
          const cationsdata = FeedWaterDetails[0].cations
            .filter((item) => item.name === name)
            .map((u, index) => {
              const newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
              const newinputmeqL = Number.parseFloat(u.meqL).toFixed(3);
              const newinputppm = Number.parseFloat(u.ppm).toFixed(3);
              // console.log("newinput", newinputmgL, newinputmeqL, newinputppm);
              if (subtitle == "mgL") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, mgL: num, ppm: 0, meqL: 0 };                
                indexget = FeedWaterDetails[0].cations.findIndex(
                  (i) => i.name === name || i.mgL === subtitle
                );               
                const Inputvalues  ={ ...u, mgL: num, meqL: newinputmeqL, ppm: newinputppm };            
                Cationinput[indexget] = Inputvalues;
              } else if (subtitle == "meqL") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, meqL: num, mgL: 0, ppm: 0 };
                const Inputvalues  ={ ...u, meqL: num, mgL: newinputmgL, ppm: newinputppm };         
               indexget = FeedWaterDetails[0].cations.findIndex(
                  (i) => i.name === name || i.meqL === subtitle
                );
                Cationinput[indexget] = Inputvalues;
              } else if (subtitle == "ppm") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, ppm: num, meqL: 0, mgL: 0 };
                const Inputvalues  ={ ...u, ppm: num, meqL: newinputmeqL, mgL: newinputmgL };            
                indexget = FeedWaterDetails[0].cations.findIndex(
                  (i) => i.name === name || i.ppm === subtitle
                );
                Cationinput[indexget] = Inputvalues;
              }
              let newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
              newArrycations[indexget] = u; // replace e.target.value with whatever you want to change it to
              let newArryanions = [...FeedWaterDetails[0].anions];
              let newArryneutrals = [...FeedWaterDetails[0].neutrals];
                dispatch(
                Feedsetupdetailsdata([{
                  ...StoreData,
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
                  totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
                  chargeBalance: FeedWaterDetails[0].chargeBalance,
                  estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
                  anions: newArryanions,
                  cations: Cationinput,
                  neutrals: newArryneutrals,
                }])
              );
              const CalculateFeedWaterDataJson = {
                Method: "masterdata/api/v1/CalculateFeedWaterData",
                userID: userID,
                projectID: projectid,
                caseID: caseid,
                typeFlag: 0,
                feedStream: {
                  designTemp: Stremdata[0].tempDesign,
                  methodname: "normal",
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  TotalDissolvedSolutes: 0.0,
                  TotalDissolvedSolids: 0.0,
                  ChargeBalance: 0.0,
                  EstimatedConductivity: 0.0,
                  Degas: 0.0,
                  percentage_of_initial_total_CO2_remaining: 100.0,
                  Equilibrate_with: 0.0,
                  Adjustment_Type: 0.0,
                  Add_Reagent: 0.0,
                  Total_CO2: 0.0,
                  cations: newArrycations,
                  anions: newArryanions,
                  neutrals: newArryneutrals,
                },
              };

              if (
                newinputmgL !== e &&
                newinputmeqL !== e &&
                newinputppm !== e
              ) {
                CalengneAPIcall(CalculateFeedWaterDataJson);
              }

              // settempjson(CalculateFeedWaterDataJson);
              // SetTransitJSON(CalculateFeedWaterDataJson);
              return newArrycations;
            });
        } else if (title === "anions") {
          let indexget = 0;
          let Anionsinput = [...FeedWaterDetails[0].anions];
          const anionsdata = FeedWaterDetails[0].anions
            .filter((item) => item.name === name)
            .map((u, index) => {
              const newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
              const newinputmeqL = Number.parseFloat(u.meqL).toFixed(3);
              const newinputppm = Number.parseFloat(u.ppm).toFixed(3);
              // console.log("newinput", newinputmgL, newinputmeqL, newinputppm);
              if (subtitle == "mgL") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, mgL: num, meqL: 0, ppm: 0 };
                const Inputvalues  ={ ...u, mgL: num, meqL: newinputmeqL, ppm: newinputppm };               
                indexget = FeedWaterDetails[0].anions.findIndex(
                  (i) => i.name === name || i.mgL === subtitle
                );
                Anionsinput[indexget] = Inputvalues;

              } else if (subtitle == "meqL") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, meqL: num, mgL: 0, ppm: 0 };
                const Inputvalues  = { ...u, meqL: num, mgL: newinputmgL, ppm: newinputppm };
                indexget = FeedWaterDetails[0].anions.findIndex(
                  (i) => i.name === name || i.meqL === subtitle
                );
                Anionsinput[indexget] = Inputvalues;

              } else if (subtitle == "ppm") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, ppm: num, mgL: 0, meqL: 0 };
                const Inputvalues  ={ ...u, ppm: num, meqL: newinputmeqL, mgL: newinputmgL }; 
                indexget = FeedWaterDetails[0].anions.findIndex(
                  (i) => i.name === name || i.ppm === subtitle
                );
                Anionsinput[indexget] = Inputvalues;
              }
              let newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
              let newArryanions = [...FeedWaterDetails[0].anions];
              newArryanions[indexget] = u; // replace e.target.value with whatever you want to change it to
              let newArryneutrals = [...FeedWaterDetails[0].neutrals];
              dispatch(
                Feedsetupdetailsdata([{
                  ...StoreData,
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
                  totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
                  chargeBalance: FeedWaterDetails[0].chargeBalance,
                  estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
                  anions: Anionsinput,
                  cations: newArrycations,
                  neutrals: newArryneutrals,
                }])
              );
              const CalculateFeedWaterDataJson = {
                Method: "masterdata/api/v1/CalculateFeedWaterData",
                userID: userID,
                projectID: projectid,
                caseID: caseid,
                typeFlag: 0,
                feedStream: {
                  designTemp: Stremdata[0].tempDesign,
                  methodname: "normal",
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  TotalDissolvedSolutes: 0.0,
                  TotalDissolvedSolids: 0.0,
                  ChargeBalance: 0.0,
                  EstimatedConductivity: 0.0,
                  Degas: 0.0,
                  percentage_of_initial_total_CO2_remaining: 100.0,
                  Equilibrate_with: 0.0,
                  Adjustment_Type: 0.0,
                  Add_Reagent: 0.0,
                  Total_CO2: 0.0,
                  cations: newArrycations,
                  anions: newArryanions,
                  neutrals: newArryneutrals,
                },
              };
              if (
                newinputmgL !== e &&
                newinputmeqL !== e &&
                newinputppm !== e
              ) {
                CalengneAPIcall(CalculateFeedWaterDataJson);
              }
              return newArryanions;
            });
        } else if (title === "neutrals") {
          let indexget = 0;
          let neutralsinput = [...FeedWaterDetails[0].neutrals];
          const neutralsdata = FeedWaterDetails[0].neutrals
            .filter((item) => item.name === name)
            .map((u, index) => {
              const newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
              if (subtitle == "mgL") {
                const num = Number.parseFloat(e).toFixed(3);
                u = { ...u, mgL: num, meqL: 0, ppm: 0 };  
                 
                indexget = FeedWaterDetails[0].neutrals.findIndex(
                  (i) => i.name === name || i.mgL === subtitle
                );
                const Inputvalues  ={ ...u, mgL: num, meqL: 0, ppm: 0 };  
                neutralsinput[indexget] = Inputvalues;               
              }
               let newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
              let newArryanions = [...FeedWaterDetails[0].anions];
              let newArryneutrals = [...FeedWaterDetails[0].neutrals];
              dispatch(
                Feedsetupdetailsdata([{
                  ...StoreData,
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
                  totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
                  chargeBalance: FeedWaterDetails[0].chargeBalance,
                  estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
                  anions: newArryanions,
                  cations: newArrycations,
                  neutrals: neutralsinput,
                }])
              );

              newArryneutrals[indexget] = u; // replace e.target.value with whatever you want to change it to
              // console.log("newArryanions...1", newArryanions, newArryneutrals);
              const CalculateFeedWaterDataJson = {
                Method: "masterdata/api/v1/CalculateFeedWaterData",
                userID: userID,
                projectID: projectid,
                caseID: caseid,
                typeFlag: 0,
                feedStream: {
                  designTemp: Stremdata[0].tempDesign,
                  methodname: "normal",
                  ph: FeedWaterDetails[0].ph,
                  ph25: FeedWaterDetails[0].ph25,
                  TotalDissolvedSolutes: 0.0,
                  TotalDissolvedSolids: 0.0,
                  ChargeBalance: 0.0,
                  EstimatedConductivity: 0.0,
                  Degas: 0.0,
                  percentage_of_initial_total_CO2_remaining: 100.0,
                  Equilibrate_with: 0.0,
                  Adjustment_Type: 0.0,
                  Add_Reagent: 0.0,
                  Total_CO2: 0.0,
                  cations: newArrycations,
                  anions: newArryanions,
                  neutrals: newArryneutrals,
                },
              };
              if (newinputmgL !== e) {
                CalengneAPIcall(CalculateFeedWaterDataJson);
              }
              return newArryneutrals;
            });
        } else if (title === "inputPH") {
          let newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
          let newArryanions = [...FeedWaterDetails[0].anions];
          let newArryneutrals = [...FeedWaterDetails[0].neutrals];
          // newArryneutrals[indexget] = u; // replace e.target.value with whatever you want to change it to


          dispatch(
            Feedsetupdetailsdata([{
              ...StoreData,
              ph: e,
              ph25: FeedWaterDetails[0].ph25,
              totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
                  totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
                  chargeBalance: FeedWaterDetails[0].chargeBalance,
                  estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
              anions: newArryanions,
              cations: newArrycations,
              neutrals: newArryneutrals,
            }])
          );

          const CalculateFeedWaterDataJson = {
            Method: "masterdata/api/v1/CalculateFeedWaterData",
            userID: userID,
            projectID: projectid,
            caseID: caseid,
            typeFlag: 0,
            feedStream: {
              designTemp: Stremdata[0].tempDesign,
              methodname: "normal",
              ph: e,
              ph25: FeedWaterDetails[0].ph25,
              TotalDissolvedSolutes: 0.0,
              TotalDissolvedSolids: 0.0,
              ChargeBalance: 0.0,
              EstimatedConductivity: 0.0,
              Degas: 0.0,
              percentage_of_initial_total_CO2_remaining: 100.0,
              Equilibrate_with: 0.0,
              Adjustment_Type: 0.0,
              Add_Reagent: 0.0,
              Total_CO2: 0.0,
              cations: newArrycations,
              anions: newArryanions,
              neutrals: newArryneutrals,
            },
          };

          CalengneAPIcall(CalculateFeedWaterDataJson);
        }
      } else {
        const warningMessage = " Please enter a positive values !!";
        handleShowAlert("warning", warningMessage);
      }
      document.body.classList.remove("disable");
    }
  };

  const onchangevalusCo2 = (tital, subtitle, name, e) => {
    var duplicateCo2flag = "";

    const newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
    const newArryanions = [...FeedWaterDetails[0].anions];
    const newArryneutrals = [...FeedWaterDetails[0].neutrals];

    const Co2mgL = FeedWaterDetails[0].neutrals
      .filter((item) => item.name === name)
      .map((u, index) => {
        u = u.mgL;
        return u;
      });

    const co2mglinput = Number.parseFloat(Co2mgL[0]).toFixed(3);
    

    if (Co2flag == false) {
      if (co2mglinput >= 0) {
        duplicateCo2flag = "true";
      } else {
        duplicateCo2flag = "false";
      }
    }
    //console.log(HCo3flag, Co3flag, Co2flag, "Co2 text change");
    if (e == 0) {
      const num = Number.parseFloat(0.00000001).toFixed(8);
      e = num;
    }

    let indexget = 0;
    let neutralsinput = [...FeedWaterDetails[0].neutrals];
    let newinputmgL=0;
    if (duplicateCo2flag == "true" || Co2flag == true) {
      //console.log(HCo3flag, Co3flag, Co2flag, "Co2 text change1");

      setCo2flag(true);
      indexget = FeedWaterDetails[0].neutrals.findIndex(
        (i) => i.name === name || i.mgL === subtitle
      );
         
      const CO2json = newArryneutrals?.map((u, i) => {
        if (u.name == "CO₂") {
           newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
        const newinputmeqL = Number.parseFloat(u.meqL).toFixed(3);
        const newinputppm = Number.parseFloat(u.ppm).toFixed(3);
          // let num = Number.parseFloat(e).toFixed(3);
          u = { ...u, mgL: e, meqL: 0, ppm: 0 };
          newArryneutrals[indexget] = u;
          const Inputvalues  ={ ...u, mgL: e, meqL: newinputmeqL, ppm: newinputppm };  
          neutralsinput[indexget] = Inputvalues;

        }
        return u;
      });
    }

    let Anionsinput = [...FeedWaterDetails[0].anions];
    if (Co3flag == false) {
      const CO3HCO3json = newArryanions?.map((u, i) => {
        if (u.name == "CO₃") {
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === "CO₃"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };
          newArryanions[indexget] = u;
        }
        return u;
      });
    }

    if (HCo3flag == false) {
      const HCO3json = newArryanions?.map((u, i) => {
        if (u.name == "HCO₃") {
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === "HCO₃"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };
          newArryanions[indexget] = u;
        }
        return u;
      });
    }

    dispatch(
      Feedsetupdetailsdata([{
        ...StoreData,
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,        
        totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
        totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
        chargeBalance: FeedWaterDetails[0].chargeBalance,
        estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
        anions: Anionsinput,
        cations: newArrycations,
        neutrals: neutralsinput,
      }])
    );
    const CalculateFeedWaterDataJson = {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      userID: userID,
      projectID: projectid,
      caseID: caseid,
      typeFlag: 0,
      feedStream: {
        designTemp: Stremdata[0].tempDesign,
        methodname: "normal",
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,
        TotalDissolvedSolutes: 0.0,
        TotalDissolvedSolids: 0.0,
        ChargeBalance: 0.0,
        EstimatedConductivity: 0.0,
        Degas: 0.0,
        percentage_of_initial_total_CO2_remaining: 100.0,
        Equilibrate_with: 0.0,
        Adjustment_Type: 0.0,        Add_Reagent: 0.0,
        Total_CO2: 0.0,
        cations: newArrycations,
        anions: newArryanions,
        neutrals: newArryneutrals,
      },
    };
   
    // CalengneAPIcall(CalculateFeedWaterDataJson);
    if (
      newinputmgL !== e 
    ) {
      CalengneAPIcall(CalculateFeedWaterDataJson);
    }
  };

  const onchangevalusCo3 = (tital, subtitle, name, e) => {
    const newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
    const newArryanions = [...FeedWaterDetails[0].anions];
    const newArryneutrals = [...FeedWaterDetails[0].neutrals];

    //console.log(HCo3flag, Co3flag, Co2flag, "Co3 text change");
    if (e == 0) {
      const num = Number.parseFloat(0.00000001).toFixed(8);
      e = num;
    }
    else{
      const num = Number.parseFloat(e).toFixed(3);
      e = num;
    }
    let indexget = 0;
    let Anionsinput = [...FeedWaterDetails[0].anions];
    let newinputmgL = 0;
    let newinputmeqL = 0;
    let newinputppm = 0;

    const CO3json = newArryanions?.map((u, i) => {
      if (u.name == "CO₃") {
          newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
         newinputmeqL = Number.parseFloat(u.meqL).toFixed(3);
         newinputppm = Number.parseFloat(u.ppm).toFixed(3);

        if (subtitle == "mgL") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, mgL: e, meqL: 0, ppm: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.mgL === subtitle
          );
          const Inputvalues  ={ ...u, mgL: e, meqL: newinputmeqL, ppm: newinputppm };     
          Anionsinput[indexget] = Inputvalues;
        } else if (subtitle == "meqL") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, meqL: e, mgL: 0, ppm: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.meqL === subtitle
          );
          const Inputvalues  ={ ...u, meqL: e, mgL: newinputmgL, ppm: newinputppm };        
          Anionsinput[indexget] = Inputvalues;
        } else if (subtitle == "ppm") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, ppm: e, mgL: 0, meqL: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.ppm === subtitle
          );
          const Inputvalues  ={ ...u, ppm: e, meqL: newinputmeqL, mgL: newinputmgL };         
          Anionsinput[indexget] = Inputvalues;
        }
        newArryanions[indexget] = u;
      }
    
      return u;
    });


    let neutralsinput = FeedWaterDetails[0].neutrals;
    if (Co2flag == false) {      
      const CO2json = FeedWaterDetails[0].neutrals?.map((u, i) => {
        if (u.name == "CO₂") {          
          indexget = FeedWaterDetails[0].neutrals.findIndex(
            (i) => i.name === "CO₂"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };          
          newArryneutrals[indexget] = u;

        }
      });
    }

    if (HCo3flag == false) {
      const HCO3json = FeedWaterDetails[0].anions?.map((u, i) => {
        if (u.name == "HCO₃") {         
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === "HCO₃"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };
          newArryanions[indexget] = u;
       }
        return u;
      });
    }

    dispatch(
      Feedsetupdetailsdata([{
        ...StoreData,
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,
        totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
        totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
        chargeBalance: FeedWaterDetails[0].chargeBalance,
        estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
        anions: Anionsinput,
        cations: newArrycations,
        neutrals: neutralsinput,
      }])
    );
    setCo3flag(true);


    const CalculateFeedWaterDataJson = {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      userID: userID,
      projectID: projectid,
      caseID: caseid,
      typeFlag: 0,
      feedStream: {
        designTemp: Stremdata[0].tempDesign,
        methodname: "normal",
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,
        TotalDissolvedSolutes: 0.0,
        TotalDissolvedSolids: 0.0,
        ChargeBalance: 0.0,
        EstimatedConductivity: 0.0,
        Degas: 0.0,
        percentage_of_initial_total_CO2_remaining: 100.0,
        Equilibrate_with: 0.0,
        Adjustment_Type: 0.0,
        Add_Reagent: 0.0,
        Total_CO2: 0.0,
        cations: newArrycations,
        anions: newArryanions,
        neutrals: newArryneutrals,
      },
    };

    // CalengneAPIcall(CalculateFeedWaterDataJson);
    if (
      newinputmgL !== e &&
      newinputmeqL !== e &&
      newinputppm !== e
    ) {
      CalengneAPIcall(CalculateFeedWaterDataJson);
    }

  };

  const onchangevalusHCo3 = (tital, subtitle, name, e) => {
    const newArrycations = [...FeedWaterDetails[0].cations]; // copying the old datas array
    const newArryanions = [...FeedWaterDetails[0].anions];
    const newArryneutrals = [...FeedWaterDetails[0].neutrals];
    
    let indexget = 0;
    if (e == 0) {
      const num = Number.parseFloat(0.00000001).toFixed(8);
      e = num;
    }
    else{
     const num = Number.parseFloat(e).toFixed(3);
      e = num;
    }

    let Anionsinput = [...FeedWaterDetails[0].anions];
    let newinputmgL =0;
    let newinputmeqL = 0;
    let newinputppm = 0;
    const HCO3json = newArryanions?.map((u, i) => {
      if (u.name == "HCO₃") {
         newinputmgL = Number.parseFloat(u.mgL).toFixed(3);
         newinputmeqL = Number.parseFloat(u.meqL).toFixed(3);
         newinputppm = Number.parseFloat(u.ppm).toFixed(3);
        if (subtitle == "mgL") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, mgL: e, meqL: 0, ppm: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.mgL === subtitle
          );
          const Inputvalues  ={ ...u, mgL: e, meqL: newinputmeqL, ppm: newinputppm };     
          Anionsinput[indexget] = Inputvalues;

        } else if (subtitle == "meqL") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, meqL: e, mgL: 0, ppm: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.meqL === subtitle
          );
          const Inputvalues  ={ ...u, meqL: e, mgL: newinputmgL, ppm: newinputppm };  
          Anionsinput[indexget] = Inputvalues;
        } else if (subtitle == "ppm") {
          // const num = Number.parseFloat(e).toFixed(3);
          u = { ...u, ppm: e, mgL: 0, meqL: 0 };
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === name || i.ppm === subtitle
          );
          const Inputvalues  ={ ...u, ppm: e, mgL: newinputmgL, meqL: newinputmeqL };
          Anionsinput[indexget] = Inputvalues;
        }
        newArryanions[indexget] = u;
      }
      return u;
    });

    let neutralsinput = FeedWaterDetails[0].neutrals;
    if (Co2flag == false) {
      const CO2json = newArryneutrals?.map((u, i) => {
        if (u.name == "CO₂") {
          indexget = FeedWaterDetails[0].neutrals.findIndex(
            (i) => i.name === "CO₂"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };
          newArryneutrals[indexget] = u;
        }
      });
    }

    if (Co3flag == false) {
      const CO3json = newArryanions?.map((u, i) => {
        if (u.name == "CO₃") {
          indexget = FeedWaterDetails[0].anions.findIndex(
            (i) => i.name === "CO₃"
          );
          u = { ...u, mgL: 0, meqL: 0, ppm: 0 };
          newArryanions[indexget] = u;
        }
        return u;
      });
    }

    dispatch(
      Feedsetupdetailsdata([{
        ...StoreData,
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,
        totalDissolvedSolutes: FeedWaterDetails[0].totalDissolvedSolutes,
        totalDissolvedSolids: FeedWaterDetails[0].totalDissolvedSolids,
        chargeBalance: FeedWaterDetails[0].chargeBalance,
        estimatedConductivity: FeedWaterDetails[0].estimatedConductivity,
        anions: Anionsinput,
        cations: newArrycations,
        neutrals: neutralsinput,
      }])
    );


    setHCo3flag(true);

    const CalculateFeedWaterDataJson = {
      Method: "masterdata/api/v1/CalculateFeedWaterData",
      userID: userID,
      projectID: projectid,
      caseID: caseid,
      typeFlag: 0,
      feedStream: {
        designTemp: Stremdata[0].tempDesign,
        methodname: "normal",
        ph: FeedWaterDetails[0].ph,
        ph25: FeedWaterDetails[0].ph25,
        TotalDissolvedSolutes: 0.0,
        TotalDissolvedSolids: 0.0,
        ChargeBalance: 0.0,
        EstimatedConductivity: 0.0,
        Degas: 0.0,
        percentage_of_initial_total_CO2_remaining: 100.0,
        Equilibrate_with: 0.0,
        Adjustment_Type: 0.0,
        Add_Reagent: 0.0,
        Total_CO2: 0.0,
        cations: newArrycations,
        anions: newArryanions,
        neutrals: newArryneutrals,
      },
    };
    // CalengneAPIcall(CalculateFeedWaterDataJson);
    if (
      newinputmgL !== e &&
      newinputmeqL !== e &&
      newinputppm !== e
    ) {
      CalengneAPIcall(CalculateFeedWaterDataJson);
    }
  };

  // onchangevalus("inputPH", "ph", "Ph", e);
  const [TurbidityUFIXisError, setTurbidityUFIXisError] = useState(false);
  const [TurbidityUFIXisWarning, setTurbidityUFIXisWarning] = useState(false);
  const [TSSUFIXisError, setTSSUFIXisError] = useState(false);
  const [TSSUFIXisWarning, setTSSUFIXisWarning] = useState(false);
  const [SDIUFIXisError, setSDIUFIXisError] = useState(false);
  const [SDIUFIXisWarning, setSDIUFIXisWarning] = useState(false);
  const [TOCUFIXisError, setTOCUFIXisError] = useState(false);
  const [TOCUFIXisWarning, setTOCUFIXisWarning] = useState(false);
  const [PHisError, setPHisError] = useState(false);
  const [PHisWarning, setPHisWarning] = useState(false);
  const [MinimumisError, setMinimumisError] = useState(false);
  const [MinimumisWarning, setMinimumisWarning] = useState(false);
  const [MaximumisError, setMaximumisError] = useState(false);
  const [MaximumisWarning, setMaximumisWarning] = useState(false);

  const [IXMinimumisError, setIXMinimumisError] = useState(false);
  const [IXMinimumisWarning, setIXMinimumisWarning] = useState(false);
  const [IXMaximumisError, setIXMaximumisError] = useState(false);
  const [IXMaximumisWarning, setIXMaximumisWarning] = useState(false);

  const [MultiMinimumisError, setMultiMinimumisError] = useState(false);
  const [MultiMinimumisWarning, setMultiMinimumisWarning] = useState(false);
  const [MultiMaximumisError, setMultiMaximumisError] = useState(false);
  const [MultiMaximumisWarning, setMultiMaximumisWarning] = useState(false);

  const [DesignisError, setDesignisError] = useState(false);
  const [DesignsWarning, setDesignsWarning] = useState(false);

  //turbutit
  const getData = (feedwaterData) => {
   console.log("djfhdhfd",Technology);

    if(Technology === "IXD"){
      return {
        waterSubTypeId: 0,
        description: 0,
        ...feedwaterData,
      };
    }else{
      for (let i = 0; i < subwaterType.length; i++) {
        let str = subwaterType[i].description;
        str = str.replaceAll("≥", ">=");
        str = str.replaceAll("≤", "<=");
        str = str.replaceAll("<", "<");
        str = str.replaceAll(",", "&&");
        str = str.replaceAll("NTU", feedwaterData.NTU);
        str = str.replaceAll("TSS", feedwaterData.TSS);
        str = str.replaceAll("TOC", feedwaterData.TOC);
        if (eval(str)) {
          if (feedwaterData.TSS == 0) {
            feedwaterData.TSS = feedwaterData.NTU * 2;
          }
          return {
            waterSubTypeId: subwaterType[i].waterSubTypeId,
            description: subwaterType[i].description,
            ...feedwaterData,
          };
        }
      }
      return {
        waterSubTypeId: subwaterType[subwaterType.length-1].waterSubTypeId,
        description: subwaterType[subwaterType.length-1].description,
        ...feedwaterData,
        TSS :feedwaterData.TSS==0?  feedwaterData.NTU * 2:feedwaterData.TSS
      };
    }

  };

  const textchange = (textname, e, type) => {
    dispatch(detectDataChange(true));
    // console.log(
    //   "textname............",
    //   textname,
    //   e,
    //   type,
    //   Stremdata[0].turbidity
    // );
   let UFValuesSoft40 = 0;
  let  UFValuesSoft41 = 0;
   let UFValuesHard101= 0;
   let IXDValuesSoft60 = 0;
   let IXDValuesSoft61 = 0;
   let IXDValuesHard101= 0;
   let valuesstart=0;
   let valuessoft=1;
   let StreamDetailstempMax=0;
   let StreamDetailstempDesign=0;
   let StreamDetailstempMin=0;

   let  TOCValuesSoft40 = 0;
   let  TOCValuesSoft41 = 0;
   let  TOCValuesHard101= 0;

   StreamDetailstempMax = Stremdata?.map((i) => {
    i = i.tempMax;
    return i;
  });
   StreamDetailstempDesign = Stremdata?.map((i) => {
    i = i.tempDesign;
    return i;
  });

   StreamDetailstempMin = Stremdata?.map((i) => {
    i = i.tempMin;
    return i;
  });


  if(unit.selectedUnits[19]==="mg/L KMnO₄"){
    TOCValuesSoft40 = 200;
    TOCValuesSoft41 = 201;
    TOCValuesHard101= 501;      
  }else if (unit.selectedUnits[19]==="mg/L TOC"){
    TOCValuesSoft40 = 40;
    TOCValuesSoft41 = 41;
    TOCValuesHard101= 101;
  }

 if(unit.selectedUnits[2]==="°C"){  

  valuesstart=0;
  valuessoft=1;
  UFValuesSoft40 = 40.00;
  UFValuesSoft41 = 41.00;
  UFValuesHard101= 101.00;
  IXDValuesSoft60 = 60.00;
  IXDValuesSoft61 = 61.00;
  IXDValuesHard101= 101.00;  
 }
 else{
  valuesstart=0;
  valuessoft=33.8;
  UFValuesSoft40= 104;
  UFValuesSoft41= 105.9;
  UFValuesHard101= 213.9;
  IXDValuesSoft60= 140;
  IXDValuesSoft61= 141.9;
  IXDValuesHard101= 213.9; 
 }

  
 setDesignTemperatureForUF(StreamDetailstempDesign);
    setIsDesignTempChanged(true);

    if (textname === "Turbidity") {
      if (
        Technology === "UF" ||
        Technology === "IXD" ||
        Technology === "null"
      ) {
         if (e >= 0 && e < 301) {
          setTurbidityUFIXisWarning(false);
          setTurbidityUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:e,TSS:Stremdata[0]?.tss,TOC:Stremdata[0]?.toc});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC,waterSubTypeID:Data.waterSubTypeId };
              return i;
            });
            setStremdata(StreamDetails);
            //console.log("StreamDetails..", StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else if (e > 300 && e < 1001) {
          setTurbidityUFIXisWarning(true);
          setTurbidityUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:e,TSS:Stremdata[0]?.tss,TOC:Stremdata[0]?.toc});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC,waterSubTypeID:Data.waterSubTypeId};
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else {
          setTurbidityUFIXisError(true);
          setTurbidityUFIXisWarning(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, turbidity: i.turbidity };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);

            setTurbidityUFIXisWarning(false);
            setTurbidityUFIXisError(false);
          }
        }
      } else if (Technology === "RO") {
        console.log("text change values RO ", textname, e);
      }
    } else if (textname === "TSS") {
      if (
        Technology === "UF" ||
        Technology === "IXD" ||
        Technology === "null"
      ) {
        if(e==""){
          if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:0,TOC:Stremdata[0]?.toc});
          ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i,  turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC ,waterSubTypeID:Data.waterSubTypeId };
            return i;
          });
          setStremdata(StreamDetails);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
        }
        else 
        if (e >= 0 && e < 101) {
          setTSSUFIXisError(false);
          setTSSUFIXisWarning(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:e,TOC:Stremdata[0]?.toc});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i,  turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC ,waterSubTypeID:Data.waterSubTypeId };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else if (e > 100 && e < 1001) {
          setTSSUFIXisWarning(true);
          setTSSUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:e,TOC:Stremdata[0]?.toc});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i,  turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC ,waterSubTypeID:Data.waterSubTypeId };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else {
          setTSSUFIXisError(true);
          setTSSUFIXisWarning(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, tss: i.tss };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
            setTSSUFIXisWarning(false);
            setTSSUFIXisError(false);
          }
        }
      } else if (Technology === "RO") {
        console.log("text change values RO ", textname, e);
      } else {
        // console.log("text change values else  ",textname,e);
      }
      // console.log("text change values TSS", textname, e);
    } else if (textname === "SDI") {
      if (
        Technology === "UF" ||
        Technology === "IXD" ||
        Technology === "null"
      ) {
        if (e >= 0 && e < 6.7) {
          setSDIUFIXisError(false);
          setSDIUFIXisWarning(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, sdi: e };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else if (e > 6.6 && e < 21) {
          setSDIUFIXisWarning(true);
          setSDIUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, sdi: e };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else {
          setSDIUFIXisError(true);
          setSDIUFIXisWarning(false);
          if (type === "TextonBlur") {
            //console.log("SDI............", textname, e, type);
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, sdi: i.sdi };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
            setSDIUFIXisWarning(false);
            setSDIUFIXisError(false);
          }
        }
      }
    } else if (textname === "TOC") {
      if (
        Technology === "UF" ||
        Technology === "IXD" ||
        Technology === "null"
      ) {
        if(e==""){
          if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:Stremdata[0]?.tss,TOC:0});
          ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC ,waterSubTypeID:Data.waterSubTypeId};
            return i;
          });
          setStremdata(StreamDetails);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
        }
        else if (parseFloat(e) >= 0 && parseFloat(e) < parseFloat(TOCValuesSoft41)) {
          setTOCUFIXisWarning(false);
          setTOCUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:Stremdata[0]?.tss,TOC:e});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC,waterSubTypeID:Data.waterSubTypeId };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else if (parseFloat(e) > parseFloat(TOCValuesSoft40) && parseFloat(e) < parseFloat(TOCValuesHard101)) {
          setTOCUFIXisWarning(true);
          setTOCUFIXisError(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            let Data = getData({NTU:Stremdata[0]?.turbidity,TSS:Stremdata[0]?.tss,TOC:e});
            ddSubwatertypeId({target:{value:Data.waterSubTypeId,}});
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i,turbidity: Data.NTU,tss:Data.TSS,toc:Data.TOC,waterSubTypeID:Data.waterSubTypeId };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
          }
        } else {
          setTOCUFIXisError(true);
          setTOCUFIXisWarning(false);
          if (type === "TextonBlur") {
            dispatch(updateLoader(true));
            const StreamDetails = Stremdata?.map((i) => {
              i = { ...i, toc: i.toc };
              return i;
            });
            setStremdata(StreamDetails);
            setTimeout(() => {
              dispatch(updateLoader(false));
            }, 5);
            setTOCUFIXisWarning(false);
            setTOCUFIXisError(false);
          }
        }
      }
      // console.log("text change values TOC", textname, e);
    } else if (textname === "PH") {
      if(e==""){
        if (type === "TextonBlur") {
        dispatch(updateLoader(true));
        const StreamDetails = Stremdata?.map((i) => {
          i = { ...i, ph: 0.0 };
          return i;
        });
        setStremdata(StreamDetails);
        setTimeout(() => {
          dispatch(updateLoader(false));
        }, 5);
      }
      }
      else 
      if (e >= 0 && e < 14) {
        setPHisError(false);
        setPHisWarning(false);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, ph: e };
            return i;
          });
          // setStremdata(StreamDetails);
          onchangevalus("inputPH", "ph", "Ph", e);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
      } else if (e > 13.9 && e < 14.1) {
        setPHisError(false);
        setPHisWarning(true);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, ph: e };
            return i;
          });
          // setStremdata(StreamDetails);
          onchangevalus("inputPH", "ph", "Ph", e);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
      } else {
        setPHisError(true);
        setPHisWarning(false);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, ph: i.ph };
            return i;
          });
          // setStremdata(StreamDetails);
          onchangevalus("inputPH", "ph", "Ph", 14);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
          setPHisWarning(false);
          setPHisError(false);
        }
      }
    } else if (textname === "Minimum") {
      if (
        parseFloat(StreamDetailstempMax[0]) >= parseFloat(StreamDetailstempDesign[0]) &&
        parseFloat(StreamDetailstempDesign[0]) >= parseFloat(e)
      ) {
        console.log("temperatureValues.1",parseFloat(e),parseFloat(UFValuesSoft41),StreamDetailstempDesign[0],StreamDetailstempMax[0]);
        if (Technology === "UF" || Technology === "null") {
          
          if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
            setMinimumisWarning(true);
            setMinimumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } 

          else if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(UFValuesSoft41)) {
            setMinimumisWarning(false);
            setMinimumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } 


          else if ( parseFloat(e) > parseFloat(UFValuesSoft40) && parseFloat(e) < parseFloat(UFValuesHard101)) {
            setMinimumisWarning(true);
            setMinimumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          }
           else {
            setMinimumisWarning(false);
            setMinimumisError(true);

            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: StreamDetailstempMin[0] };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
              setIXMinimumisWarning(false);
              setMinimumisError(false);
            }
          }
         }
          else if (Technology === "IXD") {
            if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
                setIXMinimumisWarning(true);
                setIXMinimumisError(false);
                if (type === "TextonBlur") {
                  dispatch(updateLoader(true));
                  const StreamDetails = Stremdata?.map((i) => {
                    i = { ...i, tempMin: e };
                    return i;
                  });
                  setStremdata(StreamDetails);
                  setTimeout(() => {
                    dispatch(updateLoader(false));
                  }, 5);
                }
              }

         else if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e) < parseFloat(IXDValuesSoft61) ) {
            setIXMinimumisWarning(false);
            setIXMinimumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else if ( parseFloat(e) > parseFloat(IXDValuesSoft60) &&  parseFloat(e) < parseFloat(IXDValuesHard101)) {
            setIXMinimumisWarning(true);
            setIXMinimumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else {
            setIXMinimumisWarning(false);
            setIXMinimumisError(true);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMin: StreamDetailstempMin };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);

              setIXMinimumisWarning(false);
              setIXMinimumisError(false);
            }
          }
          } 
         else if (Technology === "RO") {
          console.log("text change values RO ", textname, e);
        }
      }
      
      
      else {
        setMultiMinimumisError(true);
        setIXMinimumisError(true);
        setMinimumisError(true);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const warningMessage =
            "Minimum Temperature Warning,The Minimum Temperature Value Should be Less Than or Equal to The Design Temperature Value. Please Revise Your Input.";
          handleShowAlert("warning", warningMessage);
          setMultiMinimumisWarning(false);
          setMultiMinimumisError(false);
          setIXMinimumisError(false);
          setMinimumisError(false);
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, tempMin: StreamDetailstempMin[0] };
            return i;
          });
          setStremdata(StreamDetails);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
      }



    } else if (textname === "Design") {
     
      if (parseFloat(StreamDetailstempMax[0]) >= parseFloat(e) && parseFloat(e) >= parseFloat(StreamDetailstempMin[0])) {
        if (Technology === "UF" || Technology === "null") {
          
          if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
            setDesignisError(false);
            setDesignsWarning(true);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setStremdata(StreamDetails);
              setDesignTemperatureForUF(e);
              setIsDesignTempChanged(true);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          }

         else if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e) < parseFloat(UFValuesSoft41)) {
            setDesignisError(false);
            setDesignsWarning(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setStremdata(StreamDetails);
              setDesignTemperatureForUF(e);
              setIsDesignTempChanged(true);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else if (parseFloat(e) > parseFloat(UFValuesSoft40) && parseFloat(e) < parseFloat(UFValuesHard101)) {
            setDesignisError(false);
            setDesignsWarning(true);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setDesignTemperatureForUF(e);
              setIsDesignTempChanged(true);
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else {
            setDesignisError(true);
            setDesignsWarning(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: StreamDetailstempDesign[0] };
                return i;
              });
              setDesignTemperatureForUF(StreamDetailstempDesign[0]);
              setIsDesignTempChanged(true);
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);

              setMaximumisWarning(false);
              setMaximumisError(false);
            }
          }
        } else if (Technology === "IXD") {
          if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
            setDesignisError(false);
            setDesignsWarning(true);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          }

         else if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e) < parseFloat(IXDValuesSoft61)) {
            setDesignisError(false);
            setDesignsWarning(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else if (parseFloat(e) > parseFloat(IXDValuesSoft60) && parseFloat(e) < parseFloat(IXDValuesHard101)) {
            setDesignisError(false);
            setDesignsWarning(true);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else {
            setDesignisError(true);
            setDesignsWarning(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempDesign: StreamDetailstempDesign[0] };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
              setDesignisError(false);
              setDesignsWarning(false);
            }
          }
        } else if (Technology === "RO") {
          console.log("text change values RO ", textname, e);
        }
      } else {
        setDesignisError(true);
        setDesignsWarning(false);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const warningMessage =
            "Design Temperature Warning,The Design Temperature Value Should be Less Than or Equal to Maximum Temperature and Greater Than or Equal to Minimum Temperature. Please Revise Your Input !";
          handleShowAlert("warning", warningMessage);
          setDesignisError(false);
          setDesignsWarning(false);
          // dispatch(updateLoader(true));
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, tempMax: StreamDetailstempMax[0] };
            return i;
          });
          setStremdata(StreamDetails);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }
       
      }
    } else if (textname === "Maximum") {
      console.log("temperatureValues.",
      StreamDetailstempMin,StreamDetailstempDesign,StreamDetailstempMax ,e,Technology);

      if (
        parseFloat(e) >= parseFloat(StreamDetailstempDesign[0]) &&
        parseFloat(StreamDetailstempDesign[0]) >= parseFloat(StreamDetailstempMin[0])
      ) {
        if (Technology === "UF" || Technology === "null") {
          if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
            setMaximumisWarning(true);
            setMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          }


        else if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e) < parseFloat(UFValuesSoft41)) {
            console.log("temperatureValues1",   Technology   );
            setMaximumisWarning(false);
            setMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else if (parseFloat(e) > parseFloat(UFValuesSoft40) && parseFloat(e) < parseFloat(UFValuesHard101)) {
            console.log("temperatureValues12",   Technology   );
            setMaximumisWarning(true);
            setMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else {
            console.log("temperatureValues13",   Technology   );
            setMaximumisError(true);
            setMaximumisWarning(false);
            const warningMessage ="Maximum, Values out of range";           
          handleShowAlert("warning", warningMessage);           
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: StreamDetailstempMax[0] };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
              setMaximumisWarning(false);
              setMaximumisError(false);
            }
          }
        } else if (Technology === "IXD") {
          if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e)< parseFloat(valuessoft)) {
            setIXMaximumisWarning(true);
            setIXMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          }

        else  if (parseFloat(e) > parseFloat(valuesstart) && parseFloat(e) < parseFloat(IXDValuesSoft61)) {
            console.log("temperatureValues11",   Technology   );
            setIXMaximumisWarning(false);
            setIXMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else if (parseFloat(e) > parseFloat(IXDValuesSoft60) && parseFloat(e) < parseFloat(IXDValuesHard101)) {
            setIXMaximumisWarning(true);
            setIXMaximumisError(false);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: e };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
            }
          } else {
            setIXMaximumisError(true);
            setIXMaximumisWarning(false);
            const warningMessage ="Maximum, Values out of range";           
            handleShowAlert("warning", warningMessage);
            if (type === "TextonBlur") {
              dispatch(updateLoader(true));
              const StreamDetails = Stremdata?.map((i) => {
                i = { ...i, tempMax: StreamDetailstempMax[0] };
                return i;
              });
              setStremdata(StreamDetails);
              setTimeout(() => {
                dispatch(updateLoader(false));
              }, 5);
              setIXMaximumisWarning(false);
              setIXMaximumisError(false);
            }
          }
        } else if (Technology === "RO") {
          console.log("text change values RO ", textname, e);
        }
      } else {
        setMultiMaximumisError(true);
        setIXMaximumisError(true);
        setMaximumisError(true);
        setMultiMaximumisWarning(false);
        setIXMaximumisWarning(false);
        setMaximumisWarning(false);
        if (type === "TextonBlur") {
          dispatch(updateLoader(true));
          const warningMessage =
            "Maximum Temperature Warning,The Maximum Temperature Greater Than or Equal to Design Temperature. Please Revise Your Input. !";
          handleShowAlert("warning", warningMessage);
          const StreamDetails = Stremdata?.map((i) => {
            i = { ...i, tempMax: StreamDetailstempMax[0] };
            return i;
          });
          setStremdata(StreamDetails);
          setMultiMaximumisError(false);
          setIXMaximumisError(false);
          setMaximumisError(false);
          setMultiMaximumisWarning(false);
          setIXMaximumisWarning(false);
          setMaximumisWarning(false);
          setTimeout(() => {
            dispatch(updateLoader(false));
          }, 5);
        }       
      }
    } else if (textname === "txtArea") {     
      if (type === "TextonBlur") {
        dispatch(updateLoader(true));
        const StreamDetails = Stremdata?.map((i) => {
          i = { ...i, additionalFeedWaterInfo: e };          
          return i;
        });
        setStremdata(StreamDetails);
        setTimeout(() => {
          dispatch(updateLoader(false));
        }, 5);
      }
    }
    // FeedWaterSaveData
  };

  const inputRefB = useRef(null);
  const inputRefCO2 = useRef(null);
  const inputRefSIO = useRef(null);
  const inputRefSO4meqL = useRef(null);
  const inputRefSO4mgL = useRef(null);
  const inputRefSO4ppm = useRef(null);
  const inputRefPO4meqL = useRef(null);
  const inputRefPO4mgL = useRef(null);
  const inputRefPO4ppm = useRef(null);
  const inputRefNO3meqL = useRef(null);
  const inputRefNO3mgL = useRef(null);
  const inputRefNO3ppm = useRef(null);
  const inputRefHCO3meqL = useRef(null);
  const inputRefHCO3mgL = useRef(null);
  const inputRefHCO3ppm = useRef(null);
  const inputRefFmeqL = useRef(null);
  const inputRefFmgL = useRef(null);
  const inputRefFppm = useRef(null);
  const inputRefCO3meqL = useRef(null);
  const inputRefCO3mgL = useRef(null);
  const inputRefCO3ppm = useRef(null);
  const inputRefClmeqL = useRef(null);
  const inputRefClmgL = useRef(null);
  const inputRefClppm = useRef(null);
  const inputRefBRmeqL = useRef(null);
  const inputRefBRmgL = useRef(null);
  const inputRefBRppm = useRef(null);
  const inputRefBAmeqL = useRef(null);
  const inputRefBAmgL = useRef(null);
  const inputRefBAppm = useRef(null);
  const inputRefCAmeqL = useRef(null);
  const inputRefCAmgL = useRef(null);
  const inputRefCAppm = useRef(null);
  const inputRefNAmeqL = useRef(null);
  const inputRefNAmgL = useRef(null);
  const inputRefNAppm = useRef(null);
  const inputRefKmeqL = useRef(null);
  const inputRefKmgL = useRef(null);
  const inputRefKppm = useRef(null);
  const inputRefMGmeqL = useRef(null);
  const inputRefMGmgL = useRef(null);
  const inputRefMGppm = useRef(null);
  const inputRefNH4meqL = useRef(null);
  const inputRefNH4mgL = useRef(null);
  const inputRefNH4ppm = useRef(null);
  const inputRefSRmeqL = useRef(null);
  const inputRefSRmgL = useRef(null);
  const inputRefSRppm = useRef(null);
  const inputPH = useRef(null);

  const onCancelClick = (e, title, subtitle, name) => {
    // console.log("text cross button ...e", e);
    dispatch(updateLoader(true));
    setCancelFlag(true);
    if (e == "inputRefB") {
      inputRefB.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefCO2") {
      inputRefCO2.current.value = 0;
      onchangevalusCo2(title, subtitle, name, 0);
    } else if (e == "inputRefSIO") {
      inputRefSIO.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBAmeqL") {
      inputRefBAmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBAmgL") {
      inputRefBAmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBAppm") {
      inputRefBAppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefCAmeqL") {
      inputRefCAmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefCAmgL") {
      inputRefCAmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefCAppm") {
      inputRefCAppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNAmeqL") {
      inputRefNAmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNAmgL") {
      inputRefNAmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNAppm") {
      inputRefNAppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefKmeqL") {
      inputRefKmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefKmgL") {
      inputRefKmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefKppm") {
      inputRefKppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefMGmeqL") {
      inputRefMGmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefMGmgL") {
      inputRefMGmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefMGppm") {
      inputRefMGppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNH4meqL") {
      inputRefNH4meqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNH4mgL") {
      inputRefNH4mgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNH4ppm") {
      inputRefNH4ppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefSRmeqL") {
      inputRefSRmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefSRmgL") {
      inputRefSRmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefSRppm") {
      inputRefSRppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBRmeqL") {
      inputRefBRmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBRmgL") {
      inputRefBRmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefBRppm") {
      inputRefBRppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefClmeqL") {
      inputRefClmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefClmgL") {
      inputRefClmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefClppm") {
      inputRefClppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefCO3meqL") {
      inputRefCO3meqL.current.value = 0;
      onchangevalusCo3(title, subtitle, name, 0);
    } else if (e == "inputRefCO3mgL") {
      inputRefCO3mgL.current.value = 0;
      onchangevalusCo3(title, subtitle, name, 0);
    } else if (e == "inputRefCO3ppm") {
      inputRefCO3ppm.current.value = 0;
      onchangevalusCo3(title, subtitle, name, 0);
    } else if (e == "inputRefFmeqL") {
      inputRefFmeqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefFmgL") {
      inputRefFmgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefFppm") {
      inputRefFppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefHCO3meqL") {
      inputRefHCO3meqL.current.value = 0;
      onchangevalusHCo3(title, subtitle, name, 0);
    } else if (e == "inputRefHCO3mgL") {
      inputRefHCO3mgL.current.value = 0;
      onchangevalusHCo3(title, subtitle, name, 0);
    } else if (e == "inputRefHCO3ppm") {
      inputRefHCO3ppm.current.value = 0;
      onchangevalusHCo3(title, subtitle, name, 0);
    } else if (e == "inputRefSO4meqL") {
      inputRefSO4meqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefSO4mgL") {
      inputRefSO4mgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefSO4ppm") {
      inputRefSO4ppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefPO4meqL") {
      inputRefPO4meqL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefPO4mgL") {
      inputRefPO4mgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefPO4ppm") {
      inputRefPO4ppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNO3meqL") {
      inputRefNO3meqL.current.value = 0.0;
      onchangevalus(title, subtitle,name, 0.0);
    } else if (e == "inputRefNO3mgL") {
      inputRefNO3mgL.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputRefNO3ppm") {
      inputRefNO3ppm.current.value = 0.0;
      onchangevalus(title, subtitle, name, 0.0);
    } else if (e == "inputPH") {
      inputPH.current.value = 0.0;
      onchangevalus("inputPH", "ph", "Ph", 0);
    } else {
      console.log("inputRef");
    }
    setCancelFlag(false);
    setTimeout(() => {
      dispatch(updateLoader(false));
    }, 5);
  };
  const handleFocus = (id) => {
    setIsFocused(id);
  };  

  const handleKeyPressfeedsetup=(e, text)=>{
    if(e.key==="Enter"){
      let nextRowInput;
      if(text=="Turbidity"){
        nextRowInput = document.getElementById("TSS");
      }else if(text=="TSS"){
        nextRowInput = document.getElementById("SDI");
        if(e.target.value==""){
          textchange("TSS", e.target.value, "Text");
        }
      } else if(text=="SDI"){
        nextRowInput = document.getElementById("TOC");
      } else if(text=="TOC"){
        nextRowInput = document.getElementById("Minimum");
        if(e.target.value==""){
          textchange("TOC", e.target.value, "Text");
        }
      } else if(text=="Minimum"){
        nextRowInput = document.getElementById("Design");
      } else if(text=="Design"){
        nextRowInput = document.getElementById("Maximum");
      } else if(text=="Maximum"){
        nextRowInput = document.getElementById("PH");        
      } else if(text=="PH"){
        nextRowInput = document.getElementById("input-1-1");
      } else if(text=="neutral-3-1"){
        nextRowInput = document.getElementById("txtArea");
      }        
      else{
        nextRowInput = document.getElementById(text);
      }      
      if (nextRowInput) {        
        nextRowInput.focus(); 
        nextRowInput.select();       
      }  
    
  }
  };
  const handleKeyPress=(e, rowIndex, colIndex,type)=>{
    if(e.key==="Enter"){
      const nextRowIndex = rowIndex + 1;
      let nextRowInput;
      if(type=="a"){
        nextRowInput = document.getElementById(`anion-${nextRowIndex}-${colIndex}`);
      }else if(type=="n"){
        nextRowInput = document.getElementById(`neutral-${nextRowIndex}-${colIndex}`);
      }else{
        nextRowInput = document.getElementById(`input-${nextRowIndex}-${colIndex}`);
      } 
      if (nextRowInput) {
        nextRowInput.focus();
        nextRowInput.select();
      }
      
    }
  };
  const handleBlur = (textname, e, type) => {
    console.log("type....",type);
    setIsFocused(null);
    textchange(textname, e, type);
  };

  const handleChangee = () => {
    console.log("handleChangee");
  };
  console.log("FeedWaterDetails full data", FeedWaterDetails);
  console.log("Stremdata", Stremdata);
  return !loader ? (
    // return  (
    <>
      {Stremdata &&
        Stremdata?.map((streamValue, index) => (
          <FormEntryStyled className="form-entry-row" key={index}>
            <div className="feed-parameter-solid-content-temp-wrapper">
              <div className="form-entry-column">
                <StyledCard className="feed-parameters">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Feed Parameters"
                    />
                    <IconWithTooltip
                      label="UF & RO: Water Type and Subtype determine the design guidelines, default values, & warning limits."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="water-type">
                    <CustomLabel
                      label="Water Type"
                      mandatoryIcon={!disabeldWaterType}
                    />
                    <CustomSelect
                      name="ddwatertypeId"
                      value={waterTypeid}
                      onChange={ddwatertypeId}
                      disabled={disabeldWaterType}
                    >
                      {disabeldWaterType && <option>NA</option>}
                      {waterType?.map((data, i) => (
                        <option key={i} value={data.waterTypeId}>
                          {data.waterSource}
                        </option>
                      ))}
                      ;
                    </CustomSelect>
                  </div>
                  {/* isError={Watertypeerror} */}

                  <div className="water-sub-type">
                    <CustomLabel
                      label="Water Sub-Type"
                      mandatoryIcon={!disabeldWaterType}
                    />

                    <CustomSelect
                      name="ddwatertypeId"
                      onChange={ddSubwatertypeId}
                      value={subwaterTypeid}
                      disabled={disabeldWaterType}
                    >
                      {" "}
                      {disabeldWaterType && <option>NA</option>}
                      {subwaterType.length == 0 ? (
                        <option></option>
                      ) : (
                        subwaterType.map((data, i) => (
                          <option key={i} value={data.waterSubTypeId}>
                            {data.description}
                          </option>
                        ))
                      )}
                    </CustomSelect>
                  </div>

                  {/* <StandardPrimaryButton
                    id="condensateBtn"
                    disabled={true}
                    label="Condensate Polishing Additional Parameters"
                  /> */}
                </StyledCard>
              </div>
              <div className="form-entry-column">
                <StyledCard className="solid-content">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Suspended Solids Content"
                    />
                    <IconWithTooltip
                      label="Turbidity, TSS, TOC for UF; SDI15 for RO Water Subtype choice. IX uses TSS and TOC for warnings."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div className="turbidity">
                      <CustomLabel label="Turbidity"  />
                      <InputWithText
                      onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Turbidity")}
                         id="Turbidity"
                        type="number"
                        className="turbidity-input"
                        disabled={false}
                        isError={TurbidityUFIXisError}
                        isWarning={TurbidityUFIXisWarning}
                        defaultValue={Number.parseFloat(
                          streamValue.turbidity
                        ).toFixed(2)}
                        onWheel={(e)=>e.target.blur()}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        onChange={(e) =>
                          textchange("Turbidity", e.target.value, "Text")
                        }
                        inputText="NTU"
                        onBlur={(e) =>
                          handleBlur("Turbidity", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(1)}
                        isFocused={isFocused === 1}
                      />
                      {/* <InputReferenceText refText="Ranges from 	Soft(0–300) Hard(0-1000)" /> */}
                      {TurbidityUFIXisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : TurbidityUFIXisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-1000)" />
                      ) : (
                        <InputReferenceText refText="Ranges from  Soft(0–300) Hard(0-1000)" />
                      )}
                    </div>
                    <div className=" tss">
                      <CustomLabel label="TSS" />
                      <InputWithText
                      onKeyPress={(e)=>handleKeyPressfeedsetup(e,"TSS")}                      
                        id="TSS"
                        disabled={false}
                        isError={TSSUFIXisError}
                        isWarning={TSSUFIXisWarning}
                        inputText="mg/L"
                        type="number"
                        onWheel={(e)=>e.target.blur()}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        defaultValue={Number.parseFloat(
                          streamValue.tss
                        ).toFixed(2)}
                        onChange={(e) =>
                          textchange("TSS", e.target.value, "Text")
                        }
                        onBlur={(e) =>
                          handleBlur("TSS", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(2)}
                        isFocused={isFocused === 2}
                      />
                      {/* <InputReferenceText refText="Ranges from 	Soft(0–100) Hard(0-1000)" /> */}
                      {TSSUFIXisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : TSSUFIXisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-1000)" />
                      ) : (
                        <InputReferenceText refText="Ranges from  Soft(0–100) Hard(0-1000)" />
                      )}
                    </div>
                  </div>
                  <div className="sdi">
                    <CustomLabel label="SDI₁₅" />
                    {/* className="sdi-input" */}
                    <InputWithText
                    onKeyPress={(e)=>handleKeyPressfeedsetup(e,"SDI")}                      
                    id="SDI"
                      disabled={false}
                      isError={SDIUFIXisError}
                      isWarning={SDIUFIXisWarning}
                      type="number"
                      inputText="mg/L"
                      onWheel={(e)=>e.target.blur()}
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      defaultValue={Number.parseFloat(streamValue.sdi).toFixed(
                        2
                      )}
                      onChange={(e) =>
                        textchange("SDI", e.target.value, "Text")
                      }
                      onBlur={(e) =>
                        handleBlur("SDI", e.target.value, "TextonBlur")
                      }
                      onFocus={() => handleFocus(3)}
                      isFocused={isFocused === 3}
                    />
                    {/* <InputReferenceText refText="Ranges from Soft(0-6.6) Hard(0-20)" /> */}
                    {SDIUFIXisError ? (
                      <ErrorMessage texMsg="Values out of range" />
                    ) : SDIUFIXisWarning ? (
                      <WarningMessage txtMsg="Warning Ranges Hard(0-20)" />
                    ) : (
                      <InputReferenceText refText="Ranges from Soft(0-6.6) Hard(0-20)" />
                    )}
                  </div>
                </StyledCard>
                <StyledCard className="organic-content">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Organic Content"
                    />
                    <IconWithTooltip
                      label="Concentration of Natural Organic Matter in the water, removed by some IX and used for warnings."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="">                  
                    {unit.selectedUnits[19]==="mg/L KMnO₄"?
                    <CustomLabel label={"Organics (COD as KMnO₄)"} /> 
                    :<CustomLabel label="Organics (TOC)" />
                    }
                                      
                    <InputWithText
                    onKeyPress={(e)=>handleKeyPressfeedsetup(e,"TOC")}                      
                    id="TOC"
                      disabled={false}
                      isError={TOCUFIXisError}
                      isWarning={TOCUFIXisWarning}
                      type="number"
                      inputText="mg/L"
                      onWheel={(e)=>e.target.blur()}
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      defaultValue={Number.parseFloat(streamValue.toc).toFixed(
                        2
                      )}
                      onChange={(e) =>
                        textchange("TOC", e.target.value, "Text")
                      }
                      onBlur={(e) =>
                        handleBlur("TOC", e.target.value, "TextonBlur")
                      }
                      onFocus={() => handleFocus(4)}
                      isFocused={isFocused === 4}
                    />
                    {/* <InputReferenceText refText="Ranges from Soft(0-40) Hard(0-100)" /> */}
                    {TOCUFIXisError ? (
                      <ErrorMessage texMsg="Values out of range" />
                    ) : TOCUFIXisWarning ?                     
                      unit.selectedUnits[19]==="mg/L KMnO₄"?
                      <WarningMessage txtMsg="Warning Ranges Hard(0-500)" />
                      : <WarningMessage txtMsg="Warning Ranges Hard(0-40)" />   
                     : 
                      unit.selectedUnits[19]==="mg/L KMnO₄"?
                      <InputReferenceText refText="Ranges from Soft(0-200) Hard(0-500)" />
                      : <InputReferenceText refText="Ranges from Soft(0-40) Hard(0-100)" />                 
                     
                    }
                  </div>
                </StyledCard>
              </div>
              <div className="form-entry-column temp_ph_wrapper">
                <StyledCard className="temperature">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Temperature"
                      mandatoryIcon={true}
                    />
                    <IconWithTooltip
                      label="Min ≤ Design ≤ Max Temperature. Calculation done at Design, some warnings based on min & max."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div>
                      <CustomLabel label="Minimum" />
                      {Technology === "UF" || Technology === "null"? (
                        <>
                          <InputWithText
                           onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Minimum")}                      
                           id="Minimum"
                            disabled={false}
                            isError={MinimumisError}
                            isWarning={MinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                          {unit.selectedUnits[2]==="°C"?
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                          }
                          
                        </>
                      ) : Technology === "IXD" ? (
                        <>
                          <InputWithText
                          onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Minimum")}                      
                          id="Minimum"
                            disabled={false}
                            isError={IXMinimumisError}
                            isWarning={IXMinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                        
                          {unit.selectedUnits[2]==="°C"?
                            <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-140) Hard(0-213.8)" />
                          }
                        </>
                      ) : (
                        <>
                          <InputWithText
                          onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Minimum")}                      
                          id="Minimum"
                            disabled={false}
                            isError={MultiMinimumisError}
                            isWarning={MultiMinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                             {unit.selectedUnits[2]==="°C"?
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                          }
                        </>
                      )}
                    </div>
                    <div>
                      <CustomLabel label="Design" />
                      <InputWithText
                      onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Design")}                      
                      id="Design"
                        disabled={false}
                        isError={DesignisError}
                        isWarning={DesignsWarning}
                        type="number"
                        inputText={unit.selectedUnits[2]}
                        onWheel={(e)=>e.target.blur()}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        defaultValue={Number.parseFloat(
                          streamValue.tempDesign
                        ).toFixed(1)}
                        onChange={(e) =>
                          textchange("Design", e.target.value, "Text")
                        }
                        onBlur={(e) =>
                          handleBlur("Design", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(6)}
                        isFocused={isFocused === 6}
                      />
                      {Technology === "UF" ? (
                           unit.selectedUnits[2]==="°C"?
                           <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                           <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                           
                      ) : Technology === "IXD" ? (
                        unit.selectedUnits[2]==="°C"?
                        <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />:
                        <InputReferenceText refText="Ranges from Soft(33.8-140) Hard(0-213.8)" />
                        
                      ) : (
                        // <InputReferenceText refText="Ranges from Soft(0-45) Hard(0-100)" />
                        unit.selectedUnits[2]==="°C"?
                        <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                        <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                        
                      )}
                    </div>
                    <div>
                      <CustomLabel label="Maximum" />
                      {Technology === "UF" || Technology === "null"? (
                        <>
                          <InputWithText
                           onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Maximum")}                      
                           id="Maximum"
                            disabled={false}
                            isError={MaximumisError}
                            isWarning={MaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            type="number"
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                             {unit.selectedUnits[2]==="°C"?
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                          }
                        </>
                      ) : Technology === "IXD" ? (
                        <>
                          <InputWithText
                          onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Maximum")}                      
                          id="Maximum"
                            disabled={false}
                            isError={IXMaximumisError}
                            isWarning={IXMaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            type="number"
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                             {unit.selectedUnits[2]==="°C"?
                          <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-140) Hard(0-213.8)" />
                          }
                        </>
                      ) : (
                        <>
                          <InputWithText
                          onKeyPress={(e)=>handleKeyPressfeedsetup(e,"Maximum")}                      
                          id="Maximum"
                            disabled={false}
                            isError={MultiMaximumisError}
                            isWarning={MultiMaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            type="number"
                            onWheel={(e)=>e.target.blur()}
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            defaultValue={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                             {unit.selectedUnits[2]==="°C"?
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />:
                          <InputReferenceText refText="Ranges from Soft(33.8-104) Hard(0-213.8)" />
                          }
                        </>
                      )}
                    </div>
                  </div>
                </StyledCard>
                <StyledCard className="ph">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="pH"
                      mandatoryIcon={true}
                    />
                    <IconWithTooltip
                      label="pH at both the Design Temp. & 25 °C; differ because of temperature dependent acid/base equilibria."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div>
                      <CustomLabel
                        mandatoryIcon={true}
                        label={
                          "pH @" +
                          Number.parseFloat(streamValue.tempDesign).toFixed(1) +
                          unit.selectedUnits[2]
                        }
                      />
                      {/* <InputWithIcon disabled={false} isError={PHisError} isWarning={PHisWarning} inputText={<CloseCircleGreenIcon />} unitBgColor="transparent"
                      id="" type="number" defaultValue={Number.parseFloat(streamValue.ph).toFixed(2)} onChange={(e) => textchange("PH", e.target.value, "Text")}
                      onBlur={(e) => handleBlur("PH", e.target.value, "TextonBlur")} onFocus={() => handleFocus(8)} isFocused={isFocused === 8}
                    /> */}
                      <CustomInputGroup
                        isFocused={isFocused === 20}
                        disabled={false}
                        isError={PHisError}
                        isWarning={PHisWarning}
                        onKeyPress={(e)=>handleKeyPressfeedsetup(e,"PH")}
                      >
                        <Form.Control
                          id="PH"
                          type="number"
                          ref={inputPH}
                          onWheel={(e)=>e.target.blur()}
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          defaultValue={Number.parseFloat(
                            FeedWaterDetails[0].ph
                          ).toFixed(2)}
                          onChange={(e) =>
                            textchange("PH", e.target.value, "Text")
                          }
                          onBlur={(e) =>
                            handleBlur("PH", e.target.value, "TextonBlur")
                          }
                          onFocus={() => handleFocus(20)}
                          isFocused={isFocused === 20}
                          disabled={false}
                        />
                        <InputGroup.Text
                          onClick={(e) =>
                            onCancelClick("inputPH", "cations", "mgL", "x")
                          }
                        >
                          {" "}
                          <CloseCircleGreenIcon />
                        </InputGroup.Text>
                      </CustomInputGroup>
                      {PHisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : PHisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-14)" />
                      ) : (
                        <InputReferenceText refText="Ranges from Soft(0.1-13.9) Hard(0-14)" />
                      )}
                    </div>
                    <div>
                      <CustomLabel 
                      // label={"pH @25.0"+unit.selectedUnits[2]} 
                      label={
                        "pH @" +
                        Number.parseFloat(streamValue.tempDesign).toFixed(1) +
                        unit.selectedUnits[2]
                      }
                      />
                      <CalcEngInputWithIcon
                      onKeyPress={(e)=>handleKeyPressfeedsetup(e,"PH25")}                      
                      id="PH25"
                        isAutoPopulated={true}
                        disabled={true}
                        isError={false}
                        type="text"
                        value={Number.parseFloat(
                          FeedWaterDetails[0].ph25
                        ).toFixed(2)}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(9)}
                        isFocused={isFocused === 9}
                      />
                    </div>
                  </div>
                </StyledCard>
              </div>
            </div>
            <div className="cation-anion-neutral-wrapper">
              <StyledCard className="cations-card">
                <div className="cations-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Cations"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Cation conc. in mg/L as ion, ppm as CaCO3, or meq/L; automatically convert between these units."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="cations-table">
                  <thead className="table-header">
                    <tr className="header-row">
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="ppm CaCO₃"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="meq/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((cationsValue, index) => (
                        <>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "NH₄")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 22}
                                        isWarning={false}
                                        isError={false}
                                        onKeyPress={(e)=>handleKeyPress(e,1,1)}
                                      >
                                        <Form.Control
                                          id="input-1-1"
                                          type="number"
                                          ref={inputRefNH4mgL}
                                          name="name"
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(22)}
                                          isFocused={isFocused === 22}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4mgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 23}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,1,2)}
                                      >
                                        <Form.Control
                                          id="input-1-2"
                                          type="number"
                                          ref={inputRefNH4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(23)}
                                          isFocused={isFocused === 23}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4ppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                  
                                      <CustomInputGroup
                                        isFocused={isFocused === 24}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,1,3)}
                                      >
                                        <Form.Control
                                        id="input-1-3"
                                          type="number"
                                          ref={inputRefNH4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(24)}
                                          isFocused={isFocused === 24}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4meqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>

                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Na")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 25}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,2,1)}
                                      >
                                        <Form.Control
                                          id="input-2-1"
                                          type="number"
                                          ref={inputRefNAmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(25)}
                                          isFocused={isFocused === 25}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 26}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,2,2)}
                                      >
                                        <Form.Control
                                          id="input-2-2"
                                          type="number"
                                          ref={inputRefNAppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(26)}
                                          isFocused={isFocused === 26}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 27}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,2,3)}
                                      >
                                        <Form.Control
                                          id="input-2-3"
                                          type="number"
                                          ref={inputRefNAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(27)}
                                          isFocused={isFocused === 27}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "K")
                                .map((item) => (
                                  <>
                                    <td>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 28}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,1)}
                                      >
                                        <Form.Control
                                          id="input-3-1"
                                          type="number"
                                          ref={inputRefKmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(28)}
                                          isFocused={isFocused === 28}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 29}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,2)}
                                      >
                                        <Form.Control
                                          id="input-3-2"
                                          type="number"
                                          ref={inputRefKppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(29)}
                                          isFocused={isFocused === 29}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 30}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,3)}
                                      >
                                        <Form.Control
                                          id="input-3-3"
                                          type="number"
                                          ref={inputRefKmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(30)}
                                          isFocused={isFocused === 30}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Mg")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 31}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,1)}
                                      >
                                        <Form.Control
                                          id="input-4-1"
                                          type="number"
                                          ref={inputRefMGmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(31)}
                                          isFocused={isFocused === 31}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 32}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,2)}
                                      >
                                        <Form.Control
                                          id="input-4-2"
                                          type="number"
                                          ref={inputRefMGppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(32)}
                                          isFocused={isFocused === 32}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 33}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,3)}
                                      >
                                        <Form.Control
                                          id="input-4-3"
                                          type="number"
                                          ref={inputRefMGmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(33)}
                                          isFocused={isFocused === 33}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Ca")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 34}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,1)}
                                      >
                                        <Form.Control
                                          id="input-5-1"
                                          type="number"
                                          ref={inputRefCAmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(34)}
                                          isFocused={isFocused === 34}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 35}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,2)}
                                      >
                                        <Form.Control
                                          id="input-5-2"
                                          type="number"
                                          ref={inputRefCAppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(35)}
                                          isFocused={isFocused === 35}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 36}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,3)}
                                      >
                                        <Form.Control
                                          id="input-5-3"
                                          type="number"
                                          ref={inputRefCAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(36)}
                                          isFocused={isFocused === 36}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>

                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Sr")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 37}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,1)}
                                      >
                                        <Form.Control
                                          id="input-6-1"
                                          type="number"
                                          ref={inputRefSRmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(37)}
                                          isFocused={isFocused === 37}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 38}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,2)}
                                      >
                                        <Form.Control
                                          id="input-6-2"
                                          type="number"
                                          ref={inputRefSRppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(38)}
                                          isFocused={isFocused === 38}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 39}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,3)}
                                      >
                                        <Form.Control
                                          id="input-6-3"
                                          type="number"
                                          ref={inputRefSRmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(39)}
                                          isFocused={isFocused === 39}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Ba")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        key={index}
                                        label={item.name}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 40}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,1)}
                                      >
                                        <Form.Control
                                          id="input-7-1"
                                          type="number"
                                          ref={inputRefBAmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(40)}
                                          isFocused={isFocused === 40}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 41}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,2)}
                                      >
                                        <Form.Control
                                          id="input-7-2"
                                          type="number"
                                          ref={inputRefBAppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(41)}
                                          isFocused={isFocused === 41}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 42}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,3)}
                                      >
                                        <Form.Control
                                          id="input-7-3"
                                          type="number"
                                          ref={inputRefBAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(42)}
                                          isFocused={isFocused === 42}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((u) => (
                        <tr key="">
                          <th>
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.CationsMql).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.Cationsppm).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.CationsMeql).toFixed(
                                3
                              )}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>

              <StyledCard className="anions-card">
                <div className="anions-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Anions"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Anion conc. in mg/L as ion, ppm as CaCO3, or meq/L; automatically convert between these units."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="anions-table">
                  <thead className="">
                    <tr>
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="ppm CaCO₃"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="meq/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((anionsValue, index) => (
                        <>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "CO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 42}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,1,1,"a")}
                                      >
                                        <Form.Control
                                          id="anion-1-1"
                                          type="number"
                                          ref={inputRefCO3mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(42)}
                                          isFocused={isFocused === 42}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 43}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,1,2,"a")}
                                      >
                                        <Form.Control
                                          id="anion-1-2"
                                          type="number"
                                          ref={inputRefCO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(43)}
                                          isFocused={isFocused === 43}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 245}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,1,3,"a")}
                                        >
                                          <Form.Control
                                            id="anion-1-3"
                                          type="number"
                                          ref={inputRefCO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(245)}
                                          isFocused={isFocused === 245}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "HCO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 246}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,2,1,"a")}
                                        >
                                          <Form.Control
                                            id="anion-2-1"
                                          type="number"
                                          ref={inputRefHCO3mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(246)}
                                          isFocused={isFocused === 246}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 247}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,2,2,"a")}
                                        >
                                          <Form.Control
                                            id="anion-2-2"
                                          type="number"
                                          ref={inputRefHCO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(247)}
                                          isFocused={isFocused === 247}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 248}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                        onKeyPress={(e)=>handleKeyPress(e,2,3,"a")}
                                        >
                                          <Form.Control
                                            id="anion-2-3"
                                          type="number"
                                          ref={inputRefHCO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(248)}
                                          isFocused={isFocused === 248}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "NO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 249}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-3-1"
                                          type="number"
                                          ref={inputRefNO3mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(249)}
                                          isFocused={isFocused === 249}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 50}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-3-2"
                                          type="number"
                                          ref={inputRefNO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(50)}
                                          isFocused={isFocused === 50}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 51}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,3,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-3-3"
                                          type="number"
                                          ref={inputRefNO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(51)}
                                          isFocused={isFocused === 51}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "F")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 52}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-4-1"
                                          type="number"
                                          ref={inputRefFmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(52)}
                                          isFocused={isFocused === 52}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 53}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-4-2"
                                          type="number"
                                          ref={inputRefFppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(53)}
                                          isFocused={isFocused === 53}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 54}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,4,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-4-3"
                                          type="number"
                                          ref={inputRefFmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(54)}
                                          isFocused={isFocused === 54}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "Cl")
                                .map((item) => (
                                  <>
                                    <td className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 55}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-5-1"
                                          type="number"
                                          ref={inputRefClmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(55)}
                                          isFocused={isFocused === 55}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 56}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-5-2"
                                          type="number"
                                          ref={inputRefClppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(56)}
                                          isFocused={isFocused === 56}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 57}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,5,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-5-3"
                                          type="number"
                                          ref={inputRefClmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(57)}
                                          isFocused={isFocused === 57}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "Br")
                                .map((item) => (
                                  <>
                                    <td className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 58}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-6-1"
                                          type="number"
                                          ref={inputRefBRmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(58)}
                                          isFocused={isFocused === 58}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 59}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-6-2"
                                          type="number"
                                          ref={inputRefBRppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(59)}
                                          isFocused={isFocused === 59}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 60}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,6,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-6-3"
                                          type="number"
                                          ref={inputRefBRmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(60)}
                                          isFocused={isFocused === 60}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "SO₄")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 61}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-7-1"
                                          type="number"
                                          ref={inputRefSO4mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(61)}
                                          isFocused={isFocused === 61}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 62}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-7-2"
                                          type="number"
                                          ref={inputRefSO4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(62)}
                                          isFocused={isFocused === 62}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 63}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,7,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-7-3"
                                          type="number"
                                          ref={inputRefSO4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(63)}
                                          isFocused={isFocused === 63}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "PO₄")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 64}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,8,1,"a")}
                                        >
                                        <Form.Control
                                          id="anion-8-1"
                                          type="number"
                                          ref={inputRefPO4mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(64)}
                                          isFocused={isFocused === 64}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 65}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,8,2,"a")}
                                        >
                                        <Form.Control
                                          id="anion-8-2"
                                          type="number"
                                          ref={inputRefPO4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(65)}
                                          isFocused={isFocused === 65}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 66}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                        onKeyPress={(e)=>handleKeyPress(e,8,3,"a")}
                                        >
                                        <Form.Control
                                          id="anion-8-3"
                                          type="number"
                                          ref={inputRefPO4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          defaultValue={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(66)}
                                          isFocused={isFocused === 66}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((anionsValue) => (
                        <tr key="">
                          <th className="anions-title">
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.AnionsMql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.Anionsppm
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.AnionsMeql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>

              <StyledCard className="neutral-card">
                <div className="neutrals-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Neutrals"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Neutral concentration in mg/L."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="neutral-table">
                  <thead>
                    <tr>
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((neutralsValue, index) => (
                        <>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "SiO₂")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    {/* <InputGroup> */}
                                    {/* <InputWithIcon type="number" ref={inputRefSIO} defaultValue={Number.parseFloat(item.mgL).toFixed(3)} 
                        onBlur={(e) => onchangevalus("neutrals", "mgL", item.name, e.target.value)} 
                        onClick={(e) => onCancelClick("inputRefSIO", "neutrals", "mgL", item.name)}
                        unitBgColor="transparent" inputText={<CloseCircleGreenIcon/>}
                        onFocus={()=>handleFocus(52)} isFocused={isFocused===52}
                      /> */}
                                    {/* <InputGroup.Text id="basic-addon2" onClick={(e) => onCancelClick("inputRefSIO", "neutrals", "mgL", item.name)}> <CloseIcon /></InputGroup.Text>
                      </InputGroup> */}
                                    <CustomInputGroup
                                      isFocused={isFocused === 67}
                                      isWarning={false}
                                      isError={false}
                                      disabled={false}
                                      onKeyPress={(e)=>handleKeyPress(e,1,1,"n")}
                                      >
                                      <Form.Control
                                        id="neutral-1-1"
                                        type="number"
                                        ref={inputRefSIO}
                                        onWheel={(e)=>e.target.blur()}
                                        defaultValue={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalus(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(67)}
                                        isFocused={isFocused === 67}
                                        disabled={false}
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefSIO",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "B")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    <CustomInputGroup
                                      isFocused={isFocused === 68}
                                      isWarning={false}
                                      isError={false}
                                      disabled={false}
                                      onKeyPress={(e)=>handleKeyPress(e,2,1,"n")}
                                      >
                                      <Form.Control
                                        id="neutral-2-1"
                                        type="number"
                                        ref={inputRefB}
                                        onWheel={(e)=>e.target.blur()}
                                        defaultValue={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalus(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(68)}
                                        isFocused={isFocused === 68}
                                        disabled={false}
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefB",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "CO₂")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    <CustomInputGroup
                                      isFocused={isFocused === 69}
                                      isWarning={false}
                                      isError={false}
                                      disabled={
                                        FeedWaterDetails[0].ph > 9
                                          ? true
                                          : false
                                      }
                                      // onKeyPress={(e)=>handleKeyPress(e,3,1,"n")}
                                      onKeyPress={(e)=>handleKeyPressfeedsetup(e,"neutral-3-1")}
                                      >
                                      <Form.Control
                                        id="neutral-3-1"
                                        type="number"
                                        ref={inputRefCO2}
                                        onWheel={(e)=>e.target.blur()}
                                        defaultValue={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalusCo2(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(69)}
                                        isFocused={isFocused === 69}
                                        disabled={
                                          FeedWaterDetails[0].ph > 9
                                            ? true
                                            : false
                                        }
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefCO2",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>

                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="neutrals-title-footer">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((neutralsValue) => (
                        <tr key="">
                          <th className="neutrals-title">
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="neutrals-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                neutralsValue.neutralsMql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>
            </div>

            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="summarized-feed-setup-column"
            >
              <Card className="summarized-feed-setup-card">
                <div className="form-heading">
                  <h4>Summarized Feed Setup Values</h4>
                </div>
                <>
                  {" "}
                  <div className="card-body-wrapper">
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((summarizedData, index) => (
                        <>
                          <Card.Body key={index}>
                            {Technology === "UF" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solids:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolids
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                              </>
                            ) : Technology === "IXD" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                                {TotalppmCaCO3 &&
                                  TotalppmCaCO3?.map((u, index) => (
                                    <Card.Text key={index}>
                                      Total ppm CaCO₃:{" "}
                                      {Number.parseFloat(u).toFixed(3)}
                                    </Card.Text>
                                  ))}
                              </>
                            ) : Technology === "Multiple" ? (
                              <>
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                                <Card.Text>
                                  Total Dissolved Solids:{" "}
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolids
                                  ).toFixed(3)}{" "}
                                  mg/L (Not for Ix)
                                </Card.Text>
                                {TotalppmCaCO3 &&
                                  TotalppmCaCO3?.map((u, index) => (
                                    <Card.Text key={index}>
                                      Total ppm CaCO₃:{" "}
                                      {Number.parseFloat(u).toFixed(3)}
                                    </Card.Text>
                                  ))}
                              </>
                            ) : Technology === "null" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                              </>
                            ) : (
                              ""
                            )}
                          </Card.Body>
                          <Card.Body className="center-card-body">
                            <Card.Text>
                              Charge Balance:{" "}
                              {Number.parseFloat(
                                summarizedData.chargeBalance
                              ).toFixed(6)}{" "}
                              meq/L{" "}
                            </Card.Text>
                          </Card.Body>
                          <Card.Body className="right-card-body">
                            <Card.Text>
                              Estimated Conductivity:
                              {Number.parseFloat(
                                summarizedData.estimatedConductivity
                              ).toFixed(2)}{" "}
                              {unit.selectedUnits[17]}
                            </Card.Text>
                          </Card.Body>
                        </>
                      ))}
                  </div>{" "}
                </>
                {/* {streamValue.estimatedConductivity} {Number.parseFloat(summarizedData.chargeBalance).toFixed(6)} , {(streamValue.estimatedConductivity).toFixed(2)} */}
              </Card>
            </Col>
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="additional-feed-water-information-column"
            >
              <Card
                className="additional-feed-water-information-card"
              >
                <div className="form-heading">
                  <h4>Additional Feed Water Information</h4>
                  <IconWithTooltip
                    label="Miscellaneous information not used for the computations, but included in the report."
                    icon={<InfoIcon />}
                  />
                </div>
                <CustomTextArea
                  rows={4}
                  type="textarea"
                  id="txtArea"
                  defaultValue={streamValue.additionalFeedWaterInfo}
                  className="additional_feed_setup_info"
                  placeholder="Additional Feed Water Information"
                  onChange={(e) => textchange("txtArea", e.target.value)}
                  onBlur={(e) =>
                    handleBlur("txtArea", e.target.value, "TextonBlur")
                  }
                />
                {/* <Form.Text>Ranges XXX-YYY</Form.Text> additionalFeedWaterInfo */}
              </Card>
            </Col>
          </FormEntryStyled>
        ))}
      {showAlert ? (
        <AlertPopUp
          type={alertData?.type}
          message={alertData?.message}
          close={handleHideAlert}
        />
      ) : null}
    </>
  ) 
  : (    
    <>
      {Stremdata &&
        Stremdata?.map((streamValue, index) => (
          <FormEntryStyled className="form-entry-row" key={index}>
            <div className="feed-parameter-solid-content-temp-wrapper">
              <div className="form-entry-column">
                <StyledCard className="feed-parameters">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Feed Parameters"
                    />
                    <IconWithTooltip
                      label="UF & RO: Water Type and Subtype determine the design guidelines, default values, & warning limits."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="water-type">
                    <CustomLabel
                      label="Water Type"
                      mandatoryIcon={!disabeldWaterType}
                    />
                    <CustomSelect
                      name="ddwatertypeId"
                      onChange={ddwatertypeId}
                      value={waterTypeid}
                      disabled={disabeldWaterType}
                    >
                      {disabeldWaterType && <option>NA</option>}
                      {waterType?.map((data, i) => (
                        <option key={i} value={data.waterTypeId}>
                          {data.waterSource}
                        </option>
                      ))}
                      ;
                    </CustomSelect>
                  </div>
                  {/* isError={Watertypeerror} */}
                  <div className="water-sub-type">
                    <CustomLabel
                      label="Water Sub-Type"
                      mandatoryIcon={!disabeldWaterType}
                    />

                    <CustomSelect
                      name="ddwatertypeId"
                      onChange={ddSubwatertypeId}
                      value={subwaterTypeid}
                      disabled={disabeldWaterType}
                    >
                      {disabeldWaterType && <option>NA</option>}
                      {subwaterType.length == 0 ? (
                        <option></option>
                      ) : (
                        subwaterType.map((data, i) => (
                          <option key={i} value={data.waterSubTypeId}>
                            {data.description}
                          </option>
                        ))
                      )}
                    </CustomSelect>
                  </div>

                  {/* <StandardPrimaryButton
                    id="condensateBtn"
                    disabled={true}
                    label="Condensate Polishing Additional Parameters"
                  /> */}
                </StyledCard>
              </div>
              <div className="form-entry-column">
                <StyledCard className="solid-content">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Suspended Solids Content"
                    />
                    <IconWithTooltip
                      label="Turbidity, TSS, TOC for UF; SDI15 for RO Water Subtype choice. IX uses TSS and TOC for warnings."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div className="turbidity">
                      <CustomLabel label="Turbidity" />
                      <InputWithText
                        type="number"
                        className="turbidity-input"
                        disabled={false}
                        isError={TurbidityUFIXisError}
                        isWarning={TurbidityUFIXisWarning}
                        onWheel={(e)=>e.target.blur()}
                        value={Number.parseFloat(streamValue.turbidity).toFixed(
                          2
                        )}
                        onChange={(e) =>
                          textchange("Turbidity", e.target.value, "Text")
                        }
                        inputText="NTU"
                        onBlur={(e) =>
                          handleBlur("Turbidity", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(1)}
                        isFocused={isFocused === 1}
                      />
                      {/* <InputReferenceText refText="Ranges from 	Soft(0–300) Hard(0-1000)" /> */}
                      {TurbidityUFIXisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : TurbidityUFIXisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-1000)" />
                      ) : (
                        <InputReferenceText refText="Ranges from  Soft(0–300) Hard(0-1000)" />
                      )}
                    </div>
                    <div className=" tss">
                      <CustomLabel label="TSS" />
                      <InputWithText
                        disabled={false}
                        isError={TSSUFIXisError}
                        isWarning={TSSUFIXisWarning}
                        inputText="mg/L"
                        type="number"
                        onWheel={(e)=>e.target.blur()}
                        value={Number.parseFloat(streamValue.tss).toFixed(2)}
                        onChange={(e) =>
                          textchange("TSS", e.target.value, "Text")
                        }
                        onBlur={(e) =>
                          handleBlur("TSS", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(2)}
                        isFocused={isFocused === 2}
                      />
                      {/* <InputReferenceText refText="Ranges from 	Soft(0–100) Hard(0-1000)" /> */}
                      {TSSUFIXisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : TSSUFIXisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-1000)" />
                      ) : (
                        <InputReferenceText refText="Ranges from  Soft(0–100) Hard(0-1000)" />
                      )}
                    </div>
                  </div>
                  <div className="sdi">
                    <CustomLabel label="SDI₁₅" />
                    {/* className="sdi-input" */}
                    <InputWithText
                      disabled={false}
                      isError={SDIUFIXisError}
                      isWarning={SDIUFIXisWarning}
                      type="number"
                      inputText="mg/L"
                      // value={streamValue.sdi}
                      onWheel={(e)=>e.target.blur()}
                      value={Number.parseFloat(streamValue.sdi).toFixed(2)}
                      onChange={(e) =>
                        textchange("SDI", e.target.value, "Text")
                      }
                      onBlur={(e) =>
                        handleBlur("SDI", e.target.value, "TextonBlur")
                      }
                      onFocus={() => handleFocus(3)}
                      isFocused={isFocused === 3}
                    />
                    {/* <InputReferenceText refText="Ranges from Soft(0-6.6) Hard(0-20)" /> */}
                    {SDIUFIXisError ? (
                      <ErrorMessage texMsg="Values out of range" />
                    ) : SDIUFIXisWarning ? (
                      <WarningMessage txtMsg="Warning Ranges Hard(0-20)" />
                    ) : (
                      <InputReferenceText refText="Ranges from Soft(0-6.6) Hard(0-20)" />
                    )}
                  </div>
                </StyledCard>
                <StyledCard className="organic-content">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Organic Content"
                    />
                    <IconWithTooltip
                      label="Concentration of Natural Organic Matter in the water, removed by some IX and used for warnings."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="">                   
                    {unit.selectedUnits[19]==="mg/L KMnO₄"?
                    <CustomLabel label={"Organics (COD as KMnO₄)"} /> 
                    :<CustomLabel label="Organics (TOC)" />
                    }
                    <InputWithText
                      disabled={false}
                      isError={TOCUFIXisError}
                      isWarning={TOCUFIXisWarning}
                      type="number"
                      inputText="mg/L"
                      onWheel={(e)=>e.target.blur()}
                      value={Number.parseFloat(streamValue.toc).toFixed(2)}
                      onChange={(e) =>
                        textchange("TOC", e.target.value, "Text")
                      }
                      onBlur={(e) =>
                        handleBlur("TOC", e.target.value, "TextonBlur")
                      }
                      onFocus={() => handleFocus(4)}
                      isFocused={isFocused === 4}
                    />
                    {/* <InputReferenceText refText="Ranges from Soft(0-40) Hard(0-100)" /> */}
                    {TOCUFIXisError ? (
                      <ErrorMessage texMsg="Values out of range" />
                    ) : TOCUFIXisWarning ?                     
                      unit.selectedUnits[19]==="mg/L KMnO₄"?
                      <WarningMessage txtMsg="Warning Ranges Hard(0-500)" />
                      : <WarningMessage txtMsg="Warning Ranges Hard(0-40)" />   
                     : 
                      unit.selectedUnits[19]==="mg/L KMnO₄"?
                      <InputReferenceText refText="Ranges from Soft(0-200) Hard(0-500)" />
                      : <InputReferenceText refText="Ranges from Soft(0-40) Hard(0-100)" />                 
                     
                    }
                  </div>
                </StyledCard>
              </div>
              <div className="form-entry-column temp_ph_wrapper">
                <StyledCard className="temperature">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="Temperature"
                      mandatoryIcon={true}
                    />
                    <IconWithTooltip
                      label="Min ≤ Design ≤ Max Temperature. Calculation done at Design, some warnings based on min & max."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div>
                      <CustomLabel label="Minimum" />
                      {Technology === "UF" || Technology === "null"? (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={MinimumisError}
                            isWarning={MinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            value={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />
                        </>
                      ) : Technology === "IXD" ? (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={IXMinimumisError}
                            isWarning={IXMinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            value={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />
                        </>
                      ) : (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={MultiMinimumisError}
                            isWarning={MultiMinimumisWarning}
                            type="number"
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            value={Number.parseFloat(
                              streamValue.tempMin
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Minimum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Minimum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(5)}
                            isFocused={isFocused === 5}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />
                        </>
                      )}
                    </div>
                    <div>
                      <CustomLabel label="Design" />
                      <InputWithText
                        disabled={false}
                        isError={DesignisError}
                        isWarning={DesignsWarning}
                        type="number"
                        inputText={unit.selectedUnits[2]}
                        value={Number.parseFloat(
                          streamValue.tempDesign
                        ).toFixed(1)}
                        onChange={(e) =>
                          textchange("Design", e.target.value, "Text")
                        }
                        onBlur={(e) =>
                          handleBlur("Design", e.target.value, "TextonBlur")
                        }
                        onFocus={() => handleFocus(6)}
                        isFocused={isFocused === 6}
                      />
                      {Technology === "UF" ? (
                        <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />
                      ) : Technology === "IXD" ? (
                        <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />
                      ) : (
                        <InputReferenceText refText="Ranges from Soft(0-45) Hard(0-100)" />
                      )}
                    </div>
                    <div>
                      <CustomLabel label="Maximum" />
                      {Technology === "UF" || Technology === "null"? (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={MaximumisError}
                            isWarning={MaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            type="number"
                            value={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-40) Hard(0-100)" />
                        </>
                      ) : Technology === "IXD" ? (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={IXMaximumisError}
                            isWarning={IXMaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            onWheel={(e)=>e.target.blur()}
                            type="number"
                            value={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />
                        </>
                      ) : (
                        <>
                          <InputWithText
                            disabled={false}
                            isError={MultiMaximumisError}
                            isWarning={MultiMaximumisWarning}
                            inputText={unit.selectedUnits[2]}
                            type="number"
                            onWheel={(e)=>e.target.blur()}
                            value={Number.parseFloat(
                              streamValue.tempMax
                            ).toFixed(1)}
                            onChange={(e) =>
                              textchange("Maximum", e.target.value, "Text")
                            }
                            onBlur={(e) =>
                              handleBlur(
                                "Maximum",
                                e.target.value,
                                "TextonBlur"
                              )
                            }
                            onFocus={() => handleFocus(7)}
                            isFocused={isFocused === 7}
                          />
                          <InputReferenceText refText="Ranges from Soft(1-60) Hard(0-100)" />
                        </>
                      )}
                    </div>
                  </div>
                </StyledCard>
                <StyledCard className="ph">
                  <Card.Header className="form-heading">
                    <CustomHeading
                      fontFamily="DiodrumRegular"
                      fontSize="14px"
                      fontWeight="400"
                      color={colors.PrimaryDarkAquaMarine}
                      label="pH"
                      mandatoryIcon={true}
                    />
                    <IconWithTooltip
                      label="pH at both the Design Temp. & 25 °C; differ because of temperature dependent acid/base equilibria."
                      icon={<InfoIcon />}
                    />
                  </Card.Header>
                  <div className="wrapper">
                    <div>
                      <CustomLabel
                        mandatoryIcon={true}
                        label={
                          "pH @" +
                          Number.parseFloat(streamValue.tempDesign).toFixed(1) +
                          unit.selectedUnits[2]
                        }
                      />
                      {/* <InputWithIcon disabled={false} isError={PHisError} isWarning={PHisWarning} inputText={<CloseCircleGreenIcon />} unitBgColor="transparent"
                    id="" type="number" defaultValue={Number.parseFloat(streamValue.ph).toFixed(2)} onChange={(e) => textchange("PH", e.target.value, "Text")}
                    onBlur={(e) => handleBlur("PH", e.target.value, "TextonBlur")} onFocus={() => handleFocus(8)} isFocused={isFocused === 8}
                  /> */}
                      <CustomInputGroup
                        isFocused={isFocused === 20}
                        disabled={false}
                        isError={PHisError}
                        isWarning={PHisWarning}
                      >
                        <Form.Control
                          type="number"
                          ref={inputPH}
                          onWheel={(e)=>e.target.blur()}
                          value={Number.parseFloat(
                            FeedWaterDetails[0].ph
                          ).toFixed(2)}
                          onChange={(e) =>
                            textchange("PH", e.target.value, "Text")
                          }
                          onBlur={(e) =>
                            handleBlur("PH", e.target.value, "TextonBlur")
                          }
                          onFocus={() => handleFocus(20)}
                          isFocused={isFocused === 20}
                          disabled={false}
                        />
                        <InputGroup.Text
                          onClick={(e) =>
                            onCancelClick("inputPH", "cations", "mgL", "x")
                          }
                        >
                          {" "}
                          <CloseCircleGreenIcon />
                        </InputGroup.Text>
                      </CustomInputGroup>
                      {PHisError ? (
                        <ErrorMessage texMsg="Values out of range" />
                      ) : PHisWarning ? (
                        <WarningMessage txtMsg="Warning Ranges Hard(0-14)" />
                      ) : (
                        <InputReferenceText refText="Ranges from Soft(0.1-13.9) Hard(0-14)" />
                      )}
                    </div>
                    <div>
                      <CustomLabel
                      //  label="pH @25.0⁰C"
                      label={
                        "pH @" +
                        Number.parseFloat(streamValue.tempDesign).toFixed(1) +
                        unit.selectedUnits[2]
                      }
                      />
                      <CalcEngInputWithIcon
                        isAutoPopulated={true}
                        disabled={true}
                        isError={false}
                        type="text"
                        value={Number.parseFloat(
                          FeedWaterDetails[0].ph25
                        ).toFixed(2)}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(9)}
                        isFocused={isFocused === 9}
                      />
                    </div>
                  </div>
                </StyledCard>
              </div>
            </div>
            <div className="cation-anion-neutral-wrapper">
              <StyledCard className="cations-card">
                <div className="cations-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Cations"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Cation conc. in mg/L as ion, ppm as CaCO3, or meq/L; automatically convert between these units."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="cations-table">
                  <thead className="table-header">
                    <tr className="header-row">
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="ppm CaCO₃"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="meq/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((cationsValue, index) => (
                        <>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "NH₄")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 22}
                                        isWarning={false}
                                        isError={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNH4mgL}
                                          name="name"
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(22)}
                                          isFocused={isFocused === 22}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4mgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 23}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNH4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(23)}
                                          isFocused={isFocused === 23}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4ppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      {/* <InputGroup > */}
                                      {/* <InputWithIcon type="number" ref={inputRefNH4meqL} defaultValue={Number.parseFloat(item.meqL).toFixed(3)} 
                            onBlur={(e) => onchangevalus("cations", "meqL", item.name, e.target.value)} 
                            onClick={(e) => onCancelClick("inputRefNH4meqL", "cations", "meqL", item.name)}
                            unitBgColor="transparent" inputText={<CloseCircleGreenIcon/>}
                            onFocus={()=>handleFocus(24)} isFocused={isFocused===24}
                          /> */}
                                      {/* <InputGroup.Text id="basic-addon2" onClick={(e) => onCancelClick("inputRefNH4meqL", "cations", "meqL", item.name)}> <CloseIcon /></InputGroup.Text>
                        </InputGroup> */}
                                      <CustomInputGroup
                                        isFocused={isFocused === 24}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNH4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(24)}
                                          isFocused={isFocused === 24}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNH4meqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>

                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Na")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 25}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNAmgL}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(25)}
                                          isFocused={isFocused === 25}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 26}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNAppm}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(26)}
                                          isFocused={isFocused === 26}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 27}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(27)}
                                          isFocused={isFocused === 27}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "K")
                                .map((item) => (
                                  <>
                                    <td>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 28}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefKmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(28)}
                                          isFocused={isFocused === 28}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 29}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefKppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(29)}
                                          isFocused={isFocused === 29}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 30}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefKmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(30)}
                                          isFocused={isFocused === 30}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefKmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Mg")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 31}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefMGmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(31)}
                                          isFocused={isFocused === 31}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 32}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefMGppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(32)}
                                          isFocused={isFocused === 32}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 33}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefMGmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(33)}
                                          isFocused={isFocused === 33}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefMGmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Ca")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 34}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCAmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(34)}
                                          isFocused={isFocused === 34}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 35}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCAppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(35)}
                                          isFocused={isFocused === 35}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 36}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(36)}
                                          isFocused={isFocused === 36}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>

                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Sr")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 37}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSRmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(37)}
                                          isFocused={isFocused === 37}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 38}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSRppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(38)}
                                          isFocused={isFocused === 38}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 39}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSRmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(39)}
                                          isFocused={isFocused === 39}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSRmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {cationsValue?.cations.length &&
                              cationsValue?.cations
                                .filter((item) => item.name === "Ba")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        key={index}
                                        label={item.name}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 40}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBAmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(40)}
                                          isFocused={isFocused === 40}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAmgL",
                                              "cations",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 41}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBAppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(41)}
                                          isFocused={isFocused === 41}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAppm",
                                              "cations",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 42}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBAmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "cations",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(42)}
                                          isFocused={isFocused === 42}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBAmeqL",
                                              "cations",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((u) => (
                        <tr key="">
                          <th>
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.CationsMql).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.Cationsppm).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                          <td>
                            <CustomHeading
                              label={Number.parseFloat(u.CationsMeql).toFixed(
                                3
                              )}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </td>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>

              <StyledCard className="anions-card">
                <div className="anions-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Anions"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Anion conc. in mg/L as ion, ppm as CaCO3, or meq/L; automatically convert between these units."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="anions-table">
                  <thead className="">
                    <tr>
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="ppm CaCO₃"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="meq/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((anionsValue, index) => (
                        <>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "CO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 42}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCO3mgL}z
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(42)}
                                          isFocused={isFocused === 42}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 43}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(43)}
                                          isFocused={isFocused === 43}
                                          disabled={
                                            FeedWaterDetails[0].ph < 6
                                              ? true
                                              : false
                                          }
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 245}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 6
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefCO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusCo3(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(245)}
                                          isFocused={isFocused === 245}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefCO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "HCO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 246}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefHCO3mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(246)}
                                          isFocused={isFocused === 246}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 247}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefHCO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(247)}
                                          isFocused={isFocused === 247}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 248}
                                        isWarning={false}
                                        isError={false}
                                        disabled={
                                          FeedWaterDetails[0].ph < 3
                                            ? true
                                            : false
                                        }
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefHCO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalusHCo3(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(248)}
                                          isFocused={isFocused === 248}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefHCO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "NO₃")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 249}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNO3mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(249)}
                                          isFocused={isFocused === 249}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 50}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNO3ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(50)}
                                          isFocused={isFocused === 50}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 51}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefNO3meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(51)}
                                          isFocused={isFocused === 51}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefNO3meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "F")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 52}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefFmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(52)}
                                          isFocused={isFocused === 52}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 53}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefFppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(53)}
                                          isFocused={isFocused === 53}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 54}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefFmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(54)}
                                          isFocused={isFocused === 54}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefFmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "Cl")
                                .map((item) => (
                                  <>
                                    <td className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 55}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefClmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(55)}
                                          isFocused={isFocused === 55}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 56}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefClppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(56)}
                                          isFocused={isFocused === 56}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 57}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefClmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(57)}
                                          isFocused={isFocused === 57}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefClmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "Br")
                                .map((item) => (
                                  <>
                                    <td className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 58}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBRmgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(58)}
                                          isFocused={isFocused === 58}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRmgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 59}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBRppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(59)}
                                          isFocused={isFocused === 59}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td className="">
                                      <CustomInputGroup
                                        isFocused={isFocused === 60}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefBRmeqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(60)}
                                          isFocused={isFocused === 60}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefBRmeqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr className="">
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "SO₄")
                                .map((item) => (
                                  <>
                                    <th>
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 61}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSO4mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(61)}
                                          isFocused={isFocused === 61}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 62}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSO4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(62)}
                                          isFocused={isFocused === 62}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 63}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefSO4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(63)}
                                          isFocused={isFocused === 63}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefSO4meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                          <tr>
                            {anionsValue.anions.length &&
                              anionsValue?.anions
                                .filter((item) => item.name === "PO₄")
                                .map((item) => (
                                  <>
                                    <th className="">
                                      <CustomLabel
                                        label={item.name}
                                        key={index}
                                      />
                                    </th>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 64}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefPO4mgL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.mgL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "mgL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(64)}
                                          isFocused={isFocused === 64}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4mgL",
                                              "anions",
                                              "mgL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 65}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefPO4ppm}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.ppm
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "ppm",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(65)}
                                          isFocused={isFocused === 65}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4ppm",
                                              "anions",
                                              "ppm",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                    <td>
                                      <CustomInputGroup
                                        isFocused={isFocused === 66}
                                        isWarning={false}
                                        isError={false}
                                        disabled={false}
                                      >
                                        <Form.Control
                                          type="number"
                                          ref={inputRefPO4meqL}
                                          onWheel={(e)=>e.target.blur()}
                                          value={Number.parseFloat(
                                            item.meqL
                                          ).toFixed(3)}
                                          onBlur={(e) =>
                                            onchangevalus(
                                              "anions",
                                              "meqL",
                                              item.name,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(evt) =>
                                            ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                            evt.preventDefault()
                                          }
                                          onFocus={() => handleFocus(66)}
                                          isFocused={isFocused === 66}
                                          disabled={false}
                                        />
                                        <InputGroup.Text
                                          onClick={(e) =>
                                            onCancelClick(
                                              "inputRefPO4meqL",
                                              "anions",
                                              "meqL",
                                              item.name
                                            )
                                          }
                                        >
                                          {" "}
                                          <CloseCircleGreenIcon />
                                        </InputGroup.Text>
                                      </CustomInputGroup>
                                    </td>
                                  </>
                                ))}
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((anionsValue) => (
                        <tr key="">
                          <th className="anions-title">
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.AnionsMql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.Anionsppm
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="anions-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                anionsValue.AnionsMeql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>

              <StyledCard className="neutral-card">
                <div className="neutrals-heading">
                  <CustomHeading
                    fontFamily="NotoSansRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.PrimaryDarkAquaMarine}
                    label="Neutrals"
                    mandatoryIcon={true}
                  />
                  <IconWithTooltip
                    label="Neutral concentration in mg/L."
                    icon={<InfoIcon />}
                  />
                </div>
                <Table className="neutral-table">
                  <thead>
                    <tr>
                      <th>
                        <CustomHeading
                          label="Symbol"
                          fontFamily="NotoSansSemiBold"
                          fontSize="14px"
                          fontWeight="700"
                          color={colors.Black}
                        />
                      </th>
                      <th>
                        <div className="icon-heading">
                          <CustomHeading
                            label="mg/L"
                            fontFamily="NotoSansSemiBold"
                            fontSize="14px"
                            fontWeight="700"
                            color={colors.Black}
                          />
                          <InfoIcon />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((neutralsValue, index) => (
                        <>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "SiO₂")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    {/* <InputGroup> */}
                                    {/* <InputWithIcon type="number" ref={inputRefSIO} defaultValue={Number.parseFloat(item.mgL).toFixed(3)} 
                      onBlur={(e) => onchangevalus("neutrals", "mgL", item.name, e.target.value)} 
                      onClick={(e) => onCancelClick("inputRefSIO", "neutrals", "mgL", item.name)}
                      unitBgColor="transparent" inputText={<CloseCircleGreenIcon/>}
                      onFocus={()=>handleFocus(52)} isFocused={isFocused===52}
                    /> */}
                                    {/* <InputGroup.Text id="basic-addon2" onClick={(e) => onCancelClick("inputRefSIO", "neutrals", "mgL", item.name)}> <CloseIcon /></InputGroup.Text>
                    </InputGroup> */}
                                    <CustomInputGroup
                                      isFocused={isFocused === 67}
                                      isWarning={false}
                                      isError={false}
                                      disabled={false}
                                    >
                                      <Form.Control
                                        type="number"
                                        ref={inputRefSIO}
                                        onWheel={(e)=>e.target.blur()}
                                        value={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalus(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(67)}
                                        isFocused={isFocused === 67}
                                        disabled={false}
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefSIO",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "B")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    <CustomInputGroup
                                      isFocused={isFocused === 68}
                                      isWarning={false}
                                      isError={false}
                                      disabled={false}
                                    >
                                      <Form.Control
                                        type="number"
                                        ref={inputRefB}
                                        onWheel={(e)=>e.target.blur()}
                                        value={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalus(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(68)}
                                        isFocused={isFocused === 68}
                                        disabled={false}
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefB",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>
                          <tr className="">
                            {neutralsValue?.neutrals
                              .filter((item) => item.name === "CO₂")
                              .map((item) => (
                                <>
                                  <th>
                                    <CustomLabel
                                      label={item.name}
                                      key={index}
                                    />
                                  </th>
                                  <td>
                                    <CustomInputGroup
                                      isFocused={isFocused === 69}
                                      isWarning={false}
                                      isError={false}
                                      disabled={
                                        FeedWaterDetails[0].ph > 9
                                          ? true
                                          : false
                                      }
                                    >
                                      <Form.Control
                                        type="number"
                                        ref={inputRefCO2}
                                        onWheel={(e)=>e.target.blur()}
                                        value={Number.parseFloat(
                                          item.mgL
                                        ).toFixed(3)}
                                        onBlur={(e) =>
                                          onchangevalusCo2(
                                            "neutrals",
                                            "mgL",
                                            item.name,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(evt.key) &&
                                          evt.preventDefault()
                                        }
                                        onFocus={() => handleFocus(69)}
                                        isFocused={isFocused === 69}
                                        disabled={
                                          FeedWaterDetails[0].ph > 9
                                            ? true
                                            : false
                                        }
                                      />
                                      <InputGroup.Text
                                        onClick={(e) =>
                                          onCancelClick(
                                            "inputRefCO2",
                                            "neutrals",
                                            "mgL",
                                            item.name
                                          )
                                        }
                                      >
                                        {" "}
                                        <CloseCircleGreenIcon />
                                      </InputGroup.Text>
                                    </CustomInputGroup>
                                  </td>
                                </>
                              ))}
                          </tr>

                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr className="blank-row">
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                  <tfoot className="neutrals-title-footer">
                    {GridTotal &&
                      GridTotal.length &&
                      GridTotal?.map((neutralsValue) => (
                        <tr key="">
                          <th className="neutrals-title">
                            <CustomHeading
                              label="Total:"
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                          <th className="neutrals-title">
                            <CustomHeading
                              label={Number.parseFloat(
                                neutralsValue.neutralsMql
                              ).toFixed(3)}
                              fontFamily="NotoSansSemiBold"
                              fontSize="14px"
                              fontWeight="700"
                              color={colors.Black}
                            />
                          </th>
                        </tr>
                      ))}
                  </tfoot>
                </Table>
              </StyledCard>
            </div>

            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="summarized-feed-setup-column"
            >
              <Card className="summarized-feed-setup-card">
                <div className="form-heading">
                  <h4>Summarized Feed Setup Values</h4>
                </div>
                <>
                  {" "}
                  <div className="card-body-wrapper">
                    {FeedWaterDetails &&
                      FeedWaterDetails?.map((summarizedData, index) => (
                        <>
                          <Card.Body key={index}>
                            {Technology === "UF" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solids:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolids
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                              </>
                            ) : Technology === "IXD" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                                {TotalppmCaCO3 &&
                                  TotalppmCaCO3?.map((u, index) => (
                                    <Card.Text key={index}>
                                      Total ppm CaCO₃:{" "}
                                      {Number.parseFloat(u).toFixed(3)}
                                    </Card.Text>
                                  ))}
                              </>
                            ) : Technology === "Multiple" ? (
                              <>
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                                <Card.Text>
                                  Total Dissolved Solids:{" "}
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolids
                                  ).toFixed(3)}{" "}
                                  mg/L (Not for Ix)
                                </Card.Text>
                                {TotalppmCaCO3 &&
                                  TotalppmCaCO3?.map((u, index) => (
                                    <Card.Text key={index}>
                                      Total ppm CaCO₃:{" "}
                                      {Number.parseFloat(u).toFixed(3)}
                                    </Card.Text>
                                  ))}
                              </>
                            ) : Technology === "null" ? (
                              <>
                                {" "}
                                <Card.Text>
                                  Total Dissolved Solutes:
                                  {Number.parseFloat(
                                    summarizedData.totalDissolvedSolutes
                                  ).toFixed(3)}{" "}
                                  mg/L
                                </Card.Text>
                              </>
                            ) : (
                              ""
                            )}
                          </Card.Body>
                          <Card.Body className="center-card-body">
                            <Card.Text>
                              Charge Balance:{" "}
                              {Number.parseFloat(
                                summarizedData.chargeBalance
                              ).toFixed(6)}{" "}
                              meq/L{" "}
                            </Card.Text>
                          </Card.Body>
                          <Card.Body className="right-card-body">
                            <Card.Text>
                              Estimated Conductivity:
                              {Number.parseFloat(
                                summarizedData.estimatedConductivity
                              ).toFixed(2)}{" "}
                               {unit.selectedUnits[17]}
                            </Card.Text>
                          </Card.Body>
                        </>
                      ))}
                  </div>{" "}
                </>
                {/* {streamValue.estimatedConductivity} {Number.parseFloat(summarizedData.chargeBalance).toFixed(6)} , {(streamValue.estimatedConductivity).toFixed(2)} */}
              </Card>
            </Col>
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="additional-feed-water-information-column"
            >
              <Form
                as={Card}
                className="additional-feed-water-information-card"
              >
                <div className="form-heading">
                  <h4>Additional Feed Water Information</h4>
                  <IconWithTooltip
                    label="Miscellaneous information not used for the computations, but included in the report."
                    icon={<InfoIcon />}
                  />
                </div>
                <CustomTextArea
                  rows={3}
                  type="textarea"
                  id="txtArea"
                  value={streamValue.additionalFeedWaterInfo}
                  className="additional_feed_setup_info"
                  placeholder="Additional Feed Water Information"
                  onChange={(e) => textchange("txtArea", e.target.value)}
                  onBlur={(e) =>
                    handleBlur("txtArea", e.target.value, "TextonBlur")
                  }
                />
                {/* <Form.Text>Ranges XXX-YYY</Form.Text> additionalFeedWaterInfo */}
              </Form>
            </Col>
          </FormEntryStyled>
        ))}
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


export default FormEntry;
