'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LinkedList = void 0
var _Linker = require('./Linker')
var _LinkerIterator = require('../../recipes/LinkerIterator')
var _Arrayable = require('../arrayable/Arrayable')
/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
class LinkedList {
  /**
   * Create the new LinkedList instance.
   * @param {Linker} [linkerClass=Linker] The class used to wrap given data as linkers.
   */
  constructor (linkerClass = _Linker.Linker) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = LinkedList
    /** The first linker of the list (null when the list is empty), from which the whole list is reached. */
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
   * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
   * @return {LinkedList}
   */
  initialize (initialList) {
    // Borrowed from Arrayable, which types its return as an Arrayable although it returns whatever list called it
    return _Arrayable.Arrayable.prototype.initialize.call(this, initialList)
  }

  /**
   * Retrieve the innerList used (the list itself, not a copy).
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
   * Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.
   * @returns {Linker}
   */
  get last () {
    if (this.innerList === null) {
      return null
    }
    let tail = this.tailCache !== null ? this.tailCache : this.innerList
    // The remembered tail is normally the end already, walking on from it also finds anything linked on outside of this list
    while (tail.next !== null) {
      tail = tail.next
    }
    this.tailCache = tail
    return tail
  }

  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   * @returns {number}
   */
  get length () {
    if (this.countCache === null) {
      this.reset()
    }
    return this.countCache
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {Linker|*} node The existing node as reference, or null to insert at the start of the list
   * @param {Linker|*} newNode The new node to go after the existing node
   * @returns {LinkedList}
   */
  insertAfter (node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // After nothing means at the start of the list
      newNode.next = this.innerList
      if (this.innerList === null) {
        this.tailCache = newNode
      }
      this.innerList = newNode
    } else {
      newNode.next = node.next
      node.next = newNode
      if (newNode.next === null) {
        this.tailCache = newNode
      }
    }
    if (this.countCache !== null) {
      ++this.countCache
    }
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {Linker|*} node The existing node as reference, or null to insert at the end of the list
   * @param {Linker|*} newNode The new node to go before the existing node
   * @returns {LinkedList}
   * @throws {Error} When the reference node is not in this list
   */
  insertBefore (node, newNode) {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // Before nothing means at the end of the list
      const tail = this.last
      newNode.next = null
      if (tail === null) {
        this.innerList = newNode
      } else {
        tail.next = newNode
      }
      this.tailCache = newNode
    } else {
      let prevNode = null
      let currentNode = this.first
      while (currentNode !== null && currentNode !== node) {
        prevNode = currentNode
        currentNode = currentNode.next
      }
      if (currentNode === null) {
        throw new Error('The reference node is not in this list.')
      }
      newNode.next = node
      if (prevNode) {
        prevNode.next = newNode
      } else {
        this.innerList = newNode
      }
    }
    if (this.countCache !== null) {
      ++this.countCache
    }
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {Linker|*} node The new node to add to the end of the list
   * @param {Linker} after The existing last node
   * @returns {Linker}
   */
  append (node, after = this.last) {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {Linker|*} node The new node to add to the start of the list
   * @param {Linker} before The existing first node
   * @returns {Linker}
   */
  prepend (node, before = this.first) {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {Linker} node The node we wish to remove (and it will be returned after removal)
   * @return {Linker|null} The removed node, or null when it was not in this list (nothing is removed)
   */
  remove (node) {
    if (node === null || typeof node === 'undefined') {
      return null
    }
    let prevNode = null
    let currentNode = this.first
    while (currentNode !== null && currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    if (currentNode === null) {
      // The node is not in this list, so there is nothing to remove
      return null
    }
    if (prevNode) {
      prevNode.next = node.next
    } else {
      this.innerList = node.next
    }
    if (this.tailCache === node) {
      this.tailCache = prevNode
    }
    if (this.innerList === null) {
      this.tailCache = null
    }
    if (this.countCache !== null) {
      --this.countCache
    }
    return node
  }

  /**
   * Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
   * so this is only needed after linkers were changed directly (for example by setting next on a linker).
   * @return {Linker|null} The first linker of the list
   */
  reset () {
    let count = 0
    let tail = null
    let current = this.innerList
    while (current !== null) {
      ++count
      tail = current
      current = current.next
    }
    this.countCache = count
    this.tailCache = tail
    return this.innerList
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
    return new _LinkerIterator.LinkerIterator(this.first)
  }
}
/**
 * Convert an array to a LinkedList.
 * @param {Array} values An array of values which will be converted to linkers in this linked-list
 * @param {IsLinker} linkerClass The class to use for each linker
 * @param {IsArrayable<Linker>} [classType=LinkedList] Provide the type of IsArrayable to use.
 * @returns {LinkedList}
 */
exports.LinkedList = LinkedList
LinkedList.fromArray = (values = [], linkerClass = _Linker.Linker, classType = LinkedList) => {
  const list = new classType(linkerClass)
  return list.initialize(linkerClass.fromArray(values).head)
}
