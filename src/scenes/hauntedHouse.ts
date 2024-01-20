import { Fog, PCFSoftShadowMap } from "three";
import { createDebugUI } from "../debugUI";
import { createResize, createScene } from ".";
import { createGrassFloor, createGraves, createHouse } from "../objects";
import { createBasicCamera, createControls, createCursor } from "../cameras";
import { runAnimation, stopAnimation } from "../animations";
import { createHauntedHouseLight } from "../lights";
import hauntedHouseAnimation from "../animations/hauntedHouse";

async function createHauntedHouseScene() {
  const gui = createDebugUI();
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene();

  // Fog
  const fog = new Fog("#262837", 1, 15);
  scene.fog = fog;
  renderer.setClearColor("#262837");

  // Objects
  const grassFloor = createGrassFloor();
  const { house, roof, walls, bushes } = createHouse();
  const { graves, gravesArray } = createGraves();
  // Cursor
  const cursor = createCursor(size);
  // Camera
  const camera = createBasicCamera(aspectRatio, scene, house);
  // Resize
  createResize(size, canvas, camera, renderer);
  // Camera Controls
  const controls = createControls(camera, canvas);
  // Light
  const { moonLight, doorLight, ghosts } = createHauntedHouseLight(scene, gui);
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

export default createHauntedHouseScene;
