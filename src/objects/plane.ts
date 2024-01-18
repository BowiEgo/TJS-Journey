import { Mesh, PlaneGeometry } from "three";
import { initBasicMaterial } from "../materials";

const createPlane = () => {
  const material = initBasicMaterial();

  const plane = new Mesh(new PlaneGeometry(10, 10, 100, 100), material);

  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;

  return {
    plane,
  };
};

export default createPlane;
