import GUI from "lil-gui";
import { MeshStandardMaterial } from "three";
import {
  createDoorTextures,
  createEnvironmentTexture,
} from "../textures/hauntedHouse";

const createBasicMaterial = (gui?: GUI) => {
  const {
    // // doorColorTexture,
    // // doorAlphaTexture,
    // // doorHeightTexture,
    // // doorNormalTexture,
    // // doorAmbientOcclusionTexture,
    // // doorMetalnessTexture,
    // // doorRoughnessTexture,
  } = createDoorTextures();
  const {
    // environmentMapTexture,
  } = createEnvironmentTexture();
  // const material = new MeshBasicMaterial();
  // const material = new MeshNormalMaterial();
  // const material = new MeshMatcapMaterial();
  // const material = new MeshDepthMaterial();
  // const material = new MeshLambertMaterial();
  // const material = new MeshPhongMaterial();
  // material.shininess = 100;
  // material.specular = new Color(0x1188ff);
  // const material = new MeshToonMaterial();
  /**
   * MeshStandardMaterial 使用基于物理渲染（PBR），和 MeshLambertMaterial 以及 MeshPhongMaterial 类似，
   * 它支持光照，但是拥有更真实的算法以及更好的参数，如 roughness 属性和 metalness 属性
   */
  // const material = new MeshStandardMaterial();
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

  const material = new MeshStandardMaterial();
  // material.metalness = 0.7;
  material.roughness = 0.4;
  // material.envMap = environmentMapTexture;

  // Debug
  gui?.add(material, "metalness").min(0).max(1).step(0.001);
  gui?.add(material, "roughness").min(0).max(1).step(0.001);
  // gui?.add(material, "aoMapIntensity").min(0).max(10).step(0.001);
  // gui?.add(material, "displacementScale").min(0).max(1).step(0.001);

  // const {
  //   doorColorTexture,
  //   doorAlphaTexture,
  //   doorHeightTexture,
  //   doorNormalTexture,
  //   doorAmbientOcclusionTexture,
  //   doorMetalnessTexture,
  //   doorRoughnessTexture,
  // } = createTextures();
  // material.map = doorColorTexture;
  // material.color = new Color(0xff00ff);
  // material.wireframe = true;
  // material.flatShading = true;
  // material.transparent = true;
  // material.opacity = 0.5;
  // material.alphaMap = doorAlphaTexture;
  // material.side = DoubleSide;

  return material;
};

export default createBasicMaterial;
