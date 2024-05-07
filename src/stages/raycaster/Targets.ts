import { Group, Mesh, MeshBasicMaterial, Scene, SphereGeometry } from 'three';
import { Core, createCore } from '../../core';
import Resources from '../../core/Resources';
import Time from '../../core/Time';
import { disposeMeshes } from '../../core/Utils';
import Debug from '../../core/Debug';
import GUI from 'lil-gui';
import Camera from '../../core/Camera';
import Sizes from '../../core/Sizes';
import Cursor from '../../core/Cursor';
import Scroll from '../../core/Scroll';

export default class Targets {
  core: Core | null;
  scene: Scene;
  resources: Resources;
  time: Time;
  camera: Camera;
  sizes: Sizes;
  cursor: Cursor;
  scroll: Scroll;
  debug: Debug;
  debugFolder: GUI | undefined;
  objectsDistance: number = 4;
  geometry: SphereGeometry;
  meshes: Group;
  sectionMeshes: Mesh[] = [];

  constructor() {
    this.core = createCore();
    this.scene = this.core.scene;
    this.resources = this.core.resources;
    this.time = this.core.time;
    this.camera = this.core.camera;
    this.sizes = this.core.sizes;
    this.cursor = this.core.cursor;
    this.scroll = this.core.scroll;
    this.debug = this.core.debug;

    // Debug
    // if (this.debug.active) {
    // }

    this.geometry = this.setGeometries();
    this.meshes = this.setMeshes();
  }

  setGeometries() {
    const geometry = new SphereGeometry(0.5, 16, 16);

    this.geometry = geometry;
    return geometry;
  }

  setMeshes() {
    const meshes = new Group();
    const mesh1 = new Mesh(this.geometry, new MeshBasicMaterial({ color: '#ff0000' }));
    const mesh2 = new Mesh(this.geometry, new MeshBasicMaterial({ color: '#ff0000' }));
    const mesh3 = new Mesh(this.geometry, new MeshBasicMaterial({ color: '#ff0000' }));

    mesh1.position.x = -2;
    mesh3.position.x = 2;

    meshes.add(mesh1, mesh2, mesh3);
    this.meshes = meshes;
    this.sectionMeshes = [mesh1, mesh2, mesh3];
    this.scene.add(meshes);
    return meshes;
  }

  update() {
    // Animate meshes
    for (let i = 0; i < this.sectionMeshes.length; i++) {
      this.sectionMeshes[i].position.y = Math.sin(this.time.elapsed * 0.3 * (i + 1)) * 1.5;
    }
  }

  destroy() {
    disposeMeshes(this.meshes);
    this.scene.remove(this.meshes);
  }
}
