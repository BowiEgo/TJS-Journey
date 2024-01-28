import {
  BufferAttribute,
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  Vector2,
} from 'three'
import { Core, createCore } from '../../core'
import testVertexShader from '../../shaders/test/vertex.glsl'
import testFragmentShader from '../../shaders/test/fragment.glsl'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import Resources from '../../core/Resources'

export default class Plane {
  core: Core
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  geometry: PlaneGeometry
  texture: Texture
  material: ShaderMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time
    this.debug = this.core.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Plane')
    }

    this.geometry = this.setGeometry()
    this.texture = this.setTexture()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry() {
    const geometry = new PlaneGeometry(1, 1, 32, 32)
    this.geometry = geometry

    const count = geometry.attributes.position.count
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random()
    }

    geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1))

    return geometry
  }

  setTexture() {
    const texture = this.resources.items.flagTexture as Texture
    this.texture = texture

    return texture
  }

  setMaterial() {
    // Common properties like wireframe, side, transparent, or flatShading still work.
    // Properties like map, alphaMap, opacity, color, etc. won't work and we need to write these features ourselves.
    const material = new ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      // wireframe: true,
      side: DoubleSide,
      transparent: true,
      uniforms: {
        uFrequency: { value: new Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new Color('orange') },
        uTexture: { value: this.texture },
      },
    })

    this.debugFolder
      ?.add(material.uniforms.uFrequency.value, 'x')
      .min(0)
      .max(20)
      .step(0.01)
      .name('frequencyX')

    this.debugFolder
      ?.add(material.uniforms.uFrequency.value, 'y')
      .min(0)
      .max(20)
      .step(0.01)
      .name('frequencyY')

    this.material = material

    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.scale.y = 2 / 3
    this.mesh = mesh

    this.scene.add(mesh)
    return mesh
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
