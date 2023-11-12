'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _Linker = _interopRequireDefault(require('./Linker'))
var _LinkerIterator = _interopRequireDefault(require('../../recipes/LinkerIterator'))
var _Arrayable = _interopRequireDefault(require('../arrayable/Arrayable'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
class LinkedList {
  /**
   * Create the new LinkedList instance.
   */
  constructor () {
    this.classType = null
    this.innerList = null
    this.initialized = false
    this.classType = LinkedList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
   * @return {LinkedList}
   */
  initialize (initialList) {
    return _Arrayable.default.prototype.initialize.call(this, initialList)
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Linker}
   */
  get list () {
    return this.innerList
  }

  /**
   * Retrieve the first Linker in the list.
   * @returns {Linker}
   */
  get first () {
    return this.innerList
  }

  /**
   * Retrieve the last Linker in the list.
   * @returns {Linker}
   */
  get last () {
    let tail = this.innerList
    let next = tail.next
    while (next !== null) {
      tail = next
      next = tail.next
    }
    return tail
  }

  /**
   * Return the length of the list.
   * @returns {number}
   */
  get length () {
    let current = this.first
    let length = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go after the existing node
   * @returns {LinkedList}
   */
  insertAfter (node, newNode) {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Then set this node's next reference to the new node
    node.next = newNode
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go before the existing node
   * @returns {LinkedList}
   */
  insertBefore (node, newNode) {
    newNode = node.classType.make(newNode)
    let prevNode = null
    let currentNode = this.first
    while (currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    // The new node will reference this node as next
    newNode.next = node
    if (prevNode) {
      // Ensure the next reference of the previous node is assigned to the new node
      prevNode.next = newNode
    }
    if (node === this.first) {
      this.innerList = newNode
    }
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {Linker|*} node The new node to add to the end of the list
   * @param {Linker} after The existing last node
   * @returns {Linker}
   */
  append (node) {
    const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {Linker|*} node The new node to add to the start of the list
   * @param {Linker} before The existing first node
   * @returns {Linker}
   */
  prepend (node) {
    const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {Linker} node The node we wish to remove (and it will be returned after removal)
   * @return {Linker}
   */
  remove (node) {
    let prevNode = null
    let currentNode = this.first
    while (currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    if (prevNode) {
      // Ensure the next reference of the previous node skips over the removed node
      prevNode.next = node.next
    }
    if (node === this.first) {
      // Update list head to point to next if it was this node
      this.innerList = node.next
    }
    return node
  }

  /**
   * Retrieve a Linker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {Linker|null}
   */
  item (index) {
    if (index >= 0) {
      let current = this.first
      let currentIndex = -1
      while (++currentIndex < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current = this.first
    let currentIndex = 0
    const calculatedIndex = this.length + index
    if (calculatedIndex < 0) {
      return null
    }
    while (currentIndex < calculatedIndex && current !== null) {
      current = current.next
      ++currentIndex
    }
    return currentIndex === calculatedIndex ? current : null
  }

  /**
   * Be able to run forEach on this LinkedList to iterate over the linkers.
   * @param {forEachCallback} callback The function to call for-each linker
   * @param {LinkedList} thisArg Optional, 'this' reference
   * @returns {LinkedList}
   */
  forEach (callback) {
    const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
    let index = 0
    let current = thisArg.first
    while (current !== null) {
      callback(current, index, thisArg)
      current = current.next
      ++index
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    return new _LinkerIterator.default(this.first)
  }
}
/**
 * Convert an array to a LinkedList.
 * @param {Array} values An array of values which will be converted to linkers in this linked-list
 * @param {IsLinker} linkerClass The class to use for each linker
 * @param {IsArrayable<Linker>} [classType=LinkedList] Provide the type of IsArrayable to use.
 * @returns {LinkedList}
 */
LinkedList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Linker.default
  const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedList
  const list = new classType()
  return list.initialize(linkerClass.fromArray(values).head)
}
var _default = exports.default = LinkedList
