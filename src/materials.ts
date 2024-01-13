import * as THREE from "three";
import GUI from "lil-gui";
import { initTextures } from "./textures";

const initMaterial = (gui: GUI) => {
  const {
    // // doorColorTexture,
    // // doorAlphaTexture,
    // // doorHeightTexture,
    // // doorNormalTexture,
    // // doorAmbientOcclusionTexture,
    // // doorMetalnessTexture,
    // // doorRoughnessTexture,
    // environmentMapTexture,
  } = initTextures();
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
  gui.add(material, "aoMapIntensity").min(0).max(10).step(0.001);
  gui.add(material, "displacementScale").min(0).max(1).step(0.001);

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

export { initMaterial };
