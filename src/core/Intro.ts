import { Mesh, PlaneGeometry, Scene, ShaderMaterial } from 'three'
import { Core, createCore } from '.'
import { disposeMeshes } from './Utils'
import Resources from './Resources'
import EventEmitter from './EventEmitter'
import gsap from 'gsap'

export default class Intro extends EventEmitter {
    core: Core
    scene: Scene
    resources: Resources
    overlayGeometry: PlaneGeometry
    overlayMaterial: ShaderMaterial
    overlay: Mesh
    loadingBarElement: HTMLElement | null

    constructor() {
        super()
        this.core = createCore()
        this.scene = this.core.scene
        this.resources = this.core.resources

        this.overlayGeometry = this.setOverlayGeometry()
        this.overlayMaterial = this.setOverlayMaterial()
        this.overlay = this.setOverlay()
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.resources.on('ready', () => {})
    }

    setOverlayGeometry() {
        const overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
        this.overlayGeometry = overlayGeometry

        return overlayGeometry
    }

    setOverlayMaterial() {
        const overlayMaterial = new ShaderMaterial({
            // wireframe: true,
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 },
            },
            vertexShader: `
                void main()
                {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `,
        })
        this.overlayMaterial = overlayMaterial

        return overlayMaterial
    }

    setOverlay() {
        const overlay = new Mesh(this.overlayGeometry, this.overlayMaterial)
        this.overlay = overlay

        this.scene.add(overlay)
        return overlay
    }

    init() {
        if (this.loadingBarElement) {
            this.loadingBarElement.style.display = `block`
        }
    }

    update(progressRatio: number) {
        if (this.loadingBarElement) {
            this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
        }
    }

    start() {
        gsap.delayedCall(0.5, () => {
            gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
            if (this.loadingBarElement) {
                this.loadingBarElement.style.transform = ''
            }
            this.loadingBarElement?.classList.add('ended')
        })

        gsap.delayedCall(3.5, () => {
            this.destroy()
        })
    }

    destroy() {
        disposeMeshes(this.overlay)
        this.scene.remove(this.overlay)
        if (this.loadingBarElement) {
            this.loadingBarElement.style.display = `none`
        }
        this.core.intro = null
    }
}
