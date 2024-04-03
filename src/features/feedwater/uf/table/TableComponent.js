import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import configurations from "./Data";
import CustomRadioCheck from "../../../../common/styles/components/checkboxs/CustomRadioCheck";
import CustomRadio from "../../../../common/styles/components/radios/CustomRadio";
import TableWrapper from "./TableStyled";

import { setUfDataUpdate, updateDefaultUFConfiguration, updateMinMaxSliderValue } from "../../uf/UFSlice";

export default function TableComponent() {
  const dispatch = useDispatch();

  const UFStore = useSelector((state) => state.UFStore);
  const { isForDrinkingWater} =useSelector((state) => state.UFStore);
  const { recommended_configs, defaultUFConfig, isCustomConfigAvail } = UFStore;
  const [selectedConfig, setSelectedConfig] = useState();

  useEffect(() => {

    setSelectedConfig("");

    // if(defaultUFConfig.options != undefined){
    //   setSelectedConfig(defaultUFConfig.options);
    // }
  }, recommended_configs);
  useEffect(() => {
    if (recommended_configs.length>0 && isCustomConfigAvail) {
      dispatch(updateDefaultUFConfiguration(recommended_configs[0]));
    }
  }, [isCustomConfigAvail,recommended_configs]);

  const handleConfigSelection = (rowSelected, rowIndex) => {
    setSelectedConfig(rowIndex);
    dispatch(updateDefaultUFConfiguration(rowSelected));
    dispatch(setUfDataUpdate(true));
  };
  const { sliderValue ,sliderMin,
    sliderMax} = useSelector((state) => state.UFStore);

  return (
    <TableWrapper>
      <table className="table ">
        <thead>
          <tr>
            <th className="th">Select Configuration</th>
            <th className="th">Online Units </th>
            <th className="th">Standby Units </th>
            <th className="th">Total Units </th>
            <th className="th">Max Offline BW/CEB </th>
            <th className="th">Modules/Rack </th>
            <th className="th">Racks/Unit </th>
            <th className="th">Modules/Unit </th>
            <th className="th">Online Modules </th>
            <th className="th">Total Modules </th>
          </tr>
        </thead>
        <tbody>
          {recommended_configs
            ?.filter((item) =>
              item.modulesPerRack == "-"
                ? true
                : item.modulesPerRack <= sliderMax && item.modulesPerRack >= sliderMin
            )
            .map((config, idx) => (
              <tr key={`config-row-${config.options}`}>
                <td className="td">
                  <CustomRadio
                    type="radio"
                    id="selectedConfig"
                    key={`recommended-configuration-${config.options}`}
                    name="selectedConfig"
                    // value={selectedConfig}
                    checked={selectedConfig == config.options ? true : false}
                    onClick={() => {
                      handleConfigSelection(config, config.options);
                    }}
                    onChange={() => {
                      handleConfigSelection(config, config.options);
                    }}
                    disabled={false}
                    isError={false}
                  />
                </td>
                <td className="td">{config.onlineUnits}</td>
                <td className="td">{config.standByUnits}</td>
                <td className="td">{config.totalUnits}</td>
                <td className="td">{config.maxOfflineBW_CEB}</td>
                <td className="td">{config.modulesPerRack}</td>
                <td className="td">{config.racksPerUnit}</td>
                <td className="td">{config.modulesPerUnit}</td>
                <td className="td">{config.onlineModules}</td>
                <td className="td">{config.totalModules}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
