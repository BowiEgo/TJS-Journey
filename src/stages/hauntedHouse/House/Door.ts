import {
  Mesh,
  MeshStandardMaterial,
  Scene,
  PlaneGeometry,
  Texture,
  SRGBColorSpace,
  NearestFilter,
  Float32BufferAttribute,
} from 'three'
import { Core, createCore } from '../../../core'
import Resources from '../../../core/Resources'
import { disposeMeshes } from '../../../core/Utils'

type Textures = {
  color: Texture
  alpha: Texture
  ao: Texture
  displament: Texture
  normal: Texture
  roughness: Texture
  metalness: Texture
}

export default class Door {
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
    const geometry = new PlaneGeometry(2.2, 2.2, 100, 100)
    geometry.setAttribute('uv2', new Float32BufferAttribute(geometry.attributes.uv.array, 2))

    this.geometry = geometry
    return geometry
  }

  setTexture(): Textures {
    const textures = {
      color: this.resources.items.doorColorTexture,
      alpha: this.resources.items.doorAlphaTexture,
      ao: this.resources.items.doorAmbientOcclusionTexture,
      displament: this.resources.items.doorHeightTexture,
      normal: this.resources.items.doorNormalTexture,
      metalness: this.resources.items.doorMetalnessTexture,
      roughness: this.resources.items.doorRoughnessTexture,
    } as Textures

    textures.color.colorSpace = SRGBColorSpace
    textures.color.generateMipmaps = false
    textures.color.minFilter = NearestFilter
    textures.color.magFilter = NearestFilter

    this.textures = textures
    return textures
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      metalness: 0,
      roughness: 1,
      map: this.textures.color,
      transparent: true,
      alphaMap: this.textures.alpha,
      aoMap: this.textures.ao,
      displacementMap: this.textures.displament,
      displacementScale: 0.1,
      normalMap: this.textures.normal,
      metalnessMap: this.textures.metalness,
      roughnessMap: this.textures.roughness,
    })

    this.material = material
    return material
  }

  setMesh(): Mesh {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.position.y = 1
    mesh.position.z = 2 + 0.01

    this.mesh = mesh
    this.scene.add(mesh)
    return mesh
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
