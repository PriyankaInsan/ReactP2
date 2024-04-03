import React from "react";
import PropTypes from "prop-types";
// import "./ToggleSwitch.scss";
import styled from "styled-components";
import { fontStyles } from "../../Theme";

const ToggleBallStyled = styled.span`
  background-color:${(props)=>props.checked?"#fff":props.disabled?"#969696":"#000"};
`;
const ToggleInnerStyled = styled.span`
  ::after{
    color: ${(props)=>props.disabled?"#969696":"#000"} !important;
    border: ${(props)=>props.disabled?"1px solid #969696":props.checked?"1px solid #fff":"1px solid #000"} !important; 
    background-color: ${(props)=>props.disabled?"#fff":""};
  }
  ::before{
    background-color:${(props)=>props.disabled?"#969696":"#007672"};
  }
`;
const StyledSwitch = styled.div`
    position: relative;
    /* margin-right: 10px; */
    width: 75px;
    display: inline-block;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-align: left;
    .toggle-switch-checkbox {
      display: none;
    }
    .toggle-switch-label {     
      display: block;
      overflow: hidden;
      cursor: pointer;
      border: 0 solid #bbb;
      border-radius: 20px;
      margin: 0;
      :focus {
        outline: none;
        > span {
          box-shadow: 0 0 2px 5px red;
        }
      }
      > span:focus {
        outline: none;
      }
    }
    .toggle-switch-inner {
      display: block;
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
      ::before,
      ::after {
        display: block;
        float: left;
        width: 50%;
        height: 34px;
        padding: 0;
        line-height: 34px;
        font-size: 14px;
        color: white;
        font-weight: bold;
        box-sizing: border-box;
      }
      ::before {
        content: attr(data-yes);
        text-transform: uppercase;
        padding-left: 10px;
        /* background-color: #007672; */
        /* color: #fff; */
      }
    }
    .toggle-switch-disabled {
      /* background-color: #ddd; */
      cursor: not-allowed;
      ::before {
        /* background-color: #ddd; */
        cursor: not-allowed;
      }
    }
    .toggle-switch-inner:after {
      content: attr(data-no);
      text-transform: uppercase;
      padding-right: 10px;
      /* background-color: #fff; */
      /* color: #000; */
      text-align: right;
      /* border:1px solid #000; */
      border-radius: 20px;
    }
    .toggle-switch-switch {
      display: block;
      width: 24px;
      margin: 5px;
      /* background:${(checked)=>checked==true?"#000":"#fff"}; */
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      border: 0 solid #bbb;
      border-radius: 20px;
      transition: all 0.3s ease-in 0s;
    }
    .toggle-switch-checkbox:checked + .toggle-switch-label {
      .toggle-switch-inner {
        margin-left: 0;
      }
      .toggle-switch-switch {
        right: 0px;
      }
    }
    &.small-switch {
      width: 42px;
      .toggle-switch-inner {
        ::after{
          content: "OFF";
          ${fontStyles.diodrum10};
          height: 20px;
          line-height: 22px;
          padding-right: 5px;
        }
        ::before {
          content: "ON";
          ${fontStyles.diodrum10};
          height: 20px;
          line-height: 22px;
          padding-left: 6px;
        }
      }
      .toggle-switch-switch {
        width: 14px;
        height: 14px;
        right: 22px;
        margin: 3px;
      }
    }
    @media screen and (max-width: 991px) {
      transform: scale(0.9);
    }
    @media screen and (max-width: 767px) {
      transform: scale(0.825);
    }
    @media screen and (max-width: 575px) {
      transform: scale(0.75);
    }

`;
/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function. The props name, small, disabled
and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled
}) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  }

  return (
    <StyledSwitch className={(small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {id ? (
        <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <ToggleInnerStyled disabled={disabled}
            className={
              disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <ToggleBallStyled checked={checked} disabled={disabled}
            className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </StyledSwitch>
  );
};

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"]
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
