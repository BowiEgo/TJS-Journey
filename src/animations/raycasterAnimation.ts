import { Clock, Mesh } from "three";

const clock = new Clock();

const raycasterAnimation = (
  {
    object1,
    object2,
    object3,
  }: {
    object1: Mesh;
    object2: Mesh;
    object3: Mesh;
  },
  handleIntersect: Function
) => {
  const elapsedTime = clock.getElapsedTime();

  // Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  handleIntersect();
};

export default raycasterAnimation;
