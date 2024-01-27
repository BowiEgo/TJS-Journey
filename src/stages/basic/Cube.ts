import { BufferAttribute, Mesh, MeshStandardMaterial, Scene, Texture, BoxGeometry } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'

type Textures = {
  color: Texture
  normal: Texture
}

export default class Cube {
  core: Core | null
  scene: Scene
  resources: Resources
  time: Time
  geometry: BoxGeometry
  textures: Textures
  material: MeshStandardMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time

    this.geometry = this.setGeometry()
    this.textures = this.setTexture()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry(): BoxGeometry {
    const geometry = new BoxGeometry(0.75, 0.75, 0.75)
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
    mesh.castShadow = true

    this.mesh = mesh
    this.scene.add(mesh)
    return mesh
  }

  update() {
    this.mesh.rotation.y = 0.1 * this.time.elapsed
    this.mesh.rotation.x = 0.15 * this.time.elapsed
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
