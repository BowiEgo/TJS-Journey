import {
    CameraHelper,
    CubeTexture,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    SRGBColorSpace,
    Scene,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'

type EnvironmentMap = {
    intensity: number
    texture: CubeTexture
    updateMaterial: () => void
}

export default class Environment {
    core: Core
    scene: Scene
    debug: Debug
    debugFolder: GUI | undefined
    resources: Resources
    sunLight: DirectionalLight
    sunLightHelper: CameraHelper | null = null
    environmentMap: EnvironmentMap

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
        this.environmentMap = this.setEnvironmentMap()
    }

    setSunLight() {
        const directionalLight = new DirectionalLight('#ffffff', 1)
        directionalLight.position.set(0.25, 3, -2.25)
        directionalLight.shadow.camera.far = 30
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.normalBias = 0.05
        this.scene.add(directionalLight)

        const directionLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
        directionLightCameraHelper.visible = false
        this.sunLightHelper = directionLightCameraHelper
        this.scene.add(directionLightCameraHelper)

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
                .min(-20)
                .max(20)
                .step(0.001)

            this.debugFolder
                ?.add(directionalLight.position, 'y')
                .name('sunLightY')
                .min(-20)
                .max(20)
                .step(0.001)

            this.debugFolder
                ?.add(directionalLight.position, 'z')
                .name('sunLightZ')
                .min(-20)
                .max(20)
                .step(0.001)
        }

        this.sunLight = directionalLight
        return directionalLight
    }

    setEnvironmentMap() {
        let environmentMap = {} as EnvironmentMap
        environmentMap.intensity = 2.4
        environmentMap.texture = this.resources.items.environmentMapTexture as CubeTexture
        environmentMap.texture.colorSpace = SRGBColorSpace
        this.scene.background = environmentMap.texture
        this.scene.environment = environmentMap.texture
        this.environmentMap = environmentMap

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                    child.receiveShadow = true
                }
            })
        }

        this.environmentMap.updateMaterial()

        // Debug
        if (this.debug.active) {
            this.debugFolder
                ?.add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterial)
        }

        return environmentMap
    }

    destroy() {
        this.sunLightHelper?.dispose()
        this.sunLight.dispose()
        this.scene.remove(this.sunLight)
        this.sunLightHelper && this.scene.remove(this.sunLightHelper)
        this.scene.environment = null
        this.scene.background = null
    }
}
