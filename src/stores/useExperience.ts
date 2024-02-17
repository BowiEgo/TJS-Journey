import { StateCreator, create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ExtractByString } from '../stages/type';

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

interface Experience {
    current: ExpName;
    change: (expName: ExpName) => void;
}

const createExperience: StateCreator<Experience> = (set, _get) => ({
    current: 'game',
    change: (expName) =>
        set(() => {
            return { current: expName };
        }),
});

const useExperienceStore = create<Experience>()(
    subscribeWithSelector((...a) => ({
        ...createExperience(...a),
    })),
);

export default useExperienceStore;
