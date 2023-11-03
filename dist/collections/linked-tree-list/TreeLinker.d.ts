/**
 * @file doubly linked tree item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
import IsArrayable from '../../recipes/IsArrayable';
import LinkedTreeList from './LinkedTreeList';
/**
 * TreeLinker represents a node in a LinkedTreeList.
 */
declare class TreeLinker implements IsElement<TreeLinker> {
    readonly classType: typeof TreeLinker;
    data: any;
    next: TreeLinker | null;
    prev: TreeLinker | null;
    parent: IsElement<TreeLinker>;
    children: IsArrayable<LinkedTreeList>;
    /**
     * Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.
     * @param {Object} [settings={}]
     * @param {*} [settings.data=null]
     * @param {TreeLinker} [settings.prev=null]
     * @param {TreeLinker} [settings.next=null]
     * @param {LinkedTreeList} [settings.children=null]
     * @param {TreeLinker} [settings.parent=null]
     */
    constructor({ data, prev, next, children, parent }?: {
        data?: any;
        prev?: TreeLinker;
        next?: TreeLinker;
        children?: Array<any>;
        parent?: TreeLinker;
    });
    /**
     * Create the children for this tree from an array.
     * @param {Array|null} children
     * @return {DoubleLinker|null}
     */
    childrenFromArray(children?: Array<any> | null): LinkedTreeList;
    /**
     * Make a new DoubleLinker from the data given if it is not already a valid Linker.
     * @param {TreeLinker|*} linker
     * @return {TreeLinker}
     */
    static make: (linker: TreeLinker | any) => IsElement<TreeLinker>;
    /**
     * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
     * @methodof TreeLinker
     * @param {Array} [values=[]]
     * @param {TreeLinker} [linkerClass=TreeLinker]
     * @returns {{head: TreeLinker, tail: TreeLinker}}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof TreeLinker) => {
        head: TreeLinker;
        tail: TreeLinker;
    };
}
export default TreeLinker;
