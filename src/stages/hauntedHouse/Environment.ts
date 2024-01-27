import { AmbientLight, CameraHelper, Color, DirectionalLight, Fog, PointLight, Scene } from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import Renderer, { DEFAULT_RENDERER_CLEAR_COLOR } from '../../core/Renderer'

export default class Environment {
  core: Core
  renderer: Renderer
  scene: Scene
  debug: Debug
  debugFolder: GUI | undefined
  resources: Resources
  fog: Fog
  ambientLight: AmbientLight
  moonLight: DirectionalLight
  doorLight: PointLight

  constructor() {
    this.core = createCore()
    this.renderer = this.core.renderer
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.debug = this.core.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Environment')
    }

    // Setup
    this.fog = this.setFog()
    this.ambientLight = this.setAmbientLight()
    this.moonLight = this.setMoonLight()
    this.doorLight = this.setDoorLight()
  }

  setFog() {
    const fog = new Fog('#262837', 1, 15)
    this.scene.fog = fog
    this.renderer.instance.setClearColor('#262837')
    this.fog = fog
    return fog
  }

  setAmbientLight() {
    // Ambient Light
    const ambientLight = new AmbientLight('#b9d5ff', 0.12)
    ambientLight.color = new Color(0xffffff)
    ambientLight.intensity = 0.5
    this.ambientLight = ambientLight

    // Debug
    if (this.debug.active) {
      this.debugFolder
        ?.add(ambientLight, 'intensity')
        .name('ambientLight-intensity')
        .min(0)
        .max(1)
        .step(0.001)
    }

    this.scene.add(this.ambientLight)
    return ambientLight
  }

  setMoonLight() {
    // Directional light
    const directionalLight = new DirectionalLight('#b9d5ff', 0.12)
    directionalLight.position.set(4, 5, -2)
    this.moonLight = directionalLight

    // Directional light helper
    const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
    directionalLightCameraHelper.visible = false
    this.scene.add(directionalLightCameraHelper)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        ?.add(this.moonLight, 'intensity')
        .name('moonLight-intensity')
        .min(0)
        .max(1)
        .step(0.001)
    }

    this.scene.add(this.moonLight)
    return directionalLight
  }

  setDoorLight() {
    const pointLight = new PointLight('#ff7d46', 5, 7)
    pointLight.position.set(0, 2.2, 2.7)
    this.doorLight = pointLight

    this.scene.add(this.doorLight)
    return pointLight
  }

  destroy() {
    this.scene.fog = null
    this.renderer.instance.setClearColor(DEFAULT_RENDERER_CLEAR_COLOR)
    this.ambientLight.dispose()
    this.moonLight.dispose()
    this.doorLight.dispose()
    this.scene.remove(this.ambientLight, this.moonLight, this.doorLight)
    this.scene.environment = null
  }
}
