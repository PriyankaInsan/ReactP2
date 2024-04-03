// /* eslint-disable max-len */
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import FeedTechnologyStyled from "./FeedTechnologyStyled";
import TechButtons from "../../../common/styles/components/buttons/techButtons/TechButtons";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CloseBlackIcon from "../../../common/icons/CloseBlackIcon";
import CustomButton from "../../../common/styles/components/buttons/standard/CustomButton";
import InfoPictonBlueIcon from "../../../common/icons/InfoPictonBlueIcon";
import { useState, useRef, useMemo, useCallback, memo } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import EndPointNode from "./customnodes/EndPointNode";
import "./index.css";
import TechnologyNode from "./customnodes/TechnologyNode";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
  onEdgesUpdated,
  deleteNode,
  setNodeAndEdge,
  setUpdateCategory,
  setUpdateCanvas,
  setFeedFlowRate,
  setSelectedEndNode,
} from "./processDiagramSlice";
import Technology from "./customnodes/technology.json";
import DeleteNode from "./customnodes/DeleteNode";
import {
  useLazyGetAllDataQuery,
  useUpdateDataMutation,
} from "../../../services/apiConfig";
import CustomeEdge from "./customnodes/CustomeEdge";
import { MyError } from "../../../common/utils/ErrorCreator";
import DynamicLoadder from "../../../common/utils/DynamicLoadder";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import ErrorPopup from "../../../common/utils/ErrorPopup";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
import { updateUnitFlag, updateUnitTypeFlow } from "../../../common/utils/GlobalUnitConversionSlice";

let id = 0;
const getId = () => `${id++}`;

const FeedTechnology = () => {
  const [notification, setNotification] = useState(true);
  const [techAddedError, setTechAddedError] = useState(false);
  const [getSystemData, responseSystemData] = useLazyGetAllDataQuery();
  const [updateData, response] = useUpdateDataMutation();
  const [techCate, setTechCat] = useState([]);
  const [sdData, setSDData] = useState({});
  const [getCateData, responseCateData] = useLazyGetAllDataQuery();
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const {
    nodes,
    edges,
    isLoading,
    pHAvailable,
    techNolist,
    technologyAdded,
    feedWaterData,
    canvasStyle,
    selectedEndNode,
    feedFlowRate,
    productFlowRate,
    lstTechnologyLists,
    needToRetriveData,
  } = useSelector((state) => state.processDiagramSlice);
  const ProjectInfoStore = useSelector((state) => state.projectInfo.data);
  const userId = useSelector((state) => state.userInfo.data.UserId);
  const { getCategoryData } = useSelector((state) => state.processDiagramSlice);
  const projectID = ProjectInfoStore?.projectID
    ? ProjectInfoStore.projectID
    : 1;
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const {unitTypeFlow,unitFlag} = useSelector((state) => state.GUnitConversion);
  const GlobalUnitConversionStore = useSelector((state) => state.GUnitConversion.data);
  
  const nodeTypes = useMemo(
    () => ({
      endPointNode: EndPointNode,
      techNode: TechnologyNode,
      deleteType: DeleteNode,
    }),
    []
  );

  const isInersect = ({ position }) => {
    let { width } = canvasStyle;
    let { x, y } = position;
    return x > width - 201.94 && x < width && y > 228 && y < 346;
  };
  useEffect(()=>{
    // if(unitFlag){
      dispatch(
        setFeedFlowRate({
          value: (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedFlowRate,unit.selectedUnits[1],unitTypeFlow).toFixed(2))),
          name: "feedFlowRate",
        })
      );
    dispatch(updateUnitTypeFlow(unit.selectedUnits[1]));
    // dispatch(updateUnitFlag(false));
    // dispatch(setSelectedEndNode("feedFlowRate"));
    
    // } 
  },[unit.selectedUnits[1]]);
  useEffect(() => {
    if (projectID !== 1 || getCategoryData) {
      getCateData(`masterdata/api/v1/CategoryTreatment?projectID=${projectID}`);
      handleResize();
    }
  }, [projectID, getCategoryData]);

  useEffect(() => {
    // if (responseCateData.isLoading) {
    //   console.log(" system desing category api is Loading");
    // }
    if (responseCateData.isError) {
      throw new MyError(
        "CategoryTreatment Api Error",
        responseCateData.error.status,
        "ApiError"
      );
    }
    if (responseCateData.isSuccess) {
      let temp = [];
      responseCateData.data.map((cat) => {
        if (cat.isSelected === 1) {
          temp.push(cat.treatmentName);
        }
      });
      setTechCat(temp);
      dispatch(setUpdateCategory(false));
    }
  }, [responseCateData]);


  const handleClose = () => {
    setNotification(false);
  };

  const onDragStart = (event, nodeType) => {
    const transferData = JSON.stringify(nodeType);
    event.dataTransfer.setData("application/reactflow", transferData);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const { type, ...data } = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );

    if (typeof type === "undefined" || !type) {
      return;
    }
    if (data.label === "Adjust Final pH") {
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      let id = getId();
      const newNode = {
        id: id,
        type,
        position,
        data: data,
      };
      dispatch(addNode(newNode));
    } else {
      if (technologyAdded) {
        setTechAddedError(true);
      } else {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        let id = getId();
        const newNode = {
          id: id,
          type,
          position,
          data: data,
        };
        dispatch(addNode(newNode));
      }
    }
    event.preventDefault();
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    dispatch(onEdgesUpdated({ oldEdge, newConnection }));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      dispatch(
        onEdgesUpdated({ oldEdge: edge, newConnection: { target: undefined } })
      );
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const isValidConnection = (edge) => {
    const { target, source } = edge;
    const targetAvailable = edges.find((item) => item.target === target);
    const sourceAvailable = edges.find((item) => item.source === source);
    return !targetAvailable && !sourceAvailable;
  };
  //dj---------------------------------------------------------
  const flowContainerRef = useRef(null);
  // const elements = useStoreState((store) => store.elements);
  const [scaleFactor, setScaleFactor] = useState(1);
  const handleResize = () => {
    if (reactFlowWrapper.current) {
      const containerWidth = reactFlowWrapper.current.offsetWidth;
      dispatch(
        setUpdateCanvas({
          width: containerWidth,
          height: reactFlowWrapper.current.offsetHeight,
        })
      );
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // handleResize();
  useEffect(() => {
    handleResize();
  }, [feedWaterData, reactFlowWrapper]);
  //--------------------------------------------------------
  useEffect(() => {
    if (needToRetriveData) {
      updateData({
        Method: "masterdata/api/v1/SystemDesign",
        feedFlow: selectedEndNode != "startNode",
        flowValue:
          selectedEndNode == "startNode" ? (Number(GlobalUnitConversion(GlobalUnitConversionStore,feedFlowRate,"m³/h",unit.selectedUnits[1]).toFixed(2))) : (Number(GlobalUnitConversion(GlobalUnitConversionStore,productFlowRate,"m³/h",unit.selectedUnits[1]).toFixed(2))),
        caseID: feedWaterData.caseID,
        projectID: feedWaterData.projectID,
        waterTypeID: feedWaterData.waterTypeID,
        userID: userId,
        processMap: { nodes: nodes, edges: edges },
        lstTechnologyLists,
      });
    }
  }, [needToRetriveData]);
  useEffect(() => {
    if (response.isSuccess) {
      const url =
        feedWaterData.caseID === 0
          ? `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
              feedWaterData.projectID
            }`
          : `masterdata/api/v${1}/SystemDesign?userID=${userId}&projectID=${
              feedWaterData.projectID
            }&caseID=${feedWaterData.caseID}`;
      //  const url=`masterdata/api/v${1}/SystemDesign?userID=${1}&projectID=${projectid}`;
      let response = getSystemData(url);
    }
  }, [response]);
  useEffect(() => {
    if (responseSystemData.status == "fulfilled" && needToRetriveData) {
      // dispatch(setNodeAndEdge(responseSystemData.data));
      dispatch(setNodeAndEdge({...responseSystemData.data,["flow"]:(Number(GlobalUnitConversion(GlobalUnitConversionStore,responseSystemData.data.flow,unit.selectedUnits[1],"m³/h").toFixed(2)))}));
    }
  }, [responseSystemData]);

  return (
    <>
      <FeedTechnologyStyled className="g-0">
        {notification && (
          <div className="notification">
            <div className="wrapper">
              <InfoPictonBlueIcon />
              <ul className="notification-details">
                <li>
                  <CustomHeading
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="You are viewing technologies as per your preference and can edit them from Project Settings."
                  />
                </li>
                <li>
                  <CustomHeading
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Specify either Feed flow rate OR Product flow rate."
                  />
                </li>
                <li>
                  <CustomHeading
                    fontFamily="DiodrumRegular"
                    fontSize="14px"
                    fontWeight="400"
                    color={colors.Black}
                    label="Select technologies by dragging and dropping the icons from the top panel."
                  />
                </li>
              </ul>
            </div>
            <CustomButton
              label={<CloseBlackIcon />}
              id="closeBtn"
              onClick={handleClose}
            />
          </div>
        )}
        <ErrorPopup
          show={techAddedError}
          close={() => setTechAddedError(false)}
          message={"Only one technology can be added!"}
        />

        <div className="water-technology">
          {Technology.data.map((tech, index) => (
            <StyledCard
              className={tech.className}
              key={index}
              borderRadius="4px"
            >
              <div className="process-name">
                <CustomHeading
                  label={tech.techName}
                  fontFamily="DiodrumRegular"
                  fontSize="12px"
                  fontWeight="400"
                  color={colors.Black}
                />
              </div>
              <div className="tech-btn-group">
                {tech.subTech.map((item) => (
                  <div
                    onDragStart={(event) =>
                      onDragStart(event, {
                        ...item.nodeData,
                        treatmentObjID: item.treatmentObjID,
                      })
                    }
                    draggable={techCate.includes(item.label)}
                  >
                    <TechButtons
                      label={item.label}
                      disabled={
                        !techCate.includes(item.label) ===
                        !techNolist.includes(item.label)
                      }
                      isDraggable={true}
                      isArrow={item.isArrow}
                      id={item.id}
                      onClick={() =>
                        technologyAdded ? setTechAddedError(true) : null
                      }
                    />
                  </div>
                ))}
              </div>
            </StyledCard>
          ))}
          <StyledCard className="bulk-demineralization" borderRadius="4px">
            <div className="process-name">
              <CustomHeading
                label="Water Chemistry Adjustments"
                fontFamily="DiodrumRegular"
                fontSize="12px"
                fontWeight="400"
                color={colors.Black}
              />
            </div>
            <div className="tech-btn-group">
              <div
                onDragStart={(event) =>
                  onDragStart(event, {
                    label: "Adjust Final pH",
                    color: "green",
                    type: "techNode",

                    treatmentObjID: 12,
                  })
                }
                draggable={false}
              >
                <TechButtons
                  label="Adjust Final pH"
                  disabled={true}
                  isArrow={false}
                  id="APH"
                  isDraggable={true}
                />
              </div>
            </div>
          </StyledCard>
        </div>

        <DynamicLoadder isLoading={isLoading}>
          <div className="feed-water-process">
            <div style={{ width: "100%", height: "346px" }}>
              <div className="dndflow">
                <ReactFlowProvider>
                  <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      nodeTypes={nodeTypes}
                      edgeTypes={{ customeEdge: CustomeEdge }}
                      onNodeDragStop={(e, node) => {
                        if (isInersect(node)) dispatch(deleteNode(node));
                        // console.log("nodeDelteddd",node);
                      }}
                      onNodesChange={(e) => dispatch(onNodesChange(e))}
                      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
                      onConnect={(e) => dispatch(onConnect(e))}
                      onInit={setReactFlowInstance}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      preventScrolling={false}
                      // onEdgeUpdate={onEdgeUpdate}
                      // onEdgeUpdateStart={onEdgeUpdateStart}
                      // onEdgeUpdateEnd={onEdgeUpdateEnd}
                      isValidConnection={(edge) => isValidConnection(edge)}
                      deleteKeyCode={"Delete"}
                      // onConnectStart={(e, a) => console.log("edge", a)}
                      panOnDrag={false}
                      panOnScroll={false}
                      zoomOnScroll={false}
                      zoomOnDoubleClick={false}
                      onNodesDelete={(node) => dispatch(deleteNode(node[0]))}
                      // onEdgesDelete={(edge) => console.log("DATAJ", edge)}
                      nodeExtent={[
                        [0, 0],
                        [canvasStyle.width, 346],
                      ]}
                      translateExtent={[
                        [0, 0],
                        [canvasStyle.width, 346],
                      ]}
                      Viewport={{ x: 0, y: 0, zoom: 1 }}
                    ></ReactFlow>
                  </div>
                </ReactFlowProvider>
              </div>
            </div>
          </div>
        </DynamicLoadder>
      </FeedTechnologyStyled>
    </>
  );
};

export default FeedTechnology;
