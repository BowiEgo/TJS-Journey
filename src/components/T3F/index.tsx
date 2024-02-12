import BasicExperience from './Basic/Experience';
import TextExperience from './3DText/Experience';
import PortalExperience from './Portal/Experience';
import MouseEvtExperience from './MouseEvent/Experience';
import PostProcessingExperience from './PostProcessing/Experience';
import { useControls } from 'leva';
import { ExtractByString } from '../../stages/type';

export enum PageName {
    R3F,
    nativeThreeJS,
}

export type SwitchPage = (pageName: PageName) => void;

interface Props {
    switchPage: SwitchPage;
}

const expNames = ['basic', 'text', 'portal', 'mouseEvent', 'postProcessing'] as const;

type ExpName = ExtractByString<(typeof expNames)[number]>;

export default function R3F({ switchPage }: Props) {
    const { experience } = useControls({
        experience: { value: 'postProcessing', options: expNames },
    });

    const renderExperience = (name: ExpName) => {
        switch (name) {
            case 'basic':
                return <BasicExperience switchPage={switchPage} />;
            case 'text':
                return <TextExperience switchPage={switchPage} />;
            case 'portal':
                return <PortalExperience switchPage={switchPage} />;
            case 'mouseEvent':
                return <MouseEvtExperience switchPage={switchPage} />;
            case 'postProcessing':
                return <PostProcessingExperience switchPage={switchPage} />;
            default:
                return null;
        }
    };

    return renderExperience(experience as ExpName);
}
