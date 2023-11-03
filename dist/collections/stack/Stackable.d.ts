/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
import { IsRunnable } from '../../recipes/Runnable';
/**
 * Stackable represents a runnable entry in stack.
 */
declare class Stackable implements IsElement<Stackable>, IsRunnable {
    readonly classType: typeof Stackable;
    data: any;
    /**
   * Instantiate the Stackable which is used in a stack.
   * @param {*} [stack=null]
   */
    constructor(stack?: any);
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
     * @methodof Stackable
     * @param {Stackable|*} stackable
     * @return {Stackable}
     */
    static make: (stackable: Stackable | any) => Stackable;
    /**
     * Convert an array into Stackable instances, return the head and tail Stackables.
     * @param {Array} [values=[]]
     * @returns {{head: Stackable, tail: Stackable}}
     */
    static fromArray: (values?: Array<any>) => {
        head: Stackable;
        tail: Stackable;
    };
}
export default Stackable;
