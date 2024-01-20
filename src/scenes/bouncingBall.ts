import { createResize, createScene } from ".";
import { runAnimation, stopAnimation } from "../animations";
import basicAnimation from "../animations/basic";
import { createBasicCamera, createControls, createCursor } from "../cameras";
import { createDebugUI } from "../debugUI";
import { createShadowLight } from "../lights";
import { createShadowObjects } from "../objects";

const createBouncingBallScene = () => {
  const gui = createDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene();
  const { plane, sphere } = createShadowObjects(gui);

  const cursor = createCursor(size);
  const camera = createBasicCamera(aspectRatio, scene, plane);

  createResize(size, canvas, camera, renderer);

  const controls = createControls(camera, canvas);
  scene.add(plane, sphere);

  createShadowLight(scene, gui);

  render(camera);
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    basicAnimation.bind(null, { plane, sphere })
  );

  const dispose = () => {
    stopAnimation();

    plane.geometry.dispose();
    plane.material.dispose();
    sphere.geometry.dispose();
    sphere.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, cursor, dispose };
};

export default createBouncingBallScene;
