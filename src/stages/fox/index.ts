import Stage from '../Stage'
import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'
import sources from './sources'

export default class FoxStage extends Stage {
    environment: Environment | null = null
    floor: Floor | null = null
    fox: Fox | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(6, 3, 6)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
            this.fox = new Fox()
        })

        this.on('update', () => {
            this.fox?.update()
        })

        this.on('destroy', () => {
            this.floor?.destroy()
            this.fox?.destroy()
            this.environment?.destroy()
        })

        this.resources.load(sources)
    }
}
