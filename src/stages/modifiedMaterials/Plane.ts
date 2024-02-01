import { Mesh, MeshStandardMaterial, PlaneGeometry, Scene } from 'three'
import { Core, createCore } from '../../core'
import { disposeMeshes } from '../../core/Utils'
import GUI from 'lil-gui'
import RealisticRenderStage from '.'

export default class Plane {
  core: Core
  stage: RealisticRenderStage
  scene: Scene
  debugFolder: GUI | undefined
  geometry: any
  material: MeshStandardMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.stage = this.core.stage as RealisticRenderStage
    this.scene = this.core.scene

    // Setup
    this.geometry = this.setGeometry()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry() {
    let geometry = new PlaneGeometry(15, 15, 15)

    this.geometry = geometry
    return geometry
  }

  setMaterial() {
    const material = new MeshStandardMaterial()
    this.material = material

    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.y = Math.PI
    mesh.position.y = -5
    mesh.position.z = 5
    mesh.receiveShadow = true

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
