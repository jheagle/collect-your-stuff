/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsDoubleLinker } from '../../recipes/IsDoubleLinker';
/**
 * DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.
 * @extends Linker
 */
export declare class DoubleLinker implements IsDoubleLinker {
    readonly classType: typeof DoubleLinker;
    data: any;
    next: DoubleLinker | null;
    prev: DoubleLinker | null;
    /**
     * Create the new DoubleLinker instance, provide the data and optionally the next and prev references.
     * @param {Object} [nodeData={}]
     * @param {*} [nodeData.data=null] The data to be stored in this linker
     * @param {DoubleLinker|null} [nodeData.next=null] The reference to the next linker if any
     * @param {DoubleLinker|null} [nodeData.prev=null] The reference to the previous linker if any
     */
    constructor({ data, next, prev }?: {
        data?: any;
        next?: DoubleLinker | null;
        prev?: DoubleLinker | null;
    });
    /**
     * Make a new DoubleLinker from the data given if it is not already a valid Linker.
     * @param {DoubleLinker|*} linker Return a valid Linker instance from given data, or even an already valid one.
     * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
     * @return {DoubleLinker}
     */
    static make: (linker: DoubleLinker | any, classType?: any) => IsDoubleLinker | any;
    /**
     * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
     * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
     * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
     * @returns {{head: DoubleLinker, tail: DoubleLinker}}
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: DoubleLinker | any;
        tail: DoubleLinker | any;
    };
}
