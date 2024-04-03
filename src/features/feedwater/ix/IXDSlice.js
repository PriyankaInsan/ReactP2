import { createSlice } from "@reduxjs/toolkit";
const objIXInitialization = {
  userID: 0,
  projectID: 0,
  caseID: 0,
  treatmentName: null,
  treatmentObjID: null,
  fromTreatmentObjId: null,
  treatmentSeqNo: 0,
  caseTreatmentID: null,
  recoveryTypeId: 0,
  recovery: 0,
  feed: 0,
  automatic: 0,
  recoveryRO: 0,
  selectedProcessID: 0,
  validDesignID: 0,
  ixSaveModelingObjectiveID: 0,
  // flag_Evaluate_Type: false,
  // compartmentVessel: false,
  newPlant_ind: true, //flag evaluate
  evaluteExisting_ind: false,
  plant_to_Upcore_ind: false,
  evaluateExisiting_ind_RuntimeFixed: true,
  evaluateExisiting_ind_RuntimeOptimized: false,
  retrofitToUpcore_ind_RuntimeFixed: true,
  retrofitToUpcore_ind_RuntimeOptimized: false,
  trains_Online: null,
  trains_StandBy: null,
  ixSaveTrainConfigurationID: 0,
  // online: 0,
  // standBy: 0,
  bufferTank_ind: null,
  bypassed: 0, //bypassedfrac
  no_Buffer_Tank_ind: null,
  ixSaveVesselRegenID: 0,
  cationResin: null,
  anionResin: null,
  vessel1: null,
  vessel2: null,
  vessel3: null,
  vessel4: null,
  degasifation_ind: null,
  selectedEffluent: 0,
  effluentValue: 0,
  location: 0,
  selectedResinList: [],
  resinSelTradeIDList: [],
  listRegenConds: [],
  listAdvRegen: [],
  ixsaveEquipmentId: 0,
  pdExtPiping: 0,
  pdIntDistributor: 0,
  effluentPressure: 0,
  tankTemperature: 0,
  backwashTowerDiameter: 0,
  sacRegenVesselDia: 0,
  sbaRegenVesselDia: 0,
  avgNa: null,
  edtPtNa: null,
  uomNa: null,
  avgConductivity: null,
  edtPtConductivity: null,
  regDoseSafetyFactor: null,
  regDoseOverrun: null,
  regDoseSafetyFactor2: null,
  regDose: null,
  overAllEficiency: null,
  naturalEffect_ind: null,
  overRunComputation_ind: null,
  operatingCycle_Lenght_txt: null,
  operatingCycle_Length_Rb_ind: null,
  space_velocity_Rb_ind: null,
  space_velocity_txt: null,
  hrs_Day_ind: true,
  perberdtime_ind: null,
  listFinalParamAdj: [
    {
      resinType: "final",
      resinId: 0,
      vesselNo: 0,
      resinVolumeAsDelivered: 0,
      vesselDiameter: 0,
      resinBedHeightAsDelivered: 0,
      resinBedStandardHeight: 0,
      resinBedHeightAsExhausted: 0,
      resinBedHeightAsRegenerated: 0,
      inertResinVolume: 0,
      inertBedHeight: 0,
      vesselCylindricalHeight: 0,
      vesselWallThickness: 0,
      pressureDropwithRecomQty: 0,
      resinPackagingSize: 0,
      ixfpaRadioButtonID: 0,
    },
  ],
  existingPlantDescription: [
    {
      resinType: "existing",
      resinId: 0,
      vesselNo: 0,
      resinVolumeAsDelivered: 0,
      vesselDiameter: 0,
      resinBedHeightAsDelivered: 0,
      resinBedStandardHeight: 0,
      resinBedHeightAsExhausted: 0,
      resinBedHeightAsRegenerated: 0,
      inertResinVolume: 0,
      inertBedHeight: 0,
      vesselCylindricalHeight: 0,
      vesselWallThickness: 0,
      pressureDropwithRecomQty: 0,
      resinPackagingSize: 0,
      ixfpaRadioButtonID: 0,
    },
  ],
  listProductQualityandregeneration: [
    {
      productQualityDoseID: 0,
      resinRegenerationID: 0,
      speciesLblNameID: 0,
      averageSpeciesVal: 0,
      endpoingSpeciesVal: 0,
      averageConductivityVal: 0,
      endpointConductivityVal: 0,
      speciesTwoLblNameID: 0,
      regenerantDoseLbl1ID: 0,
      regeneratDoseVal1: 0,
      regenerantDoseLbl2ID: 0,
      regenerantDoseLbl4ID: 0,
      regenerantDoseVal2: 0,
      regenerantDoseVal3: 0,
      regenerantDoseVal4: 0,
      overAllEfficiency: 0,
      overAllComputation: 0,
      doseOptimization: 0,
      naturalEffect: 0,
      saftyFactorLbl: 0,
      saftyFactorVal: 0.95,
      speciesUnit: 0,
      volume: null,
      flowRate: null,
      time: null,
      regenerationRatio: null,
    },
    {
      productQualityDoseID: 0,
      resinRegenerationID: 0,
      speciesLblNameID: 0,
      averageSpeciesVal: 0,
      endpoingSpeciesVal: 0,
      averageConductivityVal: 0,
      endpointConductivityVal: 0,
      speciesTwoLblNameID: 0,
      regenerantDoseLbl1ID: 0,
      regeneratDoseVal1: 0,
      regenerantDoseLbl2ID: 0,
      regenerantDoseLbl4ID: 0,
      regenerantDoseVal2: 0,
      regenerantDoseVal3: 0,
      regenerantDoseVal4: 0,
      overAllEfficiency: 0,
      overAllComputation: 0,
      doseOptimization: 0,
      naturalEffect: 0,
      saftyFactorLbl: 0,
      saftyFactorVal: 0.95,
      speciesUnit: 0,
      volume: null,
      flowRate: null,
      time: null,
      regenerationRatio: null,
    },
  ],
};
const sba = [
  {
    ResinId: 176,
    ResinName: "AmberLite™ HPR4100 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 177,
    ResinName: "AmberLite™ HPR4200 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 179,
    ResinName: "AmberLite™ HPR4580 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 180,
    ResinName: "AmberLite™ HPR4700 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 182,
    ResinName: "AmberLite™ HPR4780 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 183,
    ResinName: "AmberLite™ HPR4800 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 185,
    ResinName: "AmberLite™ HPR4811 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 186,
    ResinName: "AmberLite™ HPR550 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 196,
    ResinName: "AmberLite™ HPR9100 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 197,
    ResinName: "AmberLite™ HPR9200 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 24,
    ResinName: "AmberLite™ IRA402 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 26,
    ResinName: "AmberLite™ IRA410 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 27,
    ResinName: "AmberLite™ IRA458 Cl",
    IxionicFormId: 4,
  },
  {
    ResinId: 36,
    ResinName: "AmberLite™ IRA910 Cl",
    IxionicFormId: 4,
  },
];

const sca = [
  {
    ResinId: 165,
    ResinName: "AmberLite™ HPR1200 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 167,
    ResinName: "AmberLite™ HPR1300 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 170,
    ResinName: "AmberLite™ HPR1600 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 171,
    ResinName: "AmberLite™ HPR2000 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 172,
    ResinName: "AmberLite™ HPR252 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 173,
    ResinName: "AmberLite™ HPR2800 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 174,
    ResinName: "AmberLite™ HPR2900 H",
    IxionicFormId: 0,
  },
  {
    ResinId: 201,
    ResinName: "AmberLite™ IRC120 H",
    IxionicFormId: 0,
  },
];
const vesselFlags = {
  vesselflag1: true,
  vesselflag2: true,
  vesselflag3: true,
  vesselflag4: true,
};
const hasError = [
  { id: 1, hasError: false },
  { id: 2, hasError: false },
  { id: 3, hasError: false },
  { id: 4, hasError: false },
  { id: 5, hasError: false },
  { id: 6, hasError: false },
  { id: 7, hasError: false },
  { id: 8, hasError: false },
  { id: 9, hasError: false },
];
const objDemineralization = [];
const objVessel = [];
const productValidation = {
  CationValue: null,
  AnionValue: null,
  VesselValue: null,
};
const objResinData = {
  WAC: null,
  WBA: null,
  SAC: null,
  SBA: null,
  inert1: null,
  inert2: null,
  resinId1: null,
  resinId2: null,
  resinId3: null,
  resinId4: null,
};
const initialState = {
  tabletMenuIcon: false,
  ixTabletView: "",
  data: objIXInitialization,
  temdata: objIXInitialization,
  productValidation: productValidation,
  evaluateExistFlag: false,
  caseFlag: false,
  modeling: "NewPlant",
  newDesignExist: false,
  viewReport: "false",
  existingNew: "false",
  calcEngData: "false",
  resinName1: null,
  resinName2: null,
  resinName3: null,
  resinName4: null,
  inert1: null,
  inert2: null,
  selectedcationResign: null,
  selectedanionResign: null,
  resinData: objResinData,
  Demineralization: objDemineralization,
  vesselData: objVessel,
  listFinalParamAdj: [
    {
      resinType: "final",
      resinId: 0,
      vesselNo: 0,
      resinVolumeAsDelivered: 0,
      vesselDiameter: 0,
      resinBedHeightAsDelivered: 0,
      resinBedStandardHeight: 0,
      resinBedHeightAsExhausted: 0,
      resinBedHeightAsRegenerated: 0,
      inertResinVolume: 0,
      inertBedHeight: 0,
      vesselCylindricalHeight: 0,
      vesselWallThickness: 0,
      pressureDropwithRecomQty: 0,
      resinPackagingSize: 0,
      ixfpaRadioButtonID: 0,
    },
  ],
  existingPlantDescription: [
    {
      resinType: "existing",
      resinId: 0,
      vesselNo: 0,
      resinVolumeAsDelivered: 0,
      vesselDiameter: 0,
      resinBedHeightAsDelivered: 0,
      resinBedStandardHeight: 0,
      resinBedHeightAsExhausted: 0,
      resinBedHeightAsRegenerated: 0,
      inertResinVolume: 0,
      inertBedHeight: 0,
      vesselCylindricalHeight: 0,
      vesselWallThickness: 0,
      pressureDropwithRecomQty: 0,
      resinPackagingSize: 0,
      ixfpaRadioButtonID: 0,
    },
  ],
  //   {
  //     vessel: [
  //       {
  //         resinType: "existing",
  //         resinId: 0,
  //         vesselNo: 0,
  //         resinVolumeAsDelivered: 4.94,
  //         vesselDiameter: 0,
  //         resinBedHeightAsDelivered: 0,
  //         resinBedStandardHeight: 0,
  //         resinBedHeightAsExhausted: 0,
  //         resinBedHeightAsRegenerated: 0,
  //         inertResinVolume: 0,
  //         inertBedHeight: 0,
  //         vesselCylindricalHeight: 0,
  //         vesselWallThickness: 0,
  //         pressureDropwithRecomQty: 0,
  //         resinPackagingSize: 0,
  //         ixfpaRadioButtonID: 0,
  //       },
  //       {
  //         resinType: null,
  //         resinId: null,
  //         vesselNo: null,
  //         resinVolumeAsDelivered: 2,
  //         vesselDiameter: 2,
  //         resinBedHeightAsDelivered: 2,
  //         resinBedStandardHeight: 2,
  //         resinBedHeightAsExhausted: 2,
  //         resinBedHeightAsRegenerated: 2,
  //         inertResinVolume: 2,
  //         inertBedHeight: 2,
  //         freeBoard: 2,
  //         vesselCylindricalHeight: 2,
  //         vesselWallThickness: 2,
  //         pressureDropwithRecomQty: 2,
  //         resinPackagingSize: 2,
  //         ixfpaRadioButtonID: 2,
  //       },
  //     ],
  //   },
  //   {
  //     vessel: [
  //       {
  //         resinType: "existing",
  //         resinId: 0,
  //         vesselNo: 0,
  //         resinVolumeAsDelivered: 4.94,
  //         vesselDiameter: 0,
  //         resinBedHeightAsDelivered: 0,
  //         resinBedStandardHeight: 0,
  //         resinBedHeightAsExhausted: 0,
  //         resinBedHeightAsRegenerated: 0,
  //         inertResinVolume: 0,
  //         inertBedHeight: 0,
  //         vesselCylindricalHeight: 0,
  //         vesselWallThickness: 0,
  //         pressureDropwithRecomQty: 0,
  //         resinPackagingSize: 0,
  //         ixfpaRadioButtonID: 0,
  //       },
  //       {
  //         resinType: null,
  //         resinId: null,
  //         vesselNo: null,
  //         resinVolumeAsDelivered: 2,
  //         vesselDiameter: 2,
  //         resinBedHeightAsDelivered: 2,
  //         resinBedStandardHeight: 2,
  //         resinBedHeightAsExhausted: 2,
  //         resinBedHeightAsRegenerated: 2,
  //         inertResinVolume: 2,
  //         inertBedHeight: 2,
  //         freeBoard: 2,
  //         vesselCylindricalHeight: 2,
  //         vesselWallThickness: 2,
  //         pressureDropwithRecomQty: 2,
  //         resinPackagingSize: 2,
  //         ixfpaRadioButtonID: 2,
  //       },
  //     ],
  //   },
  // ],
  sacData: sca,
  sbaData: sba,
  selectedResinColoumn1: {
    ixResinID1: 0,
    inert: 0,
    ixResinID2: 0,
    ionicFormSelected_ind: true,
    columnNo: 1,
    defaultPackagingSize: 0,
  },
  selectedResinColoumn2: {
    ixResinID1: 0,
    inert: 0,
    ixResinID2: 0,
    ionicFormSelected_ind: true,
    columnNo: 2,
    defaultPackagingSize: 0,
  },
  cationResinConditions: {
    regenerantID: 0,
    temperature: 0,
    temperatureID: 0,
    step1_ind: true,
    step2_ind: false,
    step3_ind: false,
    step1Con: 0,
    step2Con: 0,
    step3Con: 0,
    step1DosFrac: 0,
    step2DosFrac: 0,
    step3DosFrac: 0,
    serviceWater: null,
    backwash: null,
    chemicalID: "",
    // regConcMax: 0,
    // regConcMin: 0,
  },
  anionResinConditions: {
    regenerantID: 0,
    temperature: 0,
    temperatureID: 0,
    step1_ind: true,
    step2_ind: false,
    step3_ind: false,
    step1Con: 0,
    step2Con: 0,
    step3Con: 0,
    step1DosFrac: 0,
    step2DosFrac: 0,
    step3DosFrac: 0,
    serviceWater: null,
    backwash: null,
    chemicalID: "",
  },
  updateCationObject: {
    BDW: false,
    BFW: false,
    DW: false,
    FW: false,
  },
  updateAnionObject: {
    BDW: false,
    DW: false,
  },
  updateCationRegenData: {
    vesselID: null,
    bwFrequency: null,
    bwExpansion: null,
    bwDuration: null,
    compactionDuration: null,
    regenerationVelocity: null,
    regenerationFactor: null,
    displacementFlow: null,
    displacementVolume: null,
    fatRinseRecycle: null,
    fatRinseVolume: null,
    settingDuration: null,
  },
  updateAnionRegenData: {
    vesselID: null,
    bwFrequency: null,
    bwExpansion: null,
    bwDuration: null,
    compactionDuration: null,
    regenerationVelocity: null,
    regenerationFactor: null,
    displacementFlow: null,
    displacementVolume: null,
    fatRinseRecycle: null,
    fatRinseVolume: null,
    settingDuration: null,
  },

  updateAdvCationObject: {
    bwFrequency: false,
    bwExpansion: false,
    bwDuration: false,
    compactionDuration: false,
    regenerationVelocity: false,
    regenerationFactor: false,
    displacementFlow: false,
    displacementVolume: false,
    fatRinseRecycle: false,
    fatRinseVolume: false,
    settingDuration: false,
  },
  updateAdvAnionObject: {
    bwFrequency: false,
    bwExpansion: false,
    bwDuration: false,
    compactionDuration: false,
    regenerationVelocity: false,
    regenerationFactor: false,
    displacementFlow: false,
    displacementVolume: false,
    fatRinseRecycle: false,
    fatRinseVolume: false,
    settingDuration: false,
  },
  updateCationDataAdvRegen: {},
  updateAnionDataAdvRegen: {},
  jsonResinData: [],
  regenerantListValue: {},
  hasError: hasError,
  vesselFlags,
  resinNameCalc: {
    WAC: null,
    WBA: null,
    SAC: null,
    SBA: null,
  },
  resinInertCalc: {
    Inert1: null,
    Inert2: null,
  },
  resinIonicCalc: {
    WACIon: 5,
    WBAIon: 5,
    SACIon: 5,
    SBAIon: 5,
  },
  vesselCalcName: {
    cationName: "",
    anionName: "",
  },
  calcOverrun: [],
  calcChemDose: [],
  isIXDDataUpdated: false,
};
const validateResinSelection = (data1, data2) => {
  let hasError =
    data1?.ixResinID1 === -1 ||
    data1?.ixResinID2 === -1 ||
    data2?.ixResinID1 === -1 ||
    data2?.ixResinID2 === -1;

  return { id: 3, hasError: hasError };
};

export const IXDSlice = createSlice({
  name: "IXStore",
  initialState,
  reducers: {
    updateIXMenuIconHeader: (state, action) => {
      state.tabletMenuIcon = action.payload;
    },
    updateTabletIXMenuIcon: (state, action) => {
      state.ixTabletView = action.payload;
      console.log("check IX menu icon", (state.ixTabletView = action.payload));
    },
    updateIXStore: (state, action) => {
      state.data = action.payload;
      state.isIXDDataUpdated = true;
    },
    updateResinData: (state, action) => {
      state.resinData = action.payload;
    },
    updateDemineralization: (state, action) => {
      state.Demineralization = action.payload;
    },
    updateResinName1: (state, action) => {
      state.resinName1 = action.payload;
    },
    updateResinName2: (state, action) => {
      state.resinName2 = action.payload;
    },
    updateResinName3: (state, action) => {
      state.resinName3 = action.payload;
    },
    updateResinName4: (state, action) => {
      state.resinName4 = action.payload;
    },
    updateSelectedCationResin: (state, action) => {
      state.selectedcationResign = action.payload;
    },
    updateSelectedAnionResin: (state, action) => {
      state.selectedanionResign = action.payload;
    },
    updatelistFinalParamAdj: (state, action) => {
      state.listFinalParamAdj = action.payload;
    },
    // updatelistFinalParamAdjFeature: (state, action) => {
    //   state.listFinalParamAdjFeature = action.payload;
    // },
    // updatelistFinalParamAdjFeature: (state, action) => {
    //   const {index, vesselIndex, field,value}= action.payload;
    //   state[index].vessel[vesselIndex][field] = value;
    // },
    updateExisting: (state, action) => {
      state.existingPlantDescription = action.payload;
    },
    // updateExistingFeatured: (state, action) => {
    //   state.existingPlantDescriptionFeatured = action.payload;
    // },

    updateTempixdStore: (state, action) => {
      state.temdata = action.payload;
    },
    updateProductQualityRegenerantDose: (state, action) => {
      state.data.listProductQualityandregeneration = action.payload;
      state.isIXDDataUpdated = true;
    },
    updateProductQualityRegenerantDoseCation: (state, action) => {
      state.data.listProductQualityandregeneration[0] = action.payload;
      state.isIXDDataUpdated = true;
    },
    updateProductQualityRegenerantDoseAnion: (state, action) => {
      state.data.listProductQualityandregeneration[1] = action.payload;
      state.isIXDDataUpdated = true;
    },
    updateVesselforRange: (state, action) => {
      state.productValidation = action.payload;
    },
    updateCationforProduct: (state, action) => {
      state.productValidation = action.payload;
    },
    updateAnionforProduct: (state, action) => {
      state.productValidation = action.payload;
    },
    updateSelectedResin: (state, action) => {
      const selResin = action.payload;
      if (Array.isArray(selResin)) {
        state.data.selectedResinList = selResin;
      } else {
        const colIndex = state.data.selectedResinList.findIndex(
          (item) => item.columnNo === selResin.columnNo
        );
        if (colIndex !== -1) {
          state.data.selectedResinList[colIndex] = {
            ...state.data.selectedResinList[colIndex],
            ...selResin,
          };
          // state.hasError[2] = validateResinSelection(
          //   state.data.selectedResinList[0],
          //   state.data.selectedResinList[1]
          // );
        } else {
          state.data.selectedResinList.push(selResin);
          // if (state.data.selectedResinList.length === 0) {
          //   state.hasError[2] = { id: 3, hasError: true };
          // }
        }
      }
      state.isIXDDataUpdated = true;
    },
    updateSacData: (state, action) => {
      state.sacData = action.payload;
    },
    updateSbaData: (state, action) => {
      state.sbaData = action.payload;
    },
    updateselectedResinColoumn1: (state, action) => {
      state.selectedResinColoumn1 = action.payload;
    },

    updateselectedResinColoumn2: (state, action) => {
      state.selectedResinColoumn2 = action.payload;
    },
    updateCationInitialization: (state, action) => {
      const selectedResin = action.payload;
      if (state.data.listRegenConds.length === 0) {
        state.data.listRegenConds.unshift(selectedResin);
      } else {
        state.data.listRegenConds[0] = {
          ...state.data.listRegenConds[0],
          ...selectedResin,
        };
      }
      state.isIXDDataUpdated = true;
    },
    updateCationResin: (state, action) => {
      state.cationResinConditions = action.payload;
    },
    updateAnionInitialization: (state, action) => {
      const selectedResin = action.payload;
      if (state.data.listRegenConds.length === 0) {
        state.data.listRegenConds.splice(0, 0, "");
        state.data.listRegenConds.splice(1, 0, selectedResin);
      } else {
        state.data.listRegenConds[1] = {
          ...state.data.listRegenConds[1],
          ...selectedResin,
        };
      }
      state.isIXDDataUpdated = true;
    },
    updateAnionResin: (state, action) => {
      state.anionResinConditions = action.payload;
    },
    updateCationService: (state, action) => {
      state.updateCationObject = action.payload;
    },
    updateAnionService: (state, action) => {
      state.updateAnionObject = action.payload;
    },

    updateAdvCation: (state, action) => {
      state.updateAdvCationObject = action.payload;
    },
    updateAdvAnion: (state, action) => {
      state.updateAdvAnionObject = action.payload;
    },

    updateVessel: (state, action) => {
      state.vesselData = action.payload;
    },
    updateModeling: (state, action) => {
      state.modeling = action.payload;
    },
    updateEvaluateExistFlag: (state, action) => {
      state.evaluateExistFlag = action.payload;
    },
    updateCaseFlag: (state, action) => {
      state.caseFlag = action.payload;
    },
    updateNewDesignExist: (state, action) => {
      state.newDesignExist = action.payload;
    },
    updateViewReport: (state, action) => {
      state.viewReport = action.payload;
    },
    updateCalcEngData: (state, action) => {
      state.calcEngData = action.payload;
    },
    updateExistingNew: (state, action) => {
      state.existingNew = action.payload;
    },
    updateError: (state, action) => {
      const id = action.payload;
      const selectedObject = state.hasError.find((obj) => obj.id === id);
      if (selectedObject) {
        selectedObject.hasError = true;
      }
    },
    updateAdvRegenCationdata: (state, action) => {
      state.updateCationDataAdvRegen = action.payload;
    },
    updateAdvRegenAniondata: (state, action) => {
      state.updateAnionDataAdvRegen = action.payload;
    },
    updateCationRegen: (state, action) => {
      const selectedRegen = action.payload;
      if (state.data.listAdvRegen.length === 0) {
        state.data.listAdvRegen.unshift(selectedRegen);
      } else {
        state.data.listAdvRegen[0] = {
          ...state.data.listAdvRegen[0],
          ...selectedRegen,
        };
      }
      state.isIXDDataUpdated = true;
    },
    updateAnionRegen: (state, action) => {
      const selectedRegen = action.payload;
      if (state.data.listAdvRegen.length === 0) {
        state.data.listAdvRegen.splice(0, 0, "");
        state.data.listAdvRegen.splice(1, 0, selectedRegen);
      } else {
        state.data.listAdvRegen[1] = {
          ...state.data.listAdvRegen[1],
          ...selectedRegen,
        };
      }
      state.isIXDDataUpdated = true;
    },
    updateResinDropDownData: (state, action) => {
      state.jsonResinData = action.payload;
    },
    updateRegenerantList: (state, action) => {
      state.regenerantListValue = action.payload;
    },
    updateVesselFlags: (state, action) => {
      state.vesselFlags = action.payload;
    },
    updateResinNameCalc: (state, action) => {
      state.resinNameCalc = action.payload;
    },
    updateResinInertNameCalc: (state, action) => {
      state.resinInertCalc = action.payload;
    },
    updateResinIonicCalc: (state, action) => {
      state.resinIonicCalc = action.payload;
    },
    updateVesselNameCalc: (state, action) => {
      state.vesselCalcName = action.payload;
    },
    updateAfterReportChemDoseData: (state, action) => {
      state.calcChemDose = action.payload;
    },
    updateAfterReportOverRunDoseData: (state, action) => {
      state.calcOverrun = action.payload;
    },
    setIXDUpdate: (state, action) => {
      state.isIXDDataUpdated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateIXStore,
  updateExisting,
  updateResinData,
  updateDemineralization,
  updateResinName1,
  updateResinName2,
  updateResinName3,
  updateResinName4,
  updateSelectedCationResin,
  updateSelectedAnionResin,
  updatelistFinalParamAdj,
  updateSelectedResin,
  updateSacData,
  updateselectedResinColoumn1,
  updateselectedResinColoumn2,
  updateSbaData,
  updateCationInitialization,
  updateCationResin,
  updateAnionResin,
  updateAnionInitialization,
  updateModeling,
  updateNewDesignExist,
  updateEvaluateExistFlag,
  updateCaseFlag,
  updateViewReport,
  updateCalcEngData,
  updateExistingNew,
  updateVessel,
  updateCationService,
  updateAnionService,
  updateError,
  updateDisabledResinData,
  updateProductQualityRegenerantDose,
  updateRegenerant,
  updateAdvRegenCationdata,
  updateAdvRegenAniondata,
  updateCationRegen,
  updateAnionRegen,
  updateAdvCation,
  updateAdvAnion,
  updateVesselforRange,
  updateJsonResin,
  updateResinDropDownData,
  updateRegenerantList,
  updateVesselFlags,
  updateResinNameCalc,
  updateResinInertNameCalc,
  updateResinIonicCalc,
  updateVesselNameCalc,
  updateAfterReportChemDoseData,
  updateAfterReportOverRunDoseData,
  updateProductQualityRegenerantDoseCation,
  updateProductQualityRegenerantDoseAnion,
  updateTabletIXMenuIcon,
  updateIXMenuIconHeader,
  setIXDUpdate,
} = IXDSlice.actions;

export default IXDSlice.reducer;
