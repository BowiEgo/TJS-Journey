import { initDebugUI } from "./debugUI";
import { initShadowGeometry } from "./geometry";
import { initBasicCamera, initControls, initCursor } from "./camera";
import { initShadowLight } from "./lights";
import { runAnimation } from "./animations";
import { initResize, initScene } from "./scene";

async function initBasicScene() {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();
  // const object = initGroup()
  // const object = initBoxGeometry();
  // const object = initBufferGeometry();
  // const box = initTextureGeometry();
  const { plane, sphere } = initShadowGeometry(gui);

  // const { plane, sphere, cube, torus } = initMaterialGeometry(gui);
  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, plane);

  initResize(size, canvas, camera, renderer);

  // const camera = initOrthographicCamera(aspectRatio, scene, object);
  const controls = initControls(camera, canvas);
  // scene.add(box);
  // scene.add(plane, sphere, cube, torus);
  scene.add(plane, sphere);

  // Light
  // initBasicLight(scene, gui);
  initShadowLight(scene, gui);

  // 3DText
  // await init3DText(scene);

  render(camera);
  runAnimation(
    // { box, plane, sphere, cube, torus },
    { plane, sphere },
    camera,
    cursor,
    controls,
    render
  );
}

export { initBasicScene };
