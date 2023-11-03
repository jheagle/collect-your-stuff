/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Stackable from './Stackable';
import IsArrayable from '../../recipes/IsArrayable';
import { completeResponse } from '../queue/Queueable';
import IsElement from '../../recipes/IsElement';
/**
 * Store a collection of items which can only be inserted and removed from the top.
 * @see [Java Stack Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Stack.html}
 */
declare class Stack {
    stackedList: IsArrayable<any>;
    /**
     * Instantiate the state with the starter stacked list.
     * @param {Iterable|Arrayable} stackedList
     */
    constructor(stackedList: IsArrayable<any>);
    /**
     * Add a stackable task to the top of the stack.
     * @param {Stackable|*} stackable
     */
    add(stackable: Stackable | any): void;
    /**
     * Return true if the stack is empty (there are no tasks in the stacked list)
     * @return {boolean}
     */
    empty(): boolean;
    /**
     * Return a reference to the next stacked task.
     * @return {Stackable}
     */
    get(): IsElement<Stackable>;
    /**
     * Return a reference to the next stacked / first stacked task (alias for 'get()')
     * @return {Stackable}
     */
    getFirst(): IsElement<Stackable>;
    /**
     * Take a look at the next stacked task (alias for 'get()')
     * @return {Stackable}
     */
    peek(): IsElement<Stackable>;
    /**
     * Remove the next stacked task and return it.
     * @return {Stackable|null}
     */
    pop(): Stackable | completeResponse | null;
    /**
     * Push a stackable task to the top of the stack.
     * @param {Stackable|*} stackable
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
     * @methodof Stack
     * @param {Array} values
     * @param {Stackable} stackableClass
     * @param {Stack|Iterable} listClass
     * @returns {Stack}
     */
    static fromArray: (values?: Array<any>, stackableClass?: typeof Stackable, listClass?: any) => Stack;
}
export default Stack;
