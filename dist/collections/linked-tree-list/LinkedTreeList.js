'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _DoublyLinkedList = _interopRequireDefault(require('../doubly-linked-llist/DoublyLinkedList'))
var _TreeLinker = _interopRequireDefault(require('./TreeLinker'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation..
 * @extends DoublyLinkedList
 */
class LinkedTreeList extends _DoublyLinkedList.default {
  /**
   * Create the new LinkedTreeList instance, configure the list class.
   * @param {LinkedTreeList|Iterable} [listClass=LinkedTreeList]
   */
  constructor () {
    const listClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LinkedTreeList
    super(listClass)
  }

  /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
  get parent () {
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
}

/**
 * Create an instance of LinkedTreeList from an array
 * @memberof LinkedTreeList
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @param {LinkedTreeList} [listClass=LinkedTreeList]
 * @returns {DoublyLinkedList}
 */
LinkedTreeList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _TreeLinker.default
  const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedTreeList
  return _DoublyLinkedList.default.fromArray(values, linkerClass, listClass)
}
var _default = exports.default = LinkedTreeList
