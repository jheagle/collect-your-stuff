'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.DoubleLinker = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
var _Linker = require('../linked-list/Linker')
/**
 * DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.
 * @extends Linker
 */
class DoubleLinker {
  /**
   * Create the new DoubleLinker instance, provide the data and optionally the next and prev references.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {DoubleLinker|null} [nodeData.next=null] The reference to the next linker if any
   * @param {DoubleLinker|null} [nodeData.prev=null] The reference to the previous linker if any
   */
  constructor () {
    const _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    const _ref$data = _ref.data
    const data = _ref$data === void 0 ? null : _ref$data
    const _ref$next = _ref.next
    const next = _ref$next === void 0 ? null : _ref$next
    const _ref$prev = _ref.prev
    const prev = _ref$prev === void 0 ? null : _ref$prev
    this.classType = DoubleLinker
    this.data = null
    this.next = null
    this.prev = null
    this.data = data
    this.next = next
    this.prev = prev
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {DoubleLinker|*} linker Return a valid Linker instance from given data, or even an already valid one.
 * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
 * @return {DoubleLinker}
 */
exports.DoubleLinker = DoubleLinker
DoubleLinker.make = function (linker) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker
  return _Linker.Linker.make(linker, classType)
}
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
 * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
 * @returns {{head: DoubleLinker, tail: DoubleLinker}}
 */
DoubleLinker.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker
  return values.reduce((references, linker) => {
    const newLinker = classType.make(linker, classType)
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
