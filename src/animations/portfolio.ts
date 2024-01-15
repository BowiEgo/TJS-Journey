import { Camera, Clock, Group, Mesh } from "three";
import { Size } from "../scenes";
import { Cursor } from "../cameras";

const clock = new Clock();

// Scroll
let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

const portfolioAnimation = (
  objects: { sectionMeshes: Mesh[] },
  camera: Camera,
  cameraGroup: Group,
  cursor: Cursor,
  size: Size,
  objectsDistance: number
) => {
  const { sectionMeshes } = objects;
  const elapsedTime = clock.getElapsedTime();

  // Animate camera
  camera.position.y = (-scrollY / size.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = -cursor.y;
  cameraGroup.position.x = parallaxX;
  cameraGroup.position.y = parallaxY;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }
};

export default portfolioAnimation;
