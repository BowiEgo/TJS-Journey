import * as THREE from "three";
import GUI from "lil-gui";
import {
  initBricksTexture,
  initDoorTextures,
  initEnvironmentTexture,
  initGrassTexture,
} from "./textures";

const initMaterial = (gui: GUI) => {
  const {
    // // doorColorTexture,
    // // doorAlphaTexture,
    // // doorHeightTexture,
    // // doorNormalTexture,
    // // doorAmbientOcclusionTexture,
    // // doorMetalnessTexture,
    // // doorRoughnessTexture,
  } = initDoorTextures();
  const {
    // environmentMapTexture,
  } = initEnvironmentTexture();
  // const material = new THREE.MeshBasicMaterial();
  // const material = new THREE.MeshNormalMaterial();
  // const material = new THREE.MeshMatcapMaterial();
  // const material = new THREE.MeshDepthMaterial();
  // const material = new THREE.MeshLambertMaterial();
  // const material = new THREE.MeshPhongMaterial();
  // material.shininess = 100;
  // material.specular = new THREE.Color(0x1188ff);
  // const material = new THREE.MeshToonMaterial();
  /**
   * MeshStandardMaterial 使用基于物理渲染（PBR），和 MeshLambertMaterial 以及 MeshPhongMaterial 类似，
   * 它支持光照，但是拥有更真实的算法以及更好的参数，如 roughness 属性和 metalness 属性
   */
  // const material = new THREE.MeshStandardMaterial();
  // material.metalness = 0;
  // material.roughness = 1;
  // material.map = doorColorTexture;
  // material.aoMap = doorAmbientOcclusionTexture;
  // material.aoMapIntensity = 1;
  // material.displacementMap = doorHeightTexture;
  // material.displacementScale = 0.05;
  // material.metalnessMap = doorMetalnessTexture;
  // material.roughnessMap = doorRoughnessTexture;
  // material.normalMap = doorNormalTexture;
  // material.normalScale.set(0.5, 0.5);
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture;

  const material = new THREE.MeshStandardMaterial();
  // material.metalness = 0.7;
  material.roughness = 0.4;
  // material.envMap = environmentMapTexture;

  // Debug
  gui.add(material, "metalness").min(0).max(1).step(0.001);
  gui.add(material, "roughness").min(0).max(1).step(0.001);
  // gui.add(material, "aoMapIntensity").min(0).max(10).step(0.001);
  // gui.add(material, "displacementScale").min(0).max(1).step(0.001);

  // const {
  //   doorColorTexture,
  //   doorAlphaTexture,
  //   doorHeightTexture,
  //   doorNormalTexture,
  //   doorAmbientOcclusionTexture,
  //   doorMetalnessTexture,
  //   doorRoughnessTexture,
  // } = initTextures();
  // material.map = doorColorTexture;
  // material.color = new THREE.Color(0xff00ff);
  // material.wireframe = true;
  // material.flatShading = true;
  // material.transparent = true;
  // material.opacity = 0.5;
  // material.alphaMap = doorAlphaTexture;
  // material.side = THREE.DoubleSide;

  return material;
};

const initGrassFloorMaterial = () => {
  const {
    grassColorTexture,
    grassHeightTexture,
    grassNormalTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
  } = initGrassTexture();

  const material = new THREE.MeshStandardMaterial({
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

  const material = new THREE.MeshStandardMaterial({
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
  const material = new THREE.MeshStandardMaterial({ color: "#b35f45" });

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

  const material = new THREE.MeshStandardMaterial({
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
  const material = new THREE.MeshStandardMaterial({ color: "#89c854" });

  return material;
};

const initGraveMaterial = () => {
  const material = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

  return material;
};

export {
  initMaterial,
  initGrassFloorMaterial,
  initWallsMaterial,
  initRoofMaterial,
  initDoorMaterial,
  initBushMaterial,
  initGraveMaterial,
};
