import styled from "styled-components";
import { colors } from "../../Theme";

const StyledSelect = styled.select`
    display: flex;
    height: 32px;
    width:auto;
    padding: 5px 10px 2px 8px;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;
    border-radius: 2px;
    border: 1px solid;
    border-color: ${(props)=>props.isError?"#E4001C":"#e1e1e1"};
    background-color: ${colors.White};
    color: ${(props)=>props.disabled?"#969696":colors.Black};
    box-shadow: none;
    font-family: "DiodrumRegular";
    font-weight: 400;
    font-size: 14px;
    &:focus{
        outline:${colors.GreyE1};
        border-color: ${colors.SecondaryElfGreen};
        box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.20);
    }
    &:disabled{
        background-color: ${colors.GreyE1};
        pointer-events: none;
    }
    &:hover{
        box-shadow: 0px 0px 0px 4px rgba(0, 169, 224, 0.20);
    }
`;
export default StyledSelect;