import BasicExperience from './Basic/Experience';
import TextExperience from './3DText/Experience';
import PortalExperience from './Portal/Experience';
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

const expNames = ['basic', 'text', 'portal'] as const;

type ExpName = ExtractByString<(typeof expNames)[number]>;

export default function R3F({ switchPage }: Props) {
    const { experience } = useControls({
        experience: { value: 'portal', options: expNames },
    });

    const renderExperience = (name: ExpName) => {
        switch (name) {
            case 'basic':
                return <BasicExperience switchPage={switchPage} />;
            case 'text':
                return <TextExperience switchPage={switchPage} />;
            case 'portal':
                return <PortalExperience switchPage={switchPage} />;
            default:
                return null;
        }
    };

    return renderExperience(experience as ExpName);
}
