import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

import Banner from '../../components/Banner';
import ChangeButton from '../../components/ChangeButton';
import { Button, Spin } from 'antd';
import { getImage, getModel } from '../../request/api';
import Three3D from '../../components/Three3D';
import { message as GlobleTip } from 'antd';
function ThreeDModel() {
  const [modelUrl, setModelUrl] = useState('/3dModels/model.obj');
  const [imageUrl, setImageUrl] = useState(
    '/3afad671-4cda-4664-be33-eef011d06e51-1.png'
  );

  const handleModelChange = (obj: { imageUrl: any; objUrl: any }) => {
    const { imageUrl, objUrl } = obj;
    console.log('data====', { imageUrl, objUrl });

    objUrl && setModelUrl(objUrl);
    imageUrl && setImageUrl(imageUrl);
  };
  function downloadFile(url, fileName) {
    // 创建一个a元素
    var a =
      document.getElementById('downloadLink') || document.createElement('a');

    // 设置a元素的href属性为文件的URL
    // @ts-ignore

    a.href = url;
    // @ts-ignore

    // 设置下载的文件名
    a.download = fileName || 'download';

    // 触发点击事件
    document.body.appendChild(a);
    a.click();

    // 清理
    document.body.removeChild(a);
  }
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={styles.container}>
      <Banner title="“言出法随！！！”" style={{ width: '100%' }} />
      <ChatBox
        modelUrl={modelUrl}
        onModelChange={handleModelChange}
        imageUrl={imageUrl}
        setIsLoading={setIsLoading}
        onDownload={() => {
          downloadFile(modelUrl, 'model.obj');
        }}
      ></ChatBox>
      <PreViewImage imageUrl={imageUrl} isLoading={isLoading} />
      <Three3D modelUrl={modelUrl} style={{ width: '30%', height: '100%' }} />
    </div>
  );
}

export default ThreeDModel;

export const PreViewImage = (props) => {
  const { isLoading, imageUrl } = props;
  return (
    <div className={styles.PreViewImage}>
      {!isLoading ? (
        <>{imageUrl ? <img width={'100%'} src={imageUrl} /> : null}</>
      ) : (
        <div className={styles.loading}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export const ChatBox = (props: any) => {
  const { onModelChange, onDownload, modelUrl, setIsLoading } = props;
  const [message, setMessage] = useState('一只坐着的小狗');
  const handleQuestionChange = (question: string) => {
    setMessage(question);
  };
  // const [isLoading, setIsLoading] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [isGenDisabled, setIsGenDisabled] = useState(true);

  const [image, setImage] = useState('');
  const [obj, setObj] = useState('');
  const basename = import.meta.env.VITE_API_URL;

  const getChatId = () => {
    let date = new Date();
    return date.getTime();
  };
  const [chatId, setChatId] = useState(getChatId());
  const [controller, setController] = useState(new AbortController());
  useEffect(() => {
    // const source = new AbortController();
    // setSignal(source.signal)
  }, []);
  return (
    <div className={styles.chatBox}>
      <div className={styles.optionArea}>
        <div className={styles.title}>说出你想要的模型吧</div>
        <div className={styles.messageBox}>{message}</div>
        <div className={styles.buttonrow}>
          <ChangeButton
            signal={controller.signal}
            chatId={chatId}
            type={'primary'}
            style={{
              width: '30%',
              height: '3rem',
              fontSize: '1.5rem',
              color: '#fff',
            }}
            onQuestionChange={handleQuestionChange}
            onModelChange={onModelChange}
            onLoadingChange={(v: boolean) => {
              setIsLoading(v);
            }}
            setIsGenDisabled={(v) => {
              setIsGenDisabled(v);
            }}
            isResetDisabled={isResetDisabled}
            setIsResetDisabled={setIsResetDisabled}
            setImage={setImage}
            setObj={setObj}
          ></ChangeButton>
          <Button
            type="primary"
            style={{
              width: '30%',
              height: '3rem',
              fontSize: '1.5rem',
              color: '#fff',
            }}
            disabled={isGenDisabled}
            onClick={() => {
              setIsResetDisabled(true);
              setIsLoading(true);
              getImage()
                .then((image) => {
                  console.log('image', image);
                  const totalImageUrl = `${basename}/static/output_img/${image}`;
                  setImage(totalImageUrl);
                  setIsLoading(false);
                  onModelChange({
                    imageUrl: totalImageUrl,
                    objUrl: '',
                  });

                  getModel(image)
                    .then((model) => {
                      const totalModelUrl = `${basename}/static/output_obj/${model}`;
                      console.log('model', totalModelUrl);
                      // setObjUrl(totalModelUrl);
                      setObj(totalModelUrl);
                      onModelChange({
                        imageUrl: totalImageUrl,
                        objUrl: totalModelUrl,
                      });
                      setIsGenDisabled(true);
                      setIsResetDisabled(false);
                    })
                    .catch((res) => {
                      setIsLoading(false);
                      GlobleTip.error('生成失败，请重试', 1.5);
                    });
                })
                .catch((res) => {
                  GlobleTip.error('生成失败，请重试', 1.5);
                  setIsLoading(false);
                });
            }}
          >
            生成
          </Button>
          <Button
            disabled={!modelUrl}
            type={'primary'}
            style={{
              width: '30%',
              height: '3rem',
              fontSize: '1.5rem',
              color: '#fff',
            }}
            onClick={onDownload}
          >
            下载模型
          </Button>
        </div>
      </div>
    </div>
  );
};
