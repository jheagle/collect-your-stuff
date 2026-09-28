'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Runnable = void 0
/**
 * Runnable class recipe.
 */
/**
 * Identify a class that can be run.
 */
class Runnable {
  /**
   * Instantiate a Runnable class.
   * @param data The task (a function) or the data which the task returns.
   */
  constructor (data = null) {
    /** The task (or data) this runnable holds. */
    this.data = null
    this.data = data
  }

  /**
   * Retrieve the data which should be formed as a task.
   */
  get task () {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the runnable task.
   */
  run () {
    return this.task()
  }

  /**
   * Check if a given thing is Runnable
   * @memberof Runnable
   * @param thing The value to check, or nothing to check whether this class is Runnable.
   */
  static isRunnable (thing) {
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
exports.Runnable = Runnable
