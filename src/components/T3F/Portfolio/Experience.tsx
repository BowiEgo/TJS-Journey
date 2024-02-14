import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '..';
import {
    ContactShadows,
    Environment,
    Float,
    Html,
    PresentationControls,
    Text,
    useGLTF,
} from '@react-three/drei';
import './style.css';

interface Props {
    switchPage: SwitchPage;
}

export default function PortfolioExperience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    return (
        <>
            <Environment preset="city" />

            <color args={['#695b5b']} attach="background" />

            <PresentationControls
                global
                rotation={[-0.09, 1.4, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >
                <Float rotationIntensity={0.4}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#ff6900'}
                        rotation={[-0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />
                    <Computer position-y={-1.2} />
                    <Text
                        font="assets/fonts/bangers-v24-latin-regular.woff"
                        fontSize={1}
                        position={[2, 0.75, 0.75]}
                        rotation-y={-1.25}
                        maxWidth={2}
                        textAlign="center"
                    >
                        BRUNO SIMON
                    </Text>
                </Float>
            </PresentationControls>

            <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
        </>
    );
}

function Computer(props: object) {
    const computer = useGLTF(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf',
    );

    return (
        <primitive object={computer.scene} {...props}>
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.17}
                position={[0, 1.56, -1.4]}
                rotation-x={-0.256}
            >
                <iframe src="https://bruno-simon.com/html/" />
            </Html>
        </primitive>
    );
}
