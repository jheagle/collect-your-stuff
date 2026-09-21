/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { TreeLinker } from './TreeLinker';
import { forEachCallback } from '../../recipes/IsArrayable';
import { IsTree } from '../../recipes/IsTree';
import { IsTreeNode } from '../../recipes/IsTreeNode';
/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
export declare class LinkedTreeList implements IsTree, Iterable<TreeLinker> {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof LinkedTreeList;
    /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
    innerList: IsTreeNode | any;
    /** Whether the inner list has been initialized (it can only be initialized once). */
    initialized: boolean;
    /** The class used to wrap the data given to this list as tree linkers. */
    linkerClass: typeof TreeLinker;
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    private tailCache;
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    private countCache;
    /**
     * Create the new LinkedTreeList instance, configure the list class.
     * @param {TreeLinker} [linkerClass=TreeLinker] The class used to wrap given data as tree linkers.
     */
    constructor(linkerClass?: typeof TreeLinker);
    /**
     * Initialize the inner list, should only run once.
     * @param {TreeLinker} initialList Give the list of tree-linkers to start in this linked-tree-list.
     * @return {LinkedTreeList}
     */
    initialize(initialList: TreeLinker): LinkedTreeList;
    /**
     * Retrieve the innerList used (the list itself, not a copy).
     * @returns {TreeLinker}
     */
    get list(): TreeLinker;
    /**
     * Retrieve the first TreeLinker in the list.
     * @returns {TreeLinker}
     */
    get first(): TreeLinker;
    /**
     * Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.
     * @returns {TreeLinker}
     */
    get last(): TreeLinker;
    /**
     * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
     * (call reset() after linkers were changed directly).
     * @returns {number}
     */
    get length(): number;
    /**
     * Get the parent of this tree list.
     * @return {TreeLinker}
     */
    get parent(): TreeLinker;
    /**
     * Set the parent of this tree list
     * @param {TreeLinker} parent The new node to use as the parent for this group of children
     */
    set parent(parent: TreeLinker);
    /**
     * Return the root parent of the entire tree.
     * @return {TreeLinker}
     */
    get rootParent(): TreeLinker;
    /**
     * Set the children on a parent item.
     * @param {TreeLinker} item The TreeLinker node that will be the parent of the children
     * @param {LinkedTreeList} children The LinkedTreeList which has the child nodes to use
     */
    setChildren(item: TreeLinker, children?: LinkedTreeList): void;
    /**
     * Insert a new node (or data) after a node.
     * @param {TreeLinker|*} node The existing node as reference
     * @param {TreeLinker|*} newNode The new node to go after the existing node
     * @returns {LinkedTreeList}
     */
    insertAfter(node: TreeLinker, newNode: TreeLinker | any): LinkedTreeList;
    /**
     * Insert a new node (or data) before a node.
     * @param {TreeLinker|*} node The existing node as reference
     * @param {TreeLinker|*} newNode The new node to go before the existing node
     * @returns {LinkedTreeList}
     */
    insertBefore(node: TreeLinker, newNode: TreeLinker | any): LinkedTreeList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {TreeLinker|*} node The new node to add to the end of the list
     * @param {TreeLinker} after The existing last node
     * @returns {TreeLinker}
     */
    append(node: TreeLinker | any, after?: TreeLinker): LinkedTreeList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @param {TreeLinker|*} node The new node to add to the start of the list
     * @param {TreeLinker} before The existing first node
     * @returns {TreeLinker}
     */
    prepend(node: TreeLinker | any, before?: TreeLinker): LinkedTreeList;
    /**
     * Remove a linker from this linked list.
     * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
     * @return {TreeLinker}
     */
    remove(node: TreeLinker): TreeLinker;
    /**
     * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
     * list's own methods keep these up to date, so this is only needed after linkers were changed directly.
     * @return {TreeLinker}
     */
    reset(): TreeLinker;
    /**
     * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
     * @param {number} index The integer number for retrieving a node by position.
     * @returns {TreeLinker|null}
     */
    item(index: number): TreeLinker;
    /**
     * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
     * @param {forEachCallback} callback The function to call for-each tree node
     * @param {LinkedTreeList} thisArg Optional, 'this' reference
     * @return {LinkedTreeList} The list which was iterated.
     */
    forEach(callback: forEachCallback, thisArg?: LinkedTreeList): LinkedTreeList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<TreeLinker>;
    /**
     * Convert an array into a LinkedTreeList instance, return the new instance.
     * @param {Array} [values=[]] An array of values which will be converted to nodes in this tree-list
     * @param {TreeLinker} [linkerClass=TreeLinker] The class to use for each node
     * @param {IsArrayable<TreeLinker>} [classType=LinkedTreeList] Provide the type of IsArrayable to use.
     * @returns {LinkedTreeList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof TreeLinker, classType?: any) => IsTree | any;
}
