/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  padding: 5px 7px;
  align-items: center;
  height: 32px;
  border-radius: 2px;
  border: 1px solid;
  border-color: ${({ isError, isWarning,disabled }) =>
   disabled?"#e1e1e1": isError ? "#E4001C" : isWarning ? "#FF9E19" : "#e1e1e1"};
  background-color: ${colors.White};
  ${fontStyles.diodrum14};
  color: ${colors.Black};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${colors.Grey96};
  }
  :disabled {
    background-color: ${colors.GreyE1};
    pointer-events: none;
    color: ${colors.Grey96};
  }
  :hover {
    box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.2);
  }
  :focus {
    box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.2);
    border-color: ${({ isWarning, isError }) =>
      isWarning ? "#FF9E19" : isError ? "#E4001C" : "#007672"};
    outline: none;
  }
`;
const CustomInput = ({
  value,
  onChange,
  disabled,
  placeholder,
  isError,
  isWarning,
  type,
  id,
  className,
  name,
  defaultValue,
  onBlur,
  min,
  max,
  step,
  pattern,onKeyDown,
  ref,
  isFocused,
  onFocus,
  onClick,
  onWheel
}) => {
  return (
    <>
      <StyledInput
        type={type}
        onKeyDown={onKeyDown}
        id={id}
        className={className}
        value={value}
        onChange={onChange}
        onWheel={onWheel}
        disabled={disabled}
        isWarning={isWarning}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        isFocused={isFocused}
        isError={isError}
        pattern={pattern}
        step={step}
        min={min}
        max={max}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      />
    </>
  );
};

export default CustomInput;
