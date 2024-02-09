import { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Stages, { stageNames } from '../../stages';
import { ChangeFunc, Props, Selector } from './type';
import { StageName } from '../../stages/type';

const handleSelectChange: ChangeFunc = (val) => {
    if (!stageNames.includes(val)) {
        throw new Error(`there's no stage called ${val}`!);
    }

    const stageName = val[0].toUpperCase() + val.slice(1) + 'Stage';

    window.core.destroyStage();
    if (Stages.hasOwnProperty(stageName)) {
        window.core.createStage(new Stages[stageName]());
    } else {
        throw new Error(`there's no stage called ${val}`!);
    }
};

const StageSelector = forwardRef(function (props: Props, ref: Ref<Selector>) {
    const [current, setCurrent] = useState('basic');
    const selectRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            change: (val) => {
                setCurrent(val);
                handleSelectChange(val);
            },
        };
    });

    return (
        <select
            {...props}
            title="stage"
            name="SelectStage"
            className="select"
            value={current}
            onChange={(e) => handleSelectChange(e.target.value as StageName)}
            ref={selectRef}
        >
            {stageNames.map((stageName) => (
                <option key={stageName} value={stageName}>
                    {stageName[0].toUpperCase() + stageName.slice(1)}
                </option>
            ))}
        </select>
    );
});

export default StageSelector;
