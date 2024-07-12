import React, { useRef } from "react";
import styles from "./index.module.scss";
import Three3D from "@/components/Three3D";
import Collapse, { ItemWrap } from "@/components/Collapse";
import type { CollapseProps } from "antd";
import StyleSelcted from "@/components/StyleSelected";
import HighLevelSetting from "@/components/HighLevelSetting";
import ButtonRow from "@/components/ButtonRow";
import Banner from "@/components/Banner";

export default () => {
  const panelStyle: React.CSSProperties = {
    padding: "20px",
    color: "#fff",
  };
  const data = useRef({ prompt: "", style: "" });
  const items: CollapseProps["items"] = [
    {
      label: "提示词",
      key: 1,
      children: (
        <ItemWrap>
          <TextArea
            onChange={(v) => {
              data.current.prompt = v;
            }}
          ></TextArea>
        </ItemWrap>
      ),
      style: panelStyle,
    },
    {
      label: "风格",
      key: 2,
      children: (
        <ItemWrap>
          <StyleSelcted onChange={(value) => {}} />
        </ItemWrap>
      ),
      style: panelStyle,
    },

    {
      label: "高级设置",
      key: 3,
      children: (
        <ItemWrap>
          <HighLevelSetting onChange={(value) => {}} />
        </ItemWrap>
      ),
      style: panelStyle,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Banner
          title="AI生成3d模型"
          style={{ height: "50px", width: "100%" }}
        />
        <div className={styles.collapse}>
          <Collapse onChange={() => {}} items={items}></Collapse>
        </div>
        <ButtonRow />
      </div>
      <div className={styles.right}>
        <Three3D modelUrl={"#"} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

interface TextAreaProps {
  onChange: (value: string) => void;
}

const TextArea = (props: TextAreaProps) => {
  const { onChange } = props;
  return (
    <textarea
      onChange={(e) => {
        const v = e.target.value;
        onChange && onChange(v);
      }}
      className={styles.textarea}
      placeholder="输入你想生成的3d模型，比如“一只小狗”"
    ></textarea>
  );
};
