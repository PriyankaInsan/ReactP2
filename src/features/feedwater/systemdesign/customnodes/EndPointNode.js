import { useCallback, memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import "../../../../common/styles/notoSansFont.css";
import "../../../../common/styles/diodrumFont.css";
const handleStyle = { left: 10 };
import styled from "styled-components";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import FinalPhAdjustment from "../FinalPhAdjusment";
import CustomCheckbox from "../../../../common/styles/components/checkboxs/CustomRadioCheck";

import InputWithText from "../../../../common/styles/components/inputs/InputWithText";
import StandardSecondaryButton from "../../../../common/styles/components/buttons/standard/StandardSecondaryButton";
import { colors, normalCardStyle } from "../../../../common/styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { setFeedFlowRate, setSelectedEndNode } from "../processDiagramSlice";
import CustomRadio from "../../../../common/styles/components/radios/CustomRadio";

import React, { useEffect } from "react";
import GlobalUnitConversion from "../../../../common/utils/GlobalUnitConversion";
import { updateUnitFlag, updateUnitTypeFlow } from "../../../../common/utils/GlobalUnitConversionSlice";

function EndPointNode({ id, data }) {
  const { deleteElements } = useReactFlow();
  const [isFocus, setIsFocus] = useState(null);
  const [openPhAdjustment, setOpenPhAdjustment] = useState(false);
  const { selectedEndNode, feedFlowRate, productFlowRate, edges } = useSelector(
    (state) => state.processDiagramSlice
  );
  const { selectedUnits } = useSelector(
    (state) => state.projectInfo.projectConfig.unitConfig
  );


  const tag = id == "";
  const handleOpenPhAdjustment = () => {
    setOpenPhAdjustment(true);
  };

  const handleClosePhAdjustment = () => {
    setOpenPhAdjustment(false);
  };

  const handleFocus = (id) => {
    setIsFocus(id);
  };
  const handleBlur = (e) => {
    if (e.target.value == "" || e.target.value == 0) {
      dispatch(
        setFeedFlowRate({
          value: 100,
          name: e.target.id,
        })
      );
    } else {
      setIsFocus(null);
    }
  };
  const dispatch = useDispatch();
  const isValidConnecttion = (target) => {
    let data = edges.find((edge) => edge[target] === id);
    return !data;
  };
  return (
    <EndPointNodeStyled>
      <Card
        className={id !== selectedEndNode ? "disable feed-water" : "feed-water"}
      >
        <CustomRadio
          className="heading"
          label={data.label}
          checked={id === selectedEndNode}
          type="radio"
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setSelectedEndNode(id));
            } else {
              let temp =
                selectedEndNode === "startNode" ? "endNode" : "startNode";
              dispatch(setSelectedEndNode(temp));
            }
          }}
          id="feedWaterRadio"
          isError={false}
          name="feedWaterRadio"
          // value={id === "startNode"}
        />
        <InputWithText
          inputText={selectedUnits[1]}
          placeholder="100"
          value={id === "startNode" ? feedFlowRate : productFlowRate}
          disabled={id !== selectedEndNode}
          id={id === "startNode" ? "feedFlowRate" : "productFlowRate"}
          onBlur={handleBlur}
          onFocus={() => handleFocus(1)}
          isFocused={isFocus === 1}
          onChange={(e) => {
            if (!isNaN(e.target.value)) {
              dispatch(
                setFeedFlowRate({
                  value: e.target.value,
                  name: e.target.id,
                })
              );
            }
          }}
        />

        <FinalPhAdjustment
          show={openPhAdjustment}
          close={handleClosePhAdjustment}
        />
      </Card>
      <Handle
        type={data.type}
        className="handleNode"
        position={Position[data.position]}
        style={{ zIndex: 1 }}
        isConnectableStart={() =>
          data.type === "source" ? isValidConnecttion("source") : false
        }
        isConnectableEnd={() =>
          data.type === "target" ? isValidConnecttion("target") : false
        }
      />
    </EndPointNodeStyled>
  );
}

export default memo(EndPointNode);

const EndPointNodeStyled = styled("div")`
  .feed-water {
    background-color: ${colors.Pale20PaleTeal};
    display: flex;
    width: 136px;
    padding: 8px 8px 10px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    border: 0.5px solid ${colors.GreyE1};
    box-shadow: 1px 1px 3px 0px ${colors.blackTransparency020};
    border-radius: 0%;
  }
  .disable {
    background-color: ${colors.White};
  }
  .handleNode {
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: ${colors.PrimaryDarkAquaMarine};
    background-color: ${colors.Pale20PaleTeal};
    border: 1px solid ${colors.PrimaryDarkAquaMarine};
  }
  .fees-water {
    font-size: 8px;
  }
  .heading#feedWaterRadio {
    font-size: 12px;
  }
`;
