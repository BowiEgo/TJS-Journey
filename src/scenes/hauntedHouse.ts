import { Fog, PCFSoftShadowMap } from "three";
import { initDebugUI } from "../debugUI";
import { initResize, initScene } from ".";
import { initGrassFloor, initGraves, initHouse } from "../objects";
import { initBasicCamera, initControls, initCursor } from "../cameras";
import { runAnimation, stopAnimation } from "../animations";
import { initHauntedHouseLight } from "../lights";
import hauntedHouseAnimation from "../animations/hauntedHouse";

async function initHauntedHouseScene() {
  const gui = initDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene();

  // Fog
  const fog = new Fog("#262837", 1, 15);
  scene.fog = fog;
  renderer.setClearColor("#262837");

  // Objects
  const grassFloor = initGrassFloor();
  const { house, roof, walls, bushes } = initHouse();
  const { graves, gravesArray } = initGraves();
  // Cursor
  const cursor = initCursor(size);
  // Camera
  const camera = initBasicCamera(aspectRatio, scene, house);
  // Resize
  initResize(size, canvas, camera, renderer);
  // Camera Controls
  const controls = initControls(camera, canvas);
  // Light
  const { moonLight, doorLight, ghosts } = initHauntedHouseLight(scene, gui);
  // Shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  moonLight.castShadow = true;
  doorLight.castShadow = true;
  ghosts.ghost1.castShadow = true;
  ghosts.ghost2.castShadow = true;
  ghosts.ghost3.castShadow = true;
  walls.castShadow = true;
  bushes.bush1.castShadow = true;
  bushes.bush2.castShadow = true;
  bushes.bush3.castShadow = true;
  bushes.bush4.castShadow = true;
  gravesArray.forEach((grave) => {
    grave.castShadow = true;
  });

  grassFloor.receiveShadow = true;

  // Optimize the shadow maps
  doorLight.shadow.mapSize.width = 256;
  doorLight.shadow.mapSize.height = 256;
  doorLight.shadow.camera.far = 7;

  ghosts.ghost1.shadow.mapSize.width = 256;
  ghosts.ghost1.shadow.mapSize.height = 256;
  ghosts.ghost1.shadow.camera.far = 7;

  ghosts.ghost2.shadow.mapSize.width = 256;
  ghosts.ghost2.shadow.mapSize.height = 256;
  ghosts.ghost2.shadow.camera.far = 7;

  ghosts.ghost3.shadow.mapSize.width = 256;
  ghosts.ghost3.shadow.mapSize.height = 256;
  ghosts.ghost3.shadow.camera.far = 7;

  scene.add(grassFloor, house, graves);
  render(camera);
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    // hauntedHouseAnimation.bind(null, { box, plane, sphere, cube, torus })
    hauntedHouseAnimation.bind(null, ghosts)
  );

  const dispose = () => {
    stopAnimation();

    grassFloor.geometry.dispose();
    grassFloor.material.dispose();
    walls.geometry.dispose();
    walls.material.dispose();
    roof.geometry.dispose();
    roof.material.dispose();
    gravesArray.forEach((child) => {
      child.geometry.dispose();
      child.material.dispose();
    });

    scene.remove.apply(scene, scene.children);
  };

  return { scene, renderer, gui, cursor, dispose };
}

export default initHauntedHouseScene;