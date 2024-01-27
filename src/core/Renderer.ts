import { PCFSoftShadowMap, ReinhardToneMapping, Scene, WebGLRenderer } from 'three'
import { Core, createCore } from '.'
import Sizes from './Sizes'
import Camera from './Camera'

export const DEFAULT_RENDERER_CLEAR_COLOR = '#2e2e2e'

export default class Renderer {
  core: Core | null
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: Scene
  camera: Camera
  instance: WebGLRenderer

  constructor() {
    this.core = createCore()
    this.canvas = this.core.canvas
    this.sizes = this.core.sizes
    this.scene = this.core.scene
    this.camera = this.core.camera

    this.instance = this.setInstance()
  }

  private setInstance(): WebGLRenderer {
    const instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    // this is default in three.js
    // this.instance.outputColorSpace = SRGBColorSpace
    instance.toneMapping = ReinhardToneMapping
    instance.toneMappingExposure = 1.75
    instance.shadowMap.enabled = true
    instance.shadowMap.type = PCFSoftShadowMap
    instance.setClearColor(DEFAULT_RENDERER_CLEAR_COLOR)
    this.instance = instance
    this.resize()
    return instance
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  destroy() {
    this.instance.dispose()
  }
}
