/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Queueable, { completeResponse } from './Queueable';
import IsArrayable from '../../recipes/IsArrayable';
import IsElement from '../../recipes/IsElement';
/**
 * Maintain a series of queued items.
 * @see [Java Queue Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Queue.html}
 */
declare class Queue {
    queuedList: IsArrayable<any>;
    /**
     * Instantiate the queue with the given queue list.
     * @param {Iterable|LinkedList} queuedList
     */
    constructor(queuedList: IsArrayable<any>);
    /**
     * Add a queued task to the end of the queue
     * @param {Queueable|*} queueable
     */
    add(queueable: IsElement<Queueable>): void;
    /**
     * Take a queued task from the front of the queue and run it if ready.
     * @return {completeResponse|*}
     */
    dequeue(): completeResponse | any;
    /**
     * Return true if the queue is empty (there are no tasks in the queue list)
     * @return {boolean}
     */
    empty(): boolean;
    /**
     * Add a queued task to the end of the queue (alias for 'add()')
     * @param {Queueable} queueable
     */
    enqueue(queueable: Queueable): void;
    /**
     * Return a reference to the next queued task.
     * @return {Queueable}
     */
    get(): IsElement<Queueable>;
    /**
     * Return a reference to the next queued / first queued task (alias for 'get()')
     * @return {Queueable}
     */
    getFirst(): IsElement<Queueable>;
    /**
     * Take a look at the next queued task (alias for 'get()')
     * @return {Queueable}
     */
    peek(): IsElement<Queueable>;
    /**
     * Remove the next queued item and return it.
     * @return {Queueable|null}
     */
    remove(): Queueable | null;
    /**
     * Get the length of the current queue.
     * @return {number}
     */
    size(): number;
    /**
     * Convert an array to a Queue.
     * @methodof Queue
     * @param {Array} values
     * @param {Queueable} queueableClass
     * @param {Queue|Iterable} listClass
     * @returns {Queue}
     */
    static fromArray: (values?: Array<any>, queueableClass?: typeof Queueable, listClass?: any) => Queue;
}
export default Queue;
