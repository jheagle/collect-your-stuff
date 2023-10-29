'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _ArrayElement = _interopRequireDefault(require('../arrayable/ArrayElement'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Stackable represents a runnable entry in stack.
 * @extends ArrayElement
 * @extends Runnable
 */
class Stackable extends _ArrayElement.default {
  /**
   * Instantiate the Stackable which is used in a stack.
   * @param {*} [stack=null]
   * @param stackableClass
   */
  constructor () {
    const stack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const stackableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
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
Stackable.make = function (stackable) {
  const stackableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
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
Stackable.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const stackableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
  return _ArrayElement.default.fromArray(values, stackableClass)
}
var _default = exports.default = Stackable
