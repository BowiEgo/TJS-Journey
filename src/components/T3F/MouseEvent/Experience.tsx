import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '..';
import { useRef } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei';

interface Props {
    switchPage: SwitchPage;
}

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    const cube = useRef<THREE.Mesh>(null!!);
    const hamburger = useGLTF('assets/models/hamburger/hamburger.glb');

    useFrame((_state, delta) => {
        cube.current.rotation.y += delta * 0.2;
    });

    const eventHandler = (event: ThreeEvent<MouseEvent>) => {
        console.log('the event occured', event.distance, event.shiftKey);
        (cube.current.material as THREE.MeshStandardMaterial).color.set(
            `hsl(${Math.random() * 360}, 100%, 75%)`,
        );
    };

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <mesh
                position={[0, 1, 2]}
                onClick={(event: ThreeEvent<MouseEvent>) => event.stopPropagation()}
            >
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh
                ref={cube}
                raycast={meshBounds}
                position={[0, 1, -2]}
                scale={1.5}
                onClick={eventHandler}
                onPointerEnter={(event: ThreeEvent<MouseEvent>) => {
                    event.stopPropagation();
                    document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = 'default';
                }}
            >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <primitive
                object={hamburger.scene}
                scale={0.25}
                position-y={2}
                onClick={(event: ThreeEvent<MouseEvent>) => {
                    event.stopPropagation();
                    console.log('click', event.object.name);
                }}
            />

            <mesh position-y={0} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
