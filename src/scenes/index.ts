import {
  Camera,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import initBasicScene from "./basic";
import initBouncingBallScene from "./bouncingBall";
import initHauntedHouseScene from "./hauntedHouse";
import initParticleScene from "./particle";
import initGalaxyScene from "./galaxy";
import initPortfolioScene from "./portfolio";

type Size = {
  width: number;
  height: number;
};

interface SceneOptions {
  rendererOpts: {
    alpha: boolean;
  };
}

const initScene = (opts?: SceneOptions) => {
  const scene = new Scene();

  // // Axes Helper
  // const axesHelper = new AxesHelper();
  // scene.add(axesHelper);

  /**
   * Size
   */
  const size: Size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const aspectRatio = size.width / size.height;

  /**
   * Renderer
   */
  const canvas: HTMLCanvasElement = document.querySelector(
    ".webgl"
  ) as HTMLCanvasElement;

  const renderer = new WebGLRenderer({
    canvas: canvas,
    ...opts?.rendererOpts,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const render = (camera: Camera) => {
    renderer.setSize(size.width, size.height);

    renderer.render(scene, camera);
  };

  return { size, aspectRatio, scene, canvas, render, renderer };
};

const initResize = (
  size: Size,
  canvas: HTMLCanvasElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  window.addEventListener("resize", () => {
    // Update size
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    // Update camera
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    // Prefix for Safari and Firefox
    const fullscreenElement =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullscreenElement;

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if ((canvas as any).webkitRequestFullScreen) {
        (canvas as any).webkitRequestFullScreen();
      } else if ((canvas as any).mozRequestFullScreen) {
        (canvas as any).mozRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozExitFullscreen) {
        (document as any).mozExitFullscreen();
      }
    }
  });
};

export {
  initScene,
  initResize,
  initBasicScene,
  initBouncingBallScene,
  initHauntedHouseScene,
  initParticleScene,
  initGalaxyScene,
  initPortfolioScene,
};

export type { Size };
