/**
 * @file queueable item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'
import { IsRunnable } from '../../recipes/Runnable'

/**
 * Return results of the task.
 * @typedef {Object} completeResponse
 * @property {*} success
 * @property {*} error
 * @property {*} context
 */

export type completeResponse = { success: boolean | any, error: boolean | any, context: any }

/**
 * Queueable represents a runnable entry in a queue.
 */
class Queueable implements IsElement<Queueable>, IsRunnable {
  public readonly classType: typeof Queueable
  public data: any = null
  public next: Queueable | null = null
  public complete: boolean = false
  public ready: Function | boolean = false
  public running: boolean = false

  /**
   * Create a queueable item that can be used in a queue.
   * @param {Object} [queueableData={}]
   * @param {*} [queueableData.task=null]
   * @param {boolean|Function} [queueableData.ready=false]
   */
  constructor ({ task = null, next = null, ready = false }: {
    task?: any;
    next?: Queueable | null
    ready?: boolean
  } = {}) {
    this.classType = Queueable
    this.data = task
    this.next = next
    this.complete = false
    this.ready = ready
    this.running = false
  }

  /**
   * Check ready state.
   * @return {boolean}
   */
  get isReady (): boolean {
    return typeof this.ready === 'function' ? this.ready() : this.ready
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return (complete: Function | any) => typeof complete === 'function' ? complete({ context: this.data }).context : this.data
  }

  /**
   * Set this queueable as completed.
   * @param {Object} completeResponse
   * @param {*} [completeResponse.success=true]
   * @param {*} [completeResponse.error=false]
   * @param {*} [completeResponse.context=null]
   * @return {completeResponse}
   */
  markCompleted ({ success = true, error = false, context = null }: { success?: any; error?: any; context?: any } = {}): completeResponse {
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
  run (): completeResponse {
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

  /**
   * Make a new Queueable from the data given if it is not already a valid Queueable.
   * @methodof Queueable
   * @param {Queueable|*} queueable
   * @return {Queueable}
   */
  public static make = (queueable: Queueable | any): IsElement<Queueable> => {
    if (typeof queueable !== 'object') {
      // It is not an object, so instantiate the Queueable with element as the data
      return new Queueable({ task: queueable })
    }
    if (queueable.classType) {
      // Already valid Queueable, return as-is
      return queueable
    }
    if (!queueable.task) {
      queueable = { task: queueable }
    }
    // Create the new node as the configured #classType
    return new Queueable(queueable)
  }

  /**
   * Convert an array into Queueable instances, return the head and tail Queueables.
   * @param {Array} values
   * @returns {{head: Queueable, tail: Queueable}}
   */
  public static fromArray = (values: Array<any>): { head: Queueable; tail: Queueable; } => values.reduce(
    (references, queueable) => {
      const newQueueable = Queueable.make(queueable)
      if (references.head === null) {
        // Initialize the head and tail with the new node
        return { head: newQueueable, tail: newQueueable }
      }
      // Only update the tail once head has been set, tail is always the most recent node
      references.tail.next = newQueueable
      references.tail = newQueueable
      return references
    },
    { head: null, tail: null }
  )
}

export default Queueable
