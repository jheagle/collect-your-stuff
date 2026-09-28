/**
 * queueable item.
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
     * @param queueableData The settings for the new queueable.
     * @param queueableData.task The data to be stored in this queueable
     * @param queueableData.next The reference to the next queueable if any
     * @param queueableData.ready Indicate if the queueable is ready to run
     */
    constructor({ task, next, ready }?: {
        task?: any;
        next?: Queueable | null;
        ready?: boolean | Function;
    });
    /**
     * Check ready state.
     */
    get isReady(): boolean;
    /**
     * Retrieve the data which should be formed as a task.
     */
    get task(): any;
    /**
     * Set this queueable as completed.
     * @param completeResponse The result to report for the task.
     * @param completeResponse.success Indicate when the task failed (use false) or give a success message
     * @param completeResponse.error Indicate a task was error-free (use false) or give an error message
     * @param completeResponse.context Provide additional data in the response
     */
    markCompleted({ success, error, context }?: {
        success?: any;
        error?: any;
        context?: any;
    }): completeResponse;
    /**
     * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
     */
    run(): completeResponse;
    /**
     * Make a new Queueable from the data given if it is not already a valid Queueable.
     * @param queueable Return a valid Queueable instance from given data, or even an already valid one.
     * @param classType Provide the type of IsLinker to use.
     */
    static make: (queueable: Queueable | any, classType?: any) => IsLinker;
    /**
     * Convert an array into Queueable instances, return the head and tail Queueables.
     * @param values Provide an array of data that will be converted to a chain of queueable linkers.
     * @param classType Provide the type of IsLinker to use.
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: IsLinker;
        tail: IsLinker;
    };
}
