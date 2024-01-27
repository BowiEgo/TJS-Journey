import Bushes from './Bushes'
import Door from './Door'
import Roof from './Roof'
import Walls from './Walls'

export default class House {
  roof: Roof | null = null
  walls: Walls | null = null
  door: Door | null = null
  bushes: Bushes | null = null

  constructor() {
    // Setup
    this.roof = new Roof()
    this.walls = new Walls()
    this.door = new Door()
    this.bushes = new Bushes()
  }

  destroy() {
    this.roof?.destroy()
    this.walls?.destroy()
    this.door?.destroy()
    this.bushes?.destroy()
  }
}
