import { CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, Scene, Texture } from 'three'
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
  geometry: CircleGeometry
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

  setGeometry(): CircleGeometry {
    const geometry = new CircleGeometry(5, 64)
    this.geometry = geometry
    return geometry
  }

  setTexture(): Textures {
    const textures = {} as Textures

    textures.color = this.resources.items.grassColorTexture as Texture
    textures.color.repeat.set(1.5, 1.5)
    textures.color.wrapS = RepeatWrapping
    textures.color.wrapT = RepeatWrapping

    textures.normal = this.resources.items.grassNormalTexture as Texture
    textures.normal.repeat.set(1.5, 1.5)
    textures.normal.wrapS = RepeatWrapping
    textures.normal.wrapT = RepeatWrapping

    this.textures = textures
    return textures
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    })

    this.material = material
    return material
  }

  setMesh(): Mesh {
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
