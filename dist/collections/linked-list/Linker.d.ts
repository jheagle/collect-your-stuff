/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsLinker from '../../recipes/IsLinker';
/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
declare class Linker implements IsLinker {
    readonly classType: typeof Linker;
    data: any;
    next: Linker | null;
    /**
     * Create the new Linker instance, provide the data and optionally give the next Linker.
     * @param {Object} [nodeData={}]
     * @param {*} [nodeData.data=null] The data to be stored in this linker
     * @param {Linker|null} [nodeData.next=null] The reference to the next linker if any
     */
    constructor({ data, next }?: {
        data?: any;
        next?: Linker | null;
    });
    /**
     * Make a new Linker from the data given if it is not already a valid Linker.
     * @param {Linker|*} linker Return a valid Linker instance from given data, or even an already valid one.
     * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
     * @return {Linker}
     */
    static make: (linker: Linker | any, classType?: any) => IsLinker | any;
    /**
     * Convert an array into Linker instances, return the head and tail Linkers.
     * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
     * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
     * @returns {{head: Linker, tail: Linker}}
     */
    static fromArray: (values: Array<any>, classType?: any) => {
        head: IsLinker;
        tail: IsLinker;
    };
}
export default Linker;
