import { Body, ContactMaterial, Material, Plane, SAPBroadphase, Vec3, World } from 'cannon-es'
import { Mesh, Quaternion, Vector3 } from 'three'
import { Core, createCore } from '../../core'
import Time from '../../core/Time'
import Cube from './Cube'
import Ball from './Ball'

export type ObjectToUpdate = {
  mesh: Mesh
  body: Body
}

/**
 * Sounds
 */
const hitSound = new Audio('assets/sounds/mixkit-basketball-ball-hard-hit.wav')

let oldElapsedTime = 0
const positionVector = new Vector3()

export default class Physic {
  core: Core
  time: Time
  world: World
  defaultMaterial: Material = new Material('default')
  contactMaterial: ContactMaterial
  floorBody: Body
  objectsToUpdate: (Ball | Cube)[] = []

  constructor() {
    this.core = createCore()
    this.time = this.core.time
    // World
    this.world = new World()
    this.world.broadphase = new SAPBroadphase(this.world)
    this.world.allowSleep = true
    this.world.gravity.set(0, -9.82, 0)

    this.contactMaterial = this.setContactMaterial()
    this.floorBody = this.setFloorBody()
  }

  playHitSound(collision: any) {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    if (impactStrength > 1.5) {
      hitSound.volume = impactStrength / 20
      hitSound.currentTime = 0
      hitSound.play()
    }
  }

  setContactMaterial() {
    // Materials
    const defaultContactMaterial = new ContactMaterial(this.defaultMaterial, this.defaultMaterial, {
      friction: 0.1,
      restitution: 0.7,
    })
    // const concreateMaterial = new Material("concreate");
    // const plasticMaterial = new Material("plastic");
    // const concreatePlasticContactMaterial = new ContactMaterial(
    //   concreateMaterial,
    //   plasticMaterial,
    //   {
    //     friction: 0.1,
    //     restitution: 0.7,
    //   }
    // );
    this.contactMaterial = defaultContactMaterial

    this.world.defaultContactMaterial = defaultContactMaterial
    return defaultContactMaterial
  }

  setFloorBody() {
    // Floor
    const floorShape = new Plane()
    const floorBody = new Body()
    floorBody.material = this.defaultMaterial
    floorBody.mass = 0
    floorBody.addShape(floorShape)
    floorBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI * 0.5)
    this.world.addBody(floorBody)

    this.floorBody = floorBody
    return floorBody
  }

  update() {
    const deltaTime = this.time.elapsed - oldElapsedTime
    oldElapsedTime = this.time.elapsed

    // Update physics world
    // sphereBody.applyForce(new Vec3(-0.5, 0, 0), sphereBody.position);
    this.world.step(1 / 60, deltaTime, 3)

    for (const object of this.objectsToUpdate) {
      positionVector.set(object.body.position.x, object.body.position.y, object.body.position.z)
      object.mesh.position.copy(positionVector)
      let quaternion = object.body.quaternion as unknown
      object.mesh.quaternion.copy(quaternion as Quaternion)
    }
  }

  reset() {
    for (const object of this.objectsToUpdate) {
      object.destroy()
    }

    this.objectsToUpdate.splice(0, this.objectsToUpdate.length)
  }

  destroy() {
    this.reset()
  }
}
