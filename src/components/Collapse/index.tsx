import React, { ReactNode } from "react";
import { Collapse } from "antd";
import styles from "./index.module.scss";
interface Collapse {
  onChange: (...args: any) => void;
  items: { label: string; children: ReactNode }[];
}

export default (props) => {
  const { onChange = () => {}, items } = props;

  return (
    <div className={styles.container}>
      <Collapse
        bordered={false}
        defaultActiveKey={1}
        onChange={onChange}
        items={items}
        expandIconPosition={"right"}
      />
    </div>
  );
};
