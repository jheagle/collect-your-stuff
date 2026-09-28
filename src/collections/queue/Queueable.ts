/**
 * queueable item.
 */
import { completeResponse, IsRunnable } from '../../recipes/Runnable'
import { IsLinker } from '../../recipes/IsLinker'
import { Linker } from '../linked-list/Linker'

/**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 */
export class Queueable implements IsLinker, IsRunnable {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof Queueable
  /** The task (or data) this queueable holds. */
  public data: any = null
  /** The queueable after this one, or null when this is the last. */
  public next: Queueable | null = null
  /** Whether this queueable has been run to completion. */
  public complete: boolean = false
  /** Whether this queueable may run, or a function which answers that when asked. */
  public ready: Function | boolean = false
  /** Whether this queueable is running right now. */
  public running: boolean = false

  /**
   * Create a queueable item that can be used in a queue.
   * @param queueableData The settings for the new queueable.
   * @param queueableData.task The data to be stored in this queueable
   * @param queueableData.next The reference to the next queueable if any
   * @param queueableData.ready Indicate if the queueable is ready to run
   */
  public constructor ({ task = null, next = null, ready = false }: {
    task?: any;
    next?: Queueable | null;
    ready?: boolean | Function
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
   */
  public get isReady (): boolean {
    return typeof this.ready === 'function' ? this.ready() : this.ready
  }

  /**
   * Retrieve the data which should be formed as a task.
   */
  public get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return (complete: Function | any) => typeof complete === 'function' ? complete({ context: this.data }).context : this.data
  }

  /**
   * Set this queueable as completed.
   * @param completeResponse The result to report for the task.
   * @param completeResponse.success Indicate when the task failed (use false) or give a success message
   * @param completeResponse.error Indicate a task was error-free (use false) or give an error message
   * @param completeResponse.context Provide additional data in the response
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
   * @param queueable Return a valid Queueable instance from given data, or even an already valid one.
   * @param classType Provide the type of IsLinker to use.
   */
  public static make = (queueable: Queueable | any, classType: any = Queueable): IsLinker => {
    if (queueable === null || typeof queueable !== 'object') {
      // It is not an object (or it is null), so instantiate the Queueable with an element as the data
      return new classType({ task: queueable, ready: true })
    }
    if (queueable.classType) {
      // Already valid Queueable, return as-is
      return queueable
    }
    if (!('task' in queueable)) {
      queueable = { task: queueable, ready: true }
    }
    // Create the new node as the configured #classType
    return new classType(queueable)
  }

  /**
   * Convert an array into Queueable instances, return the head and tail Queueables.
   * @param values Provide an array of data that will be converted to a chain of queueable linkers.
   * @param classType Provide the type of IsLinker to use.
   */
  public static fromArray = (values: Array<any> = [], classType: any = Queueable): {
    head: IsLinker;
    tail: IsLinker;
  } => Linker.fromArray(values, classType)
}
