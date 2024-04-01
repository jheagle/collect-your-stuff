/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsRunnable } from '../../recipes/Runnable'
import { IsLinker } from '../../recipes/IsLinker'
import { Linker } from '../linked-list/Linker'

/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
export class Stackable implements IsLinker, IsRunnable {
  public readonly classType: typeof Stackable
  public data: any = null
  public next: Stackable | null = null

  /**
   * Create a stackable item that can be used in a stack.
   * @param {Object} [stackData={}]
   * @param {*} [stackData.task=null] The data to be stored in this stackable
   * @param {Stackable|null} [stackData.next=null] The reference to the next stackable if any
   * @param {boolean|Function} [stackData.ready=false] Indicate if the stackable is ready to run
   */
  public constructor ({ task = null, next = null, ready = false }: {
    task?: any;
    next?: Stackable | null;
    ready?: boolean
  } = {}) {
    this.classType = Stackable
    this.data = task
    this.next = next
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  public get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the stacked task.
   * @return {*}
   */
  public run (): any {
    return this.task()
  }

  /**
   * Make a new Stackable from the data given if it is not already a valid Stackable.
   * @param {Stackable|*} stackable Return a valid Stackable instance from given data, or even an already valid one.
   * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
   * @return {Stackable}
   */
  public static make = (stackable: Stackable | any, classType: any = Stackable): Stackable => {
    if (typeof stackable !== 'object') {
      // It is not an object, so instantiate the Stackable with stackable as the data
      return new classType({ task: stackable })
    }
    if (stackable.classType) {
      // Already valid Stackable, return as-is
      return stackable
    }
    if (!stackable.task) {
      stackable = { task: stackable }
    }
    // Create the new node as the configured stackableClass
    return new Stackable(stackable)
  }

  /**
   * Convert an array into Stackable instances, return the head and tail Stackables.
   * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of stackable linkers.
   * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
   * @returns {{head: Stackable, tail: Stackable}}
   */
  public static fromArray = (values: Array<any> = [], classType: any = Stackable): {
    head: IsLinker;
    tail: IsLinker
  } =>  Linker.fromArray(values, classType)
}
