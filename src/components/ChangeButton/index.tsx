import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { Button } from 'antd';

export default (props: any) => {
  const { chatId , onModelChange} = props;
  const list = [
    {
      title: '点击说话',
      callback: () => {
        // 调用语音接口
      },
    },
    {
      title: '生成3d模型',
      callback: () => {},
    },
  ];
  const [status, setStatus] = useState({
    title: '点击说话',
    callback: () => {},
  });
  useEffect(() => {
    setStatus(list[0]);
  }, [chatId]);
  return <Button {...props} onClick={status.callback} >{status.title}</Button>;
};
