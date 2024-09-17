import React, { SetStateAction, useState } from "react";
import "./style.css";

type Props = {
  value: number;
  handleValueChange: React.ChangeEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
};

const Slider = ({ value, handleValueChange, min = 0, max = 100 }: Props) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleValueChange}
      className="w-full h-2 bg-[#303030] bg-opacity-60  rounded-lg appearance-none cursor-pointer range-slider slider-thumb"
      style={{
        background: `linear-gradient(to right, #f97316 ${value}%, #303030 ${value}%)`,
      }}
    />
  );
};

export default Slider;
