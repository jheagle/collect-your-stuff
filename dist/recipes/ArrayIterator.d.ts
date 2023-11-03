import ArrayElement from '../collections/arrayable/ArrayElement';
import IsElement from './IsElement';
/**
 * Class ArrayIterator returns the next value for Iterable classes.
 */
declare class ArrayIterator implements Iterator<IsElement<ArrayElement>> {
    private readonly innerList;
    private index;
    constructor(innerList: Array<IsElement<ArrayElement>>, index?: number);
    next(value?: any): IteratorResult<IsElement<ArrayElement>>;
}
export default ArrayIterator;
