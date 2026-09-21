'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Stack = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
var _LinkedList = require('../linked-list/LinkedList')
var _Linker = require('../linked-list/Linker')
/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 2.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
 * be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
 * time. To stack tasks which are run as they are taken use TaskStack.
 */
class Stack {
  /**
   * Instantiate the stack, optionally with a list of items to start from.
   * @param {IsArrayable|null} [stackedList=null] The list of linkers to start in this stack (the first is the top)
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no stacked list is given
   * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
   */
  constructor (stackedList = null, listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) {
    this.linkerClass = linkerClass
    this.stackedList = stackedList === null ? new listClass(linkerClass) : stackedList
  }

  /**
   * Check whether the stack has no items.
   * @return {boolean}
   */
  empty () {
    return this.size() <= 0
  }

  /**
   * Look at the item on the top of the stack, without removing it.
   * @return {*|null} The item, or null when the stack is empty
   */
  peek () {
    const top = this.stackedList.first
    return top === null || typeof top === 'undefined' ? null : top.data
  }

  /**
   * Take the item from the top of the stack.
   * @return {*|null} The item, or null when the stack is empty
   */
  pop () {
    const top = this.stackedList.first
    if (top === null || typeof top === 'undefined') {
      return null
    }
    this.stackedList.remove(top)
    return top.data
  }

  /**
   * Add an item to the top of the stack.
   * @param {*} data The item to add
   * @return {Stack} This stack, so that adding can be chained
   */
  push (data) {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a stack must give back exactly what it was given
    this.stackedList.prepend(new this.linkerClass({
      data
    }))
    return this
  }

  /**
   * Count the items in the stack.
   * @return {number}
   */
  size () {
    return this.stackedList.length
  }

  /**
   * The item on the top of the stack (the same as peek).
   * @return {*|null} The item, or null when the stack is empty
   */
  top () {
    return this.peek()
  }

  /**
   * Iterate over the items from the top of the stack to the bottom, without removing them.
   * @return {Iterator}
   */
  [Symbol.iterator] () {
    const linkers = this.stackedList[Symbol.iterator]()
    return {
      next: () => {
        const result = linkers.next()
        return result.done ? {
          done: true,
          value: undefined
        } : {
          done: false,
          value: result.value.data
        }
      }
    }
  }
}
/**
 * Convert an array to a Stack by pushing each value in turn, so the last value is on the top.
 * @param {Array} [values=[]] The items to stack
 * @param {IsArrayable} [listClass=LinkedList] The type of list used to store the items
 * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
 * @returns {Stack}
 */
exports.Stack = Stack
Stack.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
  const stack = new Stack(null, listClass, linkerClass)
  values.forEach(value => stack.push(value))
  return stack
}
