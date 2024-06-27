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
  const { chatId, onModelChange, onQuestionChange, onLoadingChange } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [objUrl, setObjUrl] = useState('');
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const basename = 'http://127.0.0.1:8880';
  const list = [
    {
      title: '点击说话',
      callback: async () => {
        // 调用语音接口
        setStatus(list[1]);
        startTapeApi();
      },
    },
    {
      title: '停止说话',
      callback: async () => {
        stopTapeApi();
        // 获取地址
        const question = await getQuestion();
        onModelChange({
          objUrl: '',
        });
        question && onQuestionChange(question);
        console.log('question', question);
        setIsResetDisabled(true);
        setStatus(list[2]);
        // 获取预览图片地址
        onLoadingChange(true);
        getImage().then((image) => {
          console.log('image', image);
          const totalImageUrl = `${basename}/static/output_img/${image}`;
          setImageUrl(totalImageUrl);
          onModelChange({
            imageUrl: totalImageUrl,
            objUrl: '',
          });
          onLoadingChange(false);

          getModel(image).then((model) => {
            const totalModelUrl = `${basename}/static/output_obj/${model}`;
            console.log('model', totalModelUrl);
            setObjUrl(totalModelUrl);
            onModelChange({
              imageUrl: totalImageUrl,
              objUrl: totalModelUrl,
            });
            setStatus(list[0]);
          });
        });

        // const image: string = await getImage();
        // console.log('image', image);
        // const totalImageUrl = `${basename}/static/output_img/${image}`;
        // setImageUrl(totalImageUrl);
        // onLoadingChange(false);
        // // 获取模型地址
        // const model = await getModel(image);
        // const totalModelUrl = `${basename}/static/output_obj/${model}`;
        // console.log('model', totalModelUrl);
        // setObjUrl(totalModelUrl);
        // onModelChange({
        //   imageUrl: totalImageUrl,
        //   objUrl: totalModelUrl,
        // });
        // setStatus(list[0]);
      },
    },
    {
      title: '生成3d模型',
      callback: async (obj?: any) => {
        // 改变three的模型
        setStatus(list[0]);
        obj && onModelChange(obj);
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
