import './App.css';
import { Canvas } from '@react-three/fiber';
import { StrictMode, useState } from 'react';
import * as THREE from 'three';
import Experience from './components/Three/Experience';
import { Leva } from 'leva';
import NativeThreeJS from './pages/NativeThreeJS';

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
                    <Leva />
                    <Canvas
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            outputColorSpace: THREE.SRGBColorSpace,
                        }}
                        camera={{ fov: 30, near: 0.1, far: 200, position: [-5.0, 0, -4.0] }}
                        shadows
                    >
                        <Experience switchPage={switchPage} />
                    </Canvas>
                </StrictMode>
            ) : (
                <NativeThreeJS switchPage={switchPage} />
            )}
        </>
    );
}
