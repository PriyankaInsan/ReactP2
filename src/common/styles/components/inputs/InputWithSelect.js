/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledInputWrapper = styled.div`
    display: inline-flex;
    max-height: 32px;
    width:100%;
    align-items: center;
    color: ${colors.Black};
    gap: -1px;
    align-self: stretch;
    border-radius: 2px;
    border: 1px solid;
    border-color: ${({isError, isFocused, disabled})=>isError?"#E4001C":isFocused?"#007672":disabled?"#e1e1e1":"#e1e1e1"};
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: ${({disabled})=>disabled?"none":""};
    &:hover{
        box-shadow: ${({isFocused, disabled})=>isFocused?"0px 0px 0px 4px rgba(0, 169, 224, 0.20)":disabled?"none":"0px 0px 0px 4px rgba(0, 169, 224, 0.20)"};
    }
`;
const StyledInput = styled.input`
    width:100%;
    background-color:${colors.White};
    border: none;
    outline: none;
    padding: 4px 10px;
    ${fontStyles.diodrum14}
    &::placeholder{
        color: ${colors.Grey96};
    }
    &:disabled{
        background-color: ${colors.GreyE1};
        pointer-events: none;
        color: ${colors.Grey96};
    }
`;
const StyledSelectText = styled.select`
    background-color: ${(props)=>props.unitBgColor || colors.GreyF8};
    padding: 4px 10px;
    ${fontStyles.diodrum14};
    color: ${({disabled})=>disabled?"#969696":"#000"};
    border: none;
    outline: none;
`;
const InputWithSelect = ({isError, isFocused, value,name, unitBgColor, selectedValue, onValueChange, onChange, placeholder, options, onBlur, onFocus, disabled,defaultValue,type, id}) => {
    const handleFocus =(e)=>{
        onFocus && onFocus(e);
      };
      const handleBlur=(e)=>{
        onBlur && onBlur(e);
      };
  return (
    <>
    <StyledInputWrapper isError={isError} isFocused={isFocused} disabled={disabled} id={id}>
        <StyledInput id={id} type={type} value={value} onFocus={handleFocus} onBlur={handleBlur} onChange={onChange} placeholder={placeholder} defaultValue={defaultValue} name={name} disabled={disabled}/>
        <StyledSelectText disabled={disabled} unitBgColor={unitBgColor} onChange={onValueChange} value={selectedValue}>
        {options.map((option)=>(
            <option key={option} value={option}>{option}</option>
        ))}
        </StyledSelectText>
      </StyledInputWrapper>
    </>
  );
};

export default InputWithSelect;