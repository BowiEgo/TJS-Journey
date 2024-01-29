import Stage from '..'
import Plane from './Plane'
import sources from './sources'

export default class ShaderPatternsStage extends Stage {
  plane: Plane | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(1, 0, 2)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.plane = new Plane()
    })

    this.on('update', () => {
      this.plane?.update()
    })

    this.on('destroy', () => {
      this.plane?.destroy()
    })

    this.resources.load(sources)
  }
}
