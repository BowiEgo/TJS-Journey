import gsap from "gsap";
import GUI from "lil-gui";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

const createBoxObject = (gui: GUI) => {
  const geometry = new BoxGeometry(1, 1, 1, 4, 4, 4);

  const material = new MeshBasicMaterial({
    color: 0xff0000,
  });

  const mesh = new Mesh(geometry, material);

  // // Position
  // // mesh.position.x = 0.7;
  // // mesh.position.y = -0.6;
  // // mesh.position.z = 1;
  // mesh.position.set(0.7, -0.6, 1);

  // // Scale
  // // mesh.scale.x = 2;
  // // mesh.scale.y = 0.5;
  // // mesh.scale.z = 0.5;
  // // mesh.position.normalize();
  // mesh.scale.set(2, 0.5, 0.5);

  // // Rotation
  // mesh.rotation.reorder("YXZ");
  // mesh.rotation.y = Math.PI * 0.25;
  // mesh.rotation.x = Math.PI * 0.25;

  // Debug
  // gui.add(object.position, "y", -3, 3, 0.01);
  gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
  gui.add(mesh.position, "x", -3, 3, 0.01);
  gui.add(mesh.position, "z", -3, 3, 0.01);

  gui.add(mesh, "visible");

  gui.add(mesh.material, "wireframe");

  // Create color pickers for multiple color formats
  const parameters = {
    color: mesh.material.color,
    spin: () => {
      gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI,
      });
    },
  };

  gui.addColor(parameters, "color").onChange(() => {
    mesh.material.color.set(parameters.color);
  });

  gui.add(parameters, "spin");

  return mesh;
};

export default createBoxObject;
