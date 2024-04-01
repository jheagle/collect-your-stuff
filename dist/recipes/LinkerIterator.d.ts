import { IsLinker } from './IsLinker';
/**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
export declare class LinkerIterator implements Iterator<IsLinker> {
    private current;
    constructor(current: IsLinker);
    next(value?: any): IteratorResult<IsLinker>;
}
