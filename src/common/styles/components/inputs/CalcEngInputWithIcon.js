/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";
import CalcEngineInputBoxTriangle from "../../../icons/CalcEngineInputBoxTriangle";

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
    border-color: ${({isError, isFocused, disabled, isAutoPopulated})=>isError?"#E4001C":isFocused?"#007672":disabled?"#00A9E0":isAutoPopulated?"#00A9E0":"#00A9E0"};
    background-color:${(disabled)=>disabled?"#f0f0f0":"#FFF"};
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: ${({disabled})=>disabled?"none":""};
    /* &:hover{
        box-shadow: ${({isFocused, disabled})=>isFocused?"0px 0px 0px 4px rgba(0, 169, 224, 0.20)":disabled?"none":"0px 0px 0px 4px rgba(0, 169, 224, 0.20)"};
    } */
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
        background-color: ${colors.GreyF0};
        pointer-events: none;
        color: ${colors.Grey96};
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;
const StyledInputText = styled.span`
    background-color: ${(disabled)=>disabled?"#f0f0f0":colors.GreyF8};
    padding: 4px 10px;
    ${fontStyles.diodrum14};
    color: ${({disabled})=>disabled?"#969696":"#000"};
    position: relative;
    svg{
        position: absolute;
        bottom:-9.6px;
        right: 0px;
    }
`;
// eslint-disable-next-line max-len
const CalcEngInputWithIcon = ({id,isError, isFocused, value, onChange, placeholder, inputText, onBlur, onFocus, disabled, type, defaultValue, isAutoPopulated}) => {
    const handleFocus =(e)=>{
        onFocus && onFocus(e);
      };
      const handleBlur=(e)=>{
        onBlur && onBlur(e);
      };
  return (
    <>
    <StyledInputWrapper isError={isError} isFocused={isFocused} disabled={disabled} isAutoPopulated={isAutoPopulated}>
        <StyledInput id={id} type={type} value={value} onFocus={handleFocus} onBlur={handleBlur} onChange={onChange} placeholder={placeholder} disabled={disabled} defaultValue={defaultValue}/>
        <StyledInputText disabled={disabled}>
          <CalcEngineInputBoxTriangle/>
        </StyledInputText>
      </StyledInputWrapper>
    </>
  );
};

export default CalcEngInputWithIcon;