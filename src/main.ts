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
  initMaterialGeometry,
  initTextureGeometry,
} from "./geometry.ts";
import { initDebugUI } from "./debugUI.ts";
// import { initTextures } from "./textures.ts";
import { initBasicLight } from "./lights.ts";
import { init3DText } from "./3DText.ts";

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
  const box = initTextureGeometry();

  const { sphere, plane, torus } = initMaterialGeometry(gui);
  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, plane);

  initResize(size, canvas, camera, renderer);

  // const camera = initOrthographicCamera(aspectRatio, scene, object);
  const controls = initControls(camera, canvas);
  // scene.add(box);
  // scene.add(sphere, plane, torus);

  // Light
  const { ambientLight, pointLight } = initBasicLight();
  scene.add(ambientLight, pointLight);

  // 3DText
  await init3DText(scene);

  render(camera);
  runAnimation(
    { box: box, sphere: sphere, plane: plane, torus: torus },
    camera,
    cursor,
    controls,
    render
  );
}

init();
