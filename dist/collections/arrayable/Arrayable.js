'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _ArrayElement = _interopRequireDefault(require('./ArrayElement'))
var _ArrayIterator = _interopRequireDefault(require('../../recipes/ArrayIterator'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
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
    this.classType = null
    this.innerList = []
    this.initialized = false
    this.classType = Arrayable
    this.initialized = false
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {ArrayElement|Array} initialList
   * @return {Arrayable}
   */
  initialize (initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize Arrayable which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Array}
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
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertAfter (node, newNode) {
    const insertAt = this.innerList.indexOf(node)
    this.innerList.splice(insertAt + 1, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertBefore (node, newNode) {
    const insertAt = this.innerList.indexOf(node)
    this.innerList.splice(insertAt, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node
   * @param {ArrayElement} after
   * @returns {Arrayable}
   */
  append (node) {
    const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node
   * @param {ArrayElement} before
   * @returns {Arrayable}
   */
  prepend (node) {
    const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
    return this.insertBefore(before, node)
  }

  /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node
   * @return {ArrayElement}
   */
  remove (node) {
    const deleteAt = this.innerList.indexOf(node)
    this.innerList.splice(deleteAt, 1)
    return node
  }

  /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param {number} index
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
   * @param {forEachCallback} callback
   * @param {Arrayable} thisArg
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
    return new _ArrayIterator.default(this.innerList, index)
  }
}
/**
 * Convert an array to an Arrayable.
 * @param {Array} values
 * @param {ArrayElement} elementClass
 * @returns {Arrayable}
 */
Arrayable.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const elementClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ArrayElement.default
  const list = new Arrayable()
  return list.initialize(elementClass.fromArray(values).head)
}
var _default = exports.default = Arrayable
