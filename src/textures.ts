import {
  CubeTextureLoader,
  LoadingManager,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from "three";

const loadingManager = new LoadingManager();

loadingManager.onStart = () => {
  // console.log("onStart");
};

loadingManager.onLoad = () => {
  // console.log("onLoad");
};

loadingManager.onProgress = () => {
  // console.log("onProgress");
};

loadingManager.onError = (err) => {
  console.log("onError", err);
};

const textureLoader = new TextureLoader(loadingManager);
const cubeTextureLoader = new CubeTextureLoader(loadingManager);

const initDoorTextures = () => {
  const doorColorTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_basecolor.jpg"
  );
  const doorAlphaTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_opacity.jpg"
  );
  const doorHeightTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_height.png"
  );
  const doorNormalTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_normal.jpg"
  );
  const doorAmbientOcclusionTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_ambientOcclusion.jpg"
  );
  const doorMetalnessTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_metallic.jpg"
  );
  const doorRoughnessTexture = textureLoader.load(
    "assets/textures/door/Door_Wood_001_roughness.jpg"
  );

  doorColorTexture.colorSpace = SRGBColorSpace;

  // doorColorTexture.repeat.x = 2;
  // doorColorTexture.repeat.y = 3;
  // doorColorTexture.wrapS = MirroredRepeatWrapping;
  // doorColorTexture.wrapT = MirroredRepeatWrapping;

  // doorColorTexture.offset.x = 0.5;
  // doorColorTexture.offset.y = 0.5;

  // doorColorTexture.rotation = Math.PI / 4;
  // doorColorTexture.center.x = 0.5;
  // doorColorTexture.center.y = 0.5;

  doorColorTexture.generateMipmaps = false;
  doorColorTexture.minFilter = NearestFilter;
  doorColorTexture.magFilter = NearestFilter;

  // const image = new Image();
  // const texture = new Texture(image);

  // image.onload = () => {
  //   texture.needsUpdate = true;
  // };

  // image.src = "assets/textures/door/Door_Wood_001_basecolor.jpg";

  return {
    doorColorTexture,
    doorAlphaTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorAmbientOcclusionTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  };
};

const initBricksTexture = () => {
  const bricksColorTexture = textureLoader.load(
    "assets/textures/bricks/Brick_Wall_019_basecolor.jpg"
  );

  const bricksHeightTexture = textureLoader.load(
    "assets/textures/bricks/Brick_Wall_019_height.png"
  );
  const bricksNormalTexture = textureLoader.load(
    "assets/textures/bricks/Brick_Wall_019_normal.jpg"
  );
  const bricksAmbientOcclusionTexture = textureLoader.load(
    "assets/textures/bricks/Brick_Wall_019_ambientOcclusion.jpg"
  );

  const bricksRoughnessTexture = textureLoader.load(
    "assets/textures/bricks/Brick_Wall_019_roughness.jpg"
  );

  bricksColorTexture.repeat.set(2, 2);
  bricksHeightTexture.repeat.set(2, 2);
  bricksNormalTexture.repeat.set(2, 2);
  bricksAmbientOcclusionTexture.repeat.set(2, 2);
  bricksRoughnessTexture.repeat.set(2, 2);

  bricksColorTexture.wrapS = RepeatWrapping;
  bricksHeightTexture.wrapS = RepeatWrapping;
  bricksNormalTexture.wrapS = RepeatWrapping;
  bricksAmbientOcclusionTexture.wrapS = RepeatWrapping;
  bricksRoughnessTexture.wrapS = RepeatWrapping;

  bricksColorTexture.wrapT = RepeatWrapping;
  bricksHeightTexture.wrapT = RepeatWrapping;
  bricksNormalTexture.wrapT = RepeatWrapping;
  bricksAmbientOcclusionTexture.wrapT = RepeatWrapping;
  bricksRoughnessTexture.wrapT = RepeatWrapping;

  return {
    bricksColorTexture,
    bricksHeightTexture,
    bricksNormalTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
  };
};

const initGrassTexture = () => {
  const grassColorTexture = textureLoader.load(
    "assets/textures/grass/Grass_005_BaseColor.jpg"
  );

  const grassHeightTexture = textureLoader.load(
    "assets/textures/grass/Grass_005_Height.png"
  );

  const grassNormalTexture = textureLoader.load(
    "assets/textures/grass/Grass_005_Normal.jpg"
  );

  const grassAmbientOcclusionTexture = textureLoader.load(
    "assets/textures/grass/Grass_005_AmbientOcclusion.jpg"
  );

  const grassRoughnessTexture = textureLoader.load(
    "assets/textures/grass/Grass_005_Roughness.jpg"
  );

  grassColorTexture.repeat.set(8, 8);
  grassHeightTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassAmbientOcclusionTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = RepeatWrapping;
  grassHeightTexture.wrapS = RepeatWrapping;
  grassNormalTexture.wrapS = RepeatWrapping;
  grassAmbientOcclusionTexture.wrapS = RepeatWrapping;
  grassRoughnessTexture.wrapS = RepeatWrapping;

  grassColorTexture.wrapT = RepeatWrapping;
  grassHeightTexture.wrapT = RepeatWrapping;
  grassNormalTexture.wrapT = RepeatWrapping;
  grassAmbientOcclusionTexture.wrapT = RepeatWrapping;
  grassRoughnessTexture.wrapT = RepeatWrapping;

  return {
    grassColorTexture,
    grassHeightTexture,
    grassNormalTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
  };
};

const initEnvironmentTexture = () => {
  const environmentMapTexture = cubeTextureLoader.load([
    "assets/textures/environmentMaps/0/px.png",
    "assets/textures/environmentMaps/0/nx.png",
    "assets/textures/environmentMaps/0/py.png",
    "assets/textures/environmentMaps/0/ny.png",
    "assets/textures/environmentMaps/0/pz.png",
    "assets/textures/environmentMaps/0/nz.png",
  ]);

  return {
    environmentMapTexture,
  };
};

const initParticlesTexture = () => {
  const particleTexture = textureLoader.load(
    "assets/textures/particles/snow-icon-31373.png"
  );

  return particleTexture;
};

export {
  initDoorTextures,
  initBricksTexture,
  initGrassTexture,
  initEnvironmentTexture,
  initParticlesTexture,
};
