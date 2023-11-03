/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
/**
 * DoubleLinker represents a node in a DoublyLinkedList.
 */
declare class DoubleLinker implements IsElement<DoubleLinker> {
    readonly classType: typeof DoubleLinker;
    data: any;
    next: DoubleLinker | null;
    prev: DoubleLinker | null;
    /**
     * Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.
     * @param {Object} [nodeData={}]
     * @param {*} [nodeData.data=null]
     * @param {DoubleLinker|null} [nodeData.prev=null]
     * @param {DoubleLinker|null} [nodeData.next=null]
     */
    constructor({ data, prev, next }?: {
        data?: any;
        prev?: DoubleLinker | null;
        next?: DoubleLinker | null;
    });
    /**
     * Make a new DoubleLinker from the data given if it is not already a valid Linker.
     * @param {DoubleLinker|*} linker
     * @return {DoubleLinker}
     */
    static make: (linker: DoubleLinker | any) => IsElement<DoubleLinker>;
    /**
     * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
     * @param {Array} [values=[]]
     * @param {DoubleLinker} [linkerClass=DoubleLinker]
     * @returns {{head: DoubleLinker, tail: DoubleLinker}}
     */
    static fromArray: (values?: Array<any>, linkerClass?: typeof DoubleLinker) => {
        head: DoubleLinker;
        tail: DoubleLinker;
    };
}
export default DoubleLinker;
