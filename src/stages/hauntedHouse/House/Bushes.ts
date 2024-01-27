import { Mesh, MeshStandardMaterial, Scene, SphereGeometry } from 'three'
import { Core, createCore } from '../../../core'
import Resources from '../../../core/Resources'
import { disposeMeshes } from '../../../core/Utils'

export default class Bushes {
  core: Core | null
  scene: Scene
  resources: Resources
  geometry: SphereGeometry
  material: MeshStandardMaterial
  meshes: Mesh[]

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources

    this.geometry = this.setGeometry()
    this.material = this.setMaterial()
    this.meshes = this.setMeshes()
  }

  setGeometry(): SphereGeometry {
    const geometry = new SphereGeometry(1, 16, 16)

    this.geometry = geometry
    return geometry
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({ color: '#89c854' })

    this.material = material
    return material
  }

  setMeshes(): Mesh[] {
    const mesh1 = new Mesh(this.geometry, this.material)
    mesh1.scale.set(0.5, 0.5, 0.5)
    mesh1.position.set(0.8, 0.2, 2.2)
    mesh1.castShadow = true

    const mesh2 = new Mesh(this.geometry, this.material)
    mesh2.scale.set(0.25, 0.25, 0.25)
    mesh2.position.set(1.4, 0.1, 2.1)
    mesh2.castShadow = true

    const mesh3 = new Mesh(this.geometry, this.material)
    mesh3.scale.set(0.4, 0.4, 0.4)
    mesh3.position.set(-0.8, 0.1, 2.2)
    mesh3.castShadow = true

    const mesh4 = new Mesh(this.geometry, this.material)
    mesh4.scale.set(0.15, 0.15, 0.15)
    mesh4.position.set(-1, 0.05, 2.6)
    mesh4.castShadow = true

    const meshes = [mesh1, mesh2, mesh3, mesh4]

    this.meshes = meshes

    this.scene.add(mesh1)
    this.scene.add(mesh2)
    this.scene.add(mesh3)
    this.scene.add(mesh4)
    return meshes
  }

  destroy() {
    for (const mesh of this.meshes) {
      disposeMeshes(mesh)
      this.scene.remove(mesh)
    }
  }
}
