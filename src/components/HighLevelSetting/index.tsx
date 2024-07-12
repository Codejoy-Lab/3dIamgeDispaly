import { useState } from "react";
import styles from "./index.module.scss";
import type { GetProp, UploadProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface HighLevelSettingProps {
  onChange: Function;
}
const HighLevelSetting = (props: HighLevelSettingProps) => {
  const { onChange } = props;
  const [value, setValue] = useState("");
  const handleValueChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };
  return (
    <div className={styles.HighLevelSetting}>
      <div className={styles.HighLevelSettingTitle}>负向提示词：</div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={handleValueChange}
        placeholder="输入不想再画面中出现的内容，比如“胡子”，“人”"
      ></textarea>
    </div>
  );
};
export default HighLevelSetting;
