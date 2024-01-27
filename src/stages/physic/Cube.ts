import { BoxGeometry, Mesh, MeshStandardMaterial, Scene, Texture, Vector3 } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import { Body, Box, Vec3 } from 'cannon-es'
import Physic from './Physic'
import PhysicStage from '.'
import { disposeMeshes } from '../../core/Utils'
import { Textures } from '../types'

type Options = {
  width: number
  height: number
  depth: number
  position: { x: number; y: number; z: number }
}

export default class Cube {
  options: Options
  width: number
  height: number
  depth: number
  position: { x: number; y: number; z: number }
  core: Core
  scene: Scene
  resources: Resources
  time: Time
  stage: PhysicStage | null
  physic: Physic | null
  debug: Debug
  debugFolder: GUI | undefined
  geometry: BoxGeometry
  textures: Textures
  material: MeshStandardMaterial
  mesh: Mesh
  body: Body

  constructor(options: Options) {
    this.options = options
    this.width = options.width
    this.height = options.height
    this.depth = options.depth
    this.position = options.position
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time
    this.stage = this.core.stage as PhysicStage
    this.physic = this.stage.physic
    if (!this.physic) console.error(`no physic !!!`)
    this.debug = this.core.debug

    this.geometry = this.setGeometry()
    this.textures = this.setTexture()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
    this.body = this.setPhysic() as Body
  }

  setGeometry() {
    const geometry = new BoxGeometry(1, 1, 1)
    this.geometry = geometry

    return geometry
  }

  setTexture() {
    const textures = {
      env: this.resources.items.environmentMapTexture as Texture,
    }

    this.textures = textures

    return textures
  }

  setMaterial() {
    const material = new MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: this.textures.env,
    })

    this.material = material
    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.scale.set(this.width, this.height, this.depth)
    mesh.castShadow = true
    mesh.position.copy(this.position as Vector3)
    this.mesh = mesh

    this.scene.add(mesh)
    return mesh
  }

  setPhysic() {
    if (!this.physic) return

    const shape = new Box(new Vec3(this.width * 0.5, this.height * 0.5, this.depth * 0.5))
    const body = new Body({
      mass: 1,
      position: new Vec3(0, 3, 0),
      shape: shape,
      material: this.physic.defaultMaterial,
    })
    body.position.copy(this.position as Vec3)
    body.addEventListener('collide', this.physic?.playHitSound)
    this.physic?.world.addBody(body)

    this.physic?.objectsToUpdate.push(this)

    this.body = body
    return body
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)

    if (!this.physic) return
    this.body.removeEventListener('collide', this.physic.playHitSound)
    this.physic.world.removeBody(this.body)
  }
}
