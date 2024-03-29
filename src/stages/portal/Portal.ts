import {
    Color,
    ColorRepresentation,
    Group,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    SRGBColorSpace,
    Scene,
    ShaderMaterial,
    Texture,
} from 'three';
import { Core, createCore } from '../../core';
import Resources from '../../core/Resources';
import Time from '../../core/Time';
import { disposeMeshes } from '../../core/Utils';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { Textures } from '../type';
import portalVertexShader from '../../shaders/portal/vertex.glsl';
import portalFragmentShader from '../../shaders/portal/fragment.glsl';
import Debug from '../../core/Debug';
import GUI from 'lil-gui';

type DebugObject = {
    portalColorStart: string;
    portalColorEnd: string;
};

export default class Portal {
    core: Core | null;
    scene: Scene;
    resources: Resources;
    time: Time;
    debug: Debug;
    debugFolder: GUI | undefined;
    debugObject: DebugObject = {
        portalColorStart: '#ebecff',
        portalColorEnd: '#ffffff',
    };
    textures: Textures;
    material: ShaderMaterial;
    mesh: Mesh | Group;

    constructor() {
        this.core = createCore();
        this.scene = this.core.scene;
        this.resources = this.core.resources;
        this.time = this.core.time;
        this.debug = this.core.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('Portal');
        }

        this.textures = this.setTextures();
        this.material = this.setMaterial();
        this.mesh = this.setMesh();
    }

    setTextures() {
        const bakedTexture = this.resources.items.portalBakedTexture as Texture;
        bakedTexture.flipY = false;
        bakedTexture.colorSpace = SRGBColorSpace;

        const textures = {
            color: bakedTexture,
        };

        return textures;
    }

    setMaterial() {
        const material = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColorStart: { value: new Color(this.debugObject.portalColorStart) },
                uColorEnd: { value: new Color(this.debugObject.portalColorEnd) },
            },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
        });

        this.debugFolder
            ?.addColor(this.debugObject, 'portalColorStart')
            .onChange((val: ColorRepresentation) => {
                material.uniforms.uColorStart.value.set(val);
            });

        this.debugFolder
            ?.addColor(this.debugObject, 'portalColorEnd')
            .onChange((val: ColorRepresentation) => {
                material.uniforms.uColorEnd.value.set(val);
            });

        return material;
    }

    setMesh() {
        const gltfModel = this.resources.items.portalScene as GLTF;

        const bakedMaterial = new MeshBasicMaterial({ map: this.textures.color });
        const poleLightMaterial = new MeshBasicMaterial({ color: '#fff4e4' });
        const portalLightMaterial = this.material;

        gltfModel.scene.traverse((child: Object3D) => {
            if (child.name === 'baked') {
                (child as Mesh).material = bakedMaterial;
            }

            if (child.name.match('poleLight*')) {
                (child as Mesh).material = poleLightMaterial;
            }

            if (child.name === 'portalLight') {
                (child as Mesh).material = portalLightMaterial;
            }
        });

        const mesh = gltfModel.scene;
        mesh.castShadow = true;

        this.mesh = mesh;
        this.scene.add(mesh);
        return mesh;
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed;
    }

    destroy() {
        disposeMeshes(this.mesh);
        this.scene.remove(this.mesh);
    }
}
