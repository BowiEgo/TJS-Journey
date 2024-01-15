import "./style.css";
import {
  initBasicScene,
  initBouncingBallScene,
  initParticleScene,
} from "./basicScene.ts";
import { initHauntedHouseScene } from "./hauntedHouseScene.ts";
import { Scene, WebGLRenderer } from "three";
import GUI from "lil-gui";
import { initGalaxyScene } from "./galaxyScene.ts";

interface SceneManager {
  scene: Scene | null;
  renderer: WebGLRenderer | null;
  gui: GUI | null;
  dispose: Function | null;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas class="webgl"></canvas>
  <select name="SelectScene" class="select">
    <option value="basicScene" selected>BasicScene</option>
    <option value="boucingBall">BoucingBall</option>
    <option value="hauntedHouseScene">HauntedHouseScene</option>
    <option value="particleScene">ParticleScene</option>
    <option value="galaxyScene">GalaxyScene</option>
  </select>
`;

const select = document.querySelector(".select") as HTMLSelectElement;

let sceneManager: SceneManager = {
  scene: null,
  renderer: null,
  gui: null,
  dispose: null,
};

function dispose() {
  sceneManager.dispose?.call(sceneManager.scene);
  sceneManager.renderer && sceneManager.renderer.dispose();
  sceneManager.gui && sceneManager.gui.destroy();
}

initGalaxyScene().then((val) => {
  sceneManager = val;
  select.value = "galaxyScene";
});

select.onchange = async function (evt) {
  const target = evt.target as any;
  switch (target.value) {
    case "basicScene":
      dispose();
      sceneManager = await initBasicScene();
      break;
    case "boucingBall":
      dispose();
      sceneManager = initBouncingBallScene();
      break;
    case "hauntedHouseScene":
      dispose();
      sceneManager = await initHauntedHouseScene();
      break;
    case "particleScene":
      dispose();
      sceneManager = initParticleScene();
      break;
    case "galaxyScene":
      dispose();
      sceneManager = await initGalaxyScene();
      break;
    default:
      dispose();
      sceneManager = await initBasicScene();
      break;
  }
};
