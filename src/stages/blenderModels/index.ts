import Stage from '..'
import Environment from './Environment'
import Floor from './Floor'
import Model from './Model'
import sources from './sources'

export default class BlenderModelsStage extends Stage {
  environment: Environment | null = null
  floor: Floor | null = null
  model: Model | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(6, 3, 6)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.floor = new Floor()
      this.environment = new Environment()
      this.model = new Model()
    })

    this.on('update', () => {
      this.model?.update()
    })

    this.on('destroy', () => {
      this.floor?.destroy()
      this.model?.destroy()
      this.environment?.destroy()
    })

    this.resources.load(sources)
  }
}
