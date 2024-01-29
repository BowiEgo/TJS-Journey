import { BufferAttribute, Color, Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from 'three'
import { Core, createCore } from '../../core'
import waterVertexShader from '../../shaders/water/vertex.glsl'
import waterFragmentShader from '../../shaders/water/fragment.glsl'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import Time from '../../core/Time'
import { disposeMeshes } from '../../core/Utils'
import Resources from '../../core/Resources'

type DebugObject = {
  depthColor: string
  surfaceColor: string
}

export default class Plane {
  core: Core
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  debugObject: DebugObject = {
    depthColor: '#599fc5',
    surfaceColor: '#bee2f9',
  }
  geometry: PlaneGeometry
  // texture: Texture
  material: ShaderMaterial
  mesh: Mesh

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time
    this.debug = this.core.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Waves')
    }

    this.geometry = this.setGeometry()
    // this.texture = this.setTexture()
    this.material = this.setMaterial()
    this.mesh = this.setMesh()
  }

  setGeometry() {
    const geometry = new PlaneGeometry(2, 2, 512, 512)
    this.geometry = geometry

    const count = geometry.attributes.position.count
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random()
    }

    geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1))

    return geometry
  }

  setTexture() {}

  setMaterial() {
    const material = new ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 4.0 },

        uDepthColor: { value: new Color(this.debugObject.depthColor) },
        uSurfaceColor: { value: new Color(this.debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
      },
      // wireframe: true,
    })
    this.material = material

    // Debug
    this.debugFolder
      ?.add(material.uniforms.uBigWavesElevation, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uBigWavesElevation')

    this.debugFolder
      ?.add(material.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(10)
      .step(0.001)
      .name('uBigWavesFrequencyX')

    this.debugFolder
      ?.add(material.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(10)
      .step(0.001)
      .name('uBigWavesFrequencyY')

    this.debugFolder
      ?.add(material.uniforms.uBigWavesSpeed, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uBigWavesElevation')

    this.debugFolder
      ?.add(material.uniforms.uSmallWavesElevation, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uSmallWavesElevation')

    this.debugFolder
      ?.add(material.uniforms.uSmallWavesFrequency, 'value')
      .min(0)
      .max(30)
      .step(0.001)
      .name('uSmallWavesFrequency')

    this.debugFolder
      ?.add(material.uniforms.uSmallWavesSpeed, 'value')
      .min(0)
      .max(4)
      .step(0.001)
      .name('uSmallWavesSpeed')

    this.debugFolder
      ?.add(material.uniforms.uSmallWavesIterations, 'value')
      .min(0)
      .max(5)
      .step(0.001)
      .name('uSmallWavesIterations')

    this.debugFolder
      ?.addColor(this.debugObject, 'depthColor')
      .name('depthColor')
      .onChange(() => {
        material.uniforms.uDepthColor.value.set(this.debugObject.depthColor)
      })

    this.debugFolder
      ?.addColor(this.debugObject, 'surfaceColor')
      .name('surfaceColor')
      .onChange(() => {
        material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor)
      })

    this.debugFolder
      ?.add(material.uniforms.uColorOffset, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uColorOffset')

    this.debugFolder
      ?.add(material.uniforms.uColorMultiplier, 'value')
      .min(0)
      .max(10)
      .step(0.001)
      .name('uColorMultiplier')

    return material
  }

  setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.rotation.x = -Math.PI * 0.5
    this.mesh = mesh

    this.scene.add(mesh)
    return mesh
  }

  update() {
    // Update water
    this.material.uniforms.uTime.value = this.time.elapsed
  }

  destroy() {
    disposeMeshes(this.mesh)
    this.scene.remove(this.mesh)
  }
}
