import Stage from '../Stage';
import Environment from './Environment';
import Model from './Model';
import sources from './sources';
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from 'three';

export default class RealisticRenderStage extends Stage {
  environment: Environment | null = null;
  model: Model | null = null;

  constructor() {
    super();

    this.on('setup', () => {
      // Camera
      this.camera?.instance.position.set(4, 0, 4);
      this.camera?.instance.rotation.set(0, 0, 0);

      // Debug
      this.debugFolder = this.debug?.ui?.addFolder('Renderer');

      if (this.renderer) {
        this.debugFolder?.add(this.renderer.instance, 'toneMapping', {
          No: NoToneMapping,
          Linear: LinearToneMapping,
          Reinhard: ReinhardToneMapping,
          Cineon: CineonToneMapping,
          ACESFilmic: ACESFilmicToneMapping,
        });

        this.debugFolder
          ?.add(this.renderer.instance, 'toneMappingExposure')
          .min(0)
          .max(10)
          .step(0.001);
      }

      // Setup
      this.environment = new Environment();
      this.model = new Model();
    });

    this.on('update', () => {
      this.model?.update();
    });

    this.on('destroy', () => {
      if (this.renderer) {
        this.renderer.instance.toneMapping = ReinhardToneMapping;
        this.renderer.instance.toneMappingExposure = 1.75;
      }
      this.model?.destroy();
      this.environment?.destroy();
    });

    this.resources.load(sources);
  }
}
