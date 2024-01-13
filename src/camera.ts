import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Size } from "./basicScene";

type Cursor = {
  x: number;
  y: number;
};

/**
 * Cursor
 */
const initCursor = (size: Size) => {
  const cursor = {
    x: 0,
    y: 0,
  };
  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
  });

  return cursor;
};

/**
 * Controls
 */
const initControls = (camera: THREE.Camera, canvas: HTMLCanvasElement) => {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return controls;
};

/**
 * BasicCamera
 */
const initBasicCamera = (
  aspectRatio: number,
  scene: THREE.Scene,
  object: THREE.Mesh
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, aspectRatio);
  camera.position.z = 3;
  camera.lookAt(object.position);
  scene.add(camera);

  // console.log(mesh.position.distanceTo(camera.position));
  return camera;
};

/**
 * OrthographicCamera
 */
const initOrthographicCamera = (
  aspectRatio: number,
  scene: THREE.Scene,
  object: THREE.Mesh
): THREE.OrthographicCamera => {
  const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
  );
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(object.position);
  scene.add(camera);

  return camera;
};

export { initCursor, initControls, initBasicCamera, initOrthographicCamera };

export type { Cursor };
