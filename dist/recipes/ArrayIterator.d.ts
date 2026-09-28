import { IsElement } from './IsElement';
/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
export declare class ArrayIterator implements Iterator<IsElement> {
    private readonly innerList;
    private index;
    /**
     * Create an iterator over the given array.
     * @param innerList The elements to iterate over.
     * @param index The position to start from.
     */
    constructor(innerList: Array<IsElement>, index?: number);
    /**
     * Get the next element, moving the iterator forward.
     * @param value Not used, present to match the Iterator interface.
     * @returns The next element, or done when there are no more.
     */
    next(value?: any): IteratorResult<IsElement>;
}
