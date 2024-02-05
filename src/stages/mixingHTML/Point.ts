import { Raycaster, Scene, Vector2, Vector3 } from 'three'
import { Core, createCore } from '../../core'
import Camera from '../../core/Camera'
import Sizes from '../../core/Sizes'

type Point = {
    position: Vector3
    element: HTMLDivElement | null
}

export default class Points {
    core: Core
    scene: Scene
    camera: Camera
    sizes: Sizes
    raycaster: Raycaster
    points: Point[]

    constructor() {
        this.core = createCore()
        this.scene = this.core.scene
        this.camera = this.core.camera
        this.sizes = this.core.sizes

        this.raycaster = new Raycaster()

        this.points = [
            {
                position: new Vector3(1, 0.3, 2),
                element: document.querySelector<HTMLDivElement>('.point-0'),
            },
            {
                position: new Vector3(2.5, 0.8, -1.6),
                element: document.querySelector<HTMLDivElement>('.point-1'),
            },
            {
                position: new Vector3(-2.6, -1.3, -0.7),
                element: document.querySelector<HTMLDivElement>('.point-2'),
            },
        ]

        this.points.forEach((point, i) => {
            point.element!.innerHTML = `
                <div class="label">${i}<div>
                <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio nisi expedita recusandae quasi tempora doloremque vitae quaerat quam sit laudantium in laboriosam at, explicabo facere commodi asperiores adipisci error corrupti?<div>
            `
        })
    }

    update() {
        for (const point of this.points) {
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)

            this.raycaster.setFromCamera(
                new Vector2(screenPosition.x, screenPosition.y),
                this.camera.instance,
            )
            const intersects = this.raycaster.intersectObjects(this.scene.children, true)

            if (intersects.length === 0) {
                point.element?.classList.add('visible')
            } else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(this.camera.instance.position)

                if (intersectionDistance < pointDistance) {
                    point.element?.classList.remove('visible')
                } else {
                    point.element?.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = -screenPosition.y * this.sizes.height * 0.5
            point.element!.style.transform = `translate(${translateX}px, ${translateY}px)`
        }
    }

    destroy() {
        for (const point of this.points) {
            point.element!.innerHTML = ''
        }
    }
}
