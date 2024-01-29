import { BufferAttribute, DoubleSide, Mesh, PlaneGeometry, Scene, ShaderMaterial } from 'three'
import { Core, createCore } from '../../core'
import testVertexShader from '../../shaders/testPatterns/vertex.glsl'
import testFragmentShader from '../../shaders/testPatterns/fragment.glsl'
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
  // texture: Texture
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
    // this.texture = this.setTexture()
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

  setTexture() {}

  setMaterial() {
    const material = new ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      side: DoubleSide,
    })
    this.material = material

    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    this.mesh = mesh

    this.scene.add(mesh)
    return mesh
  }

  update() {}

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
