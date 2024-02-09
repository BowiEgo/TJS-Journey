import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as Three from 'three';
// import CustomObject from '../CustomObject';
import {
    Float,
    Html,
    MeshReflectorMaterial,
    OrbitControls,
    PivotControls,
    Text,
    TransformControls,
} from '@react-three/drei';
import './style.css';

export default function Experience() {
    const sphereRef = useRef<Three.Mesh>(null!);
    const cubeRef = useRef<Three.Mesh>(null!);
    const groupRef = useRef<Three.Group>(null!);

    useFrame((_state, _delta) => {
        // const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);
        // cubeRef.current.rotation.y += delta;
        // groupRef.current.rotation.y += delta;
    });

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>
                <PivotControls
                    anchor={[0, 0, 0]}
                    depthTest={false}
                    lineWidth={4}
                    axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                    scale={100}
                    fixed={true}
                >
                    <mesh ref={sphereRef} position-x={-2}>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                        <Html
                            position={[1, 1, 0]}
                            wrapperClass="label"
                            center
                            distanceFactor={6}
                            occlude={[sphereRef, cubeRef]}
                        >
                            There's a sphere 👍
                        </Html>
                    </mesh>
                </PivotControls>

                <mesh ref={cubeRef} position-x={2} scale={1.5}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <TransformControls object={cubeRef} mode="translate" />
            </group>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <MeshReflectorMaterial
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={0.5}
                    color="greenyellow"
                />
            </mesh>

            {/* <CustomObject /> */}

            <Float speed={5} floatIntensity={2}>
                <Text
                    font="/assets/fonts/Bangers-Regular.woff"
                    fontSize={0.5}
                    color="salmon"
                    position-y={2}
                    maxWidth={2}
                    textAlign="center"
                >
                    I LOVE THREE JS
                </Text>
            </Float>
        </>
    );
}
