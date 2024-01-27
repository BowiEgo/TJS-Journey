import { Group, Scene } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { disposeMeshes } from '../../core/Utils'

export default class Model {
  core: Core
  scene: Scene
  resources: Resources
  resource: GLTF
  model: Scene | Group

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources

    // Setup
    this.resource = this.resources.items.hamburgerModel as GLTF

    this.model = this.setModel()
  }

  setModel() {
    const model = this.resource.scene
    model.scale.set(0.1, 0.1, 0.1)
    this.model = model

    this.scene.add(model)
    return model
  }

  update() {}

  destroy() {
    disposeMeshes(this.model)
    this.scene.remove(this.model)
  }
}
