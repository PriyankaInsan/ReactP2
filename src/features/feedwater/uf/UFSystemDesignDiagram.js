import React,{useState} from "react";
import {ReactComponent as UfDiagram} from "../../../common/assets/images/UF-group-image.svg";
import {ReactComponent as UfDiagramWithText} from "../../../common/assets/images/UF-Drawing-with-id-text.svg";

import UFSystemDesignDiagramStyled from "./UFSystemDesignDiagramStyled";
import { Accordion, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const UFSystemDesignDiagram = () => {
    const[accordionOpen, setAccordionOpen]     = useState(false);
     /* Fetching uf info from slice */
    const ufStore                              = useSelector((state) => state.UFStore);
    const unit = useSelector(
      (state) => state.projectInfo?.projectConfig?.unitConfig
    );
    const { feedFlowRate }                     = useSelector((state) => state.processDiagramSlice);
    const feedWater_StreamStore                = useSelector((state) => state.Feedsetupdetailsdatapanel);
    const { ufModules, data, calcEngineData }                  = ufStore;
    /* Fetching feedsetup info from slice */
    const { waterSource =""}                   = feedWater_StreamStore && feedWater_StreamStore?.data[0] || {};
    const savefeedwater = feedWater_StreamStore && feedWater_StreamStore?.streamData.lstrequestsavefeedwater || [];
    const savefeedwaterObj                = savefeedwater[0]?.streams[0] || {};
    const { toc="", tss="", turbidity="" } = savefeedwaterObj;

    const { chemicalConfig, pumpCofig } = useSelector(
      (state) => state.projectInfo.projectConfig
    );
    
    // console.log("UFSystemDesignDiagram -> feedsetupstore data",feedWater_StreamStore);

    const handleAccordionOpen = ()=>{
        setAccordionOpen(!accordionOpen);
    };

    const validData = (data, label, flag) => {
      const den = flag ? "0" : 0;
      return data ? data[label] : den;
    };
    
    const moduleElem= document.querySelectorAll("#wavepro_Module");
    if(moduleElem.length >0){
      if(data.uFModuleID > 0){
        const selectedModule = ufModules?.filter((m) => m.ufmoduleId == data.uFModuleID);
        moduleElem[0].textContent = selectedModule[0]?.moduleLongName; 
      }
    }
    const totalUFTrainsElem= document.querySelectorAll("#wavepro_total-uf-trains");
    if(totalUFTrainsElem.length >0){
        totalUFTrainsElem[0].textContent = data.totalTrains; 
    }
    const ufModulesElem = document.querySelectorAll("#wavepro_uf-modules");
    if(ufModulesElem.length >0){
       ufModulesElem[0].textContent = data.totalTrains +" * "+ data.modulesPerTrain + " = "+ data.totalModules; 
    }    
    const operatingFluxElem = document.querySelectorAll("#wavepro_operating-flux");
    if(operatingFluxElem.length >0){
        operatingFluxElem[0].textContent = calcEngineData?.flux_Filter_actual !== undefined
        ? Number(
            Math.round(calcEngineData?.flux_Filter_actual)
          ).toFixed(2)
        : 0; 
    }
    const ufSystemRecoveryElem = document.querySelectorAll("#wavepro_uf-system-recovery");
    if(ufSystemRecoveryElem.length >0){
        ufSystemRecoveryElem[0].textContent = "xx"; 
    }

    /* -------------------- Feed Water --------------------------*/

    const averageFeedFlowElem= document.querySelectorAll("#wavepro_feedWater-average-feed-flow");
    if(averageFeedFlowElem.length >0){
       averageFeedFlowElem[0].textContent = feedFlowRate; 
    }

    const typeElem= document.querySelectorAll("#wavepro_feedWater-type");
    if(typeElem.length >0){
        typeElem[0].textContent = waterSource; 
    }
    const tssElem= document.querySelectorAll("#wavepro_feedWater-tss");
    if(tssElem.length >0){
        tssElem[0].textContent = tss + " mg/L"; 
    }
    const tocElem= document.querySelectorAll("#wavepro_feedWater-toc");
    if(tocElem.length >0){
        tocElem[0].textContent = toc + " mg/L"; 
    }
    const turbidityElem= document.querySelectorAll("#wavepro_feedWater-turbidity");
    if(turbidityElem.length >0){
        turbidityElem[0].textContent = turbidity + " NTU"; 
    }

    /* -------------------- Feed Pump --------------------------*/
    
// #wavepro_feed-pump-field1       = Math.round(vol_Raw_actual_total_day/24,0)&" m³/h"
// #wavepro_feed-pump-field2       = Math.round(Flow_Feed_Pump,0)&" m³/h avg  "

    const feedPump1Elem= document.querySelectorAll("#wavepro_feed-pump-field1");
    if(feedPump1Elem.length >0){
        const fpump1 = Math.round(calcEngineData?.vol_Raw_actual_total_day/24,0);
        feedPump1Elem[0].textContent = "Max "+ fpump1 + unit.selectedUnits[1]; 
    }
    const feedPump2Elem= document.querySelectorAll("#wavepro_feed-pump-field2");
    if(feedPump2Elem.length >0){
      // const fpump2 = Math.round(calcEngineData?.Flow_Feed_Pump, 0);
        feedPump2Elem[0].textContent = "@ xx "+unit.selectedUnits[3]; 
    }
    /* -------------------- Strainer --------------------------*/

    const strainerSpecificationElem= document.querySelectorAll("#wavepro_strainer-specification");
    if(strainerSpecificationElem.length >0){
        strainerSpecificationElem[0].textContent = data.strainerSize +" µm"; 
    }
    const strainerRecoveryElem= document.querySelectorAll("#wavepro_strainer-recovery");
    if(strainerRecoveryElem.length >0){
      strainerRecoveryElem[0].textContent = data.strainerRecovery + " %" + " Recovery"; 
    }

    /* -------------------- CIP Pump --------------------------*/
    /* CIP Pump - Recycle flow rate (additional settings)  and
                - pressure CIP Piping Pressure Drop(additional settings) */
  
    const cipPump1Elem= document.querySelectorAll("#wavepro_cip-pump-field1");
    if(cipPump1Elem.length >0){
        cipPump1Elem[0].textContent = Math.round(Math.max(calcEngineData?.flow_CIP_Pump),0)  +"  "+ unit.selectedUnits[1]; 
    }
    const cipPump2Elem= document.querySelectorAll("#wavepro_cip-pump-field2");
    if(cipPump2Elem.length >0){
        cipPump2Elem[0].textContent = "@ " + data.cIPPipingPreDrop + " "+ unit.selectedUnits[3]; 
    }
    /* -------------------- CIP Tank --------------------------*/
    const cipTankElem= document.querySelectorAll("#wavepro_cip-tank");
    if(cipTankElem.length >0){
        cipTankElem[0].textContent = "xx  "+unit.selectedUnits[11]; 
    }

    /* -------------------- Air Scour --------------------------*/
    const airScour1Elem= document.querySelectorAll("#wavepro_air-scour-field1");
    if(airScour1Elem.length >0){
       airScour1Elem[0].textContent = data.airFlow + " "+unit.selectedUnits[18]+"/module"; 
    }
    const airScour2Elem= document.querySelectorAll("#wavepro_air-scour-field2");
    if(airScour2Elem.length >0){
      /* from Additional Settings Screen - Maximum Air Scour Pressure*/
        airScour2Elem[0].textContent = "@  " + data.maxAirScourPressure + " "+unit.selectedUnits[3]; 
    }
    /* -------------------- Backwash Pump --------------------------*/

    const backwashPump1Elem= document.querySelectorAll("#wavepro_Backwash-pump-field1");
    if(backwashPump1Elem.length >0){
        backwashPump1Elem[0].textContent = "BW "+  Math.round(Math.max(calcEngineData?.flow_CIP_Pump),0)   
        +" "+unit.selectedUnits[1]+" / CEB " +   Math.round(Math.max(calcEngineData?.flow_CEB_Pump),0) + "  "+unit.selectedUnits[1]; 
    }
    const backwashPump2Elem= document.querySelectorAll("#wavepro_Backwash-pump-field2");
    if(backwashPump2Elem.length >0){
        backwashPump2Elem[0].textContent = "@ xx  "+unit.selectedUnits[3];
    }
    /* -------------------- CEB Concentration and Chemical --------------------------*/
    if(data.mineralValueInPh_Ind){
      const CEB1_acid_name = validData(
        chemicalConfig.chemicalList.find(
          (item) => item.iD == data.mineralChemId
        ),
        "displayName",
        true
      );
      const CEB1_acid_conc = data.mineralValueInPh_Ind ? 0 : data.mineralValue;
      const CEB1_acid_pH = data.mineralValueInPh_Ind ? data.mineralValue : 0;
      // const ceb1Elem= document.querySelectorAll("#wavepro_ceb-chemical-field1");
      // if(ceb1Elem.length >0){
      //     ceb1Elem[0].textContent = "CEB "+ CEB1_acid_conc +" mg/L " +  CEB1_acid_name + " 5.5 L/H 32%"; 
      // }else{
      //   ceb1Elem[0].textContent = "";
      // }
    }

    // if(data.organicEnabled_Ind_CEB){
    //   const CEB1_org_acid_name = validData(
    //     chemicalConfig.chemicalList.find(
    //       (item) => item.iD == data.organicChemId
    //     ),
    //     "displayName",
    //     true
    //   );
    //   const CEB1_org_acid_conc = data.organicEnabled_Ind_CEB ? 0 : data.organicValue;
    //   const ceb2Elem= document.querySelectorAll("#wavepro_ceb-chemical-field2");
    //   if(ceb2Elem.length >0){
    //       ceb2Elem[0].textContent = "CEB "+ CEB1_org_acid_conc +" mg/L " +  CEB1_org_acid_name + " 5.5 L/H 32%"; 

    //   }
    // }

    // if(data.alkaliEnabled_Ind_CEB){
    //   const CEB2_base_name = validData(
    //     chemicalConfig.chemicalList.find(
    //       (item) => item.iD == data.alkaliChemId
    //     ),
    //     "displayName",
    //     true
    //   );
    //   const CEB2_base_conc = data.alkaliEnabled_Ind_CEB ? 0 : data.alkaliValue;
    //   const ceb3Elem= document.querySelectorAll("#wavepro_ceb-chemical-field3");
    //   if(ceb3Elem.length >0){
    //     ceb3Elem[0].textContent = "CEB "+ CEB2_base_conc +" mg/L " +  CEB2_base_name + " 5.5 L/H 32%"; 
    //   }
    // }

    // if(data.oxidantEnabled_Ind_CEB){
    //   const CEB2_ox_name = validData(
    //     chemicalConfig.chemicalList.find(
    //       (item) => item.iD == data.oxidantChemId
    //     ),
    //     "displayName",
    //     true
    //   );
    //   const CEB2_ox_conc = data.alkaliEnabled_Ind_CEB ? 0 : data.oxidantValue;
    //   const ceb4Elem= document.querySelectorAll("#wavepro_ceb-chemical-field4");
    //   if(ceb4Elem.length >0){
    //     ceb4Elem[0].textContent = "CEB "+ CEB2_ox_conc +" mg/L " +  CEB2_ox_name + " 5.5 L/H 32%"; 
    //   }
    // }

    /* -------------------- Filtrate Tank --------------------------*/
    const filtrateTankElem= document.querySelectorAll("#wavepro_filtrate-tank");
    if(filtrateTankElem.length >0){
        filtrateTankElem[0].textContent = "xx  m"; 
    }
    /* -------------------- Waste --------------------------*/
    const wasteElem= document.querySelectorAll("#wavepro_waste");
    if(wasteElem.length >0){
        wasteElem[0].textContent = "xx  m/h"; 
    }
    /* -------------------- Net Filtrate --------------------------*/
    const netFiltrateElem= document.querySelectorAll("#wavepro_net-filtrate");
    if(netFiltrateElem.length >0){
      const netFiltrate = calcEngineData?.Vol_UF_net_filtrate_actual_total_day !== undefined
      ? Number(
          Math.round(calcEngineData?.Vol_UF_net_filtrate_actual_total_day/24)
        ).toFixed(2)
      : 0; 
        netFiltrateElem[0].textContent = netFiltrate+"  m/h"; 
    }
    /* -------------------- Gross Filtrate --------------------------*/
    const grossFiltrateElem= document.querySelectorAll("#wavepro_gross-filtrate");
    if(grossFiltrateElem.length >0){
        const grossFiltrate = calcEngineData?.vol_Gross_filtrate_actual_total_day !== undefined
        ? Number(
            Math.round(calcEngineData?.vol_Gross_filtrate_actual_total_day/24)
          ).toFixed(2)
        : 0; 
        grossFiltrateElem[0].textContent = grossFiltrate+"  m/h"; 
    }

  return (
    <>
        <UFSystemDesignDiagramStyled lg={12} md={12} sm={12} className="system-diagram-column">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleAccordionOpen} as={Card.Header}>UF System Diagram
              {accordionOpen?<span>Hide</span>:<span>Show</span>}
            </Accordion.Header>
            <Accordion.Body className="image-container">
              <UfDiagramWithText></UfDiagramWithText>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </UFSystemDesignDiagramStyled>
    </>
  );
};

export default UFSystemDesignDiagram;