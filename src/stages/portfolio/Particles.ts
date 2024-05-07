import { BufferAttribute, BufferGeometry, Points, PointsMaterial, Scene } from 'three';
import { Core, createCore } from '../../core';
import Objects from './Targets';
import { disposeMeshes } from '../../core/Utils';

type Options = {
  materialColor: string;
};

export default class Particles {
  options: Options;
  objects: Objects;
  core: Core | null;
  scene: Scene;
  geometry: BufferGeometry;
  material: PointsMaterial;
  points: Points;

  constructor(objects: Objects, options: Options) {
    this.options = options;
    this.objects = objects;

    this.core = createCore();
    this.scene = this.core.scene;
    this.geometry = this.setGeometry();
    this.material = this.setMaterial();
    this.points = this.setPoints();
  }

  setGeometry() {
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] =
        this.objects.objectsDistance * 0.5 -
        Math.random() * this.objects.objectsDistance * this.objects.sectionMeshes.length;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new BufferGeometry();
    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));

    this.geometry = particlesGeometry;

    return particlesGeometry;
  }

  setMaterial() {
    const particlesMaterial = new PointsMaterial({
      color: this.options.materialColor,
      sizeAttenuation: true,
      size: 0.03,
    });

    this.material = particlesMaterial;

    return particlesMaterial;
  }

  setPoints() {
    const particles = new Points(this.geometry, this.material);
    this.points = particles;

    this.scene.add(particles);
    return particles;
  }

  destroy() {
    disposeMeshes(this.points);
    this.scene.remove(this.points);
  }
}
