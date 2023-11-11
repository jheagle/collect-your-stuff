/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsRunnable } from '../../recipes/Runnable';
import IsLinker from '../../recipes/IsLinker';
/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
declare class Stackable implements IsLinker, IsRunnable {
    readonly classType: typeof Stackable;
    data: any;
    next: Stackable | null;
    /**
     * Create a stackable item that can be used in a stack.
     * @param {Object} [stackData={}]
     * @param {*} [stackData.task=null] The data to be stored in this stackable
     * @param {Stackable|null} [stackData.next=null] The reference to the next stackable if any
     * @param {boolean|Function} [stackData.ready=false] Indicate if the stackable is ready to run
     */
    constructor({ task, next, ready }?: {
        task?: any;
        next?: Stackable | null;
        ready?: boolean;
    });
    /**
     * Retrieve the data which should be formed as a task.
     * @return {*}
     */
    get task(): any;
    /**
     * Run the stacked task.
     * @return {*}
     */
    run(): any;
    /**
     * Make a new Stackable from the data given if it is not already a valid Stackable.
     * @param {Stackable|*} stackable Return a valid Stackable instance from given data, or even an already valid one.
     * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
     * @return {Stackable}
     */
    static make: (stackable: Stackable | any, classType?: any) => Stackable;
    /**
     * Convert an array into Stackable instances, return the head and tail Stackables.
     * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of stackable linkers.
     * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
     * @returns {{head: Stackable, tail: Stackable}}
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: Stackable;
        tail: Stackable;
    };
}
export default Stackable;
