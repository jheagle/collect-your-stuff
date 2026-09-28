import { IsElement } from './IsElement';
export type forEachCallback = (element: IsElement, index?: number, thisArg?: IsArrayable<any>) => void;
/**
 * Arrayable represents a collection stored as Elements.
 */
export interface IsArrayable<T extends IsElement> {
    /**
     * Obnoxious typescript won't let me use typeof this class
     * @property {IsArrayable} classType
     */
    classType: any;
    /**
     * @property {Array<IsElement> | IsElement | null} innerList
     */
    innerList: Array<T> | T | null;
    /**
     * @private {boolean} initialized
     */
    initialized: boolean;
    /**
     * Initialize the inner list, should only run once.
     * @param initialList
     */
    initialize(initialList: Array<T> | T): IsArrayable<any>;
    /**
     * Retrieve a copy of the innerList used.
     */
    get list(): Array<IsElement> | IsElement;
    /**
     * Retrieve the first Element from the Arrayable
     */
    get first(): T;
    /**
     * Retrieve the last Element from the Arrayable
     */
    get last(): T;
    /**
     * Return the length of the list.
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param node
     * @param newNode
     */
    insertAfter(node: T, newNode: T | any): IsArrayable<any>;
    /**
     * Insert a new node (or data) before a node.
     * @param node
     * @param newNode
     */
    insertBefore(node: T, newNode: T | any): IsArrayable<any>;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param node
     * @param after
     */
    append(node: T | any, after?: T): IsArrayable<any>;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param node
     * @param before
     */
    prepend(node: T | any, before?: T): IsArrayable<any>;
    /**
     * Remove an element from this arrayable.
     * @param node
     */
    remove(node: T): T;
    /**
     * Retrieve an element item from this list by numeric index, otherwise return null.
     * @param index
     */
    item(index: number): T | null;
    /**
     * Be able to run forEach on this Arrayable to iterate over the elements.
     * @param callback
     * @param thisArg
     */
    forEach(callback: forEachCallback, thisArg?: IsArrayable<any>): IsArrayable<any>;
    /**
     * Be able to iterate over this class.
     */
    [Symbol.iterator](): Iterator<T>;
}
