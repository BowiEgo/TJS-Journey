import { PointLight, Scene } from 'three'
import { Core, createCore } from '../../core'
import Time from '../../core/Time'

export default class Ghosts {
  core: Core
  scene: Scene
  time: Time
  ghost1: PointLight
  ghost2: PointLight
  ghost3: PointLight

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.time = this.core.time

    this.ghost1 = new PointLight('#ff00ff', 2, 3)
    this.ghost2 = new PointLight('#00ffff', 2, 3)
    this.ghost3 = new PointLight('#ffff00', 2, 3)

    this.scene.add(this.ghost1, this.ghost2, this.ghost3)
  }

  update() {
    // Ghosts
    const ghost1Angle = this.time.elapsed * 0.5
    this.ghost1.position.x = Math.cos(ghost1Angle) * 4
    this.ghost1.position.z = Math.sin(ghost1Angle) * 4
    this.ghost1.position.y = Math.sin(this.time.elapsed) * 3

    const ghost2Angle = -this.time.elapsed * 0.32
    this.ghost2.position.x = Math.cos(ghost2Angle) * 5
    this.ghost2.position.z = Math.sin(ghost2Angle) * 5
    this.ghost2.position.y = Math.sin(this.time.elapsed * 4) + Math.sin(this.time.elapsed * 2.5)

    const ghost3Angle = this.time.elapsed * 0.18
    this.ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(this.time.elapsed * 0.32))
    this.ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(this.time.elapsed * 0.5))
    this.ghost3.position.y = Math.sin(this.time.elapsed * 5) + Math.sin(this.time.elapsed * 2)
  }

  destroy() {
    this.ghost1.dispose()
    this.ghost2.dispose()
    this.ghost3.dispose()
    this.scene.remove(this.ghost1, this.ghost2, this.ghost3)
  }
}
