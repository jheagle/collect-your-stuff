/**
 * @file Runnable class recipe.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
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
    data: any;
    /**
     * Instantiate a Runnable class.
     * @param {*} data
     */
    constructor(data?: any);
    /**
     * Retrieve the data which should be formed as a task.
     * @return {Function}
     */
    get task(): Function;
    /**
     * Run the runnable task.
     * @return {*}
     */
    run(): completeResponse | any;
    /**
     * Check if a given thing is Runnable
     * @memberof Runnable
     * @param {*} thing
     * @return {boolean}
     */
    static isRunnable(thing: any): boolean;
}
