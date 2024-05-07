import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { disposeMeshes } from '../Utils';
import { Core, createCore } from '..';
import Resources from '../Resources';
import Time from '../Time';
import Cursor from '../Cursor';
import Sizes from '../Sizes';
import Debug from '../Debug';
import GUI from 'lil-gui';

type Geometry =
  | THREE.BoxGeometry
  | THREE.ConeGeometry
  | THREE.RingGeometry
  | THREE.TubeGeometry
  | THREE.EdgesGeometry
  | THREE.LatheGeometry
  | THREE.PlaneGeometry
  | THREE.BufferGeometry;
type Material =
  | THREE.MeshBasicMaterial
  | THREE.MeshStandardMaterial
  | THREE.PointsMaterial
  | THREE.ShaderMaterial;

export type BaseObjectOptions = {
  geometry?: Geometry;
  material?: Material;
};

export default class BaseObject {
  opts: BaseObjectOptions | undefined;
  core: Core;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  sizes: Sizes;
  time: Time;
  cursor: Cursor;
  resources: Resources;
  debug: Debug;
  debugFolder: GUI | undefined;

  texture: THREE.Texture | THREE.Texture[] | undefined;
  model: GLTF | undefined;

  geometry: Geometry | undefined;
  material: Material | Material[] | undefined;
  mesh: THREE.Mesh | THREE.Group | undefined;

  constructor(opts?: BaseObjectOptions) {
    this.opts = opts;
    this.core = createCore();
    this.scene = this.core.scene;
    this.renderer = this.core.renderer.instance;
    this.camera = this.core.camera.instance;
    this.sizes = this.core.sizes;
    this.time = this.core.time;
    this.cursor = this.core.cursor;
    this.resources = this.core.resources;
    this.debug = this.core.debug;

    if (this.core?.debug.active) {
      this.debugFolder = this.core.debug.ui?.addFolder(this.constructor.name);
    }

    this.core.renderer.on('beforeUpdate', this.beforeUpdate.bind(this));
    this.core.renderer.on('afterUpdate', this.afterUpdate.bind(this));

    this.setTexture();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setTexture() {}

  setModel() {}

  setGeometry(geometry?: Geometry) {
    if (geometry) {
      this.geometry = geometry;
      this.setMesh();
    } else if (this.opts && this.opts.geometry) {
      this.geometry = this.opts.geometry;
    } else {
      this.geometry = new THREE.BoxGeometry();
    }
  }

  setMaterial(material?: Material | Material[]) {
    if (material) {
      this.material = material;
      this.setMesh();
    } else if (this.opts && this.opts.material) {
      this.material = this.opts.material;
    } else {
      this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setPostProcessing() {}

  beforeUpdate() {}

  update() {}

  afterUpdate() {}

  destroy() {
    if (this.mesh) {
      disposeMeshes(this.mesh);
      this.scene.remove(this.mesh);
      this.mesh = undefined;
    }
    this.destroyed();
  }

  destroyed() {}
}
