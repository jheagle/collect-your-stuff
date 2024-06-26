'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Arrayable = void 0
var _ArrayElement = require('./ArrayElement')
var _ArrayIterator = require('../../recipes/ArrayIterator')
/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Arrayable represents a collection stored as an array.
 */
class Arrayable {
  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   */
  constructor () {
    const elementClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ArrayElement.ArrayElement
    this.classType = Arrayable
    this.innerList = []
    this.initialized = false
    this.elementClass = elementClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Array<ArrayElement>} initialList Give the array of elements to start in this Arrayable.
   * @return {Arrayable}
   */
  initialize (initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize non-empty list.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Array<ArrayElement>}
   */
  get list () {
    return this.innerList
  }

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {ArrayElement}
   */
  get first () {
    return this.innerList[0]
  }

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {ArrayElement}
   */
  get last () {
    return this.innerList[this.length - 1]
  }

  /**
   * Return the length of the list.
   * @returns {number}
   */
  get length () {
    return this.innerList.length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go after the existing node
   * @returns {Arrayable}
   */
  insertAfter (node, newNode) {
    const insertAt = this.innerList.indexOf(node)
    this.innerList.splice(insertAt + 1, 0, this.elementClass.make(newNode))
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go before the existing node
   * @returns {Arrayable}
   */
  insertBefore (node, newNode) {
    const insertAt = this.innerList.indexOf(node)
    this.innerList.splice(insertAt, 0, this.elementClass.make(newNode))
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node The new node to add to the end of the list
   * @param {ArrayElement} after The existing last node
   * @returns {Arrayable}
   */
  append (node) {
    const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node The new node to add to the start of the list
   * @param {ArrayElement} before The existing first node
   * @returns {Arrayable}
   */
  prepend (node) {
    const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
    return this.insertBefore(before, node)
  }

  /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node The node we wish to remove (and it will be returned after removal)
   * @return {ArrayElement}
   */
  remove (node) {
    const deleteAt = this.innerList.indexOf(node)
    this.innerList.splice(deleteAt, 1)
    return node
  }

  /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @return {ArrayElement|null}
   */
  item (index) {
    if (index >= this.length) {
      // index is beyond array limit
      return null
    }
    if (index >= 0) {
      // use the positive index at nth position from the beginning of the array
      return this.innerList[index]
    }
    const calculatedIndex = this.length + index
    if (calculatedIndex < 0) {
      // negative index is beyond array limit (minus direction)
      return null
    }
    // Return the item at nth position from the end of the array
    return this.innerList[calculatedIndex]
  }

  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback The function to call for-each element
   * @param {Arrayable} thisArg Optional, 'this' reference
   * @returns {Arrayable}
   */
  forEach (callback) {
    const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
    for (let i = 0; i < thisArg.length; ++i) {
      callback(thisArg.item(i), i, thisArg)
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    const index = 0
    return new _ArrayIterator.ArrayIterator(this.innerList, index)
  }
}
/**
 * Convert an array to an Arrayable.
 * @param {Array} values An array of values which will be converted to elements in this arrayable
 * @param {IsElement} [elementClass=ArrayElement] The class to use for each element
 * @param {IsArrayable<ArrayElement>} [classType=Arrayable] Provide the type of IsArrayable to use.
 * @returns {Arrayable}
 */
exports.Arrayable = Arrayable
Arrayable.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const elementClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ArrayElement.ArrayElement
  const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Arrayable
  const list = new classType(elementClass)
  return list.initialize(elementClass.fromArray(values).head)
}
