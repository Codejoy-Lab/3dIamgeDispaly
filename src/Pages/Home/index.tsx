import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

function ThreeDModel() {
  const mountRef = useRef<any>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.lookAt(0, 0, 0); // 默认观察场景中心，可以根据需要调整

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    const fontLoader = new FontLoader();
    // 创建网格辅助器
    var size = 100; // 网格的大小
    var divisions = 100; // 网格的分割数
    var gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0,0,10)
    gridHelper.rotation.x = Math.PI / 2; // 将网格旋转90度，使其与XY平面平行
    let modelBoundingBox = new THREE.Box3();

    fontLoader.load('', function (font: any) { })

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.set(0, 0, 0);
    scene.background = new THREE.Color(0x000000);
    // 将网格添加到场景中

    const render = () => {
      requestAnimationFrame(render);
      const rotationSpeed = 0.005; // 自转速度，可以根据需要调整

      if (scene.children.length > 0) {
        const object = scene.children[0]; // 假设你加载的模型是场景中的第一个对象
        object.rotation.y += rotationSpeed;

        renderer.render(scene, camera);
      }
    };
    objLoader.load(
      '/3dModels/tmp.obj',
      (object: any) => {
        scene.add(object); // Assuming 'scene' is your Three.js scene
        scene.add(light);
        scene.add(gridHelper);

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
        camera.position.copy(cameraPosition);
        camera.lookAt(frontPosition);

        render();
        // animate(object)
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
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', () => { });
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={mountRef} />;
}

export default ThreeDModel;
