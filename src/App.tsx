import './App.css';
import { Canvas } from '@react-three/fiber';
import { StrictMode, useState } from 'react';
import * as THREE from 'three';
import { Leva } from 'leva';
import NativeThreeJS from './pages/NativeThreeJS';
import R3F from './components/T3F';
import { KeyboardControls } from '@react-three/drei';
import Interface from './components/T3F/Game/Interface';
import useExperienceStore from './stores/useExperience';

export enum PageName {
    R3F,
    nativeThreeJS,
}

export type SwitchPage = (pageName: PageName) => void;

export default function App() {
    const [currentPage, setCurrentPage] = useState(PageName.R3F);

    const switchPage: SwitchPage = (pageName) => {
        setCurrentPage(pageName);
    };

    const currentExperience = useExperienceStore((state) => state.current);

    return (
        <>
            {currentPage === PageName.R3F ? (
                <StrictMode>
                    <Leva collapsed />
                    <KeyboardControls
                        map={[
                            { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
                            { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
                            { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
                            { name: 'jump', keys: ['Space'] },
                        ]}
                    >
                        <Canvas
                            flat
                            gl={{
                                antialias: true,
                                toneMapping: THREE.ACESFilmicToneMapping,
                                outputColorSpace: THREE.SRGBColorSpace,
                            }}
                            camera={{ fov: 30, near: 0.1, far: 200, position: [5, 3, 5] }}
                            shadows
                        >
                            <R3F switchPage={switchPage} />
                        </Canvas>
                        {currentExperience === 'game' && <Interface />}
                    </KeyboardControls>
                </StrictMode>
            ) : (
                <NativeThreeJS switchPage={switchPage} />
            )}
        </>
    );
}
