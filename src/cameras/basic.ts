import { Group, Mesh, PerspectiveCamera, Points, Scene } from "three";

/**
 * BasicCamera
 */
const initBasicCamera = (
  aspectRatio: number,
  scene: Scene,
  object: Mesh | Group | Points
): PerspectiveCamera => {
  const camera = new PerspectiveCamera(75, aspectRatio);
  camera.position.x = 5;
  camera.position.y = 5;
  camera.position.z = 10;
  camera.lookAt(object.position);
  scene.add(camera);

  // console.log(mesh.position.distanceTo(camera.position));
  return camera;
};

export default initBasicCamera;
