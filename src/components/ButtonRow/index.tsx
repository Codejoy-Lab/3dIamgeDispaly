import { useState } from "react";
import styles from "./index.module.scss";
import type { GetProp, UploadProps } from "antd";
interface ButtonRow {
  onSubmit: () => void;
}
const ButtonRow: React.FC = (props: ButtonRow) => {
  const { onSubmit } = props;
  return (
    <div className={styles.ButtonRow}>
      <div className={styles.button} onClick={onSubmit}>
        生成模型
      </div>
    </div>
  );
};
export default ButtonRow;
