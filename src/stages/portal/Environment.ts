import { DirectionalLight, Scene } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'

export default class Environment {
    core: Core
    scene: Scene
    debug: Debug
    debugFolder: GUI | undefined
    resources: Resources
    sunLight: DirectionalLight

    constructor() {
        this.core = createCore()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.debug = this.core.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('Environment')
        }

        // Setup
        this.sunLight = this.setSunLight()
    }

    setSunLight() {
        const directionalLight = new DirectionalLight('#ffffff', 1)
        directionalLight.position.set(1, 1, 0)
        this.scene.add(directionalLight)

        // Debug
        if (this.debug.active) {
            this.debugFolder
                ?.add(directionalLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                ?.add(directionalLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                ?.add(directionalLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                ?.add(directionalLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001)
        }

        this.sunLight = directionalLight
        return directionalLight
    }

    destroy() {
        this.sunLight.dispose()
        this.scene.remove(this.sunLight)
    }
}
