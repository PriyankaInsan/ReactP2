/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";

import CloseIcon from "../../../common/icons/CloseBlackIcon";
import { colors } from "../../../common/styles/Theme";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import StandardPrimaryButton from "../../../common/styles/components/buttons/standard/StandardPrimaryButton";
import StandardLinkButtonWithIcon from "../../../common/styles/components/buttons/standard/StandardLinkButtonWithIcon";

import UFProductGuidelinesStyled from "./UFProductGuidelinesStyled";

const UFProductGuidelines = ({show, close, onSelection}) => {
  const dispatch        = useDispatch();
  const ufStoreData     = useSelector((state) => state.UFStore);
  const { ufModules }   = ufStoreData;
  const [selectedGuidelines, setSelectedGuidelines] = useState(ufStoreData.data.uFModuleID);

  const ufGuidelinesData = ufModules?.map((m)=>{
    return {
      id           : m.ufmoduleId, 
      moduleName   : m.newModuleLongName, 
      prvModuleName: m.moduleLongName, 
      fberMat      : m.fiberMaterial, 
      flowPattern  : m.flowPattern,
      moduleArea   : m.moduleArea, 
      moduleLength : m.l,
      integrated   : m?.integraFlowInd == false ? "No" : "Yes", 
      integraPacInd: m.integraPacInd,
      orientation  : m.orientation, 
      bores        : m.bores
    };
  });

  const handleRowSelection = (item) => {
    console.log("1 handleRowSelection :",item);
    if(selectedGuidelines == item.id){
      setSelectedGuidelines(""); 
      onSelection();
      close();
    }else{
      setSelectedGuidelines(item.id);
      onSelection(item);
      close();
    }
  };
  const titleData = [
    {id:1, title:"New Module Name"},
    {id:2, title:"Previous Module Name"},
    {id:2, title:"Fiber Material"},
    {id:2, title:"Flow Pattern"},
    {id:2, title:"Module Area(m²)"},
    {id:2, title:"Module Length"},
    {id:2, title:"Integrated"},
    {id:2, title:"Orientation"},
    {id:2, title:"Bores"},
  ];

  return (
    <>
        <UFProductGuidelinesStyled show={show} onHide={close} centered backdrop="static" keyboard="false">
        <Modal.Header className="uf-guideline-header">
          <div>
            <CustomHeading fontFamily="DiodrumSemiBold" className="main-header" fontSize="16px" fontWeight="600" label="Ultrafiltration Product Guidelines" color={colors.PrimaryDarkAquaMarine}/>
            <CustomHeading fontFamily="DiodrumRegular" fontSize="12px" fontWeight="400" label="You may select the appropriate product by double-click on any row below." 
            color={colors.blackTransparency045}/>
          </div>
          <button className="close-icon"  onClick={close}>
          <CloseIcon/>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Table responsive className="wrapper">
            <thead className="header-title">
              <tr className="title">
              {titleData.map((item, index)=>(
                <th key={index}>
                  <CustomHeading fontFamily="NotoSansSemiBold" fontSize="14px" fontWeight="700" 
                  label={item.title} color={colors.Black}/>
                </th>
              ))}
              </tr>
            </thead>
            <tbody className="internal-data-container" tabIndex="0">
            {ufGuidelinesData?.map((item, index)=> {
              const isSelected = selectedGuidelines == item.id ? true : false;
              return (
                <tr key={index} className={`internal-data ${isSelected ? "selected-row" : ""}`} onDoubleClickCapture={()=> handleRowSelection(item)}>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.moduleName} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.prvModuleName} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400"  label={item.fberMat} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400"  label={item.flowPattern} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.moduleArea} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.moduleLength} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.integrated} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.orientation} color={colors.Black}/>
                  </td>
                  <td className="data">
                  <CustomHeading fontFamily="DiodrumRegular" fontSize="14px" fontWeight="400" label={item.bores} color={colors.Black}/>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <StandardPrimaryButton label="OK" onClick={() => close() }/>
        </Modal.Footer>
        </UFProductGuidelinesStyled>
    </>
  );
};

export default UFProductGuidelines;