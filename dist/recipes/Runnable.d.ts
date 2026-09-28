/**
 * Runnable class recipe.
 */
export type completeResponse = {
    success: boolean | any;
    error: boolean | any;
    context: any;
};
/**
 * Specify a type of class that is Runnable.
 */
export interface IsRunnable {
    data: any;
    get task(): Function;
    run(): completeResponse | any;
}
/**
 * Identify a class that can be run.
 */
export declare class Runnable implements IsRunnable {
    /** The task (or data) this runnable holds. */
    data: any;
    /**
     * Instantiate a Runnable class.
     * @param data The task (a function) or the data which the task returns.
     */
    constructor(data?: any);
    /**
     * Retrieve the data which should be formed as a task.
     */
    get task(): Function;
    /**
     * Run the runnable task.
     */
    run(): completeResponse | any;
    /**
     * Check if a given thing is Runnable
     * @memberof Runnable
     * @param thing The value to check, or nothing to check whether this class is Runnable.
     */
    static isRunnable(thing: any): boolean;
}
