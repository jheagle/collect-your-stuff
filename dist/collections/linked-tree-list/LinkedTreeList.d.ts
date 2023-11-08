/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import TreeLinker from './TreeLinker';
import { forEachCallback } from '../../recipes/IsArrayable';
import IsTree from '../../recipes/IsTree';
/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 */
declare class LinkedTreeList implements IsTree, Iterable<TreeLinker> {
    readonly classType: typeof LinkedTreeList;
    innerList: TreeLinker;
    initialized: boolean;
    /**
     * Create the new LinkedTreeList instance, configure the list class.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {TreeLinker} initialList Give the list of tree-linkers to start in this linked-tree-list.
     * @return {LinkedTreeList}
     */
    initialize(initialList: TreeLinker): LinkedTreeList;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {TreeLinker}
     */
    get list(): TreeLinker;
    /**
     * Retrieve the first TreeLinker in the list.
     * @returns {TreeLinker}
     */
    get first(): TreeLinker;
    /**
     * Retrieve the last TreeLinker in the list.
     * @returns {TreeLinker}
     */
    get last(): TreeLinker;
    /**
     * Return the length of the list.
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
     * Refresh all references and return head reference.
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
     * @returns {LinkedTreeList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof TreeLinker) => LinkedTreeList;
}
export default LinkedTreeList;
