import { useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect } from 'react';

export default function Fox() {
    const fox = useGLTF('/assets/models/fox/glTF/Fox.gltf');
    const animation = useAnimations(fox.animations, fox.scene);

    const { animationName } = useControls({
        animationName: { options: ['Survey', 'Walk', 'Run'] },
    });

    useEffect(() => {
        const action = animation.actions[animationName];
        action?.reset().fadeIn(0.5).play();

        return () => {
            action?.fadeOut(0.5);
        };
    }, [animationName]);

    return (
        <primitive object={fox.scene} scale={0.02} position={[-2.5, -1, 2.5]} rotation-y={0.3} />
    );
}
