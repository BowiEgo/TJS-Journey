import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CustomObject from '../CustomObject';

extend({ OrbitControls });
declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

export default function Experience() {
    const { camera, gl } = useThree();

    const cubeRef = useRef<Three.Mesh>(null!);
    const groupRef = useRef<Three.Group>(null!);

    useFrame((_state, delta) => {
        // const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);

        cubeRef.current.rotation.y += delta;
        // groupRef.current.rotation.y += delta;
    });

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>

                <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </group>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <CustomObject />
        </>
    );
}
