/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from '../arrayable/ArrayElement'

/**
 * Stackable represents a runnable entry in stack.
 * @extends ArrayElement
 * @extends Runnable
 */
class Stackable extends ArrayElement {
  /**
   * Instantiate the Stackable which is used in a stack.
   * @param {*} [stack=null]
   * @param stackableClass
   */
  constructor (stack = null, stackableClass = Stackable) {
    super(stack, stackableClass)
  }

  /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
  get task () {
    if (typeof this.data === 'function') {
      return this.data
    }
    return () => this.data
  }

  /**
   * Run the stacked task.
   * @return {*}
   */
  run () {
    return this.task()
  }
}

/**
 * Make a new Stackable from the data given if it is not already a valid Stackable.
 * @methodof Stackable
 * @param {Stackable|*} stackable
 * @param {Stackable} [stackableClass=Stackable]
 * @return {Stackable}
 */
Stackable.make = (stackable, stackableClass = Stackable) => {
  if (typeof stackable !== 'object') {
    // It is not an object, so instantiate the Stackable with stackable as the data
    return new stackableClass(stackable)
  }
  if (stackable.classType) {
    // Already valid Stackable, return as-is
    return stackable
  }
  // Create the new node as the configured stackableClass
  return new stackableClass(stackable, stackableClass)
}

/**
 * Convert an array into Stackable instances, return the head and tail Stackables.
 * @param {Array} [values=[]]
 * @param {Stackable} [stackableClass=Stackable]
 * @returns {{head: Stackable, tail: Stackable}}
 */
Stackable.fromArray = (values = [], stackableClass = Stackable) => ArrayElement.fromArray(values, stackableClass)

export default Stackable
