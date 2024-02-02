import { Mesh, MeshStandardMaterial, Scene, TorusKnotGeometry } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import { Textures } from '../types'

export default class Knot {
    core: Core | null
    scene: Scene
    resources: Resources
    time: Time
    geometry: TorusKnotGeometry
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

    setGeometry() {
        const geometry = new TorusKnotGeometry(1, 0.4, 128, 32)

        this.geometry = geometry
        return geometry
    }

    setTexture() {
        const textures = {} as Textures

        this.textures = textures
        return textures
    }

    setMaterial() {
        const material = new MeshStandardMaterial()

        this.material = material
        return material
    }

    setMesh() {
        const mesh = new Mesh(this.geometry, this.material)
        mesh.castShadow = true
        mesh.receiveShadow = true

        this.mesh = mesh
        this.scene.add(mesh)
        return mesh
    }

    update() {}

    destroy() {
        disposeMeshes(this.mesh)
        this.scene.remove(this.mesh)
    }
}
