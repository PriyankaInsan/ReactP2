import { createSlice } from "@reduxjs/toolkit";
const  ufDefaultData= {
  waterSubTypeID:"",
  designTemp:"",
  isWaterSubTypeChanged:"false",
  isDesignTempChanged:"false",
  userID: "",
  projectID: "",
  caseID: "",
  treatmentName: "UF",
  treatmentObjID: 1,
  fromTreatmentObjID: 0,
  treatmentSeqNo: 1,
  recoveryTypeID: 0,
  recovery: 0,
  feed: 0,
  automatic: false,
  recoveryRo: 0,
  compactionTemperature: 0,
  isCompactionFlux: false,
  uFDesignFluxID: 0,
  caseTreatmentID: 0,
  filtrateFlux: 0,
  backwashFlux: 0,
  cEBFlux: 0,
  forwardFlushFlow: 0,
  airFlow: 0,
  uFModuleID: 0,
  aerationAirFlow: 0,
  flow_FF1: 0,
  flow_FF2: 0,
  flow_FF3: 0,
  flow_FF4: 0,
  aDBWDisplacement: 0,
  fTLDisplacement: 0,
  maxAirProcPressure: 0,
  typicalWaitDuration_Dupont: 0,
  typicalPumpRamp_Dupont: 0,
  typicalWaitDuration_Inge: 0,
  typicalPumpRamp_Inge: 0,
  typicalWaitDuration_Memcor: 0,
  typicalPumpRamp_Memcor: 0,
  uFDesignCycleIntervalsID: 0,
  backwash_design: 0,
  airScour_design: 0,
  acidCEB: 0,
  alkaliOxidantCEB: 0,
  cIP: 0,
  miniCIP: 0,
  disinfectionCEB: 0,
  t_CEB_Rinse12: 0,
  t_CEB_Rinse2: 0,
  uFBWCEBStandbyOptionID: 1,
  bWPerCEBstandbyTrains: 0,
  uFConfigurationID: 0,
  uFCIPStandbyTrainOptionID: 0,
  cIPstandbyTrains: 0,
  integraPackDesign_Ind: false,
  drinkingWaterInd: false,
  drinkingWater_Ind: false,
  membraneintergrityoption_Ind: false,
  modulesPerSkid: 0,
  modulesPerTrain: 0,
  offlinetimepertrain: 0,
  onlineTrains: 0,
  redundantStandbyTrains: 0,
  skids: 0,
  skidsPerTrain: 0,
  uFStorageTankOptionID: 0,
  totalModules: 0,
  totalTrains: 0,
  redundantTrains: 0,
  isBWCEBStandbyTrainsEnabled: false,
  radTR1: false,
  radTR2: false,
  radTR3: false,
  radMR1: false,
  radMR2: false,
  radMR3: false,
  uFFiltrationID: 0,
  backwash_Filtration: 0,
  acidCEB_Filtration: 0,
  alkaliCEB_Filtration: 0,
  cIP_Filtration: 0,
  miniCIP_Filtration: 0,
  strainerRecovery: 0,
  strainerSize: 0,
  uFTanksID: 0,
  chemicalStorageTime: 0,
  bWTankRefillRate: 0,
  filterateTank: 0,
  bWTank: 0,
  cIPTank: 0,
  uFEquipmentPressureID: 0,
  maxAirScourPressure: 0,
  filteratePressure: 0,
  nonIntegraPacTrainPresDrop: 0,
  integraPacFiltrationPreDrop: 0,
  backwashPipingPreDrop: 0,
  cIPPipingPreDrop: 0,
  uFPowerID: 0,
  pLCPowerReqPertrain: 0,
  volvePowerReqPerTrain: 0,
  uFValvesID: 0,
  valvesPerTrain: 0,
  valveOpenCloseDuration: 0,
  uFCEBID: 0,
  uFCEBWaterTypeID: 0,
  ceb_AirScour: 0,
  backWash1_CEB: 0,
  backWash2_CEB: 0,
  cEBTemperature: 0,
  chemicalSoakingDuration_CEB: 0,
  drain: 0,
  forwardFlush: 0,
  designTemperature_Ind: false,
  ceb_LSI: 0,
  sameAsBackwash_Ind: false,
  alkaliEnabled_Ind_CEB: true,
  organicEnabled_Ind_CEB: true,
  oxidantEnabled_Ind_CEB: true,
  mineralEnabled_Ind_CEB: true,
  disOxidantEnabled_Ind_CEB: false,
  mineralValue: 0,
  organicValue: 0,
  oxidantValue: 0,
  alkaliValue: 0,
  disOxidantValue: 0,
  alkaliChemId: "0",
  mineralChemId: "0",
  organicChemId: "0",
  oxidantChemId: "0",
  disOxidantChemId: "0",
  alkaliValueInPh_Ind: false,
  mineralValueInPh_Ind: false,
  uFCIPID: 0,
  bWStepInCIP: 0,
  chemicalSoakingDuration_CIP: 0,
  uFCIPWaterTypeID: 0,
  heatingStepDuration: 0,
  cip_LSI: 0,
  recycleDuration: 0,
  recycleFlowRate: 0,
  recycleTemperature: 0,
  rinseBWCycle: 0,
  cIPRinseSoakCycle: 0,
  alkaliEnabled_Ind_CIP: true,
  organicEnabled_Ind_CIP: true,
  oxidantEnabled_Ind_CIP: true,
  mineralEnabled_Ind_CIP: true,
  oxidantEnabled2_Ing_CIP: false,
  mineralValue_CIP: 0,
  organicValue_CIP: 0,
  oxidantValue_CIP: 0,
  alkaliValue_CIP: 0,
  cIPOxidant2Value: 0,
  alkaliChemId_CIP: "0",
  mineralChemId_CIP: "0",
  organicChemId_CIP: "0",
  oxidantChemId_CIP: "0",
  oxidant2ChemId: "0",
  alkaliValueInPh_Ind_CIP: false,
  mineralValueInPh_Ind_CIP: true,
  uFBackWashID: 0,
  bWTemperature: 0,
  bWDesignTemperature_Ind: true,
  uFBWWaterTypeID: 0,
  uFBWFlushWaterTypeID: 0,
  uFBWProtocolID: 0,
  oxidantID: "0",
  oxidantDosage: 0,
  backwash_AirScour: 0,
  backWash1_backWash: 0,
  backWash2_backWash: 0,
  drain_backWash: 0,
  forwardFlush_backWash: 0,
  lF: 0,
  t_FTL: 0,
  t_BWBtnAirScour: 0,
  uFMiniCIPID: 0,
  bWStepInMiniCIP: 0,
  rinseBWCycle_MiniCIP: 0,
  chemicalSoakingDuration_MiniCIP: 0,
  uFMiniCIPWaterTypeID: 0,
  heatingStepDuration_MiniCIP: 0,
  lSI_MiniCIP: 0,
  recycleDuration_MiniCIP: 0,
  recycleFlowRate_MiniCIP: 0,
  recycleTemperature_MiniCIP: 0,
  cIPRinseSoakCycle_MiniCIP: 0,
  alkaliEnabled_Ind_MiniCIP: false,
  organicEnabled_Ind_MiniCIP: false,
  oxidantEnabled_Ind_MiniCIP: false,
  mineralEnabled_Ind_MiniCIP: false,
  oxidantEnabled2_Ing_MiniCIP: false,
  mineralValue_MiniCIP: 0,
  organicValue_MiniCIP: 0,
  oxidantValue_MiniCIP: 0,
  alkaliValue_MiniCIP: 0,
  cIPOxidant2Value_MiniCIP: 0,
  alkaliChemId_MiniCIP: "1",
  mineralChemId_MiniCIP: "1",
  organicChemId_MiniCIP: "1",
  oxidantChemId_MiniCIP: "1",
  oxidant2ChemId_MiniCIP: "1",
  alkaliValueInPh_Ind_MiniCIP: true,
  mineralValueInPh_Ind_MiniCIP: true,
};
const initialState = {
  blankData:ufDefaultData,
  headerMenuIcon:"",
  tabletMenuIcon:"",
  tabletMenuIconStatus:false,
  ufTechnologies: [],
  ufModules: [],
  ufInputRangeConfig: [],
  ufInputRangeConfigByWaterType: [],
  ufFluxGuideline: [],
  ufModuleFlowVM: [],
  ufModulePressureRatingVM: [],
  ufStandByOptions: [],
  ufStorageTankOptions: [],
  bwWaterSource: [],
  forwardFlushWaterSource: [],
  bwProtocol: [],
  ufDoseGuidline: [],
  oxidantChemicals: [],
  defaultInputRangeConfig: ufDefaultData,
  data:ufDefaultData,
  activeUFModule: {
    av: "",
    bores: "",
    companyId: "",
    companyName: "",
    d: "",
    dId: "",
    dOd: "",
    displayOrder: "",
    drinkingWaterInd: "",
    ends: "",
    fiberLength: "",
    fiberMaterial: "",
    fibers: "",
    flowPattern: "",
    integraFlowInd: "",
    integraPacInd: "",
    l: "",
    l1: "",
    l2: "",
    l3: "",
    memRack: "",
    moduleArea: "",
    moduleGroupId: "",
    moduleLongName: "",
    moduleName: "",
    moduleType: "",
    newModuleLongName: "",
    orientation: "",
    productNo: "",
    shippingWeight: "",
    tRack: "",
    ufmoduleId: "",
    v: "",
    versionNo: "",
    w: "",
    weight: "",
    //pressureratingvm
    p0: "",
    s0: "",
    s10: "",
    s20: "",
    s30: "",
    s40: "",
    //moduleflowvm
    aS_Flow2_max: "",
    aS_Flow2_min: "",
    aS_Flow2_std: "",
    aS_Flow_max: "",
    aS_Flow_min: "",
    aS_Flow_std: "",
    cIP_Flow_max: "",
    cIP_Flow_min: "",
    cIP_Flow_std: "",
    fF2_Flow_max: "",
    fF2_Flow_min: "",
    fF2_Flow_std: "",
    fF3_Flow_max: "",
    fF3_Flow_min: "",
    fF3_Flow_std: "",
    fF4_Flow_max: "",
    fF4_Flow_min: "",
    fF4_Flow_std: "",
    fF_Flow_max: "",
    fF_Flow_min: "",
    fF_Flow_std: "",
    flux: "",
  },
  isForDrinkingWater: false,
  cebDropdownData: {
    waterType: [],
    chemicalType: {
      mineral: [],
      alkali: [],
      organic: [],
      oxidant: [],
      disOxidant: [],
    },
  },
  cipDropdownData: {
    waterType: [],
    chemicalType: {
      mineral: [],
      alkali: [],
      organic: [],
      oxidant: [],
      surfactant: [],
    },
  },
 
  sliderValue:22,
  sliderMin:6,
  sliderMax:22,
  calcEngineData: {},
  recommended_configs: [],
  defaultUFConfig: {},
  waterSubTypeFlag: false,
  callCalcEngineUFConfig:false,
  isCustomConfigAvail:false,
  isOfflineTimeChanged:false,
  activeTab:"Design",
  isUfDataUpdated:false,
};

export const UFSlice = createSlice({
  name: "UFStore",
  initialState,
  reducers: {
    updateMenuIconHeader:(state, action)=>{
      state.headerMenuIcon = action.payload;
    },
    updateTabletMenuIcon:(state, action)=>{
      state.tabletMenuIcon = action.payload;
    },
    updateTabletIconStatus:(state, action)=>{
      state.tabletMenuIconStatus = action.payload;
    },
    updateUFTechnologyList: (state, action) => {
      state.ufTechnologies = action.payload;
    },
    updateUFModuleList: (state, action) => {
      state.ufModules = action.payload;
    },
    updateSliderValue:(state,action)=>{
      state.sliderValue = action.payload;
    },
    updateMinMaxSliderValue:(state,action)=>{
      let {name,value} = action.payload;
      state[name]=value;
    },
    updatelstUfmoduleFlowVM: (state, action) => {
      state.ufModuleFlowVM = action.payload;
    },
    updatelstUFModulePressureRatingVM: (state, action) => {
      state.ufModulePressureRatingVM = action.payload;
    },
    updateUFInputRangeConfigByWaterType: (state, action) => {
      state.ufInputRangeConfigByWaterType = action.payload;
    },
    updateUFFluxGuideline: (state, action) => {
      state.ufFluxGuideline = action.payload;
    },
    updateActiveUFModule: (state, action) => {
      state.activeUFModule = action.payload;
    },
    updateRecommendedConfiguration: (state, action) => {
      state.recommended_configs = action.payload;
    },
    updateCallCalcEngineUFConfig: (state, action) => {
      state.callCalcEngineUFConfig = action.payload;
    },
    updateDefaultUFConfiguration: (state, action) => {
      state.callCalcEngineUFConfig = true;
      state.defaultUFConfig = action.payload;
      if (action.payload.onlineUnits == undefined) {
        //COMMENTIN OUT BELOW CODE - as no need to set default value if api failed, 
        //show previously inputed/selected value.

        //resetting Track Design Inputs with DB given Typical Values
        state.data.skidsPerTrain =
          state.defaultInputRangeConfig.skidsPerTrain.defaultValue;
        state.data.modulesPerSkid =
          state.defaultInputRangeConfig.modulesPerSkid.defaultValue;
        state.data.onlineTrains =
          state.defaultInputRangeConfig.onlineTrains.defaultValue;

        //Calculating modulesPerTrain based on default values
        const MODULES_PER_UNIT =
          parseInt(state.data.skidsPerTrain) *
          parseInt(state.data.modulesPerSkid);
        if (state.activeUFModule?.integraPacInd == true) {
          state.data.modulesPerTrain = MODULES_PER_UNIT;
        } else {
          state.data.modulesPerTrain = 1;
        }

        //Calculating totalModules based on default values
        let TOTAL_UNITS;
        if (state.data.uFBWCEBStandbyOptionID == 1) {
          TOTAL_UNITS =
            parseInt(state.data.onlineTrains) +
            parseInt(state.data.redundantTrains);
          
          state.data.uFStorageTankOptionID = 2; ////Backwash + Filtrate
        } else if (state.data.uFBWCEBStandbyOptionID == 2) {
          TOTAL_UNITS =
            parseInt(state.data.onlineTrains) +
            parseInt(state.data.redundantStandbyTrains) +
            parseInt(state.data.redundantTrains);
          state.data.uFStorageTankOptionID = 1; //Backwash Only
        }
        const TOTAL_MODULES =
          parseInt(TOTAL_UNITS) * parseInt(state.data.modulesPerTrain);
        state.data.totalModules = TOTAL_MODULES;

        state.data.redundantStandbyTrains = "0";
        state.data.totalTrains = TOTAL_UNITS;
      } else {
        if (state.activeUFModule?.integraPacInd !== undefined) {
          //setting configurations based on the defaultUFConfig slected - first row
          state.data.skidsPerTrain =
            state.defaultUFConfig?.racksPerUnit != undefined &&
            state.defaultUFConfig?.racksPerUnit != "" &&
            state.defaultUFConfig?.racksPerUnit;
          state.data.modulesPerSkid =
            state.defaultUFConfig?.modulesPerRack != undefined &&
            state.defaultUFConfig?.modulesPerRack != "" &&
            state.defaultUFConfig?.modulesPerRack;
          state.data.onlineTrains =
            state.defaultUFConfig?.onlineUnits != undefined &&
            state.defaultUFConfig?.onlineUnits != ""
              ? state.defaultUFConfig?.onlineUnits
              : state.data.onlineTrains;
          state.data.redundantStandbyTrains =
            state.defaultUFConfig?.standByUnits != undefined &&
            state.defaultUFConfig?.standByUnits != ""
              ? state.defaultUFConfig?.standByUnits
              : "0";
          state.data.totalTrains =
            state.defaultUFConfig?.totalUnits != undefined &&
            state.defaultUFConfig?.totalUnits != "" &&
            state.defaultUFConfig?.totalUnits;
          state.data.modulesPerTrain =
            (state.defaultUFConfig?.modulesPerUnit != undefined &&
              state.defaultUFConfig?.modulesPerUnit != "" &&
              state.defaultUFConfig?.modulesPerUnit) ||
            1;
          state.data.totalModules =
            state.defaultUFConfig?.totalModules != undefined &&
            state.defaultUFConfig?.totalModules != "" &&
            state.defaultUFConfig?.totalModules;
          if (state.activeUFModule?.integraPacInd == false) {
            //No need to show track design
            //resetting Track Design Inputs with DB given Typical Values
            state.data.skidsPerTrain =
              state.defaultInputRangeConfig.skidsPerTrain.defaultValue;
            state.data.modulesPerSkid =
              state.defaultInputRangeConfig.modulesPerSkid.defaultValue;
          }
        } else {
          console.log("NO MODULE SELECTED", state.activeUFModule);
        }
      }
    },
    updateIsForDrinkingWater: (state, action) => {
      state.isForDrinkingWater = action.payload;
      // state.isUfDataUpdated=true;

    },
    updateUfDoseGuidline: (state, action) => {
      state.ufDoseGuidline = action.payload;
    },
    updateUFStandByOptions: (state, action) => {
      state.ufStandByOptions = action.payload;
      // state.isUfDataUpdated=true;

    },
    updateUFStorageTankOptions: (state, action) => {
      state.ufStorageTankOptions = action.payload;
    },
    updateUFInputRangeConfig: (state, action) => {
      state.ufInputRangeConfig = action.payload;
    },
    updateBackWashOptions: (state, action) => {
      state.bwProtocol = action.payload.lstUFBWProtocolVMs;
      state.oxidantChemicals = action.payload.lstUFChemicalVM;
      state.bwWaterSource = action.payload.lstUFBWWaterTypeVMs;
      state.forwardFlushWaterSource = action.payload.lstUFBWFlushWaterTypeVMs;
    },
    updateUFStore: (state, action) => {
      state.data = action.payload;
      // state.isUfDataUpdated=true;
    },
    updateUFDefaultInputRangeConfig: (state, action) => {
      //considered ufInputRangeConfig and ufInputRangeConfigByWaterType for all fields other than Filtrate Flux
      //considerd ufFluxGuideline for FiltrateFlux
      state.defaultInputRangeConfig = action.payload;
    },
    updateDesignData: (state, action) => {
      let { target, value } = action.payload;
      state.data[target] = value;
      // state.isUfDataUpdated=true;
    },
    updateCebData: (state, action) => {
      let { target, value } = action.payload;
      state.data[target] = value;
      // state.isUfDataUpdated=true;
    },
    updateCipData: (state, action) => {
      let { target, value } = action.payload;
      state.data[target] = value;
      // state.isUfDataUpdated=true;
    },
    updateAdditionalData: (state, action) => {
      let { target, value } = action.payload;
      state.data[target] = value;
      // state.isUfDataUpdated=true;
    },
    handleCalcEngineResponse: (state, action) => {
      state.calcEngineData = action.payload;
    },
    handleOperatingFlux: (state, action) => {
      state.calcEngineData["flux_Filter_actual"] = action.payload?.flux_Filter_actual;
    },
    handleSameAsBackwash: (state, action) => {
      let flag = action.payload;
      let backWash1_CEB = state.defaultInputRangeConfig.backWash1_CEB;
      let backWash2_CEB = state.defaultInputRangeConfig.backWash2_CEB;

      state.data.drain = state.data.drain_backWash;
      state.data.ceb_AirScour = state.data.backwash_AirScour;
      state.data.backWash1_CEB = backWash1_CEB.minValue>state.data.backWash1_backWash||backWash1_CEB.maxValue<state.data.backWash1_backWash?state.data.backWash1_CEB:state.data.backWash1_backWash;
      state.data.backWash2_CEB = backWash2_CEB.minValue>state.data.backWash2_backWash||backWash2_CEB.maxValue<state.data.backWash2_backWash?state.data.backWash2_CEB:state.data.backWash2_backWash;
      if(flag){
        state.data.forwardFlush = state.data.forwardFlush_backWash;
      }

      // state.isUfDataUpdated=true;

    },
    handleCebDropdownData: (state, action) => {
      const { lstUFCEBWaterTypeVM, lstChemicalVM } = action.payload;
      let tempData = {
        mineral: [],
        alkali: [],
        organic: [],
        oxidant: [],
        disOxidant: [],
      };
      tempData.mineral = lstChemicalVM.filter((x) => x.name === "Acid");
      tempData.alkali = lstChemicalVM.filter((x) => x.name === "Base");
      tempData.organic = lstChemicalVM.filter((x) => x.name === "Organic Acid");
      tempData.oxidant = lstChemicalVM.filter((x) => x.name === "Oxidant");
      tempData.disOxidant = lstChemicalVM.filter(
        (x) => x.name === "Disinfection Oxidant"
      );
      state.cebDropdownData.waterType = lstUFCEBWaterTypeVM;
      state.cebDropdownData.chemicalType = tempData;
    },
    handleCipDropdownData: (state, action) => {
      const { lstUFCIPWaterTypeVM, lstChemicalVM } = action.payload;
      let tempData = {
        mineral: [],
        alkali: [],
        organic: [],
        oxidant: [],
        surfactant: [],
      };
      tempData.mineral = lstChemicalVM.filter((x) => x.name === "Acid");
      tempData.alkali = lstChemicalVM.filter((x) => x.name === "Base");
      tempData.organic = lstChemicalVM.filter((x) => x.name === "Organic Acid");
      tempData.oxidant = lstChemicalVM.filter((x) => x.name === "Oxidant");
      tempData.surfactant = lstChemicalVM.filter(
        (x) => x.name === "Surfactant"
      );
      state.cipDropdownData.waterType = lstUFCIPWaterTypeVM;
      state.cipDropdownData.chemicalType = tempData;
    },
    calculateUFFields: (state, action) => {
      let TOTAL_UNITS;

      if (state.data.uFBWCEBStandbyOptionID == 1) {
        TOTAL_UNITS = Math.round(
          parseInt(state.data.onlineTrains) +
            parseInt(state.data.redundantTrains),
          2
        );
        state.data.uFStorageTankOptionID = 2; ////Backwash + Filtrate
      } else if (state.data.uFBWCEBStandbyOptionID == 2) {
        TOTAL_UNITS = Math.round(
          parseInt(state.data.onlineTrains) +
            parseInt(state.data.redundantStandbyTrains) +
            parseInt(state.data.redundantTrains),
          2
        );
        state.data.uFStorageTankOptionID = 1; //Backwash Only
      }
      if (state.activeUFModule?.integraPacInd == true) {
        //field is disabled,Track Design Section is made visible
        const TOTAL_NUM_RACKS = Math.round(
          parseInt(TOTAL_UNITS) * parseInt(state.data.skidsPerTrain),
          2
        );
        const MODULES_PER_UNIT = Math.round(
          parseInt(state.data.skidsPerTrain) *
            parseInt(state.data.modulesPerSkid),
          2
        );
        const TOTAL_MODULES = Math.round(
          parseInt(TOTAL_UNITS) * parseInt(MODULES_PER_UNIT),
          2
        );
        state.data.skids = TOTAL_NUM_RACKS;
        state.data.totalTrains = TOTAL_UNITS;
        state.data.modulesPerTrain = MODULES_PER_UNIT;
        state.data.totalModules = TOTAL_MODULES;
      } else {
        //field is enabled,Track Design Section is hidden
        state.data.skidsPerTrain = "1"; //Rack/Unit
        state.data.modulesPerSkid = "1"; //Modules/Rack
        const TOTAL_NUM_RACKS = Math.round(
          parseInt(TOTAL_UNITS) * parseInt(state.data.skidsPerTrain),
          2
        );
        const MODULES_PER_UNIT =
          parseInt(state.data.skidsPerTrain) *
          parseInt(state.data.modulesPerSkid);
        const TOTAL_MODULES = Math.round(
          parseInt(TOTAL_UNITS) * parseInt(state.data.modulesPerTrain),
          2
        );

        state.data.skids = TOTAL_NUM_RACKS;
        state.data.totalTrains = TOTAL_UNITS;
        state.data.totalModules = TOTAL_MODULES;
      }
    },
    updateWaterSubtypeFlag: (state, action) => {
      state.waterSubTypeFlag = action.payload;
    },
    configNoRackNoStandBy: (state, action) => {
      console.log("configNoRackNoStandBy : START",action.payload);
      const getEven = (value) => {
        let num = Math.ceil(value);
        if (num % 2 == 0) {
          return num;
        } else {
          return num + 1;
        }
      };

      state.recommended_configs     = [];
      // state.defaultUFConfig         = [];
      const configurations          = [];
      let option                    = 0;
      const data                    = { ...action.payload.calcEngineResponse};
      // const n_modules_target        = 204;
      const n_modules_target        = data.n_modules_target; //Math.floor(data.n_modules_target);
      const n_BW_per_filter_max     = Number(data.n_BW_per_filter_max);
      const N_Modules_Target        = n_modules_target;
      const N_Modules_Target_Even   = getEven(N_Modules_Target);
      const N_BW_per_filter_max     = n_BW_per_filter_max;

      console.log("N_Modules_Target",n_modules_target);
      console.log("N_Modules_Target_Even",N_Modules_Target_Even);
      const N_Online_Trains_Minimum = Math.round((N_Modules_Target/200) + 1);
      // const isGreater = N_Modules_Target >200 ? true : false;
      // console.log("N_Modules_Target is greater than 200",isGreater);

      for( var i= N_Online_Trains_Minimum; i<= N_Online_Trains_Minimum + 10; i++){
        option                          = option +1;
        const N_Online_Trains           = i;
        const N_Standby_Trains          = 0;
        const N_Total_Trains            = N_Online_Trains + N_Standby_Trains;
        const N_maxOfflineBW_CEB        = Math.floor(Math.max(1, (N_Online_Trains / (N_BW_per_filter_max+1) + 0.99)));
        const N_Modules_Train_Target    = Math.round(N_Modules_Target/N_Online_Trains);
        const N_Modules_Train_Adjusted  = getEven(N_Modules_Train_Target);
        if(N_Modules_Train_Adjusted <= 2){
          //exit from loop
          console.log("Exiting From Loop, N_Modules_Train_Adjusted <= 2");
          break;
        }
        const N_Online_Modules      = N_Online_Trains * N_Modules_Train_Adjusted;
        const	N_Total_Modules       = N_Total_Trains * N_Modules_Train_Adjusted;
        console.log("N_Online_Modules calc----",N_Online_Modules);
        if(N_Online_Modules >= N_Modules_Target_Even){
          configurations.push({
            "options"           : option,
            "onlineUnits"       : N_Online_Trains,
            "standByUnits"      : N_Standby_Trains,
            "totalUnits"        : N_Total_Trains,
            "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
            "modulesPerRack"    : "-",
            "racksPerUnit"      : "-",
            "modulesPerUnit"    : N_Modules_Train_Adjusted,
            "onlineModules"     : N_Online_Modules,
            "totalModules"      : N_Total_Modules,
          });
        }
      }
      state.recommended_configs = configurations;
      console.log("configNoRackNoStandBy : END");
    },
    configNoRackWithStandBy: (state, action) => {
      console.log("configNoRackWithStandBy : START");
      const getEven = (value) => {
        let num = Math.ceil(value);
        if (num % 2 == 0) {
          return num;
        } else {
          return num + 1;
        }
      };
      state.recommended_configs   = [];
      // const n_modules_target      = 206; 
      // const t_filter_module_day   = 1261.95917594545; 
      // const n_BW_per_filter_max   = 4;
      const configurations        = [];
      let option                  = 0;
      const data                  = { ...action.payload.calcEngineResponse};
      const n_modules_target      = data.n_modules_target; //Math.floor(data.n_modules_target);
      const t_filter_module_day   = Number(data.t_filter_module_day);
      const n_BW_per_filter_max   = Number(data.n_BW_per_filter_max);
      const t_MIT_module_day      = Number(state.data.offlinetimepertrain);

      const N_Modules_Target      = n_modules_target;
      const N_Modules_Target_Even = getEven(N_Modules_Target);
      const N_BW_per_filter_max   = n_BW_per_filter_max;
      const T_Filter_Module_Day   = t_filter_module_day;
      const T_MIT_module_day      = t_MIT_module_day;
      const N_Online_Trains_Minimum = Math.round((N_Modules_Target/200) + 1);

      // const isGreater = N_Modules_Target >200 ? true : false;
      // console.log("N_Modules_Target is greater than 200",isGreater);

      console.log("N_Modules_Target_Even",N_Modules_Target_Even);
      console.log("N_BW_per_filter_max is : ",N_BW_per_filter_max);
      console.log("T_Filter_Module_Day is : ",T_Filter_Module_Day);
      console.log("T_MIT_module_day is : ",T_MIT_module_day);
      for( var i= N_Online_Trains_Minimum; i<= N_Online_Trains_Minimum + 10; i++){
        option                          = option +1;
        const N_Online_Trains           = i;
        const N_Standby_Trains          = Math.floor(Math.max(1,(N_Online_Trains / (N_BW_per_filter_max+1) + 0.99)));
        const N_Total_Trains            = N_Online_Trains + N_Standby_Trains;
        const N_maxOfflineBW_CEB        = Math.floor(Math.max(1, (N_Online_Trains / (N_BW_per_filter_max+1) + 0.99)));
        const N_Modules_Train_Target    = (N_Modules_Target * T_Filter_Module_Day/(1440 - T_MIT_module_day) / N_Online_Trains);
        const N_Modules_Train_Adjusted  = getEven(N_Modules_Train_Target);
        if(N_Modules_Train_Adjusted <= 2){
          console.log("Exiting From Loop, N_Modules_Train_Adjusted <= 2");
          break;
        }
        const N_Online_Modules  = N_Online_Trains * N_Modules_Train_Adjusted;
        const	N_Total_Modules   = N_Total_Trains * N_Modules_Train_Adjusted;
        console.log("N_Online_Modules calc----",N_Online_Modules);
        if(N_Online_Modules >= N_Modules_Target_Even){
        configurations.push({
          "options"           : option,
          "onlineUnits"       : N_Online_Trains,
          "standByUnits"      : N_Standby_Trains,
          "totalUnits"        : N_Total_Trains,
          "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
          "modulesPerRack"    : "-",
          "racksPerUnit"      : "-",
          "modulesPerUnit"    : N_Modules_Train_Adjusted,
          "onlineModules"     : N_Online_Modules,
          "totalModules"      : N_Total_Modules,
        });
        }
      }
      state.recommended_configs = configurations;
      console.log("configNoRackWithStandBy : END");
    },
    configWithRackNoStandBy: (state, action) => {
      console.log("configWithRackNoStandBy : START");
      const getEven = (value) => {
        let num = Math.ceil(value);
        if (num % 2 == 0) {
          return num;
        } else {
          return num + 1;
        }
      };
      state.recommended_configs     = [];
      let configurations            = [];
      let IP_Mod_With_Value         = {};
      let IP_Skid_Size_min          = 6;
      let IP_Skid_Size_max          = 22;
      let option                    = 0;
      const data                    = { ...action.payload.calcEngineResponse};
      const n_modules_target        = data.n_modules_target; //Math.floor(data.n_modules_target);
      const n_BW_per_filter_max     = Number(data.n_BW_per_filter_max);
      // const n_modules_target        = 206;
      // const n_BW_per_filter_max     = 4;
      const N_Modules_Target        = n_modules_target;
      const N_Modules_Target_Even   = getEven(N_Modules_Target);
      const N_BW_per_filter_max     = n_BW_per_filter_max;
      const N_Online_Trains_Minimum = Math.round((N_Modules_Target/200) + 1);
      console.log("N_Modules_Target original : ",data.n_modules_target);
      console.log("N_Modules_Target EVEN :",N_Modules_Target_Even);
      console.log("N_BW_per_filter_max is : ",N_BW_per_filter_max);
      const removeMultiplesFromStart = (arr) => {
        let result = [...arr];
        if(result.length == 9)
        {
          result.splice(result.length-4, 4);
        }
        else{
          if(result.indexOf(20) >= 0){
            const positionToRemove = result.indexOf(10);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
          
          if(result.indexOf(18) >= 0){
            const positionToRemove = result.indexOf(12);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
            const positionToRemove1 = result.indexOf(6);
            if(positionToRemove1 >= 0){
              result.splice(positionToRemove1, 1);
            }
          }
          
          
          if(result.indexOf(16) >= 0){
            const positionToRemove = result.indexOf(8);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
          
          if(result.indexOf(12) >= 0){
            const positionToRemove = result.indexOf(6);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
        }
        return result;
      };
      const removeMultiplesRecords = (configurations,IP_Mod_With_Value)=>{
        let filteredConfigs = [];
        configurations.map((config)=> {
            if(IP_Mod_With_Value[config.onlineUnits].length > 0){
              IP_Mod_With_Value[config.onlineUnits].forEach((filteredData) => {
                if(config["modulesPerRack"] == filteredData){
                  filteredConfigs = [...filteredConfigs, config];
                }
              });

            }
        });
        return filteredConfigs;
      };

      for( var i= N_Online_Trains_Minimum; i<= N_Online_Trains_Minimum + 10; i++){
        const hasValues                 = [];
        const hasValuesFull                 = [];
        const N_Online_Trains           = i;
        const N_Standby_Trains          = 0;
        const N_Total_Trains            = N_Online_Trains + N_Standby_Trains;
        const N_maxOfflineBW_CEB        = Math.floor(Math.max(1, (N_Online_Trains / (N_BW_per_filter_max+1) + 0.99)));
        const N_Modules_Train_Target    = Math.round(N_Modules_Target/N_Online_Trains);
        if(N_Modules_Train_Target <= IP_Skid_Size_min){
          //exit from loop
          console.log("Exiting from loop - N_Modules_Train_Target <= IP_Skid_Size_min");
          break;
        }
        for( var j=IP_Skid_Size_max; j>= IP_Skid_Size_min ; j -=2){
          option                          = option +1;
          const IP_Mod_skid               = j;
          const N_IP_Skids                = Math.round(N_Modules_Train_Target / IP_Mod_skid, 0);
          const N_Modules_Train_Adjusted  = N_IP_Skids * IP_Mod_skid;
          const N_Online_Modules          = N_Online_Trains * N_Modules_Train_Adjusted;
          const	N_Total_Modules           = N_Total_Trains * N_Modules_Train_Adjusted;
          if(N_Online_Modules > (1.10 * data.n_modules_target)){
            //then show no result
            const ignoringRow = {
              "options"           : option,
              "onlineUnits"       : N_Online_Trains,
              "standByUnits"      : N_Standby_Trains,
              "totalUnits"        : N_Total_Trains,
              "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
              "modulesPerRack"    : IP_Mod_skid,
              "racksPerUnit"      : N_IP_Skids,
              "modulesPerUnit"    : N_Modules_Train_Adjusted,
              "onlineModules"     : N_Online_Modules,
              "totalModules"      : N_Total_Modules,
            };
            console.log(`N_Online_Modules > (1.10 * N_Modules_Target) : Ignoring configuration for OnlineTrain- ${N_Online_Trains}`,ignoringRow);
          } 
          else{
            // console.log(`setting configuration for OnlineTrain- ${N_Online_Trains} and IP_Mod_skid - ${IP_Mod_skid}`);
            if(N_Online_Modules >= N_Modules_Target_Even){
                hasValues.push(IP_Mod_skid);
                hasValuesFull.push({
                                "IP_Mod_skid" : IP_Mod_skid, 
                                "modulesPerUnit" : N_Modules_Train_Adjusted
                              });
                configurations.push({
                  "options"           : option,
                  "onlineUnits"       : N_Online_Trains,
                  "standByUnits"      : N_Standby_Trains,
                  "totalUnits"        : N_Total_Trains,
                  "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
                  "modulesPerRack"    : IP_Mod_skid,
                  "racksPerUnit"      : N_IP_Skids,
                  "modulesPerUnit"    : N_Modules_Train_Adjusted,
                  "onlineModules"     : N_Online_Modules,
                  "totalModules"      : N_Total_Modules,
                });
            }
          }
        }
        console.log("#### 1 hasValues",hasValues);
        console.log("#### 1.1 hasValuesFull",hasValuesFull);

        //removing duplicate values for Modules/Unit for a each OnlineUnit
        const uniqueRackUnitArray = hasValuesFull.reduce((acc, obj) => {
          if(!acc.some(item => item.modulesPerUnit == obj.modulesPerUnit)){
            acc.push(obj);
          }
          return acc;
        },[]);
        console.log("#### 1.2 uniqueRackUnitArray", uniqueRackUnitArray);
        const abc = uniqueRackUnitArray.map((ipMod)=> ipMod.IP_Mod_skid);

        const result = removeMultiplesFromStart(abc);
        console.log("#### 2 removeMultiplesFromStart - result",result);
        IP_Mod_With_Value = { ...IP_Mod_With_Value, [N_Online_Trains] : result};
      }
      console.log("#### 3 IP_Mod_With_Value",IP_Mod_With_Value);
      console.log("#### 4 full configurations",configurations);
      const filteredConfigurations = removeMultiplesRecords(configurations,IP_Mod_With_Value);
      console.log("#### 5 filteredConfigurations",filteredConfigurations);
      state.recommended_configs = filteredConfigurations;
      console.log("#### 6 configWithRackNoStandBy : END",filteredConfigurations);
    },
    configWithRackWithStandBy: (state, action) => {
      console.log("configWithRackWithStandBy : START");
      const getEven = (value) => {
        let num = Math.ceil(value);
        if (num % 2 == 0) {
          return num;
        } else {
          return num + 1;
        }
      };
      state.recommended_configs   = [];
      // state.defaultUFConfig       = [];
      let configurations          = [];
      let IP_Skid_Size_min        = 6;
      let IP_Skid_Size_max        = 22;
      let IP_Mod_With_Value       = {};
      let option                  = 0;
      const data                  = { ...action.payload.calcEngineResponse};
      const n_modules_target      = data.n_modules_target; //Math.floor(data.n_modules_target);
      const n_BW_per_filter_max   = Number(data.n_BW_per_filter_max);  
      const t_filter_module_day   = Number(data.t_filter_module_day);
      // const n_modules_target      = 206; 
      // const n_BW_per_filter_max   = 3; 
      // const t_filter_module_day   = 1245.11246499344;

      const t_MIT_module_day      = Number(state.data.offlinetimepertrain);
      const N_Modules_Target      = n_modules_target;
      const N_Modules_Target_Even = getEven(N_Modules_Target);

      const N_BW_per_filter_max       = n_BW_per_filter_max;
      const T_Filter_Module_Day       = Math.floor(t_filter_module_day);
      const T_MIT_module_day          = t_MIT_module_day;
      const N_Online_Trains_Minimum   = Math.round((N_Modules_Target/200) + 1);
      console.log("N_Modules_Target original : ",data.n_modules_target);
      console.log("N_Modules_Target EVEN :",N_Modules_Target_Even);

      console.log("N_BW_per_filter_max is : ",N_BW_per_filter_max);
      console.log("T_Filter_Module_Day is : ",T_Filter_Module_Day);
      console.log("T_MIT_module_day is : ",T_MIT_module_day);

      const removeMultiplesFromStart = (arr) => {
        let result = [...arr]; // Create a copy of the original array
        if(result.length == 9)
        {
          result.splice(result.length-4, 4);
        }
        else{
          if(result.indexOf(20) >= 0){
            const positionToRemove = result.indexOf(10);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
          
          if(result.indexOf(18) >= 0){
            const positionToRemove = result.indexOf(12);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
            const positionToRemove1 = result.indexOf(6);
            if(positionToRemove1 >= 0){
              result.splice(positionToRemove1, 1);
            }
          }
          
          
          if(result.indexOf(16) >= 0){
            const positionToRemove = result.indexOf(8);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
          
          if(result.indexOf(12) >= 0){
            const positionToRemove = result.indexOf(6);
            if(positionToRemove >= 0){
              result.splice(positionToRemove, 1);
            }
          }
        }
        return result;
      };

      const removeMultiplesRecords = (configurations,IP_Mod_With_Value)=>{
        let filteredConfigs = [];
        configurations.map((config)=> {
            if(IP_Mod_With_Value[config.onlineUnits].length > 0){
              IP_Mod_With_Value[config.onlineUnits].forEach((filteredData) => {
                if(config["modulesPerRack"] == filteredData){
                  filteredConfigs = [...filteredConfigs, config];
                }
              });

            }
        });
        return filteredConfigs;
      };

      for( var i= N_Online_Trains_Minimum; i<= N_Online_Trains_Minimum + 10; i++){
        const hasValues                 = [];
        const hasValuesFull             = [];
        const N_Online_Trains           = i;
        const N_Standby_Trains          = Math.floor(Math.max(1,(N_Online_Trains / (N_BW_per_filter_max+1) + 0.99)));
        const N_Total_Trains            = N_Online_Trains + N_Standby_Trains;
        const N_maxOfflineBW_CEB        = Math.floor(Math.max(1, (N_Online_Trains / (N_BW_per_filter_max + 1) + 0.99)));
        const N_Modules_Train_Target    = Math.round(N_Modules_Target * T_Filter_Module_Day/(1440 - T_MIT_module_day) / N_Online_Trains);
        
        if(N_Modules_Train_Target <= IP_Skid_Size_min ){
          //exit from loop
          console.log("Exit from Loog - N_Modules_Train_Target <= IP_Skid_Size_min");
          break;
        }

        for( var j=IP_Skid_Size_max; j>= IP_Skid_Size_min ; j -=2){
          option                          = option +1;
          const IP_Mod_skid               = j;
          const N_IP_Skids                = Math.round(N_Modules_Train_Target / IP_Mod_skid, 0);
          
          console.log(" N_Modules_Train_Target : ",N_Modules_Train_Target);
          console.log(" modulesPerRack : IP_Mod_skid :", IP_Mod_skid);
          console.log(" racksPerUnit : N_IP_Skids calculated and rounded :", N_IP_Skids);
          // console.log("modulesPerUnit rounded value :", N_IP_Skids * IP_Mod_skid);
          const N_Modules_Train_Adjusted  = N_IP_Skids * IP_Mod_skid;
          const N_Online_Modules          = N_Online_Trains * N_Modules_Train_Adjusted;
          const	N_Total_Modules           = N_Total_Trains * N_Modules_Train_Adjusted;

          if(N_Online_Modules > (1.10 * data.n_modules_target)){
            //then show no result
            const ignoringRow = {
              "options"           : option,
              "onlineUnits"       : N_Online_Trains,
              "standByUnits"      : N_Standby_Trains,
              "totalUnits"        : N_Total_Trains,
              "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
              "modulesPerRack"    : IP_Mod_skid,
              "racksPerUnit"      : N_IP_Skids,
              "modulesPerUnit"    : N_Modules_Train_Adjusted,
              "onlineModules"     : N_Online_Modules,
              "totalModules"      : N_Total_Modules,
            };
            console.log(`N_Online_Modules > (1.10 * N_Modules_Target) : Ignoring configuration for OnlineTrain- ${N_Online_Trains}`,ignoringRow);
          } 
          else{
            // console.log(`setting configuration for OnlineTrain- ${N_Online_Trains} and IP_Mod_skid - ${IP_Mod_skid}`);
            console.log("Online Modules calculated ---",N_Online_Modules);
            if(N_Online_Modules >= N_Modules_Target_Even){//40 
              hasValues.push(IP_Mod_skid);
              hasValuesFull.push({
                "IP_Mod_skid" : IP_Mod_skid, 
                "modulesPerUnit" : N_Modules_Train_Adjusted
              });
              configurations.push({
                "options"           : option,
                "onlineUnits"       : N_Online_Trains,
                "standByUnits"      : N_Standby_Trains,
                "totalUnits"        : N_Total_Trains,
                "maxOfflineBW_CEB"  : N_maxOfflineBW_CEB,
                "modulesPerRack"    : IP_Mod_skid,
                "racksPerUnit"      : N_IP_Skids,
                "modulesPerUnit"    : N_Modules_Train_Adjusted,
                "onlineModules"     : N_Online_Modules,
                "totalModules"      : N_Total_Modules,
              });
            }
          }
        }
        console.log("#### 1 hasValues",hasValues);
        console.log("#### 1.1 hasValuesFull",hasValuesFull);
        //removing duplicate values for Modules/Unit for a each OnlineUnit
        const uniqueRackUnitArray = hasValuesFull.reduce((acc, obj) => {
          if(!acc.some(item => item.modulesPerUnit == obj.modulesPerUnit)){
            acc.push(obj);
          }
          return acc;
        },[]);
        console.log("#### 1.2 uniqueRackUnitArray", uniqueRackUnitArray);
        const abc = uniqueRackUnitArray.map((ipMod)=> ipMod.IP_Mod_skid);

        const result = removeMultiplesFromStart(abc);
        console.log("#### 2 removeMultiplesFromStart - result",result);
        IP_Mod_With_Value = { ...IP_Mod_With_Value, [N_Online_Trains] : result};
      }
      console.log("#### 3 IP_Mod_With_Value",IP_Mod_With_Value);
      console.log("#### 4 full configurations",configurations);
      const filteredConfigurations = removeMultiplesRecords(configurations,IP_Mod_With_Value);
      console.log("#### 5 filteredConfigurations",filteredConfigurations);
      state.recommended_configs = filteredConfigurations;
      console.log("#### 6 configWithRackWithStandBy : END",filteredConfigurations);
    },
    resetUfData:(state,action)=>{
      state.data=ufDefaultData;
      state.activeTab="Design";
      state.sliderMin=6;
      state.sliderMax=22;
    },
    setCustomAvail:(state,action)=>{
      state.isCustomConfigAvail=action.payload;
    },
    setCustomOfflineTimePerUnit:(state,action)=>{
      state.isOfflineTimeChanged = action.payload;
    },
    setActiveTab:(state,action)=>{
      state.activeTab=action.payload;
    },
    setUfDataUpdate:(state,action)=>{
      state.isUfDataUpdated=action.payload;
    },
  },
});

export const {
  configNoRackNoStandBy,
  configNoRackWithStandBy,
  configWithRackNoStandBy,
  configWithRackWithStandBy,
  updateUFTechnologyList,
  updateUFModuleList,
  updatelstUfmoduleFlowVM,
  updatelstUFModulePressureRatingVM,
  updateActiveUFModule,
  updateRecommendedConfiguration,
  updateCallCalcEngineUFConfig,
  updateDefaultUFConfiguration,
  updateIsForDrinkingWater,
  updateUFStandByOptions,
  updateUFStorageTankOptions,
  updateUFInputRangeConfig,
  calculateUFFields,
  updateUFInputRangeConfigByWaterType,
  updateUFFluxGuideline,
  updateBackWashOptions,
  updateUFStore,
  updateUFDefaultInputRangeConfig,
  updateDesignData,
  updateCebData,
  updateCipData,
  updateAdditionalData,
  handleCebDropdownData,
  handleSameAsBackwash,
  handleCipDropdownData,
  handleCalcEngineResponse,
  handleOperatingFlux,
  getOperatingFluxFromCalcEngine,
  generateConfigsWithoutStandBy,
  generateConfigsWithStandBy,
  updateUfDoseGuidline,
  updateWaterSubtypeFlag,
  updateSliderValue,
  resetUfData,
  updateTabletMenuIcon,
  updateTabletIconStatus,
  updateMenuIconHeader,
  setCustomAvail,
  setCustomOfflineTimePerUnit,
  setActiveTab,
  setUfDataUpdate,
  updateMinMaxSliderValue,
} = UFSlice.actions;
export default UFSlice.reducer;
