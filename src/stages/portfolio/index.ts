import Environment from './Environment'
import Stage from '../Stage'
import Objects from './Objects'
import sources from './sources'
import Sizes from '../../core/Sizes'
import gsap from 'gsap'
import Scroll from '../../core/Scroll'
import Camera from '../../core/Camera'
import Time from '../../core/Time'
import Cursor from '../../core/Cursor'
import Particles from './Particles'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'

const PAREMETERS = {
    materialColor: '#dbb3b3',
}

let currentSection = 0

export default class PortfolioStage extends Stage {
    camera: Camera | undefined
    sizes: Sizes | undefined
    cursor: Cursor | undefined
    scroll: Scroll | undefined
    time: Time | undefined
    debug: Debug | undefined
    debugFolder: GUI | undefined
    environment: Environment | null = null
    objects: Objects | null = null
    particles: Particles | null = null

    constructor() {
        super()

        this.camera = this.core?.camera
        this.sizes = this.core?.sizes
        this.cursor = this.core?.cursor
        this.scroll = this.core?.scroll
        this.time = this.core?.time
        this.debug = this.core?.debug

        this.on('setup', () => {
            createHTMLElements()

            // Scroll
            if (this.scroll) {
                this.scroll.enabled = true
                this.scroll.on('scroll', this.handleScroll.bind(this))
            }

            // Camera
            if (this.camera) {
                this.camera.instance.position.set(0, 0, 6)
                this.camera.instance.rotation.set(0, 0, 0)
                this.camera.controls.enabled = false
            }

            // Setup
            this.environment = new Environment()
            this.objects = new Objects(PAREMETERS)
            this.particles = new Particles(this.objects, PAREMETERS)

            // Debug
            if (this.debug && this.debug.active) {
                this.debugFolder = this.debug.ui?.addFolder('Objects')

                this.debugFolder?.addColor(PAREMETERS, 'materialColor').onChange(() => {
                    this.objects?.material.color.set(PAREMETERS.materialColor)
                    this.particles?.material.color.set(PAREMETERS.materialColor)
                })
            }
        })

        this.on('update', () => {
            this.objects?.update()

            // Animate camera
            if (
                this.time &&
                this.camera &&
                this.cursor &&
                this.scroll &&
                this.sizes &&
                this.objects
            ) {
                this.camera.instance.position.y =
                    (-this.scroll.scrollY / this.sizes.height) * this.objects.objectsDistance

                const parallaxX = this.cursor.x * 0.5
                const parallaxY = -this.cursor.y * 0.5
                this.camera.group.position.x +=
                    (parallaxX - this.camera.group.position.x) * this.time.delta * 5
                this.camera.group.position.y +=
                    (parallaxY - this.camera.group.position.y) * this.time.delta * 5
            }
        })

        this.on('destroy', () => {
            this.objects?.destroy()
            this.particles?.destroy()
            this.environment?.destroy()
            destroyHTMLElements()

            if (this.scroll) {
                this.scroll.off('scroll')
                this.scroll.enabled = false
            }

            if (this.camera) {
                this.camera.controls.enabled = true
            }
        })

        this.resources.load(sources)
    }

    handleScroll() {
        if (!this.sizes || !this.scroll || !this.objects) return

        const newSection = Math.round(this.scroll.scrollY / this.sizes.height)

        if (newSection != currentSection) {
            currentSection = newSection

            gsap.to(this.objects?.sectionMeshes[currentSection].rotation, {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5',
            })
        }
    }
}

let page: HTMLElement

const createHTMLElements = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
    document.getElementsByTagName('body')[0].style.overflow = 'auto'

    page = document.createElement('div')
    page.className = 'page'
    page.innerHTML = `
    <h1>MY PORTFOLIO</h1>
    <h1>MY WORKS</h1>
    <h1>CONTACT ME</h1>
  `
    document.querySelector<HTMLDivElement>('#app')?.appendChild(page)
}

const destroyHTMLElements = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    document.querySelector<HTMLDivElement>('#app')?.removeChild(page)
}
