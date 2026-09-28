'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Stackable = void 0
const _Linker = require('../linked-list/Linker')
/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
class Stackable {
  /**
   * Create a stackable item that can be used in a stack.
   * @param stackData The settings for the new stackable.
   * @param stackData.task The data to be stored in this stackable
   * @param stackData.next The reference to the next stackable if any
   * @param stackData.ready Indicate if the stackable is ready to run
   */
  constructor ({
    task = null,
    next = null,
    ready = false
  } = {}) {
    /** The task (or data) this stackable holds. */
    this.data = null
    /** The stackable below this one, or null when this is the bottom. */
    this.next = null
    this.classType = Stackable
    this.data = task
    this.next = next
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
   * Run the stacked task.
   */
  run () {
    return this.task()
  }
}
/**
 * Make a new Stackable from the data given if it is not already a valid Stackable.
 * @param stackable Return a valid Stackable instance from given data, or even an already valid one.
 * @param classType Provide the type of IsLinker to use.
 */
exports.Stackable = Stackable
Stackable.make = (stackable, classType = Stackable) => {
  if (stackable === null || typeof stackable !== 'object') {
    // It is not an object (or it is null), so instantiate the Stackable with stackable as the data
    return new classType({
      task: stackable
    })
  }
  if (stackable.classType) {
    // Already valid Stackable, return as-is
    return stackable
  }
  if (!('task' in stackable)) {
    stackable = {
      task: stackable
    }
  }
  // Create the new node as the configured stackableClass
  return new classType(stackable)
}
/**
 * Convert an array into Stackable instances, return the head and tail Stackables.
 * @param values Provide an array of data that will be converted to a chain of stackable linkers.
 * @param classType Provide the type of IsLinker to use.
 */
Stackable.fromArray = (values = [], classType = Stackable) => _Linker.Linker.fromArray(values, classType)
