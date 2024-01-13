import * as THREE from "three";
import { initTextures } from "./textures";
import { initMaterial } from "./materials";
import GUI from "lil-gui";
import gsap from "gsap";

const initBoxGeometry = (gui: GUI) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });

  const mesh = new THREE.Mesh(geometry, material);

  // // Position
  // // mesh.position.x = 0.7;
  // // mesh.position.y = -0.6;
  // // mesh.position.z = 1;
  // mesh.position.set(0.7, -0.6, 1);

  // // mesh.position.normalize();

  // // Scale
  // // mesh.scale.x = 2;
  // // mesh.scale.y = 0.5;
  // // mesh.scale.z = 0.5;
  // mesh.scale.set(2, 0.5, 0.5);

  // // Rotation
  // mesh.rotation.reorder("YXZ");
  // mesh.rotation.y = Math.PI * 0.25;
  // mesh.rotation.x = Math.PI * 0.25;

  // Debug
  // gui.add(object.position, "y", -3, 3, 0.01);
  gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
  gui.add(mesh.position, "x", -3, 3, 0.01);
  gui.add(mesh.position, "z", -3, 3, 0.01);

  gui.add(mesh, "visible");

  gui.add(mesh.material, "wireframe");

  // Create color pickers for multiple color formats
  const parameters = {
    color: mesh.material.color,
    spin: () => {
      gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI,
      });
    },
  };

  gui.addColor(parameters, "color").onChange(() => {
    mesh.material.color.set(parameters.color);
  });

  gui.add(parameters, "spin");

  return mesh;
};

const initBufferGeometry = () => {
  // // prettier-ignore
  // const positionsArray = new Float32Array([
  //   0,0,0,
  //   0,1,0,
  //   1,0,0
  // ]);
  // const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

  const geometry = new THREE.BufferGeometry();
  // geometry.setAttribute("position", positionsAttribute);

  const count = 5000;
  const positionsArray = new Float32Array(count * 3 * 3);

  for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
  }

  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  geometry.setAttribute("position", positionsAttribute);

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

const initGroup = () => {
  const group = new THREE.Group();
  group.position.y = 1;
  group.scale.y = 2;
  group.rotation.y = 1;

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  group.add(cube1);

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
  cube2.position.x = -2;
  group.add(cube2);

  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  );
  cube3.position.x = 2;
  group.add(cube3);

  return group;
};

const initTextureGeometry = () => {
  const {
    doorColorTexture,
    // doorAlphaTexture,
    // doorHeightTexture,
    // doorNormalTexture,
    // doorAmbientOcclusionTexture,
    // doorMetalnessTexture,
    // doorRoughnessTexture,
  } = initTextures();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

const initMaterialGeometry = (gui: GUI) => {
  const material = initMaterial(gui);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
  );
  sphere.position.x = -1.5;
  sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
  );
  plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
  );
  torus.position.x = 1.5;
  torus.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
  );

  return {
    sphere,
    plane,
    torus,
  };
};

export {
  initBoxGeometry,
  initBufferGeometry,
  initGroup,
  initTextureGeometry,
  initMaterialGeometry,
};
