import { PerspectiveCamera, Scene } from "three";
import { createResize, createScene } from ".";
import { createControls, createCursor } from "../cameras";
import createPlane from "../objects/plane";
import { createDebugUI } from "../debugUI";
import { createBasicLight } from "../lights";
import { NOOP } from "../utils";
import { runAnimation, stopAnimation } from "../animations";
import { loadModels } from "../models";

async function createModelsScene() {
  /**
   * Scene
   */
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene({
    rendererOpts: { alpha: true },
  });

  /**
   * Cursor
   */
  const cursor = createCursor(size);

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000);
  camera.position.x = 5;
  camera.position.y = 3;
  camera.position.z = 5;

  createResize(size, canvas, camera, renderer);

  const controls = createControls(camera, canvas);

  /**
   * Lights
   */
  const { directionLight } = createBasicLight(scene);
  directionLight.shadow.camera.near = 0.1;
  directionLight.shadow.camera.far = 20;
  directionLight.castShadow = true;

  /**
   * Physics
   */

  /**
   * Objects
   */
  // const { plane, sphere } = createObjects();
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
  const gui = createDebugUI();
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

export default createModelsScene;
