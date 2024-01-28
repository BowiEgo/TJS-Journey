import Stage from '..'
import Environment from './Environment'
import Plane from './Plane'
import sources from './sources'

export default class ShaderStage extends Stage {
  environment: Environment | null = null
  plane: Plane | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(1, 0, 2)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      // this.environment = new Environment()
      this.plane = new Plane()
    })

    this.on('update', () => {
      this.plane?.update()
    })

    this.on('destroy', () => {
      this.plane?.destroy()
      this.environment?.destroy()
    })

    this.resources.load(sources)
  }
}
