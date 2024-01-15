import { Mesh, OrthographicCamera, Scene } from "three";

/**
 * OrthographicCamera
 */
const initOrthographicCamera = (
  aspectRatio: number,
  scene: Scene,
  object: Mesh
): OrthographicCamera => {
  const camera = new OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
  );
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(object.position);
  scene.add(camera);

  return camera;
};

export default initOrthographicCamera;
