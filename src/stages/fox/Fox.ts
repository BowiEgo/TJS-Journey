import { AnimationAction, AnimationMixer, Group, Mesh, Scene } from 'three'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { Core, createCore } from '../../core'
import Resources from '../../core/Resources'
import Time from '../../core/Time'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import { disposeMeshes } from '../../core/Utils'

type Animation = {
  mixer: AnimationMixer
  action: AnimationAction
  actions: Actions
  play: (name: 'idle' | 'jump' | 'run') => void
}

type Actions = {
  current: AnimationAction
  idle: AnimationAction
  jump: AnimationAction
  run: AnimationAction
}

export default class Fox {
  core: Core
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  debugFolder: GUI | undefined
  resource: GLTF
  model: Scene | Group
  animation: Animation

  constructor() {
    this.core = createCore()
    this.scene = this.core.scene
    this.resources = this.core.resources
    this.time = this.core.time
    this.debug = this.core.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Fox')
    }

    // Setup
    this.resource = this.resources.items.foxModel as GLTF

    this.model = this.setModel()
    this.animation = this.setAnimation()
  }

  setModel() {
    const model = this.resource.scene
    model.scale.set(0.1, 0.1, 0.1)

    this.scene.add(model)

    model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })

    this.model = model

    return model
  }

  setAnimation() {
    const animation = {} as Animation
    animation.mixer = new AnimationMixer(this.model)
    // console.log(this.resource.animations)

    animation.actions = {} as Actions

    animation.actions.idle = animation.mixer.clipAction(this.resource.animations[4])
    animation.actions.jump = animation.mixer.clipAction(this.resource.animations[5])
    animation.actions.run = animation.mixer.clipAction(this.resource.animations[9])

    animation.actions.current = animation.actions.idle
    animation.actions.current.play()

    animation.play = (name) => {
      const newAction = animation.actions[name]
      const oldAction = animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1, false)

      animation.actions.current = newAction
    }

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play('idle')
        },
        playJump: () => {
          this.animation.play('jump')
        },
        playRun: () => {
          this.animation.play('run')
        },
      }
      this.debugFolder?.add(debugObject, 'playIdle')
      this.debugFolder?.add(debugObject, 'playJump')
      this.debugFolder?.add(debugObject, 'playRun')
    }

    this.animation = animation
    return animation
  }

  update() {
    this.animation.mixer.update(this.time.delta)
  }

  destroy() {
    disposeMeshes(this.model)
    this.scene.remove(this.model)
  }
}
