'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
var _DoubleLinker = _interopRequireDefault(require('../doubly-linked-list/DoubleLinker'))
var _LinkedTreeList = _interopRequireDefault(require('./LinkedTreeList'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
class TreeLinker {
  /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null] The data to be stored in this tree node
   * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
   * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
   * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
   * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
   */
  constructor () {
    const {
      data = null,
      next = null,
      prev = null,
      children = null,
      parent = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    this.classType = TreeLinker
    this.data = null
    this.next = null
    this.prev = null
    this.parent = null
    this.children = null
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children)
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @param {IsTree} classType Provide the type of IsElement to use.
   * @param {IsArrayable<IsTree>} listType Give the type of list to use for storing the children
   * @return {LinkedTreeList|null}
   */
  childrenFromArray () {
    const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
    const listType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedTreeList.default
    if (children === null) {
      return null
    }
    // Creates a linked-tree-list to store the children.
    return listType.fromArray(children.map(child => Object.assign({}, child, {
      parent: this
    })), classType)
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @return {TreeLinker}
 */
TreeLinker.make = function (linker) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
  return _DoubleLinker.default.make(linker, classType)
}
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
TreeLinker.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
  return _DoubleLinker.default.fromArray(values, classType)
}
var _default = exports.default = TreeLinker
