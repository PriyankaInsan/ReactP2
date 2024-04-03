/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";
import { Form, InputGroup } from "react-bootstrap";

const CustomInputGroup = styled(InputGroup)`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;    height: 32px;
    border: 1px solid;
    border-color: ${({isError, isFocused, disabled, isWarning})=>isWarning?"#FF9E19":isError?"#E4001C":isFocused?"#007672":disabled?"#e1e1e1":"#e1e1e1"};
    border-radius: 2px;
    background-color:${({disabled})=>disabled?"#e1e1e1":colors.White};
    :hover{
        box-shadow: ${({isFocused, disabled, isError})=>isFocused?"0px 0px 0px 4px rgba(0, 169, 224, 0.20)":disabled?"none":isError?"none":"0px 0px 0px 4px rgba(0, 169, 224, 0.20)"};
    }
    &:focus{
        border-color:#007672 !important;
    }
    .form-control,.input-group-text{
        z-index: inherit !important;
        height: 30px;
        border:none !important;
        border-radius:0%;
        :hover{
            box-shadow: none !important;
        }
        :disabled{
            color: #969696;
        }
    }
    .input-group-text{
        background-color:transparent !important;
        padding: 4px 5px 4px 1px;
        ${fontStyles.diodrum14};
        color: ${({disabled})=>disabled?"#969696":"#000"};
        opacity: ${({disabled})=>disabled?"0":"1"};
        pointer-events: ${({disabled})=>disabled?"none":"normal"};
    }
    .form-control{
        box-shadow: none !important;
        ${fontStyles.diodrum14}
        color: ${colors.Black};
        background-color:transparent !important;
        pointer-events: ${({disabled})=>disabled?"none":"normal"};
        &::placeholder{
            ${fontStyles.diodrum14}
            color: ${colors.Grey96};
        }
        &:disabled{
            pointer-events: none;
        }
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`;

export default CustomInputGroup;