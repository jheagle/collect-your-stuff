/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable';
import { IsLinker } from '../../recipes/IsLinker';
import { Linker } from './Linker';
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
export declare class LinkedList implements IsArrayable<Linker>, Iterable<Linker> {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof LinkedList;
    /** The first linker of the list (null when the list is empty), from which the whole list is reached. */
    innerList: Linker;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    initialized: boolean;
    /** The class used to wrap the data given to this list as linkers. */
    linkerClass: typeof Linker;
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    private tailCache;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    private countCache;
    /**
     * Create the new LinkedList instance.
     * @param {Linker} [linkerClass=Linker] The class used to wrap given data as linkers.
     */
    constructor(linkerClass?: typeof Linker);
    /**
     * Initialize the inner list, should only run once.
     * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
     * @return {LinkedList}
     */
    initialize(initialList: Linker): LinkedList;
    /**
     * Retrieve the innerList used (the list itself, not a copy).
     * @returns {Linker}
     */
    get list(): IsLinker;
    /**
     * Retrieve the first Linker in the list.
     * @returns {Linker}
     */
    get first(): Linker;
    /**
     * Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.
     * @returns {Linker}
     */
    get last(): Linker | null;
    /**
     * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
     * (call reset() after linkers were changed directly).
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {Linker|*} node The existing node as reference, or null to insert at the start of the list
     * @param {Linker|*} newNode The new node to go after the existing node
     * @returns {LinkedList}
     */
    insertAfter(node: IsLinker | null, newNode: Linker | any): LinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param {Linker|*} node The existing node as reference, or null to insert at the end of the list
     * @param {Linker|*} newNode The new node to go before the existing node
     * @returns {LinkedList}
     * @throws {Error} When the reference node is not in this list
     */
    insertBefore(node: IsLinker | null, newNode: Linker | any): LinkedList;
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
     * @return {Linker|null} The removed node, or null when it was not in this list (nothing is removed)
     */
    remove(node: Linker | null): Linker | null;
    /**
     * Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
     * so this is only needed after linkers were changed directly (for example by setting next on a linker).
     * @return {Linker|null} The first linker of the list
     */
    reset(): Linker | null;
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
