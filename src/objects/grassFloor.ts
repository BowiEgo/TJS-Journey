import { BufferAttribute, Mesh, PlaneGeometry } from "three";
import { createGrassFloorMaterial } from "../materials";

const createGrassFloor = () => {
  const material = createGrassFloorMaterial();

  const grassFloor = new Mesh(new PlaneGeometry(20, 20), material);
  grassFloor.geometry.setAttribute(
    "uv2",
    new BufferAttribute(grassFloor.geometry.attributes.uv.array, 2)
  );
  grassFloor.rotation.x = -Math.PI / 2;
  grassFloor.position.y = 0;
  // grassFloor.receiveShadow = true;

  return grassFloor;
};

export default createGrassFloor;
