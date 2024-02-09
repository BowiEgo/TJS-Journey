import { StageConstructor } from './type';
import FoxStage from './fox';
import BouncingBallStage from './bouncingBall';
import BasicStage from './basic';
import HauntedHouseStage from './hauntedHouse';
import ParticleStage from './particle';
import GalaxyStage from './galaxy';
import PortfolioStage from './portfolio';
import PhysicStage from './physic';
import ModelsStage from './models';
import RaycasterStage from './raycaster';
import BlenderModelsStage from './blenderModels';
import RealisticRenderStage from './realisticRender';
import ShaderStage from './shader';
import ShaderPatternsStage from './shaderPatterns';
import RagingSeaStage from './ragingSea';
import AnimatedGalaxyStage from './animatedGalaxy';
import ModifiedMaterialsStage from './modifiedMaterials';
import PostProcessingStage from './postProcessing';
import PerformanceTipsStage from './performanceTips';
import MixingHTMLStage from './mixingHTML';
import PortalStage from './portal';

export const stageNames = [
    'basic',
    'bouncingBall',
    'hauntedHouse',
    'particle',
    'galaxy',
    'portfolio',
    'physic',
    'models',
    'raycaster',
    'blenderModels',
    'realisticRender',
    'fox',
    'shader',
    'shaderPatterns',
    'ragingSea',
    'animatedGalaxy',
    'modifiedMaterials',
    'postProcessing',
    'performanceTips',
    'mixingHTML',
    'portal',
] as const;

const Stages: { [key: string]: StageConstructor } = {
    FoxStage,
    BouncingBallStage,
    BasicStage,
    HauntedHouseStage,
    ParticleStage,
    GalaxyStage,
    PortfolioStage,
    PhysicStage,
    ModelsStage,
    RaycasterStage,
    BlenderModelsStage,
    RealisticRenderStage,
    ShaderStage,
    ShaderPatternsStage,
    RagingSeaStage,
    AnimatedGalaxyStage,
    ModifiedMaterialsStage,
    PostProcessingStage,
    PerformanceTipsStage,
    MixingHTMLStage,
    PortalStage,
};

export default Stages;
