/**
 * stack.
 */
import { IsRunnable } from '../../recipes/Runnable'
import { IsLinker } from '../../recipes/IsLinker'
import { Linker } from '../linked-list/Linker'

/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
export class Stackable implements IsLinker, IsRunnable {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof Stackable
  /** The task (or data) this stackable holds. */
  public data: any = null
  /** The stackable below this one, or null when this is the bottom. */
  public next: Stackable | null = null

  /**
   * Create a stackable item that can be used in a stack.
   * @param stackData The settings for the new stackable.
   * @param stackData.task The data to be stored in this stackable
   * @param stackData.next The reference to the next stackable if any
   * @param stackData.ready Indicate if the stackable is ready to run
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
   */
  public get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the stacked task.
   */
  public run (): any {
    return this.task()
  }

  /**
   * Make a new Stackable from the data given if it is not already a valid Stackable.
   * @param stackable Return a valid Stackable instance from given data, or even an already valid one.
   * @param classType Provide the type of IsLinker to use.
   */
  public static make = (stackable: Stackable | any, classType: any = Stackable): Stackable => {
    if (stackable === null || typeof stackable !== 'object') {
      // It is not an object (or it is null), so instantiate the Stackable with stackable as the data
      return new classType({ task: stackable })
    }
    if (stackable.classType) {
      // Already valid Stackable, return as-is
      return stackable
    }
    if (!('task' in stackable)) {
      stackable = { task: stackable }
    }
    // Create the new node as the configured stackableClass
    return new classType(stackable)
  }

  /**
   * Convert an array into Stackable instances, return the head and tail Stackables.
   * @param values Provide an array of data that will be converted to a chain of stackable linkers.
   * @param classType Provide the type of IsLinker to use.
   */
  public static fromArray = (values: Array<any> = [], classType: any = Stackable): {
    head: IsLinker;
    tail: IsLinker
  } =>  Linker.fromArray(values, classType)
}
