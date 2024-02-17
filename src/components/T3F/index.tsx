import BasicExperience from './Basic/Experience';
import TextExperience from './3DText/Experience';
import PortalExperience from './Portal/Experience';
import MouseEvtExperience from './MouseEvent/Experience';
import PostProcessingExperience from './PostProcessing/Experience';
import { useControls } from 'leva';
import { ExtractByString } from '../../stages/type';
import PortfolioExperience from './Portfolio/Experience';
import PhysicsExperience from './Physics/Experience';
import GameExperience from './Game/Experience';
import useExperienceStore from '../../stores/useExperience';

export enum PageName {
    R3F,
    nativeThreeJS,
}

export type SwitchPage = (pageName: PageName) => void;

interface Props {
    switchPage: SwitchPage;
}

const expNames = [
    'basic',
    'text',
    'portal',
    'mouseEvent',
    'postProcessing',
    'portfolio',
    'physics',
    'game',
] as const;

type ExpName = ExtractByString<(typeof expNames)[number]>;

export default function R3F({ switchPage }: Props) {
    const { experience } = useControls({
        experience: { value: 'game', options: expNames },
    });

    const change = useExperienceStore((state) => state.change);

    const renderExperience = (name: ExpName) => {
        switch (name) {
            case 'basic':
                change('basic');
                return <BasicExperience switchPage={switchPage} />;

            case 'text':
                change('text');
                return <TextExperience switchPage={switchPage} />;
            case 'portal':
                change('portal');

                return <PortalExperience switchPage={switchPage} />;
            case 'mouseEvent':
                change('mouseEvent');

                return <MouseEvtExperience switchPage={switchPage} />;
            case 'postProcessing':
                change('postProcessing');

                return <PostProcessingExperience switchPage={switchPage} />;
            case 'portfolio':
                change('portfolio');

                return <PortfolioExperience switchPage={switchPage} />;
            case 'physics':
                change('physics');

                return <PhysicsExperience switchPage={switchPage} />;
            case 'game':
                change('game');

                return <GameExperience switchPage={switchPage} />;
            default:
                return null;
        }
    };

    return renderExperience(experience as ExpName);
}
