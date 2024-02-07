import { Group, Mesh, MeshBasicMaterial, SRGBColorSpace, Scene, Texture } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { Textures } from '../types'

export default class Portal {
    core: Core | null
    scene: Scene
    resources: Resources
    time: Time
    textures: Textures
    mesh: Mesh | Group

    constructor() {
        this.core = createCore()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time

        this.textures = this.setTextures()
        this.mesh = this.setMesh()
    }

    setTextures() {
        const bakedTexture = this.resources.items.portalBakedTexture as Texture
        bakedTexture.flipY = false
        bakedTexture.colorSpace = SRGBColorSpace

        const textures = {
            color: bakedTexture,
        }

        return textures
    }

    setMesh() {
        const gltfModel = this.resources.items.portalScene as GLTF

        const bakedMaterial = new MeshBasicMaterial({ map: this.textures.color })
        const poleLightMaterial = new MeshBasicMaterial({ color: '#fff4e4' })
        const portalLightMaterial = new MeshBasicMaterial({ color: '#f2efff' })

        gltfModel.scene.traverse((child: any) => {
            if (child.name === 'baked') {
                child.material = bakedMaterial
            }

            if (child.name.match('poleLight*')) {
                child.material = poleLightMaterial
            }

            if (child.name === 'portalLight') {
                child.material = portalLightMaterial
            }
        })

        const mesh = gltfModel.scene
        mesh.castShadow = true

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
