import Stage from '..'
import Ball from './Ball'
import Cube from './Cube'
import Environment from './Environment'
import Floor from './Floor'
import Knot from './Knot'
import RandomCubes from './RandomCubes'

export default class PerformanceTipsStage extends Stage {
    environment: Environment | null = null
    floor: Floor | null = null
    ball: Ball | null = null
    cube: Cube | null = null
    knot: Knot | null = null
    randomCubes: RandomCubes | null = null

    constructor() {
        super()

        this.on('setup', () => {
            // Camera
            this.core?.camera.instance.position.set(4, 6, 16)
            this.core?.camera.instance.rotation.set(0, 0, 0)
            // Setup
            this.environment = new Environment()
            this.floor = new Floor()
            this.ball = new Ball()
            this.cube = new Cube()
            this.knot = new Knot()
            this.randomCubes = new RandomCubes()

            // Tip 4
            console.log(this.core?.renderer.instance.info)
        })

        this.on('update', () => {
            this.ball?.update()
            this.cube?.update()
            this.knot?.update()
            this.randomCubes?.update()
        })

        this.on('destroy', () => {
            this.floor?.destroy()
            this.ball?.destroy()
            this.cube?.destroy()
            this.knot?.destroy()
            this.randomCubes?.destroy()
            this.environment?.destroy()
        })

        this.resources.trigger('ready')
    }
}
