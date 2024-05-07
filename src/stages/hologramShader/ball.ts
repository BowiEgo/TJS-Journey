import * as THREE from 'three';
import BaseObject, { BaseObjectOptions } from '../../core/Object/BaseObject';

export default class Ball extends BaseObject {
  constructor(opts?: BaseObjectOptions) {
    super(opts);
  }

  setGeometry(): void {
    this.geometry = new THREE.SphereGeometry();
  }

  update(): void {
    this.mesh!.rotation.x += this.time.delta * 0.1;
    this.mesh!.rotation.y += this.time.delta * 0.1;
    this.mesh!.rotation.z += this.time.delta * 0.1;
  }
}
