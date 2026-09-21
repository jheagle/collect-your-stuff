import { IsDoubleLinker } from './IsDoubleLinker';
/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
export declare class DoubleLinkerIterator implements Iterator<IsDoubleLinker> {
    private current;
    /**
     * Create an iterator starting at the given item.
     * @param {IsDoubleLinker} current The item to start from.
     */
    constructor(current: IsDoubleLinker);
    /**
     * Get the current item and move on to the following one.
     * @param {*} [value] Not used, present to match the Iterator interface.
     * @return {IteratorResult<IsDoubleLinker>} The current item, or done when there are no more.
     */
    next(value?: any): IteratorResult<IsDoubleLinker>;
}
