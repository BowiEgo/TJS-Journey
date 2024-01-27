import { BufferAttribute, Mesh, MeshStandardMaterial, SphereGeometry, Scene, Texture } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'

type Textures = {
  color: Texture
  normal: Texture
}

export default class Ball {
  core: Core | null
  scene: Scene
  resources: Resources
  time: Time
  geometry: SphereGeometry
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

  setGeometry(): SphereGeometry {
    const geometry = new SphereGeometry(0.5, 64, 64)
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
    this.mesh.position.x = Math.cos(this.time.elapsed) * 1.5
    this.mesh.position.z = Math.sin(this.time.elapsed) * 1.5
    this.mesh.position.y = Math.abs(Math.sin(this.time.elapsed * 3))
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
