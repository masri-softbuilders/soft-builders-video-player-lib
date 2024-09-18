import React, { InputHTMLAttributes, SetStateAction, useState } from "react";
import "./style.css";

type Props = {
  value: number;
  handleValueChange: React.ChangeEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const Slider = ({
  value,
  handleValueChange,
  min = 0,
  max = 100,
  ...rest
}: Props) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleValueChange}
      className={
        "sb-w-full sb-h-2 sb-bg-transparent sb-bg-opacity-50 sb-rounded-lg sb-appearance-none sb-cursor-pointer sb-range-slider sb-slider-thumb " +
        rest.className
      }
      style={{
        background: `linear-gradient(to right, #f97316 ${value}%, #30303070 ${value}%)`,
      }}
      {...rest}
    />
  );
};

export default Slider;
