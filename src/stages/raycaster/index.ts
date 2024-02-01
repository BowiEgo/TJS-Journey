import { Intersection, Raycaster, Vector2 } from 'three'
import Stage from '..'
import Cursor from '../../core/Cursor'
import Environment from './Environment'
import Objects from './Objects'
import Camera from '../../core/Camera'
import Model from './Model'
import sources from './sources'

export default class RaycasterStage extends Stage {
    camera: Camera | undefined
    cursor: Cursor | undefined
    environment: Environment | null = null
    objects: Objects | null = null
    model: Model | null = null
    raycaster: Raycaster | null = null
    currentIntersect: Intersection | null = null

    constructor() {
        super()

        this.on('setup', () => {
            this.camera = this.core?.camera
            this.cursor = this.core?.cursor
            // Camera
            this.camera?.instance.position.set(0, 0, 8)
            this.camera?.instance.rotation.set(0, 0, 0)
            // Setup
            this.environment = new Environment()
            this.objects = new Objects()
            this.model = new Model()
            this.raycaster = new Raycaster()
        })

        this.on('update', () => {
            if (this.objects) {
                this.handleIntersect()
                this.objects?.update()
            }
        })

        this.on('destroy', () => {
            this.environment?.destroy()
            this.objects?.destroy()
            this.model?.destroy()
        })

        this.resources.load(sources)
    }

    handleIntersect() {
        if (!this.camera || !this.raycaster) return
        // Cast a ray
        this.raycaster.setFromCamera(this.cursor?.mouse as Vector2, this.camera.instance)

        if (this.objects) {
            const intersets = this.raycaster.intersectObjects(this.objects.sectionMeshes)

            for (const object of this.objects.sectionMeshes) {
                ;(object.material as any).color.set('#ff0000')
            }

            for (const interset of intersets) {
                ;(interset.object as any).material.color.set('#0000ff')
            }

            if (intersets.length) {
                if (this.currentIntersect === null) {
                    console.log('mouse enter')
                }

                this.currentIntersect = intersets[0]
            } else {
                if (this.currentIntersect) {
                    console.log('mouse leave')
                }

                this.currentIntersect = null
            }
        }

        if (this.model) {
            const modelIntersects = this.raycaster.intersectObject(this.model.model)
            if (modelIntersects.length) {
                this.model.model.scale.set(0.01, 0.01, 0.01)
            } else {
                this.model.model.scale.set(0.005, 0.005, 0.005)
            }
        }
    }
}
