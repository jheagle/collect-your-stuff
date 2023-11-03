import IsElement from './IsElement';
/**
 * Class LinkerIterator returns the next value for Iterable classes.
 */
declare class LinkerIterator implements Iterator<IsElement<any>> {
    private current;
    constructor(current: IsElement<any>);
    next(value?: any): IteratorResult<IsElement<any>>;
}
export default LinkerIterator;
