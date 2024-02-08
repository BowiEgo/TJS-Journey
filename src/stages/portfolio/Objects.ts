import {
    ConeGeometry,
    Group,
    Mesh,
    MeshToonMaterial,
    NearestFilter,
    Scene,
    Texture,
    TorusGeometry,
    TorusKnotGeometry,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import Camera from '../../core/Camera'
import Sizes from '../../core/Sizes'
import Cursor from '../../core/Cursor'
import Scroll from '../../core/Scroll'

type Options = {
    materialColor: string
}

type Geometries = {
    torus: TorusGeometry
    cone: ConeGeometry
    torusKnot: TorusKnotGeometry
}

export default class Objects {
    options: Options
    core: Core | null
    scene: Scene
    resources: Resources
    time: Time
    camera: Camera
    sizes: Sizes
    cursor: Cursor
    scroll: Scroll
    debug: Debug
    debugFolder: GUI | undefined
    objectsDistance: number = 4
    geometries: Geometries
    texture: Texture
    material: MeshToonMaterial
    meshes: Group
    sectionMeshes: Mesh[] = []

    constructor(options: Options) {
        this.options = options
        this.core = createCore()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time
        this.camera = this.core.camera
        this.sizes = this.core.sizes
        this.cursor = this.core.cursor
        this.scroll = this.core.scroll
        this.debug = this.core.debug

        // Debug
        // if (this.debug.active) {
        // }

        this.geometries = this.setGeometries()
        this.texture = this.setTexture()
        this.material = this.setMaterial()
        this.meshes = this.setMeshes()
    }

    setGeometries() {
        const geometries = {
            torus: new TorusGeometry(1, 0.4, 16, 60),
            cone: new ConeGeometry(1, 2, 32),
            torusKnot: new TorusKnotGeometry(0.8, 0.35, 100, 16),
        }

        this.geometries = geometries
        return geometries
    }

    setTexture() {
        const gradientTexture = this.resources.items.gradientTexture as Texture
        gradientTexture.magFilter = NearestFilter

        this.texture = gradientTexture
        return gradientTexture
    }

    setMaterial() {
        const material = new MeshToonMaterial({
            color: this.options.materialColor,
            gradientMap: this.texture,
        })
        this.material = material

        return material
    }

    setMeshes() {
        const meshes = new Group()
        const mesh1 = new Mesh(new TorusGeometry(1, 0.4, 16, 60), this.material)
        const mesh2 = new Mesh(new ConeGeometry(1, 2, 32), this.material)
        const mesh3 = new Mesh(new TorusKnotGeometry(0.8, 0.35, 100, 16), this.material)

        mesh1.position.y = -this.objectsDistance * 0
        mesh2.position.y = -this.objectsDistance * 1
        mesh3.position.y = -this.objectsDistance * 2

        mesh1.position.x = 2
        mesh2.position.x = -2
        mesh3.position.x = 2

        meshes.add(mesh1, mesh2, mesh3)
        this.meshes = meshes
        this.sectionMeshes = [mesh1, mesh2, mesh3]
        this.scene.add(meshes)
        return meshes
    }

    update() {
        // Animate meshes
        for (const mesh of this.sectionMeshes) {
            mesh.rotation.x += this.time.delta * 0.1
            mesh.rotation.y += this.time.delta * 0.12
        }
    }

    destroy() {
        disposeMeshes(this.meshes)
        this.scene.remove(this.meshes)
    }
}
