import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import initBasicCamera from "./basic";
import initOrthographicCamera from "./orthographic";
import { Size } from "../scenes";

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

export { initCursor, initControls, initBasicCamera, initOrthographicCamera };

export type { Cursor };
