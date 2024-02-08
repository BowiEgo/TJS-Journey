import {
    BufferAttribute,
    Scene,
    BufferGeometry,
    Points,
    ShaderMaterial,
    AdditiveBlending,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import { Textures } from '../types'
import firefliesVertexShader from '../../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../../shaders/fireflies/fragment.glsl'
import Renderer from '../../core/Renderer'
import Sizes from '../../core/Sizes'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'

const PAREMETERS = {
    count: 30,
    size: 0.1,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
}

export default class Fireflies {
    core: Core | null
    renderer: Renderer
    sizes: Sizes
    scene: Scene
    resources: Resources
    time: Time
    debug: Debug
    debugFolder: GUI | undefined
    geometry: BufferGeometry
    textures: Textures
    material: ShaderMaterial
    points: Points

    constructor() {
        this.core = createCore()
        this.renderer = this.core.renderer
        this.sizes = this.core.sizes
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time
        this.debug = this.core.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('Fireflies')
        }

        this.geometry = this.setGeometry()
        this.textures = this.setTexture()
        this.material = this.setMaterial()
        this.points = this.setPoints()
    }

    setGeometry() {
        const geometry = new BufferGeometry()
        const positionArray = new Float32Array(PAREMETERS.count * 3)
        const scaleArray = new Float32Array(PAREMETERS.count)

        for (let i = 0; i < PAREMETERS.count; i++) {
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
            positionArray[i * 3 + 1] = Math.random() * 1.5
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

            scaleArray[i] = Math.random()
        }

        geometry.setAttribute('position', new BufferAttribute(positionArray, 3))
        geometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

        return geometry
    }

    setTexture() {
        const textures = {} as Textures

        return textures
    }

    setMaterial() {
        const material = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: this.renderer.instance.getPixelRatio() },
                uSize: { value: 100 },
            },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false,
        })

        this.sizes.on('resize', () => {
            material.uniforms.uPixelRatio.value = this.renderer.instance.getPixelRatio()
        })

        // Debug
        this.debugFolder
            ?.add(material.uniforms.uSize, 'value')
            .min(0)
            .max(500)
            .step(1)
            .name('firefliesSize')

        return material
    }

    setPoints() {
        const points = new Points(this.geometry, this.material)

        this.scene.add(points)
        return points
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }

    destroy() {
        disposeMeshes(this.points)
        this.scene.remove(this.points)
    }
}
