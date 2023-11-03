'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
/**
 * Linker represents a node in a LinkedList.
 */
class Linker {
  /**
   * Create the new Linker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {Linker|null} [nodeData.next=null]
   */
  constructor () {
    const {
      data = null,
      next = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.data = null
    this.next = null
    this.classType = Linker
    this.data = data
    this.next = next
  }
}
/**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @param {Linker|*} linker
 * @return {Linker}
 */
Linker.make = linker => {
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the Linker with element as the data
    return new Linker({
      data: linker
    })
  }
  if (linker.classType) {
    // Already valid Linker, return as-is
    return linker
  }
  if (!linker.data) {
    linker = {
      data: linker
    }
  }
  // Create the new node as the configured #classType
  return new Linker(linker)
}
/**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @param {Array} [values=[]]
 * @returns {{head: Linker, tail: Linker}}
 */
Linker.fromArray = values => values.reduce((references, linker) => {
  const newLinker = Linker.make(linker)
  if (references.head === null) {
    // Initialize the head and tail with the new node
    return {
      head: newLinker,
      tail: newLinker
    }
  }
  // Only update the tail once head has been set, tail is always the most recent node
  references.tail.next = newLinker
  references.tail = newLinker
  return references
}, {
  head: null,
  tail: null
})
var _default = exports.default = Linker
