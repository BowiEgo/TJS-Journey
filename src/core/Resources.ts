import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import EventEmitter from './EventEmitter'
import { CubeTexture, CubeTextureLoader, LoadingManager, Texture, TextureLoader } from 'three'
import { Source } from '../stages/types'

type Loaders = {
  gltfLoader: GLTFLoader
  textureLoader: TextureLoader
  cubeTextureLoader: CubeTextureLoader
}

type File = GLTF | Texture | CubeTexture

const loadingManager = new LoadingManager()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/assets/draco/gltf/')

loadingManager.onStart = () => {
  // console.log("onStart");
}

loadingManager.onLoad = () => {
  // console.log("onLoad");
}

loadingManager.onProgress = () => {
  // console.log("onProgress");
}

loadingManager.onError = (err: string) => {
  console.error('onError', err)
}

export default class Resources extends EventEmitter {
  items: { [key: string]: File }
  toLoad: number
  loaded: number
  loaders: Loaders

  constructor() {
    super()

    // Setup
    this.items = {}
    this.toLoad = 0
    this.loaded = 0
    this.loaders = this.setLoaders()
  }

  setLoaders() {
    let loaders = {} as Loaders
    loaders.gltfLoader = new GLTFLoader(loadingManager)
    loaders.gltfLoader.setDRACOLoader(dracoLoader)
    loaders.textureLoader = new TextureLoader(loadingManager)
    loaders.cubeTextureLoader = new CubeTextureLoader(loadingManager)
    this.loaders = loaders
    return loaders
  }

  load(sources: Source[]) {
    this.items = {}
    this.toLoad = sources.length
    this.loaded = 0

    // Load each source
    for (const source of sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path as string[], (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source: Source, file: File) {
    this.items[source.name] = file

    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
