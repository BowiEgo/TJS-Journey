import * as THREE from 'three';
import GUI from 'lil-gui';
import { Core, createCore } from '../core';
import EventEmitter from '../core/EventEmitter';
import Resources from '../core/Resources';
import BaseObject from '../core/Object/BaseObject';
import Camera from '../core/Camera';
import Renderer from '../core/Renderer';
import Debug from '../core/Debug';
import Cursor from '../core/Cursor';

export default class Stage extends EventEmitter {
  core: Core | null;
  renderer: Renderer;
  scene: THREE.Scene;
  camera: Camera;
  cursor: Cursor;
  resources: Resources;
  debug: Debug;
  debugFolder: GUI | undefined;
  objects: BaseObject[];

  constructor() {
    super();
    this.core = createCore();
    this.renderer = this.core.renderer;
    this.scene = this.core.scene;
    this.camera = this.core.camera;
    this.cursor = this.core.cursor;
    this.resources = this.core.resources;
    this.debug = this.core.debug;

    this.objects = [];

    if (this.core?.debug.active) {
      this.debugFolder = this.core.debug.ui?.addFolder(this.constructor.name);
    }

    // Wait for resources
    this.resources.on('ready', () => {
      this.trigger('setup');
    });

    this.on('update', () => {
      this.objects.forEach((object) => {
        object.update();
      });
    });

    this.on('destroy', () => {
      this.objects.forEach((object) => {
        object.destroy();
      });
    });
  }

  init() {
    this.resources.load(this.resources.sources);
  }

  addObject(object: BaseObject) {
    this.objects.push(object);
    if (object.mesh) {
      this.scene.add(object.mesh);
    }
  }

  update() {
    this.trigger('update');
  }

  destroy() {
    this.resources.off('ready');
    this.trigger('destroy');
    this.objects.forEach((obj) => obj.destroy());
  }
}
