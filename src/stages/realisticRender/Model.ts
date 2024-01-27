import { Group, Scene } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { disposeMeshes } from '../../core/Utils'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import RealisticRenderStage from '.'

export default class Model {
  core: Core
  stage: RealisticRenderStage
  scene: Scene
  debug: Debug
  debugFolder: GUI | undefined
  resources: Resources
  resource: GLTF
  model: Scene | Group

  constructor() {
    this.core = createCore()
    this.stage = this.core.stage as RealisticRenderStage
    this.scene = this.core.scene
    this.debug = this.core.debug
    this.resources = this.core.resources

    // Setup
    const gltfHamburger = this.resources.items.hamburgerModel as GLTF
    const gltfCoffeCart = this.resources.items.coffeeCartModel as GLTF
    gltfHamburger.scene.scale.set(0.1, 0.1, 0.1)
    this.resource = gltfCoffeCart as GLTF
    this.model = this.setModel()

    // Debug
    this.debugFolder = this.debug.ui?.addFolder('Model')
    const debugObject = {
      model: gltfCoffeCart,
    }
    this.debugFolder
      ?.add(debugObject, 'model', {
        hamburger: gltfHamburger,
        coffeCart: gltfCoffeCart,
      })
      .onChange((val: any) => {
        this.destroy()
        this.resource = val
        this.setModel()
        this.stage.environment?.environmentMap.updateMaterial()
        this.scene.add(this.model)
      })
  }

  setModel() {
    const model = this.resource.scene
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
