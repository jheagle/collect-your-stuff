'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TaskStack = void 0
const _Stackable = require('./Stackable')
const _LinkedList = require('../linked-list/LinkedList')
/**
 * @file task stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Store a collection of tasks (Stackables) which can only be inserted and removed from the top: pop() takes the task from
 * the top and RUNS it. For a plain last-in-first-out collection of items use Stack.
 */
class TaskStack {
  /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|LinkedList} [stackedList=null] The list of stackables to start in this stack.
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no stacked list is given.
   * @param {Stackable} [stackableClass=Stackable] The class used to wrap stacked items.
   */
  constructor (stackedList = null, listClass = _LinkedList.LinkedList, stackableClass = _Stackable.Stackable) {
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
 * Convert an array to a TaskStack.
 * @param {Array} values An array of values which will be converted to stackables in this queue
 * @param {Stackable} stackableClass The class to use for each stackable
 * @param {TaskStack|Iterable} listClass The class to use to manage the stackables
 * @returns {TaskStack}
 */
exports.TaskStack = TaskStack
TaskStack.fromArray = (values = [], stackableClass = _Stackable.Stackable, listClass = _LinkedList.LinkedList) => {
  const list = new listClass(stackableClass)
  list.initialize(stackableClass.fromArray(values, stackableClass).head)
  return new TaskStack(list, listClass, stackableClass)
}
