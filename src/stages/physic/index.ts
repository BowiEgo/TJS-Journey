import GUI from 'lil-gui'
import Stage from '../Stage'
import Camera from '../../core/Camera'
import Debug from '../../core/Debug'
import { NOOP } from '../../utils'
import Environment from './Environment'
import Floor from './Floor'
import Ball from './Ball'
import sources from './sources'
import Physic from './Physic'
import Cube from './Cube'

export default class PhysicStage extends Stage {
    camera: Camera | undefined
    debug: Debug | undefined
    debugFolder: GUI | undefined
    environment: Environment | null = null
    physic: Physic | null = null
    floor: Floor | null = null

    constructor() {
        super()
        this.camera = this.core?.camera
        this.debug = this.core?.debug

        this.on('setup', () => {
            // Camera
            this.camera?.instance.position.set(0, 3, 8)
            this.camera?.instance.rotation.set(0, 0, 0)

            // Setup
            this.environment = new Environment()
            this.physic = new Physic()
            this.floor = new Floor()

            // Debug
            this.debugFolder = this.debug?.ui?.addFolder('Physic')
            const debugObject = { createBall: NOOP, createCube: NOOP, reset: NOOP }
            debugObject.createBall = () => {
                new Ball({
                    radius: Math.random() * 0.5,
                    position: {
                        x: (Math.random() - 0.5) * 3,
                        y: 3,
                        z: (Math.random() - 0.5) * 3,
                    },
                })
            }

            debugObject.createCube = () => {
                new Cube({
                    width: Math.random(),
                    height: Math.random(),
                    depth: Math.random(),
                    position: {
                        x: (Math.random() - 0.5) * 3,
                        y: 3,
                        z: (Math.random() - 0.5) * 3,
                    },
                })
            }

            debugObject.reset = () => {
                this.physic?.reset()
            }

            this.debugFolder?.add(debugObject, 'createBall')
            this.debugFolder?.add(debugObject, 'createCube')
            this.debugFolder?.add(debugObject, 'reset')
        })

        this.on('update', () => {
            this.physic?.update()
        })

        this.on('destroy', () => {
            this.floor?.destroy()
            this.environment?.destroy()
            this.physic?.destroy()
        })

        this.resources.load(sources)
    }
}
