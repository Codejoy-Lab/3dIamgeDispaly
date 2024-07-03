import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button, message } from 'antd';
import {
  startTapeApi,
  stopTapeApi,
  getQuestion,
  getImage,
  getModel,
} from '../../request/api';

export default (props: any) => {
  // const pathname = window.location.pathname
  const { chatId, onModelChange, onQuestionChange, onLoadingChange, isResetDisabled, setIsResetDisabled, signal, setImage, setObj, setIsGenDisabled } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [objUrl, setObjUrl] = useState('');
  // const [isResetDisabled, setIsResetDisabled] = useState(false);
  const basename = import.meta.env.VITE_API_URL;
  const list = [
    {
      title: '开始说话',
      callback: async () => {
        // 调用语音接口
        setStatus(list[1]);
        onQuestionChange('正在倾听你的声音')
        startTapeApi();
      },
    },
    {
      title: '停止说话',
      callback: async () => {
       
        const question = await getQuestion();
        setIsGenDisabled(false)
        onQuestionChange(`${question}`);
        console.log('question', question);
        setStatus(list[2]);
        // 获取预览图片地址
        return
     
       
      },
    },
    {
      title: '重新说话',
      callback: async (obj?: any) => {
        setStatus(list[1]);
        onQuestionChange('正在倾听你的声音')
        startTapeApi();
        return
       
      },
    },
  ];
  const [status, setStatus] = useState<any>(list[0]);
  useEffect(() => {
    setStatus(list[0]);
  }, [chatId]);
  return (
    <Button
      {...props}
      onClick={() => {
        status.callback({ imageUrl, objUrl });
      }}
      disabled={isResetDisabled}
    >
      {status.title}
    </Button>
  );
};
