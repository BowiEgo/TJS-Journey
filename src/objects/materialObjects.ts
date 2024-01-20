import GUI from "lil-gui";
import {
  BoxGeometry,
  BufferAttribute,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { createBasicMaterial } from "../materials";

const createMaterialObjects = (gui?: GUI) => {
  const material = createBasicMaterial(gui);

  const plane = new Mesh(new PlaneGeometry(5, 5, 100, 100), material);
  // When apply textures and add subdivisions to the geometry,
  // don't foget the uv2 attribute to support the aoMap
  plane.geometry.setAttribute(
    "uv2",
    new BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.65;

  const sphere = new Mesh(new SphereGeometry(0.5, 64, 64), material);
  sphere.position.x = -1.5;
  sphere.geometry.setAttribute(
    "uv2",
    new BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );

  const cube = new Mesh(new BoxGeometry(0.75, 0.75, 0.75), material);

  const torus = new Mesh(new TorusGeometry(0.3, 0.2, 64, 128), material);
  torus.position.x = 1.5;
  torus.geometry.setAttribute(
    "uv2",
    new BufferAttribute(torus.geometry.attributes.uv.array, 2)
  );

  return {
    plane,
    sphere,
    cube,
    torus,
  };
};

export default createMaterialObjects;
