import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
  Scene,
} from "three";
import { initDebugUI } from "../debugUI";
import { initBasicCamera, initControls, initCursor } from "../cameras";
import { initResize, initScene } from ".";
import { runAnimation } from "../animations";

const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};
const gui = initDebugUI();

let geometry: BufferGeometry | null,
  material: PointsMaterial | null,
  points: Points | null;

const dispose = (scene: Scene) => {
  if (points !== null) {
    geometry?.dispose();
    material?.dispose();
    scene.remove(points);
  }
};

async function initGalaxyScene() {
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();

  points = generateGalaxy(scene) as Points;

  gui
    .add(parameters, "count")
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(generateGalaxy.bind(null, scene));
  gui
    .add(parameters, "size")
    .min(0.01)
    .max(0.1)
    .step(0.01)
    .onFinishChange(generateGalaxy.bind(null, scene));
  gui
    .add(parameters, "radius")
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(generateGalaxy.bind(null, scene));
  gui
    .add(parameters, "branches")
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(generateGalaxy.bind(null, scene));

  gui
    .add(parameters, "spin")
    .min(-5)
    .max(5)
    .step(0.001)
    .onFinishChange(generateGalaxy.bind(null, scene));

  gui
    .add(parameters, "randomness")
    .min(0)
    .max(2)
    .step(0.001)
    .onFinishChange(generateGalaxy.bind(null, scene));

  gui
    .add(parameters, "randomnessPower")
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(generateGalaxy.bind(null, scene));

  gui
    .addColor(parameters, "insideColor")
    .onFinishChange(generateGalaxy.bind(null, scene));

  gui
    .addColor(parameters, "outsideColor")
    .onFinishChange(generateGalaxy.bind(null, scene));

  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, points);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;

  initResize(size, canvas, camera, renderer);

  const controls = initControls(camera, canvas);

  render(camera);
  runAnimation(camera, cursor, controls, render, () => {}, false);

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) };
}

const generateGalaxy = (scene: Scene) => {
  /**
   * Destroy old galaxy
   */
  dispose(scene);

  /**
   * Geometry
   */
  geometry = new BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new Color(parameters.insideColor);
  const colorOutside = new Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] =
      randomY * Math.cos((radius / parameters.radius) * (Math.PI / 2));
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3 + 0] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  /**
   * Material
   */
  material = new PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
  });

  /**
   * Points
   */
  points = new Points(geometry, material);
  scene.add(points);

  return points;
};

export default initGalaxyScene;
