import { NearestFilter, RepeatWrapping, SRGBColorSpace } from 'three'
import { cubeTextureLoader, textureLoader } from '.'

const urlPrefix = 'assets/textures'

const createDoorTextures = () => {
    const doorColorTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_basecolor.jpg`)
    const doorAlphaTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_opacity.jpg`)
    const doorHeightTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_height.png`)
    const doorNormalTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_normal.jpg`)
    const doorAmbientOcclusionTexture = textureLoader.load(
        `${urlPrefix}/door/Door_Wood_001_ambientOcclusion.jpg`
    )
    const doorMetalnessTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_metallic.jpg`)
    const doorRoughnessTexture = textureLoader.load(`${urlPrefix}/door/Door_Wood_001_roughness.jpg`)

    doorColorTexture.colorSpace = SRGBColorSpace

    // doorColorTexture.repeat.x = 2;
    // doorColorTexture.repeat.y = 3;
    // doorColorTexture.wrapS = MirroredRepeatWrapping;
    // doorColorTexture.wrapT = MirroredRepeatWrapping;

    // doorColorTexture.offset.x = 0.5;
    // doorColorTexture.offset.y = 0.5;

    // doorColorTexture.rotation = Math.PI / 4;
    // doorColorTexture.center.x = 0.5;
    // doorColorTexture.center.y = 0.5;

    doorColorTexture.generateMipmaps = false
    doorColorTexture.minFilter = NearestFilter
    doorColorTexture.magFilter = NearestFilter

    // const image = new Image();
    // const texture = new Texture(image);

    // image.onload = () => {
    //   texture.needsUpdate = true;
    // };

    // image.src = "assets/textures/door/Door_Wood_001_basecolor.jpg";

    return {
        doorColorTexture,
        doorAlphaTexture,
        doorHeightTexture,
        doorNormalTexture,
        doorAmbientOcclusionTexture,
        doorMetalnessTexture,
        doorRoughnessTexture,
    }
}

const createBricksTexture = () => {
    const bricksColorTexture = textureLoader.load(
        `${urlPrefix}/bricks/Brick_Wall_019_basecolor.jpg`
    )

    const bricksHeightTexture = textureLoader.load(`${urlPrefix}/bricks/Brick_Wall_019_height.png`)
    const bricksNormalTexture = textureLoader.load(`${urlPrefix}/bricks/Brick_Wall_019_normal.jpg`)
    const bricksAmbientOcclusionTexture = textureLoader.load(
        `${urlPrefix}/bricks/Brick_Wall_019_ambientOcclusion.jpg`
    )

    const bricksRoughnessTexture = textureLoader.load(
        `${urlPrefix}/bricks/Brick_Wall_019_roughness.jpg`
    )

    bricksColorTexture.repeat.set(2, 2)
    bricksHeightTexture.repeat.set(2, 2)
    bricksNormalTexture.repeat.set(2, 2)
    bricksAmbientOcclusionTexture.repeat.set(2, 2)
    bricksRoughnessTexture.repeat.set(2, 2)

    bricksColorTexture.wrapS = RepeatWrapping
    bricksHeightTexture.wrapS = RepeatWrapping
    bricksNormalTexture.wrapS = RepeatWrapping
    bricksAmbientOcclusionTexture.wrapS = RepeatWrapping
    bricksRoughnessTexture.wrapS = RepeatWrapping

    bricksColorTexture.wrapT = RepeatWrapping
    bricksHeightTexture.wrapT = RepeatWrapping
    bricksNormalTexture.wrapT = RepeatWrapping
    bricksAmbientOcclusionTexture.wrapT = RepeatWrapping
    bricksRoughnessTexture.wrapT = RepeatWrapping

    return {
        bricksColorTexture,
        bricksHeightTexture,
        bricksNormalTexture,
        bricksAmbientOcclusionTexture,
        bricksRoughnessTexture,
    }
}

const createGrassTexture = () => {
    const grassColorTexture = textureLoader.load(`${urlPrefix}/grass/Grass_005_BaseColor.jpg`)

    const grassHeightTexture = textureLoader.load(`${urlPrefix}/grass/Grass_005_Height.png `)

    const grassNormalTexture = textureLoader.load(`${urlPrefix}/grass/Grass_005_Normal.jpg `)

    const grassAmbientOcclusionTexture = textureLoader.load(
        `${urlPrefix}/grass/Grass_005_AmbientOcclusion.jpg `
    )

    const grassRoughnessTexture = textureLoader.load(`${urlPrefix}/grass/Grass_005_Roughness.jpg`)

    grassColorTexture.repeat.set(8, 8)
    grassHeightTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = RepeatWrapping
    grassHeightTexture.wrapS = RepeatWrapping
    grassNormalTexture.wrapS = RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = RepeatWrapping
    grassRoughnessTexture.wrapS = RepeatWrapping

    grassColorTexture.wrapT = RepeatWrapping
    grassHeightTexture.wrapT = RepeatWrapping
    grassNormalTexture.wrapT = RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = RepeatWrapping
    grassRoughnessTexture.wrapT = RepeatWrapping

    return {
        grassColorTexture,
        grassHeightTexture,
        grassNormalTexture,
        grassAmbientOcclusionTexture,
        grassRoughnessTexture,
    }
}

const createEnvironmentTexture = (type: number) => {
    const environmentMapTexture = cubeTextureLoader.load([
        `${urlPrefix}/environmentMaps/${type}/px.png`,
        `${urlPrefix}/environmentMaps/${type}/nx.png`,
        `${urlPrefix}/environmentMaps/${type}/py.png`,
        `${urlPrefix}/environmentMaps/${type}/ny.png`,
        `${urlPrefix}/environmentMaps/${type}/pz.png`,
        `${urlPrefix}/environmentMaps/${type}/nz.png`,
    ])

    return environmentMapTexture
}

export { createDoorTextures, createBricksTexture, createGrassTexture, createEnvironmentTexture }
