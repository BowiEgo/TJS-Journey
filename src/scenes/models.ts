import { PerspectiveCamera, Scene } from "three";
import { initResize, initScene } from ".";
import { initControls, initCursor } from "../cameras";
import createPlane from "../objects/plane";
import { initDebugUI } from "../debugUI";
import { initBasicLight } from "../lights";
import { NOOP } from "../utils";
import { runAnimation, stopAnimation } from "../animations";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

/**
 * Models
 */

const gltfLoader = new GLTFLoader();

async function loadModels(url: string) {
  return await new Promise((resolve) => {
    gltfLoader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      () => {},
      (err) => {
        console.error(err);
      }
    );
  });
}

async function initModelsScene() {
  /**
   * Scene
   */
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene({
    rendererOpts: { alpha: true },
  });

  /**
   * Cursor
   */
  const cursor = initCursor(size);

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000);
  camera.position.x = 5;
  camera.position.y = 3;
  camera.position.z = 5;

  initResize(size, canvas, camera, renderer);

  const controls = initControls(camera, canvas);

  /**
   * Lights
   */
  const { directionLight } = initBasicLight(scene);
  directionLight.shadow.camera.near = 0.1;
  directionLight.shadow.camera.far = 20;
  directionLight.castShadow = true;

  /**
   * Physics
   */

  /**
   * Objects
   */
  // const { plane, sphere } = initObjects();
  const { plane } = createPlane();

  scene.add(plane);

  const gltf = (await loadModels(
    "/assets/models/rubber_duck/scene.gltf"
  )) as any;
  gltf.scene.scale.set(0.005, 0.005, 0.005);
  // const children = [...gltf.scene.children];
  // for (const child of children) {
  //   scene.add(child);
  // }

  scene.add(gltf.scene);
  /**
   * Debug
   */
  const gui = initDebugUI();
  const debugObject = { createSphere: NOOP, createBox: NOOP, reset: NOOP };

  /**
   * Render
   */
  // render(camera);

  // Animation
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    NOOP
    // physicsAnimation.bind(null, objectsToUpdate, world)
  );

  const dispose = (scene: Scene) => {
    stopAnimation();

    [plane].forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
    });

    debugObject.reset();
  };

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) };
}

export default initModelsScene;
