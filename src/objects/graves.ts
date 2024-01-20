import { BoxGeometry, Group, Mesh } from "three";
import { createGraveMaterial } from "../materials";

const createGraves = () => {
  const graves = new Group();
  let gravesArray = [];

  const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = createGraveMaterial();

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

export default createGraves;
