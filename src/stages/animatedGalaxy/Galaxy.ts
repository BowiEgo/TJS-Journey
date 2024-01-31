import {
  Scene,
  AdditiveBlending,
  Texture,
  Points,
  Color,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'
import Time from '../../core/Time'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import galaxyVertex from '../../shaders/galaxy/vertex.glsl'
import galaxyFragment from '../../shaders/galaxy/fragment.glsl'
import Renderer from '../../core/Renderer'

const PAREMETERS = {
  count: 100000,
  size: 30,
  radius: 5,
  branches: 3,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#f5c6b7',
  outsideColor: '#1b3984',
}

export default class Galaxy {
  core: Core | null
  renderer: Renderer
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  geometry: BufferGeometry
  material: ShaderMaterial
  texture: Texture
  points: Points

  constructor() {
    this.core = createCore()
    this.renderer = this.core.renderer
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
        .onFinishChange(this.reset.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'size')
        .min(1)
        .max(100)
        .step(1)
        .onFinishChange(this.reset.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'radius')
        .min(0.01)
        .max(20)
        .step(0.01)
        .onFinishChange(this.reset.bind(this))
      this.debugFolder
        ?.add(PAREMETERS, 'branches')
        .min(2)
        .max(20)
        .step(1)
        .onFinishChange(this.reset.bind(this))

      this.debugFolder
        ?.add(PAREMETERS, 'randomness')
        .min(0)
        .max(2)
        .step(0.001)
        .onFinishChange(this.reset.bind(this))

      this.debugFolder
        ?.add(PAREMETERS, 'randomnessPower')
        .min(1)
        .max(10)
        .step(0.001)
        .onFinishChange(this.reset.bind(this))

      this.debugFolder?.addColor(PAREMETERS, 'insideColor').onFinishChange(this.reset.bind(this))

      this.debugFolder?.addColor(PAREMETERS, 'outsideColor').onFinishChange(this.reset.bind(this))
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
    const scales = new Float32Array(PAREMETERS.count * 1)
    const randomness = new Float32Array(PAREMETERS.count * 3)

    const colorInside = new Color(PAREMETERS.insideColor)
    const colorOutside = new Color(PAREMETERS.outsideColor)

    for (let i = 0; i < PAREMETERS.count; i++) {
      const i3 = i * 3

      // Position
      const radius = Math.random() * PAREMETERS.radius
      const branchAngle = ((i % PAREMETERS.branches) / PAREMETERS.branches) * Math.PI * 2

      // Randomness
      const randomX =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      const randomY =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      const randomZ =
        Math.pow(Math.random(), PAREMETERS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

      randomness[i3 + 0] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      positions[i3 + 0] = Math.cos(branchAngle) * radius
      positions[i3 + 1] = 0
      positions[i3 + 2] = Math.sin(branchAngle) * radius

      // Color
      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / PAREMETERS.radius)

      colors[i3 + 0] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      // Scale
      scales[i] = Math.random()
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
    geometry.setAttribute('aRandomness', new BufferAttribute(randomness, 3))

    this.geometry = geometry
    return geometry
  }

  setTextures() {
    const texture = this.resources.items.particleTexture as Texture
    this.texture = texture
    return texture
  }

  setMaterial() {
    const material = new ShaderMaterial({
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
      vertexShader: galaxyVertex,
      fragmentShader: galaxyFragment,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: PAREMETERS.size * this.renderer.instance.getPixelRatio() },
      },
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

  reset() {
    this.destroy()
    this.setGeometry()
    this.setMaterial()
    this.setPoints()
  }

  update() {
    // Update material
    this.material.uniforms.uTime.value = this.time.elapsed
  }

  destroy() {
    disposeMeshes(this.points)
    this.scene.remove(this.points)
  }
}
