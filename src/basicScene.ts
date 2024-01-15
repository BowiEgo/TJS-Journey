import { initDebugUI } from "./debugUI";
import {
  // initBoxGeometry,
  initMaterialGeometry,
  initShadowGeometry,
  // initTextureGeometry,
} from "./geometry";
import { initBasicCamera, initControls, initCursor } from "./camera";
import { initShadowLight } from "./lights";
import { runAnimation } from "./animations";
import { initResize, initScene } from "./scene";
import { initParticles } from "./particles";

async function initBasicScene() {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  // const object = initGroup()
  // const object = initBoxGeometry();
  // const object = initBufferGeometry();
  // const box = initTextureGeometry();
  // const { plane, sphere } = initShadowGeometry(gui);
  const { cube } = initMaterialGeometry(gui);

  // const { plane, sphere, cube, torus } = initMaterialGeometry(gui);
  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, cube);

  initResize(size, canvas, camera, renderer);

  // const camera = initOrthographicCamera(aspectRatio, scene, object);
  const controls = initControls(camera, canvas);
  // scene.add(box);
  // scene.add(plane, sphere, cube, torus);
  // scene.add(plane, sphere);
  scene.add(cube);

  // Light
  // initBasicLight(scene, gui);
  initShadowLight(scene, gui);

  // 3DText
  // await init3DText(scene);

  render(camera);
  runAnimation(
    // { box, plane, sphere, cube, torus },
    // { plane, sphere },
    { cube },
    camera,
    cursor,
    controls,
    render,
    false
  );

  const dispose = () => {
    cube.geometry.dispose();
    cube.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, dispose };
}

const initBouncingBallScene = () => {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  const { plane, sphere } = initShadowGeometry(gui);

  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, plane);

  initResize(size, canvas, camera, renderer);

  const controls = initControls(camera, canvas);
  scene.add(plane, sphere);

  initShadowLight(scene, gui);

  render(camera);
  runAnimation({ plane, sphere }, camera, cursor, controls, render);

  const dispose = () => {
    plane.geometry.dispose();
    plane.material.dispose();
    sphere.geometry.dispose();
    sphere.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, dispose };
};

const initParticleScene = () => {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  const { points, count } = initParticles();
  // const box = initBoxGeometry(gui);

  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, points);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 3;

  initResize(size, canvas, camera, renderer);

  const controls = initControls(camera, canvas);
  scene.add(points);
  // scene.add(box);

  render(camera);
  runAnimation({ points, count }, camera, cursor, controls, render);

  const dispose = () => {
    points.geometry.dispose();
    points.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, dispose };
};

export { initBasicScene, initBouncingBallScene, initParticleScene };
