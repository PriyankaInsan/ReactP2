/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import InfoIcon from "../../../common/icons/InfoIcon";
import ResinSelectionStyled from "./ResinSelectionStyled";
import SystemDiagram from "./SystemDiagram";
import { useLazyGetAllDataQuery } from "../../../services/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/utils/Loader";
import { updateLoader } from "../../home/CardListSlice";
import IconWithTooltip from "../../../common/styles/components/headings/IconWithTooltip";

import {
  updateError,
  updateResinData,
  updateResinDropDownData,
  updateResinInertNameCalc,
  updateResinIonicCalc,
  updateResinNameCalc,
  updateSacData,
  updateSbaData,
  updateSelectedResin,
  updateselectedResinColoumn1,
  updateselectedResinColoumn2,
} from "./IXDSlice";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomSelect from "../../../common/styles/components/selects/CustomSelect";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import { MyError } from "../../../common/utils/ErrorCreator";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
const ResinSelection = () => {
  const [getIXResin, responseIXResin] = useLazyGetAllDataQuery();
  const [resinData, setResinData] = useState();
  const [wabData, setWabData] = useState();
  const [wacData, setWacData] = useState();
  const [inert1Data, setInert1Data] = useState();
  const [inert2Data, setInert2Data] = useState();
  const [sacData, setSacData] = useState();
  const [sbaData, setSbaData] = useState();

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.cardlist.loader);
  const vesselIds = useSelector((state) => state.IXStore?.data);
  const { resinNameCalc, resinInertCalc, resinIonicCalc } = useSelector(
    (state) => state.IXStore
  );
  const resinStore = useSelector((state) => state.IXStore.resinData);
  console.log(resinStore, "resinStore");
  var wac = resinStore.WAC;
  var wba = resinStore.WBA;
  var inert1 = resinStore.inert1;
  var sac = resinStore.SAC;
  var sba = resinStore.SBA;
  var inert2 = resinStore.inert2;
  // var resinId1 = resinStore.resinId1;
  // var resinId2 = resinStore.resinId2;
  // var resinId3 = resinStore.resinId3;
  // var resinId4 = resinStore.resinId4;
  const seletedResinList = useSelector(
    (state) => state.IXStore?.data?.selectedResinList
  );
  const validdesignID = useSelector(
    (state) => state.IXStore.vesselData.validDesignID
  );
  const ixStoreProcess = useSelector((state) => state.IXStore.Demineralization);
  const jsonResinData = useSelector((state) => state.IXStore.jsonResinData);
  const ixStore1 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 1)
  );
  const ixStore2 = useSelector((state) =>
    state.IXStore.data.selectedResinList.filter((item) => item.columnNo === 2)
  );
  const sacIonsData = useSelector((state) => state.IXStore.sacData);
  const sbaIonsData = useSelector((state) => state.IXStore.sbaData);
  const selectedResinColoumn1 = useSelector(
    (state) => state.IXStore.selectedResinColoumn1
  );
  const selectedResinColoumn2 = useSelector(
    (state) => state.IXStore.selectedResinColoumn2
  );
  let tradeID = 2;
  useEffect(()=>{
    wac = jsonResinData
    ?.find((item) => item.resinName === "WAC")
    ?.listIXResins.find(
      (item) => item.ResinId === ixStore1[0]?.ixResinID1
    );
    sac = jsonResinData
        ?.find((item) => item.resinName === "SAC")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore1[0]?.ixResinID2
        );
        wba = jsonResinData
        ?.find((item) => item.resinName === "WBA")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore2[0]?.ixResinID1
        );
        sba = jsonResinData
        ?.find((item) => item.resinName === "SBA")
        ?.listIXResins.find(
          (item) => item.ResinId === ixStore2[0]?.ixResinID2
        );

  dispatch(
    updateResinData({
      ...resinStore,
      ["WAC"]: wac?wac.ResinName:null,
      ["SAC"]: sac?sac.ResinName:null,
      ["WBA"]: wba?wba.ResinName:null,
      ["SBA"]: sba?sba.ResinName:null,
      ["resinId1"]: wac?wac.ResinId:null,
      ["resinId2"]: sac?sac.ResinId:null,
      ["resinId3"]: wba?wba.ResinId:null,
      ["resinId4"]: sba?sba.ResinId:null,
    })
  );
  },[jsonResinData]);
  useEffect(() => {
    try {
      let apiUrl = `${"ix/api/v1/IXResin"}?userID=${
        vesselIds.userID
      }&projectID=${vesselIds.projectID}&validdesignID=${
        vesselIds.validDesignID
      }&processID=${ixStoreProcess[0].ixProcessID}`;
      if (vesselIds.vessel1 !== null) {
        apiUrl += `&vessel1=${vesselIds.vessel1}`;
      }
      if (vesselIds.vessel2 !== null) {
        apiUrl += `&vessel2=${vesselIds.vessel2}`;
      }
      if (vesselIds.vessel3 !== null) {
        apiUrl += `&vessel3=${vesselIds.vessel3}`;
      }
      if (vesselIds.vessel4 !== null) {
        apiUrl += `&vessel4=${vesselIds.vessel4}`;
      }
      if (tradeID !== null) {
        apiUrl += `&tradeID=${tradeID}`;
      }
      getIXResin(apiUrl);
    } catch {
      console.log("Error: Fetch IXResin data");
    }
  }, []);
  useEffect(() => {
    if (responseIXResin.isLoading) {
      dispatch(updateLoader(true));
    } else {
      if (responseIXResin.isSuccess === true) {
        dispatch(updateLoader(false));
        setResinData(responseIXResin.data.responseResinSelections);
        dispatch(
          updateResinDropDownData(responseIXResin.data.responseResinSelections)
        );
      }
    }
    if (responseIXResin.isError) {
      throw new MyError(
        "IXResin Api Error",
        responseIXResin.error.status,
        "ApiError"
      );
    }
  }, [responseIXResin]);
  //New project first time error validation
  // useEffect(() => {
  //   if (
  //     seletedResinList.length === 0 ||
  //     seletedResinList.length === 1 ||
  //     seletedResinList[0]?.ixResinID1 === -1 ||
  //     seletedResinList[0]?.ixResinID2 === -1 ||
  //     seletedResinList[1]?.ixResinID1 === -1 ||
  //     seletedResinList[1]?.ixResinID2 === -1
  //   ) {
  //     dispatch(updateError(3));
  //   }
  // }, []);
  useEffect(() => {
    if (sacData && ixStore1[0]?.ionicFormSelected_ind) {
      const ionsValue = sacData.listIXResins.filter((item) =>
        item.ResinName.endsWith("Na")
      );
      dispatch(updateSacData(ionsValue));
    } else if (sacData && !ixStore1[0]?.ionicFormSelected_ind) {
      const ionsValue = sacData.listIXResins.filter((item) =>
        item.ResinName.endsWith("H")
      );
      dispatch(updateSacData(ionsValue));
    }
  }, [sacData]);
  useEffect(() => {
    if (sbaData && ixStore2[0]?.ionicFormSelected_ind) {
      const ionsValue = sbaData.listIXResins.filter((item) =>
        item.ResinName.endsWith("Cl")
      );
      dispatch(updateSbaData(ionsValue));
    } else if (sbaData && !ixStore2[0]?.ionicFormSelected_ind) {
      const ionsValue = sbaData.listIXResins.filter(
        (item) =>
          item.ResinName.endsWith("OH") || item.ResinName.endsWith("SO4")
      );
      dispatch(updateSbaData(ionsValue));
    }
  }, [sbaData]);
  useEffect(() => {
    if (resinData) {
      const wac = resinData?.find((item) => item.resinName === "WAC");
      const wab = resinData?.find((item) => item.resinName === "WBA");
      const inert1 = resinData?.find((item) => item.resinName === "Inert1");
      const inert2 = resinData?.find((item) => item.resinName === "Inert2");
      const sac = resinData?.find((item) => item.resinName === "SAC");
      const sba = resinData?.find((item) => item.resinName === "SBA");
      let newSelectedResin = selectedResinColoumn1;
      let newSelectedResin2 = selectedResinColoumn2;
      let resinNameCalc = {
        WAC: null,
        WBA: null,
        SAC: null,
        SBA: null,
      };
      let resinInertCalc = {
        Inert1: null,
        Inert2: null,
      };
      let resinIonicCalc = {
        WACIon: null,
        WBAIon: null,
        SACIon: null,
        SBAIon: null,
      };
      if (wac) {
        setWacData(wac);
        newSelectedResin = {
          ...newSelectedResin,
          ["ixResinID1"]: ixStore1[0]?.ixResinID1,
        };
        resinNameCalc = {
          ...resinNameCalc,
          WAC: wac?.listIXResins.find(
            (item) => item.ResinId === ixStore1[0]?.ixResinID1
          )?.ResinName,
        };
        resinIonicCalc = {
          ...resinIonicCalc,
          WACIon: wac?.listIXResins.find(
            (item) => item.ResinId === ixStore1[0]?.ixResinID1
          )?.IxionicFormId,
        };
      } else {
        newSelectedResin = { ...newSelectedResin, ["ixResinID1"]: 0 };
      }

      if (wab) {
        setWabData(wab);
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["ixResinID1"]: ixStore2[0]?.ixResinID1,
        };
        resinNameCalc = {
          ...resinNameCalc,
          WBA: wab?.listIXResins.find(
            (item) => item.ResinId === ixStore2[0]?.ixResinID1
          )?.ResinName,
        };
        resinIonicCalc = {
          ...resinIonicCalc,
          WBAIon: wab?.listIXResins.find(
            (item) => item.ResinId === ixStore2[0]?.ixResinID1
          )?.IxionicFormId,
        };
      } else {
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["ixResinID1"]: 0,
        };
      }

      if (inert1) {
        setInert1Data(inert1);
        newSelectedResin = {
          ...newSelectedResin,
          ["inert"]: ixStore1[0]?.inert,
        };
        resinInertCalc = {
          ...resinInertCalc,
          ["Inert1"]: inert1?.listIXResins.find(
            (item) => item.ResinId === ixStore1[0]?.inert
          )?.ResinName,
        };
      } else {
        newSelectedResin = {
          ...newSelectedResin,
          ["inert"]: 0,
        };
      }

      if (inert2) {
        setInert2Data(inert2);
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["inert"]: ixStore2[0]?.inert,
        };
        resinInertCalc = {
          ...resinInertCalc,
          ["Inert2"]: inert2?.listIXResins.find(
            (item) => item.ResinId === ixStore2[0]?.inert
          )?.ResinName,
        };
      } else {
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["inert"]: 0,
        };
      }
      if (sac) {
        setSacData(sac);
        newSelectedResin = {
          ...newSelectedResin,
          ["ixResinID2"]: ixStore1[0]?.ixResinID2,
          ["ionicFormSelected_ind"]: ixStore1[0]?.ionicFormSelected_ind,
        };
        resinNameCalc = {
          ...resinNameCalc,
          SAC: sac?.listIXResins.find(
            (item) => item.ResinId === ixStore1[0]?.ixResinID2
          )?.ResinName,
        };
        resinIonicCalc = {
          ...resinIonicCalc,
          SACIon: sac?.listIXResins.find(
            (item) => item.ResinId === ixStore1[0]?.ixResinID2
          )?.IxionicFormId,
        };
      } else {
        newSelectedResin = {
          ...newSelectedResin,
          ["ixResinID2"]: 0,
          ["ionicFormSelected_ind"]: null,
        };
      }

      if (sba) {
        setSbaData(sba);
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["ixResinID2"]: ixStore2[0]?.ixResinID2,
          ["ionicFormSelected_ind"]: ixStore2[0]?.ionicFormSelected_ind,
        };
        resinNameCalc = {
          ...resinNameCalc,
          SBA: sba?.listIXResins.find(
            (item) => item.ResinId === ixStore2[0]?.ixResinID2
          )?.ResinName,
        };
        resinIonicCalc = {
          ...resinIonicCalc,
          SBAIon: sba?.listIXResins.find(
            (item) => item.ResinId === ixStore2[0]?.ixResinID2
          )?.IxionicFormId,
        };
      } else {
        newSelectedResin2 = {
          ...newSelectedResin2,
          ["ixResinID2"]: 0,
          ["ionicFormSelected_ind"]: null,
        };
      }
      dispatch(updateSelectedResin([newSelectedResin, newSelectedResin2]));
      dispatch(updateselectedResinColoumn1(newSelectedResin));
      dispatch(updateselectedResinColoumn2(newSelectedResin2));
      dispatch(updateResinNameCalc(resinNameCalc));
      dispatch(updateResinInertNameCalc(resinInertCalc));
      dispatch(updateResinIonicCalc(resinIonicCalc));
    }
  }, [resinData]);

  const handleColoumn1Change = (e) => {
    const selectedResin = {
      ...selectedResinColoumn1,
      [e.target.name]: parseInt(e.target.value, 10),
    };
    dispatch(updateSelectedResin(selectedResin));
    dispatch(updateselectedResinColoumn1(selectedResin));

    //Resin name required for existing plant and calc engine json parameter
    if (e.target.name === "ixResinID1") {
      wac = jsonResinData
        ?.find((item) => item.resinName === "WAC")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({
          ...resinStore,
          ["WAC"]: wac.ResinName,
          ["resinId1"]: parseInt(e.target.value, 10),
        })
      );
      dispatch(
        updateResinNameCalc({ ...resinNameCalc, ["WAC"]: wac.ResinName })
      );
      dispatch(
        updateResinIonicCalc({
          ...resinIonicCalc,
          ["WACIon"]: wac.IxionicFormId,
        })
      );
    } else if (e.target.name === "ixResinID2") {
      sac = jsonResinData
        ?.find((item) => item.resinName === "SAC")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({
          ...resinStore,
          ["SAC"]: sac.ResinName,
          ["resinId2"]: parseInt(e.target.value, 10),
        })
      );
      dispatch(
        updateResinNameCalc({ ...resinNameCalc, ["SAC"]: sac.ResinName })
      );
      dispatch(
        updateResinIonicCalc({
          ...resinIonicCalc,
          ["SACIon"]: sac.IxionicFormId,
        })
      );
    } else {
      inert1 = jsonResinData
        ?.find((item) => item.resinName === "Inert1")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({ ...resinStore, ["inert1"]: inert1?.ResinName })
      );
      dispatch(
        updateResinInertNameCalc({
          ...resinInertCalc,
          ["Inert1"]: inert1?.ResinName,
        })
      );
    }
  };

  const handleColoumn2Change = (e) => {
    const selectedResin = {
      ...selectedResinColoumn2,
      [e.target.name]: parseInt(e.target.value, 10),
    };
    dispatch(updateSelectedResin(selectedResin));
    dispatch(updateselectedResinColoumn2(selectedResin));

    //Resin name required for existing plant and calc engine json parameter
    if (e.target.name === "ixResinID1") {
      wba = jsonResinData
        ?.find((item) => item.resinName === "WBA")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({
          ...resinStore,
          ["WBA"]: wba.ResinName,
          ["resinId3"]: parseInt(e.target.value, 10),
        })
      );
      dispatch(
        updateResinNameCalc({ ...resinNameCalc, ["WBA"]: wba?.ResinName })
      );
      dispatch(
        updateResinIonicCalc({
          ...resinIonicCalc,
          ["WBAIon"]: wba.IxionicFormId,
        })
      );
    } else if (e.target.name === "ixResinID2") {
      sba = jsonResinData
        ?.find((item) => item.resinName === "SBA")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({
          ...resinStore,
          ["SBA"]: sba?.ResinName,
          ["resinId4"]: parseInt(e.target.value, 10),
        })
      );
      dispatch(
        updateResinNameCalc({ ...resinNameCalc, ["SBA"]: sba?.ResinName })
      );
      dispatch(
        updateResinIonicCalc({
          ...resinIonicCalc,
          ["SBAIon"]: sba.IxionicFormId,
        })
      );
    } else {
      inert2 = jsonResinData
        ?.find((item) => item.resinName === "Inert2")
        ?.listIXResins.find(
          (item) => item.ResinId === parseInt(e.target.value, 10)
        );
      dispatch(
        updateResinData({ ...resinStore, ["inert2"]: inert2?.ResinName })
      );
      dispatch(
        updateResinInertNameCalc({
          ...resinInertCalc,
          ["Inert2"]: inert2?.ResinName,
        })
      );
    }
  };
  const handleRadioChange1 = (selectedValue) => {
    if (selectedValue === "Na") {
      const selectedResin = {
        ...selectedResinColoumn1,
        ["ionicFormSelected_ind"]: true,
        ["ixResinID2"]: 164,
      };
      dispatch(updateSelectedResin(selectedResin));
      dispatch(updateselectedResinColoumn1(selectedResin));
    } else if (selectedValue === "H") {
      const selectedResin = {
        ...selectedResinColoumn1,
        ["ionicFormSelected_ind"]: false,
        ["ixResinID2"]: 165,
      };
      dispatch(updateSelectedResin(selectedResin));
      dispatch(updateselectedResinColoumn1(selectedResin));
    }
    const ionsValue = sacData.listIXResins.filter((item) =>
      item.ResinName.endsWith(selectedValue)
    );
    dispatch(updateSacData(ionsValue));
    console.log(ionsValue, "ionsValue");
  };

  const handleRadioChange2 = (selectedValue) => {
    if (selectedValue === "Cl") {
      const selectedResin = {
        ...selectedResinColoumn2,
        ["ionicFormSelected_ind"]: true,
        ["ixResinID2"]: 176,
      };
      dispatch(updateSelectedResin(selectedResin));
      dispatch(updateselectedResinColoumn2(selectedResin));
    } else if (selectedValue === "OH") {
      const selectedResin = {
        ...selectedResinColoumn2,
        ["ionicFormSelected_ind"]: false,
        ["ixResinID2"]: 178,
      };
      dispatch(updateSelectedResin(selectedResin));
      dispatch(updateselectedResinColoumn2(selectedResin));
    }

    if (selectedValue === "Cl") {
      const ionsValue = sbaData.listIXResins.filter((item) =>
        item.ResinName.endsWith("Cl")
      );
      dispatch(updateSbaData(ionsValue));
    } else if (selectedValue === "OH") {
      const ionsValue = sbaData.listIXResins.filter(
        (item) =>
          item.ResinName.endsWith("OH") || item.ResinName.endsWith("SO4")
      );
      dispatch(updateSbaData(ionsValue));
    }
  };

  return !loader ? (
    <>
      <ResinSelectionStyled className="g-0">
        <SystemDiagram />
        <StyledCard className="resin-card">
          <Card.Header>
            <CustomHeading
              mandatoryIcon={true}
              label="Resin"
              fontFamily="NotoSansRegular"
              fontSize="14px"
              fontWeight="400"
              color={colors.PrimaryDarkAquaMarine}
            />
            <IconWithTooltip
              label="For each resin in design, select name and ionic form of WAC/SAC/WBA/SBA/inert resins to be used."
              icon={<InfoIcon />}
            />
          </Card.Header>
          <Card.Body className="resin-card-body">
            <div className="resin-first-option">
              <div className="wac">
                <CustomLabel label="WAC" disabled={!wacData} />
                <CustomSelect
                  className="wac-select"
                  name="ixResinID1"
                  onChange={handleColoumn1Change}
                  value={ixStore1[0]?.ixResinID1}
                  disabled={!wacData}
                >
                  {!wacData && <option value={0}>Choose a WAC Resin</option>}
                  {wacData &&
                    wacData.listIXResins.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <div className="inert">
                <CustomLabel label="Inert" disabled={!inert1Data} />
                <CustomSelect
                  className="inert-select"
                  name="inert"
                  onChange={handleColoumn1Change}
                  value={ixStore1[0]?.inert}
                  disabled={!inert1Data}
                >
                  {!inert1Data && <option>Choose a Inert</option>}
                  {inert1Data &&
                    inert1Data.listIXResins.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <div className="sac">
                <div className="sac-radio">
                  <CustomHeading
                    label="Filter SAC by Ionic Form as Delivered:"
                    fontFamily="DiodrumRegular"
                    fontSize="12px"
                    fontWeight="400"
                    color={colors.blackTransparency045}
                  />
                  <div className="radio-wrapper">
                      <CustomRadio
                        name="sacData"
                        type="radio"
                        label="Na"
                        id="naRadio"
                        value="Na"
                        checked={ixStore1[0]?.ionicFormSelected_ind === true}
                        onChange={() => handleRadioChange1("Na")}
                        disabled={!sacData}
                      />
                      <CustomRadio
                        name="sacData"
                        type="radio"
                        label="H"
                        id="HRadio"
                        value="H"
                        checked={ixStore1[0]?.ionicFormSelected_ind === false}
                        onChange={() => handleRadioChange1("H")}
                        disabled={!sacData}
                      />
                  </div>
                </div>
                <CustomLabel label="SAC" disabled={!sacData} />
                <CustomSelect
                  className="sac-select"
                  name="ixResinID2"
                  onChange={handleColoumn1Change}
                  value={ixStore1[0]?.ixResinID2}
                  disabled={!sacData}
                >
                  {!sacData && <option value={0}>Choose a SAC Resin</option>}
                  {sacIonsData &&
                    sacIonsData.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
            </div>
            <div className="resin-first-option">
              <div className="wba">
                <CustomLabel label="WBA" disabled={!wabData} />
                <CustomSelect
                  className="wba-select"
                  name="ixResinID1"
                  onChange={handleColoumn2Change}
                  value={ixStore2[0]?.ixResinID1}
                  disabled={!wabData}
                >
                  {!wabData && <option value={0}>Choose a WBA Resin</option>}
                  {wabData &&
                    wabData.listIXResins.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <div className="inert">
                <CustomLabel label="Inert" disabled={!inert2Data} />
                <CustomSelect
                  className="inert-select"
                  name="inert"
                  onChange={handleColoumn2Change}
                  value={ixStore2[0]?.inert}
                  disabled={!inert2Data}
                >
                  {!inert2Data && <option>Choose a Inert</option>}
                  {inert2Data &&
                    inert2Data.listIXResins.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
              <div className="sba">
                <div className="sba-radio">
                  <CustomHeading
                    label="Filter SBA by Ionic Form as Delivered:"
                    fontFamily="DiodrumRegular"
                    fontSize="12px"
                    fontWeight="400"
                    color={colors.blackTransparency045}
                  />
                  <div className="radio-wrapper">
                    <CustomRadio
                      name="sbaData"
                      type="radio"
                      label="Cl"
                      id="clRadio"
                      value="Cl"
                      checked={ixStore2[0]?.ionicFormSelected_ind === true}
                      onChange={() => handleRadioChange2("Cl")}
                      disabled={!sbaData}
                    />
                    <CustomRadio
                      name="sbaData"
                      type="radio"
                      label="OH"
                      id="ohRadio"
                      value="OH"
                      checked={ixStore2[0]?.ionicFormSelected_ind === false}
                      onChange={() => handleRadioChange2("OH")}
                      disabled={!sbaData}
                    />
                  </div>
                </div>
                <CustomLabel label="SBA" disabled={!sbaData} />
                <CustomSelect
                  className="sba-select"
                  name="ixResinID2"
                  onChange={handleColoumn2Change}
                  value={ixStore2[0]?.ixResinID2}
                  disabled={!sbaData}
                >
                  {!sbaData && <option value={0}>Choose a SBA Resin</option>}
                  {sbaIonsData &&
                    sbaIonsData.map((resin) => (
                      <option key={resin.ResinId} value={resin.ResinId}>
                        {resin.ResinName}
                      </option>
                    ))}
                </CustomSelect>
              </div>
            </div>
          </Card.Body>
        </StyledCard>
      </ResinSelectionStyled>
    </>
  ) : (
    <Loader />
  );
};

export default ResinSelection;
