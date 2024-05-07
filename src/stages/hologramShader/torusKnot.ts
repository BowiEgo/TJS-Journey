import * as THREE from 'three';
import BaseObject, { BaseObjectOptions } from '../../core/Object/BaseObject';

export default class TorusKnot extends BaseObject {
  constructor(opts?: BaseObjectOptions) {
    super(opts);
  }

  setGeometry(): void {
    this.geometry = new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32);
  }

  update(): void {
    this.mesh!.rotation.x += this.time.delta * 0.1;
    this.mesh!.rotation.y += this.time.delta * 0.1;
    this.mesh!.rotation.z += this.time.delta * 0.1;
  }
}
