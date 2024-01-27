import { Mesh, MeshStandardMaterial, Scene, BoxGeometry, Group } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'

export default class Graves {
  core: Core | null
  scene: Scene
  resources: Resources
  geometry: BoxGeometry
  material: MeshStandardMaterial
  meshes: Group

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources

    this.geometry = this.setGeometry()
    this.material = this.setMaterial()
    this.meshes = this.setMesh()
  }

  setGeometry(): BoxGeometry {
    const geometry = new BoxGeometry(0.6, 0.8, 0.2)

    this.geometry = geometry
    return geometry
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({ color: '#b2b6b1' })

    this.material = material
    return material
  }

  setMesh(): Group {
    const meshes = new Group()
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 6
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      const mesh = new Mesh(this.geometry, this.material)
      mesh.position.set(x, 0.3, z)
      mesh.rotation.y = (Math.random() - 0.5) * 0.4
      mesh.rotation.z = (Math.random() - 0.5) * 0.4

      mesh.castShadow = true

      meshes.add(mesh)
    }

    this.meshes = meshes
    this.scene.add(meshes)
    return meshes
  }

  destroy() {
    disposeMeshes(this.meshes)
    this.scene.remove(this.meshes)
  }
}
