import { Camera, Mesh, PointLight, Points } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import basicAnimation from "./basic";
import hauntedHouseAnimation from "./hauntedHouse";
import particlesAnimation from "./particles";
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
  window.requestAnimationFrame(
    tick.bind(null, camera, cursor, controls, render, animationFunc, animation)
  );
};

const runAnimation = (
  objects: Objects | HauntedHouseObjects | PointsObjects,
  camera: Camera,
  cursor: Cursor,
  controls: OrbitControls | null,
  render: Function,
  animation = true
) => {
  // gsap.to(object.position, { duration: 1, delay: 1, x: 2 });
  // gsap.to(object.position, { duration: 1, delay: 2, x: 0 });

  tick(
    camera,
    cursor,
    controls,
    render,
    basicAnimation.bind(null, objects as Objects),
    animation
  );

  if (objects.hasOwnProperty("ghost1")) {
    tick(
      camera,
      cursor,
      controls,
      render,
      hauntedHouseAnimation.bind(null, objects as HauntedHouseObjects),
      animation
    );
  }

  if (objects.hasOwnProperty("points")) {
    tick(
      camera,
      cursor,
      controls,
      render,
      particlesAnimation.bind(null, objects as PointsObjects),
      animation
    );
  }
};

export { runAnimation };

export type { Objects, HauntedHouseObjects, PointsObjects };
