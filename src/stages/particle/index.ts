import Stage from '..'
import Particles from './Particles'
import sources from './sources'

export default class ParticleStage extends Stage {
  particles: Particles | null = null

  constructor() {
    super()

    this.on('setup', () => {
      // Camera
      this.core?.camera.instance.position.set(0, 0, 9)
      this.core?.camera.instance.rotation.set(0, 0, 0)
      // Setup
      this.particles = new Particles()
    })

    this.on('update', () => {
      this.particles?.update()
    })

    this.on('destroy', () => {
      this.particles?.destroy()
      // this.environment?.destroy()
    })

    this.resources.load(sources)
  }
}
