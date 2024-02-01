import Stage from '..'
import Renderer from '../../core/Renderer'
import Camera from '../../core/Camera'
import Environment from './Environment'
import Model from './Model'
import sources from './sources'
import Plane from './Plane'

export default class ModifiedMaterialsStage extends Stage {
  renderer: Renderer | undefined
  camera: Camera | undefined
  environment: Environment | null = null
  model: Model | null = null
  plane: Plane | null = null

  constructor() {
    super()

    this.on('setup', () => {
      this.renderer = this.core?.renderer
      this.camera = this.core?.camera
      // Camera
      this.core?.camera.instance.position.set(20, 10, 20)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.environment = new Environment()
      this.model = new Model()
      this.plane = new Plane()
    })

    this.on('update', () => {
      this.model?.update()
    })

    this.on('destroy', () => {
      this.plane?.destroy()
      this.model?.destroy()
      this.environment?.destroy()
    })

    this.resources.load(sources)
  }
}
