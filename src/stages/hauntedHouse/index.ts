import Environment from './Environment'
import Stage from '../Stage'
import Floor from './Floor'
import sources from './sources'
import Graves from './Graves'
import House from './House'
import Ghosts from './Ghosts'

export default class HauntedHouseStage extends Stage {
    environment: Environment | null = null
    floor: Floor | null = null
    house: House | null = null
    graves: Graves | null = null
    ghosts: Ghosts | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(6, 6, 6)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.environment = new Environment()
            this.floor = new Floor()
            this.house = new House()
            this.graves = new Graves()
            this.ghosts = new Ghosts()
        })

        this.on('update', () => {
            this.ghosts?.update()
        })

        this.on('destroy', () => {
            this.floor?.destroy()
            this.house?.destroy()
            this.graves?.destroy()
            this.ghosts?.destroy()
            this.environment?.destroy()
        })

        this.resources.load(sources)
    }
}
