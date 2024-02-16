import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { PageName, SwitchPage } from '..';
import { button, useControls } from 'leva';
import { useFrame, useThree } from '@react-three/fiber';
import {
    CuboidCollider,
    CylinderCollider,
    InstancedRigidBodies,
    InstancedRigidBodyProps,
    Physics,
    RapierRigidBody,
    RigidBody,
} from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useMemo, useRef } from 'react';

interface Props {
    switchPage: SwitchPage;
}

export default function PhysicsExperience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    useThree(({ camera }) => {
        camera.position.set(8, 2, 8);
    });

    const hamburger = useGLTF('assets/models/hamburger/hamburger.glb');

    // const [hitSound] = useState(
    //     () => new Audio('assets/sounds/mixkit-basketball-ball-hard-hit.wav'),
    // );

    const cube = useRef<RapierRigidBody>(null!!);
    const cubes = useRef<THREE.InstancedMesh>(null!!);
    const twister = useRef<RapierRigidBody>(null!!);

    const cubeJump = () => {
        const mass = cube.current.mass();
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
        cube.current.applyTorqueImpulse(
            { x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 },
            true,
        );
    };

    const collisionEnter = () => {
        // hitSound.currentTime = 0;
        // hitSound.volume = Math.random();
        // hitSound.play();
    };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const eulerRotation = new THREE.Euler(0, time * 3, 0);
        const quaternionRotation = new THREE.Quaternion();
        quaternionRotation.setFromEuler(eulerRotation);
        twister.current?.setNextKinematicRotation(quaternionRotation);

        const angle = time * 0.5;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        twister.current?.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
    });

    const cubesCount = 100;

    // useEffect(() => {
    //     for (let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4();
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1),
    //         );
    //         cubes.current.setMatrixAt(i, matrix);
    //     }
    // }, []);

    const cubesInstances = useMemo(() => {
        const instances: InstancedRigidBodyProps[] = [];
        const scale = 0.2 + Math.random() * 0.8;

        for (let i = 0; i < cubesCount; i++) {
            instances.push({
                key: 'instance_' + Math.random(),
                position: [(Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8],
                rotation: [Math.random(), Math.random(), Math.random()],
                scale: [scale, scale, scale],
            });
        }

        return instances;
    }, []);

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight />

            <Physics gravity={[0, -9.08, 0]}>
                <RigidBody colliders={'ball'} position={[-2, 1, 0]}>
                    <mesh castShadow>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={cube}
                    position={[1.5, 2, 0]}
                    gravityScale={1}
                    restitution={0}
                    friction={0.7}
                    colliders={false}
                    onCollisionEnter={collisionEnter}
                    onCollisionExit={() => {
                        console.log('exit');
                    }}
                    onSleep={() => {
                        console.log('sleep');
                    }}
                    onWake={() => {
                        console.log('wake');
                    }}
                >
                    <mesh castShadow onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                    <CuboidCollider mass={1} args={[0.5, 0.5, 0.5]} />
                </RigidBody>

                <RigidBody type="fixed" friction={0.7}>
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color="yellowgreen" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={twister}
                    position={[0, -0.8, 0]}
                    friction={0}
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>

                <RigidBody colliders={false} position={[0, 4, 0]}>
                    <primitive object={hamburger.scene} scale={0.16} position-y={-0.38} />
                    <CylinderCollider args={[0.32, 1.1]} />
                </RigidBody>

                <RigidBody type="fixed">
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
                </RigidBody>

                <InstancedRigidBodies instances={cubesInstances}>
                    <instancedMesh ref={cubes} castShadow args={[undefined, undefined, cubesCount]}>
                        <boxGeometry />
                        <meshStandardMaterial color="tomato" />
                    </instancedMesh>
                </InstancedRigidBodies>
            </Physics>
        </>
    );
}
