import Environment from './Environment'
import Floor from './Floor'
import Stage from '..'
import Ball from './Ball'

export default class BouncingBallStage extends Stage {
  environment: Environment | null = null
  floor: Floor | null = null
  ball: Ball | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(6, 6, 6)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.floor = new Floor()
      this.environment = new Environment()
      this.ball = new Ball()
    })

    this.on('update', () => {
      this.ball?.update()
    })

    this.on('destroy', () => {
      this.floor?.destroy()
      this.ball?.destroy()
      this.environment?.destroy()
    })

    this.resources.trigger('ready')
  }
}
