import { CameraControls, Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { PageName, SwitchPage } from '../../../App';
import { button, useControls } from 'leva';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface Props {
    switchPage: SwitchPage;
}

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    // const [torusGeometry, setTorusGeomety] = useState(null!!);
    // const [material, setMaterial] = useState(null!!);

    const donuts = useRef<(THREE.Mesh | null)[]>([]);

    const [matcapTexture] = useMatcapTexture('B6B8B1_994A24_315C81_927963', 256);

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
        matcapTexture.needsUpdate = true;

        material.matcap = matcapTexture;
        material.needsUpdate = true;
    }, []);

    const v = new THREE.Vector3();
    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        state.camera.position.lerp(v.set(Math.sin(t * 0.5) * 5, 0, Math.cos(t * 0.5) * 5), 0.5);
        state.camera.position.z = 10;
        state.camera.lookAt(0, 0, 0);

        for (const donut of donuts.current) {
            if (donut) donut.rotation.y += delta * 0.1;
        }
    });

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <CameraControls />

            {/* <torusGeometry
                ref={setTorusGeomety as unknown as Ref<TorusGeometry>}
                args={[1, 0.6, 16, 32]}
            />
            <meshMatcapMaterial
                ref={setMaterial as unknown as Ref<MeshMatcapMaterial>}
                matcap={matcapTexture}
            /> */}

            <Center>
                <Text3D
                    material={material}
                    font={'assets/fonts/helvetiker_regular.typeface.json'}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    HELLO R3F
                </Text3D>
            </Center>

            <group>
                {[...Array(100)].map((_value, index) => (
                    <mesh
                        ref={(element) => (donuts.current[index] = element)}
                        key={index}
                        geometry={torusGeometry}
                        material={material}
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                    ></mesh>
                ))}
            </group>
        </>
    );
}
