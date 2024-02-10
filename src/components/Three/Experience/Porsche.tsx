import {
    AccumulativeShadows,
    Environment,
    Float,
    Lightformer,
    PerformanceMonitor,
    RandomizedLight,
} from '@react-three/drei';
import './style.css';
import * as THREE from 'three';
import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '../../../App';
import PorscheModel from './PorscheModel';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, Depth, LayerMaterial } from 'lamina';

interface Props {
    switchPage: SwitchPage;
}

export default function Porsche({ switchPage }: Props) {
    const [degraded, degrade] = useState(false);

    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    return (
        <>
            <spotLight
                position={[0, 15, 0]}
                angle={0.3}
                penumbra={1}
                castShadow
                intensity={2}
                shadow-bias={-0.0001}
            />
            <ambientLight intensity={0.5} />
            <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
                <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
            </AccumulativeShadows>

            <PerformanceMonitor onDecline={() => degrade(true)} />

            <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
                <Lightformers />
            </Environment>
            {/* <CameraRig /> */}
            <PorscheModel scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />
        </>
    );
}

// function CameraRig({ v = new THREE.Vector3() }) {
//     return useFrame((state) => {
//         const t = state.clock.elapsedTime;
//         state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 8 + Math.cos(t / 5) / 2), 0.05);
//         state.camera.lookAt(0, 0, 0);
//     });
// }

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef<THREE.Group>(null!!);
    useFrame(
        (_state, delta) =>
            (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60),
    );

    const { colorA, colorB, colorC } = useControls('light', {
        colorA: '#00f5ff',
        colorB: '#000000',
        colorC: '#ff0000',
    });

    return (
        <>
            {/* Ceiling */}
            <Lightformer
                intensity={0.75}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 10, 1]}
            />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer
                            key={i}
                            form="circle"
                            intensity={2}
                            rotation={[Math.PI / 2, 0, 0]}
                            position={[x, 4, i * 4]}
                            scale={[3, 1, 1]}
                        />
                    ))}
                </group>
            </group>
            {/* Sides */}
            <Lightformer
                intensity={4}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[20, 0.1, 1]}
            />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            {/* Accent (red) */}
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
                <Lightformer
                    form="ring"
                    color={colorC}
                    intensity={1}
                    scale={10}
                    position={[-15, 4, -18]}
                    target={[0, 0, 0]}
                />
            </Float>
            {/* Background */}
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="#444" alpha={1} mode="normal" />
                    <Depth
                        colorA={colorA}
                        colorB={colorB}
                        alpha={0.5}
                        mode="normal"
                        near={0}
                        far={300}
                        origin={[100, 100, 100]}
                    />
                </LayerMaterial>
            </mesh>
        </>
    );
}
