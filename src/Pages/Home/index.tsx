import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

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
    let modelBoundingBox = new THREE.Box3();
    // const gridLoader = new THREE.GridTextureLoader();

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.set(0, 0, 0);
    scene.background = new THREE.Color(0xdddddd);

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
        object.scale.set(10, 10, 10);
        scene.add(object); // Assuming 'scene' is your Three.js scene
        scene.add(light);
        // 将摄像机位置调整到模型的正前方
        const distance = 20; // 摄像机到模型的距离，根据实际需要调整
        const frontVector = new THREE.Vector3(0, 0, -1); // 模型的正前方向
        const frontPosition = new THREE.Vector3();
        object.getWorldPosition(frontPosition);
        const cameraPosition = frontPosition
          .clone()
          .addScaledVector(frontVector, distance);
        camera.position.copy(cameraPosition);
        camera.lookAt(frontPosition); // 使摄像机看向模型的中心点

        modelBoundingBox.setFromObject(object);
        // 获取包围盒的尺寸
        const size = new THREE.Vector3();
        modelBoundingBox.getSize(size);
        console.log('模型尺寸:', size);

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
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={mountRef} />;
}

export default ThreeDModel;
