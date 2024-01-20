import GUI from "lil-gui";
import { BufferAttribute, Mesh, PlaneGeometry, SphereGeometry } from "three";
import { createBasicMaterial } from "../materials";

const createShadowObjects = (gui?: GUI) => {
  const material = createBasicMaterial(gui);

  const plane = new Mesh(new PlaneGeometry(5, 5, 100, 100), material);
  plane.geometry.setAttribute(
    "uv2",
    new BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  plane.receiveShadow = true;

  const sphere = new Mesh(new SphereGeometry(0.5, 64, 64), material);
  sphere.geometry.setAttribute(
    "uv2",
    new BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );
  sphere.castShadow = true;

  return {
    plane,
    sphere,
  };
};

export default createShadowObjects;
