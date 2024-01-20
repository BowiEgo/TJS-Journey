import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { createDoorTextures } from "../textures/hauntedHouse";

const createTextureObject = () => {
  const {
    doorColorTexture,
    // doorAlphaTexture,
    // doorHeightTexture,
    // doorNormalTexture,
    // doorAmbientOcclusionTexture,
    // doorMetalnessTexture,
    // doorRoughnessTexture,
  } = createDoorTextures();

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    map: doorColorTexture,
  });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

export default createTextureObject;
