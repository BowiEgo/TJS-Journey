import { BufferAttribute, Mesh, PlaneGeometry } from "three";
import { initGrassFloorMaterial } from "../materials";

const initGrassFloor = () => {
  const material = initGrassFloorMaterial();

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

export default initGrassFloor;
