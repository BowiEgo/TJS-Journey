import { StateCreator, create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Level {
    blocksCount: number;
    blocksSeed: number;
}

interface Time {
    startTime: number;
    endTime: number;
}

interface Phase {
    phase: 'ready' | 'playing' | 'ended';
    start: () => void;
    restart: () => void;
    end: () => void;
}

const createTime: StateCreator<Time> = () => ({
    startTime: 0,
    endTime: 0,
});

const createPhase: StateCreator<Phase> = (set, _get) => ({
    phase: 'ready',
    start: () =>
        set((state) => {
            if (state.phase === 'ready') return { phase: 'playing', startTime: Date.now() };
            return {};
        }),
    restart: () =>
        set((state) => {
            if (state.phase === 'playing' || state.phase === 'ended')
                return { phase: 'ready', blocksSeed: Math.random() };
            return {};
        }),
    end: () =>
        set((state) => {
            if (state.phase === 'playing') return { phase: 'ended', endTime: Date.now() };
            return {};
        }),
});

const useGameStore = create<Level & Time & Phase>()(
    subscribeWithSelector((...a) => ({
        blocksCount: 5,
        blocksSeed: 0,
        ...createTime(...a),
        ...createPhase(...a),
    })),
);

export default useGameStore;