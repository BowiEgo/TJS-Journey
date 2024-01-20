import GUI from "lil-gui";
import { AmbientLight, DirectionalLight, PointLight, Scene } from "three";

const createHauntedHouseLight = (scene: Scene, gui: GUI) => {
  // Ambient light
  const ambientLight = new AmbientLight("#b9d5ff", 0.12);

  gui
    .add(ambientLight, "intensity")
    .name("ambientLight-intensity")
    .min(0)
    .max(1)
    .step(0.001);

  scene.add(ambientLight);

  // Directional light
  const moonLight = new DirectionalLight("#b9d5ff", 0.12);
  moonLight.position.set(4, 5, -2);

  gui
    .add(moonLight, "intensity")
    .name("moonLight-intensity")
    .min(0)
    .max(1)
    .step(0.001);

  scene.add(moonLight);

  // Door light
  const doorLight = new PointLight("#ff7d46", 5, 7);
  doorLight.position.set(0, 2.2, 2.7);

  scene.add(doorLight);

  // Ghosts
  const ghost1 = new PointLight("#ff00ff", 2, 3);
  const ghost2 = new PointLight("#00ffff", 2, 3);
  const ghost3 = new PointLight("#ffff00", 2, 3);

  scene.add(ghost1, ghost2, ghost3);

  return { moonLight, doorLight, ghosts: { ghost1, ghost2, ghost3 } };
};

export default createHauntedHouseLight;
