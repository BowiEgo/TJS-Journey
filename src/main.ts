import './style.css'
import { createCore } from './core'
import FoxStage from './stages/fox'
import BouncingBallStage from './stages/bouncingBall'
import BasicStage from './stages/basic'
import HauntedHouseStage from './stages/hauntedHouse'
import ParticleStage from './stages/particle'
import GalaxyStage from './stages/galaxy'
import PortfolioStage from './stages/portfolio'
import PhysicStage from './stages/physic'
import ModelsStage from './stages/models'
import RaycasterStage from './stages/raycaster'
import BlenderModelsStage from './stages/blenderModels'
import RealisticRenderStage from './stages/realisticRender'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas class="webgl"></canvas>
  <select title="stage" name="SelectStage" class="select">
    <option value="basic" selected>Basic</option>
    <option value="boucingBall">BoucingBall</option>
    <option value="hauntedHouse">HauntedHouse</option>
    <option value="particle">Particle</option>
    <option value="galaxy">Galaxy</option>
    <option value="portfoli">Portfolio</option>
    <option value="phyisc">Phyisc</option>
    <option value="models">Models</option>
    <option value="raycaster">Raycaster</option>
    <option value="blenderModels">BlenderModels</option>
    <option value="realisticRender">realisticRender</option>
    <option value="fox">fox</option>
  </select>
`

const select = document.querySelector('.select') as HTMLSelectElement

select.onchange = async function (evt) {
  const target = evt.target as any
  switch (target.value) {
    case 'basic':
      window.core.destroyStage()
      window.core.createStage(new BasicStage())
      break
    case 'boucingBall':
      window.core.destroyStage()
      window.core.createStage(new BouncingBallStage())
      break
    case 'hauntedHouse':
      window.core.destroyStage()
      window.core.createStage(new HauntedHouseStage())
      break
    case 'particle':
      window.core.destroyStage()
      window.core.createStage(new ParticleStage())
      break
    case 'galaxy':
      window.core.destroyStage()
      window.core.createStage(new GalaxyStage())
      break
    case 'portfoli':
      window.core.destroyStage()
      window.core.createStage(new PortfolioStage())
      break
    case 'phyisc':
      window.core.destroyStage()
      window.core.createStage(new PhysicStage())
      break
    case 'models':
      window.core.destroyStage()
      window.core.createStage(new ModelsStage())
      break
    case 'raycaster':
      window.core.destroyStage()
      window.core.createStage(new RaycasterStage())
      break
    case 'blenderModels':
      window.core.destroyStage()
      window.core.createStage(new BlenderModelsStage())
      break
    case 'realisticRender':
      window.core.destroyStage()
      window.core.createStage(new RealisticRenderStage())
      break
    case 'fox':
      window.core.destroyStage()
      window.core.createStage(new FoxStage())
      break
    default:
      window.core.destroyStage()
      window.core.createStage(new FoxStage())
      break
  }
}

window.core = createCore(document.querySelector('canvas.webgl') as HTMLCanvasElement | null)
window.core.createStage(new FoxStage())
select.value = 'fox'
