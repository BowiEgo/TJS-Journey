import {
  BufferAttribute,
  BufferGeometry,
  ConeGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";
import { createDebugUI } from "../debugUI";
import { createResize, createScene } from ".";
import { createCursor } from "../cameras";
import { runAnimation, stopAnimation } from "../animations";
import { textureLoader } from "../textures";
import { createScroll, portfolioAnimation } from "../animations/portfolio";

const parameters = {
  materialColor: "#ffeded",
};

let page: HTMLElement;

const createHTMLStyles = () => {
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

  window.addEventListener("scroll", () => {});
};

async function createPortfolioScene() {
  // HTML
  createHTMLStyles();

  // Scene
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene({
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

  /**
   * Particles
   */
  // Geometry
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] =
      objectsDistance * 0.5 -
      Math.random() * objectsDistance * sectionMeshes.length;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const particlesGeometry = new BufferGeometry();
  particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3));

  // Material
  const particlesMaterial = new PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
  });

  // Points
  const particles = new Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Lights
  const directionalLight = new DirectionalLight("#ffffff", 1);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

  // Cursor
  const cursor = createCursor(size);

  // Scroll
  createScroll(size, sectionMeshes);

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

  createResize(size, canvas, camera, renderer);

  // Debug
  const gui = createDebugUI();
  gui.addColor(parameters, "materialColor").onChange(() => {
    material.color.set(parameters.materialColor);
    particlesMaterial.color.set(parameters.materialColor);
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
    stopAnimation();

    sectionMeshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
    });

    destroy();
  };

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) };
}

export default createPortfolioScene;
