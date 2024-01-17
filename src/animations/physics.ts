import { World } from "cannon-es";
import { Clock, Quaternion, Vector3 } from "three";
import { ObjectToUpdate } from "../scenes/physics";

const clock = new Clock();
let oldElapsedTime = 0;

const positionVector = new Vector3();

const physicsAnimation = (objectsToUpdate: ObjectToUpdate[], world: World) => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update physics world
  // sphereBody.applyForce(new Vec3(-0.5, 0, 0), sphereBody.position);

  world.step(1 / 60, deltaTime, 3);

  for (const object of objectsToUpdate) {
    positionVector.set(
      object.body.position.x,
      object.body.position.y,
      object.body.position.z
    );
    object.mesh.position.copy(positionVector);
    let quaternion = object.body.quaternion as unknown;
    object.mesh.quaternion.copy(quaternion as Quaternion);
  }
};

export default physicsAnimation;
