import './App.css';
import { Canvas } from '@react-three/fiber';
import * as Three from 'three';
import Experience from './components/Three/Experience';
// import NativeThreeJS from './pages/nativeThreejs';

export default function App() {
    return (
        <>
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: Three.ACESFilmicToneMapping,
                    outputColorSpace: Three.SRGBColorSpace,
                }}
                camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
            >
                <Experience />
            </Canvas>

            {/* <NativeThreeJS /> */}
        </>
    );
}
