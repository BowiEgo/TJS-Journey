import { Clock } from "three";
import { PointsObjects } from ".";

const clock = new Clock();

const particlesAnimation = ({ points, count }: PointsObjects) => {
  const elapsedTime = clock.getElapsedTime();

  // points.rotation.y = elapsedTime * 0.2;
  // points.position.y = -elapsedTime * 0.2;
  // You should avoid this technic because updating the whole attribute on each frame is bad for performances
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = points.geometry.attributes.position.array[i3];
    points.geometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
  points.geometry.attributes.position.needsUpdate = true;
};

export default particlesAnimation;
