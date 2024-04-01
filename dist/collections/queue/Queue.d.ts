/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { Queueable } from './Queueable';
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsLinker } from '../../recipes/IsLinker';
import { completeResponse } from '../../recipes/Runnable';
/**
 * Maintain a series of queued items.
 */
export declare class Queue {
    queuedList: IsArrayable<any>;
    private listClass;
    private queueableClass;
    /**
     * Instantiate the queue with the given queue list.
     * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
     * @param {IsArrayable} listClass
     * @param {Queueable} queueableClass
     */
    constructor(queuedList?: IsArrayable<any>, listClass?: any, queueableClass?: typeof Queueable);
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
     * Add a queued task to the end of the queue
     * @param {Queueable} queueable Add a new queueable to the end of the queue
     */
    enqueue(queueable: Queueable): void;
    /**
     * Take a look at the next queued task
     * @return {Queueable}
     */
    peek(): IsLinker;
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
     * @param {Array} values An array of values which will be converted to queueables in this queue
     * @param {Queueable} queueableClass The class to use for each queueable
     * @param {Queue|Iterable} listClass The class to use to manage the queueables
     * @returns {Queue}
     */
    static fromArray: (values?: Array<any>, queueableClass?: typeof Queueable, listClass?: any) => Queue;
}
