'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Stack = void 0
var _Stackable = require('./Stackable')
var _LinkedList = require('../linked-list/LinkedList')
/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Store a collection of items which can only be inserted and removed from the top.
 */
class Stack {
  /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|LinkedList} stackedList
   * @param {IsArrayable} listClass
   * @param {Stackable} stackableClass
   */
  constructor () {
    let stackedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedList.LinkedList
    const stackableClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Stackable.Stackable
    this.listClass = listClass
    this.stackableClass = stackableClass
    if (stackedList === null) {
      stackedList = new listClass(stackableClass)
    }
    this.stackedList = stackedList
  }

  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   * @return {boolean}
   */
  empty () {
    return this.size() <= 0
  }

  /**
   * Take a look at the next stacked task
   * @return {Stackable}
   */
  top () {
    return this.stackedList.first
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  pop () {
    const next = this.remove()
    if (!next) {
      return {
        success: 'No more stackable tasks in the stack',
        error: false,
        context: this.stackedList
      }
    }
    return next.run()
  }

  /**
   * Push a stackable task to the top of the stack.
   * @param {Stackable|*} stackable Add a new stackable to the top of the stack
   */
  push (stackable) {
    this.stackedList.prepend(stackable)
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  remove () {
    if (this.empty()) {
      return null
    }
    return this.stackedList.remove(this.stackedList.first)
  }

  /**
   * Get the size of the current stack.
   * @return {number}
   */
  size () {
    return this.stackedList.length
  }
}
/**
 * Convert an array to a Stack.
 * @param {Array} values An array of values which will be converted to stackables in this queue
 * @param {Stackable} stackableClass The class to use for each stackable
 * @param {Stack|Iterable} listClass The class to use to manage the stackables
 * @returns {Stack}
 */
exports.Stack = Stack
Stack.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const stackableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Stackable.Stackable
  const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedList.LinkedList
  const list = new listClass(stackableClass)
  list.initialize(stackableClass.fromArray(values, stackableClass).head)
  return new Stack(list)
}
