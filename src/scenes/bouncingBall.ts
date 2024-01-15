import { initResize, initScene } from ".";
import { runAnimation } from "../animations";
import { initBasicCamera, initControls, initCursor } from "../cameras";
import { initDebugUI } from "../debugUI";
import { initShadowLight } from "../lights";
import { initShadowObjects } from "../objects";

const initBouncingBallScene = () => {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  const { plane, sphere } = initShadowObjects(gui);

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

export default initBouncingBallScene;
