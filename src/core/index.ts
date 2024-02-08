import { Scene } from 'three';
import Sizes from './Sizes';
import Time from './Time';
import Camera from './Camera';
import Renderer from './Renderer';
import Resources from './Resources';
import Debug from './Debug';
import { disposeMeshes } from './Utils';
import Cursor from './Cursor';
import Scroll from './Scroll';
import Effect from './Effect';
import Intro from './Intro';
import Stage from '../stages/Stage';

export type Core = {
    canvas: HTMLCanvasElement;
    debug: Debug;
    sizes: Sizes;
    time: Time;
    scene: Scene;
    intro: Intro | null;
    camera: Camera;
    cursor: Cursor;
    scroll: Scroll;
    renderer: Renderer;
    stage: Stage | null;
    resources: Resources;
    effect: Effect;
    createStage: (stage: Stage) => void;
    destroyStage: () => void;
    destroyObjects: () => void;
    resize: () => void;
    update: () => void;
    destroy: () => void;
};

let instance: Core | null = null;

export function createCore(canvas?: HTMLCanvasElement | null): Core {
    if (instance) return instance;

    if (!canvas) throw new Error(`can't create core because there's no canvas element`);

    const core = {} as Core;
    instance = core;

    // Options
    core.canvas = canvas;

    // Setup
    core.debug = new Debug();
    core.sizes = new Sizes();
    core.time = new Time();
    core.scene = new Scene();
    core.camera = new Camera();
    core.cursor = new Cursor();
    core.scroll = new Scroll();
    core.renderer = new Renderer();
    core.effect = new Effect();
    core.resources = new Resources();
    // core.intro = new Intro()

    core.createStage = (stage: Stage) => {
        core.stage = stage;
    };
    core.destroyStage = () => {
        core.stage?.destroy();
        core.stage = null;
        if (core.debug.active) {
            core.debug.ui?.destroy();
            core.debug = new Debug();
        }
    };
    core.resize = () => {
        core.camera.resize();
        core.renderer.resize();
        core.effect.resize();
    };
    core.update = () => {
        core.camera.update();
        core.stage?.update();
        core.effect.update();
        core.effect.instance.passes.length === 0 && core.renderer.update();
    };
    core.destroy = () => {
        core.sizes.off('resize');
        core.time.off('tick');

        disposeMeshes(core.scene);

        core.intro?.destroy();
        core.cursor.destroy();
        core.scroll.destroy();
        core.camera.destroy();
        core.effect.destroy();
        core.renderer.destroy();

        if (core.debug.active) {
            core.debug.ui?.destroy();
        }
    };

    // Resize event
    core.sizes.on('resize', () => {
        core.resize();
    });

    // Time tick event
    core.time.on('tick', () => {
        core.update();
    });

    return core;
}
