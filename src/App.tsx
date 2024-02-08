import { useEffect, useRef } from 'react'
import './App.css'
import {
    AnimatedGalaxyStage,
    BasicStage,
    BlenderModelsStage,
    BouncingBallStage,
    FoxStage,
    GalaxyStage,
    HauntedHouseStage,
    MixingHTMLStage,
    ModelsStage,
    ModifiedMaterialsStage,
    ParticleStage,
    PerformanceTipsStage,
    PhysicStage,
    PortfolioStage,
    PostProcessingStage,
    RagingSeaStage,
    RaycasterStage,
    RealisticRenderStage,
    ShaderPatternsStage,
    ShaderStage,
    portalStage,
} from './stages'
import { createCore } from './core'

async function handleSelectChange(val: string) {
    switch (val) {
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
        case 'shader':
            window.core.destroyStage()
            window.core.createStage(new ShaderStage())
            break
        case 'shaderPatterns':
            window.core.destroyStage()
            window.core.createStage(new ShaderPatternsStage())
            break
        case 'ragingSea':
            window.core.destroyStage()
            window.core.createStage(new RagingSeaStage())
            break
        case 'animatedGalaxy':
            window.core.destroyStage()
            window.core.createStage(new AnimatedGalaxyStage())
            break
        case 'modifiedMaterial':
            window.core.destroyStage()
            window.core.createStage(new ModifiedMaterialsStage())
            break
        case 'postProcessing':
            window.core.destroyStage()
            window.core.createStage(new PostProcessingStage())
            break
        case 'performanceTips':
            window.core.destroyStage()
            window.core.createStage(new PerformanceTipsStage())
            break
        case 'mixingHTML':
            window.core.destroyStage()
            window.core.createStage(new MixingHTMLStage())
            break
        case 'portal':
            window.core.destroyStage()
            window.core.createStage(new portalStage())
            break
        default:
            window.core.destroyStage()
            window.core.createStage(new ShaderStage())
            break
    }
}

function App() {
    const canvasDOM = useRef(null)

    useEffect(() => {
        window.core = createCore(canvasDOM.current)
        window.core.createStage(new portalStage())
    })

    return (
        <>
            <canvas className="webgl" ref={canvasDOM}></canvas>
            <div className="loading-bar"></div>
            <div className="form"></div>
            <div className="point-container">
                <div className="point point-0"></div>
                <div className="point point-1"></div>
                <div className="point point-2"></div>
            </div>
            <select
                title="stage"
                name="SelectStage"
                className="select"
                defaultValue="portal"
                onChange={(e) => handleSelectChange(e.target.value)}
            >
                <option value="basic">Basic</option>
                <option value="boucingBall">BoucingBall</option>
                <option value="hauntedHouse">HauntedHouse</option>
                <option value="particle">Particle</option>
                <option value="galaxy">Galaxy</option>
                <option value="portfoli">Portfolio</option>
                <option value="phyisc">Phyisc</option>
                <option value="models">Models</option>
                <option value="raycaster">Raycaster</option>
                <option value="blenderModels">BlenderModels</option>
                <option value="realisticRender">RealisticRender</option>
                <option value="fox">Fox</option>
                <option value="shader">Shader</option>
                <option value="shaderPatterns">ShaderPatterns</option>
                <option value="ragingSea">RagingSea</option>
                <option value="animatedGalaxy">AnimatedGalaxy</option>
                <option value="modifiedMaterial">ModifiedMaterial</option>
                <option value="postProcessing">PostProcessing</option>
                <option value="performanceTips">PerformanceTips</option>
                <option value="mixingHTML">MixingHTML</option>
                <option value="portal">Portal</option>
            </select>
            ,
        </>
    )
}

export default App
