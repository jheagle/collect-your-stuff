/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import TreeLinker from './TreeLinker';
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 */
declare class LinkedTreeList implements IsArrayable<LinkedTreeList>, Iterable<IsElement<TreeLinker>> {
    readonly classType: typeof LinkedTreeList;
    innerList: IsElement<TreeLinker>;
    initialized: boolean;
    /**
     * Create the new LinkedTreeList instance, configure the list class.
     */
    constructor();
    /**
     * Initialize the inner list, should only run once.
     * @param {TreeLinker} initialList
     * @return {LinkedTreeList}
     */
    initialize(initialList: IsElement<TreeLinker>): LinkedTreeList;
    /**
     * Retrieve a copy of the innerList used.
     * @returns {TreeLinker}
     */
    get list(): IsElement<TreeLinker>;
    /**
     * Retrieve the first TreeLinker in the list.
     * @returns {TreeLinker}
     */
    get first(): IsElement<TreeLinker>;
    /**
     * Retrieve the last TreeLinker in the list.
     * @returns {TreeLinker}
     */
    get last(): IsElement<TreeLinker>;
    /**
     * Return the length of the list.
     * @returns {number}
     */
    get length(): number;
    /**
     * Alias for getting the inner list
     */
    get children(): IsElement<TreeLinker>;
    /**
     * Set the inner list to new children
     * @param {TreeLinker} children
     */
    set children(children: IsElement<TreeLinker>);
    /**
     * Get the parent of this tree list.
     * @return {TreeLinker}
     */
    get parent(): IsElement<TreeLinker>;
    /**
     * Set the parent of this tree list
     * @param {TreeLinker} parent
     */
    set parent(parent: IsElement<TreeLinker>);
    /**
     * Return the root parent of the entire tree.
     * @return {TreeLinker}
     */
    get rootParent(): IsElement<TreeLinker>;
    /**
     * Set the children on a parent item.
     * @param {TreeLinker} item
     * @param {LinkedTreeList} children
     */
    setChildren(item: IsElement<TreeLinker>, children?: LinkedTreeList): void;
    /**
     * Insert a new node (or data) after a node.
     * @param {TreeLinker|*} node
     * @param {TreeLinker|*} newNode
     * @returns {LinkedTreeList}
     */
    insertAfter(node: IsElement<TreeLinker>, newNode: TreeLinker | any): LinkedTreeList;
    /**
     * Insert a new node (or data) before a node.
     * @param {TreeLinker|*} node
     * @param {TreeLinker|*} newNode
     * @returns {LinkedTreeList}
     */
    insertBefore(node: IsElement<TreeLinker>, newNode: TreeLinker | any): LinkedTreeList;
    /**
     * Add a node (or data) after the given (or last) node in the list.
     * @param {TreeLinker|*} node
     * @param {TreeLinker} after
     * @returns {TreeLinker}
     */
    append(node: TreeLinker | any, after?: IsElement<TreeLinker>): LinkedTreeList;
    /**
     * Add a node (or data) before the given (or first) node in the list.
     * @method
     * @param {TreeLinker|*} node
     * @param {TreeLinker} before
     * @returns {TreeLinker}
     */
    prepend(node: TreeLinker | any, before?: IsElement<TreeLinker>): LinkedTreeList;
    /**
     * Remove a linker from this linked list.
     * @param {TreeLinker} node
     * @return {TreeLinker}
     */
    remove(node: TreeLinker): TreeLinker;
    /**
     * Refresh all references and return head reference.
     * @return {TreeLinker}
     */
    reset(): IsElement<TreeLinker>;
    /**
     * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
     * @param {number} index
     * @returns {TreeLinker|null}
     */
    item(index: number): IsElement<TreeLinker>;
    /**
     * Be able to run forEach on this LinkedTreeList ot iterate over the TreeLinker Items.
     * @param {forEachCallback} callback
     * @param {LinkedTreeList} thisArg
     */
    forEach(callback: forEachCallback, thisArg?: LinkedTreeList): LinkedTreeList;
    /**
     * Be able to iterate over this class.
     * @returns {Iterator}
     */
    [Symbol.iterator](): Iterator<IsElement<TreeLinker>>;
    /**
     * Convert an array into a LinkedTreeList instance, return the new instance.
     * @param {Array} [values=[]]
     * @param {TreeLinker} [linkerClass=TreeLinker]
     * @returns {LinkedTreeList}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof TreeLinker) => LinkedTreeList;
}
export default LinkedTreeList;
