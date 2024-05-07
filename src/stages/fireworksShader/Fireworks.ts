import * as THREE from 'three';
import BaseObject, { BaseObjectOptions } from '../../core/Object/BaseObject';
import fireworkVertexShader from '../../shaders/firework/firework.vs.glsl';
import fireworkFragmentShader from '../../shaders/firework/firework.fs.glsl';
import gsap from 'gsap';

export default class Fireworks extends BaseObject {
  constructor(opts?: BaseObjectOptions) {
    super(opts);
  }

  setTexture(): void {
    this.texture = Object.keys(this.resources.items).map((key) => {
      const item = this.resources.items[key] as THREE.Texture;
      item.flipY = false;
      return item;
    });
  }

  createMaterial(size: number, texture: THREE.Texture, color: THREE.Color) {
    const material = new THREE.ShaderMaterial({
      vertexShader: fireworkVertexShader,
      fragmentShader: fireworkFragmentShader,
      uniforms: {
        u_size: new THREE.Uniform(size),
        u_resolution: new THREE.Uniform(this.sizes.resolution),
        u_texture: new THREE.Uniform(texture),
        u_color: new THREE.Uniform(color),
        u_progress: new THREE.Uniform(0),
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return material;
  }

  createGeometry(count: number, radius: number) {
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count * 3);
    const timeMultiplierArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const spherical = new THREE.Spherical(
        radius * (0.75 + Math.random() * 0.25),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
      );
      const position = new THREE.Vector3();
      position.setFromSpherical(spherical);

      positionsArray[i3 + 0] = position.x;
      positionsArray[i3 + 1] = position.y;
      positionsArray[i3 + 2] = position.z;

      sizesArray[i] = Math.random();

      timeMultiplierArray[i] = 1 + Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
    geometry.setAttribute('a_size', new THREE.Float32BufferAttribute(sizesArray, 1));
    geometry.setAttribute(
      'a_timeMultiplier',
      new THREE.Float32BufferAttribute(timeMultiplierArray, 1),
    );

    return geometry;
  }

  create(
    count: number = 100,
    position: THREE.Vector3 = new THREE.Vector3(),
    size: number = 0.5,
    textureType: IntRange<0, 9> = 8,
    radius: number = 1,
    color: THREE.Color = new THREE.Color(0xff0000),
  ) {
    const geometry = this.createGeometry(count, radius);
    const material = this.createMaterial(
      size,
      (this.texture as THREE.Texture[])[textureType],
      color,
    );

    const firework = new THREE.Points(geometry, material);
    firework.position.copy(position);
    this.scene.add(firework);

    // Destroy
    const destroy = () => {
      this.scene.remove(firework);
      geometry.dispose();
      material.dispose();
    };

    // Animate
    gsap.to(material.uniforms.u_progress, {
      value: 1,
      duration: 3,
      ease: 'linear',
      onComplete: destroy,
    });
  }

  createRandom() {
    const count = Math.round(400 + Math.random() * 1000);
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      Math.random(),
      (Math.random() - 0.5) * 2,
    );
    const size = 0.1 + Math.random() * 0.1;
    const textureType = Math.floor(
      Math.random() * (this.texture as THREE.Texture[]).length,
    ) as IntRange<0, 9>;
    const radius = 0.5 + Math.random();
    const color = new THREE.Color();
    color.setHSL(Math.random(), 1, 0.7);

    this.create(count, position, size, textureType, radius, color);
  }
}
