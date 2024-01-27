import {
  BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Texture,
  BoxGeometry,
  RepeatWrapping,
} from 'three'
import { Core, createCore } from '../../../core'
import Resources from '../../../core/Resources'
import Time from '../../../core/Time'
import { disposeMeshes } from '../../../core/Utils'

type Textures = {
  color: Texture
  ao: Texture
  displament: Texture
  normal: Texture
  roughness: Texture
}

export default class Walls {
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
    const geometry = new BoxGeometry(4, 2.5, 4)
    geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))

    this.geometry = geometry
    return geometry
  }

  setTexture(): Textures {
    const textures = {} as Textures

    textures.color = this.resources.items.bricksColorTexture as Texture
    textures.color.repeat.set(2, 2)
    textures.color.wrapS = RepeatWrapping
    textures.color.wrapT = RepeatWrapping

    textures.ao = this.resources.items.bricksAmbientOcclusionTexture as Texture
    textures.ao.repeat.set(2, 2)
    textures.ao.wrapS = RepeatWrapping
    textures.ao.wrapT = RepeatWrapping
    textures.displament = this.resources.items.bricksHeightTexture as Texture
    textures.displament.repeat.set(2, 2)
    textures.displament.wrapS = RepeatWrapping
    textures.displament.wrapT = RepeatWrapping

    textures.normal = this.resources.items.bricksNormalTexture as Texture
    textures.normal.repeat.set(2, 2)
    textures.normal.wrapS = RepeatWrapping
    textures.normal.wrapT = RepeatWrapping

    textures.roughness = this.resources.items.bricksRoughnessTexture as Texture
    textures.roughness.repeat.set(2, 2)
    textures.roughness.wrapS = RepeatWrapping
    textures.roughness.wrapT = RepeatWrapping

    this.textures = textures
    return textures
  }

  setMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      map: this.textures.color,
      transparent: true,
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
    mesh.position.y = 1.25
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
