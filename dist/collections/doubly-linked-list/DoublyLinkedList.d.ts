/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import DoubleLinker from './DoubleLinker';
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 */
declare class DoublyLinkedList implements IsArrayable<DoublyLinkedList>, Iterable<IsElement<DoubleLinker>> {
    readonly classType: typeof DoublyLinkedList;
    innerList: IsElement<DoubleLinker>;
    initialized: boolean;
    /**
     * Create the new DoublyLinkedList instance, configure the Linker and List classes.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {DoubleLinker} initialList
     * @return {DoublyLinkedList}
     */
    initialize(initialList: IsElement<DoubleLinker>): DoublyLinkedList;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {DoubleLinker}
     */
    get list(): IsElement<DoubleLinker>;
    /**
     * Retrieve the first DoubleLinker in the list.
     * @returns {DoubleLinker}
     */
    get first(): IsElement<DoubleLinker>;
    /**
     * Retrieve the last DoubleLinker in the list.
     * @returns {DoubleLinker}
     */
    get last(): IsElement<DoubleLinker>;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param {DoubleLinker|*} node
     * @param {DoubleLinker|*} newNode
     * @returns {DoublyLinkedList}
     */
    insertAfter(node: IsElement<DoubleLinker>, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param {DoubleLinker|*} node
     * @param {DoubleLinker|*} newNode
     * @returns {DoublyLinkedList}
     */
    insertBefore(node: IsElement<DoubleLinker>, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {DoubleLinker|*} node
     * @param {DoubleLinker} after
     * @returns {DoubleLinker}
     */
    append(node: DoubleLinker | any, after?: IsElement<DoubleLinker>): DoublyLinkedList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @method
     * @param {DoubleLinker|*} node
     * @param {DoubleLinker} before
     * @returns {DoubleLinker}
     */
    prepend(node: DoubleLinker | any, before?: IsElement<DoubleLinker>): DoublyLinkedList;
    /**
     * Remove a linker from this linked list.
     * @param {DoubleLinker} node
     * @return {DoubleLinker}
     */
    remove(node: DoubleLinker): DoubleLinker;
    /**
     * Refresh all references and return head reference.
     * @return {DoubleLinker}
     */
    reset(): IsElement<DoubleLinker>;
    /**
     * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
     * @param {number} index
     * @returns {DoubleLinker|null}
     */
    item(index: number): IsElement<DoubleLinker>;
    /**
     * Be able to run forEach on this DoublyLinkedList ot iterate over the DoubleLinker Items.
     * @param {forEachCallback} callback
     * @param {DoublyLinkedList} thisArg
     */
    forEach(callback: forEachCallback, thisArg?: DoublyLinkedList): DoublyLinkedList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<IsElement<DoubleLinker>>;
    /**
     * Convert an array into a DoublyLinkedList instance, return the new instance.
     * @param {Array} [values=[]]
     * @param {DoubleLinker} [linkerClass=DoubleLinker]
     * @returns {DoublyLinkedList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof DoubleLinker) => DoublyLinkedList;
}
export default DoublyLinkedList;
