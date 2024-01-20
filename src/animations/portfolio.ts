import gsap from "gsap";
import { Camera, Clock, Group, Mesh } from "three";
import { Size } from "../scenes";
import { Cursor } from "../cameras";

const clock = new Clock();
let previousTime = 0;

let scrollY = window.scrollY;
let currentSection = 0;

const createScroll = (size: Size, sectionsMeshes: Mesh[]) => {
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    const newSection = Math.round(scrollY / size.height);

    if (newSection != currentSection) {
      currentSection = newSection;
      console.log("changed", currentSection);

      gsap.to(sectionsMeshes[currentSection].rotation, {
        duration: 1.5,
        ease: "power2.inOut",
        x: "+=6",
        y: "+=3",
        z: "+=1.5",
      });
    }
  });

  return {
    scrollY,
  };
};

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
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = (-scrollY / size.height) * objectsDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * deltaTime * 5;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * deltaTime * 5;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
  }
};

export { portfolioAnimation, createScroll };
