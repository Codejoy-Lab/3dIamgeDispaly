import React from "react";
import styles from "./index.module.scss";
import Collapse, { ItemWrap } from "@/components/Collapse";
import type { GetProp, UploadProps, CollapseProps } from "antd";
import UploadImage from "@/components/UploadImage";
import StyleSelcted from "@/components/StyleSelected";
import HighLevelSetting from "@/components/HighLevelSetting";
import ButtonRow from "@/components/ButtonRow";
import Banner from "@/components/Banner";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default () => {
  const panelStyle: React.CSSProperties = {
    padding: "20px",
    color: "#fff",
  };
  const items: CollapseProps["items"] = [
    {
      label: "图片",
      key: 1,
      children: (
        <ItemWrap>
          <UploadImage onChange={(fileList) => {}} />
        </ItemWrap>
      ),
      style: panelStyle,
    },
    {
      label: "风格",
      key: 2,
      children: (
        <ItemWrap>
          <StyleSelcted onChange={(v) => {}} />
        </ItemWrap>
      ),
      style: panelStyle,
    },

    {
      label: "高级设置",
      key: 3,
      children: (
        <ItemWrap>
          <HighLevelSetting onChange={(v) => {}} />
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
        {/* <Three3D modelUrl={"#"} style={{ width: "100%", height: "100%" }} /> */}
      </div>
    </div>
  );
};
