import {
  Mesh,
  MeshMatcapMaterial,
  Scene,
  TextureLoader,
  TorusGeometry,
} from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

async function init3DText(scene: Scene) {
  const fontLoader = new FontLoader();
  fontLoader.load("assets/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Hello Three.js", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    // textGeometry.computeBoundingBox();
    // if (textGeometry.boundingBox) {
    //   // The text looks centered but it's not because of the bevelThickness(0.03) and bevelSize(0.02),
    //   // so we have to minus them
    //   textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    //   );
    // }
    textGeometry.center();

    // Textures
    const textureLoader = new TextureLoader();
    const matcapTextture = textureLoader.load(
      "/textures/matcaps/512/7877EE_D87FC5_75D9C7_1C78C0-512px.png"
    );

    const material = new MeshMatcapMaterial({ matcap: matcapTextture });
    // material.wireframe = true;
    scene.add(new Mesh(textGeometry, material));

    console.time("donut");
    const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 300; i++) {
      const donut = new Mesh(donutGeometry, material);

      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
    console.timeEnd("donut");
  });
}

export { init3DText };
