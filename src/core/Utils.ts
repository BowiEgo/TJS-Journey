import { Group, Mesh, Points, Scene } from 'three'

export function disposeMeshes(mesh: Scene | Mesh | Group | Points) {
  // Travese the whole scene
  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry.dispose()

      // Loop through the material properties
      for (const key in child.material) {
        const value = child.material[key]

        // Test if there is a dispose function
        if (value && typeof value.dispose === 'function') {
          value.dispose()
        }
      }
    }
  })
}
