import {
  BoxGeometry,
  ConeGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
} from "three";
import {
  createBushMaterial,
  createDoorMaterial,
  createRoofMaterial,
  createWallsMaterial,
} from "../materials";

const createHouse = () => {
  const house = new Group();

  // Walls
  const walls = new Mesh(new BoxGeometry(4, 2.5, 4), createWallsMaterial());
  walls.geometry.setAttribute(
    "uv2",
    new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  );
  walls.position.y = 1.25;

  // Roof
  const roof = new Mesh(new ConeGeometry(3.5, 1, 4), createRoofMaterial());
  roof.rotation.y = Math.PI * 0.25;
  roof.position.y = 2.5 + 0.5;

  // Door
  const door = new Mesh(
    new PlaneGeometry(2.2, 2.2, 100, 100),
    createDoorMaterial()
  );
  door.geometry.setAttribute(
    "uv2",
    new Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  );
  door.position.y = 1;
  door.position.z = 2 + 0.01;

  // Bushes
  const bushGeometry = new SphereGeometry(1, 16, 16);
  const bushMaterial = createBushMaterial();

  const bush1 = new Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);

  const bush2 = new Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);

  const bush3 = new Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);

  const bush4 = new Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1, 0.05, 2.6);

  house.add(walls);
  house.add(roof);
  house.add(door);
  house.add(bush1, bush2, bush3, bush4);

  return { house, walls, roof, door, bushes: { bush1, bush2, bush3, bush4 } };
};

export default createHouse;
