import * as THREE from "three";

const initTextures = () => {
  const loadingManager = new THREE.LoadingManager();

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

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

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

  doorColorTexture.colorSpace = THREE.SRGBColorSpace;

  // doorColorTexture.repeat.x = 2;
  // doorColorTexture.repeat.y = 3;
  // doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
  // doorColorTexture.wrapT = THREE.MirroredRepeatWrapping;

  // doorColorTexture.offset.x = 0.5;
  // doorColorTexture.offset.y = 0.5;

  // doorColorTexture.rotation = Math.PI / 4;
  // doorColorTexture.center.x = 0.5;
  // doorColorTexture.center.y = 0.5;

  doorColorTexture.generateMipmaps = false;
  doorColorTexture.minFilter = THREE.NearestFilter;
  doorColorTexture.magFilter = THREE.NearestFilter;

  // const image = new Image();
  // const texture = new THREE.Texture(image);

  // image.onload = () => {
  //   texture.needsUpdate = true;
  // };

  // image.src = "assets/textures/door/Door_Wood_001_basecolor.jpg";

  const environmentMapTexture = cubeTextureLoader.load([
    "assets/textures/environmentMaps/0/px.png",
    "assets/textures/environmentMaps/0/nx.png",
    "assets/textures/environmentMaps/0/py.png",
    "assets/textures/environmentMaps/0/ny.png",
    "assets/textures/environmentMaps/0/pz.png",
    "assets/textures/environmentMaps/0/nz.png",
  ]);

  return {
    doorColorTexture,
    doorAlphaTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorAmbientOcclusionTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
    environmentMapTexture,
  };
};

export { initTextures };
