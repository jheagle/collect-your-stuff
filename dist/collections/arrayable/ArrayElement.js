'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
/**
 * Element represents a node in an Arrayable.
 */
class ArrayElement {
  /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param {*} [data=null] The data to be stored in this element.
   */
  constructor () {
    const data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    this.classType = ArrayElement
    this.data = null
    this.data = data
  }
}
/**
 * Make a new Element from the data given if it is not already a valid Element.
 * @param {ArrayElement|*} element Return a valid ArrayElement instance from given data, or even an already valid one.
 * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
 * @return {ArrayElement}
 */
ArrayElement.make = function (element) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ArrayElement
  if (typeof element !== 'object') {
    // It is not an object, so instantiate the Element with element as the data
    return new classType(element)
  }
  if (element.classType) {
    // Already valid Element, return as-is
    return element
  }
  // Create the new node as the configured #classType
  return new classType(element)
}
/**
 * Convert an array into Element instances, return the head and tail Elements.
 * @param {Array<IsElement>} [values=[]] Provide an array of data that will be converted to array of elements.
 * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
 * @returns {{head: ArrayElement[], tail: ArrayElement}}
 */
ArrayElement.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ArrayElement
  return values.reduce((references, element) => {
    const newElement = classType.make(element, classType)
    if (!references.head.length) {
      // Initialize the head and tail with the new node
      return {
        head: [newElement],
        tail: newElement
      }
    }
    // Only update the tail once head has been set, tail is always the most recent node
    references.head.push(newElement)
    references.tail = newElement
    return references
  }, {
    head: [],
    tail: null
  })
}
var _default = exports.default = ArrayElement
