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
  const { chatId, onModelChange, onQuestionChange, onLoadingChange, isResetDisabled, setIsResetDisabled } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [objUrl, setObjUrl] = useState('');
  // const [isResetDisabled, setIsResetDisabled] = useState(false);
  const basename = 'http://127.0.0.1:8880';
  const list = [
    {
      title: '点击说话',
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
        setIsResetDisabled(false)
        // stopTapeApi();
        // 获取地址
        onModelChange({
          objUrl: '',
          imageUrl: ""
        });
        onLoadingChange(true);
        onQuestionChange('正在生成你所说的物体的3D模型')

        const question = await getQuestion();

        onQuestionChange(`正在生成：${question}`);
        console.log('question', question);
        setIsResetDisabled(true);
        setStatus(list[2]);
        // 获取预览图片地址
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
            onQuestionChange(`${question}`);

            setStatus(list[0]);
          }).catch(res => {
            setStatus(list[0]);
            setIsResetDisabled(true)
          })
        }).catch(res => {
          setStatus(list[0]);
          setIsResetDisabled(true)
        })

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
      title: '正在生成中...',
      callback: async (obj?: any) => {
        return
        // // 改变three的模型
        // setStatus(list[0]);
        // obj && onModelChange(obj);
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
