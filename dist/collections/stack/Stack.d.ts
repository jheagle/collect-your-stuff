/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import { Stackable } from './Stackable';
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsLinker } from '../../recipes/IsLinker';
import { completeResponse } from '../../recipes/Runnable';
/**
 * Store a collection of items which can only be inserted and removed from the top.
 */
export declare class Stack {
    stackedList: IsArrayable<any>;
    private listClass;
    private stackableClass;
    /**
     * Instantiate the state with the starter stacked list.
     * @param {Iterable|LinkedList} stackedList
     * @param {IsArrayable} listClass
     * @param {Stackable} stackableClass
     */
    constructor(stackedList?: IsArrayable<any>, listClass?: any, stackableClass?: typeof Stackable);
    /**
     * Return true if the stack is empty (there are no tasks in the stacked list)
     * @return {boolean}
     */
    empty(): boolean;
    /**
     * Take a look at the next stacked task
     * @return {Stackable}
     */
    top(): IsLinker;
    /**
     * Remove the next stacked task and return it.
     * @return {Stackable|null}
     */
    pop(): Stackable | completeResponse | null;
    /**
     * Push a stackable task to the top of the stack.
     * @param {Stackable|*} stackable Add a new stackable to the top of the stack
     */
    push(stackable: any): void;
    /**
     * Remove the next stacked task and return it.
     * @return {Stackable|null}
     */
    remove(): Stackable | null;
    /**
     * Get the size of the current stack.
     * @return {number}
     */
    size(): number;
    /**
     * Convert an array to a Stack.
     * @param {Array} values An array of values which will be converted to stackables in this queue
     * @param {Stackable} stackableClass The class to use for each stackable
     * @param {Stack|Iterable} listClass The class to use to manage the stackables
     * @returns {Stack}
     */
    static fromArray: (values?: Array<any>, stackableClass?: typeof Stackable, listClass?: any) => Stack;
}
