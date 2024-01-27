import {
  Scene,
  PointsMaterial,
  AdditiveBlending,
  Texture,
  Points,
  Color,
  BufferGeometry,
  BufferAttribute,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'
import Time from '../../core/Time'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'

const PAREMETERS = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

export default class Galaxy {
  core: Core | null
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  geometry: BufferGeometry
  material: PointsMaterial
  texture: Texture
  points: Points

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time
    this.debug = this.core.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Paremeters')
      this.debugFolder
        ?.add(PAREMETERS, 'count')
        .min(100)
        .max(1000000)
        .step(100)
        .onFinishChange(this.update.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'size')
        .min(0.01)
        .max(0.1)
        .step(0.01)
        .onFinishChange(this.update.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'radius')
        .min(0.01)
        .max(20)
        .step(0.01)
        .onFinishChange(this.update.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'branches')
        .min(2)
        .max(20)
        .step(1)
        .onFinishChange(this.update.bind(this))

      this.debugFolder
        ?.add(PAREMETERS, 'spin')
        .min(-5)
        .max(5)
        .step(0.001)
        .onFinishChange(this.update.bind(this))

      this.debugFolder
        ?.add(PAREMETERS, 'randomness')
        .min(0)
        .max(2)
        .step(0.001)
        .onFinishChange(this.update.bind(this))

      this.debugFolder
        ?.add(PAREMETERS, 'randomnessPower')
        .min(1)
        .max(10)
        .step(0.001)
        .onFinishChange(this.update.bind(this))

      this.debugFolder?.addColor(PAREMETERS, 'insideColor').onFinishChange(this.update.bind(this))

      this.debugFolder?.addColor(PAREMETERS, 'outsideColor').onFinishChange(this.update.bind(this))
    }

    this.geometry = this.setGeometry()
    this.texture = this.setTextures()
    this.material = this.setMaterial()

    this.points = this.setPoints()
  }

  setGeometry() {
    const geometry = new BufferGeometry()

    const positions = new Float32Array(PAREMETERS.count * 3)
    const colors = new Float32Array(PAREMETERS.count * 3)

    const colorInside = new Color(PAREMETERS.insideColor)
    const colorOutside = new Color(PAREMETERS.outsideColor)

    for (let i = 0; i < PAREMETERS.count; i++) {
      const i3 = i * 3

      // Position
      const radius = Math.random() * PAREMETERS.radius
      const spinAngle = radius * PAREMETERS.spin
      const branchAngle = ((i % PAREMETERS.branches) / PAREMETERS.branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      const randomY =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      const randomZ =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

      positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY * Math.cos((radius / PAREMETERS.radius) * (Math.PI / 2))
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Color
      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / PAREMETERS.radius)

      colors[i3 + 0] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))

    this.geometry = geometry
    return geometry
  }

  setTextures() {
    const texture = this.resources.items.particleTexture as Texture
    this.texture = texture
    return texture
  }

  setMaterial() {
    const material = new PointsMaterial({
      size: PAREMETERS.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    })

    this.material = material
    return material
  }

  setPoints() {
    const points = new Points(this.geometry, this.material)

    this.points = points
    this.scene.add(points)
    return points
  }

  update() {
    this.destroy()
    this.setGeometry()
    this.setMaterial()
    this.setPoints()
  }

  destroy() {
    disposeMeshes(this.points)
    this.scene.remove(this.points)
  }
}
