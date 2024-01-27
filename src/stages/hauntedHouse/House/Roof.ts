import { Mesh, MeshStandardMaterial, Scene, ConeGeometry } from 'three'
import { Core, createCore } from '../../../core'
import Resources from '../../../core/Resources'
import { disposeMeshes } from '../../../core/Utils'

export default class Roof {
  core: Core | null
  scene: Scene
  resources: Resources
  geometry: ConeGeometry
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

  setGeometry(): ConeGeometry {
    const geometry = new ConeGeometry(3.5, 1, 4)

    this.geometry = geometry
    return geometry
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({ color: '#b35f45' })

    this.material = material
    return material
  }

  setMesh(): Mesh {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.y = Math.PI * 0.25
    mesh.position.y = 2.5 + 0.5

    mesh.castShadow = true

    this.mesh = mesh
    this.scene.add(mesh)
    return mesh
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
