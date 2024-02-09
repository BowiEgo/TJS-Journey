import { StageName } from '../../stages/type';

/**
 * @param val {@link StageName}
 */
type ChangeFunc = (val: StageName) => void;

interface Selector {
    /**
     * @method change (val: {@link StageName}) => void
     */
    change: ChangeFunc;
}

interface Props {}
