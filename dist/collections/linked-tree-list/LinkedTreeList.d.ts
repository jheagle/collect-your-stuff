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
    /** The node these linkers are the children of, remembered so that it is known even while the list is empty (undefined until it is known). */
    private ownerNode;
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
     * Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
     * empty), or null for the linkers at the top of a tree.
     * @return {TreeLinker|null}
     */
    get parent(): TreeLinker | null;
    /**
     * Set the parent of this tree list: every linker in it gets the node as its parent, and the node gets this list as its
     * children. Linkers added to the list later get this parent too.
     * @param {TreeLinker|null} parent The new node to use as the parent for this group of children
     */
    set parent(parent: TreeLinker | null);
    /**
     * Return the root parent of the entire tree.
     * @return {TreeLinker}
     */
    get rootParent(): TreeLinker;
    /**
     * Set the children on a parent item.
     * @param {TreeLinker} item The TreeLinker node (one of the linkers of this list) that will be the parent of the children
     * @param {LinkedTreeList|null} [children=null] The LinkedTreeList which has the child nodes to use, or null to remove the children of the item
     * @throws {Error} When the item is not one of the linkers of this list
     */
    setChildren(item: TreeLinker, children?: LinkedTreeList | null): void;
    /**
     * Make a linker of the given node (or data) and make this list's parent its parent.
     * @param {TreeLinker|*} newNode The node (or data) which is being added to this list
     * @returns {TreeLinker}
     */
    private adopt;
    /**
     * Insert a new node (or data) after a node. The new node gets the parent of this list.
     * @param {TreeLinker|*} node The existing node as reference, or null to insert at the start of the list
     * @param {TreeLinker|*} newNode The new node to go after the existing node
     * @returns {LinkedTreeList}
     */
    insertAfter(node: TreeLinker | null, newNode: TreeLinker | any): LinkedTreeList;
    /**
     * Insert a new node (or data) before a node. The new node gets the parent of this list.
     * @param {TreeLinker|*} node The existing node as reference, or null to insert at the end of the list
     * @param {TreeLinker|*} newNode The new node to go before the existing node
     * @returns {LinkedTreeList}
     */
    insertBefore(node: TreeLinker | null, newNode: TreeLinker | any): LinkedTreeList;
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
     * Remove a linker from this linked list. The removed node no longer has a parent.
     * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
     * @return {TreeLinker|null} The removed node, or null when there was nothing to remove
     */
    remove(node: TreeLinker): TreeLinker | null;
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
     * Be able to iterate over this class: the linkers of this list and everything below them (left-first). It stays within
     * this list (it does not start at, or climb up to, the parents), use the parseTree service to parse a whole tree.
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
