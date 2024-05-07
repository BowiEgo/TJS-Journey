import * as THREE from 'three';
import Environment from './Environment';
import Stage from '../Stage';
import Portal from './Portal';
import sources from './sources';
import Fireflies from './Fireflies';
import { DEFAULT_RENDERER_CLEAR_COLOR } from '../../core/Renderer';

const debugObject = {
  clearColor: '#2c383f',
};

export default class PortalStage extends Stage {
  environment: Environment | null = null;
  portal: Portal | null = null;
  firefiles: Fireflies | null = null;

  constructor() {
    super();
    this.core?.renderer.instance.setClearColor(debugObject.clearColor);

    // Debug
    if (this.debug?.active) {
      this.debugFolder = this.debug.ui?.addFolder('Stage');

      this.debugFolder
        ?.addColor(debugObject, 'clearColor')
        .onChange((val: THREE.ColorRepresentation) => {
          this.core?.renderer.instance.setClearColor(val);
        });
    }

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(6, 6, 6);
      this.core?.camera.instance.rotation.set(0, 0, 0);
      // Setup
      // this.environment = new Environment()
      this.portal = new Portal();
      this.firefiles = new Fireflies();
    });

    this.on('update', () => {
      this.portal?.update();
      this.firefiles?.update();
    });

    this.on('destroy', () => {
      this.portal?.destroy();
      this.firefiles?.destroy();
      this.environment?.destroy();
      this.core?.renderer.instance.setClearColor(DEFAULT_RENDERER_CLEAR_COLOR);
    });

    this.resources.load(sources);
  }
}
