'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
/**
 * DoubleLinker represents a node in a DoublyLinkedList.
 */
class DoubleLinker {
  /**
   * Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {DoubleLinker|null} [nodeData.prev=null]
   * @param {DoubleLinker|null} [nodeData.next=null]
   */
  constructor () {
    const {
      data = null,
      prev = null,
      next = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.data = null
    this.next = null
    this.prev = null
    this.classType = DoubleLinker
    this.data = data
    this.next = next
    this.prev = prev
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {DoubleLinker|*} linker
 * @return {DoubleLinker}
 */
DoubleLinker.make = linker => {
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the DoubleLinker with element as the data
    return new DoubleLinker({
      data: linker
    })
  }
  if (linker.classType) {
    // Already valid DoubleLinker, return as-is
    return linker
  }
  if (!linker.data) {
    linker = {
      data: linker
    }
  }
  // Create the new node as the configured #classType
  return new DoubleLinker(linker)
}
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]]
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @returns {{head: DoubleLinker, tail: DoubleLinker}}
 */
DoubleLinker.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker
  return values.reduce((references, linker) => {
    const newLinker = linkerClass.make(linker)
    if (references.head === null) {
      // Initialize the head and tail with the new node
      return {
        head: newLinker,
        tail: newLinker
      }
    }
    newLinker.prev = references.tail
    // Only update the tail once head has been set, tail is always the most recent node
    references.tail.next = newLinker
    references.tail = newLinker
    return references
  }, {
    head: null,
    tail: null
  })
}
var _default = exports.default = DoubleLinker
