import GUI from "lil-gui";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  Scene,
  SpotLight,
  SpotLightHelper,
  Vector3,
} from "three";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

const initBasicLight = (scene: Scene, gui: GUI) => {
  const ambientLight = new AmbientLight();
  ambientLight.color = new Color(0xffffff);
  ambientLight.intensity = 0.5;

  gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);
  scene.add(ambientLight);

  const directionLight = new DirectionalLight(0x00fffc, 0.3);
  directionLight.position.set(1, 0.25, 0);
  scene.add(directionLight);

  const hemisphereLight = new HemisphereLight(0xff0000, 0x0000ff, 1.5);
  scene.add(hemisphereLight);

  const pointLight = new PointLight(0xff9000, 0.5, 10, 2);
  pointLight.position.set(1, -0.5, 1);
  scene.add(pointLight);

  // The RectAreaLight only works with MeshStandardMaterial and MeshPhysicalMaterial
  const rectAreaLight = new RectAreaLight(0x4e00ff, 2, 1, 1);
  rectAreaLight.position.set(-1.5, 0, 1.5);
  rectAreaLight.lookAt(new Vector3());
  scene.add(rectAreaLight);

  const spotLight = new SpotLight(0x78ff00, 1.5, 6, Math.PI * 0.1, 0.25, 1);
  spotLight.position.set(0, 2, 3);
  scene.add(spotLight);
  spotLight.target.position.x = -0.75;
  scene.add(spotLight.target);

  // Helpers
  const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight, 0.2);
  scene.add(hemisphereLightHelper);

  const directionalLightHelper = new DirectionalLightHelper(
    directionLight,
    0.2
  );
  scene.add(directionalLightHelper);

  const pointLightHelper = new PointLightHelper(pointLight, 0.2);
  scene.add(pointLightHelper);

  const spotLightHelper = new SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  // We need to call its update(...) method on the next frame after moving the target
  window.requestAnimationFrame(() => {
    spotLightHelper.update();
  });

  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  scene.add(rectAreaLightHelper);
};

export default initBasicLight;
