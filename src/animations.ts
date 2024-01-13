import * as THREE from "three";
import { Cursor } from "./camera";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface Objects {
  box?: THREE.Mesh | null;
  plane?: THREE.Mesh | null;
  sphere?: THREE.Mesh | null;
  cube?: THREE.Mesh | null;
  torus?: THREE.Mesh | null;
}

// let time = Date.now();
const clock = new THREE.Clock();

const tick = (
  objects: Objects,
  camera: THREE.Camera,
  cursor: Cursor,
  controls: OrbitControls,
  render: Function
) => {
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

  // Update controls
  controls.update();

  render(camera);
  window.requestAnimationFrame(
    tick.bind(null, objects, camera, cursor, controls, render)
  );
};

const runAnimation = (
  objects: Objects,
  camera: THREE.Camera,
  cursor: Cursor,
  controls: OrbitControls,
  render: Function
) => {
  // gsap.to(object.position, { duration: 1, delay: 1, x: 2 });
  // gsap.to(object.position, { duration: 1, delay: 2, x: 0 });

  tick(objects, camera, cursor, controls, render);
};

export { runAnimation };
