import {
  ConeGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";
import { initDebugUI } from "../debugUI";
import { initResize, initScene } from ".";
import { initCursor } from "../cameras";
import { runAnimation } from "../animations";
import { textureLoader } from "../textures";
import portfolioAnimation from "../animations/portfolio";

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
    <h1>MY WORKS</h1>
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
  // HTML
  initHTMLStyles();

  // Scene
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene({
    rendererOpts: { alpha: true },
  });
  // renderer.setClearAlpha(0)

  /**
   * Objects
   */
  // Texture
  const gradientTexture = textureLoader.load("assets/textures/gradients/3.jpg");
  gradientTexture.magFilter = NearestFilter;

  // Material
  const material = new MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture,
  });

  // Meshes
  const objectsDistance = 4;
  const mesh1 = new Mesh(new TorusGeometry(1, 0.4, 16, 60), material);
  const mesh2 = new Mesh(new ConeGeometry(1, 2, 32), material);
  const mesh3 = new Mesh(new TorusKnotGeometry(0.8, 0.35, 100, 16), material);

  mesh1.position.y = -objectsDistance * 0;
  mesh2.position.y = -objectsDistance * 1;
  mesh3.position.y = -objectsDistance * 2;

  mesh1.position.x = 2;
  mesh2.position.x = -2;
  mesh3.position.x = 2;

  scene.add(mesh1, mesh2, mesh3);

  const sectionMeshes = [mesh1, mesh2, mesh3];

  // Lights
  const directionalLight = new DirectionalLight("#ffffff", 1);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

  // Cursor
  const cursor = initCursor(size);

  /**
   * Camera
   */
  // Group
  const cameraGroup = new Group();
  scene.add(cameraGroup);

  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 100);
  camera.position.z = 6;
  cameraGroup.add(camera);

  initResize(size, canvas, camera, renderer);

  // Debug
  const gui = initDebugUI();
  gui.addColor(parameters, "materialColor").onChange(() => {
    material.color.set(parameters.materialColor);
  });

  render(camera);
  runAnimation(
    camera,
    cursor,
    null,
    render,
    portfolioAnimation.bind(
      null,
      { sectionMeshes },
      camera,
      cameraGroup,
      cursor,
      size,
      objectsDistance
    )
  );

  const dispose = (scene: Scene) => {
    sectionMeshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
    });

    destroy();
  };

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) };
}

export default initPortfolioScene;
