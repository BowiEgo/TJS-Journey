import { AmbientLight, Color, DirectionalLight, Scene } from 'three'

const createBasicLight = (scene: Scene) => {
    const ambientLight = new AmbientLight()
    ambientLight.color = new Color(0xffffff)
    ambientLight.intensity = 0.5

    scene.add(ambientLight)

    const directionLight = new DirectionalLight(0xffffff, 0.3)
    directionLight.position.set(1, 1, 0)

    directionLight.shadow.mapSize.width = 1024
    directionLight.shadow.mapSize.height = 1024
    directionLight.shadow.camera.top = 2
    directionLight.shadow.camera.right = 2
    directionLight.shadow.camera.bottom = -2
    directionLight.shadow.camera.left = -2
    directionLight.shadow.camera.near = 1
    directionLight.shadow.camera.far = 6
    directionLight.shadow.radius = 10

    scene.add(directionLight)

    return { ambientLight, directionLight }
}

export default createBasicLight
