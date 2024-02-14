import { useRef } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, meshBounds } from '@react-three/drei';
import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '..';
import {
    DepthOfField,
    EffectComposer,
    SSR,
    Glitch,
    Noise,
    Vignette,
    Bloom,
} from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import Drunk from './Drunk';
import { BlendFunction, Effect, GlitchMode } from 'postprocessing';

interface Props {
    switchPage: SwitchPage;
}

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    const vignetteProps = useControls('Vignette', { enable: false });
    const glitchProps = useControls('Glitch', { enable: false });
    const noiseProps = useControls('Noise', { enable: false });
    const bloomProps = useControls('Bloom', { enable: false });
    const depthOfFieldProps = useControls('DepthOfField', { enable: false });

    const ssrProps = useControls('SSR', {
        enable: false,
        temporalResolve: true,
        STRETCH_MISSED_RAYS: true,
        USE_MRT: true,
        USE_NORMALMAP: true,
        USE_ROUGHNESSMAP: true,
        ENABLE_JITTERING: true,
        ENABLE_BLUR: true,
        temporalResolveMix: { value: 0.9, min: 0, max: 1 },
        temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
        maxSamples: { value: 0, min: 0, max: 1 },
        resolutionScale: { value: 1, min: 0, max: 1 },
        blurMix: { value: 0.5, min: 0, max: 1 },
        blurKernelSize: { value: 8, min: 0, max: 8 },
        blurSharpness: { value: 0.5, min: 0, max: 1 },
        rayStep: { value: 0.3, min: 0, max: 1 },
        intensity: { value: 1, min: 0, max: 5 },
        maxRoughness: { value: 0.1, min: 0, max: 1 },
        jitter: { value: 0.7, min: 0, max: 5 },
        jitterSpread: { value: 0.45, min: 0, max: 1 },
        jitterRough: { value: 0.1, min: 0, max: 1 },
        roughnessFadeOut: { value: 1, min: 0, max: 1 },
        rayFadeOut: { value: 0, min: 0, max: 1 },
        MAX_STEPS: { value: 20, min: 0, max: 20 },
        NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
        maxDepthDifference: { value: 3, min: 0, max: 10 },
        maxDepth: { value: 1, min: 0, max: 1 },
        thickness: { value: 10, min: 0, max: 10 },
        ior: { value: 1.45, min: 0, max: 2 },
    });

    const cube = useRef<THREE.Mesh>(null!!);
    const drunk = useRef<Effect>(null!!);

    const drunkProps = useControls('Drunk Effect', {
        frequency: { value: 2, min: 1, max: 20 },
        amplitude: { value: 0.1, min: 0, max: 1 },
        speed: { value: 1, min: 0, max: 20 },
        color: { value: 'tan' },
    });

    useFrame((_state, delta) => {
        cube.current.rotation.y += delta * 0.2;
    });

    return (
        <>
            <color args={['#ffffff']} attach="background" />

            <EffectComposer>
                <>
                    {vignetteProps.enable && (
                        <Vignette
                            offset={0.3}
                            darkness={0.9}
                            blendFunction={BlendFunction.NORMAL}
                        />
                    )}
                </>
                <>
                    {glitchProps.enable && (
                        <Glitch
                            delay={new THREE.Vector2(0.5, 1)}
                            duration={new THREE.Vector2(0.1, 0.3)}
                            strength={new THREE.Vector2(0.02, 0.04)}
                            mode={GlitchMode.CONSTANT_WILD}
                        />
                    )}
                </>
                <>
                    {noiseProps.enable && (
                        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
                    )}
                </>
                <>
                    {bloomProps.enable && (
                        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
                    )}
                </>
                <>
                    {depthOfFieldProps.enable && (
                        <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} />
                    )}
                </>
                <>{ssrProps.enable && <SSR {...ssrProps} />}</>
                <Drunk ref={drunk} {...drunkProps} blendFunction={BlendFunction.DARKEN} />
            </EffectComposer>

            <OrbitControls makeDefault />

            <Perf position="top-left" />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={1.5} />

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
                {/* A tone mapping is applied by default and it'll clamp the colors between 0 and 1 */}
                {/* <meshBasicMaterial color={[1.5 * 10, 2 * 10, 1 * 10]} toneMapped={false} /> */}
            </mesh>

            <mesh position-y={0} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="#000000" metalness={0} roughness={0} />
            </mesh>
        </>
    );
}
