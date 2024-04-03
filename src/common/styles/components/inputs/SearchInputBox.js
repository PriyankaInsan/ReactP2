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
    border-radius: 4px;
    border: 1px solid;
    border-color: ${({isError, isFocused, disabled, isWarning})=>isError?"#E4001C":isFocused?"#007672":disabled?"#969696":isWarning?"#FF9E19":"#e1e1e1"};
    background-color:${({disabled})=>disabled?"#e1e1e1":"#fff"};
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: ${({disabled, isError})=>disabled?"none":isError?"none":""};
    &:hover{
        box-shadow: ${({isFocused, disabled, isError})=>isFocused?"0px 0px 0px 4px rgba(0, 169, 224, 0.20)":disabled?"none":isError?"none":"0px 0px 0px 4px rgba(0, 169, 224, 0.20)"};
    }
`;
const StyledInput = styled.input`
    width:100%;
    background-color:${colors.White};
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 4px;
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
const StyledInputText = styled.span`
    background-color: ${(props)=>props.unitBgColor || colors.GreyF8};
    padding: 4px 10px;
    ${fontStyles.diodrum14};
    color: ${({disabled})=>disabled?"#969696":"#000"};
    opacity: ${({disabled})=>disabled?"0":"1"};
`;
const StyledSearchText = styled.span`
    background-color: ${(props)=>props.iconBgColor || colors.White};
    padding: 4px 10px;
    ${fontStyles.diodrum14};
    color: ${({disabled})=>disabled?"#969696":"#000"};
    opacity: ${({disabled})=>disabled?"0":"1"};
    border-left: 1px solid var(--Grey-E1, #E1E1E1);
    border-radius: 0px 4px 4px 0;
`;
const SearchInputBox = ({isError, isFocused,ref, icon,iconBgColor,onSearch, onClear, value,name, onClick, isWarning, unitBgColor, onChange, placeholder, inputText, onBlur, onFocus, disabled,defaultValue,type, id,onKeyDown}) => {
    const handleFocus =(e)=>{
        onFocus && onFocus(e);
      };
      const handleBlur=(e)=>{
        onBlur && onBlur(e);
      };
  return (
    <>
        <StyledInputWrapper isError={isError} isFocused={isFocused} disabled={disabled} id={id} isWarning={isWarning} onKeyDown={onKeyDown}>
        <StyledInput id={id} type={type} value={value} onFocus={handleFocus} ref={ref}
        onBlur={handleBlur} onChange={onChange} placeholder={placeholder} 
        defaultValue={defaultValue} name={name} disabled={disabled}/>
       <StyledInputText disabled={disabled} unitBgColor={unitBgColor} onClick={()=>onChange({target:{name:name,value:""}})}>{inputText}</StyledInputText>
       <StyledSearchText iconBgColor={iconBgColor} onClick={onSearch}>{icon}</StyledSearchText>
      </StyledInputWrapper>
    </>
  );
};

export default SearchInputBox;