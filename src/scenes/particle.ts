import { initResize, initScene } from ".";
import { runAnimation } from "../animations";
import { initBasicCamera, initControls, initCursor } from "../cameras";
import { initDebugUI } from "../debugUI";
import { initParticles } from "../particles";

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

export default initParticleScene;
