/**
 * @file task queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { Queueable } from './Queueable';
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsLinker } from '../../recipes/IsLinker';
import { completeResponse } from '../../recipes/Runnable';
/**
 * Maintain a series of queued tasks (Queueables): dequeue() takes the next task from the front and RUNS it, giving each
 * task in turn a chance to run (a task which is not ready, or which has not finished, is placed at the back again).
 * This is a task scheduler, for a plain first-in-first-out collection of items use Queue.
 */
export declare class TaskQueue {
    /** The list which stores the queueables, the first is next to be dequeued. */
    queuedList: IsArrayable<any>;
    private listClass;
    private queueableClass;
    /**
     * Instantiate the queue with the given queue list.
     * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
     * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no queued list is given.
     * @param {Queueable} [queueableClass=Queueable] The class used to wrap queued items.
     */
    constructor(queuedList?: IsArrayable<any>, listClass?: any, queueableClass?: typeof Queueable);
    /**
     * Take a queued task from the front of the queue and run it if ready. A task which is not ready yet is kept in the
     * queue (never dropped), a task which is still running is reported as blocking and left to finish on its own, and
     * completed tasks are discarded.
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
     * Convert an array to a TaskQueue.
     * @param {Array} values An array of values which will be converted to queueables in this queue
     * @param {Queueable} queueableClass The class to use for each queueable
     * @param {TaskQueue|Iterable} listClass The class to use to manage the queueables
     * @returns {TaskQueue}
     */
    static fromArray: (values?: Array<any>, queueableClass?: typeof Queueable, listClass?: any) => TaskQueue;
}
