import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { initDoorTextures } from "../textures/hauntedHouse";

const initTextureObject = () => {
  const {
    doorColorTexture,
    // doorAlphaTexture,
    // doorHeightTexture,
    // doorNormalTexture,
    // doorAmbientOcclusionTexture,
    // doorMetalnessTexture,
    // doorRoughnessTexture,
  } = initDoorTextures();

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    map: doorColorTexture,
  });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

export default initTextureObject;
