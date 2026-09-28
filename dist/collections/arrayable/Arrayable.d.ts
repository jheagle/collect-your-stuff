/**
 * arrayable list.
 */
import { ArrayElement } from './ArrayElement';
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable';
import { IsElement } from '../../recipes/IsElement';
/**
 * Arrayable represents a collection stored as an array.
 */
export declare class Arrayable implements IsArrayable<ArrayElement>, Iterable<ArrayElement> {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof Arrayable;
    /** The array which stores the elements of this Arrayable. */
    innerList: Array<ArrayElement>;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    initialized: boolean;
    /** The class used to wrap the data given to this Arrayable as elements. */
    elementClass: typeof ArrayElement;
    /**
     * Create the new Arrayable instance, configure the Arrayable class.
     * @param elementClass The class used to wrap given data as elements.
     */
    constructor(elementClass?: typeof ArrayElement);
    /**
     * Find the position of an element which must be in this list.
     * @param node The element to find
     * @throws {Error} When the element is not in this list
     */
    private indexOfElement;
    /**
     * Initialize the inner list, should only run once.
     * @param initialList Give the array of elements to start in this Arrayable.
     */
    initialize(initialList: Array<ArrayElement>): Arrayable;
    /**
     * Retrieve the innerList used (the list itself, not a copy).
     */
    get list(): Array<ArrayElement>;
    /**
     * Retrieve the first Element from the Arrayable
     * @returns The first element, or null when the Arrayable is empty
     */
    get first(): ArrayElement | null;
    /**
     * Retrieve the last Element from the Arrayable
     * @returns The last element, or null when the Arrayable is empty
     */
    get last(): ArrayElement | null;
    /**
     * Return the length of the list.
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param node The existing node as reference, or null to insert at the start of the list
     * @param newNode The new node to go after the existing node
     * @throws {Error} When the reference node is not in this list
     */
    insertAfter(node: ArrayElement | null, newNode: ArrayElement | any): Arrayable;
    /**
     * Insert a new node (or data) before a node.
     * @param node The existing node as reference, or null to insert at the end of the list
     * @param newNode The new node to go before the existing node
     * @throws {Error} When the reference node is not in this list
     */
    insertBefore(node: ArrayElement | null, newNode: ArrayElement | any): Arrayable;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param node The new node to add to the end of the list
     * @param after The existing last node
     */
    append(node: ArrayElement | any, after?: ArrayElement | null): Arrayable;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param node The new node to add to the start of the list
     * @param before The existing first node
     */
    prepend(node: ArrayElement | any, before?: ArrayElement | null): Arrayable;
    /**
     * Remove an element from this arrayable.
     * @param node The node we wish to remove (and it will be returned after removal)
     * @returns The removed node, or null when it was not in this list (nothing is removed)
     */
    remove(node: ArrayElement): ArrayElement | null;
    /**
     * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
     * @param index The integer number for retrieving a node by position.
     */
    item(index: number): ArrayElement | null;
    /**
     * Be able to run forEach on this Arrayable to iterate over the elements.
     * @param callback The function to call for-each element
     * @param thisArg Optional, 'this' reference
     */
    forEach(callback: forEachCallback, thisArg?: Arrayable): Arrayable;
    /**
     * Be able to iterate over this class.
     */
    [Symbol.iterator](): Iterator<ArrayElement>;
    /**
     * Convert an array to an Arrayable.
     * @param values An array of values which will be converted to elements in this arrayable
     * @param elementClass The class to use for each element
     * @param classType Provide the type of IsArrayable to use.
     */
    static fromArray: (values?: Array<any>, elementClass?: typeof ArrayElement, classType?: any) => IsArrayable<IsElement>;
}
