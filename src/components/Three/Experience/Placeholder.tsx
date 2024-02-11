import * as THREE from 'three';

interface Props {
    scale: number | THREE.Vector3Tuple;
    'position-y': number;
}

export default function Placeholder(props: Props) {
    return (
        <mesh {...props}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]}></boxGeometry>
            <meshBasicMaterial wireframe color="red"></meshBasicMaterial>
        </mesh>
    );
}
