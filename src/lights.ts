import * as THREE from "three";

const initBasicLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const pointLight = new THREE.PointLight(0xffffff, 70);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;

  return {
    ambientLight,
    pointLight,
  };
};

export { initBasicLight };
