import "./style.css";
import { Scene, WebGLRenderer } from "three";
import GUI from "lil-gui";
import {
  createBasicScene,
  createBouncingBallScene,
  createGalaxyScene,
  createHauntedHouseScene,
  createParticleScene,
  createPortfolioScene,
} from "./scenes";
import { Cursor } from "./cameras";
import createPhysicScene from "./scenes/physics";
import createModelsScene from "./scenes/models";
import createRaycasterScene from "./scenes/raycaster";
import createBlenderModelsScene from "./scenes/blenderModels";

interface SceneManager {
  scene: Scene | null;
  renderer: WebGLRenderer | null;
  gui: GUI | null;
  cursor?: Cursor | null;
  dispose: Function | null;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas class="webgl"></canvas>
  <select title="scene" name="SelectScene" class="select">
    <option value="basicScene" selected>BasicScene</option>
    <option value="boucingBall">BoucingBall</option>
    <option value="hauntedHouseScene">HauntedHouseScene</option>
    <option value="particleScene">ParticleScene</option>
    <option value="galaxyScene">GalaxyScene</option>
    <option value="portfoliScene">PortfolioScene</option>
    <option value="phyiscScene">PhyiscScene</option>
    <option value="modelsScene">ModelsScene</option>
    <option value="raycasterScene">RaycasterScene</option>
    <option value="blenderModelsScene">BlenderModelsScene</option>
  </select>
`;

const select = document.querySelector(".select") as HTMLSelectElement;

let sceneManager: SceneManager = {
  scene: null,
  renderer: null,
  gui: null,
  cursor: null,
  dispose: null,
};

function dispose() {
  sceneManager.dispose?.call(sceneManager.scene);
  sceneManager.renderer && sceneManager.renderer.dispose();
  sceneManager.gui && sceneManager.gui.destroy();
  sceneManager.cursor && sceneManager.cursor.dispose();
}

select.onchange = async function (evt) {
  const target = evt.target as any;
  switch (target.value) {
    case "basicScene":
      dispose();
      sceneManager = await createBasicScene();
      break;
    case "boucingBall":
      dispose();
      sceneManager = createBouncingBallScene();
      break;
    case "hauntedHouseScene":
      dispose();
      sceneManager = await createHauntedHouseScene();
      break;
    case "particleScene":
      dispose();
      sceneManager = createParticleScene();
      break;
    case "galaxyScene":
      dispose();
      sceneManager = await createGalaxyScene();
      break;
    case "portfoliScene":
      dispose();
      sceneManager = await createPortfolioScene();
      break;
    case "phyiscScene":
      dispose();
      sceneManager = await createPhysicScene();
      break;
    case "modelsScene":
      dispose();
      sceneManager = await createModelsScene();
      break;
    case "raycasterScene":
      dispose();
      sceneManager = await createRaycasterScene();
      break;
    case "blenderModelsScene":
      dispose();
      sceneManager = await createBlenderModelsScene();
      break;
    default:
      dispose();
      sceneManager = await createBasicScene();
      break;
  }
};

createBlenderModelsScene().then((val) => {
  sceneManager = val;
  select.value = "blenderModelsScene";
});
