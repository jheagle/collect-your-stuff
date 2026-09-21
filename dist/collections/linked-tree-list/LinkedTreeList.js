'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LinkedTreeList = void 0
var _TreeLinker = require('./TreeLinker')
var _TreeLinkerIterator = require('../../recipes/TreeLinkerIterator')
var _DoublyLinkedList = require('../doubly-linked-list/DoublyLinkedList')
/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Use one of the accessors of DoublyLinkedList (which keeps track of the head, tail and length) for a LinkedTreeList.
 * @param {string} name The accessor to use
 * @param {LinkedTreeList} list The list to use it on
 * @returns {*}
 */
const borrowedGetter = (name, list) => Object.getOwnPropertyDescriptor(_DoublyLinkedList.DoublyLinkedList.prototype, name).get.call(list)
/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
class LinkedTreeList {
  /**
   * Create the new LinkedTreeList instance, configure the list class.
   * @param {TreeLinker} [linkerClass=TreeLinker] The class used to wrap given data as tree linkers.
   */
  constructor (linkerClass = _TreeLinker.TreeLinker) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = LinkedTreeList
    /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
    this.innerList = null
    /** Whether the inner list has been initialized (it can only be initialized once). */
    this.initialized = false
    /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
    this.tailCache = null
    /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
    this.countCache = null
    this.linkerClass = linkerClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {TreeLinker} initialList Give the list of tree-linkers to start in this linked-tree-list.
   * @return {LinkedTreeList}
   */
  initialize (initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedTreeList which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve the innerList used (the list itself, not a copy).
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
    return borrowedGetter('first', this)
  }

  /**
   * Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.
   * @returns {TreeLinker}
   */
  get last () {
    return borrowedGetter('last', this)
  }

  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   * @returns {number}
   */
  get length () {
    return borrowedGetter('length', this)
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
   * @param {TreeLinker} parent The new node to use as the parent for this group of children
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
    if (!current) {
      return null
    }
    let parent = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  /**
   * Set the children on a parent item.
   * @param {TreeLinker} item The TreeLinker node that will be the parent of the children
   * @param {LinkedTreeList} children The LinkedTreeList which has the child nodes to use
   */
  setChildren (item, children = null) {
    if (Array.from(this).indexOf(item) < 0) {
      console.error('item is not a child of this')
    }
    children.parent = item
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go after the existing node
   * @returns {LinkedTreeList}
   */
  insertAfter (node, newNode) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.insertAfter.call(this, node, newNode)
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go before the existing node
   * @returns {LinkedTreeList}
   */
  insertBefore (node, newNode) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.insertBefore.call(this, node, newNode)
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node The new node to add to the end of the list
   * @param {TreeLinker} after The existing last node
   * @returns {TreeLinker}
   */
  append (node, after = this.last) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.append.call(this, node, after)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {TreeLinker|*} node The new node to add to the start of the list
   * @param {TreeLinker} before The existing first node
   * @returns {TreeLinker}
   */
  prepend (node, before = this.first) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.prepend.call(this, node, before)
  }

  /**
   * Remove a linker from this linked list.
   * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {TreeLinker}
   */
  remove (node) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.remove.call(this, node)
  }

  /**
   * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
   * list's own methods keep these up to date, so this is only needed after linkers were changed directly.
   * @return {TreeLinker}
   */
  reset () {
    return _DoublyLinkedList.DoublyLinkedList.prototype.reset.call(this)
  }

  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {TreeLinker|null}
   */
  item (index) {
    return _DoublyLinkedList.DoublyLinkedList.prototype.item.call(this, index)
  }

  /**
   * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
   * @param {forEachCallback} callback The function to call for-each tree node
   * @param {LinkedTreeList} thisArg Optional, 'this' reference
   * @return {LinkedTreeList} The list which was iterated.
   */
  forEach (callback, thisArg = this) {
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
    const root = this.rootParent
    return new _TreeLinkerIterator.TreeLinkerIterator(root)
  }
}
/**
 * Convert an array into a LinkedTreeList instance, return the new instance.
 * @param {Array} [values=[]] An array of values which will be converted to nodes in this tree-list
 * @param {TreeLinker} [linkerClass=TreeLinker] The class to use for each node
 * @param {IsArrayable<TreeLinker>} [classType=LinkedTreeList] Provide the type of IsArrayable to use.
 * @returns {LinkedTreeList}
 */
exports.LinkedTreeList = LinkedTreeList
LinkedTreeList.fromArray = (values = [], linkerClass = _TreeLinker.TreeLinker, classType = LinkedTreeList) => {
  const list = new classType(linkerClass)
  return list.initialize(linkerClass.fromArray(values).head)
}
