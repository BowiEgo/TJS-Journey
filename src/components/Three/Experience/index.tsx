import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import {
    // AccumulativeShadows,
    // ContactShadows,
    // Environment,
    // BakeShadows,
    // Float,
    // Html,
    // Lightformer,
    OrbitControls,
    // RandomizedLight,
    // Sky,
    // SoftShadows,
    // PivotControls,
    // Text,
    // TransformControls,
    useHelper,
} from '@react-three/drei';
import './style.css';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { PageName, SwitchPage } from '../../../App';
import Porsche from './Porsche';

interface Props {
    switchPage: SwitchPage;
}

export default function Experience({ switchPage }: Props) {
    const directionalLight = useRef<THREE.DirectionalLight>(null!);
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

    // const sphere = useRef<THREE.Mesh>(null!);
    // const cube = useRef<THREE.Mesh>(null!);
    // const group = useRef<THREE.Group>(null!);

    useFrame((_state, _delta) => {
        // const time = state.clock.elapsedTime;
        // const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);
        // cube.current.position.x = 2 + Math.sin(time);
        // cube.current.rotation.y += delta * 0.2;
        // groupRef.current.rotation.y += delta;
    });

    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    const { perfVisible } = useControls({
        perfVisible: true,
    });

    // const { controlsVisible } = useControls({
    //     controlsVisible: false,
    // });

    // const { shadowColor, shadowOpacity, shadowBlur } = useControls('contact shadow', {
    //     shadowColor: '#000000',
    //     shadowOpacity: { value: 0.4, min: 0, max: 1 },
    //     shadowBlur: { value: 2.8, min: 0, max: 10 },
    // });

    // const { sunPosition } = useControls('sky', {
    //     sunPosition: { value: [1, 2, 3] },
    // });

    // const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
    //     'environment map',
    //     {
    //         envMapIntensity: { value: 1, min: 0, max: 12 },
    //         envMapHeight: { value: 7, min: 0, max: 100 },
    //         envMapRadius: { value: 20, min: 10, max: 1000 },
    //         envMapScale: { value: 100, min: 10, max: 1000 },
    //     },
    // );

    // const { position, color, visible } = useControls('sphere', {
    //     position: {
    //         value: { x: -2, y: 4 },
    //         step: 0.01,
    //         joystick: 'invertY',
    //     },
    //     color: 'orange',
    //     visible: true,
    //     myInterval: {
    //         min: 0,
    //         max: 10,
    //         value: [4, 5],
    //     },
    //     choice: { options: ['a', 'b', 'c'] },
    // });

    // const { scale } = useControls('cube', {
    //     scale: {
    //         value: 1.5,
    //         step: 0.01,
    //         min: 0,
    //         max: 5,
    //     },
    // });

    return (
        <>
            {/* <SoftShadows /> */}
            {/* <BakeShadows /> */}
            {/* 
            <Environment
                // background
                preset="sunset"
                ground={{
                    height: envMapHeight,
                    radius: envMapRadius,
                    scale: envMapScale,
                }}
                // resolution={32}
                // files={'assets/textures/environmentMaps/HDRIs/meadow_4k.hdr'}
            > */}
            {/* <color args={['#000000']} attach="background" /> */}
            {/* <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> */}
            {/* <mesh position-z={-5} scale={10}>
                    <planeGeometry />
                    <meshBasicMaterial color={[10, 0, 0]} />
                </mesh> */}
            {/* </Environment> */}

            {/* <color args={['ivory']} attach="background" /> */}

            {perfVisible ? <Perf position="top-left" /> : null}

            <OrbitControls makeDefault />
            {/* 
            <AccumulativeShadows
                position={[0, -0.99, 0]}
                scale={10}
                color="#316d39"
                opacity={0.8}
                frames={Infinity}
                temporal
                blend={100}
            >
                <RandomizedLight
                    amount={8}
                    radius={1}
                    ambient={0.5}
                    intensity={1}
                    position={[1, 2, 3]}
                    bias={0.001}
                />
            </AccumulativeShadows> */}

            {/* <ContactShadows
                position={[0, 0, 0]}
                scale={10}
                resolution={512}
                far={5}
                color={shadowColor}
                opacity={shadowOpacity}
                blur={shadowBlur}
                frames={1} // bake contact shadow
            /> */}

            {/* <directionalLight
                ref={directionalLight}
                position={sunPosition}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={0.5} /> */}

            {/* <Sky sunPosition={sunPosition} /> */}

            {/* <group ref={group}> */}
            {/* <PivotControls
                    anchor={[0, 0, 0]}
                    depthTest={false}
                    lineWidth={4}
                    axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                    scale={100}
                    fixed={true}
                > */}
            {/* <mesh castShadow ref={sphere} position={[position.x, 1, 0]} visible={visible}>
                    <sphereGeometry /> */}
            {/* <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} /> */}
            {/* <Html
                        position={[1, 1, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                        occlude={[sphere, cube]}
                    >
                        There's a sphere 👍
                    </Html> */}
            {/* </mesh> */}
            {/* </PivotControls> */}

            {/* <mesh castShadow ref={cube} position-y={1} position-x={2} scale={scale}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
                </mesh> */}
            {/* {controlsVisible && <TransformControls object={cube} mode="translate" />} */}
            {/* </group> */}

            {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
                <MeshReflectorMaterial
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={0.5}
                    color="greenyellow"
                />
            </mesh> */}

            {/* <CustomObject /> */}

            {/* <Float speed={5} floatIntensity={2}>
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
            </Float> */}

            {/* <Stage
                shadows={{ type: 'contact', opacity: 0.8, blur: 3, position: [0, 0.01, 0] }}
                environment="sunset"
                preset="portrait"
                intensity={2}
            >
                <mesh castShadow ref={sphere} position={[position.x, 1, 0]} visible={visible}>
                    <sphereGeometry />
                    <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
                </mesh>

                <mesh castShadow ref={cube} position-y={1} position-x={2} scale={scale}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
                </mesh>
            </Stage> */}

            <Porsche switchPage={switchPage} />
        </>
    );
}
