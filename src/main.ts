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
  <select title="scene" name="SelectScene" class="select">
    <option value="basicScene" selected>BasicScene</option>
    <option value="boucingBall">BoucingBall</option>
    <option value="hauntedHouseScene">HauntedHouseScene</option>
    <option value="particleScene">ParticleScene</option>
    <option value="galaxyScene">GalaxyScene</option>
    <option value="portfoliScene">PortfolioScene</option>
    <option value="phyiscScene">PhyiscScene</option>
    <option value="modelsScene">ModelsScene</option>
    <option value="raycasterScene">RaycasterScene</option>
    <option value="blenderModelsScene">BlenderModelsScene</option>
    <option value="realisticRenderScene">realisticRenderScene</option>
    <option value="foxScene">foxScene</option>
  </select>
`

const select = document.querySelector('.select') as HTMLSelectElement

select.onchange = async function (evt) {
  const target = evt.target as any
  switch (target.value) {
    case 'basicScene':
      window.core.destroyStage()
      window.core.createStage(new BasicStage())
      break
    case 'boucingBall':
      window.core.destroyStage()
      window.core.createStage(new BouncingBallStage())
      break
    case 'hauntedHouseScene':
      window.core.destroyStage()
      window.core.createStage(new HauntedHouseStage())
      break
    case 'particleScene':
      window.core.destroyStage()
      window.core.createStage(new ParticleStage())
      break
    case 'galaxyScene':
      window.core.destroyStage()
      window.core.createStage(new GalaxyStage())
      break
    case 'portfoliScene':
      window.core.destroyStage()
      window.core.createStage(new PortfolioStage())
      break
    case 'phyiscScene':
      window.core.destroyStage()
      window.core.createStage(new PhysicStage())
      break
    case 'modelsScene':
      window.core.destroyStage()
      window.core.createStage(new ModelsStage())
      break
    case 'raycasterScene':
      window.core.destroyStage()
      window.core.createStage(new RaycasterStage())
      break
    case 'blenderModelsScene':
      window.core.destroyStage()
      window.core.createStage(new BlenderModelsStage())
      break
    case 'realisticRenderScene':
      window.core.destroyStage()
      window.core.createStage(new RealisticRenderStage())
      break
    case 'foxScene':
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
window.core.createStage(new RealisticRenderStage())
select.value = 'realisticRenderScene'
