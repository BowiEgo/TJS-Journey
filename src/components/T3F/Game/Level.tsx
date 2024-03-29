import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ReactElement, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({
    color: '#111111',
    metalness: 0,
    roughness: 0,
});
const floor2Material = new THREE.MeshStandardMaterial({
    color: '#222222',
    metalness: 0,
    roughness: 0,
});
const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    metalness: 0,
    roughness: 1,
});
const wallMaterial = new THREE.MeshStandardMaterial({
    color: '#887777',
    metalness: 0,
    roughness: 0,
});

interface BlockProps {
    position?: number[];
}

type Block = (props: BlockProps) => ReactElement;

export function Level({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo], seed = 0 }) {
    const blocks = useMemo(() => {
        const blocks: Block[] = [];

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }

        return blocks;
    }, [count, types, seed]);

    return (
        <>
            <BlockStart position={[0, 0, 0]} />
            {blocks.map((Block, index) => (
                <Block key={index} position={[0, 0, -(index + 1) * 4]} />
            ))}
            <BlockEnd position={[0, 0, -(count + 1) * 4]} />
            <Bounds length={count + 2} />
        </>
    );
}

function Bounds({ length = 1 }) {
    return (
        <>
            <RigidBody type="fixed" restitution={0.2} friction={0}>
                <mesh
                    position={[2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    castShadow
                />
                <mesh
                    position={[-2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    receiveShadow
                />
                <mesh
                    position={[0, 0.75, -(length * 4) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[4, 1.5, 0.3]}
                    castShadow
                />
                <CuboidCollider
                    args={[2, 0.1, 2 * length]}
                    position={[0, -0.1, -(length * 2) + 2]}
                    restitution={0.2}
                    friction={1}
                />
            </RigidBody>
        </>
    );
}

export const BlockStart: Block = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position as unknown as THREE.Vector3}>
            <Float>
                <Text
                    font="assets/fonts/BebasNeue-Regular.woff"
                    scale={0.3}
                    maxWidth={0.25}
                    lineHeight={0.75}
                    textAlign="right"
                    position={[0.75, 0.65, 0]}
                    rotation-y={-0.25}
                >
                    Marble Race
                    <meshBasicMaterial toneMapped={false} />
                </Text>
            </Float>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
        </group>
    );
};

export const BlockEnd: Block = ({ position = [0, 0, 0] }) => {
    const hamburger = useGLTF('assets/models/hamburger/hamburger.glb');
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    });

    return (
        <group position={position as unknown as THREE.Vector3}>
            <Text font="assets/fonts/BebasNeue-Regular.woff" position={[0, 2, 2]}>
                FINISH
                <meshBasicMaterial toneMapped={false} />
            </Text>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, 0, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            <RigidBody
                type="fixed"
                colliders="hull"
                position={[0, 0.25, 0]}
                restitution={0.2}
                friction={0}
            >
                <primitive object={hamburger.scene} scale={0.16} />
            </RigidBody>
        </group>
    );
};

export const BlockSpinner: Block = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef<RapierRigidBody>(null!!);
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        obstacle.current.setNextKinematicRotation(rotation);
    });

    return (
        <>
            <group position={position as unknown as THREE.Vector3}>
                <mesh
                    geometry={boxGeometry}
                    material={floor2Material}
                    position={[0, -0.1, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
                <RigidBody
                    ref={obstacle}
                    type="kinematicPosition"
                    position={[0, 0.3, 0]}
                    restitution={0.2}
                    friction={0}
                >
                    <mesh
                        geometry={boxGeometry}
                        material={obstacleMaterial}
                        scale={[3.5, 0.3, 0.3]}
                        castShadow
                        receiveShadow
                    />
                </RigidBody>
            </group>
        </>
    );
};

export const BlockLimbo: Block = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef<RapierRigidBody>(null!!);
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const y = Math.sin(time + timeOffset) + 1.15;
        obstacle.current.setNextKinematicTranslation({
            x: (position as number[])[0],
            y: (position as number[])[1] + y,
            z: (position as number[])[2],
        });
    });

    return (
        <>
            <group position={position as unknown as THREE.Vector3}>
                <mesh
                    geometry={boxGeometry}
                    material={floor2Material}
                    position={[0, -0.1, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
                <RigidBody
                    ref={obstacle}
                    type="kinematicPosition"
                    position={[0, 0.3, 0]}
                    restitution={0.2}
                    friction={0}
                >
                    <mesh
                        geometry={boxGeometry}
                        material={obstacleMaterial}
                        scale={[3.5, 0.3, 0.3]}
                        castShadow
                        receiveShadow
                    />
                </RigidBody>
            </group>
        </>
    );
};

export const BlockAxe: Block = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef<RapierRigidBody>(null!!);
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const x = Math.sin(time + timeOffset) * 1.25;
        obstacle.current.setNextKinematicTranslation({
            x: (position as number[])[0] + x,
            y: (position as number[])[1] + 0.75,
            z: (position as number[])[2],
        });
    });

    return (
        <>
            <group position={position as unknown as THREE.Vector3}>
                <mesh
                    geometry={boxGeometry}
                    material={floor2Material}
                    position={[0, -0.1, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
                <RigidBody
                    ref={obstacle}
                    type="kinematicPosition"
                    position={[0, 0.3, 0]}
                    restitution={0.2}
                    friction={0}
                >
                    <mesh
                        geometry={boxGeometry}
                        material={obstacleMaterial}
                        scale={[1.5, 1.5, 0.3]}
                        castShadow
                        receiveShadow
                    />
                </RigidBody>
            </group>
        </>
    );
};
