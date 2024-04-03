import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  MarkerType,
  getBezierPath,
  getSmoothStepPath,
} from "reactflow";
import {colors} from "../../../../common/styles/Theme";
const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  return (
    <>
      <BaseEdge
            onDrop={(e) =>
              console.log(
                "drop",
                JSON.parse(e.dataTransfer.getData("application/reactflow"))
              )
            }
        path={edgePath}
        updatable={false}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 2,
          stroke: selected ? "#007672" : "#007672",
          boxShadow: "10px 5px 5px red",
        }}
      />
    </>
  );
}
