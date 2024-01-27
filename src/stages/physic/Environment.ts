import { AmbientLight, CameraHelper, Color, DirectionalLight, Scene } from 'three'
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
  ambientLight: AmbientLight

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
    this.ambientLight = this.setAmbientLight()
    this.sunLight = this.setSunLight()
  }

  setAmbientLight() {
    // Ambient Light
    const ambientLight = new AmbientLight()
    ambientLight.color = new Color(0xffffff)
    ambientLight.intensity = 0.5
    this.scene.add(ambientLight)
    this.ambientLight = ambientLight

    // Debug
    if (this.debug.active) {
      this.debugFolder
        ?.add(ambientLight, 'intensity')
        .name('ambientLight-intensity')
        .min(0)
        .max(1)
        .step(0.01)
    }

    return ambientLight
  }

  setSunLight() {
    const directionLight = new DirectionalLight(0xffffff, 4)
    directionLight.position.set(3.5, 2, -1.25)
    directionLight.castShadow = true
    directionLight.shadow.mapSize.set(1024, 1024)
    directionLight.shadow.normalBias = 0.05
    directionLight.shadow.camera.far = 15
    this.sunLight = directionLight
    this.scene.add(directionLight)

    const directionLightCameraHelper = new CameraHelper(directionLight.shadow.camera)
    directionLightCameraHelper.visible = false
    this.scene.add(directionLightCameraHelper)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        ?.add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        ?.add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(-5)
        .max(5)
        .step(0.001)

      this.debugFolder
        ?.add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(-5)
        .max(5)
        .step(0.001)

      this.debugFolder
        ?.add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(-5)
        .max(5)
        .step(0.001)
    }

    return directionLight
  }

  destroy() {
    this.ambientLight.dispose()
    this.sunLight.dispose()
    this.scene.remove(this.ambientLight, this.sunLight)
  }
}
