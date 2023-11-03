/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
import Linker from './Linker';
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 */
declare class LinkedList implements IsArrayable<LinkedList>, Iterable<IsElement<Linker>> {
    readonly classType: typeof LinkedList;
    innerList: IsElement<Linker>;
    initialized: boolean;
    /**
     * Create the new LinkedList instance, configure the Linker and List classes.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {Linker|Array} initialList
     * @return {LinkedList}
     */
    initialize(initialList: Linker): LinkedList;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {Linker}
     */
    get list(): IsElement<Linker>;
    /**
     * Retrieve the first Linker in the list.
     * @returns {Linker}
     */
    get first(): IsElement<Linker>;
    /**
     * Retrieve the last Linker in the list.
     * @returns {Linker}
     */
    get last(): IsElement<Linker>;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {Linker|*} node
     * @param {Linker|*} newNode
     * @returns {LinkedList}
     */
    insertAfter(node: IsElement<Linker>, newNode: Linker | any): LinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param {Linker|*} node
     * @param {Linker|*} newNode
     * @returns {LinkedList}
     */
    insertBefore(node: IsElement<Linker>, newNode: Linker | any): LinkedList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {Linker|*} node
     * @param {Linker} after
     * @returns {Linker}
     */
    append(node: Linker | any, after?: IsElement<Linker>): LinkedList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @method
     * @param {Linker|*} node
     * @param {Linker} before
     * @returns {Linker}
     */
    prepend(node: Linker | any, before?: IsElement<Linker>): LinkedList;
    /**
     * Remove a linker from this linked list.
     * @method
     * @param {Linker} node
     * @return {Linker}
     */
    remove(node: Linker): Linker;
    /**
     * Retrieve a Linker item from this list by numeric index, otherwise return null.
     * @param {number} index
     * @returns {Linker|null}
     */
    item(index: number): IsElement<Linker> | null;
    /**
     * Be able to run forEach on this LinkedList to iterate over the linkers.
     * @param {forEachCallback} callback
     * @param {LinkedList} thisArg
     * @returns {LinkedList}
     */
    forEach(callback: forEachCallback, thisArg?: LinkedList): LinkedList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<IsElement<Linker>>;
    /**
     * Convert an array to a LinkedList.
     * @param {Array} values
     * @param {Linker} linkerClass
     * @returns {LinkedList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof Linker) => IsArrayable<LinkedList>;
}
export default LinkedList;
