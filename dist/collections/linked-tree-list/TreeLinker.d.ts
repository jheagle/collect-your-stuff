/**
 * @file doubly linked tree node.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable from '../../recipes/IsArrayable';
import LinkedTreeList from './LinkedTreeList';
import IsTreeNode from '../../recipes/IsTreeNode';
/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 */
declare class TreeLinker implements IsTreeNode {
    readonly classType: typeof TreeLinker;
    data: any;
    next: TreeLinker | null;
    prev: TreeLinker | null;
    parent: IsTreeNode;
    children: IsArrayable<IsTreeNode>;
    /**
     * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
     * @param {Object} [settings={}]
     * @param {*} [settings.data=null] The data to be stored in this tree node
     * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
     * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
     * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
     * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
     */
    constructor({ data, next, prev, children, parent }?: {
        data?: any;
        next?: TreeLinker;
        prev?: TreeLinker;
        children?: Array<any>;
        parent?: TreeLinker;
    });
    /**
     * Create the children for this tree from an array.
     * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
     * @return {LinkedTreeList|null}
     */
    childrenFromArray(children?: Array<any> | null): LinkedTreeList;
    /**
     * Make a new DoubleLinker from the data given if it is not already a valid Linker.
     * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
     * @return {TreeLinker}
     */
    static make: (linker: TreeLinker | any) => IsTreeNode;
    /**
     * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
     * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
     * @returns {{head: TreeLinker, tail: TreeLinker}}
     */
    static fromArray: (values?: Array<any>) => {
        head: TreeLinker;
        tail: TreeLinker;
    };
}
export default TreeLinker;
