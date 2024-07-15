import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Three3D from "@/components/Three3D";
import Collapse, { ItemWrap } from "@/components/Collapse";
import type { CollapseProps } from "antd";
import StyleSelcted from "@/components/StyleSelected";
import HighLevelSetting from "@/components/HighLevelSetting";
import ButtonRow from "@/components/ButtonRow";
import Banner from "@/components/Banner";
import { textToModel } from "@/request/api";

export default () => {
  const panelStyle: React.CSSProperties = {
    padding: "20px",
    color: "#fff",
  };
  const [modelUrl, setModelUrl] = useState("#");
  const data = useRef({
    prompt: "",
    style: {
      type: 1,
      poseType: 1,
      modelType: 1,
      valueObj: {},
    },
    setting: "",
  });
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
      label: "高级设置",
      key: 2,
      children: (
        <>
          <ItemWrap>
            <StyleSelcted
              onChange={(v) => {
                data.current.style = v;
              }}
            />
          </ItemWrap>
          <ItemWrap>
            <HighLevelSetting
              onChange={(v) => {
                data.current.setting = v;
              }}
            />
          </ItemWrap>
        </>
      ),
      style: panelStyle,
    },
  ];
  const handleSubmit = () => {
    console.log("submit", data.current);
    let param = { prompt: "" };
    if (data.current.style.type == 1) {
      param.prompt = data.current.prompt;
    } else {
      let style = "";
      if (data.current.style?.poseType == 2) {
        style = "T-pose:";
      } else {
        style = "A-pose:";
      }
      let list = Object.keys(data.current.style.valueObj).map((key) => {
        return data.current.style.valueObj[key];
      });
      let s = list.join(":");
      style += s;
      param.prompt = style;
    }
    console.log("param", param);

    textToModel(param).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Banner
          title="AI生成3d模型"
          style={{ height: "50px", width: "100%" }}
        />
        <div className={styles.collapse}>
          <Collapse onChange={() => {}} items={items} />
        </div>
        <ButtonRow onSubmit={handleSubmit} />
      </div>
      <div className={styles.right}>
        <Three3D
          modelUrl={modelUrl}
          style={{ width: "100%", height: "100%" }}
        />
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
