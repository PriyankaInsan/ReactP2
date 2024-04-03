import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data:[],
  unitTypeFlow:"m³/h", //1
  unitTypeTemp:"°C", //2
  unitTypePressure:"bar", //3
  unitTypeFlux:"LMH", //4
  unitTypeArea:"m²", //5
  unitTypeContentration:"µatm", //6
  unitTypeDensity:"g/cm³", //7
  unitTypeLength:"mm", //8
  unitTypePower:"kW", //9
  unitTypeSVelocity:"BV/h", //10
  unitTypeSVolume:"m³", //11
  unitTypeRVolume:"m³", //12
  unitTypeCVolume:"BV", //13
  unitTypeRegeneration:"g/L", //14
  unitTypeLVelocity:"m/h", //15
  unitTypeWeight:"kg", //16
  unitTypeConductivity:"µS/cm", //17
  unitTypeGasFlow:"Nm³/h", //18
  unitTypeOrganic:"mg/L", //19
  unitFlag:false,
};

export const GlobalUnitConversionSlice = createSlice({
  name: "GUnitConversion",
  initialState,
  reducers: {
    updateGUnitConversion: (state, action) => {
      state.data = action.payload;
    },
    updateUnitFlag: (state, action) => {
      state.unitFlag = action.payload;
    },
    updateUnitTypeFlow: (state, action) => {
      state.unitTypeFlow = action.payload;
    },
    updateUnitTypeTemp: (state, action) => {
        state.unitTypeTemp = action.payload;
    },
    updateUnitTypePressure: (state, action) => {
      state.unitTypePressure = action.payload;
    },
    updateUnitTypeFlux: (state, action) => {
      state.unitTypeFlux = action.payload;
    },
    updateUnitTypeArea: (state, action) => {
      state.unitTypeArea = action.payload;
    },
    updateUnitTypeContentration: (state, action) => {
      state.unitTypeContentration = action.payload;
    },
    updateUnitTypeDensity: (state, action) => {
        state.unitTypeDensity = action.payload;
    },  
    updateUnitTypeLength: (state, action) => {
      state.unitTypeLength = action.payload;
    },
    updateUnitTypePower: (state, action) => {
        state.unitTypePower = action.payload;
    },
    updateUnitTypeSVelocity: (state, action) => {
      state.unitTypeSVelocity = action.payload;
    },
    updateUnitTypeSVolume: (state, action) => {
      state.unitTypeSVolume = action.payload;
    },
    updateUnitTypeRVolume: (state, action) => {
      state.unitTypeRVolume = action.payload;
    },
    updateUnitTypeCVolume: (state, action) => {
      state.unitTypeCVolume = action.payload;
    },
    updateUnitTypeRegeneration: (state, action) => {
      state.unitTypeRegeneration = action.payload;
    },
    updateUnitTypeLVelocity: (state, action) => {
      state.unitTypeLVelocity = action.payload;
    },
    updateUnitTypeWeight: (state, action) => {
        state.unitTypeWeight = action.payload;
    },
    updateUnitTypeConductivity: (state, action) => {
      state.unitTypeConductivity = action.payload;
    },
    updateUnitTypeGasFlow: (state, action) => {
      state.unitTypeGasFlow = action.payload;
    },
    updateUnitTypeOrganic: (state, action) => {
      state.unitTypeOrganic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGUnitConversion,updateUnitFlag,updateUnitTypeFlow,updateUnitTypeTemp,updateUnitTypePressure, updateUnitTypeFlux, updateUnitTypeArea, updateUnitTypeContentration, updateUnitTypeDensity,updateUnitTypeLength,updateUnitTypePower,updateUnitTypeSVelocity,updateUnitTypeSVolume,updateUnitTypeRVolume,updateUnitTypeCVolume,updateUnitTypeRegeneration,updateUnitTypeLVelocity,updateUnitTypeWeight,updateUnitTypeConductivity,updateUnitTypeGasFlow,updateUnitTypeOrganic} = GlobalUnitConversionSlice.actions;

export default GlobalUnitConversionSlice.reducer;
