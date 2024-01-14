import "./style.css";
import {
  initBasicScene,
  initBouncingBallScene,
  // initBasicScene,
  initParticleScene,
  // initBouncingBallScene
} from "./basicScene.ts";
import { initHauntedHouseScene } from "./hauntedHouseScene.ts";
import { Scene, WebGLRenderer } from "three";
import GUI from "lil-gui";
// import { initHauntedHouseScene } from "./hauntedHouseScene.ts";

interface SceneManager {
  scene: Scene | null;
  renderer: WebGLRenderer | null;
  gui: GUI | null;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas class="webgl"></canvas>
  <select name="SelectScene" class="select">
    <option value="basicScene" selected>BasicScene</option>
    <option value="boucingBall">BoucingBall</option>
    <option value="hauntedHouseScene">HauntedHouseScene</option>
    <option value="particleScene">ParticleScene</option>
  </select>
`;

const select = document.querySelector<HTMLDivElement>(
  ".select"
) as HTMLDivElement;

let sceneManager: SceneManager = {
  scene: null,
  renderer: null,
  gui: null,
};

function dispose() {
  sceneManager.scene &&
    sceneManager.scene.remove.apply(
      sceneManager.scene,
      sceneManager.scene.children
    );

  sceneManager.renderer && sceneManager.renderer.dispose();
  sceneManager.gui && sceneManager.gui.destroy();
}

initBasicScene().then((val) => {
  sceneManager = val;
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
    default:
      dispose();
      sceneManager = await initBasicScene();
      break;
  }
};
