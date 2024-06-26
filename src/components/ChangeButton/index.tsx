import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';

export default (props: any) => {
  const { chatId, onModelChange } = props;
  const [url, setUrl] = useState('');
  const list = [
    {
      title: '点击说话',
      callback: async () => {
        // 调用语音接口
      },
    },
    {
      title: '停止说话',
      callBack: async () => {
        // 发送文字给大模型
        // 接收模型路径
      },
    },
    {
      title: '生成3d模型',
      callback: async () => {
        // 改变three的模型
        onModelChange(url);
      },
    },
  ];
  const [status, setStatus] = useState<any>({
    title: '点击说话',
    callback: () => {},
  });
  useEffect(() => {
    setStatus(list[0]);
  }, [chatId]);
  return (
    <Button {...props} onClick={status.callback}>
      {status.title}
    </Button>
  );
};
