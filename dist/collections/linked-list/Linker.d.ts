/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
/**
 * Linker represents a node in a LinkedList.
 */
declare class Linker implements IsElement<Linker> {
    readonly classType: typeof Linker;
    data: any;
    next: Linker | null;
    /**
     * Create the new Linker instance, provide the data and optionally configure the type of Linker.
     * @param {Object} [nodeData={}]
     * @param {*} [nodeData.data=null]
     * @param {Linker|null} [nodeData.next=null]
     */
    constructor({ data, next }?: {
        data?: any;
        next?: Linker | null;
    });
    /**
     * Make a new Linker from the data given if it is not already a valid Linker.
     * @param {Linker|*} linker
     * @return {Linker}
     */
    static make: (linker: Linker | any) => IsElement<Linker>;
    /**
     * Convert an array into Linker instances, return the head and tail Linkers.
     * @param {Array} [values=[]]
     * @returns {{head: Linker, tail: Linker}}
     */
    static fromArray: (values: Array<any>) => {
        head: Linker;
        tail: Linker;
    };
}
export default Linker;
