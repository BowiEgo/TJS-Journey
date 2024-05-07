import Stage from '../Stage';
import Environment from './Environment';
import Model from './Model';
import sources from './sources';
import EffectPass from './EffectPass';

export default class PostProcessingStage extends Stage {
  environment: Environment | null = null;
  model: Model | null = null;
  effectPass: EffectPass | null = null;

  constructor() {
    super();

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(20, 10, 20);
      this.core?.camera.instance.rotation.set(0, 0, 0);
      // Setup
      this.environment = new Environment();
      this.model = new Model();
      this.effectPass = new EffectPass();
    });

    this.on('update', () => {
      this.effectPass?.update();
      this.model?.update();
    });

    this.on('destroy', () => {
      this.model?.destroy();
      this.effectPass?.destroy();
      this.environment?.destroy();
    });

    this.resources.load(sources);
  }
}
