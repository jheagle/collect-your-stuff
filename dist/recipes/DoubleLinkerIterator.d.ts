import IsDoubleLinker from './IsDoubleLinker';
/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
declare class DoubleLinkerIterator implements Iterator<IsDoubleLinker> {
    private current;
    constructor(current: IsDoubleLinker);
    next(value?: any): IteratorResult<IsDoubleLinker>;
}
export default DoubleLinkerIterator;
