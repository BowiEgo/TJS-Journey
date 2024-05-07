import Stage from '../Stage';
import Fireworks from './Fireworks';
import Sky from './SkyBox';
import sources from './sources';

export default class FireWorksShaderStage extends Stage {
  constructor() {
    super();

    this.resources.sources = sources;

    this.on('setup', () => {
      // Camera
      this.camera.instance.position.set(0, 0, 6);
      this.camera.instance.rotation.set(0, 0, 0);

      // Setup
      const sky = new Sky();
      const fireworks = new Fireworks();

      this.cursor.on('click', () => {
        fireworks.createRandom();
      });

      this.addObject(sky);

      // Debug
    });

    this.on('update', () => {});

    this.on('destroy', () => {
      this.cursor.off('click');
    });

    this.init();
  }
}
