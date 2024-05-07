import * as THREE from 'three';
import Sizes from './Sizes';
import Camera from './Camera';
import EventEmitter from './EventEmitter';
import { Core, createCore } from '.';

export const DEFAULT_RENDERER_CLEAR_COLOR = '#2e2e2e';

export default class Renderer extends EventEmitter {
    core: Core | null;
    canvas: HTMLCanvasElement;
    sizes: Sizes;
    scene: THREE.Scene;
    camera: Camera;
    instance: THREE.WebGLRenderer;

    constructor() {
        super();
        this.core = createCore();
        this.canvas = this.core.canvas;
        this.sizes = this.core.sizes;
        this.scene = this.core.scene;
        this.camera = this.core.camera;

        this.instance = this.setInstance();
    }

    private setInstance(): THREE.WebGLRenderer {
        const instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        // this is default in three.js
        // this.instance.outputColorSpace = SRGBColorSpace
        instance.toneMapping = THREE.ReinhardToneMapping;
        instance.toneMappingExposure = 1.75;
        instance.shadowMap.enabled = true;
        instance.shadowMap.type = THREE.PCFSoftShadowMap;
        instance.setClearColor(DEFAULT_RENDERER_CLEAR_COLOR);
        this.instance = instance;
        this.resize();
        return instance;
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }

    update() {
        this.trigger('beforeUpdate');
        this.instance.render(this.scene, this.camera.instance);
        this.trigger('afterUpdate');
    }

    destroy() {
        this.off('beforeUpdate');
        this.off('afterUpdate');
        this.instance.dispose();
    }
}
