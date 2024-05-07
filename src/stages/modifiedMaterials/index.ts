import Stage from '../Stage';
import Environment from './Environment';
import Model from './Model';
import sources from './sources';
import Plane from './Plane';

export default class ModifiedMaterialsStage extends Stage {
  environment: Environment | null = null;
  model: Model | null = null;
  plane: Plane | null = null;

  constructor() {
    super();

    this.on('setup', () => {
      // Camera
      this.camera.instance.position.set(20, 10, 20);
      this.camera.instance.rotation.set(0, 0, 0);
      // Setup
      this.environment = new Environment();
      this.model = new Model();
      this.plane = new Plane();
    });

    this.on('update', () => {
      this.model?.update();
    });

    this.on('destroy', () => {
      this.plane?.destroy();
      this.model?.destroy();
      this.environment?.destroy();
    });

    this.resources.load(sources);
  }
}
