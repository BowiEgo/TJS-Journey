import { textureLoader } from ".";

const createParticlesTexture = () => {
  const particleTexture = textureLoader.load(
    "/textures/particles/snow-icon-31373.png"
  );

  return particleTexture;
};

export default createParticlesTexture;
