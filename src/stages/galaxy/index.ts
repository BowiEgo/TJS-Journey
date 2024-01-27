import Stage from '..'
import Galaxy from './Galaxy'

export default class GalaxyStage extends Stage {
  galaxy: Galaxy | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(6, 3, 6)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.galaxy = new Galaxy()
    })

    this.on('update', () => {})

    this.on('destroy', () => {
      this.galaxy?.destroy()
      // this.environment?.destroy()
    })

    this.resources.trigger('ready')
  }
}
