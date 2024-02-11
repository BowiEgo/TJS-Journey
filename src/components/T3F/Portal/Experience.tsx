import * as THREE from 'three';
import {
    Center,
    OrbitControls,
    Sparkles,
    shaderMaterial,
    useGLTF,
    useTexture,
} from '@react-three/drei';
import { PageName, SwitchPage } from '..';
import { button, useControls } from 'leva';
import portalVertexShader from '../../../shaders/portal/vertex.glsl';
import portalFragmentShader from '../../../shaders/portal/fragment.glsl';
import { ReactThreeFiber, extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface Props {
    switchPage: SwitchPage;
}

interface PortalMaterial extends THREE.ShaderMaterial {
    uTime: number;
    uColorStart: THREE.Color;
    uColorEnd: THREE.Color;
}

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ebecff'),
        uColorEnd: new THREE.Color('#ffffff'),
    },
    portalVertexShader,
    portalFragmentShader,
);

extend({ PortalMaterial });

/**
 * https://github.com/pmndrs/react-three-fiber/issues/130
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            portalMaterial: ReactThreeFiber.Object3DNode<PortalMaterial, typeof PortalMaterial>;
        }
    }
}

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    const { nodes } = useGLTF('/assets/scenes/portal/portal.glb');
    const bakedTexture = useTexture('/assets/scenes/portal/baked.jpg');
    const portalMaterial = useRef<PortalMaterial>(null!!);

    useFrame((_state, delta) => {
        portalMaterial.current.uTime += delta;
    });

    return (
        <>
            <color args={['#030202']} attach="background" />

            <OrbitControls makeDefault />

            <Center>
                <mesh geometry={(nodes.baked as THREE.Mesh).geometry}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
                <mesh
                    geometry={(nodes.poleLightA as THREE.Mesh).geometry}
                    position={(nodes.poleLightA as THREE.Mesh).position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={(nodes.poleLightB as THREE.Mesh).geometry}
                    position={(nodes.poleLightB as THREE.Mesh).position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={(nodes.portalLight as THREE.Mesh).geometry}
                    position={(nodes.portalLight as THREE.Mesh).position}
                    rotation={(nodes.portalLight as THREE.Mesh).rotation}
                >
                    <portalMaterial ref={portalMaterial} side={THREE.DoubleSide} />
                </mesh>

                <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
            </Center>
        </>
    );
}
