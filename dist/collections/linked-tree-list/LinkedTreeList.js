'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _TreeLinker = _interopRequireDefault(require('./TreeLinker'))
var _LinkerIterator = _interopRequireDefault(require('../../recipes/LinkerIterator'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 */
class LinkedTreeList {
  /**
   * Create the new LinkedTreeList instance, configure the list class.
   */
  constructor () {
    this.classType = null
    this.innerList = null
    this.initialized = false
    this.classType = LinkedTreeList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {TreeLinker} initialList
   * @return {LinkedTreeList}
   */
  initialize (initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedList which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {TreeLinker}
   */
  get list () {
    return this.innerList
  }

  /**
   * Retrieve the first TreeLinker in the list.
   * @returns {TreeLinker}
   */
  get first () {
    return this.reset()
  }

  /**
   * Retrieve the last TreeLinker in the list.
   * @returns {TreeLinker}
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
   * Alias for getting the inner list
   */
  get children () {
    return this.innerList
  }

  /**
   * Set the inner list to new children
   * @param {TreeLinker} children
   */
  set children (children) {
    const parent = this.parent
    this.innerList = children
    this.parent = parent
  }

  /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
  get parent () {
    const first = this.first
    if (first === null) {
      return null
    }
    return this.first.parent
  }

  /**
   * Set the parent of this tree list
   * @param {TreeLinker} parent
   */
  set parent (parent) {
    let current = this.first
    while (current !== null) {
      current.parent = parent
      current = current.next
    }
    if (parent) {
      parent.children = this
    }
  }

  /**
   * Return the root parent of the entire tree.
   * @return {TreeLinker}
   */
  get rootParent () {
    let current = this.first
    let parent = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  /**
   * Set the children on a parent item.
   * @param {TreeLinker} item
   * @param {LinkedTreeList} children
   */
  setChildren (item) {
    const children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null
    if (Array.from(this).indexOf(item) < 0) {
      console.error('item is not a child of this')
    }
    children.parent = item
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {TreeLinker|*} node
   * @param {TreeLinker|*} newNode
   * @returns {LinkedTreeList}
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
   * @param {TreeLinker|*} node
   * @param {TreeLinker|*} newNode
   * @returns {LinkedTreeList}
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
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node
   * @param {TreeLinker} after
   * @returns {TreeLinker}
   */
  append (node) {
    const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {TreeLinker|*} node
   * @param {TreeLinker} before
   * @returns {TreeLinker}
   */
  prepend (node) {
    const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {TreeLinker} node
   * @return {TreeLinker}
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
   * @return {TreeLinker}
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
    // All the live references should have been found and we are pointing to the true head
    this.innerList = pointer
    return pointer
  }

  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index
   * @returns {TreeLinker|null}
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
   * Be able to run forEach on this LinkedTreeList ot iterate over the TreeLinker Items.
   * @param {forEachCallback} callback
   * @param {LinkedTreeList} thisArg
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
    const current = this.first
    return new _LinkerIterator.default(current)
  }
}
/**
 * Convert an array into a LinkedTreeList instance, return the new instance.
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @returns {LinkedTreeList}
 */
LinkedTreeList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _TreeLinker.default
  const list = new LinkedTreeList()
  return list.initialize(linkerClass.fromArray(values).head)
}
var _default = exports.default = LinkedTreeList
