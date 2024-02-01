import Stage from '..'
import Plane from './Plane'

export default class RagingSeaStage extends Stage {
    plane: Plane | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(2, 2, 2)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.plane = new Plane()
        })

        this.on('update', () => {
            this.plane?.update()
        })

        this.on('destroy', () => {
            this.plane?.destroy()
        })

        // this.resources.load(sources)
        this.resources.trigger('ready')
    }
}
