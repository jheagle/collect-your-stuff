/**
 * @file queueable item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Linker from '../linked-list/Linker'

/**
 * Return results of the task.
 * @typedef {Object} completeResponse
 * @property {*} success
 * @property {*} error
 * @property {*} context
 */

/**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 * @extends Runnable
 */
class Queueable extends Linker {
  complete = false
  ready = false
  running = false

  /**
   * Create a queueable item that can be used in a queue.
   * @param {Object} [queueableData={}]
   * @param {*} [queueableData.task=null]
   * @param {boolean|Function} [queueableData.ready=false]
   * @param {Queueable} [queueableClass=Queueable]
   */
  constructor ({ task = null, ready = false } = {}, queueableClass = Queueable) {
    super({ data: task }, queueableClass)
    this.complete = false
    this.ready = ready
    this.running = false
  }

  /**
   * Check complete state.
   * @return {boolean}
   */
  get complete () {
    return this.complete
  }

  /**
   * Check ready state.
   * @return {boolean}
   */
  get isReady () {
    return typeof this.ready === 'function' ? this.ready() : this.ready
  }

  /**
   * Check running state.
   * @return {boolean}
   */
  get running () {
    return this.running
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  get task () {
    if (typeof this.data === 'function') {
      return this.data
    }
    return complete => typeof complete === 'function' ? complete({ context: this.data }).context: this.data
  }

  /**
   * Set this queueable as completed.
   * @param {Object} completeResponse
   * @param {*} [completeResponse.success=true]
   * @param {*} [completeResponse.error=false]
   * @param {*} [completeResponse.context=null]
   * @return {completeResponse}
   */
  markCompleted ({ success = true, error = false, context = null } = {}) {
    this.complete = true
    this.running = false
    return {
      success: success,
      error: error,
      context: context,
    }
  }

  /**
   * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
   * @return {completeResponse}
   */
  run () {
    if (!this.isReady) {
      return {
        success: false,
        error: 'Task is not ready',
        context: this.data,
      }
    }
    if (this.running) {
      return {
        success: false,
        error: 'Queued task is already running, possible missing \'complete\' callback',
        context: this.data,
      }
    }
    this.running = true
    return this.task(this.markCompleted.bind(this))
  }
}

/**
 * Make a new Queueable from the data given if it is not already a valid Queueable.
 * @methodof Queueable
 * @param {Queueable|*} queueable
 * @param {Queueable} [queueableClass=Queueable]
 * @return {Queueable}
 */
Queueable.make = (queueable, queueableClass = Queueable) => {
  if (typeof queueable !== 'object') {
    // It is not an object, so instantiate the Queueable with queueable as the data
    return new queueableClass({ task: queueable })
  }
  if (queueable.classType) {
    // Already valid Queueable, return as-is
    return queueable
  }
  if (!queueable.task) {
    queueable = { task: queueable }
  }
  // Create the new node as the configured queueableClass
  return new queueableClass(queueable, queueableClass)
}

/**
 * Convert an array into Queueable instances, return the head and tail Queueables.
 * @param {Array} values
 * @param {Queueable} queueableClass
 * @returns {{head: Queueable, tail: Queueable}}
 */
Queueable.fromArray = (values = [], queueableClass = Queueable) => Linker.fromArray(values, queueableClass)

export default Queueable
