import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/gltf/");
gltfLoader.setDRACOLoader(dracoLoader);

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
