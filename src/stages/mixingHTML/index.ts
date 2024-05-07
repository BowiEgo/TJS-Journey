import Stage from '../Stage';
import Environment from './Environment';
import Model from './Model';
import sources from './sources';
import Points from './Point';

export default class MixingHTMLStage extends Stage {
  environment: Environment | null = null;
  model: Model | null = null;
  points: Points | null = null;

  constructor() {
    super();

    this.on('setup', () => {
      // Camera
      this.camera.instance.position.set(10, 5, 10);
      this.camera.instance.rotation.set(0, 0, 0);
      // Setup
      this.environment = new Environment();
      this.model = new Model();
      this.points = new Points();
    });

    this.on('update', () => {
      this.model?.update();
      this.points?.update();
    });

    this.on('destroy', () => {
      this.model?.destroy();
      this.points?.destroy();
      this.environment?.destroy();
    });

    this.resources.load(sources);
  }
}
