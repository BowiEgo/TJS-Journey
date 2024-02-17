import { button, useControls } from 'leva';
import { PageName, SwitchPage } from '..';
// import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Light from './Light';
import { Level } from './Level';
import { Physics } from '@react-three/rapier';
import Player from './Player';
import useGameStore from '../../../stores/useGame';
import Effects from './Effects';

interface Props {
    switchPage: SwitchPage;
}

export default function GameExperience({ switchPage }: Props) {
    useControls('pages', {
        SwitchToThreeJS: button(() => switchPage(PageName.nativeThreeJS)),
    });

    useThree(({ camera }) => {
        camera.position.set(4, 3, 8);
        camera.lookAt(0, 0, 0);
    });

    const blocksCount = useGameStore((state) => state.blocksCount);
    const blocksSeed = useGameStore((state) => state.blocksSeed);

    return (
        <>
            <color args={['#252731']} attach="background" />

            <Physics>
                <Light />
                <Level count={blocksCount} seed={blocksSeed} />
                <Player />
            </Physics>

            <Effects />
        </>
    );
}
