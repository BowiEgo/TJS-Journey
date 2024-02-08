import Environment from './Environment'
import Stage from '../Stage'
import Cube from './Cube'

export default class BasicStage extends Stage {
    environment: Environment | null = null
    cube: Cube | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(6, 6, 6)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.environment = new Environment()
            this.cube = new Cube()
        })

        this.on('update', () => {
            this.cube?.update()
        })

        this.on('destroy', () => {
            this.cube?.destroy()
            this.environment?.destroy()
        })

        this.resources.trigger('ready')
    }
}
