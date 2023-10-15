'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LinkedTreeList = void 0
var _LinkedList = require('./LinkedList')
var _TreeLinker = require('./TreeLinker')
/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

class LinkedTreeList extends _LinkedList.LinkedList {
  constructor () {
    const LinkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _TreeLinker.TreeLinker
    const ListClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LinkedTreeList
    super(LinkerClass, ListClass)
  }

  get parent () {
    return this.first.parent
  }

  set parent (parent) {
    let current = this.first
    while (current !== null) {
      current.parent = parent
      current = current.next
    }
    if (parent) {
      parent.children = this
    }
  }

  get rootParent () {
    let current = this.first
    let parent = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  setChildren (item) {
    const children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null
    if (Array.from(this).indexOf(item) < 0) {
      // noinspection JSForgottenDebugStatementInspection
      console.error('item is not a child of this')
    }
    children.parent = item
  }
}

/**
 *
 * @param values
 * @param LinkerClass
 * @param ListClass
 * @returns {LinkedList}
 */
exports.LinkedTreeList = LinkedTreeList
LinkedTreeList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _TreeLinker.TreeLinker
  const ListClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedTreeList
  const list = new ListClass(LinkerClass)
  list.innerList = list.LinkerClass.fromArray(values, LinkerClass)
  return list
}
