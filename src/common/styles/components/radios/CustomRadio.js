import React from "react";
import styled from "styled-components";
import { colors, fontStyles} from "../../Theme";
import "../../diodrumFont.css";
import "../../notoSansFont.css";

const RadioWrapper = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;
const RadioInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  min-width: 16px;
  max-width: 16px;
  width: 16px;
  height: 16px;
  border-radius: 100px;
  border: 1px solid ${colors.GreyE1};
  background-color: ${colors.White};
  position: relative;
  cursor: pointer;
  &::after{
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color:${props=>props.disabled?colors.Grey96:colors.PrimaryDarkAquaMarine};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:checked{
    /* background-color: ${colors.PrimaryDarkAquaMarine}; */
    border: 1px solid ${colors.PrimaryDarkAquaMarine};
    &::after{
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color:${props=>props.disabled?colors.Grey96:colors.PrimaryDarkAquaMarine};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:not(:checked){
    ::after{
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${props=>props.disabled?colors.GreyE1:colors.White};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover{
    border: 1px solid ${colors.PrimaryDarkAquaMarine};
  }
  &:invalid{
    border: 1px solid ${colors.DupontBrandRed};
  }
  &:disabled{
    border: 1px solid ${colors.Grey96};
    pointer-events: none;
    &::after{
      background-color: #969696;
    }
    :not(:checked){
      background-color: #e1e1e1;
      ::after{
        background-color: #e1e1e1;
      }
    }
  }
`;
const RadioLabel = styled.span`
  font-family:${(props)=>props.fontFamily || "DiodrumRegular"};
  font-size: 14px;
  font-weight: ${(props)=>props.fontWeight || "400"};
  font-style: normal;
  line-height: ${(props)=>props.lineHeight || "16px"};
  color: ${(props)=>props.disabled?colors.Grey96:colors.Black};
`;
const CustomRadio = ({className ,label, ...props}) => {
  return (
    <>
      <RadioWrapper className={className}>
        <RadioInput type="radio" {...props}/>
        <RadioLabel disabled={props.disabled} fontFamily={props.fontFamily} lineHeight={props.lineHeight} fontWeight={props.fontWeight}>{label}</RadioLabel>
      </RadioWrapper>
    </>
  );
};

export default CustomRadio;