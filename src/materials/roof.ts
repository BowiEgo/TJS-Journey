import { MeshStandardMaterial } from "three";

const initRoofMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b35f45" });

  return material;
};

export default initRoofMaterial;
