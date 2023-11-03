/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'
import { IsRunnable } from '../../recipes/Runnable'

/**
 * Stackable represents a runnable entry in stack.
 */
class Stackable implements IsElement<Stackable>, IsRunnable {
  public readonly classType: typeof Stackable
  public data: any = null
    /**
   * Instantiate the Stackable which is used in a stack.
   * @param {*} [stack=null]
   */
  constructor (stack: any = null) {
      this.classType = Stackable
      this.data = stack
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  get task (): any {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the stacked task.
   * @return {*}
   */
  run (): any {
    return this.task()
  }

  /**
   * Make a new Stackable from the data given if it is not already a valid Stackable.
   * @methodof Stackable
   * @param {Stackable|*} stackable
   * @return {Stackable}
   */
  public static make = (stackable: Stackable | any): Stackable => {
    if (typeof stackable !== 'object') {
      // It is not an object, so instantiate the Stackable with stackable as the data
      return new Stackable(stackable)
    }
    if (stackable.classType) {
      // Already valid Stackable, return as-is
      return stackable
    }
    // Create the new node as the configured stackableClass
    return new Stackable(stackable)
  }

  /**
   * Convert an array into Stackable instances, return the head and tail Stackables.
   * @param {Array} [values=[]]
   * @returns {{head: Stackable, tail: Stackable}}
   */
  public static fromArray = (values: Array<any> = []): { head: Stackable; tail: Stackable } => values.reduce(
    (references, stackable) => {
      const newStackable = Stackable.make(stackable)
      if (!references.head.length) {
        // Initialize the head and tail with the new node
        return { head: [newStackable], tail: newStackable }
      }
      // Only update the tail once head has been set, tail is always the most recent node
      references.head.push(newStackable)
      references.tail = newStackable
      return references
    },
    { head: [], tail: null }
  )
}

export default Stackable
