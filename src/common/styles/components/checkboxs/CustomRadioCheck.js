/* eslint-disable max-len */
import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { checkBoxStyles, colors, fontStyles, radioStyles } from "../../Theme";

const CustomFormCheck = styled(Form.Check)`
    & .form-check-input[type=checkbox]{
        border-radius:2px;
        background-color:${colors.White};
        box-shadow:none;
        border-color: ${({isError})=>(isError? "#E4001C":"#e1e1e1")};
        :hover{
          border-color: ${colors.PrimaryDarkAquaMarine};
        }
    }
    & .form-check-input:checked[type=checkbox]{
      border-color: ${colors.PrimaryDarkAquaMarine};
      background-color: ${colors.PrimaryDarkAquaMarine};
    }
    & .form-check-input[type=checkbox]:disabled{
      ${checkBoxStyles.defaultCheckBox}
      border-color:"#e1e1e1";
      pointer-events: none;
    }
    & .form-check-input[type=radio]{
        background-color: ${colors.White};
        box-shadow:none;
        border-color: ${({isError})=>(isError? "#E4001C":"#e1e1e1")};
        :hover{
            border-color: ${colors.PrimaryDarkAquaMarine};
            box-shadow:none;
        }
    }
    & .form-check-input:checked[type=radio]{
        background-color: ${colors.PrimaryDarkAquaMarine};
        border-color: ${colors.PrimaryDarkAquaMarine};
        box-shadow: none;
    }
    & .form-check-input[type=radio]:disabled{
      box-shadow: none;
      border: 1px solid ${colors.Grey96};
      background-color: ${colors.GreyE1};
      pointer-events: none;
    }
    & .form-check-label{
      ${fontStyles.diodrum14}
      color: ${colors.Black};
    }
`;
const CustomRadioCheck = ({type, id, label, checked, defaultChecked, onChange, value, name, isError, disabled, className, onClick}) => {
  return (
    <>
      <CustomFormCheck className={className} type={type} defaultChecked={defaultChecked} checked={checked} onClick={onClick} isError={isError} id={id} label={label} value={value} name={name} disabled={disabled} onChange={onChange}/>
    </>
  );
};

export default CustomRadioCheck;