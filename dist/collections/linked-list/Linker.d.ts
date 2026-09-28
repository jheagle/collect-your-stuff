/**
 * linked list item.
 */
import { IsLinker } from '../../recipes/IsLinker';
/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
export declare class Linker implements IsLinker {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof Linker;
    /** The data stored in this linker. */
    data: any;
    /** The linker after this one, or null when this is the last. */
    next: Linker | null;
    /**
     * Create the new Linker instance, provide the data and optionally give the next Linker.
     * @param nodeData The settings for the new linker.
     * @param nodeData.data The data to be stored in this linker
     * @param nodeData.next The reference to the next linker if any
     */
    constructor({ data, next }?: {
        data?: any;
        next?: Linker | null;
    });
    /**
     * Make a new Linker from the data given if it is not already a valid Linker.
     * @param linker Return a valid Linker instance from given data, or even an already valid one.
     * @param classType Provide the type of IsLinker to use.
     */
    static make: (linker: Linker | any, classType?: any) => IsLinker | any;
    /**
     * Convert an array into Linker instances, return the head and tail Linkers.
     * @param values Provide an array of data that will be converted to a chain of linkers.
     * @param classType Provide the type of IsLinker to use.
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: IsLinker;
        tail: IsLinker;
    };
}
