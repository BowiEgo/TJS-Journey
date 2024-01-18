import {
  Camera,
  Intersection,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
} from "three";
import { initResize, initScene } from ".";
import { initControls } from "../cameras";
import { initDebugUI } from "../debugUI";
import { initBasicLight } from "../lights";
import { runAnimation, stopAnimation } from "../animations";
import raycasterAnimation from "../animations/raycasterAnimation";
import { loadModels } from "../models";

let currentIntersect: Intersection | null = null;

function createObjects() {
  const object1 = new Mesh(
    new SphereGeometry(0.5, 16, 16),
    new MeshBasicMaterial({ color: "#ff0000" })
  );
  object1.position.x = -2;

  const object2 = new Mesh(
    new SphereGeometry(0.5, 16, 16),
    new MeshBasicMaterial({ color: "#ff0000" })
  );

  const object3 = new Mesh(
    new SphereGeometry(0.5, 16, 16),
    new MeshBasicMaterial({ color: "#ff0000" })
  );
  object3.position.x = 2;

  return { object1, object2, object3 };
}
/**
 * Raycaster
 */
function handleIntersect(
  raycaster: Raycaster,
  mouse: Vector2,
  camera: Camera,
  objectToTest: Mesh[],
  model?: Object3D<Object3DEventMap>
) {
  // Cast a ray
  raycaster.setFromCamera(mouse, camera);

  // const rayOrigin = new Vector3(-3, 0, 0);
  // const rayDirection = new Vector3(1, 0, 0);
  // rayDirection.normalize();

  // raycaster.set(rayOrigin, rayDirection);

  const intersets = raycaster.intersectObjects(objectToTest);

  for (const object of objectToTest) {
    (object.material as any).color.set("#ff0000");
  }

  for (const interset of intersets) {
    (interset.object as any).material.color.set("#0000ff");
  }

  if (intersets.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");
    }

    currentIntersect = intersets[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }

    currentIntersect = null;
  }

  if (model) {
    const modelIntersects = raycaster.intersectObject(model);
    if (modelIntersects.length) {
      model.scale.set(0.01, 0.01, 0.01);
    } else {
      model.scale.set(0.005, 0.005, 0.005);
    }
  }
}

async function initRaycasterScene() {
  /**
   * Scene
   */
  const { size, aspectRatio, scene, canvas, render, renderer } = initScene({
    rendererOpts: { alpha: true },
  });

  /**
   * Mouse
   */
  let mouse = new Vector2();

  window.addEventListener("mousemove", (_event) => {
    mouse.x = (_event.clientX / size.width) * 2 - 1;
    mouse.y = -(_event.clientY / size.height) * 2 + 1;
  });

  window.addEventListener("click", () => {
    if (currentIntersect) {
      switch (currentIntersect.object) {
        case object1:
          console.log("click on object 1");
          break;
        case object2:
          console.log("click on object 2");
          break;
        case object3:
          console.log("click on object 3");
          break;
      }
    }
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 8;

  initResize(size, canvas, camera, renderer);

  const controls = initControls(camera, canvas);

  /**
   * Lights
   */
  const { directionLight } = initBasicLight(scene);
  directionLight.shadow.camera.near = 0.1;
  directionLight.shadow.camera.far = 20;
  directionLight.castShadow = true;

  /**
   * Physics
   */

  /**
   * Objects
   */
  // const { plane, sphere } = initObjects();
  const { object1, object2, object3 } = createObjects();

  scene.add(object1, object2, object3);

  // Models
  const gltf = (await loadModels(
    "/assets/models/rubber_duck/scene.gltf"
  )) as any;
  gltf.scene.scale.set(0.005, 0.005, 0.005);

  scene.add(gltf.scene);

  /**
   * Raycaster
   */
  const raycaster = new Raycaster();

  // const rayOrigin = new Vector3(-3, 0, 0);
  // const rayDirection = new Vector3(10, 0, 0);
  // rayDirection.normalize();

  // raycaster.set(rayOrigin, rayDirection);

  // const intersect = raycaster.intersectObject(object2);
  // console.log(intersect);

  // const intersects = raycaster.intersectObjects([object1, object2, object3]);
  // console.log(intersects);

  /**
   * Debug
   */
  const gui = initDebugUI();

  /**
   * Render
   */
  // render(camera);

  // Animation
  runAnimation(
    camera,
    null,
    controls,
    render,
    raycasterAnimation.bind(
      null,
      { object1, object2, object3 },
      handleIntersect.bind(
        null,
        raycaster,
        mouse,
        camera,
        [object1, object2, object3],
        gltf.scene
      )
    )
  );

  const dispose = (scene: Scene) => {
    stopAnimation();

    [object1, object2, object3].forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
    });

    scene.remove(gltf.scene);
  };

  return { scene, renderer, gui, mouse, dispose: dispose.bind(null, scene) };
}

export default initRaycasterScene;
