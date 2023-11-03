/**
 * @file queueable item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
import { IsRunnable } from '../../recipes/Runnable';
/**
 * Return results of the task.
 * @typedef {Object} completeResponse
 * @property {*} success
 * @property {*} error
 * @property {*} context
 */
export type completeResponse = {
    success: boolean | any;
    error: boolean | any;
    context: any;
};
/**
 * Queueable represents a runnable entry in a queue.
 */
declare class Queueable implements IsElement<Queueable>, IsRunnable {
    readonly classType: typeof Queueable;
    data: any;
    next: Queueable | null;
    complete: boolean;
    ready: Function | boolean;
    running: boolean;
    /**
     * Create a queueable item that can be used in a queue.
     * @param {Object} [queueableData={}]
     * @param {*} [queueableData.task=null]
     * @param {boolean|Function} [queueableData.ready=false]
     */
    constructor({ task, next, ready }?: {
        task?: any;
        next?: Queueable | null;
        ready?: boolean;
    });
    /**
     * Check ready state.
     * @return {boolean}
     */
    get isReady(): boolean;
    /**
     * Retrieve the data which should be formed as a task.
     * @return {*}
     */
    get task(): any;
    /**
     * Set this queueable as completed.
     * @param {Object} completeResponse
     * @param {*} [completeResponse.success=true]
     * @param {*} [completeResponse.error=false]
     * @param {*} [completeResponse.context=null]
     * @return {completeResponse}
     */
    markCompleted({ success, error, context }?: {
        success?: any;
        error?: any;
        context?: any;
    }): completeResponse;
    /**
     * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
     * @return {completeResponse}
     */
    run(): completeResponse;
    /**
     * Make a new Queueable from the data given if it is not already a valid Queueable.
     * @methodof Queueable
     * @param {Queueable|*} queueable
     * @return {Queueable}
     */
    static make: (queueable: Queueable | any) => IsElement<Queueable>;
    /**
     * Convert an array into Queueable instances, return the head and tail Queueables.
     * @param {Array} values
     * @returns {{head: Queueable, tail: Queueable}}
     */
    static fromArray: (values: Array<any>) => {
        head: Queueable;
        tail: Queueable;
    };
}
export default Queueable;
