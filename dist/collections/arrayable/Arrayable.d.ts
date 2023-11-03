/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from './ArrayElement';
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
/**
 * Arrayable represents a collection stored as an array.
 */
declare class Arrayable implements IsArrayable<Arrayable>, Iterable<IsElement<ArrayElement>> {
    readonly classType: typeof Arrayable;
    innerList: Array<IsElement<ArrayElement>>;
    initialized: boolean;
    /**
     * Create the new Arrayable instance, configure the Arrayable class.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {ArrayElement|Array} initialList
     * @return {Arrayable}
     */
    initialize(initialList: Array<IsElement<ArrayElement>>): Arrayable;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {Array}
     */
    get list(): Array<IsElement<ArrayElement>>;
    /**
     * Retrieve the first Element from the Arrayable
     * @returns {ArrayElement}
     */
    get first(): IsElement<ArrayElement>;
    /**
     * Retrieve the last Element from the Arrayable
     * @returns {ArrayElement}
     */
    get last(): IsElement<ArrayElement>;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {ArrayElement|*} node
     * @param {ArrayElement|*} newNode
     * @returns {Arrayable}
     */
    insertAfter(node: IsElement<ArrayElement>, newNode: ArrayElement | any): Arrayable;
    /**
     * Insert a new node (or data) before a node.
     * @param {ArrayElement|*} node
     * @param {ArrayElement|*} newNode
     * @returns {Arrayable}
     */
    insertBefore(node: IsElement<ArrayElement>, newNode: ArrayElement | any): Arrayable;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {ArrayElement|*} node
     * @param {ArrayElement} after
     * @returns {Arrayable}
     */
    append(node: ArrayElement | any, after?: IsElement<ArrayElement>): Arrayable;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param {ArrayElement|*} node
     * @param {ArrayElement} before
     * @returns {Arrayable}
     */
    prepend(node: ArrayElement | any, before?: IsElement<ArrayElement>): Arrayable;
    /**
     * Remove an element from this arrayable.
     * @param {ArrayElement} node
     * @return {ArrayElement}
     */
    remove(node: ArrayElement): ArrayElement;
    /**
     * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
     * @param {number} index
     * @return {ArrayElement|null}
     */
    item(index: number): IsElement<ArrayElement> | null;
    /**
     * Be able to run forEach on this Arrayable to iterate over the elements.
     * @param {forEachCallback} callback
     * @param {Arrayable} thisArg
     * @returns {Arrayable}
     */
    forEach(callback: forEachCallback, thisArg?: Arrayable): Arrayable;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<IsElement<ArrayElement>>;
    /**
     * Convert an array to an Arrayable.
     * @param {Array} values
     * @param {ArrayElement} elementClass
     * @returns {Arrayable}
     */
    static fromArray: (values?: Array<any>, elementClass?: typeof ArrayElement) => IsArrayable<Arrayable>;
}
export default Arrayable;
