import { Camera, Clock, Mesh, PointLight, Points } from "three";
import { Cursor } from "./camera";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface Objects {
  box?: Mesh | null;
  plane?: Mesh | null;
  sphere?: Mesh | null;
  cube?: Mesh | null;
  torus?: Mesh | null;
}

interface HountedHouseObjects {
  ghost1: PointLight;
  ghost2: PointLight;
  ghost3: PointLight;
}

interface PointsObjects {
  points: Points;
  count: number;
}

// let time = Date.now();
const clock = new Clock();

const tick = (
  camera: Camera,
  cursor: Cursor,
  controls: OrbitControls,
  render: Function,
  animationFunc: Function,
  animation: boolean
) => {
  animation && animationFunc();

  // Update controls
  controls.update();

  render(camera);
  window.requestAnimationFrame(
    tick.bind(null, camera, cursor, controls, render, animationFunc, animation)
  );
};

const basicAnimation = (objects: Objects) => {
  // const { box, plane, sphere, cube, torus } = objects;
  // const { sphere, plane, torus } = objects;
  const { sphere, cube, torus } = objects;
  // // Clock
  const elapsedTime = clock.getElapsedTime();
  // Time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // // Update objects
  // object.rotation.y += 0.001 * deltaTime;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // // camera.lookAt(object.position);
  // object.rotation.y = elapsedTime * Math.PI * 2;

  if (sphere) {
    sphere.rotation.y = 0.1 * elapsedTime;
    sphere.rotation.x = 0.15 * elapsedTime;
  }

  if (cube) {
    cube.rotation.y = 0.1 * elapsedTime;
    cube.rotation.x = 0.15 * elapsedTime;
  }

  if (torus) {
    torus.rotation.y = 0.1 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;
  }

  // Bouncing Sphere
  if (sphere) {
    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
  }

  // // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(object.position);
};

const hauntedHouseAnimation = ({
  ghost1,
  ghost2,
  ghost3,
}: HountedHouseObjects) => {
  const elapsedTime = clock.getElapsedTime();

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime) * 3;

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);
};

const particlesAnimation = ({ points, count }: PointsObjects) => {
  const elapsedTime = clock.getElapsedTime();

  // points.rotation.y = elapsedTime * 0.2;
  // points.position.y = -elapsedTime * 0.2;
  // You should avoid this technic because updating the whole attribute on each frame is bad for performances
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = points.geometry.attributes.position.array[i3];
    points.geometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
  points.geometry.attributes.position.needsUpdate = true;
};

const runAnimation = (
  objects: Objects | HountedHouseObjects | PointsObjects,
  camera: Camera,
  cursor: Cursor,
  controls: OrbitControls,
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
      hauntedHouseAnimation.bind(null, objects as HountedHouseObjects),
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
