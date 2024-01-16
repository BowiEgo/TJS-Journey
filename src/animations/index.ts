import { Camera, Mesh, PointLight, Points } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Cursor } from "../cameras";

interface Objects {
  box?: Mesh | null;
  plane?: Mesh | null;
  sphere?: Mesh | null;
  cube?: Mesh | null;
  torus?: Mesh | null;
}

interface HauntedHouseObjects {
  ghost1: PointLight;
  ghost2: PointLight;
  ghost3: PointLight;
}

interface PointsObjects {
  points: Points;
  count: number;
}

let requestID: number;

const tick = (
  camera: Camera,
  cursor: Cursor,
  controls: OrbitControls | null,
  render: Function,
  animationFunc: Function,
  animation: boolean
) => {
  animation && animationFunc();

  // Update controls
  controls?.update();

  render(camera);
  requestID = window.requestAnimationFrame(
    tick.bind(null, camera, cursor, controls, render, animationFunc, animation)
  );
};

function runAnimation(
  camera: Camera,
  cursor: Cursor,
  controls: OrbitControls | null,
  render: Function,
  animationFunc: Function,
  animation = true
) {
  // gsap.to(object.position, { duration: 1, delay: 1, x: 2 });
  // gsap.to(object.position, { duration: 1, delay: 2, x: 0 });

  tick(camera, cursor, controls, render, animationFunc, animation);
}

function stopAnimation() {
  requestID && window.cancelAnimationFrame(requestID);
}

export { runAnimation, stopAnimation };

export type { Objects, HauntedHouseObjects, PointsObjects };
