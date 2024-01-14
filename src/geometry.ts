import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  ConeGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from "three";
import {
  initBushMaterial,
  initDoorMaterial,
  initGrassFloorMaterial,
  initGraveMaterial,
  initMaterial,
  initRoofMaterial,
  initWallsMaterial,
} from "./materials";
import GUI from "lil-gui";
import gsap from "gsap";
import { initDoorTextures } from "./textures";

const initBoxGeometry = (gui: GUI) => {
  const geometry = new BoxGeometry(1, 1, 1, 4, 4, 4);

  const material = new MeshBasicMaterial({
    color: 0xff0000,
  });

  const mesh = new Mesh(geometry, material);

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

const initGroup = () => {
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

const initTextureGeometry = () => {
  const {
    doorColorTexture,
    // doorAlphaTexture,
    // doorHeightTexture,
    // doorNormalTexture,
    // doorAmbientOcclusionTexture,
    // doorMetalnessTexture,
    // doorRoughnessTexture,
  } = initDoorTextures();

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    map: doorColorTexture,
  });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

const initMaterialGeometry = (gui: GUI) => {
  const material = initMaterial(gui);

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

const initShadowGeometry = (gui: GUI) => {
  const material = initMaterial(gui);

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

const initHouse = () => {
  const house = new Group();

  // Walls
  const walls = new Mesh(new BoxGeometry(4, 2.5, 4), initWallsMaterial());
  walls.geometry.setAttribute(
    "uv2",
    new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  );
  walls.position.y = 1.25;

  // Roof
  const roof = new Mesh(new ConeGeometry(3.5, 1, 4), initRoofMaterial());
  roof.rotation.y = Math.PI * 0.25;
  roof.position.y = 2.5 + 0.5;

  // Door
  const door = new Mesh(
    new PlaneGeometry(2.2, 2.2, 100, 100),
    initDoorMaterial()
  );
  door.geometry.setAttribute(
    "uv2",
    new Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  );
  door.position.y = 1;
  door.position.z = 2 + 0.01;

  // Bushes
  const bushGeometry = new SphereGeometry(1, 16, 16);
  const bushMaterial = initBushMaterial();

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

const initGraves = () => {
  const graves = new Group();
  let gravesArray = [];

  const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = initGraveMaterial();

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const grave = new Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    graves.add(grave);
    gravesArray.push(grave);
  }

  return { graves, gravesArray };
};

export {
  initBoxGeometry,
  initBufferGeometry,
  initGroup,
  initTextureGeometry,
  initMaterialGeometry,
  initShadowGeometry,
  initGrassFloor,
  initHouse,
  initGraves,
};
