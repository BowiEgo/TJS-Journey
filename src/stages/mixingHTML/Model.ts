import { Group, Mesh, Scene, Texture } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { disposeMeshes } from '../../core/Utils'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import { Textures } from '../types'
import Time from '../../core/Time'
import Effect from '../../core/Effect'

export default class Model {
    core: Core
    scene: Scene
    time: Time
    effect: Effect
    resources: Resources
    resource: GLTF
    debug: Debug
    debugFolder: GUI | undefined
    textures: Textures
    model: Scene | Group | Mesh

    constructor() {
        this.core = createCore()
        this.scene = this.core.scene
        this.time = this.core.time
        this.effect = this.core.effect
        this.resources = this.core.resources
        this.debug = this.core.debug

        // Setup
        const gltfHelmet = this.resources.items.damagedHelmetModel as GLTF
        this.resource = gltfHelmet as GLTF
        this.textures = this.setTextures()
        this.model = this.setModel()
    }

    setTextures() {
        const textures = {
            normal: this.resources.items.interfaceNormalTexture as Texture,
        }
        this.textures = textures

        return textures
    }

    setModel() {
        const model = this.resource.scene
        model.scale.set(3, 3, 3)
        this.model = model

        this.scene.add(model)
        return model
    }

    update() {}

    destroy() {
        disposeMeshes(this.model)
        this.scene.remove(this.model)
    }
}
