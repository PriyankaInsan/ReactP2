function generateRecomendedTable(UFData) {
    let config = [];
    try {
      let t_CIP_total_module_day = UFData.t_CIP_total_module_day;
      let t_mCIP_total_module_day = UFData.t_mCIP_total_module_day;
      let t_filter_module_cycle = UFData.t_filter_module_cycle;
      let t_normal_module_cycle = UFData.t_normal_module_cycle;
      let t_BW_module_cycle = UFData.t_BW_module_cycle;
      let t_CEB1_module_cycle = UFData.t_CEB1_module_cycle;
      let t_filter_module_day = UFData.t_filter_module_day;
      let N_Modules_target = UFData.N_Modules_target;
      let N_BW_per_filter_max = UFData.N_BW_per_filter_max;
      let N_min = UFData.N_min;
      let N_sep_max = UFData.N_sep_max;
      let Flag_IP_Design = UFData.IntegraPackDesign_Ind || false;
      if (UFData.IntegraPackDesign_Ind !== null) {
        Flag_IP_Design = UFData.IntegraPackDesign_Ind;
      }
      N_Modules_target = Math.max(N_Modules_target, 1);
      for (
        let i = Math.floor(N_Modules_target / 200) + 1;
        i <=
        Math.min(
          Math.floor(N_Modules_target / 200) + 10,
          Math.max(Math.round(N_Modules_target / 2.5), 1)
        );
        i++
      ) {
        let CIPTrainsMax = 0;
        let mCIPTrainsMax = 0;
        if (UFData.UFBWCEBStandbyOptionID === 1) {
          if (UFData.N_F_per_CIP > 0) {
            CIPTrainsMax = Math.floor((t_CIP_total_module_day / 1440) * i + 1);
            mCIPTrainsMax = Math.floor((t_CIP_total_module_day / 1440) * i + 1);
          } else {
            CIPTrainsMax = 0;
            mCIPTrainsMax = 0;
          }
        } else {
          if (UFData.N_F_per_CIP > 0) {
            if (UFData.Flag_CIP_standby === 0) {
              CIPTrainsMax = 0;
              mCIPTrainsMax = 0;
            } else {
              if (
                UFData.Flag_CIP_standby === UFData.ConstantFluxCIPStandbySkids
              ) {
                CIPTrainsMax = Math.floor(
                  (t_CIP_total_module_day / 1440) * i + 1
                );
                mCIPTrainsMax = Math.floor(
                  (t_CIP_total_module_day / 1440) * i + 1
                );
              } else {
                if (
                  UFData.Flag_CIP_standby === UFData.AdjustFluxNoCIPStandbySkids
                ) {
                  CIPTrainsMax = 0;
                  mCIPTrainsMax = 0;
                }
              }
            }
          } else {
            CIPTrainsMax = 0;
            mCIPTrainsMax = 0;
          }
        }
        let CEBTrainsMax = 0;
        let BWTRainMax = 0;
        if (UFData.UFBWCEBStandbyOptionID === 1) {
          if (UFData.N_F_per_CEB1 === 0 && UFData.N_F_per_CEB2 === 0) {
            CEBTrainsMax = 0;
          } else {
            if (UFData.N_F_per_CEB1 === 0 || UFData.N_F_per_CEB2 === 0) {
              CEBTrainsMax = Math.floor(
                ((t_filter_module_cycle / t_normal_module_cycle) * (i - 1)) /
                  Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2) +
                  1
              );
            } else {
              CEBTrainsMax = Math.floor(
                ((t_filter_module_cycle / t_normal_module_cycle) * (i - 1)) /
                  (N_min - N_sep_max) +
                  1
              );
            }
          }
          BWTRainMax = Math.max(
            1,
            Math.floor((i - 1 - CEBTrainsMax) / N_BW_per_filter_max + 0.99)
          );
        } else {
          let BWTRainMaxTemp;
          if (UFData.N_F_per_CEB1 === 0 && UFData.N_F_per_CEB2 === 0) {
            BWTRainMaxTemp = 0;
          } else {
            BWTRainMaxTemp = 1;
          }
          let BWTRainMaxTemp1;
          if (UFData.N_F_per_CEB1 === 0 && UFData.N_F_per_CEB2 === 0) {
            BWTRainMaxTemp1 = 0;
          } else {
            BWTRainMaxTemp1 = Math.floor(t_CEB1_module_cycle);
          }
          let FirstValue = Math.floor(i - 1 - BWTRainMaxTemp);
          let Secondvalue = Math.floor(
            (t_filter_module_cycle - BWTRainMaxTemp1 - t_BW_module_cycle) /
              t_BW_module_cycle +
              0.99
          );
  
          if (Secondvalue == 0) {
            BWTRainMax = 1;
          } else {
            BWTRainMax = Math.max(1, FirstValue / Secondvalue);
          }
          if (UFData.N_F_per_CEB1 == 0 && UFData.N_F_per_CEB2 == 0) {
            CEBTrainsMax = 0;
          } else {
            if (UFData.N_F_per_CEB1 == 0 || UFData.N_F_per_CEB2 == 0) {
              CEBTrainsMax =
                ((t_filter_module_cycle / t_normal_module_cycle) *
                  (i + BWTRainMax - 1)) /
                  Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2) +
                1;
            } else {
              CEBTrainsMax = Math.floor(
                ((t_filter_module_cycle / t_normal_module_cycle) *
                  (i + BWTRainMax - 1)) /
                  (N_min - N_sep_max) +
                  1
              );
            }
          }
        }
        let ModulesPerTrain = 0;
  
        N_Modules_target = Math.max(N_Modules_target, 1); 
        if (UFData.UFBWCEBStandbyOptionID == 1) {
          ModulesPerTrain = Math.ceil(N_Modules_target / i);
        
        } else {
          let t_MIT_module_day = Math.floor(UFData.Offlinetimepertrain);
          ModulesPerTrain = Math.ceil(
            (N_Modules_target * t_filter_module_day) /
              (1440 - t_MIT_module_day) /
              i
          ); 
        }
        ModulesPerTrain = Math.max(ModulesPerTrain, 1);
  
        let N_Target_max = Math.ceil(
          Math.max(N_Modules_target * 1.05, N_Modules_target + 5)
        );
  
        let ModulesPerTrainAdjusted = 0;
        let IP_Mod_skid = 0;
        let IPSkidsPerTrain = 0;
        if (Flag_IP_Design) {
          for (let d = 6; d < 23; d = d + 2) {
            IP_Mod_skid = d;
            IPSkidsPerTrain = Math.max(
              Math.ceil(ModulesPerTrain / IP_Mod_skid),
              1
            ); 
            ModulesPerTrainAdjusted = IPSkidsPerTrain * IP_Mod_skid;
  
            let r = {
              OnlineTrains: 0,
              BWTrains: 0,
              CEBTrains: 0,
              CIPTrains: 0,
              MiniCIPTrains: 0,
              MaxBWCEB: 0,
              StandbyTrains: 0,
              TotalTrains: 0,
              OnlineTrains: 0,
              ModulesPerTrain: 0,
              ModulesPerSkid: 0,
              SkidsPerTrain: 0,
              ModulesPerSkidStr: 0,
              SkidsPerTrainStr: 0,
              TotalModules: 0,
              Option: 0,
              OnlineModules: 0,
            };
  
            r.OnlineTrains = i;
            if (UFData.UFBWCEBStandbyOptionID == 1) {
              BWTRainMax = Math.max(
                1,
                Number.parseFloat(i) / (UFData.N_BW_per_filter_max + 2) + 0.99
              );
  
              let N_Max = Math.max(
                Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2),
                1
              );
              if (UFData.N_F_per_CEB1 == 0 && UFData.N_F_per_CEB2 == 0) {
                CEBTrainsMax = 0;
              } else if (UFData.N_F_per_CEB1 == 0 || UFData.N_F_per_CEB2 == 0) {
                CEBTrainsMax = Math.max(
                  BWTRainMax,
                  Math.floor(
                    ((UFData.t_filter_module_cycle /
                      UFData.t_normal_module_cycle) *
                      (i - 1)) /
                      N_Max +
                      1
                  )
                );
              } else {
                let no = 0;
                if (N_Max % N_min == 0)
                  no = Math.floor(
                    ((UFData.t_filter_module_cycle /
                      UFData.t_normal_module_cycle) *
                      (i - 1)) /
                      (UFData.N_min - UFData.N_sep_max) +
                      1
                  );
                else no = 1;
                CEBTrainsMax = Math.max(BWTRainMax, no);
              }
            } else {
              BWTRainMax = Math.max(
                1,
                Number.parseFloat(i) /
                  Number.parseFloat(UFData.N_BW_per_filter_max + 1) +
                  0.99
              );
              let N_Max = Math.max(
                Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2),
                1
              );
  
              if (UFData.N_F_per_CEB1 == 0 && UFData.N_F_per_CEB2 == 0) {
                CEBTrainsMax = 0;
              } else if (UFData.N_F_per_CEB1 == 0 || UFData.N_F_per_CEB2 == 0) {
                CEBTrainsMax = Math.max(
                  BWTRainMax,
                  Math.floor(
                    ((UFData.t_filter_module_cycle /
                      UFData.t_normal_module_cycle) *
                      (i + BWTRainMax - 1)) /
                      N_Max +
                      1
                  )
                );
              } else {
                let no = 0;
                if (N_Max % N_min == 0) {
                  no = Math.floor(
                    ((UFData.t_filter_module_cycle /
                      UFData.t_normal_module_cycle) *
                      (i + BWTRainMax - 1)) /
                      (UFData.N_min - UFData.N_sep_max) +
                      1
                  );
                } else {
                  no = 1;
                }
                CEBTrainsMax = Math.max(BWTRainMax, no);
              }
            }
  
            r.BWTrains = Math.floor(BWTRainMax);
            r.CEBTrains = Math.floor(CEBTrainsMax);
            r.CIPTrains = Math.floor(CIPTrainsMax);
            r.MiniCIPTrains = Math.floor(mCIPTrainsMax);
            r.MaxBWCEB = Math.max(r.BWTrains, r.CEBTrains);
            let StandbyTrains = 0;
            if (UFData.UFBWCEBStandbyOptionID == 1) {
              StandbyTrains = 0;
            } else {
              StandbyTrains = r.BWTrains + r.CIPTrains; 
            }
            r.StandbyTrains = Math.floor(StandbyTrains); 
            
  
            r.TotalTrains = r.OnlineTrains + r.StandbyTrains;

            
            r.ModulesPerTrain = parseInt(ModulesPerTrainAdjusted);
            r.ModulesPerSkid = parseInt(IP_Mod_skid);
            r.SkidsPerTrain =parseInt(IPSkidsPerTrain);
            r.ModulesPerSkidStr = r.ModulesPerSkid;
            r.SkidsPerTrainStr = r.SkidsPerTrain;
  
            r.TotalModules = r.TotalTrains * r.ModulesPerTrain;
            if (config != null) {
              r.Option = config.length + 1;
            } else {
              r.Option = 1;
            }
  
            r.OnlineModules = r.ModulesPerTrain * r.OnlineTrains;
  
            if (
              r.SkidsPerTrain <= 25 &&
              r.SkidsPerTrain >= 1 &&
              N_Target_max >= r.OnlineTrains * r.ModulesPerTrain
            )
              console.log(r);
            config.push(r);
          }
        } else {
          let r = {
            OnlineTrains: 0,
            BWTrains: 0,
            CEBTrains: 0,
            CIPTrains: 0,
            MiniCIPTrains: 0,
            MaxBWCEB: 0,
            StandbyTrains: 0,
            TotalTrains: 0,
            OnlineTrains: 0,
            ModulesPerTrain: 0,
            ModulesPerSkid: 0,
            SkidsPerTrain: 0,
            ModulesPerSkidStr: 0,
            SkidsPerTrainStr: 0,
            TotalModules: 0,
            Option: 0,
            OnlineModules: 0,
          };
          r.OnlineTrains = i;
          if (UFData.UFBWCEBStandbyOptionID == 1) {
            BWTRainMax = Math.max(
              1,
              Number.parseFloat(i) /
                Number.parseFloat(UFData.N_BW_per_filter_max + 2) +
                0.99
            );
            let N_Max = Math.max(
              Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2),
              1
            );
            if (UFData.N_F_per_CEB1 == 0 && UFData.N_F_per_CEB2 == 0) {
              CEBTrainsMax = 0;
            } else if (UFData.N_F_per_CEB1 == 0 || UFData.N_F_per_CEB2 == 0) {
              CEBTrainsMax = Math.max(
                BWTRainMax,
                Math.floor(
                  ((UFData.t_filter_module_cycle / UFData.t_normal_module_cycle) *
                    (i - 1)) /
                    N_Max +
                    1
                )
              );
            } else {
              let no = 0;
              if (N_Max % N_min == 0)
                no = Math.floor(
                  ((UFData.t_filter_module_cycle / UFData.t_normal_module_cycle) *
                    (i - 1)) /
                    (UFData.N_min - UFData.N_sep_max) +
                    1
                );
              else no = 1;
  
              CEBTrainsMax = Math.max(BWTRainMax, no);
            }
          } else {
            BWTRainMax = Math.max(
              1,
              Number.parseFloat(i) /
                Number.parseFloat(UFData.N_BW_per_filter_max + 1) +
                0.99
            );
            N_Max = Math.max(
              Math.max(UFData.N_F_per_CEB1, UFData.N_F_per_CEB2),
              1
            );
  
            if (UFData.N_F_per_CEB1 == 0 && UFData.N_F_per_CEB2 == 0) {
              CEBTrainsMax = 0;
            } else if (UFData.N_F_per_CEB1 == 0 || UFData.N_F_per_CEB2 == 0) {
              CEBTrainsMax = Math.max(
                BWTRainMax,
                Math.floor(
                  ((UFData.t_filter_module_cycle / UFData.t_normal_module_cycle) *
                    (i + BWTRainMax - 1)) /
                    N_Max +
                    1
                )
              );
            } else {
              no = 0;
              if (N_Max % N_min == 0)
                no = Math.floor(
                  ((UFData.t_filter_module_cycle / UFData.t_normal_module_cycle) *
                    (i + BWTRainMax - 1)) /
                    (UFData.N_min - UFData.N_sep_max) +
                    1
                );
              else no = 1;
  
              CEBTrainsMax = Math.max(BWTRainMax, no);
            }
          }
          r.BWTrains = Math.floor(BWTRainMax);
          r.CEBTrains = Math.floor(CEBTrainsMax);
          r.CIPTrains = Math.floor(CIPTrainsMax);
          r.MiniCIPTrains = Math.floor(mCIPTrainsMax);
          r.MaxBWCEB = Math.max(r.BWTrains, r.CEBTrains);
  
          let StandbyTrains = 0;
          if (UFData.UFBWCEBStandbyOptionID == 1) {
            StandbyTrains = 0;
          } else {
            StandbyTrains = r.BWTrains + r.CIPTrains; 
          }
          r.StandbyTrains = Math.floor(StandbyTrains); 
  
          r.TotalTrains = r.OnlineTrains + r.StandbyTrains; 
  
          let p = Math.floor(ModulesPerTrain) % 2;
          if (p == 1) {
            ModulesPerTrainAdjusted = ModulesPerTrain + 1;
          } else {
            ModulesPerTrainAdjusted = ModulesPerTrain;
          }
          r.ModulesPerTrain = Math.floor(ModulesPerTrainAdjusted);
  
          r.ModulesPerSkidStr = "-";
          r.SkidsPerTrainStr = "-";
  
          r.TotalModules = r.TotalTrains * r.ModulesPerTrain;
          if (config != null) {
            r.Option = config.length + 1;
          } else {
            r.Option = 1;
          }
          r.OnlineModules = r.ModulesPerTrain * r.OnlineTrains;
          config.push(r);
          console.log(r);
        }
      }
      if (Flag_IP_Design) {
        config = config.sort((a, b) => b.ModulesPerSkid - a.ModulesPerSkid);
        for (let i = 0; i < config.length; i++) {
          let count = 0;
  
          for (let j = 0; j < config.length; j++) {
            if (config[i].ModulesPerTrain == config[j].ModulesPerTrain) {
              count++;
  
              if (count > 1) {
                config.filter((a,b)=>b!==j);
              }
            }
          }
        }
  
        config = config.sort((a, b) => a.OnlineTrains - b.OnlineTrains); // sort by online trains
  
  
  
        for (let i = 0; i < config.length; i++) {
          config[i].Option = i + 1;
        }
        return config;
      }
      return config;
      // MGPP Item # 1541 - end
    } catch (ex) {
      console.log(ex);
    } finally {
    }
  }
  
    // let data={
    //     IntegraPackDesign_Ind:false,
    //     N_Modules_target:187.56259271041416,
    //     UFBWCEBStandbyOptionID:1,
    //     t_CIP_total_module_day: 8.373262216173192,
    //     t_filter_module_cycle:27.231333333333332,
    //     t_normal_module_cycle:30,
    //     t_CEB1_module_cycle:14.5201,
    //     t_BW_module_cycle:2.767,  //sum of backwash duration in min
    //     N_BW_per_filter_max:4,
    //     N_min:24,
    //     N_sep_max:12,
    //     t_filter_module_day:1265.38,
    //     //--------------------
    //     N_F_per_CIP:1440,
    //     N_F_per_CEB1:144,
    //     N_F_per_CEB2:24,
    //     N_F_per_CEB3:0,
    //     Flag_CIP_standby:0,
    //     Offlinetimepertrain:12,
    // }
    //   console.log("ff",generateRecomendedTable(data))