import { MeshStandardMaterial } from "three";
import {
  initBricksTexture,
  initDoorTextures,
  initGrassTexture,
} from "../textures/hauntedHouse";

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

const initRoofMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b35f45" });

  return material;
};

const initDoorMaterial = () => {
  const {
    doorColorTexture,
    doorAlphaTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorAmbientOcclusionTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  } = initDoorTextures();

  const material = new MeshStandardMaterial({
    metalness: 0,
    roughness: 1,
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  });

  return material;
};

const initBushMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#89c854" });

  return material;
};

const initGraveMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b2b6b1" });

  return material;
};

export {
  initGrassFloorMaterial,
  initWallsMaterial,
  initRoofMaterial,
  initDoorMaterial,
  initBushMaterial,
  initGraveMaterial,
};
