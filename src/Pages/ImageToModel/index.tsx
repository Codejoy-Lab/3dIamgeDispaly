import React from "react";
import styles from "./index.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Image, Upload, message } from "antd";
import Three3D from "@/components/Three3D";
import Collapse from "@/components/Collapse";
import Bar from "@/components/Bar";
const { Dragger } = Upload;

export default () => {
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const items = [
    {
      label: "提示词",
      key: 1,
      childre: [],
    },
    {
      label: "风格",
      key: 2,
      childre: [],
    },
    {
      label: "尺寸",
      key: 3,
      childre: [],
    },
    {
      label: "高级设置",
      key: 4,
      childre: [],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Collapse onChange={() => {}} items={items}></Collapse>

        {/* <div className={styles.uploadContainer}>   
                <Dragger  {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                </Dragger>
                <ButtonRow></ButtonRow>
            </div> */}
      </div>
      <div className={styles.right}>
        <Three3D modelUrl={"#"} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

interface ButtonRow {}
const ButtonRow = (props: ButtonRow) => {
  return (
    <div className={styles.ButtonRow}>
      <Button>生成模型</Button>
    </div>
  );
};

const StyleSelcted = (props) => {
  const list = [
    { label: "A : Head-to-body height ratio," },
    { label: "B: Head-to-body width ratio," },
    { label: "C : Legs-to-body height ratio," },
    { label: "D: Arms-to-body length ratio," },
    {
      label:
        "E : Span of two legs, range from 0 to 15, default 9 if not specified.",
    },
  ];

  return (
    <div>
      {list.map((item) => {
        return (
          <div key={item.label}>
            <span>{item.label}</span>
            <Bar value={70} onChange={(v) => {}} />
          </div>
        );
      })}
    </div>
  );
};
