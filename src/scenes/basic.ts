import { initResize, initScene } from ".";
import { runAnimation } from "../animations";
import { initBasicCamera, initControls, initCursor } from "../cameras";
import { initDebugUI } from "../debugUI";
import { initShadowLight } from "../lights";
import { initMaterialObject } from "../objects";

async function initBasicScene() {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  // const object = initGroup()
  // const object = initBoxGeometry();
  // const object = initBufferGeometry();
  // const box = initTextureGeometry();
  // const { plane, sphere } = initShadowGeometry(gui);
  const { cube } = initMaterialObject(gui);

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

export default initBasicScene;
