import { createResize, createScene } from ".";
import { runAnimation, stopAnimation } from "../animations";
import basicAnimation from "../animations/basic";
import { createBasicCamera, createControls, createCursor } from "../cameras";
import { createDebugUI } from "../debugUI";
import { createShadowLight } from "../lights";
import { createMaterialObject } from "../objects";

async function createBasicScene() {
  const gui = createDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene();
  // const object = createGroup()
  // const object = createBoxGeometry();
  // const object = createBufferGeometry();
  // const box = createTextureGeometry();
  // const { plane, sphere } = createShadowGeometry(gui);
  const { cube } = createMaterialObject(gui);

  // const { plane, sphere, cube, torus } = createMaterialGeometry(gui);
  const cursor = createCursor(size);
  const camera = createBasicCamera(aspectRatio, scene, cube);

  createResize(size, canvas, camera, renderer);

  // const camera = createOrthographicCamera(aspectRatio, scene, object);
  const controls = createControls(camera, canvas);
  // scene.add(box);
  // scene.add(plane, sphere, cube, torus);
  // scene.add(plane, sphere);
  scene.add(cube);

  // Light
  // createBasicLight(scene, gui);
  createShadowLight(scene, gui);

  // 3DText
  // await create3DText(scene);

  render(camera);
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    // basicAnimation.bind({ box, plane, sphere, cube, torus }),
    // basicAnimation.bind({ plane, sphere }),
    basicAnimation.bind({ cube }),
    false
  );

  const dispose = () => {
    stopAnimation();

    cube.geometry.dispose();
    cube.material.dispose();
    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, cursor, dispose };
}

export default createBasicScene;
