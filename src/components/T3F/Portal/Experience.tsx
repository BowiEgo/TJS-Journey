import { OrbitControls } from '@react-three/drei';
import { PageName, SwitchPage } from '..';
import { button, useControls } from 'leva';

interface Props {
    switchPage: SwitchPage;
}

export default function Experience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    return (
        <>
            <color args={['#030202']} attach="background" />

            <OrbitControls makeDefault />

            <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    );
}
