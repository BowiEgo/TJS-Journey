import { Texture } from 'three'

type Source = {
  name: string
  type: string
  path: string | string[]
}

type Textures = {
  color?: Texture
  alpha?: Texture
  ao?: Texture
  displament?: Texture
  normal?: Texture
  roughness?: Texture
  metalness?: Texture
  env?: Texture
}
