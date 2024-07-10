import React from "react";
import styles from './index.module.scss'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Image, Upload,message } from 'antd';
import Three3D from "@/components/Three3D";
const { Dragger } = Upload;

export default ()=>{
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
    };
      

    return <div className={styles.container}>

            <div className={styles.left}>
            <div className={styles.uploadContainer}>   
                <Dragger  {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                </Dragger>
            </div>
            </div>
            <div className={styles.right}>
                <Three3D />            </div>
     </div>

}