import { Intersection, Mesh, MeshBasicMaterial, Raycaster, Vector2 } from 'three';
import Stage from '../Stage';
import Environment from './Environment';
import Targets from './Targets';
import Model from './Model';
import sources from './sources';

export default class RaycasterStage extends Stage {
  environment: Environment | null = null;
  targets: Targets | undefined;
  model: Model | null = null;
  raycaster: Raycaster | null = null;
  currentIntersect: Intersection | null = null;

  constructor() {
    super();

    this.on('setup', () => {
      // Camera
      this.camera?.instance.position.set(0, 0, 8);
      this.camera?.instance.rotation.set(0, 0, 0);
      // Setup
      this.environment = new Environment();
      this.targets = new Targets();
      this.model = new Model();
      this.raycaster = new Raycaster();
    });

    this.on('update', () => {
      if (this.targets) {
        this.handleIntersect();
        this.targets?.update();
      }
    });

    this.on('destroy', () => {
      this.environment?.destroy();
      this.targets?.destroy();
      this.model?.destroy();
    });

    this.resources.load(sources);
  }

  handleIntersect() {
    if (!this.camera || !this.raycaster) return;
    // Cast a ray
    this.raycaster.setFromCamera(this.cursor?.mouse as Vector2, this.camera.instance);

    if (this.targets) {
      const intersets = this.raycaster.intersectObjects(this.targets.sectionMeshes);

      for (const object of this.targets.sectionMeshes) {
        const material = object.material as MeshBasicMaterial;
        material.color.set('#ff0000');
      }

      for (const interset of intersets) {
        const intersectObject = interset.object as Mesh;
        const material = intersectObject.material as MeshBasicMaterial;
        material.color.set('#0000ff');
      }

      if (intersets.length) {
        if (this.currentIntersect === null) {
          console.log('mouse enter');
        }

        this.currentIntersect = intersets[0];
      } else {
        if (this.currentIntersect) {
          console.log('mouse leave');
        }

        this.currentIntersect = null;
      }
    }

    if (this.model) {
      const modelIntersects = this.raycaster.intersectObject(this.model.model);
      if (modelIntersects.length) {
        this.model.model.scale.set(0.01, 0.01, 0.01);
      } else {
        this.model.model.scale.set(0.005, 0.005, 0.005);
      }
    }
  }
}
