import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

const initCubeObject = () => {
  return new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
  );
};

export default initCubeObject;
