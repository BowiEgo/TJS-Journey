import { Scene } from "three";
import { initDebugUI } from "../debugUI";
import { initResize, initScene } from ".";
import { initBasicCamera, initCursor } from "../cameras";
import { runAnimation } from "../animations";
import { initCubeObject } from "../objects";

const parameters = {
  materialColor: "#ffeded",
};

let page: HTMLElement;

const initHTMLStyles = () => {
  document.getElementsByTagName("html")[0].style.overflow = "auto";
  document.getElementsByTagName("body")[0].style.overflow = "auto";

  page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `
    <h1>MY PORTFOLIO</h1>
    <h1>MY PORTFOLIO</h1>
    <h1>CONTACT ME</h1>
  `;
  document.querySelector<HTMLDivElement>("#app")?.appendChild(page);
};

const destroy = () => {
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";

  document.querySelector<HTMLDivElement>("#app")?.removeChild(page);
};

async function initPortfolioScene() {
  initHTMLStyles();
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene({
    rendererOpts: { alpha: true },
  });
  // renderer.setClearAlpha(0)
  const cube = initCubeObject();

  gui.addColor(parameters, "materialColor");

  const cursor = initCursor(size);
  const camera = initBasicCamera(aspectRatio, scene, cube);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 4;
  camera.lookAt(cube.position);

  initResize(size, canvas, camera, renderer);

  scene.add(cube);

  render(camera);
  runAnimation({}, camera, cursor, null, render, false);

  const dispose = (scene: Scene) => {
    if (cube !== null) {
      cube.geometry.dispose();
      cube.material.dispose();
      scene.remove(cube);
    }

    destroy();
  };

  return { scene, renderer, gui, dispose: dispose.bind(null, scene) };
}

export default initPortfolioScene;
