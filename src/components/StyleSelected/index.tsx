import React, { useState } from "react";
import styles from "./index.module.scss";
import { Radio } from "antd";
import Bar from "@/components/Bar";

interface StyleSelectedProps {
  onChange: any;
}
const StyleSelcted = (props: StyleSelectedProps) => {
  const { onChange } = props;
  const list = [
    {
      name: "a",
      label: "A : Head-to-body height ratio:",
      value: 1,
      range: [0, 2],
      title: "头身高比",
    },
    {
      name: "b",
      label: "B: Head-to-body width ratio:",
      value: 1,
      range: [0, 2],
      title: "头部与身体宽度比",
    },
    {
      name: "c",
      label: "C : Legs-to-body height ratio:",
      value: 1,
      range: [0, 2],
      title: "腿身高比",
    },
    {
      name: "d",
      label: "D: Arms-to-body length ratio:",
      value: 1,
      range: [0, 2],
      title: "手臂与身体长度比",
    },
    {
      name: "e",
      label:
        "E : Span of two legs, range from 0 to 15, default 9 if not specified:",
      value: 9,
      range: [0, 15],
      title: "两条腿的跨度（范围从0到15）",
    },
  ];
  const [modelType, setModelType] = useState(1);
  const [poseType, setPoseType] = useState(1);
  const [valueObj, setValueObj] = useState({
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 9,
  });
  const handleTypeChange = (e) => {
    const v = e.target.value;
    setModelType(v);
    onChange({
      modelType: v,
      poseType: poseType,
      valueObj: valueObj,
    });
  };
  const handleValueChange = (data) => {
    const newValue = {
      ...valueObj,
      [data.name]: data.value,
    };
    setValueObj(newValue);
    onChange({
      modelType: modelType,
      poseType: poseType,
      valueObj: newValue,
    });
  };
  const handlePoseChange = (e) => {
    const v = e.target.value;
    setPoseType(v);
    onChange({
      modelType: modelType,
      valueObj: valueObj,
      poseType: v,
    });
  };
  return (
    <div className={styles.StyleSelcted}>
      <div className={styles.typeSelected}>
        <div className={styles.typeHeader}>模型类别：</div>
        <Radio.Group onChange={handleTypeChange} value={modelType}>
          <Radio value={1}>物品模型</Radio>
          <Radio value={2}>人物模型</Radio>
        </Radio.Group>
        <>
          {modelType == 2 ? (
            <Radio.Group onChange={handlePoseChange} value={poseType}>
              <Radio value={1}>A-pose</Radio>
              <Radio value={2}>T-pose</Radio>
            </Radio.Group>
          ) : null}
        </>
      </div>
      <>
        {modelType == 2
          ? list.map((item) => {
              return (
                <div key={item.label}>
                  <span className={styles.typeLabel}>{`${item.title}  ${
                    valueObj[item.name]
                  }`}</span>
                  <Bar
                    name={item.name}
                    value={valueObj[item.name]}
                    range={item.range}
                    onChange={handleValueChange}
                  />
                </div>
              );
            })
          : null}
      </>
    </div>
  );
};
export default StyleSelcted;
