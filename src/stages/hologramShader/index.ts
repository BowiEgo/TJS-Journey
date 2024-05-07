import * as THREE from 'three';
import Stage from '../Stage';
import Ball from './ball';
import Monkey from './monkey';
import sources from './sources';
import TorusKnot from './torusKnot';
import holographicVertexShader from '../../shaders/holographic/holographic.vs.glsl';
import holographicFragmentShader from '../../shaders/holographic/holographic.fs.glsl';

const materialParameters = {
  color: '#70c1ff',
};

export default class HologramShaderStage extends Stage {
  ball: Ball | undefined;
  monkey: Monkey | undefined;
  torusKnot: TorusKnot | undefined;
  holographicMaterial: THREE.ShaderMaterial | undefined;

  constructor() {
    super();

    this.resources.sources = sources;

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(0, 0, 10);
      this.core?.camera.instance.rotation.set(0, 0, 0);

      // Setup

      this.holographicMaterial = new THREE.ShaderMaterial({
        vertexShader: holographicVertexShader,
        fragmentShader: holographicFragmentShader,
        uniforms: {
          u_time: new THREE.Uniform(0),
          u_color: new THREE.Uniform(new THREE.Color(materialParameters.color)),
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      this.ball = new Ball();
      this.monkey = new Monkey();
      this.torusKnot = new TorusKnot();

      this.ball.setMaterial(this.holographicMaterial);
      this.monkey.setMaterial(this.holographicMaterial);
      this.torusKnot.setMaterial(this.holographicMaterial);

      this.ball?.mesh?.position.set(-4, 0, 0);
      this.torusKnot?.mesh?.position.set(4, 0, 0);

      this.addObject(this.ball);
      this.addObject(this.monkey);
      this.addObject(this.torusKnot);

      // Debug
      this.debugFolder?.addColor(materialParameters, 'color').onChange(() => {
        this.holographicMaterial?.uniforms.u_color.value.set(materialParameters.color);
      });
    });

    this.on('update', () => {
      if (this.holographicMaterial) {
        this.holographicMaterial.uniforms.u_time.value = this.core?.time.elapsed;
      }
    });

    this.on('destroy', () => {});

    this.init();
  }
}
