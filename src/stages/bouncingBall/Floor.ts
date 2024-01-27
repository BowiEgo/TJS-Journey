import { BufferAttribute, Mesh, MeshStandardMaterial, PlaneGeometry, Scene, Texture } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'

type Textures = {
  color: Texture
  normal: Texture
}

export default class Floor {
  core: Core | null
  scene: Scene
  resources: Resources
  geometry: PlaneGeometry
  textures: Textures
  material: MeshStandardMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources

    this.geometry = this.setGeometry()
    this.textures = this.setTexture()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry(): PlaneGeometry {
    const geometry = new PlaneGeometry(5, 5, 100, 100)
    geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))

    this.geometry = geometry
    return geometry
  }

  setTexture(): Textures {
    const textures = {} as Textures

    this.textures = textures
    return textures
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial()

    this.material = material
    return material
  }

  setMesh(): Mesh {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = -0.5
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
