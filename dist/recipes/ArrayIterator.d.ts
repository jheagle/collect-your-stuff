import { IsElement } from './IsElement';
/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
export declare class ArrayIterator implements Iterator<IsElement> {
    private readonly innerList;
    private index;
    constructor(innerList: Array<IsElement>, index?: number);
    next(value?: any): IteratorResult<IsElement>;
}
