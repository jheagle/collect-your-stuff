'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
var _LinkedTreeList = _interopRequireDefault(require('./LinkedTreeList'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * TreeLinker represents a node in a LinkedTreeList.
 */
class TreeLinker {
  /**
   * Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null]
   * @param {TreeLinker} [settings.prev=null]
   * @param {TreeLinker} [settings.next=null]
   * @param {LinkedTreeList} [settings.children=null]
   * @param {TreeLinker} [settings.parent=null]
   */
  constructor () {
    const {
      data = null,
      prev = null,
      next = null,
      children = null,
      parent = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.data = null
    this.next = null
    this.prev = null
    this.parent = null
    this.children = null
    this.classType = TreeLinker
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children)
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children
   * @return {DoubleLinker|null}
   */
  childrenFromArray () {
    const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    if (children === null) {
      return null
    }
    return _LinkedTreeList.default.fromArray(children.map(child => Object.assign({}, child, {
      parent: this
    })), TreeLinker)
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {TreeLinker|*} linker
 * @return {TreeLinker}
 */
TreeLinker.make = linker => {
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the DoubleLinker with element as the data
    return new TreeLinker({
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
  return new TreeLinker(linker)
}
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @methodof TreeLinker
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
TreeLinker.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
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
var _default = exports.default = TreeLinker
