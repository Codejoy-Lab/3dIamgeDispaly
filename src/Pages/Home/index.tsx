import React from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import Banner from "@/components/Banner";
export default () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.container}>
      <Banner title="AI生成3D模型" style={{ width: "100%", height: "70px" }} />
      <div className={styles.content}>
        <div
          className={styles.Button}
          onClick={() => {
            handleClick("/imageToModel");
          }}
        >
          图生3D
        </div>
        <div
          className={styles.Button}
          onClick={() => {
            handleClick("/textToModel");
          }}
        >
          文生3D
        </div>
      </div>
    </div>
  );
};
