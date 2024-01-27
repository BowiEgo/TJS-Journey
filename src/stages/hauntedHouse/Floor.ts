import { Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Scene, Texture } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { disposeMeshes } from '../../core/Utils'

type Textures = {
  color: Texture
  ao: Texture
  displament: Texture
  roughness: Texture
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
    const geometry = new PlaneGeometry(20, 20)
    this.geometry = geometry
    return geometry
  }

  setTexture(): Textures {
    const textures = {} as Textures

    textures.color = this.resources.items.grassColorTexture as Texture
    textures.color.repeat.set(1.5, 1.5)
    textures.color.wrapS = RepeatWrapping
    textures.color.wrapT = RepeatWrapping

    textures.ao = this.resources.items.grassAmbientOcclusionTexture as Texture
    textures.displament = this.resources.items.grassHeightTexture as Texture

    textures.normal = this.resources.items.grassNormalTexture as Texture
    textures.normal.repeat.set(1.5, 1.5)
    textures.normal.wrapS = RepeatWrapping
    textures.normal.wrapT = RepeatWrapping

    textures.roughness = this.resources.items.grassRoughnessTexture as Texture

    this.textures = textures
    return textures
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      transparent: true,
      map: this.textures.color,
      aoMap: this.textures.ao,
      displacementMap: this.textures.displament,
      displacementScale: 0.001,
      normalMap: this.textures.normal,
      roughnessMap: this.textures.roughness,
    })

    this.material = material
    return material
  }

  setMesh(): Mesh {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = 0
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
