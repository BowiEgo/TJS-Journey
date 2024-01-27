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

const COUNT = 2000

export default class Particles {
  core: Core | null
  scene: Scene
  resources: Resources
  time: Time
  geometry: BufferGeometry
  material: PointsMaterial
  texture: Texture
  points: Points

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time

    this.geometry = this.setGeometry()
    this.texture = this.setTextures()
    this.material = this.setMaterial()

    this.points = this.setPoints()
  }

  setGeometry() {
    const geometry = new BufferGeometry()

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
      colors[i] = Math.random()
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
    // Change the size property to control all particles size and the sizeAttenuation to specify if
    // distant particles should be smaller than close particles
    const material = new PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
    })
    material.color = new Color('#ff88cc')
    material.transparent = true
    // material.alphaMap = this.texture

    // The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency.
    // By default, the value is 0 meaning that the pixel will be rendered anyway

    // material.alphaTest = 0.001;

    // When drawing, the WebGL tests if what's being drawn is closer than what's already drawn.
    // That is called depth testing and can be deactivated with alphaTest.
    // Deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors.

    // material.depthTest = false;

    // The depth of what's being drawn is stored in what we call a depth buffer.
    // Instead of not testing if the particle is closer than what's in this depth buffer,
    // we can tell the WebGL not write particles in that depth buffer with depthTest.

    material.depthWrite = false

    // The WebGL currently draws pixels one on top of the other.
    // With the blending property, we can tell the WebGL to add the color of the pixel to the color of the pixel already drawn.

    material.blending = AdditiveBlending

    material.vertexColors = true

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
    // points.rotation.y = elapsedTime * 0.2;
    // points.position.y = -elapsedTime * 0.2;
    // You should avoid this technic because updating the whole attribute on each frame is bad for performances
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const x = this.points.geometry.attributes.position.array[i3]
      this.points.geometry.attributes.position.array[i3 + 1] = Math.sin(this.time.elapsed + x)
    }
    this.points.geometry.attributes.position.needsUpdate = true
  }

  destroy() {
    disposeMeshes(this.points)
    this.scene.remove(this.points)
  }
}
