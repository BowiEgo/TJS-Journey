import { CubeTextureLoader, LoadingManager, TextureLoader } from "three";

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

export { textureLoader, cubeTextureLoader };
