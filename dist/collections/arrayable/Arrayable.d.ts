/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from './ArrayElement';
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
/**
 * Arrayable represents a collection stored as an array.
 */
declare class Arrayable implements IsArrayable<ArrayElement>, Iterable<ArrayElement> {
    readonly classType: typeof Arrayable;
    innerList: Array<ArrayElement>;
    initialized: boolean;
    elementClass: typeof ArrayElement;
    /**
     * Create the new Arrayable instance, configure the Arrayable class.
     */
    constructor(elementClass?: typeof ArrayElement);
    /**
     * Initialize the inner list, should only run once.
     * @param {Array<ArrayElement>} initialList Give the array of elements to start in this Arrayable.
     * @return {Arrayable}
     */
    initialize(initialList: Array<ArrayElement>): Arrayable;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {Array<ArrayElement>}
     */
    get list(): Array<ArrayElement>;
    /**
     * Retrieve the first Element from the Arrayable
     * @returns {ArrayElement}
     */
    get first(): ArrayElement;
    /**
     * Retrieve the last Element from the Arrayable
     * @returns {ArrayElement}
     */
    get last(): ArrayElement;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {ArrayElement|*} node The existing node as reference
     * @param {ArrayElement|*} newNode The new node to go after the existing node
     * @returns {Arrayable}
     */
    insertAfter(node: ArrayElement, newNode: ArrayElement | any): Arrayable;
    /**
     * Insert a new node (or data) before a node.
     * @param {ArrayElement|*} node The existing node as reference
     * @param {ArrayElement|*} newNode The new node to go before the existing node
     * @returns {Arrayable}
     */
    insertBefore(node: ArrayElement, newNode: ArrayElement | any): Arrayable;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {ArrayElement|*} node The new node to add to the end of the list
     * @param {ArrayElement} after The existing last node
     * @returns {Arrayable}
     */
    append(node: ArrayElement | any, after?: ArrayElement): Arrayable;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param {ArrayElement|*} node The new node to add to the start of the list
     * @param {ArrayElement} before The existing first node
     * @returns {Arrayable}
     */
    prepend(node: ArrayElement | any, before?: ArrayElement): Arrayable;
    /**
     * Remove an element from this arrayable.
     * @param {ArrayElement} node The node we wish to remove (and it will be returned after removal)
     * @return {ArrayElement}
     */
    remove(node: ArrayElement): ArrayElement;
    /**
     * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
     * @param {number} index The integer number for retrieving a node by position.
     * @return {ArrayElement|null}
     */
    item(index: number): ArrayElement | null;
    /**
     * Be able to run forEach on this Arrayable to iterate over the elements.
     * @param {forEachCallback} callback The function to call for-each element
     * @param {Arrayable} thisArg Optional, 'this' reference
     * @returns {Arrayable}
     */
    forEach(callback: forEachCallback, thisArg?: Arrayable): Arrayable;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<ArrayElement>;
    /**
     * Convert an array to an Arrayable.
     * @param {Array} values An array of values which will be converted to elements in this arrayable
     * @param {IsElement} [elementClass=ArrayElement] The class to use for each element
     * @param {IsArrayable<ArrayElement>} [classType=Arrayable] Provide the type of IsArrayable to use.
     * @returns {Arrayable}
     */
    static fromArray: (values?: Array<any>, elementClass?: typeof ArrayElement, classType?: any) => IsArrayable<IsElement>;
}
export default Arrayable;
