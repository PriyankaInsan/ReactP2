import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectID: 0,
  caseId: 0,
  caseName: "Case 1",
  projectName: null,
  treatmentName: null,
  treatmentObjID: null,
  projectTitle: "",
  Tchnology: [],
  case: [],
  projectConfig: {
    unitConfig: {
      defaultValues: [],
      selectedUnits: [],
      selectedUnitType: 0,
    },
    currencyConfig: {
      defaultValues: [],
      selectedCurrency: {
        currencyUnit: "$",
        currencyID: 1,
        currencyName: "US Dollar($)",
        isDefault: true,
        currencyValue: "1",
      },
    },
    chemicalConfig: {
      showInDropDownChem: [],
      chemicalList: [],
      operatingCost: {
        rawWater: 0.14,
        wasteWaterDisposal: 0.69,
        electricity: 0.09,
      },
    },
    pumpCofig: {
      pupmList: [],
    },
    caseConfig: {
      caseList: [],
      caseNameList: [],
    },
  },
  data: {
    projectID: 0,
    caseId: 0,
    projectName: "",
    Tchnology: "",
  },
  projectData: {},
};
export const ProjectInfoSlice = createSlice({
  name: "ProjectInfo",
  initialState,
  reducers: {
    updateProjectInfo: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("ProjectInfo", JSON.stringify(action.payload));
    },
    updateCaseName: (state, action) => {
      state.caseName = action.payload;
    },
    updateUnitConfig: (state, action) => {
      const incomingUnit = action.payload;
      const selectedUnitType = incomingUnit[0].uomSelectType;
      let isUnitNew = incomingUnit[0].unitKey.filter((item) => item.isSelected);
      let selectedUnits = [];
      if (isUnitNew.length > 0) {
        incomingUnit.map((item) => {
          let unitTag = item.unitKey.filter((item) => item.isSelected);
          if (unitTag.length > 0) {
            selectedUnits[item.uomTypeID] = unitTag[0].uomName;
          } else {
            selectedUnits[item.uomTypeID] = item.unitKey[0].uomName;
          }
        });
      }

      state.projectConfig.unitConfig.selectedUnits = selectedUnits;
      state.projectConfig.unitConfig.defaultValues = incomingUnit;
      state.projectConfig.unitConfig.selectedUnitType = selectedUnitType;
    },
    updateChemicalConfig: (state, action) => {
      const { rawWater, wasteWaterDisposal, electricity, lstChemicalVMs } =
        action.payload;
      state.projectConfig.chemicalConfig.showInDropDownChem =
        lstChemicalVMs.filter((item) => item.showDropDown);
      state.projectConfig.chemicalConfig.chemicalList = lstChemicalVMs;
      state.projectConfig.chemicalConfig.operatingCost = {
        rawWater,
        wasteWaterDisposal,
        electricity,
      };
    },
    updatePumpList: (state, action) => {
      // const listData = action.payload;
      state.projectConfig.pumpCofig.pupmList = action.payload;
    },
    updateCaseConfig: (state, action) => {
      state.projectConfig.caseConfig.caseList = action.payload;
      state.projectConfig.caseConfig.caseNameList=action.payload.map((item)=>item.caseName);
    },
    updateProjectTitle: (state, action) => {
      state.projectTitle = action.payload;
    },
    updateProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    updateProjectCurrency: (state, action) => {
      let selectdetCurrency = action.payload.find((item) => item.isDefault);
      let currencyName = selectdetCurrency.currencyName
        .replace("(", " ")
        .replace(")", "")
        .split(" ");
      let symbole = currencyName[currencyName.length - 1];
      state.projectConfig.currencyConfig.selectedCurrency = {
        ...action.payload.find((item) => item.isDefault),
        currencyUnit: symbole,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateProjectInfo,
  updateProjectData,
  updateUnitConfig,
  updateChemicalConfig,
  updatePumpList,
  updateCaseName,
  updateCaseConfig,
  updateProjectCurrency,
  updateProjectTitle,
} = ProjectInfoSlice.actions;

export default ProjectInfoSlice.reducer;

// Unit config
// index : unit type
//    '1': 'Flow',
//    '2': 'Temperature',
//    '3': 'Pressure',
//    '4': 'Flux',
//    '5': 'Area',
//    '6': 'Concentration',
//    '7': 'Density',
//    '8': 'Length',
//    '9': 'Power',
//    '10': 'SpaceVelocity',
//    '11': 'VolumeSolution',
//    '12': 'VolumeResin',
//    '13': 'RegenerationDose',
//    '14': 'LinearVelocity',
//    '15': 'Weight',
//    '16': 'Conductivity',
//    '17': 'GasFlow',
//    '18': 'Organic',
//    '19': 'Volume (common)'
