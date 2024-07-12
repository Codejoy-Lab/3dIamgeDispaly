import React, { useRef } from "react";
import { Slider } from "antd";
import type { SliderSingleProps } from "antd";

import styles from "./index.module.scss";
interface BarProps {
  value: number;
  name: string;
  onChange: (data: { value: number; name: string }) => void;
  range: number[];
  step?: number;
}
export default (props: BarProps) => {
  const { value, onChange, range, name, step = 0.1 } = props;
  const barRef = useRef();
  return (
    <div className={styles.container}>
      <Slider
        step={step}
        min={range[0]}
        max={range[1]}
        tooltip={{ formatter }}
        value={value}
        onChange={(v) => {
          const data = {
            value: v,
            name,
          };
          onChange(data);
        }}
      />
    </div>
  );
};
const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
  value
) => `${value}`;
