/**
 * @file queueable item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { completeResponse, IsRunnable } from '../../recipes/Runnable';
import { IsLinker } from '../../recipes/IsLinker';
/**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 */
export declare class Queueable implements IsLinker, IsRunnable {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof Queueable;
    /** The task (or data) this queueable holds. */
    data: any;
    /** The queueable after this one, or null when this is the last. */
    next: Queueable | null;
    /** Whether this queueable has been run to completion. */
    complete: boolean;
    /** Whether this queueable may run, or a function which answers that when asked. */
    ready: Function | boolean;
    /** Whether this queueable is running right now. */
    running: boolean;
    /**
     * Create a queueable item that can be used in a queue.
     * @param {Object} [queueableData={}] The settings for the new queueable.
     * @param {*} [queueableData.task=null] The data to be stored in this queueable
     * @param {Queueable|null} [queueableData.next=null] The reference to the next queueable if any
     * @param {boolean|Function} [queueableData.ready=false] Indicate if the queueable is ready to run
     */
    constructor({ task, next, ready }?: {
        task?: any;
        next?: Queueable | null;
        ready?: boolean | Function;
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
     * @param {Object} [completeResponse={}] The result to report for the task.
     * @param {*} [completeResponse.success=true] Indicate when the task failed (use false) or give a success message
     * @param {*} [completeResponse.error=false] Indicate a task was error-free (use false) or give an error message
     * @param {*} [completeResponse.context=null] Provide additional data in the response
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
     * @param {Queueable|*} queueable Return a valid Queueable instance from given data, or even an already valid one.
     * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
     * @return {Queueable}
     */
    static make: (queueable: Queueable | any, classType?: any) => IsLinker;
    /**
     * Convert an array into Queueable instances, return the head and tail Queueables.
     * @param {Array} values Provide an array of data that will be converted to a chain of queueable linkers.
     * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
     * @returns {{head: Queueable, tail: Queueable}}
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: IsLinker;
        tail: IsLinker;
    };
}
