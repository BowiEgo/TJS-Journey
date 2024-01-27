import GUI from 'lil-gui'
import Stage from '..'
import Debug from '../../core/Debug'
import Environment from './Environment'
import Model from './Model'
import sources from './sources'
import Renderer from '../../core/Renderer'
import Camera from '../../core/Camera'
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from 'three'

export default class RealisticRenderStage extends Stage {
  renderer: Renderer | undefined
  camera: Camera | undefined
  debug: Debug | undefined
  debugFolder: GUI | undefined
  environment: Environment | null = null
  model: Model | null = null

  constructor() {
    super()

    this.on('setup', () => {
      this.renderer = this.core?.renderer
      this.camera = this.core?.camera
      this.debug = this.core?.debug
      // Camera
      this.camera?.instance.position.set(4, 0, 4)
      this.camera?.instance.rotation.set(0, 0, 0)

      // Debug
      this.debugFolder = this.debug?.ui?.addFolder('Renderer')

      if (this.renderer) {
        this.debugFolder?.add(this.renderer.instance, 'toneMapping', {
          No: NoToneMapping,
          Linear: LinearToneMapping,
          Reinhard: ReinhardToneMapping,
          Cineon: CineonToneMapping,
          ACESFilmic: ACESFilmicToneMapping,
        })

        this.debugFolder
          ?.add(this.renderer.instance, 'toneMappingExposure')
          .min(0)
          .max(10)
          .step(0.001)
      }

      // Setup
      this.environment = new Environment()
      this.model = new Model()
    })

    this.on('update', () => {
      this.model?.update()
    })

    this.on('destroy', () => {
      if (this.renderer) {
        this.renderer.instance.toneMapping = ReinhardToneMapping
        this.renderer.instance.toneMappingExposure = 1.75
      }
      this.model?.destroy()
      this.environment?.destroy()
    })

    this.resources.load(sources)
  }
}
