/**
 * stack.
 */
import { IsRunnable } from '../../recipes/Runnable';
import { IsLinker } from '../../recipes/IsLinker';
/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
export declare class Stackable implements IsLinker, IsRunnable {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof Stackable;
    /** The task (or data) this stackable holds. */
    data: any;
    /** The stackable below this one, or null when this is the bottom. */
    next: Stackable | null;
    /**
     * Create a stackable item that can be used in a stack.
     * @param stackData The settings for the new stackable.
     * @param stackData.task The data to be stored in this stackable
     * @param stackData.next The reference to the next stackable if any
     * @param stackData.ready Indicate if the stackable is ready to run
     */
    constructor({ task, next, ready }?: {
        task?: any;
        next?: Stackable | null;
        ready?: boolean;
    });
    /**
     * Retrieve the data which should be formed as a task.
     */
    get task(): any;
    /**
     * Run the stacked task.
     */
    run(): any;
    /**
     * Make a new Stackable from the data given if it is not already a valid Stackable.
     * @param stackable Return a valid Stackable instance from given data, or even an already valid one.
     * @param classType Provide the type of IsLinker to use.
     */
    static make: (stackable: Stackable | any, classType?: any) => Stackable;
    /**
     * Convert an array into Stackable instances, return the head and tail Stackables.
     * @param values Provide an array of data that will be converted to a chain of stackable linkers.
     * @param classType Provide the type of IsLinker to use.
     */
    static fromArray: (values?: Array<any>, classType?: any) => {
        head: IsLinker;
        tail: IsLinker;
    };
}
