/**
 * doubly linked list.
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
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    private tailCache;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    private countCache;
    /**
     * Create the new DoublyLinkedList instance.
     * @param linkerClass The class used to wrap given data as linkers.
     */
    constructor(linkerClass?: typeof DoubleLinker);
    /**
     * Initialize the inner list, should only run once.
     * @param initialList Give the list of double-linkers to start in this doubly linked-list.
     */
    initialize(initialList: DoubleLinker): DoublyLinkedList;
    /**
     * Retrieve the innerList used (the list itself, not a copy).
     */
    get list(): DoubleLinker;
    /**
     * Retrieve the first DoubleLinker in the list.
     */
    get first(): DoubleLinker | null;
    /**
     * Retrieve the last DoubleLinker in the list. The end is remembered, so this does not walk the list.
     */
    get last(): DoubleLinker | null;
    /**
     * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
     * (call reset() after linkers were changed directly).
     */
    get length(): number;
    /**
     * Insert a new node (or data) after a node.
     * @param node The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list
     * @param newNode The new node to go after the existing node
     */
    insertAfter(node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Insert a new node (or data) before a node.
     * @param node The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list
     * @param newNode The new node to go before the existing node
     */
    insertBefore(node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param node The new node to add to the end of the list
     * @param after The existing last node
     */
    append(node: DoubleLinker | any, after?: DoubleLinker): DoublyLinkedList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param node The new node to add to the start of the list
     * @param before The existing first node
     */
    prepend(node: DoubleLinker | any, before?: DoubleLinker): DoublyLinkedList;
    /**
     * Remove a linker from this linked list.
     * @param node The node we wish to remove (and it will be returned after removal)
     */
    remove(node: DoubleLinker | null): DoubleLinker | null;
    /**
     * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The list's
     * own methods keep these up to date, so this is only needed after linkers were changed directly.
     */
    reset(): DoubleLinker | null;
    /**
     * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
     * @param index The integer number for retrieving a node by position.
     */
    item(index: number): DoubleLinker;
    /**
     * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
     * @param callback The function to call for-each double linker
     * @param thisArg Optional, 'this' reference
     * @returns The list which was iterated.
     */
    forEach(callback: forEachCallback, thisArg?: DoublyLinkedList): DoublyLinkedList;
    /**
     * Be able to iterate over this class.
     */
    [Symbol.iterator](): Iterator<DoubleLinker>;
    /**
     * Convert an array into a DoublyLinkedList instance, return the new instance.
     * @param values An array of values which will be converted to linkers in this doubly-linked-list
     * @param linkerClass The class to use for each linker
     * @param classType Provide the type of IsArrayable to use.
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof DoubleLinker, classType?: any) => IsArrayable<IsDoubleLinker> | any;
}
