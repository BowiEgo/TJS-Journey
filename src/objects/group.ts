import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";

const createGroup = () => {
  const group = new Group();
  group.position.y = 1;
  group.scale.y = 2;
  group.rotation.y = 1;

  const cube1 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
  );
  group.add(cube1);

  const cube2 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0x00ff00 })
  );
  cube2.position.x = -2;
  group.add(cube2);

  const cube3 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0x0000ff })
  );
  cube3.position.x = 2;
  group.add(cube3);

  return group;
};

export default createGroup;
