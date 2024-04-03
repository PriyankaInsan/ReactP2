import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledTextArea = styled.textarea`
  display: flex;
  resize: both;
  padding: 5px 7px;
  align-items: center;
  max-width: 100%;
  min-height: 32px;
  border-radius: 2px;
  border: 1px solid;
  border-color: ${({isError})=>(isError? "#E4001C":"#e1e1e1")};
  background-color:${colors.White};
  ${fontStyles.diodrum14};
  color: ${colors.Black};
  ::placeholder{
    color: ${colors.Grey96};
  }
  :disabled{
    background-color: ${colors.GreyE1};
    pointer-events: none;
    color: ${colors.Grey96};
  }
  &:hover{
    box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.20);
  }
  :focus{
    box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.20);
    border: 1px solid ${colors.SecondaryElfGreen};
    outline: none;
  }
  -webkit-appearance: none;
    -moz-apperarance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const CustomTextArea = ({value, cols, className, onChange, disabled, placeholder, isError, name, rows,onBlur,id
,maxHeight,minHeight,defaultValue,onFocus,isFocused }) => {
  return (
    <>
    <StyledTextArea maxHeight={maxHeight} cols={cols} defaultValue={defaultValue} minHeight={minHeight} onFocus={onFocus} isFocused={isFocused} id={id} className={className} value={value} rows={rows} onChange={onChange} disabled={disabled} name={name} placeholder={placeholder} isError={isError} onBlur={onBlur} />
    </>
  );
};

export default CustomTextArea;