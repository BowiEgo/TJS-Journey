import * as THREE from 'three';
import BaseObject, { BaseObjectOptions } from '../../core/Object/BaseObject';
import { GLTF } from 'three/examples/jsm/Addons.js';

export default class Monkey extends BaseObject {
  constructor(opts?: BaseObjectOptions) {
    super(opts);
  }

  setGeometry(): void {
    this.geometry = ((this.resources.items.monkeyModel as GLTF).scene.children[0] as THREE.Mesh).geometry;
  }

  update(): void {
    this.mesh!.rotation.x += this.time.delta * 0.1;
    this.mesh!.rotation.y += this.time.delta * 0.1;
    this.mesh!.rotation.z += this.time.delta * 0.1;
  }
}
