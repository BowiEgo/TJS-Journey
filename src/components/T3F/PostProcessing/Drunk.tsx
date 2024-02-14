import { forwardRef } from 'react';
import DrunkEffect from './DrunkEffect';
import { BlendFunction } from 'postprocessing';
import { Color, ColorRepresentation } from 'three';

export interface DrunkProps {
    frequency?: number;
    amplitude?: number;
    color?: Color | ColorRepresentation;
    speed?: number;
    blendFunction?: BlendFunction;
}

export default forwardRef(function Drunk(props: DrunkProps, ref) {
    const effect = new DrunkEffect(props);

    return <primitive ref={ref} object={effect} />;
});
