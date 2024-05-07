import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import BaseObject from '../../core/Object/BaseObject';

export default class SkyBox extends BaseObject {
  constructor() {
    super();
  }

  setMesh(): void {
    const sky = new Sky();
    sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();

    const skyParameters = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.95,
      elevation: -2.2,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure,
    };

    const updateSky = () => {
      const uniforms = sky.material.uniforms;
      uniforms['turbidity'].value = skyParameters.turbidity;
      uniforms['rayleigh'].value = skyParameters.rayleigh;
      uniforms['mieCoefficient'].value = skyParameters.mieCoefficient;
      uniforms['mieDirectionalG'].value = skyParameters.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation);
      const theta = THREE.MathUtils.degToRad(skyParameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      uniforms['sunPosition'].value.copy(sun);

      this.renderer.toneMappingExposure = skyParameters.exposure;
      this.renderer.render(this.scene, this.camera);
    };

    this.debugFolder?.add(skyParameters, 'turbidity', 0.0, 20.0, 0.1).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'rayleigh', 0.0, 4, 0.001).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'mieDirectionalG', 0.0, 1, 0.001).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'elevation', -3, 90, 0.01).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'azimuth', -180, 180, 0.1).onChange(updateSky);
    this.debugFolder?.add(skyParameters, 'exposure', 0, 1, 0.0001).onChange(updateSky);

    updateSky();

    this.mesh = sky;
  }
}
