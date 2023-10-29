'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _DoubleLinker = _interopRequireDefault(require('./DoubleLinker'))
var _LinkedList = _interopRequireDefault(require('../linked-list/LinkedList'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
class DoublyLinkedList extends _LinkedList.default {
  /**
   * Create the new DoublyLinkedList instance, configure the Linker and List classes.
   * @param {DoublyLinkedList|Iterable} [listClass=DoublyLinkedList]
   */
  constructor () {
    const listClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DoublyLinkedList
    super(listClass)
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
   * @method
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker|*} newNode
   * @returns {DoublyLinkedList}
   */
  insertAfter (node, newNode) {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Ensure this node is assigned as the prev reference of the new node
    newNode.prev = node
    // Then set this node's next reference to the new node
    node.next = newNode
    if (newNode.next) {
      // Update the next reference to ensure circular reference for prev points to the new node
      newNode.next.prev = newNode
    }
    this.reset()
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @method
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker|*} newNode
   * @returns {DoublyLinkedList}
   */
  insertBefore (node, newNode) {
    newNode = node.classType.make(newNode)
    // The new node will reference this prev node as prev
    newNode.prev = node.prev
    // The new node will reference this node as next
    newNode.next = node
    // This prev will reference the new node
    node.prev = newNode
    if (newNode.prev) {
      // Update the prev reference to ensure circular reference for next points to the new node
      newNode.prev.next = newNode
    }
    this.reset()
    return this
  }

  /**
   * Remove a linker from this linked list.
   * @method
   * @param {DoubleLinker} node
   * @return {DoubleLinker}
   */
  remove (node) {
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
    // All the live references should have been found and we are pointing to the true head
    this.innerList = pointer
    return pointer
  }

  /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @method
   * @param {number} index
   * @returns {DoubleLinker|null}
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
   * Be able to run forEach on this DoublyLinkedList ot iterate over the DoubleLinker Items.
   * @param {forEachCallback} callback
   * @param {DoublyLinkedList} thisArg
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
  }

  /**
   * Be able to iterate over this class.
   * @method
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    let current = this.first
    return {
      next: () => {
        const result = {
          value: current,
          done: !current
        }
        current = current ? current.next : null
        return result
      }
    }
  }
}

/**
 * Convert an array into a DoublyLinkedList instance, return the new instance.
 * @methodof DoublyLinkedList
 * @param {Array} [values=[]]
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @param {DoublyLinkedList} [listClass=DoublyLinkedList]
 * @returns {DoublyLinkedList}
 */
DoublyLinkedList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _DoubleLinker.default
  const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DoublyLinkedList
  return _LinkedList.default.fromArray(values, linkerClass, listClass)
}
var _default = exports.default = DoublyLinkedList
