'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/web.dom-collections.iterator.js')
var _DoubleLinker = _interopRequireDefault(require('./DoubleLinker'))
var _DoubleLinkerIterator = _interopRequireDefault(require('../../recipes/DoubleLinkerIterator'))
var _LinkedList = _interopRequireDefault(require('../linked-list/LinkedList'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
class DoublyLinkedList {
  /**
   * Create the new DoublyLinkedList instance.
   */
  constructor () {
    const linkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DoubleLinker.default
    this.classType = DoublyLinkedList
    this.innerList = null
    this.initialized = false
    this.linkerClass = linkerClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {DoubleLinker} initialList Give the list of double-linkers to start in this doubly linked-list.
   * @return {DoublyLinkedList}
   */
  initialize (initialList) {
    return _LinkedList.default.prototype.initialize.call(this, initialList)
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {DoubleLinker}
   */
  get list () {
    return this.innerList
  }

  /**
   * Retrieve the first DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get first () {
    return this.reset()
  }

  /**
   * Retrieve the last DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get last () {
    let tail = this.innerList
    if (tail === null) {
      return null
    }
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
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go after the existing node
   * @returns {DoublyLinkedList}
   */
  insertAfter (node, newNode) {
    newNode = this.linkerClass.make(newNode)
    if (node !== null) {
      // Ensure the next reference of this node is assigned to the new node
      newNode.next = node.next
      // Ensure this node is assigned as the prev reference of the new node
      newNode.prev = node
      // Then set this node's next reference to the new node
      node.next = newNode
    }
    if (newNode.next) {
      // Update the next reference to ensure circular reference for prev points to the new node
      newNode.next.prev = newNode
    }
    if (!this.length) {
      this.innerList = newNode
    }
    this.reset()
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go before the existing node
   * @returns {DoublyLinkedList}
   */
  insertBefore (node, newNode) {
    newNode = this.linkerClass.make(newNode)
    if (node !== null) {
      // The new node will reference this prev node as prev
      newNode.prev = node.prev
      // The new node will reference this node as next
      newNode.next = node
      // This prev will reference the new node
      node.prev = newNode
    }
    if (newNode.prev) {
      // Update the prev reference to ensure circular reference for next points to the new node
      newNode.prev.next = newNode
    }
    if (!this.length) {
      this.innerList = newNode
    }
    this.reset()
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the end of the list
   * @param {DoubleLinker} after The existing last node
   * @returns {DoubleLinker}
   */
  append (node) {
    const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the start of the list
   * @param {DoubleLinker} before The existing first node
   * @returns {DoubleLinker}
   */
  prepend (node) {
    const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {DoubleLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {DoubleLinker}
   */
  remove (node) {
    if (node === null) {
      return null
    }
    if (node.prev) {
      // The previous node will reference this next node
      node.prev.next = node.next
    }
    if (node.next) {
      // The next node will reference this previous node
      node.next.prev = node.prev
    }
    // Update head reference
    this.reset()
    return node
  }

  /**
   * Refresh all references and return head reference.
   * @return {DoubleLinker}
   */
  reset () {
    // Start at the pointer for the list
    let pointer = this.innerList
    if (pointer === null) {
      return null
    }
    let next = pointer.next
    // Follow references till the end
    while (next !== null) {
      pointer = next
      next = pointer.next
    }
    let prev = pointer.prev
    // From final reference, follow references back to the beginning
    while (prev !== null) {
      pointer = prev
      prev = pointer.prev
    }
    // All the live references should have been found, and we are pointing to the true head
    this.innerList = pointer
    return pointer
  }

  /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {DoubleLinker|null}
   */
  item (index) {
    if (index >= 0) {
      // For a positive index, start from the beginning of the list until the current item counter equals our index
      let current = this.first
      let currentIndex = -1
      while (++currentIndex < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    // For a negative index, get the delta of index and length, then go backwards until we reach that delta
    let current = this.last
    let currentIndex = this.length
    const calculatedIndex = this.length + index
    if (calculatedIndex < 0) {
      return null
    }
    while (--currentIndex > calculatedIndex && current !== null) {
      current = current.prev
    }
    return currentIndex === calculatedIndex ? current : null
  }

  /**
   * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
   * @param {forEachCallback} callback The function to call for-each double linker
   * @param {DoublyLinkedList} thisArg Optional, 'this' reference
   */
  forEach (callback) {
    const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
    return _LinkedList.default.prototype.forEach.call(this, callback, thisArg)
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    const current = this.first
    return new _DoubleLinkerIterator.default(current)
  }
}
/**
 * Convert an array into a DoublyLinkedList instance, return the new instance.
 * @param {Array} [values=[]] An array of values which will be converted to linkers in this doubly-linked-list
 * @param {IsDoubleLinker} [linkerClass=DoubleLinker] The class to use for each linker
 * @param {IsArrayable<IsDoubleLinker>} [classType=LinkedList] Provide the type of IsArrayable to use.
 * @returns {DoublyLinkedList}
 */
DoublyLinkedList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _DoubleLinker.default
  const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DoublyLinkedList
  return _LinkedList.default.fromArray(values, linkerClass, classType)
}
var _default = exports.default = DoublyLinkedList
