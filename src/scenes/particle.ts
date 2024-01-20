import { createResize, createScene } from ".";
import { runAnimation, stopAnimation } from "../animations";
import particlesAnimation from "../animations/particles";
import { createBasicCamera, createControls, createCursor } from "../cameras";
import { createDebugUI } from "../debugUI";
import { createParticles } from "../particles";

const createParticleScene = () => {
  const gui = createDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene();
  const { points, count } = createParticles();
  // const box = createBoxGeometry(gui);

  const cursor = createCursor(size);
  const camera = createBasicCamera(aspectRatio, scene, points);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 3;

  createResize(size, canvas, camera, renderer);

  const controls = createControls(camera, canvas);
  scene.add(points);
  // scene.add(box);

  render(camera);
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    particlesAnimation.bind(null, { points, count })
  );

  const dispose = () => {
    stopAnimation();

    points.geometry.dispose();
    points.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, cursor, dispose };
};

export default createParticleScene;
