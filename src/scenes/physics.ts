import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";
import {
  Body,
  Box,
  ContactMaterial,
  Material,
  Plane,
  SAPBroadphase,
  Sphere,
  Vec3,
  World,
} from "cannon-es";
import { createResize, createScene } from ".";
import { runAnimation, stopAnimation } from "../animations";
import { createControls, createCursor } from "../cameras";
import { createDebugUI } from "../debugUI";
import { createBasicLight } from "../lights";
import { createEnvironmentTexture } from "../textures/hauntedHouse";
import physicsAnimation from "../animations/physics";
import createPlane from "../objects/plane";
import { NOOP } from "../utils";

export type ObjectToUpdate = {
  mesh: Mesh;
  body: Body;
};

const { environmentMapTexture } = createEnvironmentTexture();
const defaultMaterial = new Material("default");
const objectsToUpdate: ObjectToUpdate[] = [];
const sphereGeometry = new SphereGeometry(1, 20, 20);
const sphereMaterial = new MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});
const boxGeometry = new BoxGeometry(1, 1, 1);
const boxMaterial = new MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

/**
 * Sounds
 */
const hitSound = new Audio("assets/sounds/mixkit-basketball-ball-hard-hit.wav");

const playHitSound = (collision: any) => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  if (impactStrength > 1.5) {
    hitSound.volume = impactStrength / 20;
    hitSound.currentTime = 0;
    hitSound.play();
  }
};

const createPhysics = () => {
  // World
  const world = new World();
  world.broadphase = new SAPBroadphase(world);
  world.allowSleep = true;
  world.gravity.set(0, -9.82, 0);

  // Materials
  // const concreateMaterial = new Material("concreate");
  // const plasticMaterial = new Material("plastic");

  const defaultContactMaterial = new ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.1,
      restitution: 0.7,
    }
  );

  // const concreatePlasticContactMaterial = new ContactMaterial(
  //   concreateMaterial,
  //   plasticMaterial,
  //   {
  //     friction: 0.1,
  //     restitution: 0.7,
  //   }
  // );

  // world.addContactMaterial(concreatePlasticContactMaterial);
  world.defaultContactMaterial = defaultContactMaterial;

  // // Sphere
  // const sphereShape = new Sphere(0.5);
  // const sphereBody = new Body({
  //   mass: 1,
  //   position: new Vec3(0, 3, 0),
  //   shape: sphereShape,
  //   material: plasticMaterial,
  // });
  // sphereBody.applyLocalForce(
  //   new Vec3(150, 0, 0),
  //   new Vec3(0, 0, 0)
  // );

  // world.addBody(sphereBody);

  // Floor
  const floorShape = new Plane();
  const floorBody = new Body();
  floorBody.material = defaultMaterial;
  floorBody.mass = 0;
  floorBody.addShape(floorShape);
  floorBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI * 0.5);
  world.addBody(floorBody);

  return { world };
};

const createSphere = (
  scene: Scene,
  world: World,
  {
    radius,
    position,
  }: {
    radius: number;
    position: { x: number; y: number; z: number };
  }
) => {
  // Three.js mesh

  const mesh = new Mesh(sphereGeometry, sphereMaterial);
  mesh.scale.set(radius, radius, radius);
  mesh.castShadow = true;
  mesh.position.copy(position as Vector3);
  scene.add(mesh);

  // Cannon.js body
  const shape = new Sphere(radius);
  const body = new Body({
    mass: 1,
    position: new Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });
  body.position.copy(position as Vec3);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  objectsToUpdate.push({
    mesh,
    body,
  });

  return {
    mesh,
    body,
  };
};

const createBox = (
  scene: Scene,
  world: World,
  {
    width,
    height,
    depth,
    position,
  }: {
    width: number;
    height: number;
    depth: number;
    position: { x: number; y: number; z: number };
  }
) => {
  // Three.js mesh
  const mesh = new Mesh(boxGeometry, boxMaterial);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position as Vector3);
  scene.add(mesh);

  // Cannon.js body
  const shape = new Box(new Vec3(width * 0.5, height * 0.5, depth * 0.5));
  const body = new Body({
    mass: 1,
    position: new Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });
  body.position.copy(position as Vec3);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  objectsToUpdate.push({
    mesh,
    body,
  });

  return {
    mesh,
    body,
  };
};

async function createPhysicScene() {
  /**
   * Scene
   */
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene({
    rendererOpts: { alpha: true },
  });

  /**
   * Cursor
   */
  const cursor = createCursor(size);

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 100);
  camera.position.x = 0;
  camera.position.y = 3;
  camera.position.z = 12;

  createResize(size, canvas, camera, renderer);

  const controls = createControls(camera, canvas);

  /**
   * Lights
   */
  const { directionLight } = createBasicLight(scene);
  directionLight.shadow.camera.near = 0.1;
  directionLight.shadow.camera.far = 20;
  directionLight.castShadow = true;

  /**
   * Physics
   */
  const { world } = createPhysics();

  /**
   * Objects
   */
  // const { plane, sphere } = createObjects();
  const { plane } = createPlane();

  // Save in objects to update in animation
  scene.add(plane);

  /**
   * Debug
   */
  const gui = createDebugUI();
  const debugObject = { createSphere: NOOP, createBox: NOOP, reset: NOOP };
  debugObject.createSphere = () => {
    createSphere(scene, world, {
      radius: Math.random() * 0.5,
      position: {
        x: (Math.random() - 0.5) * 3,
        y: 3,
        z: (Math.random() - 0.5) * 3,
      },
    });
  };

  debugObject.createBox = () => {
    createBox(scene, world, {
      width: Math.random(),
      height: Math.random(),
      depth: Math.random(),
      position: {
        x: (Math.random() - 0.5) * 3,
        y: 3,
        z: (Math.random() - 0.5) * 3,
      },
    });
  };

  debugObject.reset = () => {
    for (const object of objectsToUpdate) {
      // Remove body
      object.body.removeEventListener("collide", playHitSound);
      world.removeBody(object.body);

      // Remove mesh
      scene.remove(object.mesh);
    }

    objectsToUpdate.splice(0, objectsToUpdate.length);
  };

  gui.add(debugObject, "createSphere");
  gui.add(debugObject, "createBox");
  gui.add(debugObject, "reset");

  /**
   * Render
   */
  // render(camera);

  // Animation
  runAnimation(
    camera,
    cursor,
    controls,
    render,
    physicsAnimation.bind(null, objectsToUpdate, world)
  );

  const dispose = (scene: Scene) => {
    stopAnimation();

    [plane].forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
    });

    debugObject.reset();
  };

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) };
}

export default createPhysicScene;
