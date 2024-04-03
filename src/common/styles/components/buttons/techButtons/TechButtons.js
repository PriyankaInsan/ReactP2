import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../../Theme";
import DragButtonIcon from "../../../../icons/DragButtonIcon";
import ArrowRightDownIcon from "../../../../icons/ArrowRightDownIcon";
import ArrowRightDownDisableIcon from "../../../../icons/ArrowRightDownDisableIcon";
import DragButtonDisableIcon from "../../../../icons/DragButtonDisableIcon";

const StyledButton = styled.button`
  height:${(props)=>props.small?"21px":"30px"};
  display: inline-flex;
  padding: 4px 8px;
  gap: 5px;
  align-items: center;
  border: 0.5px solid ${colors.GreyE1};
  background-color: ${(props) => props.color || colors.Pale20PaleTeal};
  box-shadow: 1px 1px 3px 0px ${colors.blackTransparency020};
  color: ${(props) => props.color || colors.Black};
  ${fontStyles.notoSans14SemiBold};
  
  &:hover {
    /* background-color: ${colors.LightLightTeal}; */
    cursor:${(props)=> props.isDraggable?"pointer":"default"};
  }
  &:disabled {
    background-color: ${colors.GreyE1};
    color: ${colors.Grey96};
  }
`;
const TechButtons = ({
  id,
  label,
  value,
  onClick,
  disabled,
  isArrow,
  isDraggable,
  className,
  small
}) => {
  const giveSymbol = () => {
    if (isArrow) {
      if (disabled) {
        return <ArrowRightDownDisableIcon />;
      } else {
        return <ArrowRightDownIcon />;
      }
    } else {
      if(isDraggable){
        if (disabled) {
          return (
            <>
              <DragButtonDisableIcon />
              {label}
            </>
          );
        } else {
          return (
            <>
              <DragButtonIcon />
              {label}
            </>
          );
        }
      }
      else{
        if (disabled) {
          return (
            <>
              {label}
            </>
          );
        } else {
          return (
            <>
              {label}
            </>
          );
        }
      }
      }
  };
  return (
    <>
      <StyledButton
        id={id}
        label={label}
        value={value}
        className={className}
        onClick={onClick}
        disabled={disabled}
        isArrow={isArrow}
        isDraggable={isDraggable}
        small={small}
      >
        {/* {isDraggable && disabled&& <DragButtonDisableIcon/>}
       {isDraggable && !disabled && <DragButtonIcon/>}
        {isArrow && disabled && <ArrowRightDownDisableIcon/>}
      {isArrow && !disabled && <ArrowRightDownIcon/>}
      {label} */}
        {giveSymbol()}
      </StyledButton>
    </>
  );
};

export default TechButtons;
