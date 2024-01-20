import { BufferAttribute, BufferGeometry, Points } from "three";
import { createParticlesMaterial } from "../materials";

const createParticles = () => {
  // Geometry
  const particlesGeometry = new BufferGeometry();
  const count = 2000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  particlesGeometry.setAttribute("color", new BufferAttribute(colors, 3));

  // Material
  const particlesMaterial = createParticlesMaterial();

  // Points
  const particles = new Points(particlesGeometry, particlesMaterial);

  return { points: particles, count };
};

export { createParticles };
