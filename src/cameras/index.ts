import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import createBasicCamera from "./basic";
import createOrthographicCamera from "./orthographic";
import { Size } from "../scenes";

type Cursor = {
  x: number;
  y: number;
  dispose: Function;
};

/**
 * Cursor
 */
const createCursor = (size: Size) => {
  let cursor = {
    x: 0,
    y: 0,
    dispose: () => {
      window.addEventListener("mousemove", () => {});
    },
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
const createControls = (camera: THREE.Camera, canvas: HTMLCanvasElement) => {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return controls;
};

export {
  createCursor,
  createControls,
  createBasicCamera,
  createOrthographicCamera,
};

export type { Cursor };
