import Stage from '..'
import Renderer from '../../core/Renderer'
import Camera from '../../core/Camera'
import Environment from './Environment'
import Model from './Model'
import sources from './sources'
import Points from './Point'

export default class MixingHTMLStage extends Stage {
    renderer: Renderer | undefined
    camera: Camera | undefined
    environment: Environment | null = null
    model: Model | null = null
    points: Points | null = null

    constructor() {
        super()

        this.on('setup', () => {
            this.renderer = this.core?.renderer
            this.camera = this.core?.camera
            // Camera
            this.core?.camera.instance.position.set(10, 5, 10)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.environment = new Environment()
            this.model = new Model()
            this.points = new Points()
        })

        this.on('update', () => {
            this.model?.update()
            this.points?.update()
        })

        this.on('destroy', () => {
            this.model?.destroy()
            this.points?.destroy()
            this.environment?.destroy()
        })

        this.resources.load(sources)
    }
}
