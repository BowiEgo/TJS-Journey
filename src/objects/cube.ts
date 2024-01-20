import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

const createCubeObject = () => {
  return new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
  );
};

export default createCubeObject;
