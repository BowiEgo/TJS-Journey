import { initResize, initScene } from ".";
import { runAnimation } from "../animations";
import basicAnimation from "../animations/basic";
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
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    basicAnimation.bind(null, { plane, sphere })
  );

  const dispose = () => {
    plane.geometry.dispose();
    plane.material.dispose();
    sphere.geometry.dispose();
    sphere.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, cursor, dispose };
};

export default initBouncingBallScene;
