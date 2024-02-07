import Environment from './Environment'
import Stage from '..'
import Portal from './Portal'
import sources from './sources'

export default class portalStage extends Stage {
    environment: Environment | null = null
    portal: Portal | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(6, 6, 6)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            // this.environment = new Environment()
            this.portal = new Portal()
        })

        this.on('update', () => {
            this.portal?.update()
        })

        this.on('destroy', () => {
            this.portal?.destroy()
            this.environment?.destroy()
        })

        this.resources.load(sources)
    }
}
