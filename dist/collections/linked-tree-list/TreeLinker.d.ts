/**
 * @file doubly linked tree node.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsTreeNode } from '../../recipes/IsTreeNode';
import { IsTree } from '../../recipes/IsTree';
/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
export declare class TreeLinker implements IsTreeNode {
    readonly classType: typeof TreeLinker;
    data: any;
    next: IsTreeNode | null;
    prev: IsTreeNode | null;
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
     * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
     */
    constructor({ data, next, prev, children, parent, listClass }?: {
        data?: any;
        next?: IsTreeNode;
        prev?: IsTreeNode;
        children?: Array<any>;
        parent?: IsTreeNode;
        listClass?: any;
    });
    /**
     * Create the children for this tree from an array.
     * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
     * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
     * @return {LinkedTreeList|null}
     */
    childrenFromArray(children?: Array<any> | null, listClass?: any): IsTree | any;
    /**
     * Make a new DoubleLinker from the data given if it is not already a valid Linker.
     * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
     * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
     * @return {TreeLinker}
     */
    static make: (linker: TreeLinker | any, classType?: any) => IsTreeNode | any;
    /**
     * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
     * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
     * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
     * @returns {{head: TreeLinker, tail: TreeLinker}}
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: TreeLinker | any;
        tail: TreeLinker | any;
    };
}
