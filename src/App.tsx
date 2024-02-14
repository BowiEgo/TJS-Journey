import './App.css';
import { Canvas } from '@react-three/fiber';
import { StrictMode, useState } from 'react';
import * as THREE from 'three';
import { Leva } from 'leva';
import NativeThreeJS from './pages/NativeThreeJS';
import R3F from './components/T3F';

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

    return (
        <>
            {currentPage === PageName.R3F ? (
                <StrictMode>
                    <Leva collapsed />
                    <Canvas
                        flat
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            outputColorSpace: THREE.SRGBColorSpace,
                        }}
                        camera={{ fov: 30, near: 0.1, far: 200, position: [8, 3, 8] }}
                        shadows
                    >
                        <R3F switchPage={switchPage} />
                    </Canvas>
                </StrictMode>
            ) : (
                <NativeThreeJS switchPage={switchPage} />
            )}
        </>
    );
}
