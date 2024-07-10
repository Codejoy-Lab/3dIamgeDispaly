import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// @ts-ignore
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default (props) => {
  const { modelUrl, style={} } = props;
  const mountRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current.lookAt(0, 0, 0); // 默认观察场景中心，可以根据需要调整
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    const objLoader = new OBJLoader();
    // const mtlLoader = new MTLLoader();
    // const fontLoader = new FontLoader();
    // 创建网格辅助器
    var size = 100; // 网格的大小
    var divisions = 100; // 网格的分割数
    var gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, 0, 10);
    gridHelper.rotation.x = Math.PI / 2; // 将网格旋转90度，使其与XY平面平行
    let modelBoundingBox = new THREE.Box3();
    // fontLoader.load('', function (font: any) {});
    const light = new THREE.PointLight(0x1e1b1b, 4);
    const ambientlight = new THREE.AmbientLight(0xffffff, 4);
    const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
    // 设置聚光灯的其他属性
    spotLight.angle = Math.PI / 4; // 设置光锥的角度，单位是弧度，这里是 45 度
    spotLight.penumbra = 0.2; // 设置光锥的边缘软化程度
    spotLight.castShadow = true; // 开启阴影投射
    // 可选：调整聚光灯的阴影投射范围和分辨率
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 0.5; // 近截面
    spotLight.shadow.camera.far = 500; // 远截面

    light.position.set(5, 5, 0);
    rendererRef.current.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    if (mountRef.current) {
      mountRef.current.appendChild(rendererRef.current.domElement);
    }

    cameraRef.current.position.set(0, 0, 0);
    scene.background = new THREE.Color(0x000000);
    // 将网格添加到场景中
    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      // 更新相机的长宽比例
      cameraRef.current.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
      // 更新渲染器的视口大小
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
    const render = () => {
      requestAnimationFrame(render);
      const rotationSpeed = 0.01; // 自转速度，可以根据需要调整
      if (scene.children.length > 0) {
        const object = scene.children[0]; // 假设你加载的模型是场景中的第一个对象
        object.rotation.y += rotationSpeed;
        rendererRef.current.render(scene, cameraRef.current);
      }
    };
    objLoader.load(
      modelUrl,
      (object: any) => {
        modelRef.current = object;
        scene.add(object); // Assuming 'scene' is your Three.js scene
        scene.add(light);
        scene.add(ambientlight);
        // scene.add(gridHelper);
        scene.add(spotLight);

        modelBoundingBox.setFromObject(object);
        // 获取包围盒的尺寸
        const modelSize = new THREE.Vector3();
        modelBoundingBox.getSize(modelSize);
        console.log('模型尺寸:', modelSize);
        // Adjust camera position
        const distance = Math.max(modelSize.x, modelSize.y, modelSize.z) * 2;
        const frontVector = new THREE.Vector3(0, 0, -1);
        const frontPosition = new THREE.Vector3();
        object.getWorldPosition(frontPosition);
        const cameraPosition = frontPosition
          .clone()
          .addScaledVector(frontVector, distance);
          cameraRef.current.position.copy(cameraPosition);
          cameraRef.current.lookAt(frontPosition);
        //  light.position.set(0, 0, 0); // 假设模型在原点，正前方位置在 z 轴上
        render();
        //  animate(object)
      },
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% of obj loaded');
      },
      (error: any) => {
        console.error('Error loading OBJ', error);
      }
    );

    // mtlLoader.load(
    //   '/3dModels/IronMan/IronMan.mtl',
    //   (materials: any) => {
    //     console.log(materials);

    //     materials.preload();
    //     objLoader.setMaterials(materials);

    //   },
    //   (xhr: any) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% of MTL loaded');
    //   },
    //   (error: any) => {
    //     console.error('Error loading MTL', error);
    //   }
    // );
    return () => {
      // 清理工作，避免内存泄漏
      mountRef.current &&  mountRef.current.removeChild(rendererRef.current.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [modelUrl]);
  const adjustModelSize=()=>{
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const size = box.getSize(new THREE.Vector3()).length();
    const scale = Math.min(window.innerWidth, window.innerHeight) / size;

    modelRef.current.scale.set(scale, scale, scale);
  }
  const onWindowResize = ()=>{
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();

    // 调整渲染器的大小
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    
    // 可选：重新计算模型的缩放  
    adjustModelSize()
  }
 
  window.addEventListener('resize', onWindowResize);

  return (
    <div
      style={style}
      ref={mountRef}
    ></div>
  );
};
