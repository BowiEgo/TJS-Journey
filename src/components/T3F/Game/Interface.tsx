import { useKeyboardControls } from '@react-three/drei';
import './interface.css';
import useGameStore from '../../../stores/useGame';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';

export default function Interface() {
    const time = useRef<HTMLDivElement>(null!!);

    const restart = useGameStore((state) => state.restart);
    const phase = useGameStore((state) => state.phase);

    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const jump = useKeyboardControls((state) => state.jump);

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGameStore.getState();
            let elapsedTime: string | number = 0;

            if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime;
            else if (state.phase === 'ended') elapsedTime = state.endTime - state.startTime;

            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);

            if (time.current) time.current.textContent = elapsedTime;
        });

        return () => {
            unsubscribeEffect();
        };
    }, []);

    return (
        <div className="interface">
            <div ref={time} className="time">
                0.00
            </div>
            {phase === 'ended' && (
                <div className="restart" onClick={restart}>
                    Restart
                </div>
            )}
            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward ? 'active' : ''} `}></div>
                    <div className={`key ${backward ? 'active' : ''}`}></div>
                    <div className={`key ${rightward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${jump ? 'active' : ''} large`}></div>
                </div>
            </div>
        </div>
    );
}
