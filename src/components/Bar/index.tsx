import React from "react";
import { Progress } from "antd";

import styles from "./index.module.scss";
interface BarProps {
  value: number;
  onChange: (value: number) => void;
}
export default (props: BarProps) => {
  const { value, onChange } = props;
  return (
    <div className={styles.container}>
      <div className={styles.button}></div>
      <Progress percent={value}></Progress>
    </div>
  );
};
