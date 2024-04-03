import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import { nativeEnum } from "zod";
import { colors } from "../../../common/styles/Theme";
const tabAvailable = ["UF", "IXD"];
const dataFen = [
  "startNode",
  "endNode",
  "deleteNode",
  "Adjust Final pH ",
  "canvas",
];
const StarterNodes = [
  {
    id: "canvas",
    type: "group",
    position: {
      x: 0,
      y: 0,
    },
    draggable: false,
    deletable: false,
    selectable:false,
    data: {
      label: null,
    },
    style: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    className: "canvas",
  },
  {
    id: "startNode",
    type: "endPointNode",
    position: {
      x: 0,
      y: 0,
    },
    draggable: false,
    deletable: false,
    data: {
      label: "Feed Water",
      position: "Right",
      value: "100",
      type: "source",
    },
    parentNode: "canvas",
    extent: "parent",
  },
  {
    id: "endNode",
    type: "endPointNode",
    position: {
      x: window.innerWidth,
      y: 0,
    },
    draggable: false,
    deletable: false,
    data: {
      label: "Product Water",
      position: "Left",
      value: "100",
      type: "target",
    },
    parentNode: "canvas",
    extent: "parent",
  },
  {
    id: "deleteNode",
    type: "deleteType",
    position: {
      x: 573,
      y: 228,
    },
    draggable: false,
    deletable: false,
    data: {
      label: "Delete Node",
      position: "Left",
      value: "100",
      type: "target",
    },
    parentNode: "canvas",
    extent: "parent",
  },
];
const position = [
  { lable: "UF", position: { x: 45, y: 55.6 } },
  { lable: "IXD", position: { x: 45, y: 55.6 } },
  { lable: "Adjust Final pH", position: { x: 435, y: 55.6 } },
];

const initialState = {
  canvasStyle: { width: window.innerWidth, height: 230 },
  techNolist: [],
  getCategoryData: true,
  needToRetriveData: false,
  defaultRecovery: {
    UF: 99.12,
    IXD: 97,
    default: 100,
  },
  selectedEndNode: "startNode",
  pHAvailable: false,
  isDataUpdated: false,
  isLoading: true,
  feedWaterData: {},
  technologyAdded: false,
  idMarker: 0,
  systemDesignCaseTreatmentVM: [],
  lstTechnologyLists: [],
  feedFlowRate: 100,
  productFlowRate: 100,
  addedTechnology: [
    {
      id: -2,
      heading: "System Design",
      value: "",
      subHeading: "(60% completed)",
      completed: 0,
    },
    {
      id: -1,
      subHeading: "(60% completed)",
      heading: "Feed Setup",
      completed: 0,
      value: "",
    },
  ],
  nodes: StarterNodes,
  edges: [],
};

const getNearNodes = (nodes, TargetNode, state) => {
  const targetX = TargetNode.position.x;
  let nearSource = 0;
  let nearTarget = state.canvasStyle.width;
  nearSource = nearTarget = targetX;
  let sourceDiff, targetDiff;
  sourceDiff = targetDiff = state.canvasStyle.width;
  nodes.map((node) => {
    if (!["deleteNode", "canvas"].includes(node.id)) {
      if (sourceDiff > targetX - node.position.x && targetX > node.position.x) {
        sourceDiff = targetX - node.position.x;
        nearSource = node.id;
      }
      if (targetDiff > node.position.x - targetX && targetX < node.position.x) {
        targetDiff = node.position.x - targetX;
        nearTarget = node.id;
      }
    }
  });

  return [nearSource, nearTarget];
};

const updateWater = (state) => {
  if (state.selectedEndNode == "startNode") {
    state.productFlowRate = state.feedFlowRate;
    tabAvailable.map((item) => {
      if (state.techNolist.includes(item)) {
        state.productFlowRate = Number(
          (state.feedFlowRate * state.defaultRecovery[item]) / 100
        ).toFixed(2);
      }
    });
  } else {
    state.feedFlowRate = state.productFlowRate;
    tabAvailable.map((item) => {
      if (state.techNolist.includes(item)) {
        state.feedFlowRate = Number(
          (state.productFlowRate * 100) / state.defaultRecovery[item]
        ).toFixed(2);
      }
    });
  }
  updateFeedWaterData(state);
};

const updateFeedWaterData = (state) => {
  state.feedWaterData = {
    ...state.feedWaterData,
    feedFlow: state.selectedEndNode != "startNode",
    flowValue:
      state.selectedEndNode == "startNode"
        ? state.feedFlowRate
        : state.productFlowRate,
  };
};

//

export const processDiagramSlice = createSlice({
  name: "process diagram",
  initialState,
  reducers: {
    //get Data from Api and Update the store
    setNodeAndEdge: (state, action) => {
      state.needToRetriveData = false;
      const { processMap, systemDesignCaseTreatmentVM, ...data } =
        action.payload;
      state.feedWaterData = data;
      state.techNolist = [];
      state.technologyAdded = false;
      state.pHAvailable = false;
      state.systemDesignCaseTreatmentVM = systemDesignCaseTreatmentVM;
      state.nodes = [
        ...StarterNodes,
        ...processMap.nodes
          .filter(
            (item) =>
              !["startNode", "endNode", "deleteNode", "canvas"].includes(
                item.id
              )
          )
          .map((item) => {
            return { ...item, parentNode: "canvas", extent: "parent" };
          }),
      ];
      state.lstTechnologyLists = [];
      systemDesignCaseTreatmentVM.map((item) => {
        if (item.treatmentObjID > 0) {
          state.lstTechnologyLists.push({
            technologyID: item.treatmentObjID,
            caseTreatmentID: item.caseTreatmentID,
            isDeleted: false,
          });
        }
      });

      state.edges = processMap.edges.filter((item) => item.source !== "3");
      // state.isDataUpdated = false;
      let addedTechnologyTemp = [];
      processMap.nodes.map((item) => {
        state.idMarker =
          Number(item.id) > Number(state.idMarker)
            ? Number(item.id)
            : Number(state.idMarker);
        if (item.data.label === "Adjust Final pH") {
          state.pHAvailable = true;
        }

        state.techNolist = [...state.techNolist, item.data.label];

        if (["IXD", "UF"].includes(item.data.label)) {
          state.technologyAdded = true;
        }

        if (!dataFen.includes(item.id)) {
          addedTechnologyTemp.push({
            id: item.data.treatmentObjID,
            subHeading: "(60% completed)",
            heading: `${item.data.label}`,
            value: `${item.data.value}`,
            completed: 0,
          });
        }
      });
      addedTechnologyTemp.sort((a, b) => a.id - b.id);
      state.addedTechnology = [
        ...initialState.addedTechnology,
        ...addedTechnologyTemp,
      ];
      let flow = [1, 0].includes(data.flow) ? 100 : data.flow;
      let hadTechnology = false;
      let feedFlag = data.flow==0?"Feed":data.feedOrProductFlow;
      if (feedFlag == "Feed") {
        state.selectedEndNode = "startNode";
        state.feedFlowRate = flow;
        tabAvailable.map((item) => {
          // state.productFlowRate= data.flow;
          if (state.techNolist.includes(item)) {
            state.productFlowRate = Number(
              (flow * state.defaultRecovery[item]) / 100
            ).toFixed(2);
            hadTechnology = true;
          }
        });
        if (!hadTechnology) {
          state.productFlowRate = flow;
        }
      } else {
        state.selectedEndNode = "endNode";
        state.productFlowRate = flow;
        tabAvailable.map((item) => {
          // state.feedFlowRate = data.flow;
          if (state.techNolist.includes(item)) {
            state.feedFlowRate = Number(
              (flow * 100) / state.defaultRecovery[item]
            ).toFixed(2);
            hadTechnology = true;
          }
        });
        if (!hadTechnology) {
          state.feedFlowRate = flow;
        }
      }

      state.isLoading = false;
      updateFeedWaterData(state);
    },
    setFeedFlowRate: (state, action) => {
      const { value, name } = action.payload;
      state.isDataUpdated = true;
      if (state.techNolist.includes("UF") || state.techNolist.includes("IXD")) {
        state[name] = value;
        if (name == "feedFlowRate") {
          tabAvailable.map((item) => {
            let finalFlow = value;
            if (state.techNolist.includes(item)) {
              state.productFlowRate = Number(
                (finalFlow * state.defaultRecovery[item]) / 100
              ).toFixed(2);
            }
          });
        } else {
          tabAvailable.map((item) => {
            let finalFlow = value;
            if (state.techNolist.includes(item)) {
              state.feedFlowRate = Number(
                (finalFlow * 100) / state.defaultRecovery[item]
              ).toFixed(2);
            }
          });
        }
      } else {
        state.productFlowRate = value;
        state.feedFlowRate = value;
      }

      updateFeedWaterData(state);
    },
    updateRecovery: (state, action) => {
      const { name, value } = action.payload;
      state.defaultRecovery[name] = value;
    },
    //Add node to the store
    addNode: (state, action) => {
      let nodesAvailable = 0;
      const newNode = {
        ...action.payload,
        position: position.find(
          (item) => item.lable === action.payload.data.label
        ).position,
      }; //new node data

      state.techNolist = [...state.techNolist, newNode.data.label]; //added to the available uf
      if (["IXD", "UF"].includes(newNode.data.label)) {
        state.technologyAdded = true;
      }

      state.nodes.map((item) => {
        if (item.data.label === newNode.data.label) {
          nodesAvailable += 1;
        }
      });
      const idM = nodesAvailable === 0 ? "" : nodesAvailable;
      state.nodes = [
        ...state.nodes,
        {
          ...newNode,
          parentNode: "canvas",
          extent: "parent",
          draggable: true,
          deletable: true,
          id: `${newNode.data.label} ${idM}`,
          data: {
            ...newNode.data,
            value: `${idM}`,
          },
        },
      ];
      state.lstTechnologyLists.push({
        technologyID: newNode.data.label == "UF" ? 1 : 5,
        caseTreatmentID: 0,
        isDeleted: false,
      });
      const [nearSource, nearTarget] = getNearNodes(
        state.nodes,
        newNode,
        state
      );
      state.edges = state.edges.filter(
        (item) => item.id !== `reactflow__edge-${nearSource}-${nearTarget}`
      );
      state.edges = [
        ...state.edges,
        {
          source: nearSource,
          sourceHandle: null,
          target: `${newNode.data.label} ${idM}`,
          targetHandle: null,
          type: "customeEdge",
          style: {
            strokeWidth: 2,
            stroke: "#007672",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#007672",
          },
          id: `reactflow__edge-${nearSource}-${newNode.data.label} ${idM}`,
          selected: false,
        },
        {
          source: `${newNode.data.label} ${idM}`,
          sourceHandle: null,
          target: nearTarget,
          targetHandle: null,
          type: "customeEdge",
          style: {
            strokeWidth: 2,
            stroke: "#007672",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#007672",
          },
          id: `reactflow__edge-${newNode.data.label} ${idM}-${nearTarget}`,
          selected: false,
        },
      ];
      if (newNode.data.label !== "Adjust Final pH") {
        let tempData = [
          ...state.addedTechnology,
          {
            id: newNode.data.treatmentObjID,
            subHeading: "(60% completed)",
            heading: `${newNode.data.label}`,
            value: `${idM}`,
            completed: 0,
          },
        ];
        tempData.sort((a, b) => a.id - b.id);
        state.addedTechnology = tempData;
      } else {
        state.pHAvailable = true;
      }
      updateWater(state);
      state.isDataUpdated = false;
      state.needToRetriveData = true;
    },
    onNodesChange: (state, action) => {
      const a = applyNodeChanges(action.payload, state.nodes);
      state.nodes = a;
      // state.isDataUpdated = true;
    },
    //delete Node from data
    deleteNode: (state, action) => {
      let prevTarget = state.edges.find(
        (item) => item.source == action.payload.id
      );
      let prevSource = state.edges.find(
        (item) => item.target == action.payload.id
      );
      let a = state.nodes.filter((item) => item.id !== action.payload.id);
      let b = state.edges.filter(
        (item) =>
          item.source !== action.payload.id && item.target !== action.payload.id
      );
      let newState = state.addedTechnology.filter(
        (data) =>
          !(
            data.heading === `${action.payload.data.label}` &&
            data.value === action.payload.data.value
          )
      );

      state.addedTechnology = newState;
      state.nodes = a;
      state.edges = b;

      let newState2 = state.lstTechnologyLists.map((item) => {
        if (
          item.caseTreatmentID != 0 &&
          !item.isDeleted &&
          item.technologyID == (action.payload.data.label == "UF" ? 1 : 5)
        ) {
          return { ...item, isDeleted: true };
        } else {
          return item;
        }
      });
      state.lstTechnologyLists = newState2;
      if (action.payload.data.label === "Adjust Final pH") {
        state.pHAvailable = false;
      }
      if (state.techNolist.includes(action.payload.data.label)) {
        state.techNolist = state.techNolist.filter(
          (item) => item !== action.payload.data.label
        );
        if (
          !state.techNolist.includes("UF") &&
          !state.techNolist.includes("IXD")
        ) {
          state.technologyAdded = false;
        }
      }
     
      updateWater(state);
      state.isDataUpdated = true;
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
      // state.isDataUpdated = true;
    },
    onEdgesUpdated: (state, action) => {
      const { oldEdge, newConnection } = action.payload;
      let newEdges;
      if (!newConnection.target) {
        newEdges = state.edges.filter((edge) => edge.id !== oldEdge.id);
        state.edges = newEdges;
      } else {
        newEdges = state.edges.map((edge) => {
          if (edge.id === oldEdge.id) {
            edge.source = newConnection.source;
            edge.target = newConnection.target;
          }
          return edge;
        });
        state.edges = applyEdgeChanges(newEdges, state.edges);
      }
      state.isDataUpdated = false;

      // state.edges = applyEdgeChanges()
    },
    onConnect: (state, action) => {
      state.edges = addEdge(
        {
          ...action.payload,
          type: "customeEdge",
          style: {
            strokeWidth: 2,
            stroke: "#007672",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: colors.PrimaryDarkAquaMarine,
          },
        },
        state.edges
      );
      state.isDataUpdated = false;
    },
    dataIsSaved: (state, action) => {
      state.isDataUpdated = false;
    },
    setSelectedEndNode: (state, action) => {
      const id = action.payload;
      state.selectedEndNode = id;
      updateFeedWaterData(state);
    },
    setNeedToRetriveData: (state, action) => {
      // state.needToRetriveData = true;
    },
    setUpdateCategory: (state, action) => {
      state.getCategoryData = action.payload;
    },
    setUpdateCanvas: (state, action) => {
      state.canvasStyle = action.payload;
      let { width, height } = action.payload;
      let newState = state.nodes.map((node) => {
        if (node.id == "canvas") {
          return { ...node, style: { width: width, height: height } };
        }
        if (node.id == "startNode") {
          return { ...node, position: { x: 0, y: 10 } };
        }
        if (node.id == "endNode") {
          return { ...node, position: { x: width - 136, y: 10 } };
        }
        if (node.id == "deleteNode") {
          return { ...node, position: { x: width - 201.94, y: 228 } };
        }
        if (node.id.includes("UF") || node.id.includes("IXD")) {
          return { ...node, position: { x: width / 2, y: 30.5 } };
        }
        return node;
      });
      state.nodes = newState;
    },
    setIsDataUpdated:(state,action)=>{
      state.isDataUpdated = false;
    },
    setLoading:(state,action)=>{
      state.isLoading=true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEdgesUpdated,
  addNode,
  setSelectedEndNode,
  deleteNode,
  setNodeAndEdge,
  dataIsSaved,
  setFeedFlowRate,
  setNeedToRetriveData,
  updateRecovery,
  setUpdateCategory,
  setUpdateCanvas,
  setIsDataUpdated,
  setLoading,
} = processDiagramSlice.actions;

export default processDiagramSlice.reducer;
