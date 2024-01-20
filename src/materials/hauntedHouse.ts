import { MeshStandardMaterial } from "three";
import {
  createBricksTexture,
  createDoorTextures,
  createGrassTexture,
} from "../textures/hauntedHouse";

const createGrassFloorMaterial = () => {
  const {
    grassColorTexture,
    grassHeightTexture,
    grassNormalTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
  } = createGrassTexture();

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

const createWallsMaterial = () => {
  const {
    bricksColorTexture,
    bricksHeightTexture,
    bricksNormalTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
  } = createBricksTexture();

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

const createRoofMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b35f45" });

  return material;
};

const createDoorMaterial = () => {
  const {
    doorColorTexture,
    doorAlphaTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorAmbientOcclusionTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  } = createDoorTextures();

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

const createBushMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#89c854" });

  return material;
};

const createGraveMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b2b6b1" });

  return material;
};

export {
  createGrassFloorMaterial,
  createWallsMaterial,
  createRoofMaterial,
  createDoorMaterial,
  createBushMaterial,
  createGraveMaterial,
};
