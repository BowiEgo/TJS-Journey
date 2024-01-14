import GUI from "lil-gui";
import {
  initBricksTexture,
  initDoorTextures,
  initEnvironmentTexture,
  initGrassTexture,
  initParticlesTexture,
} from "./textures";
import {
  AdditiveBlending,
  // BoxGeometry,
  // Color,
  // Mesh,
  // MeshBasicMaterial,
  MeshStandardMaterial,
  PointsMaterial,
} from "three";

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
  // material.color = new Color(0xff00ff);
  // material.wireframe = true;
  // material.flatShading = true;
  // material.transparent = true;
  // material.opacity = 0.5;
  // material.alphaMap = doorAlphaTexture;
  // material.side = DoubleSide;

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

const initParticlesMaterial = () => {
  // Change the size property to control all particles size and the sizeAttenuation to specify if
  // distant particles should be smaller than close particles
  const material = new PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
  });
  // material.color = new Color("#ff88cc");
  material.transparent = true;
  material.alphaMap = initParticlesTexture();

  // The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency.
  // By default, the value is 0 meaning that the pixel will be rendered anyway

  // material.alphaTest = 0.001;

  // When drawing, the WebGL tests if what's being drawn is closer than what's already drawn.
  // That is called depth testing and can be deactivated with alphaTest.
  // Deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors.

  // material.depthTest = false;

  // The depth of what's being drawn is stored in what we call a depth buffer.
  // Instead of not testing if the particle is closer than what's in this depth buffer,
  // we can tell the WebGL not write particles in that depth buffer with depthTest.

  material.depthWrite = false;

  // The WebGL currently draws pixels one on top of the other.
  // With the blending property, we can tell the WebGL to add the color of the pixel to the color of the pixel already drawn.

  material.blending = AdditiveBlending;

  material.vertexColors = true;

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
  initParticlesMaterial,
};
