import { textureLoader } from ".";

const initParticlesTexture = () => {
  const particleTexture = textureLoader.load(
    "assets/textures/particles/snow-icon-31373.png"
  );

  return particleTexture;
};

export default initParticlesTexture;
