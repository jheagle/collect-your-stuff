'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Linker = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
var _ArrayElement = require('../arrayable/ArrayElement')
/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
class Linker {
  /**
   * Create the new Linker instance, provide the data and optionally give the next Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {Linker|null} [nodeData.next=null] The reference to the next linker if any
   */
  constructor () {
    const {
      data = null,
      next = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.classType = Linker
    this.data = null
    this.next = null
    this.data = data
    this.next = next
  }
}
/**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @param {Linker|*} linker Return a valid Linker instance from given data, or even an already valid one.
 * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
 * @return {Linker}
 */
exports.Linker = Linker
Linker.make = function (linker) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the Linker with element as the data
    return new classType({
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
  return _ArrayElement.ArrayElement.make(linker, classType)
}
/**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
 * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
 * @returns {{head: Linker, tail: Linker}}
 */
Linker.fromArray = function (values) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker
  return values.reduce((references, linker) => {
    const newLinker = classType.make(linker, classType)
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
}
