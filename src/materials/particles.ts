import { AdditiveBlending, PointsMaterial } from "three";
import createParticlesTexture from "../textures/particles";

const createParticlesMaterial = () => {
  // Change the size property to control all particles size and the sizeAttenuation to specify if
  // distant particles should be smaller than close particles
  const material = new PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
  });
  // material.color = new Color("#ff88cc");
  material.transparent = true;
  material.alphaMap = createParticlesTexture();

  // The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency.
  // By default, the value is 0 meaning that the pixel will be rendered anyway

  // material.alphaTest = 0.001;

  // When drawing, the WebGL tests if what's being drawn is closer than what's already drawn.
  // That is called depth testing and can be deactivated with alphaTest.
  // Deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors.

  // material.depthTest = false;

  // The depth of what's being drawn is stored in what we call a depth buffer.
  // Instead of not testing if the particle is closer than what's in this depth buffer,
  // we can tell the WebGL not write particles in that depth buffer with depthTest.

  material.depthWrite = false;

  // The WebGL currently draws pixels one on top of the other.
  // With the blending property, we can tell the WebGL to add the color of the pixel to the color of the pixel already drawn.

  material.blending = AdditiveBlending;

  material.vertexColors = true;

  return material;
};

export default createParticlesMaterial;
