import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
} from "three";

const createBufferObject = () => {
  // // prettier-ignore
  // const positionsArray = new Float32Array([
  //   0,0,0,
  //   0,1,0,
  //   1,0,0
  // ]);
  // const positionsAttribute = new BufferAttribute(positionsArray, 3);

  const geometry = new BufferGeometry();
  // geometry.setAttribute("position", positionsAttribute);

  const count = 5000;
  const positionsArray = new Float32Array(count * 3 * 3);

  for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
  }

  const positionsAttribute = new BufferAttribute(positionsArray, 3);
  geometry.setAttribute("position", positionsAttribute);

  const material = new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

export default createBufferObject;
