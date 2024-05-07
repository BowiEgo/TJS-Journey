import * as THREE from 'three';
import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  width: number;
  height: number;
  pixelRatio: number;
  resolution: THREE.Vector2;
  constructor() {
    super();

    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.resolution = new THREE.Vector2(this.width * this.pixelRatio, this.height * this.pixelRatio);

    // Resize event
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.resolution.set(this.width * this.pixelRatio, this.height * this.pixelRatio);

      this.trigger('resize');
    });
  }
}
