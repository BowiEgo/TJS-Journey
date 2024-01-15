import { MeshStandardMaterial } from "three";
import { initBricksTexture } from "../textures/hauntedHouse";

const initWallsMaterial = () => {
  const {
    bricksColorTexture,
    bricksHeightTexture,
    bricksNormalTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
  } = initBricksTexture();

  const material = new MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    displacementMap: bricksHeightTexture,
    displacementScale: 0.001,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  });

  return material;
};

export default initWallsMaterial;
