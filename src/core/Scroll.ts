import EventEmitter from './EventEmitter'

export default class Scroll extends EventEmitter {
  scrollY: number = 0
  enabled: boolean = false

  constructor() {
    super()

    window.addEventListener('scroll', this.scroll.bind(this))
  }

  scroll() {
    this.scrollY = window.scrollY
    if (this.enabled) {
      this.trigger('scroll')
    }
  }

  destroy() {
    this.off('scroll')
    window.removeEventListener('scroll', this.scroll.bind(this))
  }
}
