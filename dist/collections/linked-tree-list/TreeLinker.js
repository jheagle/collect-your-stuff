'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TreeLinker = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
var _DoubleLinker = require('../doubly-linked-list/DoubleLinker')
var _LinkedTreeList = require('./LinkedTreeList')
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
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   */
  constructor () {
    const {
      data = null,
      next = null,
      prev = null,
      children = null,
      parent = null,
      listClass = _LinkedTreeList.LinkedTreeList
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
    this.children = this.childrenFromArray(children, listClass)
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   * @return {LinkedTreeList|null}
   */
  childrenFromArray () {
    const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedTreeList.LinkedTreeList
    if (children === null) {
      return null
    }
    // Creates a linked-tree-list to store the children.
    return listClass.fromArray(children.map(child => Object.assign({}, child, {
      parent: this
    })), this.classType)
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @return {TreeLinker}
 */
exports.TreeLinker = TreeLinker
TreeLinker.make = function (linker) {
  const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
  return _DoubleLinker.DoubleLinker.make(linker, classType)
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
  return _DoubleLinker.DoubleLinker.fromArray(values, classType)
}
