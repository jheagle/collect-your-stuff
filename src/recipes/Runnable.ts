/**
 * @file Runnable class recipe.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Specify a type of class that is Runnable.
 */
export interface IsRunnable {
  data: any

  get task (): Function

  run (): any
}

/**
 * Identify a class that can be run.
 */
export default class Runnable implements IsRunnable {
  public data: any = null

  /**
   * Instantiate a Runnable class.
   * @param {*} data
   */
  constructor (data: any = null) {
    this.data = data
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {Function}
   */
  get task (): Function {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the runnable task.
   * @return {*}
   */
  public run (): any {
    return this.task()
  }

  /**
   * Check if a given thing is Runnable
   * @memberof Runnable
   * @param {*} thing
   * @return {boolean}
   */
  public static isRunnable (thing: any): boolean {
    if (typeof thing === 'undefined') {
      // No argument past, this class is runnable
      return this instanceof Runnable
    }

    if (typeof thing !== 'object') {
      // It is not even an object, so cannot be a class instance
      return false
    }

    if (typeof thing.task !== 'function') {
      // It does not have a task getter that returns a function
      return false
    }

    // Finally, it has a runnable 'run' method. This method should return the result of running the task.
    return typeof thing.run === 'function'
  }
}
