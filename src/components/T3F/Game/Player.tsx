import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import useGameStore from '../../../stores/useGame';

export default function Player() {
    const body = useRef<RapierRigidBody>(null!!);
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();

    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

    const start = useGameStore((state) => state.start);
    const end = useGameStore((state) => state.end);
    const restart = useGameStore((state) => state.restart);
    const blocksCount = useGameStore((state) => state.blocksCount);

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }

        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }

        body.current.applyImpulse(impulse, true);
        body.current.applyTorqueImpulse(torque, true);

        /**
         * Camera
         */
        const bodyPosition = body.current.translation();

        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);

        /**
         * Phases
         */
        if (bodyPosition.z < -(blocksCount * 4 + 2)) {
            end();
        }

        if (bodyPosition.y < -4) {
            restart();
        }
    });

    const jump = () => {
        const origin = body.current.translation();
        origin.y -= 0.31;
        const direction = { x: 0, y: -1, z: 0 };
        const ray = new rapier.Ray(origin, direction);
        const hit = world.castRay(ray, 10, true);

        if (hit && hit?.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
        }
    };

    const reset = () => {
        body.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
        body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    };

    useEffect(() => {
        const unsubscribeReset = useGameStore.subscribe(
            (state) => state.phase,
            (value) => {
                console.log('phase change to ', value);
                if (value === 'ready') reset();
            },
        );

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) {
                    jump();
                }
            },
        );

        const unsubscribeAny = subscribeKeys(() => {
            start();
        });

        return () => {
            unsubscribeReset();
            unsubscribeJump();
            unsubscribeAny();
        };
    }, []);

    return (
        <>
            <RigidBody
                ref={body}
                colliders="ball"
                restitution={0.2}
                friction={1}
                linearDamping={0.5}
                angularDamping={0.5}
                position={[0, 1, 0]}
            >
                <mesh castShadow>
                    <icosahedronGeometry args={[0.3, 1]} />
                    <meshStandardMaterial flatShading color="mediumpurple" />
                </mesh>
            </RigidBody>
        </>
    );
}
