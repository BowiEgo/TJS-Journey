import { useRef } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, meshBounds } from '@react-three/drei';
import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '..';

interface Props {
    switchPage: SwitchPage;
}

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    const cube = useRef<THREE.Mesh>(null!!);

    useFrame((_state, delta) => {
        cube.current.rotation.y += delta * 0.2;
    });

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

            <mesh ref={cube} raycast={meshBounds} position={[0, 1, -2]} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position-y={0} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
