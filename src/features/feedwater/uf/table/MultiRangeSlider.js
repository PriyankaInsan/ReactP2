import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateMinMaxSliderValue } from "../UFSlice";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const { sliderValue, sliderMin, sliderMax } = useSelector(
    (state) => state.UFStore
  );
  const dispath = useDispatch();
  const [minVal, setMinVal] = useState(sliderMin);
  const [maxVal, setMaxVal] = useState(sliderMax);
  const minValRef = useRef(sliderMin);
  const maxValRef = useRef(sliderMax);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - 6) / (16)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal]);
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, []);

  return (
    <div className="megaContainer">
      <div className="limitLabel">{6}</div>
      <div className="container">
        <input
          type="range"
          min={6}
          max={22}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
            dispath(
              updateMinMaxSliderValue({ name: "sliderMin", value: value })
            );
          }}
          className="thumb thumb--left"
          // style={{ zIndex: minVal > max - 100 && "5" }}
        />

        <input
          type="range"
          min={6}
          max={22}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            dispath(
              updateMinMaxSliderValue({ name: "sliderMax", value: value })
            );
          }}
          className="thumb thumb--right"
        />
        <div
          style={{
            left: `calc(${(100 * (minVal - 5.7)) / 18}%)`,
            position: "absolute",
            top: "-18px",
            fontSize:"11px",
          }}
        >
          {minVal}
        </div>
        <div
          style={{
            left: `calc(${(100 * (maxVal - 5.7)) / 18}%)`,
            position: "absolute",
            top: "-18px",
            fontSize:"11px",
          }}
        >
          {maxVal}
        </div>
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className="limitLabel">{22}</div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
