'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TreeLinker = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
const _DoubleLinker = require('../doubly-linked-list/DoubleLinker')
const _LinkedTreeList = require('./LinkedTreeList')
/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
class TreeLinker {
  /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param {Object} [settings={}] The settings for the new tree node.
   * @param {*} [settings.data=null] The data to be stored in this tree node
   * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
   * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
   * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
   * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   */
  constructor ({
    data = null,
    next = null,
    prev = null,
    children = null,
    parent = null,
    listClass = _LinkedTreeList.LinkedTreeList
  } = {}) {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    this.classType = TreeLinker
    /** The data stored in this tree node. */
    this.data = null
    /** The sibling after this node, or null when this is the last child. */
    this.next = null
    /** The sibling before this node, or null when this is the first child. */
    this.prev = null
    /** The node this node is a child of, or null for a root node. */
    this.parent = null
    /** The list of the children of this node, or null when it has none. */
    this.children = null
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children, listClass)
  }

  /**
   * Create the children for this tree from an array. Each child becomes a tree linker with this node as its parent: an
   * existing linker is kept as it is, an object with a data property gives the settings of the linker, and anything
   * else is the data of the linker.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   * @return {LinkedTreeList|null}
   */
  childrenFromArray (children = null, listClass = _LinkedTreeList.LinkedTreeList) {
    if (children === null) {
      return null
    }
    // Every child is made into a tree linker (an existing one is kept as it is, and a plain value is the data) and is
    // given this node as its parent
    const nodes = children.map(child => {
      const linker = this.classType.make(child, this.classType)
      linker.parent = this
      return linker
    })
    // Creates a linked-tree-list to store the children, which remembers this node as its parent even when it is empty
    const list = listClass.fromArray(nodes, this.classType)
    list.parent = this
    return list
  }
}
/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @return {TreeLinker}
 */
exports.TreeLinker = TreeLinker
TreeLinker.make = (linker, classType = TreeLinker) => {
  return _DoubleLinker.DoubleLinker.make(linker, classType)
}
/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
TreeLinker.fromArray = (values = [], classType = TreeLinker) => _DoubleLinker.DoubleLinker.fromArray(values, classType)
