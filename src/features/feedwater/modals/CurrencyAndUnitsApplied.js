import React from "react";
import CreatedProjectSuccessStyled from "./CreatedProjectSuccessStyled";
import { Button, Col, Row } from "react-bootstrap";
import CheckCircleIcon from "../../../common/icons/CheckCircleIcon";
import CloseIcon from "../../../common/icons/CloseIcon";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedFlowRate } from "../systemdesign/processDiagramSlice";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
const CurrencyAndUnitsApplied = ({show, close, childParentModal}) => {
  const[openModal, setOpenModal] =useState(true);
  const dispatch = useDispatch();
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const unitFlow = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig.selectedUnits[4]
  );
  const UFData = useSelector((state) => state.UFStore.data);
  const unitType = useSelector((state) => state.GUnitConversion.unitTypeFlux);
  const unitFlag = useSelector((state) => state.GUnitConversion.unitFlag);
  const {
    unitTypeFlow
  } = useSelector((state) => state.GUnitConversion);
  const {
    feedFlowRate,
  } = useSelector((state) => state.processDiagramSlice);
  const handleClose = ()=>{
    setOpenModal(false);
    childParentModal(false);
  };
  //   useEffect(()=>{
  //     //if (unitFlag) {
  //   dispatch(
  //    setFeedFlowRate({
  //      value: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedFlowRate,unit.selectedUnits[1],unitTypeFlow).toFixed(2))),
  //      name: "feedFlowRate",
  //    })
  //  );
   // }
//},[unit.selectedUnits[1]]);
  useEffect(()=>{
    if(show===true){
      setOpenModal(true);
      close(false);
    }
  },[openModal]);
  
  return (
    <>
      <CreatedProjectSuccessStyled show={show&&openModal} onHide={handleClose} centered>
        <Row>
          <Col sm={1}>
            <CheckCircleIcon/>
          </Col>
          <Col sm={10} xs={10}>
            <h6>Updated preferences applied successfully!</h6>
          </Col>
          <Col sm={1} className="close-icon"> 
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Col>
        </Row>
      </CreatedProjectSuccessStyled>
    </>
  );
};

export default CurrencyAndUnitsApplied;