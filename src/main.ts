import "./style.css";
import { initBasicScene, initResize } from "./basicScene.ts";
import { runAnimation } from "./animations.ts";
import {
  initBasicCamera,
  initControls,
  initCursor,
  // initOrthographicCamera,
} from "./camera.ts";
import {
  // initBoxGeometry,
  // initBufferGeometry,
  // initGroup,
  // initMaterialGeometry,
  initShadowGeometry,
  // initTextureGeometry,
} from "./geometry.ts";
import { initDebugUI } from "./debugUI.ts";
// import { initTextures } from "./textures.ts";
import {
  // initBasicLight,
  initShadowLight,
} from "./lights.ts";
// import { init3DText } from "./3DText.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas class="webgl"></canvas>
`;

async function init() {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } =
    initBasicScene();
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

init();
