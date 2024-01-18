import { GLTFLoader } from "three/examples/jsm/Addons.js";

const gltfLoader = new GLTFLoader();

async function loadModels(url: string) {
  return await new Promise((resolve) => {
    gltfLoader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      () => {},
      (err) => {
        console.error(err);
      }
    );
  });
}

export { loadModels };
