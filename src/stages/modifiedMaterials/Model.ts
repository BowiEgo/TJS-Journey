import {
  Group,
  Mesh,
  MeshDepthMaterial,
  MeshStandardMaterial,
  RGBADepthPacking,
  Scene,
  Texture,
} from 'three'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { disposeMeshes } from '../../core/Utils'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import RealisticRenderStage from '.'
import { Textures } from '../types'
import Time from '../../core/Time'

type CustomUniforms = {
  uTime: { value: number }
}

export default class Model {
  core: Core
  stage: RealisticRenderStage
  scene: Scene
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  resources: Resources
  resource: GLTF
  customUniforms: CustomUniforms = {
    uTime: { value: 0 },
  }
  geometry: any
  textures: Textures
  material: MeshStandardMaterial
  depthMaterial: MeshDepthMaterial | null = null
  model: Scene | Group | Mesh

  constructor() {
    this.core = createCore()
    this.stage = this.core.stage as RealisticRenderStage
    this.scene = this.core.scene
    this.time = this.core.time
    this.debug = this.core.debug
    this.resources = this.core.resources

    // Setup
    const gltfHead = this.resources.items.headModel as GLTF
    this.resource = gltfHead as GLTF
    this.geometry = this.setGeometry()
    this.textures = this.setTextures()
    const { material, depthMaterial } = this.setMaterial()
    this.material = material
    this.depthMaterial = depthMaterial
    this.model = this.setModel()
  }

  setGeometry() {
    let geometry = new Mesh()

    this.resource.scene.traverse((child) => {
      if (child instanceof Mesh) {
        geometry = child.geometry
      }
    })

    this.geometry = geometry
    return geometry
  }

  setTextures() {
    const textures = {
      color: this.resources.items.headColorTexture as Texture,
      normal: this.resources.items.headNormalTexture as Texture,
    }
    this.textures = textures

    return textures
  }

  setMaterial() {
    const material = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    })

    const depthMaterial = new MeshDepthMaterial({
      depthPacking: RGBADepthPacking,
    })

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.customUniforms.uTime

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }
        `,
      )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
          #include <beginnormal_vertex>

          float angle = sin(position.y + uTime) * 0.4;
          mat2 rotateMatrix = get2dRotateMatrix(angle);

          objectNormal.xz = rotateMatrix * objectNormal.xz;
        `,
      )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>

          transformed.xz = rotateMatrix * transformed.xz;
        `,
      )
    }

    depthMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.customUniforms.uTime

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }
        `,
      )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>

          float angle = sin(position.y + uTime) * 0.4;
          mat2 rotateMatrix = get2dRotateMatrix(angle);

          transformed.xz = rotateMatrix * transformed.xz;
        `,
      )
    }

    return { material, depthMaterial }
  }

  setModel() {
    const model = new Mesh(this.geometry, this.material)
    model.castShadow = true
    model.customDepthMaterial = this.depthMaterial as MeshDepthMaterial
    this.model = model

    this.scene.add(model)
    return model
  }

  update() {
    this.customUniforms.uTime.value = this.time.elapsed
  }

  destroy() {
    disposeMeshes(this.model)
    this.scene.remove(this.model)
  }
}
