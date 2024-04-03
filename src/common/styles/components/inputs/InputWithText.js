/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledInputWrapper = styled.div`
    display: inline-flex;
    max-height: 32px;
    min-height: 2rem;
    width:100%;
    align-items: center;
    color: ${colors.Black};
    gap: -1px;
    align-self: stretch;
    border-radius: 2px;
    border: 1px solid;
    border-color: ${({isError, isFocused, disabled, isWarning})=>disabled?"#e1e1e1":isError?"#E4001C":isWarning?"#FF9E19":isFocused?"#007672":"#e1e1e1"};
    background-color:${({disabled})=>disabled?"#e1e1e1":"#fff"};
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: ${({disabled})=>disabled?"none":""};
    &:hover{
        box-shadow: ${({isFocused, disabled})=>isFocused?"0px 0px 0px 4px rgba(0, 169, 224, 0.20)":disabled?"none":"0px 0px 0px 4px rgba(0, 169, 224, 0.20)"};
    }
`;
const StyledInput = styled.input`
    width:100%;
    height:-webkit-fill-available;
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
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
`;
const StyledInputText = styled.span`
    background-color: ${(props)=>props.unitBgColor || colors.GreyF8};
    padding: 4px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${fontStyles.diodrum14};
    line-height: 1.3rem;
    color: ${({disabled})=>disabled?"#969696":"#000"};
    border-left:1px solid #e1e1e1;
`;

const InputWithText = ({isError,isFocused, className, value,name, step, unitBgColor, min, max, isWarning, onChange, placeholder, inputText, onBlur, onFocus,onWheel, onScroll,disabled,defaultValue,type, id,onKeyDown,onKeyPress}) => {
  const handleFocus =(e)=>{
    onFocus && onFocus(e);
  };
  const handleBlur=(e)=>{
    onBlur && onBlur(e);
  };
  return (
    <>
      <StyledInputWrapper className={className} isError={isError}isWarning={isWarning} isFocused={isFocused} disabled={disabled} >
        <StyledInput onKeyPress={onKeyPress} id={id} type={type} step={step} value={value} onFocus={handleFocus} onBlur={handleBlur} onWheel={onWheel} onScroll={onScroll} onChange={onChange} placeholder={placeholder} defaultValue={defaultValue} name={name} disabled={disabled} min={min} max={max} onKeyDown={onKeyDown}/>
        <StyledInputText disabled={disabled} unitBgColor={unitBgColor}>{inputText}</StyledInputText>
      </StyledInputWrapper>
    </>
  );
};

export default InputWithText;