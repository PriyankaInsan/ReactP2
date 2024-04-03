import styled from "styled-components";
import { colors } from "../../../../common/styles/Theme";

const MultiRangeSliderStyled =styled.div`
.megaContainer{
  display: flex;
}
.minLimit{
  border: 1px solid red;
}
  .container {
    /* height: 20px; */
    padding: 0;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .slider {
    position: relative;
    width: 200px;
  }
  .slider__track,
  .slider__range,
  .slider__left-value,
  .slider__right-value {
    position: absolute;
  }
  .slider__track,
  .slider__range {
    border-radius: 3px;
    height: 5px;
  }
  .slider__track {
    background-color: #ced4da;
    width: 100%;
    z-index: 1;
    height: 4px;
  }
  
  .slider__range {
    background-color:  ${colors.LightLightTeal};
    z-index: 1;
    height: 4px;

  }
  
  .slider__left-value,
  .slider__right-value {
    color: #dee2e6;
    font-size: 12px;
    margin-top: 20px;
  }
  
  .slider__left-value {
    left: 6px;
  }
  
  .slider__right-value {
    right: -4px;
  }
  
  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 200px;
    outline: none;
  }
  
  .thumb--left {
    z-index: 2;
  }
  .thumb--right {
    z-index: 2;
  }
  
  .thumb::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${colors.LightLightTeal};
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    pointer-events: all;
    position: relative;

  }
  .limitLabel{
    margin-top: 0px;
    font-size: 14px;
    width:20px;
  }

  .thumb::-moz-range-thumb {
    background-color: rgb(241, 16, 16);
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;}
`;
export default MultiRangeSliderStyled;

