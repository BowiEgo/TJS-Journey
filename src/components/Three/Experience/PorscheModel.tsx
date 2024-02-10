import { useGLTF } from '@react-three/drei';
import { applyProps } from '@react-three/fiber';
import { Instance } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { useLayoutEffect } from 'react';

interface Props {
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
}

export default function PorscheModel(props: Props) {
    const { scene, nodes, materials } = useGLTF('assets/models/911/911-transformed.glb');
    useLayoutEffect(() => {
        Object.values(nodes).forEach(
            (node) => (node as any).isMesh && (node.receiveShadow = node.castShadow = true),
        );
        applyProps((materials as Instance).rubber, {
            color: '#222',
            roughness: 0.6,
            roughnessMap: null,
            normalScale: [4, 4],
        });
        applyProps((materials as Instance).window, {
            color: 'black',
            roughness: 0,
            clearcoat: 0.1,
        });
        applyProps((materials as Instance).coat, {
            envMapIntensity: 4,
            roughness: 0.5,
            metalness: 1,
        });
        applyProps((materials as Instance).paint, {
            envMapIntensity: 2,
            roughness: 0.45,
            metalness: 0.8,
            color: '#555',
        });
    }, [nodes, materials]);

    return <primitive object={scene} {...props} />;
}
