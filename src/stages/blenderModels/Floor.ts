import { Mesh, MeshStandardMaterial, PlaneGeometry, Scene } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'

export default class Floor {
  core: Core | null
  scene: Scene
  resources: Resources
  geometry: PlaneGeometry
  material: MeshStandardMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources

    this.geometry = this.setGeometry()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry() {
    const geometry = new PlaneGeometry(10, 10, 100, 100)
    this.geometry = geometry
    return geometry
  }

  setMaterial() {
    const material = new MeshStandardMaterial()
    material.roughness = 0.4

    this.material = material
    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true

    this.mesh = mesh
    this.scene.add(mesh)
    return mesh
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
