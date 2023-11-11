/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsLinker from '../../recipes/IsLinker';
import Linker from './Linker';
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
declare class LinkedList implements IsArrayable<Linker>, Iterable<Linker> {
    readonly classType: typeof LinkedList;
    innerList: Linker;
    initialized: boolean;
    /**
     * Create the new LinkedList instance.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
     * @return {LinkedList}
     */
    initialize(initialList: Linker): LinkedList;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {Linker}
     */
    get list(): IsLinker;
    /**
     * Retrieve the first Linker in the list.
     * @returns {Linker}
     */
    get first(): Linker;
    /**
     * Retrieve the last Linker in the list.
     * @returns {Linker}
     */
    get last(): Linker;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {Linker|*} node The existing node as reference
     * @param {Linker|*} newNode The new node to go after the existing node
     * @returns {LinkedList}
     */
    insertAfter(node: IsLinker, newNode: Linker | any): LinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param {Linker|*} node The existing node as reference
     * @param {Linker|*} newNode The new node to go before the existing node
     * @returns {LinkedList}
     */
    insertBefore(node: IsLinker, newNode: Linker | any): LinkedList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {Linker|*} node The new node to add to the end of the list
     * @param {Linker} after The existing last node
     * @returns {Linker}
     */
    append(node: Linker | any, after?: IsLinker): LinkedList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param {Linker|*} node The new node to add to the start of the list
     * @param {Linker} before The existing first node
     * @returns {Linker}
     */
    prepend(node: Linker | any, before?: IsLinker): LinkedList;
    /**
     * Remove a linker from this linked list.
     * @param {Linker} node The node we wish to remove (and it will be returned after removal)
     * @return {Linker}
     */
    remove(node: Linker): Linker;
    /**
     * Retrieve a Linker item from this list by numeric index, otherwise return null.
     * @param {number} index The integer number for retrieving a node by position.
     * @returns {Linker|null}
     */
    item(index: number): Linker | null;
    /**
     * Be able to run forEach on this LinkedList to iterate over the linkers.
     * @param {forEachCallback} callback The function to call for-each linker
     * @param {LinkedList} thisArg Optional, 'this' reference
     * @returns {LinkedList}
     */
    forEach(callback: forEachCallback, thisArg?: LinkedList): LinkedList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<Linker>;
    /**
     * Convert an array to a LinkedList.
     * @param {Array} values An array of values which will be converted to linkers in this linked-list
     * @param {IsLinker} linkerClass The class to use for each linker
     * @param {IsArrayable<Linker>} [classType=LinkedList] Provide the type of IsArrayable to use.
     * @returns {LinkedList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof Linker, classType?: any) => IsArrayable<IsLinker> | any;
}
export default LinkedList;
