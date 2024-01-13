import GUI from "lil-gui";
import {
  AmbientLight,
  CameraHelper,
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

const initShadowLight = (scene: Scene, gui: GUI) => {
  // Ambient Light
  const ambientLight = new AmbientLight();
  ambientLight.color = new Color(0xffffff);
  ambientLight.intensity = 0.5;
  scene.add(ambientLight);
  gui
    .add(ambientLight, "intensity")
    .name("ambientLight-intensity")
    .min(0)
    .max(1)
    .step(0.01);

  // Direction Light
  const directionLight = new DirectionalLight(0xffffff, 0.4);
  directionLight.position.set(2, 2, -1);
  scene.add(directionLight);
  gui
    .add(directionLight.position, "x")
    .name("directionLight-position-x")
    .min(-Math.PI * 2)
    .max(Math.PI * 2)
    .step(0.01);
  gui
    .add(directionLight.position, "y")
    .name("directionLight-position-y")
    .min(-Math.PI * 2)
    .max(Math.PI * 2)
    .step(0.01);
  gui
    .add(directionLight.position, "z")
    .name("directionLight-position-z")
    .min(-Math.PI * 2)
    .max(Math.PI * 2)
    .step(0.01);
  gui
    .add(directionLight, "intensity")
    .name("directionLight-intensity")
    .min(0)
    .max(1)
    .step(0.01);

  directionLight.castShadow = true;

  directionLight.shadow.mapSize.width = 1024;
  directionLight.shadow.mapSize.height = 1024;
  directionLight.shadow.camera.top = 2;
  directionLight.shadow.camera.right = 2;
  directionLight.shadow.camera.bottom = -2;
  directionLight.shadow.camera.left = -2;
  directionLight.shadow.camera.near = 1;
  directionLight.shadow.camera.far = 6;
  directionLight.shadow.radius = 10;

  const directionLightCameraHelper = new CameraHelper(
    directionLight.shadow.camera
  );
  directionLightCameraHelper.visible = false;
  scene.add(directionLightCameraHelper);

  // Spot light
  const spotLight = new SpotLight(0xffffff, 4, 10, Math.PI * 0.3);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.fov = 30;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 6;

  spotLight.position.set(0, 2, 2);
  scene.add(spotLight);
  scene.add(spotLight.target);

  const spotLightCameraHelper = new CameraHelper(spotLight.shadow.camera);
  spotLightCameraHelper.visible = false;
  scene.add(spotLightCameraHelper);

  // Point Light
  const pointLight = new PointLight(0xffffff, 1);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 5;

  pointLight.position.set(-1, 1, 0);
  scene.add(pointLight);
  gui
    .add(pointLight, "intensity")
    .name("pointLight-intensity")
    .min(0)
    .max(1)
    .step(0.01);

  const pointLightCameraHelper = new CameraHelper(pointLight.shadow.camera);
  pointLightCameraHelper.visible = false;
  scene.add(pointLightCameraHelper);
};

export { initBasicLight, initShadowLight };
