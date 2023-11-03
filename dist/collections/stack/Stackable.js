'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
/**
 * Stackable represents a runnable entry in stack.
 */
class Stackable {
  /**
  * Instantiate the Stackable which is used in a stack.
  * @param {*} [stack=null]
  */
  constructor () {
    const stack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    this.data = null
    this.classType = Stackable
    this.data = stack
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
 * @return {Stackable}
 */
Stackable.make = stackable => {
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
Stackable.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  return values.reduce((references, stackable) => {
    const newStackable = Stackable.make(stackable)
    if (!references.head.length) {
      // Initialize the head and tail with the new node
      return {
        head: [newStackable],
        tail: newStackable
      }
    }
    // Only update the tail once head has been set, tail is always the most recent node
    references.head.push(newStackable)
    references.tail = newStackable
    return references
  }, {
    head: [],
    tail: null
  })
}
var _default = exports.default = Stackable
