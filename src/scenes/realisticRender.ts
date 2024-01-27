import {
  ACESFilmicToneMapping,
  // CameraHelper,
  CineonToneMapping,
  DirectionalLight,
  LinearToneMapping,
  Mesh,
  MeshStandardMaterial,
  NoToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  ReinhardToneMapping,
  SRGBColorSpace,
  Scene,
  // SphereGeometry,
  // Texture,
} from 'three'
import { createResize, createScene } from '.'
import { createControls, createCursor } from '../cameras'
import { runAnimation, stopAnimation } from '../animations'
import { NOOP } from '../utils'
import { loadModels } from '../models'
import { createDebugUI } from '../debugUI'
import { createEnvironmentTexture } from '../textures/hauntedHouse'

interface DebugObject {
  environmentMapIntensity: number
  model: string | null
}

const updateAllMaterials = (
  scene: Scene,
  // environmentMaps: Texture,
  debugObject: any
) => {
  scene.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
      // child.material.envMap = environmentMaps
      child.material.envMapIntensity = debugObject.environmentMapIntensity
      child.material.needsUpdate = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

async function createRealisticRenderScene() {
  let debugObject: DebugObject = { environmentMapIntensity: 1, model: null }

  /**
   * Scene
   */
  const { size, aspectRatio, scene, canvas, render, renderer } = createScene({
    rendererOpts: { antialias: true },
  })
  // Renderer
  // this is default in three.js
  // renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ReinhardToneMapping
  renderer.toneMappingExposure = 2
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  // Cursor
  const cursor = createCursor(size)

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000)
  camera.position.x = 4
  camera.position.y = 0
  camera.position.z = 4

  createResize(size, canvas, camera, renderer)

  const controls = createControls(camera, canvas)

  /**
   * Lights
   */
  const directionLight = new DirectionalLight(0xffffff, 1)
  directionLight.position.set(0.25, 3, -2.25)
  // directionLight.shadow.camera.near = 0.1;
  directionLight.shadow.camera.far = 15
  directionLight.castShadow = true
  directionLight.shadow.mapSize.set(1024, 1024)
  directionLight.shadow.normalBias = 0.05
  scene.add(directionLight)

  // const directionLightCameraHelper = new CameraHelper(directionLight.shadow.camera)
  // scene.add(directionLightCameraHelper)

  /**
   * Objects
   */
  // Environment map
  const environmentMapTexture = createEnvironmentTexture(2)
  environmentMapTexture.colorSpace = SRGBColorSpace
  scene.background = environmentMapTexture
  scene.environment = environmentMapTexture

  debugObject.environmentMapIntensity = 2

  // Test sphere
  // const testSphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshStandardMaterial())
  // scene.add(testSphere)

  // Models
  let gltf: any
  // const gltf = (await loadModels('/assets/models/1975_porsche_911_930_turbo/scene.gltf')) as any
  // const gltf = (await loadModels('/assets/models/porsche_911_carrera_4s/scene.glb')) as any
  const gltfHamburger = (await loadModels('/assets/models/hamburger/hamburger.glb')) as any
  const gltfCoffeCart = (await loadModels(
    '/assets/models/CoffeeCart_01_4k/CoffeeCart_01_4k.gltf'
  )) as any
  // const gltf911 = (await loadModels('/assets/models/porsche_911_carrera_4s/scene.gltf')) as any

  gltf = gltfCoffeCart
  debugObject.model = 'coffeCart'
  updateAllMaterials(gltf.scene, debugObject)
  // gltf.scene.scale.set(100, 100, 100)
  // gltf.scene.position.x = -400
  // gltf.scene.position.y = -90
  // gltf.scene.position.z = -400

  scene.add(gltf.scene)

  /**
   * Debug
   */
  const gui = createDebugUI()
  gui.add(directionLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
  gui.add(directionLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
  gui.add(directionLight.position, 'y').min(-5).max(5).step(0.001).name('lightY')
  gui.add(directionLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')

  gui.add(gltf.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation')
  gui.add(gltf.scene.scale, 'x').min(1).max(100).step(0.001).name('scaleX')
  gui.add(gltf.scene.scale, 'y').min(1).max(100).step(0.001).name('scaley')
  gui.add(gltf.scene.scale, 'z').min(1).max(100).step(0.001).name('scalez')
  gui.add(gltf.scene.position, 'x').min(-300).max(0).step(1).name('x')
  gui.add(gltf.scene.position, 'y').min(-300).max(0).step(1).name('y')
  gui.add(gltf.scene.position, 'z').min(-300).max(0).step(1).name('z')

  gui
    .add(debugObject, 'environmentMapIntensity')
    .min(0)
    .max(5)
    .step(0.001)
    .onChange(updateAllMaterials.bind(null, gltf.scene, debugObject))

  gui.add(renderer, 'toneMapping', {
    No: NoToneMapping,
    Linear: LinearToneMapping,
    Reinhard: ReinhardToneMapping,
    Cineon: CineonToneMapping,
    ACESFilmic: ACESFilmicToneMapping,
  })

  gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

  gui
    .add(debugObject, 'model', {
      hamburger: gltfHamburger,
      coffeCart: gltfCoffeCart,
      // 911: gltf911,
    })
    .onChange((val: any) => {
      scene.remove(gltf.scene)
      gltf = val
      updateAllMaterials(gltf.scene, debugObject)

      scene.add(gltf.scene)
    })

  // Animation
  runAnimation(camera, null, controls, render, NOOP)

  const dispose = (scene: Scene) => {
    stopAnimation()
    // ;[].forEach((mesh) => {
    //     mesh.geometry.dispose()
    //     mesh.material.dispose()
    //     scene.remove(mesh)
    // })

    scene.remove(gltf.scene)
  }

  return { scene, renderer, gui, cursor, dispose: dispose.bind(null, scene) }
}

export default createRealisticRenderScene
