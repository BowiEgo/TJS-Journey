import { Mesh, MeshStandardMaterial, Scene, BoxGeometry } from 'three';
import { Core, createCore } from '../../core';
import Resources from '../../core/Resources';
import Time from '../../core/Time';
import { disposeMeshes } from '../../core/Utils';
import { Textures } from '../type';

export default class Cube {
    core: Core | null;
    scene: Scene;
    resources: Resources;
    time: Time;
    geometry: BoxGeometry;
    textures: Textures;
    material: MeshStandardMaterial;
    mesh: Mesh;

    constructor() {
        this.core = createCore();
        this.scene = this.core.scene;
        this.resources = this.core.resources;
        this.time = this.core.time;

        this.geometry = this.setGeometry();
        this.textures = this.setTexture();
        this.material = this.setMaterial();
        this.mesh = this.setMesh();
    }

    setGeometry() {
        const geometry = new BoxGeometry(2, 2, 2);

        this.geometry = geometry;
        return geometry;
    }

    setTexture() {
        const textures = {} as Textures;

        this.textures = textures;
        return textures;
    }

    setMaterial() {
        const material = new MeshStandardMaterial();

        this.material = material;
        return material;
    }

    setMesh() {
        const mesh = new Mesh(this.geometry, this.material);
        mesh.position.x = -4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.mesh = mesh;
        this.scene.add(mesh);
        return mesh;
    }

    update() {}

    destroy() {
        disposeMeshes(this.mesh);
        this.scene.remove(this.mesh);
    }
}
