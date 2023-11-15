/**
 * @file queueable item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { completeResponse, IsRunnable } from '../../recipes/Runnable'
import IsLinker from '../../recipes/IsLinker'
import Linker from '../linked-list/Linker'

/**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 */
class Queueable implements IsLinker, IsRunnable {
  public readonly classType: typeof Queueable
  public data: any = null
  public next: Queueable | null = null
  public complete: boolean = false
  public ready: Function | boolean = false
  public running: boolean = false

  /**
   * Create a queueable item that can be used in a queue.
   * @param {Object} [queueableData={}]
   * @param {*} [queueableData.task=null] The data to be stored in this queueable
   * @param {Queueable|null} [queueableData.next=null] The reference to the next queueable if any
   * @param {boolean|Function} [queueableData.ready=false] Indicate if the queueable is ready to run
   */
  public constructor ({ task = null, next = null, ready = false }: {
    task?: any;
    next?: Queueable | null;
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
  public get isReady (): boolean {
    return typeof this.ready === 'function' ? this.ready() : this.ready
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  public get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return (complete: Function | any) => typeof complete === 'function' ? complete({ context: this.data }).context : this.data
  }

  /**
   * Set this queueable as completed.
   * @param {Object} completeResponse
   * @param {*} [completeResponse.success=true] Indicate when the task failed (use false) or give a success message
   * @param {*} [completeResponse.error=false] Indicate a task was error-free (use false) or give an error message
   * @param {*} [completeResponse.context=null] Provide additional data in the response
   * @return {completeResponse}
   */
  public markCompleted ({ success = true, error = false, context = null }: {
    success?: any;
    error?: any;
    context?: any
  } = {}): completeResponse {
    this.complete = true
    this.running = false
    return { success: success, error: error, context: context }
  }

  /**
   * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
   * @return {completeResponse}
   */
  public run (): completeResponse {
    if (!this.isReady) {
      // Not yet ready, return with errors
      return {
        success: false,
        error: 'Task is not ready',
        context: this.data,
      }
    }
    if (this.running) {
      // Already running, return error since we cannot run again
      return {
        success: false,
        error: 'Queued task is already running, possible missing \'complete\' callback',
        context: this.data,
      }
    }
    this.running = true
    // Wrap the task in the markCompleted function, so we can set flags and format the response
    return this.task(this.markCompleted.bind(this))
  }

  /**
   * Make a new Queueable from the data given if it is not already a valid Queueable.
   * @param {Queueable|*} queueable Return a valid Queueable instance from given data, or even an already valid one.
   * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
   * @return {Queueable}
   */
  public static make = (queueable: Queueable | any, classType: any = Queueable): IsLinker => {
    if (typeof queueable !== 'object') {
      // It is not an object, so instantiate the Queueable with an element as the data
      return new classType({ task: queueable, ready: true })
    }
    if (queueable.classType) {
      // Already valid Queueable, return as-is
      return queueable
    }
    if (!queueable.task) {
      queueable = { task: queueable, ready: true }
    }
    // Create the new node as the configured #classType
    return new classType(queueable)
  }

  /**
   * Convert an array into Queueable instances, return the head and tail Queueables.
   * @param {Array} values Provide an array of data that will be converted to a chain of queueable linkers.
   * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
   * @returns {{head: Queueable, tail: Queueable}}
   */
  public static fromArray = (values: Array<any>, classType: any = Queueable): {
    head: IsLinker;
    tail: IsLinker;
  } => Linker.fromArray(values, classType)
}

export default Queueable
