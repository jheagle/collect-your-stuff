/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { DoubleLinker } from './DoubleLinker';
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable';
import { IsDoubleLinker } from '../../recipes/IsDoubleLinker';
/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
export declare class DoublyLinkedList implements IsArrayable<DoubleLinker>, Iterable<DoubleLinker> {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof DoublyLinkedList;
    /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
    innerList: DoubleLinker;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    initialized: boolean;
    /** The class used to wrap the data given to this list as linkers. */
    linkerClass: typeof DoubleLinker;
    /**
     * Create the new DoublyLinkedList instance.
     * @param {DoubleLinker} [linkerClass=DoubleLinker] The class used to wrap given data as linkers.
     */
    constructor(linkerClass?: typeof DoubleLinker);
    /**
     * Initialize the inner list, should only run once.
     * @param {DoubleLinker} initialList Give the list of double-linkers to start in this doubly linked-list.
     * @return {DoublyLinkedList}
     */
    initialize(initialList: DoubleLinker): DoublyLinkedList;
    /**
     * Retrieve the innerList used (the list itself, not a copy).
     * @returns {DoubleLinker}
     */
    get list(): DoubleLinker;
    /**
     * Retrieve the first DoubleLinker in the list.
     * @returns {DoubleLinker}
     */
    get first(): DoubleLinker;
    /**
     * Retrieve the last DoubleLinker in the list.
     * @returns {DoubleLinker}
     */
    get last(): DoubleLinker;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {DoubleLinker|*} node The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list
     * @param {DoubleLinker|*} newNode The new node to go after the existing node
     * @returns {DoublyLinkedList}
     */
    insertAfter(node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param {DoubleLinker|*} node The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list
     * @param {DoubleLinker|*} newNode The new node to go before the existing node
     * @returns {DoublyLinkedList}
     */
    insertBefore(node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {DoubleLinker|*} node The new node to add to the end of the list
     * @param {DoubleLinker} after The existing last node
     * @returns {DoubleLinker}
     */
    append(node: DoubleLinker | any, after?: DoubleLinker): DoublyLinkedList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param {DoubleLinker|*} node The new node to add to the start of the list
     * @param {DoubleLinker} before The existing first node
     * @returns {DoubleLinker}
     */
    prepend(node: DoubleLinker | any, before?: DoubleLinker): DoublyLinkedList;
    /**
     * Remove a linker from this linked list.
     * @param {DoubleLinker} node The node we wish to remove (and it will be returned after removal)
     * @return {DoubleLinker}
     */
    remove(node: DoubleLinker): DoubleLinker;
    /**
     * Refresh all references and return head reference.
     * @return {DoubleLinker}
     */
    reset(): DoubleLinker;
    /**
     * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
     * @param {number} index The integer number for retrieving a node by position.
     * @returns {DoubleLinker|null}
     */
    item(index: number): DoubleLinker;
    /**
     * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
     * @param {forEachCallback} callback The function to call for-each double linker
     * @param {DoublyLinkedList} thisArg Optional, 'this' reference
     * @return {DoublyLinkedList} The list which was iterated.
     */
    forEach(callback: forEachCallback, thisArg?: DoublyLinkedList): DoublyLinkedList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<DoubleLinker>;
    /**
     * Convert an array into a DoublyLinkedList instance, return the new instance.
     * @param {Array} [values=[]] An array of values which will be converted to linkers in this doubly-linked-list
     * @param {IsDoubleLinker} [linkerClass=DoubleLinker] The class to use for each linker
     * @param {IsArrayable<IsDoubleLinker>} [classType=LinkedList] Provide the type of IsArrayable to use.
     * @returns {DoublyLinkedList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof DoubleLinker, classType?: any) => IsArrayable<IsDoubleLinker> | any;
}
