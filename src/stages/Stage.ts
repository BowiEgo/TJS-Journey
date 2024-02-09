import { Scene } from 'three';
import { Core, createCore } from '../core';
import EventEmitter from '../core/EventEmitter';
import Resources from '../core/Resources';

export default class Stage extends EventEmitter {
    core: Core | null;
    scene: Scene;
    resources: Resources;

    constructor() {
        super();
        this.core = createCore();
        this.scene = this.core.scene;
        this.resources = this.core.resources;

        // Wait for resources
        this.resources.on('ready', () => {
            this.trigger('setup');
        });
    }

    update() {
        this.trigger('update');
    }

    destroy() {
        this.resources.off('ready');
        this.trigger('destroy');
    }
}
