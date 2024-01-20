import { MeshStandardMaterial } from "three";

const createRoofMaterial = () => {
  const material = new MeshStandardMaterial({ color: "#b35f45" });

  return material;
};

export default createRoofMaterial;
