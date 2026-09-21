import { IsLinker } from './IsLinker';
/**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
export declare class LinkerIterator implements Iterator<IsLinker> {
    private current;
    /**
     * Create an iterator starting at the given item.
     * @param {IsLinker} current The item to start from.
     */
    constructor(current: IsLinker);
    /**
     * Get the current item and move on to the following one.
     * @param {*} [value] Not used, present to match the Iterator interface.
     * @return {IteratorResult<IsLinker>} The current item, or done when there are no more.
     */
    next(value?: any): IteratorResult<IsLinker>;
}
