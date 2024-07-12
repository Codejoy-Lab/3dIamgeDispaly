import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload, message, Radio, RadioChangeEvent } from "antd";
import Three3D from "@/components/Three3D";
import Collapse from "@/components/Collapse";
import Bar from "@/components/Bar";
import type { GetProp, UploadFile, UploadProps, CollapseProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default () => {
  const panelStyle: React.CSSProperties = {
    padding: "20px",
    color: "#fff",
    // backgroundColor: "red",
  };
  const items: CollapseProps["items"] = [
    {
      label: "图片",
      key: 1,
      children: <UploadImage />,
      style: panelStyle,
    },
    {
      label: "风格",
      key: 2,
      children: <StyleSelcted />,
      style: panelStyle,
    },

    {
      label: "高级设置",
      key: 3,
      children: <HighLevelSetting />,
      style: panelStyle,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>AI生成3d模型</div>
        <div className={styles.collapse}>
          <Collapse onChange={() => {}} items={items}></Collapse>
        </div>

        <ButtonRow></ButtonRow>
      </div>
      <div className={styles.right}>
        {/* <Three3D modelUrl={"#"} style={{ width: "100%", height: "100%" }} /> */}
      </div>
    </div>
  );
};

interface ButtonRow {}
const ButtonRow: React.FC = (props: ButtonRow) => {
  return (
    <div className={styles.ButtonRow}>
      <div className={styles.button}>生成模型</div>
    </div>
  );
};

const StyleSelcted: React.FC = (props) => {
  const list = [
    {
      name: "a",
      label: "A : Head-to-body height ratio:",
      value: 1,
      range: [0, 2],
    },
    {
      name: "b",
      label: "B: Head-to-body width ratio:",
      value: 1,
      range: [0, 2],
    },
    {
      name: "c",
      label: "C : Legs-to-body height ratio:",
      value: 1,
      range: [0, 2],
    },
    {
      name: "d",
      label: "D: Arms-to-body length ratio:",
      value: 1,
      range: [0, 2],
    },
    {
      name: "e",
      label:
        "E : Span of two legs, range from 0 to 15, default 9 if not specified:",
      value: 9,
      range: [0, 15],
    },
  ];
  const [modelType, setModelType] = useState(1);
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
  };
  const handleValueChange = (data) => {
    console.log(data);

    setValueObj((old) => ({
      ...old,
      [data.name]: data.value,
    }));
  };
  return (
    <div className={styles.StyleSelcted}>
      <div className={styles.typeSelected}>
        <div className={styles.typeHeader}>模型类别</div>
        <Radio.Group onChange={handleTypeChange} value={modelType}>
          <Radio value={1}>物品模型</Radio>
          <Radio value={2}>人物模型</Radio>
        </Radio.Group>
      </div>
      <>
        {modelType == 2
          ? list.map((item) => {
              return (
                <div key={item.label}>
                  <span className={styles.typeLabel}>{`${item.label}  ${
                    valueObj[item.name]
                  }`}</span>
                  <Bar
                    name={item.name}
                    value={item.value}
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

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface UploadImageProps {
  value?: string;
  onChange: (...args: any) => void;
}
const UploadImage: React.FC = (props: UploadImageProps) => {
  const { onChange } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange && onChange();
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

// 高级设置组件

const HighLevelSetting = () => {
  const [value, setValue] = useState("");
  const handleValueChange = (e) => {
    const value = e.target.value;
    setValue(value);
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
