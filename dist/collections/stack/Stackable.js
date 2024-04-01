'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Stackable = void 0
var _Linker = require('../linked-list/Linker')
/**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
class Stackable {
  /**
   * Create a stackable item that can be used in a stack.
   * @param {Object} [stackData={}]
   * @param {*} [stackData.task=null] The data to be stored in this stackable
   * @param {Stackable|null} [stackData.next=null] The reference to the next stackable if any
   * @param {boolean|Function} [stackData.ready=false] Indicate if the stackable is ready to run
   */
  constructor () {
    const {
      task = null,
      next = null,
      ready = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.data = null
    this.next = null
    this.classType = Stackable
    this.data = task
    this.next = next
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
 * @param {Stackable|*} stackable Return a valid Stackable instance from given data, or even an already valid one.
 * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
 * @return {Stackable}
 */
exports.Stackable = Stackable
Stackable.make = function (stackable) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
  if (typeof stackable !== 'object') {
    // It is not an object, so instantiate the Stackable with stackable as the data
    return new classType({
      task: stackable
    })
  }
  if (stackable.classType) {
    // Already valid Stackable, return as-is
    return stackable
  }
  if (!stackable.task) {
    stackable = {
      task: stackable
    }
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
Stackable.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
  return _Linker.Linker.fromArray(values, classType)
}
