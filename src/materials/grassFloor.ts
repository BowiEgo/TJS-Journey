import { MeshStandardMaterial } from "three";
import { initGrassTexture } from "../textures/hauntedHouse";

const initGrassFloorMaterial = () => {
  const {
    grassColorTexture,
    grassHeightTexture,
    grassNormalTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
  } = initGrassTexture();

  const material = new MeshStandardMaterial({
    map: grassColorTexture,
    transparent: true,
    aoMap: grassAmbientOcclusionTexture,
    displacementMap: grassHeightTexture,
    displacementScale: 0.001,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  });

  return material;
};

export default initGrassFloorMaterial;
