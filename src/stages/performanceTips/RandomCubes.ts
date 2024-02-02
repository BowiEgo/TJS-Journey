import {
    Mesh,
    Scene,
    BoxGeometry,
    BufferGeometry,
    MeshNormalMaterial,
    Vector3,
    Euler,
    Quaternion,
    Matrix4,
    InstancedMesh,
    DynamicDrawUsage,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import { Textures } from '../types'

export default class RandomCubes {
    core: Core | null
    scene: Scene
    resources: Resources
    time: Time
    geometry: BufferGeometry | BoxGeometry
    textures: Textures
    material: MeshNormalMaterial
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
        // const geometries = []
        const geometry = new BoxGeometry(0.5, 0.5, 0.5)

        // for (let i = 0; i < 50; i++) {
        //     const geometry = new BoxGeometry(0.5, 0.5, 0.5)
        //     geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
        //     geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)
        //     geometry.translate(
        //         (Math.random() - 0.5) * 10,
        //         (Math.random() - 0.5) * 10,
        //         (Math.random() - 0.5) * 10,
        //     )

        //     geometries.push(geometry)
        // }

        // const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries)

        // this.geometry = mergedGeometry
        this.geometry = geometry
        return geometry
    }

    setTexture() {
        const textures = {} as Textures

        this.textures = textures
        return textures
    }

    setMaterial() {
        const material = new MeshNormalMaterial()

        this.material = material
        return material
    }

    setMesh() {
        // const mesh = new Mesh(this.geometry, this.material)
        const mesh = new InstancedMesh(this.geometry, this.material, 50)
        mesh.castShadow = true
        mesh.receiveShadow = true
        // set to DynamicDrawUsage to apply matrix in each frame,then we can do some animation
        mesh.instanceMatrix.setUsage(DynamicDrawUsage)

        this.mesh = mesh
        this.scene.add(mesh)

        for (let i = 0; i < 50; i++) {
            const position = new Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
            )

            const quaternion = new Quaternion()
            quaternion.setFromEuler(
                new Euler(
                    (Math.random() - 0.5) * Math.PI * 2,
                    (Math.random() - 0.5) * Math.PI * 2,
                    0,
                ),
            )

            const matrix = new Matrix4()
            matrix.makeRotationFromQuaternion(quaternion)
            matrix.setPosition(position)
            mesh.setMatrixAt(i, matrix)
        }

        return mesh
    }

    update() {}

    destroy() {
        disposeMeshes(this.mesh)
        this.scene.remove(this.mesh)
    }
}
